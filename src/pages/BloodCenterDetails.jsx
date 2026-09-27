import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { api } from "../api.js";

/* =====================================================
HELPERS
===================================================== */

function getCenterName(center) {
  return (
    center?.name ||
    center?.title ||
    center?.centerName ||
    center?.bloodCenterName ||
    "مركز الدم"
  );
}

function getCenterType(center) {
  return (
    center?.type ||
    center?.centerType ||
    "مركز دم"
  );
}

function getCenterGovernorate(center) {
  return (
    center?.governorate ||
    center?.province ||
    center?.region ||
    ""
  );
}

function getCenterCity(center) {
  return (
    center?.city ||
    center?.area ||
    ""
  );
}

function getCenterAddress(center) {
  return (
    center?.address ||
    center?.location ||
    center?.fullAddress ||
    "العنوان غير متوفر حاليًا"
  );
}

function getCenterPhone(center) {
  return (
    center?.phone ||
    center?.phoneNumber ||
    center?.telephone ||
    ""
  );
}

function getCenterHours(center) {
  return (
    center?.workingHours ||
    center?.hours ||
    center?.openingHours ||
    ""
  );
}

function getCenterDistance(center) {
  const value =
    center?.distanceKm ??
    center?.distance ??
    null;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
}

function getCenterServices(center) {
  if (!Array.isArray(center?.services)) {
    return [];
  }

  return center.services.filter(Boolean);
}

/* =====================================================
USER
===================================================== */

function getLoggedInUserId() {
  try {
    const savedUser =
      localStorage.getItem("nabd_user");

    if (!savedUser) {
      return null;
    }

    const user =
      JSON.parse(savedUser);

    return (
      user?.id ||
      user?.userId ||
      null
    );
  } catch {
    return null;
  }
}

/* =====================================================
DATE
===================================================== */

function getTodayDate() {
  const now = new Date();

  const year =
    now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* =====================================================
EXACT BACKEND COORDINATES
===================================================== */

function getCenterCoordinates(center) {
  const lat = Number(
    center?.lat ??
      center?.latitude
  );

  const lng = Number(
    center?.lng ??
      center?.longitude
  );

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng)
  ) {
    return null;
  }

  if (
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  return {
    lat,
    lng,
    source: "backend",
    approximate: false,
  };
}

/* =====================================================
CITY FALLBACK
===================================================== */

const FALLBACK_CITY_COORDINATES = {
  "الزقازيق": {
    lat: 30.5877,
    lng: 31.5020,
  },

  "منيا القمح": {
    lat: 30.3060,
    lng: 31.4520,
  },

  "أبوحماد": {
    lat: 30.5480,
    lng: 31.6730,
  },

  "أبو كبير": {
    lat: 30.7250,
    lng: 31.6710,
  },

  "كفر صقر": {
    lat: 30.7930,
    lng: 31.6260,
  },

  "شبرا": {
    lat: 30.0780,
    lng: 31.2450,
  },

  "السيدة زينب": {
    lat: 30.0310,
    lng: 31.2350,
  },

  "منشية البكري": {
    lat: 30.0880,
    lng: 31.3200,
  },

  "دار السلام": {
    lat: 29.9690,
    lng: 31.2370,
  },

  "بنها": {
    lat: 30.4660,
    lng: 31.1840,
  },

  "كفر شكر": {
    lat: 30.5490,
    lng: 31.2480,
  },

  "شبرا الخيمة": {
    lat: 30.1280,
    lng: 31.2420,
  },

  "القناطر الخيرية": {
    lat: 30.1930,
    lng: 31.1370,
  },

  "طوخ": {
    lat: 30.3540,
    lng: 31.2020,
  },

  "الإسكندرية": {
    lat: 31.2001,
    lng: 29.9187,
  },

  "دمنهور": {
    lat: 31.0341,
    lng: 30.4682,
  },

  "المنصورة": {
    lat: 31.0409,
    lng: 31.3785,
  },

  "طنطا": {
    lat: 30.7865,
    lng: 31.0004,
  },

  "الإسماعيلية": {
    lat: 30.5965,
    lng: 32.2715,
  },
};

/* =====================================================
GOVERNORATE FALLBACK
===================================================== */

const FALLBACK_GOVERNORATE_COORDINATES = {
  "الشرقية": {
    lat: 30.7327,
    lng: 31.7195,
  },

  "القاهرة": {
    lat: 30.0444,
    lng: 31.2357,
  },

  "القليوبية": {
    lat: 30.4660,
    lng: 31.1840,
  },

  "الإسكندرية": {
    lat: 31.2001,
    lng: 29.9187,
  },

  "البحيرة": {
    lat: 31.0341,
    lng: 30.4682,
  },

  "الدقهلية": {
    lat: 31.0409,
    lng: 31.3785,
  },

  "الغربية": {
    lat: 30.7865,
    lng: 31.0004,
  },

  "الإسماعيلية": {
    lat: 30.5965,
    lng: 32.2715,
  },
};

/* =====================================================
FALLBACK COORDINATES
===================================================== */

function getFallbackCoordinates(center) {
  const city = String(
    center?.city ||
      center?.area ||
      ""
  ).trim();

  const governorate = String(
    center?.governorate ||
      center?.province ||
      center?.region ||
      ""
  ).trim();

  if (
    city &&
    FALLBACK_CITY_COORDINATES[city]
  ) {
    return {
      ...FALLBACK_CITY_COORDINATES[city],
      source: "city-fallback",
      approximate: true,
    };
  }

  if (
    governorate &&
    FALLBACK_GOVERNORATE_COORDINATES[
      governorate
    ]
  ) {
    return {
      ...FALLBACK_GOVERNORATE_COORDINATES[
        governorate
      ],
      source: "governorate-fallback",
      approximate: true,
    };
  }

  return {
    lat: 26.8206,
    lng: 30.8025,
    source: "egypt-fallback",
    approximate: true,
  };
}

/* =====================================================
LEAFLET MARKER
===================================================== */

const bloodCenterIcon = L.divIcon({
  className: "blood-center-marker",

  html: `
    <div class="leaflet-marker-pin">
      <div class="leaflet-marker-icon">
        ♥
      </div>
    </div>
  `,

  iconSize: [44, 54],
  iconAnchor: [22, 54],
  popupAnchor: [0, -52],
});

/* =====================================================
ICONS
===================================================== */

function LocationIcon({
  size = 22,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10.5C20 15.5 12 22 12 22C12 22 4 15.5 4 10.5C4 6.36 7.58 3 12 3C16.42 3 20 6.36 20 10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="10.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon({
  size = 21,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.7 3.5L9.1 3C9.7 2.88 10.3 3.2 10.55 3.75L12 7.1C12.2 7.55 12.08 8.08 11.7 8.4L9.9 9.9C11 12.25 12.7 14 15.05 15.1L16.6 13.3C16.92 12.92 17.45 12.8 17.9 13L21.25 14.45C21.8 14.7 22.12 15.3 22 15.9L21.5 18.3C21.35 19.02 20.72 19.55 20 19.55C11.45 19.55 4.45 12.55 4.45 4C4.45 3.28 4.98 2.65 5.7 2.5L6.7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({
  size = 21,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 7V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({
  size = 20,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon({
  size = 21,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18L3.5 20.5V6L9 3.5L15 6L20.5 3.5V18L15 20.5L9 18Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M9 3.5V18M15 6V20.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CheckIcon({
  size = 18,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="currentColor"
        opacity="0.12"
      />

      <path
        d="M8 12.5L10.7 15L16.5 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({
  size = 21,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M7.5 3V7M16.5 3V7M3.5 9H20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BloodDropIcon({
  size = 22,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3C12 3 5.5 10.3 5.5 14.8C5.5 18.7 8.4 21 12 21C15.6 21 18.5 18.7 18.5 14.8C18.5 10.3 12 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M9 16C9.7 17.3 10.7 18 12 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({
  size = 20,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =====================================================
MAIN
===================================================== */

export default function BloodCenterDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [
    center,
    setCenter,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    geocodedCoordinates,
    setGeocodedCoordinates,
  ] = useState(null);

  const [
    geocoding,
    setGeocoding,
  ] = useState(false);

  /* ===================================================
  APPOINTMENT
  =================================================== */

  const [
    appointmentOpen,
    setAppointmentOpen,
  ] = useState(false);

  const [
    appointmentDate,
    setAppointmentDate,
  ] = useState("");

  const [
    appointmentTime,
    setAppointmentTime,
  ] = useState("");

  const [
    donationType,
    setDonationType,
  ] = useState("whole_blood");

  const [
    appointmentLoading,
    setAppointmentLoading,
  ] = useState(false);

  const [
    appointmentMessage,
    setAppointmentMessage,
  ] = useState("");

  const [
    appointmentError,
    setAppointmentError,
  ] = useState("");

  /* ===================================================
  BLOOD BANK REQUEST
  =================================================== */

  const [
    requestOpen,
    setRequestOpen,
  ] = useState(false);

  const [
    bloodType,
    setBloodType,
  ] = useState("");

  const [
    units,
    setUnits,
  ] = useState("1");

  const [
    urgency,
    setUrgency,
  ] = useState("عادية");

  const [
    neededDate,
    setNeededDate,
  ] = useState("");

  const [
    notes,
    setNotes,
  ] = useState("");

  const [
    requestLoading,
    setRequestLoading,
  ] = useState(false);

  const [
    requestMessage,
    setRequestMessage,
  ] = useState("");

  const [
    requestError,
    setRequestError,
  ] = useState("");

  /* ===================================================
  LOAD CENTER
  =================================================== */

  useEffect(() => {
    let cancelled = false;

    async function loadCenter() {
      if (!id) {
        setError(
          "المركز غير موجود"
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError("");
        setGeocodedCoordinates(null);

        const data =
          await api.getBloodCenter(id);

        if (!cancelled) {
          setCenter(data);
        }
      } catch (err) {
        console.error(
          "Failed to load blood center:",
          err
        );

        if (!cancelled) {
          setError(
            err?.message ||
              "تعذر تحميل بيانات المركز"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCenter();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ===================================================
  DATA
  =================================================== */

  const name = useMemo(
    () => getCenterName(center),
    [center]
  );

  const type = useMemo(
    () => getCenterType(center),
    [center]
  );

  const governorate = useMemo(
    () =>
      getCenterGovernorate(center),
    [center]
  );

  const city = useMemo(
    () => getCenterCity(center),
    [center]
  );

  const address = useMemo(
    () => getCenterAddress(center),
    [center]
  );

  const phone = useMemo(
    () => getCenterPhone(center),
    [center]
  );

  const hours = useMemo(
    () => getCenterHours(center),
    [center]
  );

  const distance = useMemo(
    () => getCenterDistance(center),
    [center]
  );

  const services = useMemo(
    () => getCenterServices(center),
    [center]
  );

  /* ===================================================
  MAP QUERY
  =================================================== */

  const mapQuery = useMemo(() => {
    const parts = [
      name,
      address,
      city,
      governorate,
      "مصر",
    ].filter(
      (item) =>
        item &&
        String(item).trim() &&
        item !==
          "العنوان غير متوفر حاليًا"
    );

    return parts.join(", ");
  }, [
    name,
    address,
    city,
    governorate,
  ]);

  /* ===================================================
  REAL GEOCODING
  =================================================== */

  useEffect(() => {
    let cancelled = false;

    async function geocodeCenter() {
      if (!center) {
        return;
      }

      const backendCoordinates =
        getCenterCoordinates(center);

      if (backendCoordinates) {
        return;
      }

      if (!mapQuery) {
        return;
      }

      try {
        setGeocoding(true);

        const queries = [
          `${name}, ${address}, ${city}, ${governorate}, Egypt`,
          `${address}, ${city}, ${governorate}, Egypt`,
          `${name}, ${city}, ${governorate}, Egypt`,
        ].filter(
          (query) =>
            query &&
            query
              .replace(
                /[, ]/g,
                ""
              )
              .trim()
        );

        let found = null;

        for (
          const query of queries
        ) {
          if (cancelled) {
            return;
          }

          try {
            const url =
              `https://nominatim.openstreetmap.org/search?` +
              new URLSearchParams({
                q: query,
                format: "json",
                limit: "1",
                countrycodes: "eg",
                addressdetails: "1",
              }).toString();

            const response =
              await fetch(url, {
                headers: {
                  Accept:
                    "application/json",
                },
              });

            if (!response.ok) {
              continue;
            }

            const results =
              await response.json();

            if (
              Array.isArray(results) &&
              results.length > 0
            ) {
              const first =
                results[0];

              const lat =
                Number(first.lat);

              const lng =
                Number(first.lon);

              if (
                Number.isFinite(lat) &&
                Number.isFinite(lng)
              ) {
                found = {
                  lat,
                  lng,
                  source: "geocoding",
                  approximate: false,
                  displayName:
                    first.display_name ||
                    "",
                };

                break;
              }
            }
          } catch (queryError) {
            console.warn(
              "Geocoding query failed:",
              queryError
            );
          }
        }

        if (
          !cancelled &&
          found
        ) {
          setGeocodedCoordinates(
            found
          );
        }
      } catch (err) {
        console.warn(
          "Blood center geocoding failed:",
          err
        );
      } finally {
        if (!cancelled) {
          setGeocoding(false);
        }
      }
    }

    geocodeCenter();

    return () => {
      cancelled = true;
    };
  }, [
    center,
    mapQuery,
    name,
    address,
    city,
    governorate,
  ]);

  /* ===================================================
  MAP COORDINATES
  =================================================== */

  const storedCoordinates = useMemo(
    () =>
      getCenterCoordinates(center),
    [center]
  );

  const fallbackCoordinates =
    useMemo(
      () =>
        getFallbackCoordinates(
          center
        ),
      [center]
    );

  const mapCoordinates =
    useMemo(() => {
      if (storedCoordinates) {
        return storedCoordinates;
      }

      if (geocodedCoordinates) {
        return geocodedCoordinates;
      }

      return fallbackCoordinates;
    }, [
      storedCoordinates,
      geocodedCoordinates,
      fallbackCoordinates,
    ]);

  const isApproximate =
    mapCoordinates?.approximate === true;

  const isRealLocation =
    mapCoordinates?.source ===
      "backend" ||
    mapCoordinates?.source ===
      "geocoding";

  const verified =
    center?.verified === true;

  /* ===================================================
  ACTIONS
  =================================================== */

  const handleCall = () => {
    if (!phone) {
      return;
    }

    window.location.href =
      `tel:${phone}`;
  };

  const handleDirections = () => {
    if (mapCoordinates) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${mapCoordinates.lat},${mapCoordinates.lng}`,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    if (mapQuery) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          mapQuery
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  /* ===================================================
  OPEN APPOINTMENT
  =================================================== */

  const openAppointmentForm = () => {
    setAppointmentError("");
    setAppointmentMessage("");

    setRequestOpen(false);

    if (!getLoggedInUserId()) {
      setAppointmentError(
        "يجب تسجيل الدخول أولًا حتى تتمكن من حجز موعد."
      );
    }

    setAppointmentOpen(true);
  };

  /* ===================================================
  OPEN BLOOD REQUEST
  =================================================== */

  const openBloodRequestForm = () => {
    setRequestError("");
    setRequestMessage("");

    setAppointmentOpen(false);

    if (!getLoggedInUserId()) {
      setRequestError(
        "يجب تسجيل الدخول أولًا حتى تتمكن من طلب الدم."
      );
    }

    setRequestOpen(true);
  };

  /* ===================================================
  CLOSE FORMS
  =================================================== */

  const closeAppointmentForm = () => {
    if (appointmentLoading) {
      return;
    }

    setAppointmentOpen(false);
    setAppointmentError("");
    setAppointmentMessage("");
  };

  const closeBloodRequestForm = () => {
    if (requestLoading) {
      return;
    }

    setRequestOpen(false);
    setRequestError("");
    setRequestMessage("");
  };

  /* ===================================================
  CREATE APPOINTMENT
  =================================================== */

  const handleAppointmentSubmit = async (
    event
  ) => {
    event.preventDefault();

    setAppointmentError("");
    setAppointmentMessage("");

    const userId =
      getLoggedInUserId();

    if (!userId) {
      setAppointmentError(
        "يجب تسجيل الدخول أولًا."
      );

      return;
    }

    if (!appointmentDate) {
      setAppointmentError(
        "من فضلك اختر تاريخ التبرع."
      );

      return;
    }

    if (!appointmentTime) {
      setAppointmentError(
        "من فضلك اختر وقت التبرع."
      );

      return;
    }

    if (
      appointmentDate <
      getTodayDate()
    ) {
      setAppointmentError(
        "لا يمكن حجز موعد في تاريخ سابق."
      );

      return;
    }

    try {
      setAppointmentLoading(true);

      await api.createBloodDonationAppointment(
        id,
        userId,
        appointmentDate,
        appointmentTime,
        donationType
      );

      setAppointmentMessage(
        "تم إرسال طلب حجز موعد التبرع بنجاح، وسيتم مراجعته من المركز."
      );

      setAppointmentDate("");
      setAppointmentTime("");
      setDonationType(
        "whole_blood"
      );
    } catch (err) {
      console.error(
        "Create donation appointment failed:",
        err
      );

      setAppointmentError(
        err?.message ||
          "تعذر إرسال طلب حجز الموعد حاليًا."
      );
    } finally {
      setAppointmentLoading(false);
    }
  };

  /* ===================================================
  CREATE BLOOD BANK REQUEST
  =================================================== */

  const handleBloodRequestSubmit =
    async (event) => {
      event.preventDefault();

      setRequestError("");
      setRequestMessage("");

      const userId =
        getLoggedInUserId();

      if (!userId) {
        setRequestError(
          "يجب تسجيل الدخول أولًا."
        );

        return;
      }

      if (!bloodType) {
        setRequestError(
          "من فضلك اختر فصيلة الدم."
        );

        return;
      }

      const numericUnits =
        Number(units);

      if (
        !Number.isFinite(
          numericUnits
        ) ||
        numericUnits < 1
      ) {
        setRequestError(
          "عدد وحدات الدم يجب أن يكون وحدة واحدة على الأقل."
        );

        return;
      }

      if (
        neededDate &&
        neededDate <
          getTodayDate()
      ) {
        setRequestError(
          "لا يمكن اختيار تاريخ سابق."
        );

        return;
      }

      try {
        setRequestLoading(true);

        await api.createBloodBankRequest(
          userId,
          id,
          bloodType,
          numericUnits,
          urgency,
          neededDate || null,
          notes.trim() || null
        );

        setRequestMessage(
          "تم إرسال طلب الدم إلى المركز بنجاح، وسيتم مراجعته من المركز."
        );

        setBloodType("");
        setUnits("1");
        setUrgency("عادية");
        setNeededDate("");
        setNotes("");
      } catch (err) {
        console.error(
          "Create blood bank request failed:",
          err
        );

        setRequestError(
          err?.message ||
            "تعذر إرسال طلب الدم حاليًا."
        );
      } finally {
        setRequestLoading(false);
      }
    };

  /* ===================================================
  LOADING
  =================================================== */

  if (loading) {
    return (
      <>
        <style>
          {styles}
        </style>

        <div
          className="blood-center-page"
          dir="rtl"
        >
          <header className="details-header">
            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate(-1)
              }
              aria-label="رجوع"
            >
              <ArrowIcon size={21} />
            </button>

            <h1>
              تفاصيل المركز
            </h1>

            <div className="header-spacer" />
          </header>

          <main className="details-content">
            <div className="loading-card">
              <div className="loading-spinner" />

              <p>
                جاري تحميل بيانات المركز...
              </p>
            </div>
          </main>
        </div>
      </>
    );
  }

  /* ===================================================
  ERROR
  =================================================== */

  if (
    error ||
    !center
  ) {
    return (
      <>
        <style>
          {styles}
        </style>

        <div
          className="blood-center-page"
          dir="rtl"
        >
          <header className="details-header">
            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate(-1)
              }
              aria-label="رجوع"
            >
              <ArrowIcon size={21} />
            </button>

            <h1>
              تفاصيل المركز
            </h1>

            <div className="header-spacer" />
          </header>

          <main className="details-content">
            <div className="error-card">
              <div className="error-icon">
                !
              </div>

              <h2>
                تعذر تحميل المركز
              </h2>

              <p>
                {error ||
                  "المركز المطلوب غير موجود حاليًا."}
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  navigate(-1)
                }
              >
                العودة للمراكز
              </button>
            </div>
          </main>
        </div>
      </>
    );
  }

  /* ===================================================
  PAGE
  =================================================== */

  return (
    <>
      <style>
        {styles}
      </style>

      <div
        className="blood-center-page"
        dir="rtl"
      >
        <header className="details-header">
          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate(-1)
            }
            aria-label="رجوع"
          >
            <ArrowIcon size={21} />
          </button>

          <h1>
            تفاصيل المركز
          </h1>

          <div className="header-spacer" />
        </header>

        <main className="details-content">

          {/* =================================================
             HERO
          ================================================= */}

          <section className="center-hero">

            <div className="center-icon">
              <svg
                width="42"
                height="42"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M50 88C50 88 12 63 12 35C12 19 24 9 38 9C46 9 50 15 50 15C50 15 54 9 62 9C76 9 88 19 88 35C88 63 50 88 50 88Z"
                  fill="white"
                />

                <path
                  d="M18 46H34L40 34L48 58L54 46H82"
                  stroke="#0aa88f"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="center-hero-info">

              <div className="hero-title-row">
                <h2>
                  {name}
                </h2>

                {verified && (
                  <span className="verified-badge">
                    <CheckIcon size={17} />
                    موثق
                  </span>
                )}
              </div>

             <span className="center-type">
  مركز إقليمي لنقل الدم
</span>

              {(city ||
                governorate) && (
                <div className="hero-location">
                  <LocationIcon size={16} />

                  <span>
                    {[
                      city,
                      governorate,
                    ]
                      .filter(Boolean)
                      .join("، ")}
                  </span>
                </div>
              )}

            </div>
          </section>

          {/* =================================================
             DISTANCE
          ================================================= */}

          {distance !== null && (
            <div className="distance-badge">
              <LocationIcon size={17} />

              <span>
                يبعد عنك{" "}
                <strong>
                  {distance.toFixed(1)} كم
                </strong>
              </span>
            </div>
          )}

          {/* =================================================
             CENTER ACTIONS
          ================================================= */}

          <section className="center-actions-card">

            <div className="center-actions-title">
              <div className="actions-title-icon">
                <BloodDropIcon size={22} />
              </div>

              <div>
                <h3>
                  خدمات المركز
                </h3>

                <p>
                  اختر الخدمة التي تريدها
                </p>
              </div>
            </div>

            <div className="center-actions-grid">

              <button
                type="button"
                className="center-action-button donate-action"
                onClick={
                  openAppointmentForm
                }
              >
                <div className="center-action-icon">
                  <CalendarIcon size={23} />
                </div>

                <div className="center-action-text">
                  <strong>
                    احجز موعد للتبرع
                  </strong>

                  <span>
                    حدد الموعد ونوع التبرع
                  </span>
                </div>

                <ArrowIcon size={18} />
              </button>

              <button
                type="button"
                className="center-action-button request-action"
                onClick={
                  openBloodRequestForm
                }
              >
                <div className="center-action-icon">
                  <BloodDropIcon size={23} />
                </div>

                <div className="center-action-text">
                  <strong>
                    أطلب دم من المركز
                  </strong>

                  <span>
                    أرسل طلب الحصول على الدم
                  </span>
                </div>

                <ArrowIcon size={18} />
              </button>

            </div>
          </section>

          {/* =================================================
             INFO
          ================================================= */}

          <section className="details-card">

            <h3>
              معلومات المركز
            </h3>

            <div className="info-item">

              <div className="info-icon">
                <LocationIcon size={20} />
              </div>

              <div className="info-text">

                <span>
                  العنوان
                </span>

                <strong>
                  {address}
                </strong>

              </div>
            </div>

            <div className="info-divider" />

            <div className="info-item">

              <div className="info-icon">
                <PhoneIcon size={20} />
              </div>

              <div className="info-text">

                <span>
                  رقم الهاتف
                </span>

                {phone ? (
                  <button
                    type="button"
                    className="phone-value"
                    onClick={
                      handleCall
                    }
                  >
                    {phone}
                  </button>
                ) : (
                  <strong>
                    غير متوفر حاليًا
                  </strong>
                )}

              </div>
            </div>

            <div className="info-divider" />

            <div className="info-item">

              <div className="info-icon">
                <ClockIcon size={20} />
              </div>

              <div className="info-text">

                <span>
                  مواعيد العمل
                </span>

                <strong>
                  {hours ||
                    "غير متوفرة حاليًا"}
                </strong>

              </div>
            </div>

          </section>

          {/* =================================================
             SERVICES
          ================================================= */}

          {services.length > 0 && (
            <section className="details-card">

              <h3>
                الخدمات المتاحة
              </h3>

              <div className="services-grid">

                {services.map(
                  (
                    service,
                    index
                  ) => (
                    <div
                      className="service-item"
                      key={`${service}-${index}`}
                    >
                      <span className="service-check">
                        <CheckIcon size={18} />
                      </span>

                      <span>
                        {service}
                      </span>
                    </div>
                  )
                )}

              </div>

            </section>
          )}

          {/* =================================================
             MAP
          ================================================= */}

          <section className="map-card">

            <div className="real-map-wrapper">

              <MapContainer
                key={`${mapCoordinates.lat}-${mapCoordinates.lng}`}
                center={[
                  mapCoordinates.lat,
                  mapCoordinates.lng,
                ]}
                zoom={
                  isApproximate
                    ? 13
                    : 16
                }
                scrollWheelZoom={false}
                className="leaflet-map"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[
                    mapCoordinates.lat,
                    mapCoordinates.lng,
                  ]}
                  icon={bloodCenterIcon}
                >
                  <Popup>
                    <div
                      dir="rtl"
                      className="leaflet-popup-content-custom"
                    >
                      <strong>
                        {name}
                      </strong>

                      <span>
                        {isRealLocation
                          ? address
                          : "الموقع التقريبي حسب المدينة"}
                      </span>
                    </div>
                  </Popup>
                </Marker>

              </MapContainer>

              <div className="map-floating-label">

                <LocationIcon size={17} />

                <div>

                  <strong>
                    {geocoding
                      ? "جاري تحديد الموقع الحقيقي..."
                      : isRealLocation
                        ? "موقع المركز"
                        : "موقع تقريبي للمركز"}
                  </strong>

                  <span>
                    {geocoding
                      ? "يتم البحث عن الموقع من العنوان"
                      : isRealLocation
                        ? address
                        : `الموقع حسب مدينة ${
                            city ||
                            governorate ||
                            "المركز"
                          }`}
                  </span>

                </div>
              </div>

            </div>

            <button
              type="button"
              className="directions-button"
              onClick={
                handleDirections
              }
            >
              <MapIcon size={20} />

              <span>
                عرض الاتجاهات
              </span>
            </button>

          </section>

          {/* =================================================
             CALL
          ================================================= */}

          {phone && (
            <button
              type="button"
              className="call-button"
              onClick={
                handleCall
              }
            >
              <PhoneIcon size={20} />

              <span>
                الاتصال بالمركز
              </span>
            </button>
          )}

        </main>

        {/* =================================================
           APPOINTMENT MODAL
        ================================================= */}

        {appointmentOpen && (
          <div
            className="form-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeAppointmentForm();
              }
            }}
          >
            <div
              className="service-modal"
              dir="rtl"
            >
              <div className="modal-header">

                <div className="modal-title-wrap">
                  <div className="modal-title-icon">
                    <CalendarIcon size={22} />
                  </div>

                  <div>
                    <h2>
                      حجز موعد للتبرع
                    </h2>

                    <p>
                      {name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={
                    closeAppointmentForm
                  }
                  disabled={
                    appointmentLoading
                  }
                  aria-label="إغلاق"
                >
                  <CloseIcon size={20} />
                </button>

              </div>

              <form
                className="service-form"
                onSubmit={
                  handleAppointmentSubmit
                }
              >

                <div className="form-field">
                  <label>
                    تاريخ التبرع
                  </label>

                  <input
                    type="date"
                    value={
                      appointmentDate
                    }
                    min={
                      getTodayDate()
                    }
                    onChange={(event) =>
                      setAppointmentDate(
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label>
                    وقت التبرع
                  </label>

                  <input
                    type="time"
                    value={
                      appointmentTime
                    }
                    onChange={(event) =>
                      setAppointmentTime(
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label>
                    نوع التبرع
                  </label>

                  <select
                    value={
                      donationType
                    }
                    onChange={(event) =>
                      setDonationType(
                        event.target.value
                      )
                    }
                  >
                    <option value="whole_blood">
                      دم كامل
                    </option>

                    <option value="platelets">
                      صفائح دموية
                    </option>

                    <option value="plasma">
                      بلازما
                    </option>
                  </select>
                </div>

                {appointmentError && (
                  <div className="form-error">
                    {appointmentError}
                  </div>
                )}

                {appointmentMessage && (
                  <div className="form-success">
                    <CheckIcon size={19} />

                    <span>
                      {appointmentMessage}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="form-submit"
                  disabled={
                    appointmentLoading
                  }
                >
                  {appointmentLoading
                    ? "جاري إرسال الطلب..."
                    : "تأكيد حجز الموعد"}
                </button>

              </form>
            </div>
          </div>
        )}

        {/* =================================================
           BLOOD REQUEST MODAL
        ================================================= */}

        {requestOpen && (
          <div
            className="form-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeBloodRequestForm();
              }
            }}
          >
            <div
              className="service-modal"
              dir="rtl"
            >
              <div className="modal-header">

                <div className="modal-title-wrap">
                  <div className="modal-title-icon blood-modal-icon">
                    <BloodDropIcon size={22} />
                  </div>

                  <div>
                    <h2>
                      طلب دم من المركز
                    </h2>

                    <p>
                      {name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={
                    closeBloodRequestForm
                  }
                  disabled={
                    requestLoading
                  }
                  aria-label="إغلاق"
                >
                  <CloseIcon size={20} />
                </button>

              </div>

              <form
                className="service-form"
                onSubmit={
                  handleBloodRequestSubmit
                }
              >

                <div className="form-field">
                  <label>
                    فصيلة الدم المطلوبة
                  </label>

                  <select
                    value={
                      bloodType
                    }
                    onChange={(event) =>
                      setBloodType(
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      اختر فصيلة الدم
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>
                  </select>
                </div>

                <div className="form-row">

                  <div className="form-field">
                    <label>
                      عدد الوحدات
                    </label>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={units}
                      onChange={(event) =>
                        setUnits(
                          event.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      درجة الاستعجال
                    </label>

                    <select
                      value={
                        urgency
                      }
                      onChange={(event) =>
                        setUrgency(
                          event.target.value
                        )
                      }
                    >
                      <option value="عادية">
                        عادية
                      </option>

                      <option value="عاجلة">
                        عاجلة
                      </option>

                      <option value="طارئة">
                        طارئة
                      </option>
                    </select>
                  </div>

                </div>

                <div className="form-field">
                  <label>
                    التاريخ المطلوب
                    <span>
                      {" "}
                      (اختياري)
                    </span>
                  </label>

                  <input
                    type="date"
                    value={
                      neededDate
                    }
                    min={
                      getTodayDate()
                    }
                    onChange={(event) =>
                      setNeededDate(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="form-field">
                  <label>
                    ملاحظات
                    <span>
                      {" "}
                      (اختياري)
                    </span>
                  </label>

                  <textarea
                    value={notes}
                    onChange={(event) =>
                      setNotes(
                        event.target.value
                      )
                    }
                    placeholder="اكتب أي تفاصيل إضافية..."
                    rows="3"
                    maxLength="500"
                  />
                </div>

                <div className="request-note">
                  <span>
                    !
                  </span>

                  <p>
                    سيتم إرسال الطلب للمركز
                    للمراجعة، ولا يعني إرسال
                    الطلب أن الدم متوفر بالفعل.
                  </p>
                </div>

                {requestError && (
                  <div className="form-error">
                    {requestError}
                  </div>
                )}

                {requestMessage && (
                  <div className="form-success">
                    <CheckIcon size={19} />

                    <span>
                      {requestMessage}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="form-submit"
                  disabled={
                    requestLoading
                  }
                >
                  {requestLoading
                    ? "جاري إرسال الطلب..."
                    : "إرسال طلب الدم"}
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

/* =====================================================
STYLES
===================================================== */

const styles = `

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100%;
}

html {
  background: #edf7f4;
  overflow-x: hidden;
}

body {
  margin: 0;
  width: 100%;
  min-width: 0;
  overflow-x: hidden;

  background:
    linear-gradient(
      160deg,
      #f7fffd 0%,
      #edf9f6 48%,
      #e5f5f1 100%
    );

  -webkit-tap-highlight-color:
    transparent;
}

button,
a,
input,
select,
textarea {
  -webkit-tap-highlight-color:
    transparent;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

#root {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
}

/* =====================================================
MAIN PAGE
===================================================== */

.blood-center-page {
  --primary: #0aa88f;
  --primary-dark: #078876;
  --primary-light: #e6f7f4;

  --text-dark: #17332e;
  --text-main: #245b5d;
  --text-muted: #6b7c79;

  --bg: #edf7f4;
  --card: #ffffff;

  width: 100%;

  min-height: 100vh;
  min-height: 100dvh;

  overflow-x: hidden;

  background:
    radial-gradient(
      circle at 5% 4%,
      rgba(70, 193, 177, 0.15),
      transparent 27%
    ),

    radial-gradient(
      circle at 96% 35%,
      rgba(154, 231, 216, 0.17),
      transparent 29%
    ),

    linear-gradient(
      160deg,
      #f7fffd 0%,
      #edf9f6 48%,
      #e5f5f1 100%
    );

  color:
    var(--text-dark);

  font-family:
    "Tajawal",
    "Cairo",
    Arial,
    sans-serif;

  padding-bottom:
    env(safe-area-inset-bottom);
}

/* =====================================================
HEADER
===================================================== */

.details-header {
  width: 100%;

  min-height: 68px;

  padding:
    10px 14px;

  padding-top:
    max(
      10px,
      env(safe-area-inset-top)
    );

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  background:
    rgba(
      239,
      249,
      246,
      0.96
    );

  border-bottom:
    1px solid
    rgba(
      10,
      168,
      143,
      0.10
    );

  position: sticky;

  top: 0;

  z-index: 20;

  backdrop-filter:
    blur(16px);

  -webkit-backdrop-filter:
    blur(16px);

  box-shadow:
    0 4px 18px
    rgba(
      35,
      102,
      99,
      0.05
    );
}

.details-header h1 {
  margin: 0;

  flex: 1;

  min-width: 0;

  text-align: center;

  font-size: 18px;

  line-height: 1.3;

  font-weight: 900;

  color:
    var(--text-dark);
}

.header-spacer {
  width: 42px;

  height: 42px;

  flex-shrink: 0;
}

.back-button {
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  border: 0;

  border-radius: 14px;

  background:
    rgba(
      255,
      255,
      255,
      0.90
    );

  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  box-shadow:
    0 5px 14px
    rgba(
      35,
      102,
      99,
      0.07
    );

  transition:
    0.18s ease;
}

.back-button:active {
  transform:
    scale(0.95);
}

/* =====================================================
CONTENT
===================================================== */

.details-content {
  width: 100%;

  max-width: 680px;

  margin: 0 auto;

  padding:
    15px 13px 32px;
}

/* =====================================================
HERO
===================================================== */

.center-hero {
  width: 100%;

  min-width: 0;

  display: flex;

  align-items: center;

  gap: 13px;

  padding:
    18px;

  border-radius: 24px;

  background:
    linear-gradient(
      135deg,
      #0aa88f 0%,
      #079b88 52%,
      #078876 100%
    );

  box-shadow:
    0 14px 32px
    rgba(
      10,
      168,
      143,
      0.18
    );
}

.center-icon {
  width: 66px;
  height: 66px;

  flex-shrink: 0;

  border-radius: 20px;

  background:
    rgba(
      255,
      255,
      255,
      0.16
    );

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.28
    );

  display: flex;

  align-items: center;

  justify-content: center;
}

.center-icon svg {
  width: 40px;
  height: 40px;
}

.center-hero-info {
  min-width: 0;

  flex: 1;
}

.hero-title-row {
  display: flex;

  align-items: flex-start;

  flex-wrap: wrap;

  gap: 6px;
}

.center-hero h2 {
  margin: 0;

  min-width: 0;

  color: #ffffff;

  font-size: 17px;

  line-height: 1.55;

  font-weight: 900;

  overflow-wrap: anywhere;
}

.verified-badge {
  display: inline-flex;

  align-items: center;

  gap: 3px;

  padding:
    4px 7px;

  border-radius: 10px;

  background:
    rgba(
      255,
      255,
      255,
      0.17
    );

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.14
    );

  color: #ffffff;

  font-size: 9px;

  font-weight: 800;

  white-space: nowrap;
}

.center-type {
  display: block;

  margin-top: 3px;

  color: #ffffff;

  font-size: 11px;

  font-weight: 800;
}

.hero-location {
  margin-top: 7px;

  display: flex;

  align-items: center;

  gap: 5px;

  color: #ffffff;

  font-size: 10px;

  font-weight: 800;

  min-width: 0;
}

.hero-location span {
  overflow-wrap: anywhere;
}

/* =====================================================
DISTANCE
===================================================== */

.distance-badge {
  margin:
    11px 0;

  padding:
    10px 13px;

  display: flex;

  align-items: center;

  gap: 6px;

  border-radius: 14px;

  background:
    rgba(
      230,
      247,
      244,
      0.92
    );

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.07
    );

  color:
    var(--primary-dark);

  font-size: 11px;

  font-weight: 700;
}

.distance-badge strong {
  font-weight: 900;
}

/* =====================================================
CENTER ACTIONS
===================================================== */

.center-actions-card {
  width: 100%;

  margin-top: 12px;

  padding:
    16px;

  border-radius: 22px;

  background:
    rgba(
      255,
      255,
      255,
      0.95
    );

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.08
    );

  box-shadow:
    0 10px 28px
    rgba(
      35,
      102,
      99,
      0.07
    );
}

.center-actions-title {
  display: flex;

  align-items: center;

  gap: 9px;

  margin-bottom: 12px;
}

.actions-title-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 13px;

  background:
    #e6f7f4;

  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;
}

.center-actions-title h3 {
  margin: 0;

  color:
    var(--text-main);

  font-size: 14px;

  font-weight: 900;
}

.center-actions-title p {
  margin:
    2px 0 0;

  color:
    var(--text-muted);

  font-size: 9px;

  font-weight: 700;
}

.center-actions-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 9px;
}

.center-action-button {
  min-width: 0;

  min-height: 78px;

  padding:
    10px;

  border-radius: 16px;

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.08
    );

  display: flex;

  align-items: center;

  gap: 8px;

  text-align: right;

  font-family: inherit;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.center-action-button:active {
  transform:
    scale(0.985);
}

.donate-action {
  background:
    #edf9f6;

  color:
    var(--primary-dark);
}

.request-action {
  background:
    #f2faf8;

  color:
    #28686a;
}

.center-action-icon {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  border-radius: 12px;

  background:
    rgba(
      10,
      168,
      143,
      0.11
    );

  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;
}

.center-action-text {
  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 3px;
}

.center-action-text strong {
  color:
    var(--text-main);

  font-size: 10px;

  line-height: 1.45;

  font-weight: 900;
}

.center-action-text span {
  color:
    var(--text-muted);

  font-size: 8px;

  line-height: 1.45;

  font-weight: 700;

  overflow-wrap: anywhere;
}

.center-action-button > svg {
  flex-shrink: 0;

  color:
    var(--primary);

  transform:
    rotate(180deg);
}

/* =====================================================
CARDS
===================================================== */

.details-card {
  width: 100%;

  margin-top: 12px;

  padding:
    17px;

  border-radius: 22px;

  background:
    rgba(
      255,
      255,
      255,
      0.95
    );

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.08
    );

  box-shadow:
    0 10px 28px
    rgba(
      35,
      102,
      99,
      0.07
    );
}

.details-card h3 {
  margin:
    0 0 14px;

  color:
    var(--text-main);

  font-size: 15px;

  line-height: 1.4;

  font-weight: 900;
}

/* =====================================================
INFO ROW
===================================================== */

.info-item {
  display: flex;

  align-items: flex-start;

  gap: 10px;

  min-width: 0;
}

.info-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 13px;

  background:
    #e6f7f4;

  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;
}

.info-text {
  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 3px;

  padding-top: 1px;
}

.info-text span {
  color:
    var(--text-muted);

  font-size: 10px;

  line-height: 1.4;

  font-weight: 700;
}

.info-text strong,
.phone-value {
  margin: 0;

  padding: 0;

  border: 0;

  background: transparent;

  color:
    var(--text-main);

  font-family: inherit;

  font-size: 12px;

  line-height: 1.65;

  font-weight: 800;

  text-align: right;

  overflow-wrap: anywhere;
}

.phone-value {
  color:
    var(--primary-dark);

  cursor: pointer;

  text-decoration: none;
}

.phone-value:active {
  opacity: 0.7;
}

.info-divider {
  height: 1px;

  margin:
    12px 0;

  background:
    #e3eeeb;
}

/* =====================================================
SERVICES
===================================================== */

.services-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 8px;
}

.service-item {
  min-width: 0;

  min-height: 44px;

  padding:
    8px 9px;

  display: flex;

  align-items: center;

  gap: 6px;

  border-radius: 13px;

  background:
    #edf8f5;

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.06
    );

  color:
    #315f60;

  font-size: 10px;

  line-height: 1.45;

  font-weight: 800;
}

.service-item > span:last-child {
  overflow-wrap: anywhere;
}

.service-check {
  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;
}

/* =====================================================
LEAFLET MAP
===================================================== */

.map-card {
  width: 100%;

  margin-top: 22px;

  overflow: hidden;

  border-radius: 22px;

  background:
    #ffffff;

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      0.08
    );

  box-shadow:
    0 10px 28px
    rgba(
      35,
      102,
      99,
      0.07
    );
}

.real-map-wrapper {
  width: 100%;

  position: relative;

  overflow: hidden;

  background:
    #f1faf8;
}

.leaflet-map {
  width: 100%;
  height: 250px;

  z-index: 1;
}

/* =====================================================
CUSTOM MARKER
===================================================== */

.blood-center-marker {
  background: transparent !important;
  border: 0 !important;
}

.leaflet-marker-pin {
  width: 44px;
  height: 44px;

  border-radius:
    50% 50% 50% 0;

  background:
    #0aa88f;

  transform:
    rotate(-45deg);

  display: flex;

  align-items: center;

  justify-content: center;

  box-shadow:
    0 5px 14px
    rgba(
      10,
      168,
      143,
      0.30
    );
}

.leaflet-marker-icon {
  width: 28px;
  height: 28px;

  border-radius: 50%;

  background:
    #ffffff;

  color:
    #0aa88f;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 17px;

  font-weight: 900;

  transform:
    rotate(45deg);
}

/* =====================================================
POPUP
===================================================== */

.leaflet-popup-content-wrapper {
  border-radius: 14px;
}

.leaflet-popup-content {
  margin: 11px 13px;

  min-width: 150px;

  direction: rtl;

  text-align: right;

  font-family:
    "Tajawal",
    "Cairo",
    Arial,
    sans-serif;
}

.leaflet-popup-tip {
  background:
    #ffffff;
}

.leaflet-popup-content-custom {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.leaflet-popup-content-custom strong {
  color:
    #245b5d;

  font-size: 12px;

  font-weight: 900;
}

.leaflet-popup-content-custom span {
  color:
    #6b7c79;

  font-size: 9px;

  line-height: 1.5;

  font-weight: 700;
}

/* =====================================================
MAP LABEL
===================================================== */

.map-floating-label {
  position: relative;

  margin: 10px;

  padding:
    10px 12px;

  display: flex;

  align-items: center;

  gap: 8px;

  border-radius: 14px;

  background:
    #f1faf8;

  border:
    1px solid
    rgba(
      10,
      168,
      143,
      .10
    );

  color:
    var(--primary);
}

.map-floating-label > div {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 2px;
}

.map-floating-label strong {
  color:
    var(--text-main);

  font-size: 10px;

  line-height: 1.3;

  font-weight: 900;
}

.map-floating-label span {
  color:
    var(--text-muted);

  font-size: 8px;

  line-height: 1.4;

  font-weight: 700;

  overflow-wrap: anywhere;
}

/* =====================================================
DIRECTIONS
===================================================== */

.directions-button {
  width: 100%;

  min-height: 51px;

  border: 0;

  background:
    #ffffff;

  color:
    var(--primary-dark);

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  font-family: inherit;

  font-size: 12px;

  font-weight: 900;

  cursor: pointer;

  transition:
    background 0.18s ease;
}

.directions-button:active {
  background:
    var(--primary-light);
}

/* =====================================================
CALL BUTTON
===================================================== */

.call-button {
  width: 100%;

  min-height: 53px;

  margin-top: 12px;

  border: 0;

  border-radius: 17px;

  background:
    linear-gradient(
      135deg,
      #0aa88f,
      #078876
    );

  color: #ffffff;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  font-family: inherit;

  font-size: 13px;

  font-weight: 900;

  cursor: pointer;

  box-shadow:
    0 10px 23px
    rgba(
      10,
      168,
      143,
      0.18
    );

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.call-button:active {
  transform:
    scale(0.985);

  box-shadow:
    0 7px 16px
    rgba(
      10,
      168,
      143,
      0.12
    );
}

/* =====================================================
MODAL OVERLAY
===================================================== */

.form-overlay {
  position: fixed;

  inset: 0;

  z-index: 1000;

  padding:
    18px 12px;

  background:
    rgba(
      23,
      51,
      46,
      0.42
    );

  display: flex;

  align-items: center;

  justify-content: center;

  overflow-y: auto;

  backdrop-filter:
    blur(5px);

  -webkit-backdrop-filter:
    blur(5px);
}

/* =====================================================
MODAL
===================================================== */

.service-modal {
  width: 100%;

  max-width: 520px;

  max-height:
    calc(
      100dvh - 36px
    );

  overflow-y: auto;

  border-radius: 24px;

  background:
    #ffffff;

  box-shadow:
    0 22px 60px
    rgba(
      23,
      51,
      46,
      0.22
    );

  animation:
    modalIn
    0.18s ease;
}

.modal-header {
  position: sticky;

  top: 0;

  z-index: 2;

  padding:
    15px 16px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  background:
    rgba(
      255,
      255,
      255,
      0.97
    );

  border-bottom:
    1px solid
    #edf2f0;

  backdrop-filter:
    blur(12px);

  -webkit-backdrop-filter:
    blur(12px);
}

.modal-title-wrap {
  min-width: 0;

  display: flex;

  align-items: center;

  gap: 9px;
}

.modal-title-icon {
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  border-radius: 13px;

  background:
    #e6f7f4;

  color:
    var(--primary);

  display: flex;

  align-items: center;

  justify-content: center;
}

.blood-modal-icon {
  background:
    #edf8f5;
}

.modal-title-wrap h2 {
  margin: 0;

  color:
    var(--text-main);

  font-size: 15px;

  font-weight: 900;
}

.modal-title-wrap p {
  margin:
    2px 0 0;

  color:
    var(--text-muted);

  font-size: 9px;

  font-weight: 700;

  overflow-wrap: anywhere;
}

.modal-close {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  border: 0;

  border-radius: 12px;

  background:
    #f1f7f5;

  color:
    var(--text-muted);

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;
}

.modal-close:disabled {
  opacity: 0.5;

  cursor: default;
}

/* =====================================================
FORM
===================================================== */

.service-form {
  padding:
    16px;
}

.form-field {
  width: 100%;

  margin-bottom: 12px;

  display: flex;

  flex-direction: column;

  gap: 6px;
}

.form-field label {
  color:
    var(--text-main);

  font-size: 10px;

  font-weight: 900;
}

.form-field label span {
  color:
    var(--text-muted);

  font-weight: 600;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;

  min-height: 45px;

  padding:
    0 12px;

  border:
    1px solid
    #dceae6;

  border-radius: 13px;

  outline: none;

  background:
    #f8fcfb;

  color:
    var(--text-main);

  font-size: 11px;

  font-weight: 700;

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.form-field textarea {
  min-height: 82px;

  padding:
    10px 12px;

  resize: vertical;

  line-height: 1.6;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color:
    var(--primary);

  background:
    #ffffff;

  box-shadow:
    0 0 0 3px
    rgba(
      10,
      168,
      143,
      0.09
    );
}

.form-row {
  width: 100%;

  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 9px;
}

.form-error {
  margin:
    4px 0 10px;

  padding:
    10px 11px;

  border-radius: 12px;

  background:
    #fff1f1;

  border:
    1px solid
    #f5d7d7;

  color:
    #c54d4d;

  font-size: 10px;

  line-height: 1.55;

  font-weight: 800;
}

.form-success {
  margin:
    4px 0 10px;

  padding:
    10px 11px;

  display: flex;

  align-items: flex-start;

  gap: 6px;

  border-radius: 12px;

  background:
    #edf9f6;

  border:
    1px solid
    #d5eee8;

  color:
    var(--primary-dark);

  font-size: 10px;

  line-height: 1.6;

  font-weight: 800;
}

.form-success svg {
  flex-shrink: 0;

  margin-top: 1px;
}

.form-submit {
  width: 100%;

  min-height: 49px;

  margin-top: 2px;

  border: 0;

  border-radius: 15px;

  background:
    linear-gradient(
      135deg,
      #0aa88f,
      #078876
    );

  color:
    #ffffff;

  font-family: inherit;

  font-size: 12px;

  font-weight: 900;

  cursor: pointer;

  box-shadow:
    0 9px 20px
    rgba(
      10,
      168,
      143,
      0.16
    );
}

.form-submit:disabled {
  opacity: 0.65;

  cursor: default;
}

.request-note {
  margin:
    2px 0 12px;

  padding:
    9px 10px;

  display: flex;

  align-items: flex-start;

  gap: 7px;

  border-radius: 12px;

  background:
    #f4faf8;

  border:
    1px solid
    #e2efeb;
}

.request-note > span {
  width: 19px;
  height: 19px;

  flex-shrink: 0;

  border-radius: 50%;

  background:
    #e2f3ef;

  color:
    var(--primary-dark);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

  font-weight: 900;
}

.request-note p {
  margin: 0;

  color:
    var(--text-muted);

  font-size: 9px;

  line-height: 1.6;

  font-weight: 700;
}

/* =====================================================
LOADING / ERROR
===================================================== */

.loading-card,
.error-card {
  width: 100%;

  min-height: 280px;

  padding:
    30px 20px;

  border-radius: 23px;

  background:
    rgba(
      255,
      255,
      255,
      0.95
    );

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  text-align: center;

  box-shadow:
    0 10px 28px
    rgba(
      35,
      102,
      99,
      0.08
    );
}

.loading-spinner {
  width: 38px;
  height: 38px;

  border:
    3px solid
    #cce5df;

  border-top-color:
    var(--primary);

  border-radius: 50%;

  animation:
    bloodCenterSpin
    0.8s linear infinite;
}

.loading-card p {
  margin:
    14px 0 0;

  color:
    var(--text-muted);

  font-size: 12px;

  font-weight: 700;
}

.error-icon {
  width: 48px;
  height: 48px;

  border-radius: 50%;

  background:
    #fff0f0;

  color:
    #d85858;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  font-weight: 900;
}

.error-card h2 {
  margin:
    13px 0 6px;

  color:
    var(--text-main);

  font-size: 16px;

  font-weight: 900;
}

.error-card p {
  max-width: 340px;

  margin:
    0 0 18px;

  color:
    var(--text-muted);

  font-size: 11px;

  line-height: 1.7;

  font-weight: 600;
}

.primary-button {
  min-height: 44px;

  padding:
    0 18px;

  border: 0;

  border-radius: 13px;

  background:
    linear-gradient(
      135deg,
      var(--primary),
      var(--primary-dark)
    );

  color: #ffffff;

  font-family: inherit;

  font-size: 11px;

  font-weight: 900;

  cursor: pointer;
}

/* =====================================================
ANIMATION
===================================================== */

@keyframes bloodCenterSpin {
  to {
    transform:
      rotate(360deg);
  }
}

@keyframes modalIn {
  from {
    opacity: 0;

    transform:
      translateY(12px)
      scale(0.98);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }
}

/* =====================================================
TABLET
===================================================== */

@media (min-width: 601px) {

  .details-content {
    padding:
      24px 20px 40px;
  }

  .details-header {
    padding-left: 20px;
    padding-right: 20px;
  }

  .center-hero {
    padding: 22px;
  }

  .center-hero h2 {
    font-size: 20px;
  }

  .leaflet-map {
    height: 320px;
  }

}

/* =====================================================
MOBILE
===================================================== */

@media (max-width: 600px) {

  .details-content {
    width: 100%;
    max-width: 100%;

    margin: 0;

    padding:
      14px 12px 28px;
  }

  .details-header {
    min-height: 64px;
  }

  .details-header h1 {
    font-size: 17px;
  }

  .back-button {
    width: 42px;
    height: 42px;

    border-radius: 14px;
  }

  .center-hero {
    width: 100%;

    padding: 17px;

    border-radius: 23px;

    gap: 12px;
  }

  .center-icon {
    width: 64px;
    height: 64px;

    border-radius: 19px;
  }

  .center-icon svg {
    width: 38px;
    height: 38px;
  }

  .center-hero h2 {
    font-size: 17px;

    line-height: 1.5;
  }

  .center-type {
    font-size: 11px;
  }

  .hero-location {
    font-size: 10px;
  }

  .verified-badge {
    font-size: 9px;
  }

  .center-actions-card {
    padding: 14px;

    border-radius: 21px;
  }

  .center-actions-grid {
    grid-template-columns: 1fr;
  }

  .center-action-button {
    min-height: 72px;
  }

  .details-card {
    width: 100%;

    padding: 17px;

    border-radius: 21px;
  }

  .details-card h3 {
    font-size: 15px;
  }

  .info-item {
    gap: 10px;
  }

  .info-icon {
    width: 40px;
    height: 40px;

    border-radius: 13px;
  }

  .info-text span {
    font-size: 10px;
  }

  .info-text strong,
  .phone-value {
    font-size: 12px;
  }

  .map-card {
    width: 100%;

    margin-top: 22px;

    border-radius: 21px;
  }

  .real-map-wrapper {
    width: 100%;

    height: auto;
  }

  .leaflet-map {
    width: 100%;
    height: 250px;
  }

  .directions-button {
    min-height: 52px;

    font-size: 12px;
  }

  .call-button {
    min-height: 53px;

    margin-top: 12px;

    border-radius: 17px;

    font-size: 13px;
  }

  .form-overlay {
    align-items: flex-end;

    padding:
      8px;
  }

  .service-modal {
    max-height:
      calc(
        100dvh - 16px
      );

    border-radius:
      22px 22px 18px 18px;
  }
}

/* =====================================================
SMALL PHONES
===================================================== */

@media (max-width: 430px) {

  .details-content {
    padding-left: 11px;
    padding-right: 11px;
  }

  .center-hero {
    padding: 16px;

    border-radius: 22px;
  }

  .center-icon {
    width: 61px;
    height: 61px;

    border-radius: 18px;
  }

  .center-icon svg {
    width: 36px;
    height: 36px;
  }

  .center-hero h2 {
    font-size: 16px;
  }

  .details-card {
    padding: 16px;
  }

  .real-map-wrapper {
    height: auto;
  }

  .leaflet-map {
    height: 245px;
  }

  .service-form {
    padding:
      14px;
  }

  .modal-header {
    padding:
      13px 14px;
  }
}

/* =====================================================
VERY SMALL PHONES
===================================================== */

@media (max-width: 380px) {

  .details-content {
    padding-left: 9px;
    padding-right: 9px;
  }

  .details-header {
    padding-left: 10px;
    padding-right: 10px;
  }

  .details-header h1 {
    font-size: 16px;
  }

  .back-button {
    width: 40px;
    height: 40px;
  }

  .header-spacer {
    width: 40px;
    height: 40px;
  }

  .center-hero {
    padding: 14px;

    gap: 10px;

    border-radius: 20px;
  }

  .center-icon {
    width: 57px;
    height: 57px;

    border-radius: 17px;
  }

  .center-icon svg {
    width: 33px;
    height: 33px;
  }

  .center-hero h2 {
    font-size: 15px;
  }

  .center-type {
    font-size: 10px;
  }

  .hero-location {
    font-size: 9px;
  }

  .details-card {
    padding: 14px;

    border-radius: 19px;
  }

  .details-card h3 {
    font-size: 14px;
  }

  .info-icon {
    width: 38px;
    height: 38px;
  }

  .info-text strong,
  .phone-value {
    font-size: 11px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .real-map-wrapper {
    height: auto;
  }

  .leaflet-map {
    height: 230px;
  }

  .map-floating-label strong {
    font-size: 9px;
  }

  .map-floating-label span {
    font-size: 7px;
  }

  .call-button {
    min-height: 51px;

    font-size: 12px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .center-actions-title h3 {
    font-size: 13px;
  }
}

`;

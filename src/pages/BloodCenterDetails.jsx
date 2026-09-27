import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { api } from "../api.js";

/* ================= HELPERS ================= */

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
  };
}

/* ================= GEOCODING ================= */

/*
  لو المركز عنده lat/lng نستخدمهم مباشرة.

  لو مفيش:
  نبحث عن:
  اسم المركز + العنوان + المدينة + المحافظة + مصر

  باستخدام OpenStreetMap Nominatim.
*/

async function geocodeBloodCenter(center) {
  if (!center) {
    return null;
  }

  const directCoordinates =
    getCenterCoordinates(
      center
    );

  if (directCoordinates) {
    return directCoordinates;
  }

  const name =
    getCenterName(center);

  const address =
    getCenterAddress(center);

  const city =
    getCenterCity(center);

  const governorate =
    getCenterGovernorate(center);

  const queryParts = [
    name,
    address,
    city,
    governorate,
    "مصر",
  ].filter(
    (item) =>
      item &&
      String(item).trim()
  );

  const query =
    queryParts.join(", ");

  if (!query) {
    return null;
  }

  try {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?format=jsonv2` +
      `&q=${encodeURIComponent(query)}` +
      `&limit=1` +
      `&countrycodes=eg` +
      `&addressdetails=1`;

    const response =
      await fetch(url, {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
      });

    if (!response.ok) {
      throw new Error(
        `Geocoding failed: ${response.status}`
      );
    }

    const results =
      await response.json();

    if (
      !Array.isArray(results) ||
      results.length === 0
    ) {
      return null;
    }

    const result =
      results[0];

    const lat =
      Number(result?.lat);

    const lng =
      Number(result?.lon);

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
      source: "geocoded",
      displayName:
        result?.display_name ||
        "",
    };
  } catch (error) {
    console.error(
      "Blood center geocoding failed:",
      error
    );

    return null;
  }
}

/* ================= LEAFLET ICON ================= */

const centerMarkerIcon =
  new L.DivIcon({
    className:
      "blood-center-marker-wrapper",

    html: `
      <div class="blood-center-marker">
        <div class="blood-center-marker-heart">
          <svg
            width="27"
            height="27"
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
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    `,

    iconSize: [
      54,
      64,
    ],

    iconAnchor: [
      27,
      62,
    ],

    popupAnchor: [
      0,
      -57,
    ],
  });

/* ================= MAP CENTER CONTROLLER ================= */

function MapViewController({
  center,
}) {
  const map =
    useMap();

  useEffect(() => {
    if (!center) {
      return;
    }

    map.setView(
      [
        center.lat,
        center.lng,
      ],
      15,
      {
        animate: true,
      }
    );
  }, [
    center,
    map,
  ]);

  return null;
}

/* ================= ICONS ================= */

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

/* ================= MAIN ================= */

export default function BloodCenterDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

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
    mapCoordinates,
    setMapCoordinates,
  ] = useState(null);

  const [
    mapLoading,
    setMapLoading,
  ] = useState(false);

  const [
    mapError,
    setMapError,
  ] = useState("");

  /* ================= LOAD CENTER ================= */

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

        const data =
          await api.getBloodCenter(
            id
          );

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

  /* ================= DIRECT COORDINATES ================= */

  const directCoordinates =
    useMemo(
      () =>
        getCenterCoordinates(
          center
        ),
      [center]
    );

  /* ================= MAP GEOCODING ================= */

  useEffect(() => {
    let cancelled = false;

    async function resolveMapLocation() {
      if (!center) {
        return;
      }

      if (directCoordinates) {
        setMapCoordinates(
          directCoordinates
        );

        setMapLoading(false);
        setMapError("");

        return;
      }

      setMapLoading(true);
      setMapError("");
      setMapCoordinates(null);

      const result =
        await geocodeBloodCenter(
          center
        );

      if (cancelled) {
        return;
      }

      if (result) {
        setMapCoordinates(
          result
        );

        setMapError("");
      } else {
        setMapCoordinates(null);

        setMapError(
          "تعذر تحديد موقع المركز تلقائيًا من العنوان."
        );
      }

      setMapLoading(false);
    }

    resolveMapLocation();

    return () => {
      cancelled = true;
    };
  }, [
    center,
    directCoordinates,
  ]);

  /* ================= ACTIONS ================= */

  const handleCall =
    () => {
      const phone =
        getCenterPhone(
          center
        );

      if (!phone) {
        return;
      }

      window.location.href =
        `tel:${phone}`;
    };

  const handleDirections =
    () => {
      if (
        mapCoordinates
      ) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${mapCoordinates.lat},${mapCoordinates.lng}`,
          "_blank",
          "noopener,noreferrer"
        );

        return;
      }

      const address =
        getCenterAddress(
          center
        );

      if (
        address &&
        address !==
          "العنوان غير متوفر حاليًا"
      ) {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <>
        <style>
          {styles}
        </style>

        <div className="blood-center-page">
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

  /* ================= ERROR ================= */

  if (
    error ||
    !center
  ) {
    return (
      <>
        <style>
          {styles}
        </style>

        <div className="blood-center-page">
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

  /* ================= DATA ================= */

  const name =
    getCenterName(
      center
    );

  const type =
    getCenterType(
      center
    );

  const governorate =
    getCenterGovernorate(
      center
    );

  const city =
    getCenterCity(
      center
    );

  const address =
    getCenterAddress(
      center
    );

  const phone =
    getCenterPhone(
      center
    );

  const hours =
    getCenterHours(
      center
    );

  const distance =
    getCenterDistance(
      center
    );

  const services =
    getCenterServices(
      center
    );

  const verified =
    center?.verified ===
    true;

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
          {/* ================= HERO ================= */}

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
                {type}
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

          {/* ================= DISTANCE ================= */}

          {distance !== null && (
            <div className="distance-badge">
              <LocationIcon size={17} />

              <span>
                يبعد عنك{" "}
                <strong>
                  {distance.toFixed(
                    1
                  )}{" "}
                  كم
                </strong>
              </span>
            </div>
          )}

          {/* ================= INFO ================= */}

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

          {/* ================= SERVICES ================= */}

          {services.length >
            0 && (
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
                        <CheckIcon
                          size={18}
                        />
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

          {/* ================= REAL MAP ================= */}

          <section className="map-card">
            {mapLoading ? (
              <div className="map-loading">
                <div className="map-loading-spinner" />

                <h3>
                  جاري تحديد موقع المركز
                </h3>

                <p>
                  بنحدد موقع المركز من العنوان...
                </p>
              </div>
            ) : mapCoordinates ? (
              <div className="real-map-wrapper">
                <MapContainer
                  center={[
                    mapCoordinates.lat,
                    mapCoordinates.lng,
                  ]}
                  zoom={15}
                  scrollWheelZoom={true}
                  zoomControl={true}
                  className="blood-center-map"
                >
                  <MapViewController
                    center={
                      mapCoordinates
                    }
                  />

                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[
                      mapCoordinates.lat,
                      mapCoordinates.lng,
                    ]}
                    icon={
                      centerMarkerIcon
                    }
                  >
                    <Popup>
                      <div
                        className="map-popup"
                        dir="rtl"
                      >
                        <strong>
                          {name}
                        </strong>

                        <span>
                          {address}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>

                <div className="map-floating-label">
                  <LocationIcon size={17} />

                  <div>
                    <strong>
                      موقع المركز
                    </strong>

                    <span>
                      {address}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="map-unavailable">
                <div className="map-unavailable-icon">
                  <MapIcon size={30} />
                </div>

                <h3>
                  تعذر تحديد الموقع
                </h3>

                <p>
                  {mapError ||
                    "لا يمكن تحديد موقع المركز من بياناته الحالية."}
                </p>

                <span>
                  {address}
                </span>
              </div>
            )}

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

          {/* ================= CALL ================= */}

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
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = `
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  html {
    background: #edf4f2;
  }

  body {
    margin: 0;

    background:
      linear-gradient(
        180deg,
        #e8f1ef 0%,
        #edf4f2 38%,
        #f1f6f5 72%,
        #f4f8f7 100%
      );
  }

  .blood-center-page {
    --primary: #0aa88f;
    --primary-dark: #078876;
    --primary-light: #e6f7f4;

    --text-dark: #17332e;
    --text-main: #245b5d;
    --text-muted: #6b7c79;

    --bg: #edf4f2;
    --card: #ffffff;

    min-height: 100vh;

    background:
      linear-gradient(
        180deg,
        #e8f1ef 0%,
        #edf4f2 28%,
        #eff5f4 55%,
        #f2f7f6 78%,
        #f5f9f8 100%
      );

    color:
      var(--text-dark);

    font-family:
      "Tajawal",
      Arial,
      sans-serif;
  }

  /* ================= HEADER ================= */

  .details-header {
    min-height: 68px;

    padding:
      12px 18px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 12px;

    background:
      rgba(235, 244, 242, 0.96);

    border-bottom:
      1px solid
      rgba(10, 168, 143, 0.12);

    position: sticky;
    top: 0;
    z-index: 20;

    backdrop-filter:
      blur(14px);

    -webkit-backdrop-filter:
      blur(14px);

    box-shadow:
      0 4px 18px
      rgba(35, 102, 99, 0.05);
  }

  .details-header h1 {
    margin: 0;

    flex: 1;

    text-align: center;

    font-size: 17px;
    font-weight: 900;

    color:
      var(--text-dark);
  }

  .header-spacer {
    width: 40px;

    flex-shrink: 0;
  }

  .back-button {
    width: 40px;
    height: 40px;

    border: 0;

    border-radius: 13px;

    background:
      rgba(255, 255, 255, 0.82);

    color:
      var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition:
      0.2s ease;

    box-shadow:
      0 4px 12px
      rgba(35, 102, 99, 0.06);
  }

  .back-button:hover {
    background:
      white;
  }

  /* ================= CONTENT ================= */

  .details-content {
    width:
      min(100%, 680px);

    margin:
      0 auto;

    padding:
      18px 16px 34px;
  }

  /* ================= HERO ================= */

  .center-hero {
    display: flex;
    align-items: center;

    gap: 14px;

    padding: 20px;

    border-radius: 25px;

    background:
      linear-gradient(
        135deg,
        var(--primary) 0%,
        var(--primary-dark) 100%
      );

    box-shadow:
      0 14px 32px
      rgba(10, 168, 143, 0.17);
  }

  .center-icon {
    width: 72px;
    height: 72px;

    flex-shrink: 0;

    border-radius: 22px;

    background:
      rgba(255, 255, 255, 0.17);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .center-hero-info {
    min-width: 0;

    flex: 1;
  }

  .hero-title-row {
    display: flex;
    align-items: flex-start;

    flex-wrap: wrap;

    gap: 7px;
  }

  .center-hero h2 {
    margin: 0;

    color: white;

    font-size: 18px;
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
      rgba(255, 255, 255, 0.18);

    color: white;

    font-size: 10px;
    font-weight: 800;

    white-space: nowrap;
  }

  .center-type {
    display: block;

    margin-top: 4px;

    color:
      rgba(255, 255, 255, 0.88);

    font-size: 12px;
    font-weight: 700;
  }

  .hero-location {
    margin-top: 8px;

    display: flex;
    align-items: center;

    gap: 5px;

    color:
      rgba(255, 255, 255, 0.9);

    font-size: 11px;
    font-weight: 700;
  }

  /* ================= DISTANCE ================= */

  .distance-badge {
    margin:
      12px 0;

    padding:
      11px 14px;

    display: flex;
    align-items: center;

    gap: 7px;

    border-radius: 15px;

    background:
      #e8f2f0;

    color:
      var(--primary-dark);

    font-size: 12px;
    font-weight: 700;

    border:
      1px solid
      rgba(10, 168, 143, 0.08);
  }

  .distance-badge strong {
    font-weight: 900;
  }

  /* ================= INFO CARDS ================= */

  .details-card {
    margin-top: 13px;

    padding: 18px;

    border-radius: 22px;

    background:
      var(--card);

    border:
      1px solid
      rgba(10, 168, 143, 0.09);

    box-shadow:
      0 9px 26px
      rgba(35, 102, 99, 0.07);
  }

  .details-card h3 {
    margin:
      0 0 15px;

    color:
      var(--text-main);

    font-size: 14px;
    font-weight: 900;
  }

  .info-item {
    display: flex;
    align-items: flex-start;

    gap: 11px;
  }

  .info-icon {
    width: 38px;
    height: 38px;

    flex-shrink: 0;

    border-radius: 12px;

    background:
      var(--primary-light);

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

    gap: 4px;
  }

  .info-text span {
    color:
      var(--text-muted);

    font-size: 10px;
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

    line-height: 1.6;

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

  .info-divider {
    height: 1px;

    margin:
      13px 0;

    background:
      #e5eeec;
  }

  /* ================= SERVICES ================= */

  .services-grid {
    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap: 9px;
  }

  .service-item {
    min-height: 44px;

    padding:
      9px 10px;

    display: flex;
    align-items: center;

    gap: 6px;

    border-radius: 13px;

    background:
      #edf5f3;

    color:
      #315f60;

    font-size: 11px;
    font-weight: 800;

    line-height: 1.4;

    border:
      1px solid
      rgba(10, 168, 143, 0.05);
  }

  .service-check {
    color:
      var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
  }

  /* ================= MAP ================= */

  .map-card {
    margin-top: 13px;

    overflow: hidden;

    border-radius: 22px;

    background:
      var(--card);

    border:
      1px solid
      rgba(10, 168, 143, 0.09);

    box-shadow:
      0 9px 26px
      rgba(35, 102, 99, 0.07);
  }

  .real-map-wrapper {
    height: 270px;

    position: relative;

    overflow: hidden;
  }

  .blood-center-map {
    width: 100%;
    height: 100%;

    z-index: 1;

    font-family:
      "Tajawal",
      Arial,
      sans-serif;
  }

  .blood-center-map .leaflet-control-zoom {
    border: 0;

    box-shadow:
      0 4px 14px
      rgba(30, 80, 78, 0.12);
  }

  .blood-center-map
    .leaflet-control-zoom
    a {
    color:
      #245b5d;

    border: 0;

    font-weight: 900;
  }

  .blood-center-map
    .leaflet-control-attribution {
    font-size: 8px;

    background:
      rgba(255, 255, 255, 0.88);

    border-radius:
      7px 0 0 0;

    padding:
      2px 5px;
  }

  .blood-center-marker-wrapper {
    background: transparent;

    border: 0;
  }

  .blood-center-marker {
    width: 54px;
    height: 64px;

    position: relative;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    filter:
      drop-shadow(
        0 6px 8px
        rgba(10, 90, 80, 0.24)
      );
  }

  .blood-center-marker::after {
    content: "";

    position: absolute;

    bottom: 1px;
    left: 50%;

    width: 22px;
    height: 22px;

    transform:
      translateX(-50%)
      rotate(45deg);

    border-radius:
      5px;

    background:
      #078876;

    z-index: 0;
  }

  .blood-center-marker-heart {
    width: 50px;
    height: 50px;

    position: relative;

    z-index: 2;

    border-radius: 50%;

    background:
      linear-gradient(
        135deg,
        #0aa88f,
        #078876
      );

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
      0 5px 14px
      rgba(10, 168, 143, 0.28);
  }

  .map-floating-label {
    position: absolute;

    right: 12px;
    top: 12px;

    max-width:
      calc(100% - 24px);

    z-index: 5;

    padding:
      9px 11px;

    display: flex;
    align-items: flex-start;

    gap: 7px;

    border-radius: 13px;

    background:
      rgba(255, 255, 255, 0.94);

    box-shadow:
      0 6px 18px
      rgba(30, 80, 78, 0.10);

    color:
      var(--primary);

    backdrop-filter:
      blur(8px);

    -webkit-backdrop-filter:
      blur(8px);
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
    font-weight: 900;
  }

  .map-floating-label span {
    color:
      var(--text-muted);

    font-size: 8px;
    font-weight: 700;

    line-height: 1.4;

    overflow-wrap: anywhere;
  }

  .map-popup {
    min-width: 150px;

    display: flex;
    flex-direction: column;

    gap: 4px;

    font-family:
      "Tajawal",
      Arial,
      sans-serif;

    text-align: right;
  }

  .map-popup strong {
    color:
      #245b5d;

    font-size: 12px;
    font-weight: 900;
  }

  .map-popup span {
    color:
      #6b7c79;

    font-size: 10px;

    line-height: 1.5;
  }

  /* ================= MAP LOADING ================= */

  .map-loading {
    min-height: 220px;

    padding:
      24px 20px;

    background:
      linear-gradient(
        145deg,
        #e9f2f0,
        #eff6f4
      );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
  }

  .map-loading-spinner {
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

  .map-loading h3 {
    margin:
      12px 0 5px;

    color:
      var(--text-main);

    font-size: 13px;
    font-weight: 900;
  }

  .map-loading p {
    margin: 0;

    color:
      var(--text-muted);

    font-size: 10px;
    font-weight: 600;
  }

  /* ================= MAP UNAVAILABLE ================= */

  .map-unavailable {
    min-height: 220px;

    padding:
      24px 20px;

    background:
      linear-gradient(
        145deg,
        #e9f2f0,
        #eff6f4
      );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
  }

  .map-unavailable-icon {
    width: 58px;
    height: 58px;

    border-radius: 18px;

    background:
      white;

    color:
      var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
      0 7px 20px
      rgba(35, 102, 99, 0.08);
  }

  .map-unavailable h3 {
    margin:
      11px 0 5px;

    color:
      var(--text-main);

    font-size: 13px;
    font-weight: 900;
  }

  .map-unavailable p {
    max-width: 360px;

    margin:
      0 0 7px;

    color:
      var(--text-muted);

    font-size: 10px;

    line-height: 1.7;

    font-weight: 600;
  }

  .map-unavailable > span {
    max-width: 360px;

    color:
      var(--text-main);

    font-size: 9px;

    line-height: 1.6;

    font-weight: 800;

    overflow-wrap: anywhere;
  }

  .directions-button {
    width: 100%;

    min-height: 50px;

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

  .directions-button:hover {
    background:
      var(--primary-light);
  }

  /* ================= CALL BUTTON ================= */

  .call-button {
    width: 100%;

    min-height: 52px;

    margin-top: 13px;

    border: 0;

    border-radius: 17px;

    background:
      linear-gradient(
        135deg,
        var(--primary),
        var(--primary-dark)
      );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 7px;

    font-family: inherit;

    font-size: 13px;
    font-weight: 900;

    cursor: pointer;

    box-shadow:
      0 10px 22px
      rgba(10, 168, 143, 0.17);

    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .call-button:active {
    transform:
      scale(0.985);

    box-shadow:
      0 7px 16px
      rgba(10, 168, 143, 0.12);
  }

  /* ================= STATES ================= */

  .loading-card,
  .error-card {
    min-height: 280px;

    padding:
      30px 20px;

    border-radius: 24px;

    background:
      var(--card);

    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;

    text-align: center;

    box-shadow:
      0 9px 28px
      rgba(35, 102, 99, 0.08);
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

    color: white;

    font-family: inherit;

    font-size: 11px;
    font-weight: 900;

    cursor: pointer;
  }

  /* ================= ANIMATION ================= */

  @keyframes bloodCenterSpin {
    to {
      transform:
        rotate(360deg);
    }
  }

  /* ================= MOBILE ================= */

  @media (max-width: 430px) {
    .details-content {
      padding-left: 13px;
      padding-right: 13px;
    }

    .center-hero {
      padding: 16px;
      border-radius: 22px;
    }

    .center-icon {
      width: 62px;
      height: 62px;
      border-radius: 19px;
    }

    .center-hero h2 {
      font-size: 16px;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .real-map-wrapper {
      height: 245px;
    }

    .map-floating-label {
      right: 9px;
      top: 9px;

      max-width:
        calc(100% - 18px);
    }
  }
`;

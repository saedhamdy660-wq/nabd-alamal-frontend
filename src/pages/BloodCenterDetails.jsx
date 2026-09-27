import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { api } from "../api.js";

function HeartIcon({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 88C50 88 12 63 12 35C12 19 24 9 38 9C46 9 50 15 50 15C50 15 54 9 62 9C76 9 88 19 88 35C88 63 50 88 50 88Z"
        fill="#0aa88f"
      />
      <path
        d="M18 46H34L40 34L48 58L54 46H82"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function LocationIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 19 14.7 19 8.8C19 5.04 15.87 2 12 2C8.13 2 5 5.04 5 8.8C5 14.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="8.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.2 3.5L9.7 3C10.25 2.9 10.8 3.2 11 3.7L12.1 6.4C12.3 6.9 12.15 7.45 11.75 7.8L10.2 9.1C11.05 11.1 12.6 12.7 14.7 13.7L16 12.15C16.35 11.75 16.9 11.6 17.4 11.8L20.1 12.9C20.6 13.1 20.9 13.65 20.8 14.2L20.3 16.7C20.15 17.45 19.5 18 18.7 18C10.7 18 5.9 13.2 5.9 5.2C5.9 4.4 6.45 3.65 7.2 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ size = 20 }) {
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

function MapIcon({ size = 21 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18L3.8 20.2C3.4 20.37 3 20.08 3 19.64V5.05C3 4.73 3.19 4.45 3.48 4.33L9 2L15 4.5L20.52 2.17C20.92 2 21.33 2.29 21.33 2.72V17.95C21.33 18.27 21.14 18.55 20.85 18.67L15 21.13L9 18Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 2V18M15 4.5V21"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCenterName(center) {
  return (
    center?.name ||
    center?.centerName ||
    center?.title ||
    "مركز الدم"
  );
}

function getCenterType(center) {
  return (
    center?.type ||
    center?.centerType ||
    "مركز تبرع بالدم"
  );
}

function getCenterGovernorate(center) {
  return (
    center?.governorate ||
    center?.Governorate ||
    "المحافظة غير متوفرة"
  );
}

function getCenterCity(center) {
  return (
    center?.city ||
    center?.area ||
    center?.district ||
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
    center?.contact ||
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
    center?.distanceInKm;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function getCenterServices(center) {
  if (Array.isArray(center?.services)) {
    return center.services;
  }

  if (Array.isArray(center?.availableServices)) {
    return center.availableServices;
  }

  return [];
}

function getCenterCoordinates(center) {
  const lat = Number(
    center?.lat ??
      center?.latitude ??
      center?.location?.lat
  );

  const lng = Number(
    center?.lng ??
      center?.longitude ??
      center?.location?.lng
  );

  if (
    Number.isFinite(lat) &&
    Number.isFinite(lng)
  ) {
    return {
      lat,
      lng,
    };
  }

  return null;
}

export default function BloodCenterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCenter() {
      setLoading(true);
      setError("");

      try {
        const response = await api.getBloodCenter(id);

        if (!mounted) {
          return;
        }

        const data =
          response?.center ??
          response?.data ??
          response;

        setCenter(data);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err?.message ||
            "حدث خطأ أثناء تحميل بيانات المركز"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadCenter();
    } else {
      setLoading(false);
      setError("المركز غير موجود");
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const name = useMemo(
    () => getCenterName(center),
    [center]
  );

  const type = useMemo(
    () => getCenterType(center),
    [center]
  );

  const governorate = useMemo(
    () => getCenterGovernorate(center),
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

  const coordinates = useMemo(
    () => getCenterCoordinates(center),
    [center]
  );

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
        item !== "العنوان غير متوفر حاليًا"
    );

    return parts.join(", ");
  }, [
    name,
    address,
    city,
    governorate,
  ]);

  const googleMapUrl = useMemo(() => {
    if (coordinates) {
      return (
        "https://www.google.com/maps" +
        `?q=${coordinates.lat},${coordinates.lng}` +
        "&output=embed"
      );
    }

    if (!mapQuery) {
      return "";
    }

    return (
      "https://www.google.com/maps" +
      `?q=${encodeURIComponent(mapQuery)}` +
      "&output=embed"
    );
  }, [
    coordinates,
    mapQuery,
  ]);

  const handleDirections = () => {
    if (coordinates) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`,
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

  if (loading) {
    return (
      <div className="blood-center-page">
        <div className="details-shell">
          <header className="details-header">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
              aria-label="رجوع"
            >
              <ArrowIcon size={19} />
            </button>

            <h1>تفاصيل المركز</h1>

            <div className="header-spacer" />
          </header>

          <div className="details-loading">
            <div className="loading-spinner" />
            <p>جاري تحميل بيانات المركز...</p>
          </div>
        </div>

        <style>{styles}</style>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="blood-center-page">
        <div className="details-shell">
          <header className="details-header">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
              aria-label="رجوع"
            >
              <ArrowIcon size={19} />
            </button>

            <h1>تفاصيل المركز</h1>

            <div className="header-spacer" />
          </header>

          <div className="details-error">
            <div className="error-icon">!</div>

            <h2>تعذر تحميل المركز</h2>

            <p>
              {error ||
                "بيانات المركز غير متوفرة حاليًا."}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={() => navigate(-1)}
            >
              الرجوع للمراكز
            </button>
          </div>
        </div>

        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="blood-center-page">
      <div className="details-shell">
        <header className="details-header">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            <ArrowIcon size={19} />
          </button>

          <h1>تفاصيل المركز</h1>

          <div className="header-spacer" />
        </header>

        <main className="details-content">
          {/* Hero */}
          <section className="center-hero">
            <div className="center-icon">
              <HeartIcon size={46} />
            </div>

            <div className="center-hero-content">
              <div className="center-title-row">
                <h2>{name}</h2>

                {center?.verified && (
                  <span className="verified-badge">
                    <span className="verified-check">
                      ✓
                    </span>
                    موثّق
                  </span>
                )}
              </div>

              <div className="center-type">
                {type}
              </div>

              <div className="hero-location">
                <LocationIcon size={16} />

                <span>
                  {[city, governorate]
                    .filter(Boolean)
                    .join("، ")}
                </span>
              </div>
            </div>

            {distance !== null && (
              <div className="distance-badge">
                <strong>
                  {distance.toFixed(1)}
                </strong>
                <span>كم</span>
              </div>
            )}
          </section>

          {/* Basic Details */}
          <section className="details-card">
            <div className="details-card-header">
              <div className="section-icon">
                <LocationIcon size={20} />
              </div>

              <div>
                <h3>بيانات المركز</h3>
                <p>
                  المعلومات الأساسية للتواصل والوصول
                </p>
              </div>
            </div>

            <div className="info-list">
              <div className="info-row">
                <div className="info-icon">
                  <LocationIcon size={19} />
                </div>

                <div className="info-content">
                  <span className="info-label">
                    العنوان
                  </span>

                  <strong className="info-value">
                    {address}
                  </strong>
                </div>
              </div>

              {phone && (
                <div className="info-row">
                  <div className="info-icon">
                    <PhoneIcon size={19} />
                  </div>

                  <div className="info-content">
                    <span className="info-label">
                      رقم الهاتف
                    </span>

                    <a
                      href={`tel:${phone}`}
                      className="info-value phone-value"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {hours && (
                <div className="info-row">
                  <div className="info-icon">
                    <ClockIcon size={19} />
                  </div>

                  <div className="info-content">
                    <span className="info-label">
                      مواعيد العمل
                    </span>

                    <strong className="info-value">
                      {hours}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Services */}
          {services.length > 0 && (
            <section className="services-card">
              <div className="services-header">
                <div className="section-icon">
                  <HeartIcon size={22} />
                </div>

                <div>
                  <h3>الخدمات المتاحة</h3>
                  <p>
                    الخدمات التي يقدمها المركز
                  </p>
                </div>
              </div>

              <div className="services-list">
                {services.map(
                  (service, index) => (
                    <span
                      className="service-chip"
                      key={`${service}-${index}`}
                    >
                      ✓ {service}
                    </span>
                  )
                )}
              </div>
            </section>
          )}

          {/* Map */}
          <section className="map-card">
            <div className="map-header">
              <div className="map-header-icon">
                <MapIcon size={21} />
              </div>

              <div className="map-header-content">
                <h3>موقع المركز</h3>

                <p>
                  يمكنك مشاهدة موقع المركز على الخريطة
                  والوصول إليه بسهولة
                </p>
              </div>
            </div>

            {googleMapUrl ? (
              <div className="real-map-wrapper">
                <iframe
                  title={`موقع ${name}`}
                  src={googleMapUrl}
                  className="google-map-frame"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="map-floating-label">
                  <div className="map-floating-icon">
                    <LocationIcon size={17} />
                  </div>

                  <div>
                    <strong>موقع المركز</strong>

                    <span>
                      {address}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="map-unavailable">
                <div className="map-unavailable-icon">
                  <MapIcon size={28} />
                </div>

                <strong>
                  موقع الخريطة غير متوفر
                </strong>

                <span>
                  لا توجد بيانات كافية لعرض موقع المركز
                  حاليًا.
                </span>
              </div>
            )}

            {googleMapUrl && (
              <div className="map-footer">
                <div className="map-footer-info">
                  <LocationIcon size={18} />

                  <span>
                    {address}
                  </span>
                </div>

                <button
                  type="button"
                  className="directions-button"
                  onClick={handleDirections}
                >
                  <span>عرض الاتجاهات</span>

                  <ArrowIcon size={17} />
                </button>
              </div>
            )}
          </section>

          {/* Call */}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="call-button"
            >
              <PhoneIcon size={21} />

              <span>الاتصال بالمركز</span>
            </a>
          )}
        </main>
      </div>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  * {
    box-sizing: border-box;
  }

  html {
    background: #e8f1ef;
  }

  body {
    margin: 0;
    background:
      linear-gradient(
        180deg,
        #e6f0ee 0%,
        #ebf3f1 38%,
        #eff5f4 72%,
        #f3f7f6 100%
      );
  }

  .blood-center-page {
    --primary: #0aa88f;
    --primary-dark: #078876;
    --primary-soft: #dff2ed;
    --primary-pale: #edf8f5;

    --text-dark: #173c36;
    --text-main: #255a54;
    --text-muted: #71827f;

    --bg: #eaf2f0;
    --card: #fbfefd;

    min-height: 100vh;
    direction: rtl;
    font-family:
      "Tajawal",
      "Cairo",
      Arial,
      sans-serif;
    color: var(--text-dark);
    background:
      linear-gradient(
        180deg,
        #e6f0ee 0%,
        #ebf3f1 38%,
        #eff5f4 72%,
        #f3f7f6 100%
      );
  }

  .details-shell {
    width: min(100%, 620px);
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 28px;
  }

  .details-header {
    position: sticky;
    top: 0;
    z-index: 20;

    min-height: 64px;
    padding: 10px 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    background: rgba(239, 246, 244, 0.94);
    border-bottom: 1px solid
      rgba(37, 90, 84, 0.08);

    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .details-header h1 {
    margin: 0;

    color: #234f4a;

    font-size: 16px;
    font-weight: 900;
    letter-spacing: -0.2px;
  }

  .header-spacer,
  .back-button {
    width: 40px;
    height: 40px;
  }

  .back-button {
    border: 1px solid
      rgba(10, 168, 143, 0.13);

    border-radius: 13px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #28766d;
    background: #f8fcfb;

    cursor: pointer;

    transition:
      transform 0.18s ease,
      background 0.18s ease;
  }

  .back-button:hover {
    background: #edf8f5;
    transform: translateX(2px);
  }

  .details-content {
    padding: 16px 13px 30px;
  }

  /* =========================
     HERO
  ========================= */

  .center-hero {
    position: relative;

    display: flex;
    align-items: center;
    gap: 14px;

    padding: 18px;

    border-radius: 24px;

    background:
      linear-gradient(
        145deg,
        #ffffff 0%,
        #edf7f4 100%
      );

    border: 1px solid
      rgba(10, 168, 143, 0.12);

    box-shadow:
      0 12px 30px
      rgba(35, 92, 86, 0.09);
  }

  .center-icon {
    flex: 0 0 60px;

    width: 60px;
    height: 60px;

    border-radius: 19px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      linear-gradient(
        145deg,
        #e0f3ee,
        #d5eee8
      );

    border: 1px solid
      rgba(10, 168, 143, 0.12);

    box-shadow:
      inset 0 1px 0
      rgba(255, 255, 255, 0.9);
  }

  .center-hero-content {
    min-width: 0;
    flex: 1;
  }

  .center-title-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
  }

  .center-hero h2 {
    margin: 0;

    color: #173f3a;

    font-size: 19px;
    line-height: 1.5;
    font-weight: 900;

    overflow-wrap: anywhere;
  }

  .verified-badge {
    flex-shrink: 0;

    display: inline-flex;
    align-items: center;
    gap: 4px;

    padding: 4px 8px;

    border-radius: 999px;

    color: #087b6c;
    background: #e1f4ef;

    border: 1px solid
      rgba(8, 123, 108, 0.10);

    font-size: 9px;
    font-weight: 900;
  }

  .verified-check {
    width: 14px;
    height: 14px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    color: white;
    background: #0aa88f;

    font-size: 8px;
    font-weight: 900;
  }

  .center-type {
    margin-top: 4px;

    color: #66807b;

    font-size: 11px;
    line-height: 1.5;
    font-weight: 700;
  }

  .hero-location {
    margin-top: 7px;

    display: flex;
    align-items: center;
    gap: 5px;

    color: #168875;

    font-size: 10px;
    line-height: 1.5;
    font-weight: 800;
  }

  .hero-location span {
    overflow-wrap: anywhere;
  }

  .distance-badge {
    flex-shrink: 0;

    min-width: 50px;

    padding: 8px 7px;

    border-radius: 14px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #267064;
    background: #edf8f5;

    border: 1px solid
      rgba(10, 168, 143, 0.10);
  }

  .distance-badge strong {
    font-size: 14px;
    line-height: 1.1;
    font-weight: 900;
  }

  .distance-badge span {
    margin-top: 2px;

    font-size: 8px;
    font-weight: 800;
  }

  /* =========================
     DETAILS CARD
  ========================= */

  .details-card,
  .services-card {
    margin-top: 13px;

    padding: 17px;

    border-radius: 21px;

    background: rgba(251, 254, 253, 0.96);

    border: 1px solid
      rgba(37, 90, 84, 0.08);

    box-shadow:
      0 8px 25px
      rgba(35, 102, 99, 0.065);
  }

  .details-card-header,
  .services-header {
    display: flex;
    align-items: center;
    gap: 10px;

    padding-bottom: 14px;

    border-bottom: 1px solid
      rgba(37, 90, 84, 0.07);
  }

  .section-icon {
    width: 39px;
    height: 39px;

    flex: 0 0 39px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    color: #0a927d;
    background: #e8f6f2;
  }

  .details-card-header h3,
  .services-header h3,
  .map-header h3 {
    margin: 0;

    color: #285a55;

    font-size: 13px;
    font-weight: 900;
  }

  .details-card-header p,
  .services-header p,
  .map-header p {
    margin: 3px 0 0;

    color: #84918f;

    font-size: 9px;
    line-height: 1.5;
    font-weight: 600;
  }

  .info-list {
    padding-top: 2px;
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 11px;

    padding: 13px 0;

    border-bottom: 1px solid
      rgba(37, 90, 84, 0.055);
  }

  .info-row:last-child {
    border-bottom: none;
    padding-bottom: 2px;
  }

  .info-icon {
    width: 35px;
    height: 35px;

    flex: 0 0 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 11px;

    color: #148d7b;
    background: #edf8f5;
  }

  .info-content {
    min-width: 0;
    flex: 1;
  }

  .info-label {
    display: block;

    margin-bottom: 3px;

    color: #8a9795;

    font-size: 9px;
    font-weight: 700;
  }

  .info-value {
    display: block;

    color: #315b56;

    font-size: 11px;
    line-height: 1.65;
    font-weight: 800;

    overflow-wrap: anywhere;
  }

  .phone-value {
    color: #138773;
    text-decoration: none;
  }

  /* =========================
     SERVICES
  ========================= */

  .services-list {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;

    padding-top: 14px;
  }

  .service-chip {
    padding: 7px 10px;

    border-radius: 999px;

    color: #397069;
    background: #edf8f5;

    border: 1px solid
      rgba(10, 168, 143, 0.08);

    font-size: 9px;
    line-height: 1.3;
    font-weight: 800;
  }

  /* =========================
     MAP
  ========================= */

  .map-card {
    margin-top: 13px;

    overflow: hidden;

    border-radius: 23px;

    background: #fbfefd;

    border: 1px solid
      rgba(37, 90, 84, 0.09);

    box-shadow:
      0 10px 28px
      rgba(35, 102, 99, 0.08);
  }

  .map-header {
    min-height: 65px;

    padding: 12px 14px;

    display: flex;
    align-items: center;
    gap: 10px;

    background:
      linear-gradient(
        135deg,
        #f9fdfc 0%,
        #edf7f4 100%
      );

    border-bottom: 1px solid
      rgba(37, 90, 84, 0.07);
  }

  .map-header-icon {
    width: 40px;
    height: 40px;

    flex: 0 0 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 13px;

    color: #0b907b;
    background: #e0f3ee;

    border: 1px solid
      rgba(10, 168, 143, 0.10);
  }

  .map-header-content {
    min-width: 0;
  }

  .map-header h3 {
    font-size: 13px;
  }

  .map-header p {
    font-size: 9px;
  }

  .real-map-wrapper {
    height: 285px;

    position: relative;
    overflow: hidden;

    background: #e7efed;
  }

  .google-map-frame {
    width: 100%;
    height: 100%;

    display: block;

    border: 0;

    background: #e7efed;
  }

  .map-floating-label {
    position: absolute;

    right: 12px;
    top: 12px;

    max-width: calc(100% - 24px);

    z-index: 5;

    padding: 9px 10px;

    display: flex;
    align-items: flex-start;
    gap: 8px;

    border-radius: 14px;

    background: rgba(
      250,
      254,
      253,
      0.94
    );

    border: 1px solid
      rgba(37, 90, 84, 0.10);

    box-shadow:
      0 7px 20px
      rgba(25, 70, 67, 0.12);

    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }

  .map-floating-icon {
    width: 29px;
    height: 29px;

    flex: 0 0 29px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 9px;

    color: #0b927d;
    background: #e4f5f0;
  }

  .map-floating-label strong {
    display: block;

    margin-bottom: 2px;

    color: #285b55;

    font-size: 10px;
    font-weight: 900;
  }

  .map-floating-label span {
    display: block;

    color: #758481;

    font-size: 8px;
    line-height: 1.45;
    font-weight: 700;

    overflow-wrap: anywhere;
  }

  .map-unavailable {
    min-height: 285px;

    padding: 35px 25px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    color: #748581;

    background:
      radial-gradient(
        circle at center,
        #f1f8f6 0%,
        #e8f1ef 100%
      );
  }

  .map-unavailable-icon {
    width: 58px;
    height: 58px;

    margin-bottom: 11px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 18px;

    color: #0a907c;
    background: #dff2ed;
  }

  .map-unavailable strong {
    color: #3c625d;

    font-size: 12px;
    font-weight: 900;
  }

  .map-unavailable span {
    max-width: 280px;

    margin-top: 5px;

    color: #82908e;

    font-size: 9px;
    line-height: 1.6;
    font-weight: 600;
  }

  .map-footer {
    min-height: 61px;

    padding: 10px 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    background: #f9fcfb;

    border-top: 1px solid
      rgba(37, 90, 84, 0.07);
  }

  .map-footer-info {
    min-width: 0;

    display: flex;
    align-items: center;
    gap: 7px;

    color: #138773;
  }

  .map-footer-info span {
    min-width: 0;

    color: #687b77;

    font-size: 8.5px;
    line-height: 1.45;
    font-weight: 700;

    overflow-wrap: anywhere;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .directions-button {
    flex-shrink: 0;

    min-height: 37px;

    padding: 0 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    border: 1px solid
      rgba(10, 168, 143, 0.12);

    border-radius: 11px;

    color: #16816f;
    background: #eaf7f3;

    font-family: inherit;
    font-size: 9px;
    font-weight: 900;

    cursor: pointer;

    transition:
      background 0.18s ease,
      transform 0.18s ease;
  }

  .directions-button:hover {
    background: #dff2ed;
    transform: translateY(-1px);
  }

  /* =========================
     CALL
  ========================= */

  .call-button {
    min-height: 52px;

    margin-top: 13px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 17px;

    color: white;
    background:
      linear-gradient(
        135deg,
        #0aa88f,
        #078876
      );

    box-shadow:
      0 10px 24px
      rgba(10, 168, 143, 0.15);

    text-decoration: none;

    font-size: 12px;
    font-weight: 900;

    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .call-button:hover {
    transform: translateY(-1px);

    box-shadow:
      0 13px 28px
      rgba(10, 168, 143, 0.19);
  }

  /* =========================
     LOADING
  ========================= */

  .details-loading {
    min-height: 70vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #71827f;
  }

  .details-loading p {
    margin-top: 12px;

    font-size: 11px;
    font-weight: 700;
  }

  .loading-spinner {
    width: 35px;
    height: 35px;

    border: 3px solid
      #d9ebe6;

    border-top-color: #0aa88f;

    border-radius: 50%;

    animation:
      blood-center-spin
      0.8s linear infinite;
  }

  @keyframes blood-center-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* =========================
     ERROR
  ========================= */

  .details-error {
    margin: 55px 16px;

    padding: 30px 20px;

    text-align: center;

    border-radius: 22px;

    background: rgba(
      251,
      254,
      253,
      0.95
    );

    border: 1px solid
      rgba(37, 90, 84, 0.08);

    box-shadow:
      0 10px 28px
      rgba(35, 102, 99, 0.07);
  }

  .error-icon {
    width: 52px;
    height: 52px;

    margin: 0 auto 13px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    color: #b86b5f;
    background: #faece9;

    font-size: 22px;
    font-weight: 900;
  }

  .details-error h2 {
    margin: 0;

    color: #315b56;

    font-size: 15px;
    font-weight: 900;
  }

  .details-error p {
    margin: 7px auto 18px;

    max-width: 300px;

    color: #7a8986;

    font-size: 10px;
    line-height: 1.7;
    font-weight: 600;
  }

  .retry-button {
    min-height: 42px;

    padding: 0 17px;

    border: 0;
    border-radius: 13px;

    color: white;
    background: #0aa88f;

    font-family: inherit;
    font-size: 10px;
    font-weight: 900;

    cursor: pointer;
  }

  /* =========================
     MOBILE
  ========================= */

  @media (max-width: 480px) {
    .details-content {
      padding: 14px 11px 28px;
    }

    .center-hero {
      gap: 11px;
      padding: 15px;
      border-radius: 21px;
    }

    .center-icon {
      width: 54px;
      height: 54px;
      flex-basis: 54px;
      border-radius: 17px;
    }

    .center-hero h2 {
      font-size: 17px;
    }

    .distance-badge {
      min-width: 46px;
      padding: 7px 6px;
    }

    .distance-badge strong {
      font-size: 13px;
    }

    .details-card,
    .services-card {
      padding: 15px;
    }

    .real-map-wrapper {
      height: 245px;
    }

    .map-unavailable {
      min-height: 245px;
    }

    .map-footer {
      align-items: stretch;
      flex-direction: column;
    }

    .map-footer-info {
      width: 100%;
    }

    .directions-button {
      width: 100%;
    }
  }

  @media (max-width: 360px) {
    .center-hero {
      align-items: flex-start;
    }

    .center-icon {
      width: 49px;
      height: 49px;
      flex-basis: 49px;
    }

    .center-hero h2 {
      font-size: 15.5px;
    }

    .verified-badge {
      font-size: 8px;
    }

    .distance-badge {
      min-width: 42px;
    }
  }
`;

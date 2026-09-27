import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

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

function LocationIcon({ size = 22 }) {
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

function PhoneIcon({ size = 21 }) {
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

function ClockIcon({ size = 21 }) {
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

function ArrowIcon({ size = 20 }) {
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

function CheckIcon({ size = 18 }) {
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

export default function BloodCenterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCenter() {
      if (!id) {
        setError("المركز غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

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

  const handleCall = () => {
    const phone =
      getCenterPhone(center);

    if (!phone) {
      return;
    }

    window.location.href =
      `tel:${phone}`;
  };

  const handleDirections = () => {
    const lat = Number(
      center?.lat
    );

    const lng = Number(
      center?.lng
    );

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng)
    ) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    const address =
      getCenterAddress(center);

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

  if (loading) {
    return (
      <>
        <style>{styles}</style>

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

  if (error || !center) {
    return (
      <>
        <style>{styles}</style>

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

  const name =
    getCenterName(center);

  const type =
    getCenterType(center);

  const governorate =
    getCenterGovernorate(center);

  const city =
    getCenterCity(center);

  const address =
    getCenterAddress(center);

  const phone =
    getCenterPhone(center);

  const hours =
    getCenterHours(center);

  const distance =
    getCenterDistance(center);

  const services =
    getCenterServices(center);

  const verified =
    center?.verified === true;

  return (
    <>
      <style>{styles}</style>

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

          <section className="map-card">
            <div className="map-placeholder">
              <div className="map-pattern" />

              <div className="map-pin">
                <LocationIcon size={29} />
              </div>

              <div className="map-label">
                <span>
                  موقع المركز
                </span>

                <small>
                  {address}
                </small>
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
    background: #dff5f0;
  }

  body {
    margin: 0;
    background:
      linear-gradient(
        180deg,
        #dff5f0 0%,
        #e6f7f4 35%,
        #edf9f6 70%,
        #f2faf8 100%
      );
  }

  .blood-center-page {
    --primary: #0aa88f;
    --primary-dark: #078876;
    --primary-light: #e6f7f4;
    --text-dark: #17332e;
    --text-main: #245b5d;
    --text-muted: #6b7c79;
    --bg: #eaf8f5;
    --card: #ffffff;

    min-height: 100vh;

    background:
      linear-gradient(
        180deg,
        #dff5f0 0%,
        #e6f7f4 28%,
        #eaf8f5 55%,
        #edf9f7 78%,
        #f2faf8 100%
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
      rgba(223, 245, 240, 0.94);

    border-bottom:
      1px solid
      rgba(10, 168, 143, 0.14);

    position: sticky;
    top: 0;
    z-index: 20;

    backdrop-filter:
      blur(14px);

    -webkit-backdrop-filter:
      blur(14px);

    box-shadow:
      0 4px 18px
      rgba(10, 168, 143, 0.06);
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
      rgba(255, 255, 255, 0.72);

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
      rgba(10, 168, 143, 0.08);
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
      0 14px 35px
      rgba(10, 168, 143, 0.20);
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
      rgba(230, 247, 244, 0.95);

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
      rgba(10, 168, 143, 0.10);

    box-shadow:
      0 9px 28px
      rgba(35, 102, 99, 0.08);
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
      #e1f0ed;
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
      #e9f8f5;

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
      rgba(10, 168, 143, 0.10);

    box-shadow:
      0 9px 28px
      rgba(35, 102, 99, 0.08);
  }

  .map-placeholder {
    min-height: 190px;

    position: relative;

    overflow: hidden;

    background:
      linear-gradient(
        135deg,
        #dff5f0,
        #e6f7f4,
        #d9f2ed
      );
  }

  .map-pattern {
    position: absolute;

    inset: 0;

    opacity: 0.35;

    background-image:
      linear-gradient(
        90deg,
        transparent 48%,
        rgba(255, 255, 255, 0.9) 49%,
        transparent 51%
      ),
      linear-gradient(
        0deg,
        transparent 48%,
        rgba(255, 255, 255, 0.9) 49%,
        transparent 51%
      );

    background-size:
      48px 48px;

    transform:
      rotate(-12deg)
      scale(1.3);
  }

  .map-pin {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 58px;
    height: 58px;

    transform:
      translate(-50%, -50%);

    border-radius: 50%;

    background:
      white;

    color:
      var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
      0 9px 22px
      rgba(10, 168, 143, 0.25);
  }

  .map-label {
    position: absolute;

    right: 14px;
    bottom: 12px;

    max-width:
      calc(100% - 28px);

    padding:
      9px 11px;

    border-radius: 12px;

    background:
      rgba(255, 255, 255, 0.95);

    box-shadow:
      0 5px 16px
      rgba(30, 80, 78, 0.08);

    display: flex;
    flex-direction: column;

    gap: 2px;
  }

  .map-label span {
    color:
      var(--text-main);

    font-size: 11px;
    font-weight: 900;
  }

  .map-label small {
    color:
      var(--text-muted);

    font-size: 9px;

    line-height: 1.5;

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
      rgba(10, 168, 143, 0.20);

    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .call-button:active {
    transform:
      scale(0.985);

    box-shadow:
      0 7px 16px
      rgba(10, 168, 143, 0.14);
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
      #ccebe5;

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
  }
`;

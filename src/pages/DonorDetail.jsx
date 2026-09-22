import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

function getDonorInitial(name) {
  if (!name) return "م";

  return name
    .trim()
    .charAt(0);
}

function getLastDonationText(date) {
  if (!date) {
    return "آخر تبرع غير مسجل";
  }

  const donationDate =
    new Date(date);

  if (
    Number.isNaN(
      donationDate.getTime()
    )
  ) {
    return "آخر تبرع غير مسجل";
  }

  const today =
    new Date();

  const diffMs =
    today.getTime() -
    donationDate.getTime();

  const diffDays =
    Math.max(
      0,
      Math.floor(
        diffMs /
          (1000 *
            60 *
            60 *
            24)
      )
    );

  if (diffDays === 0) {
    return "آخر تبرع اليوم";
  }

  if (diffDays === 1) {
    return "آخر تبرع منذ يوم";
  }

  if (diffDays < 30) {
    return `آخر تبرع منذ ${diffDays} يوم`;
  }

  const months =
    Math.floor(
      diffDays / 30
    );

  if (months === 1) {
    return "آخر تبرع منذ شهر";
  }

  if (months < 12) {
    return `آخر تبرع منذ ${months} أشهر`;
  }

  const years =
    Math.floor(
      months / 12
    );

  if (years === 1) {
    return "آخر تبرع منذ سنة";
  }

  return `آخر تبرع منذ ${years} سنوات`;
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="9"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BloodIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3.5S6.5 9.8 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 9.8 12 3.5 12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M20 8.8c0 5.2-8 10-8 10s-8-4.8-8-10a4.2 4.2 0 0 1 8-1.7A4.2 4.2 0 0 1 20 8.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 3v4M16 3v4M4 9h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationSmallIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="9"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="18"
        cy="5"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="6"
        cy="12"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="18"
        cy="19"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 11l8-5M8 13l8 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 4h12v16H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M9 8h6M9 12h6M9 16h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getAvailabilityText(donor) {
  if (
    donor?.available === false
  ) {
    return "غير متاح حاليًا";
  }

  return "متاح للتبرع";
}

export default function DonorDetail() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [donor, setDonor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDonor() {
      if (!id) {
        setError(
          "رقم المتبرع غير موجود"
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
          مهم جدًا:
          هنا بنجيب المتبرع نفسه
          وليس طلب تبرع.
        */
        const data =
          await api.getDonor(id);

        if (cancelled) {
          return;
        }

        setDonor(data);
      } catch (err) {
        console.error(
          "خطأ أثناء تحميل بيانات المتبرع:",
          err
        );

        if (!cancelled) {
          setDonor(null);

          setError(
            err?.message ||
              "تعذر تحميل بيانات المتبرع"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDonor();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleShare =
    async () => {
      try {
        const donorName =
          donor?.name ||
          "متبرع بالدم";

        const bloodType =
          donor?.bloodType ||
          "غير محددة";

        if (
          navigator.share
        ) {
          await navigator.share({
            title:
              "ملف متبرع بالدم",

            text:
              `${donorName} - فصيلة الدم ${bloodType}`,

            url:
              window.location.href,
          });

          return;
        }

        if (
          navigator.clipboard
        ) {
          await navigator.clipboard.writeText(
            window.location.href
          );
        }
      } catch {
        // المستخدم ألغى المشاركة
      }
    };

  if (loading) {
    return (
      <div className="donor-page">
        <div className="loading">
          جارِ تحميل بيانات المتبرع...
        </div>

        <style>{`
          * {
            box-sizing: border-box;
          }

          .donor-page {
            min-height: 100vh;
            padding: 22px 18px 35px;
            direction: rtl;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #24575a;

            background:
              radial-gradient(
                circle at 10% 5%,
                rgba(70,193,177,.17),
                transparent 28%
              ),
              radial-gradient(
                circle at 95% 28%,
                rgba(154,231,216,.18),
                transparent 30%
              ),
              linear-gradient(
                160deg,
                #fbffff 0%,
                #f1fbfa 45%,
                #e8f7f4 100%
              );

            font-family:
              Arial,
              Tahoma,
              sans-serif;
          }

          .loading {
            color: #218d83;
            font-size: 16px;
            font-weight: 800;
          }
        `}</style>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="donor-page">
        <header className="donor-header">
          <button
            className="back-button"
            onClick={() =>
              navigate(-1)
            }
            aria-label="رجوع"
          >
            ←
          </button>

          <h1>
            تفاصيل المتبرع
          </h1>

          <button
            className="more-button"
            type="button"
          >
            ⋮
          </button>
        </header>

        <div className="error-card">
          <div className="error-icon">
            !
          </div>

          <strong>
            المتبرع غير موجود
          </strong>

          <p>
            {error ||
              "تعذر العثور على بيانات هذا المتبرع"}
          </p>
        </div>

        <button
          className="back-large-button"
          onClick={() =>
            navigate(-1)
          }
        >
          العودة
        </button>

        <style>{`
          * {
            box-sizing: border-box;
          }

          .donor-page {
            min-height: 100vh;
            padding: 22px 18px 35px;
            direction: rtl;

            color: #24575a;

            background:
              radial-gradient(
                circle at 10% 5%,
                rgba(70,193,177,.17),
                transparent 28%
              ),
              radial-gradient(
                circle at 95% 28%,
                rgba(154,231,216,.18),
                transparent 30%
              ),
              linear-gradient(
                160deg,
                #fbffff 0%,
                #f1fbfa 45%,
                #e8f7f4 100%
              );

            font-family:
              Arial,
              Tahoma,
              sans-serif;
          }

          .donor-header {
            max-width: 520px;
            margin: 0 auto 20px;

            display: grid;
            grid-template-columns: 44px 1fr 44px;
            align-items: center;
          }

          .donor-header h1 {
            margin: 0;
            text-align: center;
            color: #218d83;
            font-size: 23px;
            font-weight: 800;
          }

          .back-button,
          .more-button {
            width: 42px;
            height: 42px;

            border: 1px solid rgba(255,255,255,.9);
            border-radius: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #218d83;
            background: rgba(255,255,255,.72);

            box-shadow:
              0 7px 18px rgba(35,139,128,.08),
              inset 0 1px 0 rgba(255,255,255,.9);

            cursor: pointer;
          }

          .back-button {
            font-size: 25px;
          }

          .more-button {
            font-size: 25px;
          }

          .error-card {
            max-width: 520px;
            margin: 30px auto 16px;
            padding: 25px 20px;

            text-align: center;

            border-radius: 25px;

            background:
              linear-gradient(
                145deg,
                rgba(255,255,255,.9),
                rgba(255,239,243,.82)
              );

            border: 1px solid rgba(255,255,255,.95);

            box-shadow:
              0 12px 30px rgba(42,128,128,.08);
          }

          .error-icon {
            width: 52px;
            height: 52px;

            margin: 0 auto 12px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            color: white;
            background: #c05267;

            font-size: 25px;
            font-weight: 900;
          }

          .error-card strong {
            display: block;

            color: #286d6d;

            font-size: 16px;
          }

          .error-card p {
            margin: 8px 0 0;

            color: #88a3a2;

            font-size: 12px;
            line-height: 1.7;
          }

          .back-large-button {
            width: 100%;
            max-width: 520px;
            min-height: 56px;

            margin: 0 auto;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 0;
            border-radius: 30px;

            color: white;

            background:
              linear-gradient(
                135deg,
                #19ad98,
                #159b8a
              );

            font-size: 17px;
            font-weight: 800;

            cursor: pointer;

            box-shadow:
              0 10px 22px rgba(21,155,138,.16);
          }
        `}</style>
      </div>
    );
  }

  const donorName =
    donor.name ||
    "متبرع بالدم";

  const bloodType =
    donor.bloodType ||
    donor.bloodGroup ||
    "غير محددة";

  const avatar =
    donor.avatar ||
    donor.image ||
    donor.photo ||
    "";

  const available =
    donor.available !== false;

  const availabilityText =
    getAvailabilityText(
      donor
    );

  const distance =
    donor.distanceKm;

  const donationsCount =
    Number(
      donor.donationsCount || 0
    );

  const lastDonationText =
    getLastDonationText(
      donor.lastDonation
    );

  const donorLat =
    donor.lat ??
    donor.latitude;

  const donorLng =
    donor.lng ??
    donor.longitude;

  const hasCoordinates =
    Number.isFinite(
      Number(donorLat)
    ) &&
    Number.isFinite(
      Number(donorLng)
    );

  const directionsUrl =
    hasCoordinates
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          Number(donorLat)
        )},${encodeURIComponent(
          Number(donorLng)
        )}`
      : "";

  return (
    <div className="donor-page">

      {/* Header */}
      <header className="donor-header">
        <button
          className="back-button"
          onClick={() =>
            navigate(-1)
          }
          aria-label="رجوع"
        >
          ←
        </button>

        <h1>
          تفاصيل المتبرع
        </h1>

        <button
          className="more-button"
          type="button"
        >
          ⋮
        </button>
      </header>

      {/* Donor Main Card */}
      <section className="donor-card">

        <div
          className="donor-avatar"
          style={{
            backgroundImage:
              avatar
                ? `url(${avatar})`
                : "none",
          }}
        >
          {!avatar &&
            getDonorInitial(
              donorName
            )}
        </div>

        <h2>
          {donorName}
        </h2>

        <div className="donor-meta">

          <span className="blood-badge">
            🩸 {bloodType}
          </span>

          <span
            className={
              available
                ? "availability available"
                : "availability unavailable"
            }
          >
            <span className="status-dot" />
            {availabilityText}
          </span>

        </div>

      </section>

      {/* Main Information */}
      <section className="info-card">

        {/* Blood Type */}
        <div className="info-row">

          <div className="info-value">
            <strong>
              فصيلة الدم
            </strong>

            <span>
              {bloodType}
            </span>
          </div>

          <div className="info-icon">
            <BloodIcon />
          </div>

        </div>

        <div className="info-divider" />

        {/* Availability */}
        <div className="info-row">

          <div className="info-value">
            <strong>
              حالة التبرع
            </strong>

            <span>
              {availabilityText}
            </span>
          </div>

          <div className="info-icon">
            <HeartIcon />
          </div>

        </div>

        <div className="info-divider" />

        {/* Last Donation */}
        <div className="info-row">

          <div className="info-value">
            <strong>
              آخر تبرع
            </strong>

            <span>
              {lastDonationText}
            </span>
          </div>

          <div className="info-icon">
            <CalendarIcon />
          </div>

        </div>

        <div className="info-divider" />

        {/* Donations Count */}
        <div className="info-row">

          <div className="info-value">
            <strong>
              عدد مرات التبرع
            </strong>

            <span>
              {donationsCount}{" "}
              {donationsCount === 1
                ? "مرة"
                : "مرات"}
            </span>
          </div>

          <div className="info-icon">
            <HeartIcon />
          </div>

        </div>

        {/* Distance */}
        {distance !== null &&
          distance !== undefined &&
          Number.isFinite(
            Number(distance)
          ) && (
            <>
              <div className="info-divider" />

              <div className="info-row">

                <div className="info-value">
                  <strong>
                    المسافة
                  </strong>

                  <span>
                    على بعد{" "}
                    {distance} كم
                  </span>
                </div>

                <div className="info-icon">
                  <LocationIcon />
                </div>

              </div>
            </>
          )}

      </section>

      {/* Location */}
      {directionsUrl && (
        <a
          className="location-button"
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <LocationIcon />

          <span>
            عرض موقع المتبرع
          </span>
        </a>
      )}

      {/* Availability Message */}
      <section
        className={
          available
            ? "status-card"
            : "status-card unavailable-card"
        }
      >

        <div
          className={
            available
              ? "status-icon"
              : "status-icon unavailable-status-icon"
          }
        >
          {available
            ? "✓"
            : "!"}
        </div>

        <div>
          <strong>
            {available
              ? "المتبرع متاح للتبرع"
              : "المتبرع غير متاح حاليًا"}
          </strong>

          <p>
            {available
              ? "يمكنك الرجوع للصفحة السابقة واختيار المتبرع إذا كنت تحتاج إلى التبرع بالدم."
              : "المتبرع مرتبط حاليًا بطلب تبرع آخر أو غير متاح للتبرع."}
          </p>
        </div>

      </section>

      {/* Actions */}
      <section className="actions-card">

        <button
          className="action-button"
          onClick={
            handleShare
          }
        >
          <ShareIcon />

          <span>
            مشاركة
          </span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <HeartIcon />

          <span>
            مفضلة
          </span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <ReportIcon />

          <span>
            إبلاغ
          </span>
        </button>

      </section>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .donor-page {
          min-height: 100vh;

          padding:
            22px
            18px
            35px;

          direction: rtl;

          color: #24575a;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70,193,177,.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154,231,216,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

        .donor-header {
          max-width: 520px;

          margin:
            0
            auto
            20px;

          display: grid;

          grid-template-columns:
            44px
            1fr
            44px;

          align-items: center;
        }

        .donor-header h1 {
          margin: 0;

          text-align: center;

          color: #218d83;

          font-size: 23px;

          font-weight: 800;
        }

        .back-button,
        .more-button {
          width: 42px;
          height: 42px;

          border:
            1px solid
            rgba(255,255,255,.9);

          border-radius: 14px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          background:
            rgba(255,255,255,.72);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          cursor: pointer;
        }

        .back-button {
          font-size: 25px;
        }

        .more-button {
          font-size: 25px;
        }

        .donor-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding:
            28px
            18px
            25px;

          text-align: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(226,249,245,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px
              rgba(42,128,128,.09),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);
        }

        .donor-avatar {
          width: 108px;
          height: 108px;

          margin:
            0
            auto
            15px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          font-size: 42px;

          font-weight: 800;

          background:
            linear-gradient(
              145deg,
              #dff8f3,
              #bcece3
            );

          border:
            6px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 8px 25px
              rgba(35,139,128,.13),
            inset 0 1px 8px
              rgba(255,255,255,.8);

          background-size: cover;

          background-position: center;
        }

        .donor-card h2 {
          margin:
            0
            0
            13px;

          color: #286d6d;

          font-size: 23px;
        }

        .donor-meta {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 10px;

          flex-wrap: wrap;
        }

        .blood-badge {
          padding:
            8px
            16px;

          border-radius: 18px;

          color: #c05267;

          background: #ffe7ed;

          font-size: 16px;

          font-weight: 800;
        }

        .availability {
          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding:
            8px
            13px;

          border-radius: 18px;

          font-size: 12px;

          font-weight: 800;
        }

        .availability.available {
          color: #159b8a;

          background: #e1f8f3;
        }

        .availability.unavailable {
          color: #a75b69;

          background: #ffe7ed;
        }

        .status-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: currentColor;
        }

        .info-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding:
            5px
            16px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .info-row {
          min-height: 70px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 15px;
        }

        .info-value {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 4px;

          color: #4f7e7f;

          font-size: 14px;

          font-weight: 700;
        }

        .info-value strong {
          color: #286d6d;

          font-size: 13px;

          font-weight: 800;
        }

        .info-value span {
          color: #88a3a2;

          font-size: 12px;

          font-weight: 700;
        }

        .info-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background: #dff7f2;
        }

        .info-icon svg {
          width: 21px;
          height: 21px;
        }

        .info-divider {
          height: 1px;

          background:
            rgba(
              124,
              184,
              177,
              .18
            );
        }

        .location-button {
          width: 100%;

          max-width: 520px;

          min-height: 56px;

          margin:
            0
            auto
            16px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          border-radius: 30px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 16px;

          font-weight: 800;

          text-decoration: none;

          box-shadow:
            0 10px 22px
              rgba(21,155,138,.16);
        }

        .location-button svg {
          width: 22px;
          height: 22px;
        }

        .status-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding: 18px;

          display: flex;

          align-items: center;

          gap: 13px;

          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .status-icon {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background: #19ad98;

          font-size: 24px;

          font-weight: 900;
        }

        .unavailable-status-icon {
          background: #c05267;
        }

        .status-card strong {
          display: block;

          color: #286d6d;

          font-size: 14px;

          font-weight: 800;
        }

        .status-card p {
          margin:
            6px
            0
            0;

          color: #88a3a2;

          font-size: 11px;

          line-height: 1.7;
        }

        .unavailable-card {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(255,239,243,.8)
            );
        }

        .actions-card {
          max-width: 520px;

          margin:
            0
            auto
            20px;

          padding: 8px;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 7px;

          border-radius: 22px;

          background:
            rgba(255,255,255,.78);

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 10px 26px
              rgba(42,128,128,.07);
        }

        .action-button {
          min-height: 62px;

          border: 0;

          border-radius: 17px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 5px;

          color: #6e9291;

          background: transparent;

          font-size: 10px;

          font-weight: 800;

          cursor: pointer;
        }

        .action-button svg {
          width: 21px;
          height: 21px;
        }

        .loading {
          min-height: 100vh;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          font-size: 16px;

          font-weight: 800;
        }

        @media (max-width: 380px) {

          .donor-page {
            padding-left: 13px;
            padding-right: 13px;
          }

          .donor-card h2 {
            font-size: 20px;
          }

          .info-value strong {
            font-size: 12px;
          }

          .info-value span {
            font-size: 11px;
          }

          .status-card {
            padding: 15px;
          }

          .status-icon {
            width: 45px;
            height: 45px;
          }

          .status-card p {
            font-size: 10px;
          }

        }

      `}</style>
    </div>
  );
}

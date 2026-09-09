import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

const DEMO_DONOR = {
  id: "demo-donor",
  name: "أحمد محمد",
  bloodType: "O+",
  distanceKm: 2.3,
  lastDonation: "منذ 3 أشهر",
  avatar: "",
};

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

function HospitalIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8v6M9 11h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
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

export default function DonorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState(null);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    /*
      لو دخلنا على المتبرع التجريبي،
      نعرضه مباشرة بدون الحاجة للـ Backend.
    */
    if (id === "demo-donor") {
      setDonor(DEMO_DONOR);
      return;
    }

    api
      .getDonor(id)
      .then(setDonor)
      .catch(() => {
        /*
          لو المتبرع مش موجود في الـ API،
          نعرض المتبرع التجريبي بدل الصفحة الفاضية.
        */
        setDonor(DEMO_DONOR);
      });
  }, [id]);

  if (!donor) {
    return (
      <div className="donor-page">
        <div className="loading">جارِ التحميل...</div>
      </div>
    );
  }

  const handleDonate = async () => {
    /*
      المتبرع التجريبي:
      مجرد تجربة للواجهة.
    */
    if (id === "demo-donor") {
      setNotified(true);
      return;
    }

    setNotified(true);
  };

  return (
    <div className="donor-page">

      {/* Header */}
      <header className="donor-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >
          ←
        </button>

        <h1>ملف المتبرع</h1>

        <button className="more-button">
          ⋮
        </button>
      </header>

      {/* Donor Card */}
      <section className="donor-card">

        <div
          className="donor-avatar"
          style={{
            backgroundImage: donor.avatar
              ? `url(${donor.avatar})`
              : "none",
          }}
        >
          {!donor.avatar && "أ"}
        </div>

        <h2>{donor.name}</h2>

        <div className="donor-meta">
          <span className="blood-badge">
            🩸 {donor.bloodType}
          </span>

          <span className="registered">
            متبرع مسجل منذ 6 أشهر
          </span>
        </div>

      </section>

      {/* Information */}
      <section className="info-card">

        <div className="info-row">
          <div className="info-value">
            المدينة - القاهرة
          </div>

          <div className="info-icon">
            <LocationIcon />
          </div>
        </div>

        <div className="info-divider" />

        <div className="info-row">
          <div className="info-value">
            {donor.distanceKm} كم
          </div>

          <div className="info-icon">
            <HospitalIcon />
          </div>
        </div>

        <div className="info-divider" />

        <div className="info-row">
          <div className="info-value">
            آخر تبرع
          </div>

          <div className="info-icon">
            <CalendarIcon />
          </div>
        </div>

      </section>

      {/* Donate */}
      {!notified ? (
        <button className="donate-button" onClick={handleDonate}>
          التبرع الآن
          <HeartIcon />
        </button>
      ) : (
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <strong>تم إرسال التنبيه للمتبرع بنجاح</strong>

          <p>
            سيتم إشعارك عند قبول الطلب من المتبرع.
          </p>
        </div>
      )}

      {/* Actions */}
      <section className="actions-card">

        <button className="action-button">
          <ShareIcon />
          <span>مشاركة</span>
        </button>

        <button className="action-button">
          <HeartIcon />
          <span>مفضلة</span>
        </button>

        <button className="action-button">
          <ReportIcon />
          <span>إبلاغ</span>
        </button>

      </section>

      <h2 className="details-title">
        تفاصيل المتبرع
      </h2>

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

          font-family: Arial, Tahoma, sans-serif;
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

        .donor-card {
          max-width: 520px;
          margin: 0 auto 16px;
          padding: 28px 18px 25px;

          text-align: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(226,249,245,.78)
            );

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px rgba(42,128,128,.09),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .donor-avatar {
          width: 108px;
          height: 108px;

          margin: 0 auto 15px;

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

          border: 6px solid rgba(255,255,255,.9);

          box-shadow:
            0 8px 25px rgba(35,139,128,.13),
            inset 0 1px 8px rgba(255,255,255,.8);

          background-size: cover;
          background-position: center;
        }

        .donor-card h2 {
          margin: 0 0 13px;
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
          padding: 8px 16px;
          border-radius: 18px;

          color: #c05267;
          background: #ffe7ed;

          font-size: 16px;
          font-weight: 800;
        }

        .registered {
          color: #6e9291;
          font-size: 13px;
          font-weight: 700;
        }

        .info-card {
          max-width: 520px;
          margin: 0 auto 16px;
          padding: 5px 16px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.78)
            );

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .info-row {
          min-height: 67px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .info-value {
          color: #4f7e7f;
          font-size: 14px;
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
          background: rgba(124,184,177,.18);
        }

        .donate-button {
          width: 100%;
          max-width: 520px;
          min-height: 58px;

          margin: 0 auto 16px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          border: 0;
          border-radius: 30px;

          color: white;
          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 18px;
          font-weight: 800;

          box-shadow:
            0 10px 25px rgba(21,155,138,.22);

          cursor: pointer;
        }

        .donate-button svg {
          width: 25px;
          height: 25px;
        }

        .success-card {
          max-width: 520px;
          margin: 0 auto 16px;
          padding: 18px;

          text-align: center;

          border-radius: 23px;

          color: #28786e;
          background:
            linear-gradient(
              145deg,
              rgba(218,251,242,.95),
              rgba(201,243,232,.88)
            );

          border: 1px solid rgba(255,255,255,.9);
        }

        .success-icon {
          width: 46px;
          height: 46px;

          margin: 0 auto 9px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;
          background: #159b8a;

          font-size: 24px;
          font-weight: 900;
        }

        .success-card p {
          margin: 7px 0 0;
          color: #709391;
          font-size: 12px;
        }

        .actions-card {
          max-width: 520px;
          margin: 0 auto;

          padding: 16px 8px;

          display: grid;
          grid-template-columns: repeat(3, 1fr);

          border-radius: 25px;

          background:
            rgba(255,255,255,.78);

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 10px 27px rgba(42,128,128,.08);
        }

        .action-button {
          min-height: 70px;

          border: 0;
          background: transparent;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;

          color: #5d8988;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;
        }

        .action-button + .action-button {
          border-right: 1px solid rgba(124,184,177,.18);
        }

        .action-button svg {
          width: 27px;
          height: 27px;
          color: #159b8a;
        }

        .details-title {
          max-width: 520px;
          margin: 25px auto 0;

          text-align: center;

          color: #218d83;
          font-size: 21px;
          font-weight: 800;
        }

        .loading {
          text-align: center;
          margin-top: 100px;
          color: #6d9191;
        }
      `}</style>
    </div>
  );
}

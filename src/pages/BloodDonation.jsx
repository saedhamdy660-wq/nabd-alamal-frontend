import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-9.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RequestsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 9h7M8.5 13h7M8.5 17h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 20h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DonorRow({ donor, onClick }) {
  return (
    <button className="donor-row" onClick={onClick}>
      <div className="donor-avatar-small">
        {donor.avatar ? (
          <img src={donor.avatar} alt={donor.name} />
        ) : (
          "أ"
        )}
      </div>

      <div className="donor-info">
        <strong>{donor.name}</strong>

        <span>
          على بعد {donor.distanceKm} كم
        </span>
      </div>

      <div className="blood-badge">
        🩸 {donor.bloodType}
      </div>

      <div className="donor-arrow">
        ←
      </div>
    </button>
  );
}

export default function BloodDonation() {
  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getBloodRequests()
      .then(setRequests)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const loadDonors = () => {
      api
        .getNearbyDonors()
        .then((data) => {
          /*
            لو مفيش متبرعين حقيقيين،
            نعرض أحمد محمد كمتبرع تجريبي.
          */
          if (Array.isArray(data) && data.length > 0) {
            setDonors(data);
          } else {
            setDonors([DEMO_DONOR]);
          }
        })
        .catch(() => {
          setDonors([DEMO_DONOR]);
        });
    };

    loadDonors();

    const interval = setInterval(loadDonors, 5000);

    return () => clearInterval(interval);
  }, []);

  const joinDonation = async (id) => {
    try {
      await api.respondToRequest(id);
    } catch (error) {}

    navigate(`/track/${id}`);
  };

  return (
    <div className="blood-page">

      {/* Header */}
      <header className="blood-header">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h1>التبرع بالدم والصفائح</h1>

        <button className="more-button">
          ⋮
        </button>

      </header>

      {/* Tabs */}
      <div className="tabs-card">

        <button
          className={
            tab === "urgent"
              ? "tab active"
              : "tab"
          }
          onClick={() => setTab("urgent")}
        >
          حالات طارئة
        </button>

        <button
          className={
            tab === "donors"
              ? "tab active"
              : "tab"
          }
          onClick={() => setTab("donors")}
        >
          متبرعين مسجلين
        </button>

      </div>

      {/* Emergency */}
      {tab === "urgent" && (
        <>
          <section className="section-title">
            <div>
              <h2>الحالات الطارئة</h2>
              <p>حالات تحتاج إلى متبرعين الآن</p>
            </div>

            <div className="section-icon">
              <BloodIcon />
            </div>
          </section>

          {requests.length === 0 && (
            <div className="empty-card">
              <div className="empty-icon">
                <BloodIcon />
              </div>

              <strong>
                لا توجد حالات طارئة حاليًا
              </strong>

              <p>
                سيتم عرض الحالات هنا عند وجود طلب جديد.
              </p>
            </div>
          )}

          {requests.map((request) => (
            <div
              key={request.id}
              className="emergency-card"
            >
              <div className="emergency-top">

                <div className="blood-large">
                  {request.bloodType}
                </div>

                <div className="emergency-info">
                  <span className="emergency-label">
                    حالة طارئة
                  </span>

                  <h3>
                    مطلوب فصيلة دم {request.bloodType}
                  </h3>

                  <p>
                    {request.hospital}
                  </p>

                  <span className="distance">
                    <LocationIcon />
                    على بعد {request.distanceKm} كم
                  </span>
                </div>

              </div>

              <button
                className="follow-button"
                onClick={() => joinDonation(request.id)}
              >
                متابعة الطلب
              </button>
            </div>
          ))}
        </>
      )}

      {/* Donors */}
      {tab === "donors" && (
        <section>
          <div className="section-title">
            <div>
              <h2>متبرعون قريبون منك</h2>
              <p>اختر متبرعًا لعرض ملفه</p>
            </div>

            <div className="section-icon">
              <LocationIcon />
            </div>
          </div>

          <div className="donors-card">
            {donors.map((donor) => (
              <DonorRow
                key={donor.id}
                donor={donor}
                onClick={() =>
                  navigate(`/donor/${donor.id}`)
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* Always show nearby donors under emergency cases */}
      {tab === "urgent" && (
        <section className="nearby-section">

          <div className="section-title">
            <div>
              <h2>متبرعون قريبون منك</h2>
              <p>
                اضغط على المتبرع لعرض ملفه
              </p>
            </div>

            <div className="section-icon">
              <LocationIcon />
            </div>
          </div>

          <div className="donors-card">
            {donors.map((donor) => (
              <DonorRow
                key={donor.id}
                donor={donor}
                onClick={() =>
                  navigate(`/donor/${donor.id}`)
                }
              />
            ))}
          </div>

        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="blood-bottom-nav">

        <button
          onClick={() => navigate("/profile")}
          className="nav-item"
        >
          <ProfileIcon />
          <span>الملف الشخصي</span>
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="nav-item"
        >
          <BellIcon />
          <span>الإشعارات</span>
        </button>

        <button
          onClick={() => navigate("/requests")}
          className="nav-item"
        >
          <RequestsIcon />
          <span>الطلبات</span>
        </button>

        <button
          onClick={() => navigate("/home")}
          className="nav-item active"
        >
          <HomeIcon />
          <span>الرئيسية</span>
        </button>

      </nav>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .blood-page {
          min-height: 100vh;
          padding: 22px 18px 110px;
          direction: rtl;

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

          color: #24575a;
          font-family: Arial, Tahoma, sans-serif;
        }

        .blood-header {
          max-width: 520px;
          margin: 0 auto 20px;

          display: grid;
          grid-template-columns: 44px 1fr 44px;
          align-items: center;
        }

        .blood-header h1 {
          margin: 0;

          text-align: center;

          color: #218d83;

          font-size: 21px;
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

        .tabs-card {
          max-width: 520px;
          margin: 0 auto 20px;

          padding: 5px;

          display: grid;
          grid-template-columns: 1fr 1fr;

          border-radius: 19px;

          background: rgba(255,255,255,.65);

          border: 1px solid rgba(255,255,255,.9);

          box-shadow:
            0 8px 22px rgba(42,128,128,.06);
        }

        .tab {
          border: 0;

          min-height: 44px;

          border-radius: 15px;

          color: #8aa5a4;
          background: transparent;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;
        }

        .tab.active {
          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e0f8f3,
              #d1f1eb
            );

          box-shadow:
            0 5px 14px rgba(21,155,138,.08);
        }

        .section-title {
          max-width: 520px;
          margin: 0 auto 12px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .section-title h2 {
          margin: 0 0 4px;

          color: #286d6d;

          font-size: 17px;
          font-weight: 800;
        }

        .section-title p {
          margin: 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .section-icon {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #159b8a;
          background: #dff7f2;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.8);
        }

        .section-icon svg {
          width: 22px;
          height: 22px;
        }

        .emergency-card {
          max-width: 520px;
          margin: 0 auto 18px;

          padding: 16px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(255,232,238,.96),
              rgba(249,215,224,.9)
            );

          border: 1px solid rgba(255,255,255,.9);

          box-shadow:
            0 11px 28px rgba(190,120,140,.10),
            inset 0 1px 0 rgba(255,255,255,.7);
        }

        .emergency-top {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .blood-large {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #c05267;

          background: rgba(255,255,255,.62);

          border: 2px solid rgba(255,255,255,.8);

          font-size: 14px;
          font-weight: 900;
        }

        .emergency-info {
          flex: 1;
        }

        .emergency-label {
          color: #c05267;
          font-size: 11px;
          font-weight: 800;
        }

        .emergency-info h3 {
          margin: 3px 0;

          color: #98505f;

          font-size: 14px;
        }

        .emergency-info p {
          margin: 3px 0;

          color: #7f7478;

          font-size: 11px;
        }

        .distance {
          display: flex;
          align-items: center;
          gap: 4px;

          color: #9a777e;

          font-size: 10px;
        }

        .distance svg {
          width: 14px;
          height: 14px;
        }

        .follow-button {
          width: 100%;

          margin-top: 14px;

          min-height: 43px;

          border: 0;
          border-radius: 15px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #d4677b,
              #c05267
            );

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 7px 18px rgba(192,82,103,.16);
        }

        .empty-card {
          max-width: 520px;
          margin: 0 auto 22px;

          padding: 24px 18px;

          text-align: center;

          border-radius: 23px;

          background:
            rgba(255,255,255,.72);

          border: 1px solid rgba(255,255,255,.9);

          box-shadow:
            0 10px 26px rgba(42,128,128,.07);
        }

        .empty-icon {
          width: 48px;
          height: 48px;

          margin: 0 auto 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;
          background: #dff7f2;
        }

        .empty-icon svg {
          width: 23px;
          height: 23px;
        }

        .empty-card strong {
          display: block;

          color: #477878;

          font-size: 14px;
        }

        .empty-card p {
          margin: 6px 0 0;

          color: #8da4a3;

          font-size: 11px;
        }

        .nearby-section {
          margin-top: 24px;
        }

        .donors-card {
          max-width: 520px;
          margin: 0 auto;

          padding: 5px 14px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.86),
              rgba(232,249,246,.78)
            );

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .donor-row {
          width: 100%;

          min-height: 72px;

          display: flex;
          align-items: center;

          gap: 10px;

          border: 0;

          border-bottom: 1px solid rgba(124,184,177,.16);

          background: transparent;

          text-align: right;

          cursor: pointer;
        }

        .donor-row:last-child {
          border-bottom: 0;
        }

        .donor-avatar-small {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #218d83;

          background:
            linear-gradient(
              145deg,
              #dff8f3,
              #c4eee6
            );

          border: 2px solid rgba(255,255,255,.9);

          font-size: 18px;
          font-weight: 800;

          overflow: hidden;
        }

        .donor-avatar-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .donor-info {
          flex: 1;

          display: flex;
          flex-direction: column;

          gap: 3px;
        }

        .donor-info strong {
          color: #286d6d;

          font-size: 14px;
        }

        .donor-info span {
          color: #8aa3a2;

          font-size: 10px;
        }

        .blood-badge {
          padding: 7px 10px;

          border-radius: 14px;

          color: #c05267;
          background: #ffe8ed;

          font-size: 11px;
          font-weight: 900;
        }

        .donor-arrow {
          color: #159b8a;

          font-size: 19px;
          font-weight: 700;
        }

        .blood-bottom-nav {
          position: fixed;

          left: 50%;
          bottom: 14px;

          transform: translateX(-50%);

          z-index: 100;

          width: calc(100% - 28px);
          max-width: 520px;

          height: 68px;

          padding: 6px;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;

          border-radius: 24px;

          background: rgba(255,255,255,.78);

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 12px 32px rgba(37,111,111,.13),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-item {
          position: relative;

          border: 0;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;

          border-radius: 18px;

          color: #8aa5a4;
          background: transparent;

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;
        }

        .nav-item svg {
          width: 21px;
          height: 21px;
        }

        .nav-item.active {
          color: #159b8a;
          background: rgba(219,248,242,.72);
        }

        .nav-item.active::after {
          content: "";

          position: absolute;

          bottom: 3px;

          width: 22px;
          height: 3px;

          border-radius: 10px;

          background: #159b8a;
        }

      `}</style>
    </div>
  );
}

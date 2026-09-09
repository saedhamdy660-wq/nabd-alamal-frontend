import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

/* =========================
   Icons
========================= */

function BackIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
    </svg>
  );
}

function BloodIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4C20 4 9 16.2 9 24.2C9 30.8 13.9 36 20 36C26.1 36 31 30.8 31 24.2C31 16.2 20 4 20 4Z"
        fill="currentColor"
      />
      <path
        d="M15.3 25.2C15.8 28.2 17.3 30 20 30.8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3.5 10.5L12 3.5L20.5 10.5V20.5H3.5V10.5Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      {!active && (
        <path
          d="M9 20.5V14.5H15V20.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function RequestsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="3.8"
        width="14"
        height="17"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 8H15M9 12H15M9 16H13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 9C18 5.7 15.3 3 12 3C8.7 3 6 5.7 6 9C6 16 3.5 16.5 3.5 18H20.5C20.5 16.5 18 16 18 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 21H14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20C6.2 16.5 8.4 14.5 12 14.5C15.6 14.5 17.8 16.5 18.5 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 19 14.5 19 9C19 5.1 15.9 2 12 2C8.1 2 5 5.1 5 9C5 14.5 12 21 12 21Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

/* =========================
   Donor Row
========================= */

function DonorRow({ donor, onClick }) {
  return (
    <button className="donor-row" onClick={onClick}>
      <div className="donor-left">
        <div
          className="donor-avatar"
          style={
            donor.avatar
              ? {
                  backgroundImage: `url(${donor.avatar})`,
                }
              : {}
          }
        >
          {!donor.avatar && (
            <span>{donor.name?.charAt(0) || "م"}</span>
          )}
        </div>

        <div className="donor-info">
          <strong>{donor.name}</strong>

          <div className="donor-location">
            <LocationIcon />
            <span>على بعد {donor.distanceKm} كم</span>
          </div>
        </div>
      </div>

      <div className="donor-blood">
        {donor.bloodType}
      </div>
    </button>
  );
}

/* =========================
   Page
========================= */

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

    getCurrentLocation().catch(() => {});
  }, []);

  useEffect(() => {
    const loadDonors = () => {
      api
        .getNearbyDonors()
        .then(setDonors)
        .catch(() => {});
    };

    loadDonors();

    const interval = setInterval(loadDonors, 5000);

    return () => clearInterval(interval);
  }, []);

  const joinDonation = async (id) => {
    try {
      await api.respondToRequest(id);
    } catch {}

    navigate(`/track/${id}`);
  };

  return (
    <div className="blood-page">
      <div className="blood-wrapper">

        {/* ================= HEADER ================= */}

        <header className="blood-header">
          <button
            className="blood-header-btn back"
            onClick={() => navigate(-1)}
          >
            <BackIcon />
          </button>

          <div className="blood-title">
            <h1>التبرع بالدم والصفائح</h1>
            <span>معًا ننقذ الحياة</span>
          </div>

          <button className="blood-header-btn">
            <MoreIcon />
          </button>
        </header>

        {/* ================= TABS ================= */}

        <div className="blood-tabs">
          <button
            className={tab === "urgent" ? "active" : ""}
            onClick={() => setTab("urgent")}
          >
            حالات طارئة
          </button>

          <button
            className={tab === "donors" ? "active" : ""}
            onClick={() => setTab("donors")}
          >
            متبرعين مسجلين
          </button>
        </div>

        {/* ================= URGENT ================= */}

        {tab === "urgent" && (
          <>
            <section className="section-heading">
              <div>
                <h2>حالات تحتاج مساعدتك</h2>
                <p>ساهم في إنقاذ حياة اليوم</p>
              </div>

              <div className="heading-icon">
                <BloodIcon />
              </div>
            </section>

            {requests.length === 0 && (
              <div className="empty-card">
                <div className="empty-icon">
                  <BloodIcon />
                </div>

                <strong>لا توجد حالات طارئة حاليًا</strong>

                <p>
                  سيتم عرض الحالات القريبة منك هنا عند توفرها.
                </p>
              </div>
            )}

            <div className="requests-list">
              {requests.map((r) => (
                <div className="emergency-card" key={r.id}>

                  <div className="emergency-top">
                    <div className="emergency-blood-icon">
                      <BloodIcon />
                    </div>

                    <div className="emergency-label">
                      حالة طارئة
                    </div>
                  </div>

                  <div className="emergency-content">
                    <h3>
                      مطلوب فصيلة دم {r.bloodType}
                    </h3>

                    <p className="hospital-name">
                      {r.hospital}
                    </p>

                    <div className="distance">
                      <LocationIcon />
                      <span>
                        على بعد {r.distanceKm} كم
                      </span>
                    </div>
                  </div>

                  <button
                    className="donate-btn"
                    onClick={() => joinDonation(r.id)}
                  >
                    متابعة الطلب
                  </button>
                </div>
              ))}
            </div>

            {/* ================= NEARBY DONORS ================= */}

            <div className="nearby-header">
              <div>
                <h2>متبرعون قريبون منك</h2>
                <p>
                  أشخاص مستعدون للمساعدة
                </p>
              </div>

              <button
                onClick={() => setTab("donors")}
              >
                عرض الكل
              </button>
            </div>

            {donors.length === 0 ? (
              <div className="donors-empty">
                لا يوجد متبرعون مسجلون قريبون منك حاليًا.
              </div>
            ) : (
              <div className="donors-card">
                {donors.slice(0, 3).map((d) => (
                  <DonorRow
                    key={d.id}
                    donor={d}
                    onClick={() =>
                      navigate(`/donor/${d.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= DONORS TAB ================= */}

        {tab === "donors" && (
          <>
            <div className="section-heading donors-heading">
              <div>
                <h2>المتبرعون المسجلون</h2>
                <p>
                  المتبرعون الأقرب إلى موقعك
                </p>
              </div>

              <div className="heading-icon">
                <ProfileIcon />
              </div>
            </div>

            {donors.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">
                  <ProfileIcon />
                </div>

                <strong>
                  لا يوجد متبرعون مسجلون بعد
                </strong>

                <p>
                  سيظهر المتبرعون القريبون منك هنا.
                </p>
              </div>
            ) : (
              <div className="donors-card full">
                {donors.map((d) => (
                  <DonorRow
                    key={d.id}
                    donor={d}
                    onClick={() =>
                      navigate(`/donor/${d.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= BOTTOM NAV ================= */}

      <nav className="blood-bottom-nav">

        <button onClick={() => navigate("/profile")}>
          <ProfileIcon />
          <span>الملف الشخصي</span>
        </button>

        <button onClick={() => navigate("/notifications")}>
          <BellIcon />
          <span>الإشعارات</span>
        </button>

        <button onClick={() => navigate("/requests")}>
          <RequestsIcon />
          <span>الطلبات</span>
        </button>

        <button
          className="active"
          onClick={() => navigate("/home")}
        >
          <HomeIcon active />
          <span>الرئيسية</span>
        </button>

      </nav>

      {/* ================= CSS ================= */}

      <style>{`

        .blood-page {
          min-height: 100vh;
          direction: rtl;
          color: #24575a;
          background:
            radial-gradient(
              circle at 90% 0%,
              rgba(86, 203, 185, .22),
              transparent 28%
            ),
            radial-gradient(
              circle at 0% 42%,
              rgba(117, 220, 207, .14),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #f8ffff 0%,
              #eefafa 48%,
              #e8f7f5 100%
            );
          font-family:
            Arial,
            Tahoma,
            sans-serif;
          padding-bottom: 105px;
        }

        .blood-wrapper {
          width: min(100%, 430px);
          margin: auto;
          padding: 20px 16px 30px;
        }

        /* HEADER */

        .blood-header {
          display: grid;
          grid-template-columns: 42px 1fr 42px;
          align-items: center;
          gap: 7px;
          margin-bottom: 19px;
        }

        .blood-header-btn {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #24575a;
          background: rgba(255,255,255,.66);
          box-shadow:
            0 6px 18px rgba(30,120,115,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
          cursor: pointer;
        }

        .blood-header-btn.back {
          transform: scaleX(-1);
        }

        .blood-title {
          text-align: center;
        }

        .blood-title h1 {
          margin: 0;
          color: #218d83;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.3;
        }

        .blood-title span {
          display: block;
          margin-top: 3px;
          color: #7b9898;
          font-size: 11px;
          font-weight: 650;
        }

        /* TABS */

        .blood-tabs {
          display: flex;
          gap: 7px;
          padding: 5px;
          margin-bottom: 24px;
          border-radius: 25px;
          background: rgba(225,244,241,.72);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow:
            inset 0 1px 4px rgba(30,120,115,.04);
        }

        .blood-tabs button {
          flex: 1;
          height: 47px;
          border: 0;
          border-radius: 21px;
          background: transparent;
          color: #789292;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .blood-tabs button.active {
          color: white;
          background:
            linear-gradient(
              135deg,
              #16b79b,
              #159b8a
            );
          box-shadow:
            0 7px 18px rgba(21,155,138,.18);
        }

        /* SECTION HEADING */

        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 4px 12px;
        }

        .section-heading h2 {
          margin: 0;
          color: #214f55;
          font-size: 18px;
          font-weight: 900;
        }

        .section-heading p {
          margin: 4px 0 0;
          color: #7a9293;
          font-size: 12px;
          font-weight: 600;
        }

        .heading-icon {
          width: 43px;
          height: 43px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #159b8a;
          background:
            linear-gradient(
              145deg,
              rgba(224,250,245,.96),
              rgba(204,242,234,.9)
            );
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 7px 18px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.8);
        }

        /* EMERGENCY CARD */

        .emergency-card {
          position: relative;
          overflow: hidden;
          padding: 16px;
          margin-bottom: 22px;
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255,244,247,.96),
              rgba(250,226,232,.91)
            );
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 10px 25px rgba(190,100,125,.09),
            inset 0 1px 0 rgba(255,255,255,.8);
        }

        .emergency-card::before {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          left: -45px;
          bottom: -55px;
          border-radius: 50%;
          background: rgba(255,255,255,.28);
        }

        .emergency-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .emergency-blood-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c65268;
          background: rgba(255,218,226,.85);
          border: 1px solid rgba(255,255,255,.8);
        }

        .emergency-label {
          color: #bd5266;
          font-size: 14px;
          font-weight: 900;
        }

        .emergency-content {
          margin-top: 8px;
        }

        .emergency-content h3 {
          margin: 0 0 7px;
          color: #9f4c5e;
          font-size: 19px;
          font-weight: 900;
        }

        .hospital-name {
          margin: 0 0 5px;
          color: #53777d;
          font-size: 14px;
          font-weight: 750;
        }

        .distance {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #6d8589;
          font-size: 12px;
          font-weight: 700;
        }

        .distance svg {
          color: #159b8a;
        }

        .donate-btn {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 45px;
          margin-top: 14px;
          border: 0;
          border-radius: 22px;
          color: white;
          background:
            linear-gradient(
              135deg,
              #d75c70,
              #c94d62
            );
          box-shadow:
            0 7px 18px rgba(195,75,100,.16);
          font-size: 14px;
          font-weight: 850;
          cursor: pointer;
        }

        .donate-btn:active {
          transform: scale(.985);
        }

        /* NEARBY */

        .nearby-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin: 4px 3px 10px;
        }

        .nearby-header h2 {
          margin: 0;
          color: #214f55;
          font-size: 18px;
          font-weight: 900;
        }

        .nearby-header p {
          margin: 4px 0 0;
          color: #7c9495;
          font-size: 11px;
          font-weight: 600;
        }

        .nearby-header button {
          border: 0;
          background: transparent;
          color: #159b8a;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
        }

        /* DONORS CARD */

        .donors-card {
          overflow: hidden;
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              rgba(249,255,255,.82),
              rgba(232,248,246,.72)
            );
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 9px 23px rgba(42,128,128,.07),
            inset 0 1px 0 rgba(255,255,255,.85);
          backdrop-filter: blur(10px);
        }

        .donors-card.full {
          margin-top: 4px;
        }

        .donor-row {
          width: 100%;
          min-height: 78px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border: 0;
          border-bottom: 1px solid rgba(70,140,140,.08);
          background: transparent;
          text-align: right;
          color: inherit;
          cursor: pointer;
        }

        .donor-row:last-child {
          border-bottom: 0;
        }

        .donor-row:active {
          background: rgba(210,244,238,.4);
        }

        .donor-left {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .donor-avatar {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              #e9f7f6,
              #d6eeeb
            );
          background-position: center;
          background-size: cover;
          border: 2px solid rgba(255,255,255,.9);
          color: #3f8884;
          font-size: 16px;
          font-weight: 900;
          box-shadow:
            0 5px 14px rgba(35,120,115,.08);
        }

        .donor-info {
          min-width: 0;
        }

        .donor-info strong {
          display: block;
          margin-bottom: 4px;
          color: #28565c;
          font-size: 14px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .donor-location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #319889;
          font-size: 11px;
          font-weight: 700;
        }

        .donor-location svg {
          color: #159b8a;
        }

        .donor-blood {
          min-width: 48px;
          height: 34px;
          padding: 0 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
          color: #bc5265;
          background:
            linear-gradient(
              145deg,
              #fff0f3,
              #ffe3e8
            );
          border: 1px solid rgba(255,255,255,.9);
          font-size: 14px;
          font-weight: 900;
        }

        /* EMPTY */

        .empty-card {
          padding: 25px 18px;
          margin-bottom: 20px;
          text-align: center;
          border-radius: 21px;
          background: rgba(255,255,255,.63);
          border: 1px solid rgba(255,255,255,.88);
          box-shadow:
            0 8px 22px rgba(35,125,120,.06);
        }

        .empty-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
          color: #159b8a;
          background: #e0f6f2;
        }

        .empty-card strong {
          display: block;
          color: #28565b;
          font-size: 14px;
          font-weight: 850;
        }

        .empty-card p {
          margin: 6px 0 0;
          color: #7b9294;
          font-size: 12px;
          line-height: 1.7;
        }

        .donors-empty {
          padding: 22px;
          border-radius: 20px;
          text-align: center;
          color: #7a9293;
          background: rgba(255,255,255,.55);
          border: 1px solid rgba(255,255,255,.85);
          font-size: 12px;
        }

        /* BOTTOM NAV */

        .blood-bottom-nav {
          position: fixed;
          z-index: 100;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          width: min(calc(100% - 24px), 410px);
          height: 69px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          direction: ltr;
          padding: 5px;
          border-radius: 25px;
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(255,255,255,.92);
          box-shadow:
            0 12px 30px rgba(31,108,108,.13),
            inset 0 1px 0 rgba(255,255,255,.95);
          backdrop-filter: blur(18px);
        }

        .blood-bottom-nav button {
          position: relative;
          border: 0;
          background: transparent;
          color: #84999b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          font-size: 9px;
          font-weight: 750;
          cursor: pointer;
        }

        .blood-bottom-nav button.active {
          color: #159b8a;
        }

        .blood-bottom-nav button.active::after {
          content: "";
          position: absolute;
          bottom: 1px;
          width: 27px;
          height: 3px;
          border-radius: 5px;
          background: #159b8a;
        }

        @media (max-width: 360px) {
          .blood-wrapper {
            padding-left: 13px;
            padding-right: 13px;
          }

          .blood-title h1 {
            font-size: 18px;
          }

          .emergency-content h3 {
            font-size: 17px;
          }

          .blood-tabs button {
            font-size: 13px;
          }
        }

      `}</style>
    </div>
  );
}

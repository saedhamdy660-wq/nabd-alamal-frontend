import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

/* =========================
   Icons
========================= */

function BackIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
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

function BloodDropIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4C20 4 9 16.2 9 24.1C9 30.7 13.9 36 20 36C26.1 36 31 30.7 31 24.1C31 16.2 20 4 20 4Z"
        fill="currentColor"
      />
      <path
        d="M15.2 25.2C15.7 28.5 17.5 30.4 20.2 31"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  );
}

function HomeIcon({ active = false }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      {!active && <path d="M9 21v-6h6v6" />}
    </svg>
  );
}

function RequestsIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="4" width="14" height="17" rx="2.5" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c.8-3.7 3-5.5 6.5-5.5s5.7 1.8 6.5 5.5" />
    </svg>
  );
}

/* =========================
   Donor Row
========================= */

function DonorRow({ donor, onClick }) {
  const name = donor?.name || donor?.fullName || "متبرع";
  const distance =
    donor?.distanceKm ??
    donor?.distance ??
    "—";

  const bloodType =
    donor?.bloodType ||
    donor?.blood_group ||
    donor?.bloodGroup ||
    "—";

  const avatar =
    donor?.avatar ||
    donor?.image ||
    donor?.photo ||
    "";

  return (
    <button className="donor-row" onClick={onClick}>
      <div className="donor-main">
        <div
          className="donor-avatar"
          style={
            avatar
              ? {
                  backgroundImage: `url(${avatar})`,
                }
              : {}
          }
        >
          {!avatar && (
            <span>
              {name.charAt(0)}
            </span>
          )}
        </div>

        <div className="donor-info">
          <strong>{name}</strong>

          <div className="donor-distance">
            <span className="location-dot">●</span>
            <span>على بعد {distance} كم</span>
          </div>
        </div>
      </div>

      <div className="blood-badge">
        {bloodType}
      </div>
    </button>
  );
}

/* =========================
   Bottom Navigation
========================= */

function BottomNavigation({ navigate }) {
  return (
    <nav className="blood-bottom-nav">
      <button onClick={() => navigate("/profile")}>
        <ProfileIcon />
        <span>الملف الشخصي</span>
      </button>

      <button onClick={() => navigate("/notifications")}>
        <NotificationIcon />
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
  );
}

/* =========================
   Main Page
========================= */

export default function BloodDonation() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    api
      .getBloodRequests()
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setRequests([]);
      });

    getCurrentLocation().catch(() => {});
  }, []);

  useEffect(() => {
    const loadDonors = () => {
      api
        .getNearbyDonors()
        .then((data) => {
          setDonors(Array.isArray(data) ? data : []);
        })
        .catch(() => {
          setDonors([]);
        });
    };

    loadDonors();

    const interval = setInterval(loadDonors, 5000);

    return () => clearInterval(interval);
  }, []);

  const joinDonation = async (id) => {
    try {
      await api.respondToRequest(id);
      navigate(`/track/${id}`);
    } catch {
      navigate(`/track/${id}`);
    }
  };

  return (
    <div className="blood-page">
      <div className="blood-content">

        {/* Header */}
        <header className="blood-header">

          <button
            className="header-icon back-button"
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            <BackIcon />
          </button>

          <h1>التبرع بالدم والصفائح</h1>

          <button
            className="header-icon"
            aria-label="المزيد"
          >
            <MoreIcon />
          </button>

        </header>

        {/* Tabs */}
        <div className="blood-tabs">

          <button
            className={`blood-tab ${
              tab === "donors" ? "active" : ""
            }`}
            onClick={() => setTab("donors")}
          >
            متبرعين مسجلين
          </button>

          <button
            className={`blood-tab ${
              tab === "urgent" ? "active" : ""
            }`}
            onClick={() => setTab("urgent")}
          >
            حالات طارئة
          </button>

        </div>

        {/* =========================
            Emergency Tab
        ========================= */}

        {tab === "urgent" && (
          <section className="blood-section">

            {requests.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">
                  <BloodDropIcon />
                </div>

                <strong>
                  لا توجد حالات طارئة حاليًا
                </strong>

                <p>
                  سيتم عرض الحالات القريبة منك هنا عند توفرها.
                </p>
              </div>
            ) : (
              requests.map((request) => {
                const bloodType =
                  request?.bloodType ||
                  request?.blood_group ||
                  "—";

                const hospital =
                  request?.hospital ||
                  request?.hospitalName ||
                  "مستشفى غير محدد";

                const distance =
                  request?.distanceKm ??
                  request?.distance ??
                  "—";

                return (
                  <div
                    className="emergency-card"
                    key={request.id}
                  >

                    <div className="emergency-icon">
                      <BloodDropIcon />
                    </div>

                    <div className="emergency-content">

                      <div className="emergency-title">
                        حالة طارئة
                      </div>

                      <div className="emergency-blood">
                        مطلوب فصيلة دم {bloodType}
                      </div>

                      <div className="emergency-hospital">
                        {hospital}
                      </div>

                      <div className="emergency-distance">
                        على بعد {distance} كم
                      </div>

                    </div>

                    <button
                      className="emergency-button"
                      onClick={() =>
                        joinDonation(request.id)
                      }
                    >
                      متابعة الطلب
                    </button>

                  </div>
                );
              })
            )}

            {/* Nearby Donors */}
            <div className="nearby-title">
              <h2>متبرعون قريبون منك</h2>
            </div>

            <div className="donors-list">

              {donors.length === 0 ? (
                <div className="empty-donors">
                  لا يوجد متبرعون مسجلون قريبون منك حاليًا.
                </div>
              ) : (
                donors.map((donor) => (
                  <DonorRow
                    key={donor.id}
                    donor={donor}
                    onClick={() =>
                      navigate(`/donor/${donor.id}`)
                    }
                  />
                ))
              )}

            </div>

          </section>
        )}

        {/* =========================
            Donors Tab
        ========================= */}

        {tab === "donors" && (
          <section className="blood-section">

            <div className="donors-list donors-tab-list">

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
                donors.map((donor) => (
                  <DonorRow
                    key={donor.id}
                    donor={donor}
                    onClick={() =>
                      navigate(`/donor/${donor.id}`)
                    }
                  />
                ))
              )}

            </div>

          </section>
        )}

      </div>

      {/* Bottom navigation */}
      <BottomNavigation navigate={navigate} />

      {/* =========================
          Page CSS
      ========================= */}

      <style>{`

        .blood-page {
          min-height: 100vh;
          direction: rtl;
          color: #163f47;
          background:
            radial-gradient(
              circle at 85% 0%,
              rgba(94, 210, 190, .20),
              transparent 30%
            ),
            radial-gradient(
              circle at 5% 35%,
              rgba(122, 225, 209, .14),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #f7ffff 0%,
              #effafa 48%,
              #e8f7f6 100%
            );
          font-family:
            Arial,
            "Tahoma",
            sans-serif;
          padding-bottom: 105px;
        }

        .blood-content {
          width: min(100%, 430px);
          margin: 0 auto;
          padding: 24px 17px 30px;
        }

        /* Header */

        .blood-header {
          display: grid;
          grid-template-columns: 42px 1fr 42px;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
        }

        .blood-header h1 {
          margin: 0;
          text-align: center;
          font-size: 22px;
          line-height: 1.3;
          font-weight: 850;
          color: #173d47;
        }

        .header-icon {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #173f48;
          background: rgba(255,255,255,.65);
          box-shadow:
            0 6px 18px rgba(34,115,113,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
          cursor: pointer;
        }

        .back-button {
          transform: scaleX(-1);
        }

        /* Tabs */

        .blood-tabs {
          width: 100%;
          display: flex;
          gap: 8px;
          padding: 5px;
          margin-bottom: 22px;
          border-radius: 27px;
          background: rgba(237,248,248,.88);
          box-shadow:
            inset 0 1px 5px rgba(40,130,125,.04),
            0 5px 18px rgba(30,120,115,.05);
        }

        .blood-tab {
          flex: 1;
          height: 52px;
          border: 0;
          border-radius: 23px;
          background: transparent;
          color: #5b7379;
          font-size: 16px;
          font-weight: 750;
          cursor: pointer;
          transition: .2s ease;
        }

        .blood-tab.active {
          color: white;
          background:
            linear-gradient(
              135deg,
              #13bd98,
              #0aa987
            );
          box-shadow:
            0 7px 17px rgba(10,169,135,.20);
        }

        /* Emergency */

        .emergency-card {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 19px 17px 16px;
          margin-bottom: 25px;
          border-radius: 23px;
          background:
            linear-gradient(
              145deg,
              rgba(255,248,249,.97),
              rgba(255,239,242,.93)
            );
          border: 1px solid rgba(255,255,255,.95);
          box-shadow:
            0 10px 28px rgba(170,80,100,.09),
            inset 0 1px 0 rgba(255,255,255,.9);
        }

        .emergency-icon {
          position: absolute;
          top: 19px;
          right: 17px;
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #df3147;
        }

        .emergency-content {
          padding-right: 45px;
          text-align: right;
        }

        .emergency-title {
          color: #d6384c;
          font-size: 18px;
          font-weight: 850;
          margin-bottom: 8px;
        }

        .emergency-blood {
          color: #be4053;
          font-size: 20px;
          font-weight: 850;
          margin-bottom: 7px;
        }

        .emergency-hospital {
          color: #5e7580;
          font-size: 16px;
          font-weight: 750;
          margin-bottom: 6px;
        }

        .emergency-distance {
          color: #657b82;
          font-size: 14px;
          font-weight: 650;
        }

        .emergency-button {
          width: 100%;
          height: 47px;
          margin-top: 17px;
          border: 0;
          border-radius: 24px;
          color: white;
          background:
            linear-gradient(
              135deg,
              #ed3446,
              #e5253c
            );
          box-shadow:
            0 8px 18px rgba(225,40,65,.18);
          font-size: 16px;
          font-weight: 850;
          cursor: pointer;
        }

        .emergency-button:active {
          transform: scale(.98);
        }

        /* Nearby */

        .nearby-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 3px 10px;
        }

        .nearby-title h2 {
          margin: 0;
          font-size: 19px;
          font-weight: 850;
          color: #163f48;
        }

        /* Donors */

        .donors-list {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
          background: rgba(255,255,255,.58);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow:
            0 7px 22px rgba(34,115,113,.055);
        }

        .donor-row {
          width: 100%;
          min-height: 82px;
          padding: 11px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border: 0;
          border-bottom: 1px solid rgba(100,160,160,.10);
          background: transparent;
          color: inherit;
          text-align: right;
          cursor: pointer;
        }

        .donor-row:last-child {
          border-bottom: 0;
        }

        .donor-row:active {
          background: rgba(221,247,242,.55);
        }

        .donor-main {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .donor-avatar {
          width: 51px;
          height: 51px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              #e9f6f6,
              #d8eded
            );
          background-size: cover;
          background-position: center;
          border: 2px solid rgba(255,255,255,.95);
          box-shadow:
            0 5px 13px rgba(40,120,120,.10);
          color: #4d8584;
          font-size: 18px;
          font-weight: 850;
        }

        .donor-info {
          min-width: 0;
        }

        .donor-info strong {
          display: block;
          margin-bottom: 5px;
          color: #173f47;
          font-size: 16px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .donor-distance {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #299889;
          font-size: 13px;
          font-weight: 700;
        }

        .location-dot {
          font-size: 8px;
          color: #1da58f;
        }

        .blood-badge {
          min-width: 54px;
          height: 38px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          color: #c13c53;
          background:
            linear-gradient(
              145deg,
              #fff0f3,
              #ffe5e9
            );
          border: 1px solid rgba(255,255,255,.85);
          font-size: 16px;
          font-weight: 850;
          box-shadow:
            inset 0 1px 3px rgba(255,255,255,.8);
        }

        /* Empty */

        .empty-card {
          padding: 28px 20px;
          margin-bottom: 24px;
          border-radius: 22px;
          text-align: center;
          background: rgba(255,255,255,.62);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow:
            0 8px 24px rgba(30,120,115,.06);
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #17a58f;
          background: #e2f6f2;
        }

        .empty-card strong {
          display: block;
          color: #244c54;
          font-size: 16px;
          margin-bottom: 7px;
        }

        .empty-card p {
          margin: 0;
          color: #71878b;
          font-size: 13px;
          line-height: 1.7;
        }

        .empty-donors {
          padding: 25px 16px;
          text-align: center;
          color: #71878b;
          font-size: 14px;
        }

        /* Bottom Navigation */

        .blood-bottom-nav {
          position: fixed;
          z-index: 100;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          width: min(calc(100% - 24px), 410px);
          height: 70px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          padding: 5px;
          direction: ltr;
          border-radius: 27px;
          background:
            rgba(255,255,255,.84);
          border: 1px solid rgba(255,255,255,.92);
          box-shadow:
            0 12px 32px rgba(31,108,108,.13),
            inset 0 1px 0 rgba(255,255,255,.95);
          backdrop-filter: blur(18px);
        }

        .blood-bottom-nav button {
          position: relative;
          border: 0;
          background: transparent;
          color: #81969a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .blood-bottom-nav button.active {
          color: #0aa98c;
        }

        .blood-bottom-nav button.active::after {
          content: "";
          position: absolute;
          bottom: 2px;
          width: 28px;
          height: 3px;
          border-radius: 4px;
          background: #0aa98c;
        }

        /* Mobile */

        @media (max-width: 360px) {

          .blood-content {
            padding-left: 13px;
            padding-right: 13px;
          }

          .blood-header h1 {
            font-size: 20px;
          }

          .blood-tab {
            font-size: 14px;
          }

          .emergency-blood {
            font-size: 18px;
          }

          .donor-avatar {
            width: 47px;
            height: 47px;
          }

        }

      `}</style>
    </div>
  );
}

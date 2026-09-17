import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

function getLastDonationText(date) {
  if (!date) return "آخر تبرع غير مسجل";

  const donationDate = new Date(date);
  const today = new Date();

  const diffMs = today - donationDate;
  const diffDays = Math.max(
    0,
    Math.floor(diffMs / (1000 * 60 * 60 * 24))
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

  const months = Math.floor(diffDays / 30);

  if (months === 1) {
    return "آخر تبرع منذ شهر";
  }

  if (months < 12) {
    return `آخر تبرع منذ ${months} أشهر`;
  }

  const years = Math.floor(months / 12);

  if (years === 1) {
    return "آخر تبرع منذ سنة";
  }

  return `آخر تبرع منذ ${years} سنوات`;
}

function getDonorInitial(name) {
  if (!name) return "م";
  return name.trim().charAt(0);
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
          getDonorInitial(donor.name)
        )}
      </div>

      <div className="donor-info">
        <strong>{donor.name}</strong>

        <span>
          على بعد {donor.distanceKm} كم
        </span>

        <small>
          {getLastDonationText(donor.lastDonation)}
        </small>
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
    let cancelled = false;

    const loadDonors = async () => {
      try {
        const savedUser = localStorage.getItem("nabd_user");

        let currentUser = null;

        if (savedUser) {
          try {
            currentUser = JSON.parse(savedUser);
          } catch {
            currentUser = null;
          }
        }

        let lat = currentUser?.lat;
        let lng = currentUser?.lng;

        /*
          لو الموقع موجود بالفعل في بيانات المستخدم،
          نستخدمه مباشرة.

          لو مش موجود، نحاول الحصول عليه من الجهاز.
        */
        if (
          !Number.isFinite(Number(lat)) ||
          !Number.isFinite(Number(lng))
        ) {
          try {
            const location = await getCurrentLocation();

            lat = location.lat;
            lng = location.lng;

            /*
              حفظ الموقع محليًا حتى لا نحتاج
              لطلبه مرة أخرى في كل تحديث.
            */
            if (currentUser) {
              const updatedUser = {
                ...currentUser,
                lat,
                lng,
                locationEnabled: true,
              };

              localStorage.setItem(
                "nabd_user",
                JSON.stringify(updatedUser)
              );

              currentUser = updatedUser;
            }
          } catch {
            /*
              المستخدم قد يكون رفض الموقع.
              في هذه الحالة نطلب المتبرعين بدون
              إحداثيات جديدة.
            */
          }
        }

        const data = await api.getNearbyDonors({
          userId: currentUser?.id || "",
          lat:
            Number.isFinite(Number(lat))
              ? Number(lat)
              : "",
          lng:
            Number.isFinite(Number(lng))
              ? Number(lng)
              : "",
        });

        if (cancelled) return;

        if (Array.isArray(data)) {
          setDonors(data);
        } else {
          setDonors([]);
        }
      } catch {
        if (!cancelled) {
          setDonors([]);
        }
      }
    };

    loadDonors();

    const interval = setInterval(
      loadDonors,
      5000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
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
                onClick={() =>
                  joinDonation(request.id)
                }
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
            inset 0 1px 0 rgba(255,255,255,.9);
        }

        .section-icon svg {
          width: 22px;
          height: 22px;
        }

        .empty-card {
          max-width: 520px;
          margin: 0 auto 18px;
          padding: 24px 18px;

          text-align: center;

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
        }

        .empty-icon {
          width: 50px;
          height: 50px;

          margin: 0 auto 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;
          background: #dff7f2;
        }

        .empty-icon svg {
          width: 25px;
          height: 25px;
        }

        .empty-card strong {
          display: block;

          color: #286d6d;

          font-size: 15px;
        }

        .empty-card p {
          margin: 7px 0 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .emergency-card {
          max-width: 520px;
          margin: 0 auto 14px;
          padding: 17px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(233,249,246,.78)
            );

          border: 1px solid rgba(255,255,255,.94);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
        }

        .emergency-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .blood-large {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #c05267;
          background: #ffe7ed;

          font-size: 17px;
          font-weight: 900;
        }

        .emergency-info {
          min-width: 0;
        }

        .emergency-label {
          display: inline-block;

          margin-bottom: 4px;

          color: #d06b7d;

          font-size: 10px;
          font-weight: 800;
        }

        .emergency-info h3 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 14px;
          font-weight: 800;
        }

        .emergency-info p {
          margin: 0 0 5px;

          color: #7c9b9a;

          font-size: 11px;
        }

        .distance {
          display: flex;
          align-items: center;
          gap: 4px;

          color: #159b8a;

          font-size: 10px;
          font-weight: 700;
        }

        .distance svg {
          width: 14px;
          height: 14px;
        }

        .follow-button {
          width: 100%;
          min-height: 46px;

          margin-top: 15px;

          border: 0;
          border-radius: 17px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 14px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 8px 18px rgba(21,155,138,.14);
        }

        .donors-card {
          max-width: 520px;
          margin: 0 auto;

          padding: 7px 12px;

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

          overflow: hidden;
        }

        .donor-row {
          width: 100%;
          min-height: 76px;

          padding: 10px 3px;

          display: flex;
          align-items: center;
          gap: 10px;

          border: 0;
          border-bottom: 1px solid rgba(124,184,177,.15);

          color: inherit;
          background: transparent;

          text-align: right;

          cursor: pointer;
        }

        .donor-row:last-child {
          border-bottom: 0;
        }

        .donor-avatar-small {
          width: 47px;
          height: 47px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border-radius: 50%;

          color: #218d83;

          background:
            linear-gradient(
              145deg,
              #dff8f3,
              #bcece3
            );

          font-size: 18px;
          font-weight: 800;
        }

        .donor-avatar-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .donor-info {
          min-width: 0;
          flex: 1;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .donor-info strong {
          max-width: 100%;

          overflow: hidden;

          color: #286d6d;

          font-size: 13px;
          font-weight: 800;

          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .donor-info span {
          color: #88a3a2;

          font-size: 10px;
          font-weight: 700;
        }

        .donor-info small {
          color: #159b8a;

          font-size: 9px;
          font-weight: 800;
        }

        .blood-badge {
          flex-shrink: 0;

          padding: 7px 9px;

          border-radius: 14px;

          color: #c05267;
          background: #ffe7ed;

          font-size: 11px;
          font-weight: 900;
        }

        .donor-arrow {
          flex-shrink: 0;

          color: #8aa5a4;

          font-size: 19px;
        }

        .nearby-section {
          max-width: 520px;

          margin: 24px auto 0;
        }

        .blood-bottom-nav {
          position: fixed;

          left: 50%;
          bottom: 12px;

          transform: translateX(-50%);

          width: calc(100% - 28px);
          max-width: 520px;

          min-height: 68px;

          padding: 7px 8px;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3px;

          border-radius: 23px;

          background:
            rgba(255,255,255,.86);

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px rgba(42,128,128,.13),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);

          z-index: 20;
        }

        .nav-item {
          border: 0;
          border-radius: 17px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;

          color: #91a9a8;
          background: transparent;

          font-size: 9px;
          font-weight: 800;

          cursor: pointer;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
        }

        .nav-item.active {
          color: #159b8a;

          background: #e5f8f4;
        }

        @media (max-width: 380px) {
          .blood-page {
            padding-left: 13px;
            padding-right: 13px;
          }

          .donor-row {
            gap: 7px;
          }

          .donor-avatar-small {
            width: 43px;
            height: 43px;
          }

          .donor-info strong {
            font-size: 11px;
          }

          .blood-badge {
            padding: 6px 7px;
            font-size: 10px;
          }
        }

      `}</style>
    </div>
  );
}

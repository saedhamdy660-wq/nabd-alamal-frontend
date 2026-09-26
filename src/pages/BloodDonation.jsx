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

        <span>على بعد {donor.distanceKm} كم</span>

        <small>{getLastDonationText(donor.lastDonation)}</small>
      </div>

      <div className="blood-badge">🩸 {donor.bloodType}</div>

      <div className="donor-arrow">←</div>
    </button>
  );
}

export default function BloodDonation() {
  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.getBloodRequests().then(setRequests).catch(() => {});
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

        if (
          !Number.isFinite(Number(lat)) ||
          !Number.isFinite(Number(lng))
        ) {
          try {
            const location = await getCurrentLocation();
            lat = location.lat;
            lng = location.lng;

            if (currentUser) {
              currentUser = {
                ...currentUser,
                lat,
                lng,
                locationEnabled: true,
              };

              localStorage.setItem(
                "nabd_user",
                JSON.stringify(currentUser)
              );

              if (currentUser.id) {
                try {
                  await api.updateUserLocation(
                    currentUser.id,
                    lat,
                    lng
                  );
                } catch {}
              }
            }
          } catch {}
        }

        const hasLocation =
          Number.isFinite(Number(lat)) &&
          Number.isFinite(Number(lng));

        const data = await api.getNearbyDonors({
          userId: currentUser?.id || "",
          lat: hasLocation ? Number(lat) : "",
          lng: hasLocation ? Number(lng) : "",
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

    const interval = setInterval(loadDonors, 5000);

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

      <header className="blood-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h1>التبرع بالدم والصفائح</h1>

        <button className="more-button">⋮</button>
      </header>

      <div className="tabs-card">
        <button
          className={tab === "urgent" ? "tab active" : "tab"}
          onClick={() => setTab("urgent")}
        >
          حالات طارئة
        </button>

        <button
          className={tab === "donors" ? "tab active" : "tab"}
          onClick={() => setTab("donors")}
        >
          متبرعين مسجلين
        </button>
      </div>

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

              <strong>لا توجد حالات طارئة حاليًا</strong>

              <p>سيتم عرض الحالات هنا عند وجود طلب جديد.</p>
            </div>
          )}

          {requests.map((request) => (
            <div key={request.id} className="emergency-card">
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

                  <p>{request.hospital}</p>

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
                onClick={() => navigate(`/donor/${donor.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {tab === "urgent" && (
        <section className="nearby-section">
          <div className="section-title">
            <div>
              <h2>متبرعون قريبون منك</h2>
              <p>اضغط على المتبرع لعرض ملفه</p>
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
                onClick={() => navigate(`/donor/${donor.id}`)}
              />
            ))}
          </div>
        </section>
      )}

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
    </div>
  );
}

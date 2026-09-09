import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const [urgentRequests, setUrgentRequests] = useState([]);

  const avatar = localStorage.getItem("nabd_avatar");

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      api.getUser().then(setUser).catch(() => {});
    }

    api.getBloodRequests()
      .then(setUrgentRequests)
      .catch(() => {});
  }, []);

  const userName = user?.name || user?.fullName || user?.username || "بك";

  return (
    <div className="home-page">

      {/* Header */}
      <header className="home-header">

        <div className="brand">
          <div className="brand-heart">
            ❤️
            <span className="brand-pulse">〰</span>
          </div>

          <div>
            <h1>نبض الأمل</h1>
            <span>استجابة طبية طارئة</span>
          </div>
        </div>

        <div className="header-actions">
          <Link to="/notifications" className="notification-btn">
            🔔
          </Link>

          <Link
            to="/profile"
            className="home-avatar"
            style={{
              backgroundImage: avatar ? `url(${avatar})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!avatar && "👤"}
          </Link>
        </div>

      </header>

      <main className="home-content">

        {/* Welcome */}
        <section className="welcome-section">
          <h2>
            مرحبًا، {userName}
          </h2>

          <p>معًا ننقذ حياة</p>
        </section>

        {/* ECG decoration */}
        <div className="home-ecg">
          ──────╱╲╱╲──────
        </div>

        {/* Search */}
        <div className="home-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="ابحث عن دواء أو جمعية.."
          />
        </div>

        {/* Services */}
        <div className="services-grid">

          <Link to="/blood" className="home-service blood-service">

            <div className="service-icon blood-icon">
              🩸
            </div>

            <h3>التبرع بالدم والمحتاج</h3>

            <span className="service-arrow">
              ←
            </span>

          </Link>

          <Link to="/medicines" className="home-service medicine-service">

            <div className="service-icon medicine-icon">
              💊
            </div>

            <h3>تبادل الأدوية</h3>

            <p>أدوية غير متوفرة</p>

            <span className="service-arrow">
              ←
            </span>

          </Link>

        </div>

        {/* Urgent requests */}
        <section className="urgent-section">

          <div className="section-title">
            <h3>طلبات عاجلة قريبة منك</h3>
            <span>📍</span>
          </div>

          {urgentRequests.length > 0 ? (
            urgentRequests.map((request) => (

              <Link
                key={request.id}
                to={`/track/${request.id}`}
                className="urgent-request"
              >

                <div className="urgent-arrow">
                  ←
                </div>

                <div className="urgent-info">

                  <strong>
                    فصيلة دم {request.bloodType}
                  </strong>

                  <p>
                    {request.hospital}
                  </p>

                  <small>
                    على بعد {request.distanceKm} كم
                  </small>

                </div>

                <div className="urgent-blood-icon">
                  🩸
                </div>

              </Link>

            ))
          ) : (
            <div className="empty-requests">
              لا توجد طلبات عاجلة قريبة منك حاليًا
            </div>
          )}

          <Link to="/blood" className="show-all">
            عرض الكل 📍
          </Link>

        </section>

      </main>

      {/* Decorative bottom */}
      <div className="home-bottom-decoration">
        <div className="large-ecg">
          ───────╱╲╱╲────────
        </div>

        <span className="medical-plus">
          +
        </span>
      </div>

    </div>
  );
}

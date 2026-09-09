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
      } catch (error) {
        console.log(error);
      }
    } else {
      api.getUser()
        .then(setUser)
        .catch(() => {});
    }

    api.getBloodRequests()
      .then(setUrgentRequests)
      .catch(() => {});
  }, []);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "بك";

  return (
    <div className="nabd-home">

      {/* HEADER */}
      <div className="nabd-home-header">

        <div className="nabd-brand">
          <div className="nabd-heart-logo">
            <span>♥</span>
            <div className="nabd-ecg-mini">⌁</div>
          </div>

          <div>
            <h1>نبض الأمل</h1>
            <p>استجابة طبية طارئة</p>
          </div>
        </div>

        <div className="nabd-header-actions">

          <Link
            to="/notifications"
            className="nabd-notification-btn"
            aria-label="الإشعارات"
          >
            <span className="bell-icon">♧</span>
            <span className="notification-dot"></span>
          </Link>

          <Link
            to="/profile"
            className="nabd-avatar"
            style={{
              backgroundImage: avatar
                ? `url(${avatar})`
                : "none",
            }}
          >
            {!avatar && "👤"}
          </Link>

        </div>
      </div>


      {/* WELCOME */}
      <section className="nabd-welcome">

        <h2>
          مرحبًا، {userName} 👋
        </h2>

        <p>
          مما ينبض حياة
        </p>

        <div className="nabd-ecg-line">
          <span></span>
        </div>

      </section>


      {/* SEARCH */}
      <div className="nabd-search">

        <input
          type="text"
          placeholder="ابحث عن دواء أو جمعية.."
        />

        <span className="nabd-search-icon">
          🔍
        </span>

      </div>


      {/* SERVICES */}
      <div className="nabd-services">

        {/* BLOOD */}
        <Link
          to="/blood"
          className="nabd-service-card nabd-blood-card"
        >

          <div className="nabd-service-icon blood-icon">
            💧
          </div>

          <h3>
            التبرع بالدم والمخازن
          </h3>

          <div className="nabd-service-arrow">
            →
          </div>

        </Link>


        {/* MEDICINE */}
        <Link
          to="/medicines"
          className="nabd-service-card nabd-medicine-card"
        >

          <div className="nabd-service-icon medicine-icon">
            💊
          </div>

          <h3>
            تبادل الأدوية
          </h3>

          <p>
            أدوية غير متوفرة
          </p>

          <div className="nabd-service-arrow">
            →
          </div>

        </Link>

      </div>


      {/* REQUESTS HEADER */}
      <div className="nabd-requests-title">

        <h3>
          طلبات عاجلة قريبة منك
        </h3>

        <span>
          📍
        </span>

      </div>


      {/* REQUESTS */}
      <div className="nabd-requests">

        {urgentRequests.length > 0 ? (
          urgentRequests.map((request) => (

            <Link
              key={request.id}
              to={`/track/${request.id}`}
              className="nabd-request-card"
            >

              <div className="nabd-request-arrow">
                →
              </div>

              <div className="nabd-request-info">

                <strong>
                  فصيلة دم {request.bloodType || "O+"}
                </strong>

                <p>
                  {request.hospital || "مستشفى النور التخصصي"}
                </p>

                <small>
                  على بعد {request.distanceKm || "2.3"} كم
                </small>

              </div>

              <div className="nabd-request-blood">
                🩸
              </div>

            </Link>

          ))
        ) : (

          <div className="nabd-request-card">

            <div className="nabd-request-arrow">
              →
            </div>

            <div className="nabd-request-info">

              <strong>
                فصيلة دم O+
              </strong>

              <p>
                مستشفى النور التخصصي
              </p>

              <small>
                على بعد 2.3 كم
              </small>

            </div>

            <div className="nabd-request-blood">
              🩸
            </div>

          </div>

        )}

      </div>


      {/* SHOW ALL */}
      <Link
        to="/blood"
        className="nabd-show-all"
      >
        عروض الكل
        <span>📍</span>
      </Link>


      {/* DECORATION */}
      <div className="nabd-bottom-decoration">

        <div className="nabd-big-ecg">
          ──────╱╲╱╲──────
        </div>

        <div className="nabd-medical-plus">
          +
        </div>

      </div>

    </div>
  );
}

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

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "بك";

  return (
    <main className="nabd-home">

      {/* HEADER */}
      <header className="nabd-header">

        <div className="nabd-brand">
          <div className="nabd-logo">
            <span>♥</span>
            <i>⌁</i>
          </div>

          <div className="nabd-brand-text">
            <h1>نبض الأمل</h1>
            <p>استجابة طبية طارئة</p>
          </div>
        </div>

        <div className="nabd-user-area">

          <Link to="/notifications" className="nabd-bell">
            <svg viewBox="0 0 24 24">
              <path
                d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
              />
              <path d="M10 21h4" />
            </svg>
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

      </header>


      {/* WELCOME */}
      <section className="nabd-welcome">

        <h2>
          مرحبًا، <span>{userName}</span> 👋
        </h2>

        <p>مما ينبض حياة</p>

        <div className="nabd-heart-line">
          <span></span>
        </div>

      </section>


      {/* SEARCH */}
      <div className="nabd-search">

        <input
          type="text"
          placeholder="ابحث عن دواء أو جمعية.."
        />

        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

      </div>


      {/* SERVICES */}
      <section className="nabd-services">

        <Link
          to="/medicines"
          className="nabd-service medicine"
        >
          <div className="nabd-service-icon">
            <span>💊</span>
          </div>

          <h3>تبادل الأدوية</h3>

          <p>أدوية غير متوفرة</p>

          <div className="nabd-service-arrow">
            →
          </div>
        </Link>


        <Link
          to="/blood"
          className="nabd-service blood"
        >
          <div className="nabd-service-icon">
            <span>💧</span>
          </div>

          <h3>التبرع بالدم<br />والمخازن</h3>

          <div className="nabd-service-arrow">
            →
          </div>
        </Link>

      </section>


      {/* REQUESTS */}
      <section className="nabd-requests-section">

        <div className="nabd-requests-heading">
          <h3>طلبات عاجلة قريبة منك</h3>

          <span>●</span>
        </div>


        {urgentRequests.length > 0 ? (
          urgentRequests.map((request) => (

            <Link
              key={request.id}
              to={`/track/${request.id}`}
              className="nabd-request"
            >

              <div className="nabd-request-arrow">
                →
              </div>

              <div className="nabd-request-content">
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

              <div className="nabd-blood-icon">
                🩸
              </div>

            </Link>

          ))
        ) : (
          <div className="nabd-request">

            <div className="nabd-request-arrow">
              →
            </div>

            <div className="nabd-request-content">
              <strong>فصيلة دم O+</strong>
              <p>مستشفى النور التخصصي</p>
              <small>على بعد 2.3 كم</small>
            </div>

            <div className="nabd-blood-icon">
              🩸
            </div>

          </div>
        )}


        <Link to="/blood" className="nabd-all">
          عرض الكل
          <span>●</span>
        </Link>

      </section>


      {/* DECORATION */}
      <div className="nabd-decoration">

        <div className="nabd-ecg">
          ────────╱╲╱╲───────
        </div>

        <div className="nabd-plus">+</div>

      </div>

    </main>
  );
}

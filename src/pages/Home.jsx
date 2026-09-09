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

  const request = urgentRequests[0];

  return (
    <main className="home-reference">

      {/* ================= HEADER ================= */}
      <header className="home-reference-header">

        <div className="home-brand">

          <div className="home-brand-logo">
            <svg viewBox="0 0 100 100">
              <path
                d="M50 82
                   C42 74 17 57 17 35
                   C17 19 29 10 42 10
                   C50 10 56 15 60 22
                   C64 15 70 10 78 10
                   C91 10 99 19 99 35
                   C99 57 74 74 50 82Z"
                fill="currentColor"
              />

              <path
                d="M22 48
                   H38
                   L44 38
                   L51 57
                   L58 31
                   L65 48
                   H82"
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="home-brand-text">
            <h1>نبض الأمل</h1>
            <p>استجابة طبية طارئة</p>
          </div>

        </div>


        <div className="home-header-actions">

          <Link
            to="/notifications"
            className="home-notification"
            aria-label="الإشعارات"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M10 21h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <span></span>
          </Link>


          <Link
            to="/profile"
            className="home-avatar"
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


      {/* ================= WELCOME ================= */}
      <section className="home-welcome">

        <h2>
          مرحبًا، <span>{userName}</span>
        </h2>

        <p>مما ينبض حياة</p>

      </section>


      {/* ================= ECG ================= */}
      <div className="home-top-ecg">

        <svg viewBox="0 0 500 90" preserveAspectRatio="none">
          <path
            d="M0 45
               H170
               L190 45
               L202 32
               L214 45
               L224 45
               L238 5
               L250 78
               L264 45
               L278 45
               L290 28
               L302 45
               H500"
            fill="none"
            stroke="rgba(255,255,255,.9)"
            strokeWidth="3"
          />
        </svg>

      </div>


      {/* ================= SEARCH ================= */}
      <div className="home-search">

        <input
          type="text"
          placeholder="ابحث عن دواء أو جمعية.."
        />

        <svg viewBox="0 0 24 24">
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="m20 20-4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

      </div>


      {/* ================= SERVICES ================= */}
      <section className="home-services">


        {/* BLOOD */}
        <Link
          to="/blood"
          className="home-service home-service-blood"
        >

          <div className="home-service-icon">

            <svg viewBox="0 0 64 64">
              <path
                d="M32 7
                   C32 7 14 28 14 40
                   C14 51 22 58 32 58
                   C42 58 50 51 50 40
                   C50 28 32 7 32 7Z"
                fill="currentColor"
              />

              <path
                d="M23 40
                   C23 47 27 50 31 51"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

          </div>

          <h3>التبرع بالدم والمخازن</h3>

          <div className="home-service-arrow">
            →
          </div>

        </Link>


        {/* MEDICINE */}
        <Link
          to="/medicines"
          className="home-service home-service-medicine"
        >

          <div className="home-service-icon">

            <svg viewBox="0 0 64 64">

              <g transform="rotate(-45 32 32)">

                <rect
                  x="9"
                  y="23"
                  width="46"
                  height="18"
                  rx="9"
                  fill="currentColor"
                />

                <line
                  x1="32"
                  y1="23"
                  x2="32"
                  y2="41"
                  stroke="white"
                  strokeWidth="3"
                />

              </g>

            </svg>

          </div>

          <h3>تبادل الأدوية</h3>

          <p>أدوية غير متوفرة</p>

          <div className="home-service-arrow">
            →
          </div>

        </Link>

      </section>


      {/* ================= REQUESTS ================= */}
      <section className="home-requests">

        <div className="home-requests-title">
          <h3>طلبات عاجلة قريبة منك</h3>

          <svg viewBox="0 0 24 24">
            <path
              d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
              fill="currentColor"
            />
          </svg>
        </div>


        <Link
          to={request ? `/track/${request.id}` : "/blood"}
          className="home-request-card"
        >

          <div className="home-request-arrow">
            →
          </div>


          <div className="home-request-info">

            <strong>
              فصيلة دم {request?.bloodType || "O+"}
            </strong>

            <p>
              {request?.hospital || "مستشفى النور التخصصي"}
            </p>

            <small>
              على بعد {request?.distanceKm || "2.3"} كم
            </small>

          </div>


          <div className="home-request-blood">

            <svg viewBox="0 0 64 64">
              <path
                d="M32 7
                   C32 7 14 28 14 40
                   C14 51 22 58 32 58
                   C42 58 50 51 50 40
                   C50 28 32 7 32 7Z"
                fill="currentColor"
              />

              <path
                d="M23 40
                   C23 47 27 50 31 51"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

          </div>

        </Link>


        <Link to="/blood" className="home-show-all">
          عرض الكل

          <svg viewBox="0 0 24 24">
            <path
              d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
              fill="currentColor"
            />
          </svg>
        </Link>

      </section>


      {/* ================= BOTTOM DECORATION ================= */}
      <div className="home-bottom-decoration">

        <div className="home-wave"></div>

        <svg
          className="home-bottom-ecg"
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 55
               H170
               L190 55
               L205 42
               L218 55
               L230 55
               L245 8
               L258 88
               L273 55
               L286 55
               L300 38
               L314 55
               H500"
            fill="none"
            stroke="rgba(255,255,255,.9)"
            strokeWidth="4"
          />
        </svg>


        <div className="home-medical-plus">
          +
        </div>

      </div>

    </main>
  );
}

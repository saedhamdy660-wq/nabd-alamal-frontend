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
    <>
      <style>{`

        /* =====================================================
           HOME ONLY
           ===================================================== */

        /*
          إخفاء الـ Navbar القديم في Home فقط.
          باقي الصفحات لا تتأثر.
        */
        body:has(.home-reference) .bottom-nav {
          display: none !important;
        }

        * {
          box-sizing: border-box;
        }

        .home-reference {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;

          direction: rtl;

          position: relative;
          overflow: hidden;

          padding:
            22px
            16px
            125px;

          background:
            radial-gradient(
              circle at 10% 8%,
              rgba(255,255,255,.95) 0%,
              rgba(255,255,255,0) 25%
            ),
            radial-gradient(
              circle at 90% 12%,
              rgba(255,255,255,.7) 0%,
              rgba(255,255,255,0) 23%
            ),
            radial-gradient(
              circle at 50% 45%,
              rgba(255,255,255,.65) 0%,
              rgba(255,255,255,0) 42%
            ),
            linear-gradient(
              180deg,
              #c5f6f1 0%,
              #eafffc 38%,
              #d9faf6 72%,
              #9fddd6 100%
            );

          color: #075d63;
        }


        /* =====================================================
           DECORATIVE LIGHT
           ===================================================== */

        .home-reference::before {
          content: "";

          position: absolute;

          width: 310px;
          height: 310px;

          top: 30px;
          left: -160px;

          border-radius: 50%;

          background: rgba(255,255,255,.32);

          filter: blur(35px);

          pointer-events: none;
        }

        .home-reference::after {
          content: "";

          position: absolute;

          width: 320px;
          height: 320px;

          top: 430px;
          right: -170px;

          border-radius: 50%;

          background: rgba(255,255,255,.25);

          filter: blur(40px);

          pointer-events: none;
        }


        /* =====================================================
           HEADER
           ===================================================== */

        .home-reference-header {
          width: 100%;
          max-width: 430px;

          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
          z-index: 10;
        }

        .home-brand {
          display: flex;
          align-items: center;

          gap: 7px;
        }

        .home-brand-logo {
          width: 76px;
          height: 76px;

          color: #08a99c;

          flex-shrink: 0;
        }

        .home-brand-logo svg {
          width: 100%;
          height: 100%;
        }

        .home-brand-text {
          text-align: right;
        }

        .home-brand-text h1 {
          margin: 0;

          color: #078b87;

          font-size: 30px;
          font-weight: 900;

          line-height: 1.05;
        }

        .home-brand-text p {
          margin: 6px 0 0;

          color: #168c91;

          font-size: 16px;
          font-weight: 600;
        }


        /* =====================================================
           HEADER ACTIONS
           ===================================================== */

        .home-header-actions {
          display: flex;
          align-items: center;

          gap: 9px;
        }

        .home-notification {
          width: 43px;
          height: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;

          color: #078b87;

          text-decoration: none;
        }

        .home-notification svg {
          width: 35px;
          height: 35px;
        }

        .home-notification span {
          position: absolute;

          width: 9px;
          height: 9px;

          top: 4px;
          right: 4px;

          border-radius: 50%;

          background: #08a99c;

          border: 2px solid #c5f6f1;
        }

        .home-avatar {
          width: 62px;
          height: 62px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background-color: #e4f9f6;
          background-position: center;
          background-size: cover;

          border: 4px solid rgba(255,255,255,.9);

          box-shadow:
            0 7px 20px rgba(0,120,125,.14),
            0 0 0 2px rgba(255,255,255,.35);

          color: #078b87;

          font-size: 25px;

          text-decoration: none;

          overflow: hidden;
        }


        /* =====================================================
           WELCOME
           ===================================================== */

        .home-welcome {
          width: 100%;
          max-width: 430px;

          margin: 23px auto 0;

          position: relative;
          z-index: 5;

          text-align: right;
        }

        .home-welcome h2 {
          margin: 0;

          color: #075d63;

          font-size: 34px;
          font-weight: 900;

          line-height: 1.2;
        }

        .home-welcome h2 span {
          color: #075d63;
        }

        .home-welcome p {
          margin: 5px 0 0;

          color: #578895;

          font-size: 22px;
          font-weight: 600;
        }


        /* =====================================================
           TOP ECG
           ===================================================== */

        .home-top-ecg {
          width: calc(100% + 32px);
          height: 82px;

          margin:
            -3px
            -16px
            0;

          position: relative;
          z-index: 2;

          opacity: .72;

          pointer-events: none;
        }

        .home-top-ecg svg {
          width: 100%;
          height: 100%;
        }


        /* =====================================================
           SEARCH
           ===================================================== */

        .home-search {
          width: 100%;
          max-width: 430px;

          height: 69px;

          margin: 0 auto 29px;

          display: flex;
          align-items: center;

          position: relative;
          z-index: 10;

          background: rgba(255,255,255,.55);

          border:
            2px solid
            rgba(255,255,255,.9);

          border-radius: 38px;

          box-shadow:
            0 10px 26px rgba(0,120,125,.12),
            inset 0 2px 8px rgba(255,255,255,.8);

          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);
        }

        .home-search input {
          flex: 1;

          width: 100%;
          height: 100%;

          padding: 0 23px;

          border: 0;
          outline: 0;

          background: transparent;

          color: #276e7e;

          font-family: inherit;

          font-size: 18px;
          font-weight: 600;

          text-align: right;

          direction: rtl;
        }

        .home-search input::placeholder {
          color: #5b8e9c;

          opacity: .9;
        }

        .home-search svg {
          width: 37px;
          height: 37px;

          margin-left: 18px;

          flex-shrink: 0;

          color: #087987;
        }


        /* =====================================================
           SERVICES
           ===================================================== */

        .home-services {
          width: 100%;
          max-width: 430px;

          margin: 0 auto 35px;

          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 17px;

          position: relative;
          z-index: 10;
        }

        .home-service {
          min-height: 294px;

          padding: 28px 13px 20px;

          display: flex;
          flex-direction: column;
          align-items: center;

          position: relative;
          overflow: hidden;

          border-radius: 29px;

          text-align: center;
          text-decoration: none;

          box-shadow:
            0 10px 25px rgba(0,120,125,.09),
            inset 0 1px 0 rgba(255,255,255,.85);

          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);
        }

        .home-service::after {
          content: "";

          position: absolute;

          width: 190px;
          height: 190px;

          right: -85px;
          bottom: -105px;

          border-radius: 50%;

          background: rgba(255,255,255,.25);
        }

        .home-service-blood {
          color: #c8232b;

          background: rgba(255,241,245,.74);

          border:
            2px solid
            rgba(255,185,201,.65);
        }

        .home-service-medicine {
          color: #078b87;

          background: rgba(224,250,247,.7);

          border:
            2px solid
            rgba(125,224,215,.65);
        }

        .home-service-icon {
          width: 91px;
          height: 91px;

          margin-bottom: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.42);

          position: relative;
          z-index: 2;
        }

        .home-service-icon svg {
          width: 68px;
          height: 68px;
        }

        .home-service h3 {
          margin: 0;

          position: relative;
          z-index: 2;

          font-size: 23px;
          font-weight: 900;

          line-height: 1.28;
        }

        .home-service p {
          margin: 7px 0 0;

          position: relative;
          z-index: 2;

          color: #5b8995;

          font-size: 18px;
          font-weight: 600;
        }

        .home-service-arrow {
          width: 43px;
          height: 43px;

          position: absolute;

          left: 17px;
          bottom: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.45);

          font-size: 30px;

          z-index: 4;
        }


        /* =====================================================
           REQUESTS
           ===================================================== */

        .home-requests {
          width: 100%;
          max-width: 430px;

          margin: 0 auto;

          position: relative;
          z-index: 10;
        }

        .home-requests-title {
          display: flex;
          align-items: center;

          gap: 7px;

          margin-bottom: 13px;
        }

        .home-requests-title h3 {
          margin: 0;

          color: #075d63;

          font-size: 22px;
          font-weight: 900;
        }

        .home-requests-title svg {
          width: 25px;
          height: 25px;

          color: #079a94;
        }

        .home-request-card {
          width: 100%;
          min-height: 124px;

          padding: 15px 17px;

          display: flex;
          align-items: center;

          gap: 10px;

          position: relative;

          border-radius: 25px;

          background: rgba(255,245,247,.75);

          border:
            2px solid
            rgba(255,207,215,.72);

          box-shadow:
            0 8px 22px rgba(0,120,125,.08),
            inset 0 1px 0 rgba(255,255,255,.85);

          color: inherit;

          text-decoration: none;
        }

        .home-request-arrow {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,221,227,.75);

          color: #c8232b;

          font-size: 30px;
        }

        .home-request-info {
          flex: 1;

          text-align: right;
        }

        .home-request-info strong {
          display: block;

          color: #c8232b;

          font-size: 23px;
          font-weight: 900;
        }

        .home-request-info p {
          margin: 3px 0;

          color: #578895;

          font-size: 17px;
          font-weight: 600;
        }

        .home-request-info small {
          color: #578895;

          font-size: 15px;
          font-weight: 600;
        }

        .home-request-blood {
          width: 70px;
          height: 70px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,215,222,.7);

          color: #d31f28;
        }

        .home-request-blood svg {
          width: 50px;
          height: 50px;
        }

        .home-show-all {
          width: 145px;
          height: 48px;

          margin-top: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          border:
            2px solid
            rgba(255,255,255,.9);

          border-radius: 25px;

          background: rgba(255,255,255,.38);

          color: #078c88;

          font-size: 18px;
          font-weight: 700;

          text-decoration: none;
        }

        .home-show-all svg {
          width: 21px;
          height: 21px;
        }


        /* =====================================================
           BOTTOM DECORATION
           ===================================================== */

        .home-bottom-decoration {
          width: calc(100% + 32px);
          height: 190px;

          position: absolute;

          left: -16px;
          bottom: 73px;

          overflow: hidden;

          pointer-events: none;

          z-index: 1;
        }

        .home-wave {
          position: absolute;

          width: 125%;
          height: 160px;

          left: -12%;
          bottom: -45px;

          transform: rotate(-3deg);

          background:
            linear-gradient(
              175deg,
              transparent 30%,
              rgba(48,193,180,.32) 31%,
              rgba(48,193,180,.32) 68%,
              transparent 69%
            );
        }

        .home-bottom-ecg {
          width: 100%;
          height: 110px;

          position: absolute;

          left: 0;
          top: 25px;

          opacity: .85;
        }

        .home-medical-plus {
          width: 63px;
          height: 63px;

          position: absolute;

          right: 42px;
          bottom: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.23);

          color: #09a99b;

          font-size: 57px;
          font-weight: 300;
        }


        /* =====================================================
           HOME NAVIGATION
           ===================================================== */

        .home-local-nav {
          width: 100%;
          max-width: 480px;

          height: 91px;

          position: fixed;

          left: 50%;
          bottom: 0;

          transform: translateX(-50%);

          z-index: 99999;

          display: flex;
          align-items: center;
          justify-content: space-around;

          padding: 7px 10px 10px;

          background: rgba(246,255,254,.94);

          border-radius: 35px 35px 0 0;

          box-shadow:
            0 -8px 25px rgba(0,120,125,.08);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .home-local-nav a {
          flex: 1;

          height: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 5px;

          position: relative;

          color: #568795;

          text-decoration: none;

          font-size: 13px;
          font-weight: 600;

          transition: transform .15s ease;
        }

        .home-local-nav a svg {
          width: 30px;
          height: 30px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .home-local-nav a.active {
          color: #079a91;

          font-weight: 800;
        }

        .home-local-nav a.active::after {
          content: "";

          width: 38px;
          height: 5px;

          position: absolute;

          left: 50%;
          bottom: 0;

          transform: translateX(-50%);

          border-radius: 10px;

          background: #079a91;
        }

        .home-local-nav a:active {
          transform: scale(.93);
        }


        /* =====================================================
           SMALL PHONES
           ===================================================== */

        @media (max-width: 390px) {

          .home-reference {
            padding-left: 12px;
            padding-right: 12px;
          }

          .home-brand-logo {
            width: 66px;
            height: 66px;
          }

          .home-brand-text h1 {
            font-size: 23px;
          }

          .home-brand-text p {
            font-size: 13px;
          }

          .home-avatar {
            width: 55px;
            height: 55px;
          }

          .home-welcome h2 {
            font-size: 30px;
          }

          .home-welcome p {
            font-size: 19px;
          }

          .home-service {
            min-height: 255px;

            padding-left: 10px;
            padding-right: 10px;
          }

          .home-service-icon {
            width: 77px;
            height: 77px;
          }

          .home-service-icon svg {
            width: 58px;
            height: 58px;
          }

          .home-service h3 {
            font-size: 18px;
          }

          .home-service p {
            font-size: 15px;
          }

          .home-request-info strong {
            font-size: 20px;
          }

          .home-request-info p {
            font-size: 14px;
          }

          .home-request-info small {
            font-size: 13px;
          }

          .home-request-blood {
            width: 61px;
            height: 61px;
          }

          .home-request-blood svg {
            width: 44px;
            height: 44px;
          }

          .home-local-nav {
            height: 82px;
          }

          .home-local-nav a {
            font-size: 11px;
          }

          .home-local-nav a svg {
            width: 27px;
            height: 27px;
          }
        }

      `}</style>


      <main className="home-reference">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <header className="home-reference-header">

          <div className="home-brand">

            <div className="home-brand-logo">

              <svg viewBox="0 0 100 100">

                <path
                  d="
                    M50 82
                    C42 74 17 57 17 35
                    C17 19 29 10 42 10
                    C50 10 56 15 60 22
                    C64 15 70 10 78 10
                    C91 10 99 19 99 35
                    C99 57 74 74 50 82Z
                  "
                  fill="currentColor"
                />

                <path
                  d="
                    M22 48
                    H38
                    L44 38
                    L51 57
                    L58 31
                    L65 48
                    H82
                  "
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
                  d="
                    M18 8
                    a6 6 0 0 0-12 0
                    c0 7-3 7-3 9
                    h18
                    c0-2-3-2-3-9
                  "
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


        {/* =====================================================
            WELCOME
            ===================================================== */}

        <section className="home-welcome">

          <h2>
            مرحبًا، <span>{userName}</span>
          </h2>

          <p>مما ينبض حياة</p>

        </section>


        {/* =====================================================
            TOP ECG
            ===================================================== */}

        <div className="home-top-ecg">

          <svg
            viewBox="0 0 500 90"
            preserveAspectRatio="none"
          >

            <path
              d="
                M0 45
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
                H500
              "
              fill="none"
              stroke="rgba(255,255,255,.9)"
              strokeWidth="3"
            />

          </svg>

        </div>


        {/* =====================================================
            SEARCH
            ===================================================== */}

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


        {/* =====================================================
            SERVICES
            ===================================================== */}

        <section className="home-services">

          {/* BLOOD */}

          <Link
            to="/blood"
            className="home-service home-service-blood"
          >

            <div className="home-service-icon">

              <svg viewBox="0 0 64 64">

                <path
                  d="
                    M32 7
                    C32 7 14 28 14 40
                    C14 51 22 58 32 58
                    C42 58 50 51 50 40
                    C50 28 32 7 32 7Z
                  "
                  fill="currentColor"
                />

                <path
                  d="
                    M23 40
                    C23 47 27 50 31 51
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

              </svg>

            </div>

            <h3>
              التبرع بالدم والمخازن
            </h3>

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

            <h3>
              تبادل الأدوية
            </h3>

            <p>
              أدوية غير متوفرة
            </p>

            <div className="home-service-arrow">
              →
            </div>

          </Link>

        </section>


        {/* =====================================================
            URGENT REQUESTS
            ===================================================== */}

        <section className="home-requests">

          <div className="home-requests-title">

            <h3>
              طلبات عاجلة قريبة منك
            </h3>

            <svg viewBox="0 0 24 24">

              <path
                d="
                  M12 21
                  s7-6.2 7-12
                  A7 7 0 0 0 5 9
                  c0 5.8 7 12 7 12Z
                "
                fill="currentColor"
              />

            </svg>

          </div>


          <Link
            to={
              request
                ? `/track/${request.id}`
                : "/blood"
            }
            className="home-request-card"
          >

            <div className="home-request-arrow">
              →
            </div>


            <div className="home-request-info">

              <strong>
                فصيلة دم{" "}
                {request?.bloodType || "O+"}
              </strong>

              <p>
                {request?.hospital ||
                  "مستشفى النور التخصصي"}
              </p>

              <small>
                على بعد{" "}
                {request?.distanceKm || "2.3"} كم
              </small>

            </div>


            <div className="home-request-blood">

              <svg viewBox="0 0 64 64">

                <path
                  d="
                    M32 7
                    C32 7 14 28 14 40
                    C14 51 22 58 32 58
                    C42 58 50 51 50 40
                    C50 28 32 7 32 7Z
                  "
                  fill="currentColor"
                />

                <path
                  d="
                    M23 40
                    C23 47 27 50 31 51
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

              </svg>

            </div>

          </Link>


          <Link
            to="/blood"
            className="home-show-all"
          >

            عرض الكل

            <svg viewBox="0 0 24 24">

              <path
                d="
                  M12 21
                  s7-6.2 7-12
                  A7 7 0 0 0 5 9
                  c0 5.8 7 12 7 12Z
                "
                fill="currentColor"
              />

            </svg>

          </Link>

        </section>


        {/* =====================================================
            BOTTOM DECORATION
            ===================================================== */}

        <div className="home-bottom-decoration">

          <div className="home-wave"></div>

          <svg
            className="home-bottom-ecg"
            viewBox="0 0 500 100"
            preserveAspectRatio="none"
          >

            <path
              d="
                M0 55
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
                H500
              "
              fill="none"
              stroke="rgba(255,255,255,.9)"
              strokeWidth="4"
            />

          </svg>


          <div className="home-medical-plus">
            +
          </div>

        </div>


        {/* =====================================================
            HOME BOTTOM NAVIGATION
            ===================================================== */}

        <nav className="home-local-nav">

          {/* PROFILE */}

          <Link to="/profile">

            <svg viewBox="0 0 24 24">

              <circle
                cx="12"
                cy="7"
                r="4"
              />

              <path
                d="
                  M4 21
                  c0-4 3.5-7 8-7
                  s8 3 8 7
                "
              />

            </svg>

            <span>
              الملف الشخصي
            </span>

          </Link>


          {/* NOTIFICATIONS */}

          <Link to="/notifications">

            <svg viewBox="0 0 24 24">

              <path
                d="
                  M18 8
                  a6 6 0 0 0-12 0
                  c0 7-3 7-3 9
                  h18
                  c0-2-3-2-3-9
                "
              />

              <path d="M10 21h4" />

            </svg>

            <span>
              الإشعارات
            </span>

          </Link>


          {/* REQUESTS */}

          <Link to="/requests">

            <svg viewBox="0 0 24 24">

              <rect
                x="5"
                y="3"
                width="14"
                height="18"
                rx="3"
              />

              <path d="M9 7h6" />
              <path d="M9 11h6" />
              <path d="M9 15h4" />

            </svg>

            <span>
              الطلبات
            </span>

          </Link>


          {/* HOME */}

          <Link
            to="/home"
            className="active"
          >

            <svg viewBox="0 0 24 24">

              <path
                d="M3 11.5 12 4l9 7.5"
              />

              <path
                d="M5 10.5V21h14V10.5"
              />

              <path
                d="M9 21v-6h6v6"
              />

            </svg>

            <span>
              الرئيسية
            </span>

          </Link>

        </nav>

      </main>
    </>
  );
}

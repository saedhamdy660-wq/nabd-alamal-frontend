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

        /* ================================
           HOME ONLY
        ================================= */

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

          padding: 20px 16px 105px;

          background:
            radial-gradient(
              circle at 5% 5%,
              rgba(255,255,255,.95) 0%,
              transparent 24%
            ),
            radial-gradient(
              circle at 95% 18%,
              rgba(255,255,255,.65) 0%,
              transparent 25%
            ),
            linear-gradient(
              180deg,
              #c9f7f3 0%,
              #edfffd 43%,
              #d7faf6 75%,
              #a7dfd9 100%
            );

          color: #075d63;
        }

        .home-reference::before {
          content: "";

          position: absolute;

          width: 280px;
          height: 280px;

          left: -150px;
          top: 180px;

          border-radius: 50%;

          background: rgba(255,255,255,.28);

          filter: blur(40px);

          pointer-events: none;
        }

        .home-reference::after {
          content: "";

          position: absolute;

          width: 300px;
          height: 300px;

          right: -160px;
          bottom: 100px;

          border-radius: 50%;

          background: rgba(255,255,255,.25);

          filter: blur(40px);

          pointer-events: none;
        }


        /* HEADER */

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

          gap: 5px;
        }

        .home-brand-logo {
          width: 72px;
          height: 72px;

          flex-shrink: 0;

          color: #079b94;
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

          color: #078c88;

          font-size: 29px;
          font-weight: 900;

          line-height: 1;
        }

        .home-brand-text p {
          margin: 6px 0 0;

          color: #168c91;

          font-size: 15px;
          font-weight: 700;
        }

        .home-header-actions {
          display: flex;
          align-items: center;

          gap: 8px;
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
          width: 34px;
          height: 34px;
        }

        .home-notification span {
          width: 8px;
          height: 8px;

          position: absolute;

          top: 4px;
          right: 4px;

          border-radius: 50%;

          background: #08a99c;

          border: 2px solid #c9f7f3;
        }

        .home-avatar {
          width: 59px;
          height: 59px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background-color: #e4f9f6;
          background-position: center;
          background-size: cover;

          border: 4px solid rgba(255,255,255,.95);

          box-shadow: 0 7px 20px rgba(0,120,125,.14);

          color: #078b87;

          font-size: 23px;

          text-decoration: none;

          overflow: hidden;
        }


        /* WELCOME */

        .home-welcome {
          width: 100%;
          max-width: 430px;

          margin: 19px auto 0;

          position: relative;
          z-index: 5;

          text-align: right;
        }

        .home-welcome h2 {
          margin: 0;

          color: #075d63;

          font-size: 31px;
          font-weight: 900;

          line-height: 1.25;
        }

        .home-welcome p {
          margin: 4px 0 0;

          color: #578895;

          font-size: 20px;
          font-weight: 700;
        }


        /* ECG */

        .home-top-ecg {
          width: calc(100% + 32px);
          height: 66px;

          margin: -2px -16px 0;

          position: relative;

          z-index: 2;

          opacity: .7;

          pointer-events: none;
        }

        .home-top-ecg svg {
          width: 100%;
          height: 100%;
        }


        /* SEARCH */

        .home-search {
          width: 100%;
          max-width: 430px;

          height: 62px;

          margin: 0 auto 22px;

          display: flex;
          align-items: center;

          position: relative;
          z-index: 10;

          background: rgba(255,255,255,.66);

          border: 2px solid rgba(255,255,255,.95);

          border-radius: 34px;

          box-shadow:
            0 9px 24px rgba(0,120,125,.11),
            inset 0 2px 8px rgba(255,255,255,.8);

          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);
        }

        .home-search input {
          flex: 1;

          width: 100%;
          height: 100%;

          padding: 0 21px;

          border: 0;
          outline: 0;

          background: transparent;

          color: #276e7e;

          font-family: inherit;

          font-size: 17px;
          font-weight: 700;

          text-align: right;

          direction: rtl;
        }

        .home-search input::placeholder {
          color: #5b8e9c;
        }

        .home-search svg {
          width: 35px;
          height: 35px;

          margin-left: 17px;

          flex-shrink: 0;

          color: #087987;
        }


        /* SERVICES */

        .home-services {
          width: 100%;
          max-width: 430px;

          margin: 0 auto 23px;

          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 14px;

          /*
             مهم جدًا:
             نخلي اتجاه الجريد LTR
             عشان الدم يكون على الشمال
             والأدوية على اليمين.
          */
          direction: ltr;

          position: relative;
          z-index: 10;
        }

        .home-service {
          min-height: 225px;

          padding: 20px 11px 16px;

          display: flex;
          flex-direction: column;
          align-items: center;

          position: relative;
          overflow: hidden;

          border-radius: 27px;

          text-align: center;
          text-decoration: none;

          box-shadow:
            0 9px 22px rgba(0,120,125,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);

          direction: rtl;
        }

        .home-service::after {
          content: "";

          position: absolute;

          width: 150px;
          height: 150px;

          right: -70px;
          bottom: -90px;

          border-radius: 50%;

          background: rgba(255,255,255,.28);
        }

        .home-service-blood {
          color: #c8232b;

          background: rgba(255,241,245,.78);

          border: 2px solid rgba(255,185,201,.7);
        }

        .home-service-medicine {
          color: #078b87;

          background: rgba(224,250,247,.75);

          border: 2px solid rgba(125,224,215,.7);
        }

        .home-service-icon {
          width: 73px;
          height: 73px;

          margin-bottom: 13px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.48);

          position: relative;
          z-index: 2;
        }

        .home-service-icon svg {
          width: 54px;
          height: 54px;
        }

        .home-service h3 {
          margin: 0;

          position: relative;
          z-index: 2;

          font-size: 20px;
          font-weight: 900;

          line-height: 1.3;
        }

        .home-service p {
          margin: 5px 0 0;

          position: relative;
          z-index: 2;

          color: #5b8995;

          font-size: 15px;
          font-weight: 700;
        }

        .home-service-arrow {
          width: 38px;
          height: 38px;

          position: absolute;

          left: 13px;
          bottom: 13px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.48);

          font-size: 27px;

          z-index: 4;
        }


        /* URGENT REQUESTS */

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

          gap: 6px;

          margin-bottom: 10px;
        }

        .home-requests-title h3 {
          margin: 0;

          color: #075d63;

          font-size: 20px;
          font-weight: 900;
        }

        .home-requests-title svg {
          width: 23px;
          height: 23px;

          color: #079a94;
        }

        .home-request-card {
          width: 100%;
          min-height: 102px;

          padding: 12px 14px;

          display: flex;
          align-items: center;

          gap: 9px;

          position: relative;

          border-radius: 23px;

          background: rgba(255,245,247,.78);

          border: 2px solid rgba(255,207,215,.75);

          box-shadow:
            0 8px 20px rgba(0,120,125,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          color: inherit;

          text-decoration: none;
        }

        .home-request-arrow {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,221,227,.78);

          color: #c8232b;

          font-size: 27px;
        }

        .home-request-info {
          flex: 1;

          text-align: right;
        }

        .home-request-info strong {
          display: block;

          color: #c8232b;

          font-size: 19px;
          font-weight: 900;
        }

        .home-request-info p {
          margin: 2px 0;

          color: #578895;

          font-size: 14px;
          font-weight: 700;
        }

        .home-request-info small {
          color: #578895;

          font-size: 13px;
          font-weight: 700;
        }

        .home-request-blood {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,215,222,.72);

          color: #d31f28;
        }

        .home-request-blood svg {
          width: 41px;
          height: 41px;
        }

        .home-show-all {
          width: 125px;
          height: 42px;

          margin-top: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 4px;

          border: 2px solid rgba(255,255,255,.92);

          border-radius: 23px;

          background: rgba(255,255,255,.42);

          color: #078c88;

          font-size: 16px;
          font-weight: 800;

          text-decoration: none;
        }

        .home-show-all svg {
          width: 19px;
          height: 19px;
        }


        /* BOTTOM DECORATION */

        .home-bottom-decoration {
          width: calc(100% + 32px);
          height: 120px;

          position: absolute;

          left: -16px;
          bottom: 74px;

          overflow: hidden;

          pointer-events: none;

          z-index: 1;
        }

        .home-bottom-ecg {
          width: 100%;
          height: 80px;

          position: absolute;

          left: 0;
          top: 22px;

          opacity: .65;
        }

        .home-medical-plus {
          width: 50px;
          height: 50px;

          position: absolute;

          right: 25px;
          bottom: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,.25);

          color: #09a99b;

          font-size: 45px;
          font-weight: 300;
        }


        /* =================================
           BOTTOM NAVIGATION
        ================================= */

        .home-local-nav {
          width: 100%;
          max-width: 480px;

          height: 82px;

          position: fixed;

          left: 50%;
          bottom: 0;

          transform: translateX(-50%);

          z-index: 99999;

          display: flex;
          align-items: center;
          justify-content: space-around;

          padding: 6px 8px 8px;

          background: rgba(246,255,254,.95);

          border-radius: 30px 30px 0 0;

          box-shadow:
            0 -8px 25px rgba(0,120,125,.08);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          /*
             مهم:
             ترتيب العناصر يكون من الشمال لليمين:
             الملف الشخصي - الإشعارات - الطلبات - الرئيسية
          */
          direction: ltr;
        }

        .home-local-nav a {
          flex: 1;

          height: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 3px;

          position: relative;

          color: #568795;

          text-decoration: none;

          font-size: 12px;
          font-weight: 700;

          direction: rtl;
        }

        .home-local-nav a svg {
          width: 29px;
          height: 29px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .home-local-nav a.active {
          color: #079a91;

          font-weight: 900;
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


        /* SMALL PHONES */

        @media (max-width: 390px) {

          .home-reference {
            padding-left: 12px;
            padding-right: 12px;
          }

          .home-brand-logo {
            width: 64px;
            height: 64px;
          }

          .home-brand-text h1 {
            font-size: 23px;
          }

          .home-brand-text p {
            font-size: 12px;
          }

          .home-avatar {
            width: 54px;
            height: 54px;
          }

          .home-welcome h2 {
            font-size: 28px;
          }

          .home-welcome p {
            font-size: 18px;
          }

          .home-top-ecg {
            height: 58px;
          }

          .home-search {
            height: 58px;
          }

          .home-service {
            min-height: 210px;
          }

          .home-service-icon {
            width: 66px;
            height: 66px;
          }

          .home-service-icon svg {
            width: 49px;
            height: 49px;
          }

          .home-service h3 {
            font-size: 18px;
          }

          .home-service p {
            font-size: 14px;
          }

          .home-request-info strong {
            font-size: 17px;
          }

          .home-request-info p {
            font-size: 13px;
          }

          .home-request-info small {
            font-size: 12px;
          }

          .home-local-nav {
            height: 78px;
          }

          .home-local-nav a {
            font-size: 10px;
          }

          .home-local-nav a svg {
            width: 26px;
            height: 26px;
          }
        }

      `}</style>


      <main className="home-reference">

        {/* HEADER */}

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


        {/* WELCOME */}

        <section className="home-welcome">

          <h2>
            مرحبًا، {userName}
          </h2>

          <p>
            مما ينبض حياة
          </p>

        </section>


        {/* ECG */}

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


        {/* SEARCH */}

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


        {/* SERVICES */}

        <section className="home-services">

          {/* الدم - الشمال */}

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
              التبرع بالدم
              <br />
              والمخازن
            </h3>

            <div className="home-service-arrow">
              →
            </div>

          </Link>


          {/* الأدوية - اليمين */}

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


        {/* URGENT REQUESTS */}

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


        {/* BOTTOM ECG */}

        <div className="home-bottom-decoration">

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


        {/* BOTTOM NAV */}

        <nav className="home-local-nav">

          {/* الشمال */}

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


          {/* اليمين - الرئيسية */}

          <Link
            to="/home"
            className="active"
          >

            <svg viewBox="0 0 24 24">

              <path d="M3 11.5 12 4l9 7.5" />

              <path d="M5 10.5V21h14V10.5" />

              <path d="M9 21v-6h6v6" />

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

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

  const bloodType =
    request?.bloodType ||
    request?.blood_group ||
    "O+";

  const hospital =
    request?.hospital ||
    request?.hospitalName ||
    "مستشفى النور التخصصي";

  const distance =
    request?.distance ||
    "2.3";

  return (
    <>
      <div className="home-reference" dir="rtl">

        {/* ================= HEADER ================= */}
        <header className="home-header">

          <div className="brand-box">

            <div className="heart-logo">
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M32 54S9 40 9 23C9 15 14.5 10 21 10C26 10 30 13 32 17C34 13 38 10 43 10C49.5 10 55 15 55 23C55 40 32 54 32 54Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M12 31H21L25 24L30 37L35 20L40 31H52"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="brand-text">
              <h1>نبض الأمل</h1>
              <span>استجابة طبية طارئة</span>
            </div>

          </div>

          <div className="header-actions">

            <Link
              to="/notifications"
              className="header-icon"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 9C18 5.7 15.8 3 12 3C8.2 3 6 5.7 6 9C6 15 3.5 16 3.5 18H20.5C20.5 16 18 15 18 9Z"
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
            </Link>

            <Link
              to="/profile"
              className="profile-avatar"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="profile"
                />
              ) : (
                <div className="default-avatar">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M5 20C5.8 16.3 8.1 14.5 12 14.5C15.9 14.5 18.2 16.3 19 20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </Link>

          </div>

        </header>


        {/* ================= WELCOME ================= */}
        <section className="welcome-section">

          <h2>
            مرحبًا، <span>{userName}</span>
          </h2>

          <p>معًا ننقذ الحياة</p>

          <div className="ecg-line">
            <svg
              viewBox="0 0 300 40"
              preserveAspectRatio="none"
            >
              <path d="M0 22H55L65 22L72 15L79 30L87 5L96 34L104 22H150L160 22L168 15L175 30L183 5L192 34L200 22H300" />
            </svg>
          </div>

        </section>


        {/* ================= SEARCH ================= */}
        <Link
          to="/medicines"
          className="home-search"
        >

          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="10.8"
              cy="10.8"
              r="6.8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <span>ابحث عن دواء أو جمعية..</span>

        </Link>


        {/* ================= SERVICES ================= */}
        <section className="services-section">

          {/* BLOOD */}
          <Link
            to="/blood"
            className="home-service blood-service"
          >

            <div className="service-icon">
              <svg
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M25 39C26.5 43 29 45 33 45"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="service-content">
              <h3>التبرع بالدم والمخازن</h3>
            </div>

            <div className="service-arrow">
              ←
            </div>

          </Link>


          {/* MEDICINE */}
          <Link
            to="/medicines"
            className="home-service medicine-service"
          >

            <div className="service-icon">
              <svg
                viewBox="0 0 64 64"
                fill="none"
              >
                <rect
                  x="11"
                  y="23"
                  width="42"
                  height="18"
                  rx="9"
                  transform="rotate(-25 11 23)"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M29 17L39 38"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="service-content">
              <h3>تبادل الأدوية</h3>
              <p>أدوية غير متوفرة</p>
            </div>

            <div className="service-arrow">
              ←
            </div>

          </Link>

        </section>


        {/* ================= URGENT REQUESTS ================= */}
        <section className="urgent-section">

          <div className="section-heading">

            <h2>
              طلبات عاجلة قريبة منك
            </h2>

            <span className="location-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21S19 15.5 19 9.5C19 5.9 16.3 3 12 3C7.7 3 5 5.9 5 9.5C5 15.5 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="9.5"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </span>

          </div>


          {request ? (

            <Link
              to={`/track/${request.id}`}
              className="urgent-card"
            >

              <div className="blood-circle">
                {bloodType}
              </div>

              <div className="urgent-info">

                <strong>
                  فصيلة دم {bloodType}
                </strong>

                <p>
                  {hospital}
                </p>

                <small>
                  على بعد {distance} كم
                </small>

              </div>

              <div className="urgent-arrow">
                ←
              </div>

            </Link>

          ) : (

            <div className="urgent-card">

              <div className="blood-circle">
                O+
              </div>

              <div className="urgent-info">

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

              <div className="urgent-arrow">
                ←
              </div>

            </div>

          )}


          <Link
            to="/blood"
            className="show-all"
          >
            عرض الكل
          </Link>

        </section>


        {/* ================= DECORATION ================= */}
        <div className="home-decoration">

          <div className="decoration-plus">
            +
          </div>

          <svg
            className="decoration-ecg"
            viewBox="0 0 350 60"
            preserveAspectRatio="none"
          >
            <path d="M0 35H95L105 35L113 26L121 46L130 5L140 55L150 35H215L225 35L233 26L241 46L250 5L260 55L270 35H350" />
          </svg>

        </div>

      </div>


      {/* ================= BOTTOM NAV ================= */}
      <nav
        className="bottom-nav"
        dir="ltr"
      >

        <Link
          to="/profile"
          className="bottom-item"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="8"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M5 20C5.8 16.3 8.1 14.5 12 14.5C15.9 14.5 18.2 16.3 19 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>
            الملف الشخصي
          </span>
        </Link>


        <Link
          to="/notifications"
          className="bottom-item"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 9C18 5.7 15.8 3 12 3C8.2 3 6 5.7 6 9C6 15 3.5 16 3.5 18H20.5C20.5 16 18 15 18 9Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M10 21H14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>
            الإشعارات
          </span>
        </Link>


        <Link
          to="/requests"
          className="bottom-item"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 5H19V19H5V5Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 9H16M8 13H16M8 17H13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>
            الطلبات
          </span>
        </Link>


        <Link
          to="/home"
          className="bottom-item active"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 11.5L12 4L20 11.5V20H4V11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 20V14H15V20"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>

          <span>
            الرئيسية
          </span>
        </Link>

      </nav>


      {/* ================= STYLES ================= */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: Arial, Tahoma, sans-serif;
        }


        /* ================= MAIN BACKGROUND ================= */

        .home-reference {
          min-height: 100vh;
          width: 100%;

          padding:
            12px
            13px
            105px;

          overflow-x: hidden;

          position: relative;

          color: #16494b;

          background:
            radial-gradient(
              circle at 5% 8%,
              rgba(255,255,255,.85) 0 3%,
              transparent 20%
            ),
            radial-gradient(
              circle at 93% 18%,
              rgba(255,255,255,.48) 0 5%,
              transparent 21%
            ),
            radial-gradient(
              circle at 15% 75%,
              rgba(255,255,255,.25) 0 5%,
              transparent 22%
            ),
            linear-gradient(
              145deg,
              #efffff 0%,
              #c9f2ef 48%,
              #9fddd8 100%
            );
        }


        /* ================= HEADER ================= */

        .home-header {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          direction: ltr;

          margin-bottom: 11px;
        }

        .brand-box {
          display: flex;
          align-items: center;

          gap: 7px;

          direction: rtl;
        }

        .heart-logo {
          width: 42px;
          height: 42px;

          border-radius: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #159b8a;

          background:
            rgba(255,255,255,.58);

          border:
            1px solid rgba(255,255,255,.8);

          box-shadow:
            0 5px 15px rgba(43,130,130,.09);
        }

        .heart-logo svg {
          width: 31px;
          height: 31px;
        }

        .brand-box h1 {
          margin: 0;

          font-size: 20px;
          line-height: 1.1;

          font-weight: 800;

          color: #167c78;
        }

        .brand-box span {
          display: block;

          margin-top: 3px;

          font-size: 9px;

          color: #648486;
        }


        .header-actions {
          display: flex;
          align-items: center;

          gap: 7px;
        }

        .header-icon,
        .profile-avatar {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          text-decoration: none;
        }

        .header-icon {
          color: #337477;

          background:
            rgba(255,255,255,.5);

          border:
            1px solid rgba(255,255,255,.7);
        }

        .header-icon svg {
          width: 20px;
          height: 20px;
        }

        .profile-avatar {
          overflow: hidden;

          background:
            rgba(255,255,255,.68);

          border:
            2px solid rgba(255,255,255,.85);
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }

        .default-avatar {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #348985;
        }

        .default-avatar svg {
          width: 23px;
          height: 23px;
        }


        /* ================= WELCOME ================= */

        .welcome-section {
          position: relative;
          z-index: 2;

          margin-bottom: 8px;

          text-align: right;
        }

        .welcome-section h2 {
          margin: 0;

          font-size: 25px;
          line-height: 1.2;

          font-weight: 800;

          color: #174b4d;
        }

        .welcome-section h2 span {
          color: #159b89;
        }

        .welcome-section p {
          margin: 3px 0 5px;

          font-size: 15px;

          font-weight: 600;

          color: #5f8384;
        }

        .ecg-line {
          width: 100%;
          height: 27px;

          opacity: .82;

          overflow: hidden;
        }

        .ecg-line svg {
          width: 100%;
          height: 100%;
        }

        .ecg-line path {
          fill: none;

          stroke: #26a899;

          stroke-width: 2.2;

          stroke-linecap: round;
          stroke-linejoin: round;
        }


        /* ================= SEARCH ================= */

        .home-search {
          position: relative;
          z-index: 2;

          width: 100%;
          height: 53px;

          margin-bottom: 11px;

          padding: 0 17px;

          display: flex;
          align-items: center;

          gap: 10px;

          text-decoration: none;

          color: #729091;

          background:
            rgba(255,255,255,.7);

          border:
            1px solid rgba(255,255,255,.82);

          border-radius: 27px;

          box-shadow:
            0 8px 22px rgba(42,128,128,.08);

          backdrop-filter: blur(8px);
        }

        .home-search svg {
          width: 21px;
          height: 21px;

          flex-shrink: 0;
        }

        .home-search span {
          font-size: 14px;
          font-weight: 500;
        }


        /* ================= SERVICES ================= */

        .services-section {
          position: relative;
          z-index: 2;

          display: grid;
          grid-template-columns: 1fr 1fr;

          gap: 10px;

          margin-bottom: 14px;
        }

        .home-service {
          min-width: 0;

          height: 168px;

          padding: 13px 10px 12px;

          display: flex;
          flex-direction: column;

          position: relative;

          overflow: hidden;

          text-decoration: none;

          border-radius: 24px;

          box-shadow:
            0 9px 22px rgba(42,128,128,.09);

          transition:
            transform .18s ease;
        }

        .home-service:active {
          transform: scale(.98);
        }

        .blood-service {
          color: #9c4b5a;

          background:
            linear-gradient(
              145deg,
              #ffe7ec,
              #f8cdd6
            );

          border:
            1px solid rgba(255,255,255,.65);
        }

        .medicine-service {
          color: #258b76;

          background:
            linear-gradient(
              145deg,
              #e1fff5,
              #bcefe0
            );

          border:
            1px solid rgba(255,255,255,.7);
        }

        .service-icon {
          width: 57px;
          height: 57px;

          border-radius: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            rgba(255,255,255,.42);

          flex-shrink: 0;
        }

        .service-icon svg {
          width: 43px;
          height: 43px;
        }

        .service-content {
          margin-top: auto;

          padding-left: 2px;
          padding-right: 2px;

          text-align: right;
        }

        .service-content h3 {
          margin: 0;

          font-size: 15px;
          line-height: 1.45;

          font-weight: 800;
        }

        .service-content p {
          margin: 2px 0 0;

          font-size: 11px;

          font-weight: 600;

          opacity: .72;
        }

        .service-arrow {
          position: absolute;

          left: 11px;
          bottom: 11px;

          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(255,255,255,.55);

          font-size: 18px;
          font-weight: 700;
        }

        .blood-service .service-arrow {
          color: #c34d61;
        }

        .medicine-service .service-arrow {
          color: #218b75;
        }


        /* ================= URGENT ================= */

        .urgent-section {
          position: relative;
          z-index: 2;

          margin-bottom: 9px;
        }

        .section-heading {
          display: flex;
          align-items: center;

          justify-content: flex-start;

          gap: 6px;

          margin-bottom: 8px;
        }

        .section-heading h2 {
          margin: 0;

          font-size: 17px;
          line-height: 1.3;

          font-weight: 800;

          color: #245b5d;
        }

        .location-icon {
          width: 23px;
          height: 23px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #159b8a;
        }

        .location-icon svg {
          width: 21px;
          height: 21px;
        }


        .urgent-card {
          width: 100%;
          min-height: 87px;

          padding: 9px 10px;

          display: flex;
          align-items: center;

          gap: 9px;

          text-decoration: none;

          color: #24575a;

          background:
            rgba(255,255,255,.67);

          border:
            1px solid rgba(255,255,255,.82);

          border-radius: 20px;

          box-shadow:
            0 8px 20px rgba(42,128,128,.08);

          backdrop-filter: blur(8px);
        }

        .blood-circle {
          width: 51px;
          height: 51px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #c34d61;

          background:
            #ffe0e6;

          border:
            2px solid rgba(255,255,255,.8);

          font-size: 13px;

          font-weight: 800;
        }

        .urgent-info {
          min-width: 0;

          flex: 1;

          text-align: right;
        }

        .urgent-info strong {
          display: block;

          margin-bottom: 2px;

          font-size: 15px;

          font-weight: 800;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .urgent-info p {
          margin: 0 0 2px;

          font-size: 12px;

          color: #567879;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .urgent-info small {
          display: block;

          font-size: 10px;

          color: #789293;
        }

        .urgent-arrow {
          width: 30px;
          height: 30px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background:
            rgba(221,250,245,.9);

          font-size: 17px;
          font-weight: 700;
        }


        /* ================= SHOW ALL ================= */

        .show-all {
          width: 112px;
          height: 37px;

          margin:
            8px
            auto
            0;

          display: flex;
          align-items: center;
          justify-content: center;

          text-decoration: none;

          color: #178e81;

          background:
            rgba(255,255,255,.64);

          border:
            1px solid rgba(255,255,255,.75);

          border-radius: 20px;

          font-size: 12px;
          font-weight: 800;

          box-shadow:
            0 5px 13px rgba(42,128,128,.06);
        }


        /* ================= DECORATION ================= */

        .home-decoration {
          height: 47px;

          position: relative;

          margin-top: 3px;

          overflow: hidden;

          opacity: .72;
        }

        .decoration-plus {
          position: absolute;

          right: 10px;
          top: 0;

          color: #159b8a;

          font-size: 27px;
          line-height: 1;

          font-weight: 300;
        }

        .decoration-ecg {
          position: absolute;

          left: -8%;
          bottom: -1px;

          width: 116%;
          height: 39px;
        }

        .decoration-ecg path {
          fill: none;

          stroke: #36aa9d;

          stroke-width: 2;

          stroke-linecap: round;
          stroke-linejoin: round;
        }


        /* ================= BOTTOM NAV ================= */

        .bottom-nav {
          position: fixed;

          z-index: 1000;

          left: 9px;
          right: 9px;
          bottom: 8px;

          height: 69px;

          padding: 5px 4px;

          display: grid;
          grid-template-columns:
            repeat(4, 1fr);

          align-items: stretch;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid rgba(255,255,255,.95);

          border-radius: 24px;

          box-shadow:
            0 8px 28px rgba(38,107,107,.15);

          backdrop-filter: blur(14px);
        }

        .bottom-item {
          min-width: 0;

          position: relative;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;

          text-decoration: none;

          color: #789394;

          font-size: 9px;

          font-weight: 700;
        }

        .bottom-item svg {
          width: 24px;
          height: 24px;
        }

        .bottom-item.active {
          color: #159b8a;
        }

        .bottom-item.active::after {
          content: "";

          position: absolute;

          bottom: 1px;

          width: 28px;
          height: 3px;

          border-radius: 5px;

          background: #159b8a;
        }


        /* ================= SMALL PHONES ================= */

        @media (max-width: 360px) {

          .home-reference {
            padding-left: 10px;
            padding-right: 10px;
          }

          .brand-box h1 {
            font-size: 18px;
          }

          .brand-box span {
            font-size: 8px;
          }

          .heart-logo {
            width: 39px;
            height: 39px;
          }

          .header-icon,
          .profile-avatar {
            width: 35px;
            height: 35px;
          }

          .welcome-section h2 {
            font-size: 23px;
          }

          .home-service {
            height: 157px;
          }

          .service-icon {
            width: 52px;
            height: 52px;
          }

          .service-icon svg {
            width: 39px;
            height: 39px;
          }

          .service-content h3 {
            font-size: 13px;
          }

          .section-heading h2 {
            font-size: 15px;
          }

          .urgent-info strong {
            font-size: 14px;
          }

          .urgent-info p {
            font-size: 11px;
          }

          .bottom-item {
            font-size: 8px;
          }

          .bottom-item svg {
            width: 22px;
            height: 22px;
          }
        }

      `}</style>
    </>
  );
}

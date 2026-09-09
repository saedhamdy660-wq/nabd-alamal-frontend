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
      <div className="home-reference" dir="rtl">

        {/* HEADER */}
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

            <div>
              <h1>نبض الأمل</h1>
              <span>استجابة طبية طارئة</span>
            </div>
          </div>

          <div className="header-actions">
            <Link to="/notifications" className="header-icon">
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

            <Link to="/profile" className="profile-avatar">
              {avatar ? (
                <img src={avatar} alt="profile" />
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

        {/* WELCOME */}
        <section className="welcome-section">
          <h2>
            مرحبًا، <span>{userName}</span>
          </h2>

          <p>مما ينبض حياة</p>

          <div className="ecg-line">
            <span></span>
            <svg viewBox="0 0 300 40" preserveAspectRatio="none">
              <path
                d="M0 22H55L65 22L72 15L79 30L87 5L96 34L104 22H150L160 22L168 15L175 30L183 5L192 34L200 22H300"
              />
            </svg>
          </div>
        </section>

        {/* SEARCH */}
        <Link to="/medicines" className="home-search">
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

        {/* SERVICES */}
        <section className="services-section">

          {/* BLOOD */}
          <Link to="/blood" className="home-service blood-service">
            <div className="service-icon">
              <svg viewBox="0 0 64 64" fill="none">
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
          <Link to="/medicines" className="home-service medicine-service">
            <div className="service-icon">
              <svg viewBox="0 0 64 64" fill="none">
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

        {/* URGENT REQUESTS */}
        <section className="urgent-section">

          <div className="section-heading">
            <h2>طلبات عاجلة قريبة منك</h2>

            <span className="location-icon">
              <svg viewBox="0 0 24 24" fill="none">
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
                {request.bloodType || request.blood_group || "O+"}
              </div>

              <div className="urgent-info">
                <strong>
                  فصيلة دم {request.bloodType || request.blood_group || "O+"}
                </strong>

                <p>
                  {request.hospital ||
                    request.hospitalName ||
                    "مستشفى النور التخصصي"}
                </p>

                <small>
                  على بعد {request.distance || "2.3"} كم
                </small>
              </div>

              <div className="urgent-arrow">
                ←
              </div>
            </Link>
          ) : (
            <div className="urgent-card empty-request">
              <div className="blood-circle">
                O+
              </div>

              <div className="urgent-info">
                <strong>فصيلة دم O+</strong>
                <p>مستشفى النور التخصصي</p>
                <small>على بعد 2.3 كم</small>
              </div>

              <div className="urgent-arrow">
                ←
              </div>
            </div>
          )}

          <Link to="/blood" className="show-all">
            عرض الكل
          </Link>

        </section>

        {/* DECORATION */}
        <div className="home-decoration">
          <div className="decoration-plus">+</div>

          <svg
            className="decoration-ecg"
            viewBox="0 0 350 60"
            preserveAspectRatio="none"
          >
            <path d="M0 35H95L105 35L113 26L121 46L130 5L140 55L150 35H215L225 35L233 26L241 46L250 5L260 55L270 35H350" />
          </svg>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav" dir="ltr">

        <Link to="/profile" className="bottom-item">
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
          <span>الملف الشخصي</span>
        </Link>

        <Link to="/notifications" className="bottom-item">
          <svg viewBox="0 0 24 24" fill="none">
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
          <span>الإشعارات</span>
        </Link>

        <Link to="/requests" className="bottom-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 5H19V19H5V5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M8 9H16M8 13H16M8 17H13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>الطلبات</span>
        </Link>

        <Link to="/home" className="bottom-item active">
          <svg viewBox="0 0 24 24" fill="none">
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
          <span>الرئيسية</span>
        </Link>

      </nav>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .home-reference {
          min-height: 100vh;
          width: 100%;
          padding: 16px 14px 88px;
          overflow-x: hidden;
          position: relative;
          color: #123b3d;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,255,255,.72) 0 5%, transparent 22%),
            radial-gradient(circle at 90% 25%, rgba(255,255,255,.42) 0 7%, transparent 24%),
            radial-gradient(circle at 20% 70%, rgba(255,255,255,.30) 0 8%, transparent 26%),
            linear-gradient(145deg, #e9ffff 0%, #bdeeee 48%, #9bded9 100%);
          font-family: Arial, Tahoma, sans-serif;
        }

        .home-reference::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          top: 75px;
          right: -70px;
          border-radius: 50%;
          background: rgba(255,255,255,.28);
          filter: blur(2px);
          pointer-events: none;
        }

        .home-reference::after {
          content: "";
          position: absolute;
          width: 120px;
          height: 120px;
          bottom: 90px;
          left: -55px;
          border-radius: 50%;
          background: rgba(255,255,255,.20);
          pointer-events: none;
        }

        /* HEADER */

        .home-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          direction: ltr;
          margin-bottom: 18px;
        }

        .brand-box {
          display: flex;
          align-items: center;
          gap: 8px;
          direction: rtl;
        }

        .heart-logo {
          width: 43px;
          height: 43px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #159c89;
          background: rgba(255,255,255,.46);
          border: 1px solid rgba(255,255,255,.65);
          box-shadow: 0 5px 16px rgba(43,130,130,.10);
        }

        .heart-logo svg {
          width: 32px;
          height: 32px;
        }

        .brand-box h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          color: #126d6b;
        }

        .brand-box span {
          display: block;
          margin-top: 1px;
          font-size: 10px;
          color: #5a7f80;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          direction: ltr;
        }

        .header-icon,
        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .header-icon {
          color: #2b6e70;
          background: rgba(255,255,255,.48);
          border: 1px solid rgba(255,255,255,.55);
        }

        .header-icon svg {
          width: 21px;
          height: 21px;
        }

        .profile-avatar {
          overflow: hidden;
          background: rgba(255,255,255,.60);
          border: 2px solid rgba(255,255,255,.75);
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
          color: #2c8582;
        }

        .default-avatar svg {
          width: 24px;
          height: 24px;
        }

        /* WELCOME */

        .welcome-section {
          position: relative;
          z-index: 2;
          margin-bottom: 14px;
          text-align: right;
        }

        .welcome-section h2 {
          margin: 0;
          font-size: 28px;
          line-height: 1.15;
          font-weight: 800;
          color: #15494b;
        }

        .welcome-section h2 span {
          color: #159a87;
        }

        .welcome-section p {
          margin: 5px 0 9px;
          font-size: 17px;
          font-weight: 600;
          color: #5b7b7c;
        }

        .ecg-line {
          width: 100%;
          height: 29px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .ecg-line svg {
          width: 100%;
          height: 29px;
        }

        .ecg-line path {
          fill: none;
          stroke: #1a9e8d;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* SEARCH */

        .home-search {
          position: relative;
          z-index: 2;
          height: 56px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 17px;
          margin-bottom: 13px;
          border-radius: 28px;
          text-decoration: none;
          color: #789393;
          background: rgba(255,255,255,.63);
          border: 1px solid rgba(255,255,255,.78);
          box-shadow:
            0 8px 22px rgba(55,128,128,.10),
            inset 0 1px 1px rgba(255,255,255,.8);
          backdrop-filter: blur(12px);
        }

        .home-search svg {
          width: 21px;
          height: 21px;
          flex: 0 0 auto;
        }

        .home-search span {
          font-size: 15px;
        }

        /* SERVICES */

        .services-section {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          direction: ltr;
          gap: 10px;
          margin-bottom: 17px;
        }

        .home-service {
          min-height: 195px;
          padding: 13px 9px 11px;
          border-radius: 25px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: flex-start;
          box-shadow:
            0 9px 22px rgba(40,100,100,.10),
            inset 0 1px 1px rgba(255,255,255,.70);
          border: 1px solid rgba(255,255,255,.65);
        }

        .blood-service {
          background: linear-gradient(150deg, #f9e9e9, #f3d9db);
          color: #ba565c;
        }

        .medicine-service {
          background: linear-gradient(150deg, #e3f7f0, #cceee3);
          color: #15947f;
        }

        .home-service::after {
          content: "";
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(255,255,255,.20);
          bottom: -40px;
          left: -20px;
        }

        .service-icon {
          width: 62px;
          height: 62px;
          border-radius: 20px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.42);
          border: 1px solid rgba(255,255,255,.62);
        }

        .service-icon svg {
          width: 43px;
          height: 43px;
        }

        .service-content {
          position: relative;
          z-index: 1;
        }

        .service-content h3 {
          margin: 0;
          font-size: 17px;
          line-height: 1.45;
          font-weight: 800;
        }

        .service-content p {
          margin: 3px 0 0;
          font-size: 13px;
          font-weight: 600;
          opacity: .72;
        }

        .service-arrow {
          position: absolute;
          left: 12px;
          bottom: 8px;
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.55);
          font-size: 23px;
          font-weight: 700;
        }

        /* URGENT */

        .urgent-section {
          position: relative;
          z-index: 2;
          text-align: right;
        }

        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 9px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 18px;
          color: #194b4d;
          font-weight: 800;
        }

        .location-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1b9284;
          background: rgba(255,255,255,.43);
        }

        .location-icon svg {
          width: 18px;
          height: 18px;
        }

        .urgent-card {
          min-height: 92px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          direction: rtl;
          padding: 10px 11px;
          border-radius: 20px;
          text-decoration: none;
          color: #214b4d;
          background: rgba(255,255,255,.63);
          border: 1px solid rgba(255,255,255,.72);
          box-shadow: 0 8px 20px rgba(55,128,128,.09);
        }

        .blood-circle {
          flex: 0 0 auto;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b64d56;
          background: #f5d7da;
          font-size: 15px;
          font-weight: 900;
          border: 2px solid rgba(255,255,255,.72);
        }

        .urgent-info {
          min-width: 0;
          flex: 1;
        }

        .urgent-info strong {
          display: block;
          margin-bottom: 2px;
          font-size: 17px;
          color: #254c4e;
        }

        .urgent-info p {
          margin: 0 0 2px;
          font-size: 13px;
          color: #587779;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .urgent-info small {
          font-size: 12px;
          color: #789092;
        }

        .urgent-arrow {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(218,242,236,.75);
          color: #159481;
          font-size: 22px;
          font-weight: 800;
        }

        .empty-request {
          cursor: default;
        }

        .show-all {
          width: 118px;
          height: 39px;
          margin: 10px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          text-decoration: none;
          color: #168f80;
          background: rgba(255,255,255,.54);
          border: 1px solid rgba(255,255,255,.68);
          font-size: 13px;
          font-weight: 800;
        }

        /* DECORATION */

        .home-decoration {
          position: relative;
          z-index: 1;
          height: 55px;
          margin-top: 4px;
          overflow: hidden;
          opacity: .70;
        }

        .decoration-ecg {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 45px;
        }

        .decoration-ecg path {
          fill: none;
          stroke: #5eb9ae;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .decoration-plus {
          position: absolute;
          left: 50%;
          top: 3px;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3ea79b;
          background: rgba(255,255,255,.38);
          font-size: 22px;
          font-weight: 500;
        }

        /* BOTTOM NAV */

        .bottom-nav {
          position: fixed;
          z-index: 50;
          left: 0;
          right: 0;
          bottom: 0;
          height: 76px;
          padding: 7px 10px 5px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          background: rgba(238,255,253,.91);
          border-top: 1px solid rgba(255,255,255,.75);
          box-shadow: 0 -7px 25px rgba(45,111,111,.10);
          backdrop-filter: blur(15px);
        }

        .bottom-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-decoration: none;
          color: #759191;
          font-size: 10px;
          font-weight: 700;
        }

        .bottom-item svg {
          width: 26px;
          height: 26px;
        }

        .bottom-item.active {
          color: #159682;
        }

        .bottom-item.active::after {
          content: "";
          position: absolute;
          width: 25px;
          height: 3px;
          border-radius: 5px;
          bottom: 1px;
          background: currentColor;
        }

        /* SMALL PHONES */

        @media (max-width: 360px) {
          .home-reference {
            padding-left: 11px;
            padding-right: 11px;
          }

          .brand-box h1 {
            font-size: 18px;
          }

          .welcome-section h2 {
            font-size: 25px;
          }

          .home-service {
            min-height: 180px;
            padding-left: 7px;
            padding-right: 7px;
          }

          .service-icon {
            width: 57px;
            height: 57px;
          }

          .service-icon svg {
            width: 40px;
            height: 40px;
          }

          .service-content h3 {
            font-size: 15px;
          }

          .service-content p {
            font-size: 12px;
          }

          .urgent-info strong {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}

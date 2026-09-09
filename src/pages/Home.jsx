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

            <div className="brand-text">
              <h1>نبض الأمل</h1>
              <span>معًا ننقذ الحياة</span>
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

          <p>معًا ننقذ الحياة</p>

          <div className="ecg-line">
            <svg viewBox="0 0 300 40" preserveAspectRatio="none">
              <path d="M0 22H55L65 22L72 15L79 30L87 5L96 34L104 22H150L160 22L168 15L175 30L183 5L192 34L200 22H300" />
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

            <div className="service-arrow">←</div>

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

            <div className="service-arrow">←</div>

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

              <div className="urgent-arrow">←</div>
            </Link>
          ) : (
            <div className="urgent-card">

              <div className="blood-circle">
                O+
              </div>

              <div className="urgent-info">
                <strong>فصيلة دم O+</strong>
                <p>مستشفى النور التخصصي</p>
                <small>على بعد 2.3 كم</small>
              </div>

              <div className="urgent-arrow">←</div>

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
          padding: 14px 14px 84px;
          overflow-x: hidden;
          position: relative;

          color: #16494b;

          background:
            radial-gradient(
              circle at 8% 12%,
              rgba(255,255,255,.75) 0 4%,
              transparent 23%
            ),
            radial-gradient(
              circle at 90% 25%,
              rgba(255,255,255,.42) 0 7%,
              transparent 25%
            ),
            linear-gradient(
              145deg,
              #edffff 0%,
              #c8f1ef 48%,
              #a2dfdb 100%
            );

          font-family: Arial, Tahoma, sans-serif;
        }

        /* HEADER */

        .home-header {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          direction: ltr;

          margin-bottom: 13px;
        }

        .brand-box {
          display: flex;
          align-items: center;
          gap: 7px;
          direction: rtl;
        }

        .heart-logo {
          width: 45px;
          height: 45px;

          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #159b8a;

          background: rgba(255,255,255,.52);

          border: 1px solid rgba(255,255,255,.75);

          box-shadow:
            0 5px 15px rgba(43,130,130,.09);
        }

        .heart-logo svg {
          width: 33px;
          height: 33px;
        }

        .brand-box h1 {
          margin: 0;

          font-size: 21px;
          line-height: 1.1;

          font-weight: 800;

          color: #167c78;
        }

        .brand-box span {
          display: block;

          margin-top: 3px;

          font-size: 10px;

          color: #648486;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
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
          color: #337477;

          background: rgba(255,255,255,.48);

          border: 1px solid rgba(255,255,255,.62);
        }

        .header-icon svg {
          width: 21px;
          height: 21px;
        }

        .profile-avatar {
          overflow: hidden;

          background: rgba(255,255,255,.65);

          border: 2px solid rgba(255,255,255,.82);
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
          width: 24px;
          height: 24px;
        }

        /* WELCOME */

        .welcome-section {
          position: relative;
          z-index: 2;

          margin-bottom: 9px;

          text-align: right;
        }

        .welcome-section h2 {
          margin: 0;

          font-size: 27px;
          line-height: 1.2;

          font-weight: 800;

          color: #174b4d;
        }

        .welcome-section h2 span {
          color: #159b89;
        }

        .welcome-section p {
          margin: 3px 0 5

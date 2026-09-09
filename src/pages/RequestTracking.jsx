import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5l4.2 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 7v5l3.2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.5 10.8L12 3.8l8.5 7v8.7a1.5 1.5 0 01-1.5 1.5H5a1.5 1.5 0 01-1.5-1.5v-8.7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-6h6v6"
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 8h7M8.5 12h7M8.5 16h4"
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 17h12l-1.3-1.8V10a4.7 4.7 0 00-9.4 0v5.2L6 17z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20c.8-3.4 3-5.2 6.5-5.2s5.7 1.8 6.5 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RequestTracking() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    api.getBloodRequest(id).then(setRequest).catch(() => {});
  }, [id]);

  if (!request) {
    return (
      <div className="tracking-loading">
        <div className="loading-circle">
          <span></span>
        </div>
        <p>جارِ التحميل...</p>
      </div>
    );
  }

  const allDone =
    Array.isArray(request.timeline) &&
    request.timeline.every((step) => step.done);

  return (
    <div className="tracking-page">
      {/* Header */}
      <header className="tracking-header">
        <Link to="/blood" className="tracking-back" aria-label="رجوع">
          <BackIcon />
        </Link>

        <h1>تتبع الطلب</h1>

        <div className="header-space"></div>
      </header>

      {/* Timeline */}
      <section className="timeline-card">
        {request.timeline.map((step, index) => {
          const isLast = index === request.timeline.length - 1;

          return (
            <div className="timeline-row" key={index}>
              <div className="timeline-content">
                <div className="timeline-title">{step.label}</div>

                <div className="timeline-time">
                  <ClockIcon />
                  <span>{step.time}</span>
                </div>
              </div>

              <div className="timeline-side">
                <div className={`timeline-check ${step.done ? "done" : ""}`}>
                  {step.done && <CheckIcon />}
                </div>

                {!isLast && (
                  <div
                    className={`timeline-line ${step.done ? "done" : ""}`}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Completed */}
      {allDone && (
        <section className="completed-card">
          <div className="completed-decoration decoration-one">♥</div>
          <div className="completed-decoration decoration-two">♥</div>

          <div className="completed-check">
            <CheckIcon />
          </div>

          <h2>تم إكمال الطلب</h2>

          <p>شكرًا لك على مساهمتك في إنقاذ حياة</p>

          <Link to="/requests" className="details-button">
            تفاصيل الطلب
          </Link>
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="tracking-bottom-nav">
        <Link to="/home" className="tracking-nav-item active">
          <HomeIcon />
          <span>الرئيسية</span>
        </Link>

        <Link to="/requests" className="tracking-nav-item">
          <RequestsIcon />
          <span>الطلبات</span>
        </Link>

        <Link to="/notifications" className="tracking-nav-item">
          <BellIcon />
          <span>الإشعارات</span>
        </Link>

        <Link to="/profile" className="tracking-nav-item">
          <ProfileIcon />
          <span>الملف الشخصي</span>
        </Link>
      </nav>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .tracking-page {
          min-height: 100vh;
          width: 100%;
          direction: rtl;
          padding: 26px 18px 125px;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 8% 5%,
              rgba(123, 225, 211, 0.28),
              transparent 30%
            ),
            radial-gradient(
              circle at 100% 45%,
              rgba(185, 242, 232, 0.32),
              transparent 34%
            ),
            linear-gradient(
              160deg,
              #f8ffff 0%,
              #e9faf7 48%,
              #dff7f3 100%
            );

          color: #145f67;
        }

        .tracking-page::before {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          top: -100px;
          left: -90px;
          border-radius: 50%;
          background: rgba(118, 220, 207, 0.12);
          filter: blur(2px);
          pointer-events: none;
        }

        .tracking-page::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          right: -100px;
          bottom: 170px;
          border-radius: 50%;
          background: rgba(108, 213, 199, 0.12);
          pointer-events: none;
        }

        .tracking-header {
          width: 100%;
          display: grid;
          grid-template-columns: 52px 1fr 52px;
          align-items: center;
          margin-bottom: 25px;
          position: relative;
          z-index: 2;
        }

        .tracking-header h1 {
          margin: 0;
          text-align: center;
          font-size: 29px;
          font-weight: 800;
          color: #116f78;
          letter-spacing: -0.5px;
        }

        .tracking-back {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          text-decoration: none;
          color: #087d83;

          background: rgba(255, 255, 255, 0.56);
          border: 1px solid rgba(255, 255, 255, 0.86);

          box-shadow:
            0 9px 25px rgba(31, 143, 135, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .tracking-back svg {
          width: 27px;
          height: 27px;
        }

        .header-space {
          width: 52px;
        }

        /* Timeline */

        .timeline-card {
          width: 100%;
          padding: 20px 12px 18px 10px;
          border-radius: 28px;

          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(255, 255, 255, 0.9);

          box-shadow:
            0 18px 45px rgba(44, 143, 137, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          position: relative;
          z-index: 1;
        }

        .timeline-row {
          display: flex;
          align-items: stretch;
          min-height: 105px;
          gap: 10px;
        }

        .timeline-content {
          flex: 1;
          min-width: 0;
          padding: 20px 20px;
          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(239, 253, 251, 0.95),
              rgba(225, 248, 245, 0.82)
            );

          border: 1px solid rgba(255, 255, 255, 0.9);

          box-shadow:
            0 8px 22px rgba(49, 145, 138, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.75);

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .timeline-title {
          font-size: 19px;
          font-weight: 800;
          line-height: 1.45;
          color: #176b72;
        }

        .timeline-time {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b9297;
          font-size: 14px;
          font-weight: 600;
        }

        .timeline-time svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .timeline-side {
          width: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-check {
          width: 48px;
          height: 48px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(214, 244, 239, 0.85);
          color: #65bdb3;
          border: 2px solid rgba(255, 255, 255, 0.8);

          box-shadow:
            0 7px 18px rgba(38, 151, 141, 0.10),
            inset 0 1px 3px rgba(255, 255, 255, 0.7);
        }

        .timeline-check.done {
          color: white;
          background: linear-gradient(
            145deg,
            #22ad98,
            #109682
          );

          box-shadow:
            0 8px 20px rgba(20, 157, 139, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .timeline-check svg {
          width: 27px;
          height: 27px;
        }

        .timeline-line {
          width: 6px;
          flex: 1;
          min-height: 35px;
          margin: 5px 0;

          border-radius: 10px;
          background: #c8eee7;
        }

        .timeline-line.done {
          background: linear-gradient(
            180deg,
            #39c5b0,
            #72d7ca
          );
        }

        /* Completed card */

        .completed-card {
          margin-top: 18px;
          padding: 34px 20px 24px;
          border-radius: 30px;

          position: relative;
          overflow: hidden;
          text-align: center;
          z-index: 1;

          background:
            radial-gradient(
              circle at 90% 30%,
              rgba(91, 211, 193, 0.16),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              rgba(226, 251, 247, 0.98),
              rgba(204, 244, 237, 0.92)
            );

          border: 1px solid rgba(255, 255, 255, 0.88);

          box-shadow:
            0 16px 35px rgba(37, 143, 135, 0.11),
            inset 0 1px 0 rgba(255, 255, 255, 0.75);
        }

        .completed-check {
          width: 68px;
          height: 68px;
          margin: 0 auto 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          color: white;

          background: linear-gradient(
            145deg,
            #20b39b,
            #079780
          );

          box-shadow:
            0 10px 25px rgba(19, 157, 140, 0.23),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .completed-check svg {
          width: 37px;
          height: 37px;
        }

        .completed-card h2 {
          margin: 0;
          color: #126b73;
          font-size: 25px;
          font-weight: 850;
        }

        .completed-card p {
          margin: 9px 0 22px;
          color: #60888e;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.6;
        }

        .details-button {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-height: 55px;
          border-radius: 30px;

          text-decoration: none;
          color: white;

          font-size: 17px;
          font-weight: 800;

          background: linear-gradient(
            135deg,
            #19ad98,
            #079781
          );

          box-shadow:
            0 10px 23px rgba(14, 158, 140, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.20);
        }

        .completed-decoration {
          position: absolute;
          color: rgba(76, 202, 186, 0.10);
          pointer-events: none;
          font-size: 80px;
        }

        .decoration-one {
          left: -12px;
          bottom: 35px;
          transform: rotate(-18deg);
        }

        .decoration-two {
          right: -10px;
          top: 50px;
          transform: rotate(18deg);
        }

        /* Bottom navigation */

        .tracking-bottom-nav {
          position: fixed;
          left: 14px;
          right: 14px;
          bottom: 13px;

          height: 76px;
          padding: 7px 8px;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;

          border-radius: 27px;

          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.92);

          box-shadow:
            0 14px 35px rgba(35, 130, 128, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          z-index: 50;
        }

        .tracking-nav-item {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;

          text-decoration: none;
          color: #6c979c;

          font-size: 11px;
          font-weight: 700;
        }

        .tracking-nav-item svg {
          width: 25px;
          height: 25px;
        }

        .tracking-nav-item.active {
          color: #159b8a;
        }

        .tracking-nav-item.active::after {
          content: "";
          position: absolute;
          bottom: 1px;
          width: 45px;
          height: 3px;
          border-radius: 5px;
          background: #159b8a;
        }

        /* Loading */

        .tracking-loading {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;

          background:
            linear-gradient(
              160deg,
              #f8ffff,
              #e4f8f4
            );

          color: #176b72;
        }

        .loading-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;

          border: 4px solid #c8eee7;
          border-top-color: #159b8a;

          animation: trackingSpin 0.8s linear infinite;
        }

        .tracking-loading p {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
        }

        @keyframes trackingSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 380px) {
          .tracking-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .tracking-header h1 {
            font-size: 25px;
          }

          .timeline-title {
            font-size: 16px;
          }

          .timeline-content {
            padding: 17px 14px;
          }

          .timeline-side {
            width: 42px;
          }

          .timeline-check {
            width: 42px;
            height: 42px;
          }

          .timeline-check svg {
            width: 23px;
            height: 23px;
          }

          .tracking-bottom-nav {
            left: 8px;
            right: 8px;
          }
        }
      `}</style>
    </div>
  );
}

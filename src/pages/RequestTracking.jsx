import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";

const STAGES = [
  "تم إرسال التنبيه للمتبرعين",
  "تم قبول الطلب من المتبرع",
  "المتبرع في طريقه إلى المستشفى",
  "تم الوصول إلى المستشفى",
  "تم التبرع بنجاح",
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 12.5l4.2 4.2L19 7"
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
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 7v5l3 2"
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
    <svg viewBox="0 0 24 24">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-9.5Z"
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
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 9h7M8.5 13h7M8.5 17h4"
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
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
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
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
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
    api
      .getBloodRequest(id)
      .then(setRequest)
      .catch(() => {});
  }, [id]);

  if (!request) {
    return (
      <div className="tracking-page">
        <div className="loading">جارِ التحميل...</div>

        <style>{`
          .tracking-page {
            min-height: 100vh;
            padding: 30px 18px;
            direction: rtl;
            background:
              radial-gradient(circle at 10% 5%, rgba(70,193,177,.16), transparent 30%),
              radial-gradient(circle at 90% 30%, rgba(154,231,216,.18), transparent 30%),
              linear-gradient(160deg, #fbffff, #e8f7f4);
            font-family: Arial, Tahoma, sans-serif;
          }

          .loading {
            text-align: center;
            margin-top: 100px;
            color: #6d9191;
          }
        `}</style>
      </div>
    );
  }

  /*
    نعرض المراحل الخمسة فقط.
    أي مراحل إضافية أو تكرار من الـ API يتم تجاهله.
  */
  const apiTimeline = Array.isArray(request.timeline)
    ? request.timeline
    : [];

  const timeline = STAGES.map((stage, index) => {
    const matches = apiTimeline.filter(
      (item) =>
        String(item?.label || "").trim() === stage
    );

    if (matches.length > 0) {
      const last = matches[matches.length - 1];

      return {
        label: stage,
        time: last?.time || "",
        done: matches.some((item) => Boolean(item?.done)),
      };
    }

    const fallback = apiTimeline[index];

    return {
      label: stage,
      time: fallback?.time || "",
      done: Boolean(fallback?.done),
    };
  });

  const allDone = timeline.every((step) => step.done);

  return (
    <div className="tracking-page">

      <header className="tracking-header">
        <Link to="/blood" className="back-button">
          <BackIcon />
        </Link>

        <h1>تتبع الطلب</h1>

        <div className="header-space" />
      </header>

      <section className="intro-card">
        <div className="intro-icon">
          <CheckIcon />
        </div>

        <div>
          <h2>حالة طلب التبرع</h2>
          <p>تابع حالة طلبك خطوة بخطوة</p>
        </div>
      </section>

      <section className="timeline-card">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;

          return (
            <div className="timeline-row" key={step.label}>

              <div className="timeline-content">
                <div
                  className={
                    step.done
                      ? "timeline-title completed"
                      : "timeline-title"
                  }
                >
                  {step.label}
                </div>

                {step.time ? (
                  <div className="timeline-time">
                    <ClockIcon />
                    <span>{step.time}</span>
                  </div>
                ) : (
                  <div className="timeline-pending">
                    في انتظار هذه المرحلة
                  </div>
                )}
              </div>

              <div className="timeline-side">
                <div
                  className={
                    step.done
                      ? "timeline-check done"
                      : "timeline-check pending"
                  }
                >
                  {step.done && <CheckIcon />}
                </div>

                {!isLast && (
                  <div
                    className={
                      step.done
                        ? "timeline-line done"
                        : "timeline-line"
                    }
                  />
                )}
              </div>

            </div>
          );
        })}
      </section>

      {allDone && (
        <section className="completed-card">
          <div className="completed-icon">
            <CheckIcon />
          </div>

          <h3>تم التبرع بنجاح</h3>

          <p>شكرًا لكل من ساهم في إنقاذ حياة ❤️</p>

          <Link to="/requests" className="details-button">
            تفاصيل الطلب
          </Link>
        </section>
      )}

      <nav className="tracking-bottom-nav">

        <Link to="/profile" className="nav-item">
          <ProfileIcon />
          <span>الملف الشخصي</span>
        </Link>

        <Link to="/notifications" className="nav-item">
          <BellIcon />
          <span>الإشعارات</span>
        </Link>

        <Link to="/requests" className="nav-item active">
          <RequestsIcon />
          <span>الطلبات</span>
        </Link>

        <Link to="/home" className="nav-item">
          <HomeIcon />
          <span>الرئيسية</span>
        </Link>

      </nav>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .tracking-page {
          min-height: 100vh;
          padding: 22px 18px 115px;
          direction: rtl;
          color: #24575a;
          font-family: Arial, Tahoma, sans-serif;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70,193,177,.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154,231,216,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );
        }

        .tracking-header {
          width: 100%;
          max-width: 520px;
          margin: 0 auto 24px;
          display: grid;
          grid-template-columns: 44px 1fr 44px;
          align-items: center;
        }

        .tracking-header h1 {
          margin: 0;
          text-align: center;
          color: #218d83;
          font-size: 22px;
          font-weight: 800;
        }

        .back-button {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #218d83;
          text-decoration: none;
          background: rgba(255,255,255,.66);
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 7px 18px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .back-button svg {
          width: 21px;
          height: 21px;
        }

        .header-space {
          width: 42px;
          height: 42px;
        }

        .intro-card {
          width: 100%;
          max-width: 520px;
          margin: 0 auto 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 13px;
          border-radius: 23px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.82),
              rgba(225,247,243,.75)
            );
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 10px 28px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .intro-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #159b8a;
          background: rgba(208,246,238,.9);
        }

        .intro-icon svg {
          width: 25px;
          height: 25px;
        }

        .intro-card h2 {
          margin: 0 0 4px;
          color: #286d6d;
          font-size: 16px;
        }

        .intro-card p {
          margin: 0;
          color: #789393;
          font-size: 13px;
        }

        .timeline-card {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          padding: 20px 17px;
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.86),
              rgba(232,249,246,.78)
            );
          border: 1px solid rgba(255,255,255,.92);
          box-shadow:
            0 12px 32px rgba(42,128,128,.09),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .timeline-row {
          min-height: 78px;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 14px;
        }

        .timeline-content {
          flex: 1;
          padding: 2px 0 19px;
          text-align: right;
        }

        .timeline-title {
          color: #789393;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.7;
        }

        .timeline-title.completed {
          color: #286d6d;
        }

        .timeline-time {
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
          color: #91aaaa;
          font-size: 11px;
        }

        .timeline-time svg {
          width: 14px;
          height: 14px;
        }

        .timeline-pending {
          margin-top: 5px;
          color: #a5baba;
          font-size: 11px;
        }

        .timeline-side {
          width: 28px;
          position: relative;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }

        .timeline-check {
          position: relative;
          z-index: 2;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #b9d7d3;
          background: rgba(255,255,255,.78);
          color: white;
        }

        .timeline-check.done {
          border-color: #159b8a;
          background: #159b8a;
          box-shadow: 0 5px 14px rgba(21,155,138,.2);
        }

        .timeline-check svg {
          width: 16px;
          height: 16px;
        }

        .timeline-line {
          position: absolute;
          top: 28px;
          bottom: -1px;
          width: 2px;
          background: #cfe5e2;
        }

        .timeline-line.done {
          background: #8ed6cc;
        }

        .completed-card {
          width: 100%;
          max-width: 520px;
          margin: 16px auto 0;
          padding: 22px 18px;
          text-align: center;
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              rgba(218,251,242,.95),
              rgba(201,243,232,.88)
            );
          border: 1px solid rgba(255,255,255,.9);
          box-shadow:
            0 12px 30px rgba(55,145,130,.11);
        }

        .completed-icon {
          width: 54px;
          height: 54px;
          margin: 0 auto 9px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: #159b8a;
        }

        .completed-icon svg {
          width: 28px;
          height: 28px;
        }

        .completed-card h3 {
          margin: 0 0 5px;
          color: #237c70;
          font-size: 18px;
        }

        .completed-card p {
          margin: 0;
          color: #6f9290;
          font-size: 13px;
        }

        .details-button {
          display: block;
          margin-top: 16px;
          padding: 12px 18px;
          border-radius: 15px;
          text-decoration: none;
          color: white;
          background: #159b8a;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 7px 18px rgba(21,155,138,.18);
        }

        .tracking-bottom-nav {
          position: fixed;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          z-index: 100;
          width: calc(100% - 28px);
          max-width: 520px;
          height: 68px;
          padding: 6px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          border-radius: 24px;
          background: rgba(255,255,255,.78);
          border: 1px solid rgba(255,255,255,.92);
          box-shadow:
            0 12px 32px rgba(37,111,111,.13),
            inset 0 1px 0 rgba(255,255,255,.95);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border-radius: 18px;
          text-decoration: none;
          color: #8aa5a4;
          font-size: 9px;
          font-weight: 700;
        }

        .nav-item svg {
          width: 21px;
          height: 21px;
        }

        .nav-item.active {
          color: #159b8a;
          background: rgba(219,248,242,.72);
        }

        .nav-item.active::after {
          content: "";
          position: absolute;
          bottom: 3px;
          width: 22px;
          height: 3px;
          border-radius: 10px;
          background: #159b8a;
        }
      `}</style>
    </div>
  );
}

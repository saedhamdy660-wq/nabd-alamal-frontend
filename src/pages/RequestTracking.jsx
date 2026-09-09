import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";

/* =========================
   Icons
========================= */

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
        d="M12 7v5l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
        d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================
   The ONLY 5 stages
========================= */

const REQUIRED_STAGES = [
  "تم إرسال التنبيه للمتبرعين",
  "تم قبول الطلب من المتبرع",
  "المتبرع في طريقه إلى المستشفى",
  "تم الوصول إلى المستشفى",
  "تم التبرع بنجاح",
];

/* =========================
   Helpers
========================= */

function normalizeText(text = "") {
  return String(text)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[إأآ]/g, "ا");
}

function findStage(requestTimeline, stageLabel, stageIndex) {
  if (!Array.isArray(requestTimeline)) {
    return {
      label: stageLabel,
      time: "",
      done: false,
    };
  }

  const target = normalizeText(stageLabel);

  const exact = requestTimeline.filter((item) => {
    const current = normalizeText(item?.label || "");
    return current === target;
  });

  if (exact.length > 0) {
    // لو فيه تكرار، نستخدم آخر نسخة
    // ونعتبر المرحلة مكتملة إذا أي نسخة منها مكتملة.
    const last = exact[exact.length - 1];

    return {
      label: stageLabel,
      time: last?.time || exact.find((x) => x?.time)?.time || "",
      done: exact.some((x) => Boolean(x?.done)),
    };
  }

  /*
    لو الـ Backend يستخدم أسماء مختلفة شوية،
    نحاول مطابقة المرحلة حسب ترتيبها.
  */
  const byIndex = requestTimeline[stageIndex];

  if (byIndex) {
    return {
      label: stageLabel,
      time: byIndex.time || "",
      done: Boolean(byIndex.done),
    };
  }

  return {
    label: stageLabel,
    time: "",
    done: false,
  };
}

/* =========================
   Page
========================= */

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
        <div className="tracking-loading">جارِ التحميل...</div>

        <style>{`
          .tracking-page {
            min-height: 100vh;
            padding: 28px 18px;
            background:
              radial-gradient(circle at 15% 10%, rgba(89, 205, 190, .18), transparent 30%),
              radial-gradient(circle at 90% 35%, rgba(157, 235, 220, .2), transparent 30%),
              linear-gradient(160deg, #f8ffff 0%, #edfafa 55%, #e7f6f3 100%);
            direction: rtl;
            color: #24575a;
          }

          .tracking-loading {
            width: 100%;
            max-width: 520px;
            margin: 120px auto;
            text-align: center;
            font-size: 16px;
            color: #6d9191;
          }
        `}</style>
      </div>
    );
  }

  /*
    هنا بنبني Timeline جديد من الخمس مراحل فقط.
    أي مرحلة أخرى يرجعها الـ Backend يتم تجاهلها.
    وأي مرحلة مكررة لن تظهر.
  */
  const timeline = REQUIRED_STAGES.map((stage, index) =>
    findStage(request.timeline, stage, index)
  );

  const allDone =
    timeline.length === 5 && timeline.every((step) => step.done);

  return (
    <div className="tracking-page">

      {/* Header */}
      <header className="tracking-header">
        <Link to="/blood" className="back-button" aria-label="رجوع">
          <BackIcon />
        </Link>

        <h1>تتبع الطلب</h1>

        <div className="header-space" />
      </header>

      {/* Intro */}
      <section className="tracking-intro">
        <div className="intro-icon">
          <CheckIcon />
        </div>

        <div>
          <h2>حالة طلب التبرع</h2>
          <p>
            تابع حالة طلبك خطوة بخطوة
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-card">

        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;

          return (
            <div className="timeline-row" key={step.label}>

              <div className="timeline-content">
                <div
                  className={`timeline-title ${
                    step.done ? "completed" : ""
                  }`}
                >
                  {step.label}
                </div>

                {step.time && (
                  <div className="timeline-time">
                    <ClockIcon />
                    <span>{step.time}</span>
                  </div>
                )}

                {!step.time && !step.done && (
                  <div className="timeline-pending">
                    في انتظار هذه المرحلة
                  </div>
                )}
              </div>

              <div className="timeline-side">

                <div
                  className={`timeline-check ${
                    step.done ? "done" : "pending"
                  }`}
                >
                  {step.done && <CheckIcon />}
                </div>

                {!isLast && (
                  <div
                    className={`timeline-line ${
                      step.done ? "done" : ""
                    }`}
                  />
                )}

              </div>

            </div>
          );
        })}

      </section>

      {/* Completed */}
      {allDone && (
        <section className="completed-card">

          <div className="completed-icon">
            <CheckIcon />
          </div>

          <h3>تم التبرع بنجاح</h3>

          <p>
            شكرًا لكل من ساهم في إنقاذ حياة ❤️
          </p>

          <Link to="/requests" className="details-button">
            تفاصيل الطلب
          </Link>

        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="tracking-bottom-nav">

        <Link to="/profile" className="tracking-nav-item">
          <ProfileIcon />
          <span>الملف الشخصي</span>
        </Link>

        <Link to="/notifications" className="tracking-nav-item">
          <BellIcon />
          <span>الإشعارات</span>
        </Link>

        <Link to="/requests" className="tracking-nav-item active">
          <RequestsIcon />
          <span>الطلبات</span>
        </Link>

        <Link to="/home" className="tracking-nav-item">
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
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70, 193, 177, .17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154, 231, 216, .18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );
          direction: rtl;
          color: #24575a;
          font-family:
            Arial,
            "Tahoma",
            sans-serif;
        }

        /* Header */

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
          background: rgba(255, 255, 255, .66);
          border: 1px solid rgba(255, 255, 255, .9);
          box-shadow:
            0 7px 18px rgba(35, 139, 128, .08),
            inset 0 1px 0 rgba(255, 255, 255, .9);
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

        /* Intro */

        .tracking-intro {
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
              rgba(255, 255, 255, .82),
              rgba(225, 247, 243, .75)
            );
          border: 1px solid rgba(255, 255, 255, .9);
          box-shadow:
            0 10px 28px rgba(42, 128, 128, .08),
            inset 0 1px 0 rgba(255, 255, 255, .85);
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
          background: rgba(208, 246, 238, .9);
          border: 1px solid rgba(255, 255, 255, .8);
        }

        .intro-icon svg {
          width: 25px;
          height: 25px;
        }

        .tracking-intro h2 {
          margin: 0 0 4px;
          color: #286d6d;
          font-size: 16px;
          font-weight: 800;
        }

        .tracking-intro p {
          margin: 0;
          color: #789393;
          font-size: 13px;
        }

        /* Timeline */

        .timeline-card {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          padding: 20px 17px;
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, .86),
              rgba(232, 249, 246, .78)
            );
          border: 1px solid rgba(255, 255, 255, .92);
          box-shadow:
            0 12px 32px rgba(42, 128, 128, .09),
            inset 0 1px 0 rgba(255, 255, 255, .9);
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
          justify-content: flex-start;
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

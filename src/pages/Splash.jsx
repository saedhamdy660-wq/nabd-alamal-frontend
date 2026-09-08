import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .nabd-splash {
          width: 100%;
          height: 100dvh;
          min-height: 600px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(224, 250, 245, 0.95) 25%,
              rgba(176, 235, 224, 0.95) 60%,
              rgba(109, 202, 185, 1) 100%
            );
          font-family:
            "Cairo",
            "Tajawal",
            Arial,
            sans-serif;
          color: #087f70;
        }

        /* الخلفية */
        .nabd-bg-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
        }

        .nabd-glow-one {
          width: 280px;
          height: 280px;
          top: -100px;
          right: -80px;
          background: rgba(255, 255, 255, 0.35);
        }

        .nabd-glow-two {
          width: 230px;
          height: 230px;
          bottom: -80px;
          left: -70px;
          background: rgba(255, 255, 255, 0.3);
        }

        .nabd-glow-three {
          width: 120px;
          height: 120px;
          top: 25%;
          left: 8%;
          background: rgba(255, 255, 255, 0.22);
        }

        /* دوائر طبية زخرفية */
        .nabd-circle {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          pointer-events: none;
        }

        .nabd-circle-one {
          width: 170px;
          height: 170px;
          top: 12%;
          right: -75px;
        }

        .nabd-circle-two {
          width: 120px;
          height: 120px;
          bottom: 15%;
          left: -50px;
        }

        .nabd-circle-three {
          width: 55px;
          height: 55px;
          top: 19%;
          left: 13%;
          border-width: 1px;
        }

        /* المحتوى */
        .nabd-content {
          position: relative;
          z-index: 5;
          width: min(92%, 520px);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px 20px;
        }

        /* اللوجو */
        .nabd-logo-wrapper {
          width: 145px;
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          position: relative;
        }

        .nabd-logo-glow {
          position: absolute;
          inset: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          filter: blur(15px);
        }

        .nabd-logo {
          position: relative;
          width: 125px;
          height: 125px;
          border-radius: 38px;
          background: linear-gradient(
            145deg,
            #12b99e,
            #078d7c
          );
          box-shadow:
            0 18px 40px rgba(0, 110, 95, 0.25),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nabd-logo svg {
          width: 94px;
          height: 94px;
          overflow: visible;
        }

        /* النص */
        .nabd-title {
          margin: 0;
          font-size: clamp(38px, 10vw, 56px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.2;
          color: #087f70;
          text-shadow:
            0 3px 10px rgba(0, 90, 80, 0.08);
        }

        .nabd-subtitle {
          margin: 10px 0 0;
          font-size: clamp(17px, 4.5vw, 22px);
          font-weight: 600;
          color: #159987;
        }

        .nabd-divider {
          width: 65px;
          height: 4px;
          margin: 23px 0 18px;
          border-radius: 20px;
          background: #0aa88f;
        }

        .nabd-slogan {
          margin: 0;
          font-size: clamp(18px, 4.8vw, 24px);
          font-weight: 700;
          color: #087f70;
        }

        .nabd-slogan span {
          font-weight: 500;
        }

        /* ECG */
        .nabd-ecg {
          width: min(430px, 90%);
          height: 75px;
          margin-top: 35px;
          opacity: 0.75;
        }

        .nabd-ecg-line {
          fill: none;
          stroke: #0a9e89;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          animation: nabd-ecg-draw 2.2s ease forwards;
        }

        @keyframes nabd-ecg-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* علامة الإسعاف */
        .nabd-medical-cross {
          position: absolute;
          width: 50px;
          height: 50px;
          top: 14%;
          right: 13%;
          opacity: 0.5;
          transform: rotate(10deg);
        }

        .nabd-medical-cross::before,
        .nabd-medical-cross::after {
          content: "";
          position: absolute;
          background: rgba(8, 127, 112, 0.45);
          border-radius: 6px;
        }

        .nabd-medical-cross::before {
          width: 14px;
          height: 50px;
          left: 18px;
          top: 0;
        }

        .nabd-medical-cross::after {
          width: 50px;
          height: 14px;
          left: 0;
          top: 18px;
        }

        /* نقاط زخرفية */
        .nabd-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.65);
        }

        .nabd-dot-one {
          top: 30%;
          right: 20%;
        }

        .nabd-dot-two {
          top: 42%;
          left: 12%;
          width: 12px;
          height: 12px;
        }

        .nabd-dot-three {
          bottom: 24%;
          right: 14%;
          width: 6px;
          height: 6px;
        }

        /* موجات أسفل الشاشة */
        .nabd-waves {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 150px;
          z-index: 2;
          pointer-events: none;
        }

        .nabd-wave {
          position: absolute;
          bottom: -70px;
          left: -10%;
          width: 120%;
          height: 150px;
          border-radius: 50% 50% 0 0;
        }

        .nabd-wave-one {
          background: rgba(255, 255, 255, 0.22);
          transform: rotate(-3deg);
        }

        .nabd-wave-two {
          bottom: -90px;
          background: rgba(255, 255, 255, 0.18);
          transform: rotate(4deg);
        }

        /* حركة بسيطة */
        .nabd-content {
          animation: nabd-fade-in 0.9s ease both;
        }

        @keyframes nabd-fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* الموبايل */
        @media (max-width: 480px) {
          .nabd-splash {
            min-height: 100dvh;
          }

          .nabd-logo-wrapper {
            width: 125px;
            height: 125px;
            margin-bottom: 20px;
          }

          .nabd-logo {
            width: 108px;
            height: 108px;
            border-radius: 32px;
          }

          .nabd-logo svg {
            width: 82px;
            height: 82px;
          }

          .nabd-divider {
            margin-top: 18px;
            margin-bottom: 14px;
          }

          .nabd-ecg {
            margin-top: 27px;
            height: 60px;
          }

          .nabd-medical-cross {
            right: 8%;
            top: 11%;
            transform: scale(0.75) rotate(10deg);
          }
        }
      `}</style>

      <div className="nabd-splash">
        {/* عناصر الخلفية */}
        <div className="nabd-bg-glow nabd-glow-one" />
        <div className="nabd-bg-glow nabd-glow-two" />
        <div className="nabd-bg-glow nabd-glow-three" />

        <div className="nabd-circle nabd-circle-one" />
        <div className="nabd-circle nabd-circle-two" />
        <div className="nabd-circle nabd-circle-three" />

        <div className="nabd-medical-cross" />

        <div className="nabd-dot nabd-dot-one" />
        <div className="nabd-dot nabd-dot-two" />
        <div className="nabd-dot nabd-dot-three" />

        {/* المحتوى */}
        <main className="nabd-content">
          <div className="nabd-logo-wrapper">
            <div className="nabd-logo-glow" />

            <div className="nabd-logo">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="نبض الأمل"
              >
                {/* القلب */}
                <path
                  d="
                    M50 82
                    C45 76 18 59 18 37
                    C18 24 27 16 38 16
                    C45 16 50 20 50 27
                    C50 20 55 16 62 16
                    C73 16 82 24 82 37
                    C82 59 55 76 50 82
                    Z
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />

                {/* نبضة ECG */}
                <path
                  d="
                    M22 48
                    H36
                    L41 39
                    L47 57
                    L53 30
                    L59 48
                    H77
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="nabd-title">نبض الأمل</h1>

          <p className="nabd-subtitle">
            استجابة طبية طارئة
          </p>

          <div className="nabd-divider" />

          <p className="nabd-slogan">
            معًا .. <span>ننقذ حياة</span>
          </p>

          {/* خط نبض */}
          <svg
            className="nabd-ecg"
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="nabd-ecg-line"
              d="
                M0 40
                H90
                L110 40
                L125 40
                L140 18
                L155 62
                L170 8
                L188 70
                L205 40
                H290
                L310 40
                L325 25
                L340 55
                L355 40
                H500
              "
            />
          </svg>
        </main>

        {/* الموجات */}
        <div className="nabd-waves">
          <div className="nabd-wave nabd-wave-one" />
          <div className="nabd-wave nabd-wave-two" />
        </div>
      </div>
    </>
  );
}

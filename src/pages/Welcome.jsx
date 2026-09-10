import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .welcome-page {
          min-height: 100dvh;
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background:
            radial-gradient(
              circle at 50% 38%,
              #ffffff 0%,
              #effcf9 25%,
              #c9f3eb 55%,
              #73d2c1 100%
            );
          font-family:
            "Cairo",
            "Tajawal",
            Arial,
            sans-serif;
          color: #087f70;
        }

        .welcome-bg-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(8px);
        }

        .welcome-glow-1 {
          width: 330px;
          height: 330px;
          top: -150px;
          right: -100px;
          background: rgba(255, 255, 255, 0.45);
        }

        .welcome-glow-2 {
          width: 280px;
          height: 280px;
          bottom: -120px;
          left: -100px;
          background: rgba(255, 255, 255, 0.35);
        }

        .welcome-glow-3 {
          width: 180px;
          height: 180px;
          top: 25%;
          left: -80px;
          background: rgba(255, 255, 255, 0.2);
        }

        .welcome-ring {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          pointer-events: none;
        }

        .welcome-ring-1 {
          width: 75px;
          height: 75px;
          top: 17%;
          left: 9%;
        }

        .welcome-ring-2 {
          width: 55px;
          height: 55px;
          bottom: 18%;
          right: 8%;
        }

        .welcome-ring-3 {
          width: 35px;
          height: 35px;
          top: 25%;
          right: 12%;
          border-width: 1px;
        }

        .welcome-cross {
          position: absolute;
          top: 8%;
          right: 10%;
          width: 50px;
          height: 50px;
          opacity: 0.32;
          transform: rotate(8deg);
        }

        .welcome-cross::before,
        .welcome-cross::after {
          content: "";
          position: absolute;
          background: #0aa88f;
          border-radius: 8px;
        }

        .welcome-cross::before {
          width: 15px;
          height: 50px;
          left: 18px;
          top: 0;
        }

        .welcome-cross::after {
          width: 50px;
          height: 15px;
          left: 0;
          top: 18px;
        }

        .welcome-dot {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.65);
        }

        .welcome-dot-1 {
          width: 10px;
          height: 10px;
          top: 30%;
          left: 8%;
        }

        .welcome-dot-2 {
          width: 7px;
          height: 7px;
          top: 37%;
          right: 20%;
        }

        .welcome-dot-3 {
          width: 12px;
          height: 12px;
          bottom: 23%;
          left: 14%;
        }

        .welcome-content {
          position: relative;
          z-index: 10;
          width: min(92%, 520px);
          min-height: 100dvh;
          padding:
            max(45px, env(safe-area-inset-top))
            20px
            max(30px, env(safe-area-inset-bottom));

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          animation: welcome-fade 0.8s ease;
        }

        @keyframes welcome-fade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-logo {
          position: relative;
          width: 145px;
          height: 145px;
          margin-bottom: 20px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .welcome-logo-glow {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          filter: blur(18px);
        }

        .welcome-logo-circle {
          position: relative;
          width: 125px;
          height: 125px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              #20c8ae,
              #0aa88f 60%,
              #087f70 100%
            );

          border: 7px solid rgba(255, 255, 255, 0.88);

          box-shadow:
            0 12px 35px rgba(0, 120, 105, 0.25),
            0 0 0 8px rgba(255, 255, 255, 0.22),
            inset 0 4px 12px rgba(255, 255, 255, 0.25);
        }

        .welcome-logo-circle svg {
          width: 85px;
          height: 85px;
        }

        .welcome-title {
          margin: 0;

          font-size: clamp(40px, 10vw, 58px);
          font-weight: 900;
          line-height: 1.2;

          color: #078f7e;

          text-shadow:
            0 4px 12px rgba(0, 120, 105, 0.1);
        }

        .welcome-subtitle {
          margin: 8px 0 0;

          font-size: clamp(18px, 4.8vw, 24px);
          font-weight: 600;

          color: #397f7a;
        }

        .welcome-small-ecg {
          width: 230px;
          height: 55px;
          margin: 8px 0 8px;
        }

        .welcome-ecg-line {
          fill: none;
          stroke: #0aa88f;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;

          stroke-dasharray: 500;
          stroke-dashoffset: 500;

          animation:
            ecg-draw 2s ease forwards,
            ecg-pulse 2.5s ease-in-out 2s infinite;
        }

        @keyframes ecg-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ecg-pulse {
          0%, 100% {
            opacity: 0.75;
          }

          50% {
            opacity: 1;
          }
        }

        .welcome-description {
          max-width: 430px;

          margin: 8px 0 0;

          font-size: clamp(17px, 4.5vw, 21px);
          line-height: 1.9;
          font-weight: 500;

          color: #285e5a;
        }

        .welcome-buttons {
          width: min(100%, 390px);
          margin-top: 28px;

          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .welcome-button {
          width: 100%;
          height: 62px;

          border-radius: 34px;

          font-family: inherit;
          font-size: 20px;
          font-weight: 800;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;

          -webkit-tap-highlight-color: transparent;
        }

        .welcome-button:active {
          transform: scale(0.97);
        }

        .welcome-primary {
          border: none;

          color: white;

          background:
            linear-gradient(
              135deg,
              #16bba4,
              #079886
            );

          box-shadow:
            0 10px 25px rgba(0, 150, 130, 0.25),
            0 0 0 4px rgba(255, 255, 255, 0.25);
        }

        .welcome-primary:hover {
          box-shadow:
            0 14px 30px rgba(0, 150, 130, 0.32),
            0 0 0 5px rgba(255, 255, 255, 0.3);
        }

        .welcome-primary-arrow {
          display: inline-block;
          margin-right: 8px;
          font-size: 25px;
          vertical-align: -2px;
        }

        .welcome-secondary {
          border: 3px solid #0aa88f;

          color: #078f7e;

          background: rgba(255, 255, 255, 0.45);

          box-shadow:
            0 5px 15px rgba(0, 130, 115, 0.08);
        }

        .welcome-secondary:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        .welcome-login-icon {
          display: inline-block;
          margin-right: 7px;
          font-size: 21px;
        }

        .welcome-skip {
          margin-top: 2px;

          border: none;
          background: transparent;

          color: #5d8580;

          font-family: inherit;
          font-size: 17px;

          text-decoration: underline;
          text-underline-offset: 5px;

          cursor: pointer;
        }

        .welcome-waves {
          position: absolute;
          left: -5%;
          bottom: -5px;

          width: 110%;
          height: 170px;

          z-index: 2;
          pointer-events: none;
        }

        .welcome-wave {
          position: absolute;

          width: 115%;
          height: 150px;

          left: -8%;
          bottom: -85px;

          border-radius: 50% 50% 0 0;
        }

        .welcome-wave-1 {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(-5deg);
        }

        .welcome-wave-2 {
          bottom: -105px;
          background: rgba(255, 255, 255, 0.18);
          transform: rotate(5deg);
        }

        .welcome-bottom-ecg {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);

          width: 100%;
          max-width: 500px;

          height: 80px;

          z-index: 4;

          opacity: 0.4;
          pointer-events: none;
        }

        .welcome-bottom-ecg path {
          fill: none;
          stroke: white;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        @media (max-width: 480px) {
          .welcome-content {
            padding-left: 18px;
            padding-right: 18px;
          }

          .welcome-logo {
            width: 125px;
            height: 125px;
            margin-bottom: 12px;
          }

          .welcome-logo-circle {
            width: 108px;
            height: 108px;
            border-width: 6px;
          }

          .welcome-logo-circle svg {
            width: 73px;
            height: 73px;
          }

          .welcome-description {
            margin-top: 4px;
            line-height: 1.75;
          }

          .welcome-buttons {
            margin-top: 20px;
            gap: 10px;
          }

          .welcome-button {
            height: 57px;
            font-size: 19px;
          }

          .welcome-small-ecg {
            height: 45px;
            margin: 2px 0 3px;
          }

          .welcome-wave {
            height: 120px;
          }

          .welcome-bottom-ecg {
            bottom: 12px;
            height: 60px;
          }
        }
      `}</style>

      <div className="welcome-page" dir="rtl">

        <div className="welcome-bg-glow welcome-glow-1" />
        <div className="welcome-bg-glow welcome-glow-2" />
        <div className="welcome-bg-glow welcome-glow-3" />

        <div className="welcome-ring welcome-ring-1" />
        <div className="welcome-ring welcome-ring-2" />
        <div className="welcome-ring welcome-ring-3" />

        <div className="welcome-cross" />

        <div className="welcome-dot welcome-dot-1" />
        <div className="welcome-dot welcome-dot-2" />
        <div className="welcome-dot welcome-dot-3" />

        <main className="welcome-content">

          <div className="welcome-logo">
            <div className="welcome-logo-glow" />

            <div className="welcome-logo-circle">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
                    M50 82
                    C45 77 20 60 20 38
                    C20 25 29 17 40 17
                    C46 17 50 21 50 27
                    C50 21 54 17 60 17
                    C71 17 80 25 80 38
                    C80 60 55 77 50 82
                    Z
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />

                <path
                  d="
                    M23 49
                    H37
                    L42 39
                    L48 57
                    L54 30
                    L60 49
                    H78
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

          <h1 className="welcome-title">
            نبض الأمل
          </h1>

          <p className="welcome-subtitle">
            استجابة طبية طارئة
          </p>

          <svg
            className="welcome-small-ecg"
            viewBox="0 0 300 60"
            preserveAspectRatio="none"
          >
            <path
              className="welcome-ecg-line"
              d="
                M0 30
                H75
                L88 30
                L98 15
                L110 45
                L123 8
                L137 52
                L150 30
                H225
                L237 30
                L248 20
                L258 40
                L268 30
                H300
              "
            />
          </svg>

          <p className="welcome-description">
            منصة موثوقة تربط بين من يحتاج ومن يقدم
            <br />
            المساعدة بشكل عاجل
          </p>

          <div className="welcome-buttons">

            <button
              className="welcome-button welcome-primary"
              onClick={() => navigate("/signup")}
            >
              <span className="welcome-primary-arrow">←</span>
              ابدأ الآن
            </button>

            <button
              className="welcome-button welcome-secondary"
              onClick={() => navigate("/login")}
            >
              <span className="welcome-login-icon">👤</span>
              تسجيل الدخول
            </button>

            {/* تم تعديل زر التخطي فقط */}
            <button
              className="welcome-skip"
              onClick={() => {
                localStorage.setItem("nabd_guest", "true");
                localStorage.removeItem("nabd_user");
                navigate("/home");
              }}
            >
              تخطي
            </button>

          </div>
        </main>

        <div className="welcome-waves">
          <div className="welcome-wave welcome-wave-1" />
          <div className="welcome-wave welcome-wave-2" />
        </div>

        <svg
          className="welcome-bottom-ecg"
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0 40
              H170
              L190 40
              L205 20
              L220 60
              L238 5
              L255 72
              L270 40
              H500
            "
          />
        </svg>

      </div>
    </>
  );
}

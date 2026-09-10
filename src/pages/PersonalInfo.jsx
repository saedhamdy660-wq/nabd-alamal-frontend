import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="3"
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 7l7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4h3l1.2 4-2 1.5a14 14 0 0 0 5.3 5.3l1.5-2L20 14v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BloodIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3s-6 6.2-6 11a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PersonalInfo() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const update = (field) => (e) => {
    setUser((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const save = (e) => {
    e.preventDefault();

    localStorage.setItem("nabd_user", JSON.stringify(user));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="personal-loading">
        جارِ التحميل...
      </div>
    );
  }

  return (
    <div className="personal-page">

      {/* HEADER */}
      <div className="personal-header">

        <div className="personal-title">
          <h1>المعلومات الشخصية</h1>
          <p>إدارة بيانات حسابك</p>
        </div>

        <Link to="/profile" className="personal-back">
          <BackIcon />
        </Link>

      </div>

      {/* USER CARD */}
      <div className="personal-user-card">

        <div className="personal-avatar">
          {user.name ? user.name.charAt(0) : "م"}
        </div>

        <div className="personal-user-text">
          <h2>{user.name || "المستخدم"}</h2>
          <p>يمكنك تعديل بياناتك الشخصية من هنا</p>
        </div>

      </div>

      <form onSubmit={save} className="personal-form">

        {/* NAME */}
        <div className="personal-field">

          <div className="personal-field-icon">
            <UserIcon />
          </div>

          <div className="personal-field-content">
            <label>الاسم الكامل</label>

            <input
              type="text"
              value={user.name || ""}
              onChange={update("name")}
              placeholder="اكتب اسمك الكامل"
            />
          </div>

        </div>

        {/* EMAIL */}
        <div className="personal-field">

          <div className="personal-field-icon">
            <MailIcon />
          </div>

          <div className="personal-field-content">
            <label>البريد الإلكتروني</label>

            <input
              type="email"
              value={user.email || ""}
              onChange={update("email")}
              placeholder="example@email.com"
              dir="ltr"
            />
          </div>

        </div>

        {/* PHONE */}
        <div className="personal-field">

          <div className="personal-field-icon">
            <PhoneIcon />
          </div>

          <div className="personal-field-content">
            <label>رقم الهاتف</label>

            <input
              type="tel"
              value={user.phone || ""}
              onChange={update("phone")}
              placeholder="رقم الهاتف"
              dir="ltr"
            />
          </div>

        </div>

        {/* BLOOD */}
        <div className="personal-field blood-field">

          <div className="personal-field-icon blood-field-icon">
            <BloodIcon />
          </div>

          <div className="personal-field-content">
            <label>فصيلة الدم</label>

            <select
              value={user.bloodType || "O+"}
              onChange={update("bloodType")}
            >
              {bloodTypes.map((bt) => (
                <option key={bt} value={bt}>
                  {bt}
                </option>
              ))}
            </select>
          </div>

          <div className="blood-badge">
            {user.bloodType || "O+"}
          </div>

        </div>

        {/* SAVE */}
        <button type="submit" className="personal-save">
          حفظ التغييرات
        </button>

        {saved && (
          <div className="personal-saved">
            ✓ تم حفظ التغييرات بنجاح
          </div>
        )}

      </form>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .personal-page {
          min-height: 100vh;
          width: 100%;
          padding: 22px 16px 105px;

          direction: rtl;

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

          color: #286d6d;
        }

        .personal-header {
          width: 100%;
          max-width: 520px;
          margin: 0 auto 24px;

          position: relative;

          min-height: 54px;
        }

        .personal-title {
          padding-right: 64px;
          text-align: right;
        }

        .personal-title h1 {
          margin: 0 0 5px;

          color: #218d83;

          font-size: 23px;
          line-height: 1.3;
          font-weight: 800;
        }

        .personal-title p {
          margin: 0;

          color: #8ca6a4;

          font-size: 11px;
        }

        .personal-back {
          position: absolute;

          right: 0;
          top: 0;

          width: 52px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #218d83;

          background: rgba(255,255,255,.85);

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 8px 22px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.95);

          text-decoration: none;
        }

        .personal-back svg {
          width: 24px;
          height: 24px;
        }


        /* USER CARD */

        .personal-user-card {
          width: 100%;
          max-width: 520px;

          min-height: 108px;

          margin: 0 auto 16px;

          padding: 17px;

          display: flex;
          align-items: center;

          gap: 15px;

          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.93),
              rgba(226,248,244,.80)
            );

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .personal-avatar {
          width: 66px;
          height: 66px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 22px;

          color: #218d83;

          background:
            linear-gradient(
              145deg,
              #dff9f4,
              #c5eee6
            );

          border: 2px solid rgba(255,255,255,.9);

          font-size: 28px;
          font-weight: 900;
        }

        .personal-user-text {
          min-width: 0;
          flex: 1;

          text-align: right;
        }

        .personal-user-text h2 {
          margin: 0 0 6px;

          color: #286d6d;

          font-size: 18px;
          font-weight: 800;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .personal-user-text p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;
          line-height: 1.6;
        }


        /* FORM */

        .personal-form {
          width: 100%;
          max-width: 520px;

          margin: 0 auto;
        }


        /* FIELD */

        .personal-field {
          position: relative;

          width: 100%;
          height: 84px;

          margin-bottom: 12px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.95),
              rgba(232,249,246,.82)
            );

          border: 1px solid rgba(255,255,255,.96);

          box-shadow:
            0 10px 26px rgba(42,128,128,.07),
            inset 0 1px 0 rgba(255,255,255,.92);

          overflow: hidden;
        }


        .personal-field-icon {
          position: absolute;

          top: 50%;
          right: 14px;

          transform: translateY(-50%);

          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e1faf5,
              #cef0e9
            );

          z-index: 3;

          pointer-events: none;
        }

        .personal-field-icon svg {
          width: 24px;
          height: 24px;
        }


        .personal-field-content {
          position: absolute;

          top: 0;
          right: 78px;
          left: 16px;
          bottom: 0;

          display: flex;

          flex-direction: column;

          justify-content: center;

          min-width: 0;

          text-align: right;

          direction: rtl;

          z-index: 1;
        }

        .personal-field-content label {
          display: block;

          margin: 0 0 7px;

          color: #89a2a1;

          font-size: 10px;
          font-weight: 700;

          line-height: 1.2;
        }

        .personal-field-content input,
        .personal-field-content select {
          display: block;

          width: 100%;

          max-width: 100%;

          height: 24px;

          margin: 0;
          padding: 0;

          border: 0;
          outline: 0;

          background: transparent;

          color: #286d6d;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 14px;
          font-weight: 800;

          box-shadow: none;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .personal-field-content input::placeholder {
          color: #a3b7b5;
          opacity: 1;
          font-weight: 500;
        }

        .personal-field-content input:focus,
        .personal-field-content select:focus {
          border: 0;
          outline: 0;
          box-shadow: none;
        }


        /* EMAIL */

        .personal-field-content input[type="email"] {
          direction: ltr !important;
          text-align: left !important;

          unicode-bidi: plaintext;
        }


        /* PHONE */

        .personal-field-content input[type="tel"] {
          direction: ltr !important;
          text-align: left !important;

          unicode-bidi: plaintext;
        }


        /* BLOOD */

        .blood-field-icon {
          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffecef,
              #f8dce3
            );
        }

        .blood-badge {
          position: absolute;

          left: 16px;
          top: 50%;

          transform: translateY(-50%);

          min-width: 54px;

          padding: 9px 10px;

          text-align: center;

          border-radius: 14px;

          color: #b94f65;

          background:
            linear-gradient(
              145deg,
              #ffe9ee,
              #f8d9e1
            );

          font-size: 13px;
          font-weight: 900;

          z-index: 2;
        }

        .blood-field .personal-field-content {
          left: 82px;
        }

        .blood-field select {
          direction: ltr !important;
          text-align: right !important;

          cursor: pointer;
        }


        /* SAVE */

        .personal-save {
          display: block;

          width: 100%;
          height: 58px;

          margin-top: 6px;

          padding: 0;

          border: 0;

          border-radius: 22px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #38b7a4,
              #159b8a
            );

          box-shadow:
            0 12px 25px
              rgba(21,155,138,.18);

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 15px;
          font-weight: 800;

          cursor: pointer;
        }

        .personal-save:active {
          transform: scale(.98);
        }


        /* SAVED */

        .personal-saved {
          margin-top: 11px;

          padding: 11px;

          border-radius: 15px;

          text-align: center;

          color: #28786e;

          background: rgba(215,247,240,.85);

          border: 1px solid rgba(255,255,255,.9);

          font-size: 11px;
          font-weight: 700;
        }


        /* LOADING */

        .personal-loading {
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #218d83;

          background: #f1fbfa;

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }


        /* SMALL MOBILE */

        @media (max-width: 380px) {

          .personal-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .personal-title {
            padding-right: 60px;
          }

          .personal-title h1 {
            font-size: 21px;
          }

          .personal-back {
            width: 48px;
            height: 48px;
          }

          .personal-field {
            height: 82px;
          }

          .personal-field-icon {
            right: 12px;

            width: 44px;
            height: 44px;
          }

          .personal-field-content {
            right: 68px;
            left: 13px;
          }

          .personal-field-content input,
          .personal-field-content select {
            font-size: 13px;
          }

          .blood-field .personal-field-content {
            left: 72px;
          }

          .blood-badge {
            left: 12px;
            min-width: 48px;
          }
        }


        /* =========================================
           DARK MODE - APP CONTROLLED
           ========================================= */

        body.nabd-dark .personal-page {
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(30,150,135,.16),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(40,120,115,.14),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #071f21 0%,
              #08292b 48%,
              #0a3031 100%
            );

          color: #d9f5f1;
        }


        /* HEADER */

        body.nabd-dark .personal-title h1 {
          color: #65d6c5;
        }

        body.nabd-dark .personal-title p {
          color: #8eb6b2;
        }


        /* BACK BUTTON */

        body.nabd-dark .personal-back {
          color: #65d6c5;

          background:
            rgba(18,55,57,.92);

          border-color:
            rgba(94,184,174,.18);

          box-shadow:
            0 8px 22px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.05);
        }


        /* USER CARD */

        body.nabd-dark .personal-user-card {
          background:
            linear-gradient(
              145deg,
              rgba(18,55,57,.96),
              rgba(12,45,47,.94)
            );

          border-color:
            rgba(100,205,192,.14);

          box-shadow:
            0 12px 30px rgba(0,0,0,.25),
            inset 0 1px 0 rgba(255,255,255,.04);
        }


        body.nabd-dark .personal-avatar {
          color: #65d6c5;

          background:
            linear-gradient(
              145deg,
              #164e4d,
              #123e40
            );

          border-color:
            rgba(255,255,255,.12);
        }


        body.nabd-dark .personal-user-text h2 {
          color: #d9f5f1;
        }

        body.nabd-dark .personal-user-text p {
          color: #86aaa7;
        }


        /* FORM FIELDS */

        body.nabd-dark .personal-field {
          background:
            linear-gradient(
              145deg,
              rgba(18,55,57,.96),
              rgba(12,45,47,.94)
            );

          border-color:
            rgba(100,205,192,.14);

          box-shadow:
            0 10px 26px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.04);
        }


        /* FIELD ICONS */

        body.nabd-dark .personal-field-icon {
          color: #63d3c2;

          background:
            linear-gradient(
              145deg,
              #164e4d,
              #123f40
            );
        }


        /* LABEL */

        body.nabd-dark .personal-field-content label {
          color: #86aaa7;
        }


        /* INPUT + SELECT */

        body.nabd-dark .personal-field-content input,
        body.nabd-dark .personal-field-content select {
          background: transparent !important;

          color: #e7faf7 !important;

          -webkit-text-fill-color: #e7faf7 !important;

          caret-color: #65d6c5;

          color-scheme: dark;
        }


        /* PLACEHOLDER */

        body.nabd-dark .personal-field-content input::placeholder {
          color: #6f9491 !important;

          opacity: 1;
        }


        /* FOCUS */

        body.nabd-dark .personal-field-content input:focus,
        body.nabd-dark .personal-field-content select:focus {
          background: transparent !important;

          color: #e7faf7 !important;

          -webkit-text-fill-color: #e7faf7 !important;
        }


        /* AUTOFILL */

        body.nabd-dark .personal-field-content input:-webkit-autofill,
        body.nabd-dark .personal-field-content input:-webkit-autofill:hover,
        body.nabd-dark .personal-field-content input:-webkit-autofill:focus {
          -webkit-text-fill-color: #e7faf7 !important;

          -webkit-box-shadow:
            0 0 0 1000px #123638 inset !important;

          box-shadow:
            0 0 0 1000px #123638 inset !important;

          caret-color: #65d6c5;
        }


        /* BLOOD */

        body.nabd-dark .blood-field-icon {
          color: #ff8ca0;

          background:
            linear-gradient(
              145deg,
              #4a2730,
              #3a2229
            );
        }


        body.nabd-dark .blood-badge {
          color: #ff9bad;

          background:
            linear-gradient(
              145deg,
              #4a2730,
              #3a2229
            );
        }


        /* SELECT */

        body.nabd-dark .personal-field-content select {
          color: #e7faf7 !important;

          background-color:
            transparent !important;
        }

        body.nabd-dark .personal-field-content select option {
          background: #102f31;

          color: #e7faf7;
        }


        /* SAVE BUTTON */

        body.nabd-dark .personal-save {
          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #35b8a5,
              #128f80
            );

          box-shadow:
            0 12px 25px
            rgba(21,155,138,.22);
        }


        /* SUCCESS */

        body.nabd-dark .personal-saved {
          color: #76d7c8;

          background:
            rgba(21,105,96,.35);

          border-color:
            rgba(100,205,192,.14);
        }


        /* LOADING */

        body.nabd-dark .personal-loading {
          color: #65d6c5;

          background: #071f21;
        }

      `}</style>

    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24">
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
    <svg viewBox="0 0 24 24">
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
    <svg viewBox="0 0 24 24">
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
    <svg viewBox="0 0 24 24">
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
    <svg viewBox="0 0 24 24">
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

    localStorage.setItem(
      "nabd_user",
      JSON.stringify(user)
    );

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

      {/* Header */}
      <header className="personal-header">

        <div className="personal-header-text">
          <h1>المعلومات الشخصية</h1>
          <p>إدارة بيانات حسابك</p>
        </div>

        <Link
          to="/profile"
          className="back-button"
          aria-label="رجوع"
        >
          <BackIcon />
        </Link>

      </header>

      {/* User Card */}
      <section className="personal-intro">

        <div className="intro-avatar">
          {user.name
            ? user.name.charAt(0)
            : "م"}
        </div>

        <div className="intro-text">
          <h2>
            {user.name || "المستخدم"}
          </h2>

          <p>
            يمكنك تعديل بياناتك الشخصية من هنا
          </p>
        </div>

      </section>

      {/* Form */}
      <form
        className="personal-form"
        onSubmit={save}
      >

        {/* الاسم */}
        <div className="form-card">

          <div className="field-text">
            <label>الاسم الكامل</label>

            <input
              type="text"
              value={user.name || ""}
              onChange={update("name")}
              placeholder="اكتب اسمك الكامل"
            />
          </div>

          <div className="field-icon">
            <UserIcon />
          </div>

        </div>

        {/* البريد */}
        <div className="form-card">

          <div className="field-text">
            <label>البريد الإلكتروني</label>

            <input
              type="email"
              className="email-input"
              value={user.email || ""}
              onChange={update("email")}
              placeholder="example@email.com"
            />
          </div>

          <div className="field-icon">
            <MailIcon />
          </div>

        </div>

        {/* الهاتف */}
        <div className="form-card">

          <div className="field-text">
            <label>رقم الهاتف</label>

            <input
              type="tel"
              className="phone-input"
              value={user.phone || ""}
              onChange={update("phone")}
              placeholder="رقم الهاتف"
            />
          </div>

          <div className="field-icon">
            <PhoneIcon />
          </div>

        </div>

        {/* فصيلة الدم */}
        <div className="form-card blood-card">

          <div className="field-text blood-text">
            <label>فصيلة الدم</label>

            <select
              value={user.bloodType || "O+"}
              onChange={update("bloodType")}
            >
              {bloodTypes.map((bt) => (
                <option
                  key={bt}
                  value={bt}
                >
                  {bt}
                </option>
              ))}
            </select>
          </div>

          <div className="blood-value">
            {user.bloodType || "O+"}
          </div>

          <div className="field-icon blood-icon">
            <BloodIcon />
          </div>

        </div>

        {/* Save */}
        <button
          className="save-button"
          type="submit"
        >
          حفظ التغييرات
        </button>

        {saved && (
          <div className="saved-message">
            ✓ تم حفظ التغييرات بنجاح
          </div>
        )}

      </form>

      <style>{`

        /* =========================
           PAGE
        ========================= */

        .personal-page {
          min-height: 100vh;

          padding: 22px 18px 95px;

          direction: rtl;

          color: #24575a;

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

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

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


        /* =========================
           HEADER
        ========================= */

        .personal-header {
          width: 100%;
          max-width: 520px;

          margin: 0 auto 23px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 14px;
        }

        .personal-header-text {
          flex: 1;

          min-width: 0;

          text-align: right;
        }

        .personal-header h1 {
          margin: 0 0 5px;

          color: #218d83;

          font-size: 23px;

          font-weight: 800;
        }

        .personal-header p {
          margin: 0;

          color: #8ca6a4;

          font-size: 11px;
        }

        .back-button {
          width: 50px;
          height: 50px;

          flex: 0 0 50px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 18px;

          color: #218d83;

          background:
            rgba(255,255,255,.82);

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 8px 22px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.95);

          text-decoration: none;
        }

        .back-button svg {
          width: 24px;
          height: 24px;
        }


        /* =========================
           USER INTRO
        ========================= */

        .personal-intro {
          width: 100%;
          max-width: 520px;

          min-height: 108px;

          margin: 0 auto 16px;

          padding: 17px 18px;

          display: flex;

          align-items: center;

          gap: 15px;

          direction: rtl;

          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(226,248,244,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .intro-avatar {
          width: 66px;
          height: 66px;

          flex: 0 0 66px;

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

          border:
            2px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.1);

          font-size: 28px;

          font-weight: 900;
        }

        .intro-text {
          flex: 1;

          min-width: 0;

          text-align: right;
        }

        .intro-text h2 {
          margin: 0 0 6px;

          color: #286d6d;

          font-size: 18px;

          font-weight: 800;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .intro-text p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.6;
        }


        /* =========================
           FORM
        ========================= */

        .personal-form {
          width: 100%;
          max-width: 520px;

          margin: 0 auto;
        }


        /* =========================
           FIELD CARD
        ========================= */

        .form-card {
          width: 100%;

          min-height: 84px;

          margin-bottom: 12px;

          padding: 13px 14px;

          display: flex;

          align-items: center;

          gap: 14px;

          /*
            RTL للصفحة،
            لكن ترتيب الكارت نفسه مضبوط
            بحيث الأيقونة تفضل يمين
            والنص له مساحة مستقلة.
          */
          direction: ltr;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.94),
              rgba(232,249,246,.81)
            );

          border:
            1px solid
            rgba(255,255,255,.96);

          box-shadow:
            0 10px 26px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.92);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }


        /* =========================
           TEXT AREA
        ========================= */

        .field-text {
          order: 1;

          flex: 1 1 auto;

          width: 0;

          min-width: 0;

          display: flex;

          flex-direction: column;

          justify-content: center;

          gap: 7px;

          direction: rtl;

          text-align: right;
        }

        .field-text label {
          display: block;

          width: 100%;

          margin: 0;

          color: #89a2a1;

          font-size: 10px;

          font-weight: 700;

          line-height: 1.2;
        }

        .field-text input,
        .field-text select {
          display: block;

          width: 100%;

          min-width: 0;

          height: 22px;

          margin: 0;

          padding: 0;

          border: 0;

          outline: none;

          color: #286d6d;

          background: transparent;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 14px;

          font-weight: 800;

          box-shadow: none;
        }

        .field-text input::placeholder {
          color: #a3b7b5;

          opacity: 1;

          font-weight: 500;
        }


        /* =========================
           EMAIL
        ========================= */

        .email-input {
          direction: ltr !important;

          text-align: right !important;

          unicode-bidi: plaintext;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        /* =========================
           PHONE
        ========================= */

        .phone-input {
          direction: ltr !important;

          text-align: right !important;

          unicode-bidi: plaintext;
        }


        /* =========================
           ICON
        ========================= */

        .field-icon {
          order: 2;

          width: 48px;
          height: 48px;

          flex: 0 0 48px;

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

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,.8);
        }

        .field-icon svg {
          width: 24px;
          height: 24px;
        }


        /* =========================
           BLOOD
        ========================= */

        .blood-card {
          position: relative;
        }

        .blood-icon {
          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffecef,
              #f8dce3
            );
        }

        .blood-value {
          order: 2;

          flex: 0 0 auto;

          min-width: 55px;

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
        }

        .blood-card .field-icon {
          order: 3;
        }

        .blood-text {
          order: 1;
        }

        .blood-text select {
          direction: ltr;

          text-align: right;

          cursor: pointer;

          appearance: auto;
        }


        /* =========================
           SAVE BUTTON
        ========================= */

        .save-button {
          width: 100%;

          height: 58px;

          margin-top: 5px;

          border: 0;

          border-radius: 22px;

          color: #fff;

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

          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }

        .save-button:active {
          transform: scale(.98);

          box-shadow:
            0 7px 16px
              rgba(21,155,138,.15);
        }


        /* =========================
           SAVED MESSAGE
        ========================= */

        .saved-message {
          margin-top: 11px;

          padding: 11px;

          text-align: center;

          border-radius: 15px;

          color: #28786e;

          background:
            rgba(215,247,240,.85);

          border:
            1px solid
            rgba(255,255,255,.9);

          font-size: 11px;

          font-weight: 700;
        }


        /* =========================
           SMALL PHONES
        ========================= */

        @media (max-width: 380px) {

          .personal-page {
            padding-left: 13px;
            padding-right: 13px;
          }

          .personal-header h1 {
            font-size: 21px;
          }

          .personal-intro {
            padding: 14px;
          }

          .intro-avatar {
            width: 58px;
            height: 58px;

            flex-basis: 58px;

            border-radius: 19px;

            font-size: 24px;
          }

          .form-card {
            min-height: 80px;

            padding: 11px;

            gap: 10px;
          }

          .field-icon {
            width: 44px;
            height: 44px;

            flex-basis: 44px;
          }

          .field-icon svg {
            width: 21px;
            height: 21px;
          }

          .field-text input,
          .field-text select {
            font-size: 13px;
          }

          .blood-value {
            min-width: 48px;

            padding: 8px 7px;

            font-size: 12px;
          }

        }

      `}</style>

    </div>
  );
}

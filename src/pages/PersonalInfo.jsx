import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function ArrowIcon() {
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
    setUser({
      ...user,
      [field]: e.target.value,
    });
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

        <Link
          to="/profile"
          className="back-button"
        >
          <ArrowIcon />
        </Link>

        <div>
          <h1>المعلومات الشخصية</h1>
          <p>إدارة بيانات حسابك</p>
        </div>

      </header>

      {/* Profile intro */}
      <section className="personal-intro">

        <div className="intro-avatar">
          {user.name
            ? user.name.charAt(0)
            : "م"}
        </div>

        <div>
          <h2>
            {user.name || "المستخدم"}
          </h2>

          <p>
            يمكنك تعديل بياناتك الشخصية من هنا
          </p>
        </div>

      </section>

      {/* Form */}
      <form onSubmit={save}>

        {/* Name */}
        <div className="form-card">

          <div className="field-icon">
            <UserIcon />
          </div>

          <div className="field-content">

            <label>
              الاسم الكامل
            </label>

            <input
              type="text"
              value={user.name || ""}
              onChange={update("name")}
              placeholder="اكتب اسمك الكامل"
            />

          </div>

        </div>

        {/* Email */}
        <div className="form-card">

          <div className="field-icon">
            <MailIcon />
          </div>

          <div className="field-content">

            <label>
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={user.email || ""}
              onChange={update("email")}
              placeholder="example@email.com"
            />

          </div>

        </div>

        {/* Phone */}
        <div className="form-card">

          <div className="field-icon">
            <PhoneIcon />
          </div>

          <div className="field-content">

            <label>
              رقم الهاتف
            </label>

            <input
              type="tel"
              value={user.phone || ""}
              onChange={update("phone")}
              placeholder="رقم الهاتف"
            />

          </div>

        </div>

        {/* Blood */}
        <div className="form-card">

          <div className="field-icon blood">
            <BloodIcon />
          </div>

          <div className="field-content">

            <label>
              فصيلة الدم
            </label>

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

          <div className="blood-badge">
            {user.bloodType || "O+"}
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

        * {
          box-sizing: border-box;
        }

        .personal-page {
          min-height: 100vh;

          padding: 22px 18px 40px;

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

          direction: rtl;

          color: #218d83;

          background: #f1fbfa;

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

        /* Header */

        .personal-header {
          max-width: 520px;

          margin: 0 auto 23px;

          display: flex;

          align-items: center;

          gap: 13px;
        }

        .back-button {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #218d83;

          background:
            rgba(255,255,255,.75);

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;
        }

        .back-button svg {
          width: 21px;
          height: 21px;
        }

        .personal-header h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 21px;

          font-weight: 800;
        }

        .personal-header p {
          margin: 0;

          color: #88a3a2;

          font-size: 10px;
        }

        /* Intro */

        .personal-intro {
          max-width: 520px;

          margin: 0 auto 17px;

          padding: 18px;

          display: flex;

          align-items: center;

          gap: 13px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(224,248,243,.8)
            );

          border: 1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 11px 28px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .intro-avatar {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 19px;

          color: #218d83;

          background:
            linear-gradient(
              145deg,
              #ddf8f3,
              #bfece3
            );

          border: 2px solid
            rgba(255,255,255,.85);

          font-size: 23px;

          font-weight: 900;

          box-shadow:
            0 6px 16px
              rgba(35,139,128,.1);
        }

        .personal-intro h2 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 17px;

          font-weight: 800;
        }

        .personal-intro p {
          margin: 0;

          color: #8aa3a2;

          font-size: 10px;

          line-height: 1.5;
        }

        /* Form */

        form {
          max-width: 520px;

          margin: 0 auto;
        }

        .form-card {
          min-height: 78px;

          margin-bottom: 12px;

          padding: 12px 14px;

          display: flex;

          align-items: center;

          gap: 11px;

          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.91),
              rgba(232,249,246,.8)
            );

          border: 1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 10px 25px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);
        }

        .field-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e3faf6,
              #d1f1eb
            );
        }

        .field-icon.blood {
          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffe9ee,
              #f9d9e1
            );
        }

        .field-icon svg {
          width: 22px;
          height: 22px;
        }

        .field-content {
          flex: 1;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .field-content label {
          color: #729292;

          font-size: 10px;

          font-weight: 700;
        }

        .field-content input,
        .field-content select {
          width: 100%;

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

          font-weight: 700;
        }

        .field-content input::placeholder {
          color: #a4b8b6;
        }

        .field-content select {
          cursor: pointer;

          appearance: auto;
        }

        .blood-badge {
          min-width: 43px;

          padding: 8px 7px;

          text-align: center;

          border-radius: 13px;

          color: #c05267;

          background:
            rgba(255,224,231,.8);

          font-size: 12px;

          font-weight: 900;
        }

        /* Save */

        .save-button {
          width: 100%;

          min-height: 52px;

          margin-top: 6px;

          border: 0;

          border-radius: 18px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );

          box-shadow:
            0 10px 22px
              rgba(21,155,138,.18);

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 14px;

          font-weight: 800;

          cursor: pointer;

          transition: .2s ease;
        }

        .save-button:active {
          transform: scale(.98);
        }

        /* Saved */

        .saved-message {
          margin-top: 11px;

          padding: 11px;

          text-align: center;

          border-radius: 15px;

          color: #28786e;

          background:
            rgba(215,247,240,.8);

          border: 1px solid
            rgba(255,255,255,.8);

          font-size: 11px;

          font-weight: 700;
        }

      `}</style>

    </div>
  );
}

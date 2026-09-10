import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M19 15.5A7.5 7.5 0 0 1 8.5 5a7.5 7.5 0 1 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3l7 3v5.5c0 4.4-2.8 7.8-7 9.5-4.2-1.7-7-5.1-7-9.5V6l7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 10.5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 8l4 4-4 4M9 12h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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

function SettingsIllustration() {
  return (
    <svg viewBox="0 0 240 150">
      <circle
        cx="120"
        cy="78"
        r="57"
        fill="rgba(255,255,255,.55)"
      />

      <rect
        x="74"
        y="28"
        width="92"
        height="106"
        rx="18"
        fill="white"
        stroke="#bcece3"
        strokeWidth="3"
      />

      <rect
        x="86"
        y="42"
        width="68"
        height="55"
        rx="10"
        fill="#e7f8f4"
      />

      <circle
        cx="120"
        cy="69"
        r="15"
        fill="#c9efe7"
      />

      <circle
        cx="120"
        cy="69"
        r="6"
        fill="#159b8a"
      />

      <path
        d="M120 48v7M120 83v7M99 69h7M134 69h7M105 54l5 5M130 79l5 5M135 54l-5 5M110 79l-5 5"
        stroke="#159b8a"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <rect
        x="97"
        y="106"
        width="46"
        height="7"
        rx="3.5"
        fill="#d9f3ee"
      />

      <circle
        cx="183"
        cy="42"
        r="16"
        fill="#d7f5ef"
      />

      <path
        d="M177 42h12M183 36v12"
        stroke="#159b8a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingItem({
  icon,
  title,
  subtitle,
  children,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      className={`setting-item ${danger ? "setting-danger" : ""}`}
      onClick={onClick}
    >
      <div className="setting-icon">{icon}</div>

      <div className="setting-content">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>

      {children}
    </button>
  );
}

export default function AppSettings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("العربية");

  const handleLogout = () => {
    localStorage.removeItem("nabd_user");
    localStorage.removeItem("nabd_avatar");

    navigate("/login", { replace: true });
  };

  const changeLanguage = () => {
    setLanguage((current) =>
      current === "العربية" ? "English" : "العربية"
    );
  };

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">
        <button
          type="button"
          className="settings-back"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>

        <h1>إعدادات التطبيق</h1>

        <div className="settings-header-space" />
      </header>

      {/* Hero */}
      <section className="settings-hero">

        <div className="settings-hero-text">
          <span>نبض الأمل</span>

          <h2>خصّص تجربتك</h2>

          <p>
            تحكم في إعدادات التطبيق
            بالطريقة التي تناسبك
          </p>
        </div>

        <div className="settings-illustration">
          <SettingsIllustration />
        </div>

      </section>

      {/* Settings */}
      <section className="settings-card">

        <div className="settings-section-title">
          <span>التفضيلات</span>
        </div>

        <SettingItem
          icon={<BellIcon />}
          title="الإشعارات"
          subtitle="التحكم في إشعارات التطبيق"
        >
          <div
            className={`switch ${notifications ? "on" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setNotifications(!notifications);
            }}
          >
            <div className="switch-circle" />
          </div>
        </SettingItem>

        <SettingItem
          icon={<MoonIcon />}
          title="المظهر"
          subtitle={darkMode ? "الوضع الداكن" : "الوضع الفاتح"}
        >
          <div
            className="setting-value"
            onClick={(e) => {
              e.stopPropagation();
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? "داكن" : "فاتح"}
          </div>
        </SettingItem>

        <SettingItem
          icon={<LanguageIcon />}
          title="اللغة"
          subtitle="لغة واجهة التطبيق"
          onClick={changeLanguage}
        >
          <div className="setting-value">
            {language}
          </div>
        </SettingItem>

      </section>

      {/* Privacy */}
      <section className="settings-card">

        <div className="settings-section-title">
          <span>الأمان والمعلومات</span>
        </div>

        <SettingItem
          icon={<ShieldIcon />}
          title="الخصوصية والأمان"
          subtitle="إدارة بياناتك وخصوصيتك"
          onClick={() => navigate("/support")}
        />

        <SettingItem
          icon={<InfoIcon />}
          title="عن التطبيق"
          subtitle="نبض الأمل"
          onClick={() => {
            alert(
              "نبض الأمل\n\nمنصة تهدف إلى تسهيل الوصول إلى خدمات التبرع بالدم وتبادل الأدوية والمساعدة الطبية."
            );
          }}
        />

      </section>

      {/* Logout */}
      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span>تسجيل الخروج</span>
      </button>

      <p className="settings-footer">
        معًا ننقذ الحياة
      </p>

      {/* Bottom Navigation */}
      <nav className="settings-bottom-nav">

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/profile")}
        >
          <UserIcon />
          <span>الملف الشخصي</span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/notifications")}
        >
          <BellIcon />
          <span>الإشعارات</span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/requests")}
        >
          <RequestsIcon />
          <span>الطلبات</span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/home")}
        >
          <HomeIcon />
          <span>الرئيسية</span>
        </button>

      </nav>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .settings-page {
          min-height: 100vh;
          padding: 22px 18px 112px;
          direction: rtl;

          color: #24575a;

          background:
            radial-gradient(
              circle at 8% 8%,
              rgba(70,193,177,.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 30%,
              rgba(154,231,216,.2),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 48%,
              #e6f7f3 100%
            );

          font-family: Arial, Tahoma, sans-serif;
        }

        /* Header */

        .settings-header {
          max-width: 520px;
          margin: 0 auto 18px;

          display: grid;
          grid-template-columns: 44px 1fr 44px;

          align-items: center;
        }

        .settings-header h1 {
          margin: 0;

          text-align: center;

          color: #218d83;

          font-size: 22px;
          font-weight: 800;
        }

        .settings-back {
          width: 42px;
          height: 42px;

          padding: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255,255,255,.92);
          border-radius: 14px;

          background: rgba(255,255,255,.78);

          color: #218d83;

          cursor: pointer;

          box-shadow:
            0 7px 18px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.95);
        }

        .settings-back svg {
          width: 21px;
          height: 21px;
        }

        .settings-header-space {
          width: 42px;
          height: 42px;
        }

        /* Hero */

        .settings-hero {
          max-width: 520px;

          min-height: 180px;

          margin: 0 auto 18px;

          padding: 16px 16px 12px 20px;

          display: flex;
          align-items: center;

          overflow: hidden;

          border-radius: 28px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.93),
              rgba(210,245,239,.82)
            );

          border: 1px solid rgba(255,255,255,.96);

          box-shadow:
            0 13px 32px rgba(42,128,128,.09),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .settings-hero-text {
          width: 53%;

          position: relative;
          z-index: 2;
        }

        .settings-hero-text > span {
          display: inline-block;

          margin-bottom: 8px;

          padding: 5px 10px;

          border-radius: 15px;

          color: #159b8a;

          background: rgba(215,247,240,.8);

          font-size: 10px;
          font-weight: 800;
        }

        .settings-hero-text h2 {
          margin: 0 0 7px;

          color: #286d6d;

          font-size: 22px;
          font-weight: 900;
        }

        .settings-hero-text p {
          margin: 0;

          color: #739493;

          font-size: 11px;
          line-height: 1.7;
        }

        .settings-illustration {
          width: 47%;
          height: 155px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-right: -7px;
        }

        .settings-illustration svg {
          width: 100%;
          max-width: 210px;
          height: auto;
        }

        /* Cards */

        .settings-card {
          max-width: 520px;

          margin: 0 auto 15px;

          padding: 7px 14px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.91),
              rgba(236,250,248,.82)
            );

          border: 1px solid rgba(255,255,255,.94);

          box-shadow:
            0 11px 28px rgba(42,128,128,.07),
            inset 0 1px 0 rgba(255,255,255,.92);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .settings-section-title {
          padding: 10px 3px 6px;

          color: #78a09d;

          font-size: 11px;
          font-weight: 800;
        }

        .setting-item {
          width: 100%;
          min-height: 68px;

          padding: 8px 2px;

          display: flex;
          align-items: center;

          gap: 12px;

          border: 0;
          border-top: 1px solid rgba(124,184,177,.14);

          background: transparent;

          color: #286d6d;

          text-align: right;

          cursor: pointer;
        }

        .settings-section-title + .setting-item {
          border-top: 0;
        }

        .setting-icon {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e4faf6,
              #d3f3ed
            );
        }

        .setting-icon svg {
          width: 22px;
          height: 22px;
        }

        .setting-content {
          flex: 1;

          min-width: 0;

          display: flex;
          flex-direction: column;

          gap: 3px;
        }

        .setting-content strong {
          color: #286d6d;

          font-size: 14px;
          font-weight: 800;
        }

        .setting-content span {
          color: #82a09f;

          font-size: 10px;
        }

        .setting-value {
          flex-shrink: 0;

          padding: 6px 10px;

          border-radius: 12px;

          color: #159b8a;

          background: rgba(216,247,241,.78);

          font-size: 10px;
          font-weight: 800;
        }

        /* Switch */

        .switch {
          position: relative;

          width: 45px;
          height: 25px;

          flex-shrink: 0;

          padding: 3px;

          border-radius: 20px;

          background: #cbdcda;

          transition: .2s;

          cursor: pointer;
        }

        .switch.on {
          background: #159b8a;
        }

        .switch-circle {
          width: 19px;
          height: 19px;

          border-radius: 50%;

          background: white;

          box-shadow: 0 2px 6px rgba(0,0,0,.12);

          transition: .2s;

          transform: translateX(0);
        }

        .switch.on .switch-circle {
          transform: translateX(-20px);
        }

        /* Logout */

        .logout-button {
          width: 100%;
          max-width: 520px;

          min-height: 58px;

          margin: 4px auto 0;

          padding: 10px 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          border: 1px solid rgba(255,210,218,.9);
          border-radius: 20px;

          color: #c65f70;

          background:
            linear-gradient(
              145deg,
              rgba(255,246,248,.95),
              rgba(255,231,236,.82)
            );

          font-size: 14px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 8px 20px rgba(198,95,112,.06);
        }

        .logout-button svg {
          width: 21px;
          height: 21px;
        }

        .settings-footer {
          margin: 13px 0 0;

          text-align: center;

          color: #8aabaa;

          font-size: 10px;
          font-weight: 700;
        }

        /* Bottom Navigation */

        .settings-bottom-nav {
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

          background: rgba(255,255,255,.84);

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px rgba(37,111,111,.13),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .settings-bottom-nav .nav-item {
          position: relative;

          border: 0;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;

          border-radius: 18px;

          color: #8aa5a4;

          background: transparent;

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;
        }

        .settings-bottom-nav .nav-item svg {
          width: 21px;
          height: 21px;
        }

        .settings-bottom-nav .nav-item:hover {
          color: #159b8a;
          background: rgba(219,248,242,.55);
        }

      `}</style>
    </div>
  );
}

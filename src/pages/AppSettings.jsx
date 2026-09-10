import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   ICONS
========================================================= */

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

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

/* =========================================================
   ILLUSTRATION
========================================================= */

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

/* =========================================================
   SETTING ITEM
========================================================= */

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

/* =========================================================
   APP SETTINGS
========================================================= */

export default function AppSettings() {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     SAVED SETTINGS
  ------------------------------------------------------- */

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("nabd_notifications");

    return saved === null ? true : saved === "true";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("nabd_dark_mode") === "true";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("nabd_language") || "العربية";
  });

  /* -------------------------------------------------------
     APPLY DARK MODE GLOBALLY
  ------------------------------------------------------- */

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add("nabd-dark");
      body.classList.add("nabd-dark");
      localStorage.setItem("nabd_dark_mode", "true");
    } else {
      root.classList.remove("nabd-dark");
      body.classList.remove("nabd-dark");
      localStorage.setItem("nabd_dark_mode", "false");
    }
  }, [darkMode]);

  /* -------------------------------------------------------
     APPLY LANGUAGE
  ------------------------------------------------------- */

  useEffect(() => {
    const root = document.documentElement;

    const isEnglish = language === "English";

    root.lang = isEnglish ? "en" : "ar";
    root.dir = isEnglish ? "ltr" : "rtl";

    if (isEnglish) {
      root.classList.add("nabd-ltr");
      root.classList.remove("nabd-rtl");
    } else {
      root.classList.add("nabd-rtl");
      root.classList.remove("nabd-ltr");
    }

    localStorage.setItem("nabd_language", language);
  }, [language]);

  /* -------------------------------------------------------
     NOTIFICATIONS
  ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "nabd_notifications",
      String(notifications)
    );
  }, [notifications]);

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("nabd_user");
    localStorage.removeItem("nabd_avatar");

    navigate("/login", { replace: true });
  };

  /* -------------------------------------------------------
     LANGUAGE
  ------------------------------------------------------- */

  const changeLanguage = () => {
    setLanguage((current) =>
      current === "العربية" ? "English" : "العربية"
    );
  };

  const isEnglish = language === "English";

  /* -------------------------------------------------------
     TEXT
  ------------------------------------------------------- */

  const text = isEnglish
    ? {
        title: "App Settings",
        brand: "Nabd Al Amal",
        heroTitle: "Customize your experience",
        heroText:
          "Control the app settings in the way that suits you.",

        preferences: "Preferences",

        notifications: "Notifications",
        notificationsSub: "Control app notifications",
        notificationsOn: "Notifications enabled",
        notificationsOff: "Notifications disabled",

        appearance: "Appearance",
        light: "Light",
        dark: "Dark",

        language: "Language",
        languageSub: "Application interface language",

        securityInfo: "Security & Information",

        privacy: "Privacy & Security",
        privacySub: "Manage your data and privacy",

        about: "About the app",
        aboutSub: "Nabd Al Amal",

        logout: "Log out",

        footer: "Together, we save lives",

        aboutMessage:
          "Nabd Al Amal\n\nA platform designed to make it easier to access blood donation, medicine exchange, and medical assistance services.",
      }
    : {
        title: "إعدادات التطبيق",
        brand: "نبض الأمل",
        heroTitle: "خصّص تجربتك",
        heroText:
          "تحكم في إعدادات التطبيق بالطريقة التي تناسبك",

        preferences: "التفضيلات",

        notifications: "الإشعارات",
        notificationsSub: "التحكم في إشعارات التطبيق",
        notificationsOn: "الإشعارات مفعلة",
        notificationsOff: "الإشعارات غير مفعلة",

        appearance: "المظهر",
        light: "فاتح",
        dark: "داكن",

        language: "اللغة",
        languageSub: "لغة واجهة التطبيق",

        securityInfo: "الأمان والمعلومات",

        privacy: "الخصوصية والأمان",
        privacySub: "إدارة بياناتك وخصوصيتك",

        about: "عن التطبيق",
        aboutSub: "نبض الأمل",

        logout: "تسجيل الخروج",

        footer: "معًا ننقذ الحياة",

        aboutMessage:
          "نبض الأمل\n\nمنصة تهدف إلى تسهيل الوصول إلى خدمات التبرع بالدم وتبادل الأدوية والمساعدة الطبية.",
      };

  return (
    <div
      className={`settings-page ${
        isEnglish ? "settings-english" : "settings-arabic"
      }`}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="settings-header">
        <button
          type="button"
          className="settings-back"
          onClick={() => navigate(-1)}
          aria-label={isEnglish ? "Back" : "رجوع"}
        >
          <BackIcon />
        </button>

        <h1>{text.title}</h1>

        <div className="settings-header-space" />
      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="settings-hero">
        <div className="settings-hero-text">
          <span>{text.brand}</span>

          <h2>{text.heroTitle}</h2>

          <p>{text.heroText}</p>
        </div>

        <div className="settings-illustration">
          <SettingsIllustration />
        </div>
      </section>

      {/* ===================================================
          PREFERENCES
      =================================================== */}

      <section className="settings-card">
        <div className="settings-section-title">
          <span>{text.preferences}</span>
        </div>

        {/* Notifications */}

        <SettingItem
          icon={<BellIcon />}
          title={text.notifications}
          subtitle={text.notificationsSub}
        >
          <div
            className={`switch ${
              notifications ? "on" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setNotifications((value) => !value);
            }}
          >
            <div className="switch-circle" />
          </div>
        </SettingItem>

        {/* Appearance */}

        <SettingItem
          icon={darkMode ? <MoonIcon /> : <SunIcon />}
          title={text.appearance}
          subtitle={
            darkMode
              ? text.dark
              : text.light
          }
        >
          <div
            className="appearance-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setDarkMode((value) => !value);
            }}
          >
            <span
              className={
                !darkMode ? "appearance-active" : ""
              }
            >
              <SunIcon />
              {text.light}
            </span>

            <span
              className={
                darkMode ? "appearance-active" : ""
              }
            >
              <MoonIcon />
              {text.dark}
            </span>
          </div>
        </SettingItem>

        {/* Language */}

        <SettingItem
          icon={<LanguageIcon />}
          title={text.language}
          subtitle={text.languageSub}
          onClick={changeLanguage}
        >
          <div className="setting-value">
            {language}
          </div>
        </SettingItem>
      </section>

      {/* ===================================================
          SECURITY
      =================================================== */}

      <section className="settings-card">
        <div className="settings-section-title">
          <span>{text.securityInfo}</span>
        </div>

        <SettingItem
          icon={<ShieldIcon />}
          title={text.privacy}
          subtitle={text.privacySub}
          onClick={() => navigate("/support")}
        />

        <SettingItem
          icon={<InfoIcon />}
          title={text.about}
          subtitle={text.aboutSub}
          onClick={() => {
            alert(text.aboutMessage);
          }}
        />
      </section>

      {/* ===================================================
          LOGOUT
      =================================================== */}

      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span>{text.logout}</span>
      </button>

      <p className="settings-footer">
        {text.footer}
      </p>

      {/* ===================================================
          BOTTOM NAVIGATION
      =================================================== */}

      <nav className="settings-bottom-nav">
        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/profile")}
        >
          <UserIcon />
          <span>
            {isEnglish ? "Profile" : "الملف الشخصي"}
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/notifications")}
        >
          <BellIcon />
          <span>
            {isEnglish ? "Notifications" : "الإشعارات"}
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/requests")}
        >
          <RequestsIcon />
          <span>
            {isEnglish ? "Requests" : "الطلبات"}
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/home")}
        >
          <HomeIcon />
          <span>
            {isEnglish ? "Home" : "الرئيسية"}
          </span>
        </button>
      </nav>

      {/* ===================================================
          PAGE CSS
      =================================================== */}

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

        .settings-page.settings-english {
          direction: ltr;
        }

        /* ===================================================
           HEADER
        =================================================== */

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

        /* ===================================================
           HERO
        =================================================== */

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

        /* ===================================================
           CARDS
        =================================================== */

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

        .settings-page.settings-english
        .setting-item {
          text-align: left;
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

        /* ===================================================
           SWITCH
        =================================================== */

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

          box-shadow:
            0 2px 6px rgba(0,0,0,.12);

          transition: .2s;

          transform: translateX(0);
        }

        .switch.on .switch-circle {
          transform: translateX(-20px);
        }

        .settings-page.settings-english
        .switch.on .switch-circle {
          transform: translateX(20px);
        }

        /* ===================================================
           APPEARANCE
        =================================================== */

        .appearance-toggle {
          flex-shrink: 0;

          display: flex;
          align-items: center;

          gap: 4px;

          padding: 4px;

          border-radius: 14px;

          background: rgba(224,241,238,.72);
        }

        .appearance-toggle span {
          min-height: 28px;

          padding: 4px 7px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 4px;

          border-radius: 10px;

          color: #88a4a1;

          font-size: 9px;
          font-weight: 800;
        }

        .appearance-toggle span svg {
          width: 13px;
          height: 13px;
        }

        .appearance-toggle
        span.appearance-active {
          color: #159b8a;

          background: rgba(255,255,255,.92);

          box-shadow:
            0 3px 8px rgba(37,130,120,.09);
        }

        /* ===================================================
           LOGOUT
        =================================================== */

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

        /* ===================================================
           BOTTOM NAV
        =================================================== */

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

        /* ===================================================
           DARK MODE
        =================================================== */

        body.nabd-dark .settings-page {
          color: #dcefeb;

          background:
            radial-gradient(
              circle at 8% 8%,
              rgba(21,155,138,.16),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 30%,
              rgba(42,126,135,.14),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #0b191b 0%,
              #102526 48%,
              #0d2022 100%
            );
        }

        body.nabd-dark .settings-header h1 {
          color: #65d5c3;
        }

        body.nabd-dark .settings-back {
          color: #65d5c3;

          background: rgba(30,55,57,.78);

          border-color: rgba(101,213,195,.12);

          box-shadow:
            0 7px 18px rgba(0,0,0,.18),
            inset 0 1px 0 rgba(255,255,255,.04);
        }

        body.nabd-dark .settings-hero {
          background:
            linear-gradient(
              135deg,
              rgba(27,52,53,.95),
              rgba(18,67,65,.88)
            );

          border-color: rgba(110,220,204,.10);

          box-shadow:
            0 13px 32px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.04);
        }

        body.nabd-dark
        .settings-hero-text > span {
          color: #69d7c5;
          background: rgba(36,107,98,.42);
        }

        body.nabd-dark .settings-hero-text h2 {
          color: #e2f8f4;
        }

        body.nabd-dark .settings-hero-text p {
          color: #9dbbb8;
        }

        body.nabd-dark .settings-card {
          background:
            linear-gradient(
              145deg,
              rgba(25,47,48,.95),
              rgba(18,42,43,.9)
            );

          border-color: rgba(110,220,204,.08);

          box-shadow:
            0 11px 28px rgba(0,0,0,.2),
            inset 0 1px 0 rgba(255,255,255,.035);
        }

        body.nabd-dark .settings-section-title {
          color: #80aaa6;
        }

        body.nabd-dark .setting-item {
          color: #dcefeb;

          border-top-color: rgba(130,190,183,.10);
        }

        body.nabd-dark .setting-content strong {
          color: #dff6f1;
        }

        body.nabd-dark .setting-content span {
          color: #91aaa8;
        }

        body.nabd-dark .setting-icon {
          color: #65d5c3;

          background:
            linear-gradient(
              145deg,
              #173c3b,
              #1b4946
            );
        }

        body.nabd-dark .setting-value {
          color: #72d9c8;
          background: rgba(31,93,86,.58);
        }

        body.nabd-dark .appearance-toggle {
          background: rgba(13,34,35,.82);
        }

        body.nabd-dark
        .appearance-toggle span.appearance-active {
          color: #65d5c3;

          background: rgba(35,70,69,.95);

          box-shadow:
            0 3px 8px rgba(0,0,0,.2);
        }

        body.nabd-dark .appearance-toggle span {
          color: #789592;
        }

        body.nabd-dark .switch {
          background: #385150;
        }

        body.nabd-dark .switch.on {
          background: #159b8a;
        }

        body.nabd-dark .logout-button {
          color: #f08a9a;

          background:
            linear-gradient(
              145deg,
              rgba(67,35,42,.95),
              rgba(58,29,36,.9)
            );

          border-color: rgba(240,138,154,.12);
        }

        body.nabd-dark .settings-footer {
          color: #76918f;
        }

        body.nabd-dark .settings-bottom-nav {
          background: rgba(19,39,40,.91);

          border-color: rgba(255,255,255,.07);

          box-shadow:
            0 12px 32px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.04);
        }

        body.nabd-dark
        .settings-bottom-nav .nav-item {
          color: #789795;
        }

        body.nabd-dark
        .settings-bottom-nav .nav-item:hover {
          color: #65d5c3;

          background: rgba(32,91,84,.38);
        }

        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 430px) {

          .settings-page {
            padding-left: 14px;
            padding-right: 14px;
          }

          .settings-hero {
            min-height: 170px;

            padding-left: 13px;
            padding-right: 13px;
          }

          .settings-hero-text {
            width: 56%;
          }

          .settings-hero-text h2 {
            font-size: 20px;
          }

          .settings-illustration {
            width: 44%;
          }

          .settings-illustration svg {
            max-width: 175px;
          }

          .appearance-toggle {
            gap: 2px;
          }

          .appearance-toggle span {
            padding-left: 5px;
            padding-right: 5px;
          }
        }

      `}</style>
    </div>
  );
}

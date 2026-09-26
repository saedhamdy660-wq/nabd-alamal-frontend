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
    const savedTheme = localStorage.getItem("nabd_theme");

    if (savedTheme === "dark") {
      return true;
    }

    if (savedTheme === "light") {
      return false;
    }

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

    const theme = darkMode ? "dark" : "light";

    root.setAttribute("data-theme", theme);
    body.setAttribute("data-theme", theme);

    root.classList.toggle("nabd-dark", darkMode);
    body.classList.toggle("nabd-dark", darkMode);

    localStorage.setItem("nabd_theme", theme);
    localStorage.setItem(
      "nabd_dark_mode",
      String(darkMode)
    );

    window.dispatchEvent(new Event("theme-changed"));
  }, [darkMode]);

  /* -------------------------------------------------------
     LISTEN FOR GLOBAL THEME CHANGES
  ------------------------------------------------------- */

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme =
        localStorage.getItem("nabd_theme");

      if (savedTheme === "dark") {
        setDarkMode(true);
      } else if (savedTheme === "light") {
        setDarkMode(false);
      } else {
        setDarkMode(
          localStorage.getItem("nabd_dark_mode") === "true"
        );
      }
    };

    window.addEventListener(
      "theme-changed",
      handleThemeChange
    );

    window.addEventListener(
      "storage",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "theme-changed",
        handleThemeChange
      );

      window.removeEventListener(
        "storage",
        handleThemeChange
      );
    };
  }, []);

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
   /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className={`settings-page ${
        isEnglish
          ? "settings-english"
          : "settings-arabic"
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
        <h3 className="settings-section-title">
          {text.preferences}
        </h3>

        {/* Notifications */}

        <SettingItem
          icon={<BellIcon />}
          title={text.notifications}
          subtitle={
            notifications
              ? text.notificationsOn
              : text.notificationsOff
          }
        >
          <span
            className={`switch ${
              notifications ? "on" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setNotifications((value) => !value);
            }}
          >
            <span className="switch-circle" />
          </span>
        </SettingItem>

        {/* Appearance */}

        <SettingItem
          icon={
            darkMode ? <MoonIcon /> : <SunIcon />
          }
          title={text.appearance}
          subtitle={
            darkMode ? text.dark : text.light
          }
        >
          <div className="appearance-toggle">
            <span
              className={
                !darkMode
                  ? "appearance-active"
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                setDarkMode(false);
              }}
            >
              <SunIcon />
              {text.light}
            </span>

            <span
              className={
                darkMode
                  ? "appearance-active"
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                setDarkMode(true);
              }}
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
          <span className="setting-value">
            {language}
          </span>
        </SettingItem>
      </section>

      {/* ===================================================
          SECURITY & INFORMATION
      =================================================== */}

      <section className="settings-card">
        <h3 className="settings-section-title">
          {text.securityInfo}
        </h3>

        {/* Privacy */}

        <SettingItem
          icon={<ShieldIcon />}
          title={text.privacy}
          subtitle={text.privacySub}
          onClick={() => {
            // يمكن إضافة صفحة الخصوصية هنا لاحقًا
          }}
        />

        {/* About */}

        <SettingItem
          icon={<InfoIcon />}
          title={text.about}
          subtitle={text.aboutSub}
          onClick={() => {
            window.alert(text.aboutMessage);
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

      {/* ===================================================
          FOOTER
      =================================================== */}

      <div className="settings-footer">
        {text.footer}
      </div>

      {/* ===================================================
          BOTTOM NAVIGATION
      =================================================== */}

      <nav className="settings-bottom-nav">
        <button
          type="button"
          className="nav-item"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
          <span>
            {isEnglish ? "Home" : "الرئيسية"}
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
          onClick={() => navigate("/profile")}
        >
          <UserIcon />
          <span>
            {isEnglish ? "Profile" : "حسابي"}
          </span>
        </button>

        <button
          type="button"
          className="nav-item active"
          onClick={() => navigate("/settings")}
        >
          <span className="nav-settings-icon">
            ⚙
          </span>
          <span>
            {isEnglish ? "Settings" : "الإعدادات"}
          </span>
        </button>
      </nav>

      {/* ===================================================
          STYLES
      =================================================== */}

      <style>{`

        /* =================================================
           PAGE
        ================================================= */

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

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

        .settings-page * {
          box-sizing: border-box;
        }

        /* =================================================
           HEADER
        ================================================= */

        .settings-header {
          width: 100%;
          max-width: 900px;
          margin: 0 auto 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
        }

        .settings-header h1 {
          margin: 0;

          font-size: 25px;
          font-weight: 800;

          color: #159b8a;

          text-align: center;
        }

        .settings-back {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);

          width: 44px;
          height: 44px;

          border: 1px solid rgba(
            255,
            255,
            255,
            .96
          );

          border-radius: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(
            255,
            255,
            255,
            .78
          );

          color: #159b8a;

          cursor: pointer;

          transition:
            transform .2s ease,
            background .2s ease;
        }

        .settings-back:hover {
          transform:
            translateY(-50%)
            translateY(-2px);
        }

        .settings-back svg {
          width: 21px;
          height: 21px;
        }

        /* =================================================
           HERO
        ================================================= */

        .settings-hero {
          width: 100%;
          max-width: 900px;

          margin: 0 auto 18px;

          min-height: 175px;

          padding: 24px;

          border-radius: 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.93),
              rgba(210,245,239,.82)
            );

          border: 1px solid
            rgba(255,255,255,.96);

          box-shadow:
            0 16px 35px
            rgba(37,117,107,.09);
        }

        .settings-hero-text {
          flex: 1;
          min-width: 0;
        }

        .settings-hero-text > span {
          display: inline-flex;
          align-items: center;

          padding: 7px 12px;

          border-radius: 999px;

          background:
            rgba(216,247,241,.78);

          color: #159b8a;

          font-size: 13px;
          font-weight: 800;
        }

        .settings-hero-text h2 {
          margin: 13px 0 7px;

          color: #24575a;

          font-size: 25px;
          font-weight: 800;
        }

        .settings-hero-text p {
          margin: 0;

          color: #6c8885;

          font-size: 14px;
          line-height: 1.8;

          max-width: 470px;
        }

        .settings-illustration {
          width: 220px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-illustration svg {
          width: 100%;
          max-width: 220px;
          height: auto;
          display: block;
        }

        /* =================================================
           CARDS
        ================================================= */

        .settings-card {
          width: 100%;
          max-width: 900px;

          margin: 0 auto 18px;

          padding: 8px 18px 12px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.91),
              rgba(236,250,248,.82)
            );

          border: 1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 14px 32px
            rgba(37,117,107,.07);
        }

        .settings-section-title {
          margin: 13px 2px 8px;

          font-size: 15px;
          font-weight: 800;

          color: #4e7774;
        }

        /* =================================================
           SETTING ITEM
        ================================================= */

        .setting-item {
          width: 100%;

          min-height: 72px;

          padding: 11px 2px;

          border: 0;
          border-top: 1px solid
            rgba(45,108,101,.08);

          background: transparent;

          color: #24575a;

          display: flex;
          align-items: center;

          gap: 12px;

          text-align: right;

          cursor: pointer;

          font-family: inherit;

          transition:
            background .2s ease,
            transform .2s ease;
        }

        .setting-item:first-of-type {
          border-top: 0;
        }

        .setting-item:hover {
          background:
            rgba(21,155,138,.035);

          border-radius: 14px;
        }

        .setting-icon {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          border-radius: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

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
          min-width: 0;
          flex: 1;

          display: flex;
          flex-direction: column;

          gap: 4px;
        }

        .setting-content strong {
          color: #24575a;

          font-size: 15px;
          font-weight: 800;
        }

        .setting-content span {
          color: #7a9290;

          font-size: 12px;

          line-height: 1.6;
        }

        /* =================================================
           VALUE
        ================================================= */

        .setting-value {
          flex-shrink: 0;

          padding: 8px 13px;

          border-radius: 999px;

          background:
            rgba(216,247,241,.78);

          color: #159b8a;

          font-size: 12px;
          font-weight: 800;
        }

        /* =================================================
           SWITCH
        ================================================= */

        .switch {
          width: 48px;
          height: 28px;

          flex-shrink: 0;

          padding: 3px;

          border-radius: 999px;

          display: flex;
          align-items: center;

          justify-content: flex-start;

          background: #d5e2e0;

          transition:
            background .2s ease;
        }

        .switch-circle {
          width: 22px;
          height: 22px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 2px 5px
            rgba(0,0,0,.12);

          transition:
            transform .2s ease;
        }

        .switch.on {
          background: #159b8a;

          justify-content: flex-end;
        }

        /* =================================================
           APPEARANCE TOGGLE
        ================================================= */

        .appearance-toggle {
          flex-shrink: 0;

          padding: 4px;

          display: flex;
          align-items: center;

          gap: 3px;

          border-radius: 999px;

          background:
            rgba(224,241,238,.72);
        }

        .appearance-toggle span {
          min-height: 34px;

          padding: 7px 10px;

          border-radius: 999px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          color: #7a9290;

          font-size: 11px;
          font-weight: 700;

          cursor: pointer;

          transition:
            background .2s ease,
            color .2s ease;
        }

        .appearance-toggle span svg {
          width: 15px;
          height: 15px;
        }

        .appearance-toggle span.appearance-active {
          background:
            rgba(255,255,255,.92);

          color: #159b8a;

          box-shadow:
            0 2px 8px
            rgba(40,100,95,.08);
        }

        /* =================================================
           LOGOUT
        ================================================= */

        .logout-button {
          width: 100%;
          max-width: 900px;

          min-height: 54px;

          margin: 4px auto 18px;

          border: 1px solid
            rgba(234,142,157,.16);

          border-radius: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          background:
            linear-gradient(
              145deg,
              #fff0f2,
              #ffe9ed
            );

          color: #d65d70;

          font-family: inherit;

          font-size: 14px;
          font-weight: 800;

          cursor: pointer;

          transition:
            transform .2s ease,
            filter .2s ease;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          filter: brightness(.98);
        }

        .logout-button svg {
          width: 20px;
          height: 20px;
        }

        /* =================================================
           FOOTER
        ================================================= */

        .settings-footer {
          width: 100%;
          max-width: 900px;

          margin: 0 auto 18px;

          text-align: center;

          color: #7c9693;

          font-size: 12px;
        }

        /* =================================================
           BOTTOM NAV
        ================================================= */

        .settings-bottom-nav {
          position: fixed;

          left: 18px;
          right: 18px;
          bottom: 14px;

          z-index: 100;

          max-width: 900px;
          margin: 0 auto;

          min-height: 68px;

          padding: 7px;

          display: grid;
          grid-template-columns:
            repeat(4, 1fr);

          gap: 4px;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 22px;

          background:
            rgba(255,255,255,.84);

          backdrop-filter: blur(18px);

          box-shadow:
            0 12px 35px
            rgba(26,94,86,.13);
        }

        .settings-bottom-nav .nav-item {
          min-width: 0;

          border: 0;

          border-radius: 15px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 4px;

          background: transparent;

          color: #789795;

          font-family: inherit;

          font-size: 10px;
          font-weight: 700;

          cursor: pointer;

          transition:
            background .2s ease,
            color .2s ease;
        }

        .settings-bottom-nav .nav-item:hover {
          background:
            rgba(32,91,84,.08);

          color: #159b8a;
        }

        .settings-bottom-nav .nav-item svg {
          width: 21px;
          height: 21px;
        }

        .nav-settings-icon {
          width: 21px;
          height: 21px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 19px;
          line-height: 1;
        }

        /* =================================================
           ENGLISH
        ================================================= */

        .settings-english {
          direction: ltr;
        }

        .settings-english
        .settings-header h1 {
          direction: ltr;
        }

        .settings-english
        .settings-back {
          left: 0;
          right: auto;
        }

        .settings-english
        .setting-item {
          text-align: left;
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 600px) {
          .settings-page {
            padding:
              18px 13px 105px;
          }

          .settings-header {
            margin-bottom: 14px;
          }

          .settings-header h1 {
            font-size: 22px;
          }

          .settings-back {
            width: 40px;
            height: 40px;
          }

          .settings-hero {
            min-height: 155px;

            padding: 18px;

            border-radius: 20px;
          }

          .settings-hero-text h2 {
            font-size: 21px;
          }

          .settings-hero-text p {
            font-size: 12px;
          }

          .settings-illustration {
            width: 125px;
          }

          .settings-card {
            padding:
              7px 13px 10px;

            border-radius: 19px;
          }

          .setting-item {
            min-height: 67px;
          }

          .setting-icon {
            width: 42px;
            height: 42px;

            border-radius: 13px;
          }

          .setting-content strong {
            font-size: 14px;
          }

          .setting-content span {
            font-size: 11px;
          }

          .appearance-toggle {
            gap: 2px;
          }

          .appearance-toggle span {
            padding:
              6px 8px;

            font-size: 10px;
          }

          .switch {
            width: 45px;
            height: 26px;
          }

          .switch-circle {
            width: 20px;
            height: 20px;
          }

          .settings-bottom-nav {
            left: 10px;
            right: 10px;
            bottom: 9px;

            min-height: 63px;

            border-radius: 19px;
          }
        }

        @media (max-width: 430px) {
          .settings-hero {
            gap: 8px;
          }

          .settings-illustration {
            width: 105px;
          }

          .settings-hero-text h2 {
            font-size: 19px;
          }

          .settings-hero-text p {
            font-size: 11px;
          }

          .appearance-toggle span {
            min-height: 31px;
            padding:
              5px 7px;
          }

          .setting-value {
            padding:
              7px 10px;

            font-size: 11px;
          }
        }

        /* =================================================
           DARK MODE
        ================================================= */

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

        body.nabd-dark
        .settings-header h1 {
          color: #65d5c3;
        }

        body.nabd-dark
        .settings-back {
          color: #65d5c3;

          background:
            rgba(30,55,57,.78);

          border-color:
            rgba(101,213,195,.12);
        }

        body.nabd-dark
        .settings-hero {
          background:
            linear-gradient(
              135deg,
              rgba(27,52,53,.95),
              rgba(18,67,65,.88)
            );

          border-color:
            rgba(110,220,204,.10);
        }

        body.nabd-dark
        .settings-hero-text > span {
          color: #69d7c5;

          background:
            rgba(36,107,98,.42);
        }

        body.nabd-dark
        .settings-hero-text h2 {
          color: #e2f8f4;
        }

        body.nabd-dark
        .settings-hero-text p {
          color: #9dbbb8;
        }

        body.nabd-dark
        .settings-card {
          background:
            linear-gradient(
              145deg,
              rgba(25,47,48,.95),
              rgba(18,42,43,.9)
            );

          border-color:
            rgba(110,220,204,.08);
        }

        body.nabd-dark
        .settings-section-title {
          color: #80aaa6;
        }

        body.nabd-dark
        .setting-item {
          color: #dcefeb;

          border-top-color:
            rgba(130,190,183,.10);
        }

        body.nabd-dark
        .setting-content strong {
          color: #dff6f1;
        }

        body.nabd-dark
        .setting-content span {
          color: #91aaa8;
        }

        body.nabd-dark
        .setting-icon {
          color: #65d5c3;

          background:
            linear-gradient(
              145deg,
              #173c3b,
              #1b4946
            );
        }

        body.nabd-dark
        .setting-value {
          color: #72d9c8;

          background:
            rgba(31,93,86,.58);
        }

        body.nabd-dark
        .appearance-toggle {
          background:
            rgba(13,34,35,.82);
        }

        body.nabd-dark
        .appearance-toggle
        span.appearance-active {
          color: #65d5c3;

          background:
            rgba(35,70,69,.95);
        }

        body.nabd-dark
        .appearance-toggle span {
          color: #789592;
        }

        body.nabd-dark
        .switch {
          background: #385150;
        }

        body.nabd-dark
        .switch.on {
          background: #159b8a;
        }

        body.nabd-dark
        .logout-button {
          color: #f08a9a;

          background:
            linear-gradient(
              145deg,
              rgba(67,35,42,.95),
              rgba(58,29,36,.9)
            );

          border-color:
            rgba(240,138,154,.12);
        }

        body.nabd-dark
        .settings-footer {
          color: #76918f;
        }

        body.nabd-dark
        .settings-bottom-nav {
          background:
            rgba(19,39,40,.91);

          border-color:
            rgba(255,255,255,.07);
        }

        body.nabd-dark
        .settings-bottom-nav
        .nav-item {
          color: #789795;
        }

        body.nabd-dark
        .settings-bottom-nav
        .nav-item:hover {
          color: #65d5c3;

          background:
            rgba(32,91,84,.38);
        }
        /* =================================================
           DARK MODE - FINAL SURFACE FIX
        ================================================= */

        body.nabd-dark .settings-page {
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
            ) !important;

          color: #dcefeb !important;
        }

        /* =================================================
           HERO
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-hero {
          background:
            linear-gradient(
              135deg,
              #1b3435,
              #124341
            ) !important;

          border-color:
            rgba(101,213,195,.10) !important;
        }

        /* =================================================
           CARDS
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-card {
          background:
            linear-gradient(
              145deg,
              #193031,
              #122a2b
            ) !important;

          border-color:
            rgba(101,213,195,.10) !important;
        }

        /* =================================================
           SETTING ROWS
        ================================================= */

        body.nabd-dark
        .settings-page
        .setting-item {
          background: transparent !important;

          color: #dcefeb !important;

          border-top-color:
            rgba(130,190,183,.10) !important;
        }

        body.nabd-dark
        .settings-page
        .setting-content strong {
          color: #dff6f1 !important;
        }

        body.nabd-dark
        .settings-page
        .setting-content span {
          color: #91aaa8 !important;
        }

        /* =================================================
           ICON BOXES
        ================================================= */

        body.nabd-dark
        .settings-page
        .setting-icon {
          background:
            linear-gradient(
              145deg,
              #173c3b,
              #1b4946
            ) !important;

          color: #65d5c3 !important;
        }

        /* =================================================
           LANGUAGE VALUE
        ================================================= */

        body.nabd-dark
        .settings-page
        .setting-value {
          background: #1f5d56 !important;

          color: #72d9c8 !important;
        }

        /* =================================================
           APPEARANCE TOGGLE
        ================================================= */

        body.nabd-dark
        .settings-page
        .appearance-toggle {
          background: #0d2223 !important;
        }

        body.nabd-dark
        .settings-page
        .appearance-toggle span {
          color: #789592 !important;
        }

        body.nabd-dark
        .settings-page
        .appearance-toggle
        span.appearance-active {
          background: #234645 !important;

          color: #65d5c3 !important;
        }

        /* =================================================
           SWITCH
        ================================================= */

        body.nabd-dark
        .settings-page
        .switch {
          background: #385150 !important;
        }

        body.nabd-dark
        .settings-page
        .switch.on {
          background: #159b8a !important;
        }

        body.nabd-dark
        .settings-page
        .switch-circle {
          background: #eaffff !important;
        }

        /* =================================================
           BACK BUTTON
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-back {
          background: #1e3739 !important;

          border-color:
            rgba(101,213,195,.12) !important;

          color: #65d5c3 !important;
        }

        /* =================================================
           LOGOUT
        ================================================= */

        body.nabd-dark
        .settings-page
        .logout-button {
          background:
            linear-gradient(
              145deg,
              #43232a,
              #3a1d24
            ) !important;

          border-color:
            rgba(240,138,154,.12) !important;

          color: #f08a9a !important;
        }

        /* =================================================
           BOTTOM NAV
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-bottom-nav {
          background: #132728 !important;

          border-color:
            rgba(255,255,255,.07) !important;
        }

        body.nabd-dark
        .settings-page
        .settings-bottom-nav
        .nav-item {
          background: transparent !important;

          color: #789795 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-bottom-nav
        .nav-item:hover {
          background: #205b54 !important;

          color: #65d5c3 !important;
        }

        /* =================================================
           TITLES
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-header h1 {
          color: #65d5c3 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-section-title {
          color: #80aaa6 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-hero-text h2 {
          color: #e2f8f4 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-hero-text p {
          color: #9dbbb8 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-hero-text > span {
          background: #246b62 !important;

          color: #69d7c5 !important;
        }

        /* =================================================
           SVG ILLUSTRATION
           FIX WHITE SURFACES
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg rect[fill="white"] {
          fill: #173c3b !important;
        }

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg circle[fill="rgba(255,255,255,.55)"] {
          fill: rgba(31,82,80,.45) !important;
        }

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg rect[fill="#e7f8f4"] {
          fill: #123a39 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg circle[fill="#c9efe7"] {
          fill: #205b54 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg rect[fill="#d9f3ee"] {
          fill: #1d4b49 !important;
        }

        body.nabd-dark
        .settings-page
        .settings-illustration
        svg circle[fill="#d7f5ef"] {
          fill: #205b54 !important;
        }

        /* =================================================
           FOOTER
        ================================================= */

        body.nabd-dark
        .settings-page
        .settings-footer {
          color: #76918f !important;
        }

        /* =================================================
           HOVER FIX
        ================================================= */

        body.nabd-dark
        .settings-page
        .setting-item:hover {
          background:
            rgba(101,213,195,.035) !important;
        }

        /* =================================================
           MOBILE DARK MODE
        ================================================= */

        @media (max-width: 600px) {

          body.nabd-dark
          .settings-page
          .settings-hero {
            background:
              linear-gradient(
                135deg,
                #1b3435,
                #124341
              ) !important;
          }

          body.nabd-dark
          .settings-page
          .settings-card {
            background:
              linear-gradient(
                145deg,
                #193031,
                #122a2b
              ) !important;
          }

          body.nabd-dark
          .settings-page
          .settings-bottom-nav {
            background: #132728 !important;
          }
        }

        /* =================================================
           VERY SMALL SCREENS
        ================================================= */

        @media (max-width: 430px) {

          body.nabd-dark
          .settings-page
          .settings-hero {
            background:
              linear-gradient(
                135deg,
                #1b3435,
                #124341
              ) !important;
          }

          body.nabd-dark
          .settings-page
          .settings-card {
            background:
              linear-gradient(
                145deg,
                #193031,
                #122a2b
              ) !important;
          }
        }

      `}</style>
    </div>
  );
}

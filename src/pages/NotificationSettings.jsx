import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const defaultSettings = [
  {
    key: "urgent",
    label: "تنبيهات حالات الطوارئ",
    description: "استقبال التنبيهات الخاصة بالحالات الطارئة",
    checked: true,
  },
  {
    key: "orders",
    label: "تحديثات حالة الطلبات",
    description: "معرفة آخر تحديثات طلباتك",
    checked: true,
  },
  {
    key: "platform",
    label: "رسائل المنصة",
    description: "أهم الأخبار والتنبيهات من نبض الأمل",
    checked: true,
  },
  {
    key: "promo",
    label: "عروض وتذكيرات",
    description: "العروض والتذكيرات المهمة",
    checked: false,
  },
];

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

function EmergencyIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 4l8 15H4L12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4M12 16h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrdersIcon() {
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

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3v-3.5a2.5 2.5 0 0 1-1.5-2.3v-6.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="9"
        width="16"
        height="11"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 9h17M12 9v11M7 5.5c0-1 0-1.8 2-1.8 1.8 0 3 3.3 3 5.3H8.5c-.8 0-1.5-.7-1.5-1.5 0-1.1.9-2 2-2Zm10 0c0-1-1-1.8-2-1.8-1.8 0-3 3.3-3 5.3h3.5c.8 0 1.5-.7 1.5-1.5 0-1.1-.9-2-2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="9"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function getIcon(key) {
  if (key === "urgent") return <EmergencyIcon />;
  if (key === "orders") return <OrdersIcon />;
  if (key === "platform") return <MessageIcon />;
  return <GiftIcon />;
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [radius, setRadius] = useState(5);

  /* =====================================================
     GLOBAL THEME
     ===================================================== */

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("nabd_theme") || "light";
  });

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia?.("(prefers-color-scheme: dark)").matches || false
    );
  });

  /* Listen for theme changes from Profile / other pages */
  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.getItem("nabd_theme") || "light");
    };

    window.addEventListener("nabd-theme-change", updateTheme);

    return () => {
      window.removeEventListener("nabd-theme-change", updateTheme);
    };
  }, []);

  /* System theme listener */
  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

    if (!mediaQuery) return;

    const handleChange = (event) => {
      setSystemDark(event.matches);
    };

    mediaQuery.addEventListener?.("change", handleChange);

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
    };
  }, []);

  const isDark =
    theme === "dark" ||
    (theme === "system" && systemDark);

  /* =====================================================
     NOTIFICATION TOGGLE
     ===================================================== */

  const toggle = (key) => {
    setSettings((currentSettings) =>
      currentSettings.map((setting) =>
        setting.key === key
          ? {
              ...setting,
              checked: !setting.checked,
            }
          : setting
      )
    );
  };

  /* نسبة تقدم الـ range */
  const rangePercent = ((radius - 1) / 19) * 100;

  return (
    <div
      className={`notification-settings-page ${
        isDark ? "dark-mode" : ""
      }`}
    >
      {/* ================= HEADER ================= */}

      <header className="settings-header">
        <Link
          to="/profile"
          className="back-button"
          aria-label="رجوع"
        >
          <ArrowIcon />
        </Link>

        <div className="settings-title">
          <div className="settings-title-icon">
            <BellIcon />
          </div>

          <div>
            <h1>إعدادات الإشعارات</h1>
            <p>تحكم في التنبيهات التي تصلك</p>
          </div>
        </div>
      </header>

      {/* ================= NOTIFICATIONS ================= */}

      <section className="settings-section">
        <div className="section-heading">
          <h2>التنبيهات</h2>
          <span>اختر ما تريد استقباله</span>
        </div>

        <div className="settings-card">
          {settings.map((setting) => (
            <div
              key={setting.key}
              className="setting-row"
            >
              <div className="setting-icon">
                {getIcon(setting.key)}
              </div>

              <div className="setting-text">
                <strong>
                  {setting.label}
                </strong>

                <span>
                  {setting.description}
                </span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={setting.checked}
                  onChange={() => toggle(setting.key)}
                />

                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GEOGRAPHIC ================= */}

      <section className="settings-section geographic-section">
        <div className="section-heading">
          <h2>
            نطاق التنبيهات الجغرافية
          </h2>

          <span>
            تحديد المسافة التي تظهر منها الحالات القريبة
          </span>
        </div>

        <div className="radius-card">
          {/* TOP */}

          <div className="radius-top">
            <div className="radius-icon">
              <LocationIcon />
            </div>

            <div className="radius-info">
              <strong>
                المسافة المحيطة بك
              </strong>

              <p>
                ستصلك التنبيهات من الحالات الموجودة
                داخل هذه المسافة.
              </p>
            </div>

            <div className="radius-value">
              <span>
                {radius}
              </span>

              <small>
                كم
              </small>
            </div>
          </div>

          {/* RANGE */}

          <div className="range-container">
            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              onChange={(e) =>
                setRadius(Number(e.target.value))
              }
              style={{
                background: `linear-gradient(
                  to left,
                  #159b8a 0%,
                  #159b8a ${rangePercent}%,
                  var(--range-empty) ${rangePercent}%,
                  var(--range-empty) 100%
                )`,
              }}
            />

            <div className="range-labels">
              <span>
                1 كم
              </span>

              <span>
                20 كم
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOTE ================= */}

      <div className="settings-note">
        <BellIcon />

        <p>
          يمكنك تغيير إعدادات الإشعارات في أي وقت
          لتناسب احتياجاتك.
        </p>
      </div>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* ================= PAGE ================= */

        .notification-settings-page {

          --page-bg-1: #fbffff;
          --page-bg-2: #f1fbfa;
          --page-bg-3: #e8f7f4;

          --card-bg-1: rgba(255,255,255,.92);
          --card-bg-2: rgba(232,249,246,.82);

          --main-text: #286d6d;
          --secondary-text: #8aa3a2;
          --primary: #159b8a;

          --range-empty: #dcebe9;

          min-height: 100vh;

          padding:
            24px
            18px
            45px;

          direction: rtl;

          color: var(--main-text);

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
              var(--page-bg-1) 0%,
              var(--page-bg-2) 45%,
              var(--page-bg-3) 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          transition:
            background .25s ease,
            color .25s ease;
        }

        /* ================= HEADER ================= */

        .settings-header {

          max-width: 520px;

          margin:
            0
            auto
            28px;

          display: flex;

          align-items: center;

          gap: 14px;
        }

        .back-button {

          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: var(--primary);

          background:
            rgba(255,255,255,.78);

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08);

          text-decoration: none;

          transition: .2s;
        }

        .back-button svg {

          width: 22px;
          height: 22px;
        }

        .settings-title {

          display: flex;

          align-items: center;

          gap: 13px;
        }

        .settings-title-icon {

          width: 52px;
          height: 52px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 17px;

          color: var(--primary);

          background:
            linear-gradient(
              145deg,
              #e3faf6,
              #d2f2ec
            );

          border:
            1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08);
        }

        .settings-title-icon svg {

          width: 27px;
          height: 27px;
        }

        .settings-title h1 {

          margin:
            0
            0
            5px;

          color: var(--primary);

          font-size: 22px;

          font-weight: 800;

          line-height: 1.3;
        }

        .settings-title p {

          margin: 0;

          color: var(--secondary-text);

          font-size: 12px;

          line-height: 1.5;
        }

        /* ================= SECTION ================= */

        .settings-section {

          max-width: 520px;

          margin:
            0
            auto
            26px;
        }

        .section-heading {

          margin-bottom: 12px;
        }

        .section-heading h2 {

          margin:
            0
            0
            5px;

          color: var(--main-text);

          font-size: 18px;

          font-weight: 800;

          line-height: 1.4;
        }

        .section-heading span {

          color: var(--secondary-text);

          font-size: 11px;

          line-height: 1.5;
        }

        /* ================= SETTINGS CARD ================= */

        .settings-card {

          overflow: hidden;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              var(--card-bg-1),
              var(--card-bg-2)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
            rgba(42,128,128,.08);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        /* ================= ROW ================= */

        .setting-row {

          min-height: 82px;

          padding:
            12px
            15px;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .setting-row + .setting-row {

          border-top:
            1px solid
            rgba(124,184,177,.15);
        }

        .setting-icon {

          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: var(--primary);

          background:
            linear-gradient(
              145deg,
              #e4faf6,
              #d3f3ed
            );
        }

        .setting-icon svg {

          width: 24px;
          height: 24px;
        }

        .setting-text {

          flex: 1;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 4px;
        }

        .setting-text strong {

          color: var(--main-text);

          font-size: 14px;

          font-weight: 800;

          line-height: 1.4;
        }

        .setting-text span {

          color: var(--secondary-text);

          font-size: 10px;

          line-height: 1.6;
        }

        /* ================= SWITCH ================= */

        .switch {

          position: relative;

          width: 47px;
          height: 26px;

          flex-shrink: 0;

          cursor: pointer;
        }

        .switch input {

          width: 0;
          height: 0;

          opacity: 0;
        }

        .slider {

          position: absolute;

          inset: 0;

          border-radius: 20px;

          background: #d7e7e5;

          transition: .25s;
        }

        .slider::before {

          content: "";

          position: absolute;

          width: 20px;
          height: 20px;

          top: 3px;
          right: 3px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 2px 6px
            rgba(0,0,0,.15);

          transition: .25s;
        }

        .switch input:checked + .slider {

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );
        }

        .switch input:checked + .slider::before {

          transform:
            translateX(-21px);
        }

        /* ================= GEOGRAPHIC CARD ================= */

        .radius-card {

          padding:
            18px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              var(--card-bg-1),
              var(--card-bg-2)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
            rgba(42,128,128,.08);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .radius-top {

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .radius-icon {

          width: 49px;
          height: 49px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: var(--primary);

          background:
            linear-gradient(
              145deg,
              #e0f9f4,
              #ccefe8
            );
        }

        .radius-icon svg {

          width: 25px;
          height: 25px;
        }

        .radius-info {

          flex: 1;

          min-width: 0;
        }

        .radius-info strong {

          display: block;

          color: var(--main-text);

          font-size: 14px;

          font-weight: 800;

          line-height: 1.4;
        }

        .radius-info p {

          margin:
            5px
            0
            0;

          color: var(--secondary-text);

          font-size: 10px;

          line-height: 1.6;
        }

        /* ================= VALUE ================= */

        .radius-value {

          min-width: 62px;

          min-height: 52px;

          padding:
            6px
            8px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 4px;

          border-radius: 16px;

          color: var(--primary);

          background:
            rgba(213,247,240,.82);

          border:
            1px solid
            rgba(255,255,255,.55);
        }

        .radius-value span {

          font-size: 21px;

          font-weight: 900;

          line-height: 1;
        }

        .radius-value small {

          font-size: 10px;

          font-weight: 800;
        }

        /* ================= RANGE ================= */

        .range-container {

          margin-top: 22px;
        }

        .range-container input {

          width: 100%;

          height: 7px;

          appearance: none;

          -webkit-appearance: none;

          display: block;

          border: none;

          border-radius: 10px;

          outline: none;

          cursor: pointer;
        }

        .range-container input::-webkit-slider-thumb {

          appearance: none;

          -webkit-appearance: none;

          width: 23px;
          height: 23px;

          border-radius: 50%;

          background: var(--primary);

          border:
            4px solid
            white;

          box-shadow:
            0 3px 10px
            rgba(21,155,138,.28);

          cursor: pointer;
        }

        .range-container input::-moz-range-thumb {

          width: 18px;
          height: 18px;

          border-radius: 50%;

          background: var(--primary);

          border:
            3px solid
            white;

          box-shadow:
            0 3px 10px
            rgba(21,155,138,.28);

          cursor: pointer;
        }

        .range-labels {

          margin-top: 9px;

          display: flex;

          justify-content: space-between;

          direction: ltr;

          color: var(--secondary-text);

          font-size: 10px;

          font-weight: 600;
        }

        /* ================= NOTE ================= */

        .settings-note {

          max-width: 520px;

          margin:
            5px
            auto
            0;

          padding:
            14px
            16px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 18px;

          color: var(--secondary-text);

          background:
            rgba(255,255,255,.5);

          border:
            1px solid
            rgba(255,255,255,.7);
        }

        .settings-note svg {

          width: 20px;
          height: 20px;

          flex-shrink: 0;

          color: var(--primary);
        }

        .settings-note p {

          margin: 0;

          color: var(--secondary-text);

          font-size: 10px;

          line-height: 1.7;
        }

        /* =====================================================
           DARK MODE
           يعتمد على اختيار التطبيق وليس نظام الجهاز
           ===================================================== */

        .notification-settings-page.dark-mode {

          --page-bg-1: #061f21;
          --page-bg-2: #08292b;
          --page-bg-3: #0a3234;

          --card-bg-1: rgba(13,48,50,.96);
          --card-bg-2: rgba(9,40,42,.94);

          --main-text: #d8eeee;
          --secondary-text: #9bbdbc;

          --range-empty: #123b3d;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(42,177,160,.12),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(49,154,144,.10),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #061f21 0%,
              #08292b 48%,
              #0a3234 100%
            );
        }

        .notification-settings-page.dark-mode .back-button {

          color: #61d1c1;

          background:
            rgba(255,255,255,.12);

          border:
            1px solid
            rgba(255,255,255,.16);

          box-shadow:
            0 7px 18px
            rgba(0,0,0,.18);
        }

        .notification-settings-page.dark-mode .settings-title h1 {

          color: #70d8ca;
        }

        .notification-settings-page.dark-mode .settings-title p {

          color: #9bbdbc;
        }

        .notification-settings-page.dark-mode .settings-title-icon {

          color: #55cdbb;

          background:
            linear-gradient(
              145deg,
              rgba(61,188,171,.22),
              rgba(32,125,116,.24)
            );

          border:
            1px solid
            rgba(255,255,255,.10);
        }

        .notification-settings-page.dark-mode .section-heading h2 {

          color: #d8eeee;
        }

        .notification-settings-page.dark-mode .section-heading span {

          color: #9bbdbc;
        }

        .notification-settings-page.dark-mode .settings-card,
        .notification-settings-page.dark-mode .radius-card {

          border:
            1px solid
            rgba(111,205,194,.15);

          box-shadow:
            0 15px 35px
            rgba(0,0,0,.20),
            inset 0 1px 0
            rgba(255,255,255,.035);
        }

        .notification-settings-page.dark-mode .setting-row + .setting-row {

          border-top:
            1px solid
            rgba(111,205,194,.12);
        }

        .notification-settings-page.dark-mode .setting-icon,
        .notification-settings-page.dark-mode .radius-icon {

          color: #61d1c1;

          background:
            linear-gradient(
              145deg,
              rgba(64,190,174,.20),
              rgba(31,119,112,.22)
            );

          border:
            1px solid
            rgba(255,255,255,.06);
        }

        .notification-settings-page.dark-mode .setting-text strong,
        .notification-settings-page.dark-mode .radius-info strong {

          color: #d8eeee;
        }

        .notification-settings-page.dark-mode .setting-text span,
        .notification-settings-page.dark-mode .radius-info p {

          color: #9bbdbc;
        }

        /* أهم تعديل: كارت النطاق في الدارك */

        .notification-settings-page.dark-mode .radius-card {

          background:
            linear-gradient(
              145deg,
              #103c3e,
              #0b2d2f
            );

          border:
            1px solid
            rgba(93,201,190,.20);
        }

        .notification-settings-page.dark-mode .radius-value {

          color: #73dfcf;

          background:
            rgba(39,151,137,.20);

          border:
            1px solid
            rgba(100,218,204,.12);
        }

        .notification-settings-page.dark-mode .radius-value span {

          color: #75dfd0;
        }

        .notification-settings-page.dark-mode .radius-value small {

          color: #9bbdbc;
        }

        .notification-settings-page.dark-mode .range-labels {

          color: #9bbdbc;
        }

        .notification-settings-page.dark-mode .settings-note {

          color: #9bbdbc;

          background:
            rgba(255,255,255,.055);

          border:
            1px solid
            rgba(255,255,255,.08);
        }

        .notification-settings-page.dark-mode .settings-note p {

          color: #9bbdbc;
        }

        .notification-settings-page.dark-mode .settings-note svg {

          color: #61d1c1;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 420px) {

          .notification-settings-page {

            padding:
              20px
              14px
              40px;
          }

          .settings-title h1 {

            font-size: 20px;
          }

          .settings-title p {

            font-size: 11px;
          }

          .section-heading h2 {

            font-size: 17px;
          }

          .setting-row {

            min-height: 80px;

            padding:
              11px
              12px;

            gap: 10px;
          }

          .setting-icon {

            width: 44px;
            height: 44px;
          }

          .setting-text strong {

            font-size: 13px;
          }

          .setting-text span {

            font-size: 9px;
          }

          .radius-card {

            padding: 16px;
          }

          .radius-info strong {

            font-size: 13px;
          }

          .radius-info p {

            font-size: 9px;
          }

          .radius-value {

            min-width: 58px;
          }
        }

      `}</style>
    </div>
  );
}

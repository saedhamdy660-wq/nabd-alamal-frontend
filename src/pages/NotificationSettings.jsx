import React, { useState } from "react";
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
        d="M3.5 9h17M12 9v11M7 5.5c0-1 1-1.8 2-1.8 1.8 0 3 3.3 3 5.3H8.5c-.8 0-1.5-.7-1.5-1.5 0-1.1.9-2 2-2Zm10 0c0-1-1-1.8-2-1.8-1.8 0-3 3.3-3 5.3h3.5c.8 0 1.5-.7 1.5-1.5 0-1.1-.9-2-2-2Z"
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

  return (
    <div className="notification-settings-page">

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

            <p>
              تحكم في التنبيهات التي تصلك
            </p>
          </div>

        </div>

      </header>


      {/* ================= NOTIFICATIONS ================= */}

      <section className="settings-section">

        <div className="section-heading">

          <h2>
            التنبيهات
          </h2>

          <span>
            اختر ما تريد استقباله
          </span>

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
                  onChange={() =>
                    toggle(setting.key)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          ))}

        </div>

      </section>


      {/* ================= GEOGRAPHIC ================= */}

      <section className="settings-section">

        <div className="section-heading">

          <h2>
            نطاق التنبيهات الجغرافية
          </h2>

          <span>
            تحديد المسافة التي تظهر منها الحالات القريبة
          </span>

        </div>


        <div className="radius-card">

          <div className="radius-top">

            <div className="radius-icon">
              <LocationIcon />
            </div>


            <div>

              <strong>
                المسافة المحيطة بك
              </strong>

              <p>
                ستصلك التنبيهات من داخل هذه المسافة
              </p>

            </div>


            <div className="radius-value">

              {radius}

              <small>
                كم
              </small>

            </div>

          </div>


          <div className="range-container">

            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              style={{
                "--range-value": radius,
              }}
              onChange={(e) =>
                setRadius(Number(e.target.value))
              }
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


      {/* ================= INFO ================= */}

      <div className="settings-note">

        <BellIcon />

        <p>
          يمكنك تغيير إعدادات الإشعارات في أي وقت
          لتناسب احتياجاتك.
        </p>

      </div>


      {/* ================= STYLE ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        /* =========================================
           LIGHT MODE
        ========================================= */

        .notification-settings-page {

          min-height: 100vh;

          padding:
            22px 18px 40px;

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

          transition:
            background .25s ease,
            color .25s ease;
        }


        /* =========================================
           HEADER
        ========================================= */

        .settings-header {

          max-width: 520px;

          margin:
            0 auto 25px;

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

          border:
            1px solid
            rgba(255,255,255,.9);

          box-shadow:

            0 7px 18px
              rgba(35,139,128,.08),

            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;

          transition:
            background .25s ease,
            color .25s ease,
            border .25s ease;
        }


        .back-button svg {

          width: 21px;
          height: 21px;
        }


        .settings-title {

          display: flex;

          align-items: center;

          gap: 12px;
        }


        .settings-title-icon {

          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

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
              rgba(35,139,128,.08),

            inset 0 1px 0
              rgba(255,255,255,.85);

          transition:
            background .25s ease,
            border .25s ease;
        }


        .settings-title-icon svg {

          width: 25px;
          height: 25px;
        }


        .settings-title h1 {

          margin:
            0 0 4px;

          color: #218d83;

          font-size: 20px;

          font-weight: 800;
        }


        .settings-title p {

          margin: 0;

          color: #88a3a2;

          font-size: 10px;
        }


        /* =========================================
           SECTION
        ========================================= */

        .settings-section {

          max-width: 520px;

          margin:
            0 auto 23px;
        }


        .section-heading {

          margin-bottom: 11px;
        }


        .section-heading h2 {

          margin:
            0 0 4px;

          color: #286d6d;

          font-size: 16px;

          font-weight: 800;
        }


        .section-heading span {

          color: #8aa3a2;

          font-size: 10px;
        }


        /* =========================================
           SETTINGS CARD
        ========================================= */

        .settings-card {

          overflow: hidden;

          border-radius: 25px;

          background:

            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:

            0 12px 30px
              rgba(42,128,128,.08),

            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }


        /* =========================================
           SETTING ROW
        ========================================= */

        .setting-row {

          min-height: 78px;

          padding:
            10px 14px;

          display: flex;

          align-items: center;

          gap: 11px;
        }


        .setting-row + .setting-row {

          border-top:
            1px solid
            rgba(124,184,177,.14);
        }


        .setting-icon {

          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

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


        .setting-text {

          flex: 1;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 3px;
        }


        .setting-text strong {

          color: #286d6d;

          font-size: 13px;

          font-weight: 800;
        }


        .setting-text span {

          color: #8aa3a2;

          font-size: 9px;

          line-height: 1.5;
        }


        /* =========================================
           SWITCH
        ========================================= */

        .switch {

          position: relative;

          width: 45px;
          height: 25px;

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

          width: 19px;
          height: 19px;

          top: 3px;
          right: 3px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 2px 6px
            rgba(0,0,0,.12);

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
            translateX(-20px);
        }


        /* =========================================
           RADIUS
        ========================================= */

        .radius-card {

          padding: 17px;

          border-radius: 25px;

          background:

            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(224,248,243,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:

            0 12px 30px
              rgba(42,128,128,.08),

            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }


        .radius-top {

          display: flex;

          align-items: center;

          gap: 11px;
        }


        .radius-icon {

          width: 45px;
          height: 45px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background:

            linear-gradient(
              145deg,
              #e0f9f4,
              #ccefe8
            );
        }


        .radius-icon svg {

          width: 23px;
          height: 23px;
        }


        .radius-top > div:nth-child(2) {

          flex: 1;
        }


        .radius-top strong {

          color: #286d6d;

          font-size: 13px;
        }


        .radius-top p {

          margin:
            4px 0 0;

          color: #8aa3a2;

          font-size: 9px;

          line-height: 1.5;
        }


        .radius-value {

          min-width: 53px;

          padding:
            8px 7px;

          text-align: center;

          border-radius: 15px;

          color: #159b8a;

          background:
            rgba(213,247,240,.8);

          font-size: 17px;

          font-weight: 900;
        }


        .radius-value small {

          margin-right: 3px;

          font-size: 9px;

          font-weight: 700;
        }


        /* =========================================
           RANGE
        ========================================= */

        .range-container {

          margin-top: 19px;
        }


        .range-container input {

          width: 100%;

          height: 6px;

          appearance: none;

          -webkit-appearance: none;

          border-radius: 10px;

          background:

            linear-gradient(
              to left,
              #159b8a 0%,
              #159b8a
                calc(
                  (var(--range-value, 5) - 1)
                  / 19 * 100%
                ),
              #dcebe9
                calc(
                  (var(--range-value, 5) - 1)
                  / 19 * 100%
                ),
              #dcebe9 100%
            );

          outline: none;
        }


        .range-container input::-webkit-slider-thumb {

          appearance: none;

          -webkit-appearance: none;

          width: 21px;
          height: 21px;

          border-radius: 50%;

          background: #159b8a;

          border:
            4px solid white;

          box-shadow:
            0 3px 9px
              rgba(21,155,138,.22);

          cursor: pointer;
        }


        .range-container input::-moz-range-thumb {

          width: 17px;
          height: 17px;

          border-radius: 50%;

          background: #159b8a;

          border:
            3px solid white;

          box-shadow:
            0 3px 9px
              rgba(21,155,138,.22);

          cursor: pointer;
        }


        .range-labels {

          margin-top: 7px;

          display: flex;

          justify-content: space-between;

          direction: ltr;

          color: #91aaa8;

          font-size: 9px;
        }


        /* =========================================
           NOTE
        ========================================= */

        .settings-note {

          max-width: 520px;

          margin:
            5px auto 0;

          padding:
            13px 15px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-radius: 18px;

          color: #5e8885;

          background:
            rgba(255,255,255,.5);

          border:
            1px solid
            rgba(255,255,255,.7);

          transition:
            background .25s ease,
            border .25s ease,
            color .25s ease;
        }


        .settings-note svg {

          width: 19px;
          height: 19px;

          flex-shrink: 0;

          color: #159b8a;
        }


        .settings-note p {

          margin: 0;

          font-size: 9px;

          line-height: 1.6;
        }


        /* =========================================
           DARK MODE
        ========================================= */

        html.dark .notification-settings-page,
        body.dark .notification-settings-page,
        .dark .notification-settings-page {

          color: #d9eeee;

          background:

            radial-gradient(
              circle at 10% 5%,
              rgba(21,155,138,.16),
              transparent 30%
            ),

            radial-gradient(
              circle at 95% 28%,
              rgba(40,120,115,.14),
              transparent 32%
            ),

            linear-gradient(
              160deg,
              #0d181a 0%,
              #112326 48%,
              #0b1719 100%
            );
        }


        /* =========================================
           DARK HEADER
        ========================================= */

        html.dark .back-button,
        body.dark .back-button,
        .dark .back-button {

          color: #62d3c2;

          background:
            rgba(27,49,51,.88);

          border-color:
            rgba(104,194,184,.12);

          box-shadow:

            0 8px 20px
              rgba(0,0,0,.25),

            inset 0 1px 0
              rgba(255,255,255,.035);
        }


        html.dark .settings-title-icon,
        body.dark .settings-title-icon,
        .dark .settings-title-icon {

          color: #5dd0be;

          background:

            linear-gradient(
              145deg,
              #183b39,
              #173331
            );

          border-color:
            rgba(104,194,184,.10);

          box-shadow:

            0 8px 20px
              rgba(0,0,0,.24),

            inset 0 1px 0
              rgba(255,255,255,.035);
        }


        html.dark .settings-title h1,
        body.dark .settings-title h1,
        .dark .settings-title h1 {

          color: #67d4c3;
        }


        html.dark .settings-title p,
        body.dark .settings-title p,
        .dark .settings-title p {

          color: #789796;
        }


        /* =========================================
           DARK SECTION
        ========================================= */

        html.dark .section-heading h2,
        body.dark .section-heading h2,
        .dark .section-heading h2 {

          color: #c9e6e4;
        }


        html.dark .section-heading span,
        body.dark .section-heading span,
        .dark .section-heading span {

          color: #789695;
        }


        /* =========================================
           DARK SETTINGS CARD
        ========================================= */

        html.dark .settings-card,
        body.dark .settings-card,
        .dark .settings-card {

          background:

            linear-gradient(
              145deg,
              rgba(27,50,52,.96),
              rgba(19,39,41,.94)
            );

          border-color:
            rgba(112,190,181,.10);

          box-shadow:

            0 14px 35px
              rgba(0,0,0,.30),

            inset 0 1px 0
              rgba(255,255,255,.035);
        }


        html.dark .setting-row + .setting-row,
        body.dark .setting-row + .setting-row,
        .dark .setting-row + .setting-row {

          border-top-color:
            rgba(120,184,179,.10);
        }


        /* =========================================
           DARK ICONS
        ========================================= */

        html.dark .setting-icon,
        body.dark .setting-icon,
        .dark .setting-icon {

          color: #5bd0be;

          background:

            linear-gradient(
              145deg,
              #193d3b,
              #173330
            );
        }


        /* =========================================
           DARK TEXT
        ========================================= */

        html.dark .setting-text strong,
        body.dark .setting-text strong,
        .dark .setting-text strong {

          color: #c9e5e3;
        }


        html.dark .setting-text span,
        body.dark .setting-text span,
        .dark .setting-text span {

          color: #7f9d9b;
        }


        /* =========================================
           DARK SWITCH
        ========================================= */

        html.dark .slider,
        body.dark .slider,
        .dark .slider {

          background: #30494b;
        }


        html.dark .slider::before,
        body.dark .slider::before,
        .dark .slider::before {

          background: #d9eeee;

          box-shadow:
            0 2px 7px
            rgba(0,0,0,.38);
        }


        html.dark
        .switch input:checked + .slider,
        body.dark
        .switch input:checked + .slider,
        .dark
        .switch input:checked + .slider {

          background:

            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );
        }


        /* =========================================
           DARK RADIUS
        ========================================= */

        html.dark .radius-card,
        body.dark .radius-card,
        .dark .radius-card {

          background:

            linear-gradient(
              145deg,
              rgba(27,51,52,.96),
              rgba(19,41,43,.94)
            );

          border-color:
            rgba(112,190,181,.10);

          box-shadow:

            0 14px 35px
              rgba(0,0,0,.30),

            inset 0 1px 0
              rgba(255,255,255,.035);
        }


        html.dark .radius-icon,
        body.dark .radius-icon,
        .dark .radius-icon {

          color: #5bd0be;

          background:

            linear-gradient(
              145deg,
              #193d3b,
              #173330
            );
        }


        html.dark .radius-top strong,
        body.dark .radius-top strong,
        .dark .radius-top strong {

          color: #c9e5e3;
        }


        html.dark .radius-top p,
        body.dark .radius-top p,
        .dark .radius-top p {

          color: #7f9d9b;
        }


        html.dark .radius-value,
        body.dark .radius-value,
        .dark .radius-value {

          color: #62d3c2;

          background:
            rgba(24,82,76,.58);
        }


        /* =========================================
           DARK RANGE
        ========================================= */

        html.dark .range-container input,
        body.dark .range-container input,
        .dark .range-container input {

          background:

            linear-gradient(
              to left,
              #159b8a 0%,
              #159b8a
                calc(
                  (var(--range-value, 5) - 1)
                  / 19 * 100%
                ),
              #30494b
                calc(
                  (var(--range-value, 5) - 1)
                  / 19 * 100%
                ),
              #30494b 100%
            );
        }


        html.dark
        .range-container input::-webkit-slider-thumb,
        body.dark
        .range-container input::-webkit-slider-thumb,
        .dark
        .range-container input::-webkit-slider-thumb {

          border-color:
            #183436;
        }


        html.dark
        .range-container input::-moz-range-thumb,
        body.dark
        .range-container input::-moz-range-thumb,
        .dark
        .range-container input::-moz-range-thumb {

          border-color:
            #183436;
        }


        html.dark .range-labels,
        body.dark .range-labels,
        .dark .range-labels {

          color: #76918f;
        }


        /* =========================================
           DARK NOTE
        ========================================= */

        html.dark .settings-note,
        body.dark .settings-note,
        .dark .settings-note {

          color: #91b4b1;

          background:
            rgba(25,46,48,.70);

          border-color:
            rgba(113,190,182,.09);
        }


        html.dark .settings-note svg,
        body.dark .settings-note svg,
        .dark .settings-note svg {

          color: #5bd0be;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 380px) {

          .notification-settings-page {

            padding-left: 12px;
            padding-right: 12px;
          }


          .settings-title h1 {

            font-size: 18px;
          }


          .settings-title p {

            font-size: 9px;
          }


          .settings-title-icon {

            width: 44px;
            height: 44px;
          }


          .back-button {

            width: 40px;
            height: 40px;
          }


          .setting-row {

            min-height: 74px;

            padding:
              9px 11px;

            gap: 9px;
          }


          .setting-icon {

            width: 39px;
            height: 39px;
          }


          .setting-text strong {

            font-size: 12px;
          }


          .setting-text span {

            font-size: 8px;
          }


          .switch {

            width: 42px;
            height: 24px;
          }


          .slider::before {

            width: 18px;
            height: 18px;
          }


          .radius-card {

            padding: 14px;
          }

        }

      `}</style>

    </div>
  );
}

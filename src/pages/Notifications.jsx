import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

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

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 13.2v-2.4l-1.8-.5a5.9 5.9 0 0 0-.6-1.5l1-1.5-1.7-1.7-1.5 1a5.9 5.9 0 0 0-1.5-.6L12.4 4H10l-.5 1.8a5.9 5.9 0 0 0-1.5.6l-1.5-1L4.8 7.1l1.7 1.7 1.5-1a5.9 5.9 0 0 0-.6 1.5l-1.8.5v2.4l1.8.5a5.9 5.9 0 0 0 .6 1.5l-1 1.5 1.7 1.7 1.5-1a5.9 5.9 0 0 0 1.5.6L10 20h2.4l.5-1.8a5.9 5.9 0 0 0 1.5-.6l1.5 1 1.7-1.7-1-1.5a5.9 5.9 0 0 0 .6-1.5l1.8-.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
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
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 11v5M12 8h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getNotificationIcon(type) {
  if (type === "urgent") {
    return <AlertIcon />;
  }

  if (type === "success") {
    return <CheckIcon />;
  }

  return <InfoIcon />;
}

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .getNotifications()
      .then(setItems)
      .catch(() => {});
  }, []);

  return (
    <div className="notifications-page">

      {/* Header */}
      <header className="notifications-header">

        <div className="header-title">
          <div className="header-bell">
            <BellIcon />
          </div>

          <div>
            <h1>الإشعارات</h1>
            <p>آخر التحديثات والتنبيهات</p>
          </div>
        </div>

        <Link
          to="/notification-settings"
          className="settings-button"
        >
          <SettingsIcon />
        </Link>

      </header>

      {/* Notifications */}
      <section className="notifications-list">

        {items.length === 0 && (
          <div className="empty-notifications">

            <div className="empty-icon">
              <BellIcon />
            </div>

            <h3>لا توجد إشعارات</h3>

            <p>
              ستظهر هنا الإشعارات والتحديثات المهمة.
            </p>

          </div>
        )}

        {items.map((notification) => {

          const type =
            notification.type || "info";

          return (
            <div
              key={notification.id}
              className={`notification-card ${type}`}
            >

              <div className="notification-icon">
                {getNotificationIcon(type)}
              </div>

              <div className="notification-content">

                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.body}
                </p>

                <span>
                  {notification.time}
                </span>

              </div>

            </div>
          );
        })}

      </section>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .notifications-page {
          min-height: 100vh;

          padding: 22px 18px 35px;

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

        /* Header */

        .notifications-header {
          max-width: 520px;

          margin: 0 auto 22px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;
        }

        .header-title {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .header-bell {
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

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.85);
        }

        .header-bell svg {
          width: 25px;
          height: 25px;
        }

        .header-title h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 22px;

          font-weight: 800;
        }

        .header-title p {
          margin: 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .settings-button {
          width: 44px;
          height: 44px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #218d83;

          background:
            rgba(255,255,255,.72);

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;
        }

        .settings-button svg {
          width: 23px;
          height: 23px;
        }

        /* List */

        .notifications-list {
          max-width: 520px;

          margin: 0 auto;
        }

        /* Notification Card */

        .notification-card {
          width: 100%;

          min-height: 88px;

          margin-bottom: 12px;

          padding: 14px;

          display: flex;

          align-items: center;

          gap: 12px;

          border-radius: 23px;

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 10px 27px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.85);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        /* Urgent */

        .notification-card.urgent {
          background:
            linear-gradient(
              145deg,
              rgba(255,232,238,.96),
              rgba(249,215,224,.9)
            );
        }

        /* Success */

        .notification-card.success {
          background:
            linear-gradient(
              145deg,
              rgba(218,251,242,.96),
              rgba(201,243,232,.9)
            );
        }

        /* Info */

        .notification-card.info {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );
        }

        .notification-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;
        }

        .notification-icon svg {
          width: 24px;
          height: 24px;
        }

        .notification-card.urgent
        .notification-icon {
          color: #c05267;

          background:
            rgba(255,255,255,.62);
        }

        .notification-card.success
        .notification-icon {
          color: #159b8a;

          background:
            rgba(255,255,255,.65);
        }

        .notification-card.info
        .notification-icon {
          color: #4c9290;

          background:
            rgba(255,255,255,.72);
        }

        .notification-content {
          flex: 1;

          min-width: 0;
        }

        .notification-content h3 {
          margin: 0 0 5px;

          font-size: 14px;

          line-height: 1.6;

          font-weight: 800;
        }

        .notification-card.urgent
        .notification-content h3 {
          color: #98505f;
        }

        .notification-card.success
        .notification-content h3 {
          color: #28786e;
        }

        .notification-card.info
        .notification-content h3 {
          color: #286d6d;
        }

        .notification-content p {
          margin: 0 0 6px;

          color: #718f8f;

          font-size: 11px;

          line-height: 1.7;
        }

        .notification-content span {
          color: #9aafae;

          font-size: 10px;
        }

        /* Empty */

        .empty-notifications {
          padding: 45px 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.78)
            );

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .empty-icon {
          width: 64px;
          height: 64px;

          margin: 0 auto 13px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 22px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e2faf6,
              #cfeee8
            );
        }

        .empty-icon svg {
          width: 30px;
          height: 30px;
        }

        .empty-notifications h3 {
          margin: 0 0 6px;

          color: #286d6d;

          font-size: 16px;
        }

        .empty-notifications p {
          margin: 0;

          color: #8aa3a2;

          font-size: 12px;
        }

      `}</style>
    </div>
  );
}

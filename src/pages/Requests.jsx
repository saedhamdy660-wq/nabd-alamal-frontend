import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const tabs = [
  { key: "all", label: "الكل" },
  { key: "medicine", label: "الدواء" },
  { key: "blood", label: "الدم والمساعدات" },
];

function RequestIcon({ type }) {
  if (type === "دم") {
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

  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M8 7h8M7 10h10M9 13h6M10 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 9h6M9 13h6M9 17h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getStatusClass(status = "") {
  const value = String(status).toLowerCase();

  if (
    value.includes("مكتمل") ||
    value.includes("نجاح") ||
    value.includes("تم") ||
    value.includes("completed") ||
    value.includes("success")
  ) {
    return "status-success";
  }

  if (
    value.includes("مرفوض") ||
    value.includes("ملغي") ||
    value.includes("رفض") ||
    value.includes("cancel") ||
    value.includes("reject")
  ) {
    return "status-danger";
  }

  if (
    value.includes("انتظار") ||
    value.includes("قيد") ||
    value.includes("pending")
  ) {
    return "status-pending";
  }

  return "status-info";
}

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    api.getMyRequests().then(setRequests).catch(() => {});
  }, []);

  const visible = requests.filter((r) => {
    if (tab === "medicine") return r.type === "دواء";
    if (tab === "blood") return r.type === "دم";
    return true;
  });

  return (
    <div className="requests-page">

      {/* Header */}
      <header className="requests-header">
        <div className="header-icon">
          <EmptyIcon />
        </div>

        <div>
          <h1>الطلبات السابقة</h1>
          <p>تابع جميع طلباتك السابقة وحالتها</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="requests-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`request-tab ${
              tab === t.key ? "active" : ""
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Requests */}
      {visible.length > 0 ? (
        <div className="request-list">

          {visible.map((r) => (
            <div
              key={r.id}
              className="request-card"
            >

              <div className="request-icon">
                <RequestIcon type={r.type} />
              </div>

              <div className="request-content">

                <div className="request-top">
                  <strong>{r.title}</strong>

                  <span
                    className={`request-status ${getStatusClass(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="request-meta">
                  <span>{r.type}</span>
                  <span className="dot">•</span>
                  <span>{r.date}</span>
                </div>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="empty-requests">

          <div className="empty-request-icon">
            <EmptyIcon />
          </div>

          <h2>لا توجد طلبات</h2>

          <p>
            لا توجد طلبات سابقة في هذا القسم حاليًا
          </p>

        </div>
      )}

      <style>{`

        .requests-page {
          min-height: 100vh;

          padding: 22px 18px 90px;

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

        .requests-header {
          max-width: 520px;

          margin: 0 auto 20px;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .header-icon {
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
              #e3faf6,
              #d0f0ea
            );

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 17px
              rgba(35,139,128,.08);
        }

        .header-icon svg {
          width: 22px;
          height: 22px;
        }

        .requests-header h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 21px;

          font-weight: 800;
        }

        .requests-header p {
          margin: 0;

          color: #88a3a2;

          font-size: 10px;
        }

        /* Tabs */

        .requests-tabs {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 5px;

          display: flex;

          gap: 4px;

          border-radius: 18px;

          background:
            rgba(255,255,255,.65);

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(42,128,128,.055);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .request-tab {
          flex: 1;

          min-height: 40px;

          padding: 7px 5px;

          border: 0;

          border-radius: 14px;

          color: #88a3a2;

          background: transparent;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 10px;

          font-weight: 700;

          cursor: pointer;

          transition: .2s ease;
        }

        .request-tab.active {
          color: white;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );

          box-shadow:
            0 6px 13px
              rgba(21,155,138,.15);
        }

        /* List */

        .request-list {
          max-width: 520px;

          margin: 0 auto;

          display: flex;

          flex-direction: column;

          gap: 11px;
        }

        /* Request card */

        .request-card {
          min-height: 83px;

          padding: 12px;

          display: flex;

          align-items: center;

          gap: 12px;

          border-radius: 22px;

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

        .request-icon {
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
              #e2faf5,
              #cdeee7
            );
        }

        .request-icon svg {
          width: 23px;
          height: 23px;
        }

        .request-content {
          flex: 1;

          min-width: 0;
        }

        .request-top {
          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 8px;
        }

        .request-top strong {
          color: #286d6d;

          font-size: 13px;

          font-weight: 800;

          line-height: 1.5;
        }

        .request-status {
          flex-shrink: 0;

          padding: 5px 8px;

          border-radius: 10px;

          font-size: 9px;

          font-weight: 800;

          white-space: nowrap;
        }

        .status-success {
          color: #278473;

          background:
            #def6f0;
        }

        .status-pending {
          color: #987b42;

          background:
            #fff3d9;
        }

        .status-danger {
          color: #b64f64;

          background:
            #ffe5ea;
        }

        .status-info {
          color: #328080;

          background:
            #e2f4f3;
        }

        .request-meta {
          display: flex;

          align-items: center;

          gap: 6px;

          margin-top: 7px;

          color: #91a8a7;

          font-size: 10px;
        }

        .request-meta .dot {
          color: #b5c9c7;
        }

        /* Empty */

        .empty-requests {
          max-width: 520px;

          margin: 28px auto 0;

          padding: 34px 18px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.82),
              rgba(232,249,246,.68)
            );

          border: 1px dashed
            rgba(33,141,131,.16);

          box-shadow:
            0 10px 25px
              rgba(42,128,128,.05);
        }

        .empty-request-icon {
          width: 62px;
          height: 62px;

          margin: 0 auto 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e2faf5,
              #d0f0ea
            );
        }

        .empty-request-icon svg {
          width: 28px;
          height: 28px;
        }

        .empty-requests h2 {
          margin: 0 0 6px;

          color: #286d6d;

          font-size: 15px;

          font-weight: 800;
        }

        .empty-requests p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.6;
        }

        @media (max-width: 380px) {

          .request-top {
            flex-direction: column;
            gap: 5px;
          }

          .request-status {
            align-self: flex-start;
          }

          .request-tab {
            font-size: 9px;
          }

        }

      `}</style>

    </div>
  );
}

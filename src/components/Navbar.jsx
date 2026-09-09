import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/profile",
    label: "الملف الشخصي",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.5 3.1-5.5 7-5.5s6.2 2 7 5.5" />
      </svg>
    ),
  },
  {
    to: "/notifications",
    label: "الإشعارات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
        <path d="M10 21h4" />
      </svg>
    ),
  },
  {
    to: "/requests",
    label: "الطلبات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    to: "/home",
    label: "الرئيسية",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="m4 10 8-6 8 6v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-9Z" />
        <path d="M9 20.5v-5h6v5" />
      </svg>
    ),
  },
];

export default function Navbar() {
  return (
    <>
      <nav className="global-bottom-nav" dir="ltr">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `global-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="global-nav-icon">{link.icon}</span>

            <span className="global-nav-label" dir="rtl">
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        .global-bottom-nav {
          position: fixed;
          z-index: 1000;
          left: 9px;
          right: 9px;
          bottom: 8px;
          height: 69px;

          display: flex;
          align-items: stretch;
          justify-content: space-around;

          padding: 6px;
          border-radius: 24px;

          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.9);

          box-shadow:
            0 12px 35px rgba(30, 105, 105, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .global-nav-item {
          position: relative;

          flex: 1;
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;

          text-decoration: none;
          color: #789596;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .global-nav-item:active {
          transform: scale(0.94);
        }

        .global-nav-icon {
          width: 25px;
          height: 25px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .global-nav-icon svg {
          width: 23px;
          height: 23px;

          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .global-nav-label {
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .global-nav-item.active {
          color: #159b8a;
        }

        .global-nav-item.active::after {
          content: "";

          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);

          width: 28px;
          height: 3px;

          border-radius: 10px;
          background: #159b8a;
        }

        @media (min-width: 600px) {
          .global-bottom-nav {
            width: 390px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}

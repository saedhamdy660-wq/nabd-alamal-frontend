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
            <span className="global-nav-icon">
              {link.icon}
            </span>

            <span
              className="global-nav-label"
              dir="rtl"
            >
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <style>{`

        /* =========================================
           NAVBAR - LIGHT MODE
           ========================================= */

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

          border: 1px solid
            rgba(255, 255, 255, 0.9);

          box-shadow:
            0 12px 35px
              rgba(30, 105, 105, 0.14),

            inset 0 1px 0
              rgba(255, 255, 255, 0.9);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          color-scheme: light;
        }


        /* =========================================
           NAV ITEM
           ========================================= */

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


        /* =========================================
           ICON
           ========================================= */

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


        /* =========================================
           LABEL
           ========================================= */

        .global-nav-label {
          font-size: 10px;

          font-weight: 700;

          white-space: nowrap;

          color: inherit;
        }


        /* =========================================
           ACTIVE
           ========================================= */

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


        /* =========================================
           DARK MODE
           ========================================= */

        @media (prefers-color-scheme: dark) {

          .global-bottom-nav {

            background:
              linear-gradient(
                145deg,
                rgba(18, 55, 57, 0.97),
                rgba(8, 39, 41, 0.97)
              );

            border-color:
              rgba(100, 205, 192, 0.14);

            box-shadow:
              0 12px 35px
                rgba(0, 0, 0, 0.30),

              inset 0 1px 0
                rgba(255, 255, 255, 0.04);

            color-scheme: dark;
          }


          .global-nav-item {

            color: #8eb6b2;

          }


          .global-nav-item.active {

            color: #65d6c5;

          }


          .global-nav-label {

            color: inherit;

          }


          .global-nav-item.active::after {

            background: #35b8a5;

          }


          .global-nav-icon svg {

            stroke: currentColor;

          }

        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 380px) {

          .global-bottom-nav {

            left: 8px;
            right: 8px;

            height: 67px;

            bottom: 7px;

            border-radius: 23px;

          }

          .global-nav-label {

            font-size: 9px;

          }

          .global-nav-icon {

            width: 24px;
            height: 24px;

          }

          .global-nav-icon svg {

            width: 22px;
            height: 22px;

          }

        }


        /* =========================================
           TABLET / DESKTOP
           ========================================= */

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

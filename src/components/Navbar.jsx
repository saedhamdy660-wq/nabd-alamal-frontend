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
           BOTTOM NAVBAR
           ========================================= */

        .global-bottom-nav {

          position: fixed;

          z-index: 1000;

          left: 9px;
          right: 9px;
          bottom: 8px;

          height: 72px;

          display: flex;

          align-items: stretch;

          justify-content: space-around;

          padding: 6px;

          border-radius: 25px;

          /* LIGHT MODE */

          background:
            rgba(255, 255, 255, .94);

          border:
            1px solid rgba(255,255,255,.98);

          box-shadow:
            0 12px 35px
              rgba(30,105,105,.16),

            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

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

          /* غير النشط */

          color: #6f8f90;

          transition:
            color .2s ease,
            transform .2s ease;

        }


        .global-nav-item:active {

          transform: scale(.94);

        }


        /* =========================================
           ICON
           ========================================= */

        .global-nav-icon {

          width: 27px;
          height: 27px;

          display: flex;

          align-items: center;
          justify-content: center;

        }


        .global-nav-icon svg {

          width: 24px;
          height: 24px;

          stroke: currentColor;

          stroke-width: 1.9;

          stroke-linecap: round;

          stroke-linejoin: round;

          transition:
            .2s ease;

        }


        /* =========================================
           LABEL
           ========================================= */

        .global-nav-label {

          font-size: 10px;

          font-weight: 800;

          white-space: nowrap;

          line-height: 1.2;

        }


        /* =========================================
           ACTIVE
           ========================================= */

        .global-nav-item.active {

          color: #159b8a;

        }


        .global-nav-item.active .global-nav-icon svg {

          stroke-width: 2.1;

        }


        .global-nav-item.active::after {

          content: "";

          position: absolute;

          bottom: -1px;

          left: 50%;

          transform: translateX(-50%);

          width: 30px;

          height: 3px;

          border-radius: 10px;

          background: #159b8a;

          box-shadow:
            0 0 8px
              rgba(21,155,138,.25);

        }


        /* =========================================
           DARK MODE
           ========================================= */

        @media (prefers-color-scheme: dark) {

          .global-bottom-nav {

            background:
              linear-gradient(
                145deg,
                rgba(18,55,57,.97),
                rgba(10,39,41,.97)
              );

            border:
              1px solid
              rgba(100,205,192,.18);

            box-shadow:

              0 14px 35px
                rgba(0,0,0,.35),

              inset 0 1px 0
                rgba(255,255,255,.06);

          }


          /* غير النشط */

          .global-nav-item {

            color: #8eb5b2;

          }


          .global-nav-item .global-nav-icon svg {

            stroke: currentColor;

          }


          .global-nav-label {

            color: currentColor;

          }


          /* النشط */

          .global-nav-item.active {

            color: #5fd8c7;

          }


          .global-nav-item.active::after {

            background: #35b8a5;

            box-shadow:
              0 0 10px
                rgba(53,184,165,.35);

          }

        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 380px) {

          .global-bottom-nav {

            left: 7px;
            right: 7px;

            bottom: 7px;

            height: 69px;

            border-radius: 23px;

          }


          .global-nav-icon {

            width: 25px;
            height: 25px;

          }


          .global-nav-icon svg {

            width: 22px;
            height: 22px;

          }


          .global-nav-label {

            font-size: 9px;

          }

        }


        /* =========================================
           DESKTOP
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

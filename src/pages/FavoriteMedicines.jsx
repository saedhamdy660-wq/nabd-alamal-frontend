import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

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

function CapsuleIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M8.2 16.8a4.2 4.2 0 0 1 0-5.9l5.7-5.7a4.2 4.2 0 0 1 5.9 5.9l-5.7 5.7a4.2 4.2 0 0 1-5.9 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m10.2 9.8 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 8 4a5 5 0 0 1 4 2.1A5 5 0 0 1 16 4a4.7 4.7 0 0 1 4.8 4.7Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="9"
        r="2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function FavoriteMedicines() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  /* =========================================
     THEME
  ========================================= */

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem("nabd_theme") || "light";
  });

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches || false
    );
  });

  /* =========================================
     GLOBAL THEME LISTENER

     الصفحة تقرأ الثيم فقط.
     لا تغير html أو body.
  ========================================= */

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme =
        localStorage.getItem("nabd_theme") || "light";

      setTheme(savedTheme);
    };

    updateTheme();

    window.addEventListener(
      "nabd-theme-change",
      updateTheme
    );

    return () => {
      window.removeEventListener(
        "nabd-theme-change",
        updateTheme
      );
    };
  }, []);

  /* =========================================
     SYSTEM THEME
  ========================================= */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      );

    if (!mediaQuery) {
      return;
    }

    const handleChange = (event) => {
      setSystemDark(event.matches);
    };

    mediaQuery.addEventListener?.(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener?.(
        "change",
        handleChange
      );
    };
  }, []);

  /* =========================================
     FINAL DARK STATE
  ========================================= */

  const isDark =
    theme === "dark" ||
    (
      theme === "system" &&
      systemDark
    );

  /* =========================================
     LOAD FAVORITES
  ========================================= */

  useEffect(() => {
    let ids = JSON.parse(
      localStorage.getItem("nabd_favorites") || "null"
    );

    if (ids === null) {
      ids = ["m1", "m2", "m3"];

      localStorage.setItem(
        "nabd_favorites",
        JSON.stringify(ids)
      );
    }

    api
      .getMedicines()
      .then((all) => {
        setFavorites(
          all.filter((m) =>
            ids.includes(m.id)
          )
        );
      })
      .catch(() => {
        setFavorites([]);
      });
  }, []);

  return (
    <div
      className={`favorites-page ${
        isDark
          ? "dark-mode"
          : "light-mode"
      }`}
    >

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="favorites-header">

        <Link
          to="/profile"
          className="favorites-back"
          aria-label="رجوع"
        >
          <BackIcon />
        </Link>

        <div className="favorites-header-text">

          <h1>
            أدويتي المفضلة
          </h1>

          <p>
            الأدوية التي حفظتها للوصول إليها بسرعة
          </p>

        </div>

      </header>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="favorites-intro">

        <div className="favorites-intro-icon">
          <HeartIcon filled />
        </div>

        <div className="favorites-intro-text">

          <strong>
            أدويتك في مكان واحد
          </strong>

          <p>
            يمكنك فتح أي دواء لمعرفة التفاصيل وتقديم طلب
          </p>

        </div>

      </section>

      {/* =========================================
          MEDICINES
      ========================================= */}

      {favorites.length > 0 ? (

        <div className="favorites-list">

          {favorites.map((m) => {

            const available =
              m.quantity !== "غير متوفر";

            return (
              <button
                key={m.id}
                type="button"
                className="medicine-card"
                onClick={() =>
                  navigate(
                    `/medicines/${m.id}`
                  )
                }
              >

                <div className="medicine-icon">
                  <CapsuleIcon />
                </div>

                <div className="medicine-info">

                  <div className="medicine-title">

                    <strong>
                      {m.name}
                    </strong>

                    <span className="favorite-heart">
                      <HeartIcon filled />
                    </span>

                  </div>

                  <div className="medicine-details">

                    <span
                      className={
                        available
                          ? "available"
                          : "unavailable"
                      }
                    >

                      <span className="status-dot" />

                      {available
                        ? "متوفر"
                        : "غير متوفر"}

                    </span>

                    {m.distanceKm !== undefined &&
                      m.distanceKm !== null && (
                        <>
                          <span className="separator">
                            •
                          </span>

                          <span className="distance">
                            <LocationIcon />
                            {m.distanceKm} كم
                          </span>
                        </>
                      )}

                  </div>

                </div>

                <div className="medicine-arrow">
                  <ArrowIcon />
                </div>

              </button>
            );
          })}

        </div>

      ) : (

        /* =========================================
           EMPTY STATE
        ========================================= */

        <div className="empty-favorites">

          <div className="empty-favorite-icon">
            <HeartIcon />
          </div>

          <h2>
            لا توجد أدوية مفضلة
          </h2>

          <p>
            عندما تجد دواءً تريد الرجوع إليه بسهولة،
            أضفه إلى المفضلة وسيظهر هنا.
          </p>

          <Link
            to="/medicines"
            className="browse-button"
          >
            تصفح الأدوية
          </Link>

        </div>

      )}

      {/* =========================================
          STYLE
      ========================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =========================================
           BASE
        ========================================= */

        .favorites-page {
          width: 100%;
          min-height: 100vh;

          padding:
            24px 18px 45px;

          direction: rtl;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          transition:
            background .3s ease,
            color .3s ease;
        }

        /* =========================================
           LIGHT MODE
        ========================================= */

        .favorites-page.light-mode {
          color: #24575a !important;

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
            ) !important;
        }

        /* =========================================
           HEADER
        ========================================= */

        .favorites-header {
          max-width: 520px;

          margin:
            0 auto 22px;

          display: flex;

          align-items: center;

          gap: 14px;
        }

        .favorites-back {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          text-decoration: none;

          transition:
            background .3s ease,
            color .3s ease,
            border-color .3s ease;
        }

        .favorites-back svg {
          width: 23px;
          height: 23px;
        }

        .favorites-page.light-mode
        .favorites-back {
          color: #218d83 !important;

          background:
            rgba(255,255,255,.76) !important;

          border:
            1px solid
            rgba(255,255,255,.94) !important;

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08);
        }

        .favorites-header-text {
          flex: 1;
          min-width: 0;
        }

        .favorites-header h1 {
          margin: 0;

          font-size: 25px;

          font-weight: 800;

          line-height: 1.35;
        }

        .favorites-page.light-mode
        .favorites-header h1 {
          color: #218d83 !important;
        }

        .favorites-header p {
          margin:
            4px 0 0;

          font-size: 13px;

          line-height: 1.6;
        }

        .favorites-page.light-mode
        .favorites-header p {
          color: #829e9c !important;
        }

        /* =========================================
           INTRO
        ========================================= */

        .favorites-intro {
          max-width: 520px;

          margin:
            0 auto 17px;

          padding: 16px;

          display: flex;

          align-items: center;

          gap: 13px;

          border-radius: 22px;

          transition:
            background .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .favorites-page.light-mode
        .favorites-intro {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.76)
            ) !important;

          border:
            1px solid
            rgba(255,255,255,.94) !important;

          box-shadow:
            0 10px 28px
            rgba(42,128,128,.07);
        }

        .favorites-intro-icon {
          width: 53px;
          height: 53px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 17px;
        }

        .favorites-intro-icon svg {
          width: 27px;
          height: 27px;
        }

        .favorites-page.light-mode
        .favorites-intro-icon {
          color: #dc6378 !important;

          background:
            linear-gradient(
              145deg,
              #fff0f3,
              #fbe1e7
            ) !important;
        }

        .favorites-intro-text {
          min-width: 0;
        }

        .favorites-intro strong {
          display: block;

          margin-bottom: 4px;

          font-size: 15px;

          font-weight: 800;
        }

        .favorites-page.light-mode
        .favorites-intro strong {
          color: #286d6d !important;
        }

        .favorites-intro p {
          margin: 0;

          font-size: 12px;

          line-height: 1.7;
        }

        .favorites-page.light-mode
        .favorites-intro p {
          color: #829e9c !important;
        }

        /* =========================================
           LIST
        ========================================= */

        .favorites-list {
          max-width: 520px;

          margin: 0 auto;

          display: flex;

          flex-direction: column;

          gap: 11px;
        }

        /* =========================================
           MEDICINE CARD
        ========================================= */

        .medicine-card {
          width: 100%;

          min-height: 92px;

          padding:
            11px 13px;

          display: flex;

          align-items: center;

          gap: 12px;

          border-radius: 21px;

          cursor: pointer;

          text-align: right;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          transition:
            transform .2s ease,
            background .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .medicine-card:hover {
          transform:
            translateY(-2px);
        }

        .medicine-card:active {
          transform:
            scale(.985);
        }

        .favorites-page.light-mode
        .medicine-card {
          color: #24575a !important;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(237,250,248,.80)
            ) !important;

          border:
            1px solid
            rgba(255,255,255,.92) !important;

          box-shadow:
            0 9px 23px
            rgba(42,128,128,.07);
        }

        /* =========================================
           MEDICINE ICON
        ========================================= */

        .medicine-icon {
          width: 53px;
          height: 53px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 17px;
        }

        .medicine-icon svg {
          width: 28px;
          height: 28px;
        }

        .favorites-page.light-mode
        .medicine-icon {
          color: #159b8a !important;

          background:
            linear-gradient(
              145deg,
              #e5faf6,
              #d5f3ed
            ) !important;
        }

        /* =========================================
           MEDICINE INFO
        ========================================= */

        .medicine-info {
          flex: 1;

          min-width: 0;
        }

        .medicine-title {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        .medicine-title strong {
          flex: 1;

          min-width: 0;

          overflow: hidden;

          font-size: 16px;

          font-weight: 800;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .favorites-page.light-mode
        .medicine-title strong {
          color: #286d6d !important;
        }

        .favorite-heart {
          width: 31px;
          height: 31px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;
        }

        .favorite-heart svg {
          width: 17px;
          height: 17px;
        }

        .favorites-page.light-mode
        .favorite-heart {
          color: #dc6378 !important;

          background:
            rgba(255,230,235,.72) !important;
        }

        /* =========================================
           DETAILS
        ========================================= */

        .medicine-details {
          margin-top: 7px;

          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 7px;
        }

        .available,
        .unavailable {
          display: inline-flex;

          align-items: center;

          gap: 5px;

          font-size: 12px;

          font-weight: 700;
        }

        .favorites-page.light-mode
        .available {
          color: #2d907e !important;
        }

        .favorites-page.light-mode
        .unavailable {
          color: #c05267 !important;
        }

        .status-dot {
          width: 7px;
          height: 7px;

          display: inline-block;

          border-radius: 50%;

          background:
            currentColor;
        }

        .separator {
          font-size: 12px;
        }

        .favorites-page.light-mode
        .separator {
          color: #b7c9c7 !important;
        }

        .distance {
          display: inline-flex;

          align-items: center;

          gap: 4px;

          font-size: 12px;
        }

        .favorites-page.light-mode
        .distance {
          color: #829e9c !important;
        }

        .distance svg {
          width: 14px;
          height: 14px;
        }

        /* =========================================
           ARROW
        ========================================= */

        .medicine-arrow {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;
        }

        .medicine-arrow svg {
          width: 18px;
          height: 18px;
        }

        .favorites-page.light-mode
        .medicine-arrow {
          color: #159b8a !important;

          background:
            rgba(221,247,241,.72) !important;
        }

        /* =========================================
           EMPTY
        ========================================= */

        .empty-favorites {
          max-width: 520px;

          margin:
            28px auto 0;

          padding:
            40px 22px;

          text-align: center;

          border-radius: 26px;
        }

        .favorites-page.light-mode
        .empty-favorites {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.72)
            ) !important;

          border:
            1px dashed
            rgba(33,141,131,.17) !important;

          box-shadow:
            0 10px 25px
            rgba(42,128,128,.05);
        }

        .empty-favorite-icon {
          width: 70px;
          height: 70px;

          margin:
            0 auto 15px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 21px;
        }

        .empty-favorite-icon svg {
          width: 33px;
          height: 33px;
        }

        .favorites-page.light-mode
        .empty-favorite-icon {
          color: #c05267 !important;

          background:
            linear-gradient(
              145deg,
              #ffecef,
              #f8dce3
            ) !important;
        }

        .empty-favorites h2 {
          margin:
            0 0 8px;

          font-size: 20px;

          line-height: 1.4;

          font-weight: 800;
        }

        .favorites-page.light-mode
        .empty-favorites h2 {
          color: #286d6d !important;
        }

        .empty-favorites p {
          max-width: 300px;

          margin:
            0 auto 20px;

          font-size: 13px;

          line-height: 1.8;
        }

        .favorites-page.light-mode
        .empty-favorites p {
          color: #829e9c !important;
        }

        /* =========================================
           BUTTON
        ========================================= */

        .browse-button {
          min-height: 46px;

          padding:
            0 23px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          text-decoration: none;

          font-size: 13px;

          font-weight: 800;
        }

        .favorites-page.light-mode
        .browse-button {
          color: white !important;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            ) !important;

          box-shadow:
            0 8px 18px
            rgba(21,155,138,.16);
        }

        /* =================================================
           =================================================
           DARK MODE
           =================================================
           ================================================= */

        .favorites-page.dark-mode {
          color: #d7efec !important;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(43,157,145,.18),
              transparent 28%
            ),

            radial-gradient(
              circle at 95% 28%,
              rgba(47,130,125,.14),
              transparent 30%
            ),

            linear-gradient(
              160deg,
              #071f21 0%,
              #092a2c 45%,
              #0b3537 100%
            ) !important;
        }

        /* DARK HEADER */

        .favorites-page.dark-mode
        .favorites-back {
          color: #65d6c5 !important;

          background:
            rgba(18,55,57,.96) !important;

          border:
            1px solid
            rgba(100,205,192,.18) !important;

          box-shadow:
            0 7px 18px
            rgba(0,0,0,.25) !important;
        }

        .favorites-page.dark-mode
        .favorites-header h1 {
          color: #65d6c5 !important;
        }

        .favorites-page.dark-mode
        .favorites-header p {
          color: #8eb6b2 !important;
        }

        /* DARK INTRO */

        .favorites-page.dark-mode
        .favorites-intro {
          color: #d7efec !important;

          background:
            linear-gradient(
              145deg,
              #123739,
              #0b2f31
            ) !important;

          border:
            1px solid
            rgba(100,205,192,.16) !important;

          box-shadow:
            0 10px 28px
            rgba(0,0,0,.25) !important;
        }

        .favorites-page.dark-mode
        .favorites-intro-icon {
          color: #ff91a4 !important;

          background:
            linear-gradient(
              145deg,
              #74303d,
              #5b2733
            ) !important;
        }

        .favorites-page.dark-mode
        .favorites-intro strong {
          color: #c6e9e5 !important;
        }

        .favorites-page.dark-mode
        .favorites-intro p {
          color: #8ab1ae !important;
        }

        /* DARK CARD */

        .favorites-page.dark-mode
        .medicine-card {
          color: #d7efec !important;

          background:
            linear-gradient(
              145deg,
              #123739,
              #0a2d2f
            ) !important;

          border:
            1px solid
            rgba(100,205,192,.16) !important;

          box-shadow:
            0 10px 25px
            rgba(0,0,0,.24) !important;
        }

        .favorites-page.dark-mode
        .medicine-card:hover {
          background:
            linear-gradient(
              145deg,
              #164043,
              #0d3335
            ) !important;
        }

        .favorites-page.dark-mode
        .medicine-card:active {
          box-shadow:
            0 6px 18px
            rgba(0,0,0,.30) !important;
        }

        /* DARK MEDICINE ICON */

        .favorites-page.dark-mode
        .medicine-icon {
          color: #65d6c5 !important;

          background:
            linear-gradient(
              145deg,
              #22716a,
              #1a5854
            ) !important;
        }

        /* DARK TITLE */

        .favorites-page.dark-mode
        .medicine-title strong {
          color: #c6e9e5 !important;
        }

        /* DARK HEART */

        .favorites-page.dark-mode
        .favorite-heart {
          color: #ff91a4 !important;

          background:
            rgba(110,48,63,.55) !important;
        }

        /* DARK STATUS */

        .favorites-page.dark-mode
        .available {
          color: #65cdb9 !important;
        }

        .favorites-page.dark-mode
        .unavailable {
          color: #ff91a4 !important;
        }

        .favorites-page.dark-mode
        .separator {
          color: #527a78 !important;
        }

        .favorites-page.dark-mode
        .distance {
          color: #8ab1ae !important;
        }

        /* DARK ARROW */

        .favorites-page.dark-mode
        .medicine-arrow {
          color: #65d6c5 !important;

          background:
            rgba(30,105,99,.55) !important;
        }

        /* DARK EMPTY */

        .favorites-page.dark-mode
        .empty-favorites {
          color: #d7efec !important;

          background:
            linear-gradient(
              145deg,
              #123739,
              #0a2d2f
            ) !important;

          border:
            1px dashed
            rgba(101,214,197,.25) !important;

          box-shadow:
            0 10px 25px
            rgba(0,0,0,.24) !important;
        }

        .favorites-page.dark-mode
        .empty-favorite-icon {
          color: #ff91a4 !important;

          background:
            linear-gradient(
              145deg,
              #6e303f,
              #542833
            ) !important;
        }

        .favorites-page.dark-mode
        .empty-favorites h2 {
          color: #c6e9e5 !important;
        }

        .favorites-page.dark-mode
        .empty-favorites p {
          color: #8ab1ae !important;
        }

        /* DARK BUTTON */

        .favorites-page.dark-mode
        .browse-button {
          color: #062523 !important;

          background:
            linear-gradient(
              135deg,
              #72ddcd,
              #35b8a5
            ) !important;

          box-shadow:
            0 8px 20px
            rgba(53,184,165,.18) !important;
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 380px) {

          .favorites-page {
            padding:
              20px 12px 40px;
          }

          .favorites-header {
            gap: 11px;
          }

          .favorites-header h1 {
            font-size: 22px;
          }

          .favorites-header p {
            font-size: 12px;
          }

          .favorites-back {
            width: 42px;
            height: 42px;
          }

          .favorites-back svg {
            width: 21px;
            height: 21px;
          }

          .favorites-intro {
            padding: 14px;
          }

          .favorites-intro-icon {
            width: 47px;
            height: 47px;
          }

          .favorites-intro strong {
            font-size: 15px;
          }

          .favorites-intro p {
            font-size: 12px;
          }

          .medicine-card {
            min-height: 84px;

            padding:
              10px 11px;

            gap: 10px;
          }

          .medicine-icon {
            width: 47px;
            height: 47px;
          }

          .medicine-title strong {
            font-size: 15px;
          }

          .medicine-details,
          .available,
          .unavailable,
          .distance {
            font-size: 11px;
          }

          .medicine-arrow {
            width: 31px;
            height: 31px;
          }

          .empty-favorites h2 {
            font-size: 18px;
          }

          .empty-favorites p {
            font-size: 12px;
          }
        }

      `}</style>

    </div>
  );
}

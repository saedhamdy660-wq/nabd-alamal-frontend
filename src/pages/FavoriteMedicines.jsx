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

  const getCurrentTheme = () => {
    const savedTheme =
      localStorage.getItem("nabd_theme");

    if (savedTheme) {
      return savedTheme;
    }

    // دعم الـDark Mode عن طريق html
    if (
      document.documentElement.classList.contains("dark") ||
      document.documentElement.classList.contains("dark-mode")
    ) {
      return "dark";
    }

    // دعم الـDark Mode عن طريق body
    if (
      document.body.classList.contains("dark") ||
      document.body.classList.contains("dark-mode")
    ) {
      return "dark";
    }

    return "light";
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return getCurrentTheme();
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
     متابعة تغيير الـTHEME
  ========================================= */

  useEffect(() => {
    const updateTheme = () => {
      setTheme(getCurrentTheme());
    };

    // قراءة الثيم عند فتح الصفحة
    updateTheme();

    // الحدث المستخدم في التطبيق
    window.addEventListener(
      "nabd-theme-change",
      updateTheme
    );

    // متابعة تغييرات localStorage
    window.addEventListener(
      "storage",
      updateTheme
    );

    // مراقبة class على html و body
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    observer.observe(
      document.body,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () => {
      window.removeEventListener(
        "nabd-theme-change",
        updateTheme
      );

      window.removeEventListener(
        "storage",
        updateTheme
      );

      observer.disconnect();
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
      localStorage.getItem(
        "nabd_favorites"
      ) || "null"
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
           PAGE - LIGHT
        ========================================= */

        .favorites-page {
          min-height: 100vh;

          padding:
            24px 18px 45px;

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
            background .3s ease,
            color .3s ease;
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

          color: #218d83;

          background:
            rgba(255,255,255,.76);

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08),

            inset 0 1px 0
            rgba(255,255,255,.9);

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


        .favorites-header-text {
          flex: 1;
          min-width: 0;
        }


        .favorites-header h1 {
          margin: 0;

          color: #218d83;

          font-size: 25px;

          font-weight: 800;

          line-height: 1.35;
        }


        .favorites-header p {
          margin:
            4px 0 0;

          color: #829e9c;

          font-size: 13px;

          line-height: 1.6;
        }


        /* =========================================
           INTRO
        ========================================= */

        .favorites-intro {
          max-width: 520px;

          margin:
            0 auto 17px;

          padding:
            16px;

          display: flex;

          align-items: center;

          gap: 13px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.76)
            );

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 10px 28px
            rgba(42,128,128,.07),

            inset 0 1px 0
            rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);

          transition:
            background .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }


        .favorites-intro-icon {
          width: 53px;
          height: 53px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 17px;

          color: #dc6378;

          background:
            linear-gradient(
              145deg,
              #fff0f3,
              #fbe1e7
            );
        }


        .favorites-intro-icon svg {
          width: 27px;
          height: 27px;
        }


        .favorites-intro-text {
          min-width: 0;
        }


        .favorites-intro strong {
          display: block;

          margin-bottom: 4px;

          color: #286d6d;

          font-size: 15px;

          font-weight: 800;
        }


        .favorites-intro p {
          margin: 0;

          color: #829e9c;

          font-size: 12px;

          line-height: 1.7;
        }


        /* =========================================
           FAVORITES LIST
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

          border:
            1px solid
            rgba(255,255,255,.92);

          border-radius: 21px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(237,250,248,.80)
            );

          box-shadow:
            0 9px 23px
            rgba(42,128,128,.07),

            inset 0 1px 0
            rgba(255,255,255,.9);

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

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e5faf6,
              #d5f3ed
            );
        }


        .medicine-icon svg {
          width: 28px;
          height: 28px;
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

          color: #286d6d;

          font-size: 16px;

          font-weight: 800;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .favorite-heart {
          width: 31px;
          height: 31px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;

          color: #dc6378;

          background:
            rgba(255,230,235,.72);
        }


        .favorite-heart svg {
          width: 17px;
          height: 17px;
        }


        /* =========================================
           MEDICINE DETAILS
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


        .available {
          color: #2d907e;
        }


        .unavailable {
          color: #c05267;
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
          color: #b7c9c7;

          font-size: 12px;
        }


        .distance {
          display: inline-flex;

          align-items: center;

          gap: 4px;

          color: #829e9c;

          font-size: 12px;
        }


        .distance svg {
          width: 14px;
          height: 14px;
        }


        /* =========================================
           MEDICINE ARROW
        ========================================= */

        .medicine-arrow {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #159b8a;

          border-radius: 10px;

          background:
            rgba(221,247,241,.72);

          transition:
            background .3s ease,
            color .3s ease;
        }


        .medicine-arrow svg {
          width: 18px;
          height: 18px;
        }


        /* =========================================
           EMPTY STATE
        ========================================= */

        .empty-favorites {
          max-width: 520px;

          margin:
            28px auto 0;

          padding:
            40px 22px;

          text-align: center;

          border-radius: 26px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.72)
            );

          border:
            1px dashed
            rgba(33,141,131,.17);

          box-shadow:
            0 10px 25px
            rgba(42,128,128,.05);

          transition:
            background .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
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

          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffecef,
              #f8dce3
            );
        }


        .empty-favorite-icon svg {
          width: 33px;
          height: 33px;
        }


        .empty-favorites h2 {
          margin:
            0 0 8px;

          color: #286d6d;

          font-size: 20px;

          line-height: 1.4;

          font-weight: 800;
        }


        .empty-favorites p {
          max-width: 300px;

          margin:
            0 auto 20px;

          color: #829e9c;

          font-size: 13px;

          line-height: 1.8;
        }


        /* =========================================
           BROWSE BUTTON
        ========================================= */

        .browse-button {
          min-height: 46px;

          padding:
            0 23px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );

          box-shadow:
            0 8px 18px
            rgba(21,155,138,.16);

          text-decoration: none;

          font-size: 13px;

          font-weight: 800;
        }


        /* =========================================
           DARK MODE
        ========================================= */

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
              #041719 0%,
              #061f21 45%,
              #08292b 100%
            ) !important;
        }


        /* =========================================
           DARK HEADER
        ========================================= */

        .favorites-page.dark-mode
        .favorites-back {
          color: #65d6c5 !important;

          background:
            rgba(12,43,45,.94) !important;

          border-color:
            rgba(100,205,192,.18) !important;

          box-shadow:
            0 8px 20px
            rgba(0,0,0,.30),

            inset 0 1px 0
            rgba(255,255,255,.05);
        }


        .favorites-page.dark-mode
        .favorites-header h1 {
          color: #6ee0cf !important;
        }


        .favorites-page.dark-mode
        .favorites-header p {
          color: #8bbab5 !important;
        }


        /* =========================================
           DARK INTRO
        ========================================= */

        .favorites-page.dark-mode
        .favorites-intro {
          background:
            linear-gradient(
              145deg,
              rgba(13,48,50,.97),
              rgba(6,32,34,.97)
            ) !important;

          border-color:
            rgba(83,203,190,.18) !important;

          box-shadow:
            0 12px 32px
            rgba(0,0,0,.28),

            inset 0 1px 0
            rgba(255,255,255,.04);
        }


        .favorites-page.dark-mode
        .favorites-intro-icon {
          color: #ff8fa3 !important;

          background:
            linear-gradient(
              145deg,
              rgba(113,44,59,.62),
              rgba(76,31,44,.62)
            ) !important;

          box-shadow:
            0 0 18px
            rgba(255,110,139,.08);
        }


        .favorites-page.dark-mode
        .favorites-intro strong {
          color: #d0efeb !important;
        }


        .favorites-page.dark-mode
        .favorites-intro p {
          color: #8db7b3 !important;
        }


        /* =========================================
           DARK MEDICINE CARD
        ========================================= */

        .favorites-page.dark-mode
        .medicine-card {
          color: #d7efec !important;

          background:
            linear-gradient(
              145deg,
              rgba(13,49,51,.98),
              rgba(6,32,34,.98)
            ) !important;

          border-color:
            rgba(83,203,190,.16) !important;

          box-shadow:
            0 10px 27px
            rgba(0,0,0,.28),

            inset 0 1px 0
            rgba(255,255,255,.035);
        }


        .favorites-page.dark-mode
        .medicine-card:hover {
          border-color:
            rgba(83,203,190,.30) !important;

          box-shadow:
            0 12px 30px
            rgba(0,0,0,.32),

            0 0 18px
            rgba(53,184,165,.06);
        }


        .favorites-page.dark-mode
        .medicine-card:active {
          transform:
            scale(.985);

          box-shadow:
            0 6px 18px
            rgba(0,0,0,.32);
        }


        /* =========================================
           DARK MEDICINE ICON
        ========================================= */

        .favorites-page.dark-mode
        .medicine-icon {
          color: #63ddca !important;

          background:
            linear-gradient(
              145deg,
              rgba(32,112,105,.68),
              rgba(20,75,72,.68)
            ) !important;

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,.05),

            0 0 15px
            rgba(52,205,185,.06);
        }


        .favorites-page.dark-mode
        .medicine-title strong {
          color: #d2efeb !important;
        }


        /* =========================================
           DARK HEART
        ========================================= */

        .favorites-page.dark-mode
        .favorite-heart {
          color: #ff91a5 !important;

          background:
            rgba(104,43,59,.55) !important;

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,.03);
        }


        /* =========================================
           DARK DETAILS
        ========================================= */

        .favorites-page.dark-mode
        .available {
          color: #62d1bb !important;
        }


        .favorites-page.dark-mode
        .unavailable {
          color: #ff8fa3 !important;
        }


        .favorites-page.dark-mode
        .separator {
          color: #4d7774 !important;
        }


        .favorites-page.dark-mode
        .distance {
          color: #8ab4b0 !important;
        }


        /* =========================================
           DARK ARROW
        ========================================= */

        .favorites-page.dark-mode
        .medicine-arrow {
          color: #65ddca !important;

          background:
            rgba(28,105,99,.55) !important;

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,.04);
        }


        /* =========================================
           DARK EMPTY
        ========================================= */

        .favorites-page.dark-mode
        .empty-favorites {
          background:
            linear-gradient(
              145deg,
              rgba(13,49,51,.97),
              rgba(6,32,34,.97)
            ) !important;

          border-color:
            rgba(101,214,197,.22) !important;

          box-shadow:
            0 12px 30px
            rgba(0,0,0,.27);
        }


        .favorites-page.dark-mode
        .empty-favorite-icon {
          color: #ff91a5 !important;

          background:
            linear-gradient(
              145deg,
              rgba(109,46,61,.60),
              rgba(77,32,45,.60)
            ) !important;
        }


        .favorites-page.dark-mode
        .empty-favorites h2 {
          color: #d0efeb !important;
        }


        .favorites-page.dark-mode
        .empty-favorites p {
          color: #8ab4b0 !important;
        }


        /* =========================================
           DARK BROWSE BUTTON
        ========================================= */

        .favorites-page.dark-mode
        .browse-button {
          color: #062523 !important;

          background:
            linear-gradient(
              135deg,
              #76e3d1,
              #35b9a6
            ) !important;

          box-shadow:
            0 8px 22px
            rgba(53,184,165,.22);
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


        .favorites-page.light-mode
        .favorites-back {
          color: #218d83 !important;

          background:
            rgba(255,255,255,.76) !important;

          border-color:
            rgba(255,255,255,.94) !important;
        }


        .favorites-page.light-mode
        .favorites-header h1 {
          color: #218d83 !important;
        }


        .favorites-page.light-mode
        .favorites-header p {
          color: #829e9c !important;
        }


        .favorites-page.light-mode
        .favorites-intro {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.76)
            ) !important;

          border-color:
            rgba(255,255,255,.94) !important;
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


        .favorites-page.light-mode
        .favorites-intro strong {
          color: #286d6d !important;
        }


        .favorites-page.light-mode
        .favorites-intro p {
          color: #829e9c !important;
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

          border-color:
            rgba(255,255,255,.92) !important;
        }


        .favorites-page.light-mode
        .medicine-title strong {
          color: #286d6d !important;
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


        .favorites-page.light-mode
        .favorite-heart {
          color: #dc6378 !important;

          background:
            rgba(255,230,235,.72) !important;
        }


        .favorites-page.light-mode
        .available {
          color: #2d907e !important;
        }


        .favorites-page.light-mode
        .unavailable {
          color: #c05267 !important;
        }


        .favorites-page.light-mode
        .separator {
          color: #b7c9c7 !important;
        }


        .favorites-page.light-mode
        .distance {
          color: #829e9c !important;
        }


        .favorites-page.light-mode
        .medicine-arrow {
          color: #159b8a !important;

          background:
            rgba(221,247,241,.72) !important;
        }


        .favorites-page.light-mode
        .empty-favorites {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.72)
            ) !important;

          border-color:
            rgba(33,141,131,.17) !important;
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


        .favorites-page.light-mode
        .empty-favorites h2 {
          color: #286d6d !important;
        }


        .favorites-page.light-mode
        .empty-favorites p {
          color: #829e9c !important;
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

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
    return localStorage.getItem("nabd_theme") || "light";
  });

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches || false
    );
  });

  /* =========================================
     LISTEN FOR THEME CHANGES
     ========================================= */

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        localStorage.getItem("nabd_theme") || "light"
      );
    };

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
    const mediaQuery = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    );

    if (!mediaQuery) return;

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
    (theme === "system" && systemDark);

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
          all.filter((m) => ids.includes(m.id))
        );
      })
      .catch(() => {
        setFavorites([]);
      });
  }, []);

  return (
    <div
      className={`favorites-page ${
        isDark ? "dark-mode" : ""
      }`}
    >

      {/* Header */}
      <header className="favorites-header">

        <Link
          to="/profile"
          className="favorites-back"
          aria-label="رجوع"
        >
          <BackIcon />
        </Link>

        <div className="favorites-header-text">
          <h1>أدويتي المفضلة</h1>

          <p>
            الأدوية التي حفظتها للوصول إليها بسرعة
          </p>
        </div>

      </header>


      {/* Intro */}
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


      {/* Medicines */}
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
                  navigate(`/medicines/${m.id}`)
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

        /* Empty State */
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


      <style>{`

        * {
          box-sizing: border-box;
        }


        /* =========================================
           PAGE
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
            rgba(255,255,255,.92);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),

            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;

          transition:
            background .2s ease,
            color .2s ease,
            transform .2s ease;
        }


        .favorites-back:active {
          transform: scale(.94);
        }


        .favorites-back svg {
          width: 23px;
          height: 23px;
        }


        .favorites-header-text {
          flex: 1;
        }


        .favorites-header h1 {
          margin:
            0 0 5px;

          color: #218d83;

          font-size: 24px;

          line-height: 1.3;

          font-weight: 800;
        }


        .favorites-header p {
          margin: 0;

          color: #789897;

          font-size: 13px;

          line-height: 1.6;
        }


        /* =========================================
           INTRO
           ========================================= */

        .favorites-intro {
          max-width: 520px;

          margin:
            0 auto 18px;

          padding: 17px;

          display: flex;

          align-items: center;

          gap: 14px;

          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 10px 25px
              rgba(42,128,128,.07),

            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter:
            blur(13px);

          -webkit-backdrop-filter:
            blur(13px);
        }


        .favorites-intro-icon {
          width: 52px;
          height: 52px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffe9ee,
              #f8d9e1
            );
        }


        .favorites-intro-icon svg {
          width: 27px;
          height: 27px;
        }


        .favorites-intro-text {
          flex: 1;
        }


        .favorites-intro strong {
          display: block;

          margin-bottom: 5px;

          color: #286d6d;

          font-size: 16px;

          line-height: 1.4;

          font-weight: 800;
        }


        .favorites-intro p {
          margin: 0;

          color: #829e9c;

          font-size: 13px;

          line-height: 1.6;
        }


        /* =========================================
           LIST
           ========================================= */

        .favorites-list {
          max-width: 520px;

          margin: 0 auto;

          display: flex;

          flex-direction: column;

          gap: 12px;
        }


        /* =========================================
           MEDICINE CARD
           ========================================= */

        .medicine-card {
          width: 100%;

          min-height: 90px;

          padding:
            12px 14px;

          display: flex;

          align-items: center;

          gap: 13px;

          text-align: right;

          border:
            1px solid
            rgba(255,255,255,.94);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(232,249,246,.79)
            );

          box-shadow:
            0 10px 25px
              rgba(42,128,128,.07),

            inset 0 1px 0
              rgba(255,255,255,.92);

          cursor: pointer;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }


        .medicine-card:active {
          transform: scale(.985);
        }


        .medicine-icon {
          width: 52px;
          height: 52px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e1faf5,
              #cdeee7
            );
        }


        .medicine-icon svg {
          width: 27px;
          height: 27px;
        }


        .medicine-info {
          flex: 1;

          min-width: 0;
        }


        .medicine-title {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;
        }


        .medicine-title strong {
          color: #286d6d;

          font-size: 17px;

          line-height: 1.4;

          font-weight: 800;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .favorite-heart {
          width: 30px;
          height: 30px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #c05267;

          background:
            rgba(255,230,236,.72);

          border-radius: 10px;
        }


        .favorite-heart svg {
          width: 17px;
          height: 17px;
        }


        .medicine-details {
          margin-top: 7px;

          display: flex;

          align-items: center;

          gap: 7px;

          font-size: 12px;

          line-height: 1.4;
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

          background: currentColor;
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
           مهم:
           الدارك هنا مربوط بـ .dark-mode
           وليس بنظام الجهاز مباشرة
           ========================================= */

        .favorites-page.dark-mode {
          color: #d7efec;

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
            );
        }


        /* HEADER */

        .favorites-page.dark-mode .favorites-back {
          color: #65d6c5;

          background:
            rgba(18,55,57,.90);

          border-color:
            rgba(100,205,192,.15);

          box-shadow:
            0 7px 18px
              rgba(0,0,0,.20),

            inset 0 1px 0
              rgba(255,255,255,.04);
        }


        .favorites-page.dark-mode .favorites-header h1 {
          color: #65d6c5;
        }


        .favorites-page.dark-mode .favorites-header p {
          color: #8eb6b2;
        }


        /* INTRO */

        .favorites-page.dark-mode .favorites-intro {
          background:
            linear-gradient(
              145deg,
              rgba(18,55,57,.96),
              rgba(11,47,49,.96)
            );

          border-color:
            rgba(100,205,192,.14);

          box-shadow:
            0 10px 28px
              rgba(0,0,0,.22),

            inset 0 1px 0
              rgba(255,255,255,.04);
        }


        .favorites-page.dark-mode .favorites-intro-icon {
          color: #ff91a4;

          background:
            linear-gradient(
              145deg,
              rgba(116,45,60,.55),
              rgba(91,39,51,.55)
            );
        }


        .favorites-page.dark-mode .favorites-intro strong {
          color: #c6e9e5;
        }


        .favorites-page.dark-mode .favorites-intro p {
          color: #8ab1ae;
        }


        /* MEDICINE CARD */

        .favorites-page.dark-mode .medicine-card {
          background:
            linear-gradient(
              145deg,
              rgba(18,55,57,.97),
              rgba(10,45,47,.97)
            );

          border-color:
            rgba(100,205,192,.13);

          box-shadow:
            0 10px 25px
              rgba(0,0,0,.20),

            inset 0 1px 0
              rgba(255,255,255,.035);
        }


        .favorites-page.dark-mode .medicine-card:active {
          box-shadow:
            0 6px 18px
              rgba(0,0,0,.25);
        }


        .favorites-page.dark-mode .medicine-icon {
          color: #65d6c5;

          background:
            linear-gradient(
              145deg,
              rgba(34,113,106,.60),
              rgba(26,88,84,.60)
            );
        }


        .favorites-page.dark-mode .medicine-title strong {
          color: #c6e9e5;
        }


        .favorites-page.dark-mode .favorite-heart {
          color: #ff91a4;

          background:
            rgba(110,48,63,.48);
        }


        .favorites-page.dark-mode .available {
          color: #65cdb9;
        }


        .favorites-page.dark-mode .unavailable {
          color: #ff91a4;
        }


        .favorites-page.dark-mode .separator {
          color: #527a78;
        }


        .favorites-page.dark-mode .distance {
          color: #8ab1ae;
        }


        .favorites-page.dark-mode .medicine-arrow {
          color: #65d6c5;

          background:
            rgba(30,105,99,.48);
        }


        /* EMPTY */

        .favorites-page.dark-mode .empty-favorites {
          background:
            linear-gradient(
              145deg,
              rgba(18,55,57,.96),
              rgba(10,45,47,.96)
            );

          border-color:
            rgba(101,214,197,.20);

          box-shadow:
            0 10px 25px
              rgba(0,0,0,.20);
        }


        .favorites-page.dark-mode .empty-favorite-icon {
          color: #ff91a4;

          background:
            linear-gradient(
              145deg,
              rgba(110,48,63,.55),
              rgba(84,40,51,.55)
            );
        }


        .favorites-page.dark-mode .empty-favorites h2 {
          color: #c6e9e5;
        }


        .favorites-page.dark-mode .empty-favorites p {
          color: #8ab1ae;
        }


        /* BUTTON */

        .favorites-page.dark-mode .browse-button {
          color: #062523;

          background:
            linear-gradient(
              135deg,
              #72ddcd,
              #35b8a5
            );

          box-shadow:
            0 8px 20px
              rgba(53,184,165,.18);
        }


        /* =========================================
           SMALL MOBILE
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

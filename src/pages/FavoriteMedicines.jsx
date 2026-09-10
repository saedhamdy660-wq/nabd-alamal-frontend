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
    <div className="favorites-page">

      {/* Header */}
      <header className="favorites-header">

        <Link
          to="/profile"
          className="favorites-back"
          aria-label="رجوع"
        >
          <BackIcon />
        </Link>

        <div>
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

        <div>
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
           PAGE - LIGHT MODE
           ========================================= */

        .favorites-page {

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
        }


        /* =========================================
           HEADER
           ========================================= */

        .favorites-header {

          max-width: 520px;

          margin:
            0 auto 20px;

          display: flex;

          align-items: center;

          gap: 13px;
        }


        .favorites-back {

          width: 43px;
          height: 43px;

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

          width: 21px;
          height: 21px;
        }


        .favorites-header h1 {

          margin:
            0 0 4px;

          color: #218d83;

          font-size: 21px;

          font-weight: 800;
        }


        .favorites-header p {

          margin: 0;

          color: #88a3a2;

          font-size: 10px;

          line-height: 1.5;
        }


        /* =========================================
           INTRO
           ========================================= */

        .favorites-intro {

          max-width: 520px;

          margin:
            0 auto 16px;

          padding: 15px;

          display: flex;

          align-items: center;

          gap: 12px;

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

          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #c05267;

          background:
            linear-gradient(
              145deg,
              #ffe9ee,
              #f8d9e1
            );
        }


        .favorites-intro-icon svg {

          width: 23px;
          height: 23px;
        }


        .favorites-intro strong {

          display: block;

          margin-bottom: 4px;

          color: #286d6d;

          font-size: 13px;

          font-weight: 800;
        }


        .favorites-intro p {

          margin: 0;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.5;
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

          min-height: 82px;

          padding:
            11px 12px;

          display: flex;

          align-items: center;

          gap: 11px;

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
              #e1faf5,
              #cdeee7
            );
        }


        .medicine-icon svg {

          width: 25px;
          height: 25px;
        }


        .medicine-info {

          flex: 1;

          min-width: 0;
        }


        .medicine-title {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 7px;
        }


        .medicine-title strong {

          color: #286d6d;

          font-size: 14px;

          font-weight: 800;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .favorite-heart {

          width: 27px;
          height: 27px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #c05267;

          background:
            rgba(255,230,236,.72);

          border-radius: 9px;
        }


        .favorite-heart svg {

          width: 15px;
          height: 15px;
        }


        .medicine-details {

          margin-top: 7px;

          display: flex;

          align-items: center;

          gap: 6px;

          font-size: 9px;
        }


        .available,
        .unavailable {

          display: inline-flex;

          align-items: center;

          gap: 5px;

          font-weight: 700;
        }


        .available {
          color: #2d907e;
        }


        .unavailable {
          color: #c05267;
        }


        .status-dot {

          width: 6px;
          height: 6px;

          display: inline-block;

          border-radius: 50%;

          background: currentColor;
        }


        .separator {
          color: #b7c9c7;
        }


        .distance {

          display: inline-flex;

          align-items: center;

          gap: 3px;

          color: #91a8a7;
        }


        .distance svg {

          width: 12px;
          height: 12px;
        }


        .medicine-arrow {

          width: 31px;
          height: 31px;

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

          width: 16px;
          height: 16px;
        }


        /* =========================================
           EMPTY STATE
           ========================================= */

        .empty-favorites {

          max-width: 520px;

          margin:
            25px auto 0;

          padding:
            35px 20px;

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

          width: 65px;
          height: 65px;

          margin:
            0 auto 13px;

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

          width: 30px;
          height: 30px;
        }


        .empty-favorites h2 {

          margin:
            0 0 7px;

          color: #286d6d;

          font-size: 16px;

          font-weight: 800;
        }


        .empty-favorites p {

          max-width: 270px;

          margin:
            0 auto 17px;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.7;
        }


        .browse-button {

          min-height: 43px;

          padding:
            0 20px;

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

          font-size: 11px;

          font-weight: 800;
        }


        /* =========================================
           DARK MODE
           ========================================= */

        @media (prefers-color-scheme: dark) {

          .favorites-page {

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

          .favorites-back {

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


          .favorites-header h1 {

            color: #65d6c5;
          }


          .favorites-header p {

            color: #8eb6b2;
          }


          /* INTRO */

          .favorites-intro {

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


          .favorites-intro-icon {

            color: #ff91a4;

            background:
              linear-gradient(
                145deg,
                rgba(116,45,60,.55),
                rgba(91,39,51,.55)
              );
          }


          .favorites-intro strong {

            color: #b9e3de;
          }


          .favorites-intro p {

            color: #82aaa7;
          }


          /* MEDICINE CARD */

          .medicine-card {

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


          .medicine-card:active {

            box-shadow:
              0 6px 18px
                rgba(0,0,0,.25);
          }


          .medicine-icon {

            color: #65d6c5;

            background:
              linear-gradient(
                145deg,
                rgba(34,113,106,.60),
                rgba(26,88,84,.60)
              );
          }


          .medicine-title strong {

            color: #b9e3de;
          }


          .favorite-heart {

            color: #ff91a4;

            background:
              rgba(110,48,63,.48);
          }


          .available {

            color: #65cdb9;
          }


          .unavailable {

            color: #ff91a4;
          }


          .separator {

            color: #527a78;
          }


          .distance {

            color: #82aaa7;
          }


          .medicine-arrow {

            color: #65d6c5;

            background:
              rgba(30,105,99,.48);
          }


          /* EMPTY */

          .empty-favorites {

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


          .empty-favorite-icon {

            color: #ff91a4;

            background:
              linear-gradient(
                145deg,
                rgba(110,48,63,.55),
                rgba(84,40,51,.55)
              );
          }


          .empty-favorites h2 {

            color: #b9e3de;
          }


          .empty-favorites p {

            color: #82aaa7;
          }


          /* BUTTON */

          .browse-button {

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

        }


        /* =========================================
           SMALL MOBILE
           ========================================= */

        @media (max-width: 380px) {

          .favorites-page {

            padding-left: 12px;
            padding-right: 12px;
          }


          .favorites-header h1 {

            font-size: 20px;
          }


          .favorites-header p {

            font-size: 9px;
          }


          .favorites-back {

            width: 40px;
            height: 40px;
          }


          .favorites-intro {

            padding: 13px;
          }


          .favorites-intro-icon {

            width: 43px;
            height: 43px;
          }


          .medicine-card {

            min-height: 78px;

            padding:
              9px 10px;
          }


          .medicine-icon {

            width: 44px;
            height: 44px;
          }


          .medicine-title strong {

            font-size: 13px;
          }


          .medicine-arrow {

            width: 29px;
            height: 29px;
          }

        }

      `}</style>

    </div>
  );
}

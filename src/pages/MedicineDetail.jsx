import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    api
      .getMedicine(id)
      .then((data) => {
        setMedicine(data);
      })
      .catch((error) => {
        console.error("Medicine details error:", error);
      });

    const favorites = JSON.parse(
      localStorage.getItem("nabd_favorites") || "[]"
    );

    setIsFav(favorites.includes(String(id)));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("nabd_favorites") || "[]"
    );

    const medicineId = String(id);

    let updatedFavorites;

    if (favorites.includes(medicineId)) {
      updatedFavorites = favorites.filter(
        (item) => String(item) !== medicineId
      );
    } else {
      updatedFavorites = [...favorites, medicineId];
    }

    localStorage.setItem(
      "nabd_favorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFav(updatedFavorites.includes(medicineId));
  };

  if (!medicine) {
    return (
      <div className="medicine-loading" dir="rtl">
        <div className="loading-circle"></div>
        <p>جارِ تحميل بيانات الدواء...</p>

        <style>{`
          .medicine-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background:
              radial-gradient(
                circle at 15% 10%,
                rgba(178, 238, 228, .35),
                transparent 28%
              ),
              linear-gradient(
                180deg,
                #f5fffd,
                #eefbf8
              );
            color: #159b8a;
            font-family: inherit;
          }

          .loading-circle {
            width: 38px;
            height: 38px;
            border: 4px solid #d7f3ed;
            border-top-color: #159b8a;
            border-radius: 50%;
            animation: medicineSpin .8s linear infinite;
          }

          .medicine-loading p {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
          }

          @keyframes medicineSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  /*
    البيانات هنا مرنة:
    لو الـAPI عندك بيرجع اسم مختلف لأي معلومة
    نحاول ناخد البديل تلقائيًا.
  */

  const medicineName =
    medicine.name ||
    medicine.medicineName ||
    medicine.title ||
    "دواء";

  const medicineCategory =
    medicine.category ||
    medicine.type ||
    medicine.medicineType ||
    "دواء";

  const medicineType =
    medicine.type ||
    medicine.form ||
    medicine.medicineType ||
    medicineCategory;

  const quantity =
    medicine.quantity ||
    medicine.availableQuantity ||
    medicine.stock ||
    "غير محدد";

  const expiryDate =
    medicine.expiry ||
    medicine.expiryDate ||
    medicine.expirationDate ||
    "غير محدد";

  const location =
    medicine.location ||
    medicine.address ||
    medicine.pharmacy ||
    "غير محدد";

  const donorName =
    medicine.donor ||
    medicine.donorName ||
    medicine.owner?.name ||
    medicine.user?.name ||
    "صيدلية الأمل";

  const donorAvatar =
    medicine.avatar ||
    medicine.donorAvatar ||
    medicine.owner?.avatar ||
    medicine.user?.avatar ||
    "";

  const available =
    medicine.available !== false &&
    medicine.status !== "unavailable" &&
    medicine.status !== "مطلوب";

  return (
    <div className="medicine-detail-page" dir="rtl">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="medicine-detail-header">

        <button
          className="detail-circle-btn"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className={`detail-circle-btn favorite-btn ${
            isFav ? "favorite-active" : ""
          }`}
          onClick={toggleFavorite}
          aria-label="المفضلة"
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.8 8.9c0 5.2-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 8 4.2c1.5 0 3 .7 4 1.9 1-1.2 2.5-1.9 4-1.9a4.7 4.7 0 0 1 4.8 4.7Z" />
          </svg>
        </button>

      </div>


      {/* =====================================================
          MEDICINE INFORMATION
      ===================================================== */}

      <section className="medicine-info-card">

        {/* الاسم والحالة */}

        <div className="medicine-title-row">

          <h1>{medicineName}</h1>

          <span
            className={`availability ${
              available ? "available" : "requested"
            }`}
          >
            {available ? "متاح" : "مطلوب"}
          </span>

        </div>


        {/* التصنيفات */}

        <div className="medicine-tags">

          <span>
            <svg viewBox="0 0 24 24">
              <path d="M8 4h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z" />
              <path d="m8 12 8 8" />
            </svg>

            {medicineType}
          </span>

          {medicineCategory &&
            medicineCategory !== medicineType && (
              <span>
                <svg viewBox="0 0 24 24">
                  <path d="M4 7h16M7 4v16M17 4v16" />
                </svg>

                {medicineCategory}
              </span>
            )}

        </div>


        <div className="info-divider"></div>


        {/* =====================================================
            DETAILS GRID
        ===================================================== */}

        <div className="medicine-details-grid">

          {/* النوع */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <rect
                  x="6"
                  y="4"
                  width="12"
                  height="16"
                  rx="2"
                />
                <path d="M9 4V2h6v2" />
              </svg>
            </div>

            <div className="detail-text">
              <span>النوع</span>

              <strong>
                {medicineType}
              </strong>
            </div>

          </div>


          {/* الكمية */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
              </svg>
            </div>

            <div className="detail-text">
              <span>الكمية المتاحة</span>

              <strong>
                {quantity}
              </strong>
            </div>

          </div>


          {/* تاريخ الانتهاء */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="16"
                  rx="2"
                />
                <path d="M7 3v4M17 3v4M3 10h18" />
              </svg>
            </div>

            <div className="detail-text">
              <span>تاريخ الانتهاء</span>

              <strong>
                {expiryDate}
              </strong>
            </div>

          </div>


          {/* المكان */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <div className="detail-text">
              <span>مكان التواجد</span>

              <strong>
                {location}
              </strong>
            </div>

          </div>

        </div>


        <div className="info-divider"></div>


        {/* =====================================================
            DONOR / PHARMACY
        ===================================================== */}

        <div className="donor-row">

          <div className="donor-avatar">

            {donorAvatar ? (
              <img
                src={donorAvatar}
                alt=""
              />
            ) : (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6" />
              </svg>
            )}

          </div>


          <div className="donor-info">

            <strong>
              بواسطة {donorName}
            </strong>

            <span>
              متبرع موثوق
            </span>

          </div>


          <button
            className="donor-arrow"
            onClick={() => {}}
            aria-label="التفاصيل"
          >
            ‹
          </button>

        </div>

      </section>


      {/* =====================================================
          طريقة الاستلام
      ===================================================== */}

      <section className="usage-card">

        <div className="usage-header">

          <div className="usage-icon">

            <svg viewBox="0 0 24 24">
              <path d="M12 3 4 6v5c0 5 3.3 8.4 8 10 4.7-1.6 8-5 8-10V6l-8-3Z" />
              <path d="m8.5 12 2.2 2.2 4.8-5" />
            </svg>

          </div>


          <div>
            <h2>
              طريقة الاستلام
            </h2>

            <p>
              يتم التسليم عبر أقرب صيدلية شريكة
            </p>
          </div>

        </div>


        <div className="safety-note">

          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6M12 7.5h.01" />
          </svg>

          <span>
            يرجى التأكد من حالة المنتج قبل الاستلام
          </span>

        </div>

      </section>


      {/* =====================================================
          BUTTON
      ===================================================== */}

      <button
        className="contact-sender-btn"
        onClick={() =>
          navigate(`/pharmacy/${medicine.id || id}`)
        }
      >

        <svg viewBox="0 0 24 24">
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.3-.3-3.3-.8L4 20l1.8-4.4A7.5 7.5 0 1 1 20 11.5Z" />
        </svg>

        عرض أقرب صيدلية

      </button>


      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        .medicine-detail-page {
          min-height: 100vh;

          padding:
            18px
            14px
            35px;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(179, 239, 228, .42),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 35%,
              rgba(194, 244, 237, .35),
              transparent 25%
            ),
            linear-gradient(
              180deg,
              #f5fffd 0%,
              #eefbf8 100%
            );

          color: #174c50;

          overflow-x: hidden;
        }


        /* ================= HEADER ================= */

        .medicine-detail-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 16px;
        }


        .detail-circle-btn {
          width: 46px;
          height: 46px;

          display: flex;

          align-items: center;

          justify-content: center;

          border: 0;

          border-radius: 17px;

          background:
            rgba(219, 248, 243, .92);

          color: #137f76;

          cursor: pointer;

          box-shadow:
            0 7px 20px rgba(30, 130, 120, .08),
            inset 0 1px 0 rgba(255,255,255,.8);

          transition:
            transform .18s ease,
            background .18s ease;
        }


        .detail-circle-btn:active {
          transform: scale(.93);
        }


        .detail-circle-btn svg {
          width: 23px;
          height: 23px;

          fill: none;

          stroke: currentColor;

          stroke-width: 2;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .favorite-active {
          color: #d2586c;

          background:
            #ffe5eb;
        }


        .favorite-active svg {
          fill: currentColor;
        }


        /* ================= MAIN CARD ================= */

        .medicine-info-card {
          width: 100%;

          padding:
            20px
            16px;

          background:
            rgba(255,255,255,.90);

          border:
            1px solid rgba(255,255,255,.96);

          border-radius: 28px;

          box-shadow:
            0 12px 32px rgba(39,132,124,.08),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter: blur(14px);
        }


        /* ================= TITLE ================= */

        .medicine-title-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;
        }


        .medicine-title-row h1 {
          margin: 0;

          color: #123f43;

          font-size: 26px;

          line-height: 1.35;

          font-weight: 800;

          word-break: break-word;
        }


        .availability {
          flex-shrink: 0;

          padding:
            9px
            15px;

          border-radius: 18px;

          font-size: 14px;

          font-weight: 800;
        }


        .availability.available {
          color: #138c7c;

          background:
            #d9f8ef;
        }


        .availability.requested {
          color: #b45463;

          background:
            #ffe2e7;
        }


        /* ================= TAGS ================= */

        .medicine-tags {
          display: flex;

          flex-wrap: wrap;

          gap: 9px;

          margin-top: 16px;
        }


        .medicine-tags span {
          display: flex;

          align-items: center;

          gap: 7px;

          padding:
            9px
            13px;

          border-radius: 18px;

          background:
            #e5f8f4;

          color: #188477;

          font-size: 14px;

          font-weight: 700;
        }


        .medicine-tags svg {
          width: 18px;
          height: 18px;

          flex-shrink: 0;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================= DIVIDER ================= */

        .info-divider {
          width: 100%;

          height: 1px;

          margin:
            18px
            0;

          background:
            #e5f0ee;
        }


        /* ================= DETAILS ================= */

        .medicine-details-grid {
          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap:
            22px
            13px;
        }


        .detail-item {
          min-width: 0;

          display: flex;

          align-items: flex-start;

          gap: 9px;
        }


        .detail-icon {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #178b7e;
        }


        .detail-icon svg {
          width: 24px;
          height: 24px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .detail-text {
          min-width: 0;
        }


        .detail-text span {
          display: block;

          margin-bottom: 4px;

          color: #819c9d;

          font-size: 12px;

          line-height: 1.4;
        }


        .detail-text strong {
          display: block;

          color: #174c50;

          font-size: 14px;

          line-height: 1.45;

          font-weight: 800;

          word-break: break-word;
        }


        /* ================= DONOR ================= */

        .donor-row {
          display: flex;

          align-items: center;

          gap: 10px;
        }


        .donor-avatar {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          overflow: hidden;

          border-radius: 50%;

          background:
            #ddf6f1;

          color: #168679;
        }


        .donor-avatar img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }


        .donor-avatar svg {
          width: 29px;
          height: 29px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.7;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .donor-info {
          flex: 1;

          min-width: 0;
        }


        .donor-info strong {
          display: block;

          color: #174a4e;

          font-size: 15px;

          line-height: 1.5;
        }


        .donor-info span {
          display: block;

          margin-top: 3px;

          color: #7b9698;

          font-size: 12px;
        }


        .donor-arrow {
          width: 35px;
          height: 35px;

          flex-shrink: 0;

          border: 0;

          background: transparent;

          color: #168579;

          font-size: 32px;

          line-height: 1;

          cursor: pointer;
        }


        /* ================= USAGE ================= */

        .usage-card {
          margin-top: 14px;

          padding:
            18px
            15px;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid rgba(255,255,255,.96);

          border-radius: 27px;

          box-shadow:
            0 10px 28px rgba(39,132,124,.07),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(12px);

          -webkit-backdrop-filter: blur(12px);
        }


        .usage-header {
          display: flex;

          align-items: center;

          gap: 12px;
        }


        .usage-icon {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #14897d;

          background:
            #ddf7f1;
        }


        .usage-icon svg {
          width: 27px;
          height: 27px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.7;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .usage-header h2 {
          margin: 0;

          color: #123f43;

          font-size: 19px;

          line-height: 1.4;

          font-weight: 800;
        }


        .usage-header p {
          margin:
            5px
            0
            0;

          color: #789395;

          font-size: 12px;

          line-height: 1.6;
        }


        /* ================= SAFETY ================= */

        .safety-note {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 15px;

          padding:
            11px
            12px;

          border-radius: 17px;

          background:
            #e8faf6;

          color: #138578;

          font-size: 11px;

          font-weight: 700;
        }


        .safety-note svg {
          width: 19px;
          height: 19px;

          flex-shrink: 0;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================= BUTTON ================= */

        .contact-sender-btn {
          width: 100%;

          margin-top: 15px;

          padding:
            16px;

          border: 0;

          border-radius: 22px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          color: #fff;

          background:
            #159b8a;

          font-family: inherit;

          font-size: 17px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 12px 27px rgba(21,155,138,.20);

          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }


        .contact-sender-btn:active {
          transform: scale(.98);

          box-shadow:
            0 7px 18px rgba(21,155,138,.16);
        }


        .contact-sender-btn svg {
          width: 23px;
          height: 23px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================= SMALL PHONES ================= */

        @media (max-width: 360px) {

          .medicine-detail-page {
            padding:
              14px
              10px
              28px;
          }


          .detail-circle-btn {
            width: 43px;
            height: 43px;
          }


          .medicine-info-card {
            padding:
              17px
              13px;

            border-radius: 25px;
          }


          .medicine-title-row h1 {
            font-size: 22px;
          }


          .availability {
            padding:
              8px
              11px;

            font-size: 12px;
          }


          .medicine-tags span {
            padding:
              8px
              10px;

            font-size: 12px;
          }


          .medicine-details-grid {
            gap:
              18px
              7px;
          }


          .detail-icon {
            width: 30px;
            height: 30px;
          }


          .detail-icon svg {
            width: 21px;
            height: 21px;
          }


          .detail-text span {
            font-size: 11px;
          }


          .detail-text strong {
            font-size: 13px;
          }


          .usage-header h2 {
            font-size: 17px;
          }


          .usage-header p {
            font-size: 11px;
          }


          .contact-sender-btn {
            font-size: 15px;
          }
        }

      `}</style>
    </div>
  );
}

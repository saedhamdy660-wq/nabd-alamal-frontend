import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    api.getMedicine(id).then(setMedicine).catch(() => {});
    
    const favorites = JSON.parse(
      localStorage.getItem("nabd_favorites") || "[]"
    );

    setIsFav(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("nabd_favorites") || "[]"
    );

    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
    }

    localStorage.setItem("nabd_favorites", JSON.stringify(updated));
    setIsFav(updated.includes(id));
  };

  if (!medicine) {
    return (
      <div className="medicine-detail-loading">
        جارِ تحميل بيانات الدواء...
      </div>
    );
  }

  /*
    الصورة:
    لو الـAPI عنده image أو imageUrl نستخدمها.
    ولو مفيش صورة، نستخدم صورة احتياطية.
  */
  const medicineImage =
    medicine.image ||
    medicine.imageUrl ||
    medicine.photo ||
    `https://placehold.co/900x500/e6f7f4/159b8a?text=${encodeURIComponent(
      medicine.name
    )}`;

  const isAvailable = medicine.quantity !== "غير متوفر";

  return (
    <div className="medicine-detail-page" dir="rtl">

      {/* ================= HEADER ================= */}

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
            <path
              d="M20.8 8.9c0 5.2-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 8 4.2c1.5 0 3 .7 4 1.9 1-1.2 2.5-1.9 4-1.9a4.7 4.7 0 0 1 4.8 4.7Z"
            />
          </svg>
        </button>

      </div>

      {/* ================= MEDICINE IMAGE ================= */}

      <div className="medicine-image-card">

        <img
          src={medicineImage}
          alt={medicine.name}
          className="medicine-main-image"
        />

        <div className="image-overlay">
          <span>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <circle cx="8" cy="9" r="1.5" />
              <path d="m4 17 5-5 4 4 2-2 5 5" />
            </svg>
          </span>
        </div>

      </div>

      {/* ================= MAIN INFO ================= */}

      <section className="medicine-info-card">

        <div className="medicine-title-row">

          <h1>{medicine.name}</h1>

          <span
            className={`availability ${
              isAvailable ? "available" : "requested"
            }`}
          >
            {isAvailable ? "متاح" : "مطلوب"}
          </span>

        </div>

        {/* Tags */}

        <div className="medicine-tags">

          {medicine.type && (
            <span>
              <svg viewBox="0 0 24 24">
                <path d="M8 4h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z" />
                <path d="m8 12 8 8" />
              </svg>

              {medicine.type}
            </span>
          )}

          {medicine.category && (
            <span>
              <svg viewBox="0 0 24 24">
                <path d="M8 4h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z" />
                <path d="m8 12 8 8" />
              </svg>

              {medicine.category}
            </span>
          )}

        </div>

        <div className="info-divider" />

        {/* ================= DETAILS GRID ================= */}

        <div className="medicine-details-grid">

          {/* النوع */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="16" rx="2" />
                <path d="M9 4V2h6v2" />
              </svg>
            </div>

            <div>
              <span>النوع</span>
              <strong>
                {medicine.category || "دواء"}
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

            <div>
              <span>الكمية المتاحة</span>
              <strong>
                {medicine.quantity || "غير محددة"}
              </strong>
            </div>

          </div>

          {/* تاريخ الانتهاء */}

          <div className="detail-item">

            <div className="detail-icon">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M7 3v4M17 3v4M3 10h18" />
              </svg>
            </div>

            <div>
              <span>تاريخ الانتهاء</span>
              <strong>
                {medicine.expiry || "غير محدد"}
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

            <div>
              <span>مكان التواجد</span>
              <strong>
                {medicine.location || "غير محدد"}
              </strong>
            </div>

          </div>

        </div>

        <div className="info-divider" />

        {/* ================= DONOR ================= */}

        <div className="donor-row">

          <div className="donor-avatar">

            {medicine.avatar ||
            medicine.donorAvatar ||
            medicine.owner?.avatar ? (
              <img
                src={
                  medicine.avatar ||
                  medicine.donorAvatar ||
                  medicine.owner?.avatar
                }
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
              بواسطة {medicine.donor || "مرسل الدواء"}
            </strong>

            <span>
              متبرع موثوق
            </span>

          </div>

          <button
            className="donor-arrow"
            onClick={() => {}}
          >
            ‹
          </button>

        </div>

      </section>

      {/* ================= USAGE ================= */}

      <section className="usage-card">

        <div className="usage-header">

          <div className="usage-icon">

            <svg viewBox="0 0 24 24">
              <path d="M12 3 4 6v5c0 5 3.3 8.4 8 10 4.7-1.6 8-5 8-10V6l-8-3Z" />
              <path d="m8.5 12 2.2 2.2 4.8-5" />
            </svg>

          </div>

          <div>
            <h2>طريقة الاستلام</h2>

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

      {/* ================= ACTION ================= */}

      <button
        className="contact-sender-btn"
        onClick={() => navigate(`/pharmacy/${medicine.id}`)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.3-.3-3.3-.8L4 20l1.8-4.4A7.5 7.5 0 1 1 20 11.5Z" />
        </svg>

        عرض أقرب صيدلية
      </button>

      {/* ================= CSS ================= */}

      <style>{`

        .medicine-detail-page {
          min-height: 100vh;
          padding: 18px 14px 110px;
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(179, 239, 228, .38),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #f5fffd 0%,
              #eefbf8 100%
            );

          color: #174c50;
          box-sizing: border-box;
        }

        .medicine-detail-page * {
          box-sizing: border-box;
        }

        .medicine-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .detail-circle-btn {
          width: 46px;
          height: 46px;
          border: 0;
          border-radius: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(218, 248, 242, .9);
          color: #117f76;

          cursor: pointer;

          box-shadow:
            0 6px 18px rgba(30, 130, 120, .08);
        }

        .detail-circle-btn svg {
          width: 23px;
          height: 23px;

          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .favorite-active {
          color: #d55d70;
          background: #ffe8ed;
        }

        .favorite-active svg {
          fill: currentColor;
        }

        .medicine-image-card {
          position: relative;
          width: 100%;
          height: 235px;

          overflow: hidden;
          border-radius: 27px;

          background: #dff5f1;

          box-shadow:
            0 12px 30px rgba(38, 125, 120, .10);
        }

        .medicine-main-image {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          left: 14px;
          bottom: 14px;
        }

        .image-overlay span {
          width: 46px;
          height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 16px;

          background: rgba(255,255,255,.82);
          backdrop-filter: blur(10px);

          color: #128579;
        }

        .image-overlay svg {
          width: 23px;
          height: 23px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .medicine-info-card,
        .usage-card {
          margin-top: 14px;

          padding: 19px 16px;

          background: rgba(255,255,255,.86);

          border: 1px solid rgba(255,255,255,.95);

          border-radius: 27px;

          box-shadow:
            0 10px 30px rgba(39, 132, 124, .07),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(12px);
        }

        .medicine-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .medicine-title-row h1 {
          margin: 0;

          font-size: 27px;
          line-height: 1.25;

          color: #123f43;
          font-weight: 800;
        }

        .availability {
          flex-shrink: 0;

          padding: 9px 15px;

          border-radius: 18px;

          font-size: 14px;
          font-weight: 800;
        }

        .availability.available {
          color: #138c7c;
          background: #d9f8ef;
        }

        .availability.requested {
          color: #b45463;
          background: #ffe2e7;
        }

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

          padding: 9px 13px;

          border-radius: 18px;

          background: #e5f8f4;
          color: #188477;

          font-size: 14px;
          font-weight: 700;
        }

        .medicine-tags svg {
          width: 18px;
          height: 18px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
        }

        .info-divider {
          height: 1px;
          margin: 17px 0;

          background: #e7f1ef;
        }

        .medicine-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 19px 14px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          min-width: 0;
        }

        .detail-icon {
          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #138a7d;
        }

        .detail-icon svg {
          width: 23px;
          height: 23px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .detail-item span {
          display: block;

          color: #79989a;
          font-size: 12px;
          margin-bottom: 3px;
        }

        .detail-item strong {
          display: block;

          color: #174b50;
          font-size: 14px;
          line-height: 1.35;
        }

        .donor-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .donor-avatar {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border-radius: 50%;
          background: #dff5f1;
          color: #168679;
        }

        .donor-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .donor-avatar svg {
          width: 28px;
          height: 28px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.7;
        }

        .donor-info {
          flex: 1;
        }

        .donor-info strong {
          display: block;

          color: #174a4e;
          font-size: 14px;
        }

        .donor-info span {
          display: block;

          margin-top: 4px;

          color: #779395;
          font-size: 12px;
        }

        .donor-arrow {
          border: 0;
          background: transparent;

          color: #168579;
          font-size: 32px;

          cursor: pointer;
        }

        .usage-card {
          padding: 17px 15px;
        }

        .usage-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usage-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #14897d;
          background: #ddf7f1;
        }

        .usage-icon svg {
          width: 26px;
          height: 26px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .usage-header h2 {
          margin: 0;

          color: #123f43;
          font-size: 18px;
        }

        .usage-header p {
          margin: 5px 0 0;

          color: #759294;
          font-size: 12px;
          line-height: 1.6;
        }

        .safety-note {
          display: flex;
          align-items: center;
          gap: 8px;

          margin-top: 15px;
          padding: 11px 12px;

          border-radius: 17px;

          background: #e8faf6;
          color: #138578;

          font-size: 11px;
          font-weight: 700;
        }

        .safety-note svg {
          width: 19px;
          height: 19px;

          flex-shrink: 0;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
        }

        .contact-sender-btn {
          width: 100%;

          margin-top: 15px;
          padding: 16px;

          border: 0;
          border-radius: 22px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          color: white;
          background: #159b8a;

          font-family: inherit;
          font-size: 17px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 12px 26px rgba(21, 155, 138, .18);
        }

        .contact-sender-btn svg {
          width: 23px;
          height: 23px;

          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .medicine-detail-loading {
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f2fbf9;
          color: #159b8a;

          font-weight: 700;
        }

        @media (max-width: 360px) {

          .medicine-detail-page {
            padding-left: 10px;
            padding-right: 10px;
          }

          .medicine-image-card {
            height: 205px;
          }

          .medicine-title-row h1 {
            font-size: 23px;
          }

          .availability {
            padding: 8px 11px;
            font-size: 12px;
          }

          .medicine-details-grid {
            gap: 16px 8px;
          }

        }

      `}</style>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 7h14M9 7V4h6v3M8 10v7M12 10v7M16 10v7M7 7l1 14h8l1-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [label, setLabel] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("nabd_addresses") || "null"
    );

    setAddresses(
      stored || [
        {
          id: "a1",
          label: "المنزل",
          details: "القاهرة، مدينة نصر",
        },
      ]
    );
  }, []);

  const persist = (list) => {
    setAddresses(list);
    localStorage.setItem(
      "nabd_addresses",
      JSON.stringify(list)
    );
  };

  const addAddress = (e) => {
    e.preventDefault();

    if (!label.trim() || !details.trim()) return;

    const updated = [
      ...addresses,
      {
        id: "a" + Date.now(),
        label: label.trim(),
        details: details.trim(),
      },
    ];

    persist(updated);

    setLabel("");
    setDetails("");
  };

  const remove = (id) => {
    persist(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="addresses-page">

      {/* Header */}
      <header className="addresses-header">

        <Link
          to="/profile"
          className="addresses-back"
          aria-label="رجوع"
        >
          <BackIcon />
        </Link>

        <div>
          <h1>العناوين المحفوظة</h1>
          <p>إدارة الأماكن التي تستخدمها باستمرار</p>
        </div>

      </header>

      {/* Saved addresses */}
      <section className="addresses-section">

        <div className="section-title">
          <div>
            <h2>عناويني</h2>
            <p>
              {addresses.length === 0
                ? "لا توجد عناوين محفوظة"
                : `${addresses.length} عنوان محفوظ`}
            </p>
          </div>

          <div className="section-icon">
            <LocationIcon />
          </div>
        </div>

        {addresses.length > 0 ? (
          <div className="address-list">

            {addresses.map((a) => (
              <div
                key={a.id}
                className="address-card"
              >

                <div className="address-icon">
                  <LocationIcon />
                </div>

                <div className="address-content">
                  <strong>{a.label}</strong>
                  <p>{a.details}</p>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => remove(a.id)}
                  aria-label={`حذف ${a.label}`}
                >
                  <TrashIcon />
                </button>

              </div>
            ))}

          </div>
        ) : (
          <div className="empty-addresses">

            <div className="empty-icon">
              <LocationIcon />
            </div>

            <h3>لا توجد عناوين محفوظة</h3>

            <p>
              أضف عنوانًا لتسهيل الوصول إليه لاحقًا
            </p>

          </div>
        )}

      </section>

      {/* Add address */}
      <section className="add-section">

        <div className="add-title">

          <div className="add-icon">
            <PlusIcon />
          </div>

          <div>
            <h2>إضافة عنوان جديد</h2>
            <p>أدخل بيانات المكان الذي تريد حفظه</p>
          </div>

        </div>

        <form onSubmit={addAddress}>

          <div className="input-card">

            <label>
              اسم العنوان
            </label>

            <input
              value={label}
              onChange={(e) =>
                setLabel(e.target.value)
              }
              placeholder="مثال: المنزل، العمل"
            />

          </div>

          <div className="input-card">

            <label>
              تفاصيل العنوان
            </label>

            <input
              value={details}
              onChange={(e) =>
                setDetails(e.target.value)
              }
              placeholder="مثال: القاهرة، مدينة نصر"
            />

          </div>

          <button
            className="add-button"
            type="submit"
          >
            <PlusIcon />
            <span>إضافة العنوان</span>
          </button>

        </form>

      </section>

      <style>{`

        .addresses-page {
          min-height: 100vh;
          padding: 22px 18px 40px;
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

        .addresses-header {
          max-width: 520px;
          margin: 0 auto 24px;

          display: flex;
          align-items: center;
          gap: 13px;
        }

        .addresses-back {
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

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;
        }

        .addresses-back svg {
          width: 21px;
          height: 21px;
        }

        .addresses-header h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 21px;
          font-weight: 800;
        }

        .addresses-header p {
          margin: 0;

          color: #88a3a2;

          font-size: 10px;
        }

        /* Sections */

        .addresses-section,
        .add-section {
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;

          padding: 18px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.91),
              rgba(232,249,246,.79)
            );

          border: 1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.92);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .addresses-section {
          margin-bottom: 15px;
        }

        /* Section title */

        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 15px;
        }

        .section-title h2,
        .add-title h2 {
          margin: 0 0 4px;

          color: #286d6d;

          font-size: 16px;
          font-weight: 800;
        }

        .section-title p,
        .add-title p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;
        }

        .section-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e1faf5,
              #cdeee7
            );
        }

        .section-icon svg {
          width: 21px;
          height: 21px;
        }

        /* Address list */

        .address-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .address-card {
          min-height: 73px;

          padding: 10px 11px;

          display: flex;
          align-items: center;

          gap: 11px;

          border-radius: 20px;

          background:
            rgba(255,255,255,.68);

          border: 1px solid
            rgba(255,255,255,.88);

          box-shadow:
            0 6px 17px
              rgba(42,128,128,.055);

          transition: .2s ease;
        }

        .address-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e2faf5,
              #d0f0ea
            );
        }

        .address-icon svg {
          width: 20px;
          height: 20px;
        }

        .address-content {
          flex: 1;
          min-width: 0;
        }

        .address-content strong {
          display: block;

          margin-bottom: 5px;

          color: #286d6d;

          font-size: 13px;
          font-weight: 800;
        }

        .address-content p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.5;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .delete-button {
          width: 37px;
          height: 37px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0;

          border-radius: 12px;

          color: #c05267;

          background:
            rgba(255,231,236,.78);

          cursor: pointer;

          transition: .2s ease;
        }

        .delete-button svg {
          width: 18px;
          height: 18px;
        }

        .delete-button:active {
          transform: scale(.92);
        }

        /* Empty */

        .empty-addresses {
          padding: 25px 12px;

          text-align: center;

          border-radius: 20px;

          background:
            rgba(255,255,255,.48);

          border: 1px dashed
            rgba(33,141,131,.16);
        }

        .empty-icon {
          width: 54px;
          height: 54px;

          margin: 0 auto 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #159b8a;

          background:
            #e2f8f4;
        }

        .empty-icon svg {
          width: 24px;
          height: 24px;
        }

        .empty-addresses h3 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 14px;
        }

        .empty-addresses p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;
        }

        /* Add section */

        .add-section {
          margin-bottom: 20px;
        }

        .add-title {
          display: flex;
          align-items: center;

          gap: 11px;

          margin-bottom: 17px;
        }

        .add-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );

          box-shadow:
            0 7px 16px
              rgba(21,155,138,.14);
        }

        .add-icon svg {
          width: 20px;
          height: 20px;
        }

        /* Inputs */

        .input-card {
          margin-bottom: 11px;

          padding: 13px 14px;

          border-radius: 18px;

          background:
            rgba(255,255,255,.68);

          border: 1px solid
            rgba(255,255,255,.9);
        }

        .input-card label {
          display: block;

          margin-bottom: 7px;

          color: #729292;

          font-size: 10px;
          font-weight: 700;
        }

        .input-card input {
          width: 100%;

          padding: 0;

          border: 0;
          outline: 0;

          color: #286d6d;

          background: transparent;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 13px;
          font-weight: 700;
        }

        .input-card input::placeholder {
          color: #a5b9b7;
          font-weight: 400;
        }

        /* Add button */

        .add-button {
          width: 100%;
          min-height: 50px;

          margin-top: 5px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          border: 0;

          border-radius: 17px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #39b8a5,
              #159b8a
            );

          box-shadow:
            0 9px 20px
              rgba(21,155,138,.17);

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          transition: .2s ease;
        }

        .add-button svg {
          width: 18px;
          height: 18px;
        }

        .add-button:active {
          transform: scale(.98);
        }

        /* =========================================
           APP DARK MODE
           Controlled by Settings.jsx
           ========================================= */

        body.nabd-dark .addresses-page {
          color: #d9eeeb;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(36,132,120,.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(26,103,96,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #0c1d1b 0%,
              #102725 45%,
              #0d211f 100%
            );
        }

        body.nabd-dark .addresses-back {
          color: #62d2c0;

          background:
            rgba(25,52,49,.78);

          border-color:
            rgba(93,180,169,.14);

          box-shadow:
            0 7px 18px
              rgba(0,0,0,.20),
            inset 0 1px 0
              rgba(255,255,255,.04);
        }

        body.nabd-dark .addresses-header h1 {
          color: #6bd7c5;
        }

        body.nabd-dark .addresses-header p {
          color: #88aaa6;
        }

        body.nabd-dark .addresses-section,
        body.nabd-dark .add-section {
          background:
            linear-gradient(
              145deg,
              rgba(22,49,46,.92),
              rgba(17,42,39,.84)
            );

          border-color:
            rgba(101,189,178,.10);

          box-shadow:
            0 12px 30px
              rgba(0,0,0,.22),
            inset 0 1px 0
              rgba(255,255,255,.035);
        }

        body.nabd-dark .section-title h2,
        body.nabd-dark .add-title h2 {
          color: #9ce4d8;
        }

        body.nabd-dark .section-title p,
        body.nabd-dark .add-title p {
          color: #7fa19d;
        }

        body.nabd-dark .section-icon {
          color: #67d7c4;

          background:
            linear-gradient(
              145deg,
              rgba(41,117,105,.55),
              rgba(30,94,86,.55)
            );
        }

        body.nabd-dark .address-card {
          background:
            rgba(28,58,54,.76);

          border-color:
            rgba(112,192,182,.10);

          box-shadow:
            0 6px 17px
              rgba(0,0,0,.16);
        }

        body.nabd-dark .address-icon {
          color: #67d7c4;

          background:
            linear-gradient(
              145deg,
              rgba(42,121,108,.52),
              rgba(30,93,85,.52)
            );
        }

        body.nabd-dark .address-content strong {
          color: #9ce4d8;
        }

        body.nabd-dark .address-content p {
          color: #7fa19d;
        }

        body.nabd-dark .delete-button {
          color: #ef8ea0;

          background:
            rgba(110,48,62,.40);
        }

        body.nabd-dark .empty-addresses {
          background:
            rgba(26,57,53,.55);

          border-color:
            rgba(103,215,196,.16);
        }

        body.nabd-dark .empty-icon {
          color: #67d7c4;

          background:
            rgba(42,121,108,.34);
        }

        body.nabd-dark .empty-addresses h3 {
          color: #9ce4d8;
        }

        body.nabd-dark .empty-addresses p {
          color: #7fa19d;
        }

        body.nabd-dark .input-card {
          background:
            rgba(28,58,54,.76);

          border-color:
            rgba(112,192,182,.10);
        }

        body.nabd-dark .input-card label {
          color: #86aaa5;
        }

        body.nabd-dark .input-card input {
          color: #b7ebe3;
        }

        body.nabd-dark .input-card input::placeholder {
          color: #6f908c;
        }

        /* Mobile */

        @media (max-width: 600px) {

          .addresses-page {
            padding:
              18px 14px 35px;
          }

          .addresses-header {
            margin-bottom: 20px;
          }

          .addresses-header h1 {
            font-size: 20px;
          }

          .addresses-section,
          .add-section {
            padding: 16px;
            border-radius: 23px;
          }

          .address-card {
            min-height: 70px;
          }

        }

      `}</style>

    </div>
  );
}

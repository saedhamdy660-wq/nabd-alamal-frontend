import React, { useState } from "react";

const categories = [
  "أدوية الأورام",
  "أدوية مزمنة",
  "المضادات الحيوية",
  "المسكنات",
  "الفيتامينات",
  "أدوية الجهاز الهضمي",
  "أدوية الحساسية",
  "أدوية الجهاز التنفسي",
];

const demoItems = [
  "عنصر تجريبي 01",
  "عنصر تجريبي 02",
  "عنصر تجريبي 03",
  "عنصر تجريبي 04",
  "عنصر تجريبي 05",
  "عنصر تجريبي 06",
  "عنصر تجريبي 07",
  "عنصر تجريبي 08",
  "عنصر تجريبي 09",
  "عنصر تجريبي 10",
];

export default function MedicineExchange() {
  const [selectedCategory, setSelectedCategory] =
    useState("أدوية الأورام");

  const [search, setSearch] = useState("");

  const filteredItems = demoItems.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="medicine-page">
      <style>{`
        .medicine-page {
          min-height: 100vh;
          padding: 28px 18px 120px;
          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(88, 205, 188, 0.18),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #eefcf9 0%,
              #f7fffd 48%,
              #eefaf8 100%
            );
          color: #174943;
          direction: rtl;
          transition:
            background .25s ease,
            color .25s ease;
        }

        .medicine-container {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }

        .medicine-header {
          position: relative;
          text-align: center;
          margin-bottom: 22px;
        }

        .medicine-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #15584f;
        }

        .medicine-header p {
          margin: 7px 0 0;
          font-size: 14px;
          color: #6c8984;
        }

        .pulse-line {
          width: 145px;
          height: 3px;
          margin: 14px auto 0;
          border-radius: 10px;
          background: linear-gradient(
            90deg,
            transparent,
            #2aa995,
            transparent
          );
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, .82);
          border: 1px solid rgba(42, 169, 149, .12);
          box-shadow: 0 8px 25px rgba(31, 121, 108, .08);
          border-radius: 22px;
          padding: 5px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(12px);
        }

        .search-icon {
          font-size: 18px;
          opacity: .65;
        }

        .search-box input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          padding: 13px 4px;
          font-size: 14px;
          font-family: inherit;
          color: #174943;
        }

        .search-box input::placeholder {
          color: #8ca39f;
        }

        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 4px 3px 12px;
        }

        .section-title h3 {
          margin: 0;
          font-size: 17px;
          color: #18584f;
        }

        .section-title span {
          font-size: 12px;
          color: #71918b;
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 11px;
          margin-bottom: 24px;
        }

        .category-button {
          border: 1px solid rgba(42, 169, 149, .12);
          background: rgba(255, 255, 255, .82);
          color: #255b54;
          border-radius: 18px;
          padding: 15px 12px;
          text-align: right;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 7px 20px rgba(31, 121, 108, .06);
          transition:
            transform .2s ease,
            background .2s ease,
            color .2s ease,
            box-shadow .2s ease;
        }

        .category-button:active {
          transform: scale(.98);
        }

        .category-button.active {
          background: linear-gradient(
            135deg,
            #159b8a,
            #27ad9b
          );
          color: white;
          box-shadow: 0 9px 22px rgba(21, 155, 138, .23);
        }

        .category-button.important {
          grid-column: span 2;
          padding: 19px 16px;
          font-size: 16px;
          border: 2px solid rgba(21, 155, 138, .22);
        }

        .category-content {
          background: rgba(255, 255, 255, .72);
          border: 1px solid rgba(42, 169, 149, .12);
          border-radius: 25px;
          padding: 16px;
          box-shadow: 0 9px 28px rgba(31, 121, 108, .07);
          backdrop-filter: blur(14px);
        }

        .content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
        }

        .content-header h2 {
          margin: 0;
          font-size: 18px;
          color: #18584f;
        }

        .content-header span {
          background: #e4f7f3;
          color: #168978;
          border-radius: 20px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
        }

        .medicine-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: rgba(255, 255, 255, .86);
          border-radius: 17px;
          padding: 13px 14px;
          margin-bottom: 9px;
          border: 1px solid rgba(42, 169, 149, .08);
        }

        .medicine-item:last-child {
          margin-bottom: 0;
        }

        .item-info {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .item-number {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e6f7f4;
          color: #159b8a;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .item-name {
          font-size: 13px;
          font-weight: 700;
          color: #285c55;
        }

        .item-status {
          font-size: 10px;
          color: #78928e;
          margin-top: 3px;
        }

        .demo-label {
          font-size: 10px;
          color: #7b9691;
          white-space: nowrap;
        }

        /* =========================
           DARK MODE
        ========================= */

        body.nabd-dark .medicine-page {
          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(42, 169, 149, .12),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #0d2422 0%,
              #102a27 50%,
              #0b211f 100%
            );
          color: #e6f6f3;
        }

        body.nabd-dark .medicine-header h1 {
          color: #d9f5f0;
        }

        body.nabd-dark .medicine-header p {
          color: #8caeaa;
        }

        body.nabd-dark .search-box {
          background: rgba(25, 52, 49, .88);
          border-color: rgba(93, 201, 183, .12);
          box-shadow: 0 8px 25px rgba(0, 0, 0, .18);
        }

        body.nabd-dark .search-box input {
          color: #e6f6f3;
        }

        body.nabd-dark .search-box input::placeholder {
          color: #78918d;
        }

        body.nabd-dark .section-title h3 {
          color: #d5f2ee;
        }

        body.nabd-dark .section-title span {
          color: #88aaa5;
        }

        body.nabd-dark .category-button {
          background: rgba(25, 52, 49, .9);
          border-color: rgba(93, 201, 183, .1);
          color: #d5efeb;
          box-shadow: 0 7px 20px rgba(0, 0, 0, .15);
        }

        body.nabd-dark .category-button.active {
          background: linear-gradient(
            135deg,
            #168f80,
            #20a08f
          );
          color: white;
        }

        body.nabd-dark .category-content {
          background: rgba(20, 46, 43, .9);
          border-color: rgba(93, 201, 183, .1);
          box-shadow: 0 9px 28px rgba(0, 0, 0, .18);
        }

        body.nabd-dark .content-header h2 {
          color: #d8f3ef;
        }

        body.nabd-dark .content-header span {
          background: rgba(36, 145, 130, .18);
          color: #6bd0bf;
        }

        body.nabd-dark .medicine-item {
          background: rgba(27, 57, 53, .9);
          border-color: rgba(93, 201, 183, .08);
        }

        body.nabd-dark .item-number {
          background: rgba(42, 169, 149, .16);
          color: #63cdbd;
        }

        body.nabd-dark .item-name {
          color: #d8f1ed;
        }

        body.nabd-dark .item-status,
        body.nabd-dark .demo-label {
          color: #819f9a;
        }

        @media (max-width: 430px) {
          .medicine-page {
            padding-left: 14px;
            padding-right: 14px;
          }

          .medicine-header h1 {
            font-size: 25px;
          }

          .categories {
            gap: 9px;
          }

          .category-button {
            padding: 13px 10px;
            font-size: 13px;
          }

          .category-button.important {
            padding: 17px 13px;
          }
        }
      `}</style>

      <div className="medicine-container">

        <div className="medicine-header">
          <h1>تبادل الأدوية</h1>
          <p>اختار القسم للوصول إلى العناصر المسجلة</p>
          <div className="pulse-line" />
        </div>

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="ابحث داخل القسم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="section-title">
          <h3>الأقسام</h3>
          <span>اختار القسم</span>
        </div>

        <div className="categories">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`
                category-button
                ${selectedCategory === category ? "active" : ""}
                ${index === 0 ? "important" : ""}
              `}
              onClick={() => {
                setSelectedCategory(category);
                setSearch("");
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="category-content">

          <div className="content-header">
            <h2>{selectedCategory}</h2>
            <span>10 عناصر</span>
          </div>

          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div className="medicine-item" key={item}>
                <div className="item-info">

                  <div className="item-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="item-name">
                      {item}
                    </div>

                    <div className="item-status">
                      عنصر تجريبي للعرض فقط
                    </div>
                  </div>

                </div>

                <span className="demo-label">
                  تجريبي
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "30px 10px",
                color: "var(--muted, #78928e)",
                fontSize: 13,
              }}
            >
              لا توجد نتائج مطابقة
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

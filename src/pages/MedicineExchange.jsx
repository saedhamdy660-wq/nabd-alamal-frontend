import React, { useMemo, useState } from "react";

const categories = [
  "الأورام",
  "الضغط والقلب",
  "السكري",
  "مسكنات",
  "البرد والحساسية",
  "الجهاز الهضمي",
  "الجهاز التنفسي",
  "الأدوية الجلدية",
  "المضادات الحيوية",
];

const demoMedicines = {
  "الأورام": [
    "دواء تجريبي للأورام 01",
    "دواء تجريبي للأورام 02",
    "دواء تجريبي للأورام 03",
    "دواء تجريبي للأورام 04",
    "دواء تجريبي للأورام 05",
    "دواء تجريبي للأورام 06",
    "دواء تجريبي للأورام 07",
    "دواء تجريبي للأورام 08",
    "دواء تجريبي للأورام 09",
    "دواء تجريبي للأورام 10",
  ],

  "الضغط والقلب": [
    "دواء تجريبي للضغط والقلب 01",
    "دواء تجريبي للضغط والقلب 02",
    "دواء تجريبي للضغط والقلب 03",
    "دواء تجريبي للضغط والقلب 04",
    "دواء تجريبي للضغط والقلب 05",
    "دواء تجريبي للضغط والقلب 06",
    "دواء تجريبي للضغط والقلب 07",
    "دواء تجريبي للضغط والقلب 08",
    "دواء تجريبي للضغط والقلب 09",
    "دواء تجريبي للضغط والقلب 10",
  ],

  "السكري": [
    "دواء تجريبي للسكري 01",
    "دواء تجريبي للسكري 02",
    "دواء تجريبي للسكري 03",
    "دواء تجريبي للسكري 04",
    "دواء تجريبي للسكري 05",
    "دواء تجريبي للسكري 06",
    "دواء تجريبي للسكري 07",
    "دواء تجريبي للسكري 08",
    "دواء تجريبي للسكري 09",
    "دواء تجريبي للسكري 10",
  ],

  "مسكنات": [
    "دواء تجريبي للمسكنات 01",
    "دواء تجريبي للمسكنات 02",
    "دواء تجريبي للمسكنات 03",
    "دواء تجريبي للمسكنات 04",
    "دواء تجريبي للمسكنات 05",
    "دواء تجريبي للمسكنات 06",
    "دواء تجريبي للمسكنات 07",
    "دواء تجريبي للمسكنات 08",
    "دواء تجريبي للمسكنات 09",
    "دواء تجريبي للمسكنات 10",
  ],

  "البرد والحساسية": [
    "دواء تجريبي للبرد والحساسية 01",
    "دواء تجريبي للبرد والحساسية 02",
    "دواء تجريبي للبرد والحساسية 03",
    "دواء تجريبي للبرد والحساسية 04",
    "دواء تجريبي للبرد والحساسية 05",
    "دواء تجريبي للبرد والحساسية 06",
    "دواء تجريبي للبرد والحساسية 07",
    "دواء تجريبي للبرد والحساسية 08",
    "دواء تجريبي للبرد والحساسية 09",
    "دواء تجريبي للبرد والحساسية 10",
  ],

  "الجهاز الهضمي": [
    "دواء تجريبي للجهاز الهضمي 01",
    "دواء تجريبي للجهاز الهضمي 02",
    "دواء تجريبي للجهاز الهضمي 03",
    "دواء تجريبي للجهاز الهضمي 04",
    "دواء تجريبي للجهاز الهضمي 05",
    "دواء تجريبي للجهاز الهضمي 06",
    "دواء تجريبي للجهاز الهضمي 07",
    "دواء تجريبي للجهاز الهضمي 08",
    "دواء تجريبي للجهاز الهضمي 09",
    "دواء تجريبي للجهاز الهضمي 10",
  ],

  "الجهاز التنفسي": [
    "دواء تجريبي للجهاز التنفسي 01",
    "دواء تجريبي للجهاز التنفسي 02",
    "دواء تجريبي للجهاز التنفسي 03",
    "دواء تجريبي للجهاز التنفسي 04",
    "دواء تجريبي للجهاز التنفسي 05",
    "دواء تجريبي للجهاز التنفسي 06",
    "دواء تجريبي للجهاز التنفسي 07",
    "دواء تجريبي للجهاز التنفسي 08",
    "دواء تجريبي للجهاز التنفسي 09",
    "دواء تجريبي للجهاز التنفسي 10",
  ],

  "الأدوية الجلدية": [
    "دواء تجريبي للأدوية الجلدية 01",
    "دواء تجريبي للأدوية الجلدية 02",
    "دواء تجريبي للأدوية الجلدية 03",
    "دواء تجريبي للأدوية الجلدية 04",
    "دواء تجريبي للأدوية الجلدية 05",
    "دواء تجريبي للأدوية الجلدية 06",
    "دواء تجريبي للأدوية الجلدية 07",
    "دواء تجريبي للأدوية الجلدية 08",
    "دواء تجريبي للأدوية الجلدية 09",
    "دواء تجريبي للأدوية الجلدية 10",
  ],

  "المضادات الحيوية": [
    "دواء تجريبي للمضادات الحيوية 01",
    "دواء تجريبي للمضادات الحيوية 02",
    "دواء تجريبي للمضادات الحيوية 03",
    "دواء تجريبي للمضادات الحيوية 04",
    "دواء تجريبي للمضادات الحيوية 05",
    "دواء تجريبي للمضادات الحيوية 06",
    "دواء تجريبي للمضادات الحيوية 07",
    "دواء تجريبي للمضادات الحيوية 08",
    "دواء تجريبي للمضادات الحيوية 09",
    "دواء تجريبي للمضادات الحيوية 10",
  ],
};

export default function MedicineExchange() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const medicines = useMemo(() => {
    if (!selectedCategory) return [];

    const list = demoMedicines[selectedCategory] || [];

    if (!search.trim()) return list;

    return list.filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [selectedCategory, search]);

  return (
    <div className="medicine-exchange-page">
      <style>{`
        .medicine-exchange-page {
          direction: rtl;
          min-height: 100vh;
          padding: 22px 18px 120px;
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(44, 190, 171, .14),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #effcf9 0%,
              #f8fffe 55%,
              #edf9f7 100%
            );
          color: #15564f;
          transition: .25s ease;
        }

        .medicine-wrapper {
          width: 100%;
          max-width: 760px;
          margin: auto;
        }

        .medicine-top {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .medicine-title {
          text-align: center;
        }

        .medicine-title h1 {
          margin: 0;
          font-size: 29px;
          font-weight: 800;
          color: #15584f;
        }

        .medicine-title p {
          margin: 5px 0 0;
          font-size: 14px;
          color: #86a39e;
        }

        .back-button {
          position: absolute;
          right: 0;
          top: 0;
          width: 48px;
          height: 48px;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,.72);
          color: #159b8a;
          font-size: 27px;
          cursor: pointer;
          box-shadow: 0 7px 20px rgba(31,121,108,.08);
        }

        .medicine-logo {
          position: absolute;
          left: 0;
          top: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(220,250,245,.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #159b8a;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(37,169,149,.1);
          border-radius: 25px;
          padding: 5px 17px;
          box-shadow: 0 8px 25px rgba(31,121,108,.07);
          margin-bottom: 18px;
          backdrop-filter: blur(12px);
        }

        .search-container span {
          font-size: 25px;
          color: #5d8d86;
        }

        .search-container input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-family: inherit;
          font-size: 15px;
          padding: 13px 3px;
          color: #225c54;
        }

        .search-container input::placeholder {
          color: #86a49f;
        }

        .category-scroll {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          padding: 2px 2px 9px;
          scrollbar-width: none;
          margin-bottom: 14px;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-chip {
          flex: 0 0 auto;
          border: 0;
          border-radius: 22px;
          padding: 11px 20px;
          background: rgba(226,247,243,.9);
          color: #376f68;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s ease;
          white-space: nowrap;
        }

        .category-chip.active {
          background: #16ad99;
          color: white;
          box-shadow: 0 6px 18px rgba(22,173,153,.2);
        }

        .main-card {
          background: rgba(255,255,255,.78);
          border: 1px solid rgba(35,170,150,.1);
          border-radius: 28px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(31,121,108,.07);
          backdrop-filter: blur(14px);
          margin-bottom: 17px;
        }

        .card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 17px;
        }

        .card-heading h2 {
          margin: 0;
          font-size: 21px;
          color: #15584f;
        }

        .card-heading p {
          margin: 5px 0 0;
          font-size: 12px;
          color: #86a39e;
        }

        .count-badge {
          padding: 8px 13px;
          border-radius: 18px;
          background: #def8f3;
          color: #159b8a;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .category-box {
          min-height: 88px;
          border: 1px solid rgba(39,170,151,.1);
          border-radius: 18px;
          background: rgba(245,253,251,.82);
          padding: 12px;
          cursor: pointer;
          font-family: inherit;
          color: #235d56;
          transition: .2s ease;
          text-align: right;
          position: relative;
        }

        .category-box:hover {
          transform: translateY(-2px);
        }

        .category-box.active {
          background: linear-gradient(
            135deg,
            #dffaf5,
            #c9f5ed
          );
          border-color: rgba(21,155,138,.25);
        }

        .category-box-title {
          font-size: 14px;
          font-weight: 800;
          display: block;
          margin-bottom: 9px;
        }

        .category-box-count {
          font-size: 11px;
          color: #8aa49f;
        }

        .arrow {
          position: absolute;
          left: 12px;
          top: 31px;
          font-size: 22px;
          color: #418a81;
        }

        .medicines-card {
          background: rgba(255,255,255,.78);
          border: 1px solid rgba(35,170,150,.1);
          border-radius: 28px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(31,121,108,.07);
          backdrop-filter: blur(14px);
        }

        .empty-state {
          text-align: center;
          padding: 28px 12px 18px;
        }

        .empty-state-title {
          font-size: 17px;
          font-weight: 800;
          color: #1d5c54;
          margin-bottom: 6px;
        }

        .empty-state-text {
          font-size: 13px;
          color: #8ba49f;
          line-height: 1.8;
        }

        .medicine-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 65px;
          padding: 10px 12px;
          margin-bottom: 9px;
          border-radius: 18px;
          background: rgba(250,255,254,.9);
          border: 1px solid rgba(40,170,150,.08);
        }

        .medicine-row:last-child {
          margin-bottom: 0;
        }

        .medicine-info {
          min-width: 0;
        }

        .medicine-name {
          font-size: 14px;
          font-weight: 800;
          color: #205c54;
        }

        .medicine-description {
          margin-top: 4px;
          font-size: 11px;
          color: #8aa49f;
        }

        .details-button {
          border: 0;
          border-radius: 20px;
          padding: 9px 13px;
          background: #e1f8f4;
          color: #159b8a;
          font-family: inherit;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
        }

        .details-button:hover {
          background: #cef2eb;
        }

        /* MODAL */

        .details-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(4,35,31,.45);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 15px;
        }

        .details-modal {
          width: 100%;
          max-width: 560px;
          background: #ffffff;
          border-radius: 28px 28px 20px 20px;
          padding: 22px;
          box-shadow: 0 -10px 35px rgba(0,0,0,.15);
        }

        .modal-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .modal-top h3 {
          margin: 0;
          color: #15584f;
          font-size: 19px;
        }

        .close-button {
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: #edf8f6;
          color: #438078;
          font-size: 19px;
          cursor: pointer;
        }

        .modal-text {
          color: #75918c;
          font-size: 13px;
          line-height: 1.9;
          margin: 0 0 15px;
        }

        .modal-status {
          display: inline-block;
          background: #def8f3;
          color: #159b8a;
          border-radius: 18px;
          padding: 8px 13px;
          font-size: 11px;
          font-weight: 800;
        }

        /* ======================
           DARK MODE
        ====================== */

        body.nabd-dark .medicine-exchange-page {
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(42,190,171,.12),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #0d2422 0%,
              #102a27 55%,
              #0b211f 100%
            );
          color: #e3f5f1;
        }

        body.nabd-dark .medicine-title h1,
        body.nabd-dark .card-heading h2,
        body.nabd-dark .empty-state-title {
          color: #d9f4ef;
        }

        body.nabd-dark .medicine-title p,
        body.nabd-dark .card-heading p,
        body.nabd-dark .medicine-description,
        body.nabd-dark .category-box-count,
        body.nabd-dark .empty-state-text {
          color: #829f9a;
        }

        body.nabd-dark .back-button {
          background: rgba(27,55,52,.9);
          color: #62cdbd;
        }

        body.nabd-dark .medicine-logo {
          background: rgba(31,84,77,.75);
          color: #64cdbd;
        }

        body.nabd-dark .search-container {
          background: rgba(25,52,49,.92);
          border-color: rgba(93,201,183,.1);
        }

        body.nabd-dark .search-container input {
          color: #e3f5f1;
        }

        body.nabd-dark .search-container input::placeholder {
          color: #718c87;
        }

        body.nabd-dark .category-chip {
          background: rgba(27,59,55,.9);
          color: #b8d9d4;
        }

        body.nabd-dark .category-chip.active {
          background: #168f80;
          color: white;
        }

        body.nabd-dark .main-card,
        body.nabd-dark .medicines-card {
          background: rgba(20,46,43,.9);
          border-color: rgba(93,201,183,.09);
          box-shadow: 0 10px 30px rgba(0,0,0,.18);
        }

        body.nabd-dark .category-box {
          background: rgba(27,57,53,.9);
          border-color: rgba(93,201,183,.08);
          color: #d2ece8;
        }

        body.nabd-dark .category-box.active {
          background: rgba(32,108,96,.55);
          border-color: rgba(93,201,183,.25);
        }

        body.nabd-dark .arrow {
          color: #65bfb1;
        }

        body.nabd-dark .count-badge {
          background: rgba(42,169,149,.16);
          color: #68cebd;
        }

        body.nabd-dark .medicine-row {
          background: rgba(27,57,53,.9);
          border-color: rgba(93,201,183,.08);
        }

        body.nabd-dark .medicine-name {
          color: #d8f0ec;
        }

        body.nabd-dark .details-button {
          background: rgba(42,169,149,.16);
          color: #69cdbd;
        }

        body.nabd-dark .details-modal {
          background: #17312e;
        }

        body.nabd-dark .modal-top h3 {
          color: #d9f4ef;
        }

        body.nabd-dark .modal-text {
          color: #8eaaa5;
        }

        body.nabd-dark .close-button {
          background: rgba(42,169,149,.14);
          color: #91c8c0;
        }

        body.nabd-dark .modal-status {
          background: rgba(42,169,149,.16);
          color: #69cdbd;
        }

        @media (max-width: 650px) {
          .medicine-exchange-page {
            padding: 18px 14px 115px;
          }

          .medicine-title h1 {
            font-size: 27px;
          }

          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-card,
          .medicines-card {
            padding: 15px;
          }
        }

        @media (max-width: 390px) {
          .category-grid {
            gap: 8px;
          }

          .category-box {
            min-height: 82px;
            padding: 10px;
          }

          .category-box-title {
            font-size: 12px;
          }

          .medicine-name {
            font-size: 12px;
          }

          .details-button {
            padding: 8px 10px;
            font-size: 10px;
          }
        }
      `}</style>

      <div className="medicine-wrapper">

        {/* HEADER */}
        <div className="medicine-top">

          <button
            className="back-button"
            onClick={() => window.history.back()}
            aria-label="رجوع"
          >
            ←
          </button>

          <div className="medicine-title">
            <h1>تبادل الأدوية</h1>
            <p>معًا ... لدعم صحتك</p>
          </div>

          <div className="medicine-logo">
            💊
          </div>

        </div>

        {/* SEARCH */}
        <div className="search-container">
          <span>⌕</span>

          <input
            type="text"
            placeholder="ابحث عن دواء أو اسم تجاري..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCategory}
          />
        </div>

        {/* HORIZONTAL CATEGORIES */}
        <div className="category-scroll">

          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSearch("");
              }}
            >
              {category}
            </button>
          ))}

        </div>

        {/* MAIN CATEGORIES */}
        <div className="main-card">

          <div className="card-heading">
            <div>
              <h2>الأقسام الرئيسية</h2>
              <p>اختر القسم الذي تريد تصفحه</p>
            </div>
          </div>

          <div className="category-grid">

            {categories.map((category) => (
              <button
                key={category}
                className={`category-box ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearch("");
                }}
              >
                <span className="category-box-title">
                  {category}
                </span>

                <span className="category-box-count">
                  10 أنواع
                </span>

                <span className="arrow">
                  ‹
                </span>
              </button>
            ))}

          </div>

        </div>

        {/* MEDICINES */}
        {selectedCategory ? (
          <div className="medicines-card">

            <div className="card-heading">

              <div>
                <h2>{selectedCategory}</h2>

                <p>
                  عناصر متاحة للعرض داخل هذا القسم
                </p>
              </div>

              <span className="count-badge">
                {medicines.length} عنصر
              </span>

            </div>

            {medicines.length > 0 ? (
              medicines.map((medicine) => (
                <div
                  className="medicine-row"
                  key={medicine}
                >
                  <div className="medicine-info">

                    <div className="medicine-name">
                      {medicine}
                    </div>

                    <div className="medicine-description">
                      بيانات تجريبية لمشروع التخرج
                    </div>

                  </div>

                  <button
                    className="details-button"
                    onClick={() =>
                      setSelectedMedicine(medicine)
                    }
                  >
                    عرض التفاصيل ›
                  </button>

                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-title">
                  لا توجد نتائج
                </div>

                <div className="empty-state-text">
                  جرّب البحث بكلمة مختلفة.
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="medicines-card">

            <div className="empty-state">

              <div className="empty-state-title">
                اختر قسمًا للبدء
              </div>

              <div className="empty-state-text">
                اضغط على أي قسم من الأقسام بالأعلى
                لعرض العناصر الموجودة بداخله.
              </div>

            </div>

          </div>
        )}

      </div>

      {/* DETAILS MODAL */}
      {selectedMedicine && (
        <div
          className="details-overlay"
          onClick={() => setSelectedMedicine(null)}
        >
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-top">

              <h3>
                {selectedMedicine}
              </h3>

              <button
                className="close-button"
                onClick={() => setSelectedMedicine(null)}
              >
                ×
              </button>

            </div>

            <p className="modal-text">
              هذه شاشة تفاصيل تجريبية خاصة بمشروع
              التخرج. يمكن ربطها لاحقًا ببيانات
              المشروع الفعلية.
            </p>

            <span className="modal-status">
              بيانات تجريبية
            </span>

          </div>
        </div>
      )}

    </div>
  );
}

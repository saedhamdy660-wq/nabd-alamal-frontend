import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

/*
  الأقسام الرئيسية
*/

const categories = [
  {
    key: "الأورام",
    label: "الأورام",
    icon: "🩺",
  },
  {
    key: "الضغط والقلب",
    label: "الضغط والقلب",
    icon: "❤️",
  },
  {
    key: "السكري",
    label: "السكري",
    icon: "🩸",
  },
  {
    key: "الجهاز الهضمي",
    label: "الجهاز الهضمي",
    icon: "🫃",
  },
  {
    key: "البرد والحساسية",
    label: "البرد والحساسية",
    icon: "🤧",
  },
  {
    key: "مسكنات",
    label: "مسكنات",
    icon: "💊",
  },
  {
    key: "المضادات الحيوية",
    label: "المضادات الحيوية",
    icon: "💊",
  },
  {
    key: "الأدوية الجلدية",
    label: "الأدوية الجلدية",
    icon: "🧴",
  },
  {
    key: "الجهاز التنفسي",
    label: "الجهاز التنفسي",
    icon: "🫁",
  },
];

/*
  زر الكل
*/

const allCategory = {
  key: "all",
  label: "الكل",
  icon: "💊",
};

/*
  لون واحد موحّد لكل الأقسام.
*/

const defaultCategoryColor = {
  background: "#edf9f6",
  iconBackground: "#dbf3ee",
};

/*
  توحيد اسم القسم القادم من الـ API.
*/

function normalizeCategory(category) {
  if (!category) {
    return "أخرى";
  }

  const value = String(category).trim();

  const aliases = {
    "مضادات حيوية": "المضادات الحيوية",
    "مضادات حيويه": "المضادات الحيوية",
    "المضادات الحيويه": "المضادات الحيوية",

    "جلدية": "الأدوية الجلدية",
    "أدوية جلدية": "الأدوية الجلدية",

    "تنفسي": "الجهاز التنفسي",
    "أدوية الجهاز التنفسي": "الجهاز التنفسي",

    "هضمي": "الجهاز الهضمي",
    "أدوية الجهاز الهضمي": "الجهاز الهضمي",

    "برد": "البرد والحساسية",
    "الحساسية": "البرد والحساسية",

    "قلب": "الضغط والقلب",
    "ضغط": "الضغط والقلب",
    "أدوية الضغط": "الضغط والقلب",
    "أدوية القلب": "الضغط والقلب",

    "سكر": "السكري",
    "أدوية السكر": "السكري",

    "أدوية الأورام": "الأورام",
  };

  return aliases[value] || value;
}

function getMedicineCategory(medicine) {
  return normalizeCategory(
    medicine?.category ||
      medicine?.medicineCategory ||
      medicine?.typeCategory ||
      ""
  );
}

function getAvailability(medicine) {
  const quantity = medicine?.quantity;

  if (
    quantity === "غير متوفر" ||
    medicine?.status === "unavailable" ||
    medicine?.status === "مطلوب"
  ) {
    return {
      label: "مطلوب",
      className: "medicine-status-requested",
    };
  }

  return {
    label: "متاح",
    className: "medicine-status-available",
  };
}

export default function MedicineExchange() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  /*
    البداية على "الكل"
    والكل يعرض الأقسام فقط.
  */

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    api
      .getMedicines()
      .then((data) => {
        if (!mounted) return;

        setMedicines(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Medicines loading error:", error);

        if (mounted) {
          setMedicines([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  /*
    البحث.
  */

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const results = await api.getMedicines(search.trim());

      setMedicines(Array.isArray(results) ? results : []);

      /*
        بعد البحث نرجع إلى "الكل"
        بحيث تظهر الأقسام فقط.
      */
      setSelectedCategory("all");
    } catch (error) {
      console.error("Medicine search error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
    البحث أثناء الكتابة.
  */

  const searchFilteredMedicines = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return medicines;
    }

    return medicines.filter((medicine) => {
      const name = String(
        medicine?.name ||
          medicine?.medicineName ||
          medicine?.title ||
          ""
      ).toLowerCase();

      const category = String(
        getMedicineCategory(medicine)
      ).toLowerCase();

      return (
        name.includes(value) ||
        category.includes(value)
      );
    });
  }, [medicines, search]);

  /*
    الأدوية الخاصة بالقسم المختار فقط.
  */

  const visibleMedicines = useMemo(() => {
    /*
      "الكل" لا يعرض الأدوية.
    */

    if (selectedCategory === "all") {
      return [];
    }

    return searchFilteredMedicines.filter(
      (medicine) =>
        getMedicineCategory(medicine) ===
        selectedCategory
    );
  }, [
    searchFilteredMedicines,
    selectedCategory,
  ]);

  /*
    عدد الأدوية في كل قسم.
  */

  const categoryCounts = useMemo(() => {
    const counts = {};

    categories.forEach((category) => {
      counts[category.key] =
        searchFilteredMedicines.filter(
          (medicine) =>
            getMedicineCategory(medicine) ===
            category.key
        ).length;
    });

    return counts;
  }, [searchFilteredMedicines]);

  /*
    القسم الحالي.
  */

  const currentCategory =
    categories.find(
      (category) =>
        category.key === selectedCategory
    ) || null;

  /*
    الضغط على القسم.
  */

  const selectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    فتح تفاصيل الدواء.
  */

  const openMedicine = (medicine) => {
    if (!medicine?.id) {
      return;
    }

    navigate(`/medicines/${medicine.id}`);
  };

  return (
    <div
      className="medicine-exchange-page"
      dir="rtl"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="medicine-exchange-header">
        <button
          type="button"
          className="medicine-header-icon"
          aria-label="العودة"
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="medicine-header-title">
          <h1>تبادل الأدوية</h1>

          <p>
            معًا ... لدعم صحتك
          </p>
        </div>

        <div className="medicine-header-logo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.5 3.8a4.7 4.7 0 0 1 6.7 0l5 5a4.7 4.7 0 0 1-6.7 6.7l-5-5a4.7 4.7 0 0 1 0-6.7Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />

            <path
              d="M9.5 20.2a4.7 4.7 0 0 1-6.7 0l-1-1a4.7 4.7 0 0 1 6.7-6.7l1 1a4.7 4.7 0 0 1 0 6.7Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />

            <path
              d="m8 8 8 8"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </header>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <form
        className="medicine-search"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="إبحث عن دواء أو اسم تجاري..."
          aria-label="البحث عن دواء"
        />

        <button
          type="submit"
          aria-label="بحث"
        >
          <svg viewBox="0 0 24 24">
            <circle
              cx="10.8"
              cy="10.8"
              r="6.5"
            />

            <path d="m16 16 5 5" />
          </svg>
        </button>
      </form>

      {/* =====================================================
          CATEGORY PILLS
      ===================================================== */}

      <div className="medicine-category-pills">
        {/* الكل */}
        <button
          type="button"
          className={
            selectedCategory === "all"
              ? "medicine-category-pill active"
              : "medicine-category-pill"
          }
          onClick={() =>
            selectCategory("all")
          }
        >
          الكل
        </button>

        {/* الأقسام */}
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={
              selectedCategory === category.key
                ? "medicine-category-pill active"
                : "medicine-category-pill"
            }
            onClick={() =>
              selectCategory(category.key)
            }
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>
        {/* ===================================================
            MAIN CATEGORIES
        =================================================== */}

        <section className="medicine-section">
          <div className="medicine-section-heading">
            <h2>
              {selectedCategory === "all"
                ? "الأقسام الرئيسية"
                : currentCategory?.label}
            </h2>

            <p>
              {selectedCategory === "all"
                ? "اختر القسم الذي تريد تصفحه"
                : `الأدوية الموجودة في قسم ${currentCategory?.label}`}
            </p>
          </div>

          {/* =================================================
              عندما يكون "الكل" مختار:
              نعرض الأقسام فقط
          ================================================= */}

          {selectedCategory === "all" && (
            <div className="medicine-category-grid">
              {categories.map((category) => {
                return (
                  <button
                    key={category.key}
                    type="button"
                    className="medicine-category-card"
                    onClick={() =>
                      selectCategory(
                        category.key
                      )
                    }
                    style={{
                      background:
                        defaultCategoryColor.background,
                    }}
                  >
                    <div
                      className="medicine-category-card-icon"
                      style={{
                        background:
                          defaultCategoryColor.iconBackground,
                      }}
                    >
                      {category.icon}
                    </div>

                    <div className="medicine-category-card-text">
                      <strong>
                        {category.label}
                      </strong>

                      <span>
                        {categoryCounts[
                          category.key
                        ] || 0}{" "}
                        {categoryCounts[
                          category.key
                        ] === 1
                          ? "دواء"
                          : "أدوية"}
                      </span>
                    </div>

                    <span className="medicine-category-arrow">
                      ‹
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* =================================================
              عندما يتم اختيار قسم:
              لا نعرض الأقسام هنا
              وننتقل لقائمة الأدوية أسفل الصفحة
          ================================================= */}
        </section>

        {/* ===================================================
            MEDICINES
        =================================================== */}

        {selectedCategory !== "all" && (
          <section className="medicine-list-section">
            <div className="medicine-list-heading">
              <div>
                <h2>
                  {currentCategory?.label}
                </h2>

                <p>
                  الأدوية الموجودة في قسم{" "}
                  {currentCategory?.label}
                </p>
              </div>

              <span className="medicine-count-badge">
                {visibleMedicines.length} دواء
              </span>
            </div>

            {loading ? (
              <div className="medicine-empty-state">
                <div className="medicine-spinner"></div>

                <p>
                  جارِ تحميل الأدوية...
                </p>
              </div>
            ) : visibleMedicines.length === 0 ? (
              <div className="medicine-empty-state">
                <div className="medicine-empty-icon">
                  💊
                </div>

                <h3>
                  لا توجد أدوية هنا
                </h3>

                <p>
                  لم يتم العثور على أدوية في هذا القسم حاليًا.
                </p>
              </div>
            ) : (
              <div className="medicine-list">
                {visibleMedicines.map(
                  (medicine) => {
                    const medicineName =
                      medicine?.name ||
                      medicine?.medicineName ||
                      medicine?.title ||
                      "دواء";

                    const medicineCategory =
                      getMedicineCategory(
                        medicine
                      );

                    const status =
                      getAvailability(
                        medicine
                      );

                    return (
                      <button
                        key={medicine.id}
                        type="button"
                        className="medicine-list-item"
                        onClick={() =>
                          openMedicine(
                            medicine
                          )
                        }
                      >
                        <div className="medicine-list-right">
                          <div
                            className="medicine-list-icon"
                            style={{
                              background:
                                defaultCategoryColor.iconBackground,
                            }}
                          >
                            {categories.find(
                              (category) =>
                                category.key ===
                                medicineCategory
                            )?.icon || "💊"}
                          </div>

                          <div className="medicine-list-info">
                            <strong>
                              {medicineName}
                            </strong>

                            <span>
                              {medicineCategory}
                            </span>

                            <small>
                              {medicine?.quantity
                                ? `الكمية: ${medicine.quantity}`
                                : "اضغط لعرض التفاصيل"}
                            </small>
                          </div>
                        </div>

                        <div className="medicine-list-left">
                          <span
                            className={
                              `medicine-status ${status.className}`
                            }
                          >
                            {status.label}
                          </span>

                          <span className="medicine-list-arrow">
                            ‹
                          </span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .medicine-exchange-page {
          min-height: 100vh;
          padding:
            18px
            14px
            110px;

          background:
            radial-gradient(
              circle at 12% 4%,
              rgba(180, 241, 232, .48),
              transparent 27%
            ),
            radial-gradient(
              circle at 90% 20%,
              rgba(192, 244, 237, .42),
              transparent 27%
            ),
            linear-gradient(
              180deg,
              #f4fffd 0%,
              #eefbf8 48%,
              #e7f8f5 100%
            );

          color: #174c50;
          overflow-x: hidden;
        }

        .medicine-exchange-header {
          display: grid;
          grid-template-columns: 52px 1fr 52px;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }

        .medicine-header-icon,
        .medicine-header-logo {
          width: 50px;
          height: 50px;

          border: 0;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #159b8a;

          background:
            rgba(222, 249, 244, .82);

          box-shadow:
            0 8px 22px
              rgba(35, 139, 128, .08),
            inset 0 1px 0
              rgba(255,255,255,.9);
        }

        .medicine-header-icon {
          cursor: pointer;
        }

        .medicine-header-icon svg {
          width: 25px;
          height: 25px;

          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .medicine-header-logo {
          color: #17a391;
        }

        .medicine-header-logo svg {
          width: 29px;
          height: 29px;
        }

        .medicine-header-title {
          text-align: center;
        }

        .medicine-header-title h1 {
          margin: 0;

          color: #124c53;

          font-size: 27px;
          line-height: 1.25;
          font-weight: 900;
        }

        .medicine-header-title p {
          margin:
            4px
            0
            0;

          color: #8aa7a6;

          font-size: 13px;
          font-weight: 600;
        }

        .medicine-search {
          width: 100%;
          height: 58px;

          display: flex;
          align-items: center;

          margin-bottom: 16px;

          border-radius: 30px;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid
            rgba(255,255,255,.96);

          box-shadow:
            0 10px 25px
              rgba(44, 135, 126, .07),
            inset 0 1px 0
              rgba(255,255,255,.95);

          overflow: hidden;
        }

        .medicine-search input {
          flex: 1;

          height: 100%;

          padding:
            0
            18px;

          border: 0;
          outline: 0;

          background: transparent;

          color: #174c50;

          font-family: inherit;
          font-size: 15px;
          font-weight: 600;

          text-align: right;
        }

        .medicine-search input::placeholder {
          color: #91aaaa;
        }

        .medicine-search button {
          width: 55px;
          height: 55px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0;
          background: transparent;

          color: #5e8488;

          cursor: pointer;
        }

        .medicine-search button svg {
          width: 28px;
          height: 28px;

          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }

        .medicine-category-pills {
          display: flex;

          gap: 9px;

          overflow-x: auto;

          padding:
            2px
            2px
            7px;

          margin-bottom: 15px;

          scrollbar-width: none;
        }

        .medicine-category-pills::-webkit-scrollbar {
          display: none;
        }

        .medicine-category-pill {
          flex-shrink: 0;

          padding:
            10px
            18px;

          border: 0;

          border-radius: 24px;

          background:
            rgba(231,248,245,.78);

          color: #39747a;

          font-family: inherit;
          font-size: 13px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,.75);
        }

        .medicine-category-pill.active {
          color: white;

          background:
            linear-gradient(
              135deg,
              #18ae9c,
              #109886
            );

          box-shadow:
            0 8px 18px
              rgba(20, 155, 138, .18);
        }

        .medicine-section,
        .medicine-list-section {
          padding:
            18px
            14px;

          margin-top: 12px;

          border-radius: 28px;

          background:
            rgba(255,255,255,.78);

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 12px 32px
              rgba(39,132,124,.07),
            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .medicine-section-heading {
          margin-bottom: 15px;
          text-align: right;
        }

        .medicine-section-heading h2,
        .medicine-list-heading h2 {
          margin: 0;

          color: #174c50;

          font-size: 21px;
          line-height: 1.4;

          font-weight: 900;
        }

        .medicine-section-heading p,
        .medicine-list-heading p {
          margin:
            4px
            0
            0;

          color: #91a9aa;

          font-size: 12px;
          line-height: 1.6;
        }

        .medicine-category-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 12px;
        }

        .medicine-category-card {
          min-height: 88px;

          position: relative;

          display: flex;
          align-items: center;

          gap: 10px;

          padding:
            12px
            10px;

          border:
            1px solid
            rgba(213,238,233,.85);

          border-radius: 20px;

          color: #205b60;

          font-family: inherit;

          text-align: right;

          cursor: pointer;

          transition:
            transform .18s ease,
            box-shadow .18s ease,
            border-color .18s ease;
        }

        .medicine-category-card:active {
          transform: scale(.98);
        }

        .medicine-category-card.active {
          border-color:
            rgba(25,174,157,.32);

          box-shadow:
            0 8px 22px
              rgba(28,158,144,.10);
        }

        .medicine-category-card-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          font-size: 21px;
        }

        .medicine-category-card-text {
          min-width: 0;
          flex: 1;
        }

        .medicine-category-card-text strong {
          display: block;

          color: #17545a;

          font-size: 13px;
          line-height: 1.4;
          font-weight: 900;

          word-break: break-word;
        }

        .medicine-category-card-text span {
          display: block;

          margin-top: 4px;

          color: #8ba5a5;

          font-size: 11px;
        }

        .medicine-category-arrow {
          color: #3d8a88;

          font-size: 29px;
          line-height: 1;
        }

        .medicine-list-section {
          margin-top: 15px;
        }

        .medicine-list-heading {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 12px;

          margin-bottom: 15px;
        }

        .medicine-count-badge {
          flex-shrink: 0;

          padding:
            8px
            12px;

          border-radius: 20px;

          color: #159a89;

          background:
            #ddf7f1;

          font-size: 11px;
          font-weight: 900;
        }

        .medicine-list {
          display: flex;
          flex-direction: column;

          gap: 10px;
        }

        .medicine-list-item {
          width: 100%;

          min-height: 76px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          padding:
            10px
            11px;

          border:
            1px solid
            rgba(221,240,237,.9);

          border-radius: 21px;

          background:
            rgba(255,255,255,.86);

          color: #174c50;

          font-family: inherit;

          text-align: right;

          cursor: pointer;

          box-shadow:
            0 5px 17px
              rgba(39,132,124,.05),
            inset 0 1px 0
              rgba(255,255,255,.95);

          transition:
            transform .16s ease,
            box-shadow .16s ease;
        }

        .medicine-list-item:active {
          transform: scale(.985);
        }

        .medicine-list-right {
          min-width: 0;

          display: flex;
          align-items: center;

          gap: 10px;
        }

        .medicine-list-icon {
          width: 45px;
          height: 45px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          font-size: 20px;
        }

        .medicine-list-info {
          min-width: 0;
        }

        .medicine-list-info strong {
          display: block;

          max-width: 180px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #174c50;

          font-size: 14px;
          font-weight: 900;
        }

        .medicine-list-info span {
          display: block;

          margin-top: 2px;

          color: #5f8b8d;

          font-size: 11px;
          font-weight: 700;
        }

        .medicine-list-info small {
          display: block;

          margin-top: 3px;

          color: #99adae;

          font-size: 10px;
        }

        .medicine-list-left {
          display: flex;
          align-items: center;

          gap: 5px;
        }

        .medicine-status {
          padding:
            7px
            10px;

          border-radius: 17px;

          font-size: 10px;
          font-weight: 900;
        }

        .medicine-status-available {
          color: #13927f;
          background: #ddf7f0;
        }

        .medicine-status-requested {
          color: #b45d69;
          background: #ffe7eb;
        }

        .medicine-list-arrow {
          color: #24877f;

          font-size: 29px;
          line-height: 1;
        }

        .medicine-empty-state {
          min-height: 180px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .medicine-spinner {
          width: 34px;
          height: 34px;

          margin-bottom: 10px;

          border:
            4px solid
            #d9f1ed;

          border-top-color:
            #159b8a;

          border-radius: 50%;

          animation:
            medicineSpin .8s
            linear infinite;
        }

        .medicine-empty-icon {
          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 8px;

          border-radius: 50%;

          background: #e1f6f1;

          font-size: 26px;
        }

        .medicine-empty-state h3 {
          margin: 0;

          color: #20565b;

          font-size: 16px;
          font-weight: 900;
        }

        .medicine-empty-state p {
          margin:
            5px
            0
            12px;

          color: #91a7a8;

          font-size: 12px;
        }

        @keyframes medicineSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 380px) {
          .medicine-exchange-page {
            padding:
              14px
              10px
              100px;
          }

          .medicine-header-title h1 {
            font-size: 24px;
          }

          .medicine-header-icon,
          .medicine-header-logo {
            width: 46px;
            height: 46px;
          }

          .medicine-category-grid {
            gap: 8px;
          }

          .medicine-category-card {
            min-height: 82px;
            padding: 9px 7px;
            gap: 7px;
          }

          .medicine-category-card-icon {
            width: 37px;
            height: 37px;
            font-size: 18px;
          }

          .medicine-category-card-text strong {
            font-size: 11px;
          }

          .medicine-category-card-text span {
            font-size: 10px;
          }

          .medicine-list-info strong {
            max-width: 145px;
            font-size: 13px;
          }

          .medicine-status {
            padding:
              6px
              8px;
          }
        }

        /* ================= DARK MODE ================= */

        html.nabd-dark .medicine-exchange-page,
        body.nabd-dark .medicine-exchange-page {
          background:
            radial-gradient(
              circle at 12% 4%,
              rgba(21,155,138,.12),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #071a1d 0%,
              #092326 100%
            );

          color: #e9ffff;
        }

        html.nabd-dark .medicine-header-title h1,
        body.nabd-dark .medicine-header-title h1,
        html.nabd-dark .medicine-section-heading h2,
        body.nabd-dark .medicine-section-heading h2,
        html.nabd-dark .medicine-list-heading h2,
        body.nabd-dark .medicine-list-heading h2 {
          color: #e9ffff;
        }

        html.nabd-dark .medicine-header-title p,
        body.nabd-dark .medicine-header-title p,
        html.nabd-dark .medicine-section-heading p,
        body.nabd-dark .medicine-section-heading p,
        html.nabd-dark .medicine-list-heading p {
          color: #9bbdbc;
        }

        html.nabd-dark .medicine-header-icon,
        body.nabd-dark .medicine-header-icon,
        html.nabd-dark .medicine-header-logo,
        body.nabd-dark .medicine-header-logo {
          background: rgba(18,61,64,.85);
          color: #65d7c7;
        }

        html.nabd-dark .medicine-search,
        body.nabd-dark .medicine-search,
        html.nabd-dark .medicine-section,
        body.nabd-dark .medicine-section,
        html.nabd-dark .medicine-list-section,
        body.nabd-dark .medicine-list-section {
          background: rgba(13,42,46,.92);
          border-color: rgba(170,230,225,.12);
        }

        html.nabd-dark .medicine-search input,
        body.nabd-dark .medicine-search input {
          color: #e9ffff;
        }

        html.nabd-dark .medicine-search input::placeholder,
        body.nabd-dark .medicine-search input::placeholder {
          color: #7f9f9e;
        }

        html.nabd-dark .medicine-category-pill,
        body.nabd-dark .medicine-category-pill {
          background: #123d40;
          color: #a9cfcb;
        }

        html.nabd-dark .medicine-category-pill.active,
        body.nabd-dark .medicine-category-pill.active {
          color: white;
          background:
            linear-gradient(
              135deg,
              #159b8a,
              #087d70
            );
        }

        html.nabd-dark .medicine-category-card,
        body.nabd-dark .medicine-category-card {
          border-color: rgba(170,230,225,.12);
        }

        html.nabd-dark .medicine-category-card-text strong,
        body.nabd-dark .medicine-category-card-text strong,
        html.nabd-dark .medicine-list-info strong,
        body.nabd-dark .medicine-list-info strong {
          color: #e5ffff;
        }

        html.nabd-dark .medicine-category-card-text span,
        body.nabd-dark .medicine-category-card-text span,
        html.nabd-dark .medicine-list-info span,
        body.nabd-dark .medicine-list-info span,
        html.nabd-dark .medicine-list-info small,
        body.nabd-dark .medicine-list-info small {
          color: #91b5b3;
        }

        html.nabd-dark .medicine-list-item,
        body.nabd-dark .medicine-list-item {
          background: #0d2a2e;
          border-color: rgba(170,230,225,.12);
        }

        html.nabd-dark .medicine-count-badge,
        body.nabd-dark .medicine-count-badge {
          background: #123d40;
          color: #62d7c6;
        }
      `}</style>
    </div>
  );
}

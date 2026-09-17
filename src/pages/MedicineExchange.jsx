import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const categories = [
  { key: "all", label: "الكل", icon: "💊" },
  { key: "الأورام", label: "الأورام", icon: "🩺" },
  { key: "الضغط والقلب", label: "الضغط والقلب", icon: "❤️" },
  { key: "السكري", label: "السكري", icon: "🩸" },
  { key: "الجهاز الهضمي", label: "الجهاز الهضمي", icon: "🫃" },
  { key: "البرد والحساسية", label: "البرد والحساسية", icon: "🤧" },
  { key: "مسكنات", label: "مسكنات", icon: "💊" },
  { key: "المضادات الحيوية", label: "المضادات الحيوية", icon: "💊" },
  { key: "الأدوية الجلدية", label: "الأدوية الجلدية", icon: "🧴" },
  { key: "الجهاز التنفسي", label: "الجهاز التنفسي", icon: "🫁" },
];

const normalizeCategory = (category) => {
  if (!category) return "";

  const value = String(category).trim();

  const aliases = {
    أورام: "الأورام",
    "أمراض الأورام": "الأورام",

    قلب: "الضغط والقلب",
    القلب: "الضغط والقلب",
    "الضغط والقلب": "الضغط والقلب",

    سكري: "السكري",
    السكر: "السكري",
    السكري: "السكري",

    "الجهاز الهضمي": "الجهاز الهضمي",
    هضمي: "الجهاز الهضمي",

    "البرد والحساسية": "البرد والحساسية",
    البرد: "البرد والحساسية",
    الحساسية: "البرد والحساسية",

    مسكنات: "مسكنات",
    مسكن: "مسكنات",

    "المضادات الحيوية": "المضادات الحيوية",
    مضادات: "المضادات الحيوية",

    "الأدوية الجلدية": "الأدوية الجلدية",
    جلدية: "الأدوية الجلدية",

    "الجهاز التنفسي": "الجهاز التنفسي",
    تنفسي: "الجهاز التنفسي",
  };

  return aliases[value] || value;
};

const getMedicineCategory = (medicine) => {
  return normalizeCategory(
    medicine?.category ||
      medicine?.medicineCategory ||
      medicine?.typeCategory ||
      ""
  );
};

export default function MedicineExchange() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getMedicines(searchValue);

      setMedicines(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading medicines:", err);
      setError("حدث خطأ أثناء تحميل الأدوية");
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const value = search.trim();

    await loadMedicines(value);

    // عند البحث نرجع للكل
    // والكل هنا يعرض الأقسام فقط إذا لم يتم اختيار قسم
    setSelectedCategory("all");
  };

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);

    // عند الضغط على الكل نمسح البحث
    if (categoryKey === "all") {
      setSearch("");
      loadMedicines("");
    }
  };

  const filteredMedicines = useMemo(() => {
    if (selectedCategory === "all") {
      // مهم جدًا:
      // "الكل" لا يعرض أي دواء
      return [];
    }

    return medicines.filter((medicine) => {
      return getMedicineCategory(medicine) === selectedCategory;
    });
  }, [medicines, selectedCategory]);

  const getCategoryCount = (categoryKey) => {
    if (categoryKey === "all") {
      return medicines.length;
    }

    return medicines.filter(
      (medicine) => getMedicineCategory(medicine) === categoryKey
    ).length;
  };

  return (
    <div className="medicine-exchange-page">
      {/* Header */}
      <div className="medicine-header">
        <div>
          <h1>تبادل الأدوية</h1>
          <p>تبرع بالأدوية التي لا تحتاجها أو ابحث عن دواء تحتاجه</p>
        </div>
      </div>

      {/* Search */}
      <form className="medicine-search" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن اسم الدواء..."
        />

        <button type="submit">
          🔍 بحث
        </button>
      </form>

      {/* Categories Filter */}
      <div className="medicine-category-filter">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={
              selectedCategory === category.key
                ? "medicine-category-btn active"
                : "medicine-category-btn"
            }
            onClick={() => handleCategoryClick(category.key)}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="medicine-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="medicine-loading">
          جاري تحميل البيانات...
        </div>
      ) : (
        <>
          {/* ========================= */}
          {/* ALL = CATEGORIES ONLY */}
          {/* ========================= */}

          {selectedCategory === "all" && (
            <section className="medicine-categories-section">
              <div className="section-title">
                <h2>الأقسام الرئيسية</h2>
                <p>اختر القسم لعرض الأدوية الموجودة بداخله</p>
              </div>

              <div className="medicine-categories-grid">
                {categories
                  .filter((category) => category.key !== "all")
                  .map((category) => {
                    const count = getCategoryCount(category.key);

                    return (
                      <button
                        key={category.key}
                        type="button"
                        className="medicine-category-card"
                        onClick={() =>
                          handleCategoryClick(category.key)
                        }
                      >
                        <div className="medicine-category-icon">
                          {category.icon}
                        </div>

                        <div className="medicine-category-info">
                          <h3>{category.label}</h3>

                          <span>
                            {count} أدوية
                          </span>
                        </div>

                        <div className="medicine-category-arrow">
                          ←
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>
          )}

          {/* ========================= */}
          {/* SELECTED CATEGORY */}
          {/* ========================= */}

          {selectedCategory !== "all" && (
            <section className="medicine-list-section">
              <div className="section-title">
                <h2>
                  {categories.find(
                    (category) =>
                      category.key === selectedCategory
                  )?.icon}{" "}
                  {selectedCategory}
                </h2>

                <p>
                  الأدوية المتاحة في قسم {selectedCategory}
                </p>
              </div>

              {filteredMedicines.length === 0 ? (
                <div className="medicine-empty">
                  <div className="medicine-empty-icon">
                    💊
                  </div>

                  <h3>لا توجد أدوية</h3>

                  <p>
                    لا توجد أدوية متاحة حاليًا في هذا القسم.
                  </p>
                </div>
              ) : (
                <div className="medicine-list">
                  {filteredMedicines.map((medicine) => (
                    <button
                      key={medicine.id}
                      type="button"
                      className="medicine-card"
                      onClick={() =>
                        navigate(`/medicines/${medicine.id}`)
                      }
                    >
                      <div className="medicine-card-icon">
                        💊
                      </div>

                      <div className="medicine-card-info">
                        <h3>
                          {medicine.name ||
                            medicine.medicineName ||
                            "دواء"}
                        </h3>

                        {medicine.dosage && (
                          <p>
                            الجرعة: {medicine.dosage}
                          </p>
                        )}

                        {medicine.description && (
                          <p>
                            {medicine.description}
                          </p>
                        )}

                        <span className="medicine-card-category">
                          {getMedicineCategory(medicine)}
                        </span>
                      </div>

                      <div className="medicine-card-arrow">
                        ←
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

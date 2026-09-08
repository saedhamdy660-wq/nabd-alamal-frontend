import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

const filters = [
  { key: "all", label: "الكل" },
  { key: "available", label: "متاح" },
  { key: "requested", label: "مطلوب" },
];

const categoryStyle = {
  "المضادات الحيوية": { icon: "💊", bg: "#fdecec" },
  "أدوية مزمنة": { icon: "💉", bg: "#e6f1fb" },
  "فيتامينات": { icon: "🧴", bg: "#eaf3de" },
  "مسكنات": { icon: "💊", bg: "#fbeaf0" },
};

export default function MedicineExchange() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    api.getMedicines().then(setMedicines).catch(() => {});
  }, []);

  const doSearch = async (e) => {
    e.preventDefault();
    const results = await api.getMedicines(search);
    setMedicines(results);
  };

  const visible = medicines.filter((m) => {
    if (filter === "available") return m.quantity !== "غير متوفر";
    if (filter === "requested") return m.quantity === "غير متوفر";
    return true;
  });

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>تبادل الأدوية</h2>

      <form onSubmit={doSearch} className="search-bar">
        <span>🔍</span>
        <input
          placeholder="ابحث عن دواء أو اسم تجاري..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="tabs">
        {filters.map((f) => (
          <div key={f.key} className={`tab ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </div>
        ))}
      </div>

      {visible.map((m) => {
        const style = categoryStyle[m.category] || { icon: "💊", bg: "var(--primary-light)" };
        return (
          <div key={m.id} className="list-item" onClick={() => navigate(`/medicines/${m.id}`)} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {style.icon}
              </div>
              <div>
                <strong>{m.name}</strong>
                <p className="muted" style={{ margin: "2px 0" }}>📍 {m.distanceKm} كم</p>
                <p className="muted" style={{ margin: 0 }}>🗓️ منتهي الصلاحية: {m.expiry}</p>
              </div>
            </div>
            <span className="badge">{m.quantity === "غير متوفر" ? "مطلوب" : "متاح"}</span>
          </div>
        );
      })}
    </div>
  );
}

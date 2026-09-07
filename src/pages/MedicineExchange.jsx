import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

const filters = [
  { key: "all", label: "الكل" },
  { key: "available", label: "متاح" },
  { key: "requested", label: "مطلوب" },
];

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
      <h2 style={{ marginBottom: 16 }}>تبادل الأدوية</h2>

      <form onSubmit={doSearch} className="search-bar">
        <span>🔍</span>
        <input
          placeholder="ابحث عن دواء أو اسم مستخدم..."
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

      {visible.map((m) => (
        <div key={m.id} className="list-item" onClick={() => navigate(`/medicines/${m.id}`)} style={{ cursor: "pointer", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ fontSize: 26 }}>💊</div>
            <div>
              <strong>{m.name}</strong>
              <p className="muted">{m.quantity} · على بعد {m.distanceKm} كم</p>
              <p className="muted">تاريخ الصلاحية: {m.expiry}</p>
            </div>
          </div>
          <span className="badge">{m.quantity === "غير متوفر" ? "مطلوب" : "متاح"}</span>
        </div>
      ))}
    </div>
  );
}

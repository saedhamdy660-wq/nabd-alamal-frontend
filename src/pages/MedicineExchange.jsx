import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function MedicineExchange() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getMedicines().then(setMedicines).catch(() => {});
  }, []);

  const doSearch = async (e) => {
    e.preventDefault();
    const results = await api.getMedicines(search);
    setMedicines(results);
  };

  return (
    <div className="page">
      <h2>💊 تبادل الأدوية</h2>
      <form onSubmit={doSearch} style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="ابحث عن دواء (اسم الدواء أو الحالة الصحية)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }}
        />
      </form>

      {medicines.map((m) => (
        <div key={m.id} className="list-item" onClick={() => navigate(`/medicines/${m.id}`)} style={{ cursor: "pointer" }}>
          <div>
            <strong>{m.name}</strong>
            <p className="muted">متوفر لدى: {m.donor}</p>
            <p className="muted">على بعد {m.distanceKm} كم</p>
          </div>
          <span className="badge">{m.category}</span>
        </div>
      ))}
    </div>
  );
}

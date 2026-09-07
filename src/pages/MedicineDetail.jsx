import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api.js";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("nabd_favorites") || "[]");
  } catch {
    return [];
  }
}

export default function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getMedicine(id).then(setMedicine).catch(() => {});
    setIsFav(getFavorites().includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favs = getFavorites();
    const updated = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    localStorage.setItem("nabd_favorites", JSON.stringify(updated));
    setIsFav(!isFav);
  };

  if (!medicine) return <div className="page">جارِ التحميل...</div>;

  return (
    <div className="page">
      <Link to="/medicines" className="btn outline" style={{ display: "block", marginBottom: 14 }}>
        ← رجوع
      </Link>
      <h2>تفاصيل الدواء</h2>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>{medicine.name}</h3>
          <span onClick={toggleFavorite} style={{ fontSize: 22, cursor: "pointer" }}>
            {isFav ? "❤️" : "🤍"}
          </span>
        </div>
        <p className="muted">الفئة: {medicine.category}</p>
        <p className="muted">الكمية المتاحة: {medicine.quantity}</p>
        <p className="muted">صالح حتى: {medicine.expiry}</p>
        <p className="muted">متوفر لدى: {medicine.donor}</p>
        <p className="muted">على بعد {medicine.distanceKm} كم</p>

        <button className="btn" onClick={() => navigate(`/pharmacy/${medicine.id}`)}>
          طلب الدواء
        </button>
      </div>
    </div>
  );
}

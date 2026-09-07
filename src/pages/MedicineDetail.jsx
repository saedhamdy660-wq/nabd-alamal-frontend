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
      <Link to="/medicines" className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>

      <img
        src={`https://placehold.co/600x360/e6f7f4/0aa88f?font=roboto&text=${encodeURIComponent(medicine.name)}`}
        alt={medicine.name}
        style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius-card)", marginBottom: 16 }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>{medicine.name}</h2>
        <span onClick={toggleFavorite} style={{ fontSize: 22, cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</span>
      </div>
      <span className="badge">{medicine.quantity === "غير متوفر" ? "مطلوب" : "متاح"}</span>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="muted">{medicine.quantity}</p>
        <p className="muted">{medicine.distanceKm} كم</p>
        <p className="muted">تاريخ الصلاحية: {medicine.expiry}</p>
      </div>

      <div className="card">
        <strong>طريقة الاستخدام</strong>
        <p className="muted" style={{ marginTop: 6 }}>حسب وصف الطبيب</p>
      </div>

      <div className="card urgent">
        ⚠️ يجب التأكد من صلاحية الدواء قبل الاستلام
      </div>

      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="avatar">🙂</div>
        <div>
          <strong>{medicine.donor}</strong>
          <p className="muted">المتبرع بالدواء</p>
        </div>
      </div>

      <button className="btn" onClick={() => navigate(`/pharmacy/${medicine.id}`)}>
        عرض أقرب صيدلية
      </button>
    </div>
  );
}

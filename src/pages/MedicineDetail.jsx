import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api.js";

function getFavorites() {
  let ids = JSON.parse(localStorage.getItem("nabd_favorites") || "null");
  if (ids === null) {
    ids = ["m1", "m2", "m3"];
    localStorage.setItem("nabd_favorites", JSON.stringify(ids));
  }
  return ids;
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

      <div className="card" style={{ marginTop: 16, display: "flex", justifyContent: "space-between", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 18 }}>📍</div>
          <p className="muted" style={{ margin: "4px 0 0" }}>{medicine.distanceKm} كم</p>
        </div>
        <div>
          <div style={{ fontSize: 18 }}>📦</div>
          <p className="muted" style={{ margin: "4px 0 0" }}>{medicine.quantity}</p>
        </div>
        <div>
          <div style={{ fontSize: 18 }}>🗓️</div>
          <p className="muted" style={{ margin: "4px 0 0" }}>{medicine.expiry}</p>
        </div>
      </div>

      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="avatar">🙂</div>
        <div>
          <strong>{medicine.donor}</strong>
          <p className="muted" style={{ margin: 0 }}>متبرع موثوق ✅</p>
        </div>
      </div>

      <div className="card">
        <strong>طريقة الاستلام</strong>
        <p className="muted" style={{ margin: "8px 0 4px" }}>🏥 التسليم عبر أقرب صيدلية شريكة</p>
        <p className="muted" style={{ margin: 0 }}>سيتم التحقق من الدواء والتأكد من صلاحيته قبل تسليمه للمريض</p>
      </div>

      <button className="btn" onClick={() => navigate(`/pharmacy/${medicine.id}`)}>
        عرض أقرب صيدلية
      </button>
    </div>
  );
}

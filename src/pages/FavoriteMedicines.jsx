import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function FavoriteMedicines() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("nabd_favorites") || "[]");
    api.getMedicines().then((all) => {
      setFavorites(all.filter((m) => ids.includes(m.id)));
    });
  }, []);

  return (
    <div className="page">
      <Link to="/profile" className="btn outline" style={{ display: "block", marginBottom: 14 }}>
        ← رجوع
      </Link>
      <h2 style={{ marginBottom: 16 }}>أدويتي المفضلة</h2>

      {favorites.length === 0 && <p className="muted">لا يوجد أدوية مفضلة بعد.</p>}

      {favorites.map((m) => (
        <div key={m.id} className="list-item" onClick={() => navigate(`/medicines/${m.id}`)} style={{ cursor: "pointer" }}>
          <div>
            <strong>{m.name}</strong>
            <p className="muted">{m.quantity === "غير متوفر" ? "غير متوفر" : "متوفر"}</p>
          </div>
          <span style={{ fontSize: 20 }}>{m.quantity === "غير متوفر" ? "🤍" : "❤️"}</span>
        </div>
      ))}
    </div>
  );
}

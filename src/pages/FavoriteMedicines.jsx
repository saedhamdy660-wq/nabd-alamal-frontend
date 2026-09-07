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
      <h2>❤️ الأدوية المفضلة</h2>

      {favorites.length === 0 && <p className="muted">لا يوجد أدوية مفضلة بعد.</p>}

      {favorites.map((m) => (
        <div key={m.id} className="list-item" onClick={() => navigate(`/medicines/${m.id}`)} style={{ cursor: "pointer" }}>
          <div>
            <strong>{m.name}</strong>
            <p className="muted">متوفر لدى: {m.donor}</p>
          </div>
          <span className="badge">{m.category}</span>
        </div>
      ))}
    </div>
  );
}

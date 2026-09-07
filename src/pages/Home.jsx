import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const [urgentRequests, setUrgentRequests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      api.getUser().then(setUser).catch(() => {});
    }
    api.getBloodRequests().then(setUrgentRequests).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="header" style={{ marginInline: -16, marginTop: -16 }}>
        <h1>❤️ نبض الأمل</h1>
        <span>🔔</span>
      </div>

      <div className="card">
        <p>مرحبًا، {user?.name || "بك"} 👋</p>
        <p className="muted">معًا نساهم في إنقاذ حياة</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Link to="/blood" style={{ flex: 1, textDecoration: "none" }}>
          <div className="card urgent" style={{ textAlign: "center" }}>
            🩸<br />التبرع بالدم والصفائح
          </div>
        </Link>
        <Link to="/medicines" style={{ flex: 1, textDecoration: "none" }}>
          <div className="card" style={{ textAlign: "center" }}>
            💊<br />تبادل الأدوية
          </div>
        </Link>
      </div>

      <h3>طلبات عاجلة قريبة منك</h3>
      {urgentRequests.map((r) => (
        <Link key={r.id} to={`/track/${r.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card urgent">
            <strong>🚨 حالة إلى فصيلة دم {r.bloodType}</strong>
            <p className="muted">{r.hospital}</p>
            <p className="muted">على بعد {r.distanceKm} كم</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

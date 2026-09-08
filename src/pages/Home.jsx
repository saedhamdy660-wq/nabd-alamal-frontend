import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const avatar = localStorage.getItem("nabd_avatar");

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
    <div>
      <div className="header">
        <h1>❤️ نبض الأمل</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/notifications" style={{ fontSize: 20 }}>🔔</Link>
          <Link
            to="/profile"
            className="avatar"
            style={{
              backgroundImage: avatar ? `url(${avatar})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!avatar && "🙂"}
          </Link>
        </div>
      </div>

      <div className="page">
        <h2 style={{ margin: "0 0 2px" }}>مرحبًا، {user?.name || "بك"} 👋</h2>
        <p className="muted" style={{ marginBottom: 18 }}>معًا ننقذ حياة</p>

        <div className="search-bar">
          <span>🔍</span>
          <input placeholder="ابحث عن دواء أو فصيلة دم..." />
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <Link to="/blood" className="service-card emergency">
            <div className="icon">🩸</div>
            <div className="title">التبرع بالدم والصفائح</div>
          </Link>
          <Link to="/medicines" className="service-card neutral">
            <div className="icon">💊</div>
            <div className="title">تبادل الأدوية</div>
            <div className="muted">أدوية غير متوفرة</div>
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>طلبات عاجلة قريبة منك</h3>
          <Link to="/blood" className="muted" style={{ fontSize: 13 }}>عرض الكل</Link>
        </div>

        {urgentRequests.map((r) => (
          <Link key={r.id} to={`/track/${r.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card urgent" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>🩸 فصيلة دم {r.bloodType}</strong>
                <p className="muted" style={{ margin: "4px 0 0" }}>{r.hospital}</p>
                <p className="muted" style={{ margin: 0 }}>على بعد {r.distanceKm} كم</p>
              </div>
              <span style={{ fontSize: 18 }}>←</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

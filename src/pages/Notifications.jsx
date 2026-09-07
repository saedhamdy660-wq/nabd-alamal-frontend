import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

const styles = {
  urgent: { icon: "🔴", border: "1px solid #f7cccc", bg: "var(--danger-light)" },
  success: { icon: "🟢", border: "1px solid #d7f0ea", bg: "var(--primary-light)" },
  info: { icon: "🔵", border: "1px solid var(--border)", bg: "var(--card)" },
};

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getNotifications().then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>الإشعارات</h2>
        <Link to="/notification-settings">⚙️</Link>
      </div>
      {items.map((n) => {
        const s = styles[n.type] || styles.info;
        return (
          <div key={n.id} className="card" style={{ background: s.bg, border: s.border }}>
            <strong>{s.icon} {n.title}</strong>
            <p className="muted">{n.body}</p>
            <p className="muted">{n.time}</p>
          </div>
        );
      })}
    </div>
  );
}

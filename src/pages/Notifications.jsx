import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

const icons = { urgent: "🚨", success: "✅", info: "ℹ️" };

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getNotifications().then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>🔔 الإشعارات</h2>
        <Link to="/notification-settings">⚙️</Link>
      </div>
      {items.map((n) => (
        <div key={n.id} className="card">
          <strong>{icons[n.type] || "🔔"} {n.title}</strong>
          <p className="muted">{n.body}</p>
          <p className="muted">{n.time}</p>
        </div>
      ))}
    </div>
  );
}

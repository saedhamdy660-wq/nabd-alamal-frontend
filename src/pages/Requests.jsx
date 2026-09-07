import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const statusColor = {
  "تم التسليم": "#0f766e",
  "قيد المراجعة": "#d97706",
  "ملغى": "#94a3b8",
  "مكتمل": "#0f766e",
};

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.getMyRequests().then(setRequests).catch(() => {});
  }, []);

  return (
    <div className="page">
      <h2>📋 طلباتي</h2>
      {requests.map((r) => (
        <div key={r.id} className="list-item">
          <div>
            <strong>{r.title}</strong>
            <p className="muted">{r.date}</p>
          </div>
          <span className="badge" style={{ background: "#f1f5f9", color: statusColor[r.status] || "#334155" }}>
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

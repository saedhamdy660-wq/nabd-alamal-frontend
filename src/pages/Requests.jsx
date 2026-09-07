import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const tabs = [
  { key: "all", label: "الكل" },
  { key: "medicine", label: "الدواء" },
  { key: "blood", label: "الدم والمساعدات" },
];

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    api.getMyRequests().then(setRequests).catch(() => {});
  }, []);

  const visible = requests.filter((r) => {
    if (tab === "medicine") return r.type === "دواء";
    if (tab === "blood") return r.type === "دم";
    return true;
  });

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16 }}>الطلبات السابقة</h2>

      <div className="tabs">
        {tabs.map((t) => (
          <div key={t.key} className={`tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label}
          </div>
        ))}
      </div>

      {visible.map((r) => (
        <div key={r.id} className="list-item">
          <div>
            <strong>{r.title}</strong>
            <p className="muted">{r.date}</p>
          </div>
          <span className="badge">{r.status}</span>
        </div>
      ))}
    </div>
  );
}

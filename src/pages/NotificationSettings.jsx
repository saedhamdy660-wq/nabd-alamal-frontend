import React, { useState } from "react";
import { Link } from "react-router-dom";

const defaultSettings = [
  { key: "urgent", label: "تنبيهات حالات الطوارئ", checked: true },
  { key: "orders", label: "تحديثات حالة الطلبات", checked: true },
  { key: "platform", label: "رسائل المنصة", checked: true },
  { key: "promo", label: "عروض وتذكيرات", checked: false },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [radius, setRadius] = useState(5);

  const toggle = (key) => {
    setSettings(settings.map((s) => (s.key === key ? { ...s, checked: !s.checked } : s)));
  };

  return (
    <div className="page">
      <Link to="/profile" className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>
      <h2 style={{ marginBottom: 16 }}>إعدادات الإشعارات</h2>

      {settings.map((s) => (
        <div key={s.key} className="list-item">
          <span>{s.label}</span>
          <input type="checkbox" checked={s.checked} onChange={() => toggle(s.key)} style={{ width: 20, height: 20 }} />
        </div>
      ))}

      <div className="card" style={{ marginTop: 8 }}>
        <strong>نطاق التنبيهات الجغرافية</strong>
        <p className="muted" style={{ margin: "4px 0 10px" }}>{radius} كم</p>
        <input
          type="range"
          min="1"
          max="20"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

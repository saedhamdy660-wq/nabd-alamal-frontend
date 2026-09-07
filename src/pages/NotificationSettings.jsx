import React, { useState } from "react";
import { Link } from "react-router-dom";

const defaultSettings = [
  { key: "urgent", label: "تنبيهات التبرع العاجلة", checked: true },
  { key: "medicine", label: "تحديثات طلبات الأدوية", checked: true },
  { key: "nearby", label: "طلبات قريبة مني", checked: true },
  { key: "promo", label: "أخبار وتحديثات التطبيق", checked: false },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  const toggle = (key) => {
    setSettings(settings.map((s) => (s.key === key ? { ...s, checked: !s.checked } : s)));
  };

  return (
    <div className="page">
      <Link to="/profile" className="btn outline" style={{ display: "block", marginBottom: 14 }}>
        ← رجوع
      </Link>
      <h2>⚙️ إعدادات الإشعارات</h2>

      {settings.map((s) => (
        <div key={s.key} className="list-item">
          <span>{s.label}</span>
          <input type="checkbox" checked={s.checked} onChange={() => toggle(s.key)} style={{ width: 20, height: 20 }} />
        </div>
      ))}
    </div>
  );
}

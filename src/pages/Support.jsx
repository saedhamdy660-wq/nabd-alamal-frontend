import React from "react";
import { Link } from "react-router-dom";

const menu = [
  "الأسئلة الشائعة",
  "تواصل معنا",
  "سياسة الخصوصية",
  "شروط الاستخدام",
  "عن المنصة",
];

export default function Support() {
  return (
    <div className="page">
      <Link to="/profile" className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>
      <h2 style={{ marginBottom: 16 }}>المساعدة والدعم</h2>

      {menu.map((item) => (
        <div key={item} className="list-item" style={{ cursor: "pointer" }}>
          <span>{item}</span>
          <span>←</span>
        </div>
      ))}

      <div
        className="card"
        style={{
          textAlign: "center",
          background: "var(--primary-light)",
          border: "1px solid #d7f0ea",
          marginTop: 20,
        }}
      >
        <div style={{ fontSize: 34 }}>❤️</div>
        <strong style={{ display: "block", marginTop: 8 }}>معًا... ننقذ حياة</strong>
      </div>
    </div>
  );
}

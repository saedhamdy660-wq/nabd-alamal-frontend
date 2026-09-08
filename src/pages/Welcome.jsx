import React from "react";
import { useNavigate } from "react-router-dom";
import HeartLogo from "../components/HeartLogo.jsx";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ paddingTop: 60, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <HeartLogo size={90} heartColor="#0aa88f" outline />
      <h1 style={{ color: "var(--primary)", margin: "16px 0 4px" }}>نبض الأمل</h1>
      <p className="muted" style={{ marginBottom: 20 }}>استجابة طبية طارئة</p>

      <p style={{ color: "var(--text)", lineHeight: 1.9, padding: "0 8px" }}>
        منصة موثوقة تربط بين من يحتاج ومن يقدم المساعدة بشكل عاجل
      </p>

      <div style={{ marginTop: 30 }}>
        <button className="btn" onClick={() => navigate("/signup")}>ابدأ الآن</button>
        <button className="btn outline" style={{ marginTop: 10 }} onClick={() => navigate("/login")}>
          تسجيل الدخول
        </button>
        <p className="muted" style={{ marginTop: 18, cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/home")}>
          تخطي
        </p>
      </div>
    </div>
  );
}

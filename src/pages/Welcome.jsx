import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ paddingTop: 60, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 10 }}>❤️</div>
      <h1 style={{ color: "var(--primary)", margin: "0 0 4px" }}>نبض الأمل</h1>
      <p className="muted" style={{ marginBottom: 20 }}>استجابة طبية طارئة</p>

      <p style={{ color: "var(--text)", lineHeight: 1.9, padding: "0 8px" }}>
        منصة واحدة تربط بين من يملك مورد طبي فائض عن حاجته ومن يحتاجه بشكل عاجل،
        عبر تبادل أدوية آمن وشبكة تبرع بالدم والصفائح تصل في دقائق.
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

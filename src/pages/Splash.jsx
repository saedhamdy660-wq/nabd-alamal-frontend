import React from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: "0 0 55%",
          background: "linear-gradient(160deg, #0a6a5a, #14b8a6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div style={{ fontSize: 70, marginBottom: 10 }}>🤲❤️</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "6px 0 2px" }}>نبض الأمل</h1>
        <p style={{ opacity: 0.9, margin: 0 }}>استجابة طبية طارئة</p>
      </div>

      <div
        style={{
          flex: 1,
          background: "white",
          borderRadius: "28px 28px 0 0",
          marginTop: -24,
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "var(--primary)", margin: "0 0 8px" }}>معًا .. ننقذ حياة</h2>
        <p className="muted" style={{ marginBottom: 30 }}>
          موارد طبية مشتركة، وشبكة تبرع سريعة تصل لمن يحتاجها في الوقت المناسب.
        </p>

        <button className="btn" onClick={() => navigate("/welcome")}>ابدأ الآن</button>
        <button className="btn outline" style={{ marginTop: 10 }} onClick={() => navigate("/login")}>
          تسجيل الدخول
        </button>
        <span
          className="muted"
          style={{ marginTop: 18, cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/home")}
        >
          تخطي
        </span>
      </div>
    </div>
  );
}

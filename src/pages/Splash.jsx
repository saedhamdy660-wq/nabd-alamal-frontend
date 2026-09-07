import React from "react";
import { useNavigate } from "react-router-dom";
import HeartLogo from "../components/HeartLogo.jsx";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "white" }}>
      <div style={{ padding: "50px 24px 20px", textAlign: "center" }}>
        <HeartLogo size={78} heartColor="#0aa88f" ecgColor="white" bg="var(--primary-light)" />
        <h1 style={{ color: "var(--primary)", margin: "16px 0 2px", fontSize: 24 }}>نبض الأمل</h1>
        <p className="muted" style={{ margin: 0 }}>استجابة طبية طارئة</p>
        <p style={{ color: "var(--text)", fontWeight: 700, marginTop: 14 }}>معًا .. ننقذ حياة</p>
      </div>

      <div
        style={{
          flex: 1,
          background: "linear-gradient(180deg, #eafaf6, #cdeee5)",
          borderRadius: "32px 32px 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 30,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: 130, lineHeight: 1, marginBottom: 10 }}>🤲</div>
        <div style={{ fontSize: 60, position: "absolute", top: "38%" }}>❤️</div>

        <div style={{ width: "100%", padding: "0 28px", marginTop: 20 }}>
          <button className="btn" onClick={() => navigate("/welcome")}>ابدأ الآن</button>
          <button className="btn outline" style={{ marginTop: 10, background: "white" }} onClick={() => navigate("/login")}>
            تسجيل الدخول
          </button>
          <p
            className="muted"
            style={{ textAlign: "center", marginTop: 14, cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/home")}
          >
            تخطي
          </p>
        </div>
      </div>
    </div>
  );
}

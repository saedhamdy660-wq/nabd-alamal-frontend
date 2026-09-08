import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeartLogo from "../components/HeartLogo.jsx";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "white" }}>
      <div style={{ padding: "60px 24px 20px", textAlign: "center" }}>
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
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: 140, lineHeight: 1 }}>🤲</div>
        <div style={{ fontSize: 64, position: "absolute" }}>❤️</div>
      </div>
    </div>
  );
}

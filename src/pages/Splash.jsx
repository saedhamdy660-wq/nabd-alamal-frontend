import React from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-screen">
      <div className="splash-icon">❤️</div>
      <h1>نبض الأمل</h1>
      <p>استجابة طبية طارئة</p>
      <p className="muted" style={{ color: "rgba(255,255,255,0.8)" }}>
        موارد طبية .. حياة أفضل
      </p>

      <div className="splash-tagline">
        معًا ..
        <strong>نوفر حياة</strong>
      </div>

      <button className="btn" onClick={() => navigate("/welcome")}>
        ابدأ الآن
      </button>
    </div>
  );
}

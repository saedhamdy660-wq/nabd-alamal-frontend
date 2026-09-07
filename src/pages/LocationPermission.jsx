import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../api.js";

export default function LocationPermission() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const allow = async () => {
    try {
      await getCurrentLocation();
      setStatus("تم تحديد موقعك بنجاح ✅");
      setTimeout(() => navigate("/home"), 800);
    } catch {
      setStatus("تعذّر الوصول للموقع، يمكنك تفعيله لاحقًا من الإعدادات");
    }
  };

  return (
    <div className="page" style={{ paddingTop: 50, textAlign: "center" }}>
      <h2 style={{ margin: "0 0 6px" }}>تحديد الموقع</h2>
      <p className="muted" style={{ marginBottom: 24 }}>
        نحتاج إلى الوصول لموقعك لتقديم خدمات أقرب إليك
      </p>

      <div
        style={{
          background: "var(--primary-light)",
          borderRadius: "var(--radius-card)",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          marginBottom: 24,
        }}
      >
        📍
      </div>

      <p className="muted" style={{ marginBottom: 30, padding: "0 8px" }}>
        سنستخدم موقعك للعثور على أقرب صيدلية ومساعدة المتبرعين في الوصول إليك
      </p>

      <button className="btn" onClick={allow}>السماح بالموقع</button>
      <button className="btn outline" style={{ marginTop: 10 }} onClick={() => navigate("/home")}>
        ليس الآن
      </button>

      {status && <p className="muted" style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}

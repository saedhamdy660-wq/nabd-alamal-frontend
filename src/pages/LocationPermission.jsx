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
      setStatus("تعذّر الوصول للموقع، يمكنك المتابعة وتفعيله لاحقًا من الإعدادات");
    }
  };

  return (
    <div className="page" style={{ paddingTop: 70, textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>📍</div>
      <h2>السماح بالوصول لموقعك</h2>
      <p className="muted" style={{ margin: "12px 0 30px" }}>
        نستخدم موقعك لإيجاد أقرب صيدلية شريكة، أو أقرب حالة تبرع بالدم تحتاج مساعدتك.
      </p>

      <button className="btn" onClick={allow}>السماح بالوصول للموقع</button>
      <button className="btn outline" style={{ marginTop: 10 }} onClick={() => navigate("/home")}>
        تخطي الآن
      </button>

      {status && <p className="muted" style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}

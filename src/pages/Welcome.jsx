import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 40 }}>❤️</div>
        <h2 style={{ color: "var(--primary)" }}>مرحبًا بك في نبض الأمل</h2>
        <p className="muted">اختر المسار الذي تريد استخدامه</p>
      </div>

      <div className="card urgent" style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ fontSize: 30 }}>🩸</span>
        <div>
          <strong>التبرع بالدم والصفائح</strong>
          <p className="muted">كن سببًا في إنقاذ حياة. تبرع بالدم أو الصفائح الدموية عند الحاجة.</p>
        </div>
      </div>

      <div className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ fontSize: 30 }}>💊</span>
        <div>
          <strong>تبادل الأدوية</strong>
          <p className="muted">دواؤك غير متوفر؟ ساعد أو استفد بإتاحة أدوية فائضة عن الحاجة.</p>
        </div>
      </div>

      <button className="btn" style={{ marginTop: 20 }} onClick={() => navigate("/login")}>
        ابدأ الآن
      </button>
    </div>
  );
}

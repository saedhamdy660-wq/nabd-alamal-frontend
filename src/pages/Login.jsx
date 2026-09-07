import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await api.login({ email, password });
      localStorage.setItem("nabd_user", JSON.stringify(user));
      if (remember) localStorage.setItem("nabd_remember", "1");
      navigate("/verify-phone");
    } catch {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="page" style={{ paddingTop: 50 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 4px" }}>مرحبًا بعودتك</h2>
        <p className="muted">سجل دخولك للوصول إلى خدمات نبض الأمل</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label className="field-label">رقم الهاتف أو البريد الإلكتروني</label>
          <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="card">
          <label className="field-label">كلمة المرور</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 4px 18px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <input type="checkbox" style={{ width: "auto" }} checked={remember} onChange={() => setRemember(!remember)} />
            تذكرني
          </label>
          <Link to="#" className="muted" style={{ fontSize: 14 }}>نسيت كلمة المرور؟</Link>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">تسجيل الدخول</button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span className="muted">أو</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        {[
          { label: "Google", icon: "G", bg: "#ea4335" },
          { label: "Apple", icon: "", bg: "#111" },
          { label: "Facebook", icon: "f", bg: "#1877f2" },
        ].map((p) => (
          <div
            key={p.label}
            title={p.label}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: p.bg,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {p.icon}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: 26 }} className="muted">
        ليس لديك حساب؟ <Link to="/signup">إنشاء حساب جديد</Link>
      </p>

      <p className="muted" style={{ textAlign: "center", marginTop: 20 }}>
        (للتجربة: zizo@example.com / 123456)
      </p>
    </div>
  );
}

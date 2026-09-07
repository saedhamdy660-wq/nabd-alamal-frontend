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

  const inputStyle = { width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" };

  return (
    <div className="page" style={{ paddingTop: 50 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 4px" }}>مرحبًا بعودتك</h2>
        <p className="muted">سجل دخولك للمتابعة</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label className="muted">البريد الإلكتروني أو رقم الهاتف</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div className="card">
          <label className="muted">كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 4px 18px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
            تذكرني
          </label>
          <Link to="#" className="muted" style={{ fontSize: 14 }}>نسيت كلمة المرور؟</Link>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">تسجيل الدخول</button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#e2e8e8" }} />
        <span className="muted">أو</span>
        <div style={{ flex: 1, height: 1, background: "#e2e8e8" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        {[
          { label: "Facebook", icon: "f", bg: "#1877f2" },
          { label: "Apple", icon: "", bg: "#111" },
          { label: "Google", icon: "G", bg: "#ea4335" },
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

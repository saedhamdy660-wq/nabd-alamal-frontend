import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

function IconField({ icon, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>
        {icon}
      </span>
      <input {...props} style={{ paddingInlineStart: 38 }} />
    </div>
  );
}

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
        <p className="muted">سجل دخولك للمتابعة</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <IconField icon="✉️" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني أو رقم الهاتف" />
        </div>
        <div className="card">
          <IconField icon="🔒" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 4px 18px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <input type="checkbox" style={{ width: "auto" }} checked={remember} onChange={() => setRemember(!remember)} />
            تذكرني
          </label>
          <Link to="#" className="muted" style={{ fontSize: 14, textDecoration: "underline" }}>نسيت كلمة المرور؟</Link>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">تسجيل الدخول</button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span className="muted">أو</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {[
          { label: "Google", icon: "G" },
          { label: "Apple", icon: "" },
          { label: "Facebook", icon: "f" },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              flex: 1,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-input)",
              padding: "10px 6px",
              textAlign: "center",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <div style={{ fontSize: 16 }}>{p.icon}</div>
            {p.label}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: 26 }} className="muted">
        ليس لديك حساب؟ <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 600 }}>إنشاء حساب جديد</Link>
      </p>

      <p className="muted" style={{ textAlign: "center", marginTop: 20 }}>
        (للتجربة: zizo@example.com / 123456)
      </p>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await api.login({ email, password });
      localStorage.setItem("nabd_user", JSON.stringify(user));
      navigate("/verify-phone");
    } catch {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="page" style={{ paddingTop: 60 }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 44 }}>❤️</div>
        <h2>تسجيل الدخول</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label className="muted">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>
        <div className="card">
          <label className="muted">كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">تسجيل الدخول</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 16 }} className="muted">
        ليس لديك حساب؟ <Link to="/signup">إنشاء حساب جديد</Link>
      </p>

      <p className="muted" style={{ textAlign: "center", marginTop: 30 }}>
        (للتجربة: zizo@example.com / 123456)
      </p>
    </div>
  );
}

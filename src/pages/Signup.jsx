import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", bloodType: "O+" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await api.register(form);
      localStorage.setItem("nabd_user", JSON.stringify(user));
      navigate("/verify-phone");
    } catch (err) {
      setError("حدث خطأ، جرّب بريدًا إلكترونيًا آخر");
    }
  };

  const inputStyle = { width: "100%", padding: 10, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" };

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 44 }}>❤️</div>
        <h2>إنشاء حساب جديد</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label className="muted">الاسم</label>
          <input required value={form.name} onChange={update("name")} style={inputStyle} />
        </div>
        <div className="card">
          <label className="muted">البريد الإلكتروني</label>
          <input type="email" required value={form.email} onChange={update("email")} style={inputStyle} />
        </div>
        <div className="card">
          <label className="muted">كلمة المرور</label>
          <input type="password" required value={form.password} onChange={update("password")} style={inputStyle} />
        </div>
        <div className="card">
          <label className="muted">فصيلة الدم</label>
          <select value={form.bloodType} onChange={update("bloodType")} style={inputStyle}>
            {bloodTypes.map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">إنشاء حساب</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 16 }} className="muted">
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
}

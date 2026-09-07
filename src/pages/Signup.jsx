import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Signup() {
  const [accountType, setAccountType] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", bloodType: "O+" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }
    try {
      const user = await api.register({ ...form, accountType });
      localStorage.setItem("nabd_user", JSON.stringify(user));
      navigate("/verify-phone");
    } catch {
      setError("حدث خطأ، جرّب بريدًا إلكترونيًا آخر");
    }
  };

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px" }}>إنشاء حساب جديد</h2>
        <p className="muted">انضم إلى مجتمع نبض الأمل</p>
      </div>

      <div className="tabs">
        <div className={`tab ${accountType === "user" ? "active" : ""}`} onClick={() => setAccountType("user")}>
          مستخدم
        </div>
        <div className={`tab ${accountType === "donor" ? "active" : ""}`} onClick={() => setAccountType("donor")}>
          متبرع
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label className="field-label">الاسم الكامل</label>
          <input required value={form.name} onChange={update("name")} />
        </div>
        <div className="card">
          <label className="field-label">البريد الإلكتروني</label>
          <input type="email" required value={form.email} onChange={update("email")} />
        </div>
        <div className="card">
          <label className="field-label">رقم الهاتف</label>
          <input type="tel" placeholder="01xxxxxxxxx" required value={form.phone} onChange={update("phone")} />
        </div>
        <div className="card">
          <label className="field-label">كلمة المرور</label>
          <input type="password" required value={form.password} onChange={update("password")} />
        </div>
        <div className="card">
          <label className="field-label">تأكيد كلمة المرور</label>
          <input type="password" required value={form.confirm} onChange={update("confirm")} />
        </div>
        <div className="card">
          <label className="field-label">فصيلة الدم</label>
          <select value={form.bloodType} onChange={update("bloodType")}>
            {bloodTypes.map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">إنشاء الحساب</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 16 }} className="muted">
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
}

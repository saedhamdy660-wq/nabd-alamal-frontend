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
        <p className="muted">انضم إلى منصة نبض الأمل</p>
      </div>

      <div className="tabs">
        <div className={`tab ${accountType === "user" ? "active" : ""}`} onClick={() => setAccountType("user")}>
          👤 مستخدم
        </div>
        <div className={`tab ${accountType === "donor" ? "active" : ""}`} onClick={() => setAccountType("donor")}>
          💗 متبرع
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <IconField icon="👤" required value={form.name} onChange={update("name")} placeholder="الاسم الكامل" />
        </div>
        <div className="card">
          <IconField icon="✉️" type="email" required value={form.email} onChange={update("email")} placeholder="البريد الإلكتروني" />
        </div>
        <div className="card">
          <IconField icon="📱" type="tel" required value={form.phone} onChange={update("phone")} placeholder="رقم الهاتف" />
        </div>
        <div className="card">
          <IconField icon="🔒" type="password" required value={form.password} onChange={update("password")} placeholder="كلمة المرور" />
        </div>
        <div className="card">
          <IconField icon="🔒" type="password" required value={form.confirm} onChange={update("confirm")} placeholder="تأكيد كلمة المرور" />
        </div>
        <div className="card">
          <label className="field-label">فصيلة الدم</label>
          <select value={form.bloodType} onChange={update("bloodType")}>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <button className="btn" type="submit">إنشاء الحساب</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 16 }} className="muted">
        لديك حساب بالفعل؟ <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>تسجيل الدخول</Link>
      </p>
    </div>
  );
}

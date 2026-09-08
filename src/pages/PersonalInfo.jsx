import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function PersonalInfo() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const update = (field) => (e) => setUser({ ...user, [field]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem("nabd_user", JSON.stringify(user));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return <div className="page">جارِ التحميل...</div>;

  return (
    <div className="page">
      <Link to="/profile" className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>
      <h2 style={{ marginBottom: 16 }}>المعلومات الشخصية</h2>

      <form onSubmit={save}>
        <div className="card">
          <label className="field-label">الاسم الكامل</label>
          <input value={user.name || ""} onChange={update("name")} />
        </div>
        <div className="card">
          <label className="field-label">البريد الإلكتروني</label>
          <input type="email" value={user.email || ""} onChange={update("email")} />
        </div>
        <div className="card">
          <label className="field-label">رقم الهاتف</label>
          <input type="tel" value={user.phone || ""} onChange={update("phone")} />
        </div>
        <div className="card">
          <label className="field-label">فصيلة الدم</label>
          <select value={user.bloodType || "O+"} onChange={update("bloodType")}>
            {bloodTypes.map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        <button className="btn" type="submit">حفظ التغييرات</button>
        {saved && <p className="muted" style={{ textAlign: "center", marginTop: 10 }}>تم الحفظ ✅</p>}
      </form>
    </div>
  );
}

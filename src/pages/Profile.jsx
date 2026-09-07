import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      api.getUser().then(setUser).catch(() => {});
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("nabd_user");
    navigate("/login");
  };

  if (!user) return <div className="page">جارِ التحميل...</div>;

  const menuItems = [
    { label: "الأدوية المفضلة", to: "/favorites" },
    { label: "سجل الطلبات", to: "/requests" },
    { label: "إعدادات الإشعارات", to: "/notification-settings" },
    { label: "المساعدة والدعم", to: "/support" },
  ];

  return (
    <div className="page">
      <h2>👤 الملف الشخصي</h2>
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🙂</div>
        <h3>{user.name}</h3>
        <p className="muted">{user.email}</p>
        <p className="muted">فصيلة الدم: {user.bloodType}</p>
      </div>

      {menuItems.map((item) => (
        <Link key={item.to} to={item.to} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{item.label}</span>
            <span>←</span>
          </div>
        </Link>
      ))}

      <button className="btn danger" onClick={logout} style={{ marginTop: 8 }}>تسجيل الخروج</button>
    </div>
  );
}

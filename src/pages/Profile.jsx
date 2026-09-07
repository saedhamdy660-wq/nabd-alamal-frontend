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
    { label: "المعلومات الشخصية", to: "/profile" },
    { label: "العناوين المحفوظة", to: "/profile" },
    { label: "الطلبات السابقة", to: "/requests" },
    { label: "الأدوية المفضلة", to: "/favorites" },
    { label: "إعدادات التطبيق", to: "/notification-settings" },
    { label: "المساعدة والدعم", to: "/support" },
  ];

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16 }}>ملفي الشخصي</h2>
      <div className="card" style={{ textAlign: "center" }}>
        <div className="avatar" style={{ width: 64, height: 64, fontSize: 28, margin: "0 auto 10px" }}>🙂</div>
        <h3 style={{ margin: "0 0 2px" }}>{user.name}</h3>
        <p className="muted">{user.email}</p>
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

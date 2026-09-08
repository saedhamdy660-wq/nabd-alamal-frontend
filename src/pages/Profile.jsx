import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      api.getUser().then(setUser).catch(() => {});
    }
    setAvatar(localStorage.getItem("nabd_avatar"));
  }, []);

  const logout = () => {
    localStorage.removeItem("nabd_user");
    navigate("/login");
  };

  const onPickPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("nabd_avatar", reader.result);
      setAvatar(reader.result);
      if (user?.id) {
        api.saveAvatar(user.id, reader.result).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  if (!user) return <div className="page">جارِ التحميل...</div>;

  const menuItems = [
    { label: "المعلومات الشخصية", to: "/personal-info" },
    { label: "العناوين المحفوظة", to: "/addresses" },
    { label: "الطلبات السابقة", to: "/requests" },
    { label: "الأدوية المفضلة", to: "/favorites" },
    { label: "إعدادات التطبيق", to: "/notification-settings" },
    { label: "المساعدة والدعم", to: "/support" },
  ];

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16 }}>ملفي الشخصي</h2>
      <div className="card" style={{ textAlign: "center" }}>
        <div
          className="avatar"
          onClick={() => fileInput.current.click()}
          style={{
            width: 72,
            height: 72,
            fontSize: 30,
            margin: "0 auto 10px",
            cursor: "pointer",
            backgroundImage: avatar ? `url(${avatar})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {!avatar && "🙂"}
          <div style={{ position: "absolute", bottom: -2, left: -2, fontSize: 14, background: "white", borderRadius: "50%", padding: 2 }}>
            📷
          </div>
        </div>
        <input ref={fileInput} type="file" accept="image/*" onChange={onPickPhoto} style={{ display: "none" }} />
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

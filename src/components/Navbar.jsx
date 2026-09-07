import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/home", label: "الرئيسية", icon: "🏠" },
  { to: "/requests", label: "طلباتي", icon: "📋" },
  { to: "/notifications", label: "الإشعارات", icon: "🔔" },
  { to: "/profile", label: "الملف الشخصي", icon: "👤" },
];

export default function Navbar() {
  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div>{link.icon}</div>
          <div>{link.label}</div>
        </NavLink>
      ))}
    </nav>
  );
}

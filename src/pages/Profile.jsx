import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function getSavedUser() {
  try {
    const saved = localStorage.getItem("nabd_user");

    if (!saved) return null;

    return JSON.parse(saved);
  } catch {
    return null;
  }
}

/* =========================
   ICONS
========================= */

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="9"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 3v4M16 3v4M4 9h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M20 8.8c0 5.2-8 10-8 10s-8-4.8-8-10a4.2 4.2 0 0 1 8-1.7A4.2 4.2 0 0 1 20 8.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M19 13.2v-2.4l-1.8-.5a5.9 5.9 0 0 0-.6-1.5l1-1.5-1.7-1.7-1.5 1a5.9 5.9 0 0 0-1.5-.6L12.4 4H10l-.5 1.8a5.9 5.9 0 0 0-1.5.6l-1.5-1L4.8 7.1l1.7 1.7a5.9 5.9 0 0 0-.6 1.5l-1.8.5v2.4l1.8.5a5.9 5.9 0 0 0 .6 1.5l-1 1.5 1.7 1.7 1.5-1a5.9 5.9 0 0 0 1.5.6L10 20h2.4l.5-1.8a5.9 5.9 0 0 0 1.5-.6l1.5 1 1.7-1.7-1-1.5a5.9 5.9 0 0 0 .6-1.5l1.8-.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellSettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M10 20h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 13v-1a8 8 0 0 1 16 0v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4 13h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 1 1-1v-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M17 18c-.7 1.2-1.9 2-3.5 2H12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M14 8l4 4-4 4M9 12h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M10 20h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RequestsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8.5 9h7M8.5 13h7M8.5 17h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-9.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================
   MENU ITEM
========================= */

function ProfileMenuItem({
  icon,
  title,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      className={`profile-menu-item ${
        danger ? "danger-item" : ""
      }`}
      onClick={onClick}
    >
      <div className="menu-icon">
        {icon}
      </div>

      <span>{title}</span>

      <div className="menu-arrow">
        <ArrowIcon />
      </div>
    </button>
  );
}

/* =========================
   PROFILE
========================= */

export default function Profile() {
  const navigate = useNavigate();

  /* =========================
     GUEST
  ========================= */

  const isGuest =
    localStorage.getItem("nabd_guest") === "true";

  /* =========================
     USER
  ========================= */

  const [user, setUser] = useState(
    isGuest ? null : getSavedUser()
  );

  /* =========================
     AVATAR
  ========================= */

  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("nabd_avatar") || "";
  });

  const fileInputRef = useRef(null);

  /* =========================
     THEME
  ========================= */

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("nabd_theme") ||
      "light"
    );
  });

  const [systemDark, setSystemDark] =
    useState(() =>
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  /* =========================
     THEME UPDATE
  ========================= */

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme =
        localStorage.getItem("nabd_theme") ||
        "light";

      setTheme(savedTheme);
    };

    window.addEventListener(
      "nabd-theme-change",
      updateTheme
    );

    return () => {
      window.removeEventListener(
        "nabd-theme-change",
        updateTheme
      );
    };
  }, []);

  /* =========================
     SYSTEM THEME
  ========================= */

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = (event) => {
      setSystemDark(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /* =========================
     IS DARK
  ========================= */

  const isDark =
    theme === "dark" ||
    (theme === "system" && systemDark);

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    const guest =
      localStorage.getItem("nabd_guest") === "true";

    if (guest) {
      setUser(null);

      const savedAvatar =
        localStorage.getItem("nabd_avatar");

      setAvatar(savedAvatar || "");

      return;
    }

    const savedUser = getSavedUser();

    if (savedUser) {
      setUser(savedUser);
    }

    const savedAvatar =
      localStorage.getItem("nabd_avatar");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  /* =========================
     IMAGE PICKER
  ========================= */

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("من فضلك اختر صورة فقط");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      localStorage.setItem(
        "nabd_avatar",
        image
      );

      setAvatar(image);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  /* =========================
     USER DATA
  ========================= */

  const userName = isGuest
    ? "المستخدم"
    : (
        user?.name ||
        user?.username ||
        user?.fullName ||
        user?.displayName ||
        "المستخدم"
      );

  const email = isGuest
    ? "يمكنك تسجيل الدخول لعرض بياناتك"
    : (
        user?.email ||
        "البريد الإلكتروني"
      );

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("nabd_user");
    localStorage.removeItem("nabd_avatar");
    localStorage.removeItem("nabd_guest");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div
      className={`profile-page ${
        isDark ? "dark-mode" : ""
      }`}
    >

      {/* =========================
          HEADER
      ========================= */}

      <header className="profile-header">

        <button
          type="button"
          className="header-back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h1>
          ملفي الشخصي
        </h1>

        <div className="header-empty" />

      </header>


      {/* =========================
          PROFILE CARD
      ========================= */}

      <section className="profile-card">

        <div
          className="profile-avatar"
          style={{
            backgroundImage: avatar
              ? `url(${avatar})`
              : "none",
          }}
        >

          {!avatar && (
            <span>
              {userName.charAt(0)}
            </span>
          )}

          <button
            type="button"
            className="camera-button"
            onClick={openImagePicker}
            aria-label="اختيار صورة شخصية"
          >
            +
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{
              display: "none",
            }}
            onChange={handleAvatarChange}
          />

        </div>

        <h2>
          {userName}
        </h2>

        <p>
          {email}
        </p>

        <div className="profile-slogan">
          معًا ننقذ الحياة
        </div>

      </section>


      {/* =========================
          PROFILE MENU
      ========================= */}

      <section className="profile-menu">

        <ProfileMenuItem
          icon={<UserIcon />}
          title="المعلومات الشخصية"
          onClick={() =>
            navigate("/personal-info")
          }
        />

        <ProfileMenuItem
          icon={<LocationIcon />}
          title="العناوين المسجلة"
          onClick={() =>
            navigate("/addresses")
          }
        />

        <ProfileMenuItem
          icon={<CalendarIcon />}
          title="الطلبات السابقة"
          onClick={() =>
            navigate("/requests")
          }
        />

        <ProfileMenuItem
          icon={<HeartIcon />}
          title="الأدوية المفضلة"
          onClick={() =>
            navigate("/favorites")
          }
        />

        <ProfileMenuItem
          icon={<BellSettingsIcon />}
          title="إعدادات الإشعارات"
          onClick={() =>
            navigate("/notification-settings")
          }
        />

        <ProfileMenuItem
          icon={<SettingsIcon />}
          title="إعدادات التطبيق"
          onClick={() =>
            navigate("/settings")
          }
        />

        <ProfileMenuItem
          icon={<SupportIcon />}
          title="المساعدة والدعم"
          onClick={() =>
            navigate("/support")
          }
        />

        <ProfileMenuItem
          icon={<LogoutIcon />}
          title="تسجيل الخروج"
          danger
          onClick={handleLogout}
        />

      </section>


      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <nav className="profile-bottom-nav">

        <button
          type="button"
          className="nav-item active"
          onClick={() =>
            navigate("/profile")
          }
        >
          <UserIcon />
          <span>
            الملف الشخصي
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            navigate("/notifications")
          }
        >
          <BellIcon />
          <span>
            الإشعارات
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            navigate("/requests")
          }
        >
          <RequestsIcon />
          <span>
            الطلبات
          </span>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            navigate("/home")
          }
        >
          <HomeIcon />
          <span>
            الرئيسية
          </span>
        </button>

      </nav>


      {/* =========================
          STYLE
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .profile-page {
          min-height: 100vh;

          padding:
            22px 18px 110px;

          direction: rtl;

          color: #24575a;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70,193,177,.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154,231,216,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          transition:
            background .3s ease,
            color .3s ease;
        }


        /* =========================
           HEADER
        ========================= */

        .profile-header {
          max-width: 520px;

          margin:
            0 auto 20px;

          display: grid;

          grid-template-columns:
            44px 1fr 44px;

          align-items: center;
        }

        .profile-header h1 {
          margin: 0;

          text-align: center;

          color: #218d83;

          font-size: 22px;

          font-weight: 800;
        }

        .header-back {
          width: 42px;
          height: 42px;

          border:
            1px solid
            rgba(255,255,255,.9);

          border-radius: 14px;

          background:
            rgba(255,255,255,.72);

          color: #218d83;

          font-size: 25px;

          cursor: pointer;

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08),

            inset 0 1px 0
            rgba(255,255,255,.9);
        }

        .header-empty {
          width: 42px;
          height: 42px;
        }


        /* =========================
           PROFILE CARD
        ========================= */

        .profile-card {
          max-width: 520px;

          margin:
            0 auto 17px;

          min-height: 280px;

          padding:
            25px 18px;

          text-align: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(226,249,245,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px
            rgba(42,128,128,.09),

            inset 0 1px 0
            rgba(255,255,255,.95);

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);
        }


        /* =========================
           AVATAR
        ========================= */

        .profile-avatar {
          position: relative;

          width: 112px;
          height: 112px;

          margin:
            0 auto 13px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          font-size: 43px;

          font-weight: 800;

          background:
            linear-gradient(
              145deg,
              #dff8f3,
              #bcece3
            );

          background-size: cover;

          background-position: center;

          background-repeat: no-repeat;

          border:
            6px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 9px 26px
            rgba(35,139,128,.13),

            inset 0 1px 8px
            rgba(255,255,255,.8);

          overflow: visible;
        }


        /* =========================
           PHOTO BUTTON
        ========================= */

        .camera-button {
          position: absolute;

          right: -2px;

          bottom: 3px;

          width: 36px;
          height: 36px;

          border:
            3px solid white;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: white;

          background: #159b8a;

          font-size: 23px;

          font-weight: 500;

          line-height: 1;

          cursor: pointer;

          box-shadow:
            0 5px 14px
            rgba(21,155,138,.2);

          z-index: 5;

          padding: 0;

          transition:
            transform .15s ease,
            box-shadow .2s ease;
        }

        .camera-button:active {
          transform: scale(.92);
        }


        /* =========================
           USER INFO
        ========================= */

        .profile-card h2 {
          margin:
            0 0 5px;

          color: #286d6d;

          font-size: 24px;

          font-weight: 800;
        }

        .profile-card p {
          margin: 0;

          color: #729292;

          font-size: 13px;
        }

        .profile-slogan {
          margin:
            14px auto 0;

          width: fit-content;

          padding:
            7px 15px;

          border-radius: 18px;

          color: #159b8a;

          background:
            rgba(215,247,240,.75);

          font-size: 11px;

          font-weight: 800;
        }


        /* =========================
           PROFILE MENU
        ========================= */

        .profile-menu {
          max-width: 520px;

          margin: 0 auto;

          padding:
            4px 14px;

          overflow: hidden;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(236,250,248,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
            rgba(42,128,128,.08),

            inset 0 1px 0
            rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }


        /* =========================
           MENU ITEM
        ========================= */

        .profile-menu-item {
          position: relative;

          width: 100%;

          min-height: 70px;

          padding:
            8px 2px;

          border: 0;

          display: flex;

          align-items: center;

          gap: 13px;

          background: transparent;

          color: #286d6d;

          cursor: pointer;

          text-align: right;
        }

        .profile-menu-item
        + .profile-menu-item {
          border-top:
            1px solid
            rgba(124,184,177,.14);
        }


        /* =========================
           MENU ICON
        ========================= */

        .menu-icon {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e4faf6,
              #d3f3ed
            );
        }

        .menu-icon svg {
          width: 23px;
          height: 23px;
        }


        /* =========================
           MENU TEXT
        ========================= */

        .profile-menu-item > span {
          flex: 1;

          color: #286d6d;

          font-size: 14px;

          font-weight: 800;
        }


        /* =========================
           ARROW
        ========================= */

        .menu-arrow {
          width: 30px;
          height: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #86aaa7;
        }

        .menu-arrow svg {
          width: 17px;
          height: 17px;
        }


        /* =========================
           LOGOUT
        ========================= */

        .danger-item .menu-icon {
          color: #d36a79;

          background:
            linear-gradient(
              145deg,
              #fff0f3,
              #ffe4e9
            );
        }

        .danger-item > span {
          color: #c65f70 !important;
        }

        .danger-item .menu-arrow {
          color: #d88a96;
        }


        /* =========================
           BOTTOM NAV
        ========================= */

        .profile-bottom-nav {
          position: fixed;

          left: 50%;

          bottom: 14px;

          transform:
            translateX(-50%);

          z-index: 100;

          width:
            calc(100% - 28px);

          max-width: 520px;

          height: 68px;

          padding: 6px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 4px;

          border-radius: 24px;

          background:
            rgba(255,255,255,.82);

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 12px 32px
            rgba(37,111,111,.13),

            inset 0 1px 0
            rgba(255,255,255,.95);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);
        }


        /* =========================
           NAV ITEM
        ========================= */

        .nav-item {
          position: relative;

          border: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 3px;

          border-radius: 18px;

          color: #8aa5a4;

          background: transparent;

          font-size: 9px;

          font-weight: 700;

          cursor: pointer;
        }

        .nav-item svg {
          width: 21px;
          height: 21px;
        }

        .nav-item.active {
          color: #159b8a;

          background:
            rgba(219,248,242,.72);
        }

        .nav-item.active::after {
          content: "";

          position: absolute;

          bottom: 3px;

          width: 23px;

          height: 3px;

          border-radius: 10px;

          background: #159b8a;
        }


        /* ==================================================
           DARK MODE
        ================================================== */

        .profile-page.dark-mode {
          min-height: 100vh;

          color: #e8fffb;

          background:
            radial-gradient(
              circle at 8% 0%,
              rgba(22,173,157,.18),
              transparent 30%
            ),

            radial-gradient(
              circle at 95% 25%,
              rgba(19,126,126,.16),
              transparent 32%
            ),

            radial-gradient(
              circle at 50% 100%,
              rgba(7,91,91,.16),
              transparent 38%
            ),

            linear-gradient(
              180deg,
              #031b1d 0%,
              #05272a 48%,
              #031a1c 100%
            );
        }


        /* =========================
           DARK HEADER
        ========================= */

        .profile-page.dark-mode
        .profile-header {
          position: relative;

          padding:
            13px 12px;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(10,55,57,.90),
              rgba(5,39,42,.78)
            );

          border:
            1px solid
            rgba(72,207,193,.22);

          box-shadow:
            0 12px 30px
            rgba(0,0,0,.28),

            inset 0 1px 0
            rgba(140,255,241,.06);

          backdrop-filter:
            blur(16px);

          -webkit-backdrop-filter:
            blur(16px);
        }

        .profile-page.dark-mode
        .profile-header h1 {
          color: #72ead7;

          text-shadow:
            0 0 18px
            rgba(72,224,204,.20);
        }

        .profile-page.dark-mode
        .header-back {
          background:
            linear-gradient(
              145deg,
              rgba(20,92,91,.90),
              rgba(8,58,61,.90)
            );

          border-color:
            rgba(74,218,202,.20);

          color: #72ead7;

          box-shadow:
            0 8px 20px
            rgba(0,0,0,.28),

            inset 0 1px 0
            rgba(255,255,255,.05);
        }


        /* =========================
           DARK PROFILE CARD
        ========================= */

        .profile-page.dark-mode
        .profile-card {
          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(8,51,54,.96),
              rgba(4,35,38,.96)
            );

          border:
            1px solid
            rgba(67,207,193,.20);

          box-shadow:
            0 16px 38px
            rgba(0,0,0,.34),

            inset 0 1px 0
            rgba(132,255,239,.06);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);
        }

        .profile-page.dark-mode
        .profile-card::before {
          content: "";

          position: absolute;

          width: 180px;
          height: 180px;

          left: -80px;
          top: -70px;

          border-radius: 50%;

          background:
            rgba(27,177,160,.10);

          filter: blur(10px);

          pointer-events: none;
        }

        .profile-page.dark-mode
        .profile-card::after {
          content: "";

          position: absolute;

          width: 150px;
          height: 150px;

          right: -75px;
          bottom: -70px;

          border-radius: 50%;

          background:
            rgba(24,156,147,.09);

          filter: blur(8px);

          pointer-events: none;
        }


        /* =========================
           DARK AVATAR
        ========================= */

        .profile-page.dark-mode
        .profile-avatar {
          color: #72ead7;

          background:
            radial-gradient(
              circle,
              rgba(24,112,111,.75),
              rgba(5,43,45,.98)
            );

          border:
            5px solid
            rgba(104,240,220,.92);

          box-shadow:
            0 0 0 2px
            rgba(43,204,189,.12),

            0 0 24px
            rgba(38,207,190,.18),

            0 12px 30px
            rgba(0,0,0,.40),

            inset 0 0 22px
            rgba(66,220,204,.10);
        }


        /* =========================
           DARK PLUS BUTTON
        ========================= */

        .profile-page.dark-mode
        .camera-button {
          width: 38px;
          height: 38px;

          color: white;

          background:
            linear-gradient(
              145deg,
              #18c4ae,
              #079f90
            );

          border:
            3px solid
            #073d3e;

          box-shadow:
            0 0 18px
            rgba(31,211,190,.25),

            0 6px 16px
            rgba(0,0,0,.30);
        }

        .profile-page.dark-mode
        .camera-button:hover {
          transform: scale(1.05);
        }


        /* =========================
           DARK USER INFO
        ========================= */

        .profile-page.dark-mode
        .profile-card h2 {
          color: #ecfffc;

          text-shadow:
            0 0 14px
            rgba(114,234,215,.08);
        }

        .profile-page.dark-mode
        .profile-card p {
          color: #91b9b6;
        }

        .profile-page.dark-mode
        .profile-slogan {
          color: #70e5d3;

          background:
            rgba(30,159,145,.18);

          border:
            1px solid
            rgba(75,216,199,.10);

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,.03);
        }


        /* =========================
           DARK MENU
        ========================= */

        .profile-page.dark-mode
        .profile-menu {
          background:
            linear-gradient(
              145deg,
              rgba(7,48,51,.97),
              rgba(4,34,37,.97)
            );

          border:
            1px solid
            rgba(70,209,195,.18);

          box-shadow:
            0 16px 36px
            rgba(0,0,0,.34),

            inset 0 1px 0
            rgba(129,255,239,.04);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);
        }

        .profile-page.dark-mode
        .profile-menu-item {
          min-height: 70px;

          color: #dff8f4;
        }

        .profile-page.dark-mode
        .profile-menu-item
        + .profile-menu-item {
          border-top:
            1px solid
            rgba(77,205,192,.09);
        }

        .profile-page.dark-mode
        .profile-menu-item > span {
          color: #e1f8f4;
        }


        /* =========================
           DARK MENU ICON
        ========================= */

        .profile-page.dark-mode
        .menu-icon {
          color: #70ead8;

          background:
            linear-gradient(
              145deg,
              rgba(39,174,158,.24),
              rgba(17,103,100,.18)
            );

          border:
            1px solid
            rgba(81,219,202,.08);

          box-shadow:
            0 5px 15px
            rgba(0,0,0,.14),

            inset 0 1px 0
            rgba(255,255,255,.04);
        }

        .profile-page.dark-mode
        .menu-arrow {
          color: #69b4ae;
        }


        /* =========================
           DARK LOGOUT
        ========================= */

        .profile-page.dark-mode
        .danger-item .menu-icon {
          color: #ff8b9c;

          background:
            linear-gradient(
              145deg,
              rgba(210,79,104,.22),
              rgba(130,46,65,.18)
            );
        }

        .profile-page.dark-mode
        .danger-item > span {
          color: #ff8293 !important;
        }

        .profile-page.dark-mode
        .danger-item .menu-arrow {
          color: #dc7888;
        }


        /* =========================
           DARK BOTTOM NAV
        ========================= */

        .profile-page.dark-mode
        .profile-bottom-nav {
          background:
            linear-gradient(
              145deg,
              rgba(7,48,51,.98),
              rgba(3,30,33,.98)
            );

          border:
            1px solid
            rgba(71,209,195,.18);

          box-shadow:
            0 15px 36px
            rgba(0,0,0,.40),

            inset 0 1px 0
            rgba(128,255,239,.05);

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);
        }

        .profile-page.dark-mode
        .nav-item {
          color: #83aaa7;
        }

        .profile-page.dark-mode
        .nav-item.active {
          color: #70ead8;

          background:
            rgba(37,178,160,.13);

          text-shadow:
            0 0 12px
            rgba(72,220,201,.18);
        }

        .profile-page.dark-mode
        .nav-item.active::after {
          width: 28px;
          height: 4px;

          background:
            linear-gradient(
              90deg,
              #48ddc6,
              #1db39f
            );

          box-shadow:
            0 0 10px
            rgba(64,221,199,.35);
        }


        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 380px) {

          .profile-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .profile-header {
            grid-template-columns:
              42px 1fr 42px;
          }

          .profile-header h1 {
            font-size: 21px;
          }

          .header-back {
            width: 40px;
            height: 40px;
          }

          .header-empty {
            width: 40px;
            height: 40px;
          }

          .profile-card {
            min-height: 265px;

            padding:
              22px 14px;
          }

          .profile-avatar {
            width: 104px;
            height: 104px;

            font-size: 39px;
          }

          .camera-button {
            width: 34px;
            height: 34px;

            font-size: 22px;
          }

          .profile-card h2 {
            font-size: 21px;
          }

          .profile-card p {
            font-size: 12px;
          }

          .profile-menu {
            padding-left: 10px;
            padding-right: 10px;
          }

          .profile-menu-item {
            min-height: 66px;
          }

          .menu-icon {
            width: 40px;
            height: 40px;
          }

          .profile-menu-item > span {
            font-size: 13px;
          }

          .profile-bottom-nav {
            width:
              calc(100% - 20px);

            bottom: 10px;
          }

        }

      `}</style>

    </div>
  );
}

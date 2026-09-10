import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

function getSavedUser() {
  const stored = localStorage.getItem("nabd_user");

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 13.2v-2.4l-1.9-.6a5.8 5.8 0 0 0-.7-1.6l.9-1.8-1.7-1.7-1.8.9a5.8 5.8 0 0 0-1.6-.7L11.6 3H9.2l-.6 2.3a5.8 5.8 0 0 0-1.6.7l-1.8-.9-1.7 1.7.9 1.8a5.8 5.8 0 0 0-.7 1.6l-2.3.6v2.4l2.3.6c.2.6.4 1.1.7 1.6l-.9 1.8 1.7 1.7 1.8-.9c.5.3 1 .5 1.6.7l.6 2.3h2.4l.6-2.3c.6-.2 1.1-.4 1.6-.7l1.8.9 1.7-1.7-.9-1.8c.3-.5.5-1 .7-1.6l1.9-.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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

export default function Profile() {
  const navigate = useNavigate();

  const isGuest = localStorage.getItem("nabd_guest") === "true";

  const [user, setUser] = useState(() => {
    return isGuest ? null : getSavedUser();
  });

  // الصورة المحفوظة
  const [avatar, setAvatar] = useState(() => {
    if (isGuest) return "";

    return localStorage.getItem("nabd_avatar") || "";
  });

  // مرجع لاختيار الصورة
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isGuest) return;

    const savedAvatar = localStorage.getItem("nabd_avatar");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    api
      .getUser()
      .then((data) => {
        if (!data) return;

        setUser(data);

        localStorage.setItem("nabd_user", JSON.stringify(data));

        // لو مفيش صورة محلية، حاول نجيب الصورة من بيانات المستخدم
        if (!savedAvatar) {
          const apiAvatar =
            data.avatar ||
            data.image ||
            data.profileImage ||
            "";

          if (apiAvatar) {
            setAvatar(apiAvatar);
          }
        }
      })
      .catch(() => {});
  }, [isGuest]);

  // فتح معرض الصور
  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  // اختيار الصورة
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // التأكد إن الملف صورة
    if (!file.type.startsWith("image/")) {
      alert("من فضلك اختر صورة فقط");
      return;
    }

    // قراءة الصورة
    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      // حفظ الصورة
      localStorage.setItem("nabd_avatar", image);

      // تحديث الصورة فورًا
      setAvatar(image);
    };

    reader.readAsDataURL(file);

    // السماح باختيار نفس الصورة مرة أخرى
    e.target.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem("nabd_user");
    localStorage.removeItem("nabd_avatar");
    localStorage.removeItem("nabd_guest");

    navigate("/login");
  };

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    user?.displayName ||
    "المستخدم";

  const email = user?.email || "";

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div>
          <h1>الملف الشخصي</h1>
          <p>إدارة حسابك ومعلوماتك الشخصية</p>
        </div>

        <Link to="/home" className="profile-back">
          <BackIcon />
        </Link>
      </div>

      {/* PROFILE CARD */}
      <div className="profile-main-card">

        <div className="profile-avatar-wrapper">

          {/* الصورة */}
          <div
            className="profile-avatar"
            style={
              avatar
                ? {
                    backgroundImage: `url(${avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }
                : {}
            }
          >
            {!avatar && userName.charAt(0)}
          </div>

          {/* زر تغيير الصورة */}
          <button
            type="button"
            className="camera-button"
            onClick={openImagePicker}
            aria-label="اختيار صورة شخصية"
          >
            +
          </button>

          {/* اختيار الصورة مخفي */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />

        </div>

        <div className="profile-user-info">
          <h2>{userName}</h2>

          {email && (
            <p>{email}</p>
          )}

          <span>
            {isGuest ? "وضع الزائر" : "حسابك الشخصي"}
          </span>
        </div>

      </div>

      {/* OPTIONS */}
      <div className="profile-options">

        <Link to="/personal-info" className="profile-option">
          <div className="profile-option-icon">
            <UserIcon />
          </div>

          <div className="profile-option-text">
            <strong>المعلومات الشخصية</strong>
            <span>تعديل الاسم والبيانات الشخصية</span>
          </div>

          <div className="profile-option-arrow">
            ←
          </div>
        </Link>

        <Link to="/settings" className="profile-option">
          <div className="profile-option-icon">
            <SettingsIcon />
          </div>

          <div className="profile-option-text">
            <strong>الإعدادات</strong>
            <span>إدارة إعدادات التطبيق</span>
          </div>

          <div className="profile-option-arrow">
            ←
          </div>
        </Link>

      </div>

      {/* LOGOUT */}
      {!isGuest && (
        <button
          type="button"
          className="profile-logout"
          onClick={handleLogout}
        >
          <LogoutIcon />

          <span>تسجيل الخروج</span>
        </button>
      )}

      {/* BOTTOM NAV */}
      <nav className="profile-bottom-nav">

        <Link to="/home">
          <div>🏠</div>
          <span>الرئيسية</span>
        </Link>

        <Link to="/requests">
          <div>📋</div>
          <span>الطلبات</span>
        </Link>

        <Link to="/notifications">
          <div>🔔</div>
          <span>الإشعارات</span>
        </Link>

        <Link to="/profile" className="active">
          <div>👤</div>
          <span>المزيد</span>
        </Link>

      </nav>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .profile-page {
          min-height: 100vh;
          width: 100%;

          padding: 22px 16px 105px;

          direction: rtl;

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

          color: #286d6d;

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }


        /* HEADER */

        .profile-header {
          width: 100%;
          max-width: 520px;

          min-height: 54px;

          margin: 0 auto 24px;

          position: relative;
        }

        .profile-header > div {
          padding-right: 64px;

          text-align: right;
        }

        .profile-header h1 {
          margin: 0 0 5px;

          color: #218d83;

          font-size: 23px;
          line-height: 1.3;

          font-weight: 800;
        }

        .profile-header p {
          margin: 0;

          color: #8ca6a4;

          font-size: 11px;
        }


        /* BACK */

        .profile-back {
          position: absolute;

          right: 0;
          top: 0;

          width: 52px;
          height: 52px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #218d83;

          background: rgba(255,255,255,.85);

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 8px 22px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.95);

          text-decoration: none;
        }

        .profile-back svg {
          width: 24px;
          height: 24px;
        }


        /* MAIN PROFILE CARD */

        .profile-main-card {
          width: 100%;
          max-width: 520px;

          min-height: 145px;

          margin: 0 auto 18px;

          padding: 18px;

          display: flex;

          align-items: center;

          gap: 16px;

          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.94),
              rgba(226,248,244,.80)
            );

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }


        /* AVATAR */

        .profile-avatar-wrapper {
          position: relative;

          width: 112px;
          height: 112px;

          flex-shrink: 0;
        }

        .profile-avatar {
          width: 112px;
          height: 112px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #218d83;

          background:
            linear-gradient(
              145deg,
              #dff9f4,
              #c5eee6
            );

          border: 4px solid rgba(255,255,255,.95);

          box-shadow:
            0 10px 25px rgba(42,128,128,.10);

          font-size: 38px;

          font-weight: 900;

          overflow: hidden;
        }


        /* PLUS BUTTON */

        .camera-button {
          position: absolute;

          right: -2px;
          bottom: 2px;

          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 3px solid white;

          border-radius: 50%;

          color: white;

          background:
            linear-gradient(
              135deg,
              #38b7a4,
              #159b8a
            );

          font-size: 25px;

          line-height: 1;

          font-weight: 500;

          cursor: pointer;

          box-shadow:
            0 6px 15px rgba(21,155,138,.25);

          z-index: 5;

          padding: 0;
        }

        .camera-button:active {
          transform: scale(.92);
        }


        /* USER INFO */

        .profile-user-info {
          min-width: 0;

          flex: 1;

          text-align: right;
        }

        .profile-user-info h2 {
          margin: 0 0 7px;

          color: #286d6d;

          font-size: 20px;

          font-weight: 800;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .profile-user-info p {
          margin: 0 0 8px;

          color: #829d9a;

          font-size: 11px;

          direction: ltr;

          text-align: right;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .profile-user-info span {
          display: inline-block;

          padding: 6px 11px;

          border-radius: 12px;

          color: #218d83;

          background: #e2f7f3;

          font-size: 10px;

          font-weight: 700;
        }


        /* OPTIONS */

        .profile-options {
          width: 100%;
          max-width: 520px;

          margin: 0 auto 14px;
        }

        .profile-option {
          width: 100%;

          min-height: 78px;

          margin-bottom: 12px;

          padding: 12px 14px;

          display: flex;

          align-items: center;

          gap: 12px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.95),
              rgba(232,249,246,.82)
            );

          border: 1px solid rgba(255,255,255,.96);

          box-shadow:
            0 10px 26px rgba(42,128,128,.07),
            inset 0 1px 0 rgba(255,255,255,.92);

          text-decoration: none;

          color: inherit;
        }

        .profile-option-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e1faf5,
              #cef0e9
            );
        }

        .profile-option-icon svg {
          width: 24px;
          height: 24px;
        }

        .profile-option-text {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 4px;

          text-align: right;
        }

        .profile-option-text strong {
          color: #286d6d;

          font-size: 14px;

          font-weight: 800;
        }

        .profile-option-text span {
          color: #91a8a7;

          font-size: 10px;
        }

        .profile-option-arrow {
          color: #159b8a;

          font-size: 18px;

          flex-shrink: 0;
        }


        /* LOGOUT */

        .profile-logout {
          width: 100%;
          max-width: 520px;

          height: 54px;

          margin: 4px auto 0;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          border: 1px solid #f5d9df;

          border-radius: 20px;

          color: #c05267;

          background: rgba(255,241,244,.85);

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;
        }

        .profile-logout svg {
          width: 20px;
          height: 20px;
        }

        .profile-logout:active {
          transform: scale(.98);
        }


        /* BOTTOM NAV */

        .profile-bottom-nav {
          position: fixed;

          left: 0;
          right: 0;
          bottom: 0;

          height: 78px;

          padding:
            8px 10px
            calc(8px + env(safe-area-inset-bottom));

          display: flex;

          align-items: center;
          justify-content: space-around;

          background: rgba(255,255,255,.96);

          border-top: 1px solid rgba(225,239,236,.95);

          box-shadow:
            0 -8px 25px rgba(42,128,128,.06);

          z-index: 100;
        }

        .profile-bottom-nav a {
          min-width: 62px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;

          color: #8da6a3;

          text-decoration: none;

          font-size: 10px;

          font-weight: 700;
        }

        .profile-bottom-nav a div {
          font-size: 20px;

          line-height: 1;
        }

        .profile-bottom-nav a.active {
          color: #159b8a;
        }


        /* SMALL MOBILE */

        @media (max-width: 380px) {

          .profile-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .profile-header > div {
            padding-right: 60px;
          }

          .profile-header h1 {
            font-size: 21px;
          }

          .profile-back {
            width: 48px;
            height: 48px;
          }

          .profile-main-card {
            padding: 14px;

            gap: 12px;

            min-height: 132px;
          }

          .profile-avatar-wrapper {
            width: 94px;
            height: 94px;
          }

          .profile-avatar {
            width: 94px;
            height: 94px;

            font-size: 32px;
          }

          .camera-button {
            width: 34px;
            height: 34px;

            font-size: 22px;
          }

          .profile-user-info h2 {
            font-size: 17px;
          }

          .profile-option {
            min-height: 72px;
          }

          .profile-option-icon {
            width: 44px;
            height: 44px;
          }

          .profile-option-text strong {
            font-size: 13px;
          }
        }

      `}</style>

    </div>
  );
}

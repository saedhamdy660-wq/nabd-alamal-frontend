import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Logo() {
  return (
    <div className="na-logo">
      <div className="na-logo-circle">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path
            d="M50 82C46 78 18 59 18 36C18 22 28 15 39 15C45 15 49 18 50 24C51 18 55 15 61 15C72 15 82 22 82 36C82 59 54 78 50 82Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />

          <path
            d="M19 48H36L41 36L47 63L54 30L60 49H82"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="na-logo-title">نبض الأمل</div>
      <div className="na-logo-subtitle">استجابة طبية طارئة</div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 18L9 12L15 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 20C5.8 16 8.1 14 12 14C15.9 14 18.2 16 19 20"
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
        d="M20.8 8.8C20.8 14 12 18.9 12 18.9S3.2 14 3.2 8.8A4.7 4.7 0 0 1 8 4.2C9.5 4.2 11 4.9 12 6.2C13 4.9 14.5 4.2 16 4.2A4.7 4.7 0 0 1 20.8 8.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 7L12 13L20 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7.5 3.5H10L11.3 7.5L9.3 8.9C10.5 11.5 12.5 13.5 15.1 14.7L16.5 12.7L20.5 14V16.5C20.5 17.6 19.6 18.5 18.5 18.5C11.3 18.5 5.5 12.7 5.5 5.5C5.5 4.4 6.4 3.5 7.5 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return (
    <svg viewBox="0 0 24 24">
      {hidden ? (
        <>
          <path
            d="M3 3L21 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6 6.5C4 8 2.8 10 2 12C3 15 7 19.5 12 19.5C13.5 19.5 15 19.2 16.3 18.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 4.5C10.7 4.2 11.3 4 12 4C17.5 4 21 8.7 22 12C21.6 13.3 20.8 14.7 19.5 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M2.5 12C2.5 12 6 6 12 6C18 6 21.5 12 21.5 12C21.5 12 18 18 12 18C6 18 2.5 12 2.5 12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </>
      )}
    </svg>
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    bloodType: "O+",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirm
    ) {
      setError("من فضلك أكمل جميع البيانات");
      return;
    }

    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (form.password !== form.confirm) {
      setError("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    try {
      setLoading(true);

      const user = await api.register({
        ...form,
        accountType,
      });

      localStorage.setItem("nabd_user", JSON.stringify(user));

      navigate("/verify-phone");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-orb orb-one" />
      <div className="signup-orb orb-two" />
      <div className="signup-orb orb-three" />

      <div className="medical-plus plus-one">+</div>
      <div className="medical-plus plus-two">+</div>

      <button
        type="button"
        className="signup-back"
        onClick={() => navigate(-1)}
        aria-label="رجوع"
      >
        <BackIcon />
      </button>

      <main className="signup-content">
        <Logo />

        <div className="signup-heading">
          <h1>إنشاء حساب جديد</h1>
          <p>انضم إلى منصة نبض الأمل</p>
        </div>

        <div className="heartbeat-divider">
          <span />
          <svg viewBox="0 0 180 40">
            <path
              d="M0 22H55L65 22L72 12L80 32L91 5L102 27L108 22H180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span />
        </div>

        <div className="signup-account-types">
          <button
            type="button"
            className={`account-type ${
              accountType === "user" ? "active" : ""
            }`}
            onClick={() => setAccountType("user")}
          >
            <span>مستخدم</span>
            <span className="account-type-icon">
              <UserIcon />
            </span>
          </button>

          <button
            type="button"
            className={`account-type ${
              accountType === "donor" ? "active" : ""
            }`}
            onClick={() => setAccountType("donor")}
          >
            <span>متبرع</span>
            <span className="account-type-icon">
              <HeartIcon />
            </span>
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={update("name")}
              autoComplete="name"
            />
            <span className="signup-field-icon">
              <UserIcon />
            </span>
          </div>

          <div className="signup-field">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />
            <span className="signup-field-icon">
              <MailIcon />
            </span>
          </div>

          <div className="signup-field">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={update("phone")}
              autoComplete="tel"
            />
            <span className="signup-field-icon">
              <PhoneIcon />
            </span>
          </div>

          <div className="signup-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={form.password}
              onChange={update("password")}
              autoComplete="new-password"
            />

            <span className="signup-field-icon">
              <LockIcon />
            </span>

            <button
              type="button"
              className="signup-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <EyeIcon hidden={!showPassword} />
            </button>
          </div>

          <div className="signup-field password-field">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={form.confirm}
              onChange={update("confirm")}
              autoComplete="new-password"
            />

            <span className="signup-field-icon">
              <LockIcon />
            </span>

            <button
              type="button"
              className="signup-eye"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              <EyeIcon hidden={!showConfirm} />
            </button>
          </div>

          {error && <div className="signup-error">{error}</div>}

          <button
            type="submit"
            className="signup-submit"
            disabled={loading}
          >
            <span>
              {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </span>

            <span className="submit-arrow">←</span>
          </button>
        </form>

        <p className="signup-login">
          <span>لديك حساب بالفعل؟</span>
          <Link to="/login">تسجيل الدخول</Link>
        </p>
      </main>

      <div className="signup-bottom">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            d="M0 125C180 50 260 170 440 115C610 65 700 170 850 120C1010 70 1110 165 1260 110C1340 82 1390 92 1440 70V220H0Z"
            fill="rgba(10,168,143,.10)"
          />

          <path
            d="M0 160C190 90 280 205 460 150C620 100 720 205 880 155C1030 110 1140 205 1300 150C1360 130 1400 135 1440 120"
            fill="none"
            stroke="rgba(255,255,255,.65)"
            strokeWidth="3"
          />
        </svg>

        <div className="bottom-heartbeat">
          <svg viewBox="0 0 300 70">
            <path
              d="M0 38H95L110 38L120 28L132 52L151 5L168 47L180 38H300"
              fill="none"
              stroke="rgba(255,255,255,.9)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

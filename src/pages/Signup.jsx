import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="signup-back-icon">
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
    <svg viewBox="0 0 24 24" className="signup-icon">
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
    <svg viewBox="0 0 24 24" className="signup-icon">
      <path
        d="M20.8 8.8C20.8 14 12 18.9 12 18.9S3.2 14 3.2 8.8A4.7 4.7 0 0 1 8 4.2C9.5 4.2 11 4.9 12 6.2C13 4.9 14.5 4.2 16 4.2A4.7 4.7 0 0 1 20.8 8.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="signup-field-icon">
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
    <svg viewBox="0 0 24 24" className="signup-field-icon">
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
    <svg viewBox="0 0 24 24" className="signup-field-icon">
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
  if (hidden) {
    return (
      <svg viewBox="0 0 24 24" className="signup-eye-icon">
        <path
          d="M3 3L21 21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M10.5 10.5C9.7 11.3 9.7 12.7 10.5 13.5C11.3 14.3 12.7 14.3 13.5 13.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M6.2 6.2C4.2 7.6 2.8 9.7 2 12C2.8 15.1 6.6 20 12 20C13.3 20 14.5 19.8 15.6 19.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M9.8 4.4C10.5 4.1 11.2 4 12 4C17.4 4 21.2 8.9 22 12C21.6 13.5 20.6 15.2 19.2 16.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="signup-eye-icon">
      <path
        d="M2.5 12C2.5 12 6 6 12 6C18 6 21.5 12 21.5 12C21.5 12 18 18 12 18C6 18 2.5 12 2.5 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
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
      setError("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">

      {/* Decorative background */}
      <div className="signup-glow signup-glow-one" />
      <div className="signup-glow signup-glow-two" />

      <main className="signup-content">

        {/* Back Button */}
        <button
          type="button"
          className="signup-back"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >
          <BackIcon />
        </button>

        {/* Header */}
        <header className="signup-header">
          <h1>إنشاء حساب جديد</h1>
          <p>انضم إلى منصة نبض الأمل</p>
        </header>

        {/* Account Type */}
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

        {/* Form */}
        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div className="signup-field">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={update("name")}
              autoComplete="name"
            />

            <span className="signup-field-icon-wrap">
              <UserIcon />
            </span>
          </div>

          {/* Email */}
          <div className="signup-field">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />

            <span className="signup-field-icon-wrap">
              <MailIcon />
            </span>
          </div>

          {/* Phone */}
          <div className="signup-field">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={update("phone")}
              autoComplete="tel"
            />

            <span className="signup-field-icon-wrap">
              <PhoneIcon />
            </span>
          </div>

          {/* Password */}
          <div className="signup-field password-field">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={form.password}
              onChange={update("password")}
              autoComplete="new-password"
            />

            <span className="signup-field-icon-wrap">
              <LockIcon />
            </span>

            <button
              type="button"
              className="signup-eye"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword
                  ? "إخفاء كلمة المرور"
                  : "إظهار كلمة المرور"
              }
            >
              <EyeIcon hidden={!showPassword} />
            </button>

          </div>

          {/* Confirm Password */}
          <div className="signup-field password-field">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={form.confirm}
              onChange={update("confirm")}
              autoComplete="new-password"
            />

            <span className="signup-field-icon-wrap">
              <LockIcon />
            </span>

            <button
              type="button"
              className="signup-eye"
              onClick={() =>
                setShowConfirm((prev) => !prev)
              }
              aria-label={
                showConfirm
                  ? "إخفاء كلمة المرور"
                  : "إظهار كلمة المرور"
              }
            >
              <EyeIcon hidden={!showConfirm} />
            </button>

          </div>

          {/* Error */}
          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="signup-submit"
            disabled={loading}
          >
            {loading
              ? "جاري إنشاء الحساب..."
              : "إنشاء الحساب"}
          </button>

        </form>

        {/* Login */}
        <p className="signup-login">
          <span>لديك حساب بالفعل؟</span>

          <Link to="/login">
            تسجيل الدخول
          </Link>
        </p>

      </main>

      {/* Bottom Wave */}
      <div className="signup-bottom-wave">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0 105
              C170 55 260 145 420 105
              C580 60 680 150 830 105
              C980 55 1080 145 1230 100
              C1330 70 1380 80 1440 60
              V180
              H0
              Z
            "
            fill="rgba(10,168,143,0.09)"
          />
        </svg>
      </div>

    </div>
  );
}

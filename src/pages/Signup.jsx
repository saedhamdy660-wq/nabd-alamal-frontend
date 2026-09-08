import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Logo = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="url(#signupLogoGradient)" />

    <path
      d="M50 73C47 70 27 56 23 43C19 31 27 22 38 22C44 22 49 25 52 30C55 25 60 22 66 22C77 22 85 31 81 43C77 56 55 70 50 73Z"
      fill="white"
    />

    <path
      d="M20 49H34L39 41L45 57L52 34L58 49H80"
      stroke="#0AA88F"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <defs>
      <linearGradient
        id="signupLogoGradient"
        x1="15"
        y1="15"
        x2="85"
        y2="85"
      >
        <stop stopColor="#0AA88F" />
        <stop offset="1" stopColor="#078876" />
      </linearGradient>
    </defs>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="8"
      r="3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 20C5.8 16.7 8.2 15 12 15C15.8 15 18.2 16.7 19 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M20.8 8.8C20.8 14 12 20 12 20S3.2 14 3.2 8.8C3.2 5.9 5.3 4 8 4C9.8 4 11.2 4.9 12 6.2C12.8 4.9 14.2 4 16 4C18.7 4 20.8 5.9 20.8 8.8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M4 7L12 13L20 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M7 3H17C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M9 18H15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="10"
      width="16"
      height="11"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 10V7.5C8 5 9.8 3 12 3C14.2 3 16 5 16 7.5V10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = ({ off = false }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M2.5 12S6 5.5 12 5.5S21.5 12 21.5 12S18 18.5 12 18.5S2.5 12 2.5 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    <circle
      cx="12"
      cy="12"
      r="2.7"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    {off && (
      <path
        d="M4 4L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    )}
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] =
    useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    bloodType: "O+",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirm
    ) {
      setError("من فضلك أكمل جميع البيانات");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      );
      return;
    }

    if (form.password !== form.confirm) {
      setError(
        "كلمة المرور وتأكيد كلمة المرور غير متطابقين"
      );
      return;
    }

    try {
      setLoading(true);

      const user = await api.register({
        ...form,
        accountType,
      });

      localStorage.setItem(
        "nabd_user",
        JSON.stringify({
          ...user,
          phone: form.phone,
        })
      );

      navigate("/verify-phone");
    } catch (err) {
      setError(
        err?.message ||
          "حدث خطأ أثناء إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-orb signup-orb-1" />
      <div className="signup-orb signup-orb-2" />

      <div className="signup-plus signup-plus-1">
        +
      </div>

      <div className="signup-plus signup-plus-2">
        +
      </div>

      <button
        type="button"
        className="signup-back"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>

      <main className="signup-content">
        <div className="signup-logo">
          <Logo />
        </div>

        <h1>إنشاء حساب جديد</h1>

        <p className="signup-subtitle">
          انضم إلى منصة نبض الأمل
        </p>

        <div className="signup-heartbeat">
          <span />
          <svg
            viewBox="0 0 180 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16H52L59 16L65 10L71 22L79 4L88 16H180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span />
        </div>

        <div className="signup-account-types">
          <button
            type="button"
            className={
              accountType === "donor"
                ? "account-type active"
                : "account-type"
            }
            onClick={() =>
              setAccountType("donor")
            }
          >
            <span className="account-icon">
              <HeartIcon />
            </span>

            <span>متبرع</span>
          </button>

          <button
            type="button"
            className={
              accountType === "user"
                ? "account-type active"
                : "account-type"
            }
            onClick={() =>
              setAccountType("user")
            }
          >
            <span className="account-icon">
              <UserIcon />
            </span>

            <span>مستخدم</span>
          </button>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <div className="signup-field">
            <div className="signup-field-icon">
              <UserIcon />
            </div>

            <input
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder="الاسم الكامل"
              autoComplete="name"
            />
          </div>

          <div className="signup-field">
            <div className="signup-field-icon">
              <MailIcon />
            </div>

            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="البريد الإلكتروني"
              autoComplete="email"
            />
          </div>

          <div className="signup-field">
            <div className="signup-field-icon">
              <PhoneIcon />
            </div>

            <input
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="رقم الهاتف"
              autoComplete="tel"
              dir="ltr"
            />
          </div>

          <div className="signup-field">
            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={form.password}
              onChange={update("password")}
              placeholder="كلمة المرور"
              autoComplete="new-password"
            />

            <button
              type="button"
              className="signup-eye"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <EyeIcon
                off={!showPassword}
              />
            </button>
          </div>

          <div className="signup-field">
            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={form.confirm}
              onChange={update("confirm")}
              placeholder="تأكيد كلمة المرور"
              autoComplete="new-password"
            />

            <button
              type="button"
              className="signup-eye"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
            >
              <EyeIcon
                off={!showConfirm}
              />
            </button>
          </div>

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          <button
            className="signup-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "جاري إنشاء الحساب..."
              : "إنشاء الحساب"}
          </button>
        </form>

        <div className="signup-login">
          <span>لديك حساب بالفعل؟</span>

          <Link to="/login">
            تسجيل الدخول
          </Link>
        </div>
      </main>

      <div className="signup-bottom">
        <svg
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 65C80 30 120 85 190 57C250 33 280 76 340 55C405 32 450 70 500 42V120H0Z"
            fill="rgba(10,168,143,.25)"
          />

          <path
            d="M0 82C70 50 120 100 195 72C260 48 310 94 375 70C430 50 470 82 500 62V120H0Z"
            fill="rgba(7,136,118,.42)"
          />

          <path
            d="M0 93H140L153 93L163 78L174 106L187 58L201 93H320L333 93L343 82L353 105L365 68L378 93H500"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            opacity=".9"
          />
        </svg>
      </div>
    </div>
  );
}

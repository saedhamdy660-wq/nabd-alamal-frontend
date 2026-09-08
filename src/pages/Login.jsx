import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Logo = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="url(#logoGradient)" />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="white"
      strokeOpacity=".35"
      strokeWidth="1.5"
    />

    <path
      d="M50 73C47 70 27 56 23 43C19 31 27 22 38 22C44 22 49 25 52 30C55 25 60 22 66 22C77 22 85 31 81 43C77 56 55 70 50 73Z"
      fill="white"
      fillOpacity=".95"
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
        id="logoGradient"
        x1="15"
        y1="15"
        x2="85"
        y2="85"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0AA88F" />
        <stop offset="1" stopColor="#078876" />
      </linearGradient>
    </defs>
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

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.19Z"
    />
    <path
      fill="#34A853"
      d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.5A9.75 9.75 0 0 0 12 21.7Z"
    />
    <path
      fill="#FBBC05"
      d="M6.53 13.8A5.86 5.86 0 0 1 6.22 12c0-.62.11-1.22.31-1.8V7.7H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.3l3.24-2.5Z"
    />
    <path
      fill="#EA4335"
      d="M12 6.17c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.71 5.4l3.24 2.5c.77-2.31 2.93-4.03 5.47-4.03Z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 12.04c-.02-2.34 1.91-3.47 2-3.52a4.33 4.33 0 0 0-3.41-1.84c-1.43-.15-2.81.86-3.54.86-.74 0-1.87-.84-3.07-.82a4.53 4.53 0 0 0-3.81 2.32c-1.64 2.85-.42 7.04 1.17 9.35.79 1.13 1.71 2.39 2.93 2.34 1.18-.05 1.62-.76 3.04-.76 1.42 0 1.82.76 3.05.73 1.27-.02 2.07-1.15 2.84-2.29a9.4 9.4 0 0 0 1.3-2.66 4.1 4.1 0 0 1-2.5-3.76ZM14.72 5.17c.65-.79 1.08-1.89.96-2.98-.94.04-2.08.63-2.75 1.42-.6.69-1.12 1.8-.98 2.87 1.05.08 2.12-.53 2.77-1.31Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="#1877F2"
      d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.16 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.16 24 18.1 24 12.07Z"
    />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("من فضلك أدخل البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setLoading(true);

      const user = await api.login({
        email,
        password,
      });

      localStorage.setItem(
        "nabd_user",
        JSON.stringify(user)
      );

      if (remember) {
        localStorage.setItem(
          "nabd_remember",
          "true"
        );
      }

      navigate("/verify-phone");
    } catch (err) {
      setError(
        err?.message ||
          "حدث خطأ أثناء تسجيل الدخول"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-plus login-plus-1">
        +
      </div>

      <div className="login-plus login-plus-2">
        +
      </div>

      <div className="login-circle-decoration" />

      <main className="login-content">
        <div className="login-logo">
          <Logo />
        </div>

        <h1>مرحبًا بعودتك</h1>

        <p className="login-subtitle">
          سجل دخولك للمتابعة
        </p>

        <div className="login-heartbeat">
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

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-field">
            <div className="login-field-icon">
              <MailIcon />
            </div>

            <input
              type="text"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="البريد الإلكتروني أو رقم الهاتف"
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <div className="login-field-icon">
              <LockIcon />
            </div>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="كلمة المرور"
              autoComplete="current-password"
            />

            <button
              type="button"
              className="login-eye"
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

          <div className="login-options">
            <label className="remember-box">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(
                    e.target.checked
                  )
                }
              />

              <span className="custom-check">
                ✓
              </span>

              <span>تذكرني</span>
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            className="login-submit"
            type="submit"
            disabled={loading}
          >
            <span>
              {loading
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </span>

            {!loading && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span />
          <b>أو</b>
          <span />
        </div>

        <div className="social-login">
          <button
            type="button"
            className="social-card"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>

          <button
            type="button"
            className="social-card"
          >
            <AppleIcon />
            <span>Apple</span>
          </button>

          <button
            type="button"
            className="social-card"
          >
            <FacebookIcon />
            <span>Facebook</span>
          </button>
        </div>

        <div className="login-signup">
          <span>ليس لديك حساب؟</span>

          <Link to="/signup">
            إنشاء حساب جديد
          </Link>
        </div>
      </main>

      <div className="login-bottom">
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

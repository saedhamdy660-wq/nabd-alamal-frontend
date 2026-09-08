import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

function HeartLogo() {
  return (
    <div className="login-logo-wrap">
      <div className="login-logo-ring ring-one"></div>
      <div className="login-logo-ring ring-two"></div>

      <div className="login-logo">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path
            d="M50 82
               C45 77 20 59 20 38
               C20 25 30 18 41 18
               C47 18 52 21 56 27
               C60 21 65 18 72 18
               C83 18 90 26 90 38
               C90 59 61 77 50 82Z"
            fill="none"
            stroke="white"
            strokeWidth="5"
          />

          <path
            d="M22 48
               H37
               L43 48
               L48 35
               L55 62
               L61 45
               L65 48
               H88"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="field-svg">
      <path
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="field-svg">
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return (
    <svg viewBox="0 0 24 24" className="field-svg">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {visible && (
        <path
          d="M4 4 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/* =========================
   GOOGLE LOGO
========================= */
function GoogleIcon() {
  return (
    <svg
      className="social-svg google-svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.89 2.39 30.47 0 24 0 14.61 0 6.51 5.38 2.56 13.22l7.98 6.2C12.45 13.21 17.73 9.5 24 9.5Z"
      />

      <path
        fill="#34A853"
        d="M2.56 13.22A23.94 23.94 0 0 0 0 24c0 3.87.92 7.52 2.55 10.77l7.99-6.2A14.42 14.42 0 0 1 9.5 24c0-1.59.37-3.1 1.04-4.57l-7.98-6.21Z"
      />

      <path
        fill="#FBBC05"
        d="M24 48c6.47 0 11.9-2.13 15.87-5.79l-7.76-6.02c-2.16 1.45-4.93 2.31-8.11 2.31-6.27 0-11.55-3.71-13.46-9.92l-7.99 6.19C6.51 42.62 14.61 48 24 48Z"
      />

      <path
        fill="#EA4335"
        d="M47.5 24.55c0-1.59-.14-2.75-.45-3.95H24v8.12h13.49c-.27 2.02-1.87 5.07-5.38 7.13l7.76 6.02C44.4 38.15 47.5 32.03 47.5 24.55Z"
      />
    </svg>
  );
}

/* =========================
   APPLE LOGO
========================= */
function AppleIcon() {
  return (
    <svg
      className="social-svg apple-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M16.72 12.77c.02 2.08 1.82 2.77 1.84 2.78-.02.05-.29 1-.95 1.97-.57.83-1.16 1.66-2.1 1.68-.92.02-1.22-.54-2.28-.54-1.06 0-1.39.52-2.26.56-.9.03-1.58-.9-2.15-1.73-1.17-1.69-2.06-4.77-.86-6.85.6-1.04 1.67-1.7 2.83-1.72.88-.02 1.71.59 2.28.59.57 0 1.64-.73 2.76-.62.47.02 1.79.19 2.64 1.43-.07.04-1.58.92-1.57 2.75ZM14.9 7.65c.48-.58.81-1.39.72-2.2-.7.03-1.54.47-2.04 1.05-.45.51-.84 1.34-.73 2.13.78.06 1.57-.4 2.05-.98Z"
      />
    </svg>
  );
}

/* =========================
   FACEBOOK LOGO
========================= */
function FacebookIcon() {
  return (
    <svg
      className="social-svg facebook-svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#1877F2" />

      <path
        fill="white"
        d="M27.2 25.7h4.1l.65-4.8H27.2v-3.1c0-1.39.46-2.33 2.38-2.33H32V11.2c-.42-.06-1.86-.2-3.53-.2-3.49 0-5.88 2.13-5.88 6.04v3.86h-3.95v4.8h3.95V38h4.61V25.7Z"
      />
    </svg>
  );
}

function Heartbeat() {
  return (
    <svg
      className="heartbeat-svg"
      viewBox="0 0 600 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0 52
           H180
           L205 52
           L220 40
           L235 52
           L250 52
           L275 15
           L300 84
           L325 52
           L345 52
           L360 40
           L375 52
           H600"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await api.login({
        email,
        password,
      });

      localStorage.setItem("nabd_user", JSON.stringify(user));

      if (remember) {
        localStorage.setItem("nabd_remember", "1");
      } else {
        localStorage.removeItem("nabd_remember");
      }

      navigate("/verify-phone");
    } catch {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="login-page">

      {/* Background decorations */}
      <div className="login-glow glow-one"></div>
      <div className="login-glow glow-two"></div>
      <div className="login-glow glow-three"></div>

      <div className="medical-plus plus-one">+</div>
      <div className="medical-plus plus-two">+</div>

      <div className="decor-circle circle-one"></div>
      <div className="decor-circle circle-two"></div>

      <div className="login-content">

        {/* Logo */}
        <HeartLogo />

        {/* Header */}
        <div className="login-header">
          <h1>مرحبًا بعودتك</h1>
          <p>سجل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email */}
          <div className="login-field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني أو رقم الهاتف"
              required
              dir="rtl"
            />

            <span className="field-icon right">
              <MailIcon />
            </span>
          </div>

          {/* Password */}
          <div className="login-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              required
              dir="rtl"
            />

            <span className="field-icon right">
              <LockIcon />
            </span>

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "إخفاء كلمة المرور"
                  : "إظهار كلمة المرور"
              }
            >
              <EyeIcon visible={!showPassword} />
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="login-options">

            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              <span className="custom-check">
                {remember && "✓"}
              </span>

              <span>تذكرني</span>
            </label>

            <Link to="#" className="forgot-link">
              نسيت كلمة المرور؟
            </Link>

          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Login button */}
          <button type="submit" className="login-button">
            <span className="button-arrow">→</span>
            <span>تسجيل الدخول</span>
          </button>

        </form>

        {/* Divider */}
        <div className="login-divider">
          <span></span>
          <b>أو</b>
          <span></span>
        </div>

        {/* Social buttons */}
        <div className="social-login">

          {/* Google */}
          <button
            type="button"
            className="social-card google"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            className="social-card apple"
          >
            <AppleIcon />
            <span>Apple</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="social-card facebook"
          >
            <FacebookIcon />
            <span>Facebook</span>
          </button>

        </div>

        {/* Signup */}
        <p className="signup-text">
          ليس لديك حساب؟
          <Link to="/signup">إنشاء حساب جديد</Link>
        </p>

      </div>

      {/* Bottom waves */}
      <div className="login-bottom">
        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>

        <div className="heartbeat-container">
          <Heartbeat />
        </div>

        <div className="bottom-heart">♡</div>
      </div>

    </div>
  );
}

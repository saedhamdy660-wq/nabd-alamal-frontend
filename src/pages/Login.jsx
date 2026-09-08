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
              aria-label="إظهار كلمة المرور"
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

          <button type="button" className="social-card google">
            <span className="google-icon">G</span>
            <span>Google</span>
          </button>

          <button type="button" className="social-card apple">
            <span className="apple-icon">●</span>
            <span>Apple</span>
          </button>

          <button type="button" className="social-card facebook">
            <span className="facebook-icon">f</span>
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

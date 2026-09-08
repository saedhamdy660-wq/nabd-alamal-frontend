import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function GoogleIcon() {
  return (
    <svg
      className="social-svg google-svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
      />

      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.5C14.7 15 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
      />

      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.7 34.4 27 36 24 36c-5.1 0-9.4-3.4-11-8l-6.5 5C9.8 39.4 16.3 44 24 44Z"
      />

      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-4 5.4-7.3 6.5l6.5 5.4C38.3 36.2 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      className="social-svg apple-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 7 1.1 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.3.9-1.3 1.2-2.6 1.2-2.7-.1 0-2.5-1-2.5-3.8Zm-2.3-6.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      className="social-svg facebook-svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#1877F2" />

      <path
        fill="white"
        d="M27 39V26h4.4l.7-5H27v-3.2c0-1.5.4-2.5 2.6-2.5H32V11c-.4-.1-1.8-.2-3.5-.2-3.5 0-5.9 2.1-5.9 6v4.2h-4v5h4v13H27Z"
      />
    </svg>
  );
}

function HeartLogo() {
  return (
    <div className="login-logo">
      <div className="login-logo-ring">
        <div className="login-logo-inner">
          <svg
            viewBox="0 0 100 100"
            className="heart-logo-svg"
            aria-hidden="true"
          >
            <path
              d="M50 78
                 C46 74 20 58 20 38
                 C20 26 29 19 39 19
                 C45 19 49 22 50 27
                 C51 22 55 19 61 19
                 C71 19 80 26 80 38
                 C80 58 54 74 50 78Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M28 46
                 H39
                 L44 37
                 L49 55
                 L55 43
                 L59 48
                 H72"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      className="field-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="field-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg
      className="password-eye"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9.9 4.3A10.7 10.7 0 0 1 12 4c5.5 0 9.5 5 10 8-.2 1.3-1.1 2.9-2.5 4.3M6.2 6.2C4.2 7.5 2.7 9.6 2 12c.8 3.1 4.6 8 10 8 1.2 0 2.4-.2 3.4-.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className="password-eye"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="login-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("من فضلك أدخل البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setLoading(true);

      const result = await api.login({
        email: email.trim(),
        password,
      });

      localStorage.setItem("nabd_user", JSON.stringify(result));

      if (remember) {
        localStorage.setItem("nabd_remember", "true");
      } else {
        localStorage.removeItem("nabd_remember");
      }

      navigate("/verify-phone");
    } catch (err) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-background-decoration login-decoration-one" />
      <div className="login-background-decoration login-decoration-two" />

      <main className="login-content">
        {/* Logo */}
        <HeartLogo />

        {/* Header */}
        <header className="login-header">
          <h1>مرحبًا بعودتك</h1>
          <p>سجل دخولك للمتابعة</p>
        </header>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-field">
            <MailIcon />

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني أو رقم الهاتف"
              autoComplete="username"
              dir="rtl"
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <LockIcon />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              autoComplete="current-password"
              dir="rtl"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
            >
              <EyeIcon hidden={showPassword} />
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="login-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />

              <span className="custom-checkbox">
                {remember && "✓"}
              </span>

              <span>تذكرني</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() => {
                // يمكن ربطها بصفحة استعادة كلمة المرور لاحقًا
              }}
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* Error */}
          {error && <div className="login-error">{error}</div>}

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            <span>{loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</span>

            {!loading && <ArrowIcon />}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span />
          <p>أو</p>
          <span />
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button type="button" className="social-card google">
            <GoogleIcon />
            <span>Google</span>
          </button>

          <button type="button" className="social-card apple">
            <AppleIcon />
            <span>Apple</span>
          </button>

          <button type="button" className="social-card facebook">
            <FacebookIcon />
            <span>Facebook</span>
          </button>
        </div>

        {/* Signup */}
        <div className="signup-prompt">
          <span>ليس لديك حساب؟</span>

          <Link to="/signup">
            إنشاء حساب جديد
          </Link>
        </div>
      </main>

      {/* Bottom Decoration */}
      <div className="login-bottom-decoration">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M0 130
              C180 80 250 170 400 130
              C560 85 620 190 780 135
              C940 80 1020 180 1160 125
              C1270 85 1340 100 1440 65
              V220
              H0
              Z
            "
            fill="rgba(10,168,143,0.25)"
          />

          <path
            d="
              M0 155
              C170 105 260 195 420 150
              C580 105 670 205 820 150
              C980 95 1050 195 1190 140
              C1300 100 1370 115 1440 80
            "
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="4"
          />

          <path
            d="
              M0 185
              C190 130 280 215 450 175
              C600 135 690 220 850 175
              C1000 130 1100 215 1240 165
              C1330 135 1380 150 1440 115
            "
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

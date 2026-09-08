import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="url(#verifyGradient)" />

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
        id="verifyGradient"
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

export default function PhoneVerify() {
  const [digits, setDigits] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const refs = useRef([]);
  const navigate = useNavigate();

  const stored = JSON.parse(
    localStorage.getItem("nabd_user") || "null"
  );

  const phoneNumber = stored?.phone || "";

  const updateDigit = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;

    const next = [...digits];
    next[i] = val;

    setDigits(next);

    if (val && i < 5) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (
      e.key === "Backspace" &&
      !digits[i] &&
      i > 0
    ) {
      refs.current[i - 1]?.focus();
    }
  };

  const confirm = (e) => {
    e.preventDefault();

    if (digits.join("").length !== 6) {
      return;
    }

    navigate("/location-permission");
  };

  return (
    <div className="phone-verify-page">
      <div className="phone-verify-orb phone-verify-orb-1" />
      <div className="phone-verify-orb phone-verify-orb-2" />

      <div className="phone-verify-plus plus-1">
        +
      </div>

      <div className="phone-verify-plus plus-2">
        +
      </div>

      <button
        className="phone-verify-back"
        onClick={() => navigate(-1)}
        type="button"
        aria-label="رجوع"
      >
        <BackIcon />
      </button>

      <main className="phone-verify-content">
        <div className="phone-verify-logo">
          <Logo />
        </div>

        <h1>تأكيد رقم الهاتف</h1>

        <p className="phone-verify-subtitle">
          أدخل الرمز المرسل إلى رقمك
        </p>

        <div className="phone-verify-number">
          {phoneNumber ||
            "لم يتم العثور على رقم الهاتف"}
        </div>

        <form onSubmit={confirm}>
          <div className="phone-verify-otp">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) =>
                  (refs.current[i] = el)
                }
                value={digit}
                onChange={(e) =>
                  updateDigit(
                    i,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(i, e)
                }
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label={`رمز ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="phone-verify-resend"
          >
            إعادة إرسال الرمز{" "}
            <span>(00:45)</span>
          </button>

          <button
            className="phone-verify-submit"
            type="submit"
            disabled={
              digits.join("").length !== 6
            }
          >
            <span>تأكيد</span>

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
          </button>
        </form>
      </main>

      <div className="phone-verify-waves">
        <div className="phone-wave wave-1" />
        <div className="phone-wave wave-2" />
        <div className="phone-wave wave-3" />

        <div className="phone-verify-ecg">
          <svg
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0 42H135L150 42L160 30L171 55L184 12L198 42H310L325 42L337 32L348 54L360 19L374 42H500"
              fill="none"
              stroke="white"
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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Logo() {
  return (
    <div className="signup-logo">
      <div className="signup-logo-heart">♥</div>
      <span>نبض الأمل</span>
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.5c1 2.2 2.8 4 5 5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.6 18.5 5.5 13.4 5.5 7.5c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

function IdCardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="2" />
      <path d="M5.5 15c.7-1.4 1.6-2 2.5-2s1.8.6 2.5 2M13 10h5M13 14h5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ hidden = false }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.4 2.6-3 4M6.1 6.1C3.8 7.7 2.3 10 1.5 12c1 2.5 4.5 7 10.5 7 1 0 1.9-.1 2.8-.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5 2 12l7 7" />
      <path d="M2 12h20" />
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
    nationalId: "",
    password: "",
    confirm: "",
    bloodType: "",
    lastDonation: "",
    chronicDisease: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setError("");
  };

  const handleNationalIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 14);

    setForm((prev) => ({
      ...prev,
      nationalId: value,
    }));

    setError("");
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setError("");

    if (type === "user") {
      setForm((prev) => ({
        ...prev,
        bloodType: "",
        lastDonation: "",
        chronicDisease: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const nationalId = form.nationalId.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !nationalId ||
      !form.password ||
      !form.confirm
    ) {
      setError("من فضلك أكمل جميع البيانات المطلوبة");
      return;
    }

    if (nationalId.length !== 14) {
      setError("الرقم القومي يجب أن يكون 14 رقمًا");
      return;
    }

    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل");
      return;
    }

    if (form.password !== form.confirm) {
      setError("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }

    if (accountType === "donor") {
      if (!form.bloodType) {
        setError("من فضلك اختر فصيلة الدم");
        return;
      }

      if (!form.lastDonation) {
        setError("من فضلك أدخل تاريخ آخر تبرع بالدم");
        return;
      }

      if (!form.chronicDisease) {
        setError("من فضلك اختر هل لديك أمراض مزمنة أم لا");
        return;
      }
    }

    try {
      setLoading(true);

      const registerData = {
        name,
        email,
        phone,
        nationalId,
        password: form.password,

        accountType,

        bloodType:
          accountType === "donor"
            ? form.bloodType
            : "",

        lastDonation:
          accountType === "donor"
            ? form.lastDonation
            : "",

        chronicDisease:
          accountType === "donor"
            ? form.chronicDisease === "نعم"
            : false,
      };

      const user = await api.register(registerData);

      const savedUser = {
        ...user,

        name,
        email,
        phone,
        nationalId,

        accountType,

        bloodType:
          accountType === "donor"
            ? form.bloodType
            : "",

        lastDonation:
          accountType === "donor"
            ? form.lastDonation
            : "",

        chronicDisease:
          accountType === "donor"
            ? form.chronicDisease === "نعم"
            : false,

        phoneVerified: false,
        verificationCode: user?.verificationCode || "",
      };

      localStorage.setItem(
        "nabd_user",
        JSON.stringify(savedUser)
      );

      navigate("/verify-phone", {
        state: {
          phone,
          user: savedUser,
        },
      });
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err?.message ||
          "حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page" dir="rtl">
      <div className="signup-container">

        <div className="signup-header">
          <Logo />

          <button
            type="button"
            className="signup-back"
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            <BackIcon />
          </button>
        </div>

        <div className="signup-content">

          <div className="signup-title-section">
            <h1>إنشاء حساب</h1>

            <p>
              انضم إلى نبض الأمل وساعد في إنقاذ حياة
            </p>
          </div>

          <div className="signup-account-types">

            <button
              type="button"
              className={
                accountType === "user"
                  ? "signup-account-type active"
                  : "signup-account-type"
              }
              onClick={() =>
                handleAccountTypeChange("user")
              }
            >
              <div className="signup-account-icon">
                <UserIcon />
              </div>

              <div>
                <strong>مستخدم</strong>
                <span>للاستفادة من خدمات التطبيق</span>
              </div>
            </button>

            <button
              type="button"
              className={
                accountType === "donor"
                  ? "signup-account-type active"
                  : "signup-account-type"
              }
              onClick={() =>
                handleAccountTypeChange("donor")
              }
            >
              <div className="signup-account-icon">
                <HeartIcon />
              </div>

              <div>
                <strong>متبرع</strong>
                <span>للمساعدة في إنقاذ حياة الآخرين</span>
              </div>
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
                placeholder="الاسم بالكامل"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
              />
            </div>

            <div className="signup-field">
              <div className="signup-field-icon">
                <MailIcon />
              </div>

              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>

            <div className="signup-field">
              <div className="signup-field-icon">
                <PhoneIcon />
              </div>

              <input
                type="tel"
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={update("phone")}
                autoComplete="tel"
              />
            </div>

            <div className="signup-field">
              <div className="signup-field-icon">
                <IdCardIcon />
              </div>

              <input
                type="text"
                inputMode="numeric"
                placeholder="الرقم القومي"
                value={form.nationalId}
                onChange={handleNationalIdChange}
                maxLength={14}
                autoComplete="off"
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
                placeholder="كلمة المرور"
                value={form.password}
                onChange={update("password")}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "إخفاء كلمة المرور"
                    : "إظهار كلمة المرور"
                }
              >
                <EyeIcon hidden={showPassword} />
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
                placeholder="تأكيد كلمة المرور"
                value={form.confirm}
                onChange={update("confirm")}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowConfirm((prev) => !prev)
                }
                aria-label={
                  showConfirm
                    ? "إخفاء كلمة المرور"
                    : "إظهار كلمة المرور"
                }
              >
                <EyeIcon hidden={showConfirm} />
              </button>
            </div>

            {accountType === "donor" && (
              <>

                <div className="signup-field">
                  <div className="signup-field-icon">
                    <HeartIcon />
                  </div>

                  <select
                    value={form.bloodType}
                    onChange={update("bloodType")}
                    required
                  >
                    <option value="" disabled>
                      فصيلة الدم
                    </option>

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="signup-field">
                  <div className="signup-field-icon">
                    <HeartIcon />
                  </div>

                  <select
                    value={form.chronicDisease}
                    onChange={update("chronicDisease")}
                    required
                  >
                    <option value="" disabled>
                      هل لديك أمراض مزمنة؟
                    </option>

                    <option value="نعم">
                      نعم
                    </option>

                    <option value="لا">
                      لا
                    </option>
                  </select>
                </div>

                <div
                  className={
                    form.lastDonation
                      ? "signup-field signup-date-field has-value"
                      : "signup-field signup-date-field"
                  }
                >
                  <div className="signup-field-icon">
                    <HeartIcon />
                  </div>

                  {!form.lastDonation && (
                    <span className="signup-date-placeholder">
                      تاريخ آخر التبرع بالدم
                    </span>
                  )}

                  <input
                    type="date"
                    value={form.lastDonation}
                    onChange={update("lastDonation")}
                    max={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    aria-label="تاريخ آخر التبرع بالدم"
                    required
                  />
                </div>

              </>
            )}

            {error && (
              <div className="signup-error">
                {error}
              </div>
            )}

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

          <div className="signup-login-link">
            لديك حساب بالفعل؟{" "}
            <Link to="/login">
              تسجيل الدخول
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

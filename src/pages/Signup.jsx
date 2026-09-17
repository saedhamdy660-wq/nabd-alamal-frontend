import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Logo = () => (
  <svg viewBox="0 0 64 64" width="64" height="64">
    <circle cx="32" cy="32" r="30" fill="#0aa88f" />
    <path
      d="M32 48C29 44 18 36 18 27C18 21 22 18 27 18C30 18 32 20 32 23C32 20 34 18 37 18C42 18 46 21 46 27C46 36 35 44 32 48Z"
      fill="white"
    />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.8 8.8C20.8 14 12 20 12 20S3.2 14 3.2 8.8A5 5 0 0 1 12 6a5 5 0 0 1 8.8 2.8Z" />
  </svg>
);

const BloodDropIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 3h3l2 5-2 2c1 2 2 3 4 4l2-2 5 2v3c0 1-1 2-2 2C11 19 5 13 5 5c0-1 1-2 2-2Z" />
  </svg>
);

const IdCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = ({ off = false }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

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

  const dateInputRef = useRef(null);

  const update = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleNationalIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 14);

    setForm({
      ...form,
      nationalId: value,
    });
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

  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.nationalId ||
      !form.password ||
      !form.confirm
    ) {
      setError("من فضلك أكمل جميع البيانات");
      return;
    }

    if (!/^\d{14}$/.test(form.nationalId)) {
      setError("الرقم القومي يجب أن يتكون من 14 رقم");
      return;
    }

    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
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
        setError("من فضلك حدد هل لديك أمراض مزمنة أم لا");
        return;
      }
    }

    try {
      setLoading(true);

      const user = await api.register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        nationalId: form.nationalId,
        password: form.password,
        accountType,
        bloodType: accountType === "donor" ? form.bloodType : "",
        lastDonation: accountType === "donor" ? form.lastDonation : "",
        chronicDisease:
          accountType === "donor"
            ? form.chronicDisease === "نعم"
            : false,
      });

      const savedUser = {
        ...user,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        nationalId: form.nationalId,
        bloodType: accountType === "donor" ? form.bloodType : "",
        lastDonation: accountType === "donor" ? form.lastDonation : "",
        chronicDisease:
          accountType === "donor"
            ? form.chronicDisease === "نعم"
            : false,
        accountType,
        phoneVerified: false,
        identityVerified: false,
        verificationStatus: "pending",
      };

      localStorage.setItem("nabd_user", JSON.stringify(savedUser));

      navigate("/verify-phone");
    } catch (err) {
      setError(err?.message || "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <style>{`
        .signup-field {
          position: relative !important;
          direction: rtl !important;
          box-sizing: border-box !important;
        }

        .signup-field input {
          width: 100% !important;
          box-sizing: border-box !important;
          direction: rtl !important;
          text-align: right !important;
          padding-right: 58px !important;
          padding-left: 48px !important;
          color: #999 !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: 1.5 !important;
        }

        .signup-field input::placeholder {
          color: #999 !important;
          opacity: 1 !important;
          direction: rtl !important;
          text-align: right !important;
        }

        .signup-field input[dir="ltr"] {
          direction: ltr !important;
          text-align: right !important;
          padding-right: 58px !important;
          padding-left: 48px !important;
        }

        .signup-field input[dir="ltr"]::placeholder {
          direction: rtl !important;
          text-align: right !important;
          color: #999 !important;
          opacity: 1 !important;
        }

        .signup-field-icon {
          position: absolute !important;
          right: 16px !important;
          left: auto !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 23px !important;
          height: 23px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 3 !important;
          color: #0a9685 !important;
        }

        .signup-field-icon svg {
          width: 23px !important;
          height: 23px !important;
        }

        .signup-donor-select {
          width: 100% !important;
          box-sizing: border-box !important;
          direction: rtl !important;
          text-align: right !important;
          padding-right: 58px !important;
          padding-left: 48px !important;
          color: #999 !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: 1.5 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
        }

        .signup-donor-select option {
          direction: rtl !important;
          text-align: right !important;
          color: #555 !important;
        }

        .signup-donor-select:valid {
          color: #555 !important;
        }

        .signup-donor-chevron {
          position: absolute !important;
          left: 16px !important;
          right: auto !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 20px !important;
          height: 20px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          pointer-events: none !important;
          color: #0a9685 !important;
          z-index: 3 !important;
        }

        .signup-donor-chevron svg {
          width: 20px !important;
          height: 20px !important;
        }

        .signup-date-field {
          position: relative !important;
        }

        .signup-donor-date-text {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          height: 50px !important;
          box-sizing: border-box !important;
          direction: rtl !important;
          text-align: right !important;
          margin: 0 !important;
          padding-right: 58px !important;
          padding-left: 48px !important;
          color: #999 !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: 1.5 !important;
        }

        .signup-donor-date-text.selected {
          color: #555 !important;
        }

        .signup-date-field input[type="date"] {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .signup-eye {
          position: absolute !important;
          left: 14px !important;
          right: auto !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 28px !important;
          height: 28px !important;
          padding: 0 !important;
          margin: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #78938f !important;
          z-index: 4 !important;
        }

        .signup-eye svg {
          width: 21px !important;
          height: 21px !important;
        }

        .signup-field *,
        .signup-field *::before,
        .signup-field *::after {
          box-sizing: border-box !important;
        }

        /* 📱 ضبط المقاسات للموبايل */
        @media (max-width: 480px) {
          .signup-content {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .signup-content h1 {
            font-size: 24px !important;
            margin-bottom: 6px !important;
          }

          .signup-subtitle {
            font-size: 14px !important;
          }

          .signup-account-types {
            gap: 8px !important;
          }

          .account-type {
            min-height: 44px !important;
            font-size: 14px !important;
          }

          .signup-form {
            gap: 10px !important;
          }

          .signup-field {
            height: 50px !important;
            min-height: 50px !important;
          }

          .signup-field input,
          .signup-donor-select {
            height: 50px !important;
            font-size: 14px !important;
            padding-right: 56px !important;
            padding-left: 46px !important;
          }

          .signup-field input::placeholder {
            font-size: 14px !important;
          }

          .signup-donor-date-text {
            height: 50px !important;
            font-size: 14px !important;
            padding-right: 56px !important;
            padding-left: 46px !important;
          }

          .signup-field-icon {
            right: 15px !important;
            width: 22px !important;
            height: 22px !important;
          }

          .signup-field-icon svg {
            width: 22px !important;
            height: 22px !important;
          }

          .signup-donor-chevron {
            left: 15px !important;
            width: 19px !important;
            height: 19px !important;
          }

          .signup-donor-chevron svg {
            width: 19px !important;
            height: 19px !important;
          }

          .signup-eye {
            left: 12px !important;
            width: 27px !important;
            height: 27px !important;
          }

          .signup-eye svg {
            width: 20px !important;
            height: 20px !important;
          }

          .signup-submit {
            min-height: 48px !important;
            font-size: 15px !important;
          }

          .signup-login {
            font-size: 13px !important;
          }
        }

        /* 📱 موبايلات صغيرة جدًا */
        @media (max-width: 360px) {
          .signup-content {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .signup-content h1 {
            font-size: 22px !important;
          }

          .signup-field,
          .signup-field input,
          .signup-donor-select,
          .signup-donor-date-text {
            height: 48px !important;
            min-height: 48px !important;
          }

          .signup-field input,
          .signup-donor-select,
          .signup-donor-date-text {
            font-size: 13px !important;
          }

          .signup-field input::placeholder {
            font-size: 13px !important;
          }
        }
      `}</style>

      <div className="signup-orb signup-orb-1" />
      <div className="signup-orb signup-orb-2" />

      <div className="signup-plus signup-plus-1">+</div>
      <div className="signup-plus signup-plus-2">+</div>

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
            onClick={() => handleAccountTypeChange("donor")}
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
            onClick={() => handleAccountTypeChange("user")}
          >
            <span className="account-icon">
              <UserIcon />
            </span>

            <span>مستخدم</span>
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <div className="signup-field-icon">
              <UserIcon />
            </div>

            <input
              className="signup-input"
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
              className="signup-input"
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
              className="signup-input"
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
              <IdCardIcon />
            </div>

            <input
              className="signup-input"
              type="text"
              inputMode="numeric"
              value={form.nationalId}
              onChange={handleNationalIdChange}
              placeholder="الرقم القومي - 14 رقم"
              autoComplete="off"
              dir="ltr"
              maxLength={14}
            />
          </div>

          {accountType === "donor" && (
            <>
              <div className="signup-field signup-donor-field">
                <div className="signup-field-icon">
                  <BloodDropIcon />
                </div>

                <select
                  className="signup-donor-select"
                  value={form.bloodType}
                  onChange={update("bloodType")}
                  aria-label="فصيلة الدم"
                  required
                >
                  <option value="" disabled>
                    اختر فصيلة الدم
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

                <div className="signup-donor-chevron">
                  <ChevronDownIcon />
                </div>
              </div>

              <div
                className="signup-field signup-donor-field signup-date-field"
                onClick={openDatePicker}
              >
                <div className="signup-field-icon">
                  <CalendarIcon />
                </div>

                <span
                  className={
                    form.lastDonation
                      ? "signup-donor-date-text selected"
                      : "signup-donor-date-text"
                  }
                >
                  {form.lastDonation
                    ? form.lastDonation
                    : "تاريخ آخر تبرع بالدم"}
                </span>

                <input
                  ref={dateInputRef}
                  type="date"
                  value={form.lastDonation}
                  onChange={update("lastDonation")}
                  max={new Date().toISOString().split("T")[0]}
                  aria-label="تاريخ آخر تبرع بالدم"
                />
              </div>

              <div className="signup-field signup-donor-field">
                <div className="signup-field-icon">
                  <PlusCircleIcon />
                </div>

                <select
                  className="signup-donor-select"
                  value={form.chronicDisease}
                  onChange={update("chronicDisease")}
                  aria-label="الأمراض المزمنة"
                  required
                >
                  <option value="" disabled>
                    هل لديك أمراض مزمنة؟
                  </option>

                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                <div className="signup-donor-chevron">
                  <ChevronDownIcon />
                </div>
              </div>
            </>
          )}

          <div className="signup-field">
            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              className="signup-input"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={update("password")}
              placeholder="كلمة المرور"
              autoComplete="new-password"
            />

            <button
              type="button"
              className="signup-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "إخفاء كلمة المرور"
                  : "إظهار كلمة المرور"
              }
            >
              <EyeIcon off={!showPassword} />
            </button>
          </div>

          <div className="signup-field">
            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              className="signup-input"
              type={showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={update("confirm")}
              placeholder="تأكيد كلمة المرور"
              autoComplete="new-password"
            />

            <button
              type="button"
              className="signup-eye"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={
                showConfirm
                  ? "إخفاء تأكيد كلمة المرور"
                  : "إظهار تأكيد كلمة المرور"
              }
            >
              <EyeIcon off={!showConfirm} />
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

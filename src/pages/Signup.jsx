import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

/* =========================
   Logo
========================= */

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

/* =========================
   User Icon
========================= */

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

/* =========================
   Heart Icon
========================= */

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

/* =========================
   Blood Drop Icon
========================= */

const BloodDropIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C12 3 6 9.5 6 14.3C6 17.8 8.7 20.5 12 20.5C15.3 20.5 18 17.8 18 14.3C18 9.5 12 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   Calendar Icon
========================= */

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3.5"
      y="5"
      width="17"
      height="16"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M7 3.5V7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M17 3.5V7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M3.5 9H20.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

/* =========================
   Plus Circle Icon
========================= */

const PlusCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="8.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M12 8V16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/* =========================
   Chevron Icon
========================= */

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M7 9L12 14L17 9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   Mail Icon
========================= */

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

/* =========================
   Phone Icon
========================= */

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

/* =========================
   ID Card Icon
========================= */

const IdCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <circle
      cx="8"
      cy="10"
      r="1.8"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M5.5 15C6 13.7 6.8 13 8 13C9.2 13 10 13.7 10.5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <path
      d="M13 9H18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M13 13H18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M13 16H16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/* =========================
   Lock Icon
========================= */

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

/* =========================
   Eye Icon
========================= */

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

/* =========================
   Back Icon
========================= */

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

/* =========================
   Signup
========================= */

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
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 14);

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
      if (
        typeof dateInputRef.current.showPicker ===
        "function"
      ) {
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
      });

      const savedUser = {
        ...user,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        nationalId: form.nationalId,

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

        accountType,

        phoneVerified: false,
        identityVerified: false,
        verificationStatus: "pending",
      };

      localStorage.setItem(
        "nabd_user",
        JSON.stringify(savedUser)
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

      <style>{`

        /* =========================================
           توحيد الكلام ناحية اليمين
        ========================================= */

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

          padding-right: 68px !important;
          padding-left: 58px !important;

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

        /*
          الهاتف والرقم القومي:
          الأرقام تظل طبيعية، لكن مكان النص يمين
        */

        .signup-field input[dir="ltr"] {
          direction: ltr !important;
          text-align: right !important;

          padding-right: 68px !important;
          padding-left: 58px !important;
        }

        .signup-field input[dir="ltr"]::placeholder {
          direction: rtl !important;
          text-align: right !important;
          color: #999 !important;
          opacity: 1 !important;
        }


        /* =========================================
           الأيقونات - نفس الشكل القديم
        ========================================= */

        .signup-field-icon {
          position: absolute !important;

          right: 20px !important;
          left: auto !important;

          top: 50% !important;
          transform: translateY(-50%) !important;

          width: 28px !important;
          height: 28px !important;

          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          z-index: 3 !important;

          color: #0a9685 !important;
        }

        .signup-field-icon svg {
          width: 28px !important;
          height: 28px !important;
        }


        /* =========================================
           Select - الكلام ناحية اليمين
        ========================================= */

        .signup-donor-select {
          width: 100% !important;
          box-sizing: border-box !important;

          direction: rtl !important;
          text-align: right !important;

          padding-right: 68px !important;
          padding-left: 58px !important;

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


        /* =========================================
           سهم الـ Select - نفس القديم
        ========================================= */

        .signup-donor-chevron {
          position: absolute !important;

          left: 20px !important;
          right: auto !important;

          top: 50% !important;
          transform: translateY(-50%) !important;

          width: 24px !important;
          height: 24px !important;

          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          pointer-events: none !important;

          color: #0a9685 !important;

          z-index: 3 !important;
        }

        .signup-donor-chevron svg {
          width: 24px !important;
          height: 24px !important;
        }


        /* =========================================
           تاريخ آخر تبرع - يمين
        ========================================= */

        .signup-date-field {
          position: relative !important;
        }

        .signup-donor-date-text {
          display: block !important;

          width: 100% !important;
          box-sizing: border-box !important;

          direction: rtl !important;
          text-align: right !important;

          margin: 0 !important;

          padding-right: 68px !important;
          padding-left: 58px !important;

          color: #999 !important;

          font-family: inherit !important;
          font-size: inherit !important;
          line-height: 1.5 !important;
        }

        .signup-donor-date-text.selected {
          color: #555 !important;
        }


        /* =========================================
           التاريخ الحقيقي مخفي
        ========================================= */

        .signup-date-field input[type="date"] {
          position: absolute !important;

          width: 1px !important;
          height: 1px !important;

          opacity: 0 !important;
          pointer-events: none !important;
        }


        /* =========================================
           العين - نفس الشكل القديم
        ========================================= */

        .signup-eye {
          position: absolute !important;

          left: 18px !important;
          right: auto !important;

          top: 50% !important;
          transform: translateY(-50%) !important;

          width: 32px !important;
          height: 32px !important;

          padding: 0 !important;
          margin: 0 !important;

          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          color: #78938f !important;

          z-index: 4 !important;
        }

        .signup-eye svg {
          width: 25px !important;
          height: 25px !important;
        }


        .signup-field *,
        .signup-field *::before,
        .signup-field *::after {
          box-sizing: border-box !important;
        }


        /* =========================================
           📱 الموبايل
           تصغير بسيط فقط
        ========================================= */

        @media (max-width: 480px) {

          .signup-field input,
          .signup-donor-select {
            font-size: 15px !important;
          }

          .signup-field input::placeholder {
            font-size: 15px !important;
          }

          .signup-donor-date-text {
            font-size: 15px !important;
          }

          .signup-field-icon {
            width: 26px !important;
            height: 26px !important;

            right: 18px !important;
          }

          .signup-field-icon svg {
            width: 26px !important;
            height: 26px !important;
          }

          .signup-donor-chevron {
            width: 22px !important;
            height: 22px !important;

            left: 18px !important;
          }

          .signup-donor-chevron svg {
            width: 22px !important;
            height: 22px !important;
          }

          .signup-eye {
            width: 30px !important;
            height: 30px !important;

            left: 16px !important;
          }

          .signup-eye svg {
            width: 23px !important;
            height: 23px !important;
          }

          .signup-field input,
          .signup-donor-select {
            padding-right: 62px !important;
            padding-left: 54px !important;
          }

          .signup-donor-date-text {
            padding-right: 62px !important;
            padding-left: 54px !important;
          }
        }

      `}</style>


      {/* =========================
          Background
      ========================= */}

      <div className="signup-orb signup-orb-1" />
      <div className="signup-orb signup-orb-2" />

      <div className="signup-plus signup-plus-1">
        +
      </div>

      <div className="signup-plus signup-plus-2">
        +
      </div>


      {/* =========================
          Back
      ========================= */}

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

        <h1>
          إنشاء حساب جديد
        </h1>

        <p className="signup-subtitle">
          انضم إلى منصة نبض الأمل
        </p>


        {/* Heartbeat */}

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


        {/* Account Types */}

        <div className="signup-account-types">

          <button
            type="button"
            className={
              accountType === "donor"
                ? "account-type active"
                : "account-type"
            }
            onClick={() =>
              handleAccountTypeChange("donor")
            }
          >
            <span className="account-icon">
              <HeartIcon />
            </span>

            <span>
              متبرع
            </span>
          </button>


          <button
            type="button"
            className={
              accountType === "user"
                ? "account-type active"
                : "account-type"
            }
            onClick={() =>
              handleAccountTypeChange("user")
            }
          >
            <span className="account-icon">
              <UserIcon />
            </span>

            <span>
              مستخدم
            </span>
          </button>

        </div>


        {/* Form */}

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {/* الاسم */}

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


          {/* البريد */}

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


          {/* الهاتف */}

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


          {/* الرقم القومي */}

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


          {/* Donor */}

          {accountType === "donor" && (
            <>

              {/* فصيلة الدم */}

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

                  <option
                    value=""
                    disabled
                  >
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


              {/* تاريخ آخر تبرع */}

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
                  max={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  aria-label="تاريخ آخر تبرع بالدم"
                />

              </div>


              {/* الأمراض المزمنة */}

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

                  <option
                    value=""
                    disabled
                  >
                    هل لديك أمراض مزمنة؟
                  </option>

                  <option value="نعم">
                    نعم
                  </option>

                  <option value="لا">
                    لا
                  </option>

                </select>

                <div className="signup-donor-chevron">
                  <ChevronDownIcon />
                </div>

              </div>

            </>
          )}


          {/* كلمة المرور */}

          <div className="signup-field">

            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              className="signup-input"
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
                setShowPassword(!showPassword)
              }
              aria-label={
                showPassword
                  ? "إخفاء كلمة المرور"
                  : "إظهار كلمة المرور"
              }
            >
              <EyeIcon
                off={!showPassword}
              />
            </button>

          </div>


          {/* تأكيد كلمة المرور */}

          <div className="signup-field">

            <div className="signup-field-icon">
              <LockIcon />
            </div>

            <input
              className="signup-input"
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
                setShowConfirm(!showConfirm)
              }
              aria-label={
                showConfirm
                  ? "إخفاء تأكيد كلمة المرور"
                  : "إظهار تأكيد كلمة المرور"
              }
            >
              <EyeIcon
                off={!showConfirm}
              />
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
            className="signup-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "جاري إنشاء الحساب..."
              : "إنشاء الحساب"}
          </button>

        </form>


        {/* Login */}

        <div className="signup-login">

          <span>
            لديك حساب بالفعل؟
          </span>

          <Link to="/login">
            تسجيل الدخول
          </Link>

        </div>

      </main>


      {/* Bottom */}

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

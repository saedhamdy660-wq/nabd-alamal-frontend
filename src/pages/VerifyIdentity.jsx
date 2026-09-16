import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
hhhhhhhh
const Logo = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="url(#identityGradient)" />

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
        id="identityGradient"
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

const IdCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <circle
      cx="8"
      cy="11"
      r="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M5.5 16C6.2 14.5 7.1 14 8 14C8.9 14 9.8 14.5 10.5 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M13 10H18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M13 14H18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M4 8.5C4 7.67 4.67 7 5.5 7H8L9.2 5H14.8L16 7H18.5C19.33 7 20 7.67 20 8.5V17.5C20 18.33 19.33 19 18.5 19H5.5C4.67 19 4 18.33 4 17.5V8.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    <circle
      cx="12"
      cy="13"
      r="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M20 11C19.5 7.6 16.6 5 13 5C9.1 5 6 8.1 6 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M4 8L6 12L10 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M4 13C4.5 16.4 7.4 19 11 19C14.9 19 18 15.9 18 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M20 16L18 12L14 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
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
);

function IdentityCard({
  title,
  subtitle,
  image,
  inputRef,
  onSelect,
  onRetake,
}) {
  return (
    <div
      className={`verify-identity-card ${
        image ? "has-image" : ""
      }`}
    >
      {image ? (
        <div className="verify-identity-preview">
          <img
            src={image}
            alt={title}
          />

          <div className="verify-identity-preview-overlay">
            <button
              type="button"
              className="verify-identity-retake"
              onClick={onRetake}
            >
              <RefreshIcon />
              إعادة التصوير
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="verify-identity-card-icon">
            <IdCardIcon />
          </div>

          <h2 className="verify-identity-card-title">
            {title}
          </h2>

          <p className="verify-identity-card-subtitle">
            {subtitle}
          </p>

          <button
            type="button"
            className="verify-identity-upload"
            onClick={onSelect}
          >
            <CameraIcon />
            تصوير البطاقة
          </button>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onSelect}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default function VerifyIdentity() {
  const navigate = useNavigate();

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (type, event) => {
    const file =
      event?.target?.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختر صورة صحيحة");
      return;
    }

    setError("");

    const imageUrl = URL.createObjectURL(file);

    if (type === "front") {
      if (frontImage) {
        URL.revokeObjectURL(frontImage);
      }

      setFrontFile(file);
      setFrontImage(imageUrl);
    }

    if (type === "back") {
      if (backImage) {
        URL.revokeObjectURL(backImage);
      }

      setBackFile(file);
      setBackImage(imageUrl);
    }

    if (event?.target) {
      event.target.value = "";
    }
  };

  const openFrontCamera = () => {
    frontInputRef.current?.click();
  };

  const openBackCamera = () => {
    backInputRef.current?.click();
  };

  const removeFrontImage = () => {
    if (frontImage) {
      URL.revokeObjectURL(frontImage);
    }

    setFrontImage("");
    setFrontFile(null);
  };

  const removeBackImage = () => {
    if (backImage) {
      URL.revokeObjectURL(backImage);
    }

    setBackImage("");
    setBackFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!frontFile) {
      setError("من فضلك قم بتصوير وجه البطاقة");
      return;
    }

    if (!backFile) {
      setError("من فضلك قم بتصوير ظهر البطاقة");
      return;
    }

    try {
      setLoading(true);

      /*
        الصور موجودة حاليًا في State فقط.
        
        عند ربط الـ Backend يمكن هنا إرسال:
        frontFile
        backFile
        
        إلى API التحقق من الهوية بشكل آمن.
      */

      const currentUser = JSON.parse(
        localStorage.getItem("nabd_user") || "null"
      );

      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          identityVerified: true,
          verificationStatus: "verified",
        };

        localStorage.setItem(
          "nabd_user",
          JSON.stringify(updatedUser)
        );
      }

      /*
        بعد اكتمال توثيق الهوية:
        ننتقل إلى السماح بالموقع.
      */

      navigate("/location-permission");
    } catch (err) {
      setError(
        err?.message ||
          "حدث خطأ أثناء توثيق الهوية"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-identity-page">
      <div className="verify-identity-orb verify-identity-orb-1" />
      <div className="verify-identity-orb verify-identity-orb-2" />

      <div className="verify-identity-plus plus-1">
        +
      </div>

      <div className="verify-identity-plus plus-2">
        +
      </div>

      <button
        type="button"
        className="verify-identity-back"
        onClick={() => navigate(-1)}
        aria-label="رجوع"
      >
        <BackIcon />
      </button>

      <main className="verify-identity-content">
        <div className="verify-identity-logo">
          <Logo />
        </div>

        <h1>توثيق الهوية</h1>

        <p className="verify-identity-subtitle">
          لتأكيد هويتك وحماية المستخدمين، قم
          بتصوير الوجه الأمامي والخلفي لبطاقتك
          الشخصية.
        </p>

        <div className="verify-identity-note">
          <strong>مهم:</strong>{" "}
          تأكد أن البطاقة واضحة بالكامل، وأن
          البيانات ظاهرة بدون انعكاس أو تغطية.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="verify-identity-cards">
            <IdentityCard
              title="وجه البطاقة"
              subtitle="صوّر الوجه الأمامي للبطاقة"
              image={frontImage}
              inputRef={frontInputRef}
              onSelect={(event) => {
                if (event?.target?.files) {
                  handleImageChange(
                    "front",
                    event
                  );
                } else {
                  openFrontCamera();
                }
              }}
              onRetake={removeFrontImage}
            />

            <IdentityCard
              title="ظهر البطاقة"
              subtitle="صوّر الوجه الخلفي للبطاقة"
              image={backImage}
              inputRef={backInputRef}
              onSelect={(event) => {
                if (event?.target?.files) {
                  handleImageChange(
                    "back",
                    event
                  );
                } else {
                  openBackCamera();
                }
              }}
              onRetake={removeBackImage}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "14px",
                color: "#e23a3a",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="verify-identity-submit"
            disabled={
              !frontFile ||
              !backFile ||
              loading
            }
          >
            <span>
              {loading
                ? "جاري التأكيد..."
                : "تأكيد الهوية والمتابعة"}
            </span>

            {!loading && <ArrowIcon />}
          </button>
        </form>
      </main>
    </div>
  );
}

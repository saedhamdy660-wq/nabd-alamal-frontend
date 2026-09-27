import React from "react";

export default function BloodCenters() {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #fafdfc 0%, #f1faf8 55%, #e8f7f4 100%)",
        color: "#17332e",
        paddingBottom: "90px",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          padding: "22px 18px 14px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(250,253,252,.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #edf2f1",
        }}
      >
        <button
          onClick={() => window.history.back()}
          aria-label="رجوع"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            border: "1px solid #e3eeeb",
            background: "#ffffff",
            color: "#0aa88f",
            fontSize: "22px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "21px",
              fontWeight: 800,
            }}
          >
            مراكز وبنوك الدم
          </h1>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6b7c79",
              fontSize: "13px",
            }}
          >
            تبرع بالدم في أقرب مركز معتمد
          </p>
        </div>
      </header>

      {/* ================= INTRO ================= */}
      <section
        style={{
          margin: "18px",
          padding: "20px",
          borderRadius: "22px",
          background:
            "linear-gradient(135deg, #0aa88f 0%, #078876 100%)",
          color: "#ffffff",
          boxShadow: "0 12px 30px rgba(10,168,143,.18)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "17px",
            background: "rgba(255,255,255,.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            width="32"
            height="32"
            fill="none"
          >
            <path
              d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M25 39C26.5 43 29 45 33 45"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "20px",
          }}
        >
          تبرعك ممكن ينقذ حياة ❤️
        </h2>

        <p
          style={{
            margin: 0,
            lineHeight: 1.8,
            fontSize: "14px",
            opacity: 0.92,
          }}
        >
          ابحث عن أقرب مركز أو بنك دم، واعرف بيانات التواصل ومواعيد العمل
          قبل التوجه للتبرع.
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <div
        style={{
          margin: "0 18px 18px",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#0aa88f",
          }}
        >
          <circle
            cx="10.8"
            cy="10.8"
            r="6.8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          placeholder="ابحث عن مركز أو بنك دم..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: "54px",
            borderRadius: "17px",
            border: "1px solid #e3eeeb",
            outline: "none",
            padding: "0 48px 0 16px",
            fontSize: "14px",
            fontFamily: "inherit",
            background: "#ffffff",
            color: "#17332e",
          }}
        />
      </div>

      {/* ================= FILTERS ================= */}
      <div
        style={{
          display: "flex",
          gap: "9px",
          overflowX: "auto",
          padding: "0 18px 8px",
          scrollbarWidth: "none",
        }}
      >
        {["الأقرب إليك", "بنوك الدم", "مراكز التبرع"].map(
          (filter, index) => (
            <button
              key={filter}
              type="button"
              style={{
                flexShrink: 0,
                border: index === 0
                  ? "1px solid #0aa88f"
                  : "1px solid #e3eeeb",
                background: index === 0
                  ? "#e6f7f4"
                  : "#ffffff",
                color: index === 0
                  ? "#078876"
                  : "#6b7c79",
                borderRadius: "22px",
                padding: "10px 16px",
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* ================= MAP PLACEHOLDER ================= */}
      <section
        style={{
          margin: "14px 18px 20px",
          height: "190px",
          borderRadius: "22px",
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(135deg, #dff3ef 0%, #eef8f6 100%)",
          border: "1px solid #dcece8",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            backgroundImage:
              "linear-gradient(#b9dcd5 1px, transparent 1px), linear-gradient(90deg, #b9dcd5 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#0aa88f",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 22px rgba(10,168,143,.28)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="27"
            height="27"
            fill="none"
          >
            <path
              d="M12 21S19 15.5 19 9.5C19 5.9 16.3 3 12 3C7.7 3 5 5.9 5 9.5C5 15.5 12 21 12 21Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle
              cx="12"
              cy="9.5"
              r="2.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            left: "14px",
            background: "rgba(255,255,255,.94)",
            borderRadius: "14px",
            padding: "10px 13px",
            fontSize: "12px",
            color: "#536966",
            textAlign: "center",
          }}
        >
          خريطة أقرب مراكز وبنوك الدم
        </div>
      </section>

      {/* ================= TITLE ================= */}
      <div
        style={{
          padding: "0 18px",
          marginBottom: "12px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 800,
          }}
        >
          مراكز وبنوك الدم
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "13px",
            color: "#6b7c79",
          }}
        >
          الأماكن المتاحة للتبرع بالدم
        </p>
      </div>

      {/* ================= EMPTY DATA STATE ================= */}
      <section
        style={{
          margin: "0 18px",
          background: "#ffffff",
          border: "1px solid #edf2f1",
          borderRadius: "20px",
          padding: "24px 18px",
          textAlign: "center",
          boxShadow: "0 5px 18px rgba(23,51,46,.04)",
        }}
      >
        <div
          style={{
            width: "62px",
            height: "62px",
            margin: "0 auto 14px",
            borderRadius: "20px",
            background: "#e6f7f4",
            color: "#0aa88f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            width="34"
            height="34"
            fill="none"
          >
            <path
              d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "16px",
          }}
        >
          جاري تجهيز المراكز
        </h3>

        <p
          style={{
            margin: 0,
            color: "#6b7c79",
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          سيتم إضافة بيانات مراكز وبنوك الدم المعتمدة قريبًا، مع إمكانية
          معرفة الموقع ومواعيد العمل ووسائل التواصل.
        </p>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================
   Icons
========================= */

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 5h14v10a2 2 0 0 1-2 2H9l-4 3V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 9h6M9 12h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5 7 7 6 7-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7 4h3l1.3 4-2 1.6a14 14 0 0 0 5.1 5.1L16 12.7 20 14v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 7c0-1.7.9-3 2-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3 19 6v5c0 4.6-2.9 7.8-7 10-4.1-2.2-7-5.4-7-10V6l7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TermsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 3h9l4 4v14H6V3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5M9 12h6M9 16h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartHandIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 19s-7-4.3-7-9a3.7 3.7 0 0 1 7-1.5A3.7 3.7 0 0 1 19 10c0 4.7-7 9-7 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M4 17.5c1.8-.8 3.2-.5 4.5.6l1.2 1c.7.6 1.7.7 2.5.2l2.8-1.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform .2s ease",
      }}
    >
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================
   Bottom Nav Icons
========================= */

function UserNavIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellNavIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M10 20h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RequestsNavIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8.5 9h7M8.5 13h7M8.5 17h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeNavIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-9.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================
   Support Illustration
========================= */

function SupportIllustration() {
  return (
    <div className="support-illustration">

      <div className="support-circle">

        <svg viewBox="0 0 140 140">

          <circle
            cx="70"
            cy="70"
            r="58"
            fill="rgba(255,255,255,.45)"
          />

          {/* Headset */}
          <path
            d="M40 70a30 30 0 0 1 60 0"
            fill="none"
            stroke="#159b8a"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <rect
            x="35"
            y="67"
            width="14"
            height="27"
            rx="7"
            fill="#159b8a"
          />

          <rect
            x="91"
            y="67"
            width="14"
            height="27"
            rx="7"
            fill="#159b8a"
          />

          {/* Face */}
          <circle
            cx="70"
            cy="62"
            r="25"
            fill="#fff"
          />

          <circle
            cx="61"
            cy="60"
            r="2.5"
            fill="#286d6d"
          />

          <circle
            cx="79"
            cy="60"
            r="2.5"
            fill="#286d6d"
          />

          <path
            d="M62 70c5 5 11 5 16 0"
            fill="none"
            stroke="#159b8a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Microphone */}
          <path
            d="M96 83h11"
            stroke="#159b8a"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M107 83v8c0 4-3 7-7 7"
            fill="none"
            stroke="#159b8a"
            strokeWidth="3"
            strokeLinecap="round"
          />

        </svg>

      </div>

      <div className="support-chat-bubble">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}

/* =========================
   FAQ Data
========================= */

const faqData = [
  {
    question: "كيف يمكنني طلب دواء؟",
    answer:
      "من الصفحة الرئيسية اختر تبادل الأدوية، ثم ابحث عن اسم الدواء المطلوب. بعد ذلك افتح الدواء واختر طلب الدواء لإرسال طلبك."
  },

  {
    question: "كيف أطلب متبرع بالدم؟",
    answer:
      "ادخل إلى قسم التبرع بالدم، ثم اختر الحالة المناسبة لفصيلة الدم المطلوبة. يمكنك متابعة الطلب والتواصل مع المتبرع من خلال التطبيق."
  },

  {
    question: "كيف أتابع حالة طلبي؟",
    answer:
      "يمكنك الدخول إلى قسم الطلبات من القائمة السفلية لمتابعة جميع طلباتك ومعرفة آخر حالة لكل طلب."
  },

  {
    question: "هل بياناتي الشخصية آمنة؟",
    answer:
      "نحرص على حماية بيانات المستخدمين واستخدامها فقط لتقديم خدمات المنصة وتحسين تجربة الاستخدام."
  },

  {
    question: "كيف أتواصل مع فريق الدعم؟",
    answer:
      "يمكنك التواصل مع فريق الدعم من خلال البريد الإلكتروني أو الاتصال مباشرة من خلال خيارات التواصل الموجودة في هذه الصفحة."
  },
];

/* =========================
   Support Item
========================= */

function SupportItem({
  icon,
  title,
  subtitle,
  onClick,
  colorClass = "mint",
}) {
  return (
    <button
      className="support-item"
      onClick={onClick}
    >

      <div className={`support-item-icon ${colorClass}`}>
        {icon}
      </div>

      <div className="support-item-content">

        <strong>{title}</strong>

        <span>{subtitle}</span>

      </div>

      <div className="support-item-arrow">
        <ArrowIcon />
      </div>

    </button>
  );
}

/* =========================
   Main Component
========================= */

export default function Support() {

  const navigate = useNavigate();

  const [faqOpen, setFaqOpen] = useState(false);

  const [openQuestion, setOpenQuestion] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);

  const [privacyOpen, setPrivacyOpen] = useState(false);

  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="support-page">

      {/* =========================
          Header
      ========================= */}

      <header className="support-header">

        <button
          className="support-back"
          onClick={() => navigate("/profile")}
          aria-label="رجوع"
        >
          <BackIcon />
        </button>

        <h1>المساعدة والدعم</h1>

        <div className="header-space"></div>

      </header>

      {/* =========================
          Hero
      ========================= */}

      <section className="support-hero">

        <div className="hero-text">

          <h2>
            نحن هنا
            <br />
            لمساعدتك
          </h2>

          <p>
            إذا كان لديك أي استفسار
            أو مشكلة، فريق الدعم
            جاهز لمساعدتك.
          </p>

        </div>

        <SupportIllustration />

      </section>

      {/* =========================
          Support List
      ========================= */}

      <section className="support-list">

        {/* =========================
            FAQ
        ========================= */}

        <div className="support-group">

          <SupportItem
            icon={<FAQIcon />}
            title="الأسئلة الشائعة"
            subtitle="تصفح إجابات لأكثر الأسئلة شيوعًا"
            onClick={() => {
              setFaqOpen(!faqOpen);
              setOpenQuestion(null);
            }}
            colorClass="mint"
          />

          {faqOpen && (
            <div className="faq-container">

              {faqData.map((item, index) => (

                <div
                  className="faq-item"
                  key={item.question}
                >

                  <button
                    className="faq-question"
                    onClick={() =>
                      setOpenQuestion(
                        openQuestion === index
                          ? null
                          : index
                      )
                    }
                  >

                    <span>
                      {item.question}
                    </span>

                    <span className="faq-plus">
                      {openQuestion === index
                        ? "−"
                        : "+"}
                    </span>

                  </button>

                  {openQuestion === index && (
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  )}

                </div>

              ))}

            </div>
          )}

        </div>

        {/* =========================
            Contact
        ========================= */}

        <div className="support-group">

          <SupportItem
            icon={<MailIcon />}
            title="تواصل معنا"
            subtitle="أرسل لنا رسالة وسنرد عليك"
            onClick={() =>
              setContactOpen(!contactOpen)
            }
            colorClass="blue"
          />

          {contactOpen && (

            <div className="contact-box">

              <a href="mailto:support@nabdalamal.com">

                <MailIcon />

                <span>
                  support@nabdalamal.com
                </span>

              </a>

              <a href="tel:16000">

                <PhoneIcon />

                <span>
                  الاتصال بفريق الدعم
                </span>

              </a>

            </div>

          )}

        </div>

        {/* =========================
            Phone
        ========================= */}

        <SupportItem
          icon={<PhoneIcon />}
          title="اتصل بنا"
          subtitle="تحدث مع فريق الدعم مباشرة"
          onClick={() => {
            window.location.href = "tel:16000";
          }}
          colorClass="purple"
        />

        {/* =========================
            Privacy
        ========================= */}

        <div className="support-group">

          <SupportItem
            icon={<PrivacyIcon />}
            title="سياسة الخصوصية"
            subtitle="تعرف على كيفية حماية بياناتك"
            onClick={() =>
              setPrivacyOpen(!privacyOpen)
            }
            colorClass="orange"
          />

          {privacyOpen && (

            <div className="info-box">

              <h3>
                خصوصيتك مهمة لنا
              </h3>

              <p>
                نحافظ على بياناتك الشخصية
                ونستخدمها فقط لتقديم خدمات
                نبض الأمل وتحسين تجربة الاستخدام.
              </p>

              <p>
                لا تتم مشاركة بياناتك مع أي جهة
                خارجية إلا عند الحاجة وبما يتوافق
                مع سياسة المنصة.
              </p>

            </div>

          )}

        </div>

        {/* =========================
            Terms
        ========================= */}

        <div className="support-group">

          <SupportItem
            icon={<TermsIcon />}
            title="الشروط والأحكام"
            subtitle="قراءة شروط استخدام التطبيق"
            onClick={() =>
              setTermsOpen(!termsOpen)
            }
            colorClass="green"
          />

          {termsOpen && (

            <div className="info-box">

              <h3>
                شروط استخدام المنصة
              </h3>

              <p>
                باستخدامك تطبيق نبض الأمل
                فإنك توافق على استخدام الخدمات
                بطريقة مسؤولة وعدم إساءة استخدام
                المنصة.
              </p>

              <p>
                يجب تقديم معلومات صحيحة عند
                إنشاء الحساب أو إرسال طلبات
                التبرع والمساعدة.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =========================
          Bottom Message
      ========================= */}

      <section className="support-message">

        <div className="message-icon">
          <HeartHandIcon />
        </div>

        <div>

          <h3>
            مشكلتك تهمنا
          </h3>

          <p>
            نحن دائمًا هنا من أجلك
          </p>

        </div>

      </section>

      {/* =========================
          Bottom Navigation
      ========================= */}

      <nav className="support-bottom-nav">

        <button
          className="support-nav-item active"
          onClick={() => navigate("/profile")}
        >
          <UserNavIcon />
          <span>الملف الشخصي</span>
        </button>

        <button
          className="support-nav-item"
          onClick={() => navigate("/notifications")}
        >
          <BellNavIcon />
          <span>الإشعارات</span>
        </button>

        <button
          className="support-nav-item"
          onClick={() => navigate("/requests")}
        >
          <RequestsNavIcon />
          <span>الطلبات</span>
        </button>

        <button
          className="support-nav-item"
          onClick={() => navigate("/home")}
        >
          <HomeNavIcon />
          <span>الرئيسية</span>
        </button>

      </nav>

      {/* =========================
          CSS
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .support-page {
          min-height: 100vh;

          padding: 16px 18px 112px;

          direction: rtl;

          color: #286d6d;

          background:
            radial-gradient(
              circle at 5% 8%,
              rgba(76, 202, 185, .18),
              transparent 27%
            ),
            radial-gradient(
              circle at 95% 30%,
              rgba(137, 224, 210, .20),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 48%,
              #e6f7f4 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }


        /* =========================
           Header
        ========================= */

        .support-header {
          max-width: 520px;

          height: 48px;

          margin: 0 auto 12px;

          display: grid;

          grid-template-columns:
            44px 1fr 44px;

          align-items: center;
        }

        .support-header h1 {
          margin: 0;

          text-align: center;

          color: #166c72;

          font-size: 23px;

          font-weight: 900;
        }

        .support-back {
          width: 42px;
          height: 42px;

          border: 0;

          border-radius: 14px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          background:
            rgba(255,255,255,.78);

          box-shadow:
            0 7px 18px
            rgba(35,139,128,.08);

          cursor: pointer;
        }

        .support-back svg {
          width: 24px;
          height: 24px;
        }

        .header-space {
          width: 42px;
          height: 42px;
        }


        /* =========================
           Hero
        ========================= */

        .support-hero {
          max-width: 520px;

          min-height: 178px;

          margin: 0 auto 15px;

          padding: 14px 16px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;

          overflow: hidden;

          border-radius: 25px;

          background:
            linear-gradient(
              135deg,
              rgba(218,248,244,.96),
              rgba(202,241,235,.84)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 10px 25px
            rgba(42,128,128,.08),

            inset 0 1px 0
            rgba(255,255,255,.9);
        }

        .hero-text {
          width: 56%;

          text-align: right;
        }

        .hero-text h2 {
          margin: 0 0 8px;

          color: #166c72;

          font-size: 22px;

          line-height: 1.35;

          font-weight: 900;
        }

        .hero-text p {
          margin: 0;

          color: #397d82;

          font-size: 12px;

          line-height: 1.75;
        }


        /* Illustration */

        .support-illustration {
          position: relative;

          width: 42%;

          min-width: 118px;

          height: 135px;

          display: flex;

          align-items: center;

          justify-content: center;
        }

        .support-circle {
          width: 118px;
          height: 118px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.78),
              rgba(188,238,229,.42)
            );
        }

        .support-circle svg {
          width: 118px;
          height: 118px;
        }

        .support-chat-bubble {
          position: absolute;

          top: 2px;
          right: 0;

          width: 48px;
          height: 32px;

          border-radius: 17px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 4px;

          background: #35bca8;

          box-shadow:
            0 6px 15px
            rgba(40,160,145,.15);
        }

        .support-chat-bubble::after {
          content: "";

          position: absolute;

          bottom: -5px;
          left: 11px;

          border-width:
            6px 6px 0 0;

          border-style: solid;

          border-color:
            #35bca8
            transparent
            transparent
            transparent;
        }

        .support-chat-bubble span {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: white;
        }


        /* =========================
           Support List
        ========================= */

        .support-list {
          max-width: 520px;

          margin: 0 auto;
        }

        .support-group {
          margin-bottom: 10px;
        }

        .support-item {
          width: 100%;

          min-height: 78px;

          padding: 10px 13px;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 21px;

          display: flex;

          align-items: center;

          gap: 12px;

          text-align: right;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.95),
              rgba(246,253,252,.89)
            );

          box-shadow:
            0 7px 18px
            rgba(42,128,128,.06),

            inset 0 1px 0
            rgba(255,255,255,.95);

          cursor: pointer;

          transition:
            transform .15s ease,
            box-shadow .15s ease;
        }

        .support-item:active {
          transform: scale(.985);
        }


        /* Item Icon */

        .support-item-icon {
          width: 52px;
          height: 52px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;
        }

        .support-item-icon svg {
          width: 26px;
          height: 26px;
        }

        .support-item-icon.mint {
          color: #159b8a;
          background: #d6f5ef;
        }

        .support-item-icon.blue {
          color: #1681bb;
          background: #dceffc;
        }

        .support-item-icon.purple {
          color: #7c55b7;
          background: #eee2fb;
        }

        .support-item-icon.orange {
          color: #e27622;
          background: #ffead4;
        }

        .support-item-icon.green {
          color: #168f7f;
          background: #d8f4ef;
        }


        /* Item Text */

        .support-item-content {
          flex: 1;

          min-width: 0;
        }

        .support-item-content strong {
          display: block;

          margin-bottom: 3px;

          color: #176c74;

          font-size: 16px;

          font-weight: 900;
        }

        .support-item-content span {
          display: block;

          color: #6d8d91;

          font-size: 11px;

          line-height: 1.5;
        }


        /* Arrow */

        .support-item-arrow {
          width: 23px;
          height: 23px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #14968b;
        }

        .support-item-arrow svg {
          width: 18px;
          height: 18px;
        }


        /* =========================
           FAQ
        ========================= */

        .faq-container {
          margin-top: 7px;

          padding: 5px 12px;

          border-radius: 18px;

          background:
            rgba(255,255,255,.72);

          border:
            1px solid
            rgba(255,255,255,.82);

          box-shadow:
            0 6px 16px
            rgba(42,128,128,.05);
        }

        .faq-item {
          border-bottom:
            1px solid
            rgba(100,170,163,.14);
        }

        .faq-item:last-child {
          border-bottom: 0;
        }

        .faq-question {
          width: 100%;

          min-height: 49px;

          padding: 9px 2px;

          border: 0;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 10px;

          background: transparent;

          color: #286d6d;

          text-align: right;

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;
        }

        .faq-question span:first-child {
          flex: 1;
        }

        .faq-plus {
          width: 25px;
          height: 25px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background: #dff7f2;

          font-size: 18px;

          font-weight: 500;
        }

        .faq-answer {
          padding:
            0 3px 12px;

          color: #66888b;

          font-size: 11px;

          line-height: 1.9;

          text-align: right;

          animation:
            faqOpen .2s ease;
        }

        @keyframes faqOpen {
          from {
            opacity: 0;
            transform: translateY(-3px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =========================
           Contact
        ========================= */

        .contact-box {
          margin-top: 7px;

          padding: 9px;

          display: flex;

          flex-direction: column;

          gap: 7px;

          border-radius: 17px;

          background:
            rgba(255,255,255,.72);
        }

        .contact-box a {
          padding: 10px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-radius: 13px;

          text-decoration: none;

          color: #286d6d;

          background:
            rgba(235,249,247,.88);

          font-size: 11px;

          font-weight: 700;
        }

        .contact-box svg {
          width: 20px;
          height: 20px;

          color: #159b8a;

          flex-shrink: 0;
        }


        /* =========================
           Info Boxes
        ========================= */

        .info-box {
          margin-top: 7px;

          padding: 13px 14px;

          border-radius: 17px;

          background:
            rgba(255,255,255,.74);

          border:
            1px solid
            rgba(255,255,255,.82);
        }

        .info-box h3 {
          margin: 0 0 7px;

          color: #218d83;

          font-size: 14px;
        }

        .info-box p {
          margin: 0 0 7px;

          color: #6d8d91;

          font-size: 11px;

          line-height: 1.8;
        }

        .info-box p:last-child {
          margin-bottom: 0;
        }


        /* =========================
           Bottom Message
        ========================= */

        .support-message {
          max-width: 520px;

          min-height: 82px;

          margin: 14px auto 0;

          padding: 12px 18px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 14px;

          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              rgba(221,248,244,.95),
              rgba(207,242,237,.82)
            );

          border:
            1px solid
            rgba(255,255,255,.8);
        }

        .message-icon {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #159b8a;
        }

        .message-icon svg {
          width: 47px;
          height: 47px;
        }

        .support-message h3 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 17px;
        }

        .support-message p {
          margin: 0;

          color: #62888a;

          font-size: 11px;
        }


        /* =========================
           Bottom Navigation
        ========================= */

        .support-bottom-nav {
          position: fixed;

          left: 50%;
          bottom: 14px;

          transform:
            translateX(-50%);

          z-index: 100;

          width:
            calc(100% - 28px);

          max-width: 520px;

          height: 68px;

          padding: 6px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 4px;

          border-radius: 24px;

          background:
            rgba(255,255,255,.86);

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px
            rgba(37,111,111,.13),

            inset 0 1px 0
            rgba(255,255,255,.95);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);
        }

        .support-nav-item {
          position: relative;

          border: 0;

          border-radius: 18px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 3px;

          color: #849e9e;

          background: transparent;

          font-size: 9px;

          font-weight: 700;

          cursor: pointer;
        }

        .support-nav-item svg {
          width: 21px;
          height: 21px;
        }

        .support-nav-item.active {
          color: #159b8a;

          background:
            rgba(219,248,242,.75);
        }

        .support-nav-item.active::after {
          content: "";

          position: absolute;

          bottom: 3px;

          width: 23px;
          height: 3px;

          border-radius: 10px;

          background: #159b8a;
        }


        /* =========================
           Small Mobile
        ========================= */

        @media (max-width: 390px) {

          .support-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .support-header {
            margin-bottom: 9px;
          }

          .support-header h1 {
            font-size: 21px;
          }

          .support-hero {
            min-height: 168px;

            padding:
              12px 12px;

            margin-bottom: 12px;
          }

          .hero-text {
            width: 57%;
          }

          .hero-text h2 {
            font-size: 20px;

            margin-bottom: 6px;
          }

          .hero-text p {
            font-size: 11px;
          }

          .support-illustration {
            width: 40%;

            min-width: 108px;

            height: 125px;
          }

          .support-circle,
          .support-circle svg {
            width: 108px;
            height: 108px;
          }

          .support-chat-bubble {
            width: 43px;
            height: 29px;
          }

          .support-item {
            min-height: 73px;

            padding:
              9px 11px;
          }

          .support-item-icon {
            width: 48px;
            height: 48px;
          }

          .support-item-icon svg {
            width: 24px;
            height: 24px;
          }

          .support-item-content strong {
            font-size: 15px;
          }

          .support-item-content span {
            font-size: 10px;
          }

          .support-message {
            min-height: 75px;
          }

        }

      `}</style>

    </div>
  );
}

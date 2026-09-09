import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "كيف يمكنني طلب دواء؟",
    answer:
      "ادخل إلى قسم تبادل الأدوية، وابحث عن الدواء المطلوب، ثم افتح تفاصيل الدواء واضغط على عرض أقرب صيدلية لإكمال الطلب.",
  },
  {
    question: "كيف يمكنني التبرع بالدم؟",
    answer:
      "ادخل إلى قسم التبرع بالدم، ثم اختر الحالة المناسبة لك واضغط على متابعة الطلب. يمكنك بعد ذلك متابعة حالة التبرع.",
  },
  {
    question: "كيف أعدل بياناتي الشخصية؟",
    answer:
      "من صفحة الملف الشخصي اختر المعلومات الشخصية، ثم عدّل البيانات التي تريدها واضغط على حفظ التغييرات.",
  },
  {
    question: "كيف أضيف عنوانًا محفوظًا؟",
    answer:
      "من الملف الشخصي اختر العناوين المحفوظة، ثم اكتب اسم العنوان وتفاصيله واضغط على إضافة عنوان.",
  },
  {
    question: "كيف أضيف دواء إلى المفضلة؟",
    answer:
      "افتح تفاصيل الدواء واضغط على أيقونة المفضلة. سيظهر الدواء بعد ذلك داخل قسم الأدوية المفضلة.",
  },
];

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

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={open ? "chevron open" : "chevron"}
    >
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9.8 9a2.4 2.4 0 1 1 4.1 1.7c-.9.8-1.9 1.2-1.9 2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.7" r="1" fill="currentColor" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4.5 4v-4.2A2.5 2.5 0 0 1 5 12.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3l7 3v5.2c0 4.6-2.8 7.7-7 9.8-4.2-2.1-7-5.2-7-9.8V6l7-3Z"
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

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5V8h4M9 12h6M9 15.5h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 10.5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7 4h3l1.2 4-2 1.5a14 14 0 0 0 5.3 5.3l1.5-2L20 14v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 7l7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 4.5h14v15H5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const submitReport = (e) => {
    e.preventDefault();

    if (!reportText.trim()) return;

    setReportSent(true);
    setReportText("");

    setTimeout(() => {
      setReportSent(false);
      setShowReport(false);
    }, 2200);
  };

  return (
    <div className="support-page">

      {/* HEADER */}
      <header className="support-header">

        <div className="support-title">
          <h1>المساعدة والدعم</h1>
          <p>نحن هنا لمساعدتك في أي وقت</p>
        </div>

        <Link to="/profile" className="support-back">
          <BackIcon />
        </Link>

      </header>


      {/* WELCOME CARD */}
      <section className="support-welcome">

        <div className="support-welcome-icon">
          <MessageIcon />
        </div>

        <div>
          <h2>كيف يمكننا مساعدتك؟</h2>
          <p>
            اختر من الخيارات التالية للوصول إلى المعلومات التي تحتاجها.
          </p>
        </div>

      </section>


      {/* FAQ */}
      <section className="support-section">

        <div className="section-heading">
          <div className="section-heading-icon">
            <QuestionIcon />
          </div>

          <div>
            <h2>الأسئلة الشائعة</h2>
            <p>إجابات سريعة على أكثر الأسئلة شيوعًا</p>
          </div>
        </div>

        <div className="faq-list">

          {faqData.map((faq, index) => {

            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className={
                  isOpen
                    ? "faq-item faq-open"
                    : "faq-item"
                }
              >

                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >

                  <span>{faq.question}</span>

                  <ChevronIcon open={isOpen} />

                </button>

                {isOpen && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>


      {/* CONTACT */}
      <section className="support-section">

        <button
          type="button"
          className="support-menu-card"
          onClick={() => setShowContact(!showContact)}
        >

          <div className="menu-icon teal">
            <MessageIcon />
          </div>

          <div className="menu-text">
            <strong>تواصل معنا</strong>
            <span>نحن متاحون لمساعدتك</span>
          </div>

          <ChevronIcon open={showContact} />

        </button>

        {showContact && (
          <div className="expanded-card contact-card">

            <a
              href="tel:16000"
              className="contact-option"
            >
              <div className="contact-icon">
                <PhoneIcon />
              </div>

              <div>
                <strong>اتصل بنا</strong>
                <span>16000</span>
              </div>
            </a>

            <a
              href="mailto:support@nabdalamal.com"
              className="contact-option"
            >
              <div className="contact-icon">
                <MailIcon />
              </div>

              <div>
                <strong>البريد الإلكتروني</strong>
                <span>support@nabdalamal.com</span>
              </div>
            </a>

          </div>
        )}

      </section>


      {/* PRIVACY */}
      <section className="support-section">

        <button
          type="button"
          className="support-menu-card"
          onClick={() => setShowPrivacy(!showPrivacy)}
        >

          <div className="menu-icon green">
            <ShieldIcon />
          </div>

          <div className="menu-text">
            <strong>سياسة الخصوصية</strong>
            <span>تعرف على كيفية حماية بياناتك</span>
          </div>

          <ChevronIcon open={showPrivacy} />

        </button>

        {showPrivacy && (
          <div className="expanded-card text-card">

            <h3>خصوصيتك مهمة لنا</h3>

            <p>
              نحترم خصوصية مستخدمي منصة نبض الأمل
              ونحرص على حماية البيانات الشخصية التي
              يتم إدخالها داخل التطبيق.
            </p>

            <p>
              نستخدم البيانات فقط لتقديم خدمات المنصة
              وتحسين تجربة المستخدم، ولا نشارك بياناتك
              الشخصية مع أي جهة بدون سبب مشروع.
            </p>

          </div>
        )}

      </section>


      {/* TERMS */}
      <section className="support-section">

        <button
          type="button"
          className="support-menu-card"
          onClick={() => setShowTerms(!showTerms)}
        >

          <div className="menu-icon blue">
            <DocumentIcon />
          </div>

          <div className="menu-text">
            <strong>شروط الاستخدام</strong>
            <span>قواعد استخدام منصة نبض الأمل</span>
          </div>

          <ChevronIcon open={showTerms} />

        </button>

        {showTerms && (
          <div className="expanded-card text-card">

            <h3>شروط استخدام المنصة</h3>

            <p>
              باستخدامك لمنصة نبض الأمل، فإنك توافق
              على استخدام الخدمات بطريقة مسؤولة
              وعدم إدخال معلومات غير صحيحة أو مضللة.
            </p>

            <p>
              المنصة تهدف إلى تسهيل الوصول إلى خدمات
              التبرع بالدم وتبادل الأدوية والتواصل بين
              المستخدمين والجهات المشاركة.
            </p>

          </div>
        )}

      </section>


      {/* ABOUT */}
      <section className="support-section">

        <button
          type="button"
          className="support-menu-card"
          onClick={() => setShowAbout(!showAbout)}
        >

          <div className="menu-icon purple">
            <InfoIcon />
          </div>

          <div className="menu-text">
            <strong>عن المنصة</strong>
            <span>تعرف أكثر على نبض الأمل</span>
          </div>

          <ChevronIcon open={showAbout} />

        </button>

        {showAbout && (
          <div className="expanded-card text-card about-card">

            <div className="about-logo">
              <span>+</span>
            </div>

            <h3>نبض الأمل</h3>

            <p>
              منصة تهدف إلى المساعدة في الوصول السريع
              إلى خدمات التبرع بالدم وتبادل الأدوية
              وربط الأشخاص الذين يحتاجون للمساعدة
              بالمتبرعين القريبين منهم.
            </p>

            <span className="version">
              الإصدار 1.0.0
            </span>

          </div>
        )}

      </section>


      {/* REPORT */}
      <section className="support-section">

        <button
          type="button"
          className="report-button"
          onClick={() => setShowReport(!showReport)}
        >

          <div className="report-icon">
            <ReportIcon />
          </div>

          <div>
            <strong>الإبلاغ عن مشكلة</strong>
            <span>ساعدنا في تحسين المنصة</span>
          </div>

          <ChevronIcon open={showReport} />

        </button>

        {showReport && (
          <form
            className="expanded-card report-form"
            onSubmit={submitReport}
          >

            {!reportSent ? (
              <>
                <label>
                  اكتب المشكلة التي واجهتك
                </label>

                <textarea
                  value={reportText}
                  onChange={(e) =>
                    setReportText(e.target.value)
                  }
                  placeholder="اكتب تفاصيل المشكلة هنا..."
                />

                <button
                  type="submit"
                  className="send-report"
                >
                  إرسال البلاغ
                </button>
              </>
            ) : (
              <div className="report-success">
                <div>✓</div>
                تم إرسال البلاغ بنجاح
              </div>
            )}

          </form>
        )}

      </section>


      {/* FOOTER */}
      <div className="support-footer">

        <div className="footer-heart">
          +
        </div>

        <strong>معًا... ننقذ حياة</strong>

        <p>
          نبض الأمل — استجابة طبية طارئة
        </p>

      </div>


      <style>{`

        * {
          box-sizing: border-box;
        }

        .support-page {
          min-height: 100vh;

          padding: 22px 16px 105px;

          direction: rtl;

          color: #286d6d;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70,193,177,.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154,231,216,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }


        /* HEADER */

        .support-header {
          width: 100%;
          max-width: 520px;

          margin: 0 auto 22px;

          min-height: 54px;

          position: relative;
        }

        .support-title {
          padding-right: 64px;

          text-align: right;
        }

        .support-title h1 {
          margin: 0 0 5px;

          color: #218d83;

          font-size: 23px;

          font-weight: 800;
        }

        .support-title p {
          margin: 0;

          color: #8ca6a4;

          font-size: 11px;
        }

        .support-back {
          position: absolute;

          right: 0;
          top: 0;

          width: 52px;
          height: 52px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #218d83;

          background:
            rgba(255,255,255,.86);

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 8px 22px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.95);

          text-decoration: none;
        }

        .support-back svg {
          width: 24px;
          height: 24px;
        }


        /* WELCOME */

        .support-welcome {
          width: 100%;
          max-width: 520px;

          margin: 0 auto 18px;

          padding: 17px;

          display: flex;

          align-items: center;

          gap: 13px;

          border-radius: 27px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.93),
              rgba(226,248,244,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 28px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .support-welcome-icon {
          width: 50px;
          height: 50px;

          flex: 0 0 50px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 17px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e0faf5,
              #c9eee7
            );
        }

        .support-welcome-icon svg {
          width: 25px;
          height: 25px;
        }

        .support-welcome h2 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 15px;

          font-weight: 800;
        }

        .support-welcome p {
          margin: 0;

          color: #91a8a7;

          font-size: 10px;

          line-height: 1.6;
        }


        /* SECTION */

        .support-section {
          width: 100%;
          max-width: 520px;

          margin: 0 auto 12px;
        }

        .section-heading {
          margin: 0 3px 10px;

          display: flex;

          align-items: center;

          gap: 10px;
        }

        .section-heading-icon {
          width: 38px;
          height: 38px;

          flex: 0 0 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #159b8a;

          background:
            rgba(218,248,242,.82);
        }

        .section-heading-icon svg {
          width: 20px;
          height: 20px;
        }

        .section-heading h2 {
          margin: 0 0 3px;

          color: #286d6d;

          font-size: 14px;

          font-weight: 800;
        }

        .section-heading p {
          margin: 0;

          color: #91a8a7;

          font-size: 9px;
        }


        /* FAQ */

        .faq-list {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }

        .faq-item {
          overflow: hidden;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.94),
              rgba(232,249,246,.82)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 8px 20px
              rgba(42,128,128,.06),
            inset 0 1px 0
              rgba(255,255,255,.9);
        }

        .faq-open {
          box-shadow:
            0 10px 23px
              rgba(42,128,128,.08);
        }

        .faq-question {
          width: 100%;

          min-height: 57px;

          padding: 10px 14px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 10px;

          border: 0;

          background: transparent;

          color: #286d6d;

          font-family: inherit;

          font-size: 11px;

          font-weight: 700;

          text-align: right;

          cursor: pointer;
        }

        .chevron {
          width: 19px;
          height: 19px;

          flex: 0 0 19px;

          color: #159b8a;

          transition:
            transform .2s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 14px 14px;

          color: #789695;

          font-size: 10px;

          line-height: 1.8;

          border-top:
            1px solid
            rgba(33,141,131,.07);
        }


        /* MENU CARD */

        .support-menu-card {
          width: 100%;

          min-height: 72px;

          padding: 10px 13px;

          display: flex;

          align-items: center;

          gap: 11px;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.94),
              rgba(232,249,246,.81)
            );

          box-shadow:
            0 9px 22px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.9);

          color: #286d6d;

          font-family: inherit;

          text-align: right;

          cursor: pointer;
        }

        .menu-icon {
          width: 44px;
          height: 44px;

          flex: 0 0 44px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;
        }

        .menu-icon svg {
          width: 22px;
          height: 22px;
        }

        .menu-icon.teal {
          color: #159b8a;
          background: #e0faf5;
        }

        .menu-icon.green {
          color: #31947f;
          background: #def6ee;
        }

        .menu-icon.blue {
          color: #3e94a1;
          background: #e2f5f7;
        }

        .menu-icon.purple {
          color: #7182ad;
          background: #e9ecf8;
        }

        .menu-text {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 4px;
        }

        .menu-text strong {
          color: #286d6d;

          font-size: 12px;

          font-weight: 800;
        }

        .menu-text span {
          color: #91a8a7;

          font-size: 9px;
        }

        .support-menu-card > .chevron {
          flex-shrink: 0;
        }


        /* EXPANDED */

        .expanded-card {
          margin-top: 7px;

          padding: 15px;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.91),
              rgba(232,249,246,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 7px 18px
              rgba(42,128,128,.05);
        }

        .contact-card {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }

        .contact-option {
          min-height: 55px;

          padding: 8px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 15px;

          background:
            rgba(255,255,255,.62);

          color: inherit;

          text-decoration: none;
        }

        .contact-icon {
          width: 36px;
          height: 36px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 11px;

          color: #159b8a;

          background: #e0faf5;
        }

        .contact-icon svg {
          width: 18px;
          height: 18px;
        }

        .contact-option div:last-child {
          display: flex;

          flex-direction: column;

          gap: 3px;
        }

        .contact-option strong {
          font-size: 11px;
          color: #286d6d;
        }

        .contact-option span {
          font-size: 9px;
          color: #91a8a7;
        }


        /* TEXT */

        .text-card h3 {
          margin: 0 0 8px;

          color: #286d6d;

          font-size: 13px;
        }

        .text-card p {
          margin: 0 0 9px;

          color: #789695;

          font-size: 10px;

          line-height: 1.8;
        }

        .text-card p:last-child {
          margin-bottom: 0;
        }


        /* ABOUT */

        .about-card {
          text-align: center;
        }

        .about-logo {
          width: 48px;
          height: 48px;

          margin: 0 auto 8px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e0faf5,
              #c8eee7
            );

          font-size: 28px;

          font-weight: 900;
        }

        .about-card h3 {
          margin-bottom: 7px;
        }

        .version {
          display: inline-block;

          margin-top: 3px;

          padding: 5px 10px;

          border-radius: 9px;

          color: #218d83;

          background: #e0f6f1;

          font-size: 8px;

          font-weight: 700;
        }


        /* REPORT */

        .report-button {
          width: 100%;

          min-height: 72px;

          padding: 10px 13px;

          display: flex;

          align-items: center;

          gap: 11px;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.94),
              rgba(255,239,242,.82)
            );

          box-shadow:
            0 9px 22px
              rgba(160,80,100,.06);

          color: #286d6d;

          font-family: inherit;

          text-align: right;

          cursor: pointer;
        }

        .report-icon {
          width: 44px;
          height: 44px;

          flex: 0 0 44px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #c05267;

          background: #ffe9ee;
        }

        .report-icon svg {
          width: 22px;
          height: 22px;
        }

        .report-button > div:nth-child(2) {
          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 4px;
        }

        .report-button strong {
          font-size: 12px;
          color: #286d6d;
        }

        .report-button span {
          font-size: 9px;
          color: #91a8a7;
        }


        /* REPORT FORM */

        .report-form label {
          display: block;

          margin-bottom: 8px;

          color: #286d6d;

          font-size: 11px;

          font-weight: 700;
        }

        .report-form textarea {
          width: 100%;

          min-height: 105px;

          resize: vertical;

          padding: 11px;

          border: 1px solid
            rgba(33,141,131,.10);

          border-radius: 15px;

          outline: none;

          background:
            rgba(255,255,255,.72);

          color: #286d6d;

          font-family: inherit;

          font-size: 10px;

          line-height: 1.7;
        }

        .report-form textarea:focus {
          border-color: rgba(21,155,138,.3);
          box-shadow:
            0 0 0 3px
              rgba(21,155,138,.06);
        }

        .send-report {
          width: 100%;

          height: 45px;

          margin-top: 9px;

          border: 0;

          border-radius: 15px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #38b7a4,
              #159b8a
            );

          font-family: inherit;

          font-size: 11px;

          font-weight: 800;

          cursor: pointer;
        }

        .report-success {
          padding: 12px;

          text-align: center;

          color: #28786e;

          font-size: 11px;

          font-weight: 700;
        }

        .report-success div {
          width: 40px;
          height: 40px;

          margin: 0 auto 8px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #fff;

          background: #159b8a;

          font-size: 20px;
        }


        /* FOOTER */

        .support-footer {
          max-width: 520px;

          margin: 22px auto 0;

          padding: 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(224,250,245,.9),
              rgba(210,243,237,.72)
            );

          border:
            1px solid
            rgba(255,255,255,.94);

          box-shadow:
            0 10px 25px
              rgba(42,128,128,.06);
        }

        .footer-heart {
          width: 45px;
          height: 45px;

          margin: 0 auto 8px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background: rgba(255,255,255,.7);

          font-size: 27px;

          font-weight: 900;
        }

        .support-footer strong {
          display: block;

          color: #286d6d;

          font-size: 13px;
        }

        .support-footer p {
          margin: 5px 0 0;

          color: #91a8a7;

          font-size: 9px;
        }

        @media (max-width: 380px) {

          .support-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .support-title h1 {
            font-size: 21px;
          }

          .support-welcome {
            padding: 14px;
          }

          .support-welcome-icon {
            width: 46px;
            height: 46px;
            flex-basis: 46px;
          }

          .support-menu-card,
          .report-button {
            min-height: 68px;
          }

        }

      `}</style>

    </div>
  );
}

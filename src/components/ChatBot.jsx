import React, {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("nabd_theme") ||
      "light"
    );
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "أهلاً بيك في نبض الأمل ❤️\nأنا مساعدك الذكي، أقدر أساعدك في طلب الدم، البحث عن متبرع، مراكز الدم، والأدوية.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        localStorage.getItem("nabd_theme") ||
        "light";

      setTheme(
        currentTheme === "dark"
          ? "dark"
          : "light"
      );
    };

    updateTheme();

    window.addEventListener(
      "theme-changed",
      updateTheme
    );

    window.addEventListener(
      "storage",
      updateTheme
    );

    return () => {
      window.removeEventListener(
        "theme-changed",
        updateTheme
      );

      window.removeEventListener(
        "storage",
        updateTheme
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open, isTyping]);

  const addBotMessage = (text) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id:
            Date.now() +
            Math.random(),
          sender: "bot",
          text,
        },
      ]);

      setIsTyping(false);
    }, 700);
  };

  const getBotReply = (text) => {
    const value = text
      .trim()
      .toLowerCase();

    if (
      value.includes("دم") ||
      value.includes("blood")
    ) {
      return (
        "أكيد ❤️\n" +
        "أقدر أساعدك في طلب الدم أو البحث عن متبرع أو الوصول لأقرب مركز دم.\n\n" +
        "اختار من الأزرار الموجودة بالأسفل أو اكتب لي بالضبط أنت محتاج إيه."
      );
    }

    if (
      value.includes("متبرع") ||
      value.includes("متبرعين")
    ) {
      return (
        "تمام 🩸\n" +
        "نقدر نبحث عن متبرعين مناسبين حسب فصيلة الدم والموقع.\n\n" +
        "في النسخة القادمة هنربط الجزء ده مباشرة ببيانات المتبرعين الحقيقية."
      );
    }

    if (
      value.includes("مركز") ||
      value.includes("بنك")
    ) {
      return (
        "🏥 عندنا قسم مراكز وبنوك الدم.\n\n" +
        "تقدر تشوف المراكز، موقعها على الخريطة، مواعيد العمل، وبيانات التواصل."
      );
    }

    if (
      value.includes("دواء") ||
      value.includes("أدوية")
    ) {
      return (
        "💊 أقدر أساعدك في الوصول لقسم الأدوية والبحث عن الدواء المطلوب.\n\n" +
        "اكتب اسم الدواء اللي بتدور عليه."
      );
    }

    if (
      value.includes("موعد") ||
      value.includes("تبرع")
    ) {
      return (
        "📅 تقدر تحجز موعد للتبرع من صفحة مركز الدم.\n\n" +
        "وتقدر تختار نوع التبرع والموعد المناسب."
      );
    }

    if (
      value.includes("السلام عليكم") ||
      value.includes("السلام")
    ) {
      return "وعليكم السلام ورحمة الله وبركاته ❤️";
    }

    if (
      value.includes("اهلا") ||
      value.includes("أهلا") ||
      value.includes("هاي") ||
      value.includes("hello")
    ) {
      return "أهلاً بيك ❤️ إزاي أقدر أساعدك؟";
    }

    return (
      "تمام ❤️\n" +
      "أنا مساعد نبض الأمل.\n\n" +
      "أقدر أساعدك في:\n" +
      "🩸 طلب الدم\n" +
      "🔎 البحث عن متبرع\n" +
      "🏥 مراكز وبنوك الدم\n" +
      "💊 الأدوية\n" +
      "📅 حجز موعد للتبرع\n\n" +
      "اكتبلي محتاج إيه وأنا هساعدك."
    );
  };

  const sendMessage = (text = null) => {
    const finalMessage =
      text !== null
        ? text
        : message.trim();

    if (!finalMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        id:
          Date.now() +
          Math.random(),
        sender: "user",
        text: finalMessage,
      },
    ]);

    setMessage("");

    addBotMessage(
      getBotReply(finalMessage)
    );
  };

  const quickActions = [
    {
      id: "blood",
      icon: "🩸",
      text: "طلب دم",
      message:
        "عايز أعمل طلب دم",
    },
    {
      id: "donor",
      icon: "🔎",
      text: "متبرع",
      message:
        "عايز أبحث عن متبرع",
    },
    {
      id: "centers",
      icon: "🏥",
      text: "مراكز الدم",
      message:
        "عايز أعرف مراكز الدم",
    },
    {
      id: "medicine",
      icon: "💊",
      text: "الأدوية",
      message:
        "عايز أبحث عن دواء",
    },
  ];

  return (
    <>
      {!open && (
        <button
          type="button"
          className="nabd-chatbot-floating"
          onClick={() => setOpen(true)}
          aria-label="فتح مساعد نبض الأمل"
        >
          <span className="nabd-chatbot-floating-icon">
            💬
          </span>

          <span className="nabd-chatbot-floating-dot" />
        </button>
      )}

      {open && (
        <div
          className={`nabd-chatbot ${
            theme === "dark"
              ? "nabd-chatbot-dark"
              : "nabd-chatbot-light"
          }`}
        >
          <div className="nabd-chatbot-header">
            <div className="nabd-chatbot-header-info">
              <div className="nabd-chatbot-avatar">
                ❤️
              </div>

              <div>
                <strong>
                  مساعد نبض الأمل
                </strong>

                <span>
                  مساعدك الذكي
                </span>
              </div>
            </div>

            <button
              type="button"
              className="nabd-chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="إغلاق الشات"
            >
              ×
            </button>
          </div>

          <div className="nabd-chatbot-messages">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`nabd-chatbot-message-row ${
                  item.sender === "user"
                    ? "user-message-row"
                    : "bot-message-row"
                }`}
              >
                <div
                  className={`nabd-chatbot-message ${
                    item.sender === "user"
                      ? "user-message"
                      : "bot-message"
                  }`}
                >
                  {item.text
                    .split("\n")
                    .map(
                      (
                        line,
                        index
                      ) => (
                        <React.Fragment
                          key={index}
                        >
                          {line}

                          {index <
                            item.text.split(
                              "\n"
                            ).length -
                              1 && (
                            <br />
                          )}
                        </React.Fragment>
                      )
                    )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="nabd-chatbot-message-row bot-message-row">
                <div className="nabd-chatbot-message bot-message typing-message">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div
              ref={messagesEndRef}
            />
          </div>

          <div className="nabd-chatbot-quick-actions">
            {quickActions.map(
              (action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() =>
                    sendMessage(
                      action.message
                    )
                  }
                >
                  <span>
                    {action.icon}
                  </span>

                  {action.text}
                </button>
              )
            )}
          </div>

          <div className="nabd-chatbot-input-area">
            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  sendMessage();
                }
              }}
              placeholder="اكتب رسالتك..."
              dir="rtl"
            />

            <button
              type="button"
              className="nabd-chatbot-send"
              onClick={() =>
                sendMessage()
              }
              disabled={
                !message.trim()
              }
              aria-label="إرسال الرسالة"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nabd-chatbot-floating {
          position: fixed;
          left: 18px;
          bottom: 86px;
          width: 58px;
          height: 58px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #0aa88f,
            #078876
          );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          box-shadow:
            0 10px 28px
            rgba(0, 0, 0, 0.22);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .nabd-chatbot-floating:hover {
          transform: translateY(-3px);
          box-shadow:
            0 14px 32px
            rgba(0, 0, 0, 0.28);
        }

        .nabd-chatbot-floating-icon {
          font-size: 25px;
          line-height: 1;
        }

        .nabd-chatbot-floating-dot {
          position: absolute;
          right: 3px;
          top: 3px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #39d98a;
          border: 2px solid white;
        }

        .nabd-chatbot {
          position: fixed;
          left: 18px;
          bottom: 86px;
          width: min(
            380px,
            calc(100vw - 36px)
          );
          height: min(
            620px,
            calc(100vh - 120px)
          );
          border-radius: 24px;
          overflow: hidden;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          direction: rtl;
          font-family:
            "Tajawal",
            Arial,
            sans-serif;
          box-shadow:
            0 20px 55px
            rgba(0, 0, 0, 0.25);
          border: 1px solid
            rgba(
              10,
              168,
              143,
              0.16
            );
        }

        .nabd-chatbot-light {
          background: #ffffff;
          color: #17332e;
        }

        .nabd-chatbot-dark {
          background: #102321;
          color: #e7f6f3;
          border-color: rgba(
            100,
            230,
            210,
            0.14
          );
        }

        .nabd-chatbot-header {
          min-height: 76px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(
            135deg,
            #0aa88f,
            #078876
          );
          color: white;
        }

        .nabd-chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .nabd-chatbot-avatar {
          width: 45px;
          height: 45px;
          flex: 0 0 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(
            255,
            255,
            255,
            0.16
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.2
            );
          font-size: 21px;
        }

        .nabd-chatbot-header-info strong {
          display: block;
          font-size: 15px;
          font-weight: 900;
        }

        .nabd-chatbot-header-info span {
          display: block;
          margin-top: 3px;
          font-size: 10px;
          opacity: 0.85;
        }

        .nabd-chatbot-close {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 10px;
          background: rgba(
            255,
            255,
            255,
            0.13
          );
          color: white;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .nabd-chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 15px 12px;
          display: flex;
          flex-direction: column;
          gap: 9px;
          scroll-behavior: smooth;
        }

        .nabd-chatbot-light
          .nabd-chatbot-messages {
          background: #f5fbf9;
        }

        .nabd-chatbot-dark
          .nabd-chatbot-messages {
          background: #0b1c1a;
        }

        .nabd-chatbot-message-row {
          width: 100%;
          display: flex;
        }

        .bot-message-row {
          justify-content: flex-start;
        }

        .user-message-row {
          justify-content: flex-end;
        }

        .nabd-chatbot-message {
          max-width: 82%;
          padding: 10px 12px;
          border-radius: 15px;
          font-size: 12px;
          line-height: 1.75;
          white-space: normal;
          overflow-wrap: anywhere;
        }

        .bot-message {
          background: #ffffff;
          color: #245b5d;
          border:
            1px solid
            rgba(
              10,
              168,
              143,
              0.12
            );
          border-bottom-right-radius: 5px;
          box-shadow:
            0 3px 10px
            rgba(0, 0, 0, 0.04);
        }

        .nabd-chatbot-dark
          .bot-message {
          background: #17312e;
          color: #dcefeb;
          border-color: rgba(
            100,
            230,
            210,
            0.1
          );
        }

        .user-message {
          background: linear-gradient(
            135deg,
            #0aa88f,
            #078876
          );
          color: white;
          border-bottom-left-radius: 5px;
        }

        .typing-message {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 13px 14px;
        }

        .typing-message span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0aa88f;
          animation: nabdTyping
            1.2s infinite ease-in-out;
        }

        .typing-message span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing-message span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes nabdTyping {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }

          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .nabd-chatbot-quick-actions {
          padding: 9px 10px;
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 7px;
          border-top: 1px solid
            rgba(
              10,
              168,
              143,
              0.1
            );
        }

        .nabd-chatbot-quick-actions button {
          min-height: 38px;
          border-radius: 11px;
          border: 1px solid
            rgba(
              10,
              168,
              143,
              0.16
            );
          background: #eef9f6;
          color: #17645a;
          font-family: inherit;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .nabd-chatbot-dark
          .nabd-chatbot-quick-actions {
          border-color: rgba(
            100,
            230,
            210,
            0.1
          );
          background: #102321;
        }

        .nabd-chatbot-dark
          .nabd-chatbot-quick-actions
          button {
          background: #17312e;
          color: #9de5d7;
          border-color: rgba(
            100,
            230,
            210,
            0.13
          );
        }

        .nabd-chatbot-input-area {
          padding: 10px;
          display: flex;
          gap: 7px;
          border-top: 1px solid
            rgba(
              10,
              168,
              143,
              0.12
            );
          background: #ffffff;
        }

        .nabd-chatbot-dark
          .nabd-chatbot-input-area {
          background: #102321;
          border-color: rgba(
            100,
            230,
            210,
            0.1
          );
        }

        .nabd-chatbot-input-area input {
          flex: 1;
          min-width: 0;
          height: 43px;
          border-radius: 13px;
          border: 1px solid
            rgba(
              10,
              168,
              143,
              0.18
            );
          outline: none;
          padding: 0 12px;
          font-family: inherit;
          font-size: 12px;
          background: #f7fbfa;
          color: #17332e;
        }

        .nabd-chatbot-input-area input:focus {
          border-color: #0aa88f;
          box-shadow:
            0 0 0 3px
            rgba(
              10,
              168,
              143,
              0.08
            );
        }

        .nabd-chatbot-dark
          .nabd-chatbot-input-area
          input {
          background: #17312e;
          color: #e7f6f3;
          border-color: rgba(
            100,
            230,
            210,
            0.14
          );
        }

        .nabd-chatbot-dark
          .nabd-chatbot-input-area
          input::placeholder {
          color: #76928e;
        }

        .nabd-chatbot-send {
          width: 43px;
          height: 43px;
          flex: 0 0 43px;
          border: none;
          border-radius: 13px;
          background: #0aa88f;
          color: white;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nabd-chatbot-send:disabled {
          opacity: 0.45;
          cursor: default;
        }

        @media (max-width: 600px) {
          .nabd-chatbot-floating {
            left: 14px;
            bottom: 78px;
            width: 54px;
            height: 54px;
          }

          .nabd-chatbot {
            left: 10px;
            bottom: 74px;
            width: calc(100vw - 20px);
            height: min(
              620px,
              calc(100vh - 95px)
            );
            border-radius: 21px;
          }
        }

        @media (max-width: 380px) {
          .nabd-chatbot-message {
            font-size: 11px;
          }

          .nabd-chatbot-quick-actions
            button {
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
}

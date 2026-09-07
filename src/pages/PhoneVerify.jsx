import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhoneVerify() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputStyle = { width: "100%", padding: 10, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1", textAlign: "center" };

  const sendCode = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("أدخل رقم هاتف صحيح");
      return;
    }
    setError("");
    setSent(true);
    // In production: trigger a real SMS OTP service here
  };

  const confirmCode = (e) => {
    e.preventDefault();
    if (code.trim().length < 4) {
      setError("أدخل رمز التحقق المكوّن من 4 أرقام على الأقل");
      return;
    }
    navigate("/location-permission");
  };

  return (
    <div className="page" style={{ paddingTop: 60 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 40 }}>📱</div>
        <h2>تأكيد رقم الهاتف</h2>
        <p className="muted">{sent ? `تم إرسال رمز التحقق إلى ${phone}` : "أدخل رقم هاتفك لإرسال رمز التحقق"}</p>
      </div>

      {!sent ? (
        <form onSubmit={sendCode}>
          <div className="card">
            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </div>
          {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
          <button className="btn" type="submit">إرسال رمز التحقق</button>
        </form>
      ) : (
        <form onSubmit={confirmCode}>
          <div className="card">
            <input
              type="text"
              placeholder="ادخل رمز التحقق"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ ...inputStyle, letterSpacing: 6, fontSize: 18 }}
            />
          </div>
          {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
          <button className="btn" type="submit">تأكيد</button>
          <button type="button" className="btn outline" style={{ marginTop: 10 }} onClick={() => setSent(false)}>
            تعديل الرقم
          </button>
        </form>
      )}
    </div>
  );
}

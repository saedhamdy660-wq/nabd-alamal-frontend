import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PhoneVerify() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);
  const navigate = useNavigate();

  const updateDigit = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const confirm = (e) => {
    e.preventDefault();
    navigate("/location-permission");
  };

  return (
    <div className="page" style={{ paddingTop: 60, textAlign: "center" }}>
      <h2 style={{ margin: "0 0 6px" }}>تأكيد رقم الهاتف</h2>
      <p className="muted">تم إرسال رمز التحقق إلى رقم الهاتف</p>
      <p style={{ fontWeight: 700, margin: "6px 0 26px", direction: "ltr" }}>+20 010 123 4567</p>

      <form onSubmit={confirm}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 18, direction: "ltr" }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => updateDigit(i, e.target.value)}
              maxLength={1}
              inputMode="numeric"
              style={{ width: 42, height: 52, textAlign: "center", fontSize: 20, margin: 0 }}
            />
          ))}
        </div>

        <p className="muted" style={{ marginBottom: 26 }}>إعادة إرسال الرمز (00:45)</p>

        <button className="btn" type="submit">تأكيد</button>
      </form>
    </div>
  );
}

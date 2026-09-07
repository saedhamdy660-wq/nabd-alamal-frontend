import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [label, setLabel] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("nabd_addresses") || "null");
    setAddresses(stored || [{ id: "a1", label: "المنزل", details: "القاهرة، مدينة نصر" }]);
  }, []);

  const persist = (list) => {
    setAddresses(list);
    localStorage.setItem("nabd_addresses", JSON.stringify(list));
  };

  const addAddress = (e) => {
    e.preventDefault();
    if (!label || !details) return;
    const updated = [...addresses, { id: "a" + Date.now(), label, details }];
    persist(updated);
    setLabel("");
    setDetails("");
  };

  const remove = (id) => {
    persist(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="page">
      <Link to="/profile" className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>
      <h2 style={{ marginBottom: 16 }}>العناوين المحفوظة</h2>

      {addresses.map((a) => (
        <div key={a.id} className="list-item">
          <div>
            <strong>📍 {a.label}</strong>
            <p className="muted">{a.details}</p>
          </div>
          <span onClick={() => remove(a.id)} style={{ cursor: "pointer" }}>🗑️</span>
        </div>
      ))}

      <form onSubmit={addAddress} style={{ marginTop: 16 }}>
        <div className="card">
          <label className="field-label">اسم العنوان (مثل: المنزل، العمل)</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="card">
          <label className="field-label">تفاصيل العنوان</label>
          <input value={details} onChange={(e) => setDetails(e.target.value)} />
        </div>
        <button className="btn" type="submit">إضافة عنوان</button>
      </form>
    </div>
  );
}

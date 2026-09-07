import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";

export default function DonorDetail() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    api.getDonor(id).then(setDonor).catch(() => {});
  }, [id]);

  if (!donor) return <div className="page">جارِ التحميل...</div>;

  return (
    <div className="page" style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: 18 }}>ملف المتبرع</h2>

      <div className="avatar" style={{ width: 80, height: 80, fontSize: 34, margin: "0 auto 12px" }}>🙂</div>
      <h3 style={{ margin: "0 0 6px" }}>{donor.name}</h3>
      {donor.verified && <span className="badge">متبرع نشط</span>}

      <div className="card" style={{ textAlign: "right", marginTop: 18 }}>
        <p className="muted">موقع المتبرع</p>
        <p>{donor.distanceKm} كم من المستشفى</p>
        <p className="muted" style={{ marginTop: 10 }}>الوقت</p>
        <p>آخر تبرع: {donor.lastDonation}</p>
      </div>

      {!notified ? (
        <button className="btn" onClick={() => setNotified(true)}>التبرع الآن</button>
      ) : (
        <div className="card urgent">تم إرسال التنبيه للمتبرع بنجاح ✅</div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, fontSize: 22 }}>
        <span title="مشاركة">📤</span>
        <span title="إضافة للمفضلة">🤍</span>
        <span title="إبلاغ">🚩</span>
      </div>
    </div>
  );
}

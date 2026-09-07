import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function DonorDetail() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [notified, setNotified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDonor(id).then(setDonor).catch(() => {});
  }, [id]);

  if (!donor) return <div className="page">جارِ التحميل...</div>;

  return (
    <div className="page">
      <h2>تفاصيل المتبرع</h2>
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🙂</div>
        <h3>{donor.name} {donor.verified && "✅"}</h3>
        <span className="badge">{donor.bloodType}</span>
        <p className="muted" style={{ marginTop: 10 }}>على بعد {donor.distanceKm} كم</p>
        <p className="muted">عدد مرات التبرع: {donor.donationsCount}</p>
        <p className="muted">آخر تبرع: {donor.lastDonation}</p>
      </div>

      {!notified ? (
        <button className="btn" onClick={() => setNotified(true)}>
          إرسال تنبيه لهذا المتبرع
        </button>
      ) : (
        <div className="card urgent">تم إرسال التنبيه للمتبرع بنجاح ✅</div>
      )}

      <button className="btn outline" style={{ marginTop: 10 }} onClick={() => navigate("/blood")}>
        رجوع
      </button>
    </div>
  );
}

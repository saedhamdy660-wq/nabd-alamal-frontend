import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

function DonorRow({ d, onClick }) {
  return (
    <div className="list-item" onClick={onClick} style={{ cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          className="avatar"
          style={{
            width: 34,
            height: 34,
            fontSize: 16,
            backgroundImage: d.avatar ? `url(${d.avatar})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!d.avatar && "🙂"}
        </div>
        <div>
          <strong>{d.name}</strong>
          <p className="muted" style={{ margin: 0 }}>على بعد {d.distanceKm} كم</p>
        </div>
      </div>
      <span className="badge">🩸 {d.bloodType}</span>
    </div>
  );
}

export default function BloodDonation() {
  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getBloodRequests().then(setRequests).catch(() => {});
    getCurrentLocation().catch(() => {});
  }, []);

  useEffect(() => {
    api.getNearbyDonors().then(setDonors).catch(() => {});
    const interval = setInterval(() => {
      api.getNearbyDonors().then(setDonors).catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const joinDonation = async (id) => {
    await api.respondToRequest(id);
    navigate(`/track/${id}`);
  };

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>التبرع بالدم والصفائح</h2>

      <div className="tabs">
        <div className={`tab ${tab === "urgent" ? "active" : ""}`} onClick={() => setTab("urgent")}>
          حالات طارئة
        </div>
        <div className={`tab ${tab === "donors" ? "active" : ""}`} onClick={() => setTab("donors")}>
          متبرعين مسجلين
        </div>
      </div>

      {tab === "urgent" && (
        <>
          {requests.length === 0 && <p className="muted">لا توجد حالات طارئة حاليًا.</p>}
          {requests.map((r) => (
            <div key={r.id} className="card urgent">
              <strong>🩸 حالة طارئة</strong>
              <p style={{ margin: "6px 0 0" }}>مطلوب فصيلة دم {r.bloodType}</p>
              <p className="muted">{r.hospital}</p>
              <p className="muted">على بعد {r.distanceKm} كم</p>
              <button className="btn danger" style={{ marginTop: 10 }} onClick={() => joinDonation(r.id)}>
                متابعة الطلب
              </button>
            </div>
          ))}

          <h3 style={{ margin: "20px 0 10px" }}>متبرعون قريبون منك</h3>
          <p className="muted" style={{ marginTop: -6, marginBottom: 10 }}>
            هذه القائمة تتحدّث تلقائيًا بكل شخص يسجّل نفسه كمتبرع في التطبيق
          </p>
          {donors.length === 0 && <p className="muted">لا يوجد متبرعون مسجّلون قريبون بعد.</p>}
          {donors.map((d) => (
            <DonorRow key={d.id} d={d} onClick={() => navigate(`/donor/${d.id}`)} />
          ))}
        </>
      )}

      {tab === "donors" && (
        <>
          {donors.length === 0 && <p className="muted">لا يوجد متبرعون مسجّلون بعد.</p>}
          {donors.map((d) => (
            <DonorRow key={d.id} d={d} onClick={() => navigate(`/donor/${d.id}`)} />
          ))}
        </>
      )}
    </div>
  );
}

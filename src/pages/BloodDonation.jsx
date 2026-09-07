import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

export default function BloodDonation() {
  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getBloodRequests().then(setRequests).catch(() => {});
    api.getNearbyDonors().then(setDonors).catch(() => {});
    getCurrentLocation().catch(() => {});
  }, []);

  const joinDonation = async (id) => {
    await api.respondToRequest(id);
    navigate(`/track/${id}`);
  };

  return (
    <div className="page">
      <h2 style={{ marginBottom: 16 }}>التبرع بالدم والمساعدة</h2>

      <div className="tabs">
        <div className={`tab ${tab === "urgent" ? "active" : ""}`} onClick={() => setTab("urgent")}>
          حالات طارئة
        </div>
        <div className={`tab ${tab === "donors" ? "active" : ""}`} onClick={() => setTab("donors")}>
          متبرعون متاحون
        </div>
      </div>

      {tab === "urgent" && (
        <>
          {requests.length === 0 && <p className="muted">لا توجد حالات طارئة حاليًا.</p>}
          {requests.map((r) => (
            <div key={r.id} className="card urgent">
              <strong>🚨 حالة طارئة</strong>
              <p style={{ margin: "6px 0 0" }}>مطلوب فصيلة دم {r.bloodType}</p>
              <p className="muted">{r.hospital}</p>
              <button className="btn danger" style={{ marginTop: 10 }} onClick={() => joinDonation(r.id)}>
                استجابة للطلب
              </button>
            </div>
          ))}

          <h3 style={{ margin: "20px 0 10px" }}>متبرعون قريبون منك</h3>
          {donors.map((d) => (
            <div key={d.id} className="list-item" onClick={() => navigate(`/donor/${d.id}`)} style={{ cursor: "pointer" }}>
              <div>
                <strong>{d.name}</strong>
                <p className="muted">على بعد {d.distanceKm} كم</p>
              </div>
              <span className="badge">{d.bloodType}</span>
            </div>
          ))}
        </>
      )}

      {tab === "donors" && (
        <>
          {donors.map((d) => (
            <div key={d.id} className="list-item" onClick={() => navigate(`/donor/${d.id}`)} style={{ cursor: "pointer" }}>
              <div>
                <strong>{d.name}</strong>
                <p className="muted">على بعد {d.distanceKm} كم</p>
              </div>
              <span className="badge">{d.bloodType}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

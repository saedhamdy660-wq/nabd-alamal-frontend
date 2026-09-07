import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getCurrentLocation } from "../api.js";

export default function BloodDonation() {
  const [tab, setTab] = useState("urgent");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getBloodRequests().then(setRequests).catch(() => {});
    api.getNearbyDonors("O+").then(setDonors).catch(() => {});
    // Ask for the browser's location to (in a real app) find the closest hospital/blood bank
    getCurrentLocation().catch(() => {});
  }, []);

  const joinDonation = async (id) => {
    await api.respondToRequest(id);
    navigate(`/track/${id}`);
  };

  const visibleRequests =
    tab === "urgent"
      ? requests.filter((r) => r.urgency === "عاجلة")
      : [...requests].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="page">
      <h2>🩸 التبرع بالدم والصفائح</h2>

      <div className="tabs">
        <div className={`tab ${tab === "urgent" ? "active" : ""}`} onClick={() => setTab("urgent")}>
          الطلبات العاجلة
        </div>
        <div className={`tab ${tab === "nearby" ? "active" : ""}`} onClick={() => setTab("nearby")}>
          الطلبات القريبة
        </div>
      </div>

      {visibleRequests.length === 0 && <p className="muted">لا توجد طلبات في هذا القسم حاليًا.</p>}

      {visibleRequests.map((r) => (
        <div key={r.id} className="card urgent">
          <strong>🚨 حالة طارئة — فصيلة دم {r.bloodType}</strong>
          <p className="muted">المستشفى: {r.hospital}</p>
          <p className="muted">على بعد {r.distanceKm} كم</p>
          <button className="btn danger" onClick={() => joinDonation(r.id)}>
            انضم للتبرع الآن
          </button>
        </div>
      ))}

      <h3>متبرعون متاحون بالقرب منك</h3>
      {donors.map((d) => (
        <div key={d.id} className="list-item" onClick={() => navigate(`/donor/${d.id}`)} style={{ cursor: "pointer" }}>
          <div>
            <strong>{d.name}</strong>
            <p className="muted">على بعد {d.distanceKm} كم</p>
          </div>
          <span className="badge">{d.bloodType}</span>
        </div>
      ))}

      <Link to="/home" className="btn outline" style={{ marginTop: 10, display: "block" }}>
        رجوع للرئيسية
      </Link>
    </div>
  );
}

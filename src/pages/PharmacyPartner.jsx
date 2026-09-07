import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";

export default function PharmacyPartner() {
  const { medicineId } = useParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getPharmacies().then(setPharmacies).catch(() => {});
  }, []);

  const confirm = async () => {
    const res = await api.requestMedicine(medicineId);
    setMessage(res.message);
  };

  return (
    <div className="page">
      <h2 style={{ marginBottom: 14 }}>أقرب صيدلية شريكة</h2>

      <div
        style={{
          background: "var(--primary-light)",
          borderRadius: "var(--radius-card)",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 50,
          marginBottom: 14,
        }}
      >
        🗺️📍
      </div>

      {pharmacies.map((p) => (
        <div key={p.id} className="card">
          <strong>{p.name}</strong>
          <p className="muted">{p.distanceKm} كم</p>
          <p className="muted">مفتوح حتى 11 م</p>
        </div>
      ))}

      {!message ? (
        <button className="btn" onClick={confirm}>اتجاهات الوصول</button>
      ) : (
        <div className="card urgent">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

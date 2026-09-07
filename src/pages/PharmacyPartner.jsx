import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function PharmacyPartner() {
  const { medicineId } = useParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getPharmacies().then(setPharmacies).catch(() => {});
  }, []);

  const confirm = async () => {
    const res = await api.requestMedicine(medicineId);
    setMessage(res.message);
  };

  return (
    <div className="page">
      <h2>🏥 أقرب صيدلية شريكة</h2>
      <p className="muted" style={{ marginBottom: 14 }}>
        لضمان الأمان، يتم تسليم الدواء عبر صيدلية شريكة بعد فحصه والتأكد من صلاحيته.
      </p>

      {pharmacies.map((p) => (
        <div key={p.id} className="card">
          <strong>{p.name}</strong>
          <p className="muted">على بعد {p.distanceKm} كم</p>
          <p className="muted">⭐ {p.rating} ({p.reviews} تقييم)</p>
        </div>
      ))}

      {!message ? (
        <button className="btn" onClick={confirm}>تأكيد الاستلام من هذه الصيدلية</button>
      ) : (
        <div className="card urgent">
          <p>{message}</p>
          <button className="btn outline" onClick={() => navigate("/requests")}>
            عرض طلباتي
          </button>
        </div>
      )}
    </div>
  );
}

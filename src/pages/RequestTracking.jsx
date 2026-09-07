import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";

export default function RequestTracking() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    api.getBloodRequest(id).then(setRequest).catch(() => {});
  }, [id]);

  if (!request) return <div className="page">جارِ التحميل...</div>;

  return (
    <div className="page">
      <h2>متابعة طلب التبرع</h2>
      <div className="card urgent">
        <strong>مطلوب فصيلة دم {request.bloodType}</strong>
        <p className="muted">{request.hospital}</p>
        <p className="muted">على بعد {request.distanceKm} كم</p>
      </div>

      <div style={{ marginTop: 20 }}>
        {request.timeline.map((step, i) => (
          <div key={i} className="timeline-item">
            <div className={`timeline-dot ${step.done ? "done" : ""}`}>{step.done ? "✓" : ""}</div>
            <div>
              <div>{step.label}</div>
              <div className="muted">{step.time}</div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/blood" className="btn outline" style={{ display: "block", marginTop: 10 }}>
        رجوع
      </Link>
    </div>
  );
}

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

  const allDone = request.timeline.every((s) => s.done);

  return (
    <div className="page">
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>تتبع الطلب</h2>

      <div>
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

      {allDone && (
        <div className="card" style={{ textAlign: "center", background: "var(--primary-light)", border: "1px solid #d7f0ea" }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <h3 style={{ margin: "8px 0 4px" }}>تم إكمال الطلب</h3>
          <p className="muted">شكرًا لكل من ساهم في إنقاذ حياة</p>
          <Link to="/requests" className="btn" style={{ marginTop: 12, display: "block" }}>
            تفاصيل الطلب
          </Link>
        </div>
      )}
    </div>
  );
}

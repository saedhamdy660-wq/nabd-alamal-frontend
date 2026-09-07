import React from "react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "كيف أتبرع بالدم؟", a: "اذهب إلى قسم التبرع بالدم، اختر حالة طارئة قريبة منك واضغط انضم للتبرع الآن." },
  { q: "كيف يتم تسليم الدواء؟", a: "لا يتم التسليم مباشرة بين الأشخاص، بل عبر صيدلية شريكة تفحص الدواء وتتأكد من صلاحيته." },
  { q: "هل بياناتي آمنة؟", a: "نعم، لا تتم مشاركة رقم هاتفك أو موقعك الدقيق إلا مع الجهات الشريكة الموثوقة عند الحاجة." },
];

export default function Support() {
  return (
    <div className="page">
      <Link to="/profile" className="btn outline" style={{ display: "block", marginBottom: 14 }}>
        ← رجوع
      </Link>
      <h2>🛟 المساعدة والدعم</h2>

      {faqs.map((f, i) => (
        <div key={i} className="card">
          <strong>{f.q}</strong>
          <p className="muted" style={{ marginTop: 6 }}>{f.a}</p>
        </div>
      ))}

      <div className="card">
        <strong>تواصل معنا</strong>
        <p className="muted">support@nabdalamal.example</p>
        <p className="muted">19999 (خط الطوارئ الطبي)</p>
      </div>
    </div>
  );
}

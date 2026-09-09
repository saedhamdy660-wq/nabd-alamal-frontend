import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../api.js";

export default function LocationPermission() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allow = async () => {
    try {
      setLoading(true);
      setStatus("");

      await getCurrentLocation();

      setStatus("تم تحديد موقعك بنجاح ✅");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch {
      setStatus("تعذّر الوصول للموقع، يمكنك تفعيله لاحقًا من الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="location-page">

      {/* Back */}
      <button
        className="location-back"
        onClick={() => navigate(-1)}
        aria-label="رجوع"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Content */}
      <main className="location-content">

        <header className="location-header">
          <h1>تحديد الموقع</h1>
        </header>

        {/* Location Illustration */}
        <div className="location-illustration">

          <div className="map-glow"></div>

          <div className="map-shape map-one"></div>
          <div className="map-shape map-two"></div>
          <div className="map-shape map-three"></div>
          <div className="map-shape map-four"></div>

          <div className="location-pin">
            <div className="pin-hole"></div>
          </div>

          <div className="pin-shadow"></div>

          <span className="location-dot dot-one"></span>
          <span className="location-dot dot-two"></span>
          <span className="location-dot dot-three"></span>

        </div>

        {/* Text */}
        <section className="location-text">

          <h2>نحتاج إلى الوصول لموقعك</h2>

          <p>
            لتقديم تنبيهات دقيقة وتجربة أقرب
            <br />
            لاحتياجاتك، نحتاج إلى تحديد موقعك
          </p>

        </section>

        {/* Actions */}
        <section className="location-actions">

          <button
            className="location-allow"
            onClick={allow}
            disabled={loading}
          >
            <span className="allow-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>

            <span>
              {loading ? "جاري تحديد الموقع..." : "السماح بالموقع"}
            </span>
          </button>

          <button
            className="location-skip"
            onClick={() => navigate("/home")}
          >
            ليس الآن
          </button>

        </section>

        {status && (
          <p className="location-status">
            {status}
          </p>
        )}

      </main>

      {/* Bottom Waves */}
      <div className="location-waves">
        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave-line"></div>
      </div>

    </div>
  );
}

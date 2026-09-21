import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation, api } from "../api.js";

export default function LocationPermission() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allow = async () => {
    try {
      setLoading(true);
      setStatus("");

      // الحصول على الموقع الحالي بدقة عالية
      const location = await getCurrentLocation();

      const lat = Number(location?.lat);
      const lng = Number(location?.lng);
      const accuracy = Number(location?.accuracy);

      // التأكد من أن الإحداثيات صحيحة
      if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng)
      ) {
        throw new Error("Invalid location coordinates");
      }

      // الحصول على المستخدم المحفوظ حاليًا
      const savedUser =
        localStorage.getItem("nabd_user");

      if (!savedUser) {
        setStatus("تم تحديد موقعك بنجاح ✅");

        setTimeout(() => {
          navigate("/home");
        }, 800);

        return;
      }

      let currentUser;

      try {
        currentUser = JSON.parse(savedUser);
      } catch {
        currentUser = null;
      }

      if (!currentUser) {
        setStatus("تم تحديد موقعك بنجاح ✅");

        setTimeout(() => {
          navigate("/home");
        }, 800);

        return;
      }

      /*
        حفظ الموقع الحقيقي داخل بيانات المستخدم
        في المتصفح.
      */
      const updatedUser = {
        ...currentUser,
        lat,
        lng,
        accuracy: Number.isFinite(accuracy)
          ? accuracy
          : null,
        locationEnabled: true,
      };

      localStorage.setItem(
        "nabd_user",
        JSON.stringify(updatedUser)
      );

      /*
        تحديث الموقع في الـ Backend.

        مهم:
        الموقع الجديد يتم إرساله للـ Backend حتى يتم
        تحديث موقع المستخدم والمتبرع المرتبط به.
      */
      if (currentUser.id) {
        try {
          const backendUser =
            await api.updateUserLocation(
              currentUser.id,
              lat,
              lng
            );

          if (backendUser) {
            const finalUser = {
              ...updatedUser,
              ...backendUser,
              lat,
              lng,
              accuracy: Number.isFinite(accuracy)
                ? accuracy
                : null,
              locationEnabled: true,
            };

            localStorage.setItem(
              "nabd_user",
              JSON.stringify(finalUser)
            );
          }
        } catch (error) {
          console.error(
            "تعذر تحديث موقع المستخدم في Backend:",
            error
          );

          /*
            الموقع ما زال محفوظًا محليًا،
            لكن لو فشل الـBackend فلن يتم تحديث
            موقع المتبرع هناك.
          */
        }
      }

      setStatus("تم تحديد موقعك بنجاح ✅");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      console.error(
        "خطأ أثناء تحديد الموقع:",
        error
      );

      setStatus(
        "تعذّر الوصول للموقع، يمكنك تفعيله لاحقًا من الإعدادات"
      );
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
              {loading
                ? "جاري تحديد الموقع..."
                : "السماح بالموقع"}
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

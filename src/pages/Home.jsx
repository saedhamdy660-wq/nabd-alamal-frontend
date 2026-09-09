import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const [urgentRequests, setUrgentRequests] = useState([]);

  const avatar = localStorage.getItem("nabd_avatar");

  useEffect(() => {
    const stored = localStorage.getItem("nabd_user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      api.getUser().then(setUser).catch(() => {});
    }

    api.getBloodRequests()
      .then(setUrgentRequests)
      .catch(() => {});
  }, []);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "بك";

  return (
    <div className="home-modern">

      {/* Header */}
      <header className="home-top">

        <div className="home-brand">
          <div className="home-logo">
            ♥
          </div>

          <div>
            <h1>نبض الأمل</h1>
            <span>معًا ننقذ حياة</span>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/notifications" className="home-notification">
            ♧
          </Link>

          <Link
            to="/profile"
            className="home-profile"
            style={
              avatar
                ? {
                    backgroundImage: `url(${avatar})`,
                  }
                : {}
            }
          >
            {!avatar && "👤"}
          </Link>
        </div>

      </header>

      <main className="home-body">

        {/* Welcome */}
        <section className="home-welcome">
          <h2>
            مرحبًا، {userName}
          </h2>

          <p>
            معًا ننقذ حياة ❤️
          </p>
        </section>

        {/* Search */}
        <div className="home-search-modern">
          <input
            type="text"
            placeholder="ابحث عن دواء أو فصيلة دم..."
          />

          <span>⌕</span>
        </div>

        {/* Services */}
        <section className="home-services">

          <Link to="/medicines" className="home-service medicine">
            <div className="service-round">
              💊
            </div>

            <h3>تبادل الأدوية</h3>

            <p>لأدوية غير متوفرة</p>

            <span className="service-arrow">
              ←
            </span>
          </Link>

          <Link to="/blood" className="home-service blood">
            <div className="service-round">
              🩸
            </div>

            <h3>التبرع بالدم والصفائح</h3>

            <p>ساهم في إنقاذ حياة</p>

            <span className="service-arrow">
              ←
            </span>
          </Link>

        </section>

        {/* Requests */}
        <section className="home-requests">

          <div className="requests-header">
            <h3>طلبات عاجلة قريبة منك</h3>

            <Link to="/blood">
              عرض الكل
            </Link>
          </div>

          {urgentRequests.length === 0 ? (
            <div className="no-requests">
              لا توجد طلبات عاجلة حاليًا
            </div>
          ) : (
            urgentRequests.map((r) => (
              <Link
                key={r.id}
                to={`/track/${r.id}`}
                className="home-request"
              >
                <div className="request-blood">
                  🩸
                </div>

                <div className="request-info">
                  <strong>
                    فصيلة دم {r.bloodType}
                  </strong>

                  <p>
                    {r.hospital}
                  </p>

                  <small>
                    على بعد {r.distanceKm} كم
                  </small>
                </div>

                <span className="request-arrow">
                  ←
                </span>
              </Link>
            ))
          )}

        </section>

      </main>
    </div>
  );
}

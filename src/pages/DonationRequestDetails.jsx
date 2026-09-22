import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { api } from "../api.js";

function ArrowBackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M5.5 19c.8-3.2 3-4.8 6.5-4.8s5.7 1.6 6.5 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BloodIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 21V6h14v15M3 21h18M9 21v-5h6v5M10 9h4M12 7v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="9"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M7 7l10 10M17 7L7 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 7v5l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function DonationRequestDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [request, setRequest] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [responding, setResponding] =
    useState(false);

  const [error, setError] =
    useState("");

  const [currentUser, setCurrentUser] =
    useState(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "nabd_user"
      );

    if (savedUser) {
      try {
        setCurrentUser(
          JSON.parse(savedUser)
        );
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadRequest = async () => {
      if (!id) {
        setError(
          "رقم طلب التبرع غير موجود"
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        setError("");

        const data =
          await api.getBloodRequest(id);

        if (!mounted) {
          return;
        }

        setRequest(data);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err?.message ||
            "تعذر تحميل تفاصيل طلب التبرع"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRequest();

    return () => {
      mounted = false;
    };
  }, [id]);

  const getRequesterName = () => {
    return (
      request?.requesterName ||
      request?.requester?.name ||
      request?.userName ||
      request?.name ||
      "طالب التبرع"
    );
  };

  const getBloodType = () => {
    return (
      request?.bloodType ||
      request?.blood_group ||
      request?.bloodGroup ||
      "غير محددة"
    );
  };

  const getHospitalName = () => {
    return (
      request?.hospital?.name ||
      request?.hospital ||
      request?.hospitalName ||
      request?.locationName ||
      "المستشفى المحددة"
    );
  };

  const getHospitalAddress = () => {
    return (
      request?.address ||
      request?.hospitalAddress ||
      request?.hospital?.address ||
      ""
    );
  };

  const getHospitalCoordinates = () => {
    const lat =
      request?.lat ??
      request?.hospital?.lat;

    const lng =
      request?.lng ??
      request?.hospital?.lng;

    return {
      lat,
      lng,
    };
  };

  const getDirectionsUrl = () => {
    const {
      lat,
      lng,
    } =
      getHospitalCoordinates();

    if (
      lat !== undefined &&
      lat !== null &&
      lat !== "" &&
      lng !== undefined &&
      lng !== null &&
      lng !== ""
    ) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${lat},${lng}`
      )}`;
    }

    const address =
      getHospitalAddress();

    if (address) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
      )}`;
    }

    return "";
  };

  const getStatus = () => {
    return (
      request?.status ||
      request?.donationStatus ||
      "pending"
    );
  };

  const handleResponse = async (
    action
  ) => {
    if (
      !currentUser?.id ||
      !request?.id
    ) {
      setError(
        "لم يتم العثور على بيانات المتبرع"
      );

      return;
    }

    try {
      setResponding(true);

      setError("");

      const response =
        await api.respondToDonationRequest(
          request.id,
          currentUser.id,
          action
        );

      const updatedRequest =
        response?.request ||
        response;

      if (updatedRequest?.id) {
        setRequest(
          updatedRequest
        );
      } else {
        const refreshed =
          await api.getBloodRequest(
            request.id
          );

        setRequest(
          refreshed
        );
      }
    } catch (err) {
      setError(
        err?.message ||
          "حدث خطأ أثناء الرد على طلب التبرع"
      );
    } finally {
      setResponding(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const status =
    getStatus();

  const isPending =
    status === "pending" ||
    status === "قيد الانتظار" ||
    status === "قيد المراجعة";

  const isAccepted =
    status === "accepted" ||
    status === "accepted_donation" ||
    status === "مقبول" ||
    status === "تم القبول";

  const isRejected =
    status === "rejected" ||
    status === "مرفوض" ||
    status === "تم الرفض";

  const directionsUrl =
    getDirectionsUrl();

  const requesterName =
    getRequesterName();

  const bloodType =
    getBloodType();

  const hospitalName =
    getHospitalName();

  const hospitalAddress =
    getHospitalAddress();

  return (
    <div className="donation-request-page">

      <header className="request-header">

        <button
          type="button"
          className="back-button"
          onClick={handleBack}
          aria-label="رجوع"
        >
          <ArrowBackIcon />
        </button>

        <div className="header-title">

          <div className="header-title-row">

            <div className="header-heart">
              <HeartIcon />
            </div>

            <div>
              <h1>
                طلب تبرع بالدم
              </h1>

              <p>
                تفاصيل طلب التبرع
              </p>
            </div>

          </div>

        </div>

      </header>

      {loading && (
        <div className="state-card">

          <div className="loading-circle">

            <div className="loading-spinner" />

          </div>

          <h3>
            جاري تحميل الطلب
          </h3>

          <p>
            لحظات ونجهز لك تفاصيل طلب التبرع...
          </p>

        </div>
      )}

      {!loading && error && !request && (
        <div className="state-card error-card">

          <div className="state-icon">
            !
          </div>

          <h3>
            تعذر تحميل الطلب
          </h3>

          <p>
            {error}
          </p>

          <button
            type="button"
            className="back-main-button"
            onClick={handleBack}
          >
            رجوع
          </button>

        </div>
      )}

      {!loading && request && (
        <main className="request-content">

          <section className="request-hero">

            <div className="hero-glow" />

            <div className="hero-content">

              <div className="blood-icon-large">
                <BloodIcon />
              </div>

              <div className="hero-info">

                <span>
                  فصيلة الدم المطلوبة
                </span>

                <strong>
                  {bloodType}
                </strong>

                <small>
                  طلب تبرع بالدم
                </small>

              </div>

            </div>

            <div className="urgency-badge">
              {isPending
                ? "طلب قيد الانتظار"
                : isAccepted
                ? "تم قبول الطلب"
                : isRejected
                ? "تم رفض الطلب"
                : "طلب تبرع"}
            </div>

          </section>

          <section className="main-card">

            <div className="section-title">

              <div className="section-title-icon">
                <UserIcon />
              </div>

              <div>
                <h2>
                  تفاصيل الطلب
                </h2>

                <p>
                  معلومات صاحب الطلب ومكان التبرع
                </p>
              </div>

            </div>

            <div className="detail-card">

              <div className="detail-icon">
                <UserIcon />
              </div>

              <div className="detail-content">

                <span>
                  طالب التبرع
                </span>

                <strong>
                  {requesterName}
                </strong>

              </div>

            </div>

            <div className="detail-card">

              <div className="detail-icon blood-detail-icon">
                <BloodIcon />
              </div>

              <div className="detail-content">

                <span>
                  فصيلة الدم المطلوبة
                </span>

                <strong>
                  {bloodType}
                </strong>

              </div>

              <div className="blood-mini-badge">
                {bloodType}
              </div>

            </div>

            <div className="detail-card hospital-detail">

              <div className="detail-icon">
                <HospitalIcon />
              </div>

              <div className="detail-content">

                <span>
                  مكان التبرع
                </span>

                <strong>
                  {hospitalName}
                </strong>

                {hospitalAddress && (
                  <small>
                    {hospitalAddress}
                  </small>
                )}

              </div>

            </div>

            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-button"
              >
                <LocationIcon />

                <span>
                  فتح موقع المستشفى والاتجاهات
                </span>

                <span className="direction-arrow">
                  ←
                </span>
              </a>
            )}

          </section>

          {isAccepted && (
            <section className="status-card accepted">

              <div className="status-icon">
                <CheckIcon />
              </div>

              <div className="status-content">

                <div className="status-title-row">

                  <h3>
                    تم قبول طلب التبرع
                  </h3>

                  <span className="status-label">
                    مقبول
                  </span>

                </div>

                <p>
                  شكرًا لك على استجابتك. يمكنك الآن متابعة خطوات التبرع والوصول إلى المستشفى المحددة.
                </p>

              </div>

            </section>
          )}

          {isRejected && (
            <section className="status-card rejected">

              <div className="status-icon">
                <CloseIcon />
              </div>

              <div className="status-content">

                <div className="status-title-row">

                  <h3>
                    تم رفض طلب التبرع
                  </h3>

                  <span className="status-label">
                    مرفوض
                  </span>

                </div>

                <p>
                  تم تسجيل رفض طلب التبرع بنجاح.
                </p>

              </div>

            </section>
          )}

          {error && request && (
            <div className="response-error">

              <span className="error-dot">
                !
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

          {isPending && (
            <section className="actions-card">

              <div className="actions-header">

                <div className="actions-icon">
                  <HeartIcon />
                </div>

                <div>
                  <h3>
                    هل تريد التبرع؟
                  </h3>

                  <p>
                    راجع بيانات الطلب قبل اتخاذ القرار.
                  </p>
                </div>

              </div>

              <div className="actions">

                <button
                  type="button"
                  className="accept-button"
                  disabled={responding}
                  onClick={() =>
                    handleResponse("accept")
                  }
                >

                  {responding ? (
                    <span className="button-loading">
                      <span />
                      جاري تنفيذ الطلب...
                    </span>
                  ) : (
                    <>
                      <CheckIcon />
                      قبول طلب التبرع
                    </>
                  )}

                </button>

                <button
                  type="button"
                  className="reject-button"
                  disabled={responding}
                  onClick={() =>
                    handleResponse("reject")
                  }
                >

                  <CloseIcon />

                  رفض الطلب

                </button>

              </div>

            </section>
          )}

          {isAccepted && (
            <section className="tracking-card">

              <div className="tracking-icon">
                <ClockIcon />
              </div>

              <div className="tracking-content">

                <h3>
                  متابعة حالة التبرع
                </h3>

                <p>
                  تابع مراحل التبرع من قبول الطلب حتى إتمام التبرع.
                </p>

              </div>

              <button
                type="button"
                className="tracking-button"
                onClick={() =>
                  navigate(
                    `/track/${request.id}`
                  )
                }
              >
                متابعة
              </button>

            </section>
          )}

        </main>
      )}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        .donation-request-page {
          width: 100%;
          min-height: 100vh;

          padding:
            16px
            14px
            40px;

          direction: rtl;

          color: #17332e;

          background:
            radial-gradient(
              circle at 8% 2%,
              rgba(10,168,143,.14),
              transparent 27%
            ),
            radial-gradient(
              circle at 96% 18%,
              rgba(117,219,201,.18),
              transparent 29%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(10,168,143,.08),
              transparent 35%
            ),
            linear-gradient(
              155deg,
              #ffffff 0%,
              #f6fcfb 38%,
              #eaf8f5 100%
            );

          font-family:
            Tajawal,
            Arial,
            Tahoma,
            sans-serif;
        }

        .request-header {
          width: 100%;
          max-width: 500px;

          margin:
            0 auto
            18px;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .back-button {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 16px;

          color: #078876;

          background:
            rgba(255,255,255,.84);

          box-shadow:
            0 8px 20px
              rgba(7,136,118,.08),
            inset 0 1px 0
              rgba(255,255,255,1);

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);

          cursor: pointer;
        }

        .back-button svg {
          width: 25px;
          height: 25px;
        }

        .header-title {
          flex: 1;
          min-width: 0;
        }

        .header-title-row {
          display: flex;

          align-items: center;

          gap: 11px;
        }

        .header-heart {
          width: 44px;
          height: 44px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8,
              #078876
            );

          box-shadow:
            0 7px 15px
              rgba(7,136,118,.17);
        }

        .header-heart svg {
          width: 22px;
          height: 22px;
        }

        .header-title h1 {
          margin: 0 0 3px;

          color: #17332e;

          font-size: 22px;

          line-height: 1.25;

          font-weight: 900;
        }

        .header-title p {
          margin: 0;

          color: #78908c;

          font-size: 13px;

          line-height: 1.4;

          font-weight: 600;
        }

        .request-content {
          width: 100%;
          max-width: 500px;

          margin: 0 auto;
        }

        /* ================= HERO ================= */

        .request-hero {
          position: relative;

          overflow: hidden;

          width: 100%;
          min-height: 138px;

          margin-bottom: 15px;

          padding: 20px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 14px;

          border-radius: 25px;

          background:
            linear-gradient(
              135deg,
              #e6faf6 0%,
              #d5f3ed 48%,
              #c7eee7 100%
            );

          border:
            1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 12px 28px
              rgba(7,136,118,.09),
            inset 0 1px 0
              rgba(255,255,255,.85);
        }

        .hero-glow {
          position: absolute;

          width: 180px;
          height: 180px;

          left: -65px;
          bottom: -90px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.28);

          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;

          min-width: 0;

          display: flex;

          align-items: center;

          gap: 14px;
        }

        .blood-icon-large {
          width: 68px;
          height: 68px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 20px;

          color: #078876;

          background:
            rgba(255,255,255,.75);

          box-shadow:
            0 6px 15px
              rgba(7,136,118,.07);
        }

        .blood-icon-large svg {
          width: 38px;
          height: 38px;
        }

        .hero-info {
          min-width: 0;
        }

        .hero-info span {
          display: block;

          margin-bottom: 3px;

          color: #6e928d;

          font-size: 14px;

          line-height: 1.4;

          font-weight: 700;
        }

        .hero-info strong {
          display: block;

          color: #078876;

          font-size: 36px;

          line-height: 1.05;

          font-weight: 900;
        }

        .hero-info small {
          display: block;

          margin-top: 5px;

          color: #6e928d;

          font-size: 12px;

          line-height: 1.4;
        }

        .urgency-badge {
          position: relative;
          z-index: 1;

          flex-shrink: 0;

          max-width: 145px;

          padding:
            9px
            11px;

          border-radius: 12px;

          color: #078876;

          background:
            rgba(255,255,255,.78);

          font-size: 12px;

          line-height: 1.4;

          font-weight: 900;

          text-align: center;
        }

        /* ================= MAIN CARD ================= */

        .main-card {
          width: 100%;

          padding: 17px;

          border-radius: 24px;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 11px 28px
              rgba(23,87,82,.06),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .section-title {
          display: flex;

          align-items: center;

          gap: 11px;

          margin-bottom: 15px;

          padding-bottom: 13px;

          border-bottom:
            1px solid
            rgba(10,168,143,.10);
        }

        .section-title-icon {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #078876;

          background:
            #e5f8f4;
        }

        .section-title-icon svg {
          width: 23px;
          height: 23px;
        }

        .section-title h2 {
          margin: 0 0 3px;

          color: #17332e;

          font-size: 18px;

          line-height: 1.3;

          font-weight: 900;
        }

        .section-title p {
          margin: 0;

          color: #8aa29e;

          font-size: 12px;

          line-height: 1.5;
        }

        .detail-card {
          width: 100%;
          min-height: 76px;

          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 10px;

          padding:
            11px
            12px;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              #fbfefd,
              #f3faf8
            );

          border:
            1px solid
            rgba(10,168,143,.06);

          transition:
            transform .2s ease;
        }

        .detail-card:hover {
          transform:
            translateY(-1px);
        }

        .detail-icon {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #078876;

          background:
            #e4f7f3;
        }

        .detail-icon svg {
          width: 24px;
          height: 24px;
        }

        .detail-content {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 3px;
        }

        .detail-content span {
          color: #8ba39f;

          font-size: 12px;

          line-height: 1.4;

          font-weight: 700;
        }

        .detail-content strong {
          color: #245b55;

          font-size: 16px;

          line-height: 1.5;

          font-weight: 900;

          overflow-wrap: anywhere;
        }

        .detail-content small {
          color: #809894;

          font-size: 12px;

          line-height: 1.7;

          overflow-wrap: anywhere;
        }

        .blood-mini-badge {
          flex-shrink: 0;

          min-width: 52px;

          padding:
            9px
            8px;

          border-radius: 11px;

          color: #078876;

          background:
            #dff6f1;

          text-align: center;

          font-size: 14px;

          font-weight: 900;
        }

        .directions-button {
          min-height: 52px;

          margin-top: 12px;

          padding:
            0
            14px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-radius: 15px;

          color: #078876;

          background:
            linear-gradient(
              135deg,
              #e8faf6,
              #def5f1
            );

          border:
            1px solid
            rgba(10,168,143,.08);

          font-size: 14px;

          line-height: 1.4;

          font-weight: 900;

          text-decoration: none;

          box-shadow:
            0 5px 14px
              rgba(7,136,118,.05);
        }

        .directions-button svg {
          width: 22px;
          height: 22px;

          flex-shrink: 0;
        }

        .direction-arrow {
          margin-right: auto;

          font-size: 20px;
        }

        /* ================= STATUS ================= */

        .status-card {
          margin-top: 15px;

          padding: 16px;

          display: flex;

          align-items: flex-start;

          gap: 12px;

          border-radius: 20px;

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 8px 22px
              rgba(23,87,82,.045);
        }

        .status-card.accepted {
          background:
            linear-gradient(
              135deg,
              #e4faf4,
              #d6f4ed
            );
        }

        .status-card.rejected {
          background:
            linear-gradient(
              135deg,
              #fff0f3,
              #ffe6eb
            );
        }

        .status-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background:
            rgba(255,255,255,.7);
        }

        .accepted .status-icon {
          color: #078876;
        }

        .rejected .status-icon {
          color: #a04e60;
        }

        .status-icon svg {
          width: 25px;
          height: 25px;
        }

        .status-content {
          min-width: 0;

          flex: 1;
        }

        .status-title-row {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 7px;

          margin-bottom: 5px;
        }

        .status-card h3 {
          margin: 0;

          font-size: 16px;

          line-height: 1.4;

          font-weight: 900;
        }

        .accepted h3 {
          color: #28786e;
        }

        .rejected h3 {
          color: #98505f;
        }

        .status-label {
          padding:
            4px
            8px;

          border-radius: 7px;

          font-size: 11px;

          line-height: 1.3;

          font-weight: 900;
        }

        .accepted .status-label {
          color: #078876;

          background:
            rgba(255,255,255,.65);
        }

        .rejected .status-label {
          color: #98505f;

          background:
            rgba(255,255,255,.7);
        }

        .status-card p {
          margin: 0;

          color: #7b9692;

          font-size: 13px;

          line-height: 1.8;
        }

        /* ================= RESPONSE ERROR ================= */

        .response-error {
          margin-top: 12px;

          min-height: 48px;

          padding:
            10px
            12px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          border-radius: 14px;

          color: #984f61;

          background:
            #ffebef;

          border:
            1px solid
            rgba(207,90,116,.08);

          font-size: 13px;

          line-height: 1.6;

          font-weight: 800;

          text-align: center;
        }

        .error-dot {
          width: 23px;
          height: 23px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background:
            #c8667c;

          font-size: 13px;

          font-weight: 900;
        }

        /* ================= ACTIONS ================= */

        .actions-card {
          margin-top: 15px;

          padding: 18px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.95),
              rgba(239,250,247,.92)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 11px 27px
              rgba(23,87,82,.065);
        }

        .actions-header {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 15px;
        }

        .actions-icon {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #078876;

          background:
            #e0f7f2;
        }

        .actions-icon svg {
          width: 24px;
          height: 24px;
        }

        .actions-header h3 {
          margin: 0 0 3px;

          color: #173f39;

          font-size: 18px;

          line-height: 1.4;

          font-weight: 900;
        }

        .actions-header p {
          margin: 0;

          color: #819b97;

          font-size: 12px;

          line-height: 1.7;
        }

        .actions {
          display: flex;

          gap: 10px;
        }

        .actions button {
          flex: 1;

          min-height: 55px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          border: 0;

          border-radius: 15px;

          font-family: inherit;

          font-size: 14px;

          line-height: 1.4;

          font-weight: 900;

          cursor: pointer;

          transition:
            transform .2s ease,
            opacity .2s ease,
            box-shadow .2s ease;
        }

        .actions button svg {
          width: 21px;
          height: 21px;
        }

        .actions button:active {
          transform:
            scale(.97);
        }

        .actions button:disabled {
          opacity: .55;

          cursor: not-allowed;
        }

        .accept-button {
          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8 0%,
              #078876 100%
            );

          box-shadow:
            0 8px 18px
              rgba(7,136,118,.18);
        }

        .reject-button {
          color: #98505f;

          background:
            #ffebef;

          border:
            1px solid
            rgba(207,90,116,.06) !important;
        }

        .button-loading {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;
        }

        .button-loading span {
          width: 16px;
          height: 16px;

          border:
            2px solid
            rgba(255,255,255,.4);

          border-top-color:
            white;

          border-radius: 50%;

          animation:
            spin .7s linear infinite;
        }

        /* ================= TRACKING ================= */

        .tracking-card {
          margin-top: 15px;

          padding: 15px;

          display: flex;

          align-items: center;

          gap: 11px;

          border-radius: 20px;

          background:
            linear-gradient(
              135deg,
              #e5faf6,
              #d7f3ee
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 8px 21px
              rgba(7,136,118,.06);
        }

        .tracking-icon {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #078876;

          background:
            rgba(255,255,255,.72);
        }

        .tracking-icon svg {
          width: 24px;
          height: 24px;
        }

        .tracking-content {
          min-width: 0;

          flex: 1;
        }

        .tracking-content h3 {
          margin: 0 0 3px;

          color: #245b55;

          font-size: 15px;

          line-height: 1.4;

          font-weight: 900;
        }

        .tracking-content p {
          margin: 0;

          color: #7d9995;

          font-size: 12px;

          line-height: 1.7;
        }

        .tracking-button {
          min-width: 76px;

          min-height: 43px;

          padding:
            0
            11px;

          border: 0;

          border-radius: 12px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8,
              #078876
            );

          font-family: inherit;

          font-size: 13px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 6px 13px
              rgba(7,136,118,.14);
        }

        /* ================= STATES ================= */

        .state-card {
          width: 100%;
          max-width: 500px;

          margin:
            45px auto
            0;

          padding:
            38px
            22px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(233,249,246,.82)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 13px 32px
              rgba(7,136,118,.08);

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);
        }

        .loading-circle {
          width: 68px;
          height: 68px;

          margin:
            0 auto;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background:
            #e1f7f3;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;

          border:
            3px solid
            #cbeee8;

          border-top-color:
            #078876;

          border-radius: 50%;

          animation:
            spin .8s linear infinite;
        }

        .state-card h3 {
          margin:
            16px
            0
            0;

          color: #245b55;

          font-size: 19px;

          line-height: 1.4;

          font-weight: 900;
        }

        .state-card p {
          margin:
            8px
            0
            0;

          color: #8aa39f;

          font-size: 14px;

          line-height: 1.9;
        }

        .error-card {
          background:
            linear-gradient(
              145deg,
              #fffafb,
              #fff0f3
            );
        }

        .state-icon {
          width: 64px;
          height: 64px;

          margin:
            0 auto;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 20px;

          color: #a34f63;

          background:
            #ffe3e9;

          font-size: 27px;

          font-weight: 900;
        }

        .back-main-button {
          min-height: 48px;

          margin-top: 20px;

          padding:
            0
            32px;

          border: 0;

          border-radius: 14px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8,
              #078876
            );

          font-family: inherit;

          font-size: 14px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 7px 16px
              rgba(7,136,118,.15);
        }

        /* ================= MOBILE ================= */

        @media (max-width: 430px) {

          .donation-request-page {
            padding:
              14px
              12px
              36px;
          }

          .request-header {
            margin-bottom: 16px;
          }

          .header-title h1 {
            font-size: 21px;
          }

          .header-title p {
            font-size: 12px;
          }

          .request-hero {
            min-height: 135px;

            padding: 17px;

            gap: 9px;
          }

          .blood-icon-large {
            width: 62px;
            height: 62px;
          }

          .blood-icon-large svg {
            width: 35px;
            height: 35px;
          }

          .hero-content {
            gap: 11px;
          }

          .hero-info span {
            font-size: 12px;
          }

          .hero-info strong {
            font-size: 33px;
          }

          .hero-info small {
            font-size: 11px;
          }

          .urgency-badge {
            max-width: 120px;

            padding:
              8px
              9px;

            font-size: 11px;
          }

          .main-card {
            padding: 15px;
          }

          .section-title h2 {
            font-size: 17px;
          }

          .section-title p {
            font-size: 11px;
          }

          .detail-card {
            min-height: 73px;

            padding:
              10px;
          }

          .detail-content span {
            font-size: 11px;
          }

          .detail-content strong {
            font-size: 15px;
          }

          .detail-content small {
            font-size: 11px;
          }

          .directions-button {
            min-height: 53px;

            font-size: 13px;
          }

          .actions-header h3 {
            font-size: 17px;
          }

          .actions-header p {
            font-size: 11px;
          }

          .actions button {
            min-height: 54px;

            font-size: 13px;
          }

          .tracking-content h3 {
            font-size: 14px;
          }

          .tracking-content p {
            font-size: 11px;
          }
        }

        /* ================= SMALL PHONES ================= */

        @media (max-width: 360px) {

          .donation-request-page {
            padding:
              12px
              10px
              32px;
          }

          .request-header {
            gap: 9px;
          }

          .back-button {
            width: 44px;
            height: 44px;
          }

          .header-heart {
            width: 40px;
            height: 40px;
          }

          .header-title h1 {
            font-size: 19px;
          }

          .header-title p {
            font-size: 11px;
          }

          .request-hero {
            padding: 14px;

            min-height: 125px;

            border-radius: 21px;
          }

          .blood-icon-large {
            width: 55px;
            height: 55px;

            border-radius: 17px;
          }

          .blood-icon-large svg {
            width: 31px;
            height: 31px;
          }

          .hero-content {
            gap: 9px;
          }

          .hero-info span {
            font-size: 11px;
          }

          .hero-info strong {
            font-size: 29px;
          }

          .hero-info small {
            font-size: 10px;
          }

          .urgency-badge {
            max-width: 105px;

            padding:
              7px
              8px;

            font-size: 10px;
          }

          .main-card {
            padding: 13px;
          }

          .section-title {
            gap: 9px;
          }

          .section-title-icon {
            width: 39px;
            height: 39px;
          }

          .section-title h2 {
            font-size: 16px;
          }

          .section-title p {
            font-size: 10px;
          }

          .detail-card {
            gap: 9px;

            min-height: 69px;
          }

          .detail-icon {
            width: 42px;
            height: 42px;
          }

          .detail-icon svg {
            width: 22px;
            height: 22px;
          }

          .detail-content span {
            font-size: 10px;
          }

          .detail-content strong {
            font-size: 14px;
          }

          .detail-content small {
            font-size: 10px;
          }

          .blood-mini-badge {
            min-width: 46px;

            font-size: 13px;
          }

          .directions-button {
            min-height: 51px;

            font-size: 12px;
          }

          .status-card {
            padding: 13px;

            gap: 9px;
          }

          .status-icon {
            width: 43px;
            height: 43px;
          }

          .status-card h3 {
            font-size: 14px;
          }

          .status-card p {
            font-size: 11px;
          }

          .actions-card {
            padding: 15px;
          }

          .actions {
            flex-direction: column;

            gap: 9px;
          }

          .actions button {
            width: 100%;

            min-height: 54px;

            font-size: 14px;
          }

          .tracking-card {
            align-items: center;
          }

          .tracking-button {
            min-width: 68px;

            font-size: 12px;
          }
        }

        @keyframes spin {
          to {
            transform:
              rotate(360deg);
          }
        }

      `}</style>
    </div>
  );
}

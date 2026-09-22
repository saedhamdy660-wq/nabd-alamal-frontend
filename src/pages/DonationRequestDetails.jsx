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

      /*
        الـ API بيرجع:
        {
          request,
          notification
        }

        لذلك نأخذ request من داخل
        الاستجابة.
      */
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

      {/* ================= HEADER ================= */}

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

      {/* ================= LOADING ================= */}

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

      {/* ================= ERROR ================= */}

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

      {/* ================= REQUEST ================= */}

      {!loading && request && (
        <main className="request-content">

          {/* ================= REQUEST HERO ================= */}

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

          {/* ================= DETAILS ================= */}

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

            {/* Requester */}

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

            {/* Blood Type */}

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

            {/* Hospital */}

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

            {/* Directions */}

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

          {/* ================= STATUS ================= */}

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

          {/* ================= RESPONSE ERROR ================= */}

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

          {/* ================= ACTIONS ================= */}

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
                    handleResponse(
                      "accept"
                    )
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
                    handleResponse(
                      "reject"
                    )
                  }
                >

                  <CloseIcon />

                  رفض الطلب

                </button>

              </div>

            </section>
          )}

          {/* ================= TRACKING ================= */}

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

        .donation-request-page {
          min-height: 100vh;

          padding:
            18px
            16px
            38px;

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
          max-width: 430px;

          margin:
            0 auto
            18px;

          display: flex;

          align-items: center;

          gap: 11px;
        }

        .back-button {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid
            rgba(255,255,255,.95);

          border-radius: 15px;

          color: #078876;

          background:
            rgba(255,255,255,.78);

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

          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .back-button:active {
          transform:
            scale(.95);
        }

        .back-button svg {
          width: 22px;
          height: 22px;
        }

        .header-title {
          flex: 1;
        }

        .header-title-row {
          display: flex;

          align-items: center;

          gap: 9px;
        }

        .header-heart {
          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

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
          width: 18px;
          height: 18px;
        }

        .header-title h1 {
          margin: 0 0 2px;

          color: #17332e;

          font-size: 19px;

          line-height: 1.2;

          font-weight: 900;
        }

        .header-title p {
          margin: 0;

          color: #78908c;

          font-size: 10px;

          font-weight: 500;
        }

        .request-content {
          max-width: 430px;

          margin: 0 auto;
        }

        /* ================= HERO ================= */

        .request-hero {
          position: relative;

          overflow: hidden;

          min-height: 116px;

          margin-bottom: 13px;

          padding: 18px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          border-radius: 24px;

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

          width: 150px;
          height: 150px;

          left: -55px;
          bottom: -75px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.28);

          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .blood-icon-large {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 19px;

          color: #078876;

          background:
            rgba(255,255,255,.72);

          box-shadow:
            0 6px 15px
              rgba(7,136,118,.07);
        }

        .blood-icon-large svg {
          width: 32px;
          height: 32px;
        }

        .hero-info span {
          display: block;

          margin-bottom: 1px;

          color: #6e928d;

          font-size: 10px;

          font-weight: 600;
        }

        .hero-info strong {
          display: block;

          color: #078876;

          font-size: 29px;

          line-height: 1.05;

          font-weight: 900;
        }

        .hero-info small {
          display: block;

          margin-top: 3px;

          color: #6e928d;

          font-size: 9px;
        }

        .urgency-badge {
          position: relative;
          z-index: 1;

          flex-shrink: 0;

          padding:
            7px
            9px;

          border-radius: 10px;

          color: #078876;

          background:
            rgba(255,255,255,.72);

          font-size: 8px;

          font-weight: 800;

          white-space: nowrap;
        }

        /* ================= MAIN CARD ================= */

        .main-card {
          padding: 14px;

          border-radius: 23px;

          background:
            rgba(255,255,255,.84);

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

          gap: 9px;

          margin-bottom: 13px;

          padding-bottom: 11px;

          border-bottom:
            1px solid
            rgba(10,168,143,.08);
        }

        .section-title-icon {
          width: 35px;
          height: 35px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 11px;

          color: #078876;

          background:
            #e5f8f4;
        }

        .section-title-icon svg {
          width: 19px;
          height: 19px;
        }

        .section-title h2 {
          margin: 0 0 2px;

          color: #17332e;

          font-size: 13px;

          font-weight: 900;
        }

        .section-title p {
          margin: 0;

          color: #8aa29e;

          font-size: 8px;
        }

        .detail-card {
          min-height: 59px;

          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 8px;

          padding:
            9px
            10px;

          border-radius: 15px;

          background:
            linear-gradient(
              135deg,
              #fbfefd,
              #f3faf8
            );

          border:
            1px solid
            rgba(10,168,143,.045);

          transition:
            transform .2s ease;
        }

        .detail-card:hover {
          transform:
            translateY(-1px);
        }

        .detail-icon {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #078876;

          background:
            #e4f7f3;
        }

        .detail-icon svg {
          width: 20px;
          height: 20px;
        }

        .detail-content {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }

        .detail-content span {
          color: #8ba39f;

          font-size: 8px;

          font-weight: 600;
        }

        .detail-content strong {
          color: #245b55;

          font-size: 11px;

          font-weight: 800;

          line-height: 1.5;

          overflow-wrap: anywhere;
        }

        .detail-content small {
          color: #809894;

          font-size: 8px;

          line-height: 1.6;

          overflow-wrap: anywhere;
        }

        .blood-mini-badge {
          flex-shrink: 0;

          min-width: 38px;

          padding:
            6px
            7px;

          border-radius: 9px;

          color: #078876;

          background:
            #dff6f1;

          text-align: center;

          font-size: 9px;

          font-weight: 900;
        }

        .directions-button {
          min-height: 43px;

          margin-top: 10px;

          padding:
            0
            11px;

          display: flex;

          align-items: center;

          gap: 7px;

          border-radius: 14px;

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

          font-size: 9px;

          font-weight: 800;

          text-decoration: none;

          box-shadow:
            0 5px 14px
              rgba(7,136,118,.05);
        }

        .directions-button svg {
          width: 18px;
          height: 18px;

          flex-shrink: 0;
        }

        .direction-arrow {
          margin-right: auto;

          font-size: 15px;
        }

        /* ================= STATUS ================= */

        .status-card {
          margin-top: 13px;

          padding: 13px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 19px;

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
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

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
          width: 22px;
          height: 22px;
        }

        .status-content {
          min-width: 0;

          flex: 1;
        }

        .status-title-row {
          display: flex;

          align-items: center;

          gap: 6px;

          margin-bottom: 3px;
        }

        .status-card h3 {
          margin: 0;

          font-size: 11px;

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
            3px
            6px;

          border-radius: 6px;

          font-size: 7px;

          font-weight: 800;
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

          font-size: 8px;

          line-height: 1.75;
        }

        /* ================= RESPONSE ERROR ================= */

        .response-error {
          margin-top: 10px;

          min-height: 39px;

          padding:
            8px
            10px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border-radius: 13px;

          color: #984f61;

          background:
            #ffebef;

          border:
            1px solid
            rgba(207,90,116,.08);

          font-size: 9px;

          font-weight: 700;

          text-align: center;
        }

        .error-dot {
          width: 19px;
          height: 19px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background:
            #c8667c;

          font-size: 10px;

          font-weight: 900;
        }

        /* ================= ACTIONS ================= */

        .actions-card {
          margin-top: 13px;

          padding: 15px;

          border-radius: 21px;

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

          gap: 10px;

          margin-bottom: 13px;
        }

        .actions-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #078876;

          background:
            #e0f7f2;
        }

        .actions-icon svg {
          width: 20px;
          height: 20px;
        }

        .actions-header h3 {
          margin: 0 0 2px;

          color: #173f39;

          font-size: 13px;

          font-weight: 900;
        }

        .actions-header p {
          margin: 0;

          color: #819b97;

          font-size: 8px;

          line-height: 1.6;
        }

        .actions {
          display: flex;

          gap: 8px;
        }

        .actions button {
          flex: 1;

          min-height: 45px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          border: 0;

          border-radius: 14px;

          font-family: inherit;

          font-size: 10px;

          font-weight: 900;

          cursor: pointer;

          transition:
            transform .2s ease,
            opacity .2s ease,
            box-shadow .2s ease;
        }

        .actions button svg {
          width: 17px;
          height: 17px;
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

          gap: 6px;
        }

        .button-loading span {
          width: 13px;
          height: 13px;

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
          margin-top: 13px;

          padding: 12px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-radius: 18px;

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
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #078876;

          background:
            rgba(255,255,255,.72);
        }

        .tracking-icon svg {
          width: 20px;
          height: 20px;
        }

        .tracking-content {
          min-width: 0;

          flex: 1;
        }

        .tracking-content h3 {
          margin: 0 0 2px;

          color: #245b55;

          font-size: 10px;

          font-weight: 900;
        }

        .tracking-content p {
          margin: 0;

          color: #7d9995;

          font-size: 7px;

          line-height: 1.65;
        }

        .tracking-button {
          min-width: 63px;

          min-height: 34px;

          padding:
            0
            9px;

          border: 0;

          border-radius: 11px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8,
              #078876
            );

          font-family: inherit;

          font-size: 9px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 6px 13px
              rgba(7,136,118,.14);
        }

        /* ================= STATES ================= */

        .state-card {
          max-width: 430px;

          margin:
            45px auto
            0;

          padding:
            34px
            20px;

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
          width: 58px;
          height: 58px;

          margin:
            0 auto;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 19px;

          background:
            #e1f7f3;
        }

        .loading-spinner {
          width: 28px;
          height: 28px;

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
            13px
            0
            0;

          color: #245b55;

          font-size: 14px;

          font-weight: 900;
        }

        .state-card p {
          margin:
            7px
            0
            0;

          color: #8aa39f;

          font-size: 9px;

          line-height: 1.8;
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
          width: 55px;
          height: 55px;

          margin:
            0 auto;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #a34f63;

          background:
            #ffe3e9;

          font-size: 22px;

          font-weight: 900;
        }

        .back-main-button {
          min-height: 41px;

          margin-top: 17px;

          padding:
            0
            27px;

          border: 0;

          border-radius: 13px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0ac4a8,
              #078876
            );

          font-family: inherit;

          font-size: 10px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 7px 16px
              rgba(7,136,118,.15);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 360px) {

          .donation-request-page {
            padding:
              15px
              12px
              30px;
          }

          .request-hero {
            padding: 14px;

            min-height: 108px;
          }

          .blood-icon-large {
            width: 51px;
            height: 51px;
          }

          .blood-icon-large svg {
            width: 28px;
            height: 28px;
          }

          .hero-info strong {
            font-size: 25px;
          }

          .urgency-badge {
            font-size: 7px;

            padding:
              6px
              7px;
          }

          .actions {
            flex-direction: column;
          }

          .actions button {
            width: 100%;
          }

          .tracking-card {
            align-items: flex-start;
          }

          .tracking-button {
            align-self: center;
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

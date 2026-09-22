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
      request?.hospital ||
      request?.hospitalName ||
      request?.locationName ||
      request?.hospital?.name ||
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

      const updated =
        await api.respondToDonationRequest(
          request.id,
          currentUser.id,
          action
        );

      if (updated) {
        setRequest(
          updated
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
    status === "مقبول";

  const isRejected =
    status === "rejected" ||
    status === "مرفوض";

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

      {/* Header */}

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
          <h1>
            طلب تبرع بالدم
          </h1>

          <p>
            تفاصيل طلب التبرع
          </p>
        </div>

      </header>

      {/* Loading */}

      {loading && (
        <div className="state-card">

          <div className="loading-spinner" />

          <p>
            جاري تحميل تفاصيل الطلب...
          </p>

        </div>
      )}

      {/* Error */}

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

      {/* Request */}

      {!loading && request && (
        <main className="request-content">

          {/* Main Card */}

          <section className="main-card">

            <div className="blood-header">

              <div className="blood-icon">
                <BloodIcon />
              </div>

              <div>
                <span>
                  فصيلة الدم المطلوبة
                </span>

                <strong>
                  {bloodType}
                </strong>
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

              <div className="detail-icon">
                <BloodIcon />
              </div>

              <div className="detail-content">

                <span>
                  فصيلة الدم
                </span>

                <strong>
                  {bloodType}
                </strong>

              </div>

            </div>

            {/* Hospital */}

            <div className="detail-card">

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

                فتح الاتجاهات
              </a>
            )}

          </section>

          {/* Status */}

          {isAccepted && (
            <section className="status-card accepted">

              <div className="status-icon">
                <CheckIcon />
              </div>

              <div>
                <h3>
                  تم قبول طلب التبرع
                </h3>

                <p>
                  يمكنك الآن متابعة خطوات التبرع والوصول إلى المستشفى المحددة.
                </p>
              </div>

            </section>
          )}

          {isRejected && (
            <section className="status-card rejected">

              <div className="status-icon">
                <CloseIcon />
              </div>

              <div>
                <h3>
                  تم رفض طلب التبرع
                </h3>

                <p>
                  تم تسجيل رفض طلب التبرع.
                </p>
              </div>

            </section>
          )}

          {/* Error while responding */}

          {error && (
            <div className="response-error">
              {error}
            </div>
          )}

          {/* Actions */}

          {isPending && (
            <section className="actions-card">

              <h3>
                هل تريد التبرع؟
              </h3>

              <p>
                راجع بيانات الطلب والمستشفى المحددة قبل اتخاذ القرار.
              </p>

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
                  {responding
                    ? "جاري..."
                    : "قبول طلب التبرع"}
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
                  رفض الطلب
                </button>

              </div>

            </section>
          )}

          {/* Tracking */}

          {isAccepted && (
            <button
              type="button"
              className="tracking-button"
              onClick={() =>
                navigate(
                  `/track/${request.id}`
                )
              }
            >
              متابعة التبرع
            </button>
          )}

        </main>
      )}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .donation-request-page {
          min-height: 100vh;

          padding: 22px 18px 35px;

          direction: rtl;

          color: #24575a;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(70,193,177,.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 28%,
              rgba(154,231,216,.18),
              transparent 30%
            ),
            linear-gradient(
              160deg,
              #fbffff 0%,
              #f1fbfa 45%,
              #e8f7f4 100%
            );

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

        .request-header {
          max-width: 520px;

          margin: 0 auto 22px;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .back-button {
          width: 44px;
          height: 44px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 0;

          border-radius: 15px;

          color: #218d83;

          background:
            rgba(255,255,255,.72);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          cursor: pointer;
        }

        .back-button svg {
          width: 23px;
          height: 23px;
        }

        .header-title {
          flex: 1;
        }

        .header-title h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 21px;

          font-weight: 800;
        }

        .header-title p {
          margin: 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .request-content {
          max-width: 520px;

          margin: 0 auto;
        }

        .main-card {
          padding: 15px;

          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(232,249,246,.82)
            );

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 10px 27px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.85);
        }

        .blood-header {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 14px;

          padding: 13px;

          border-radius: 17px;

          background:
            linear-gradient(
              145deg,
              #e4faf6,
              #d5f2ed
            );
        }

        .blood-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background:
            rgba(255,255,255,.7);
        }

        .blood-icon svg {
          width: 26px;
          height: 26px;
        }

        .blood-header span {
          display: block;

          margin-bottom: 3px;

          color: #7c9a99;

          font-size: 10px;
        }

        .blood-header strong {
          display: block;

          color: #218d83;

          font-size: 22px;

          font-weight: 900;
        }

        .detail-card {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 9px;

          padding: 10px;

          border-radius: 14px;

          background:
            rgba(255,255,255,.68);
        }

        .detail-card:last-of-type {
          margin-bottom: 0;
        }

        .detail-icon {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 11px;

          color: #159b8a;

          background:
            #e5f8f4;
        }

        .detail-icon svg {
          width: 20px;
          height: 20px;
        }

        .detail-content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }

        .detail-content span {
          color: #8aa3a2;

          font-size: 9px;
        }

        .detail-content strong {
          color: #286d6d;

          font-size: 12px;

          font-weight: 800;

          line-height: 1.5;
        }

        .detail-content small {
          color: #7b9796;

          font-size: 9px;

          line-height: 1.6;
        }

        .directions-button {
          width: 100%;

          min-height: 42px;

          margin-top: 11px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          border-radius: 14px;

          color: #159b8a;

          background:
            rgba(229,248,244,.95);

          font-size: 11px;

          font-weight: 800;

          text-decoration: none;

          box-shadow:
            0 5px 12px
              rgba(21,155,138,.06);
        }

        .directions-button svg {
          width: 18px;
          height: 18px;
        }

        .actions-card {
          margin-top: 13px;

          padding: 15px;

          border-radius: 20px;

          background:
            rgba(255,255,255,.78);

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 9px 23px
              rgba(42,128,128,.06);
        }

        .actions-card h3 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 14px;

          font-weight: 800;
        }

        .actions-card p {
          margin: 0 0 12px;

          color: #7b9796;

          font-size: 10px;

          line-height: 1.7;
        }

        .actions {
          display: flex;

          gap: 8px;
        }

        .actions button {
          flex: 1;

          min-height: 42px;

          border: 0;

          border-radius: 13px;

          font-size: 11px;

          font-weight: 800;

          cursor: pointer;

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .actions button:active {
          transform: scale(.98);
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
              #19ad98,
              #159b8a
            );

          box-shadow:
            0 7px 15px
              rgba(21,155,138,.13);
        }

        .reject-button {
          color: #98505f;

          background:
            #ffe7ed;
        }

        .status-card {
          margin-top: 13px;

          padding: 14px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 18px;

          border: 1px solid
            rgba(255,255,255,.9);
        }

        .status-card.accepted {
          background:
            rgba(213,248,239,.9);
        }

        .status-card.rejected {
          background:
            rgba(255,231,237,.9);
        }

        .status-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;
        }

        .accepted .status-icon {
          color: #159b8a;

          background:
            rgba(255,255,255,.65);
        }

        .rejected .status-icon {
          color: #98505f;

          background:
            rgba(255,255,255,.65);
        }

        .status-icon svg {
          width: 21px;
          height: 21px;
        }

        .status-card h3 {
          margin: 0 0 3px;

          font-size: 12px;

          font-weight: 800;
        }

        .accepted h3 {
          color: #28786e;
        }

        .rejected h3 {
          color: #98505f;
        }

        .status-card p {
          margin: 0;

          color: #7b9796;

          font-size: 9px;

          line-height: 1.7;
        }

        .tracking-button {
          width: 100%;

          min-height: 42px;

          margin-top: 13px;

          border: 0;

          border-radius: 14px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 8px 17px
              rgba(21,155,138,.13);
        }

        .response-error {
          margin-top: 10px;

          padding: 9px 11px;

          border-radius: 12px;

          color: #98505f;

          background:
            rgba(255,231,237,.9);

          font-size: 10px;

          font-weight: 700;

          text-align: center;
        }

        .state-card {
          max-width: 520px;

          margin: 45px auto 0;

          padding: 35px 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.78)
            );

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .state-card p {
          margin: 12px 0 0;

          color: #8aa3a2;

          font-size: 11px;

          line-height: 1.7;
        }

        .state-card h3 {
          margin: 12px 0 0;

          color: #286d6d;

          font-size: 15px;
        }

        .loading-spinner {
          width: 34px;
          height: 34px;

          margin: 0 auto;

          border: 3px solid
            #d7efeb;

          border-top-color:
            #159b8a;

          border-radius: 50%;

          animation:
            spin .8s linear infinite;
        }

        @keyframes spin {
          to {
            transform:
              rotate(360deg);
          }
        }

        .state-icon {
          width: 52px;
          height: 52px;

          margin: 0 auto;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #98505f;

          background:
            #ffe7ed;

          font-size: 22px;

          font-weight: 900;
        }

        .back-main-button {
          min-height: 40px;

          margin-top: 16px;

          padding: 0 25px;

          border: 0;

          border-radius: 13px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 11px;

          font-weight: 800;

          cursor: pointer;
        }

        

      `}</style>
    </div>
  );
}

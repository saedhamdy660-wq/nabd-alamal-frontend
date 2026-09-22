import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

function getRequesterInitial(name) {
  if (!name) return "م";
  return name.trim().charAt(0);
}

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
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 8v6M9 11h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 3v4M16 3v4M4 9h16"
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
        d="M20 8.8c0 5.2-8 10-8 10s-8-4.8-8-10a4.2 4.2 0 0 1 8-1.7A4.2 4.2 0 0 1 20 8.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="18"
        cy="5"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="6"
        cy="12"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="18"
        cy="19"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 11l8-5M8 13l8 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 4h12v16H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M9 8h6M9 12h6M9 16h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [responding, setResponding] =
    useState(false);

  const [error, setError] =
    useState("");

  const [currentUser, setCurrentUser] =
    useState(null);

  /*
    قراءة المستخدم الحالي
  */
  useEffect(() => {
    const savedUser =
      localStorage.getItem("nabd_user");

    if (!savedUser) {
      setCurrentUser(null);
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  /*
    تحميل طلب التبرع
  */
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
    } = getHospitalCoordinates();

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

  /*
    قبول / رفض الطلب
  */
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
        setRequest(updated);
      } else {
        const refreshed =
          await api.getBloodRequest(
            request.id
          );

        setRequest(refreshed);
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

  /*
    حالات الطلب
  */
  const status = getStatus();

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

  const requesterName =
    getRequesterName();

  const bloodType =
    getBloodType();

  const hospitalName =
    getHospitalName();

  const hospitalAddress =
    getHospitalAddress();

  const directionsUrl =
    getDirectionsUrl();

  /*
    Loading
  */
  if (loading) {
    return (
      <div className="donation-request-page">
        <div className="loading">
          جارِ تحميل تفاصيل الطلب...
        </div>
      </div>
    );
  }

  /*
    Error
  */
  if (!request) {
    return (
      <div className="donation-request-page">

        <header className="donor-header">

          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            <ArrowBackIcon />
          </button>

          <h1>
            طلب التبرع
          </h1>

          <button
            className="more-button"
            type="button"
          >
            ⋮
          </button>

        </header>

        <div className="error-card">

          <div className="error-icon">
            !
          </div>

          <strong>
            تعذر تحميل الطلب
          </strong>

          <p>
            {error ||
              "حدث خطأ أثناء تحميل تفاصيل الطلب"}
          </p>

          <button
            className="donate-button error-back-button"
            onClick={() => navigate(-1)}
          >
            رجوع
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="donation-request-page">

      {/* Header */}

      <header className="donor-header">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >
          <ArrowBackIcon />
        </button>

        <h1>
          طلب التبرع
        </h1>

        <button
          className="more-button"
          type="button"
        >
          ⋮
        </button>

      </header>

      {/* Requester Card */}

      <section className="donor-card">

        <div className="donor-avatar">

          {requesterName
            ? getRequesterInitial(
                requesterName
              )
            : "م"}

        </div>

        <h2>
          {requesterName}
        </h2>

        <div className="donor-meta">

          <span className="blood-badge">
            🩸 {bloodType}
          </span>

          <span className="registered">
            طالب تبرع بالدم
          </span>

        </div>

      </section>

      {/* Request Information */}

      <section className="info-card">

        {/* Blood Type */}

        <div className="info-row">

          <div className="info-value">
            فصيلة الدم المطلوبة -{" "}
            {bloodType}
          </div>

          <div className="info-icon blood-info-icon">
            <BloodIcon />
          </div>

        </div>

        <div className="info-divider" />

        {/* Requester */}

        <div className="info-row">

          <div className="info-value">
            طالب التبرع -{" "}
            {requesterName}
          </div>

          <div className="info-icon">
            <UserIcon />
          </div>

        </div>

        <div className="info-divider" />

        {/* Hospital */}

        <div className="info-row">

          <div className="info-value hospital-value">

            <span>
              مكان التبرع -{" "}
              {hospitalName}
            </span>

            {hospitalAddress && (
              <small>
                {hospitalAddress}
              </small>
            )}

          </div>

          <div className="info-icon">
            <HospitalIcon />
          </div>

        </div>

      </section>

      {/* Directions */}

      {directionsUrl && (
        <a
          className="donate-button directions-button"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LocationIcon />

          فتح الاتجاهات للمستشفى
        </a>
      )}

      {/* Pending Actions */}

      {isPending && (
        <>

          <section className="decision-card">

            <h3>
              هل تريد التبرع؟
            </h3>

            <p>
              راجع بيانات طالب التبرع
              ومكان التبرع قبل اتخاذ القرار.
            </p>

            <div className="decision-buttons">

              <button
                className="accept-button"
                type="button"
                disabled={responding}
                onClick={() =>
                  handleResponse(
                    "accept"
                  )
                }
              >
                <CheckIcon />

                {responding
                  ? "جاري..."
                  : "قبول الطلب"}
              </button>

              <button
                className="reject-button"
                type="button"
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

        </>
      )}

      {/* Accepted */}

      {isAccepted && (
        <>

          <section className="success-card">

            <div className="success-icon">
              <CheckIcon />
            </div>

            <strong>
              تم قبول طلب التبرع
            </strong>

            <p>
              توجه إلى المستشفى المحددة
              لإتمام عملية التبرع.
            </p>

          </section>

          <button
            className="donate-button"
            type="button"
            onClick={() =>
              navigate(
                `/track/${request.id}`
              )
            }
          >
            متابعة التبرع
          </button>

        </>
      )}

      {/* Rejected */}

      {isRejected && (
        <section className="rejected-card">

          <div className="rejected-icon">
            <CloseIcon />
          </div>

          <strong>
            تم رفض طلب التبرع
          </strong>

          <p>
            تم تسجيل رفض طلب التبرع.
          </p>

        </section>
      )}

      {/* Response Error */}

      {error && (
        <div className="request-error">
          {error}
        </div>
      )}

      {/* Actions */}

      <section className="actions-card">

        <button
          className="action-button"
          type="button"
        >
          <ShareIcon />

          <span>
            مشاركة
          </span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <HeartIcon />

          <span>
            مفضلة
          </span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <ReportIcon />

          <span>
            إبلاغ
          </span>
        </button>

      </section>

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

        .donor-header {
          max-width: 520px;

          margin: 0 auto 20px;

          display: grid;

          grid-template-columns:
            44px 1fr 44px;

          align-items: center;
        }

        .donor-header h1 {
          margin: 0;

          text-align: center;

          color: #218d83;

          font-size: 23px;

          font-weight: 800;
        }

        .back-button,
        .more-button {
          width: 42px;
          height: 42px;

          border: 1px solid
            rgba(255,255,255,.9);

          border-radius: 14px;

          display: flex;

          align-items: center;
          justify-content: center;

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
          width: 22px;
          height: 22px;
        }

        .more-button {
          font-size: 25px;
        }

        .donor-card {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 28px 18px 25px;

          text-align: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(226,249,245,.78)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px
              rgba(42,128,128,.09),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter: blur(15px);

          -webkit-backdrop-filter:
            blur(15px);
        }

        .donor-avatar {
          width: 108px;
          height: 108px;

          margin: 0 auto 15px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          font-size: 42px;

          font-weight: 800;

          background:
            linear-gradient(
              145deg,
              #dff8f3,
              #bcece3
            );

          border: 6px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 8px 25px
              rgba(35,139,128,.13),
            inset 0 1px 8px
              rgba(255,255,255,.8);
        }

        .donor-card h2 {
          margin: 0 0 13px;

          color: #286d6d;

          font-size: 23px;
        }

        .donor-meta {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 10px;

          flex-wrap: wrap;
        }

        .blood-badge {
          padding: 8px 16px;

          border-radius: 18px;

          color: #c05267;

          background:
            #ffe7ed;

          font-size: 16px;

          font-weight: 800;
        }

        .registered {
          color: #6e9291;

          font-size: 13px;

          font-weight: 700;
        }

        .info-card {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 5px 16px;

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
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .info-row {
          min-height: 67px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;
        }

        .info-value {
          color: #4f7e7f;

          font-size: 14px;

          font-weight: 700;

          line-height: 1.7;
        }

        .hospital-value {
          display: flex;

          flex-direction: column;

          align-items: flex-start;

          gap: 2px;
        }

        .hospital-value small {
          color: #88a3a2;

          font-size: 10px;

          font-weight: 600;

          line-height: 1.6;
        }

        .info-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background:
            #dff7f2;
        }

        .info-icon svg {
          width: 21px;
          height: 21px;
        }

        .info-divider {
          height: 1px;

          background:
            rgba(124,184,177,.18);
        }

        .donate-button {
          width: 100%;
          max-width: 520px;

          min-height: 58px;

          margin: 0 auto 16px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 10px;

          border: 0;

          border-radius: 30px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 18px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 22px
              rgba(21,155,138,.16);

          text-decoration: none;
        }

        .donate-button svg {
          width: 23px;
          height: 23px;
        }

        .directions-button {
          margin-bottom: 16px;
        }

        .decision-card {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 20px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .decision-card h3 {
          margin: 0 0 7px;

          color: #286d6d;

          font-size: 17px;

          font-weight: 800;
        }

        .decision-card p {
          margin: 0 0 16px;

          color: #88a3a2;

          font-size: 11px;

          line-height: 1.8;
        }

        .decision-buttons {
          display: flex;

          gap: 9px;
        }

        .decision-buttons button {
          flex: 1;

          min-height: 50px;

          border: 0;

          border-radius: 25px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .decision-buttons button:active {
          transform: scale(.98);
        }

        .decision-buttons button:disabled {
          opacity: .6;

          cursor: not-allowed;
        }

        .decision-buttons svg {
          width: 19px;
          height: 19px;
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
            0 8px 18px
              rgba(21,155,138,.13);
        }

        .reject-button {
          color: #98505f;

          background:
            #ffe7ed;
        }

        .success-card {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 22px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .success-icon {
          width: 50px;
          height: 50px;

          margin: 0 auto 10px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background:
            #19ad98;
        }

        .success-icon svg {
          width: 25px;
          height: 25px;
        }

        .success-card strong {
          display: block;

          color: #286d6d;

          font-size: 15px;
        }

        .success-card p {
          margin: 7px 0 0;

          color: #88a3a2;

          font-size: 11px;

          line-height: 1.7;
        }

        .rejected-card {
          max-width: 520px;

          margin: 0 auto 16px;

          padding: 22px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(255,231,237,.75)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(128,42,60,.06);
        }

        .rejected-icon {
          width: 50px;
          height: 50px;

          margin: 0 auto 10px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #98505f;

          background:
            #ffe7ed;
        }

        .rejected-icon svg {
          width: 25px;
          height: 25px;
        }

        .rejected-card strong {
          display: block;

          color: #98505f;

          font-size: 15px;
        }

        .rejected-card p {
          margin: 7px 0 0;

          color: #9d8188;

          font-size: 11px;
        }

        .request-error {
          max-width: 520px;

          margin: -5px auto 16px;

          padding: 10px 14px;

          text-align: center;

          color: #98505f;

          background:
            #ffe7ed;

          border-radius: 14px;

          font-size: 12px;

          font-weight: 700;
        }

        .actions-card {
          max-width: 520px;

          margin: 0 auto 20px;

          padding: 8px;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 7px;

          border-radius: 22px;

          background:
            rgba(255,255,255,.78);

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 10px 26px
              rgba(42,128,128,.07);
        }

        .action-button {
          min-height: 62px;

          border: 0;

          border-radius: 17px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 5px;

          color: #6e9291;

          background:
            transparent;

          font-size: 10px;

          font-weight: 800;

          cursor: pointer;
        }

        .action-button svg {
          width: 21px;
          height: 21px;
        }

        .loading {
          min-height: 100vh;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #218d83;

          font-size: 16px;

          font-weight: 800;
        }

        .error-card {
          max-width: 520px;

          margin: 40px auto 0;

          padding: 25px 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(255,231,237,.75)
            );

          border: 1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .error-icon {
          width: 50px;
          height: 50px;

          margin: 0 auto 12px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #98505f;

          background:
            #ffe7ed;

          font-size: 22px;

          font-weight: 900;
        }

        .error-card strong {
          display: block;

          color: #98505f;

          font-size: 15px;
        }

        .error-card p {
          margin: 8px 0 0;

          color: #9d8188;

          font-size: 11px;

          line-height: 1.7;
        }

        .error-back-button {
          margin-top: 16px;

          min-height: 48px;

          font-size: 14px;
        }

        @media (max-width: 380px) {

          .donation-request-page {
            padding-left: 13px;
            padding-right: 13px;
          }

          .donor-card h2 {
            font-size: 20px;
          }

          .info-value {
            font-size: 12px;
          }

          .decision-buttons {
            gap: 7px;
          }

          .decision-buttons button {
            font-size: 11px;
          }

        }

      `}</style>
    </div>
  );
}

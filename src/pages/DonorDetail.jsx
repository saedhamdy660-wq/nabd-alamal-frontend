import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

function getRequesterInitial(name) {
  if (!name) return "م";
  return name.trim().charAt(0);
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

function getRequestStatus(request) {
  const status = String(
    request?.status ||
      request?.requestStatus ||
      ""
  )
    .trim()
    .toLowerCase();

  if (
    status === "accepted" ||
    status === "accepted_donation" ||
    status === "مقبول" ||
    status === "تم القبول"
  ) {
    return "accepted";
  }

  if (
    status === "rejected" ||
    status === "مرفوض" ||
    status === "تم الرفض"
  ) {
    return "rejected";
  }

  if (
    status === "completed" ||
    status === "مكتمل" ||
    status === "تم التبرع"
  ) {
    return "completed";
  }

  return "pending";
}

export default function DonationRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [responding, setResponding] =
    useState(false);

  const [error, setError] = useState("");

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

  useEffect(() => {
    let cancelled = false;

    async function loadRequest() {
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

        if (cancelled) return;

        setRequest(data);
      } catch (err) {
        console.error(
          "خطأ أثناء تحميل طلب التبرع:",
          err
        );

        if (!cancelled) {
          setRequest(null);
          setError(
            err?.message ||
              "تعذر تحميل تفاصيل طلب التبرع"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRequest();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="donor-page">
        <div className="loading">
          جارِ التحميل...
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="donor-page">
        <header className="donor-header">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            ←
          </button>

          <h1>طلب التبرع</h1>

          <button
            className="more-button"
            type="button"
          >
            ⋮
          </button>
        </header>

        <div className="request-error">
          {error ||
            "طلب التبرع غير موجود"}
        </div>

        <button
          className="donate-button"
          onClick={() => navigate(-1)}
        >
          العودة
        </button>

        <style>{`
          * {
            box-sizing: border-box;
          }

          .donor-page {
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

            font-family: Arial, Tahoma, sans-serif;
          }

          .donor-header {
            max-width: 520px;
            margin: 0 auto 20px;

            display: grid;
            grid-template-columns: 44px 1fr 44px;
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
            border: 1px solid rgba(255,255,255,.9);
            border-radius: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #218d83;
            background: rgba(255,255,255,.72);

            box-shadow:
              0 7px 18px rgba(35,139,128,.08),
              inset 0 1px 0 rgba(255,255,255,.9);

            cursor: pointer;
          }

          .back-button {
            font-size: 25px;
          }

          .more-button {
            font-size: 25px;
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
              0 10px 22px rgba(21,155,138,.16);
          }

          .request-error {
            max-width: 520px;
            margin: 0 auto 16px;

            padding: 10px 14px;

            text-align: center;

            color: #98505f;

            background: #ffe7ed;

            border-radius: 14px;

            font-size: 12px;
            font-weight: 700;
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
        `}</style>
      </div>
    );
  }

  const requester =
    request.requester ||
    request.requesterUser ||
    request.user ||
    {};

  const requesterName =
    request.requesterName ||
    request.userName ||
    requester.name ||
    "مستخدم";

  const requesterAvatar =
    request.requesterAvatar ||
    requester.avatar ||
    "";

  const bloodType =
    request.bloodType ||
    request.requiredBloodType ||
    request.bloodGroup ||
    "غير محددة";

  const hospitalName =
    request.hospitalName ||
    request.hospital ||
    request.locationName ||
    "المستشفى المحدد";

  const hospitalAddress =
    request.address ||
    request.hospitalAddress ||
    "";

  const hospitalLat =
    request.lat ??
    request.hospitalLat ??
    request.location?.lat;

  const hospitalLng =
    request.lng ??
    request.hospitalLng ??
    request.location?.lng;

  const status =
    getRequestStatus(request);

  const isAccepted =
    status === "accepted";

  const isRejected =
    status === "rejected";

  const isCompleted =
    status === "completed";

  const isPending =
    status === "pending";

  /*
    الطلب الوارد للمتبرع:
    نسمح له بالتعامل مع الطلب
    فقط لو الطلب موجه لحسابه.
  */
  const isTargetDonor =
    !request.donorUserId ||
    !currentUser?.id ||
    request.donorUserId ===
      currentUser.id ||
    request.donorId ===
      currentUser.id ||
    request.donor?.userId ===
      currentUser.id;

  const directionsUrl =
    Number.isFinite(Number(hospitalLat)) &&
    Number.isFinite(Number(hospitalLng))
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          Number(hospitalLat)
        )},${encodeURIComponent(
          Number(hospitalLng)
        )}`
      : "";

  const handleResponse = async (
    action
  ) => {
    if (!currentUser?.id) {
      setError(
        "من فضلك سجل الدخول أولاً"
      );
      return;
    }

    if (!isTargetDonor) {
      setError(
        "هذا الطلب غير موجه لحسابك"
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
        setRequest((previous) => ({
          ...previous,
          ...updated,
          status:
            updated.status ||
            (action === "accept"
              ? "accepted"
              : "rejected"),
        }));
      } else {
        setRequest((previous) => ({
          ...previous,
          status:
            action === "accept"
              ? "accepted"
              : "rejected",
        }));
      }
    } catch (err) {
      console.error(
        "خطأ أثناء الرد على طلب التبرع:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء تنفيذ الطلب"
      );
    } finally {
      setResponding(false);
    }
  };

  const handleShare = async () => {
    try {
      if (
        navigator.share
      ) {
        await navigator.share({
          title:
            "طلب تبرع بالدم",
          text: `طلب تبرع بالدم - ${bloodType}`,
          url:
            window.location.href,
        });
      } else if (
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    } catch {
      // المستخدم ألغى المشاركة
    }
  };

  return (
    <div className="donor-page">

      {/* Header */}
      <header className="donor-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >
          ←
        </button>

        <h1>طلب التبرع</h1>

        <button
          className="more-button"
          type="button"
        >
          ⋮
        </button>
      </header>

      {/* Requester Card */}
      <section className="donor-card">

        <div
          className="donor-avatar"
          style={{
            backgroundImage:
              requesterAvatar
                ? `url(${requesterAvatar})`
                : "none",
          }}
        >
          {!requesterAvatar &&
            getRequesterInitial(
              requesterName
            )}
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

      {/* Information */}
      <section className="info-card">

        <div className="info-row">

          <div className="info-value">
            فصيلة الدم المطلوبة -{" "}
            {bloodType}
          </div>

          <div className="info-icon">
            <HeartIcon />
          </div>

        </div>

        <div className="info-divider" />

        <div className="info-row">

          <div className="info-value">
            طالب التبرع -{" "}
            {requesterName}
          </div>

          <div className="info-icon">
            <HeartIcon />
          </div>

        </div>

        <div className="info-divider" />

        <div className="info-row">

          <div className="info-value">
            مكان التبرع -{" "}
            {hospitalName}

            {hospitalAddress && (
              <div className="small-address">
                {hospitalAddress}
              </div>
            )}
          </div>

          <div className="info-icon">
            <HospitalIcon />
          </div>

        </div>

        <div className="info-divider" />

        <div className="info-row">

          <div className="info-value">
            {request.createdAt ||
            request.date
              ? new Date(
                  request.createdAt ||
                    request.date
                ).toLocaleDateString(
                  "ar-EG"
                )
              : "تاريخ الطلب غير متاح"}
          </div>

          <div className="info-icon">
            <CalendarIcon />
          </div>

        </div>

      </section>

      {/* Directions */}
      {directionsUrl && (
        <a
          className="donate-button"
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          فتح الاتجاهات للمستشفى
          <LocationIcon />
        </a>
      )}

      {/* Error */}
      {error && (
        <div className="request-error">
          {error}
        </div>
      )}

      {/* Pending Request */}
      {isPending &&
        !isCompleted && (
          <>
            {isTargetDonor ? (
              <div className="request-actions">

                <button
                  className="donate-button"
                  onClick={() =>
                    handleResponse(
                      "accept"
                    )
                  }
                  disabled={responding}
                >
                  {responding
                    ? "جاري التنفيذ..."
                    : "قبول طلب التبرع"}

                  <HeartIcon />
                </button>

                <button
                  className="reject-button"
                  onClick={() =>
                    handleResponse(
                      "reject"
                    )
                  }
                  disabled={responding}
                >
                  {responding
                    ? "جاري..."
                    : "رفض الطلب"}
                </button>

              </div>
            ) : (
              <div className="success-card">
                <div className="success-icon">
                  !
                </div>

                <strong>
                  في انتظار رد المتبرع
                </strong>

                <p>
                  سيتم إشعارك عند قبول
                  أو رفض طلب التبرع.
                </p>
              </div>
            )}
          </>
        )}

      {/* Accepted */}
      {isAccepted && (
        <>
          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <strong>
              تم قبول طلب التبرع
            </strong>

            <p>
              تم قبول الطلب من المتبرع.
              يمكنك الآن متابعة خطوات
              التبرع من صفحة المتابعة.
            </p>

          </div>

          <button
            className="donate-button"
            onClick={() =>
              navigate(
                `/track/${request.id}`
              )
            }
          >
            متابعة التبرع
            <LocationIcon />
          </button>
        </>
      )}

      {/* Completed */}
      {isCompleted && (
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <strong>
            تم إكمال التبرع بنجاح
          </strong>

          <p>
            تم الانتهاء من عملية
            التبرع بالدم.
          </p>

        </div>
      )}

      {/* Rejected */}
      {isRejected && (
        <div className="success-card rejected-card">

          <div className="rejected-icon">
            ×
          </div>

          <strong>
            تم رفض طلب التبرع
          </strong>

          <p>
            لم يتم قبول طلب التبرع
            من المتبرع.
          </p>

        </div>
      )}

      {/* Actions */}
      <section className="actions-card">

        <button
          className="action-button"
          onClick={handleShare}
        >
          <ShareIcon />
          <span>مشاركة</span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <HeartIcon />
          <span>مفضلة</span>
        </button>

        <button
          className="action-button"
          type="button"
        >
          <ReportIcon />
          <span>إبلاغ</span>
        </button>

      </section>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .donor-page {
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

          font-family: Arial, Tahoma, sans-serif;
        }

        .donor-header {
          max-width: 520px;
          margin: 0 auto 20px;

          display: grid;
          grid-template-columns: 44px 1fr 44px;
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
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #218d83;
          background: rgba(255,255,255,.72);

          box-shadow:
            0 7px 18px rgba(35,139,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          cursor: pointer;
        }

        .back-button {
          font-size: 25px;
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

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px rgba(42,128,128,.09),
            inset 0 1px 0 rgba(255,255,255,.95);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
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

          border: 6px solid rgba(255,255,255,.9);

          box-shadow:
            0 8px 25px rgba(35,139,128,.13),
            inset 0 1px 8px rgba(255,255,255,.8);

          background-size: cover;
          background-position: center;
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
          background: #ffe7ed;

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

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08),
            inset 0 1px 0 rgba(255,255,255,.9);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
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
        }

        .small-address {
          margin-top: 4px;
          color: #88a3a2;
          font-size: 11px;
          font-weight: 600;
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
          background: #dff7f2;
        }

        .info-icon svg {
          width: 21px;
          height: 21px;
        }

        .info-divider {
          height: 1px;
          background: rgba(124,184,177,.18);
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
            0 10px 22px rgba(21,155,138,.16);
        }

        .donate-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .donate-button svg {
          width: 23px;
          height: 23px;
        }

        .request-error {
          max-width: 520px;
          margin: -7px auto 16px;

          padding: 10px 14px;

          text-align: center;

          color: #98505f;

          background: #ffe7ed;

          border-radius: 14px;

          font-size: 12px;
          font-weight: 700;
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

          border: 1px solid rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px rgba(42,128,128,.08);
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
          background: #19ad98;

          font-size: 24px;
          font-weight: 900;
        }

        .success-card strong {
          display: block;

          color: #286d6d;

          font-size: 14px;
        }

        .success-card p {
          margin: 7px 0 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .request-actions {
          max-width: 520px;
          margin: 0 auto 16px;

          display: flex;
          gap: 10px;
        }

        .request-actions .donate-button {
          margin: 0;
          flex: 1;
        }

        .reject-button {
          flex: 1;
          min-height: 58px;

          border: 0;
          border-radius: 30px;

          color: #98505f;
          background: #ffe7ed;

          font-size: 16px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 8px 18px rgba(152,80,95,.06);
        }

        .reject-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .rejected-card {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(255,239,243,.8)
            );
        }

        .rejected-icon {
          width: 50px;
          height: 50px;

          margin: 0 auto 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;
          background: #c05267;

          font-size: 27px;
          font-weight: 900;
        }

        .actions-card {
          max-width: 520px;
          margin: 0 auto 20px;

          padding: 8px;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;

          border-radius: 22px;

          background:
            rgba(255,255,255,.78);

          border: 1px solid rgba(255,255,255,.92);

          box-shadow:
            0 10px 26px rgba(42,128,128,.07);
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
          background: transparent;

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

        @media (max-width: 380px) {

          .donor-page {
            padding-left: 13px;
            padding-right: 13px;
          }

          .donor-card h2 {
            font-size: 20px;
          }

          .info-value {
            font-size: 12px;
          }

          .request-actions {
            gap: 7px;
          }

          .reject-button {
            font-size: 14px;
          }
        }

      `}</style>
    </div>
  );
}

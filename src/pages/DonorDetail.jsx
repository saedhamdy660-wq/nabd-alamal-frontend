import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

function getDonorInitial(name) {
  if (!name) return "م";
  return name.trim().charAt(0);
}

function getLastDonationText(date) {
  if (!date) return "آخر تبرع غير مسجل";

  const donationDate = new Date(date);

  if (Number.isNaN(donationDate.getTime())) {
    return "آخر تبرع غير مسجل";
  }

  const today = new Date();

  const diffMs =
    today.getTime() -
    donationDate.getTime();

  const diffDays = Math.max(
    0,
    Math.floor(
      diffMs /
        (1000 * 60 * 60 * 24)
    )
  );

  if (diffDays === 0) {
    return "آخر تبرع اليوم";
  }

  if (diffDays === 1) {
    return "آخر تبرع منذ يوم";
  }

  if (diffDays < 30) {
    return `آخر تبرع منذ ${diffDays} يوم`;
  }

  const months = Math.floor(
    diffDays / 30
  );

  if (months === 1) {
    return "آخر تبرع منذ شهر";
  }

  if (months < 12) {
    return `آخر تبرع منذ ${months} أشهر`;
  }

  const years = Math.floor(
    months / 12
  );

  if (years === 1) {
    return "آخر تبرع منذ سنة";
  }

  return `آخر تبرع منذ ${years} سنوات`;
}

function BloodIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 3.5S6.5 9.8 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 9.8 12 3.5 12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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

export default function DonorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState(null);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [hospitals, setHospitals] =
    useState([]);

  const [selectedHospitalId, setSelectedHospitalId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [loadingHospitals, setLoadingHospitals] =
    useState(false);

  const [sendingRequest, setSendingRequest] =
    useState(false);

  const [showHospitalModal, setShowHospitalModal] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem("nabd_user");

    if (!savedUser) {
      setCurrentUser(null);
      return;
    }

    try {
      setCurrentUser(
        JSON.parse(savedUser)
      );
    } catch {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadDonor() {
      if (!id) {
        setError(
          "رقم المتبرع غير موجود"
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
          مهم:
          هنا بنجيب المتبرع نفسه
          وليس طلب تبرع.
        */
        const data =
          await api.getDonor(id);

        if (cancelled) {
          return;
        }

        setDonor(data);
      } catch (err) {
        console.error(
          "خطأ أثناء تحميل بيانات المتبرع:",
          err
        );

        if (!cancelled) {
          setDonor(null);

          setError(
            err?.message ||
              "تعذر تحميل بيانات المتبرع"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDonor();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
    تحميل المستشفيات عند فتح نافذة
    اختيار المستشفى فقط.
  */
  const openHospitalModal =
    async () => {
      setError("");
      setSuccess("");

      if (!currentUser?.id) {
        setError(
          "من فضلك سجل الدخول أولاً"
        );
        return;
      }

      if (!donor?.id) {
        setError(
          "بيانات المتبرع غير متاحة"
        );
        return;
      }

      if (
        donor.userId &&
        donor.userId ===
          currentUser.id
      ) {
        setError(
          "لا يمكنك إرسال طلب تبرع لنفسك"
        );
        return;
      }

      if (
        donor.available === false
      ) {
        setError(
          "هذا المتبرع مرتبط حاليًا بطلب تبرع آخر"
        );
        return;
      }

      try {
        setLoadingHospitals(true);

        const data =
          await api.getHospitals();

        if (Array.isArray(data)) {
          setHospitals(data);
        } else if (
          Array.isArray(data?.hospitals)
        ) {
          setHospitals(
            data.hospitals
          );
        } else {
          setHospitals([]);
        }

        setShowHospitalModal(true);
      } catch (err) {
        console.error(
          "خطأ أثناء تحميل المستشفيات:",
          err
        );

        setError(
          err?.message ||
            "تعذر تحميل المستشفيات"
        );
      } finally {
        setLoadingHospitals(false);
      }
    };

  /*
    إرسال طلب التبرع المباشر.
  */
  const handleCreateDonationRequest =
    async () => {
      if (!currentUser?.id) {
        setError(
          "من فضلك سجل الدخول أولاً"
        );
        return;
      }

      if (!donor?.id) {
        setError(
          "بيانات المتبرع غير متاحة"
        );
        return;
      }

      if (!selectedHospitalId) {
        setError(
          "من فضلك اختر المستشفى أولاً"
        );
        return;
      }

      if (
        donor.available === false
      ) {
        setError(
          "هذا المتبرع مرتبط حاليًا بطلب تبرع آخر"
        );
        return;
      }

      try {
        setSendingRequest(true);
        setError("");
        setSuccess("");

        const result =
          await api.createDonationRequest(
            currentUser.id,
            donor.id,
            selectedHospitalId
          );

        setShowHospitalModal(false);

        setSelectedHospitalId("");

        setSuccess(
          "تم إرسال طلب التبرع للمتبرع بنجاح، وسيصله إشعار بالطلب."
        );

        /*
          تحديث حالة المتبرع محليًا
          بعد إرسال الطلب.
        */
        setDonor((previous) => ({
          ...previous,
          available: false,
        }));

        /*
          لو الـ backend رجع الطلب
          نقدر ننتقل بعد الإرسال
          لصفحة متابعة الطلب.
        */
        if (result?.request?.id) {
          setTimeout(() => {
            navigate(
              `/track/${result.request.id}`
            );
          }, 1200);
        }
      } catch (err) {
        console.error(
          "خطأ أثناء إرسال طلب التبرع:",
          err
        );

        setError(
          err?.message ||
            "حدث خطأ أثناء إرسال طلب التبرع"
        );
      } finally {
        setSendingRequest(false);
      }
    };

  const handleShare =
    async () => {
      try {
        const donorName =
          donor?.name ||
          "متبرع بالدم";

        const bloodType =
          donor?.bloodType ||
          "غير محددة";

        if (
          navigator.share
        ) {
          await navigator.share({
            title:
              "متبرع بالدم",

            text:
              `${donorName} - فصيلة الدم ${bloodType}`,

            url:
              window.location.href,
          });

          return;
        }

        if (
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

  if (loading) {
    return (
      <div className="donor-page">
        <div className="loading">
          جارِ التحميل...
        </div>

        <style>{`
          * {
            box-sizing: border-box;
          }

          .donor-page {
            min-height: 100vh;
            direction: rtl;

            display: flex;
            align-items: center;
            justify-content: center;

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

          .loading {
            color: #218d83;
            font-size: 16px;
            font-weight: 800;
          }
        `}</style>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="donor-page">
        <header className="donor-header">
          <button
            className="back-button"
            onClick={() =>
              navigate(-1)
            }
            aria-label="رجوع"
          >
            ←
          </button>

          <h1>
            تفاصيل المتبرع
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
            المتبرع غير موجود
          </strong>

          <p>
            {error ||
              "تعذر العثور على بيانات هذا المتبرع"}
          </p>
        </div>

        <button
          className="back-large-button"
          onClick={() =>
            navigate(-1)
          }
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

            font-family:
              Arial,
              Tahoma,
              sans-serif;
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

          .error-card {
            max-width: 520px;
            margin: 30px auto 16px;
            padding: 25px 20px;

            text-align: center;

            border-radius: 25px;

            background:
              linear-gradient(
                145deg,
                rgba(255,255,255,.9),
                rgba(255,239,243,.82)
              );

            border: 1px solid rgba(255,255,255,.95);

            box-shadow:
              0 12px 30px rgba(42,128,128,.08);
          }

          .error-icon {
            width: 52px;
            height: 52px;

            margin: 0 auto 12px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            color: white;
            background: #c05267;

            font-size: 25px;
            font-weight: 900;
          }

          .error-card strong {
            display: block;
            color: #286d6d;
            font-size: 16px;
          }

          .error-card p {
            margin: 8px 0 0;
            color: #88a3a2;
            font-size: 12px;
            line-height: 1.7;
          }

          .back-large-button {
            width: 100%;
            max-width: 520px;
            min-height: 56px;

            margin: 0 auto;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 0;
            border-radius: 30px;

            color: white;

            background:
              linear-gradient(
                135deg,
                #19ad98,
                #159b8a
              );

            font-size: 17px;
            font-weight: 800;

            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  const donorName =
    donor.name ||
    "متبرع بالدم";

  const bloodType =
    donor.bloodType ||
    donor.bloodGroup ||
    "غير محددة";

  const avatar =
    donor.avatar ||
    donor.image ||
    donor.photo ||
    "";

  const available =
    donor.available !== false;

  const distance =
    donor.distanceKm;

  const donationsCount =
    Number(
      donor.donationsCount || 0
    );

  return (
    <div className="donor-page">

      {/* Header */}
      <header className="donor-header">

        <button
          className="back-button"
          onClick={() =>
            navigate(-1)
          }
          aria-label="رجوع"
        >
          ←
        </button>

        <h1>
          تفاصيل المتبرع
        </h1>

        <button
          className="more-button"
          type="button"
        >
          ⋮
        </button>

      </header>

      {/* Donor Card */}
      <section className="donor-card">

        <div
          className="donor-avatar"
          style={{
            backgroundImage:
              avatar
                ? `url(${avatar})`
                : "none",
          }}
        >
          {!avatar &&
            getDonorInitial(
              donorName
            )}
        </div>

        <h2>
          {donorName}
        </h2>

        <div className="donor-meta">

          <span className="blood-badge">
            🩸 {bloodType}
          </span>

          <span
            className={
              available
                ? "availability available"
                : "availability unavailable"
            }
          >
            <span className="status-dot" />

            {available
              ? "متاح للتبرع"
              : "غير متاح حاليًا"}
          </span>

        </div>

      </section>

      {/* Information */}
      <section className="info-card">

        <div className="info-row">

          <div className="info-value">
            <strong>
              فصيلة الدم
            </strong>

            <span>
              {bloodType}
            </span>
          </div>

          <div className="info-icon">
            <BloodIcon />
          </div>

        </div>

        <div className="info-divider" />

        <div className="info-row">

          <div className="info-value">
            <strong>
              آخر تبرع
            </strong>

            <span>
              {getLastDonationText(
                donor.lastDonation
              )}
            </span>
          </div>

          <div className="info-icon">
            <CalendarIcon />
          </div>

        </div>

        <div className="info-divider" />

        <div className="info-row">

          <div className="info-value">
            <strong>
              عدد مرات التبرع
            </strong>

            <span>
              {donationsCount}{" "}
              {donationsCount === 1
                ? "مرة"
                : "مرات"}
            </span>
          </div>

          <div className="info-icon">
            <HeartIcon />
          </div>

        </div>

        {distance !== undefined &&
          distance !== null &&
          Number.isFinite(
            Number(distance)
          ) && (
            <>
              <div className="info-divider" />

              <div className="info-row">

                <div className="info-value">
                  <strong>
                    المسافة
                  </strong>

                  <span>
                    على بعد{" "}
                    {distance} كم
                  </span>
                </div>

                <div className="info-icon">
                  <LocationIcon />
                </div>

              </div>
            </>
          )}

      </section>

      {/* Error */}
      {error && (
        <div className="request-error">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <strong>
            تم إرسال طلب التبرع
          </strong>

          <p>
            {success}
          </p>

        </div>
      )}

      {/* Main Donation Button */}
      {available && (
        <button
          className="donate-button"
          onClick={
            openHospitalModal
          }
          disabled={
            loadingHospitals
          }
        >
          {loadingHospitals
            ? "جاري تحميل المستشفيات..."
            : "طلب التبرع"}

          <HeartIcon />
        </button>
      )}

      {!available && (
        <div className="unavailable-card">

          <div className="unavailable-icon">
            !
          </div>

          <strong>
            المتبرع غير متاح حاليًا
          </strong>

          <p>
            لا يمكن إرسال طلب تبرع
            جديد لهذا المتبرع حاليًا.
          </p>

        </div>
      )}

      {/* Actions */}
      <section className="actions-card">

        <button
          className="action-button"
          onClick={
            handleShare
          }
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

      {/* Hospital Modal */}
      {showHospitalModal && (
        <div className="modal-overlay">

          <div className="hospital-modal">

            <div className="modal-header">

              <div>
                <h2>
                  اختر المستشفى
                </h2>

                <p>
                  اختر المستشفى التي تريد
                  إجراء التبرع بها
                </p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowHospitalModal(
                    false
                  )
                }
                type="button"
              >
                <CloseIcon />
              </button>

            </div>

            <div className="hospital-list">

              {hospitals.length === 0 && (
                <div className="no-hospitals">
                  لا توجد مستشفيات متاحة حاليًا.
                </div>
              )}

              {hospitals.map(
                (hospital) => {
                  const hospitalId =
                    hospital.id;

                  const hospitalName =
                    hospital.name ||
                    hospital.hospitalName ||
                    "مستشفى";

                  const hospitalAddress =
                    hospital.address ||
                    hospital.location ||
                    "";

                  const selected =
                    String(
                      selectedHospitalId
                    ) ===
                    String(
                      hospitalId
                    );

                  return (
                    <button
                      key={
                        hospitalId
                      }
                      type="button"
                      className={
                        selected
                          ? "hospital-item selected"
                          : "hospital-item"
                      }
                      onClick={() =>
                        setSelectedHospitalId(
                          hospitalId
                        )
                      }
                    >

                      <div className="hospital-icon">
                        <HospitalIcon />
                      </div>

                      <div className="hospital-info">

                        <strong>
                          {hospitalName}
                        </strong>

                        {hospitalAddress && (
                          <span>
                            {hospitalAddress}
                          </span>
                        )}

                      </div>

                      <div className="hospital-check">
                        {selected
                          ? "✓"
                          : ""}
                      </div>

                    </button>
                  );
                }
              )}

            </div>

            <button
              className="confirm-button"
              type="button"
              disabled={
                !selectedHospitalId ||
                sendingRequest
              }
              onClick={
                handleCreateDonationRequest
              }
            >
              {sendingRequest
                ? "جاري إرسال الطلب..."
                : "إرسال طلب التبرع"}

            </button>

          </div>

        </div>
      )}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .donor-page {
          min-height: 100vh;

          padding:
            22px
            18px
            35px;

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

          margin:
            0
            auto
            20px;

          display: grid;

          grid-template-columns:
            44px
            1fr
            44px;

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

          border:
            1px solid
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

        .back-button {
          font-size: 25px;
        }

        .more-button {
          font-size: 25px;
        }

        .donor-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding:
            28px
            18px
            25px;

          text-align: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(226,249,245,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 32px
              rgba(42,128,128,.09),
            inset 0 1px 0
              rgba(255,255,255,.95);

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);
        }

        .donor-avatar {
          width: 108px;
          height: 108px;

          margin:
            0
            auto
            15px;

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

          border:
            6px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 8px 25px
              rgba(35,139,128,.13),
            inset 0 1px 8px
              rgba(255,255,255,.8);

          background-size: cover;

          background-position: center;
        }

        .donor-card h2 {
          margin:
            0
            0
            13px;

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
          padding:
            8px
            16px;

          border-radius: 18px;

          color: #c05267;

          background: #ffe7ed;

          font-size: 16px;

          font-weight: 800;
        }

        .availability {
          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding:
            8px
            13px;

          border-radius: 18px;

          font-size: 12px;

          font-weight: 800;
        }

        .availability.available {
          color: #159b8a;

          background: #e1f8f3;
        }

        .availability.unavailable {
          color: #a75b69;

          background: #ffe7ed;
        }

        .status-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: currentColor;
        }

        .info-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding:
            5px
            16px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.88),
              rgba(232,249,246,.78)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          backdrop-filter:
            blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        .info-row {
          min-height: 67px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 15px;
        }

        .info-value {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 4px;

          color: #4f7e7f;

          font-size: 14px;

          font-weight: 700;
        }

        .info-value strong {
          color: #286d6d;

          font-size: 13px;

          font-weight: 800;
        }

        .info-value span {
          color: #88a3a2;

          font-size: 12px;

          font-weight: 700;
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

          background:
            rgba(
              124,
              184,
              177,
              .18
            );
        }

        .request-error {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding:
            10px
            14px;

          text-align: center;

          color: #98505f;

          background: #ffe7ed;

          border-radius: 14px;

          font-size: 12px;

          font-weight: 700;
        }

        .success-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding: 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .success-icon {
          width: 50px;
          height: 50px;

          margin:
            0
            auto
            10px;

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
          margin:
            7px
            0
            0;

          color: #88a3a2;

          font-size: 11px;

          line-height: 1.7;
        }

        .donate-button {
          width: 100%;

          max-width: 520px;

          min-height: 58px;

          margin:
            0
            auto
            16px;

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
        }

        .donate-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .donate-button svg {
          width: 23px;
          height: 23px;
        }

        .unavailable-card {
          max-width: 520px;

          margin:
            0
            auto
            16px;

          padding: 20px;

          text-align: center;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(255,239,243,.8)
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 12px 30px
              rgba(42,128,128,.08);
        }

        .unavailable-icon {
          width: 50px;
          height: 50px;

          margin:
            0
            auto
            10px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background: #c05267;

          font-size: 25px;

          font-weight: 900;
        }

        .unavailable-card strong {
          display: block;

          color: #286d6d;

          font-size: 14px;
        }

        .unavailable-card p {
          margin:
            7px
            0
            0;

          color: #88a3a2;

          font-size: 11px;
        }

        .actions-card {
          max-width: 520px;

          margin:
            0
            auto
            20px;

          padding: 8px;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 7px;

          border-radius: 22px;

          background:
            rgba(255,255,255,.78);

          border:
            1px solid
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

          background: transparent;

          font-size: 10px;

          font-weight: 800;

          cursor: pointer;
        }

        .action-button svg {
          width: 21px;
          height: 21px;
        }

        /* =========================
           Hospital Modal
        ========================= */

        .modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 100;

          padding:
            20px;

          display: flex;

          align-items: flex-end;
          justify-content: center;

          background:
            rgba(
              24,
              65,
              62,
              .28
            );

          backdrop-filter:
            blur(5px);

          -webkit-backdrop-filter:
            blur(5px);
        }

        .hospital-modal {
          width: 100%;

          max-width: 520px;

          max-height: 85vh;

          padding:
            20px
            16px
            16px;

          overflow-y: auto;

          direction: rtl;

          border-radius:
            28px
            28px
            20px
            20px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #effaf8
            );

          box-shadow:
            0 -10px 40px
              rgba(25,90,84,.16);
        }

        .modal-header {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;

          margin-bottom: 16px;
        }

        .modal-header h2 {
          margin: 0 0 5px;

          color: #286d6d;

          font-size: 19px;

          font-weight: 900;
        }

        .modal-header p {
          margin: 0;

          color: #88a3a2;

          font-size: 11px;

          line-height: 1.6;
        }

        .close-button {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          border: 0;

          border-radius: 13px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #6e9291;

          background: #e8f6f3;

          cursor: pointer;
        }

        .close-button svg {
          width: 20px;
          height: 20px;
        }

        .hospital-list {
          display: flex;

          flex-direction: column;

          gap: 9px;
        }

        .hospital-item {
          width: 100%;

          min-height: 70px;

          padding:
            9px
            10px;

          display: flex;

          align-items: center;

          gap: 10px;

          border:
            1px solid
            rgba(
              124,
              184,
              177,
              .18
            );

          border-radius: 18px;

          color: #286d6d;

          background:
            rgba(
              255,
              255,
              255,
              .75
            );

          text-align: right;

          cursor: pointer;

          transition:
            .18s ease;
        }

        .hospital-item.selected {
          border-color:
            rgba(
              21,
              155,
              138,
              .4
            );

          background:
            #e3f8f4;

          box-shadow:
            0 6px 16px
              rgba(
                21,
                155,
                138,
                .08
              );
        }

        .hospital-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #159b8a;

          background: #dff7f2;
        }

        .hospital-icon svg {
          width: 22px;
          height: 22px;
        }

        .hospital-info {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 4px;
        }

        .hospital-info strong {
          color: #286d6d;

          font-size: 13px;

          font-weight: 900;
        }

        .hospital-info span {
          color: #88a3a2;

          font-size: 10px;

          line-height: 1.5;
        }

        .hospital-check {
          width: 28px;
          height: 28px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background:
            #19ad98;

          font-size: 16px;

          font-weight: 900;
        }

        .hospital-item:not(.selected)
          .hospital-check {
          color: transparent;

          background:
            #edf5f4;

          border:
            1px solid
            #dcebea;
        }

        .no-hospitals {
          padding: 25px 15px;

          text-align: center;

          color: #88a3a2;

          font-size: 12px;
        }

        .confirm-button {
          width: 100%;

          min-height: 56px;

          margin-top: 15px;

          border: 0;

          border-radius: 28px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19ad98,
              #159b8a
            );

          font-size: 16px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 9px 20px
              rgba(
                21,
                155,
                138,
                .15
              );
        }

        .confirm-button:disabled {
          opacity: .5;

          cursor: not-allowed;
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

          .info-value strong {
            font-size: 12px;
          }

          .info-value span {
            font-size: 11px;
          }

          .hospital-modal {
            padding-left: 12px;
            padding-right: 12px;
          }

        }

      `}</style>
    </div>
  );
}

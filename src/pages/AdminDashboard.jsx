import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "../api.js";

/* =========================
   Constants
========================= */

const PRIMARY = "#0aa88f";
const PRIMARY_DARK = "#078876";
const PRIMARY_LIGHT = "#e6f7f4";
const TEXT_DARK = "#17332e";
const TEXT_MUTED = "#6b7c79";
const BORDER = "#e5efed";
const BG = "#f7fffd";

const TYPE_LABELS = {
  hospital: "مستشفى",
  pharmacy: "صيدلية",
  blood_center: "مركز دم",
};

const STATUS_LABELS = {
  pending: "قيد المراجعة",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
};

const STATUS_COLORS = {
  pending: {
    background: "#fff8e6",
    color: "#9a6b00",
  },
  approved: {
    background: "#e8f8ef",
    color: "#18864b",
  },
  rejected: {
    background: "#fff0f0",
    color: "#c53b3b",
  },
};

/* =========================
   Helpers
========================= */

const getTypeLabel = (type) => {
  return TYPE_LABELS[type] || type || "غير محدد";
};

const getStatusLabel = (status) => {
  return STATUS_LABELS[status] || status || "غير محدد";
};

const getStatusStyle = (status) => {
  return (
    STATUS_COLORS[status] || {
      background: "#f1f4f3",
      color: TEXT_MUTED,
    }
  );
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "غير متوفر";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* =========================
   Icons
========================= */

const Icon = ({ children, size = 22 }) => (
  <span
    style={{
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </span>
);

const HospitalIcon = () => (
  <Icon>
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 21V5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 8H16M8 12H16M8 16H11M13 16H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 8V12M13 8V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const PharmacyIcon = () => (
  <Icon>
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8V16M8 12H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const BloodCenterIcon = () => (
  <Icon>
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3C12 3 6 10 6 14.5C6 18.09 8.69 21 12 21C15.31 21 18 18.09 18 14.5C18 10 12 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 15.5C9.35 17.05 10.32 18 12 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const getTypeIcon = (type) => {
  if (type === "hospital") {
    return <HospitalIcon />;
  }

  if (type === "pharmacy") {
    return <PharmacyIcon />;
  }

  return <BloodCenterIcon />;
};

/* =========================
   Stat Card
========================= */

const StatCard = ({
  title,
  value,
  icon,
  iconBackground,
  iconColor,
}) => (
  <div
    style={{
      background: "#ffffff",
      border: `1px solid ${BORDER}`,
      borderRadius: 20,
      padding: 20,
      display: "flex",
      alignItems: "center",
      gap: 16,
      boxShadow: "0 6px 20px rgba(23, 51, 46, 0.05)",
      minHeight: 105,
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        background: iconBackground,
        color: iconColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>

    <div>
      <div
        style={{
          color: TEXT_MUTED,
          fontSize: 13,
          marginBottom: 7,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: TEXT_DARK,
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

/* =========================
   Admin Dashboard
========================= */

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [typeFilter, setTypeFilter] = useState("all");

  const [rejectingId, setRejectingId] = useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  /* =========================
     Load Requests
  ========================= */

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await api.getMedicalJoinRequests();

      const loaded = Array.isArray(data)
        ? data
        : Array.isArray(data?.requests)
        ? data.requests
        : [];

      setRequests(loaded);
    } catch (err) {
      console.error(
        "Failed to load medical join requests:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء تحميل طلبات الانضمام."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  /* =========================
     Statistics
  ========================= */

  const statistics = useMemo(() => {
    const total = requests.length;

    const pending = requests.filter(
      (request) =>
        request.status === "pending"
    ).length;

    const approved = requests.filter(
      (request) =>
        request.status === "approved"
    ).length;

    const rejected = requests.filter(
      (request) =>
        request.status === "rejected"
    ).length;

    return {
      total,
      pending,
      approved,
      rejected,
    };
  }, [requests]);

  /* =========================
     Filtered Requests
  ========================= */

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "all" ||
        request.status === statusFilter;

      const matchesType =
        typeFilter === "all" ||
        request.type === typeFilter;

      return (
        matchesStatus &&
        matchesType
      );
    });
  }, [
    requests,
    statusFilter,
    typeFilter,
  ]);

  /* =========================
     Approve
  ========================= */

  const handleApprove = async (request) => {
    const requestId =
      request.id || request._id;

    if (!requestId) {
      setError(
        "لم يتم العثور على رقم الطلب."
      );
      return;
    }

    try {
      setActionLoading(
        `approve-${requestId}`
      );

      setError("");
      setSuccess("");

      await api.approveMedicalJoinRequest(
        requestId
      );

      setSuccess(
        `تمت الموافقة على طلب ${request.name || "الجهة"} وإضافتها للجهات الطبية المعتمدة.`
      );

      await loadRequests();
    } catch (err) {
      console.error(
        "Failed to approve medical join request:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء الموافقة على الطلب."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =========================
     Reject
  ========================= */

  const openReject = (request) => {
    const requestId =
      request.id || request._id;

    setRejectingId(requestId);
    setRejectionReason("");
    setError("");
    setSuccess("");
  };

  const closeReject = () => {
    setRejectingId(null);
    setRejectionReason("");
  };

  const handleReject = async (request) => {
    const requestId =
      request.id || request._id;

    if (!requestId) {
      setError(
        "لم يتم العثور على رقم الطلب."
      );
      return;
    }

    try {
      setActionLoading(
        `reject-${requestId}`
      );

      setError("");
      setSuccess("");

      await api.rejectMedicalJoinRequest(
        requestId,
        rejectionReason.trim()
      );

      setSuccess(
        `تم رفض طلب ${request.name || "الجهة"} بنجاح.`
      );

      closeReject();

      await loadRequests();
    } catch (err) {
      console.error(
        "Failed to reject medical join request:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء رفض الطلب."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =========================
     Render
  ========================= */

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: BG,
        fontFamily:
          "Tajawal, Arial, sans-serif",
        color: TEXT_DARK,
      }}
    >
      {/* =========================
          Header
      ========================= */}

      <header
        style={{
          background: "#ffffff",
          borderBottom: `1px solid ${BORDER}`,
          padding:
            "18px clamp(16px, 4vw, 40px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background:
                    PRIMARY_LIGHT,
                  color: PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3L19 6V11.5C19 16.2 16 19.7 12 21C8 19.7 5 16.2 5 11.5V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V15M8.5 11.5H15.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize:
                      "clamp(20px, 4vw, 27px)",
                    fontWeight: 800,
                  }}
                >
                  لوحة الإدارة
                </h1>

                <div
                  style={{
                    marginTop: 3,
                    color: TEXT_MUTED,
                    fontSize: 13,
                  }}
                >
                  إدارة طلبات انضمام الجهات الطبية
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadRequests}
            disabled={loading}
            style={{
              border: `1px solid ${BORDER}`,
              background: "#ffffff",
              color: PRIMARY_DARK,
              borderRadius: 12,
              padding: "10px 14px",
              fontFamily:
                "inherit",
              fontWeight: 700,
              cursor: loading
                ? "default"
                : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            تحديث
          </button>
        </div>
      </header>

      {/* =========================
          Main
      ========================= */}

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding:
            "24px clamp(16px, 4vw, 40px) 50px",
        }}
      >
        {/* Intro */}

        <section
          style={{
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: "0 0 7px",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            طلبات الانضمام
          </h2>

          <p
            style={{
              margin: 0,
              color: TEXT_MUTED,
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            من هنا يمكنك مراجعة طلبات المستشفيات
            والصيدليات ومراكز الدم قبل إضافتها
            إلى الجهات الطبية المعتمدة.
          </p>
        </section>

        {/* =========================
            Messages
        ========================= */}

        {error && (
          <div
            style={{
              marginBottom: 18,
              background: "#fff1f1",
              border:
                "1px solid #ffd5d5",
              color: "#b52f2f",
              borderRadius: 14,
              padding: "13px 15px",
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: 18,
              background: "#eaf9f1",
              border:
                "1px solid #cceedd",
              color: "#197747",
              borderRadius: 14,
              padding: "13px 15px",
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            {success}
          </div>
        )}

        {/* =========================
            Statistics
        ========================= */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 14,
            marginBottom: 25,
          }}
        >
          <StatCard
            title="إجمالي الطلبات"
            value={statistics.total}
            icon={
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 8H16M8 12H16M8 16H13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            }
            iconBackground="#e6f7f4"
            iconColor={PRIMARY}
          />

          <StatCard
            title="طلبات قيد المراجعة"
            value={statistics.pending}
            icon={
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 8V12L15 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            iconBackground="#fff8e6"
            iconColor="#b17b00"
          />

          <StatCard
            title="طلبات تمت الموافقة عليها"
            value={statistics.approved}
            icon={
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8.5 12L10.8 14.3L15.8 9.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            iconBackground="#e8f8ef"
            iconColor="#18864b"
          />

          <StatCard
            title="طلبات مرفوضة"
            value={statistics.rejected}
            icon={
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 9L15 15M15 9L9 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            }
            iconBackground="#fff0f0"
            iconColor="#c53b3b"
          />
        </section>

        {/* =========================
            Filters
        ========================= */}

        <section
          style={{
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            borderRadius: 18,
            padding: 16,
            marginBottom: 20,
            boxShadow:
              "0 5px 18px rgba(23, 51, 46, 0.04)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 7,
                  fontSize: 13,
                  fontWeight: 700,
                  color: TEXT_MUTED,
                }}
              >
                حالة الطلب
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "12px 13px",
                  background: "#ffffff",
                  color: TEXT_DARK,
                  fontFamily:
                    "inherit",
                  outline: "none",
                  fontSize: 14,
                }}
              >
                <option value="all">
                  كل الحالات
                </option>

                <option value="pending">
                  قيد المراجعة
                </option>

                <option value="approved">
                  تمت الموافقة
                </option>

                <option value="rejected">
                  مرفوض
                </option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 7,
                  fontSize: 13,
                  fontWeight: 700,
                  color: TEXT_MUTED,
                }}
              >
                نوع الجهة
              </label>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "12px 13px",
                  background: "#ffffff",
                  color: TEXT_DARK,
                  fontFamily:
                    "inherit",
                  outline: "none",
                  fontSize: 14,
                }}
              >
                <option value="all">
                  كل الجهات
                </option>

                <option value="hospital">
                  المستشفيات
                </option>

                <option value="pharmacy">
                  الصيدليات
                </option>

                <option value="blood_center">
                  مراكز الدم
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* =========================
            Requests
        ========================= */}

        {loading ? (
          <div
            style={{
              background: "#ffffff",
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 35,
              textAlign: "center",
              color: TEXT_MUTED,
            }}
          >
            جاري تحميل طلبات الانضمام...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 40,
              textAlign: "center",
              boxShadow:
                "0 5px 18px rgba(23, 51, 46, 0.04)",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background:
                  PRIMARY_LIGHT,
                color: PRIMARY,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                margin:
                  "0 auto 14px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 9H16M8 13H13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontWeight: 800,
                fontSize: 17,
                marginBottom: 7,
              }}
            >
              لا توجد طلبات
            </div>

            <div
              style={{
                color: TEXT_MUTED,
                fontSize: 13,
              }}
            >
              لا توجد طلبات انضمام مطابقة للفلاتر
              الحالية.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            {filteredRequests.map(
              (request, index) => {
                const requestId =
                  request.id ||
                  request._id ||
                  `request-${index}`;

                const status =
                  request.status ||
                  "pending";

                const statusStyle =
                  getStatusStyle(status);

                const isPending =
                  status === "pending";

                const isRejecting =
                  rejectingId === requestId;

                const approving =
                  actionLoading ===
                  `approve-${requestId}`;

                const rejecting =
                  actionLoading ===
                  `reject-${requestId}`;

                return (
                  <article
                    key={requestId}
                    style={{
                      background:
                        "#ffffff",
                      border: `1px solid ${BORDER}`,
                      borderRadius: 20,
                      padding: 20,
                      boxShadow:
                        "0 6px 20px rgba(23, 51, 46, 0.05)",
                    }}
                  >
                    {/* Card Header */}

                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "flex-start",
                        justifyContent:
                          "space-between",
                        gap: 14,
                        flexWrap: "wrap",
                        marginBottom: 18,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 15,
                            background:
                              PRIMARY_LIGHT,
                            color: PRIMARY,
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                          }}
                        >
                          {getTypeIcon(
                            request.type
                          )}
                        </div>

                        <div>
                          <h3
                            style={{
                              margin:
                                "0 0 5px",
                              fontSize: 18,
                              fontWeight: 800,
                            }}
                          >
                            {request.name ||
                              "جهة بدون اسم"}
                          </h3>

                          <div
                            style={{
                              color:
                                TEXT_MUTED,
                              fontSize: 13,
                            }}
                          >
                            {getTypeLabel(
                              request.type
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          background:
                            statusStyle.background,
                          color:
                            statusStyle.color,
                          padding:
                            "7px 12px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 800,
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {getStatusLabel(
                          status
                        )}
                      </span>
                    </div>

                    {/* Information Grid */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: 10,
                        marginBottom:
                          isPending
                            ? 18
                            : 0,
                      }}
                    >
                      <InfoItem
                        label="البريد الإلكتروني"
                        value={
                          request.email
                        }
                      />

                      <InfoItem
                        label="رقم الهاتف"
                        value={
                          request.phone
                        }
                      />

                      <InfoItem
                        label="رقم الترخيص"
                        value={
                          request.licenseNumber
                        }
                      />

                      <InfoItem
                        label="المحافظة"
                        value={
                          request.governorate
                        }
                      />

                      <InfoItem
                        label="المدينة"
                        value={
                          request.city
                        }
                      />

                      <InfoItem
                        label="العنوان"
                        value={
                          request.address
                        }
                      />

                      <InfoItem
                        label="تاريخ الطلب"
                        value={formatDate(
                          request.createdAt ||
                            request.created_at ||
                            request.date
                        )}
                      />

                      {status ===
                        "rejected" &&
                        request.rejectionReason && (
                          <InfoItem
                            label="سبب الرفض"
                            value={
                              request.rejectionReason
                            }
                          />
                        )}
                    </div>

                    {/* =========================
                        Actions
                    ========================= */}

                    {isPending && (
                      <div
                        style={{
                          borderTop: `1px solid ${BORDER}`,
                          paddingTop: 16,
                        }}
                      >
                        {!isRejecting ? (
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleApprove(
                                  request
                                )
                              }
                              disabled={
                                !!actionLoading
                              }
                              style={{
                                border: "none",
                                background:
                                  PRIMARY,
                                color:
                                  "#ffffff",
                                borderRadius: 12,
                                padding:
                                  "11px 18px",
                                fontFamily:
                                  "inherit",
                                fontWeight: 800,
                                cursor:
                                  actionLoading
                                    ? "default"
                                    : "pointer",
                                opacity:
                                  actionLoading
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              {approving
                                ? "جاري الموافقة..."
                                : "موافقة وإضافة الجهة"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openReject(
                                  request
                                )
                              }
                              disabled={
                                !!actionLoading
                              }
                              style={{
                                border:
                                  "1px solid #f0caca",
                                background:
                                  "#fff5f5",
                                color:
                                  "#c53b3b",
                                borderRadius: 12,
                                padding:
                                  "11px 18px",
                                fontFamily:
                                  "inherit",
                                fontWeight: 800,
                                cursor:
                                  actionLoading
                                    ? "default"
                                    : "pointer",
                                opacity:
                                  actionLoading
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              رفض الطلب
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              background:
                                "#fffafa",
                              border:
                                "1px solid #f2d4d4",
                              borderRadius: 15,
                              padding: 15,
                            }}
                          >
                            <label
                              style={{
                                display:
                                  "block",
                                marginBottom:
                                  8,
                                fontSize: 13,
                                fontWeight:
                                  800,
                                color:
                                  TEXT_DARK,
                              }}
                            >
                              سبب الرفض
                            </label>

                            <textarea
                              value={
                                rejectionReason
                              }
                              onChange={(
                                event
                              ) =>
                                setRejectionReason(
                                  event
                                    .target
                                    .value
                                )
                              }
                              placeholder="اكتب سبب رفض الطلب..."
                              rows={3}
                              style={{
                                width:
                                  "100%",
                                boxSizing:
                                  "border-box",
                                border:
                                  "1px solid #ead8d8",
                                borderRadius:
                                  12,
                                padding:
                                  "11px 12px",
                                resize:
                                  "vertical",
                                fontFamily:
                                  "inherit",
                                color:
                                  TEXT_DARK,
                                outline:
                                  "none",
                                marginBottom:
                                  10,
                              }}
                            />

                            <div
                              style={{
                                display:
                                  "flex",
                                gap: 9,
                                flexWrap:
                                  "wrap",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    request
                                  )
                                }
                                disabled={
                                  rejecting
                                }
                                style={{
                                  border:
                                    "none",
                                  background:
                                    "#c53b3b",
                                  color:
                                    "#ffffff",
                                  borderRadius:
                                    11,
                                  padding:
                                    "10px 16px",
                                  fontFamily:
                                    "inherit",
                                  fontWeight:
                                    800,
                                  cursor:
                                    rejecting
                                      ? "default"
                                      : "pointer",
                                  opacity:
                                    rejecting
                                      ? 0.6
                                      : 1,
                                }}
                              >
                                {rejecting
                                  ? "جاري الرفض..."
                                  : "تأكيد الرفض"}
                              </button>

                              <button
                                type="button"
                                onClick={
                                  closeReject
                                }
                                disabled={
                                  rejecting
                                }
                                style={{
                                  border:
                                    `1px solid ${BORDER}`,
                                  background:
                                    "#ffffff",
                                  color:
                                    TEXT_MUTED,
                                  borderRadius:
                                    11,
                                  padding:
                                    "10px 16px",
                                  fontFamily:
                                    "inherit",
                                  fontWeight:
                                    700,
                                  cursor:
                                    rejecting
                                      ? "default"
                                      : "pointer",
                                }}
                              >
                                إلغاء
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================
   Info Item
========================= */

function InfoItem({ label, value }) {
  return (
    <div
      style={{
        background: "#fbfefd",
        border: `1px solid ${BORDER}`,
        borderRadius: 13,
        padding: "11px 12px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          color: TEXT_MUTED,
          fontSize: 11,
          marginBottom: 5,
          fontWeight: 700,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: TEXT_DARK,
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.6,
          overflowWrap:
            "anywhere",
        }}
      >
        {value ||
          "غير متوفر"}
      </div>
    </div>
  );
}

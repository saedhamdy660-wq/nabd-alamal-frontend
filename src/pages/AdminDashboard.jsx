import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "../api.js";

/* =========================================================
   Constants
========================================================= */

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

/* =========================================================
   Helpers
========================================================= */

const getTypeLabel = (type) => {
  return TYPE_LABELS[type] || type || "غير محدد";
};

const getStatusLabel = (status) => {
  return (
    STATUS_LABELS[status] ||
    status ||
    "غير محدد"
  );
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

/* =========================================================
   Icons
========================================================= */

const Icon = ({
  children,
  size = 22,
}) => (
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

const SearchIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 16L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const BellIcon = () => (
  <Icon size={21}>
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 9.5C18 6.46 15.76 4 12 4C8.24 4 6 6.46 6 9.5C6 14.2 4.5 15.5 4.5 17H19.5C19.5 15.5 18 14.2 18 9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20H14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const MoonIcon = () => (
  <Icon size={21}>
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 15.5C18.9 16.15 17.62 16.5 16.25 16.5C12.25 16.5 9 13.25 9 9.25C9 7.88 9.35 6.6 10 5.5C6.55 6.35 4 9.45 4 13.15C4 17.67 7.67 21.35 12.2 21.35C15.9 21.35 19 18.8 20 15.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

const SunIcon = () => (
  <Icon size={21}>
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
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

const DocumentIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 3.5H14L18 7.5V20.5H7C6.17 20.5 5.5 19.83 5.5 19V5C5.5 4.17 6.17 3.5 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M13.5 3.5V8H18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M9 12H15M9 15.5H14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

const MailIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 7L12 13L19 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

const PhoneIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 4.5L9.5 4L11 8L8.5 9.5C9.55 12 11.3 13.75 13.8 14.8L15.5 12.5L19.5 14L19 16.5C18.75 17.8 17.6 18.6 16.3 18.4C9.8 17.35 6.65 14.2 5.6 7.7C5.4 6.4 6.2 5.25 7 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

const LocationIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 10C19 14.5 12 20 12 20C12 20 5 14.5 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  </Icon>
);

const CalendarIcon = () => (
  <Icon size={20}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 3V7M16 3V7M4 9H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M8 13H8.01M12 13H12.01M16 13H16.01M8 16.5H8.01M12 16.5H12.01"
        stroke="currentColor"
        strokeWidth="2"
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

/* =========================================================
   Stat Card
========================================================= */

const StatCard = ({
  title,
  value,
  icon,
  iconBackground,
  iconColor,
  darkMode,
}) => (
  <div
    className="admin-stat-card"
    style={{
      background: darkMode
        ? "#0d2a2e"
        : "#ffffff",
      border: `1px solid ${
        darkMode ? "rgba(170, 230, 225, 0.15)" : BORDER
      }`,
      borderRadius: 18,
      padding: 17,
      minHeight: 105,
      boxShadow: darkMode
        ? "0 5px 18px rgba(0,0,0,0.12)"
        : "0 5px 18px rgba(23,51,46,0.045)",
      display: "flex",
      alignItems: "center",
      gap: 13,
      transition:
        "background 0.25s ease, border 0.25s ease",
    }}
  >
    <div
      style={{
        width: 49,
        height: 49,
        borderRadius: 15,
        background: darkMode ? "#0a2428" : iconBackground,
        color: darkMode ? "#5ed9c5" : iconColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>

    <div
      style={{
        minWidth: 0,
      }}
    >
      <div
        style={{
          color: darkMode
            ? "#9bbdbc"
            : TEXT_MUTED,
          fontSize: 11,
          fontWeight: 800,
          marginBottom: 7,
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: darkMode
            ? "#e9ffff"
            : TEXT_DARK,
          fontSize: 26,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

/* =========================================================
   Admin Dashboard
========================================================= */

export default function AdminDashboard() {
  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [rejectingId, setRejectingId] =
    useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(() => {
      return (
        localStorage.getItem(
          "nabd_admin_theme"
        ) === "dark"
      );
    });

  const [showNotifications, setShowNotifications] =
    useState(false);

  /* =========================================================
     Save Theme
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "nabd_admin_theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* =========================================================
     Logout
  ========================================================= */

  const handleLogout = () => {
    try {
      localStorage.removeItem(
        "nabd_user"
      );

      localStorage.removeItem(
        "nabd_remember"
      );

      sessionStorage.clear();

      window.history.replaceState(
        null,
        "",
        "/login"
      );

      window.location.replace("/login");
    } catch (logoutError) {
      console.error(
        "Failed to logout admin:",
        logoutError
      );

      window.location.replace("/login");
    }
  };

  /* =========================================================
     Load Requests
  ========================================================= */

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

  /* =========================================================
     Statistics
  ========================================================= */

  const statistics = useMemo(() => {
    const total = requests.length;

    const pending =
      requests.filter(
        (request) =>
          request.status === "pending"
      ).length;

    const approved =
      requests.filter(
        (request) =>
          request.status === "approved"
      ).length;

    const rejected =
      requests.filter(
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

  /* =========================================================
     Filtered Requests
  ========================================================= */

  const filteredRequests = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "all" ||
        request.status === statusFilter;

      const matchesType =
        typeFilter === "all" ||
        request.type === typeFilter;

      if (!normalizedSearch) {
        return (
          matchesStatus &&
          matchesType
        );
      }

      const searchableText = [
        request.name,
        request.email,
        request.phone,
        request.licenseNumber,
        request.governorate,
        request.city,
        request.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchableText.includes(
          normalizedSearch
        );

      return (
        matchesStatus &&
        matchesType &&
        matchesSearch
      );
    });
  }, [
    requests,
    statusFilter,
    typeFilter,
    searchTerm,
  ]);

  /* =========================================================
     Approve
  ========================================================= */

  const handleApprove = async (
    request
  ) => {
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
        `تمت الموافقة على طلب ${
          request.name || "الجهة"
        } وإضافتها للجهات الطبية المعتمدة.`
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

  /* =========================================================
     Reject
  ========================================================= */

  const openReject = (
    request
  ) => {
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

  const handleReject = async (
    request
  ) => {
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
        `تم رفض طلب ${
          request.name || "الجهة"
        } بنجاح.`
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

  /* =========================================================
     Render
  ========================================================= */

  return (
    <div
      dir="rtl"
      className={
        darkMode
          ? "admin-dashboard admin-dark"
          : "admin-dashboard"
      }
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "#071a1d"
          : BG,
        fontFamily:
          "Tajawal, Cairo, Arial, sans-serif",
        color: darkMode
          ? "#e9ffff"
          : TEXT_DARK,
        transition:
          "background 0.25s ease, color 0.25s ease",
      }}
    >
      {/* =====================================================
          Header
      ===================================================== */}

      <header
        className="admin-header"
        style={{
          background: darkMode
            ? "#0d2a2e"
            : "#ffffff",
          borderBottom: `1px solid ${
            darkMode
              ? "rgba(170, 230, 225, 0.15)"
              : BORDER
          }`,
          padding:
            "15px clamp(15px, 4vw, 42px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition:
            "background 0.25s ease, border 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 18,
          }}
        >
          {/* Page Identity */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              minWidth: 0,
            }}
          >
            {/* Logo */}

            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, #0aa88f, #078876)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow:
                  "0 5px 14px rgba(10,168,143,0.18)",
              }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21C12 21 4 16.4 4 10.1C4 6.9 6.3 4.5 9.2 4.5C10.6 4.5 11.7 5.1 12 6.1C12.3 5.1 13.4 4.5 14.8 4.5C17.7 4.5 20 6.9 20 10.1C20 16.4 12 21 12 21Z"
                  fill="currentColor"
                />

                <path
                  d="M5.5 12H8.3L9.8 9L12 15L14 11L15.4 12H18.5"
                  stroke="#0aa88f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                minWidth: 0,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize:
                    "clamp(18px, 3vw, 21px)",
                  fontWeight: 900,
                  color: darkMode
                    ? "#e9ffff"
                    : TEXT_DARK,
                }}
              >
                لوحة الإدارة
              </h1>

              <div
                style={{
                  marginTop: 3,
                  color: darkMode
                    ? "#9bbdbc"
                    : TEXT_MUTED,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                }}
              >
                إدارة طلبات الجهات الطبية
              </div>
            </div>
          </div>

          {/* Header Actions */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Notification */}

            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                title="الإشعارات"
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                style={{
                  width: 43,
                  height: 43,
                  border: `1px solid ${
                    darkMode
                      ? "rgba(170, 230, 225, 0.15)"
                      : BORDER
                  }`,
                  background: darkMode
                    ? "#0a2428"
                    : "#ffffff",
                  color: darkMode
                    ? "#e9ffff"
                    : TEXT_DARK,
                  borderRadius: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <BellIcon />

                {statistics.pending >
                  0 && (
                  <span
                    style={{
                      position:
                        "absolute",
                      top: 7,
                      right: 7,
                      minWidth: 7,
                      height: 7,
                      borderRadius:
                        "50%",
                      background:
                        "#c53b3b",
                    }}
                  />
                )}
              </button>

              {/* Notification Popup */}

              {showNotifications && (
                <div
                  className="admin-notifications"
                  style={{
                    position: "absolute",
                    top: 53,
                    right: 0,
                    width: 310,
                    background:
                      darkMode
                        ? "#0a2428"
                        : "#ffffff",
                    border: `1px solid ${
                      darkMode
                        ? "rgba(170, 230, 225, 0.15)"
                        : BORDER
                    }`,
                    borderRadius: 16,
                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.15)",
                    padding: 14,
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <strong
                      style={{
                        color:
                          darkMode
                            ? "#ffffff"
                            : TEXT_DARK,
                        fontSize: 14,
                      }}
                    >
                      الإشعارات
                    </strong>

                    <span
                      style={{
                        background:
                          darkMode ? "#0a2428" : PRIMARY_LIGHT,
                        color:
                          darkMode ? "#5ed9c5" : PRIMARY_DARK,
                        padding:
                          "4px 8px",
                        borderRadius:
                          999,
                        fontSize: 10,
                        fontWeight: 900,
                      }}
                    >
                      {statistics.pending}
                    </span>
                  </div>

                  {statistics.pending >
                  0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter(
                          "pending"
                        );
                        setShowNotifications(
                          false
                        );
                      }}
                      style={{
                        width: "100%",
                        border: `1px solid ${
                          darkMode
                            ? "rgba(170, 230, 225, 0.15)"
                            : BORDER
                        }`,
                        background:
                          darkMode
                            ? "#0a2428"
                            : "#f7fffd",
                        borderRadius: 12,
                        padding: 11,
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 10,
                        textAlign:
                          "right",
                        cursor: "pointer",
                        fontFamily:
                          "inherit",
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 11,
                          background:
                            "#fff8e6",
                          color:
                            "#b17b00",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                          />
                        </svg>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 900,
                            color:
                              darkMode
                                ? "#ffffff"
                                : TEXT_DARK,
                          }}
                        >
                          طلبات جديدة
                          قيد المراجعة
                        </div>

                        <div
                          style={{
                            marginTop: 3,
                            fontSize: 11,
                            color:
                              darkMode
                                ? "#9bbdbc"
                                : TEXT_MUTED,
                          }}
                        >
                          لديك{" "}
                          {
                            statistics.pending
                          }{" "}
                          طلب يحتاج
                          للمراجعة
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px 10px",
                        color:
                          darkMode
                            ? "#9bbdbc"
                            : TEXT_MUTED,
                        fontSize: 12,
                      }}
                    >
                      لا توجد إشعارات
                      جديدة
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode */}

            <button
              type="button"
              title={
                darkMode
                  ? "الوضع الفاتح"
                  : "الوضع الداكن"
              }
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              style={{
                width: 43,
                height: 43,
                border: `1px solid ${
                  darkMode
                    ? "rgba(170, 230, 225, 0.15)"
                    : BORDER
                }`,
                background: darkMode
                  ? "#0a2428"
                  : "#ffffff",
                color: darkMode
                  ? "#5ed9c5"
                  : TEXT_DARK,
                borderRadius: 13,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {darkMode ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            {/* Admin Avatar */}

            <div
              title="مدير النظام"
              style={{
                width: 43,
                height: 43,
                borderRadius: 13,
                background: darkMode ? "#0a2428" : PRIMARY_LIGHT,
                color: darkMode ? "#5ed9c5" : PRIMARY_DARK,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                fontWeight: 900,
                fontSize: 15,
                flexShrink: 0,
                border: `1px solid ${
                  darkMode
                    ? "rgba(170, 230, 225, 0.15)"
                    : BORDER
                }`,
              }}
            >
              م
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          Main
      ===================================================== */}

      <main
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding:
            "20px clamp(15px, 4vw, 42px) 55px",
        }}
      >
        {/* ===================================================
            Search
        =================================================== */}

        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: darkMode
                  ? "#9bbdbc"
                  : TEXT_MUTED,
                pointerEvents:
                  "none",
              }}
            >
              <SearchIcon />
            </div>

            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="ابحث باسم الجهة، البريد، الهاتف، الترخيص..."
              style={{
                width: "100%",
                height: 46,
                boxSizing: "border-box",
                border: `1px solid ${
                  darkMode
                    ? "rgba(170, 230, 225, 0.15)"
                    : BORDER
                }`,
                borderRadius: 13,
                background: darkMode
                  ? "#0a2428"
                  : "#ffffff",
                padding:
                  "0 46px 0 14px",
                outline: "none",
                fontFamily:
                  "inherit",
                color: darkMode
                  ? "#e9ffff"
                  : TEXT_DARK,
                fontSize: 13,
                textAlign: "right",
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              style={{
                width: 46,
                height: 46,
                border: `1px solid ${
                  darkMode
                    ? "rgba(170, 230, 225, 0.15)"
                    : BORDER
                }`,
                background: darkMode
                  ? "#0a2428"
                  : "#ffffff",
                color: darkMode
                  ? "#e9ffff"
                  : TEXT_DARK,
                borderRadius: 13,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <BellIcon />

              {statistics.pending >
                0 && (
                <span
                  style={{
                    position:
                      "absolute",
                    top: 8,
                    right: 9,
                    width: 6,
                    height: 6,
                    borderRadius:
                      "50%",
                    background:
                      "#c53b3b",
                  }}
                />
              )}
            </button>
          </div>
        </section>

        {/* ===================================================
            Intro
        =================================================== */}

        <section
          style={{
            marginBottom: 17,
          }}
        >
          <h2
            style={{
              margin:
                "0 0 5px",
              fontSize: 20,
              fontWeight: 900,
              color: darkMode
                ? "#e9ffff"
                : TEXT_DARK,
            }}
          >
            طلبات الانضمام
          </h2>

          <p
            style={{
              margin: 0,
              color: darkMode
                ? "#9bbdbc"
                : TEXT_MUTED,
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            راجع طلبات المستشفيات
            والصيدليات ومراكز الدم
            قبل إضافتها إلى الجهات
            الطبية المعتمدة.
          </p>
        </section>

        {/* ===================================================
            Messages
        =================================================== */}

        {error && (
          <div
            style={{
              marginBottom: 17,
              background:
                darkMode
                  ? "#0a2428"
                  : "#fff1f1",
              border:
                `1px solid ${darkMode ? "rgba(170, 230, 225, 0.15)" : "#ffd5d5"}`,
              color:
                darkMode
                  ? "#e9ffff"
                  : "#b52f2f",
              borderRadius: 13,
              padding:
                "12px 14px",
              lineHeight: 1.7,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: 17,
              background:
                darkMode
                  ? "#0d2a2e"
                  : "#eaf9f1",
              border:
                `1px solid ${darkMode ? "rgba(170, 230, 225, 0.15)" : "#cceedd"}`,
              color:
                darkMode
                  ? "#5ed9c5"
                  : "#197747",
              borderRadius: 13,
              padding:
                "12px 14px",
              lineHeight: 1.7,
              fontSize: 13,
            }}
          >
            {success}
          </div>
        )}

        {/* ===================================================
            Statistics
        =================================================== */}

        <section
          className="admin-statistics"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <StatCard
            title="إجمالي الطلبات"
            value={statistics.total}
            icon={
              <DocumentIcon />
            }
            iconBackground="#e6f7f4"
            iconColor={PRIMARY}
            darkMode={darkMode}
          />

          <StatCard
            title="طلبات قيد المراجعة"
            value={statistics.pending}
            icon={
              <svg
                width="23"
                height="23"
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
                />
              </svg>
            }
            iconBackground="#fff8e6"
            iconColor="#b17b00"
            darkMode={darkMode}
          />

          <StatCard
            title="طلبات تمت الموافقة عليها"
            value={statistics.approved}
            icon={
              <svg
                width="23"
                height="23"
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
            darkMode={darkMode}
          />

          <StatCard
            title="طلبات مرفوضة"
            value={statistics.rejected}
            icon={
              <svg
                width="23"
                height="23"
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
            darkMode={darkMode}
          />
        </section>

        {/* ===================================================
            Filters
        =================================================== */}

        <section
          style={{
            background: darkMode
              ? "#0d2a2e"
              : "#ffffff",
            border: `1px solid ${
              darkMode
                ? "rgba(170, 230, 225, 0.15)"
                : BORDER
            }`,
            borderRadius: 17,
            padding: 14,
            marginBottom: 19,
            boxShadow: darkMode
              ? "0 5px 18px rgba(0,0,0,0.10)"
              : "0 4px 16px rgba(23,51,46,0.035)",
          }}
        >
          <div
            className="admin-filters"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            <FilterSelect
              label="نوع الجهة"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                ["all", "الكل"],
                [
                  "hospital",
                  "المستشفيات",
                ],
                [
                  "pharmacy",
                  "الصيدليات",
                ],
                [
                  "blood_center",
                  "مراكز الدم",
                ],
              ]}
              darkMode={darkMode}
            />

            <FilterSelect
              label="حالة الطلب"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                ["all", "الكل"],
                [
                  "pending",
                  "قيد المراجعة",
                ],
                [
                  "approved",
                  "تمت الموافقة",
                ],
                [
                  "rejected",
                  "مرفوضة",
                ],
              ]}
              darkMode={darkMode}
            />

            <div
              style={{
                display: "flex",
                alignItems:
                  "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
                style={{
                  width: "100%",
                  height: 43,
                  border: `1px solid ${
                    darkMode
                      ? "rgba(170, 230, 225, 0.15)"
                      : "#dfe7e5"
                  }`,
                  background:
                    darkMode
                      ? "#123d40"
                      : "#f2f5f4",
                  color: darkMode
                    ? "#e9ffff"
                    : TEXT_DARK,
                  borderRadius: 11,
                  fontFamily:
                    "inherit",
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                مسح الفلاتر
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems:
                  "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 43,
                  border: `1px solid ${
                    darkMode
                      ? "rgba(170, 230, 225, 0.15)"
                      : BORDER
                  }`,
                  background:
                    darkMode
                      ? "#0a2428"
                      : PRIMARY_LIGHT,
                  color:
                    darkMode
                      ? "#5ed9c5"
                      : PRIMARY_DARK,
                  borderRadius: 11,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {filteredRequests.length}{" "}
                طلب
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            Requests
        =================================================== */}

        {loading ? (
          <div
            style={{
              background: darkMode
                ? "#0d2a2e"
                : "#ffffff",
              border: `1px solid ${
                darkMode
                  ? "rgba(170, 230, 225, 0.15)"
                  : BORDER
              }`,
              borderRadius: 17,
              padding: 35,
              textAlign: "center",
              color: darkMode
                ? "#9bbdbc"
                : TEXT_MUTED,
            }}
          >
            جاري تحميل طلبات
            الانضمام...
          </div>
        ) : filteredRequests.length ===
          0 ? (
          <div
            style={{
              background: darkMode
                ? "#0d2a2e"
                : "#ffffff",
              border: `1px solid ${
                darkMode
                  ? "rgba(170, 230, 225, 0.15)"
                  : BORDER
              }`,
              borderRadius: 17,
              padding: 40,
              textAlign: "center",
              boxShadow: darkMode
                ? "0 5px 18px rgba(0,0,0,0.10)"
                : "0 5px 18px rgba(23,51,46,0.035)",
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 17,
                background:
                  PRIMARY_LIGHT,
                color: PRIMARY,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                margin:
                  "0 auto 13px",
              }}
            >
              <DocumentIcon />
            </div>

            <div
              style={{
                color: darkMode
                  ? "#e9ffff"
                  : TEXT_DARK,
                fontWeight: 900,
                fontSize: 16,
                marginBottom: 6,
              }}
            >
              لا توجد طلبات
            </div>

            <div
              style={{
                color: darkMode
                  ? "#9bbdbc"
                  : TEXT_MUTED,
                fontSize: 13,
              }}
            >
              لا توجد طلبات انضمام
              مطابقة للفلاتر
              الحالية.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 15,
            }}
          >
            {filteredRequests.map(
              (
                request,
                index
              ) => {
                const requestId =
                  request.id ||
                  request._id ||
                  `request-${index}`;

                const status =
                  request.status ||
                  "pending";

                const statusStyle =
                  getStatusStyle(
                    status
                  );

                const isPending =
                  status ===
                  "pending";

                const isRejecting =
                  rejectingId ===
                  requestId;

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
                        darkMode
                          ? "#0d2a2e"
                          : "#ffffff",
                      border: `1px solid ${
                        darkMode
                          ? "rgba(170, 230, 225, 0.15)"
                          : BORDER
                      }`,
                      borderRadius: 19,
                      padding:
                        "17px clamp(14px, 3vw, 22px)",
                      boxShadow:
                        darkMode
                          ? "0 5px 18px rgba(0,0,0,0.10)"
                          : "0 5px 18px rgba(23,51,46,0.045)",
                    }}
                  >
                    {/* Request Header */}

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 14,
                        flexWrap:
                          "wrap",
                        paddingBottom:
                          15,
                        borderBottom:
                          `1px solid ${
                            darkMode
                              ? "rgba(170, 230, 225, 0.15)"
                              : BORDER
                          }`,
                        marginBottom:
                          14,
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 11,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 46,
                            height: 46,
                            borderRadius: 14,
                            background:
                              PRIMARY_LIGHT,
                            color:
                              PRIMARY,
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            flexShrink: 0,
                          }}
                        >
                          {getTypeIcon(
                            request.type
                          )}
                        </div>

                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 8,
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <h3
                              style={{
                                margin: 0,
                                fontSize: 17,
                                fontWeight: 900,
                                color:
                                  darkMode
                                    ? "#ffffff"
                                    : TEXT_DARK,
                              }}
                            >
                              {request.name ||
                                "جهة بدون اسم"}
                            </h3>

                            <span
                              style={{
                                background:
                                  statusStyle.background,
                                color:
                                  statusStyle.color,
                                padding:
                                  "5px 9px",
                                borderRadius:
                                  999,
                                fontSize: 10,
                                fontWeight: 900,
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {getStatusLabel(
                                status
                              )}
                            </span>
                          </div>

                          <div
                            style={{
                              color:
                                darkMode
                                  ? "#9bbdbc"
                                  : TEXT_MUTED,
                              fontSize: 11,
                              marginTop: 4,
                            }}
                          >
                            {getTypeLabel(
                              request.type
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Information */}

                    <div
                      className="request-information"
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(2, minmax(0, 1fr))",
                        gap: 9,
                        marginBottom:
                          isPending
                            ? 17
                            : 0,
                      }}
                    >
                      <InfoItem
                        icon={
                          <MailIcon />
                        }
                        label="البريد الإلكتروني"
                        value={
                          request.email
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <PhoneIcon />
                        }
                        label="رقم الهاتف"
                        value={
                          request.phone
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <DocumentIcon />
                        }
                        label="رقم الترخيص"
                        value={
                          request.licenseNumber
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <LocationIcon />
                        }
                        label="المحافظة"
                        value={
                          request.governorate
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <LocationIcon />
                        }
                        label="المدينة"
                        value={
                          request.city
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <LocationIcon />
                        }
                        label="العنوان"
                        value={
                          request.address
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoItem
                        icon={
                          <CalendarIcon />
                        }
                        label="تاريخ الطلب"
                        value={formatDate(
                          request.createdAt ||
                            request.created_at ||
                            request.date
                        )}
                        darkMode={
                          darkMode
                        }
                      />

                      {status ===
                        "rejected" &&
                        request.rejectionReason && (
                          <InfoItem
                            icon={
                              <DocumentIcon />
                            }
                            label="سبب الرفض"
                            value={
                              request.rejectionReason
                            }
                            darkMode={
                              darkMode
                            }
                          />
                        )}
                    </div>

                    {/* Actions */}

                    {isPending && (
                      <div
                        style={{
                          borderTop:
                            `1px solid ${
                              darkMode
                                ? "rgba(170, 230, 225, 0.15)"
                                : BORDER
                            }`,
                          paddingTop:
                            15,
                        }}
                      >
                        {!isRejecting ? (
                          <div
                            style={{
                              display:
                                "grid",
                              gridTemplateColumns:
                                "1fr 1fr",
                              gap: 10,
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
                                border:
                                  "none",
                                background:
                                  darkMode ? "#123d40" : PRIMARY_DARK,
                                color:
                                  "#ffffff",
                                borderRadius:
                                  12,
                                minHeight:
                                  45,
                                padding:
                                  "10px 14px",
                                fontFamily:
                                  "inherit",
                                fontWeight:
                                  900,
                                fontSize:
                                  12,
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
                                  "none",
                                background:
                                  "#c53b3b",
                                color:
                                  "#ffffff",
                                borderRadius:
                                  12,
                                minHeight:
                                  45,
                                padding:
                                  "10px 14px",
                                fontFamily:
                                  "inherit",
                                fontWeight:
                                  900,
                                fontSize:
                                  12,
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
                                darkMode
                                  ? "#0a2428"
                                  : "#fffafa",
                              border:
                                `1px solid ${darkMode ? "rgba(170, 230, 225, 0.15)" : "#f2d4d4"}`,
                              borderRadius:
                                14,
                              padding:
                                14,
                            }}
                          >
                            <label
                              style={{
                                display:
                                  "block",
                                marginBottom:
                                  8,
                                fontSize:
                                  13,
                                fontWeight:
                                  900,
                                color:
                                  darkMode
                                    ? "#ffffff"
                                    : TEXT_DARK,
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
                                  `1px solid ${darkMode ? "rgba(170, 230, 225, 0.15)" : "#ead8d8"}`,
                                borderRadius:
                                  11,
                                padding:
                                  "10px 12px",
                                resize:
                                  "vertical",
                                fontFamily:
                                  "inherit",
                                color:
                                  darkMode
                                    ? "#ffffff"
                                    : TEXT_DARK,
                                background:
                                  darkMode
                                    ? "#0a2428"
                                    : "#ffffff",
                                outline:
                                  "none",
                                marginBottom:
                                  10,
                                fontSize:
                                  13,
                                textAlign:
                                  "right",
                              }}
                            />

                            <div
                              style={{
                                display:
                                  "grid",
                                gridTemplateColumns:
                                  "1fr 1fr",
                                gap: 9,
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
                                  minHeight:
                                    42,
                                  padding:
                                    "9px 14px",
                                  fontFamily:
                                    "inherit",
                                  fontWeight:
                                    900,
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
                                    `1px solid ${
                                      darkMode
                                        ? "rgba(170, 230, 225, 0.15)"
                                        : BORDER
                                    }`,
                                  background:
                                    darkMode
                                      ? "#0a2428"
                                      : "#ffffff",
                                  color:
                                    darkMode
                                      ? "#e9ffff"
                                      : TEXT_MUTED,
                                  borderRadius:
                                    11,
                                  minHeight:
                                    42,
                                  padding:
                                    "9px 14px",
                                  fontFamily:
                                    "inherit",
                                  fontWeight:
                                    800,
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
        {/* Logout - Bottom of page */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: `1px solid ${
              darkMode
                ? "rgba(170, 230, 225, 0.15)"
                : BORDER
            }`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            title="تسجيل الخروج"
            onClick={handleLogout}
            style={{
              minHeight: 44,
              padding: "0 18px",
              border: "1px solid transparent",
              background: darkMode
                ? "#123d40"
                : "#c53b3b",
              color: darkMode
                ? "#5ed9c5"
                : "#ffffff",
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 900,
              boxShadow: darkMode
                ? "none"
                : "0 5px 14px rgba(197, 59, 59, 0.16)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 17l5-5-5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 12H4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M20 4v16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </main>

      {/* =====================================================
          Responsive CSS
      ===================================================== */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .admin-dashboard {
            transition:
              background 0.25s ease,
              color 0.25s ease;
          }

          .admin-notifications {
            animation: adminNotificationOpen 0.18s ease-out;
          }

          @keyframes adminNotificationOpen {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 950px) {
            .admin-statistics {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
            }

            .admin-filters {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 650px) {
            .admin-header {
              position: relative !important;
            }

            .admin-statistics {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
              gap: 9px !important;
            }

            .admin-filters {
              grid-template-columns:
                1fr !important;
            }

            .request-information {
              grid-template-columns:
                1fr !important;
            }
          }

          @media (max-width: 480px) {
            .admin-statistics {
              grid-template-columns:
                1fr 1fr !important;
              gap: 8px !important;
            }

            .admin-stat-card {
              min-height: 94px !important;
              padding: 12px !important;
              gap: 9px !important;
            }

            .admin-stat-card > div:first-child {
              width: 42px !important;
              height: 42px !important;
            }

            .admin-stat-card
              > div:last-child
              > div:first-child {
              font-size: 10px !important;
            }

            .admin-stat-card
              > div:last-child
              > div:last-child {
              font-size: 23px !important;
            }

            .admin-notifications {
              position: fixed !important;
              top: 70px !important;
              right: 12px !important;
              left: 12px !important;
              width: auto !important;
            }
          }

          @media (max-width: 370px) {
            .admin-stat-card {
              padding: 10px !important;
            }

            .admin-stat-card > div:first-child {
              width: 38px !important;
              height: 38px !important;
            }

            .admin-stat-card
              > div:last-child
              > div:last-child {
              font-size: 21px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

/* =========================================================
   Filter Select
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
  darkMode,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 11,
          fontWeight: 800,
          color: darkMode
            ? "#9bbdbc"
            : TEXT_MUTED,
        }}
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        style={{
          width: "100%",
          height: 43,
          boxSizing: "border-box",
          border: `1px solid ${
            darkMode
              ? "rgba(170, 230, 225, 0.15)"
              : BORDER
          }`,
          borderRadius: 11,
          padding: "0 11px",
          background: darkMode
            ? "#0a2428"
            : "#ffffff",
          color: darkMode
            ? "#e9ffff"
            : TEXT_DARK,
          fontFamily:
            "inherit",
          outline: "none",
          fontSize: 13,
          cursor: "pointer",
          textAlign: "right",
        }}
      >
        {options.map(
          ([
            optionValue,
            optionLabel,
          ]) => (
            <option
              key={optionValue}
              value={optionValue}
              style={{
                background:
                  darkMode
                    ? "#0a2428"
                    : "#ffffff",
                color: darkMode
                  ? "#e9ffff"
                  : TEXT_DARK,
              }}
            >
              {optionLabel}
            </option>
          )
        )}
      </select>
    </div>
  );
}

/* =========================================================
   Info Item
========================================================= */

function InfoItem({
  icon,
  label,
  value,
  darkMode,
}) {
  return (
    <div
      style={{
        background: darkMode
          ? "#0a2428"
          : "#fbfefd",
        border: `1px solid ${
          darkMode
            ? "rgba(170, 230, 225, 0.15)"
            : BORDER
        }`,
        borderRadius: 12,
        padding:
          "10px 11px",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background:
            darkMode
              ? "#123d40"
              : PRIMARY_LIGHT,
          color: darkMode
            ? "#5ed9c5"
            : PRIMARY_DARK,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            color: darkMode
              ? "#9bbdbc"
              : TEXT_MUTED,
            fontSize: 10,
            marginBottom: 3,
            fontWeight: 800,
          }}
        >
          {label}
        </div>

        <div
          style={{
            color: darkMode
              ? "#e9ffff"
              : TEXT_DARK,
            fontSize: 12,
            fontWeight: 800,
            lineHeight: 1.5,
            overflowWrap:
              "anywhere",
          }}
        >
          {value ||
            "غير متوفر"}
        </div>
      </div>
    </div>
  );
}

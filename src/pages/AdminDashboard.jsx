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

const BORDER = "#dcecea";
const BG = "#effbf9";

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
    background: "#fff0c9",
    color: "#9a6b00",
  },
  approved: {
    background: "#dff6e8",
    color: "#18864b",
  },
  rejected: {
    background: "#ffe3e3",
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

const SearchIcon = () => (
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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
  <Icon size={22}>
    <svg
      width="22"
      height="22"
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

const HospitalIcon = () => (
  <Icon size={24}>
    <svg
      width="24"
      height="24"
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
  <Icon size={24}>
    <svg
      width="24"
      height="24"
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
  <Icon size={24}>
    <svg
      width="24"
      height="24"
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
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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
  <Icon size={21}>
    <svg
      width="21"
      height="21"
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

const FilterIcon = () => (
  <Icon size={19}>
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 6H20L14 13V18L10 20V13L4 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

const ChevronIcon = () => (
  <Icon size={18}>
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
   Logo
========================= */

const Logo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
    }}
  >
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <defs>
        <linearGradient
          id="adminLogoGradient"
          x1="5"
          y1="5"
          x2="37"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="#0AA88F"
          />
          <stop
            offset="1"
            stopColor="#078876"
          />
        </linearGradient>
      </defs>

      <circle
        cx="21"
        cy="21"
        r="19"
        fill="url(#adminLogoGradient)"
      />

      <path
        d="M12 21.2C12 17.9 14.15 15.5 17.05 15.5C19.1 15.5 20.2 16.8 21 18.1C21.8 16.8 22.9 15.5 24.95 15.5C27.85 15.5 30 17.9 30 21.2C30 25.7 25.8 28.4 21 31C16.2 28.4 12 25.7 12 21.2Z"
        fill="white"
      />

      <path
        d="M10.5 21.5H15L17 18L19.2 24L21.5 20.5L23 22.5H31.5"
        stroke="url(#adminLogoGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span
      style={{
        fontSize: 19,
        fontWeight: 900,
        color: TEXT_DARK,
        whiteSpace: "nowrap",
      }}
    >
      نبض الأمل
    </span>
  </div>
);

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
  <div className="admin-stat-card">
    <div
      className="admin-stat-icon"
      style={{
        background: iconBackground,
        color: iconColor,
      }}
    >
      {icon}
    </div>

    <div
      style={{
        minWidth: 0,
        textAlign: "center",
      }}
    >
      <div className="admin-stat-title">
        {title}
      </div>

      <div className="admin-stat-value">
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

  /* =========================
     Logout
  ========================= */

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

      window.location.replace(
        "/login"
      );
    } catch (logoutError) {
      console.error(
        "Failed to logout admin:",
        logoutError
      );

      window.location.replace(
        "/login"
      );
    }
  };

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
    const total =
      requests.length;

    const pending =
      requests.filter(
        (request) =>
          request.status ===
          "pending"
      ).length;

    const approved =
      requests.filter(
        (request) =>
          request.status ===
          "approved"
      ).length;

    const rejected =
      requests.filter(
        (request) =>
          request.status ===
          "rejected"
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
    const normalizedSearch =
      searchTerm
        .trim()
        .toLowerCase();

    return requests.filter(
      (request) => {
        const matchesStatus =
          statusFilter === "all" ||
          request.status ===
            statusFilter;

        const matchesType =
          typeFilter === "all" ||
          request.type ===
            typeFilter;

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
      }
    );
  }, [
    requests,
    statusFilter,
    typeFilter,
    searchTerm,
  ]);

  /* =========================
     Approve
  ========================= */

  const handleApprove = async (
    request
  ) => {
    const requestId =
      request.id ||
      request._id;

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
          request.name ||
          "الجهة"
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

  /* =========================
     Reject
  ========================= */

  const openReject = (
    request
  ) => {
    const requestId =
      request.id ||
      request._id;

    setRejectingId(
      requestId
    );

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
      request.id ||
      request._id;

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
          request.name ||
          "الجهة"
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

  /* =========================
     Render
  ========================= */

  return (
    <div
      className="admin-dashboard"
      dir="rtl"
    >
      {/* =========================
          Header
      ========================= */}

      <header className="admin-header">
        <div className="admin-header-inner">

          <div className="admin-header-title">
            <div className="admin-page-icon">
              <svg
                width="25"
                height="25"
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
              <h1>
                لوحة الإدارة
              </h1>

              <p>
                إدارة طلبات انضمام الجهات الطبية
              </p>
            </div>
          </div>

          <Logo />

        </div>
      </header>

      {/* =========================
          Main
      ========================= */}

      <main className="admin-main">

        {/* =========================
            Search
        ========================= */}

        <section className="admin-search-row">

          <div className="admin-search-box">

            <SearchIcon />

            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="ابحث باسم الجهة، البريد، الهاتف، الترخيص..."
            />

          </div>

          <button
            type="button"
            title="الإشعارات"
            className="admin-icon-button"
          >
            <BellIcon />

            <span className="admin-notification-dot" />
          </button>

          <div
            title="مدير النظام"
            className="admin-profile-circle"
          >
            م
          </div>

        </section>

        {/* =========================
            Page Intro
        ========================= */}

        <section className="admin-intro">

          <h2>
            طلبات الانضمام
          </h2>

          <p>
            راجع طلبات المستشفيات والصيدليات
            ومراكز الدم قبل إضافتها إلى الجهات
            الطبية المعتمدة.
          </p>

        </section>

        {/* =========================
            Messages
        ========================= */}

        {error && (
          <div className="admin-message admin-error">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-message admin-success">
            {success}
          </div>
        )}

        {/* =========================
            Statistics
        ========================= */}

        <section className="admin-stat-grid">

          <StatCard
            title="إجمالي الطلبات"
            value={statistics.total}
            icon={
              <DocumentIcon />
            }
            iconBackground="#d9f4ee"
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
                />
              </svg>
            }
            iconBackground="#ffedbd"
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
            iconBackground="#dff5e7"
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
            iconBackground="#ffe1e1"
            iconColor="#c53b3b"
          />

        </section>

        {/* =========================
            Filters
        ========================= */}

        <section className="admin-filter-card">

          <div className="admin-filter-row">

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
            />

            <button
              type="button"
              className="admin-clear-button"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setStatusFilter("all");
              }}
            >
              <FilterIcon />
              <span>
                مسح الفلاتر
              </span>
            </button>

            <div className="admin-filter-count">
              {filteredRequests.length} طلب
            </div>

          </div>

        </section>

        {/* =========================
            Requests
        ========================= */}

        {loading ? (
          <div className="admin-empty-card">
            جاري تحميل طلبات الانضمام...
          </div>
        ) : filteredRequests.length ===
          0 ? (
          <div className="admin-empty-card">

            <div className="admin-empty-icon">
              <DocumentIcon />
            </div>

            <div className="admin-empty-title">
              لا توجد طلبات
            </div>

            <div className="admin-empty-text">
              لا توجد طلبات انضمام مطابقة
              للفلاتر الحالية.
            </div>

          </div>
        ) : (
          <div className="admin-request-list">

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
                    className="admin-request-card"
                  >

                    {/* Request Header */}

                    <div className="admin-request-header">

                      <div className="admin-request-heading">

                        <div className="admin-request-type-icon">
                          {getTypeIcon(
                            request.type
                          )}
                        </div>

                        <div className="admin-request-name-wrap">

                          <div className="admin-request-name-row">

                            <h3>
                              {request.name ||
                                "جهة بدون اسم"}
                            </h3>

                            <span
                              className="admin-status-badge"
                              style={{
                                background:
                                  statusStyle.background,
                                color:
                                  statusStyle.color,
                              }}
                            >
                              {getStatusLabel(
                                status
                              )}
                            </span>

                          </div>

                          <div className="admin-request-type">
                            {getTypeLabel(
                              request.type
                            )}
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* Information */}

                    <div className="admin-info-grid">

                      <InfoItem
                        icon={
                          <MailIcon />
                        }
                        label="البريد الإلكتروني"
                        value={
                          request.email
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
                      />

                      <InfoItem
                        icon={
                          <DocumentIcon />
                        }
                        label="رقم الترخيص"
                        value={
                          request.licenseNumber
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
                      />

                      <InfoItem
                        icon={
                          <LocationIcon />
                        }
                        label="المدينة"
                        value={
                          request.city
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
                          />
                        )}

                    </div>

                    {/* Actions */}

                    {isPending && (
                      <div className="admin-actions">

                        {!isRejecting ? (
                          <div className="admin-action-buttons">

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
                              className="admin-approve-button"
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
                              className="admin-reject-button"
                            >
                              رفض الطلب
                            </button>

                          </div>
                        ) : (
                          <div className="admin-reject-box">

                            <label>
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
                                  event.target.value
                                )
                              }
                              placeholder="اكتب سبب رفض الطلب..."
                              rows={3}
                            />

                            <div className="admin-reject-confirm-buttons">

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
                                className="admin-reject-button"
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
                                className="admin-cancel-button"
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

      {/* =========================
          Bottom Medical Waves
      ========================= */}

      <div className="admin-bottom-waves">

        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="M0 75C180 25 300 120 470 75C650 28 750 100 920 65C1090 30 1190 100 1440 50V180H0Z"
            fill="#c8eee8"
          />

          <path
            d="M0 105C170 60 300 145 510 95C690 52 780 130 980 90C1170 52 1270 120 1440 80V180H0Z"
            fill="#8bd8cc"
          />

          <path
            d="M0 135C190 95 340 160 540 120C730 82 830 160 1030 120C1220 88 1320 145 1440 115V180H0Z"
            fill="#48bdaa"
          />

          <path
            d="M0 165H470L505 165L525 160L545 165L560 145L575 165H1440"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
          />
        </svg>

      </div>

      {/* =========================
          Responsive CSS
      ========================= */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .admin-dashboard {
            min-height: 100vh;
            background:
              linear-gradient(
                180deg,
                #f3fcfa 0%,
                #eaf9f6 100%
              );
            font-family:
              Tajawal,
              Cairo,
              Arial,
              sans-serif;
            color: ${TEXT_DARK};
            padding-bottom: 135px;
            overflow-x: hidden;
          }

          .admin-header {
            background: rgba(255, 255, 255, 0.96);
            border-bottom: 1px solid ${BORDER};
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: blur(12px);
          }

          .admin-header-inner {
            width: min(1180px, calc(100% - 36px));
            min-height: 78px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .admin-header-title {
            display: flex;
            align-items: center;
            gap: 11px;
          }

          .admin-page-icon {
            width: 43px;
            height: 43px;
            border-radius: 14px;
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY};
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .admin-header-title h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            color: ${TEXT_DARK};
          }

          .admin-header-title p {
            margin: 3px 0 0;
            color: ${TEXT_MUTED};
            font-size: 11px;
          }

          .admin-main {
            width: min(1120px, calc(100% - 36px));
            margin: 0 auto;
            padding: 22px 0 45px;
          }

          .admin-search-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 22px;
          }

          .admin-search-box {
            flex: 1;
            min-width: 0;
            height: 47px;
            border: 1px solid ${BORDER};
            border-radius: 15px;
            background: #ffffff;
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 0 14px;
            color: ${TEXT_MUTED};
            box-shadow:
              0 5px 20px rgba(23, 51, 46, 0.035);
          }

          .admin-search-box input {
            flex: 1;
            min-width: 0;
            height: 100%;
            border: none;
            outline: none;
            background: transparent;
            font-family: inherit;
            font-size: 13px;
            color: ${TEXT_DARK};
            direction: rtl;
            text-align: right;
          }

          .admin-search-box input::placeholder {
            color: #91a4a0;
            opacity: 1;
          }

          .admin-icon-button,
          .admin-profile-circle {
            width: 47px;
            height: 47px;
            flex-shrink: 0;
            border-radius: 15px;
          }

          .admin-icon-button {
            border: 1px solid ${BORDER};
            background: #ffffff;
            color: ${TEXT_DARK};
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
          }

          .admin-notification-dot {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #c53b3b;
            top: 8px;
            right: 9px;
          }

          .admin-profile-circle {
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY_DARK};
            border: 1px solid ${BORDER};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 900;
          }

          .admin-intro {
            margin-bottom: 18px;
          }

          .admin-intro h2 {
            margin: 0 0 5px;
            font-size: 20px;
            font-weight: 900;
            color: ${TEXT_DARK};
          }

          .admin-intro p {
            margin: 0;
            color: ${TEXT_MUTED};
            font-size: 12px;
            line-height: 1.8;
          }

          .admin-message {
            border-radius: 13px;
            padding: 12px 14px;
            margin-bottom: 16px;
            font-size: 13px;
            line-height: 1.7;
          }

          .admin-error {
            background: #fff1f1;
            border: 1px solid #ffd5d5;
            color: #b52f2f;
          }

          .admin-success {
            background: #eaf9f1;
            border: 1px solid #cceedd;
            color: #197747;
          }

          .admin-stat-grid {
            display: grid;
            grid-template-columns:
              repeat(4, minmax(0, 1fr));
            gap: 13px;
            margin-bottom: 20px;
          }

          .admin-stat-card {
            min-height: 148px;
            border: 1px solid ${BORDER};
            border-radius: 18px;
            background: #ffffff;
            padding: 15px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow:
              0 7px 24px rgba(23, 51, 46, 0.055);
          }

          .admin-stat-icon {
            width: 51px;
            height: 51px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .admin-stat-title {
            color: ${TEXT_MUTED};
            font-size: 11px;
            font-weight: 800;
            line-height: 1.45;
          }

          .admin-stat-value {
            margin-top: 7px;
            color: ${TEXT_DARK};
            font-size: 28px;
            line-height: 1;
            font-weight: 900;
          }

          .admin-filter-card {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid ${BORDER};
            border-radius: 18px;
            padding: 14px;
            margin-bottom: 20px;
            box-shadow:
              0 7px 22px rgba(23, 51, 46, 0.04);
          }

          .admin-filter-row {
            display: grid;
            grid-template-columns:
              1fr 1fr auto auto;
            align-items: end;
            gap: 10px;
          }

          .admin-clear-button,
          .admin-filter-count {
            min-height: 44px;
            border-radius: 12px;
            padding: 0 15px;
          }

          .admin-clear-button {
            border: 1px solid #dfe7e5;
            background: #edf3f2;
            color: ${TEXT_DARK};
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
          }

          .admin-filter-count {
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY_DARK};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 900;
            white-space: nowrap;
            min-width: 92px;
          }

          .admin-empty-card {
            background: #ffffff;
            border: 1px solid ${BORDER};
            border-radius: 18px;
            padding: 40px;
            text-align: center;
            box-shadow:
              0 7px 24px rgba(23, 51, 46, 0.04);
            color: ${TEXT_MUTED};
          }

          .admin-empty-icon {
            width: 58px;
            height: 58px;
            border-radius: 17px;
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY};
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 13px;
          }

          .admin-empty-title {
            color: ${TEXT_DARK};
            font-size: 16px;
            font-weight: 900;
            margin-bottom: 6px;
          }

          .admin-empty-text {
            font-size: 13px;
          }

          .admin-request-list {
            display: grid;
            gap: 15px;
          }

          .admin-request-card {
            background: #ffffff;
            border: 1px solid ${BORDER};
            border-radius: 20px;
            padding: 18px;
            box-shadow:
              0 8px 25px rgba(23, 51, 46, 0.055);
          }

          .admin-request-header {
            padding-bottom: 15px;
            margin-bottom: 14px;
            border-bottom: 1px solid ${BORDER};
          }

          .admin-request-heading {
            display: flex;
            align-items: center;
            gap: 11px;
          }

          .admin-request-type-icon {
            width: 49px;
            height: 49px;
            flex-shrink: 0;
            border-radius: 15px;
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .admin-request-name-wrap {
            min-width: 0;
            flex: 1;
          }

          .admin-request-name-row {
            display: flex;
            align-items: center;
            gap: 9px;
            flex-wrap: wrap;
          }

          .admin-request-name-row h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 900;
            color: ${TEXT_DARK};
          }

          .admin-status-badge {
            padding: 6px 11px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 900;
            white-space: nowrap;
          }

          .admin-request-type {
            color: ${TEXT_MUTED};
            font-size: 12px;
            margin-top: 4px;
          }

          .admin-info-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .admin-info-item {
            min-width: 0;
            background: #fbfefd;
            border: 1px solid ${BORDER};
            border-radius: 12px;
            padding: 9px 10px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .admin-info-icon {
            width: 35px;
            height: 35px;
            border-radius: 11px;
            flex-shrink: 0;
            background: ${PRIMARY_LIGHT};
            color: ${PRIMARY_DARK};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .admin-info-content {
            min-width: 0;
            flex: 1;
            text-align: right;
          }

          .admin-info-label {
            color: ${TEXT_MUTED};
            font-size: 10px;
            font-weight: 800;
            margin-bottom: 3px;
          }

          .admin-info-value {
            color: ${TEXT_DARK};
            font-size: 12px;
            font-weight: 800;
            line-height: 1.5;
            overflow-wrap: anywhere;
          }

          .admin-actions {
            border-top: 1px solid ${BORDER};
            margin-top: 15px;
            padding-top: 15px;
          }

          .admin-action-buttons {
            display: grid;
            grid-template-columns:
              1fr 1fr;
            gap: 10px;
          }

          .admin-approve-button,
          .admin-reject-button,
          .admin-cancel-button {
            min-height: 46px;
            border-radius: 12px;
            padding: 10px 14px;
            font-family: inherit;
            font-weight: 900;
            font-size: 13px;
            cursor: pointer;
            border: none;
          }

          .admin-approve-button {
            background: ${PRIMARY_DARK};
            color: #ffffff;
            box-shadow:
              0 5px 13px rgba(7, 136, 118, 0.17);
          }

          .admin-reject-button {
            background: #bd3d3d;
            color: #ffffff;
          }

          .admin-approve-button:disabled,
          .admin-reject-button:disabled,
          .admin-cancel-button:disabled {
            opacity: 0.6;
            cursor: default;
          }

          .admin-reject-box {
            background: #fffafa;
            border: 1px solid #f2d4d4;
            border-radius: 14px;
            padding: 14px;
          }

          .admin-reject-box label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 900;
            color: ${TEXT_DARK};
          }

          .admin-reject-box textarea {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ead8d8;
            border-radius: 11px;
            padding: 10px 12px;
            resize: vertical;
            min-height: 80px;
            font-family: inherit;
            font-size: 13px;
            color: ${TEXT_DARK};
            background: #ffffff;
            outline: none;
            direction: rtl;
            text-align: right;
            margin-bottom: 10px;
          }

          .admin-reject-box textarea::placeholder {
            color: #9b9999;
          }

          .admin-reject-confirm-buttons {
            display: grid;
            grid-template-columns:
              1fr 1fr;
            gap: 9px;
          }

          .admin-cancel-button {
            border: 1px solid ${BORDER};
            background: #ffffff;
            color: ${TEXT_MUTED};
          }

          .admin-bottom-waves {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 125px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.95;
          }

          .admin-bottom-waves svg {
            width: 100%;
            height: 100%;
            display: block;
          }

          @media (max-width: 900px) {
            .admin-stat-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }

            .admin-filter-row {
              grid-template-columns:
                1fr 1fr;
            }

            .admin-clear-button,
            .admin-filter-count {
              width: 100%;
            }
          }

          @media (max-width: 650px) {
            .admin-header-inner,
            .admin-main {
              width: min(
                100% - 24px,
                560px
              );
            }

            .admin-header-inner {
              min-height: 68px;
            }

            .admin-header-title p {
              display: none;
            }

            .admin-header-title h1 {
              font-size: 17px;
            }

            .admin-page-icon {
              width: 39px;
              height: 39px;
            }

            .admin-header-inner > .admin-header-title
              + div {
              transform: scale(0.9);
              transform-origin: right center;
            }

            .admin-main {
              padding-top: 15px;
            }

            .admin-search-row {
              margin-bottom: 17px;
            }

            .admin-search-box {
              height: 44px;
              border-radius: 13px;
            }

            .admin-icon-button,
            .admin-profile-circle {
              width: 44px;
              height: 44px;
              border-radius: 13px;
            }

            .admin-intro h2 {
              font-size: 18px;
            }

            .admin-intro p {
              font-size: 11px;
            }

            .admin-stat-card {
              min-height: 132px;
              border-radius: 16px;
              padding: 12px 8px;
            }

            .admin-stat-icon {
              width: 46px;
              height: 46px;
              border-radius: 14px;
            }

            .admin-stat-title {
              font-size: 10px;
            }

            .admin-stat-value {
              font-size: 25px;
            }

            .admin-request-card {
              border-radius: 17px;
              padding: 14px;
            }

            .admin-request-name-row h3 {
              font-size: 16px;
            }

            .admin-info-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 470px) {
            .admin-header-inner,
            .admin-main {
              width: calc(100% - 18px);
            }

            .admin-header-inner {
              gap: 8px;
            }

            .admin-header-inner > .admin-header-title {
              gap: 7px;
            }

            .admin-header-inner > .admin-header-title
              + div {
              transform: scale(0.78);
            }

            .admin-search-row {
              gap: 7px;
            }

            .admin-search-box {
              padding: 0 11px;
            }

            .admin-search-box input {
              font-size: 11px;
            }

            .admin-icon-button,
            .admin-profile-circle {
              width: 42px;
              height: 42px;
            }

            .admin-stat-grid {
              gap: 8px;
            }

            .admin-stat-card {
              min-height: 125px;
            }

            .admin-stat-title {
              font-size: 9px;
            }

            .admin-stat-value {
              font-size: 23px;
            }

            .admin-filter-row {
              grid-template-columns: 1fr;
            }

            .admin-filter-card {
              padding: 11px;
            }

            .admin-action-buttons {
              grid-template-columns:
                1fr 1fr;
              gap: 7px;
            }

            .admin-approve-button,
            .admin-reject-button {
              min-height: 43px;
              padding: 8px 8px;
              font-size: 11px;
            }

            .admin-bottom-waves {
              height: 95px;
            }
          }

          @media (max-width: 350px) {
            .admin-request-name-row {
              align-items: flex-start;
              flex-direction: column;
              gap: 5px;
            }

            .admin-action-buttons {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

/* =========================
   Filter Select
========================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="admin-filter-select">
      <label>
        {label}
      </label>

      <div className="admin-select-wrapper">
        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
        >
          {options.map(
            ([
              optionValue,
              optionLabel,
            ]) => (
              <option
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </option>
            )
          )}
        </select>

        <span>
          <ChevronIcon />
        </span>
      </div>

      <style>
        {`
          .admin-filter-select label {
            display: block;
            margin-bottom: 6px;
            color: ${TEXT_MUTED};
            font-size: 10px;
            font-weight: 800;
          }

          .admin-select-wrapper {
            position: relative;
            width: 100%;
          }

          .admin-select-wrapper select {
            width: 100%;
            height: 44px;
            box-sizing: border-box;
            border: 1px solid ${BORDER};
            border-radius: 12px;
            padding: 0 12px 0 38px;
            appearance: none;
            -webkit-appearance: none;
            background: #ffffff;
            color: ${TEXT_DARK};
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            outline: none;
            cursor: pointer;
            direction: rtl;
            text-align: right;
          }

          .admin-select-wrapper > span {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: ${TEXT_MUTED};
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
}

/* =========================
   Info Item
========================= */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="admin-info-item">

      <div className="admin-info-icon">
        {icon}
      </div>

      <div className="admin-info-content">

        <div className="admin-info-label">
          {label}
        </div>

        <div className="admin-info-value">
          {value || "غير متوفر"}
        </div>

      </div>

    </div>
  );
}

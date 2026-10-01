import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { api } from "../api.js";

export default function MedicalDashboard() {
  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const [entity, setEntity] =
    useState(null);

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [requestsLoading, setRequestsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [requestsError, setRequestsError] =
    useState("");

  const [updatingRequestId, setUpdatingRequestId] =
    useState("");

  const [theme, setTheme] =
    useState(() => {
      const savedTheme =
        localStorage.getItem(
          "nabd_theme"
        );

      if (
        savedTheme === "dark" ||
        savedTheme === "light"
      ) {
        return savedTheme;
      }

      return localStorage.getItem(
        "nabd_dark_mode"
      ) === "true"
        ? "dark"
        : "light";
    });

  const isDark =
    theme === "dark";

  useEffect(() => {
    loadMedicalDashboard();
  }, []);

  // ============================================================
  // Theme
  // ============================================================

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme =
        localStorage.getItem(
          "nabd_theme"
        ) ||
        (
          localStorage.getItem(
            "nabd_dark_mode"
          ) === "true"
            ? "dark"
            : "light"
        );

      const normalizedTheme =
        savedTheme === "dark"
          ? "dark"
          : "light";

      setTheme(
        normalizedTheme
      );

      document.documentElement.setAttribute(
        "data-theme",
        normalizedTheme
      );

      document.body.setAttribute(
        "data-theme",
        normalizedTheme
      );

      document.documentElement.classList.toggle(
        "nabd-dark",
        normalizedTheme === "dark"
      );

      document.body.classList.toggle(
        "nabd-dark",
        normalizedTheme === "dark"
      );

      localStorage.setItem(
        "nabd_theme",
        normalizedTheme
      );

      localStorage.setItem(
        "nabd_dark_mode",
        String(
          normalizedTheme === "dark"
        )
      );
    };

    applyTheme();

    window.addEventListener(
      "theme-changed",
      applyTheme
    );

    window.addEventListener(
      "storage",
      applyTheme
    );

    return () => {
      window.removeEventListener(
        "theme-changed",
        applyTheme
      );

      window.removeEventListener(
        "storage",
        applyTheme
      );
    };
  }, []);

  function toggleTheme() {
    const nextTheme =
      theme === "dark"
        ? "light"
        : "dark";

    localStorage.setItem(
      "nabd_theme",
      nextTheme
    );

    localStorage.setItem(
      "nabd_dark_mode",
      String(
        nextTheme === "dark"
      )
    );

    window.dispatchEvent(
      new Event(
        "theme-changed"
      )
    );
  }

  // ============================================================
  // Logout
  // ============================================================

  function handleLogout() {
    try {
      localStorage.removeItem(
        "nabd_user"
      );

      localStorage.removeItem(
        "nabd_remember"
      );

      sessionStorage.clear();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Medical logout error:",
        error
      );

      window.location.replace(
        "/login"
      );
    }
  }

  // ============================================================
  // Notifications
  // ============================================================

  function handleNotifications() {
    navigate(
      "/notifications"
    );
  }

  // ============================================================
  // Load Medical Dashboard
  // ============================================================

  async function loadMedicalDashboard() {
    try {
      setLoading(true);
      setError("");

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "nabd_user"
          ) || "null"
        );

      if (!savedUser) {
        setError(
          "لم يتم العثور على بيانات الحساب"
        );

        return;
      }

      if (
        savedUser.accountType !==
          "medical" ||
        !savedUser.medicalEntityId
      ) {
        setError(
          "هذا الحساب غير مرتبط بجهة طبية"
        );

        return;
      }

      setUser(savedUser);

      const data =
        await api.getMedicalEntities();

      const allEntities = [
        ...(data.hospitals || []),
        ...(data.pharmacies || []),
        ...(data.bloodCenters || []),
      ];

      const foundEntity =
        allEntities.find(
          (item) =>
            item.id ===
            savedUser.medicalEntityId
        );

      if (!foundEntity) {
        setError(
          "الجهة الطبية المرتبط بها الحساب غير موجودة"
        );

        return;
      }

      setEntity(foundEntity);

      await loadMedicalRequests(
        savedUser.medicalEntityType,
        savedUser.medicalEntityId
      );
    } catch (err) {
      console.error(
        "Medical dashboard error:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء تحميل بيانات الجهة الطبية"
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // Load Requests
  // ============================================================

  async function loadMedicalRequests(
    entityType,
    entityId
  ) {
    try {
      setRequestsLoading(true);
      setRequestsError("");

      const data =
        await api.getMedicalEntityRequests(
          entityType,
          entityId
        );

      const loadedRequests =
        Array.isArray(data)
          ? data
          : Array.isArray(
              data?.requests
            )
          ? data.requests
          : [];

      setRequests(
        loadedRequests
      );
    } catch (err) {
      console.error(
        "Medical requests error:",
        err
      );

      setRequestsError(
        err?.message ||
          "حدث خطأ أثناء تحميل الطلبات"
      );

      setRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  }

  // ============================================================
  // Update Request Status
  // ============================================================

  async function updateRequestStatus(
    requestId,
    status
  ) {
    if (
      !user?.medicalEntityType ||
      !user?.medicalEntityId ||
      !requestId ||
      !status
    ) {
      return;
    }

    try {
      setUpdatingRequestId(
        requestId
      );

      setRequestsError("");

      const data =
        await api.updateMedicalRequestStatus(
          user.medicalEntityType,
          user.medicalEntityId,
          requestId,
          status
        );

      const updatedRequest =
        data?.request ||
        data;

      if (
        updatedRequest?.id
      ) {
        setRequests(
          (currentRequests) =>
            currentRequests.map(
              (item) =>
                item.id ===
                updatedRequest.id
                  ? updatedRequest
                  : item
            )
        );
      } else {
        await loadMedicalRequests(
          user.medicalEntityType,
          user.medicalEntityId
        );
      }
    } catch (err) {
      console.error(
        "Update medical request status error:",
        err
      );

      setRequestsError(
        err?.message ||
          "حدث خطأ أثناء تحديث حالة الطلب"
      );
    } finally {
      setUpdatingRequestId(
        ""
      );
    }
  }

  // ============================================================
  // Entity Type
  // ============================================================

  function getEntityTypeLabel() {
    if (
      !user?.medicalEntityType
    ) {
      return "جهة طبية";
    }

    if (
      user.medicalEntityType ===
      "hospital"
    ) {
      return "مستشفى";
    }

    if (
      user.medicalEntityType ===
      "pharmacy"
    ) {
      return "صيدلية";
    }

    if (
      user.medicalEntityType ===
      "blood_center"
    ) {
      return "مركز دم";
    }

    return "جهة طبية";
  }

  // ============================================================
  // Request Type Label
  // ============================================================

  function getRequestTypeLabel(
    request
  ) {
    if (
      user?.medicalEntityType ===
      "pharmacy"
    ) {
      return "طلب دواء";
    }

    if (
      user?.medicalEntityType ===
      "blood_center"
    ) {
      return "طلب بنك دم";
    }

    if (
      request?.requestType ===
        "blood" ||
      request?.requestType ===
        "blood-donation" ||
      request?.requestType ===
        "donation"
    ) {
      return "طلب تبرع بالدم";
    }

    return "طلب دم";
  }

  // ============================================================
  // Request Icon
  // ============================================================

  function getRequestIcon() {
    if (
      user?.medicalEntityType ===
      "pharmacy"
    ) {
      return "💊";
    }

    if (
      user?.medicalEntityType ===
      "blood_center"
    ) {
      return "🩸";
    }

    return "🩸";
  }

  // ============================================================
  // Status Options
  // ============================================================

  function getStatusOptions() {
    if (
      user?.medicalEntityType ===
      "hospital"
    ) {
      return [
        "قيد الانتظار",
        "قيد التنفيذ",
        "جاري التنفيذ",
        "تم القبول",
        "المتبرع في طريقه إلى المستشفى",
        "وصل إلى المستشفى",
        "تم التبرع",
        "مكتمل",
        "تم الرفض",
        "تم الإلغاء",
      ];
    }

    if (
      user?.medicalEntityType ===
      "pharmacy"
    ) {
      return [
        "قيد المراجعة",
        "جاري التجهيز",
        "في انتظار الاستلام",
        "مكتمل",
        "تم الرفض",
        "تم الإلغاء",
      ];
    }

    if (
      user?.medicalEntityType ===
      "blood_center"
    ) {
      return [
        "قيد المراجعة",
        "قيد التجهيز",
        "مكتمل",
        "تم الرفض",
        "تم الإلغاء",
      ];
    }

    return [];
  }

  // ============================================================
  // Status Style
  // ============================================================

  function getStatusStyle(
    status
  ) {
    const value =
      String(
        status || ""
      ).trim();

    if (
      value ===
        "مكتمل" ||
      value ===
        "تم التبرع" ||
      value ===
        "تم القبول"
    ) {
      return isDark
        ? styles.statusSuccessDark
        : styles.statusSuccess;
    }

    if (
      value ===
        "تم الرفض" ||
      value ===
        "تم الإلغاء"
    ) {
      return isDark
        ? styles.statusDangerDark
        : styles.statusDanger;
    }

    if (
      value ===
        "جاري التنفيذ" ||
      value ===
        "قيد التنفيذ" ||
      value ===
        "جاري التجهيز" ||
      value ===
        "قيد التجهيز"
    ) {
      return isDark
        ? styles.statusProgressDark
        : styles.statusProgress;
    }

    return isDark
      ? styles.statusPendingDark
      : styles.statusPending;
  }

  // ============================================================
  // Request Details
  // ============================================================

  function getRequesterName(
    request
  ) {
    return (
      request?.requesterName ||
      request?.userName ||
      request?.name ||
      request?.user?.name ||
      "مستخدم"
    );
  }

  function getBloodType(
    request
  ) {
    return (
      request?.bloodType ||
      request?.bloodGroup ||
      ""
    );
  }

  function getMedicineName(
    request
  ) {
    return (
      request?.medicineName ||
      request?.medicine?.name ||
      request?.name ||
      ""
    );
  }

  function getUnits(
    request
  ) {
    return (
      request?.units ??
      request?.quantity ??
      ""
    );
  }

  function getUrgency(
    request
  ) {
    return (
      request?.urgency ||
      request?.priority ||
      ""
    );
  }

  function getNotes(
    request
  ) {
    return (
      request?.notes ||
      request?.description ||
      ""
    );
  }

  function getRequestDate(
    request
  ) {
    const value =
      request?.createdAt ||
      request?.createdDate ||
      request?.date ||
      request?.requestedAt;

    if (!value) {
      return "";
    }

    try {
      return new Date(
        value
      ).toLocaleString(
        "ar-EG",
        {
          dateStyle:
            "medium",
          timeStyle:
            "short",
        }
      );
    } catch {
      return String(value);
    }
  }

  // ============================================================
  // Loading
  // ============================================================

  if (loading) {
    return (
      <div
        style={{
          ...styles.page,
          ...(isDark
            ? styles.pageDark
            : {}),
        }}
      >
        <div
          style={{
            ...styles.loadingCard,
            ...(isDark
              ? styles.loadingCardDark
              : {}),
          }}
        >
          <div
            style={{
              ...styles.loadingIcon,
              ...(isDark
                ? styles.loadingIconDark
                : {}),
            }}
          >
            🏥
          </div>

          <h2
            style={{
              ...styles.loadingTitle,
              ...(isDark
                ? styles.darkText
                : {}),
            }}
          >
            جاري تحميل لوحة التحكم
          </h2>

          <p
            style={{
              ...styles.loadingText,
              ...(isDark
                ? styles.secondaryTextDark
                : {}),
            }}
          >
            برجاء الانتظار...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // Error
  // ============================================================

  if (error) {
    return (
      <div
        style={{
          ...styles.page,
          ...(isDark
            ? styles.pageDark
            : {}),
        }}
      >
        <div
          style={{
            ...styles.errorCard,
            ...(isDark
              ? styles.errorCardDark
              : {}),
          }}
        >
          <div
            style={{
              ...styles.errorIcon,
              ...(isDark
                ? styles.errorIconDark
                : {}),
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              ...styles.errorTitle,
              ...(isDark
                ? styles.darkText
                : {}),
            }}
          >
            تعذر تحميل البيانات
          </h2>

          <p
            style={{
              ...styles.errorText,
              ...(isDark
                ? styles.secondaryTextDark
                : {}),
            }}
          >
            {error}
          </p>

          <button
            type="button"
            onClick={
              loadMedicalDashboard
            }
            style={{
              ...styles.retryButton,
              ...(isDark
                ? styles.retryButtonDark
                : {}),
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // Dashboard
  // ============================================================

  return (
    <div
      dir="rtl"
      style={{
        ...styles.page,
        ...(isDark
          ? styles.pageDark
          : {}),
      }}
    >
      <div
        style={
          styles.container
        }
      >

        {/* =========================
            Top Icons Bar
        ========================= */}

        <div
          style={{
            ...styles.topBar,
            ...(isDark
              ? styles.topBarDark
              : {}),
          }}
        >
          <div
            style={
              styles.topBarRight
            }
          >
            <div
              style={{
                ...styles.topBarBrandIcon,
                ...(isDark
                  ? styles.topBarBrandIconDark
                  : {}),
              }}
            >
              <MedicalBrandIcon />
            </div>

            <div
              style={
                styles.topBarBrandContent
              }
            >
              <span
                style={
                  styles.topBarBrandText
                }
              >
                نبض الأمل
              </span>

              <span
                style={{
                  ...styles.topBarBrandSubText,
                  ...(isDark
                    ? styles.topBarBrandSubTextDark
                    : {}),
                }}
              >
                لوحة الجهة الطبية
              </span>
            </div>
          </div>

          <div
            style={
              styles.topBarIcons
            }
          >

            <button
              type="button"
              title="الإشعارات"
              aria-label="الإشعارات"
              onClick={
                handleNotifications
              }
              style={{
                ...styles.topBarIconBtn,
                ...(isDark
                  ? styles.topBarIconBtnDark
                  : {}),
              }}
            >
              <BellIcon />
            </button>

            <button
              type="button"
              title={
                isDark
                  ? "الوضع الفاتح"
                  : "الوضع الداكن"
              }
              aria-label={
                isDark
                  ? "الوضع الفاتح"
                  : "الوضع الداكن"
              }
              onClick={
                toggleTheme
              }
              style={{
                ...styles.topBarIconBtn,
                ...(isDark
                  ? styles.topBarIconBtnDark
                  : {}),
              }}
            >
              {isDark ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            <button
              type="button"
              title="تسجيل الخروج"
              aria-label="تسجيل الخروج"
              onClick={
                handleLogout
              }
              style={{
                ...styles.topBarIconBtn,
                ...styles.topBarLogout,
                ...(isDark
                  ? styles.topBarLogoutDark
                  : {}),
              }}
            >
              <LogoutIcon />
            </button>

          </div>
        </div>

        {/* =========================
            Header
        ========================= */}

        <div
          style={
            styles.header
          }
        >
          <div>
            <p
              style={
                styles.welcome
              }
            >
              لوحة التحكم
            </p>

            <h1
              style={
                styles.title
              }
            >
              {entity?.name ||
                "الجهة الطبية"}
            </h1>

            <p
              style={
                styles.subtitle
              }
            >
              {getEntityTypeLabel()}
            </p>
          </div>

          <div
            style={
              styles.entityIcon
            }
          >
            {user?.medicalEntityType ===
            "pharmacy"
              ? "💊"
              : user?.medicalEntityType ===
                "blood_center"
              ? "🩸"
              : "🏥"}
          </div>
        </div>

        {/* =========================
            Entity Information
        ========================= */}

        <section
          style={
            styles.section
          }
        >
          <h2
            style={{
              ...styles.sectionTitle,
              ...(isDark
                ? styles.darkText
                : {}),
            }}
          >
            بيانات الجهة
          </h2>

          <div
            style={{
              ...styles.infoCard,
              ...(isDark
                ? styles.infoCardDark
                : {}),
            }}
          >
            <InfoRow
              icon="🏢"
              label="اسم الجهة"
              value={
                entity?.name ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="📧"
              label="البريد الإلكتروني"
              value={
                entity?.email ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="📞"
              label="رقم الهاتف"
              value={
                entity?.phone ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="📄"
              label="رقم الترخيص"
              value={
                entity?.licenseNumber ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="📍"
              label="العنوان"
              value={
                entity?.address ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="📌"
              label="المحافظة / المدينة"
              value={
                [
                  entity?.governorate,
                  entity?.city,
                ]
                  .filter(Boolean)
                  .join(" - ") ||
                "غير متوفر"
              }
              isDark={isDark}
            />
          </div>
        </section>

        {/* =========================
            Account Information
        ========================= */}

        <section
          style={
            styles.section
          }
        >
          <h2
            style={{
              ...styles.sectionTitle,
              ...(isDark
                ? styles.darkText
                : {}),
            }}
          >
            بيانات الحساب
          </h2>

          <div
            style={{
              ...styles.infoCard,
              ...(isDark
                ? styles.infoCardDark
                : {}),
            }}
          >
            <InfoRow
              icon="👤"
              label="اسم المسؤول"
              value={
                user?.name ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="✉️"
              label="بريد الحساب"
              value={
                user?.email ||
                "غير متوفر"
              }
              isDark={isDark}
            />

            <InfoRow
              icon="🔐"
              label="نوع الحساب"
              value="حساب جهة طبية"
              isDark={isDark}
            />
          </div>
        </section>

        {/* =========================
            Requests
        ========================= */}

        <section
          style={
            styles.section
          }
        >
          <div
            style={
              styles.requestsHeader
            }
          >
            <div>
              <h2
                style={{
                  ...styles.sectionTitle,
                  ...(isDark
                    ? styles.darkText
                    : {}),
                }}
              >
                الطلبات
              </h2>

              <p
                style={{
                  ...styles.requestsCount,
                  ...(isDark
                    ? styles.secondaryTextDark
                    : {}),
                }}
              >
                إجمالي الطلبات:{" "}
                <strong
                  style={
                    isDark
                      ? styles.darkText
                      : {}
                  }
                >
                  {requests.length}
                </strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadMedicalRequests(
                  user?.medicalEntityType,
                  user?.medicalEntityId
                )
              }
              disabled={
                requestsLoading
              }
              style={{
                ...styles.refreshButton,
                ...(isDark
                  ? styles.refreshButtonDark
                  : {}),
              }}
            >
              {requestsLoading
                ? "جاري التحديث..."
                : "تحديث"}
            </button>
          </div>

          {requestsError && (
            <div
              style={{
                ...styles.requestsError,
                ...(isDark
                  ? styles.requestsErrorDark
                  : {}),
              }}
            >
              {requestsError}
            </div>
          )}

          {requestsLoading &&
          requests.length === 0 ? (
            <div
              style={{
                ...styles.emptyCard,
                ...(isDark
                  ? styles.emptyCardDark
                  : {}),
              }}
            >
              <div
                style={{
                  ...styles.emptyIcon,
                  ...(isDark
                    ? styles.emptyIconDark
                    : {}),
                }}
              >
                ⏳
              </div>

              <h3
                style={{
                  ...styles.emptyTitle,
                  ...(isDark
                    ? styles.darkText
                    : {}),
                }}
              >
                جاري تحميل الطلبات
              </h3>

              <p
                style={{
                  ...styles.emptyText,
                  ...(isDark
                    ? styles.secondaryTextDark
                    : {}),
                }}
              >
                برجاء الانتظار...
              </p>
            </div>
          ) : requests.length ===
            0 ? (
            <div
              style={{
                ...styles.emptyCard,
                ...(isDark
                  ? styles.emptyCardDark
                  : {}),
              }}
            >
              <div
                style={{
                  ...styles.emptyIcon,
                  ...(isDark
                    ? styles.emptyIconDark
                    : {}),
                }}
              >
                📋
              </div>

              <h3
                style={{
                  ...styles.emptyTitle,
                  ...(isDark
                    ? styles.darkText
                    : {}),
                }}
              >
                لا توجد طلبات حتى الآن
              </h3>

              <p
                style={{
                  ...styles.emptyText,
                  ...(isDark
                    ? styles.secondaryTextDark
                    : {}),
                }}
              >
                سيتم عرض الطلبات الخاصة
                بجهتك الطبية هنا عند وصولها.
              </p>
            </div>
          ) : (
            <div
              style={
                styles.requestsList
              }
            >
              {requests.map(
                (request) => (
                  <RequestCard
                    key={
                      request.id
                    }
                    request={
                      request
                    }
                    user={
                      user
                    }
                    isDark={
                      isDark
                    }
                    updatingRequestId={
                      updatingRequestId
                    }
                    statusOptions={
                      getStatusOptions()
                    }
                    onStatusChange={
                      updateRequestStatus
                    }
                    getRequestTypeLabel={
                      getRequestTypeLabel
                    }
                    getRequestIcon={
                      getRequestIcon
                    }
                    getStatusStyle={
                      getStatusStyle
                    }
                    getRequesterName={
                      getRequesterName
                    }
                    getBloodType={
                      getBloodType
                    }
                    getMedicineName={
                      getMedicineName
                    }
                    getUnits={
                      getUnits
                    }
                    getUrgency={
                      getUrgency
                    }
                    getNotes={
                      getNotes
                    }
                    getRequestDate={
                      getRequestDate
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* =========================
            Status
        ========================= */}

        <section
          style={
            styles.section
          }
        >
          <div
            style={{
              ...styles.verifiedCard,
              ...(isDark
                ? styles.verifiedCardDark
                : {}),
            }}
          >
            <div
              style={
                styles.verifiedIcon
              }
            >
              ✓
            </div>

            <div>
              <h3
                style={{
                  ...styles.verifiedTitle,
                  ...(isDark
                    ? styles.darkText
                    : {}),
                }}
              >
                جهة طبية معتمدة
              </h3>

              <p
                style={{
                  ...styles.verifiedText,
                  ...(isDark
                    ? styles.secondaryTextDark
                    : {}),
                }}
              >
                هذه الجهة تمت إضافتها واعتمادها
                من إدارة منصة نبض الأمل.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ============================================================
// SVG Icons
// ============================================================

function BellIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 8C18 4.686 15.761 2 12 2C8.239 2 6 4.686 6 8C6 13 4 15 4 16.5C4 17.328 4.672 18 5.5 18H18.5C19.328 18 20 17.328 20 16.5C20 15 18 13 18 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 21C10.133 21.622 11.017 22 12 22C12.983 22 13.867 21.622 14.5 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.5 15.5C19.58 15.82 18.59 16 17.56 16C12.28 16 8 11.72 8 6.44C8 5.41 8.18 4.42 8.5 3.5C4.7 4.8 2 8.4 2 12.63C2 18.05 6.39 22.44 11.81 22.44C16.04 22.44 19.64 19.74 20.94 15.94C20.8 15.78 20.65 15.64 20.5 15.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 2V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M12 20V22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4.93 4.93L6.34 6.34"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M17.66 17.66L19.07 19.07"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M2 12H4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M20 12H22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4.93 19.07L6.34 17.66"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 5V4.5C10 3.672 10.672 3 11.5 3H18.5C19.328 3 20 3.672 20 4.5V19.5C20 20.328 19.328 21 18.5 21H11.5C10.672 21 10 20.328 10 19.5V19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M3 12H14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M10 8L14 12L10 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MedicalBrandIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 4 16.5 4 10.2C4 6.8 6.3 4.5 9.1 4.5C10.5 4.5 11.6 5.1 12 6.1C12.4 5.1 13.5 4.5 14.9 4.5C17.7 4.5 20 6.8 20 10.2C20 16.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9.5 11.5H14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ============================================================
// Request Card
// ============================================================

function RequestCard({
  request,
  user,
  isDark,
  updatingRequestId,
  statusOptions,
  onStatusChange,
  getRequestTypeLabel,
  getRequestIcon,
  getStatusStyle,
  getRequesterName,
  getBloodType,
  getMedicineName,
  getUnits,
  getUrgency,
  getNotes,
  getRequestDate,
}) {
  const bloodType =
    getBloodType(
      request
    );

  const medicineName =
    getMedicineName(
      request
    );

  const units =
    getUnits(
      request
    );

  const urgency =
    getUrgency(
      request
    );

  const notes =
    getNotes(
      request
    );

  const requestDate =
    getRequestDate(
      request
    );

  const isUpdating =
    updatingRequestId ===
    request.id;

  return (
    <div
      style={{
        ...styles.requestCard,
        ...(isDark
          ? styles.requestCardDark
          : {}),
      }}
    >

      <div
        style={
          styles.requestTop
        }
      >
        <div
          style={
            styles.requestTitleArea
          }
        >
          <div
            style={{
              ...styles.requestIcon,
              ...(isDark
                ? styles.requestIconDark
                : {}),
            }}
          >
            {getRequestIcon()}
          </div>

          <div>
            <h3
              style={{
                ...styles.requestTitle,
                ...(isDark
                  ? styles.darkText
                  : {}),
              }}
            >
              {getRequestTypeLabel(
                request
              )}
            </h3>

            <p
              style={{
                ...styles.requestId,
                ...(isDark
                  ? styles.secondaryTextDark
                  : {}),
              }}
            >
              رقم الطلب:{" "}
              {request.id ||
                "غير متوفر"}
            </p>
          </div>
        </div>

        <span
          style={{
            ...styles.statusBadge,
            ...getStatusStyle(
              request.status
            ),
          }}
        >
          {request.status ||
            "قيد الانتظار"}
        </span>
      </div>

      <div
        style={
          styles.requestInfo
        }
      >
        <RequestInfo
          icon="👤"
          label="صاحب الطلب"
          value={
            getRequesterName(
              request
            )
          }
          isDark={isDark}
        />

        {user?.medicalEntityType !==
          "pharmacy" &&
          bloodType && (
            <RequestInfo
              icon="🩸"
              label="فصيلة الدم"
              value={
                bloodType
              }
              isDark={isDark}
            />
          )}

        {user?.medicalEntityType ===
          "pharmacy" &&
          medicineName && (
            <RequestInfo
              icon="💊"
              label="الدواء"
              value={
                medicineName
              }
              isDark={isDark}
            />
          )}

        {units !== "" &&
          units !== null &&
          units !== undefined && (
            <RequestInfo
              icon="🔢"
              label="الكمية / الوحدات"
              value={
                String(
                  units
                )
              }
              isDark={isDark}
            />
          )}

        {urgency && (
          <RequestInfo
            icon="🚨"
            label="درجة الاستعجال"
            value={
              urgency
            }
            isDark={isDark}
          />
        )}

        {requestDate && (
          <RequestInfo
            icon="🕒"
            label="تاريخ الطلب"
            value={
              requestDate
            }
            isDark={isDark}
          />
        )}
      </div>

      {notes && (
        <div
          style={{
            ...styles.notesBox,
            ...(isDark
              ? styles.notesBoxDark
              : {}),
          }}
        >
          <span
            style={{
              ...styles.notesLabel,
              ...(isDark
                ? styles.secondaryTextDark
                : {}),
            }}
          >
            ملاحظات
          </span>

          <p
            style={{
              ...styles.notesText,
              ...(isDark
                ? styles.darkText
                : {}),
            }}
          >
            {notes}
          </p>
        </div>
      )}

      <div
        style={{
          ...styles.statusSection,
          ...(isDark
            ? styles.statusSectionDark
            : {}),
        }}
      >
        <label
          style={{
            ...styles.statusLabel,
            ...(isDark
              ? styles.darkText
              : {}),
          }}
        >
          تحديث حالة الطلب
        </label>

        <select
          value={
            request.status ||
            ""
          }
          onChange={(event) =>
            onStatusChange(
              request.id,
              event.target.value
            )
          }
          disabled={
            isUpdating
          }
          style={{
            ...styles.statusSelect,
            ...(isDark
              ? styles.statusSelectDark
              : {}),
          }}
        >
          <option value="">
            اختر حالة الطلب
          </option>

          {statusOptions.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            )
          )}
        </select>

        {isUpdating && (
          <p
            style={
              styles.updatingText
            }
          >
            جاري تحديث حالة الطلب...
          </p>
        )}
      </div>

    </div>
  );
}

// ============================================================
// Request Info
// ============================================================

function RequestInfo({
  icon,
  label,
  value,
  isDark,
}) {
  return (
    <div
      style={{
        ...styles.requestInfoItem,
        ...(isDark
          ? styles.requestInfoItemDark
          : {}),
      }}
    >
      <div
        style={{
          ...styles.requestInfoIcon,
          ...(isDark
            ? styles.requestInfoIconDark
            : {}),
        }}
      >
        {icon}
      </div>

      <div
        style={
          styles.requestInfoContent
        }
      >
        <span
          style={{
            ...styles.requestInfoLabel,
            ...(isDark
              ? styles.secondaryTextDark
              : {}),
          }}
        >
          {label}
        </span>

        <span
          style={{
            ...styles.requestInfoValue,
            ...(isDark
              ? styles.darkText
              : {}),
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Info Row
// ============================================================

function InfoRow({
  icon,
  label,
  value,
  isDark,
}) {
  return (
    <div
      style={{
        ...styles.infoRow,
        ...(isDark
          ? styles.infoRowDark
          : {}),
      }}
    >
      <div
        style={{
          ...styles.infoIcon,
          ...(isDark
            ? styles.infoIconDark
            : {}),
        }}
      >
        {icon}
      </div>

      <div
        style={
          styles.infoContent
        }
      >
        <span
          style={{
            ...styles.infoLabel,
            ...(isDark
              ? styles.secondaryTextDark
              : {}),
          }}
        >
          {label}
        </span>

        <span
          style={{
            ...styles.infoValue,
            ...(isDark
              ? styles.darkText
              : {}),
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f4fffd 0%, #ffffff 55%, #f8fffe 100%)",
    padding: "14px 14px 80px",
    fontFamily:
      "Tajawal, Arial, sans-serif",
    color: "#17332e",
    boxSizing: "border-box",
    transition:
      "background .25s ease, color .25s ease",
  },

  pageDark: {
    background:
      "linear-gradient(180deg, #081714 0%, #0d211d 52%, #091815 100%)",
    color: "#eefaf7",
  },

  darkText: {
    color: "#eefaf7",
  },

  secondaryTextDark: {
    color: "#9ab7b1",
  },

  container: {
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  // ==========================================================
  // Top Bar
  // ==========================================================

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "14px",
    padding: "9px 10px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #0aa88f 0%, #078b7b 52%, #066f66 100%)",
    border:
      "1px solid rgba(255,255,255,0.18)",
    boxShadow:
      "0 10px 24px rgba(8, 139, 123, 0.18)",
    boxSizing: "border-box",
    transition:
      "background .25s ease, box-shadow .25s ease",
  },

  topBarDark: {
    background:
      "linear-gradient(135deg, #123f38 0%, #0d342f 52%, #092a27 100%)",
    border:
      "1px solid rgba(126, 196, 184, 0.16)",
    boxShadow:
      "0 10px 24px rgba(0, 0, 0, 0.22)",
  },

  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    minWidth: 0,
  },

  topBarBrandIcon: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "13px",
    background:
      "rgba(255,255,255,0.16)",
    border:
      "1px solid rgba(255,255,255,0.18)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.12)",
  },

  topBarBrandIconDark: {
    background:
      "rgba(126, 229, 211, 0.12)",
    border:
      "1px solid rgba(126, 229, 211, 0.16)",
  },

  topBarBrandContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    minWidth: 0,
  },

  topBarBrandText: {
    fontWeight: 900,
    fontSize: "14px",
    color: "#ffffff",
    lineHeight: 1.25,
  },

  topBarBrandSubText: {
    fontWeight: 500,
    fontSize: "9px",
    color:
      "rgba(255,255,255,0.78)",
    lineHeight: 1.3,
  },

  topBarBrandSubTextDark: {
    color:
      "rgba(220,250,245,0.68)",
  },

  topBarIcons: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    flexShrink: 0,
  },

  topBarIconBtn: {
    width: "39px",
    height: "39px",
    borderRadius: "13px",
    border:
      "1px solid rgba(255,255,255,0.22)",
    background:
      "rgba(255,255,255,0.13)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.10)",
    position: "relative",
    padding: 0,
    flexShrink: 0,
    transition:
      "background .2s ease, border .2s ease, transform .15s ease",
  },

  topBarIconBtnDark: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(126,196,184,0.18)",
    color: "#b5f0e5",
  },

  topBarLogout: {
    color: "#ffffff",
    border:
      "1px solid rgba(255,255,255,0.20)",
    background:
      "rgba(220, 38, 38, 0.20)",
  },

  topBarLogoutDark: {
    color: "#ffb5b5",
    border:
      "1px solid rgba(255,120,120,0.20)",
    background:
      "rgba(220, 38, 38, 0.18)",
  },

  // ==========================================================
  // Header
  // ==========================================================

  header: {
    background:
      "linear-gradient(135deg, #12aa95 0%, #07917f 100%)",
    borderRadius: "22px",
    padding: "16px 18px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    boxShadow:
      "0 10px 24px rgba(8, 150, 130, 0.18)",
    marginBottom: "20px",
    minHeight: "100px",
    boxSizing: "border-box",
  },

  welcome: {
    margin: "0 0 2px",
    fontSize: "11px",
    fontWeight: 600,
    opacity: 0.92,
    lineHeight: 1.4,
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 900,
    lineHeight: 1.2,
    letterSpacing: "-0.3px",
  },

  subtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    fontWeight: 600,
    opacity: 0.94,
  },

  entityIcon: {
    width: "56px",
    height: "56px",
    minWidth: "56px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.18)",
    border:
      "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.10)",
  },

  // ==========================================================
  // Sections
  // ==========================================================

  section: {
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: "0 0 10px",
    padding: "0 2px",
    fontSize: "17px",
    fontWeight: 900,
    color: "#17332e",
    lineHeight: 1.4,
  },

  // ==========================================================
  // Information Cards
  // ==========================================================

  infoCard: {
    background: "#ffffff",
    border:
      "1px solid rgba(173, 215, 208, 0.42)",
    borderRadius: "20px",
    padding: "2px 14px",
    boxShadow:
      "0 8px 22px rgba(23, 70, 63, 0.05)",
    overflow: "hidden",
    boxSizing: "border-box",
    transition:
      "background .25s ease, border .25s ease, box-shadow .25s ease",
  },

  infoCardDark: {
    background: "#122823",
    border:
      "1px solid rgba(102, 157, 147, 0.20)",
    boxShadow:
      "0 10px 24px rgba(0, 0, 0, 0.20)",
  },

  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "11px",
    padding: "11px 0",
    minHeight: "55px",
    borderBottom:
      "1px solid #edf3f2",
    boxSizing: "border-box",
  },

  infoRowDark: {
    borderBottom:
      "1px solid rgba(142, 183, 174, 0.12)",
  },

  infoIcon: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "12px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    boxShadow:
      "0 2px 8px rgba(10, 168, 143, 0.04)",
  },

  infoIconDark: {
    background:
      "rgba(10, 168, 143, 0.16)",
    boxShadow:
      "0 3px 10px rgba(0, 0, 0, 0.12)",
  },

  infoContent: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    alignItems: "flex-start",
  },

  infoLabel: {
    fontSize: "11px",
    color: "#71827f",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  infoValue: {
    fontSize: "14px",
    fontWeight: 800,
    color: "#17332e",
    overflowWrap: "anywhere",
    lineHeight: 1.45,
  },

  // ==========================================================
  // Requests Header
  // ==========================================================

  requestsHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "10px",
  },

  requestsCount: {
    margin: "-4px 4px 0 0",
    color: "#7a8986",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  refreshButton: {
    border: "none",
    background: "#e6f7f4",
    color: "#078876",
    padding: "9px 15px",
    minHeight: "40px",
    borderRadius: "13px",
    fontFamily:
      "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 3px 10px rgba(10, 168, 143, 0.06)",
  },

  refreshButtonDark: {
    background:
      "rgba(10, 168, 143, 0.16)",
    color: "#73e2cf",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.14)",
    border:
      "1px solid rgba(10, 168, 143, 0.16)",
  },

  requestsError: {
    background: "#fff5f5",
    border:
      "1px solid #f3cccc",
    color: "#a33b3b",
    borderRadius: "14px",
    padding: "10px 12px",
    marginBottom: "12px",
    fontSize: "12px",
    lineHeight: 1.7,
  },

  requestsErrorDark: {
    background:
      "rgba(127, 29, 29, 0.22)",
    border:
      "1px solid rgba(248, 113, 113, 0.22)",
    color: "#ffb4b4",
  },

  // ==========================================================
  // Requests
  // ==========================================================

  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
  },

  requestCard: {
    background: "#ffffff",
    border:
      "1px solid rgba(173, 215, 208, 0.42)",
    borderRadius: "20px",
    padding: "14px",
    boxShadow:
      "0 7px 20px rgba(23, 70, 63, 0.05)",
    boxSizing: "border-box",
    transition:
      "background .25s ease, border .25s ease, box-shadow .25s ease",
  },

  requestCardDark: {
    background: "#122823",
    border:
      "1px solid rgba(102, 157, 147, 0.20)",
    boxShadow:
      "0 10px 24px rgba(0, 0, 0, 0.20)",
  },

  requestTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "12px",
  },

  requestTitleArea: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    minWidth: 0,
    flex: 1,
  },

  requestIcon: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    borderRadius: "13px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  requestIconDark: {
    background:
      "rgba(10, 168, 143, 0.16)",
  },

  requestTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 900,
    color: "#17332e",
    lineHeight: 1.4,
  },

  requestId: {
    margin: "2px 0 0",
    color: "#788884",
    fontSize: "10px",
    lineHeight: 1.5,
  },

  statusBadge: {
    borderRadius: "999px",
    padding: "5px 9px",
    fontSize: "9px",
    fontWeight: 900,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  statusPending: {
    background: "#fff7df",
    color: "#9b7200",
  },

  statusPendingDark: {
    background:
      "rgba(154, 114, 0, 0.20)",
    color: "#f4d875",
  },

  statusProgress: {
    background: "#edf7ff",
    color: "#23648e",
  },

  statusProgressDark: {
    background:
      "rgba(35, 100, 142, 0.22)",
    color: "#8cccf2",
  },

  statusSuccess: {
    background: "#e6f7f4",
    color: "#078876",
  },

  statusSuccessDark: {
    background:
      "rgba(10, 168, 143, 0.18)",
    color: "#6fe0cd",
  },

  statusDanger: {
    background: "#fff0f0",
    color: "#b13b3b",
  },

  statusDangerDark: {
    background:
      "rgba(177, 59, 59, 0.20)",
    color: "#ffaaaa",
  },

  // ==========================================================
  // Request Information
  // ==========================================================

  requestInfo: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "7px",
    marginBottom: "10px",
  },

  requestInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "#f8fcfb",
    border:
      "1px solid #eef5f3",
    borderRadius: "12px",
    padding: "8px",
    minWidth: 0,
    boxSizing: "border-box",
  },

  requestInfoItemDark: {
    background:
      "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(142, 183, 174, 0.12)",
  },

  requestInfoIcon: {
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "9px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
  },

  requestInfoIconDark: {
    background:
      "rgba(10, 168, 143, 0.15)",
  },

  requestInfoContent: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },

  requestInfoLabel: {
    color: "#788884",
    fontSize: "8px",
    lineHeight: 1.4,
  },

  requestInfoValue: {
    color: "#17332e",
    fontSize: "11px",
    fontWeight: 900,
    overflowWrap: "anywhere",
    lineHeight: 1.45,
  },

  // ==========================================================
  // Notes
  // ==========================================================

  notesBox: {
    background:
      "linear-gradient(135deg, #f7fcfb 0%, #f1faf8 100%)",
    border:
      "1px solid #e7f1ef",
    borderRadius: "13px",
    padding: "10px 11px",
    marginBottom: "11px",
  },

  notesBoxDark: {
    background:
      "linear-gradient(135deg, #162e29 0%, #132923 100%)",
    border:
      "1px solid rgba(142, 183, 174, 0.13)",
  },

  notesLabel: {
    display: "block",
    color: "#71827f",
    fontSize: "10px",
    marginBottom: "4px",
    fontWeight: 700,
  },

  notesText: {
    margin: 0,
    color: "#17332e",
    fontSize: "11px",
    lineHeight: 1.7,
  },

  // ==========================================================
  // Status Update
  // ==========================================================

  statusSection: {
    borderTop:
      "1px solid #edf3f2",
    paddingTop: "12px",
  },

  statusSectionDark: {
    borderTop:
      "1px solid rgba(142, 183, 174, 0.12)",
  },

  statusLabel: {
    display: "block",
    marginBottom: "6px",
    color: "#17332e",
    fontSize: "11px",
    fontWeight: 900,
  },

  statusSelect: {
    width: "100%",
    minHeight: "42px",
    border:
      "1px solid #dceae7",
    background: "#ffffff",
    color: "#17332e",
    borderRadius: "12px",
    padding: "9px 11px",
    fontFamily:
      "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  statusSelectDark: {
    border:
      "1px solid rgba(142, 183, 174, 0.20)",
    background: "#0d1f1b",
    color: "#eefaf7",
  },

  updatingText: {
    margin: "6px 0 0",
    color: "#078876",
    fontSize: "10px",
  },

  // ==========================================================
  // Empty State
  // ==========================================================

  emptyCard: {
    background: "#ffffff",
    border:
      "1px dashed #cbdeda",
    borderRadius: "20px",
    padding: "30px 18px",
    textAlign: "center",
    boxShadow:
      "0 5px 16px rgba(23, 70, 63, 0.025)",
  },

  emptyCardDark: {
    background: "#122823",
    border:
      "1px dashed rgba(126, 196, 184, 0.22)",
    boxShadow:
      "0 8px 20px rgba(0, 0, 0, 0.16)",
  },

  emptyIcon: {
    width: "56px",
    height: "56px",
    margin: "0 auto 10px",
    borderRadius: "18px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
  },

  emptyIconDark: {
    background:
      "rgba(10, 168, 143, 0.15)",
  },

  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "15px",
    fontWeight: 900,
    color: "#17332e",
  },

  emptyText: {
    margin: 0,
    color: "#788884",
    fontSize: "12px",
    lineHeight: 1.7,
  },

  // ==========================================================
  // Verified Card
  // ==========================================================

  verifiedCard: {
    background:
      "linear-gradient(135deg, #eaf9f6 0%, #e0f6f2 100%)",
    border:
      "1px solid #c8ebe4",
    borderRadius: "18px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    boxShadow:
      "0 6px 18px rgba(10, 168, 143, 0.06)",
  },

  verifiedCardDark: {
    background:
      "linear-gradient(135deg, #15342e 0%, #122b26 100%)",
    border:
      "1px solid rgba(10, 168, 143, 0.20)",
    boxShadow:
      "0 8px 20px rgba(0, 0, 0, 0.18)",
  },

  verifiedIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "50%",
    background: "#0aa88f",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 900,
    boxShadow:
      "0 4px 10px rgba(10, 168, 143, 0.18)",
  },

  verifiedTitle: {
    margin: "0 0 3px",
    fontSize: "14px",
    fontWeight: 900,
    color: "#17332e",
  },

  verifiedText: {
    margin: 0,
    color: "#55706a",
    fontSize: "11px",
    lineHeight: 1.6,
  },

  // ==========================================================
  // Loading
  // ==========================================================

  loadingCard: {
    width: "calc(100% - 28px)",
    maxWidth: "420px",
    margin: "80px auto",
    background: "#ffffff",
    border:
      "1px solid #e5efed",
    borderRadius: "22px",
    padding: "32px 20px",
    textAlign: "center",
    boxShadow:
      "0 10px 26px rgba(23, 51, 46, 0.08)",
    boxSizing: "border-box",
  },

  loadingCardDark: {
    background: "#122823",
    border:
      "1px solid rgba(126, 196, 184, 0.16)",
    boxShadow:
      "0 10px 28px rgba(0, 0, 0, 0.24)",
  },

  loadingIcon: {
    width: "60px",
    height: "60px",
    margin: "0 auto 12px",
    borderRadius: "18px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },

  loadingIconDark: {
    background:
      "rgba(10, 168, 143, 0.15)",
  },

  loadingTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 900,
  },

  loadingText: {
    margin: "6px 0 0",
    color: "#6b7c79",
    fontSize: "12px",
  },

  // ==========================================================
  // Error
  // ==========================================================

  errorCard: {
    width: "calc(100% - 28px)",
    maxWidth: "420px",
    margin: "80px auto",
    background: "#ffffff",
    border:
      "1px solid #f0dada",
    borderRadius: "22px",
    padding: "32px 20px",
    textAlign: "center",
    boxShadow:
      "0 10px 26px rgba(23, 51, 46, 0.08)",
    boxSizing: "border-box",
  },

  errorCardDark: {
    background: "#122823",
    border:
      "1px solid rgba(248, 113, 113, 0.18)",
    boxShadow:
      "0 10px 28px rgba(0, 0, 0, 0.24)",
  },

  errorIcon: {
    width: "60px",
    height: "60px",
    margin: "0 auto 12px",
    borderRadius: "18px",
    background: "#fff0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },

  errorIconDark: {
    background:
      "rgba(177, 59, 59, 0.18)",
  },

  errorTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 900,
  },

  errorText: {
    margin: "8px 0 16px",
    color: "#6b7c79",
    lineHeight: 1.7,
    fontSize: "12px",
  },

  retryButton: {
    border: "none",
    background: "#0aa88f",
    color: "#ffffff",
    padding: "11px 22px",
    minHeight: "42px",
    borderRadius: "13px",
    fontFamily:
      "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  retryButtonDark: {
    background:
      "linear-gradient(135deg, #0aa88f, #078876)",
    boxShadow:
      "0 6px 16px rgba(10, 168, 143, 0.18)",
  },
};

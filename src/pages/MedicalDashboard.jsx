import React, {
  useEffect,
  useState,
} from "react";

import { api } from "../api.js";

export default function MedicalDashboard() {
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
// ============================================================
// Logout
// ============================================================

const handleLogout = () => {
  try {
    localStorage.removeItem("nabd_user");
    localStorage.removeItem("nabd_remember");
    sessionStorage.clear();
    window.location.replace("/login");
  } catch (err) {
    window.location.replace("/login");
  }
};
  useEffect(() => {
    loadMedicalDashboard();
  }, []);

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
      return styles.statusSuccess;
    }

    if (
      value ===
        "تم الرفض" ||
      value ===
        "تم الإلغاء"
    ) {
      return styles.statusDanger;
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
      return styles.statusProgress;
    }

    return styles.statusPending;
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
      <div style={styles.page}>
        <div
          style={
            styles.loadingCard
          }
        >
          <div
            style={
              styles.loadingIcon
            }
          >
            🏥
          </div>

          <h2
            style={
              styles.loadingTitle
            }
          >
            جاري تحميل لوحة التحكم
          </h2>

          <p
            style={
              styles.loadingText
            }
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
      <div style={styles.page}>
        <div
          style={
            styles.errorCard
          }
        >
          <div
            style={
              styles.errorIcon
            }
          >
            ⚠️
          </div>

          <h2
            style={
              styles.errorTitle
            }
          >
            تعذر تحميل البيانات
          </h2>

          <p
            style={
              styles.errorText
            }
          >
            {error}
          </p>

          <button
            type="button"
            onClick={
              loadMedicalDashboard
            }
            style={
              styles.retryButton
            }
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
    style={styles.page}
  >
    <div
      style={
        styles.container
      }
    >

      {/* =========================
          Top Bar with Icons
      ========================= */}

      <div style={styles.topBar}>

        <div style={styles.topBarRight}>
          <div style={styles.topBarBrandIcon}>
            🏥
          </div>
          <span style={styles.topBarBrandText}>
            نبض الأمل
          </span>
        </div>

        <div style={styles.topBarIcons}>

          {/* بروفايل */}
          <button
            type="button"
            style={styles.topBarAvatar}
            title="الملف الشخصي"
          >
            {(user?.name || "م")
              .charAt(0)
              .toUpperCase()}
          </button>

          {/* الإشعارات */}
          <button
            type="button"
            style={styles.topBarIconBtn}
            title="الإشعارات"
          >
            <svg
              width="20"
              height="20"
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
            <span style={styles.topBarNotificationDot} />
          </button>

          {/* تسجيل الخروج */}
          <button
            type="button"
            style={{
              ...styles.topBarIconBtn,
              ...styles.topBarLogout,
            }}
            title="تسجيل الخروج"
            onClick={handleLogout}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10 5H6.5C5.67 5 5 5.67 5 6.5V17.5C5 18.33 5.67 19 6.5 19H10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M13 8L17 12L13 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 12H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
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
            style={
              styles.sectionTitle
            }
          >
            بيانات الجهة
          </h2>

          <div
            style={
              styles.infoCard
            }
          >
            <InfoRow
              icon="🏢"
              label="اسم الجهة"
              value={
                entity?.name ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="📧"
              label="البريد الإلكتروني"
              value={
                entity?.email ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="📞"
              label="رقم الهاتف"
              value={
                entity?.phone ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="📄"
              label="رقم الترخيص"
              value={
                entity?.licenseNumber ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="📍"
              label="العنوان"
              value={
                entity?.address ||
                "غير متوفر"
              }
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
            style={
              styles.sectionTitle
            }
          >
            بيانات الحساب
          </h2>

          <div
            style={
              styles.infoCard
            }
          >
            <InfoRow
              icon="👤"
              label="اسم المسؤول"
              value={
                user?.name ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="✉️"
              label="بريد الحساب"
              value={
                user?.email ||
                "غير متوفر"
              }
            />

            <InfoRow
              icon="🔐"
              label="نوع الحساب"
              value="حساب جهة طبية"
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
                style={
                  styles.sectionTitle
                }
              >
                الطلبات
              </h2>

              <p
                style={
                  styles.requestsCount
                }
              >
                إجمالي الطلبات:{" "}
                <strong>
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
              style={
                styles.refreshButton
              }
            >
              {requestsLoading
                ? "جاري التحديث..."
                : "تحديث"}
            </button>
          </div>

          {requestsError && (
            <div
              style={
                styles.requestsError
              }
            >
              {requestsError}
            </div>
          )}

          {requestsLoading &&
          requests.length === 0 ? (
            <div
              style={
                styles.emptyCard
              }
            >
              <div
                style={
                  styles.emptyIcon
                }
              >
                ⏳
              </div>

              <h3
                style={
                  styles.emptyTitle
                }
              >
                جاري تحميل الطلبات
              </h3>

              <p
                style={
                  styles.emptyText
                }
              >
                برجاء الانتظار...
              </p>
            </div>
          ) : requests.length ===
            0 ? (
            <div
              style={
                styles.emptyCard
              }
            >
              <div
                style={
                  styles.emptyIcon
                }
              >
                📋
              </div>

              <h3
                style={
                  styles.emptyTitle
                }
              >
                لا توجد طلبات حتى الآن
              </h3>

              <p
                style={
                  styles.emptyText
                }
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
            style={
              styles.verifiedCard
            }
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
                style={
                  styles.verifiedTitle
                }
              >
                جهة طبية معتمدة
              </h3>

              <p
                style={
                  styles.verifiedText
                }
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
// Request Card
// ============================================================

function RequestCard({
  request,
  user,
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
      style={
        styles.requestCard
      }
    >

      {/* Request Header */}

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
            style={
              styles.requestIcon
            }
          >
            {getRequestIcon()}
          </div>

          <div>
            <h3
              style={
                styles.requestTitle
              }
            >
              {getRequestTypeLabel(
                request
              )}
            </h3>

            <p
              style={
                styles.requestId
              }
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

      {/* Request Information */}

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
            />
          )}

        {urgency && (
          <RequestInfo
            icon="🚨"
            label="درجة الاستعجال"
            value={
              urgency
            }
          />
        )}

        {requestDate && (
          <RequestInfo
            icon="🕒"
            label="تاريخ الطلب"
            value={
              requestDate
            }
          />
        )}
      </div>

      {/* Notes */}

      {notes && (
        <div
          style={
            styles.notesBox
          }
        >
          <span
            style={
              styles.notesLabel
            }
          >
            ملاحظات
          </span>

          <p
            style={
              styles.notesText
            }
          >
            {notes}
          </p>
        </div>
      )}

      {/* Status Update */}

      <div
        style={
          styles.statusSection
        }
      >
        <label
          style={
            styles.statusLabel
          }
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
          style={
            styles.statusSelect
          }
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
}) {
  return (
    <div
      style={
        styles.requestInfoItem
      }
    >
      <div
        style={
          styles.requestInfoIcon
        }
      >
        {icon}
      </div>

      <div
        style={
          styles.requestInfoContent
        }
      >
        <span
          style={
            styles.requestInfoLabel
          }
        >
          {label}
        </span>

        <span
          style={
            styles.requestInfoValue
          }
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
}) {
  return (
    <div
      style={
        styles.infoRow
      }
    >
      <div
        style={
          styles.infoIcon
        }
      >
        {icon}
      </div>

      <div
        style={
          styles.infoContent
        }
      >
        <span
          style={
            styles.infoLabel
          }
        >
          {label}
        </span>

        <span
          style={
            styles.infoValue
          }
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
    fontFamily: "Tajawal, Arial, sans-serif",
    color: "#17332e",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  // ==========================================================
  // Top Bar (شريط الأيقونات العلوي)
  // ==========================================================

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "14px",
    padding: "0 4px",
  },

  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  topBarBrandIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },

  topBarBrandText: {
    fontWeight: 900,
    fontSize: "14px",
    color: "#17332e",
  },

  topBarIcons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  topBarIconBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "1px solid rgba(173, 215, 208, 0.42)",
    background: "#ffffff",
    color: "#078876",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(23, 70, 63, 0.05)",
    position: "relative",
    padding: 0,
    flexShrink: 0,
  },

  topBarLogout: {
    color: "#dc2626",
    borderColor: "rgba(220, 38, 38, 0.2)",
    background: "rgba(220, 38, 38, 0.06)",
  },

  topBarNotificationDot: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#dc2626",
    border: "2px solid #ffffff",
    boxSizing: "content-box",
  },

  topBarAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #0aa88f, #078876)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: 900,
    cursor: "pointer",
    border: "none",
    boxShadow: "0 4px 12px rgba(10, 168, 143, 0.18)",
    flexShrink: 0,
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

  infoIcon: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "12px",
    background:
      "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    boxShadow:
      "0 2px 8px rgba(10, 168, 143, 0.04)",
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
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 3px 10px rgba(10, 168, 143, 0.06)",
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

  statusProgress: {
    background: "#edf7ff",
    color: "#23648e",
  },

  statusSuccess: {
    background: "#e6f7f4",
    color: "#078876",
  },

  statusDanger: {
    background: "#fff0f0",
    color: "#b13b3b",
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
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
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
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },
};

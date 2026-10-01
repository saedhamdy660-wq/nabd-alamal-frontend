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
    padding: "18px 14px 90px",
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
  // Header
  // ==========================================================

  header: {
    background:
      "linear-gradient(135deg, #12aa95 0%, #07917f 100%)",
    borderRadius: "28px",
    padding: "24px 22px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    boxShadow:
      "0 14px 34px rgba(8, 150, 130, 0.20)",
    marginBottom: "30px",
    minHeight: "150px",
    boxSizing: "border-box",
  },

  welcome: {
    margin: "0 0 5px",
    fontSize: "14px",
    fontWeight: 500,
    opacity: 0.92,
    lineHeight: 1.5,
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 900,
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: "6px 0 0",
    fontSize: "15px",
    fontWeight: 500,
    opacity: 0.94,
  },

  entityIcon: {
    width: "76px",
    height: "76px",
    minWidth: "76px",
    borderRadius: "25px",
    background:
      "rgba(255,255,255,0.18)",
    border:
      "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.10)",
  },

  // ==========================================================
  // Sections
  // ==========================================================

  section: {
    marginBottom: "28px",
  },

  sectionTitle: {
    margin: "0 0 14px",
    padding: "0 4px",
    fontSize: "23px",
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
    borderRadius: "25px",
    padding: "5px 16px",
    boxShadow:
      "0 10px 28px rgba(23, 70, 63, 0.055)",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    minHeight: "67px",
    borderBottom:
      "1px solid #edf3f2",
    boxSizing: "border-box",
  },

  infoIcon: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "16px",
    background:
      "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    boxShadow:
      "0 3px 10px rgba(10, 168, 143, 0.04)",
  },

  infoContent: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "flex-start",
  },

  infoLabel: {
    fontSize: "13px",
    color: "#71827f",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  infoValue: {
    fontSize: "16px",
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
    marginBottom: "14px",
  },

  requestsCount: {
    margin: "-7px 4px 0 0",
    color: "#7a8986",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  refreshButton: {
    border: "none",
    background: "#e6f7f4",
    color: "#078876",
    padding: "11px 18px",
    minHeight: "44px",
    borderRadius: "15px",
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "13px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 4px 12px rgba(10, 168, 143, 0.06)",
  },

  requestsError: {
    background: "#fff5f5",
    border:
      "1px solid #f3cccc",
    color: "#a33b3b",
    borderRadius: "16px",
    padding: "12px 14px",
    marginBottom: "14px",
    fontSize: "13px",
    lineHeight: 1.7,
  },

  // ==========================================================
  // Requests
  // ==========================================================

  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  requestCard: {
    background: "#ffffff",
    border:
      "1px solid rgba(173, 215, 208, 0.42)",
    borderRadius: "23px",
    padding: "17px",
    boxShadow:
      "0 9px 25px rgba(23, 70, 63, 0.055)",
    boxSizing: "border-box",
  },

  requestTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "15px",
  },

  requestTitleArea: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    minWidth: 0,
    flex: 1,
  },

  requestIcon: {
    width: "47px",
    height: "47px",
    minWidth: "47px",
    borderRadius: "15px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  requestTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 900,
    color: "#17332e",
    lineHeight: 1.4,
  },

  requestId: {
    margin: "3px 0 0",
    color: "#788884",
    fontSize: "11px",
    lineHeight: 1.5,
  },

  statusBadge: {
    borderRadius: "999px",
    padding: "7px 10px",
    fontSize: "10px",
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
    gap: "9px",
    marginBottom: "13px",
  },

  requestInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8fcfb",
    border:
      "1px solid #eef5f3",
    borderRadius: "14px",
    padding: "9px",
    minWidth: 0,
    boxSizing: "border-box",
  },

  requestInfoIcon: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    borderRadius: "11px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  },

  requestInfoContent: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  requestInfoLabel: {
    color: "#788884",
    fontSize: "9px",
    lineHeight: 1.4,
  },

  requestInfoValue: {
    color: "#17332e",
    fontSize: "12px",
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
    borderRadius: "15px",
    padding: "12px 13px",
    marginBottom: "14px",
  },

  notesLabel: {
    display: "block",
    color: "#71827f",
    fontSize: "11px",
    marginBottom: "5px",
    fontWeight: 700,
  },

  notesText: {
    margin: 0,
    color: "#17332e",
    fontSize: "12px",
    lineHeight: 1.8,
  },

  // ==========================================================
  // Status Update
  // ==========================================================

  statusSection: {
    borderTop:
      "1px solid #edf3f2",
    paddingTop: "14px",
  },

  statusLabel: {
    display: "block",
    marginBottom: "7px",
    color: "#17332e",
    fontSize: "12px",
    fontWeight: 900,
  },

  statusSelect: {
    width: "100%",
    minHeight: "45px",
    border:
      "1px solid #dceae7",
    background: "#ffffff",
    color: "#17332e",
    borderRadius: "13px",
    padding: "10px 12px",
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "12px",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  updatingText: {
    margin: "7px 0 0",
    color: "#078876",
    fontSize: "11px",
  },

  // ==========================================================
  // Empty State
  // ==========================================================

  emptyCard: {
    background: "#ffffff",
    border:
      "1px dashed #cbdeda",
    borderRadius: "24px",
    padding: "38px 20px",
    textAlign: "center",
    boxShadow:
      "0 5px 18px rgba(23, 70, 63, 0.025)",
  },

  emptyIcon: {
    width: "66px",
    height: "66px",
    margin: "0 auto 13px",
    borderRadius: "20px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },

  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "17px",
    fontWeight: 900,
    color: "#17332e",
  },

  emptyText: {
    margin: 0,
    color: "#788884",
    fontSize: "13px",
    lineHeight: 1.8,
  },

  // ==========================================================
  // Verified Card
  // ==========================================================

  verifiedCard: {
    background:
      "linear-gradient(135deg, #eaf9f6 0%, #e0f6f2 100%)",
    border:
      "1px solid #c8ebe4",
    borderRadius: "21px",
    padding: "17px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    boxShadow:
      "0 7px 20px rgba(10, 168, 143, 0.06)",
  },

  verifiedIcon: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "50%",
    background: "#0aa88f",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
    fontWeight: 900,
    boxShadow:
      "0 5px 12px rgba(10, 168, 143, 0.18)",
  },

  verifiedTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: 900,
    color: "#17332e",
  },

  verifiedText: {
    margin: 0,
    color: "#55706a",
    fontSize: "12px",
    lineHeight: 1.7,
  },

  // ==========================================================
  // Loading
  // ==========================================================

  loadingCard: {
    width: "calc(100% - 28px)",
    maxWidth: "420px",
    margin: "100px auto",
    background: "#ffffff",
    border:
      "1px solid #e5efed",
    borderRadius: "26px",
    padding: "40px 24px",
    textAlign: "center",
    boxShadow:
      "0 12px 30px rgba(23, 51, 46, 0.08)",
    boxSizing: "border-box",
  },

  loadingIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 14px",
    borderRadius: "22px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
  },

  loadingTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 900,
  },

  loadingText: {
    margin: "8px 0 0",
    color: "#6b7c79",
    fontSize: "13px",
  },

  // ==========================================================
  // Error
  // ==========================================================

  errorCard: {
    width: "calc(100% - 28px)",
    maxWidth: "420px",
    margin: "100px auto",
    background: "#ffffff",
    border:
      "1px solid #f0dada",
    borderRadius: "26px",
    padding: "40px 24px",
    textAlign: "center",
    boxShadow:
      "0 12px 30px rgba(23, 51, 46, 0.08)",
    boxSizing: "border-box",
  },

  errorIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 14px",
    borderRadius: "22px",
    background: "#fff0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
  },

  errorTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 900,
  },

  errorText: {
    margin: "10px 0 20px",
    color: "#6b7c79",
    lineHeight: 1.8,
    fontSize: "13px",
  },

  retryButton: {
    border: "none",
    background: "#0aa88f",
    color: "#ffffff",
    padding: "12px 26px",
    minHeight: "45px",
    borderRadius: "14px",
    fontFamily: "Tajawal, Arial, sans-serif",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },
};

import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function MedicalDashboard() {
  const [user, setUser] = useState(null);
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMedicalEntity();
  }, []);

  async function loadMedicalEntity() {
    try {
      setLoading(true);
      setError("");

      const savedUser =
        JSON.parse(
          localStorage.getItem("nabd_user") || "null"
        );

      if (!savedUser) {
        setError("لم يتم العثور على بيانات الحساب");
        return;
      }

      if (
        savedUser.accountType !== "medical" ||
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

  function getEntityTypeLabel() {
    if (!user?.medicalEntityType) {
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

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingIcon}>
            🏥
          </div>

          <h2 style={styles.loadingTitle}>
            جاري تحميل لوحة التحكم
          </h2>

          <p style={styles.loadingText}>
            برجاء الانتظار...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>
            ⚠️
          </div>

          <h2 style={styles.errorTitle}>
            تعذر تحميل البيانات
          </h2>

          <p style={styles.errorText}>
            {error}
          </p>

          <button
            type="button"
            onClick={loadMedicalEntity}
            style={styles.retryButton}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={styles.page}
    >
      <div style={styles.container}>

        {/* =========================
            Header
        ========================= */}

        <div style={styles.header}>
          <div>
            <p style={styles.welcome}>
              لوحة التحكم
            </p>

            <h1 style={styles.title}>
              {entity?.name || "الجهة الطبية"}
            </h1>

            <p style={styles.subtitle}>
              {getEntityTypeLabel()}
            </p>
          </div>

          <div style={styles.entityIcon}>
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

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            بيانات الجهة
          </h2>

          <div style={styles.infoCard}>

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

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            بيانات الحساب
          </h2>

          <div style={styles.infoCard}>

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

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            الطلبات
          </h2>

          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>
              📋
            </div>

            <h3 style={styles.emptyTitle}>
              لا توجد طلبات حتى الآن
            </h3>

            <p style={styles.emptyText}>
              سيتم عرض الطلبات الخاصة بجهتك الطبية
              هنا عند ربطها بالنظام.
            </p>
          </div>
        </section>

        {/* =========================
            Status
        ========================= */}

        <section style={styles.section}>
          <div style={styles.verifiedCard}>
            <div style={styles.verifiedIcon}>
              ✓
            </div>

            <div>
              <h3 style={styles.verifiedTitle}>
                جهة طبية معتمدة
              </h3>

              <p style={styles.verifiedText}>
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
// Info Row
// ============================================================

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div style={styles.infoRow}>
      <div style={styles.infoIcon}>
        {icon}
      </div>

      <div style={styles.infoContent}>
        <span style={styles.infoLabel}>
          {label}
        </span>

        <span style={styles.infoValue}>
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
      "linear-gradient(180deg, #f7fffd 0%, #ffffff 100%)",
    padding:
      "24px 16px 100px",
    fontFamily:
      "Tajawal, Arial, sans-serif",
    color: "#17332e",
  },

  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
  },

  header: {
    background:
      "linear-gradient(135deg, #0aa88f 0%, #078876 100%)",
    borderRadius: "24px",
    padding: "24px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    boxShadow:
      "0 12px 30px rgba(10, 168, 143, 0.18)",
    marginBottom: "24px",
  },

  welcome: {
    margin: "0 0 6px",
    fontSize: "14px",
    opacity: 0.9,
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 800,
  },

  subtitle: {
    margin:
      "7px 0 0",
    fontSize: "14px",
    opacity: 0.92,
  },

  entityIcon: {
    width: "64px",
    height: "64px",
    minWidth: "64px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },

  section: {
    marginBottom: "24px",
  },

  sectionTitle: {
    margin:
      "0 0 12px",
    fontSize: "19px",
    fontWeight: 800,
  },

  infoCard: {
    background: "#ffffff",
    border:
      "1px solid #e5efed",
    borderRadius: "20px",
    padding: "6px 18px",
    boxShadow:
      "0 6px 20px rgba(23, 51, 46, 0.05)",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderBottom:
      "1px solid #edf3f2",
  },

  infoIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "13px",
    background: "#e6f7f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "19px",
  },

  infoContent: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  infoLabel: {
    fontSize: "12px",
    color: "#6b7c79",
  },

  infoValue: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#17332e",
    overflowWrap: "anywhere",
  },

  emptyCard: {
    background: "#ffffff",
    border:
      "1px dashed #cbdeda",
    borderRadius: "20px",
    padding: "35px 20px",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  emptyTitle: {
    margin:
      "0 0 8px",
    fontSize: "17px",
    fontWeight: 800,
  },

  emptyText: {
    margin: 0,
    color: "#6b7c79",
    fontSize: "14px",
    lineHeight: 1.7,
  },

  verifiedCard: {
    background: "#e6f7f4",
    border:
      "1px solid #c7ebe4",
    borderRadius: "18px",
    padding: "17px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
  },

  verifiedIcon: {
    width: "44px",
    height: "44px",
    minWidth: "44px",
    borderRadius: "50%",
    background: "#0aa88f",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: 900,
  },

  verifiedTitle: {
    margin:
      "0 0 4px",
    fontSize: "15px",
    fontWeight: 800,
  },

  verifiedText: {
    margin: 0,
    color: "#55706a",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  loadingCard: {
    maxWidth: "500px",
    margin:
      "100px auto",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px 24px",
    textAlign: "center",
    boxShadow:
      "0 10px 30px rgba(23, 51, 46, 0.08)",
  },

  loadingIcon: {
    fontSize: "46px",
    marginBottom: "12px",
  },

  loadingTitle: {
    margin: 0,
    fontSize: "20px",
  },

  loadingText: {
    margin:
      "8px 0 0",
    color: "#6b7c79",
  },

  errorCard: {
    maxWidth: "500px",
    margin:
      "100px auto",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px 24px",
    textAlign: "center",
    boxShadow:
      "0 10px 30px rgba(23, 51, 46, 0.08)",
  },

  errorIcon: {
    fontSize: "46px",
    marginBottom: "12px",
  },

  errorTitle: {
    margin: 0,
    fontSize: "20px",
  },

  errorText: {
    margin:
      "10px 0 20px",
    color: "#6b7c79",
    lineHeight: 1.7,
  },

  retryButton: {
    border: "none",
    background: "#0aa88f",
    color: "#ffffff",
    padding:
      "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

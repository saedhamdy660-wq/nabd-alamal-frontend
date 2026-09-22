import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { api } from "../api.js";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M6 17h12l-1.2-1.7V10a4.8 4.8 0 0 0-9.6 0v5.3L6 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      
      <path
        d="M10 20h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M19 13.2v-2.4l-1.8-.5a5.9 5.9 0 0 0-.6-1.5l1-1.5-1.7-1.7-1.5 1a5.9 5.9 0 0 0-1.5-.6L12.4 4H10l-.5 1.8a5.9 5.9 0 0 0-1.5.6l-1.5-1L4.8 7.1l1.7 1.7 1.5-1a5.9 5.9 0 0 0-.6 1.5l-1.8.5v2.4l1.8.5a5.9 5.9 0 0 0 .6 1.5l-1 1.5 1.7 1.7 1.5-1a5.9 5.9 0 0 0 1.5.6L10 20h2.4l.5-1.8a5.9 5.9 0 0 0 1.5-.6l1.5 1 1.7-1.7-1-1.5a5.9 5.9 0 0 0 .6-1.5l1.8-.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 4l8 15H4L12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M12 9v4M12 16h.01"
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

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 11v5M12 8h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M9 5l7 7-7 7"
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
      <path
        d="M5 21V6h14v15M3 21h18M9 21v-5h6v5M10 9h4M12 7v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
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

function getNotificationIcon(type) {
  if (type === "urgent") {
    return <AlertIcon />;
  }

  if (type === "success") {
    return <CheckIcon />;
  }

  return <InfoIcon />;
}

export default function Notifications() {
  const navigate = useNavigate();

  const [items, setItems] =
    useState([]);

  const [respondingId, setRespondingId] =
    useState(null);

  const [actionError, setActionError] =
    useState("");

  const [expandedId, setExpandedId] =
    useState(null);

  const [requestDetails, setRequestDetails] =
    useState({});

  const [loadingDetailsId, setLoadingDetailsId] =
    useState(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "nabd_user"
      );

    let userId = "";

    if (savedUser) {
      try {
        const user =
          JSON.parse(savedUser);

        userId =
          user?.id || "";
      } catch {
        userId = "";
      }
    }

    api
      .getNotifications(userId)
      .then(setItems)
      .catch(() => {});
  }, []);

  const getCurrentUser = () => {
    const savedUser =
      localStorage.getItem(
        "nabd_user"
      );

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  };

  /*
    فتح صفحة تفاصيل طلب التبرع.

    مهم:
    السهم لا يقوم بالقبول أو الرفض.
    هو فقط ينقل المتبرع إلى صفحة التفاصيل.
  */
  const handleViewRequestDetails = (
    notification
  ) => {
    if (!notification?.requestId) {
      return;
    }

    navigate(
      `/donation-request/${notification.requestId}`
    );
  };

  const handleToggleDetails = async (
    notification
  ) => {
    if (!notification?.requestId) {
      return;
    }

    if (
      expandedId ===
      notification.id
    ) {
      setExpandedId(null);
      return;
    }

    setExpandedId(
      notification.id
    );

    setActionError("");

    /*
      لو التفاصيل متحملة قبل كده
      نستخدمها مباشرة.
    */
    if (
      requestDetails[
        notification.requestId
      ]
    ) {
      return;
    }

    try {
      setLoadingDetailsId(
        notification.id
      );

      const request =
        await api.getBloodRequest(
          notification.requestId
        );

      setRequestDetails(
        (prev) => ({
          ...prev,
          [notification.requestId]:
            request,
        })
      );
    } catch (error) {
      setActionError(
        error?.message ||
          "تعذر تحميل تفاصيل طلب التبرع"
      );
    } finally {
      setLoadingDetailsId(null);
    }
  };

  const handleDonationResponse = async (
    notification,
    action
  ) => {
    const user =
      getCurrentUser();

    if (!user?.id) {
      return;
    }

    if (
      !notification?.requestId
    ) {
      return;
    }

    try {
      setRespondingId(
        notification.id
      );

      setActionError("");

      const updatedRequest =
        await api.respondToDonationRequest(
          notification.requestId,
          user.id,
          action
        );

      setItems(
        (prev) =>
          prev.map(
            (item) =>
              item.id ===
              notification.id
                ? {
                    ...item,

                    status:
                      action ===
                      "accept"
                        ? "accepted"
                        : "rejected",
                  }
                : item
          )
      );

      /*
        نحدث التفاصيل أيضًا حتى تفضل
        الشاشة مفتوحة والحالة الجديدة ظاهرة.
      */
      if (updatedRequest) {
        setRequestDetails(
          (prev) => ({
            ...prev,
            [notification.requestId]:
              updatedRequest,
          })
        );
      } else {
        try {
          const refreshed =
            await api.getBloodRequest(
              notification.requestId
            );

          setRequestDetails(
            (prev) => ({
              ...prev,
              [notification.requestId]:
                refreshed,
            })
          );
        } catch {
          // لا نوقف العملية لو فشل تحديث التفاصيل فقط
        }
      }
    } catch (error) {
      setActionError(
        error?.message ||
          "حدث خطأ أثناء الرد على الطلب"
      );
    } finally {
      setRespondingId(null);
    }
  };

  const handleViewDonor = (
    notification
  ) => {
    if (!notification?.donorId) {
      return;
    }

    navigate(
      `/donor/${notification.donorId}`
    );
  };

  const getRequesterName = (
    notification,
    request
  ) => {
    return (
      request?.requesterName ||
      request?.requester?.name ||
      request?.userName ||
      request?.name ||
      notification?.requesterName ||
      notification?.userName ||
      "طالب التبرع"
    );
  };

  const getBloodType = (
    notification,
    request
  ) => {
    return (
      request?.bloodType ||
      request?.blood_group ||
      request?.bloodGroup ||
      notification?.bloodType ||
      "غير محددة"
    );
  };

  const getHospitalName = (
    notification,
    request
  ) => {
    return (
      request?.hospital ||
      request?.hospitalName ||
      request?.locationName ||
      request?.hospital?.name ||
      notification?.hospital ||
      notification?.hospitalName ||
      "المستشفى المحددة"
    );
  };

  const getHospitalAddress = (
    notification,
    request
  ) => {
    return (
      request?.address ||
      request?.hospitalAddress ||
      request?.hospital?.address ||
      notification?.address ||
      notification?.hospitalAddress ||
      ""
    );
  };

  const getHospitalCoordinates = (
    notification,
    request
  ) => {
    const lat =
      request?.lat ??
      request?.hospital?.lat ??
      notification?.lat;

    const lng =
      request?.lng ??
      request?.hospital?.lng ??
      notification?.lng;

    return {
      lat,
      lng,
    };
  };

  const getDirectionsUrl = (
    notification,
    request
  ) => {
    const {
      lat,
      lng,
    } =
      getHospitalCoordinates(
        notification,
        request
      );

    if (
      lat !== undefined &&
      lat !== null &&
      lng !== undefined &&
      lng !== null &&
      lat !== "" &&
      lng !== ""
    ) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${lat},${lng}`
      )}`;
    }

    const address =
      getHospitalAddress(
        notification,
        request
      );

    if (address) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
      )}`;
    }

    return "";
  };

  return (
    <div className="notifications-page">

      {/* Header */}
      <header className="notifications-header">

        <div className="header-title">

          <div className="header-bell">
            <BellIcon />
          </div>

          <div>
            <h1>الإشعارات</h1>

            <p>
              آخر التحديثات والتنبيهات
            </p>
          </div>

        </div>

        <Link
          to="/notification-settings"
          className="settings-button"
        >
          <SettingsIcon />
        </Link>

      </header>

      {/* Notifications */}
      <section className="notifications-list">

        {items.length === 0 && (
          <div className="empty-notifications">

            <div className="empty-icon">
              <BellIcon />
            </div>

            <h3>
              لا توجد إشعارات
            </h3>

            <p>
              ستظهر هنا الإشعارات والتحديثات المهمة.
            </p>

          </div>
        )}

        {items.map(
          (notification) => {
            const type =
              notification.type ||
              "info";

            const isDonationRequest =
              notification.kind ===
              "donation_request";

            const isDonationResponse =
              notification.kind ===
              "donation_response";

            const isPending =
              notification.status ===
              "pending";

            const isResponding =
              respondingId ===
              notification.id;

            const isExpanded =
              expandedId ===
              notification.id;

            const request =
              requestDetails[
                notification.requestId
              ];

            const isLoadingDetails =
              loadingDetailsId ===
              notification.id;

            const requesterName =
              getRequesterName(
                notification,
                request
              );

            const bloodType =
              getBloodType(
                notification,
                request
              );

            const hospitalName =
              getHospitalName(
                notification,
                request
              );

            const hospitalAddress =
              getHospitalAddress(
                notification,
                request
              );

            const directionsUrl =
              getDirectionsUrl(
                notification,
                request
              );

            return (
              <div
                key={notification.id}
                className={`notification-card ${type}`}
              >

                <div className="notification-icon">
                  {getNotificationIcon(
                    type
                  )}
                </div>

                <div className="notification-content">

                  <h3>
                    {notification.title}
                  </h3>

                  <p>
                    {notification.body}
                  </p>

                  <span>
                    {notification.time}
                  </span>

                  {/* Donation Request Details Arrow */}
                  {isDonationRequest &&
                    notification.requestId && (
                      <button
                        type="button"
                        className={`details-arrow ${
                          isExpanded
                            ? "details-arrow-open"
                            : ""
                        }`}
                        onClick={() =>
                          handleViewRequestDetails(
                            notification
                          )
                        }
                        aria-label="عرض تفاصيل طلب التبرع"
                      >
                        <ArrowIcon />
                      </button>
                    )}

                  {/* Donation Request Details */}
                  {isDonationRequest &&
                    isExpanded && (
                      <div className="donation-details">

                        <div className="details-title">
                          تفاصيل طلب التبرع
                        </div>

                        {isLoadingDetails && (
                          <div className="details-loading">
                            جاري تحميل تفاصيل الطلب...
                          </div>
                        )}

                        {!isLoadingDetails && (
                          <>
                            <div className="detail-row">
                              <div className="detail-row-icon">
                                <UserIcon />
                              </div>

                              <div className="detail-row-content">
                                <span>
                                  طالب التبرع
                                </span>

                                <strong>
                                  {requesterName}
                                </strong>
                              </div>
                            </div>

                            <div className="detail-row">
                              <div className="detail-row-icon">
                                <BloodIcon />
                              </div>

                              <div className="detail-row-content">
                                <span>
                                  فصيلة الدم المطلوبة
                                </span>

                                <strong>
                                  {bloodType}
                                </strong>
                              </div>
                            </div>

                            <div className="detail-row">
                              <div className="detail-row-icon">
                                <HospitalIcon />
                              </div>

                              <div className="detail-row-content">
                                <span>
                                  مكان التبرع
                                </span>

                                <strong>
                                  {hospitalName}
                                </strong>

                                {hospitalAddress && (
                                  <small>
                                    {hospitalAddress}
                                  </small>
                                )}
                              </div>
                            </div>

                            {directionsUrl && (
                              <a
                                href={
                                  directionsUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="directions-button"
                              >
                                <LocationIcon />

                                فتح الاتجاهات
                              </a>
                            )}

                            {/* Donation Request Actions */}
                            {isPending && (
                              <div className="donation-actions">

                                <button
                                  type="button"
                                  className="accept-button"
                                  disabled={
                                    isResponding
                                  }
                                  onClick={() =>
                                    handleDonationResponse(
                                      notification,
                                      "accept"
                                    )
                                  }
                                >
                                  {isResponding
                                    ? "جاري..."
                                    : "قبول"}
                                </button>

                                <button
                                  type="button"
                                  className="reject-button"
                                  disabled={
                                    isResponding
                                  }
                                  onClick={() =>
                                    handleDonationResponse(
                                      notification,
                                      "reject"
                                    )
                                  }
                                >
                                  رفض
                                </button>

                              </div>
                            )}

                            {/* Request Already Accepted */}
                            {notification.status ===
                              "accepted" && (
                              <div className="request-status accepted-status">
                                ✓ تم قبول طلب التبرع
                              </div>
                            )}

                            {/* Request Already Rejected */}
                            {notification.status ===
                              "rejected" && (
                              <div className="request-status rejected-status">
                                تم رفض طلب التبرع
                              </div>
                            )}

                            {actionError &&
                              isPending && (
                                <div className="action-error">
                                  {actionError}
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    )}

                  {/* View Donor */}
                  {isDonationResponse &&
                    notification.donorId && (
                      <button
                        type="button"
                        className="view-donor-button"
                        onClick={() =>
                          handleViewDonor(
                            notification
                          )
                        }
                      >
                        عرض المتبرع
                      </button>
                    )}

                </div>

              </div>
            );
          }
        )}

      </section>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .notifications-page {
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

        /* Header */

        .notifications-header {
          max-width: 520px;

          margin: 0 auto 22px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;
        }

        .header-title {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .header-bell {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e3faf6,
              #d2f2ec
            );

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.85);
        }

        .header-bell svg {
          width: 25px;
          height: 25px;
        }

        .header-title h1 {
          margin: 0 0 4px;

          color: #218d83;

          font-size: 22px;

          font-weight: 800;
        }

        .header-title p {
          margin: 0;

          color: #88a3a2;

          font-size: 11px;
        }

        .settings-button {
          width: 44px;
          height: 44px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #218d83;

          background:
            rgba(255,255,255,.72);

          border: 1px solid
            rgba(255,255,255,.9);

          box-shadow:
            0 7px 18px
              rgba(35,139,128,.08),
            inset 0 1px 0
              rgba(255,255,255,.9);

          text-decoration: none;
        }

        .settings-button svg {
          width: 23px;
          height: 23px;
        }

        /* List */

        .notifications-list {
          max-width: 520px;

          margin: 0 auto;
        }

        /* Notification Card */

        .notification-card {
          width: 100%;

          min-height: 88px;

          margin-bottom: 12px;

          padding: 14px;

          display: flex;

          align-items: flex-start;

          gap: 12px;

          border-radius: 23px;

          border: 1px solid
            rgba(255,255,255,.92);

          box-shadow:
            0 10px 27px
              rgba(42,128,128,.07),
            inset 0 1px 0
              rgba(255,255,255,.85);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter:
            blur(14px);
        }

        /* Urgent */

        .notification-card.urgent {
          background:
            linear-gradient(
              145deg,
              rgba(255,232,238,.96),
              rgba(249,215,224,.9)
            );
        }

        /* Success */

        .notification-card.success {
          background:
            linear-gradient(
              145deg,
              rgba(218,251,242,.96),
              rgba(201,243,232,.9)
            );
        }

        /* Info */

        .notification-card.info {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.9),
              rgba(232,249,246,.8)
            );
        }

        .notification-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;
        }

        .notification-icon svg {
          width: 24px;
          height: 24px;
        }

        .notification-card.urgent
        .notification-icon {
          color: #c05267;

          background:
            rgba(255,255,255,.62);
        }

        .notification-card.success
        .notification-icon {
          color: #159b8a;

          background:
            rgba(255,255,255,.65);
        }

        .notification-card.info
        .notification-icon {
          color: #4c9290;

          background:
            rgba(255,255,255,.72);
        }

        .notification-content {
          flex: 1;

          min-width: 0;

          position: relative;
        }

        .notification-content h3 {
          margin: 0 0 5px;

          font-size: 14px;

          line-height: 1.6;

          font-weight: 800;

          padding-left: 34px;
        }

        .notification-card.urgent
        .notification-content h3 {
          color: #98505f;
        }

        .notification-card.success
        .notification-content h3 {
          color: #28786e;
        }

        .notification-card.info
        .notification-content h3 {
          color: #286d6d;
        }

        .notification-content p {
          margin: 0 0 6px;

          color: #718f8f;

          font-size: 11px;

          line-height: 1.7;

          padding-left: 34px;
        }

        .notification-content span {
          color: #9aafae;

          font-size: 10px;
        }

        /* Details Arrow */

        .details-arrow {
          position: absolute;

          left: 0;

          top: 0;

          width: 31px;
          height: 31px;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 0;

          border: 0;

          border-radius: 10px;

          color: #159b8a;

          background:
            rgba(255,255,255,.72);

          box-shadow:
            0 5px 12px
              rgba(21,155,138,.08);

          cursor: pointer;

          transition:
            transform .2s ease,
            background .2s ease;
        }

        .details-arrow svg {
          width: 17px;
          height: 17px;

          transition:
            transform .2s ease;
        }

        .details-arrow:active {
          transform: scale(.94);
        }

        .details-arrow-open svg {
          transform:
            rotate(90deg);
        }

        /* Donation Details */

        .donation-details {
          margin-top: 13px;

          padding: 13px;

          border-radius: 17px;

          background:
            rgba(255,255,255,.65);

          border: 1px solid
            rgba(255,255,255,.88);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,.85);
        }

        .details-title {
          margin-bottom: 11px;

          color: #28786e;

          font-size: 12px;

          font-weight: 800;
        }

        .details-loading {
          padding: 12px 5px;

          color: #7f9b9a;

          font-size: 11px;

          text-align: center;
        }

        .detail-row {
          display: flex;

          align-items: center;

          gap: 9px;

          margin-bottom: 9px;

          padding: 9px;

          border-radius: 13px;

          background:
            rgba(255,255,255,.62);
        }

        .detail-row:last-of-type {
          margin-bottom: 10px;
        }

        .detail-row-icon {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;

          color: #159b8a;

          background:
            #e5f8f4;
        }

        .detail-row-icon svg {
          width: 18px;
          height: 18px;
        }

        .detail-row-content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }

        .detail-row-content span {
          color: #8aa3a2;

          font-size: 9px;
        }

        .detail-row-content strong {
          color: #286d6d;

          font-size: 11px;

          font-weight: 800;

          line-height: 1.5;
        }

        .detail-row-content small {
          color: #7b9796;

          font-size: 9px;

          line-height: 1.6;
        }

        .directions-button {
          width: 100%;

          min-height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          margin-top: 8px;

          border-radius: 13px;

          color: #159b8a;

          background:
            rgba(229,248,244,.9);

          font-size: 11px;

          font-weight: 800;

          text-decoration: none;

          box-shadow:
            0 5px 12px
              rgba(21,155,138,.06);
        }

        .directions-button svg {
          width: 17px;
          height: 17px;
        }

        /* Donation Actions */

        .donation-actions {
          display: flex;

          gap: 8px;

          margin-top: 11px;
        }

        .donation-actions button {
          flex: 1;

          min-height: 38px;

          border: 0;

          border-radius: 13px;

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .donation-actions button:active {
          transform: scale(.98);
        }

        .donation-actions button:disabled {
          opacity: .55;

          cursor: not-allowed;
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
            0 7px 15px
              rgba(21,155,138,.13);
        }

        .reject-button {
          color: #98505f;

          background: #ffe7ed;
        }

        /* Request Status */

        .request-status {
          margin-top: 10px;

          padding: 8px 10px;

          border-radius: 12px;

          font-size: 11px;

          font-weight: 800;

          text-align: center;
        }

        .accepted-status {
          color: #28786e;

          background:
            rgba(213,248,239,.9);
        }

        .rejected-status {
          color: #98505f;

          background:
            rgba(255,231,237,.9);
        }

        /* View Donor */

        .view-donor-button {
          width: 100%;

          min-height: 38px;

          margin-top: 10px;

          border: 0;

          border-radius: 13px;

          color: #159b8a;

          background:
            rgba(255,255,255,.72);

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 6px 14px
              rgba(21,155,138,.08);

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .view-donor-button:active {
          transform: scale(.98);
        }

        .action-error {
          margin-top: 8px;

          color: #98505f;

          font-size: 10px;

          font-weight: 700;
        }

        /* Empty */

        .empty-notifications {
          padding: 45px 20px;

          text-align: center;

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
              rgba(42,128,128,.08);
        }

        .empty-icon {
          width: 64px;
          height: 64px;

          margin: 0 auto 13px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 22px;

          color: #159b8a;

          background:
            linear-gradient(
              145deg,
              #e2faf6,
              #cfeee8
            );
        }

        .empty-icon svg {
          width: 30px;
          height: 30px;
        }

        .empty-notifications h3 {
          margin: 0 0 6px;

          color: #286d6d;

          font-size: 16px;
        }

        .empty-notifications p {
          margin: 0;

          color: #8aa3a2;

          font-size: 12px;
        }

      `}</style>
    </div>
  );
}

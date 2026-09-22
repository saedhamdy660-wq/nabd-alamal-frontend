const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "/api";

async function request(
  path,
  options = {}
) {
  const res = await fetch(
    `${BASE_URL}${path}`,
    {
      headers: {
        "Content-Type":
          "application/json",
      },

      ...options,
    }
  );

  if (!res.ok) {
    let message =
      `Request failed: ${res.status}`;

    try {
      const data =
        await res.json();

      if (data?.error) {
        message =
          data.error;
      }
    } catch {
      // Ignore invalid JSON
    }

    throw new Error(
      message
    );
  }

  return res.json();
}

const api = {
  // ============================================================
  // Authentication
  // ============================================================

  register: (data) =>
    request(
      "/auth/register",
      {
        method: "POST",

        body: JSON.stringify(
          data
        ),
      }
    ),

  login: (data) =>
    request(
      "/auth/login",
      {
        method: "POST",

        body: JSON.stringify(
          data
        ),
      }
    ),

  googleLogin: (
    credential
  ) =>
    request(
      "/auth/google",
      {
        method: "POST",

        body: JSON.stringify({
          credential,
        }),
      }
    ),

  // ============================================================
  // Blood Requests
  // ============================================================

  getBloodRequests: () =>
    request(
      "/blood/requests"
    ),

  getBloodRequest: (id) =>
    request(
      `/blood/requests/${id}`
    ),

  getNearbyDonors: ({
    bloodType = "",
    userId = "",
    lat = "",
    lng = "",
  } = {}) => {
    const params =
      new URLSearchParams();

    if (bloodType) {
      params.set(
        "bloodType",
        bloodType
      );
    }

    if (userId) {
      params.set(
        "userId",
        userId
      );
    }

    if (
      lat !== "" &&
      lat !== null &&
      lat !== undefined
    ) {
      params.set(
        "lat",
        lat
      );
    }

    if (
      lng !== "" &&
      lng !== null &&
      lng !== undefined
    ) {
      params.set(
        "lng",
        lng
      );
    }

    const query =
      params.toString();

    return request(
      `/blood/donors/nearby${
        query
          ? `?${query}`
          : ""
      }`
    );
  },

  getDonor: (id) =>
    request(
      `/blood/donors/${id}`
    ),

  // ============================================================
  // إرسال طلب تبرع مباشر لمتبرع
  // مع تحديد المستشفى من صاحب الطلب
  // ============================================================

  createDonationRequest: (
    requesterId,
    donorId,
    hospitalId
  ) =>
    request(
      "/blood/donation-requests",
      {
        method: "POST",

        body: JSON.stringify({
          requesterId,
          donorId,
          hospitalId,
        }),
      }
    ),

  // قبول أو رفض طلب التبرع
  respondToDonationRequest: (
    id,
    donorId,
    action
  ) =>
    request(
      `/blood/donation-requests/${id}/respond`,
      {
        method: "POST",

        body: JSON.stringify({
          donorId,
          action,
        }),
      }
    ),

  // تحديث مرحلة التبرع
  updateDonationProgress: (
    id,
    donorId,
    stage
  ) =>
    request(
      `/blood/donation-requests/${id}/progress`,
      {
        method: "POST",

        body: JSON.stringify({
          donorId,
          stage,
        }),
      }
    ),

  respondToRequest: (id) =>
    request(
      `/blood/requests/${id}/respond`,
      {
        method: "POST",
      }
    ),

  // جلب المستشفيات المتاحة
  getHospitals: () =>
    request(
      "/blood/hospitals"
    ),

  // ============================================================
  // Medicines
  // ============================================================

  getMedicines: (q) =>
    request(
      `/medicines${
        q
          ? `?q=${encodeURIComponent(
              q
            )}`
          : ""
      }`
    ),

  getMedicine: (id) =>
    request(
      `/medicines/${id}`
    ),

  // طلب دواء مرتبط بالمستخدم الحالي
  requestMedicine: (
    id,
    userId
  ) =>
    request(
      `/medicines/${id}/request`,
      {
        method: "POST",

        body: JSON.stringify({
          userId,
        }),
      }
    ),

  // إلغاء طلب دواء مرتبط بالمستخدم الحالي
  cancelMedicineRequest: (
    id,
    userId
  ) =>
    request(
      `/medicines/${id}/request`,
      {
        method: "DELETE",

        body: JSON.stringify({
          userId,
        }),
      }
    ),

  getPharmacies: () =>
    request(
      "/medicines/partners/pharmacies"
    ),

  // ============================================================
  // Notifications
  // ============================================================

  getNotifications: (
    userId = ""
  ) => {
    const query = userId
      ? `?userId=${encodeURIComponent(
          userId
        )}`
      : "";

    return request(
      `/notifications${query}`
    );
  },

  // ============================================================
  // User
  // ============================================================

  getUser: (email) =>
    request(
      `/users/me${
        email
          ? `?email=${encodeURIComponent(
              email
            )}`
          : ""
      }`
    ),

  // ============================================================
  // My Requests
  // ============================================================

  getMyRequests: (
    userId = ""
  ) => {
    const query = userId
      ? `?userId=${encodeURIComponent(
          userId
        )}`
      : "";

    return request(
      `/users/me/requests${query}`
    );
  },

  // ============================================================
  // User Location
  // ============================================================

  updateUserLocation: (
    id,
    lat,
    lng
  ) =>
    request(
      `/users/${id}/location`,
      {
        method: "PUT",

        body: JSON.stringify({
          lat,
          lng,
        }),
      }
    ),

  // ============================================================
  // Avatar
  // ============================================================

  saveAvatar: (
    id,
    avatar
  ) =>
    request(
      `/users/${id}/avatar`,
      {
        method: "POST",

        body: JSON.stringify({
          avatar,
        }),
      }
    ),
};

export default api;

export { api };

// ============================================================
// Current Location
// ============================================================

export function getCurrentLocation() {
  return new Promise(
    (resolve, reject) => {
      if (
        !navigator.geolocation
      ) {
        reject(
          new Error(
            "Geolocation not supported"
          )
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat:
              pos.coords.latitude,

            lng:
              pos.coords.longitude,
          }),

        (err) =>
          reject(err),

        {
          enableHighAccuracy:
            true,

          timeout: 15000,

          maximumAge: 0,
        }
      );
    }
  );
}

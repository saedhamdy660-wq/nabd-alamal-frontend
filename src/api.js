const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;

    try {
      const data = await res.json();

      if (data?.error) {
        message = data.error;
      }
    } catch {
      // Ignore invalid JSON response
    }

    throw new Error(message);
  }

  return res.json();
}

const api = {
  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Google Login
  googleLogin: (credential) =>
    request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),

  getBloodRequests: () =>
    request("/blood/requests"),

  getBloodRequest: (id) =>
    request(`/blood/requests/${id}`),

  // Nearby Donors
  getNearbyDonors: ({
    bloodType = "",
    userId = "",
    lat = "",
    lng = "",
  } = {}) => {
    const params = new URLSearchParams();

    if (bloodType) {
      params.set("bloodType", bloodType);
    }

    if (userId) {
      params.set("userId", userId);
    }

    if (
      lat !== "" &&
      lat !== null &&
      lat !== undefined
    ) {
      params.set("lat", lat);
    }

    if (
      lng !== "" &&
      lng !== null &&
      lng !== undefined
    ) {
      params.set("lng", lng);
    }

    const query = params.toString();

    return request(
      `/blood/donors/nearby${
        query ? `?${query}` : ""
      }`
    );
  },

  getDonor: (id) =>
    request(`/blood/donors/${id}`),

  respondToRequest: (id) =>
    request(`/blood/requests/${id}/respond`, {
      method: "POST",
    }),

  getHospitals: () =>
    request("/blood/hospitals"),

  getMedicines: (q) =>
    request(
      `/medicines${
        q
          ? `?q=${encodeURIComponent(q)}`
          : ""
      }`
    ),

  getMedicine: (id) =>
    request(`/medicines/${id}`),

  requestMedicine: (id) =>
    request(`/medicines/${id}/request`, {
      method: "POST",
    }),

  getPharmacies: () =>
    request("/medicines/partners/pharmacies"),

  getNotifications: () =>
    request("/notifications"),

  getUser: (email) =>
    request(
      `/users/me${
        email
          ? `?email=${encodeURIComponent(email)}`
          : ""
      }`
    ),

  getMyRequests: () =>
    request("/users/me/requests"),

  // Update user location
  updateUserLocation: (id, lat, lng) =>
    request(`/users/${id}/location`, {
      method: "PUT",
      body: JSON.stringify({
        lat,
        lng,
      }),
    }),

  saveAvatar: (id, avatar) =>
    request(`/users/${id}/avatar`, {
      method: "POST",
      body: JSON.stringify({ avatar }),
    }),
};

export default api;
export { api };

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("Geolocation not supported")
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  });
}

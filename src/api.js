const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  getBloodRequests: () => request("/blood/requests"),
  getBloodRequest: (id) => request(`/blood/requests/${id}`),
  getNearbyDonors: (bloodType) => request(`/blood/donors/nearby?bloodType=${bloodType}`),
  getDonor: (id) => request(`/blood/donors/${id}`),
  respondToRequest: (id) => request(`/blood/requests/${id}/respond`, { method: "POST" }),
  getHospitals: () => request("/blood/hospitals"),

  getMedicines: (q) => request(`/medicines${q ? `?q=${q}` : ""}`),
  getMedicine: (id) => request(`/medicines/${id}`),
  requestMedicine: (id) => request(`/medicines/${id}/request`, { method: "POST" }),
  getPharmacies: () => request("/medicines/partners/pharmacies"),

  getNotifications: () => request("/notifications"),

  getUser: () => request("/users/me"),
  getMyRequests: () => request("/users/me/requests"),
};

// Wraps the browser Geolocation API in a promise
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err)
    );
  });
}

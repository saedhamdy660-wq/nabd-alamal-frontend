import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "../leafletSetup.js";
import { api, getCurrentLocation } from "../api.js";

const DEFAULT_USER_LOCATION = { lat: 30.0444, lng: 31.2357 };

export default function PharmacyPartner() {
  const { medicineId } = useParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState(DEFAULT_USER_LOCATION);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getPharmacies().then(setPharmacies).catch(() => {});
    getCurrentLocation().then(setUserLocation).catch(() => {});
  }, []);

  const confirm = async () => {
    const res = await api.requestMedicine(medicineId);
    setMessage(res.message);
  };

  const pharmacy = pharmacies[0];

  return (
    <div className="page">
      <Link to={medicineId ? `/medicines/${medicineId}` : "/medicines"} className="muted" style={{ display: "inline-block", marginBottom: 14 }}>← رجوع</Link>
      <h2 style={{ marginBottom: 14, textAlign: "center" }}>أقرب صيدلية شريكة</h2>

      <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", marginBottom: 14, height: 260 }}>
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>موقعك الحالي</Popup>
          </Marker>
          {pharmacy && (
            <>
              <Marker position={[pharmacy.lat, pharmacy.lng]}>
                <Popup>{pharmacy.name}</Popup>
              </Marker>
              <Polyline
                positions={[
                  [userLocation.lat, userLocation.lng],
                  [pharmacy.lat, pharmacy.lng],
                ]}
                pathOptions={{ color: "#0aa88f", dashArray: "6 8" }}
              />
            </>
          )}
        </MapContainer>
      </div>

      {pharmacies.map((p) => (
        <div key={p.id} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            🏥
          </div>
          <div>
            <strong>{p.name}</strong>
            <p className="muted" style={{ margin: "2px 0" }}>شارع 26 يوليو، مدينة نصر</p>
            <p className="muted" style={{ margin: "2px 0" }}>📍 {p.distanceKm} كم</p>
            <p className="muted" style={{ margin: 0 }}>🕒 تعمل من 9 ص حتى 11 م</p>
          </div>
        </div>
      ))}

      {!message ? (
        <button className="btn" onClick={confirm}>اتجاهات الوصول</button>
      ) : (
        <div className="card urgent">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

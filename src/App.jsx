import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Splash from "./pages/Splash.jsx";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PhoneVerify from "./pages/PhoneVerify.jsx";
import LocationPermission from "./pages/LocationPermission.jsx";
import Home from "./pages/Home.jsx";
import BloodDonation from "./pages/BloodDonation.jsx";
import MedicineExchange from "./pages/MedicineExchange.jsx";
import MedicineDetail from "./pages/MedicineDetail.jsx";
import PharmacyPartner from "./pages/PharmacyPartner.jsx";
import DonorDetail from "./pages/DonorDetail.jsx";
import RequestTracking from "./pages/RequestTracking.jsx";
import Requests from "./pages/Requests.jsx";
import Notifications from "./pages/Notifications.jsx";
import NotificationSettings from "./pages/NotificationSettings.jsx";
import Profile from "./pages/Profile.jsx";
import FavoriteMedicines from "./pages/FavoriteMedicines.jsx";
import Support from "./pages/Support.jsx";

const noNavRoutes = [
  "/",
  "/welcome",
  "/login",
  "/signup",
  "/verify-phone",
  "/location-permission",
];

export default function App() {
  const location = useLocation();
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <div className="app-shell">
      <Routes>
        {/* Onboarding flow (screens 1-6) */}
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<PhoneVerify />} />
        <Route path="/location-permission" element={<LocationPermission />} />

        {/* Main app (screens 7-19) */}
        <Route path="/home" element={<Home />} />
        <Route path="/medicines" element={<MedicineExchange />} />
        <Route path="/medicines/:id" element={<MedicineDetail />} />
        <Route path="/pharmacy/:medicineId" element={<PharmacyPartner />} />
        <Route path="/blood" element={<BloodDonation />} />
        <Route path="/donor/:id" element={<DonorDetail />} />
        <Route path="/track/:id" element={<RequestTracking />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoriteMedicines />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

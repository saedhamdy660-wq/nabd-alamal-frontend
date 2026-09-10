import React, { useEffect, useState } from "react";
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
import AppSettings from "./pages/AppSettings.jsx";

import Profile from "./pages/Profile.jsx";
import PersonalInfo from "./pages/PersonalInfo.jsx";
import SavedAddresses from "./pages/SavedAddresses.jsx";
import FavoriteMedicines from "./pages/FavoriteMedicines.jsx";
import Support from "./pages/Support.jsx";

const noNavRoutes = [
  "/",
  "/welcome",
  "/login",
  "/signup",
  "/verify-phone",
  "/location-permission",

  "/home",

  "/notification-settings",

  "/settings",
];

export default function App() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("nabd_theme") || "light";
  });

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme =
        localStorage.getItem("nabd_theme") || "light";

      setTheme(savedTheme);

      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );

      document.body.setAttribute(
        "data-theme",
        savedTheme
      );
    };

    applyTheme();

    window.addEventListener("theme-changed", applyTheme);
    window.addEventListener("storage", applyTheme);

    return () => {
      window.removeEventListener("theme-changed", applyTheme);
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

  const hideNav =
    noNavRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/medicines/") ||
    location.pathname.startsWith("/pharmacy/") ||
    location.pathname.startsWith("/donor/") ||
    location.pathname.startsWith("/track/");

  return (
    <div
      className={`app-shell ${
        theme === "dark" ? "theme-dark" : "theme-light"
      }`}
    >
      <Routes>

        {/* ================= ONBOARDING ================= */}

        <Route path="/" element={<Splash />} />

        <Route
          path="/welcome"
          element={<Welcome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-phone"
          element={<PhoneVerify />}
        />

        <Route
          path="/location-permission"
          element={<LocationPermission />}
        />

        {/* ================= MAIN APP ================= */}

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/medicines"
          element={<MedicineExchange />}
        />

        <Route
          path="/medicines/:id"
          element={<MedicineDetail />}
        />

        <Route
          path="/pharmacy/:medicineId"
          element={<PharmacyPartner />}
        />

        <Route
          path="/blood"
          element={<BloodDonation />}
        />

        <Route
          path="/donor/:id"
          element={<DonorDetail />}
        />

        <Route
          path="/track/:id"
          element={<RequestTracking />}
        />

        <Route
          path="/requests"
          element={<Requests />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/notification-settings"
          element={<NotificationSettings />}
        />

        <Route
          path="/settings"
          element={<AppSettings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/personal-info"
          element={<PersonalInfo />}
        />

        <Route
          path="/addresses"
          element={<SavedAddresses />}
        />

        <Route
          path="/favorites"
          element={<FavoriteMedicines />}
        />

        <Route
          path="/support"
          element={<Support />}
        />

      </Routes>

      {!hideNav && <Navbar />}

      <style>{`
        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
        }

        body {
          transition:
            background-color .25s ease,
            color .25s ease;
        }

        .app-shell {
          min-height: 100vh;
        }

        /* ================= LIGHT ================= */

        [data-theme="light"] {
          color-scheme: light;
        }

        /* ================= DARK ================= */

        [data-theme="dark"] {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "../leafletSetup.js";
import { api, getCurrentLocation } from "../api.js";

const DEFAULT_USER_LOCATION = {
  lat: 30.0444,
  lng: 31.2357,
};

export default function PharmacyPartner() {
  const { medicineId } = useParams();
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState(
    DEFAULT_USER_LOCATION
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  /* =====================================================
     جلب الصيدليات + الموقع
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const pharmacyData = await api.getPharmacies();

        if (mounted) {
          setPharmacies(
            Array.isArray(pharmacyData)
              ? pharmacyData
              : []
          );
        }
      } catch (error) {
        console.error(
          "Pharmacies loading error:",
          error
        );
      }

      try {
        const location = await getCurrentLocation();

        if (mounted && location) {
          setUserLocation(location);
        }
      } catch (error) {
        console.log(
          "Location permission not available."
        );
      }

      if (mounted) {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);


  /* =====================================================
     اختيار الصيدلية حسب الدواء

     كل دواء ممكن يظهر له صيدلية مختلفة.
     لو عندك أكثر من صيدلية في الـAPI
     هنختار واحدة مختلفة حسب medicineId.
  ===================================================== */

  const pharmacy = useMemo(() => {
    if (!pharmacies.length) {
      return null;
    }

    const numericId = Number(medicineId);

    let index;

    if (!Number.isNaN(numericId)) {
      index =
        Math.abs(numericId) % pharmacies.length;
    } else {
      const text =
        String(medicineId || "");

      let hash = 0;

      for (let i = 0; i < text.length; i++) {
        hash =
          (hash * 31 + text.charCodeAt(i)) | 0;
      }

      index =
        Math.abs(hash) % pharmacies.length;
    }

    return pharmacies[index];
  }, [pharmacies, medicineId]);


  /* =====================================================
     بيانات الصيدلية
  ===================================================== */

  const pharmacyName =
    pharmacy?.name ||
    pharmacy?.pharmacyName ||
    "أقرب صيدلية شريكة";

  const pharmacyAddress =
    pharmacy?.address ||
    pharmacy?.location ||
    "شارع 26 يوليو - مدينة نصر";

  const pharmacyDistance =
    pharmacy?.distanceKm ??
    pharmacy?.distance ??
    "1.2";

  const pharmacyHours =
    pharmacy?.hours ||
    pharmacy?.workingHours ||
    "تعمل من 9 ص - 10 م";

  const pharmacyLat =
    Number(pharmacy?.lat) ||
    Number(pharmacy?.latitude) ||
    userLocation.lat;

  const pharmacyLng =
    Number(pharmacy?.lng) ||
    Number(pharmacy?.longitude) ||
    userLocation.lng;


  /* =====================================================
     طلب الدواء
  ===================================================== */

  const confirmRequest = async () => {
    try {
      const res =
        await api.requestMedicine(medicineId);

      setMessage(
        res?.message ||
          "تم إرسال طلب الدواء بنجاح"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "حدث خطأ أثناء إرسال الطلب"
      );
    }
  };


  /* =====================================================
     فتح الاتجاهات
  ===================================================== */

  const openDirections = () => {
    if (!pharmacy) {
      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${userLocation.lat},${userLocation.lng}` +
      `&destination=${pharmacyLat},${pharmacyLng}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =====================================================
     Loading
  ===================================================== */

  if (loading) {
    return (
      <div
        className="pharmacy-loading"
        dir="rtl"
      >
        <div className="loading-spinner"></div>

        <p>
          جارِ البحث عن أقرب صيدلية...
        </p>

        <style>{`

          .pharmacy-loading {
            min-height: 100vh;

            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;

            gap: 13px;

            background:
              radial-gradient(
                circle at 10% 5%,
                rgba(179,239,228,.4),
                transparent 28%
              ),
              linear-gradient(
                180deg,
                #f5fffd,
                #eefbf8
              );

            color: #159b8a;

            font-family: inherit;
          }

          .loading-spinner {
            width: 40px;
            height: 40px;

            border-radius: 50%;

            border:
              4px solid #d8f3ee;

            border-top-color:
              #159b8a;

            animation:
              pharmacySpin .8s linear infinite;
          }

          .pharmacy-loading p {
            margin: 0;

            font-size: 14px;

            font-weight: 700;
          }

          @keyframes pharmacySpin {

            to {
              transform: rotate(360deg);
            }

          }

        `}</style>
      </div>
    );
  }


  /* =====================================================
     الصفحة
  ===================================================== */

  return (
    <div
      className="pharmacy-page"
      dir="rtl"
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="pharmacy-header">

        <button
          className="pharmacy-back"
          onClick={() => navigate(-1)}
          aria-label="رجوع"
        >

          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>

        </button>

        <h1>
          أقرب صيدلية شريكة
        </h1>

        <div className="header-space"></div>

      </header>


      {/* =================================================
          MAP
      ================================================= */}

      <section className="map-card">

        <MapContainer
          center={[
            userLocation.lat,
            userLocation.lng,
          ]}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* موقع المستخدم */}

          <Marker
            position={[
              userLocation.lat,
              userLocation.lng,
            ]}
          >

            <Popup>
              موقعك الحالي
            </Popup>

          </Marker>


          {/* الصيدلية */}

          {pharmacy && (
            <>

              <Marker
                position={[
                  pharmacyLat,
                  pharmacyLng,
                ]}
              >

                <Popup>
                  {pharmacyName}
                </Popup>

              </Marker>


              {/* خط الطريق */}

              <Polyline
                positions={[
                  [
                    userLocation.lat,
                    userLocation.lng,
                  ],
                  [
                    pharmacyLat,
                    pharmacyLng,
                  ],
                ]}
                pathOptions={{
                  color: "#159b8a",
                  weight: 5,
                  opacity: 0.9,
                }}
              />

            </>
          )}

        </MapContainer>


        {/* Label فوق الخريطة */}

        <div className="map-label">

          <div className="map-label-pin">

            <svg viewBox="0 0 24 24">
              <path
                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
              />

              <circle
                cx="12"
                cy="10"
                r="2.5"
              />
            </svg>

          </div>

          <span>
            أقرب صيدلية
          </span>

        </div>

      </section>


      {/* =================================================
          PHARMACY CARD
      ================================================= */}

      {pharmacy ? (

        <section className="pharmacy-info-card">

          {/* Header */}

          <div className="pharmacy-main-row">

            <div className="pharmacy-icon">

              <svg viewBox="0 0 24 24">

                <path
                  d="M4 10h16v10H4z"
                />

                <path
                  d="M3 10 5 5h14l2 5"
                />

                <path
                  d="M9 20v-5h6v5"
                />

                <path
                  d="M12 7v4M10 9h4"
                />

              </svg>

            </div>


            <div className="pharmacy-main-info">

              <h2>
                {pharmacyName}
              </h2>

              <p>
                {pharmacyAddress}
              </p>

            </div>


            <div className="pharmacy-store-icon">

              <svg viewBox="0 0 24 24">

                <path
                  d="M4 10h16v10H4z"
                />

                <path
                  d="M3 10 5 5h14l2 5"
                />

                <path
                  d="M9 20v-5h6v5"
                />

                <path
                  d="M12 7v4M10 9h4"
                />

              </svg>

            </div>

          </div>


          {/* Distance */}

          <div className="pharmacy-meta">

            <div className="meta-row">

              <div className="meta-icon">

                <svg viewBox="0 0 24 24">

                  <path
                    d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                  />

                </svg>

              </div>

              <span>
                {pharmacyDistance} كم
              </span>

            </div>


            {/* ساعات العمل */}

            <div className="hours-pill">

              <svg viewBox="0 0 24 24">

                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                />

                <path
                  d="M12 7v5l3 2"
                />

              </svg>

              <span>
                {pharmacyHours}
              </span>

            </div>

          </div>


          {/* Directions */}

          <button
            className="directions-button"
            onClick={openDirections}
          >

            <svg viewBox="0 0 24 24">

              <path
                d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
              />

              <circle
                cx="12"
                cy="9"
                r="2.5"
              />

            </svg>

            <span>
              اتجاهات الوصول
            </span>

          </button>

        </section>

      ) : (

        <section className="empty-pharmacy-card">

          <div className="empty-icon">

            <svg viewBox="0 0 24 24">

              <path
                d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
              />

              <path
                d="M9 9h6M12 6v6"
              />

            </svg>

          </div>

          <h2>
            لا توجد صيدليات متاحة حاليًا
          </h2>

          <p>
            سنعرض لك أقرب صيدلية عند توفرها.
          </p>

        </section>

      )}


      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (

        <div className="success-message">

          <svg viewBox="0 0 24 24">

            <circle
              cx="12"
              cy="12"
              r="9"
            />

            <path
              d="m8 12 2.5 2.5L16 9"
            />

          </svg>

          <span>
            {message}
          </span>

        </div>

      )}


      {/* =================================================
          FOOTER NOTE
      ================================================= */}

      <p className="pharmacy-note">
        سيتم التحقق من الدواء قبل تسليمه للمريض
      </p>


      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        /* ================================================
           PAGE
        ================================================ */

        .pharmacy-page {

          min-height: 100vh;

          padding:
            16px
            14px
            30px;

          background:

            radial-gradient(
              circle at 10% 5%,
              rgba(179,239,228,.42),
              transparent 28%
            ),

            radial-gradient(
              circle at 90% 35%,
              rgba(201,244,237,.35),
              transparent 27%
            ),

            linear-gradient(
              180deg,
              #f5fffd 0%,
              #eefbf8 100%
            );

          color: #164c50;

          overflow-x: hidden;
        }


        /* ================================================
           HEADER
        ================================================ */

        .pharmacy-header {

          height: 55px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 12px;
        }


        .pharmacy-header h1 {

          margin: 0;

          color: #123f43;

          font-size: 23px;

          font-weight: 800;

          text-align: center;

          flex: 1;
        }


        .pharmacy-back {

          width: 44px;
          height: 44px;

          border: 0;

          border-radius: 16px;

          display: flex;

          align-items: center;

          justify-content: center;

          background:
            rgba(219,248,243,.92);

          color: #138578;

          cursor: pointer;

          box-shadow:
            0 7px 18px rgba(30,130,120,.07);
        }


        .pharmacy-back svg {

          width: 23px;
          height: 23px;

          fill: none;

          stroke: currentColor;

          stroke-width: 2;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .header-space {

          width: 44px;
          height: 44px;
        }


        /* ================================================
           MAP
        ================================================ */

        .map-card {

          position: relative;

          width: 100%;

          height: 315px;

          overflow: hidden;

          border-radius: 28px;

          background: #dff5f1;

          border:
            1px solid rgba(255,255,255,.9);

          box-shadow:
            0 12px 30px rgba(38,125,120,.10);

          margin-bottom: 15px;
        }


        .map-card .leaflet-container {

          width: 100% !important;

          height: 100% !important;

          font-family: inherit;

          filter:
            saturate(.72)
            brightness(1.08)
            contrast(.88);
        }


        .map-label {

          position: absolute;

          z-index: 1000;

          top: 22px;

          right: 20px;

          display: flex;

          align-items: center;

          gap: 8px;

          padding:
            8px
            12px
            8px
            9px;

          background:
            rgba(239,255,251,.92);

          border:
            1px solid rgba(255,255,255,.9);

          border-radius: 20px;

          color: #167f75;

          font-size: 14px;

          font-weight: 800;

          box-shadow:
            0 7px 20px rgba(34,128,118,.12);

          backdrop-filter: blur(10px);
        }


        .map-label-pin {

          width: 30px;
          height: 30px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            #159b8a;

          color: white;
        }


        .map-label-pin svg {

          width: 18px;
          height: 18px;

          fill: none;

          stroke: currentColor;

          stroke-width: 2;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================================================
           PHARMACY CARD
        ================================================ */

        .pharmacy-info-card {

          padding:
            18px
            15px;

          background:
            rgba(255,255,255,.91);

          border:
            1px solid rgba(255,255,255,.97);

          border-radius: 28px;

          box-shadow:
            0 12px 32px rgba(39,132,124,.08),

            inset
              0
              1px
              0
              rgba(255,255,255,.95);

          backdrop-filter: blur(14px);

          -webkit-backdrop-filter: blur(14px);
        }


        /* ================================================
           PHARMACY MAIN ROW
        ================================================ */

        .pharmacy-main-row {

          display: flex;

          align-items: center;

          gap: 10px;
        }


        .pharmacy-icon {

          width: 51px;
          height: 51px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background:
            #ddf7f1;
        }


        .pharmacy-icon svg {

          width: 27px;
          height: 27px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .pharmacy-main-info {

          flex: 1;

          min-width: 0;
        }


        .pharmacy-main-info h2 {

          margin: 0;

          color: #16484d;

          font-size: 20px;

          line-height: 1.4;

          font-weight: 800;
        }


        .pharmacy-main-info p {

          margin:
            4px
            0
            0;

          color: #829a9b;

          font-size: 12px;

          line-height: 1.6;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        .pharmacy-store-icon {

          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 15px;

          color: #159b8a;

          background:
            #e4f8f4;
        }


        .pharmacy-store-icon svg {

          width: 24px;
          height: 24px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================================================
           META
        ================================================ */

        .pharmacy-meta {

          margin-top: 15px;

          display: flex;

          flex-direction: column;

          gap: 10px;
        }


        .meta-row {

          display: flex;

          align-items: center;

          justify-content: flex-start;

          gap: 8px;

          color: #4e7779;

          font-size: 14px;

          font-weight: 700;
        }


        .meta-icon {

          width: 32px;
          height: 32px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background:
            #e8faf6;
        }


        .meta-icon svg {

          width: 19px;
          height: 19px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        .hours-pill {

          display: flex;

          align-items: center;

          gap: 8px;

          width: fit-content;

          padding:
            9px
            13px;

          border-radius: 18px;

          color: #188477;

          background:
            #e4f8f4;

          font-size: 12px;

          font-weight: 700;
        }


        .hours-pill svg {

          width: 18px;
          height: 18px;

          flex-shrink: 0;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================================================
           DIRECTIONS BUTTON
        ================================================ */

        .directions-button {

          width: 100%;

          margin-top: 16px;

          padding:
            15px
            18px;

          border: 0;

          border-radius: 22px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #19a995,
              #159b8a
            );

          font-family: inherit;

          font-size: 17px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 12px 26px rgba(21,155,138,.20);

          transition:
            transform .18s ease;
        }


        .directions-button:active {

          transform:
            scale(.98);
        }


        .directions-button svg {

          width: 22px;
          height: 22px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================================================
           EMPTY
        ================================================ */

        .empty-pharmacy-card {

          padding:
            35px
            20px;

          text-align: center;

          background:
            rgba(255,255,255,.9);

          border-radius: 28px;

          box-shadow:
            0 10px 28px rgba(39,132,124,.07);
        }


        .empty-icon {

          width: 62px;
          height: 62px;

          margin:
            0
            auto
            12px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #159b8a;

          background:
            #ddf7f1;
        }


        .empty-icon svg {

          width: 30px;
          height: 30px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;
        }


        .empty-pharmacy-card h2 {

          margin:
            0
            0
            7px;

          color: #16484d;

          font-size: 18px;
        }


        .empty-pharmacy-card p {

          margin: 0;

          color: #849b9c;

          font-size: 13px;
        }


        /* ================================================
           SUCCESS
        ================================================ */

        .success-message {

          margin-top: 14px;

          padding:
            13px
            15px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          border-radius: 19px;

          color: #148477;

          background:
            #e3f9f4;

          font-size: 13px;

          font-weight: 700;
        }


        .success-message svg {

          width: 21px;
          height: 21px;

          flex-shrink: 0;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;

          stroke-linejoin: round;
        }


        /* ================================================
           FOOTER NOTE
        ================================================ */

        .pharmacy-note {

          margin:
            18px
            0
            0;

          text-align: center;

          color: #8ba1a2;

          font-size: 12px;

          line-height: 1.7;
        }


        /* ================================================
           SMALL PHONES
        ================================================ */

        @media (max-width: 360px) {

          .pharmacy-page {

            padding:
              12px
              10px
              25px;
          }


          .pharmacy-header h1 {

            font-size: 20px;
          }


          .map-card {

            height: 285px;

            border-radius: 25px;
          }


          .pharmacy-info-card {

            padding:
              16px
              13px;

            border-radius: 25px;
          }


          .pharmacy-main-info h2 {

            font-size: 18px;
          }


          .pharmacy-store-icon {

            width: 39px;
            height: 39px;
          }


          .directions-button {

            font-size: 15px;
          }

        }

      `}</style>

    </div>
  );
}

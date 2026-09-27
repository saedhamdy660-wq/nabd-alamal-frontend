import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import api, {
  getCurrentLocation,
} from "../api.js";

export default function BloodCenters() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("الأقرب إليك");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [hasLocation, setHasLocation] =
    useState(false);

  // ============================================================
  // Load Blood Centers
  // ============================================================

  useEffect(() => {
    let mounted = true;

    async function loadCenters() {
      try {
        setLoading(true);
        setError("");

        try {
          const location =
            await getCurrentLocation();

          if (!mounted) return;

          const nearby =
            await api.getNearbyBloodCenters({
              lat: location.lat,
              lng: location.lng,
            });

          if (!mounted) return;

          setCenters(
            Array.isArray(nearby)
              ? nearby
              : Array.isArray(
                  nearby?.bloodCenters
                )
              ? nearby.bloodCenters
              : Array.isArray(
                  nearby?.centers
                )
              ? nearby.centers
              : []
          );

          setHasLocation(true);
          setLoading(false);

          return;
        } catch {
          // إذا لم يتوفر الموقع نعرض جميع المراكز.
        }

        if (!mounted) return;

        const result =
          await api.getBloodCenters();

        if (!mounted) return;

        setCenters(
          Array.isArray(result)
            ? result
            : Array.isArray(
                result?.bloodCenters
              )
            ? result.bloodCenters
            : Array.isArray(
                result?.centers
              )
            ? result.centers
            : []
        );

        setHasLocation(false);
      } catch (err) {
        if (!mounted) return;

        setError(
          err?.message ||
            "حدث خطأ أثناء تحميل بيانات المراكز."
        );

        setCenters([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCenters();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================================
  // Helpers
  // ============================================================

  const getCenterName = (center) =>
    center?.name ||
    center?.centerName ||
    center?.title ||
    "مركز أو بنك دم";

  const getCenterType = (center) => {
    const type =
      center?.type ||
      center?.centerType ||
      center?.category ||
      "";

    return String(type).trim();
  };

  const getCenterAddress = (center) =>
    center?.address ||
    center?.location ||
    center?.area ||
    center?.city ||
    "";

  const getCenterPhone = (center) =>
    center?.phone ||
    center?.phoneNumber ||
    center?.telephone ||
    center?.contactPhone ||
    "";

  const getCenterHours = (center) =>
    center?.workingHours ||
    center?.openingHours ||
    center?.hours ||
    "";

  const getDistance = (center) => {
    const value =
      center?.distanceKm ??
      center?.distance ??
      null;

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : null;
  };

  // ============================================================
  // Filter + Search
  // ============================================================

  const filteredCenters = useMemo(() => {
    let result = [...centers];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter(
        (center) => {
          const name =
            getCenterName(center);

          const type =
            getCenterType(center);

          const address =
            getCenterAddress(center);

          return (
            String(name)
              .toLowerCase()
              .includes(searchValue) ||
            String(type)
              .toLowerCase()
              .includes(searchValue) ||
            String(address)
              .toLowerCase()
              .includes(searchValue)
          );
        }
      );
    }

    if (
      activeFilter === "بنوك الدم"
    ) {
      result = result.filter(
        (center) => {
          const type =
            getCenterType(center)
              .toLowerCase();

          return (
            type.includes("بنك") ||
            type.includes("bank")
          );
        }
      );
    }

    if (
      activeFilter === "المراكز"
    ) {
      result = result.filter(
        (center) => {
          const type =
            getCenterType(center)
              .toLowerCase();

          return (
            type.includes("مركز") ||
            type.includes("center")
          );
        }
      );
    }

    if (
      activeFilter === "الأقرب إليك"
    ) {
      result.sort((a, b) => {
        const distanceA =
          getDistance(a);

        const distanceB =
          getDistance(b);

        if (
          distanceA === null &&
          distanceB === null
        ) {
          return 0;
        }

        if (distanceA === null) {
          return 1;
        }

        if (distanceB === null) {
          return -1;
        }

        return (
          distanceA - distanceB
        );
      });
    }

    return result;
  }, [
    centers,
    search,
    activeFilter,
  ]);

  // ============================================================
  // Filter Handler
  // ============================================================

  const handleFilterChange = async (
    filter
  ) => {
    setActiveFilter(filter);

    if (
      filter === "الأقرب إليك" &&
      !hasLocation
    ) {
      try {
        setLoading(true);
        setError("");

        const location =
          await getCurrentLocation();

        const nearby =
          await api.getNearbyBloodCenters({
            lat: location.lat,
            lng: location.lng,
          });

        const data =
          Array.isArray(nearby)
            ? nearby
            : Array.isArray(
                nearby?.bloodCenters
              )
            ? nearby.bloodCenters
            : Array.isArray(
                nearby?.centers
              )
            ? nearby.centers
            : [];

        setCenters(data);
        setHasLocation(true);
      } catch {
        setHasLocation(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // ============================================================
  // Icons
  // ============================================================

  const HeartEcgIcon = ({
    size = 38,
  }) => (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
    >
      <path
        d="M32 54S9 40 9 23C9 15 14.5 10 21 10C26 10 30 13 32 17C34 13 38 10 43 10C49.5 10 55 15 55 23C55 40 32 54 32 54Z"
        stroke="currentColor"
        strokeWidth="3"
      />

      <path
        d="M12 31H21L25 24L30 37L35 20L40 31H52"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LocationIcon = ({
    size = 18,
  }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <path
        d="M12 21S19 15.5 19 9.5C19 5.9 16.3 3 12 3C7.7 3 5 5.9 5 9.5C5 15.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="9.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );

  const ClockIcon = ({
    size = 18,
  }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const PhoneIcon = ({
    size = 18,
  }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <path
        d="M7 4L9.5 3.5L11 8L8.8 9.2C9.7 11.2 11.3 12.8 13.3 13.7L14.5 11.5L19 13L18.5 15.5C18.3 16.6 17.4 17.5 16.3 17.7C10.1 18.7 5.3 13.9 6.3 7.7C6.5 6.6 7.4 5.7 8.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SearchIcon = ({
    size = 21,
  }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // ============================================================
  // Center Card
  // ============================================================

  const renderCenterCard = (
    center,
    index
  ) => {
    const name =
      getCenterName(center);

    const type =
      getCenterType(center);

    const address =
      getCenterAddress(center);

    const phone =
      getCenterPhone(center);

    const hours =
      getCenterHours(center);

    const distance =
      getDistance(center);

    return (
      <article
        key={
          center?.id ||
          center?._id ||
          `${name}-${index}`
        }
        className="blood-center-card"
      >
        {/* Card Header */}

        <div className="center-card-header">
          <div className="center-main-info">
            <div className="center-icon">
              <HeartEcgIcon
                size={29}
              />
            </div>

            <div className="center-title-area">
              <h3>
                {name}
              </h3>

              {type && (
                <span className="center-type">
                  {type}
                </span>
              )}
            </div>
          </div>

          {distance !== null && (
            <div className="distance-badge">
              <LocationIcon size={14} />

              <span>
                {distance < 1
                  ? `${Math.round(
                      distance * 1000
                    )} م`
                  : `${distance.toFixed(
                      1
                    )} كم`}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}

        <div className="card-divider" />

        {/* Details */}

        <div className="center-details">
          {address && (
            <div className="detail-row">
              <div className="detail-icon">
                <LocationIcon />
              </div>

              <div>
                <span className="detail-label">
                  الموقع
                </span>

                <span className="detail-value">
                  {address}
                </span>
              </div>
            </div>
          )}

          {hours && (
            <div className="detail-row">
              <div className="detail-icon">
                <ClockIcon />
              </div>

              <div>
                <span className="detail-label">
                  مواعيد العمل
                </span>

                <span className="detail-value">
                  {hours}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Phone */}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="center-contact"
          >
            <div className="contact-icon">
              <PhoneIcon size={17} />
            </div>

            <span>
              {phone}
            </span>

            <span className="contact-arrow">
              ←
            </span>
          </a>
        )}
      </article>
    );
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <div
      dir="rtl"
      className="blood-centers-page"
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="blood-centers-header">
        <button
          onClick={() =>
            window.history.back()
          }
          aria-label="رجوع"
          className="back-button"
        >
          <span>→</span>
        </button>

        <div className="header-title">
          <h1>
            مراكز وبنوك الدم
          </h1>

          <p>
            اعرف الأماكن والخدمات المتاحة بالقرب منك
          </p>
        </div>

        <div className="header-mini-icon">
          <HeartEcgIcon size={25} />
        </div>
      </header>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="blood-centers-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">
          <div className="hero-icon">
            <HeartEcgIcon size={42} />
          </div>

          <div className="hero-text">
            <span className="hero-small-title">
              دليل مراكز الدم
            </span>

            <h2>
              كل الأماكن المهمة
              <br />
              في مكان واحد
            </h2>

            <p>
              ابحث عن مركز أو بنك دم،
              واعرف موقعه ومواعيد العمل
              ووسائل التواصل المتاحة.
            </p>
          </div>
        </div>

        <div className="hero-bottom-line">
          <div>
            <span className="hero-dot" />
            بيانات المراكز
          </div>

          <div>
            <span className="hero-dot" />
            الموقع
          </div>

          <div>
            <span className="hero-dot" />
            التواصل
          </div>
        </div>
      </section>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <section className="search-section">
        <div className="search-label">
          <span>
            ابحث عن مركز
          </span>

         
        </div>

        <div className="search-box">
          <SearchIcon />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="اسم المركز أو المنطقة..."
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() =>
                setSearch("")
              }
              aria-label="مسح البحث"
            >
              ×
            </button>
          )}
        </div>
      </section>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <section className="filters-section">
        <div className="filters-header">
          <span>
            استكشف حسب
          </span>

          {hasLocation && (
            <span className="location-active">
              <span />
              الموقع مفعل
            </span>
          )}
        </div>

      <div className="filters">
  {[
    "الكل",
    "بنوك الدم",
    "المراكز",
    "الأقرب إليك",
  ].map((filter) => {
            const normalizedFilter =
              filter === "الكل"
                ? "الكل"
                : filter;

            const active =
              activeFilter ===
              normalizedFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  handleFilterChange(
                    normalizedFilter
                  )
                }
                className={
                  active
                    ? "filter-button active"
                    : "filter-button"
                }
              >
                {filter ===
                  "الأقرب إليك" && (
                  <LocationIcon
                    size={15}
                  />
                )}

                {filter}

                {active && (
                  <span className="filter-check">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ======================================================
          MAP PREVIEW
      ====================================================== */}

      <section className="map-section">
        <div className="map-background">
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />

          <div className="map-area area-one" />
          <div className="map-area area-two" />
          <div className="map-area area-three" />
        </div>

        <div className="map-overlay">
          <div className="map-top">
            <div>
              <span className="map-eyebrow">
                اكتشف بالقرب منك
              </span>

              <h3>
                مراكز وبنوك الدم
              </h3>
            </div>

            <div className="map-location-icon">
              <LocationIcon size={22} />
            </div>
          </div>

          <div className="map-pin pin-one">
            <span>
              <HeartEcgIcon size={18} />
            </span>
          </div>

          <div className="map-pin pin-two">
            <span>
              <HeartEcgIcon size={15} />
            </span>
          </div>

          <div className="map-pin pin-three">
            <span>
              <HeartEcgIcon size={16} />
            </span>
          </div>

          <div className="map-user-location">
            <span />
          </div>

          <div className="map-bottom">
            <span>
              {hasLocation
                ? "المراكز مرتبة حسب موقعك"
                : "فعّل الموقع لمعرفة الأقرب إليك"}
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          LIST HEADER
      ====================================================== */}

      <section className="list-heading">
        <div>
          <span className="section-eyebrow">
            دليل المراكز
          </span>

          <h2>
            الأماكن المتاحة
          </h2>

          <p>
            مراكز وبنوك الدم الموجودة في النظام
          </p>
        </div>

        {!loading &&
          !error &&
          filteredCenters.length >
            0 && (
            <div className="results-count">
              <strong>
                {filteredCenters.length}
              </strong>

              <span>
                مكان
              </span>
            </div>
          )}
      </section>

      {/* ======================================================
          LOADING
      ====================================================== */}

      {loading && (
        <section className="state-card">
          <div className="loading-circle" />

          <h3>
            جاري تحميل البيانات
          </h3>

          <p>
            بنجيب لك المراكز والبنوك المتاحة...
          </p>
        </section>
      )}

      {/* ======================================================
          ERROR
      ====================================================== */}

      {!loading &&
        error && (
          <section className="state-card">
            <div className="state-icon error-icon">
              !
            </div>

            <h3>
              تعذر تحميل البيانات
            </h3>

            <p>
              {error}
            </p>
          </section>
        )}

      {/* ======================================================
          CENTER LIST
      ====================================================== */}

      {!loading &&
        !error &&
        filteredCenters.length >
          0 && (
          <section className="centers-list">
            {filteredCenters.map(
              renderCenterCard
            )}
          </section>
        )}

      {/* ======================================================
          EMPTY
      ====================================================== */}

      {!loading &&
        !error &&
        filteredCenters.length ===
          0 && (
          <section className="state-card empty-state">
            <div className="state-icon">
              <HeartEcgIcon size={34} />
            </div>

            <h3>
              {centers.length ===
              0
                ? "لا توجد مراكز مضافة حاليًا"
                : "لا توجد نتائج"}
            </h3>

            <p>
              {centers.length ===
              0
                ? "سيتم إضافة بيانات المراكز والبنوك المعتمدة قريبًا، مع عرض الموقع ومواعيد العمل ووسائل التواصل والخدمات المتاحة."
                : "لم نجد مركزًا أو بنك دم يطابق البحث أو الاختيار الحالي."}
            </p>

            {search && (
              <button
                type="button"
                className="reset-search"
                onClick={() =>
                  setSearch("")
                }
              >
                مسح البحث
              </button>
            )}
          </section>
        )}

      {/* ======================================================
          CSS
      ====================================================== */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .blood-centers-page {
            min-height: 100vh;
            padding-bottom: 90px;
            overflow-x: hidden;
            color: #245b5d;
            font-family: inherit;

            background:
              radial-gradient(
                circle at 5% 8%,
                rgba(255,255,255,.85) 0 3%,
                transparent 20%
              ),
              radial-gradient(
                circle at 93% 18%,
                rgba(255,255,255,.48) 0 5%,
                transparent 21%
              ),
              radial-gradient(
                circle at 15% 75%,
                rgba(255,255,255,.25) 0 5%,
                transparent 22%
              ),
              linear-gradient(
                145deg,
                #efffff 0%,
                #c9f2ef 48%,
                #9fddd8 100%
              );
          }

          /* ================= HEADER ================= */

          .blood-centers-header {
            min-height: 74px;
            padding: 12px 14px;
            display: flex;
            align-items: center;
            gap: 11px;

            position: sticky;
            top: 0;
            z-index: 30;

            background: rgba(239,255,255,.76);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);

            border-bottom:
              1px solid rgba(255,255,255,.65);
          }

          .back-button {
            width: 43px;
            height: 43px;
            flex-shrink: 0;

            border-radius: 15px;
            border:
              1px solid rgba(255,255,255,.88);

            background:
              rgba(255,255,255,.66);

            color: #159b8a;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 21px;
            cursor: pointer;

            box-shadow:
              0 7px 18px rgba(35,139,128,.07);
          }

          .back-button span {
            transform: translateY(-1px);
          }

          .header-title {
            min-width: 0;
            flex: 1;
          }

          .header-title h1 {
            margin: 0;

            font-size: 19px;
            line-height: 1.35;
            font-weight: 850;

            color: #245b5d;
          }

          .header-title p {
            margin: 3px 0 0;

            font-size: 11.5px;
            line-height: 1.5;

            color: #6a898a;
          }

          .header-mini-icon {
            width: 43px;
            height: 43px;
            flex-shrink: 0;

            border-radius: 15px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #159b8a;

            background:
              rgba(255,255,255,.55);

            border:
              1px solid rgba(255,255,255,.82);
          }

          /* ================= HERO ================= */

          .blood-centers-hero {
            margin: 17px 13px 18px;
            min-height: 220px;

            position: relative;
            overflow: hidden;

            border-radius: 28px;

            background:
              linear-gradient(
                140deg,
                rgba(10,168,143,.96),
                rgba(7,136,118,.91)
              );

            border:
              1px solid rgba(255,255,255,.72);

            box-shadow:
              0 18px 38px rgba(20,125,115,.18);

            color: white;
          }

          .hero-glow {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }

          .hero-glow-one {
            width: 180px;
            height: 180px;

            left: -75px;
            top: -80px;

            background:
              rgba(255,255,255,.12);
          }

          .hero-glow-two {
            width: 220px;
            height: 220px;

            right: -105px;
            bottom: -125px;

            background:
              rgba(255,255,255,.10);
          }

          .hero-content {
            position: relative;
            z-index: 2;

            display: flex;
            align-items: flex-start;

            gap: 15px;

            padding: 22px 20px 18px;
          }

          .hero-icon {
            width: 62px;
            height: 62px;

            flex-shrink: 0;

            border-radius: 21px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: white;

            background:
              rgba(255,255,255,.15);

            border:
              1px solid rgba(255,255,255,.22);

            box-shadow:
              inset 0 1px 0 rgba(255,255,255,.15);
          }

          .hero-text {
            min-width: 0;
          }

          .hero-small-title {
            display: inline-block;

            margin-bottom: 6px;

            font-size: 11px;
            font-weight: 700;

            color:
              rgba(255,255,255,.74);
          }

          .hero-text h2 {
            margin: 0;

            font-size: 22px;
            line-height: 1.45;
            font-weight: 850;

            color: white;
          }

          .hero-text p {
            margin: 8px 0 0;

            max-width: 290px;

            font-size: 12.5px;
            line-height: 1.8;

            color:
              rgba(255,255,255,.82);
          }

          .hero-bottom-line {
            position: absolute;
            z-index: 3;

            right: 20px;
            left: 20px;
            bottom: 16px;

            display: flex;
            align-items: center;

            justify-content: space-between;

            padding-top: 12px;

            border-top:
              1px solid rgba(255,255,255,.18);
          }

          .hero-bottom-line div {
            display: flex;
            align-items: center;
            gap: 5px;

            font-size: 10.5px;

            color:
              rgba(255,255,255,.76);
          }

          .hero-dot {
            width: 5px;
            height: 5px;

            border-radius: 50%;

            background:
              rgba(255,255,255,.72);
          }

          /* ================= SEARCH ================= */

          .search-section {
            margin: 0 13px 17px;
          }

          .search-label {
            display: flex;
            align-items: baseline;
            justify-content: space-between;

            padding: 0 3px 8px;
          }

          .search-label span {
            font-size: 14px;
            font-weight: 800;

            color: #245b5d;
          }

          .search-label small {
            font-size: 10.5px;
            color: #779495;
          }

          .search-box {
            height: 55px;

            display: flex;
            align-items: center;

            gap: 10px;

            padding: 0 16px;

            border-radius: 18px;

            background:
              rgba(255,255,255,.72);

            border:
              1px solid rgba(255,255,255,.88);

            box-shadow:
              0 9px 24px rgba(42,128,128,.08);

            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);

            color: #159b8a;
          }

          .search-box input {
            min-width: 0;
            flex: 1;

            height: 100%;

            border: 0;
            outline: 0;

            background: transparent;

            font-family: inherit;
            font-size: 13px;

            color: #245b5d;
          }

          .search-box input::placeholder {
            color: #8aa4a5;
          }

          .clear-search {
            width: 26px;
            height: 26px;

            border: 0;
            border-radius: 50%;

            background:
              rgba(21,155,138,.10);

            color: #159b8a;

            font-size: 18px;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
          }

          /* ================= FILTERS ================= */

          .filters-section {
            margin-bottom: 17px;
          }

          .filters-header {
            padding: 0 16px 9px;

            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .filters-header > span:first-child {
            font-size: 12px;
            font-weight: 800;

            color: #456f70;
          }

          .location-active {
            display: flex;
            align-items: center;
            gap: 5px;

            font-size: 10px;
            font-weight: 700;

            color: #159b8a;
          }

          .location-active span {
            width: 6px;
            height: 6px;

            border-radius: 50%;

            background: #159b8a;

            box-shadow:
              0 0 0 4px rgba(21,155,138,.08);
          }

          .filters {
            display: flex;
            gap: 8px;

            padding:
              0 13px 3px;

            overflow-x: auto;

            scrollbar-width: none;
          }

          .filters::-webkit-scrollbar {
            display: none;
          }

          .filter-button {
            min-height: 40px;

            flex-shrink: 0;

            display: flex;
            align-items: center;
            gap: 6px;

            padding: 0 14px;

            border-radius: 14px;

            border:
              1px solid rgba(255,255,255,.68);

            background:
              rgba(255,255,255,.42);

            color: #648486;

            font-family: inherit;
            font-size: 11.5px;
            font-weight: 750;

            cursor: pointer;

            transition:
              transform .18s ease,
              background .18s ease;
          }

          .filter-button:active {
            transform: scale(.97);
          }

          .filter-button.active {
            color: white;

            border-color:
              rgba(10,168,143,.22);

            background:
              linear-gradient(
                135deg,
                #0aa88f,
                #078876
              );

            box-shadow:
              0 8px 18px rgba(10,168,143,.16);
          }

          .filter-check {
            width: 17px;
            height: 17px;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
              rgba(255,255,255,.18);

            font-size: 9px;
          }

          /* ================= MAP ================= */

          .map-section {
            height: 214px;

            margin:
              0 13px 23px;

            position: relative;
            overflow: hidden;

            border-radius: 25px;

            border:
              1px solid rgba(255,255,255,.78);

            box-shadow:
              0 12px 28px rgba(42,128,128,.10);
          }

          .map-background {
            position: absolute;
            inset: 0;

            overflow: hidden;

            background:
              linear-gradient(
                135deg,
                #d8f0eb,
                #b6ded8
              );
          }

          .map-background::before {
            content: "";

            position: absolute;
            inset: 0;

            opacity: .32;

            background-image:
              linear-gradient(
                35deg,
                transparent 45%,
                rgba(255,255,255,.7) 46%,
                rgba(255,255,255,.7) 49%,
                transparent 50%
              );

            background-size:
              130px 90px;
          }

          .map-road {
            position: absolute;

            background:
              rgba(255,255,255,.72);

            box-shadow:
              0 0 0 5px rgba(173,215,208,.34);
          }

          .road-one {
            width: 125%;
            height: 15px;

            top: 50%;
            right: -12%;

            transform:
              rotate(-13deg);
          }

          .road-two {
            width: 110%;
            height: 10px;

            top: 20%;
            right: -5%;

            transform:
              rotate(20deg);
          }

          .road-three {
            width: 115%;
            height: 8px;

            bottom: 18%;
            left: -9%;

            transform:
              rotate(-28deg);
          }

          .map-area {
            position: absolute;

            border-radius: 45%;

            background:
              rgba(131,195,184,.22);
          }

          .area-one {
            width: 120px;
            height: 80px;

            right: 18px;
            top: 78px;

            transform: rotate(-18deg);
          }

          .area-two {
            width: 100px;
            height: 70px;

            left: 12px;
            top: 30px;

            transform: rotate(16deg);
          }

          .area-three {
            width: 150px;
            height: 85px;

            left: 65px;
            bottom: -25px;

            transform: rotate(-7deg);
          }

          .map-overlay {
            position: absolute;
            inset: 0;
          }

          .map-top {
            position: absolute;

            right: 13px;
            left: 13px;
            top: 13px;

            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            padding: 12px 13px;

            border-radius: 17px;

            background:
              rgba(255,255,255,.73);

            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);

            border:
              1px solid rgba(255,255,255,.78);
          }

          .map-eyebrow {
            display: block;

            margin-bottom: 2px;

            font-size: 9px;
            font-weight: 700;

            color: #789798;
          }

          .map-top h3 {
            margin: 0;

            font-size: 14px;
            font-weight: 850;

            color: #245b5d;
          }

          .map-location-icon {
            width: 38px;
            height: 38px;

            border-radius: 12px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #159b8a;

            background:
              rgba(225,249,245,.95);
          }

          .map-pin {
            position: absolute;

            display: flex;
            align-items: center;
            justify-content: center;

            filter:
              drop-shadow(
                0 6px 8px rgba(28,120,110,.16)
              );
          }

          .map-pin span {
            width: 35px;
            height: 35px;

            border-radius: 50% 50% 50% 8px;

            transform: rotate(-45deg);

            display: flex;
            align-items: center;
            justify-content: center;

            background: #0aa88f;
            color: white;
          }

          .map-pin svg {
            transform: rotate(45deg);
          }

          .pin-one {
            right: 33%;
            top: 47%;
          }

          .pin-two {
            right: 16%;
            top: 66%;
          }

          .pin-three {
            left: 27%;
            top: 56%;
          }

          .map-user-location {
            position: absolute;

            right: 50%;
            top: 60%;

            width: 17px;
            height: 17px;

            border-radius: 50%;

            background: #168cdd;

            border:
              4px solid rgba(255,255,255,.92);

            box-shadow:
              0 0 0 6px rgba(22,140,221,.15);
          }

          .map-bottom {
            position: absolute;

            right: 13px;
            left: 13px;
            bottom: 13px;

            padding: 9px 12px;

            text-align: center;

            border-radius: 13px;

            background:
              rgba(255,255,255,.75);

            backdrop-filter: blur(8px);

            color: #5c7d7e;

            font-size: 10.5px;
            font-weight: 650;
          }

          /* ================= LIST HEADER ================= */

          .list-heading {
            margin:
              0 13px 13px;

            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            gap: 12px;
          }

          .section-eyebrow {
            display: block;

            margin-bottom: 3px;

            font-size: 10px;
            font-weight: 800;

            color: #159b8a;
          }

          .list-heading h2 {
            margin: 0;

            font-size: 19px;
            font-weight: 850;

            color: #245b5d;
          }

          .list-heading p {
            margin: 4px 0 0;

            font-size: 11px;

            color: #6d898a;
          }

          .results-count {
            min-width: 53px;

            padding: 8px 7px;

            border-radius: 14px;

            display: flex;
            flex-direction: column;

            align-items: center;

            background:
              rgba(255,255,255,.60);

            border:
              1px solid rgba(255,255,255,.75);
          }

          .results-count strong {
            font-size: 17px;
            line-height: 1;

            color: #159b8a;
          }

          .results-count span {
            margin-top: 3px;

            font-size: 9px;
            color: #719091;
          }

          /* ================= CENTER CARDS ================= */

          .centers-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .blood-center-card {
            margin: 0 13px;

            padding: 17px;

            border-radius: 22px;

            background:
              rgba(255,255,255,.72);

            border:
              1px solid rgba(255,255,255,.88);

            box-shadow:
              0 10px 25px rgba(42,128,128,.08);

            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);

            transition:
              transform .18s ease,
              box-shadow .18s ease;
          }

          .blood-center-card:active {
            transform: scale(.99);

            box-shadow:
              0 6px 16px rgba(42,128,128,.07);
          }

          .center-card-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            gap: 10px;
          }

          .center-main-info {
            min-width: 0;
            flex: 1;

            display: flex;
            align-items: center;

            gap: 11px;
          }

          .center-icon {
            width: 50px;
            height: 50px;

            flex-shrink: 0;

            border-radius: 17px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #159b8a;

            background:
              linear-gradient(
                145deg,
                rgba(229,250,246,.98),
                rgba(203,241,235,.82)
              );

            border:
              1px solid rgba(255,255,255,.85);
          }

          .center-title-area {
            min-width: 0;
          }

          .center-title-area h3 {
            margin: 0;

            overflow: hidden;

            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;

            color: #245b5d;

            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .center-type {
            display: inline-block;

            margin-top: 5px;

            padding:
              4px 8px;

            border-radius: 9px;

            background:
              rgba(218,247,242,.86);

            color: #178e81;

            font-size: 9.5px;
            font-weight: 800;
          }

          .distance-badge {
            min-width: 55px;

            padding: 6px 7px;

            display: flex;
            align-items: center;
            justify-content: center;

            gap: 3px;

            border-radius: 10px;

            background:
              rgba(224,248,244,.90);

            color: #178e81;

            font-size: 9.5px;
            font-weight: 800;
          }

          .card-divider {
            height: 1px;

            margin:
              14px 0 12px;

            background:
              rgba(79,151,145,.10);
          }

          .center-details {
            display: flex;
            flex-direction: column;

            gap: 10px;
          }

          .detail-row {
            display: flex;
            align-items: flex-start;

            gap: 9px;
          }

          .detail-icon {
            width: 30px;
            height: 30px;

            flex-shrink: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 10px;

            background:
              rgba(225,249,245,.78);

            color: #159b8a;
          }

          .detail-row > div:last-child {
            min-width: 0;
          }

          .detail-label {
            display: block;

            margin-bottom: 1px;

            font-size: 9px;
            font-weight: 700;

            color: #8aa0a1;
          }

          .detail-value {
            display: block;

            font-size: 11.5px;
            line-height: 1.55;

            color: #527576;
          }

          .center-contact {
            min-height: 42px;

            margin-top: 13px;

            padding: 0 10px;

            display: flex;
            align-items: center;

            gap: 8px;

            text-decoration: none;

            border-radius: 13px;

            background:
              rgba(231,250,247,.76);

            color: #178e81;

            font-size: 11.5px;
            font-weight: 800;

            border:
              1px solid rgba(255,255,255,.70);
          }

          .contact-icon {
            width: 27px;
            height: 27px;

            border-radius: 9px;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
              rgba(255,255,255,.75);
          }

          .contact-arrow {
            margin-right: auto;

            font-size: 15px;

            opacity: .65;
          }

          /* ================= STATES ================= */

          .state-card {
            margin: 0 13px;

            padding: 29px 19px;

            border-radius: 22px;

            text-align: center;

            background:
              rgba(255,255,255,.72);

            border:
              1px solid rgba(255,255,255,.87);

            box-shadow:
              0 10px 25px rgba(42,128,128,.07);

            backdrop-filter: blur(10px);
          }

          .state-card h3 {
            margin:
              0 0 7px;

            font-size: 16px;
            font-weight: 850;

            color: #245b5d;
          }

          .state-card p {
            margin: 0;

            font-size: 12px;
            line-height: 1.8;

            color: #6b8889;
          }

          .loading-circle {
            width: 43px;
            height: 43px;

            margin:
              0 auto 15px;

            border-radius: 50%;

            border:
              3px solid rgba(21,155,138,.13);

            border-top-color:
              #159b8a;

            animation:
              bloodCentersSpin 1s linear infinite;
          }

          .state-icon {
            width: 64px;
            height: 64px;

            margin:
              0 auto 15px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 21px;

            background:
              linear-gradient(
                145deg,
                #e4faf6,
                #caeee9
              );

            color: #159b8a;

            border:
              1px solid rgba(255,255,255,.85);
          }

          .error-icon {
            font-size: 26px;
            font-weight: 850;
          }

          .reset-search {
            margin-top: 16px;

            height: 39px;

            padding: 0 18px;

            border: 0;
            border-radius: 13px;

            background:
              linear-gradient(
                135deg,
                #0aa88f,
                #078876
              );

            color: white;

            font-family: inherit;
            font-size: 11px;
            font-weight: 800;

            cursor: pointer;
          }

          /* ================= ANIMATION ================= */

          @keyframes bloodCentersSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          /* ================= SMALL SCREENS ================= */

          @media (max-width: 350px) {
            .hero-text h2 {
              font-size: 19px;
            }

            .hero-content {
              padding:
                19px 16px 16px;
            }

            .hero-icon {
              width: 55px;
              height: 55px;
            }

            .hero-bottom-line {
              right: 16px;
              left: 16px;
            }

            .blood-center-card {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
}

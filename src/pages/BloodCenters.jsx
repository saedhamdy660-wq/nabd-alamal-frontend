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

        // نحاول أولاً الحصول على موقع المستخدم
        // حتى نستخدم endpoint الأقرب إليك.
        try {
          const location =
            await getCurrentLocation();

          if (!mounted) return;

          const nearby =
            await api.getNearbyBloodCenters(
              {
                lat: location.lat,
                lng: location.lng,
              }
            );

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
          // لو المستخدم رفض الموقع أو حصل أي خطأ
          // نستخدم كل المراكز الموجودة في الـBackend.
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
            "حدث خطأ أثناء تحميل مراكز وبنوك الدم."
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
      activeFilter === "مراكز التبرع"
    ) {
      result = result.filter(
        (center) => {
          const type =
            getCenterType(center)
              .toLowerCase();

          return (
            type.includes("مركز") ||
            type.includes("تبرع") ||
            type.includes("center") ||
            type.includes("donation")
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
          await api.getNearbyBloodCenters(
            {
              lat: location.lat,
              lng: location.lng,
            }
          );

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
        // لو الموقع غير متاح، نستخدم البيانات الموجودة
        // ونرتبها حسب distanceKm إن كانت موجودة.
        setHasLocation(false);
      } finally {
        setLoading(false);
      }
    }
  };

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
      <section
        key={
          center?.id ||
          center?._id ||
          `${name}-${index}`
        }
        style={{
          margin: "0 18px 12px",
          background: "#ffffff",
          border:
            "1px solid #edf2f1",
          borderRadius: "20px",
          padding: "18px",
          boxShadow:
            "0 5px 18px rgba(23,51,46,.04)",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent:
              "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems:
                "flex-start",
              gap: "12px",
              minWidth: 0,
              flex: 1,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                flexShrink: 0,
                borderRadius: "15px",
                background:
                  "#e6f7f4",
                color: "#0aa88f",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <svg
                viewBox="0 0 64 64"
                width="27"
                height="27"
                fill="none"
              >
                <path
                  d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M25 39C26.5 43 29 45 33 45"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                minWidth: 0,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#17332e",
                  lineHeight: 1.5,
                }}
              >
                {name}
              </h3>

              {type && (
                <span
                  style={{
                    display:
                      "inline-block",
                    marginTop: "5px",
                    padding:
                      "4px 9px",
                    borderRadius:
                      "12px",
                    background:
                      "#f1faf8",
                    color:
                      "#078876",
                    fontSize:
                      "11px",
                    fontWeight: 700,
                  }}
                >
                  {type}
                </span>
              )}
            </div>
          </div>

          {distance !== null && (
            <div
              style={{
                flexShrink: 0,
                padding:
                  "6px 9px",
                borderRadius:
                  "12px",
                background:
                  "#e6f7f4",
                color:
                  "#078876",
                fontSize:
                  "11px",
                fontWeight: 800,
              }}
            >
              {distance < 1
                ? `${Math.round(
                    distance * 1000
                  )} م`
                : `${distance.toFixed(
                    1
                  )} كم`}
            </div>
          )}
        </div>

        {/* Address */}
        {address && (
          <div
            style={{
              display: "flex",
              alignItems:
                "flex-start",
              gap: "8px",
              marginTop: "15px",
              color: "#536966",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              style={{
                flexShrink: 0,
                marginTop: "1px",
                color: "#0aa88f",
              }}
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

            <span>
              {address}
            </span>
          </div>
        )}

        {/* Working Hours */}
        {hours && (
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "8px",
              marginTop: "9px",
              color: "#536966",
              fontSize: "13px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              style={{
                flexShrink: 0,
                color: "#0aa88f",
              }}
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

            <span>
              {hours}
            </span>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <a
            href={`tel:${phone}`}
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "8px",
              marginTop: "9px",
              color: "#078876",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration:
                "none",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              style={{
                flexShrink: 0,
              }}
            >
              <path
                d="M7 4L9.5 3.5L11 8L8.8 9.2C9.7 11.2 11.3 12.8 13.3 13.7L14.5 11.5L19 13L18.5 15.5C18.3 16.6 17.4 17.5 16.3 17.7C10.1 18.7 5.3 13.9 6.3 7.7C6.5 6.6 7.4 5.7 8.5 5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>
              {phone}
            </span>
          </a>
        )}
      </section>
    );
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #fafdfc 0%, #f1faf8 55%, #e8f7f4 100%)",
        color: "#17332e",
        paddingBottom: "90px",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          padding: "22px 18px 14px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background:
            "rgba(250,253,252,.94)",
          backdropFilter:
            "blur(12px)",
          borderBottom:
            "1px solid #edf2f1",
        }}
      >
        <button
          onClick={() =>
            window.history.back()
          }
          aria-label="رجوع"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            border:
              "1px solid #e3eeeb",
            background:
              "#ffffff",
            color: "#0aa88f",
            fontSize: "22px",
            cursor: "pointer",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
          }}
        >
          ←
        </button>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "21px",
              fontWeight: 800,
            }}
          >
            مراكز وبنوك الدم
          </h1>

          <p
            style={{
              margin:
                "4px 0 0",
              color: "#6b7c79",
              fontSize: "13px",
            }}
          >
            تبرع بالدم في أقرب مركز معتمد
          </p>
        </div>
      </header>

      {/* ================= INTRO ================= */}
      <section
        style={{
          margin: "18px",
          padding: "20px",
          borderRadius: "22px",
          background:
            "linear-gradient(135deg, #0aa88f 0%, #078876 100%)",
          color: "#ffffff",
          boxShadow:
            "0 12px 30px rgba(10,168,143,.18)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "17px",
            background:
              "rgba(255,255,255,.16)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            marginBottom:
              "14px",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            width="32"
            height="32"
            fill="none"
          >
            <path
              d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M25 39C26.5 43 29 45 33 45"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2
          style={{
            margin:
              "0 0 8px",
            fontSize: "20px",
          }}
        >
          تبرعك ممكن ينقذ حياة ❤️
        </h2>

        <p
          style={{
            margin: 0,
            lineHeight: 1.8,
            fontSize: "14px",
            opacity: 0.92,
          }}
        >
          ابحث عن أقرب مركز أو بنك دم، واعرف بيانات التواصل ومواعيد العمل
          قبل التوجه للتبرع.
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <div
        style={{
          margin:
            "0 18px 18px",
          position:
            "relative",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          style={{
            position:
              "absolute",
            right: "16px",
            top: "50%",
            transform:
              "translateY(-50%)",
            color: "#0aa88f",
          }}
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

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="ابحث عن مركز أو بنك دم..."
          style={{
            width: "100%",
            boxSizing:
              "border-box",
            height: "54px",
            borderRadius:
              "17px",
            border:
              "1px solid #e3eeeb",
            outline: "none",
            padding:
              "0 48px 0 16px",
            fontSize: "14px",
            fontFamily:
              "inherit",
            background:
              "#ffffff",
            color: "#17332e",
          }}
        />
      </div>

      {/* ================= FILTERS ================= */}
      <div
        style={{
          display: "flex",
          gap: "9px",
          overflowX:
            "auto",
          padding:
            "0 18px 8px",
          scrollbarWidth:
            "none",
        }}
      >
        {[
          "الأقرب إليك",
          "بنوك الدم",
          "مراكز التبرع",
        ].map((filter) => {
          const active =
            activeFilter ===
            filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() =>
                handleFilterChange(
                  filter
                )
              }
              style={{
                flexShrink: 0,
                border: active
                  ? "1px solid #0aa88f"
                  : "1px solid #e3eeeb",
                background: active
                  ? "#e6f7f4"
                  : "#ffffff",
                color: active
                  ? "#078876"
                  : "#6b7c79",
                borderRadius:
                  "22px",
                padding:
                  "10px 16px",
                fontFamily:
                  "inherit",
                fontSize: "13px",
                fontWeight: 700,
                cursor:
                  "pointer",
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* ================= MAP PLACEHOLDER ================= */}
      <section
        style={{
          margin:
            "14px 18px 20px",
          height: "190px",
          borderRadius:
            "22px",
          overflow: "hidden",
          position:
            "relative",
          background:
            "linear-gradient(135deg, #dff3ef 0%, #eef8f6 100%)",
          border:
            "1px solid #dcece8",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            opacity: 0.35,
            backgroundImage:
              "linear-gradient(#b9dcd5 1px, transparent 1px), linear-gradient(90deg, #b9dcd5 1px, transparent 1px)",
            backgroundSize:
              "32px 32px",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%, -50%)",
            width: "52px",
            height: "52px",
            borderRadius:
              "50%",
            background:
              "#0aa88f",
            color: "#ffffff",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            boxShadow:
              "0 8px 22px rgba(10,168,143,.28)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="27"
            height="27"
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
        </div>

        <div
          style={{
            position:
              "absolute",
            bottom: "14px",
            right: "14px",
            left: "14px",
            background:
              "rgba(255,255,255,.94)",
            borderRadius:
              "14px",
            padding:
              "10px 13px",
            fontSize: "12px",
            color: "#536966",
            textAlign:
              "center",
          }}
        >
          خريطة أقرب مراكز وبنوك الدم
        </div>
      </section>

      {/* ================= TITLE ================= */}
      <div
        style={{
          padding:
            "0 18px",
          marginBottom:
            "12px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 800,
          }}
        >
          مراكز وبنوك الدم
        </h2>

        <p
          style={{
            margin:
              "5px 0 0",
            fontSize: "13px",
            color: "#6b7c79",
          }}
        >
          الأماكن المتاحة للتبرع بالدم
        </p>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <section
          style={{
            margin:
              "0 18px",
            background:
              "#ffffff",
            border:
              "1px solid #edf2f1",
            borderRadius:
              "20px",
            padding:
              "24px 18px",
            textAlign:
              "center",
            boxShadow:
              "0 5px 18px rgba(23,51,46,.04)",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              margin:
                "0 auto 14px",
              borderRadius:
                "50%",
              border:
                "3px solid #dff3ef",
              borderTopColor:
                "#0aa88f",
              animation:
                "bloodCentersSpin 1s linear infinite",
            }}
          />

          <h3
            style={{
              margin:
                "0 0 8px",
              fontSize: "16px",
            }}
          >
            جاري تحميل المراكز
          </h3>

          <p
            style={{
              margin: 0,
              color:
                "#6b7c79",
              fontSize:
                "13px",
            }}
          >
            بنجيب لك بيانات مراكز وبنوك الدم المتاحة...
          </p>
        </section>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <section
          style={{
            margin:
              "0 18px",
            background:
              "#ffffff",
            border:
              "1px solid #f0dfdf",
            borderRadius:
              "20px",
            padding:
              "24px 18px",
            textAlign:
              "center",
            boxShadow:
              "0 5px 18px rgba(23,51,46,.04)",
          }}
        >
          <div
            style={{
              width: "62px",
              height: "62px",
              margin:
                "0 auto 14px",
              borderRadius:
                "20px",
              background:
                "#fff1f1",
              color:
                "#c75c5c",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              fontSize:
                "28px",
              fontWeight:
                800,
            }}
          >
            !
          </div>

          <h3
            style={{
              margin:
                "0 0 8px",
              fontSize:
                "16px",
            }}
          >
            حصل خطأ أثناء تحميل المراكز
          </h3>

          <p
            style={{
              margin: 0,
              color:
                "#6b7c79",
              fontSize:
                "13px",
              lineHeight:
                1.8,
            }}
          >
            {error}
          </p>
        </section>
      )}

      {/* ================= CENTER LIST ================= */}
      {!loading &&
        !error &&
        filteredCenters.length >
          0 && (
          <div>
            {filteredCenters.map(
              renderCenterCard
            )}
          </div>
        )}

      {/* ================= EMPTY DATA STATE ================= */}
      {!loading &&
        !error &&
        filteredCenters.length ===
          0 && (
          <section
            style={{
              margin:
                "0 18px",
              background:
                "#ffffff",
              border:
                "1px solid #edf2f1",
              borderRadius:
                "20px",
              padding:
                "24px 18px",
              textAlign:
                "center",
              boxShadow:
                "0 5px 18px rgba(23,51,46,.04)",
            }}
          >
            <div
              style={{
                width: "62px",
                height: "62px",
                margin:
                  "0 auto 14px",
                borderRadius:
                  "20px",
                background:
                  "#e6f7f4",
                color:
                  "#0aa88f",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <svg
                viewBox="0 0 64 64"
                width="34"
                height="34"
                fill="none"
              >
                <path
                  d="M32 8C32 8 17 25 17 37C17 46 23.7 53 32 53C40.3 53 47 46 47 37C47 25 32 8 32 8Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <h3
              style={{
                margin:
                  "0 0 8px",
                fontSize:
                  "16px",
              }}
            >
              {centers.length ===
                0
                ? "لا توجد مراكز مضافة حاليًا"
                : "لا توجد نتائج"}
            </h3>

            <p
              style={{
                margin: 0,
                color:
                  "#6b7c79",
                fontSize:
                  "13px",
                lineHeight:
                  1.8,
              }}
            >
              {centers.length ===
              0
                ? "سيتم إضافة بيانات مراكز وبنوك الدم المعتمدة قريبًا، مع إمكانية معرفة الموقع ومواعيد العمل ووسائل التواصل."
                : "لم نجد مركزًا يطابق البحث أو الفلتر المحدد."}
            </p>
          </section>
        )}

      {/* ================= SPINNER ANIMATION ================= */}
      <style>
        {`
          @keyframes bloodCentersSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

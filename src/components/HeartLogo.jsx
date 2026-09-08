import React from "react";

export default function HeartLogo({ size = 90, heartColor = "white", ecgColor = "#0aa88f", bg = "rgba(255,255,255,0.15)", outline = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: outline ? "white" : bg,
        border: outline ? `2px solid ${heartColor}` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 100 100" fill="none">
        <path
          d="M50 88C50 88 12 63 12 35C12 19 24 9 38 9C46 9 50 15 50 15C50 15 54 9 62 9C76 9 88 19 88 35C88 63 50 88 50 88Z"
          fill={outline ? "none" : heartColor}
          stroke={outline ? heartColor : "none"}
          strokeWidth={outline ? 5 : 0}
        />
        <path
          d="M18 46H34L40 34L48 58L54 46H82"
          stroke={outline ? heartColor : ecgColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

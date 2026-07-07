import { ImageResponse } from "next/og";

export const alt = "Wala Eddine Ghazouani — AI Systems & Data Science";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBFAF7",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#5F6B7A",
            fontFamily: "monospace",
          }}
        >
          MULTI-AGENT AI · UX AUDITS · DOCUMENT AUTOMATION
        </div>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            color: "#10182B",
            fontWeight: 700,
            maxWidth: 980,
            letterSpacing: "-0.02em",
          }}
        >
          Turn the data you&apos;re ignoring into systems that work for you.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#10182B",
            fontFamily: "monospace",
          }}
        >
          <span>Wala Eddine Ghazouani</span>
          <span style={{ color: "#C47D0E" }}>● AI Systems &amp; Data Science</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

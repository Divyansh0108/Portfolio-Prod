import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Writing — Divyansh Pandey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#a3a3a3",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 16,
          }}
        >
          Divyansh Pandey
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Writing
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#737373",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Essays, guides, and technical deep-dives — published on Medium.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            gap: 24,
            fontSize: 14,
            color: "#525252",
          }}
        >
          <span>ML · NLP · MLOps</span>
          <span>·</span>
          <span>Technical Deep-Dives</span>
          <span>·</span>
          <span>Build Logs</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

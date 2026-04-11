import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Contact — Divyansh Pandey";
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
          Get in Touch
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#737373",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Always open to interesting problems, collaborations, and opportunities.
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
          <span>ML Engineer</span>
          <span>·</span>
          <span>Researcher</span>
          <span>·</span>
          <span>Builder</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

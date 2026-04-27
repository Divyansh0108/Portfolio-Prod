import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Divyansh Pandey — ML Engineer · Researcher · Builder";
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
            fontSize: 16,
            color: "#a3a3a3",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 16,
          }}
        >
          ML Engineer · Researcher · Builder
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
          Divyansh Pandey
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#737373",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Turning research into real systems — across ML, NLP, CV, and Agents.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            gap: 24,
            fontSize: 16,
            color: "#525252",
          }}
        >
          <span>Springer Nature Author</span>
          <span>·</span>
          <span>IIT Hyderabad · IAIRO</span>
          <span>·</span>
          <span>3× Dean&apos;s List</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

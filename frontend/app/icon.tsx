import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090909",
          borderRadius: "7px",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.5px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          <span style={{ color: "#22c55e" }}>V</span>B
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

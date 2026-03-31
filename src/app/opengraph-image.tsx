import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Royal Closet - 왕실 드레스 가상 피팅";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #f8fafc 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          👑
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "#e11d48",
            letterSpacing: -2,
          }}
        >
          The Royal Closet
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#64748b",
            marginTop: 16,
          }}
        >
          왕실 드레스 가상 피팅 & 아바타 꾸미기
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Royal", "Classic", "Modern", "Regency"].map((name) => (
            <div
              key={name}
              style={{
                background: "#f1f5f9",
                borderRadius: 999,
                padding: "8px 24px",
                fontSize: 20,
                color: "#475569",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

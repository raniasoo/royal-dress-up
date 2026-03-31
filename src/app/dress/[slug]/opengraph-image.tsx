import { ImageResponse } from "next/og";
import { getDressBySlug, dresses } from "@/data/dresses";

export const runtime = "edge";
export const alt = "The Royal Closet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return dresses.map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dress = getDressBySlug(slug);

  const name = dress?.name ?? "드레스";
  const royal = dress?.royal.name ?? "";
  const designer = dress?.designer ?? "";
  const year = dress?.year ?? "";

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
        <div style={{ fontSize: 60, marginBottom: 16 }}>👑</div>
        <div
          style={{
            fontSize: 24,
            color: "#e11d48",
            fontWeight: 600,
          }}
        >
          {royal}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#0f172a",
            marginTop: 8,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            marginTop: 16,
          }}
        >
          {designer} · {year}
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#e11d48",
            marginTop: 40,
            fontWeight: 600,
          }}
        >
          The Royal Closet
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muskan Choudhary — Data Analyst";

/**
 * Static social card, rendered once at build time. No runtime cost on
 * Vercel's free tier.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #0a0e17 0%, #0e1424 55%, #101b33 100%)",
          color: "#f2f4f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#62b6f7",
              color: "#0a1725",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            MC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700 }}>
              Muskan Choudhary
            </span>
            <span style={{ fontSize: 20, color: "#b6c0d4" }}>Data Analyst</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 940,
            }}
          >
            Dashboards, SQL and clean data that people can act on.
          </span>
          <span style={{ fontSize: 24, color: "#b6c0d4" }}>
            SQL · Power BI · Excel · Python · Pandas
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#9aa6bd",
          }}
        >
          <span>Jagannath University, Jaipur · B.Tech CSE</span>
          <span style={{ color: "#62b6f7" }}>muskan-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  images: {
    // AVIF first, WebP fallback — smallest possible payload for the profile
    // photo and the case-study charts.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600],
    imageSizes: [96, 112, 144, 160, 192, 256, 320],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Only the first-party stock of this portfolio is ever optimised.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // SAMEORIGIN (not DENY) so first-party resources — notably the PDF
          // served by /resume — can still be framed by this site itself.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // /resume is the canonical, crawlable URL for the CV. The raw asset
        // stays reachable for direct sharing, but is kept out of the index so
        // search engines only ever see one copy of the PDF.
        source: "/Muskan-Choudhary-Resume.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      {
        source: "/projects/:slug*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;

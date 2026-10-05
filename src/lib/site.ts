/**
 * Central site configuration.
 *
 * NOTE: no personal contact number is authored anywhere in this codebase,
 * in components, or in any structured data. The PDF resume under /resume is
 * the only artefact in the project that carries one, by explicit product
 * decision.
 */

export const SITE = {
  name: "Muskan Choudhary",
  legalName: "Muskan Choudhary",
  /** Production origin — used for canonicals, OG, sitemap and JSON-LD. */
  url: "https://muskan-choudhary.vercel.app",
  title: "Muskan Choudhary — Data Analyst",
  tagline: "Data Analyst",
  role: "Data Analyst",
  roleKeywords: ["Data Analyst", "Reporting Analyst", "Business Intelligence Analyst"],
  description:
    "Portfolio of Muskan Choudhary, a Data Analyst skilled in SQL, Power BI, Excel and Python. B.Tech CSE student at Jagannath University, Jaipur, building dashboards and data pipelines that turn raw data into decisions.",
  email: "muskanchy05@gmail.com",
  image: "/images/muskan.jpg",
  /** Served by `src/app/resume/route.ts` — the route *is* the PDF. */
  resumePath: "/resume",
  locale: "en_IN",
  type: "website",
  keywords: [
    "Muskan Choudhary",
    "Data Analyst",
    "SQL",
    "Power BI",
    "Excel",
    "Python",
    "Pandas",
    "Data Visualization",
    "Jagannath University Jaipur",
    "B.Tech CSE",
    "Data Analyst portfolio",
    "Jaipur Rajasthan",
    "Darbhanga Bihar",
  ],
} as const;

/**
 * Social card. `/opengraph-image` renders a branded 1200×630 PNG at build
 * time — the aspect ratio every platform expects — so it is used sitewide.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.role}`,
} as const;

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/muskiee",
  github: "https://github.com/Heyymuskie",
  university: "https://www.jagannathuniversity.org/",
  email: `mailto:${SITE.email}`,
} as const;

export const PROFILE = {
  firstName: "Muskan",
  lastName: "Choudhary",
  fullName: "Muskan Choudhary",
  /** Origin place — Bihar. */
  origin: "Darbhanga, Bihar",
  /** Current base — Rajasthan. */
  location: "Jaipur, Rajasthan",
  region: "Rajasthan, India",
  nationality: "Indian",
  openTo: [
    "Entry-Level Data Analyst",
    "Reporting Analyst",
    "Business Intelligence Graduate",
  ],
} as const;

export const EDUCATION = {
  institution: "Jagannath University",
  institutionLocation: "Jaipur, Rajasthan, India",
  institutionUrl: LINKS.university,
  degree: "B.Tech in Computer Science and Engineering",
  shortDegree: "B.Tech CSE",
  period: "2023 — 2027",
  startYear: 2023,
  endYear: 2027,
  status: "Final year",
  cgpa: "7.5",
  cgpaMax: "10",
  coursework: [
    "Database Management Systems",
    "Data Structures & Algorithms",
    "Python Programming",
    "Statistics & Probability",
  ],
  schooling: [
    { label: "Senior Secondary (Class XII), BSEB", score: "72%" },
    { label: "Secondary (Class X), CBSE", score: "83%" },
  ],
} as const;

/** Verification tokens — set in Vercel project env vars after creating the
 *  Google Search Console / Bing Webmaster properties. */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
} as const;

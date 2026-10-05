import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { EDUCATION, OG_IMAGE, PROFILE, SITE } from "@/lib/site";

const PATH = "/resume";

export const metadata: Metadata = {
  title: "Resume — Data Analyst CV",
  description:
    "View or download the resume of Muskan Choudhary, a Data Analyst and final-year B.Tech CSE student at Jagannath University, Jaipur. Skills in SQL, Power BI, Excel and Python.",
  keywords: [
    "Muskan Choudhary resume",
    "data analyst CV",
    "SQL Power BI Excel resume",
    "B.Tech CSE Jaipur",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "profile",
    url: `${SITE.url}${PATH}`,
    title: `Resume — ${PROFILE.fullName}, ${SITE.role}`,
    description:
      "View or download the resume of Muskan Choudhary, Data Analyst specialising in SQL, Power BI, Excel and Python.",
    images: [OG_IMAGE],
  },
  // The PDF is a direct-download asset; keep it out of the index so the
  // profile pages carry the ranking weight instead.
  robots: { index: true, follow: true },
};

const FACTS = [
  { k: "Role", v: SITE.role },
  { k: "Education", v: `${EDUCATION.shortDegree}, ${EDUCATION.institution}` },
  { k: "Location", v: PROFILE.location },
  { k: "Core stack", v: "SQL · Power BI · Excel · Python" },
];

export default function ResumePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Resume", path: PATH },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Muskan Choudhary — Resume",
            url: `${SITE.url}${PATH}`,
            description: metadata.description,
            inLanguage: "en-IN",
            about: { "@id": `${SITE.url}/#person` },
            hasPart: {
              "@type": "DigitalDocument",
              name: "Muskan Choudhary — Curriculum Vitae",
              url: `${SITE.url}${SITE.resumePath}`,
              encodingFormat: "application/pdf",
              datePublished: "2026-01-01",
              author: { "@id": `${SITE.url}/#person` },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />

      <section className="section-divider">
        <div className="container-page section !py-8 md:!py-10">
          <ResumeViewer />

          {/* Quick facts — part of the hero block on every breakpoint. */}
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.k} className="surface-card min-w-0 px-4 py-4 sm:px-5">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm font-semibold break-words">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

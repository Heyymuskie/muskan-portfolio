import type { ReactNode } from "react";
import { EDUCATION, LINKS, PROFILE, SITE } from "@/lib/site";

/**
 * Structured data helpers.
 *
 * Renders a native <script> tag (not next/script — JSON-LD is structured
 * data, not executable JS). Strings are scrubbed for "<" to close off
 * XSS injection, following the Next.js JSON-LD guidance.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: PROFILE.fullName,
        givenName: PROFILE.firstName,
        familyName: PROFILE.lastName,
        url: SITE.url,
        image: `${SITE.url}${SITE.image}`,
        email: `mailto:${SITE.email}`,
        jobTitle: SITE.role,
        description: SITE.description,
        sameAs: [LINKS.linkedin, LINKS.github],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Data Analysis",
          "SQL",
          "Power BI",
          "Microsoft Excel",
          "Python",
          "pandas",
          "Data Cleaning",
          "Data Visualisation",
          "Statistics",
          "Dashboard Reporting",
        ],
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: EDUCATION.institution,
          url: EDUCATION.institutionUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: EDUCATION.institution,
          url: EDUCATION.institutionUrl,
        },
        worksFor: {
          "@type": "CollegeOrUniversity",
          name: EDUCATION.institution,
          url: EDUCATION.institutionUrl,
        },
        // Deliberately no contact number — identity data on this site is
        // limited to email and social profiles.
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "professional enquiries",
          email: SITE.email,
          availableLanguage: ["English", "Hindi"],
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE.url}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}${SITE.image}`,
          width: 712,
          height: 1019,
        },
      }}
    />
  );
}

export function ProfilePageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE.url}/#profile`,
        url: SITE.url,
        name: `${PROFILE.fullName} — ${SITE.role} Portfolio`,
        description: SITE.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE.url}/#website` },
        mainEntity: { "@id": `${SITE.url}/#person` },
        // `/resume` is served as a PDF by a route handler, so it cannot carry
        // its own JSON-LD. The document is described here instead, which keeps
        // the resume inside the site's primary structured-data graph.
        hasPart: {
          "@type": "DigitalDocument",
          "@id": `${SITE.url}/#resume`,
          name: `${PROFILE.fullName} — Curriculum Vitae`,
          url: `${SITE.url}${SITE.resumePath}`,
          encodingFormat: "application/pdf",
          inLanguage: "en-IN",
          datePublished: "2026-01-01",
          author: { "@id": `${SITE.url}/#person` },
          about: SITE.role,
        },
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE.url}/about#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      }}
    />
  );
}

/** Wrap structured data anywhere in the tree without leaking markup. */
export function JsonLdSlot({ data }: { data: Record<string, unknown> }): ReactNode {
  return <JsonLd data={data} />;
}

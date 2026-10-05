import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { Section, SectionHeading } from "@/components/sections/section";
import { ContactCta } from "@/components/sections/contact-cta";
import { PROJECTS } from "@/data/projects";
import { OG_IMAGE, SITE } from "@/lib/site";

const PATH = "/projects";

export const metadata: Metadata = {
  title: "Data Analysis Case Studies",
  description:
    "Four end-to-end data analysis case studies by Muskan Choudhary: a COVID-19 data pipeline, a property price regression model, FX trading risk analysis and a fitness workload regression.",
  keywords: [
    "data analyst case studies",
    "data analysis projects",
    "SQL Power BI portfolio",
    "Python pandas projects",
    "data visualisation portfolio",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `${SITE.url}${PATH}`,
    siteName: SITE.name,
    locale: "en_IN",
    title: "Data Analysis Case Studies — Muskan Choudhary",
    description:
      "Four end-to-end data analysis case studies covering data engineering, regression modelling, financial risk analysis and statistical modelling.",
    images: [OG_IMAGE],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <header className="section-divider bg-[var(--surface)]">
        <div className="container-page section !py-12 md:!py-14">
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="text-label text-[var(--primary)]">Projects</p>
            <h1 className="text-display">Data analysis case studies</h1>
            <p className="text-lede text-[var(--muted-foreground)]">
              Four projects covering the whole path a data analyst walks: sourcing and
              cleaning the data, choosing a method, testing it honestly, and writing down
              what the result does and does not prove.
            </p>
          </div>

          <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { k: "Case studies", v: String(PROJECTS.length) },
              { k: "Domains", v: "4" },
              { k: "Charts published", v: String(PROJECTS.reduce((n, p) => n + p.gallery.length, 0)) },
              { k: "Open source", v: "MIT" },
            ].map((s) => (
              <div key={s.k} className="surface-raised px-4 py-4 sm:px-5">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  {s.k}
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-[var(--primary)]">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Section id="all-projects">
        <SectionHeading
          eyebrow="The work"
          title="Pick a project to read the full breakdown"
          lead="Every case study follows the same structure so you can compare them quickly."
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="min-w-0">
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}

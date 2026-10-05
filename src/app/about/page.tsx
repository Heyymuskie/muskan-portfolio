import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, GraduationCap, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/sections/section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ABOUT, COMPETENCIES, FAQS, TIMELINE } from "@/data/content";
import { PROJECTS } from "@/data/projects";
import { EDUCATION, LINKS, OG_IMAGE, PROFILE, SITE } from "@/lib/site";

const PATH = "/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Muskan Choudhary — Data Analyst and final-year B.Tech CSE student at Jagannath University, Jaipur. Background, skills, education and how I approach analytical work.",
  keywords: [
    "about Muskan Choudhary",
    "data analyst Jaipur",
    "B.Tech CSE Jagannath University",
    "SQL Power BI analyst",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `${SITE.url}${PATH}`,
    siteName: SITE.name,
    locale: "en_IN",
    title: `About ${PROFILE.fullName} — ${SITE.role}`,
    description:
      "Background, education and working approach of Muskan Choudhary, an entry-level Data Analyst based in Jaipur, Rajasthan.",
    images: [OG_IMAGE],
  },
};

const PROOF = [
  {
    label: "Education",
    value: `${EDUCATION.institution}, Jaipur`,
    detail: `${EDUCATION.degree} · ${EDUCATION.period} · CGPA ${EDUCATION.cgpa}/${EDUCATION.cgpaMax}`,
    href: EDUCATION.institutionUrl,
    icon: GraduationCap,
  },
  {
    label: "Source code",
    value: "github.com/Heyymuskie",
    detail: "Four public repositories, one per case study",
    href: LINKS.github,
    icon: GithubIcon,
  },
  {
    label: "Professional profile",
    value: "linkedin.com/in/muskiee",
    detail: "Work history, recommendations and endorsements",
    href: LINKS.linkedin,
    icon: LinkedinIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: PATH },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <header className="section-divider bg-[var(--surface)]">
        <div className="container-page section !py-10 md:!py-14">
          <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-label text-[var(--primary)]">About</p>
              <h1 className="text-display mt-4">{ABOUT.heading}</h1>

              <div className="mt-6 flex flex-col gap-5">
                {ABOUT.paragraphs.map((p, i) => (
                  <p key={i} className="text-body text-[var(--muted-foreground)]">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-11 px-5">
                  <Link href="/resume">
                    <FileText aria-hidden="true" className="size-4" />
                    View resume
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-5">
                  <Link href="/projects">Read the case studies</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-11 px-4">
                  <a href={SITE.email}>
                    <Mail aria-hidden="true" className="size-4" />
                    Email me
                  </a>
                </Button>
              </div>
            </div>

            {/* Verifiable evidence — the "E-E-A-T" spine of the page. */}
            <aside className="lg:col-span-5" aria-labelledby="proof-title">
              <h2 id="proof-title" className="text-label text-[var(--muted-foreground)]">
                Verifiable
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {PROOF.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.label}>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group surface-card flex items-start gap-3 p-4 transition-colors hover:border-[var(--primary)]/50"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--primary)]/14 text-[var(--primary)]">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                            {p.label}
                          </span>
                          <span className="block break-all text-sm font-semibold text-[var(--primary)]">
                            {p.value}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--muted-foreground)]">
                            {p.detail}
                          </span>
                        </span>
                        <ExternalLink
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="surface-raised mt-5 p-5">
                <p className="text-label text-[var(--muted-foreground)]">Origin</p>
                <p className="mt-2 text-sm font-medium">{PROFILE.origin}</p>
                <Separator className="my-3" />
                <p className="text-label text-[var(--muted-foreground)]">Based in</p>
                <p className="mt-2 text-sm font-medium">{PROFILE.location}</p>
                <Separator className="my-3" />
                <p className="text-label text-[var(--muted-foreground)]">Open to</p>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
                  {PROFILE.openTo.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Education */}
      <Section id="education" divider>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Education" title="Academic background" />
          </div>
          <div className="lg:col-span-8">
            <ol className="flex flex-col gap-5">
              {TIMELINE.map((t) => (
                <li key={t.title} className="surface-raised relative overflow-hidden p-5 sm:p-6">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[var(--primary)]" />
                  <div className="flex flex-col gap-3 pl-3 sm:pl-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                      {t.period} · {t.kind}
                    </span>
                    <h3 className="text-subsection">{t.title}</h3>
                    <a
                      href={t.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline"
                    >
                      {t.org}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                    <p className="text-sm text-[var(--muted-foreground)]">{t.detail}</p>
                  </div>
                </li>
              ))}
              {EDUCATION.schooling.map((s) => (
                <li
                  key={s.label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-5 py-4"
                >
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="text-sm font-semibold tabular-nums">{s.score}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <SkillsSection />

      {/* How I work */}
      <Section id="approach" divider tone="surface">
        <SectionHeading
          eyebrow="How I work"
          title="Three habits behind the numbers"
          lead="The part of analytical work that does not show up in a tool list."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {COMPETENCIES.map((c) => (
            <li key={c.title} className="surface-raised flex h-full flex-col gap-3 p-5">
              <h3 className="text-[0.975rem] font-semibold">{c.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{c.body}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {c.points.map((p) => (
                  <li key={p}>
                    <span className="inline-block rounded-md border border-[var(--line)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="surface-card mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-subsection">{PROJECTS.length} published case studies</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Each with methodology, findings, limitations and a public repository.
            </p>
          </div>
          <Button asChild size="lg" className="h-11 shrink-0 px-5">
            <Link href="/projects">Browse them</Link>
          </Button>
        </div>
      </Section>

      {/* Quick answers */}
      <Section id="faq" divider>
        <SectionHeading
          eyebrow="Quick answers"
          title="Common questions, answered directly"
        />
        <dl className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="surface-card h-full p-5">
              <dt className="text-[0.975rem] font-semibold leading-snug">{f.q}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactCta />
    </>
  );
}

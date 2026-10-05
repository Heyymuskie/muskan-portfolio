import type { Metadata } from "next";
import { ArrowUpRight, FileText, Mail, MapPin, University } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/sections/section";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PROFILE, SITE, LINKS, EDUCATION, OG_IMAGE } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Muskan Choudhary, Data Analyst in Jaipur, Rajasthan. Email, LinkedIn and GitHub — open to entry-level data analyst and BI graduate roles.",
  keywords: ["contact Muskan Choudhary", "hire data analyst Jaipur", "data analyst email"],
  alternates: { canonical: PATH },
  openGraph: {
    url: `${SITE.url}${PATH}`,
    siteName: SITE.name,
    locale: "en_IN",
    title: `Contact ${PROFILE.fullName}`,
    description:
      "Email, LinkedIn and GitHub for Muskan Choudhary — available for entry-level data analyst roles.",
    images: [OG_IMAGE],
  },
};

const CHANNELS = [
  {
    label: "Email",
    value: SITE.email,
    href: SITE.email,
    note: "Fastest route for roles, briefs and referrals.",
    icon: Mail,
    external: false,
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/muskiee",
    href: LINKS.linkedin,
    note: "Connect for recommendations and role discussions.",
    icon: LinkedinIcon,
    external: true,
    primary: false,
  },
  {
    label: "GitHub",
    value: "github.com/Heyymuskie",
    href: LINKS.github,
    note: "Source for every case study on this site.",
    icon: GithubIcon,
    external: false,
    primary: false,
  },
  {
    label: "University",
    value: "jagannathuniversity.org",
    href: LINKS.university,
    note: `${EDUCATION.institution}, ${EDUCATION.institutionLocation}.`,
    icon: University,
    external: true,
    primary: false,
  },
];

const AVAILABILITY = [
  { k: "Roles", v: PROFILE.openTo.join(" · ") },
  { k: "Location", v: `${PROFILE.location} (open to remote)` },
  { k: "Origin", v: PROFILE.origin },
  { k: "Notice", v: "Available immediately for internships and graduate roles" },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: PATH },
        ]}
      />

      <header className="section-divider bg-[var(--surface)]">
        <div className="container-page section !py-12 md:!py-14">
          <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-label text-[var(--primary)]">Contact</p>
              <h1 className="text-display mt-4">Let&apos;s talk about your data.</h1>
              <p className="text-lede mt-5 text-[var(--muted-foreground)]">
                I&apos;m looking for an entry-level {SITE.role}, Reporting Analyst or
                Business Intelligence Graduate position. If you have a team that needs
                someone to own the dashboards and the queries behind them, I&apos;d like
                to hear from you.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6">
                  <a href={SITE.email}>
                    <Mail aria-hidden="true" className="size-4.5" />
                    {SITE.email}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6">
                  <a href="/resume">
                    <FileText aria-hidden="true" className="size-4.5" />
                    View resume
                  </a>
                </Button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <MapPin aria-hidden="true" className="size-4" />
                {PROFILE.origin} → {PROFILE.location}
              </p>
            </div>

            <div className="lg:col-span-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label} className="min-w-0">
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group surface-card flex h-full min-h-32 flex-col gap-2 p-5 transition-colors hover:border-[var(--primary)]/50"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            <Icon
                              className={
                                c.primary
                                  ? "size-4 text-[var(--primary)]"
                                  : "size-4 text-[var(--muted-foreground)]"
                              }
                            />
                            {c.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                        <span className="break-all text-sm font-medium text-[var(--primary)]">
                          {c.value}
                        </span>
                        <span className="mt-auto text-xs leading-relaxed text-[var(--muted-foreground)]">
                          {c.note}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <Section id="availability" divider>
        <SectionHeading
          eyebrow="Availability"
          title="What I'm looking for"
          lead="So you can check the fit before you write the email."
        />

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABILITY.map((a) => (
            <div key={a.k} className="surface-raised min-w-0 px-5 py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {a.k}
              </dt>
              <dd className="mt-1.5 text-sm font-medium leading-relaxed">{a.v}</dd>
            </div>
          ))}
        </dl>

        <div className="surface-card mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            Prefer to read first? The resume lays out skills, education and projects on a
            single page.
          </p>
          <Button asChild size="lg" className="h-11 shrink-0 px-5">
            <a href="/resume">
              <FileText aria-hidden="true" className="size-4" />
              View resume
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}

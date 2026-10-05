import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { HERO, STATS } from "@/data/content";
import { EDUCATION, LINKS, PROFILE, SITE } from "@/lib/site";

const QUICK_FACTS = [
  { label: "Studying", value: `${EDUCATION.shortDegree}, ${EDUCATION.institution}` },
  { label: "Based in", value: PROFILE.location },
  { label: "CGPA", value: `${EDUCATION.cgpa} / ${EDUCATION.cgpaMax}` },
  { label: "Open to", value: PROFILE.openTo[0] },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft radial wash — decorative only, never affects layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.14_240/0.16),transparent_65%)]"
      />

      <div className="container-page relative pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Profile image — small, responsive, centred. */}
          <div className="relative mb-7">
            <Image
              src="/images/muskan.jpg"
              alt={`${PROFILE.fullName}, ${SITE.role}`}
              width={712}
              height={1019}
              priority
              sizes="(max-width: 640px) 112px, 152px"
              className="h-auto w-28 rounded-2xl object-cover shadow-lg ring-1 ring-[var(--line)] sm:w-36 md:w-38"
            />
          </div>

          <p className="text-label mb-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[var(--muted-foreground)]">
            <span className="text-[var(--primary)]">{HERO.eyebrow}</span>
            <span aria-hidden="true" className="hidden text-[var(--muted-foreground)]/50 sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5" />
              {PROFILE.origin} → {PROFILE.location}
            </span>
          </p>

          <h1 id="hero-title" className="text-display">
            {PROFILE.fullName}
          </h1>

          <p className="mt-4 text-subsection font-medium text-[var(--muted-foreground)]">
            {HERO.heading}
          </p>

          <p className="text-lede mt-6 text-[var(--muted-foreground)]">{HERO.intro}</p>

          {/* Primary CTAs */}
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href="/resume">
                <FileText aria-hidden="true" className="size-4.5" />
                View resume
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link href="/projects">
                See case studies
                <ArrowRight aria-hidden="true" className="size-4.5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="h-12 px-4">
              <a href={LINKS.email} aria-label="Send Muskan an email">
                Hire me
              </a>
            </Button>
          </div>

          {/* Secondary links */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-sm">
            <Button asChild size="sm" variant="ghost" className="h-9 gap-2 text-[var(--muted-foreground)]">
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost" className="h-9 gap-2 text-[var(--muted-foreground)]">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Quick facts — 2 cols mobile, 4 cols desktop */}
        <dl className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          {QUICK_FACTS.map((f) => (
            <div
              key={f.label}
              className="surface-card flex min-w-0 flex-col gap-1 px-4 py-4 sm:px-5"
            >
              <dt className="text-label text-[var(--muted-foreground)]">{f.label}</dt>
              <dd className="text-sm font-semibold break-words sm:text-[0.95rem]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Stats strip */}
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <li
              key={s.label}
              className="surface-raised flex min-w-0 flex-col gap-1 px-4 py-4 sm:px-5"
            >
              <span className="text-2xl font-bold tabular-nums text-[var(--primary)] sm:text-3xl">
                {s.value}
              </span>
              <span className="text-sm font-medium">{s.label}</span>
              <span className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                {s.hint}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

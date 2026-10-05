import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Database,
  ExternalLink,
  GitFork,
  Lightbulb,
  ListChecks,
  Search,
  Target,
} from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/sections/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PROJECTS, getProject, projectSlugs } from "@/data/projects";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${SITE.url}${path}`,
      title: `${project.title} — ${SITE.name}`,
      description: project.seo.description,
      images: project.gallery.length
        ? [{ url: project.gallery[0].src, width: project.gallery[0].width, height: project.gallery[0].height, alt: project.gallery[0].alt }]
        : [{ url: SITE.image, width: 712, height: 1019, alt: SITE.name }],
      tags: project.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${SITE.name}`,
      description: project.seo.description,
      images: project.gallery.length ? [project.gallery[0].src] : [SITE.image],
    },
  };
}

const ACCENT_BADGE: Record<string, string> = {
  sky: "text-sky-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1];
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0];
  const path = `/projects/${project.slug}`;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.seo.description,
    url: `${SITE.url}${path}`,
    inLanguage: "en-IN",
    image: project.gallery.map((g) => `${SITE.url}${g.src}`),
    keywords: project.seo.keywords.join(", "),
    author: {
      "@type": "Person",
      name: "Muskan Choudhary",
      url: SITE.url,
      sameAs: ["https://www.linkedin.com/in/muskiee", "https://github.com/Heyymuskie"],
    },
    publisher: { "@type": "Person", name: "Muskan Choudhary", url: SITE.url },
    about: project.kpis.map((k) => `${k.label}: ${k.value}`),
    isAccessibleForFree: true,
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ---------------- Header ---------------- */}
      <header className="section-divider bg-[var(--surface)]">
        <div className="container-page section !py-10 md:!py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
              {breadcrumbs.map((b, i) => (
                <li key={b.path} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="max-w-[14rem] truncate text-[var(--foreground)]">
                      {b.name}
                    </span>
                  ) : (
                    <Link
                      href={b.path}
                      className="rounded-sm transition-colors hover:text-[var(--foreground)]"
                    >
                      {b.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("bg-[var(--accent)] font-medium", ACCENT_BADGE[project.accent])}
                >
                  {project.kicker}
                </Badge>
                <span className="text-xs font-medium text-[var(--muted-foreground)]">
                  {project.year} · {project.status}
                </span>
              </div>

              <h1 className="text-display mt-4">{project.title}</h1>

              <p className="text-lede mt-5 text-[var(--muted-foreground)]">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[var(--line)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-11 px-5">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    View repository
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-5">
                  <Link href="/projects">
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    All case studies
                  </Link>
                </Button>
              </div>
            </div>

            {/* At a glance */}
            <div className="lg:col-span-5">
              <h2 className="text-label text-[var(--muted-foreground)]">At a glance</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {project.kpis.map((k) => (
                  <div key={k.label} className="surface-raised flex min-w-0 flex-col gap-1 p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                      {k.label}
                    </dt>
                    <dd className="text-xl font-bold tabular-nums text-[var(--primary)]">
                      {k.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="surface-card flex items-start gap-3 p-4">
                  <Target aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                      My role
                    </p>
                    <p className="text-sm font-medium">{project.role}</p>
                  </div>
                </div>
                <div className="surface-card flex items-start gap-3 p-4">
                  <GitFork aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                      Repository
                    </p>
                    <p className="truncate text-sm font-medium">
                      {project.repo.replace("https://github.com/", "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- Problem ---------------- */}
      <Section id="problem" divider>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="01 · The problem"
              title="What the analysis had to answer"
              level={2}
            />
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-4">
              {project.problem.map((p, i) => (
                <p key={i} className="text-body text-[var(--muted-foreground)]">
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {project.questions.map((q, i) => (
                <li key={q} className="surface-card flex h-full flex-col gap-2 p-4">
                  <span className="text-xs font-bold tabular-nums text-[var(--primary)]">
                    Q{i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------- Data ---------------- */}
      <Section id="data" divider tone="surface">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="02 · The data" title="Where the numbers come from" />
          </div>
          <div className="lg:col-span-8">
            <div className="surface-raised flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Database aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--primary)]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Source</p>
                  <p className="break-words text-sm text-[var(--muted-foreground)]">
                    {project.data.source}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Search aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--primary)]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Size</p>
                  <p className="break-words text-sm text-[var(--muted-foreground)]">
                    {project.data.size}
                  </p>
                </div>
              </div>

              <Separator />

              <ul className="flex flex-col gap-2.5">
                {project.data.notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Methodology ---------------- */}
      <Section id="method" divider>
        <SectionHeading
          eyebrow="03 · Method"
          title="How the work was done"
          lead="Five stages, each one reproducible from a clean checkout."
        />

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.methodology.map((m, i) => (
            <li key={m.title} className="surface-card flex h-full flex-col gap-3 p-5">
              <span className="grid size-8 place-items-center rounded-lg bg-[var(--primary)]/14 text-sm font-bold tabular-nums text-[var(--primary)]">
                {i + 1}
              </span>
              <h3 className="text-[0.975rem] font-semibold leading-snug">{m.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {m.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------- Findings ---------------- */}
      <Section id="findings" divider tone="surface">
        <SectionHeading
          eyebrow="04 · Key findings"
          title="What the analysis actually showed"
          lead="Numbered claims, each tied back to the method that produced it."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {project.findings.map((f) => (
            <li key={f.title} className="surface-raised flex h-full flex-col gap-3 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-[24ch] text-[1rem] font-semibold leading-snug">
                  {f.title}
                </h3>
                {f.metric && (
                  <span className="shrink-0 rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-3 py-1 text-sm font-bold tabular-nums text-[var(--primary)]">
                    {f.metric}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {f.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------- Gallery ---------------- */}
      <Section id="visuals" divider>
        <SectionHeading
          eyebrow="05 · Visuals"
          title="The charts behind the numbers"
          lead="Exported directly from the analysis notebooks."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {project.gallery.map((g) => (
            <li key={g.src} className="min-w-0">
              <figure className="figure-plate h-full">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 620px"
                  className="block h-auto w-full object-contain"
                />
                <figcaption>{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------- Results ---------------- */}
      <Section id="results" divider tone="surface">
        <SectionHeading eyebrow="06 · Results" title={project.results.name} lead={project.results.note} />

        <div className="surface-raised mt-8 overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                {project.resultsHead.map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:px-5",
                      i > 0 && "hidden sm:table-cell",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.results.metrics.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--accent)]/50"
                >
                  <th scope="row" className="px-4 py-3.5 font-medium sm:px-5">
                    {row.label}
                  </th>
                  <td className="hidden px-4 py-3.5 text-[var(--muted-foreground)] sm:table-cell sm:px-5">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile fallback: values shown inline under each label. */}
        <dl className="mt-4 flex flex-col gap-2.5 sm:hidden">
          {project.results.metrics.map((row) => (
            <div key={row.label} className="surface-card flex flex-col gap-1 p-3.5">
              <dt className="text-sm font-medium">{row.label}</dt>
              <dd className="text-sm text-[var(--primary)]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------- Limitations + next ---------------- */}
      <Section id="caveats" divider>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <AlertTriangle aria-hidden="true" className="size-4" />
              </span>
              <h2 className="text-subsection">Limitations</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Stated plainly — knowing what a result does not prove is part of the skill.
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {project.limitations.map((l) => (
                <li
                  key={l}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400"
                  />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-[var(--success)]/15 text-[var(--success)]">
                <Lightbulb aria-hidden="true" className="size-4" />
              </span>
              <h2 className="text-subsection">Next steps</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
              What I would do next if this went into production.
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {project.nextSteps.map((l) => (
                <li
                  key={l}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--success)]"
                  />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------- Attribution + pagination ---------------- */}
      <Section id="more" divider tone="surface">
        <div className="surface-card flex items-start gap-3 p-5">
          <ListChecks aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-[var(--muted-foreground)]" />
          <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
            {project.attribution}
          </p>
        </div>

        <nav aria-label="More case studies" className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="surface-raised group flex min-w-0 flex-col gap-1.5 p-5 transition-colors hover:border-[var(--primary)]/50"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              Previous
            </span>
            <span className="text-[0.975rem] font-semibold leading-snug group-hover:text-[var(--primary)]">
              {prev.title}
            </span>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            className="surface-raised group flex min-w-0 flex-col gap-1.5 p-5 text-right transition-colors hover:border-[var(--primary)]/50 sm:items-end"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Next
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
            <span className="text-[0.975rem] font-semibold leading-snug group-hover:text-[var(--primary)]">
              {next.title}
            </span>
          </Link>
        </nav>

        <p className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
          Questions about this project?{" "}
          <Link href="/contact" className="font-medium text-[var(--primary)] hover:underline">
            Get in touch
          </Link>
          {" · "}
          <Link href="/about" className="font-medium text-[var(--primary)] hover:underline">
            About {SITE.name.split(" ")[0]}
          </Link>
        </p>
      </Section>
    </>
  );
}

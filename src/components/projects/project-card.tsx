import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ACCENT_TEXT: Record<Project["accent"], string> = {
  sky: "text-sky-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
};

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <article
      className={cn(
        "surface-card group relative flex h-full min-w-0 flex-col overflow-hidden transition-colors hover:border-[var(--primary)]/45",
        `accent-${project.accent}`,
      )}
    >
      {/* Accent rule */}
      <span aria-hidden="true" className="accent-bar h-1 w-full" />

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <header className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={cn("bg-[var(--accent)] font-medium", ACCENT_TEXT[project.accent])}
            >
              {project.kicker}
            </Badge>
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              {project.year} · {project.status}
            </span>
            {typeof index === "number" && (
              <span className="ml-auto text-xs font-medium tabular-nums text-[var(--muted-foreground)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>

          <h3 className="text-subsection">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] hover:text-[var(--primary)]"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-body relative z-10 !max-w-none text-sm text-[var(--muted-foreground)]">
            {project.summary}
          </p>
        </header>

        {/* Key numbers */}
        <dl className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--line)] py-4">
          {project.kpis.slice(0, 4).map((k) => (
            <div key={k.label} className="min-w-0">
              <dt className="truncate text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                {k.label}
              </dt>
              <dd className="truncate text-sm font-semibold tabular-nums">{k.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="relative z-10 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((t) => (
            <li key={t}>
              <span className="inline-block rounded-md border border-[var(--line)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                {t}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild size="sm" className="h-9 w-full sm:w-auto">
            <Link href={`/projects/${project.slug}`}>
              View case study
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 w-full gap-2 sm:w-auto"
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.title} source repository on GitHub`}
            >
              <GithubIcon className="size-4" />
              Source
            </a>
          </Button>
        </div>

        <p className="relative z-10 flex items-start gap-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
          <Sparkles aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {project.role}
        </p>
      </div>
    </article>
  );
}

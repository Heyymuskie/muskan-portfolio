import { GraduationCap, CalendarDays, BookOpen, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section";
import { COMPETENCIES, TIMELINE } from "@/data/content";
import { EDUCATION } from "@/lib/site";

export function EducationSection() {
  return (
    <Section id="education" divider tone="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Timeline */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Education"
            title="Where I'm studying"
            lead="A B.Tech in Computer Science, with the coursework that underpins analytical work."
          />

          <ol className="mt-8 flex flex-col gap-5">
            {TIMELINE.map((t) => (
              <li key={t.title} className="surface-raised relative overflow-hidden p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-[var(--primary)]"
                />
                <div className="flex flex-col gap-3 pl-3 sm:pl-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/12 px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      {t.period}
                    </span>
                    <span className="text-xs font-medium text-[var(--muted-foreground)]">
                      {t.kind}
                    </span>
                  </div>

                  <h3 className="text-subsection">{t.title}</h3>

                  <a
                    href={t.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-semibold text-[var(--primary)] hover:underline"
                  >
                    <GraduationCap aria-hidden="true" className="size-4" />
                    {t.org}
                    <ExternalLink aria-hidden="true" className="size-3.5" />
                  </a>

                  <p className="text-sm text-[var(--muted-foreground)]">{t.detail}</p>

                  <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-[var(--muted-foreground)]">CGPA</span>
                    <span className="tabular-nums text-[var(--primary)]">
                      {EDUCATION.cgpa} / {EDUCATION.cgpaMax}
                    </span>
                  </p>
                </div>
              </li>
            ))}

            {EDUCATION.schooling.map((s) => (
              <li
                key={s.label}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-5 py-4"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium">
                  <BookOpen aria-hidden="true" className="size-4 text-[var(--muted-foreground)]" />
                  {s.label}
                </span>
                <span className="text-sm font-semibold tabular-nums">{s.score}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Coursework + competencies */}
        <div className="lg:col-span-5">
          <div className="surface-raised p-5 sm:p-6">
            <h3 className="text-label text-[var(--muted-foreground)]">Core coursework</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EDUCATION.coursework.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-4">
            {COMPETENCIES.map((c) => (
              <div key={c.title} className="surface-card p-5">
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {c.body}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.points.map((p) => (
                    <li key={p}>
                      <span className="inline-block rounded-md border border-[var(--line)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

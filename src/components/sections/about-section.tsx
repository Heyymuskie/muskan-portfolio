import { BadgeCheck, Target, Users, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section";
import { ABOUT, CAREER_INTERESTS } from "@/data/content";

const ICONS = [BadgeCheck, Target, Users];

export function AboutSection() {
  return (
    <Section id="about" divider>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="About"
              title={ABOUT.heading}
              lead="Computer science foundations, applied to reporting that people actually trust."
            />

            <div className="surface-raised mt-7 p-5">
              <p className="text-label text-[var(--muted-foreground)]">Currently open to</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CAREER_INTERESTS.map((role) => (
                  <li key={role}>
                    <span className="inline-flex items-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-5">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-body text-[var(--muted-foreground)]">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {ABOUT.focus.map((f, i) => {
              const Icon = ICONS[i] ?? Sparkles;
              return (
                <li key={f.title} className="surface-card flex flex-col gap-3 p-5">
                  <span className="grid size-9 place-items-center rounded-lg bg-[var(--primary)]/14 text-[var(--primary)]">
                    <Icon aria-hidden="true" className="size-4.5" />
                  </span>
                  <h3 className="text-sm font-semibold leading-snug">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {f.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

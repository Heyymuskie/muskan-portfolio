import { Section, SectionHeading } from "@/components/sections/section";
import { SKILL_GROUPS } from "@/data/content";

export function SkillsSection() {
  return (
    <Section id="skills" divider tone="surface">
      <SectionHeading
        eyebrow="Technical skills"
        title="The tools I use to get from raw table to decision"
        lead="Grouped by what each one is actually for — not a flat list of logos."
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {SKILL_GROUPS.map((g) => (
          <li
            key={g.group}
            className="surface-raised flex min-w-0 flex-col gap-3 p-5 transition-colors hover:border-[var(--primary)]/40"
          >
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[0.95rem] font-semibold leading-snug">{g.group}</h3>
              <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                {g.blurb}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li key={item}>
                  <span className="inline-block rounded-md border border-[var(--line)] bg-[var(--background)] px-2 py-1 text-xs font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

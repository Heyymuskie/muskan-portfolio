import { CircleHelp } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section";
import { FAQS } from "@/data/content";

/**
 * Answers are rendered in full (no accordion) so they stay in the server
 * HTML for crawlers, answer engines and screen readers — and so a
 * recruiter can skim them without clicking anything.
 */
export function FaqSection() {
  return (
    <Section id="faq" divider tone="surface">
      <SectionHeading
        eyebrow="Quick answers"
        title="What a hiring manager usually wants to know first"
        lead="Short, direct answers — the same ones you'd get in a screening call."
      />

      <dl className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="surface-card flex h-full flex-col gap-3 p-5 sm:p-6"
          >
            <dt className="flex items-start gap-2.5">
              <CircleHelp
                aria-hidden="true"
                className="mt-0.5 size-4.5 shrink-0 text-[var(--primary)]"
              />
              <span className="text-[0.975rem] font-semibold leading-snug">{f.q}</span>
            </dt>
            <dd className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:pl-7">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

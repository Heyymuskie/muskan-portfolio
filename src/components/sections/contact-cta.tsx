import { ArrowRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/sections/section";
import { PROFILE, SITE } from "@/lib/site";

const CHANNELS = [
  {
    href: SITE.email,
    label: "Email",
    value: SITE.email,
    icon: Mail,
    external: false,
    cta: "Best for roles and briefs",
  },
  {
    href: "https://www.linkedin.com/in/muskiee",
    label: "LinkedIn",
    value: "in/muskiee",
    icon: LinkedinIcon,
    external: true,
    cta: "Best for referrals",
  },
  {
    href: "https://github.com/Heyymuskie",
    label: "GitHub",
    value: "Heyymuskie",
    icon: GithubIcon,
    external: true,
    cta: "Best for the code",
  },
];

export function ContactCta() {
  return (
    <Section id="contact" divider>
      <div className="surface-raised relative overflow-hidden p-6 sm:p-8 lg:p-12">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/50 to-transparent"
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Get in touch"
              title="Hiring for a data role? Let's talk."
              lead={`${PROFILE.fullName} is available for ${PROFILE.openTo.join(", ").toLowerCase()} positions.`}
            />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" className="h-12 px-6">
                <a href="/resume">
                  <FileText aria-hidden="true" className="size-4.5" />
                  View resume
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <a href={SITE.email}>
                  <Mail aria-hidden="true" className="size-4.5" />
                  Email me
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-3 lg:gap-4">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="min-w-0">
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group surface-card flex h-full min-h-28 flex-col gap-2 p-5 transition-colors hover:border-[var(--primary)]/50"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <Icon aria-hidden="true" className="size-4 text-[var(--primary)]" />
                          {c.label}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="break-all text-sm text-[var(--primary)]">
                        {c.value}
                      </span>
                      <span className="mt-auto text-xs text-[var(--muted-foreground)]">
                        {c.cta}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

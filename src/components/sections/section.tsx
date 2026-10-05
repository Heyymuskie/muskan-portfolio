import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Every page section uses this wrapper so horizontal container padding and
 * vertical rhythm are identical across the whole site — which is what
 * guarantees consistent gaps and rules out overlap between sections.
 */
export function Section({
  id,
  children,
  className,
  divider = false,
  tone = "default",
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  tone?: "default" | "surface" | "muted";
  as?: "section" | "div" | "article" | "aside";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "section",
        divider && "section-divider",
        tone === "surface" && "bg-[var(--surface)]",
        tone === "muted" && "bg-[var(--card)]",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </Tag>
  );
}

/**
 * Consistent heading block: eyebrow → title → optional lede.
 * Renders exactly one h2 per section so the document outline stays clean
 * (the page's single h1 lives in the hero).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  id?: string;
  level?: 2 | 3;
}) {
  const Heading = (level === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <p className="text-label flex items-center gap-2.5 text-[var(--primary)]">
          <span
            aria-hidden="true"
            className="h-px w-6 bg-[var(--primary)]/60 max-sm:hidden"
          />
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={level === 2 ? "text-section" : "text-subsection"}>
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            "text-lede text-[var(--muted-foreground)]",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

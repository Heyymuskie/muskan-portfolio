import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PROJECTS } from "@/data/projects";
import { EDUCATION, LINKS, PROFILE, SITE } from "@/lib/site";

const YEAR = new Date().getFullYear();

const CONNECT = [
  { href: LINKS.email, label: SITE.email, icon: Mail, external: true },
  { href: LINKS.linkedin, label: "linkedin.com/in/muskiee", icon: LinkedinIcon, external: true },
  { href: LINKS.github, label: "github.com/Heyymuskie", icon: GithubIcon, external: true },
];

export function SiteFooter() {
  return (
    <footer className="section-divider bg-[var(--surface)]">
      <div className="container-page section !py-12 md:!py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-md bg-[var(--primary)] text-[13px] font-bold text-[var(--primary-foreground)]"
              >
                MC
              </span>
              <span className="text-[15px] font-semibold">{PROFILE.fullName}</span>
            </Link>
            <p className="text-body mt-4 !max-w-none text-sm text-[var(--muted-foreground)]">
              Entry-level {SITE.role} focused on SQL, Power BI and Excel. Open to
              reporting and business-intelligence graduate roles.
            </p>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">
              {PROFILE.origin} → {PROFILE.location}
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <h2 className="text-label text-[var(--muted-foreground)]">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/resume", label: "Resume" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-6 items-center text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Case studies */}
          <nav aria-label="Case studies">
            <h2 className="text-label text-[var(--muted-foreground)]">Case studies</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex min-h-6 items-start gap-1 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-3 shrink-0 opacity-60"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="text-label text-[var(--muted-foreground)]">Connect</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {CONNECT.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-6 items-center gap-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                    >
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                      <span className="truncate">{c.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">
              {EDUCATION.institution} · Jaipur
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {PROFILE.fullName}. Built with Next.js and Tailwind CSS.
          </p>
          <p className="sm:text-right">
            Available for {PROFILE.openTo[0]} roles.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-[var(--primary)]/14 text-[var(--primary)]">
            <Compass aria-hidden="true" className="size-6" />
          </span>

          <p className="text-label mt-6 text-[var(--primary)]">404</p>
          <h1 className="text-section mt-3">That page doesn&apos;t exist</h1>
          <p className="text-lede mt-4 text-[var(--muted-foreground)]">
            The link may be out of date. Everything on this site is reachable from the
            projects index — that is usually the fastest place to start.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-11 px-5">
              <Link href="/">
                <Home aria-hidden="true" className="size-4" />
                Back home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-5">
              <Link href="/projects">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Case studies
              </Link>
            </Button>
          </div>

          <ul className="mt-10 grid w-full gap-3 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="surface-card flex h-full flex-col gap-1.5 p-4 text-left transition-colors hover:border-[var(--primary)]/50"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {p.kicker}
                  </span>
                  <span className="text-sm font-semibold leading-snug">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

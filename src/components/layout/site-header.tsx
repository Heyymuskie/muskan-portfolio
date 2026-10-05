"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FileText, Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PROFILE, SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on navigation. Adjusted during render (the
  // React-recommended pattern) rather than inside an effect, so it does not
  // trigger a cascading post-commit render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--background)]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/70">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        {/* Brand */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-2"
          aria-label={`${SITE.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-md bg-[var(--primary)] text-[13px] font-bold text-[var(--primary-foreground)]"
          >
            MC
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-tight">
              {PROFILE.fullName}
            </span>
            <span className="block truncate text-xs leading-tight text-[var(--muted-foreground)]">
              {SITE.role}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--accent)]/60 hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm" className="h-9 px-4">
            <a href="/resume">
              <FileText aria-hidden="true" className="size-4" />
              View resume
            </a>
          </Button>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" variant="outline" className="h-9 px-3">
            <a href="/resume" aria-label="View resume">
              <FileText aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">View resume</span>
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[min(19rem,85vw)] flex-col gap-2 p-5">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <p className="text-label text-[var(--muted-foreground)]">Menu</p>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center justify-between rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                        active
                          ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                          : "text-[var(--foreground)] hover:bg-[var(--accent)]"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-[var(--primary)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-2 pt-4">
                <Button asChild size="lg" className="h-11 w-full">
                  <a href="/resume">
                    View resume
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 w-full">
                  <a href={`mailto:${SITE.email}`}>Email me</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

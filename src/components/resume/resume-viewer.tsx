"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileText, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE, SITE } from "@/lib/site";

type Mode = "unknown" | "desktop" | "mobile";

/**
 * Desktop (lg and up): a full, viewport-height PDF reader.
 * Mobile / tablet: the navbar + hero only — the PDF is never fetched, so
 * small screens stay on a fast first paint.
 *
 * Exactly one <h1> exists on this page (the shared heading above), because
 * the two responsive blocks are both present in the server HTML.
 *
 * "View" opens the file in the browser's built-in PDF reader (no download).
 * "Download" is a plain `download` link, so the browser handles it with its
 * normal download behaviour.
 */
export function ResumeViewer() {
  const [mode, setMode] = useState<Mode>("unknown");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setMode(mq.matches ? "desktop" : "mobile");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      {/* ---------------- Single page-level heading ---------------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-label text-[var(--primary)]">Resume</p>
          <h1 className="text-section mt-2">
            {PROFILE.fullName} — Curriculum Vitae
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {SITE.role} · SQL · Power BI · Excel · Python · Jaipur, Rajasthan
          </p>
        </div>

        {/* Toolbar — desktop only, mirrors the two actions below. */}
        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the resume in a new tab"
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-[var(--line)] px-3.5 text-sm font-medium transition-colors hover:border-[var(--primary)]/50"
          >
            <Maximize2 aria-hidden="true" className="size-4" />
            Open in new tab
          </a>
          <a
            href={SITE.resumePath}
            download="Muskan-Choudhary-Resume.pdf"
            aria-label="Download the resume as a PDF file"
            className="inline-flex min-h-9 items-center gap-2 rounded-md bg-[var(--primary)] px-3.5 text-sm font-semibold text-[var(--primary-foreground)] transition-opacity hover:opacity-90"
          >
            <Download aria-hidden="true" className="size-4" />
            Download
          </a>
        </div>
      </div>

      {/* ============ LAPTOP / PC: full PDF viewport ============ */}
      <div className="hidden lg:block">
        <div className="h-[calc(100dvh-18rem)] min-h-[28rem] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
          {mode === "desktop" ? (
            <iframe
              src={`${SITE.resumePath}#toolbar=1&navpanes=0&view=FitH`}
              title={`${PROFILE.fullName} — resume`}
              className="h-full w-full border-0"
            />
          ) : (
            <div
              role="status"
              className="grid h-full w-full place-items-center text-sm text-[var(--muted-foreground)]"
            >
              Loading resume…
            </div>
          )}
        </div>
      </div>

      {/* ============ MOBILE / TABLET: hero only ============ */}
      <div className="lg:hidden">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Image
            src="/images/muskan.jpg"
            alt={`${PROFILE.fullName}, ${SITE.role}`}
            width={712}
            height={1019}
            priority
            sizes="(max-width: 640px) 112px, 144px"
            className="h-auto w-28 rounded-2xl object-cover shadow-lg ring-1 ring-[var(--line)] sm:w-36"
          />

          <p className="text-lede mt-6 text-[var(--muted-foreground)]">
            Final-year B.Tech Computer Science student at Jagannath University,
            Jaipur. I build dashboards and write SQL that turns raw data into
            something a team can act on.
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a
                href={SITE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText aria-hidden="true" className="size-4.5" />
                View resume
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <a href={SITE.resumePath} download="Muskan-Choudhary-Resume.pdf">
                <Download aria-hidden="true" className="size-4.5" />
                Download PDF
              </a>
            </Button>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--muted-foreground)]">
            “View” opens in your browser’s built-in PDF reader — nothing
            downloads until you tap{" "}
            <span className="font-medium text-[var(--foreground)]">
              Download PDF
            </span>
            .
          </p>

          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)]/50 hover:text-[var(--foreground)]"
          >
            Open the full resume
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

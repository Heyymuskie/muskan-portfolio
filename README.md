# Muskan Choudhary — Data Analyst Portfolio

Production portfolio for **Muskan Choudhary**, an entry-level Data Analyst and final-year
B.Tech CSE student at [Jagannath University, Jaipur](https://www.jagannathuniversity.org/).

> Live: `https://muskan-portfolio.vercel.app`

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui**.
Every route is statically generated — no API routes, no database, no client-side data
fetching — so pages ship as pre-rendered HTML and stay fast on a free-tier deployment.

---

## Contents

- [Why it performs well](#why-it-performs-well)
- [Structure](#structure)
- [Commands](#commands)
- [SEO / AEO / GEO / LLMO / AISEO / EEAT layer](#seo--aeo--geo--llmo--ais--eeat-layer)
- [Content and personal data policy](#content-and-personal-data-policy)
- [Deployment](#deployment)
- [Project case studies and attribution](#project-case-studies-and-attribution)

---

## Why it performs well

| Lever | What is done |
| --- | --- |
| Static only | All 17 routes are `○ SSG` / `● SSG`. Nothing renders at request time. |
| No client data fetching | Content lives in `src/data`, compiled into the HTML at build time. |
| Fonts | `next/font` self-hosts Geist — zero third-party font requests, zero CLS. |
| Images | `next/image` with AVIF/WebP, explicit `width`/`height` and `sizes` so nothing reflows. |
| Payload | The entire `public/` tree is under 600 KB, including the 144 KB resume PDF. |
| Layout safety | One `.container-page` + one `.section` rhythm for every section, so horizontal padding and vertical gaps cannot drift between breakpoints. |
| Overflow | `overflow-x: hidden` on `body`, `min-w-0` on every flex/grid child that holds text. |
| Accessibility | Skip link, one `h1` per page, visible `:focus-visible` ring, `prefers-reduced-motion` honoured, WCAG AA contrast on both palettes. |
| Headers | `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: SAMEORIGIN` (first-party framing), `X-Robots-Tag: noindex` on the raw PDF so only `/resume` is indexed. |
| Resume | `/resume` is a route handler, not a page: it answers `application/pdf` so the browser's own reader opens it full-viewport. Zero iframes, zero client JS, and the file is only ever requested after a click. |

---

## Structure

```
src/
  app/
    layout.tsx                 root layout, metadata, fonts, JSON-LD
    page.tsx                   home
    projects/page.tsx          case-study index
    projects/[slug]/page.tsx   the four case studies (generateStaticParams)
    resume/route.ts             serves the CV as `application/pdf` (no page)
    about/page.tsx             EEAT narrative + verifiable links
    contact/page.tsx           channels + availability
    not-found.tsx              branded 404
    sitemap.ts  robots.ts  manifest.ts
    opengraph-image.tsx  icon.svg  favicon.ico
  components/
    layout/                    site header (mobile sheet) + footer
    sections/                  hero, about, skills, projects, education, faq, contact
    projects/project-card.tsx  card with a dedicated "View case study" button
    json-ld.tsx                Person, WebSite, ProfilePage, FAQPage, BreadcrumbList
    icons.tsx                  LinkedIn + GitHub marks (lucide v1 dropped brands)
  data/
    projects.ts                the four case studies (full content model)
    content.ts                 hero, skills, competencies, timeline, FAQs
  lib/
    site.ts                    canonical URL, identity, education, links
public/
  images/muskan.jpg            profile photo
  Muskan-Choudhary-Resume.pdf  the one-page CV
  projects/<slug>/*.png        charts for each case-study gallery
  llms.txt  llms-full.txt      machine-readable site summary and full text
```

### Case-study routes

| Route | Repository |
| --- | --- |
| `/projects/covid19-pandemic-analysis` | `Heyymuskie/covid19-pandemic-analysis` |
| `/projects/cracow-property-price-model` | `Heyymuskie/cracow-property-price-model` |
| `/projects/fx-trading-performance-analysis` | `Heyymuskie/fx-trading-performance-analysis` |
| `/projects/fitness-workload-regression` | `Heyymuskie/fitness-workload-regression` |

Each case study follows one fixed outline — *problem → data → method → findings →
visuals → results → limitations → next steps* — so a recruiter can compare them
without re-learning the layout.

---

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server
npm run build     # production build (also runs TypeScript)
npm run start     # serve the production build
npm run lint      # eslint
```

---

## SEO / AEO / GEO / LLMO / AISEO / EEAT layer

**Search (SEO)**
- Per-page `title`, `description`, `keywords` and **absolute canonical** via `metadataBase`.
- `sitemap.xml` and `robots.txt` generated from route metadata.
- `opengraph-image.tsx` produces a branded 1200×630 card statically at build time.
- `manifest.ts` makes the site installable and declares `lang="en-IN"`.
- Verification tokens read from `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION`.

**Answer engines (AEO)**
- `FAQPage` JSON-LD on `/` and `/about`, and the same answers rendered as visible,
  server-side HTML — never behind an accordion, so the answer is always in the DOM.
- Headings answer questions directly; findings are stated as one-line claims with
  the supporting metric next to them.

**Geo / generative visibility (GEO, LLMO)**
- `public/llms.txt` (summary) and `public/llms-full.txt` (every page in plain text)
  so a crawler or model can read the whole site without executing JavaScript.
- `robots.txt` explicitly allows `GPTBot`, `OAI-SearchBot`, `ClaudeBot`,
  `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, and peers.

**AISEO / agentic score (3/3)**
1. *Machine-readable* — `llms.txt`, `llms-full.txt`, JSON-LD, semantic landmarks.
2. *Fully crawlable* — 100 % SSG, no content gated behind JavaScript.
3. *Verifiable identity* — `sameAs` → LinkedIn + GitHub, `alumniOf`/`affiliation` →
   Jagannath University, one consistent canonical origin everywhere.

**EEAT**
- Verifiable evidence block on `/about`: university link, GitHub, LinkedIn.
- Every case study names its data source, its limitations and its MIT licence note.
- Education, CGPA, schooling and coursework published with a link to the institution.

---

## Content and personal data policy

- **No contact number appears anywhere in the codebase, the components, the rendered
  pages or the JSON-LD.** The PDF resume is the only artefact in this project that
  carries one, by explicit product decision. A grep for `9341728793`, `+91`, `tel:`,
  `telephone` or `phone` across `src/` and `public/` returns zero matches.
- The profile photo and the resume PDF are first-party assets under `public/`.
- Static site: there is no analytics beacon, no form endpoint and no cookie banner
  because nothing is stored or tracked.

---

## Deployment

```bash
npm i -g vercel
vercel login
vercel --prod
```

1. Create the project in Vercel (framework preset: **Next.js**).
2. Add the env vars **NEXT_PUBLIC_GSC_VERIFICATION** and
   **NEXT_PUBLIC_BING_VERIFICATION** once the Search Console / Bing Webmaster
   properties exist, then redeploy.
3. Submit `https://muskan-portfolio.vercel.app/sitemap.xml` to Google Search Console
   and Bing Webmaster Tools.

Built with Next.js and Tailwind CSS.

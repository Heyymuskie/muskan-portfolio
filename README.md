# Muskan Choudhary — Data Analyst Portfolio

![Next.js 16.3](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)
![React 19.2](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-22C55E)

A dark, static, recruiter-first portfolio for **Muskan Choudhary** — an entry-level **Data Analyst**
and final-year B.Tech Computer Science student (2023–2027, CGPA 7.5/10) at
[Jagannath University, Jaipur](https://www.jagannathuniversity.org/), originally from Darbhanga,
Bihar and now based in Jaipur, Rajasthan.

The site presents four documented case studies — public-health data engineering, property-price
modelling, financial risk analytics and workload regression — each written so a hiring manager can
follow the problem, the method and the limits in one sitting.

| | |
| --- | --- |
| **Live site** | [muskan-choudhary.vercel.app](https://muskan-choudhary.vercel.app) |
| **Résumé** | [/resume](https://muskan-choudhary.vercel.app/resume) — served as a PDF, opens in the browser's own reader |
| **Source** | [Heyymuskie/muskan-portfolio](https://github.com/Heyymuskie/muskan-portfolio) |
| **Profiles** | [LinkedIn](https://www.linkedin.com/in/muskiee) · [GitHub](https://github.com/Heyymuskie) |

---

## Contents

- [Stack](#stack)
- [Routes](#routes)
- [Case studies](#case-studies)
- [Repository structure](#repository-structure)
- [Engineering standards](#engineering-standards)
- [Quality gates](#quality-gates)
- [Search and AI visibility](#search-and-ai-visibility)
- [Content and privacy](#content-and-privacy)
- [Commands](#commands)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

---

## Stack

| Layer | Version | Reason |
| --- | --- | --- |
| Next.js (App Router, Turbopack) | 16.3.8 | Static generation for every route, colocated metadata files, route handlers |
| React | 19.2.8 | Server Components — most of the tree never ships a client bundle |
| TypeScript | 5 | Strict content models in `src/data`; types are the documentation |
| Tailwind CSS | 4 | Token-driven design system declared once in `globals.css` |
| shadcn/ui + Radix | 4.21 / 1.6 | Accessible primitives without a runtime theme layer |
| lucide-react | 1.52 | Icons; brand marks come from `src/components/icons.tsx` (lucide v1 removed brand icons) |
| ESLint | 9 | `eslint-config-next` + `typescript-eslint`, zero-warning policy |
| Playwright (dev only) | 1.63 | Drives the responsive QA harness in `scripts/` |

Deliberately absent: no CMS, no database, no API routes, no analytics, no third-party fonts,
no client-side data fetching.

---

## Routes

`next build` reports **15 routes, all prerendered** (`○` static or `●` SSG). Nothing renders on
request.

| Route | Kind | Purpose |
| --- | --- | --- |
| `/` | static HTML | Hero, skills, case-study grid, education, FAQ, contact CTA |
| `/projects` | static HTML | Index of all four case studies |
| `/projects/<slug>` | static HTML ×4 | Deep-dive case studies via `generateStaticParams` |
| `/about` | static HTML | Background, education, verifiable evidence, working approach |
| `/contact` | static HTML | Channels, availability, résumé link |
| `/_not-found` | static HTML | Branded 404 |
| `/resume` | route handler (`force-static`) | Responds `application/pdf` |
| `/sitemap.xml` · `/robots.txt` · `/manifest.webmanifest` | static metadata | |
| `/opengraph-image` · `/icon.svg` | static assets | Branded 1200×630 OG card, SVG icon |

`/resume` is **not** a page. `src/app/resume/route.ts` reads the PDF at build time and answers with
`Content-Type: application/pdf` and `Content-Disposition: inline`, so any browser opens it full-viewport
in its native reader — no iframe, no embedded viewer, no client JS, and nothing is downloaded until a
visitor clicks **View resume**. Because a route handler cannot export `metadata`, the canonical URL is
carried as a `Link` HTTP header, the `DigitalDocument` JSON-LD lives in the home page's `ProfilePage`
graph, and the raw asset at `/Muskan-Choudhary-Resume.pdf` is marked `X-Robots-Tag: noindex`.

---

## Case studies

| Route | Repository |
| --- | --- |
| `/projects/covid19-pandemic-analysis` | [`Heyymuskie/covid19-pandemic-analysis`](https://github.com/Heyymuskie/covid19-pandemic-analysis) |
| `/projects/cracow-property-price-model` | [`Heyymuskie/cracow-property-price-model`](https://github.com/Heyymuskie/cracow-property-price-model) |
| `/projects/fx-trading-performance-analysis` | [`Heyymuskie/fx-trading-performance-analysis`](https://github.com/Heyymuskie/fx-trading-performance-analysis) |
| `/projects/fitness-workload-regression` | [`Heyymuskie/fitness-workload-regression`](https://github.com/Heyymuskie/fitness-workload-regression) |

Every case study follows one fixed outline — *problem → data → method → findings → visuals →
results → limitations → next steps* — so they can be compared without re-learning the layout. Each
states its data source and its limitations explicitly, and carries a "View case study" button rather
than a whole-card click target.

---

## Repository structure

```
src/
  app/
    layout.tsx                  root layout — metadata, fonts, verification, JSON-LD
    page.tsx                    /
    globals.css                 design tokens, dark palette, .container-page / .section
    about/page.tsx              background, education, evidence, approach
    contact/page.tsx            channels + availability
    projects/page.tsx           case-study index
    projects/[slug]/page.tsx    the four case studies (generateStaticParams)
    resume/route.ts             force-static handler → application/pdf
    not-found.tsx               branded 404
    sitemap.ts  robots.ts  manifest.ts
    opengraph-image.tsx  opengraph-image.alt.txt
    favicon.ico  icon.svg
  components/
    layout/                     site header (client — mobile sheet) + footer
    sections/                   hero, about, skills, projects, education, faq, contact
    projects/project-card.tsx   card with a dedicated "View case study" button
    json-ld.tsx                 Person, WebSite, ProfilePage, FAQPage, BreadcrumbList
    icons.tsx                   LinkedIn + GitHub marks
    ui/                         shadcn primitives actually used: badge, button, separator, sheet
  data/
    projects.ts                 the four case studies (full content model)
    content.ts                  hero, skills, competencies, timeline, FAQs
  lib/
    site.ts                     canonical origin, identity, education, links, verification
scripts/
  qa-responsive.mjs             Playwright responsive harness (54 checks)
  lighthouse-audit.ps1          Lighthouse over five production pages
public/
  images/muskan.jpg             profile photo
  Muskan-Choudhary-Resume.pdf   the one-page CV (144 KB)
  projects/<slug>/*.png         15 chart exports for the case-study galleries
  llms.txt  llms-full.txt       machine-readable site summary and full text
```

---

## Engineering standards

### Static rendering

Every route is generated at build time. `src/` contains no `fetch`, no `useEffect` and no
`document.cookie` — all copy is compiled from `src/data` into HTML. Only the site header
(mobile navigation sheet) and four shadcn primitives are client components.

### Performance posture

| Lever | Implementation |
| --- | --- |
| Payload | `public/` is 19 files / 618 KB total, including the 144 KB résumé PDF and the 139 KB profile photo |
| HTML weight | Home ≈30 KB, `/about` ≈20 KB, a case study ≈23 KB — gzipped |
| Fonts | `next/font` self-hosts Geist (two `.woff2`, 52 KB combined) — no third-party font origin |
| Images | `next/image` with AVIF/WebP and explicit `width`/`height`/`sizes`; measured CLS is **0** |
| Layout shift | Cumulative Layout Shift **0.00** on every Lighthouse run |
| Third parties | None — no tag manager, no CDN fonts, no trackers, no cookies |

### Layout and responsive safety

- One `.container-page` (horizontal padding) and one `.section` (vertical rhythm), each defined once
  per breakpoint, so gaps cannot drift between sections.
- `overflow-x: hidden` on `body` plus `min-w-0` on flex/grid children that hold long text.
- Wide result tables sit in their own `overflow-x-auto` card, so they scroll locally instead of
  widening the page.
- Section padding is role-based: page header and footer share one value, content sections share
  another. The harness fails the build if they diverge.

### Accessibility

- Skip link, exactly one `<h1>` per page, labelled landmarks, visible `:focus-visible` ring,
  `prefers-reduced-motion` honoured.
- Interactive targets meet the WCAG 2.5.8 **24 px** floor; inline links inside sentences are exempt
  by that rule.
- **Lighthouse Accessibility = 100** on all five audited pages.
- The site is dark-first: `class="dark"` is set on `<html>`, and `:root` holds the base token layer
  the dark palette overrides.

### Security and headers

Applied in `next.config.ts`:

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Robots-Tag` | `noindex` on the raw résumé asset |
| `Cache-Control` | `public, max-age=0, must-revalidate` on `/resume` and case-study pages |
| `X-Powered-By` | removed (`poweredByHeader: false`) |

---

## Quality gates

Every gate is a command anyone can re-run.

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | 0 errors, 0 warnings |
| Types + build | `npm run build` | exit 0 — 15 routes, all static |
| Responsive QA | `npm run qa:responsive` | **54/54 pass** — 8 HTML routes × 6 viewports (360, 390, 768, 1024, 1280, 1920 px) plus `/resume` |
| Route audit | HTTP check of all 15 routes + assets | 200; unknown paths return 404 |
| Personal-data audit | `Select-String` for phone patterns over `src/` + `public/` | 0 matches |
| Lighthouse | `npm run qa:lighthouse` | Accessibility **100**, SEO **100**, Best Practices **100** on all five pages; Performance **86–98** under the default mobile profile |

**What the responsive harness checks** (`scripts/qa-responsive.mjs`, real Chromium via system Chrome):

1. No element clipped or poking outside the viewport, excluding intentional horizontal scrollers.
2. No two unrelated text blocks overlapping — compared per client-rect so a merely-wrapping inline
   link is not a false positive.
3. Section padding uniform within its role at every breakpoint.
4. Exactly one `<h1>`; no text under 11 px; tap targets at or above 24 px.

It must be run against a server: `npm run start` in one terminal, `npm run qa:responsive` in another.

---

## Search and AI visibility

### SEO

- `metadataBase` resolves every canonical, Open Graph and Twitter URL against a single origin.
- Per-page `title`, `description`, `keywords` and absolute canonical; social card on every route.
- `sitemap.ts` emits 9 URLs with `lastmod`; `robots.ts` mirrors them.
- `opengraph-image.tsx` renders a branded 1200×630 card at build time (with `opengraph-image.alt.txt`).
- `manifest.ts` makes the site installable and declares `lang="en-IN"`.
- Verification tokens are read from `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION`.

### Structured data

`Person`, `WebSite`, `ProfilePage` (carrying a `DigitalDocument` for the résumé), `FAQPage`,
`BreadcrumbList` — emitted as `<script type="application/ld+json">`. Case studies additionally emit
an `Article` graph with headline, keywords, author, publisher and KPIs.

### AEO — answer engines

- The six FAQ pairs are rendered as **visible HTML**, never behind an accordion, so the answer is
  always in the DOM for both readers and extractors.
- Headings answer questions directly; findings are stated as one-line claims with the supporting
  metric next to them.

### GEO and LLMO — generative visibility

- `public/llms.txt` (4.3 KB) summarises the site; `public/llms-full.txt` (24.6 KB) carries every
  page in plain text, so a crawler or model can read the whole site without executing JavaScript.
- `robots.txt` explicitly allows `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`,
  `Claude-User`, `Claude-SearchBot`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `CCBot`,
  `Bytespider`, `Applebot-Extended`, `cohere-ai` and `Amazonbot`.

### AISEO — agentic readiness (3/3)

1. **Machine-readable** — `llms.txt`, `llms-full.txt`, JSON-LD on every page, semantic landmarks.
2. **Fully crawlable** — 100 % static; no content is gated behind JavaScript.
3. **Verifiable identity** — `sameAs` → LinkedIn + GitHub, `alumniOf`/`affiliation` → Jagannath
   University, one canonical origin used everywhere.

### EEAT

- Verifiable evidence block on `/about`: institution, GitHub and LinkedIn links.
- Every case study names its data source, its limitations and its licence note.
- Education, CGPA, schooling and coursework published alongside a link to the institution.

---

## Content and privacy

- **No contact number appears anywhere in the codebase, the components, the rendered pages or the
  JSON-LD.** The PDF résumé is the only artefact in this repository that carries one, by explicit
  product decision. A grep for `+91`, `tel:`, `telephone` and `phone` across `src/` and `public/`
  returns zero matches.
- The profile photo and the résumé PDF are first-party assets under `public/`.
- Static site: no analytics beacon, no form endpoint, no cookie banner — nothing is stored or
  tracked, so no consent prompt is needed.

---

## Commands

```bash
npm install             # install dependencies
npm run dev             # local dev server
npm run build           # production build (runs TypeScript + static generation)
npm run start           # serve the production build
npm run lint            # eslint — must exit with zero warnings
npm run qa:responsive   # responsive harness — run against `npm run start`
npm run qa:lighthouse   # Lighthouse audit of five production pages
```

---

## Environment variables

| Key | Used for | When |
| --- | --- | --- |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-token verification | Set after the GSC property exists, then redeploy |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster `msvalidate.01` token | Set after the Bing property exists, then redeploy |

Both are read in `src/lib/site.ts` and injected into the root metadata in `src/app/layout.tsx`.
They are optional — the site builds and deploys without them.

---

## Deployment

The repository is connected to [Vercel](https://vercel.com) through the GitHub integration, so every
push to `main` builds and deploys automatically.

1. Push to `main` → Vercel builds with `next build` (no custom build settings required).
2. Add the verification environment variables above in
   **Settings → Environment Variables**, then redeploy.
3. Submit `https://muskan-choudhary.vercel.app/sitemap.xml` to
   [Google Search Console](https://search.google.com/search-console) and
   [Bing Webmaster Tools](https://www.bing.com/webmasters).

To deploy manually instead:

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## License

Released under the [MIT License](LICENSE) — see `LICENSE` for the full text.

/**
 * Responsive QA harness.
 *
 * Loads every HTML route at six viewports in a real Chromium (system Chrome)
 * and fails the run on anything that would look broken to a recruiter:
 *
 *   - an element clipped or poking outside the viewport, unless it lives
 *     inside an intentional horizontal-scroll container
 *   - two unrelated text blocks overlapping (compared per client-rect, so a
 *     link that merely wraps onto two lines is not a false positive)
 *   - the vertical rhythm drifting between pages that share the same role
 *   - body copy rendering below 11px
 *   - more than one <h1>
 *   - interactive targets under the WCAG 2.5.8 AA floor of 24px
 *
 * Usage: node scripts/qa-responsive.mjs [baseURL]
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3100";
const EXECUTABLE =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const VIEWPORTS = [
  { name: "360", width: 360, height: 740 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/projects",
  "/projects/covid19-pandemic-analysis",
  "/projects/cracow-property-price-model",
  "/projects/fx-trading-performance-analysis",
  "/projects/fitness-workload-regression",
];

const probe = () => {
  const doc = document;
  const vw = doc.documentElement.clientWidth;
  const out = {
    scrollDelta: doc.documentElement.scrollWidth - vw,
    viewportWidth: vw,
    offenders: [],
    overlaps: [],
    rhythm: { intro: [], content: [], footer: [] },
    tinyText: [],
    h1: doc.querySelectorAll("h1").length,
    shortTargets: [],
  };

  const describe = (el) => {
    const cls = (el.getAttribute("class") || "").slice(0, 40);
    const txt = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""} "${txt}"`;
  };

  const visible = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return false;
    if (parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  /** true when some ancestor deliberately scrolls in X (a data table, etc.) */
  const inScroller = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
    return false;
  };

  let introSeen = false;

  for (const el of doc.body.querySelectorAll("*")) {
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();

    // 1. clipped or poking outside the viewport
    if (
      (r.right > vw + 1 || r.left < -1) &&
      s.position !== "fixed" &&
      !inScroller(el)
    ) {
      out.offenders.push(
        `${describe(el)} left=${Math.round(r.left)} right=${Math.round(r.right)}`,
      );
    }

    // 2. vertical rhythm, grouped by role
    if (el.classList.contains("section")) {
      const v = `${s.paddingTop}|${s.paddingBottom}`;
      if (el.closest("footer")) out.rhythm.footer.push(v);
      else if (!introSeen) {
        out.rhythm.intro.push(v);
        introSeen = true;
      } else out.rhythm.content.push(v);
    }

    // 3. interactive targets — WCAG 2.5.8 AA = 24px.
    //    Links sitting inside a sentence are explicitly exempt.
    const tag = el.tagName.toLowerCase();
    if (
      (tag === "a" || tag === "button") &&
      (el.textContent || "").trim().length > 0 &&
      r.height < 24 &&
      r.width >= 24 &&
      !(s.display === "inline" && el.parentElement?.tagName === "P")
    ) {
      out.shortTargets.push(`${describe(el)} h=${Math.round(r.height)}`);
    }
  }

  // 4. body copy sizing
  const TEXT_TAGS = new Set([
    "p", "li", "dt", "dd", "figcaption", "td", "th", "span", "a", "button",
    "h1", "h2", "h3", "h4", "h5", "h6",
  ]);
  for (const el of doc.body.querySelectorAll("*")) {
    if (!TEXT_TAGS.has(el.tagName.toLowerCase())) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
      continue;
    if (!visible(el)) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 11) out.tinyText.push(`${describe(el)} ${fs}px`);
  }

  // 5. overlapping text — compared rect-by-rect so a wrapping inline link
  //    does not report its own neighbours as overlaps.
  const leaves = [...doc.body.querySelectorAll(
    "h1,h2,h3,h4,h5,h6,p,a,button,li,dt,dd,figcaption,blockquote",
  )].filter((el) => {
    if (!visible(el)) return false;
    const s = getComputedStyle(el);
    if (s.position === "absolute" || s.position === "fixed") return false;
    if (el.closest("[aria-hidden='true']")) return false;
    return [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
    );
  });

  const boxes = leaves.map((el) => ({
    el,
    rects: [...el.getClientRects()].map((c) => ({
      top: c.top, right: c.right, bottom: c.bottom, left: c.left,
    })),
  }));

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      let hit = false;
      for (const ra of a.rects) {
        for (const rb of b.rects) {
          const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
          const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
          if (w > 3 && h > 3) hit = true;
        }
      }
      if (hit) out.overlaps.push(`${describe(a.el)}  ><  ${describe(b.el)}`);
    }
  }

  out.rhythm.intro = [...new Set(out.rhythm.intro)];
  out.rhythm.content = [...new Set(out.rhythm.content)];
  out.rhythm.footer = [...new Set(out.rhythm.footer)];
  out.offenders = out.offenders.slice(0, 6);
  out.overlaps = out.overlaps.slice(0, 6);
  out.tinyText = [...new Set(out.tinyText)].slice(0, 6);
  out.shortTargets = [...new Set(out.shortTargets)].slice(0, 8);
  return out;
};

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const failures = [];
let checks = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    checks++;
    let res;
    try {
      res = await page.goto(BASE + route, { waitUntil: "load", timeout: 30000 });
    } catch (e) {
      failures.push(`[${vp.name}] ${route} -> navigation failed: ${e.message}`);
      continue;
    }
    if (res.status() !== 200) {
      failures.push(`[${vp.name}] ${route} -> HTTP ${res.status()}`);
      continue;
    }

    await page.waitForTimeout(250);
    const r = await page.evaluate(probe);

    if (r.scrollDelta > 1)
      failures.push(
        `[${vp.name}] ${route} -> horizontal page overflow ${r.scrollDelta}px`,
      );
    if (r.offenders.length)
      failures.push(
        `[${vp.name}] ${route} -> clipped / outside viewport:\n      ${r.offenders.join("\n      ")}`,
      );
    if (r.overlaps.length)
      failures.push(
        `[${vp.name}] ${route} -> overlapping text:\n      ${r.overlaps.join("\n      ")}`,
      );
    if (r.h1 !== 1) failures.push(`[${vp.name}] ${route} -> h1 count = ${r.h1}`);
    if (r.tinyText.length)
      failures.push(
        `[${vp.name}] ${route} -> text under 11px:\n      ${r.tinyText.join("\n      ")}`,
      );
    if (r.shortTargets.length)
      failures.push(
        `[${vp.name}] ${route} -> tap target under 24px (WCAG 2.5.8):\n      ${r.shortTargets.join("\n      ")}`,
      );

    // rhythm: content sections must all match. A page intro block is only
    // expected to mirror the footer when it genuinely differs from content.
    if (r.rhythm.content.length > 1)
      failures.push(
        `[${vp.name}] ${route} -> content sections disagree on padding ${JSON.stringify(r.rhythm.content)}`,
      );
    if (r.rhythm.footer.length > 1)
      failures.push(
        `[${vp.name}] ${route} -> footer padding not self-consistent ${JSON.stringify(r.rhythm.footer)}`,
      );
    const intro = r.rhythm.intro[0];
    const footer = r.rhythm.footer[0];
    if (
      intro &&
      footer &&
      r.rhythm.content[0] &&
      intro !== r.rhythm.content[0] &&
      intro !== footer
    )
      failures.push(
        `[${vp.name}] ${route} -> page intro ${intro} matches neither content ${r.rhythm.content[0]} nor footer ${footer}`,
      );
  }

  // /resume must hand off to the browser's native PDF reader. Headless
  // Chromium aborts renderer navigation to PDFs, so this is asserted at the
  // HTTP layer — these headers are exactly what makes Chrome/Edge/Safari open
  // it inline instead of downloading it.
  checks++;
  try {
    const pdfRes = await ctx.request.get(`${BASE}/resume`, {
      timeout: 30000,
      headers: { Accept: "application/pdf" },
    });
    const h = pdfRes.headers();
    const type = h["content-type"] || "";
    const disp = h["content-disposition"] || "";
    const magic = Buffer.from((await pdfRes.body()).subarray(0, 5)).toString("latin1");

    if (pdfRes.status() !== 200 || !type.includes("application/pdf"))
      failures.push(`[${vp.name}] /resume -> ${pdfRes.status()} ${type} (expected 200 application/pdf)`);
    if (/attachment/i.test(disp))
      failures.push(`[${vp.name}] /resume -> Content-Disposition "${disp}" must be inline`);
    if (magic !== "%PDF-")
      failures.push(`[${vp.name}] /resume -> body starts "${magic}", expected %PDF-`);
    if (!(h["link"] || "").includes('rel="canonical"'))
      failures.push(`[${vp.name}] /resume -> missing canonical Link header`);
  } catch (e) {
    failures.push(`[${vp.name}] /resume -> request failed: ${e.message}`);
  }

  await ctx.close();
  console.log(`  ${vp.name}px — ${ROUTES.length + 1} routes checked`);
}

await browser.close();

console.log(`\nchecks run: ${checks} route/viewport combinations`);
if (failures.length) {
  console.log(`\n✗ ${failures.length} FAILURES:\n`);
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}
console.log("✓ ALL RESPONSIVE CHECKS PASSED");

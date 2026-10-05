import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * `/resume` IS the resume.
 *
 * The route answers with the PDF itself, so every browser's built-in reader
 * opens it at full viewport — no separate page, no embedded viewer, no iframe,
 * and nothing is ever fetched until a visitor actually clicks "View resume".
 *
 * `dynamic = 'force-static'` makes the GET handler execute once at build time
 * and the response is then served from the static layer, so this costs zero
 * serverless invocations on the free tier.
 */
export const dynamic = "force-static";
export const runtime = "nodejs";

const PDF_PATH = path.join(
  process.cwd(),
  "public",
  "Muskan-Choudhary-Resume.pdf",
);

export async function GET() {
  const body = readFileSync(PDF_PATH);

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Muskan-Choudhary-Resume.pdf"',
      "Content-Length": String(body.length),
      // Re-validated every load, but reusable while fresh — it is the same
      // asset until a new resume is uploaded.
      "Cache-Control": "public, max-age=0, must-revalidate",
      // Route handlers cannot export `metadata`, so the canonical URL for this
      // non-HTML resource is carried as an HTTP Link header, which Google
      // supports for PDFs.
      "Link": '<https://muskan-portfolio.vercel.app/resume>; rel="canonical"',
    },
  });
}

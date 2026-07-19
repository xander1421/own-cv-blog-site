// Static SEO audit over the built site. Run `bun run build` first, then:
//   bun run seo
// Exits non-zero if any page fails a check, so it can gate CI.
// ponytail: regex over HTML, not a DOM parser — fine for Astro's own output.

const DIST = new URL('../dist/', import.meta.url).pathname;
const LOCALES = ['de', 'es', 'pt', 'fr', 'ro'];

const pages = [...new Bun.Glob('**/index.html').scanSync(DIST)].sort();
if (pages.length === 0) {
  console.error('dist/ is empty — run `bun run build` first');
  process.exit(1);
}

type Issue = { page: string; problem: string };
const issues: Issue[] = [];
const warn = (page: string, problem: string) => issues.push({ page, problem });

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const first = (html: string, re: RegExp) => {
  const v = html.match(re)?.[1]?.trim();
  return v === undefined ? undefined : decode(v);
};

for (const page of pages) {
  const html = await Bun.file(DIST + page).text();

  const title = first(html, /<title[^>]*>([^<]*)<\/title>/i);
  if (!title) warn(page, 'missing <title>');
  else if (title.length > 65) warn(page, `title too long (${title.length} chars): "${title.slice(0, 50)}…"`);

  const desc = first(html, /<meta\s+name="description"\s+content="([^"]*)"/i)
    ?? first(html, /<meta\s+content="([^"]*)"\s+name="description"/i);
  if (!desc) warn(page, 'missing meta description');
  else if (desc.length < 50) warn(page, `meta description too short (${desc.length} chars)`);
  else if (desc.length > 170) warn(page, `meta description too long (${desc.length} chars)`);

  if (!/<link\s+rel="canonical"/i.test(html)) warn(page, 'missing canonical link');

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1 && page !== '404.html') warn(page, `${h1Count} <h1> tags (want exactly 1)`);

  if (!/<meta\s+property="og:title"/i.test(html)) warn(page, 'missing og:title');
  if (!/<meta\s+property="og:image"/i.test(html)) warn(page, 'missing og:image');

  // hreflang: localized pages should cross-link every locale + x-default
  const hreflangs = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"/gi)].map(m => m[1]);
  if (hreflangs.length > 0) {
    for (const l of ['en', ...LOCALES, 'x-default']) {
      if (!hreflangs.includes(l)) warn(page, `hreflang set missing "${l}"`);
    }
  }

  // every JSON-LD block must parse
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1]);
    } catch {
      warn(page, 'JSON-LD does not parse');
    }
  }
}

for (const f of ['robots.txt', 'sitemap-index.xml']) {
  if (!(await Bun.file(DIST + f).exists())) issues.push({ page: '(site)', problem: `missing ${f}` });
}

if (issues.length) {
  console.error(`✗ ${issues.length} issue(s) across ${pages.length} pages:\n`);
  for (const { page, problem } of issues) console.error(`  ${page}: ${problem}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages clean: title, description, canonical, h1, og tags, hreflang, JSON-LD, robots, sitemap`);

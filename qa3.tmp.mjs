import { chromium } from 'playwright';
import fs from 'fs';

const OUT = "/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/s3";
fs.mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:5174';

const ROUTES = [
  ['/', 'home'], ['/about', 'about'], ['/assets', 'assets'], ['/entity/SM', 'entity-SM'],
  ['/entity/SMB', 'entity-SMB'], ['/newsletter', 'newsletter'],
  ['/newsletter/geng-north-final-investment-decision', 'article'], ['/organisation', 'organisation'],
  ['/resources', 'resources'], ['/services', 'services'], ['/directory', 'directory'],
  ['/emergency', 'emergency'], ['/faq', 'faq'], ['/legal/privacy', 'legal-privacy'],
  ['/legal/terms', 'legal-terms'], ['/nonexistent-route', '404'],
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

// Patch the lucide brand-icon crash in-flight (no source edits) so the app renders.
async function patchIcons(ctx) {
  await ctx.route('**/src/lib/icons.tsx*', async (route) => {
    const res = await route.fetch();
    let body = await res.text();
    for (const n of ['Instagram', 'Linkedin', 'Twitter', 'Youtube']) body = body.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`), '');
    body = body.replace('var _jsxFileName', 'const Instagram = Circle, Linkedin = Circle, Twitter = Circle, Youtube = Circle;\nvar _jsxFileName');
    await route.fulfill({ body, headers: { ...res.headers(), 'content-type': 'text/javascript' } });
  });
}

const overflowScript = () => {
  const vw = window.innerWidth;
  const out = { scrollWidth: document.documentElement.scrollWidth, innerWidth: vw, offenders: [] };
  if (out.scrollWidth > vw + 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const p = el.parentElement;
        const pr = p ? p.getBoundingClientRect() : null;
        // report only the outermost offenders (parent not itself offending)
        if (pr && (pr.right > vw + 1 || pr.left < -1)) continue;
        out.offenders.push({ tag: el.tagName, cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 90), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), text: (el.textContent || '').trim().slice(0, 45) });
      }
    }
  }
  return out;
};

const restAudit = () => {
  const out = { badImages: [], stuckInvisible: [], tinyTaps: [] };
  for (const i of document.images) if (!i.complete || i.naturalWidth === 0) out.badImages.push(i.src);
  const vw = window.innerWidth;
  for (const el of document.querySelectorAll('main *, footer *')) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (parseFloat(cs.opacity) < 0.05 && (el.textContent || '').trim().length > 5)
      out.stuckInvisible.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 60), text: (el.textContent || '').trim().slice(0, 50) });
    if (vw < 500 && (el.tagName === 'BUTTON' || (el.tagName === 'A' && el.className?.toString?.().includes('rounded')))) {
      if (r.width < 40 || r.height < 32)
        out.tinyTaps.push({ tag: el.tagName, w: Math.round(r.width), h: Math.round(r.height), text: ((el.textContent || '').trim() || el.getAttribute('aria-label') || '').slice(0, 30) });
    }
  }
  out.stuckInvisible = out.stuckInvisible.slice(0, 12);
  out.tinyTaps = [...new Map(out.tinyTaps.map(t => [JSON.stringify(t), t])).values()].slice(0, 12);
  return out;
};

const only = process.argv[2];
const report = [];
const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  if (only && only !== vp.name) continue;
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.name === 'mobile', hasTouch: vp.name === 'mobile' });


  for (const [route, slug] of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 160)}`); });
    page.on('pageerror', e => errors.push(`[pageerror] ${e.message.slice(0, 160)}`));
    page.on('requestfailed', r => errors.push(`[reqfail] ${r.url().slice(0, 100)}`));

    await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch(e => errors.push('[nav] ' + e.message));
    await page.waitForTimeout(1200);

    const overflows = [];
    let y = 0, i = 0;
    while (i < 22) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(850);
      await page.screenshot({ path: `${OUT}/${vp.name}__${slug}__${String(i).padStart(2, '0')}.png` });
      const of = await page.evaluate(overflowScript);
      if (of.offenders.length) overflows.push(of);
      const { sh, cur } = await page.evaluate(() => ({ sh: document.documentElement.scrollHeight, cur: window.scrollY }));
      if (cur + window_h(vp) >= sh - 4) break;  // reached bottom
      y += vp.height;
      i++;
    }
    await page.waitForTimeout(600);
    const rest = await page.evaluate(restAudit);
    const entry = { route, viewport: vp.name, errors: [...new Set(errors)].slice(0, 6), shots: i + 1,
      docHeight: await page.evaluate(() => document.documentElement.scrollHeight),
      overflow: overflows[0] ? { scrollWidth: overflows[0].scrollWidth, innerWidth: overflows[0].innerWidth, offenders: overflows[0].offenders.slice(0, 6) } : null,
      ...rest };
    report.push(entry);
    console.log(`${vp.name.padEnd(7)} ${route.padEnd(48)} shots=${String(i + 1).padStart(2)} err=${entry.errors.length} ovf=${entry.overflow ? 'YES' : '-'} badImg=${rest.badImages.length} stuck=${rest.stuckInvisible.length}`);
    await page.close();
  }
  await ctx.close();
}
function window_h(vp) { return vp.height; }
await browser.close();
fs.writeFileSync(`${OUT}/report-${only || 'all'}.json`, JSON.stringify(report, null, 2));
console.log('DONE');

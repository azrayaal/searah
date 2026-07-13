import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/shots';
fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:5174';
const ROUTES = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/assets', 'assets'],
  ['/entity/SM', 'entity-SM'],
  ['/entity/SMB', 'entity-SMB'],
  ['/newsletter', 'newsletter'],
  ['/newsletter/geng-north-final-investment-decision', 'article'],
  ['/organisation', 'organisation'],
  ['/resources', 'resources'],
  ['/services', 'services'],
  ['/directory', 'directory'],
  ['/emergency', 'emergency'],
  ['/faq', 'faq'],
  ['/legal/privacy', 'legal-privacy'],
  ['/legal/terms', 'legal-terms'],
  ['/nonexistent-route', '404'],
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const only = process.argv[2]; // optional viewport filter
const report = [];

const overflowScript = () => {
  const vw = window.innerWidth;
  const res = { scrollWidth: document.documentElement.scrollWidth, innerWidth: vw, offenders: [] };
  if (document.documentElement.scrollWidth > vw + 1) {
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        // only report if no ancestor already reported (keep it shallow-ish)
        res.offenders.push({
          tag: el.tagName,
          cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 120),
          left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
          text: (el.textContent || '').trim().slice(0, 40),
        });
      }
    }
  }
  return res;
};

const auditScript = () => {
  const out = { badImages: [], invisible: [], tinyTaps: [], clipped: [] };
  for (const i of document.images) {
    if (!i.complete || i.naturalWidth === 0) out.badImages.push(i.src);
  }
  const vw = window.innerWidth, vh = window.innerHeight;
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    // invisible but in-viewport content
    if (parseFloat(cs.opacity) < 0.05 && r.top < vh && r.bottom > 0 && (el.textContent || '').trim().length > 3 && r.height > 10) {
      out.invisible.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 80), text: (el.textContent || '').trim().slice(0, 50), top: Math.round(r.top) });
    }
    // tiny tap targets
    if ((el.tagName === 'BUTTON' || el.tagName === 'A') && r.top < vh && r.bottom > 0) {
      if ((r.width < 32 || r.height < 28) && (el.textContent || '').trim().length + el.querySelectorAll('svg').length > 0) {
        out.tinyTaps.push({ tag: el.tagName, w: Math.round(r.width), h: Math.round(r.height), text: (el.textContent || '').trim().slice(0, 30) || (el.getAttribute('aria-label') || '') });
      }
    }
    // clipped text: overflow hidden and content wider/taller than box, leaf-ish text nodes
    if (el.children.length === 0 && (el.textContent || '').trim().length > 2) {
      if ((cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') &&
          (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) &&
          cs.textOverflow !== 'ellipsis' && !cs.webkitLineClamp.startsWith('1') ) {
        out.clipped.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 60), text: (el.textContent || '').trim().slice(0, 40), sw: el.scrollWidth, cw: el.clientWidth, sh: el.scrollHeight, ch: el.clientHeight, clamp: cs.webkitLineClamp });
      }
    }
  }
  out.invisible = out.invisible.slice(0, 15);
  out.tinyTaps = out.tinyTaps.slice(0, 15);
  out.clipped = out.clipped.slice(0, 15);
  return out;
};

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  if (only && only !== vp.name) continue;
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.name === 'mobile', hasTouch: vp.name === 'mobile' });
  for (const [route, slug] of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text().slice(0, 200)}`); });
    page.on('pageerror', e => errors.push(`[pageerror] ${e.message.slice(0, 200)}`));
    page.on('requestfailed', r => errors.push(`[reqfail] ${r.url().slice(0, 120)} ${r.failure()?.errorText}`));

    await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch(e => errors.push('[nav] ' + e.message));
    await page.waitForTimeout(1200);

    const entry = { route, viewport: vp.name, errors, steps: 0 };

    // scroll steps
    const docH = await page.evaluate(() => document.body.scrollHeight);
    const steps = Math.min(12, Math.ceil(docH / vp.height));
    const overflows = [];
    const audits = [];
    for (let i = 0; i < steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vp.height);
      await page.waitForTimeout(850);
      await page.screenshot({ path: `${OUT}/${vp.name}__${slug}__${String(i).padStart(2, '0')}.png` });
      const of = await page.evaluate(overflowScript);
      if (of.offenders.length) overflows.push({ step: i, ...of });
      audits.push(await page.evaluate(auditScript));
    }
    entry.steps = steps;
    entry.docHeight = docH;
    entry.overflow = overflows.length ? { scrollWidth: overflows[0].scrollWidth, innerWidth: overflows[0].innerWidth, offenders: overflows[0].offenders.slice(0, 12) } : null;
    entry.badImages = [...new Set(audits.flatMap(a => a.badImages))];
    entry.invisible = audits.flatMap(a => a.invisible).slice(0, 10);
    entry.tinyTaps = [...new Map(audits.flatMap(a => a.tinyTaps).map(t => [JSON.stringify(t), t])).values()].slice(0, 10);
    entry.clipped = [...new Map(audits.flatMap(a => a.clipped).map(t => [JSON.stringify(t), t])).values()].slice(0, 10);
    report.push(entry);
    console.log(`${vp.name} ${route} steps=${steps} err=${errors.length} overflow=${entry.overflow ? 'YES' : 'no'} badImg=${entry.badImages.length}`);
    await page.close();
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(OUT + `/report-${only || 'all'}.json`, JSON.stringify(report, null, 2));
console.log('DONE');

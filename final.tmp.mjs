import { chromium } from 'playwright';
const S = '/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/s2/';
const BAD = ['Instagram', 'Linkedin', 'Twitter', 'Youtube'];

async function patch(r) {
  const res = await r.fetch();
  let x = await res.text();
  x = x.replace(/import\s*\{([^}]+)\}\s*from\s*("[^"]*lucide-react\.js[^"]*")/, (m, names, src) => {
    const kept = names.split(',').map(s => s.trim()).filter(n => n && !BAD.includes(n));
    return `import { ${kept.join(', ')} } from ${src};\nconst Instagram = Circle, Linkedin = Circle, Twitter = Circle, Youtube = Circle;`;
  });
  await r.fulfill({ body: x, headers: { ...res.headers(), 'content-type': 'text/javascript' } });
}
async function mk(browser, w, h, mobile = false) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  await ctx.route('**/icons.tsx*', patch);
  return ctx;
}
const scrollAll = async (p, step = 600, n = 25) => { for (let i = 0; i < n; i++) { await p.evaluate((s) => window.scrollBy(0, s), step); await p.waitForTimeout(150); } await p.waitForTimeout(900); };

const browser = await chromium.launch();

// ---------- 1. sanity + button colours ----------
const d = await mk(browser, 1440, 900);
let p = await d.newPage();
await p.goto('http://localhost:5174/services', { waitUntil: 'networkidle' });
await scrollAll(p, 700, 8);
console.log('=== 1. /services Request buttons ===');
console.log(await p.evaluate(() => [...document.querySelectorAll('a,button')]
  .filter(e => (e.textContent || '').trim().startsWith('Request'))
  .slice(0, 2).map(e => { const cs = getComputedStyle(e); return { t: e.textContent.trim(), color: cs.color, bg: cs.backgroundColor, hasTextWhiteClass: /text-white/.test(e.className) }; })));
await p.screenshot({ path: S + 'V_services_buttons.png' });

p = await d.newPage();
await p.goto('http://localhost:5174/emergency', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
console.log('\n=== 2. /emergency buttons ===');
console.log(await p.evaluate(() => [...document.querySelectorAll('a,button')]
  .filter(e => typeof e.className === 'string' && /rounded-btn/.test(e.className))
  .slice(0, 5).map(e => { const cs = getComputedStyle(e); return { t: e.textContent.trim().slice(0, 22), color: cs.color, bg: cs.backgroundColor }; })));
await p.screenshot({ path: S + 'V_emergency_top.png' });

// ---------- 3. orphaned grid cells ----------
console.log('\n=== 3. orphaned grid cells (gap-px grids) ===');
for (const [vn, w, h] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
  const c = await mk(browser, w, h, vn === 'mobile');
  const pg = await c.newPage();
  for (const route of ['/', '/about', '/assets', '/entity/SM', '/newsletter', '/organisation', '/resources', '/services', '/directory', '/emergency', '/faq']) {
    await pg.goto('http://localhost:5174' + route, { waitUntil: 'networkidle' });
    await scrollAll(pg, 700, 20);
    const bad = await pg.evaluate(() => {
      const out = [];
      for (const g of document.querySelectorAll('[class*="gap-px"]')) {
        const cs = getComputedStyle(g);
        if (cs.display !== 'grid') continue;
        const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
        const n = [...g.children].filter(c => c.getBoundingClientRect().height > 0).length;
        if (cols > 1 && n % cols !== 0) out.push({ cols, items: n, emptyCells: cols - (n % cols), bg: cs.backgroundColor, first: (g.children[0]?.textContent || '').trim().slice(0, 26) });
      }
      return out;
    });
    if (bad.length) bad.forEach(x => console.log(`  ${vn} ${route}`, JSON.stringify(x)));
  }
  await c.close();
}

// ---------- 4. interactions (desktop) ----------
console.log('\n=== 4. interactions ===');
p = await d.newPage();
await p.goto('http://localhost:5174/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
await p.getByRole('button', { name: /About Us/i }).first().hover().catch(() => {});
await p.waitForTimeout(900);
await p.screenshot({ path: S + 'I_megamenu.png' });

p = await d.newPage();
await p.goto('http://localhost:5174/assets', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
await p.evaluate(() => window.scrollBy(0, 900)); await p.waitForTimeout(800);
await p.getByText('North Mahakam').first().click().catch(e => console.log('asset click fail', e.message.slice(0, 60)));
await p.waitForTimeout(1200);
await p.screenshot({ path: S + 'I_asset_drawer.png' });

p = await d.newPage();
await p.goto('http://localhost:5174/directory', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
await p.getByText('Rahmat Wijaya').first().click().catch(e => console.log('dir click fail', e.message.slice(0, 60)));
await p.waitForTimeout(1200);
await p.screenshot({ path: S + 'I_directory_modal.png' });

p = await d.newPage();
await p.goto('http://localhost:5174/faq', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(700);
const acc = p.locator('button[aria-expanded]').first();
await acc.click().catch(e => console.log('faq click fail', e.message.slice(0, 60)));
await p.waitForTimeout(1000);
await p.screenshot({ path: S + 'I_faq_open.png' });
await d.close();

// ---------- 5. mobile hamburger + tap targets ----------
const m = await mk(browser, 390, 844, true);
p = await m.newPage();
await p.goto('http://localhost:5174/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
await p.screenshot({ path: S + 'M_home_top.png' });
const hb = p.locator('[aria-label="Open menu"]');
console.log('hamburger count:', await hb.count());
await hb.first().click().catch(e => console.log('hamburger fail', e.message.slice(0, 60)));
await p.waitForTimeout(1200);
await p.screenshot({ path: S + 'M_menu_open.png' });
console.log('menu open tap targets:', await p.evaluate(() => [...document.querySelectorAll('a,button')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 32; }).map(e => ({ t: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 20), h: Math.round(e.getBoundingClientRect().height) })).slice(0, 8)));

// mobile /resources stuck
p = await m.newPage();
await p.goto('http://localhost:5174/resources', { waitUntil: 'networkidle' });
await scrollAll(p, 500, 22);
console.log('\n=== 6. mobile /resources stuck-invisible at rest ===');
console.log(await p.evaluate(() => [...document.querySelectorAll('main *')].filter(e => parseFloat(getComputedStyle(e).opacity) < 0.05 && (e.textContent || '').trim().length > 5)
  .map(e => ({ tag: e.tagName, cls: (e.className || '').toString().slice(0, 40), op: getComputedStyle(e).opacity, top: Math.round(e.getBoundingClientRect().top), text: (e.textContent || '').trim().slice(0, 40) })).slice(0, 6)));
await p.screenshot({ path: S + 'M_resources_stuck.png' });
await m.close();

await browser.close();
console.log('\nDONE');

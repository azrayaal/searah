import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route('**/src/lib/icons.tsx*', async (route) => {
  const res = await route.fetch(); let body = await res.text();
  for (const n of ['Instagram','Linkedin','Twitter','Youtube']) body = body.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`), '');
  body = body.replace('var _jsxFileName', 'const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await route.fulfill({ body, headers: { ...res.headers(), 'content-type': 'text/javascript' } });
});
const p = await ctx.newPage();
await p.goto('http://localhost:5174/about', { waitUntil: 'networkidle' });
for (let i=0;i<6;i++){ await p.evaluate(()=>window.scrollBy(0,400)); await p.waitForTimeout(400); }
await p.waitForTimeout(2500);
console.log('--- about stat strip at rest ---');
console.log(await p.evaluate(() => {
  const dl = document.querySelectorAll('dl, .grid');
  // find the strip containing "ASSETS"
  for (const el of document.querySelectorAll('div,ul,dl')) {
    const t = el.textContent||'';
    if (t.includes('19 assets') && t.includes('2 countries') && el.children.length>=4 && el.children.length<=5) {
      return [...el.children].map(c => c.innerText.split('\n'));
    }
  }
  return 'not found';
}));
console.log('\n--- leadership grid ---');
console.log(await p.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x=>x.textContent.includes('Leadership'));
  const sec = h.closest('section') || h.parentElement.parentElement;
  const grid = sec.querySelector('ul,div[class*=grid]');
  const cs = getComputedStyle(grid);
  return { cards: grid.children.length, gridCls: grid.className, bg: cs.backgroundColor, cols: cs.gridTemplateColumns, gap: cs.gap };
}));
await b.close();

import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1000);
const r = await p.evaluate(() => [...document.querySelectorAll('footer a[aria-label]')].map(a => ({ label: a.getAttribute('aria-label'), svg: a.innerHTML })));
for (const s of r) console.log('\n---', s.label, '\n', s.svg);
await b.close();

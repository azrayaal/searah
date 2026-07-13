import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

await p.goto('http://localhost:5174/about', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
console.log('=== /about structure ===');
console.log(await p.evaluate(() => {
  const main = document.querySelector('main');
  const secs = [...main.querySelectorAll(':scope > *')].map(s => {
    const r = s.getBoundingClientRect();
    return { tag: s.tagName, cls: (s.className||'').toString().slice(0,60), top: Math.round(r.top + window.scrollY), h: Math.round(r.height), opacity: getComputedStyle(s).opacity };
  });
  return { scrollHeight: document.documentElement.scrollHeight, bodyH: document.body.scrollHeight, mainH: Math.round(main.getBoundingClientRect().height), sections: secs, imgCount: document.images.length };
}));

// scroll fully to bottom repeatedly
for (let i = 0; i < 20; i++) { await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(300); }
await p.waitForTimeout(1500);
console.log('after full scroll scrollHeight =', await p.evaluate(() => document.documentElement.scrollHeight));
console.log('still-invisible with text:', await p.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('main *')) {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 && (el.textContent||'').trim().length > 5) {
      out.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,70), text: (el.textContent||'').trim().slice(0,60) });
    }
  }
  return out.slice(0, 20);
}));
console.log('broken images at rest:', await p.evaluate(() => [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)));

// ---- assets count ----
const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p2.goto('http://localhost:5174/assets', { waitUntil: 'networkidle' });
await p2.waitForTimeout(1500);
console.log('\n=== /assets ===');
console.log(await p2.evaluate(() => {
  const rows = document.querySelectorAll('tbody tr');
  const markers = document.querySelectorAll('svg circle, svg [data-marker], .marker');
  return {
    tableRows: rows.length,
    countText: [...document.querySelectorAll('*')].filter(e=>e.children.length===0 && /assets$/.test(e.textContent.trim())).map(e=>e.parentElement.textContent.trim()).slice(0,3),
    svgCircles: document.querySelectorAll('svg circle').length,
    paginationText: [...document.querySelectorAll('nav,div')].map(e=>e.textContent).filter(t=>/Page|of \d/.test(t)).slice(-1),
  };
}));

// ---- home news thumbs at rest ----
const p3 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p3.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
for (let i = 0; i < 15; i++) { await p3.evaluate(() => window.scrollBy(0, 600)); await p3.waitForTimeout(300); }
await p3.waitForTimeout(2500);
console.log('\n=== / home images at rest ===');
console.log(await p3.evaluate(() => [...document.images].map(i => ({ src: i.src.split('/').pop(), ok: i.complete && i.naturalWidth>0, nw: i.naturalWidth, opacity: getComputedStyle(i).opacity, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }))));
console.log('footer social links:', await p3.evaluate(() => [...document.querySelectorAll('footer a')].filter(a=>a.getBoundingClientRect().width < 50 && a.getBoundingClientRect().width>0).map(a => ({ label: a.getAttribute('aria-label'), html: a.innerHTML.slice(0,150), w: Math.round(a.getBoundingClientRect().width) }))));

await b.close();

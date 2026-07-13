import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route('**/src/lib/icons.tsx*', async (r) => { const res=await r.fetch(); let x=await res.text();
  for (const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
  x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}}); });

// ---- A: entity chart ----
const p = await ctx.newPage();
await p.goto('http://localhost:5174/entity/SM', {waitUntil:'networkidle'});
for(let i=0;i<20;i++){ await p.evaluate(()=>window.scrollBy(0,500)); await p.waitForTimeout(200); }
await p.waitForTimeout(2500);
console.log('=== A: Quarterly production chart (at rest) ===');
console.log(await p.evaluate(() => {
  const h = [...document.querySelectorAll('*')].find(e=>e.children.length===0 && e.textContent.trim()==='Quarterly production');
  const card = h.closest('div[class*=rounded]');
  const svg = card.querySelector('svg');
  if (!svg) return 'NO SVG IN CHART CARD';
  const shapes = svg.querySelectorAll('rect,path,line,circle,polyline');
  return { svgBox: svg.getBoundingClientRect().height, shapeCount: shapes.length,
    shapes: [...shapes].slice(0,8).map(s=>({t:s.tagName, h:Math.round(s.getBoundingClientRect().height), w:Math.round(s.getBoundingClientRect().width), fill:getComputedStyle(s).fill, op:getComputedStyle(s).opacity})) };
}));

// ---- B: services Request button contrast ----
const p2 = await ctx.newPage();
await p2.goto('http://localhost:5174/services', {waitUntil:'networkidle'});
for(let i=0;i<20;i++){ await p2.evaluate(()=>window.scrollBy(0,500)); await p2.waitForTimeout(200); }
await p2.waitForTimeout(2000);
console.log('\n=== B: /services Request buttons ===');
console.log(await p2.evaluate(() => {
  const btns=[...document.querySelectorAll('a,button')].filter(e=>e.textContent.trim().startsWith('Request'));
  return btns.slice(0,3).map(x=>{ const cs=getComputedStyle(x);
    return {tag:x.tagName, cls:x.className.slice(0,80), color:cs.color, bg:cs.backgroundColor, opacity:cs.opacity}; });
}));

// ---- C: entity tab click -> heading hidden under sticky bar? ----
console.log('\n=== C: /entity/SM tab anchor offset ===');
const p3 = await ctx.newPage();
await p3.goto('http://localhost:5174/entity/SM', {waitUntil:'networkidle'});
await p3.waitForTimeout(1200);
for (const tab of ['Production','Gallery','Leadership']) {
  await p3.getByRole('button',{name:tab, exact:true}).click().catch(()=>p3.click(`text=${tab}`));
  await p3.waitForTimeout(1500);
  const r = await p3.evaluate(() => {
    const bar=[...document.querySelectorAll('*')].find(e=>{const cs=getComputedStyle(e);return cs.position==='sticky' && e.textContent.includes('Downloads') && e.getBoundingClientRect().height<80;});
    const bb = bar?bar.getBoundingClientRect():null;
    const heads=[...document.querySelectorAll('h2')].map(h=>({t:h.textContent.trim().slice(0,28), top:Math.round(h.getBoundingClientRect().top)})).filter(h=>h.top>-50&&h.top<400);
    return { barBottom: bb?Math.round(bb.bottom):null, barTop: bb?Math.round(bb.top):null, headings: heads };
  });
  console.log(tab, JSON.stringify(r));
}
await p3.screenshot({path:'/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/s2/X_entity_tab_leadership.png'});
await b.close();

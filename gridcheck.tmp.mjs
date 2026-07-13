import { chromium } from 'playwright';
const ROUTES=['/','/about','/assets','/entity/SM','/entity/SMB','/newsletter','/newsletter/geng-north-final-investment-decision','/organisation','/resources','/services','/directory','/emergency','/faq','/legal/privacy','/legal/terms','/nonexistent-route'];
const VPS=[{n:'desktop',w:1440,h:900},{n:'tablet',w:768,h:1024},{n:'mobile',w:390,h:844}];
const b = await chromium.launch();
for (const vp of VPS) {
  const ctx = await b.newContext({ viewport:{width:vp.w,height:vp.h} });
  await ctx.route('**/src/lib/icons.tsx*', async (r) => { const res=await r.fetch(); let x=await res.text();
    for (const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
    x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
    await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}}); });
  const p = await ctx.newPage();
  for (const route of ROUTES) {
    await p.goto('http://localhost:5174'+route,{waitUntil:'networkidle'});
    for(let i=0;i<25;i++){ await p.evaluate(()=>window.scrollBy(0,600)); await p.waitForTimeout(120); }
    await p.waitForTimeout(800);
    const bad = await p.evaluate(() => {
      const out=[];
      for (const g of document.querySelectorAll('[class*="gap-px"]')) {
        const cs=getComputedStyle(g);
        if (cs.display!=='grid') continue;
        const cols=cs.gridTemplateColumns.split(' ').filter(Boolean).length;
        const n=[...g.children].filter(c=>c.getBoundingClientRect().height>0).length;
        if (cols>1 && n%cols!==0) out.push({cols,items:n,empty:cols-(n%cols),bg:cs.backgroundColor,cls:g.className.slice(0,70),first:(g.children[0]?.textContent||'').trim().slice(0,30)});
      }
      return out;
    });
    if (bad.length) { console.log(`\n## ${vp.n} ${route}`); bad.forEach(x=>console.log('  ',JSON.stringify(x))); }
  }
  await ctx.close();
}
await b.close();

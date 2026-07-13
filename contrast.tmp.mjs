import { chromium } from 'playwright';
const ROUTES=['/','/about','/assets','/entity/SM','/entity/SMB','/newsletter','/newsletter/geng-north-final-investment-decision','/organisation','/resources','/services','/directory','/emergency','/faq','/legal/privacy','/legal/terms','/nonexistent-route'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/src/lib/icons.tsx*', async (r)=>{const res=await r.fetch();let x=await res.text();
  for(const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
  x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}});});
const p = await ctx.newPage();
const fn = () => {
  const lum = (c) => { const [r,g,bb]=c.match(/\d+/g).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*bb; };
  const bgOf = (el) => { let e=el; while(e){ const bg=getComputedStyle(e).backgroundColor; if(bg && !bg.includes('rgba(0, 0, 0, 0)')) return bg; e=e.parentElement;} return 'rgb(255,255,255)'; };
  const out=[];
  for (const el of document.querySelectorAll('a,button')) {
    const t=(el.textContent||'').trim(); if(!t || t.length>40) continue;
    const r=el.getBoundingClientRect(); if(r.width<2) continue;
    const cs=getComputedStyle(el);
    const bg=bgOf(el);
    const l1=lum(cs.color), l2=lum(bg);
    const ratio=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
    if (ratio < 3) out.push({text:t.slice(0,28), color:cs.color, bg, ratio:+ratio.toFixed(2)});
  }
  return [...new Map(out.map(o=>[o.text+o.bg,o])).values()];
};
for (const route of ROUTES) {
  await p.goto('http://localhost:5174'+route,{waitUntil:'networkidle'});
  for(let i=0;i<22;i++){ await p.evaluate(()=>window.scrollBy(0,600)); await p.waitForTimeout(120); }
  await p.waitForTimeout(700);
  const bad = await p.evaluate(fn);
  if (bad.length) { console.log(`\n## ${route}`); bad.slice(0,8).forEach(x=>console.log('   ',JSON.stringify(x))); }
}
await b.close();

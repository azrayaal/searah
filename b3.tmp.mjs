import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/src/lib/icons.tsx*', async (r)=>{const res=await r.fetch();let x=await res.text();
  for(const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
  x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}});});
for (const [route,label] of [['/services','Request'],['/emergency',null],['/','Explore']]) {
  const p = await ctx.newPage();
  await p.goto('http://localhost:5174'+route,{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  const res = await p.evaluate(()=>{
    const out=[];
    for (const e of document.querySelectorAll('a,button')) {
      const cls=e.className||''; if(typeof cls!=='string') continue;
      if(!/bg-navy-deep|bg-crimson|bg-white/.test(cls) || !/inline-flex/.test(cls)) continue;
      const cs=getComputedStyle(e);
      out.push({t:(e.textContent||'').trim().slice(0,26), color:cs.color, bg:cs.backgroundColor, hasTextWhite:/text-white/.test(cls)});
    }
    return [...new Map(out.map(o=>[o.t,o])).values()].slice(0,6);
  });
  console.log('\n##', route); res.forEach(x=>console.log('  ',JSON.stringify(x)));
  await p.close();
}
await b.close();

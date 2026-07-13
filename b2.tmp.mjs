import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/src/lib/icons.tsx*', async (r)=>{const res=await r.fetch();let x=await res.text();
  for(const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
  x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}});});
const p = await ctx.newPage();
await p.goto('http://localhost:5174/services',{waitUntil:'networkidle'});
for(let i=0;i<10;i++){ await p.evaluate(()=>window.scrollBy(0,600)); await p.waitForTimeout(250); }
await p.waitForTimeout(1500);
const r = await p.evaluate(()=>{
  const el=[...document.querySelectorAll('a')].find(e=>e.textContent.trim()==='Request');
  const cs=getComputedStyle(el);
  const box=el.getBoundingClientRect();
  return {cls:el.className, color:cs.color, bg:cs.backgroundColor, box:{y:Math.round(box.y),h:Math.round(box.height)}};
});
console.log(JSON.stringify(r,null,1));
const el = p.locator('a', {hasText:/^Request$/}).first();
await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await el.screenshot({path:'/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/s2/X_request_btn.png'});
// emergency danger buttons
const p2 = await ctx.newPage();
await p2.goto('http://localhost:5174/emergency',{waitUntil:'networkidle'});
await p2.waitForTimeout(1500);
console.log('\nEMERGENCY buttons:');
console.log(await p2.evaluate(()=>[...document.querySelectorAll('a,button')].filter(e=>e.className.includes('bg-crimson')||e.className.includes('bg-navy-deep')).slice(0,4).map(e=>({t:e.textContent.trim().slice(0,24),color:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}))));
await b.close();

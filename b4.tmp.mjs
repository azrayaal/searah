import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/src/lib/icons.tsx*', async (r)=>{const res=await r.fetch();let x=await res.text();
  for(const n of ['Instagram','Linkedin','Twitter','Youtube']) x=x.replace(new RegExp(`(,\\s*)${n}(?=[,\\s}])`),'');
  x=x.replace('var _jsxFileName','const Instagram=Circle,Linkedin=Circle,Twitter=Circle,Youtube=Circle;\nvar _jsxFileName');
  await r.fulfill({body:x,headers:{...res.headers(),'content-type':'text/javascript'}});});
const S='/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad/s2/';
const p = await ctx.newPage();
await p.goto('http://localhost:5174/services',{waitUntil:'networkidle'});
for(let i=0;i<6;i++){ await p.evaluate(()=>window.scrollBy(0,700)); await p.waitForTimeout(300); }
await p.waitForTimeout(1500);
const info = await p.evaluate(()=>{
  const els=[...document.querySelectorAll('a,button')].filter(e=>(e.textContent||'').trim().startsWith('Request'));
  return els.slice(0,2).map(e=>{const cs=getComputedStyle(e);return {t:e.textContent.trim(),color:cs.color,bg:cs.backgroundColor,cls:e.className};});
});
console.log(JSON.stringify(info,null,1));
await p.screenshot({path:S+'X_services_buttons.png'});
const p2 = await ctx.newPage();
await p2.goto('http://localhost:5174/emergency',{waitUntil:'networkidle'});
await p2.waitForTimeout(1500);
await p2.screenshot({path:S+'X_emergency_top.png'});
console.log('\nEmergency inline-flex btns:');
console.log(await p2.evaluate(()=>[...document.querySelectorAll('a,button')].filter(e=>typeof e.className==='string'&&e.className.includes('inline-flex')&&e.className.includes('rounded-btn')).slice(0,5).map(e=>{const cs=getComputedStyle(e);return{t:e.textContent.trim().slice(0,24),color:cs.color,bg:cs.backgroundColor};})));
await b.close();

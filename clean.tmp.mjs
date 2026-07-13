import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1440,height:900}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
await p.goto('http://localhost:5174/services',{waitUntil:'networkidle'});
await p.waitForTimeout(2000);
console.log('root kids:',await p.evaluate(()=>document.getElementById('root')?.children.length),'errors:',errs);
await p.evaluate(()=>window.scrollBy(0,3000)); await p.waitForTimeout(1200);
console.log('Request btn:',await p.evaluate(()=>{
  const e=[...document.querySelectorAll('a,button')].find(x=>(x.textContent||'').trim().startsWith('Request'));
  if(!e) return 'none'; const cs=getComputedStyle(e);
  return {color:cs.color,bg:cs.backgroundColor,hasTextWhiteClass:/text-white/.test(e.className)};
}));
await b.close();

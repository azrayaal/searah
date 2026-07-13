import { chromium } from 'playwright';
const BAD=['Instagram','Linkedin','Twitter','Youtube'];
const b = await chromium.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/icons.tsx*', async (r)=>{
  const res=await r.fetch(); let x=await res.text();
  const m = x.match(/import\s*\{([^}]+)\}\s*from\s*("[^"]*lucide-react\.js[^"]*")/);
  console.log('IMPORT MATCH:', m ? 'yes' : 'NO');
  x = x.replace(/import\s*\{([^}]+)\}\s*from\s*("[^"]*lucide-react\.js[^"]*")/, (mm,names,src)=>{
    const kept=names.split(',').map(s=>s.trim()).filter(n=>n&&!BAD.includes(n));
    return `import { ${kept.join(', ')} } from ${src};\nconst Instagram = Circle, Linkedin = Circle, Twitter = Circle, Youtube = Circle;`;
  });
  console.log('still has bare Instagram import?', /\{[^}]*\bInstagram\b[^}]*\}\s*from/.test(x));
  await r.fulfill({body:x, headers:{...res.headers(),'content-type':'text/javascript'}});
});
const p = await ctx.newPage();
p.on('pageerror',e=>console.log('PAGEERROR:',e.message.slice(0,200)));
p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE:',m.text().slice(0,200));});
await p.goto('http://localhost:5174/services',{waitUntil:'networkidle'});
await p.waitForTimeout(2500);
console.log('root kids:',await p.evaluate(()=>document.getElementById('root')?.children.length));
await b.close();

import { chromium } from 'playwright';
const OUT='/tmp/claude-1000/-home-azrayaal-codes-sagara-POC-searah/f43ddb6a-2063-4e6e-a3fa-aab45bfb8614/scratchpad';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5174/about', { waitUntil: 'networkidle' });
await p.evaluate(() => document.getElementById('leadership')?.scrollIntoView({block:'center'}));
await p.waitForTimeout(3000);
console.log(await p.evaluate(() => {
  const sec = document.getElementById('leadership');
  const tiles = [...sec.querySelectorAll('a')];
  const imgs = [...sec.querySelectorAll('img')];
  return {
    tiles: tiles.length,
    opacities: tiles.slice(0,4).map(t => getComputedStyle(t.closest('[style]') ?? t).opacity),
    imgs: imgs.length,
    imgLoaded: imgs.slice(0,3).map(i => ({ src: i.src.split('/').pop(), nw: i.naturalWidth, op: getComputedStyle(i).opacity })),
  };
}));
await p.locator('#leadership').screenshot({ path: `${OUT}/leadership2.png` });
await b.close();

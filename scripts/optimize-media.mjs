/**
 * Turns the full-size photography in `media-src/` into what the site actually ships:
 * a WebP at each breakpoint width plus one compressed JPEG fallback per image.
 *
 * Run with `npm run optimize:media` after dropping new artwork into `media-src/`.
 * `public/media/` is generated output — never edit it by hand.
 */
import { mkdir, readdir, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'media-src');
const OUTPUT = path.join(ROOT, 'public', 'media');
/** The widths that actually exist per image — the <picture> srcset is built from this. */
const MANIFEST = path.join(ROOT, 'src', 'data', 'mediaWidths.json');

/** Matches the layout's real render sizes: card, half-width, full-bleed hero. */
const WIDTHS = [480, 960, 1600];

/** True when every variant for this image already exists and post-dates the original. */
async function upToDate(name, targets, sourceMtime) {
  const outputs = [...targets.map((w) => `${name}-${w}.webp`), `${name}.jpg`];

  for (const file of outputs) {
    try {
      const { mtimeMs } = await stat(path.join(OUTPUT, file));
      if (mtimeMs < sourceMtime) return false;
    } catch {
      return false;
    }
  }

  return true;
}

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

/** First run: the originals still live in public/media — lift them out of the deploy. */
async function seedSourceFromPublic() {
  if (await exists(SOURCE)) return;

  await mkdir(SOURCE, { recursive: true });
  const files = await readdir(OUTPUT);

  for (const file of files) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    await rename(path.join(OUTPUT, file), path.join(SOURCE, file));
  }

  console.log(`Moved ${files.length} originals into media-src/`);
}

async function main() {
  await seedSourceFromPublic();
  await mkdir(OUTPUT, { recursive: true });

  const files = (await readdir(SOURCE)).filter((file) => /\.(jpe?g|png)$/i.test(file));
  const manifest = {};
  let before = 0;
  let after = 0;
  let skipped = 0;

  for (const file of files) {
    const name = path.parse(file).name;
    const input = path.join(SOURCE, file);
    const image = sharp(input);
    const { width = 0 } = await image.metadata();
    const source = await stat(input);
    before += source.size;

    // Never upscale: a 900px original gets 480 and 900, not a blurry 1600.
    const targets = WIDTHS.filter((w) => w < width);
    if (targets.length === 0 || width > targets[targets.length - 1]) targets.push(Math.min(width, 1600));
    manifest[name] = targets;

    // Re-encoding 34 photos on every `npm run dev` would be a minute of nothing:
    // skip any image whose variants are already newer than the original.
    if (await upToDate(name, targets, source.mtimeMs)) {
      skipped += 1;
      continue;
    }

    for (const target of targets) {
      const out = path.join(OUTPUT, `${name}-${target}.webp`);
      await image
        .clone()
        .resize({ width: target, height: target, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 72, effort: 5 })
        .toFile(out);
      after += (await stat(out)).size;
    }

    // Fallback for browsers without WebP, and the src every <img> still points at.
    const fallback = path.join(OUTPUT, `${name}.jpg`);
    await image
      .clone()
      .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true, progressive: true })
      .toFile(fallback);
    after += (await stat(fallback)).size;

    console.log(`${file} → ${targets.map((t) => `${t}w`).join(', ')} webp + jpg`);
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  if (skipped === files.length) {
    console.log(`${files.length} images already optimized — nothing to do.`);
    return;
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log(`\n${files.length - skipped} images re-encoded (${skipped} up to date), ${mb(before)} MB source → ${mb(after)} MB shipped`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

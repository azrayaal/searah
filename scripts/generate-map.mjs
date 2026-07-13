/**
 * Generates `src/data/mapGeometry.ts` — schematic SVG coastlines for the
 * Indonesia + Malaysia region used by the upstream asset map.
 *
 * Run with:  npm run generate:map
 *
 * The output is plain literal data: the app never imports d3 / topojson.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { feature } from 'topojson-client';
import { geoPath, geoTransform, geoIdentity, geoArea } from 'd3-geo';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src/data/mapGeometry.ts');

/* ------------------------------------------------------------------ config */

/** Equirectangular bounds — must stay in sync with MAP_BOUNDS in the output. */
const BOUNDS = { minLng: 94, maxLng: 142, minLat: -12, maxLat: 8 };

/** 25 px per degree in both axes → square pixels, no distortion. */
const PX_PER_DEG = 25;
const WIDTH = (BOUNDS.maxLng - BOUNDS.minLng) * PX_PER_DEG; // 1200
const HEIGHT = (BOUNDS.maxLat - BOUNDS.minLat) * PX_PER_DEG; // 500

/** Which world-atlas file to use: 50m has recognisable coastlines. */
const ATLAS = 'world-atlas/countries-50m.json';

/** Coordinate precision in the emitted path data. */
const PRECISION = 1;

/** Drop islands smaller than this many square viewBox px (keeps the file small). */
const MIN_AREA_PX = 1.5;

/**
 * Regions, in priority order. Each polygon is assigned to the first region
 * whose `country` matches and whose bbox contains the polygon's centroid.
 * bbox = [minLng, minLat, maxLng, maxLat].
 */
const REGIONS = [
  { id: 'sumatra', name: 'Sumatra', country: 'Indonesia', bbox: [94, -7, 107.5, 7] },
  { id: 'java', name: 'Java', country: 'Indonesia', bbox: [104.5, -9.5, 115.2, -5] },
  { id: 'kalimantan', name: 'Kalimantan', country: 'Indonesia', bbox: [107.5, -4.5, 119, 4.5] },
  { id: 'sulawesi', name: 'Sulawesi', country: 'Indonesia', bbox: [117.5, -7, 125.5, 3] },
  { id: 'papua', name: 'Papua', country: 'Indonesia', bbox: [130, -9.5, 142, 0.5] },
  { id: 'maluku', name: 'Maluku', country: 'Indonesia', bbox: [124, -9, 135, 3] },
  {
    id: 'bali-nusa-tenggara',
    name: 'Bali & Nusa Tenggara',
    country: 'Indonesia',
    bbox: [114, -11.5, 125.5, -7.5],
  },
  {
    id: 'peninsular-malaysia',
    name: 'Peninsular Malaysia',
    country: 'Malaysia',
    bbox: [98, 0.5, 106, 7.5],
  },
  {
    id: 'malaysian-borneo',
    name: 'Malaysian Borneo',
    country: 'Malaysia',
    bbox: [108, -1, 120, 8],
  },
  { id: 'brunei', name: 'Brunei', country: 'Brunei', bbox: null },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', bbox: null },
  { id: 'timor-leste', name: 'Timor-Leste', country: 'Timor-Leste', bbox: null },
];

/**
 * Neighbouring countries, drawn faintly for context. Vietnam / Cambodia /
 * Myanmar are deliberately absent: they lie entirely north of maxLat 8 and
 * clip away to nothing.
 */
const FAINT = [
  { id: 'philippines', name: 'Philippines', country: 'Philippines' },
  { id: 'thailand', name: 'Thailand', country: 'Thailand' },
  { id: 'papua-new-guinea', name: 'Papua New Guinea', country: 'Papua New Guinea' },
];

/** Catch-all bucket for Indonesian polygons that match no named region. */
const FALLBACK = { id: 'indonesia-other', name: 'Other Indonesian Islands', country: 'Indonesia' };

/* -------------------------------------------------------------- projection */

/**
 * The plain equirectangular formula. `project()` in the generated file is a
 * literal copy of this, which is what guarantees that a marker plotted from
 * lat/lng lands on the coastline drawn from the same transform.
 */
const projectPoint = (lat, lng) => [
  (lng - BOUNDS.minLng) * PX_PER_DEG,
  (BOUNDS.maxLat - lat) * PX_PER_DEG,
];

const equirect = geoTransform({
  point(lng, lat) {
    const [x, y] = projectPoint(lat, lng);
    this.stream.point(x, y);
  },
});

// Clip in *viewBox* space, with a small bleed so the coastline meets the edge.
const clip = geoIdentity().clipExtent([
  [-8, -8],
  [WIDTH + 8, HEIGHT + 8],
]);

/** Compose: lng/lat → equirect px → rectangular clip → path context. */
const projection = { stream: (s) => equirect.stream(clip.stream(s)) };

/* ------------------------------------------------------------ path context */

/**
 * A geoPath context that rounds every coordinate to PRECISION decimals and
 * drops points that collapse onto the previous one after rounding.
 */
function roundingContext() {
  const parts = [];
  let px = null;
  let py = null;
  const r = (v) => {
    const n = Number(v.toFixed(PRECISION));
    return Object.is(n, -0) ? 0 : n;
  };
  return {
    moveTo(x, y) {
      px = r(x);
      py = r(y);
      parts.push(`M${px},${py}`);
    },
    lineTo(x, y) {
      const nx = r(x);
      const ny = r(y);
      if (nx === px && ny === py) return; // collapsed by rounding
      px = nx;
      py = ny;
      parts.push(`L${nx},${ny}`);
    },
    closePath() {
      parts.push('Z');
      px = null;
      py = null;
    },
    result() {
      // Drop degenerate subpaths like "M1,2Z" or "M1,2L3,4Z" (no area).
      return parts
        .join('')
        .split('Z')
        .filter((sub) => (sub.match(/L/g) || []).length >= 2)
        .map((sub) => `${sub}Z`)
        .join('');
    },
  };
}

/* ------------------------------------------------------------------- build */

const topo = JSON.parse(readFileSync(require.resolve(ATLAS), 'utf8'));
const countries = feature(topo, topo.objects.countries).features;

const byName = new Map();
for (const f of countries) byName.set(f.properties.name, f);

/** Ring centroid (simple average of vertices — good enough to pick a region). */
function ringCentroid(ring) {
  let sx = 0;
  let sy = 0;
  for (const [lng, lat] of ring) {
    sx += lng;
    sy += lat;
  }
  return [sx / ring.length, sy / ring.length];
}

const inBBox = ([lng, lat], [w, s, e, n]) => lng >= w && lng <= e && lat >= s && lat <= n;

/** Explode a feature into single Polygon features. */
function polygonsOf(f) {
  const { type, coordinates } = f.geometry;
  if (type === 'Polygon') return [coordinates];
  if (type === 'MultiPolygon') return coordinates;
  return [];
}

/** Steradians → square viewBox px (approximate, but only used for thresholding). */
const STERAD_TO_PX2 = (180 / Math.PI) * (180 / Math.PI) * PX_PER_DEG * PX_PER_DEG;

const buckets = new Map(); // id -> { region, polygons: [] }
const push = (region, polygon) => {
  if (!buckets.has(region.id)) buckets.set(region.id, { region, polygons: [] });
  buckets.get(region.id).polygons.push(polygon);
};

// --- named regions -----------------------------------------------------
const namedCountries = new Set(REGIONS.map((r) => r.country));
for (const country of namedCountries) {
  const f = byName.get(country);
  if (!f) {
    console.warn(`! country not found in atlas: ${country}`);
    continue;
  }
  const candidates = REGIONS.filter((r) => r.country === country);
  for (const polygon of polygonsOf(f)) {
    const areaPx = geoArea({ type: 'Polygon', coordinates: polygon }) * STERAD_TO_PX2;
    if (areaPx < MIN_AREA_PX) continue;
    const c = ringCentroid(polygon[0]);
    if (!inBBox(c, [BOUNDS.minLng - 2, BOUNDS.minLat - 2, BOUNDS.maxLng + 2, BOUNDS.maxLat + 2])) {
      continue; // outside the map entirely
    }
    const region =
      candidates.find((r) => r.bbox === null || inBBox(c, r.bbox)) ??
      (country === 'Indonesia' ? FALLBACK : candidates[0]);
    push(region, polygon);
  }
}

// --- faint neighbours --------------------------------------------------
for (const region of FAINT) {
  const f = byName.get(region.country);
  if (!f) {
    console.warn(`! country not found in atlas: ${region.country}`);
    continue;
  }
  for (const polygon of polygonsOf(f)) {
    const areaPx = geoArea({ type: 'Polygon', coordinates: polygon }) * STERAD_TO_PX2;
    if (areaPx < MIN_AREA_PX * 4) continue; // neighbours: coarser still
    const c = ringCentroid(polygon[0]);
    if (!inBBox(c, [BOUNDS.minLng - 12, BOUNDS.minLat - 12, BOUNDS.maxLng + 12, BOUNDS.maxLat + 12])) {
      continue;
    }
    push({ ...region, faint: true }, polygon);
  }
}

// --- emit path data ----------------------------------------------------
const ORDER = [...REGIONS.map((r) => r.id), FALLBACK.id, ...FAINT.map((r) => r.id)];

const landPaths = [];
for (const id of ORDER) {
  const bucket = buckets.get(id);
  if (!bucket) continue;
  const ctx = roundingContext();
  const path = geoPath(projection, ctx);
  path({ type: 'MultiPolygon', coordinates: bucket.polygons });
  const d = ctx.result();
  if (!d) continue;
  landPaths.push({
    id,
    name: bucket.region.name,
    d,
    ...(bucket.region.faint ? { faint: true } : {}),
  });
}

/* -------------------------------------------------------------- graticule */

const graticule = [];
for (let lng = BOUNDS.minLng; lng <= BOUNDS.maxLng; lng += 4) {
  const [x] = projectPoint(0, lng);
  graticule.push({ x1: x, y1: 0, x2: x, y2: HEIGHT });
}
for (let lat = BOUNDS.minLat; lat <= BOUNDS.maxLat; lat += 4) {
  const [, y] = projectPoint(lat, 0);
  graticule.push({ x1: 0, y1: y, x2: WIDTH, y2: y });
}

/* ------------------------------------------------------------------ write */

const fmt = (n) => Number(n.toFixed(PRECISION));

const file = `// AUTO-GENERATED by scripts/generate-map.mjs — do not edit by hand.
// Source: world-atlas countries-50m (Natural Earth, public domain).
// Regenerate with: npm run generate:map

export const MAP_VIEWBOX = { width: ${WIDTH}, height: ${HEIGHT} };

/** Equirectangular bounds used to project lat/lng into the viewBox. */
export const MAP_BOUNDS = {
  minLng: ${BOUNDS.minLng},
  maxLng: ${BOUNDS.maxLng},
  minLat: ${BOUNDS.minLat},
  maxLat: ${BOUNDS.maxLat},
};

export interface LandPath {
  id: string;
  name: string;
  d: string;
  /** Neighbouring territory drawn for context — render de-emphasised. */
  faint?: boolean;
}

/**
 * Projects geographic coordinates to viewBox units.
 *
 * Plain equirectangular — identical to the transform used to generate
 * \`landPaths\`, so a marker at (lat, lng) lands on the matching coastline.
 */
export function project(lat: number, lng: number): { x: number; y: number } {
  const spanLng = MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng;
  const spanLat = MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat;
  return {
    x: ((lng - MAP_BOUNDS.minLng) / spanLng) * MAP_VIEWBOX.width,
    y: ((MAP_BOUNDS.maxLat - lat) / spanLat) * MAP_VIEWBOX.height,
  };
}

/** Optional decorative graticule lines, in viewBox units. */
export const graticule: { x1: number; y1: number; x2: number; y2: number }[] = [
${graticule
  .map((g) => `  { x1: ${fmt(g.x1)}, y1: ${fmt(g.y1)}, x2: ${fmt(g.x2)}, y2: ${fmt(g.y2)} },`)
  .join('\n')}
];

export const landPaths: LandPath[] = [
${landPaths
  .map(
    (p) =>
      `  {\n    id: ${JSON.stringify(p.id)},\n    name: ${JSON.stringify(p.name)},\n${
        p.faint ? '    faint: true,\n' : ''
      }    d: ${JSON.stringify(p.d)},\n  },`,
  )
  .join('\n')}
];
`;

writeFileSync(OUT, file);

const kb = (Buffer.byteLength(file) / 1024).toFixed(1);
console.log(`viewBox     ${WIDTH} x ${HEIGHT}`);
console.log(`land paths  ${landPaths.length}`);
console.log(`graticule   ${graticule.length}`);
console.log(`file size   ${kb} KB  ->  ${path.relative(ROOT, OUT)}`);
console.log('');
for (const p of landPaths) {
  const pts = (p.d.match(/[ML]/g) || []).length;
  console.log(`  ${p.faint ? '·' : '■'} ${p.name.padEnd(28)} ${String(pts).padStart(5)} pts`);
}

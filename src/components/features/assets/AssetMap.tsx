import { useState } from 'react';
import { motion } from 'framer-motion';
import { MAP_VIEWBOX, graticule, landPaths, project } from '@/data/mapGeometry';
import { cn } from '@/lib/cn';
import type { Asset } from '@/types';

interface AssetMapProps {
  assets: Asset[];
  activeId?: string | null;
  onSelect: (asset: Asset) => void;
  /** Dims every marker outside this country when set. */
  highlightCountry?: string;
  className?: string;
}

const statusColour: Record<Asset['status'], string> = {
  Producing: '#F2A03D',
  Development: '#00A3E0',
  Exploration: '#8FB4C9',
};

/**
 * The plate is tipped a few degrees and squashed vertically so the extruded
 * landmass reads as a solid slab rather than a flat cut-out. Land and markers
 * run through the same transform — `tilt()` mirrors the SVG matrix below — so a
 * marker at (lat, lng) still lands on its coastline.
 */
const TILT = { angle: -5, squash: 0.94 };
/** Pulls the plate in from the frame — the generated geometry runs edge to edge. */
const FIT = 0.84;
const PIVOT = { x: MAP_VIEWBOX.width / 2, y: MAP_VIEWBOX.height / 2 };
const PLATE_TRANSFORM =
  `scale(1 ${TILT.squash}) rotate(${TILT.angle} ${PIVOT.x} ${PIVOT.y}) ` +
  `translate(${PIVOT.x} ${PIVOT.y}) scale(${FIT}) translate(${-PIVOT.x} ${-PIVOT.y})`;

/** Thickness of the slab, in viewBox units. */
const DEPTH = 9;
/** Stacked copies that fill the side wall. More reads smoother; 6 is past the point of return. */
const EXTRUSION_LAYERS = 6;

function tilt(point: { x: number; y: number }): { x: number; y: number } {
  const rad = (TILT.angle * Math.PI) / 180;
  const dx = (point.x - PIVOT.x) * FIT;
  const dy = (point.y - PIVOT.y) * FIT;
  return {
    x: PIVOT.x + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: (PIVOT.y + dx * Math.sin(rad) + dy * Math.cos(rad)) * TILT.squash,
  };
}

/** Schematic bathymetric map. Geometry is generated from Natural Earth coastlines. */
export function AssetMap({ assets, activeId, onSelect, highlightCountry, className }: AssetMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={cn('relative overflow-hidden rounded-card bg-navy-deep', className)}>
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="h-full w-full"
        role="img"
        aria-label="Map of Searah assets across Indonesia and Malaysia"
      >
        <defs>
          <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B2350" />
            <stop offset="55%" stopColor="#0A1D48" />
            <stop offset="100%" stopColor="#071634" />
          </linearGradient>

          {/* Top face: lit from the upper left, so the slab has a light direction. */}
          <linearGradient id="landTop" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8EDF2" />
          </linearGradient>

          {/* Side wall: darkens with depth so the extrusion turns away from the light. */}
          <linearGradient id="landSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6CED6" />
            <stop offset="100%" stopColor="#8B97A3" />
          </linearGradient>

          <radialGradient id="pulse">
            <stop offset="0%" stopColor="#F2A03D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F2A03D" stopOpacity="0" />
          </radialGradient>

          {/* The halo behind every marker — a soft bloom on the dark plate. */}
          <filter id="markerGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Contact shadow the slab casts onto the water. */}
          <filter id="landShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#020B1F" floodOpacity="0.55" />
          </filter>

          {/* Corner falloff, so the eye settles on the archipelago rather than the edges. */}
          <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </radialGradient>
        </defs>

        <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#sea)" />

        {graticule.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#ffffff"
            strokeOpacity={0.045}
            strokeWidth={1}
          />
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          filter="url(#landShadow)"
        >
          {/* Side wall, built from copies stepping down to the top face. Drawn first so
              the lit face sits on top of its own thickness. */}
          {Array.from({ length: EXTRUSION_LAYERS }, (_, layer) => {
            const offset = DEPTH * (1 - layer / EXTRUSION_LAYERS);
            return (
              <g key={layer} transform={`translate(0 ${offset}) ${PLATE_TRANSFORM}`}>
                {landPaths.map((land) => (
                  <path
                    key={land.id}
                    d={land.d}
                    fill={land.faint ? 'rgba(255,255,255,0.05)' : 'url(#landSide)'}
                  />
                ))}
              </g>
            );
          })}

          <g transform={PLATE_TRANSFORM}>
            {landPaths.map((land) => (
              <path
                key={land.id}
                d={land.d}
                fill={land.faint ? 'rgba(255,255,255,0.06)' : 'url(#landTop)'}
                stroke={land.faint ? 'rgba(255,255,255,0.10)' : 'rgba(120,140,160,0.45)'}
                strokeWidth={land.faint ? 0.8 : 0.6}
              />
            ))}
          </g>
        </motion.g>

        <rect
          width={MAP_VIEWBOX.width}
          height={MAP_VIEWBOX.height}
          fill="url(#vignette)"
          pointerEvents="none"
        />

        {assets.map((asset, index) => {
          const { x, y } = tilt(project(asset.coordinates.lat, asset.coordinates.lng));
          const active = activeId === asset.id || hovered === asset.id;
          const dimmed = Boolean(highlightCountry) && asset.country !== highlightCountry;
          const colour = statusColour[asset.status];

          return (
            <motion.g
              key={asset.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: dimmed ? 0.25 : 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.04, duration: 0.5, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${x}px ${y}px`, cursor: 'pointer' }}
              onMouseEnter={() => setHovered(asset.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(asset)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(asset);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${asset.name}, ${asset.region}. ${asset.status}. ${asset.production}.`}
              className="focus:outline-none [&:focus-visible>circle:first-of-type]:stroke-white"
            >
              <circle cx={x} cy={y} r={active ? 26 : 18} fill="url(#pulse)" />

              {asset.status === 'Producing' ? (
                <circle cx={x} cy={y} r={9} fill="none" stroke={colour} strokeOpacity={0.5}>
                  <animate
                    attributeName="r"
                    values="7;16;7"
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.25}s`}
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;0;0.5"
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.25}s`}
                  />
                </circle>
              ) : null}

              {/* Bloom, then a dark collar, then the dot — the layered pin in the reference. */}
              <g filter="url(#markerGlow)">
                <circle cx={x} cy={y} r={active ? 11 : 9} fill={colour} fillOpacity={0.22} />
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 9 : 7.5}
                  fill="#0A1D48"
                  fillOpacity={0.85}
                  className="transition-all duration-300"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 5.5 : 4}
                  fill={colour}
                  className="transition-all duration-300"
                />
              </g>

              {active ? (
                <g className="pointer-events-none">
                  <rect
                    x={x + 12}
                    y={y - 26}
                    width={Math.max(asset.name.length * 8.2 + 24, 120)}
                    height={44}
                    rx={8}
                    fill="#0A1D48"
                    stroke="rgba(255,255,255,0.25)"
                  />
                  <text x={x + 24} y={y - 8} fill="#ffffff" fontSize={14} fontWeight={700}>
                    {asset.name}
                  </text>
                  <text x={x + 24} y={y + 8} fill="rgba(255,255,255,0.55)" fontSize={11}>
                    {asset.production}
                  </text>
                </g>
              ) : null}
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-x-5 gap-y-2 rounded-field border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
        {(Object.keys(statusColour) as Asset['status'][]).map((status) => (
          <span key={status} className="flex items-center gap-2 text-[0.7rem] font-semibold text-white/70">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: statusColour[status],
                boxShadow: `0 0 8px ${statusColour[status]}`,
              }}
              aria-hidden
            />
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}

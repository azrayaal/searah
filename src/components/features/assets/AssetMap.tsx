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
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1D48" />
            <stop offset="100%" stopColor="#11304A" />
          </linearGradient>
          <radialGradient id="pulse">
            <stop offset="0%" stopColor="#F2A03D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F2A03D" stopOpacity="0" />
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
            strokeOpacity={0.05}
            strokeWidth={1}
          />
        ))}

        {landPaths.map((land) => (
          <motion.path
            key={land.id}
            d={land.d}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            fill={land.faint ? 'rgba(255,255,255,0.04)' : 'rgba(214,240,255,0.10)'}
            stroke={land.faint ? 'rgba(255,255,255,0.07)' : 'rgba(214,240,255,0.28)'}
            strokeWidth={0.8}
          />
        ))}

        {assets.map((asset, index) => {
          const { x, y } = project(asset.coordinates.lat, asset.coordinates.lng);
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

              <circle
                cx={x}
                cy={y}
                r={active ? 7.5 : 5.5}
                fill={colour}
                stroke="#0A1D48"
                strokeWidth={1.5}
                className="transition-all duration-300"
              />

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
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-x-5 gap-y-2 rounded-field bg-navy-deep/70 px-4 py-3 backdrop-blur-sm">
        {(Object.keys(statusColour) as Asset['status'][]).map((status) => (
          <span key={status} className="flex items-center gap-2 text-[0.7rem] font-semibold text-white/70">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: statusColour[status] }}
              aria-hidden
            />
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}

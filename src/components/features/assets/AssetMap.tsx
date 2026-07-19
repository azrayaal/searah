import { useState } from 'react';
import { motion } from 'framer-motion';
import { MAP_IMAGE, PIN_TIP, projectToImage, statusColour, statusPin } from '@/data/mapProjection';
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

/** The rendered plate with one marker per asset, pinned to its coordinates. */
export function AssetMap({ assets, activeId, onSelect, highlightCountry, className }: AssetMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={cn('relative overflow-hidden rounded-card bg-navy-deep', className)}>
      {/* Sized to the artwork so marker percentages track the coastline exactly. */}
      {/* Latitude & Longitude Grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          {/* Vertical lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to right,
                  rgba(255,255,255,.45) 0px,
                  rgba(255,255,255,.45) 1px,
                  transparent 1px,
                  transparent 80px
                )
              `,
            }}
          />

          {/* Horizontal lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,.45) 0px,
                  rgba(255,255,255,.45) 1px,
                  transparent 1px,
                  transparent 80px
                )
              `,
            }}
          />

          {/* Equator */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-300/30" />

          {/* Prime Meridian */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-300/20" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 50% 50%,
                rgba(0,180,255,.10) 0%,
                transparent 55%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle,
                transparent 55%,
                rgba(0,0,0,.35) 100%
              )
            `,
          }}
        />
    <div className="absolute inset-0">
      <div className="relative h-full w-full">
          <motion.img
            src={MAP_IMAGE.src}
            alt="Map of Searah assets across Indonesia and Malaysia"
            draggable={false}
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="h-full w-full object-contain select-none"
          />

          {assets.map((asset, index) => {
            const { x, y } = projectToImage(asset.coordinates.lat, asset.coordinates.lng);
            const active = activeId === asset.id || hovered === asset.id;
            const dimmed = Boolean(highlightCountry) && asset.country !== highlightCountry;

            return (
              <motion.button
                key={asset.id}
                type="button"
                initial={{ opacity: 0, scale: 0, y: -8 }}
                whileInView={{ opacity: dimmed ? 0.3 : 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.25 + index * 0.04,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 220,
                  damping: 18,
                }}
                onMouseEnter={() => setHovered(asset.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(asset.id)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect(asset)}
                aria-label={`${asset.name}, ${asset.region}. ${asset.status}. ${asset.production}.`}
                className="absolute focus:outline-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-${PIN_TIP.x}%, -${PIN_TIP.y}%)`,
                  zIndex: active ? 20 : 10,
                }}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                  style={{
                    background: `radial-gradient(circle, ${statusColour[asset.status]}66 0%, transparent 70%)`,
                  }}
                />
                <img
                  src={statusPin[asset.status]}
                  alt=""
                  draggable={false}
                  className={cn(
                    'relative block origin-bottom select-none transition-all duration-300 ease-premium drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]',
                    active ? 'h-12 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]' : 'h-9',
                  )}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

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

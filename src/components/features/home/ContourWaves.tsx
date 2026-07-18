import { cn } from '@/lib/cn';

/**
 * Layered contour waves behind the hero — the brand's flow motif read as bathymetry
 * rather than as a fan of hairlines. One inline SVG, no request, scales to any width.
 */
export function ContourWaves({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-full w-full', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="contour-wave-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D6F0FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D6F0FF" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="contour-wave-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00649D" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#00649D" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Two filled swells, then hairline contours tracing the same curve upward */}
      <path
        d="M0 402 C 240 330, 470 486, 726 430 C 968 378, 1180 268, 1440 322 L1440 620 L0 620 Z"
        fill="url(#contour-wave-a)"
      />
      <path
        d="M0 476 C 260 414, 500 552, 762 496 C 1010 444, 1220 356, 1440 404 L1440 620 L0 620 Z"
        fill="url(#contour-wave-b)"
      />

      {Array.from({ length: 7 }, (_, index) => {
        const lift = index * 26;
        return (
          <path
            key={index}
            d={`M0 ${396 - lift} C 240 ${324 - lift}, 470 ${480 - lift}, 726 ${424 - lift} C 968 ${372 - lift}, 1180 ${262 - lift}, 1440 ${316 - lift}`}
            fill="none"
            stroke="#00649D"
            strokeOpacity={0.16 - index * 0.018}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

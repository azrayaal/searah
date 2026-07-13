import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface FlowLinesProps {
  className?: string;
  /** Number of strands in the fan. */
  count?: number;
  colour?: string;
  mirrored?: boolean;
}

/**
 * A fan of drifting hairlines — the brand's flow motif, echoing the sweep of the
 * Searah mark. Drawn as one SVG so it costs nothing and scales to any hero.
 */
export function FlowLines({
  className,
  count = 22,
  colour = 'rgba(255,255,255,0.22)',
  mirrored,
}: FlowLinesProps) {
  const reduceMotion = useReducedMotion();

  const strands = Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    // Each strand leaves the top-left at a slightly different angle and converges bottom-right.
    const startY = -40 + t * 260;
    const controlY = 120 + t * 520;
    const endY = 620 + t * 120;
    return {
      d: `M -60 ${startY} C 420 ${controlY * 0.35}, 780 ${controlY * 0.75}, 1500 ${endY}`,
      delay: index * 0.05,
      opacity: 0.25 + (1 - Math.abs(t - 0.5) * 2) * 0.75,
    };
  });

  return (
    <svg
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', mirrored && '-scale-x-100', className)}
      aria-hidden
      fill="none"
    >
      {strands.map((strand, index) => (
        <motion.path
          key={index}
          d={strand.d}
          stroke={colour}
          strokeWidth={0.75}
          initial={reduceMotion ? { pathLength: 1, opacity: strand.opacity } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: strand.opacity }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: strand.delay }}
        />
      ))}
    </svg>
  );
}

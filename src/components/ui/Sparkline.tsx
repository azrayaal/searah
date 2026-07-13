import { motion } from 'framer-motion';
import { sparklinePath } from '@/lib/format';
import { EASE } from '@/lib/motion';

interface SparklineProps {
  series: number[];
  /** Drives stroke and fill colour; the caller decides up/down semantics. */
  positive: boolean;
  width?: number;
  height?: number;
  id: string;
}

export function Sparkline({ series, positive, width = 120, height = 36, id }: SparklineProps) {
  const path = sparklinePath(series, width, height);
  const stroke = positive ? '#00649D' : '#A00C30';
  const areaPath = `${path} L${width - 2},${height} L2,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill={`url(#spark-${id})`} />
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </svg>
  );
}

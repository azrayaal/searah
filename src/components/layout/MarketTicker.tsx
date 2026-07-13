import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatSigned } from '@/lib/format';
import type { Commodity } from '@/types';

interface MarketTickerProps {
  commodities: Commodity[];
}

/** The always-on price rail in the header, mirroring a trading desk strip. */
export function MarketTicker({ commodities }: MarketTickerProps) {
  return (
    <ul className="flex items-center gap-6">
      {commodities.map((commodity) => {
        const up = commodity.change >= 0;
        const Trend = up ? TrendingUp : TrendingDown;

        return (
          <li key={commodity.id} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/45">
              {commodity.name}
            </span>
            <span className="text-caption font-semibold tabular-nums text-white">
              {commodity.price.toFixed(2)}
            </span>
            <span
              className={cn(
                'flex items-center gap-0.5 text-[0.7rem] font-semibold tabular-nums',
                up ? 'text-emerald-400' : 'text-red-400',
              )}
            >
              <Trend className="h-3 w-3" aria-hidden />
              {formatSigned(commodity.changePercent)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

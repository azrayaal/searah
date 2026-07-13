import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Sparkline } from '@/components/ui/Sparkline';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { formatDate, formatSigned } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Commodity, MarketSummary } from '@/types';

interface MarketSectionProps {
  content: MarketSummary;
}

function CommodityRow({ commodity }: { commodity: Commodity }) {
  const up = commodity.change >= 0;
  const Trend = up ? ArrowUpRight : ArrowDownRight;

  return (
    <RevealItem className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[1.4fr_1fr_auto] sm:gap-8">
      <div className="min-w-0">
        <p className="truncate text-body-sm font-semibold text-white">{commodity.name}</p>
        <p className="mt-1 text-caption text-white/40">
          {commodity.symbol} · {commodity.currency}
          {commodity.unit}
        </p>
      </div>

      <div className="hidden justify-self-center sm:block">
        <Sparkline series={commodity.series} positive={up} id={commodity.id} />
      </div>

      <div className="text-right">
        <p className="text-[1.375rem] font-bold tabular-nums text-white">
          {commodity.price.toFixed(2)}
        </p>
        <p
          className={cn(
            'mt-1 inline-flex items-center justify-end gap-0.5 text-caption font-semibold tabular-nums',
            up ? 'text-emerald-400' : 'text-red-400',
          )}
        >
          <Trend className="h-3.5 w-3.5" aria-hidden />
          {formatSigned(commodity.change)} ({formatSigned(commodity.changePercent)}%)
        </p>
      </div>
    </RevealItem>
  );
}

export function MarketSection({ content }: MarketSectionProps) {
  return (
    <Section id="market" tone="navy" spacing="default">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal preset="fadeRight">
          <p className="eyebrow mb-4 text-ember">
            <span className="h-px w-8 bg-ember/60" aria-hidden />
            Market
          </p>

          <h2 className="text-[1.75rem] font-bold leading-[1.2] text-white md:text-h2">
            {content.headline}
          </h2>

          <p className="mt-5 max-w-md text-body-sm text-white/60">{content.narrative}</p>

          <div className="mt-8 flex items-center gap-2 text-caption text-white/40">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live · updated {formatDate(content.updatedAt)}, 08:30 WIB
          </div>
        </Reveal>

        <RevealGroup className="lg:pt-2" gap={0.07}>
          {content.commodities.map((commodity) => (
            <CommodityRow key={commodity.id} commodity={commodity} />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

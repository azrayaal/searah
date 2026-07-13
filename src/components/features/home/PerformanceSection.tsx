import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Counter } from '@/components/ui/Counter';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/lib/icons';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import type { HomepageContent, Kpi } from '@/types';

interface PerformanceSectionProps {
  content: HomepageContent['performance'];
}

/**
 * Figures sit in a hairline grid rather than floating cards — it reads as an
 * operations report, which is the point.
 */
function KpiTile({ kpi }: { kpi: Kpi }) {
  const down = kpi.trend === 'down';
  const Trend = down ? ArrowDownRight : ArrowUpRight;

  return (
    <RevealItem className="group relative flex flex-col justify-between overflow-hidden p-6 transition-colors duration-500 hover:bg-sky-faint lg:p-8">
      {/* Ocean rule that draws in from the left on hover */}
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-ocean transition-transform duration-500 ease-premium group-hover:scale-x-100"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted">
          {kpi.label}
        </p>
        <Icon
          name={kpi.icon}
          className="h-[18px] w-[18px] shrink-0 text-ocean/70 transition-colors group-hover:text-ocean"
        />
      </div>

      <div className="mt-8">
        <p className="flex items-baseline gap-1.5">
          <Counter
            value={kpi.value}
            precision={kpi.precision}
            className="text-[2rem] font-bold leading-none text-navy-deep lg:text-[2.5rem]"
          />
          {kpi.unit ? (
            <span className="text-caption font-semibold text-muted">{kpi.unit}</span>
          ) : null}
        </p>

        {typeof kpi.progress === 'number' ? (
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-navy-deep/8">
            <motion.div
              className="h-full rounded-full bg-ocean"
              initial={{ width: 0 }}
              whileInView={{ width: `${kpi.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          {kpi.delta ? (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-caption font-semibold',
                down ? 'text-crimson' : 'text-emerald-600',
              )}
            >
              <Trend className="h-3.5 w-3.5" aria-hidden />
              {kpi.delta}
            </span>
          ) : null}
          <span className="text-caption text-muted">{kpi.caption}</span>
        </div>
      </div>
    </RevealItem>
  );
}

export function PerformanceSection({ content }: PerformanceSectionProps) {
  return (
    <Section id="performance" tone="white">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <div className="mt-12">
        <RevealGroup
          className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {content.kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white">
              <KpiTile kpi={kpi} />
            </div>
          ))}
        </RevealGroup>

        <p className="mt-5 text-caption text-muted">
          Source: Integrated Operations Centre, Balikpapan. Figures as of{' '}
          {formatDate(content.asOf)}, 06:00 WIB.
        </p>
      </div>
    </Section>
  );
}

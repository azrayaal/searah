import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { AssetMap } from '@/components/features/assets/AssetMap';
import { entityIndex } from '@/data/entities';
import { cn } from '@/lib/cn';
import type { Asset, SectionIntro } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface AssetsSectionProps {
  intro: SectionIntro;
  assets: Asset[];
}

const statusTone = {
  Producing: 'ember',
  Development: 'ocean',
  Exploration: 'neutral',
} as const;

export function AssetsSection({ intro, assets }: AssetsSectionProps) {
  const [selected, setSelected] = useState<Asset | null>(null);
  const t = useTranslation();
  const [country, setCountry] = useState<string>('');

  const countries = [
    { label: 'All assets', value: '', count: assets.length },
    {
      label: 'Indonesia',
      value: 'Indonesia',
      count: assets.filter((asset) => asset.country === 'Indonesia').length,
    },
    {
      label: 'Malaysia',
      value: 'Malaysia',
      count: assets.filter((asset) => asset.country === 'Malaysia').length,
    },
  ];

  const listed = country ? assets.filter((asset) => asset.country === country) : assets;

  return (
    <Section id="assets" tone="faint" className="overflow-hidden border-b-2 border-hairline border-blue-100">
      <SectionHeader
        eyebrow={intro.eyebrow ? t(intro.eyebrow) : undefined}
        title={t(intro.title)}
        description={intro.description ? t(intro.description) : undefined}
        cta={intro.cta}
      />

      <Reveal preset="scaleIn" className="mt-12 h-[430px] lg:h-[600px]">
        {/* Map and panel share one card — selecting a marker swaps the register for its detail. */}
        <div
          className={cn(
            'grid overflow-hidden rounded-card shadow-lifted transition-shadow duration-300 lg:h-[600px] lg:grid-cols-[1.6fr_1fr]',
            selected ? 'ring-2 ring-ocean ring-offset-0' : '',
          )}
        >
          <AssetMap
            assets={assets}
            activeId={selected?.id}
            onSelect={setSelected}
            highlightCountry={country || undefined}
            className="aspect-[16/10] w-full rounded-none sm:aspect-[2/1] lg:aspect-auto lg:h-full"
          />

          {/* Fixed height so the register scrolls inside the card rather than stretching it. */}
          <div className="relative flex h-[430px] min-h-0 flex-col lg:h-full">
            <AnimatePresence mode="wait" initial={false}>
              {selected ? (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="no-scrollbar flex-1 overflow-y-auto p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[1.05rem] font-bold leading-tight text-navy-deep">
                        {selected.name}
                      </h3>
                      <p className="mt-1 text-caption text-muted">{selected.region}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label="Close asset detail"
                      className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-sky-faint hover:text-navy-deep"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Badge tone={statusTone[selected.status]} dot className="px-2 py-0.5 text-[0.62rem]">
                      {t(selected.status)}
                    </Badge>
                    <Badge tone="neutral" className="px-2 py-0.5 text-[0.62rem]">
                      {selected.type}
                    </Badge>
                    <Badge tone="neutral" className="px-2 py-0.5 text-[0.62rem]">
                      {selected.country}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-4">
                    <Image
                      media={selected.image}
                      ratio="4/3"
                      className="rounded-field"
                      sizes="(min-width: 1024px) 200px, 40vw"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="text-caption text-muted">{t('Operated by')}</span>
                      <span className="mt-0.5 text-body-sm font-bold leading-tight text-navy-deep">
                        {entityIndex[selected.entityId]?.name ?? selected.operator}
                      </span>
                      <Link
                        to={`/entity/${selected.entityId}`}
                        className="group mt-3 inline-flex items-center gap-1.5 self-start rounded-field bg-navy-deep px-3 py-2 text-[0.72rem] font-semibold text-white transition-colors hover:bg-ocean"
                      >
                        Explore more
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-field border border-hairline bg-hairline">
                    {[
                      { label: 'Production', value: selected.production },
                      { label: 'Reserves', value: selected.reserves },
                      { label: 'Working interest', value: `${selected.workingInterest}%` },
                      { label: 'Water depth', value: selected.waterDepth },
                      { label: 'Discovered', value: selected.discoveredIn },
                      { label: 'On stream', value: selected.onstream },
                    ].map((row) => (
                      <div key={row.label} className="bg-white px-3.5 py-3">
                        <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-muted">
                          {row.label}
                        </dt>
                        <dd className="mt-1 text-body-sm font-bold text-navy-deep">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 text-caption leading-relaxed text-charcoal">
                    {t(selected.description)}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-1 flex-col overflow-hidden p-5"
                >
                  <div className="flex gap-2" role="group" aria-label="Filter assets by country">
                    {countries.map((option) => (
                      <button
                        key={t(option.label)}
                        type="button"
                        aria-pressed={country === option.value}
                        onClick={() => setCountry(option.value)}
                        className={cn(
                          'flex-1 rounded-field border px-2 py-2.5 text-center transition-colors duration-300',
                          country === option.value
                            ? 'border-navy-deep bg-navy-deep text-white'
                            : 'border-hairline bg-white text-navy-deep hover:border-ocean hover:text-ocean',
                        )}
                      >
                        <span className="block text-[1.1rem] font-bold leading-none">{option.count}</span>
                        <span className="mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.06em] opacity-70">
                          {t(option.label)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <ul className="no-scrollbar mt-4 flex-1 divide-y divide-hairline overflow-y-auto">
                    {listed.map((asset) => (
                      <li key={asset.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(asset)}
                          className="flex w-full items-center justify-between gap-4 px-1 py-3.5 text-left transition-colors hover:bg-sky-faint"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-body-sm font-semibold text-navy-deep">
                              {asset.name}
                            </span>
                            <span className="mt-0.5 block truncate text-caption text-muted">
                              {asset.region}
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block text-caption font-semibold tabular-nums text-navy-deep">
                              {asset.production}
                            </span>
                            <span
                              className={cn(
                                'mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.06em]',
                                asset.status === 'Producing'
                                  ? 'text-ember-deep'
                                  : asset.status === 'Development'
                                    ? 'text-ocean'
                                    : 'text-muted',
                              )}
                            >
                              {t(asset.status)}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 flex items-baseline gap-2 border-t border-hairline pt-3 text-caption text-muted">
                    <Counter value={listed.length} className="text-body-sm font-bold text-navy-deep" />
                    assets shown · select any to open its detail
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

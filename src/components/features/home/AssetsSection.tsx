import { useState } from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { AssetMap } from '@/components/features/assets/AssetMap';
import { AssetDetail } from '@/components/features/assets/AssetDetail';
import { cn } from '@/lib/cn';
import type { Asset, SectionIntro } from '@/types';

interface AssetsSectionProps {
  intro: SectionIntro;
  assets: Asset[];
}

export function AssetsSection({ intro, assets }: AssetsSectionProps) {
  const [selected, setSelected] = useState<Asset | null>(null);
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
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        cta={intro.cta}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
        <Reveal preset="scaleIn" className="order-2 lg:order-1 ">
          <AssetMap
            assets={assets}
            activeId={selected?.id}
            onSelect={setSelected}
            highlightCountry={country || undefined}
            className="aspect-[12/5] w-full shadow-lifted"
          />
        </Reveal>

        <Reveal preset="fadeLeft" className="order-1 flex flex-col lg:order-2">
          <div className="flex gap-2" role="group" aria-label="Filter assets by country">
            {countries.map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={country === option.value}
                onClick={() => setCountry(option.value)}
                className={cn(
                  'flex-1 rounded-field border px-3 py-3 text-center transition-colors duration-300',
                  country === option.value
                    ? 'border-navy-deep bg-navy-deep text-white'
                    : 'border-hairline bg-white text-navy-deep hover:border-ocean hover:text-ocean',
                )}
              >
                <span className="block text-[1.25rem] font-bold leading-none">{option.count}</span>
                <span className="mt-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.06em] opacity-70">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <ul className="no-scrollbar mt-6 max-h-[420px] flex-1 divide-y divide-hairline overflow-y-auto rounded-card border border-hairline bg-white">
            {listed.map((asset) => (
              <li key={asset.id}>
                <button
                  type="button"
                  onClick={() => setSelected(asset)}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors',
                    selected?.id === asset.id ? 'bg-sky-faint' : 'hover:bg-sky-faint',
                  )}
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
                        'mt-0.5 block text-[0.68rem] font-semibold uppercase tracking-[0.06em]',
                        asset.status === 'Producing'
                          ? 'text-ember-deep'
                          : asset.status === 'Development'
                            ? 'text-ocean'
                            : 'text-muted',
                      )}
                    >
                      {asset.status}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 flex items-baseline gap-2 text-caption text-muted">
            <Counter value={listed.length} className="text-body-sm font-bold text-navy-deep" />
            assets shown · select any to open its detail
          </p>
        </Reveal>
      </div>

      <AssetDetail asset={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills, FilterSelect } from '@/components/ui/Filter';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { AssetMap } from '@/components/features/assets/AssetMap';
import { AssetDetail } from '@/components/features/assets/AssetDetail';
import { useCollection, useSeo } from '@/hooks';
import { assets } from '@/data/assets';
import { entities, getEntityAssets } from '@/data/entities';
import { homepage } from '@/data/homepage';
import { companyFacts } from '@/data/site';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { formatNumber } from '@/lib/format';
import type { Asset, NavLink } from '@/types';

/* ------------------------------------------------------------------ derived */

const intro = homepage.assetsSection;
const assetsNav = navigation.find((item) => item.href === '/assets');
const breadcrumb: NavLink[] = [{ label: assetsNav?.label ?? intro.eyebrow, href: '/assets' }];

const unique = <K extends keyof Asset>(key: K) =>
  [...new Set(assets.map((asset) => String(asset[key])))].sort();

const countries = unique('country');
const statuses = unique('status');
const types = unique('type');

/** Query-string keys shared with the mega menu (`/assets?country=Indonesia`). */
const FACET_KEYS = ['country', 'status', 'type'] as const;
const QUERY_KEY = 'q';
/** Deep link straight to one asset's detail — what global search hands out. */
const ASSET_KEY = 'asset';

/** Select-driven facets; `status` gets its own pill rail below. */
const SELECT_FACETS = [
  { key: 'country', label: 'Country', options: countries },
  { key: 'type', label: 'Type', options: types },
] as const;

const statusAccent: Record<Asset['status'], string> = {
  Producing: 'text-ember-deep',
  Development: 'text-ocean',
  Exploration: 'text-muted',
};

/* -------------------------------------------------------------- stats rail */

function StatsRail({ counts }: { counts: Record<string, number> }) {
  const [assetsFact, productionFact] = homepage.hero.highlights;

  const items = [
    { key: 'total', value: formatNumber(companyFacts.assets.total), label: assetsFact.label },
    ...countries.map((country) => ({
      key: country,
      value: formatNumber(counts[country] ?? 0),
      label: country,
    })),
    {
      key: 'production',
      value: `${companyFacts.production.current} ${companyFacts.production.unit}`,
      label: productionFact.label,
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.key} className="bg-navy px-5 py-5 lg:px-6 lg:py-6">
          <dd className="text-[1.5rem] font-bold leading-none tabular-nums text-white lg:text-[1.75rem]">
            {item.value}
          </dd>
          <dt className="mt-2.5 text-caption font-semibold uppercase tracking-[0.08em] text-white/50">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------- result rows */

const COLUMNS: { key: string; label: string; className: string }[] = [
  { key: 'name', label: 'Asset', className: 'lg:col-span-3' },
  { key: 'region', label: 'Region', className: 'lg:col-span-3' },
  { key: 'type', label: 'Type', className: 'lg:col-span-1' },
  { key: 'status', label: 'Status', className: 'lg:col-span-2' },
  { key: 'production', label: 'Production', className: 'lg:col-span-2 lg:text-right' },
  { key: 'workingInterest', label: 'Working interest', className: 'lg:col-span-1 lg:text-right' },
];

function AssetRow({
  asset,
  active,
  onSelect,
}: {
  asset: Asset;
  active: boolean;
  onSelect: (asset: Asset) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(asset)}
        aria-label={`${asset.name}, ${asset.region}, ${asset.type}, ${asset.status}, ${asset.production}, ${asset.workingInterest}% working interest`}
        className={cn(
          'grid w-full min-h-[44px] grid-cols-2 items-center gap-x-4 gap-y-1.5 px-5 py-4 text-left transition-colors duration-300 lg:grid-cols-12 lg:px-6',
          active ? 'bg-sky-faint' : 'hover:bg-sky-faint',
        )}
      >
        <span className="col-span-2 min-w-0 lg:col-span-3">
          <span className="block truncate text-body-sm font-semibold text-navy-deep">
            {asset.name}
          </span>
          <span className="mt-0.5 block truncate text-caption text-muted lg:hidden">
            {asset.region}
          </span>
        </span>

        <span className="hidden min-w-0 truncate text-caption text-muted lg:col-span-3 lg:block">
          {asset.region}
        </span>

        <span className="text-caption text-muted lg:col-span-1">{asset.type}</span>

        <span
          className={cn(
            'text-caption font-semibold uppercase tracking-[0.06em] lg:col-span-2',
            statusAccent[asset.status],
          )}
        >
          {asset.status}
        </span>

        <span className="text-caption font-semibold tabular-nums text-navy-deep lg:col-span-2 lg:text-right">
          {asset.production}
        </span>

        <span className="text-caption tabular-nums text-muted lg:col-span-1 lg:text-right">
          {asset.workingInterest}%
        </span>
      </button>
    </li>
  );
}

/* --------------------------------------------------------------------- page */

export default function AssetsPage() {
  useSeo({ title: intro.title, description: intro.description ?? '' });

  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Asset | null>(null);

  const searchFields = useCallback(
    (asset: Asset) => [
      asset.name,
      asset.region,
      asset.country,
      asset.type,
      asset.status,
      asset.operator,
      asset.description,
      asset.highlights,
    ],
    [],
  );

  const facets = useMemo(
    () => ({
      country: (asset: Asset) => asset.country,
      status: (asset: Asset) => asset.status,
      type: (asset: Asset) => asset.type,
    }),
    [],
  );

  const { query, setQuery, selected: activeFacets, setFacet, reset, results, activeCount } =
    useCollection(assets, { searchFields, facets });

  // The URL is the source of truth: mega-menu links such as `/assets?status=Producing`
  // pre-apply on load, and every filter change is reflected back into the query string.
  useEffect(() => {
    setQuery(searchParams.get(QUERY_KEY) ?? '');
    FACET_KEYS.forEach((key) => setFacet(key, searchParams.get(key) ?? ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // `/assets?asset=jangkrik` opens that asset's detail on arrival.
  const assetParam = searchParams.get(ASSET_KEY);
  useEffect(() => {
    if (!assetParam) return;
    const match = assets.find((asset) => asset.id === assetParam);
    if (match) setSelected(match);
  }, [assetParam]);

  const closeDetail = useCallback(() => {
    setSelected(null);
    // Drop the param, or a back-navigation would pop the same asset open again.
    if (assetParam) {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          next.delete(ASSET_KEY);
          return next;
        },
        { replace: true },
      );
    }
  }, [assetParam, setSearchParams]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          if (value) next.set(key, value);
          else next.delete(key);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearAll = useCallback(() => {
    reset();
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [reset, setSearchParams]);

  const countryCounts = useMemo(
    () =>
      assets.reduce<Record<string, number>>((acc, asset) => {
        acc[asset.country] = (acc[asset.country] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  const entityCounts = useMemo(
    () =>
      entities.map((entity) => ({
        entity,
        total: getEntityAssets(entity.id).length,
        matching: results.filter((asset) => asset.entityId === entity.id).length,
      })),
    [results],
  );

  const filtersActive = activeCount > 0 || query.trim().length > 0;

  return (
    <>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumb={breadcrumb}
      >
        <StatsRail counts={countryCounts} />
      </PageHero>

      {/* Map */}
      <Section tone="white" spacing="tight" containerSize="wide">
        <Reveal preset="scaleIn">
          <AssetMap
            assets={results}
            activeId={selected?.id}
            onSelect={setSelected}
            highlightCountry={activeFacets.country || undefined}
            className="aspect-[4/3] w-full shadow-lifted sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        </Reveal>
      </Section>

      {/* Register */}
      <Section tone="faint" spacing="tight" containerSize="wide">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <SearchBar
            value={query}
            onChange={(value) => updateParam(QUERY_KEY, value)}
            label="Search assets"
            placeholder="Search by asset, region or operator"
            className="lg:max-w-md"
          />

          <div className="grid grid-cols-2 gap-3">
            {SELECT_FACETS.map((facet) => (
              <FilterSelect
                key={facet.key}
                label={facet.label}
                options={[...facet.options]}
                value={activeFacets[facet.key] ?? ''}
                onChange={(value) => updateParam(facet.key, value)}
                className="min-w-[10rem]"
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <FilterPills
            label="Status"
            options={statuses}
            value={activeFacets.status ?? ''}
            onChange={(value) => updateParam('status', value)}
          />

          <div className="flex items-center gap-4">
            <p className="flex items-baseline gap-1.5 text-caption text-muted">
              <Counter value={results.length} className="text-body-sm font-bold text-navy-deep" />
              <span aria-hidden>/</span>
              <span>{formatNumber(assets.length)} assets</span>
            </p>
            {filtersActive ? (
              <Button variant="ghost" size="sm" onClick={clearAll} aria-label="Clear all filters">
                Clear filters
              </Button>
            ) : null}
          </div>
        </div>

        {/* Entity breakdown of the current result set */}
        <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {entityCounts.map(({ entity, total, matching }) => (
            <Link
              key={entity.id}
              to={`/entity/${entity.id}`}
              className="group flex min-h-[44px] items-center justify-between gap-4 bg-white px-5 py-5 transition-colors duration-300 hover:bg-sky-faint lg:px-6"
            >
              <span className="min-w-0">
                <span className="block truncate text-body-sm font-semibold text-navy-deep">
                  {entity.name}
                </span>
                <span className="mt-0.5 block truncate text-caption text-muted">
                  {entity.tagline}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-right">
                  <span className="block text-[1.25rem] font-bold leading-none tabular-nums text-navy-deep">
                    {formatNumber(matching)}
                  </span>
                  <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-muted">
                    / {formatNumber(total)}
                  </span>
                </span>
                <ArrowRight
                  className="h-[18px] w-[18px] text-ocean transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8">
          {results.length === 0 ? (
            <EmptyState
              title="No assets match these filters"
              description="Adjust the search term, country, status or type to widen the register."
              actionLabel="Clear filters"
              onAction={clearAll}
            />
          ) : (
            <div className="overflow-hidden rounded-card border border-hairline bg-white">
              <div
                className="hidden grid-cols-12 gap-x-4 border-b border-hairline px-6 py-3 lg:grid"
                aria-hidden
              >
                {COLUMNS.map((column) => (
                  <span
                    key={column.key}
                    className={cn(
                      'text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted',
                      column.className,
                    )}
                  >
                    {column.label}
                  </span>
                ))}
              </div>

              <ul className="divide-y divide-hairline">
                {results.map((asset) => (
                  <AssetRow
                    key={asset.id}
                    asset={asset}
                    active={selected?.id === asset.id}
                    onSelect={setSelected}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      <AssetDetail asset={selected} onClose={closeDetail} />
    </>
  );
}

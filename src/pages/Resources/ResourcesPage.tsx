import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, Rows3 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ResourceCard } from '@/components/features/resources/ResourceCard';
import { Section } from '@/components/ui/Section';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills, FilterSelect } from '@/components/ui/Filter';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Counter } from '@/components/ui/Counter';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { useCollection, usePagination, useSeo } from '@/hooks';
import { resources, resourceCategories, resourceOwners } from '@/data/resources';
import { cn } from '@/lib/cn';
import type { Resource, ResourceCategory } from '@/types';

const PAGE_SIZE = 12;
const VIEWS = ['grid', 'list'] as const;
type View = (typeof VIEWS)[number];

/** Free-text index: title, description and tags. */
const searchFields = (resource: Resource) => [
  resource.title,
  resource.description,
  resource.tags,
];

const facets = {
  category: (resource: Resource) => resource.category,
  owner: (resource: Resource) => resource.owner,
  type: (resource: Resource) => resource.type,
};

/** File types present in the catalogue, alphabetised for the select. */
const resourceTypes = [...new Set(resources.map((resource) => resource.type))].sort();

function isCategory(value: string): value is ResourceCategory {
  return (resourceCategories as string[]).includes(value);
}

export default function ResourcesPage() {
  useSeo({
    title: 'Resource Centre',
    description:
      'Brand assets, policies, templates, procedures and corporate documents for everyone working across the Searah group.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useViewParam(searchParams, setSearchParams);

  /** The category filter lives in the URL so mega-menu deep links pre-apply on load. */
  const categoryParam = searchParams.get('category') ?? '';
  const category = isCategory(categoryParam) ? categoryParam : '';

  const { query, setQuery, selected, setFacet, reset, results, activeCount } = useCollection(
    resources,
    { searchFields, facets },
  );

  // Mirror the URL category into the collection facet. Layout effect, so a deep link
  // like /resources?category=Policies is applied before the first paint — and it also
  // re-applies on back/forward navigation, not only when the user clicks a pill.
  useLayoutEffect(() => {
    setFacet('category', category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const setCategory = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set('category', value);
      else next.delete('category');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const owner = selected.owner ?? '';
  const type = selected.type ?? '';

  const { page, setPage, pageCount, pageItems, total } = usePagination(results, PAGE_SIZE);

  // Any change to the filter set returns the reader to the first page of results.
  useEffect(() => {
    setPage(1);
  }, [query, category, owner, type, setPage]);

  const stats = useMemo(
    () => [
      { id: 'total', label: 'Resources published', value: resources.length },
      { id: 'categories', label: 'Categories', value: resourceCategories.length },
      { id: 'owners', label: 'Owning teams', value: resourceOwners.length },
      {
        id: 'restricted',
        label: 'Restricted items',
        value: resources.filter((resource) => resource.restricted).length,
      },
    ],
    [],
  );

  const clearAll = () => {
    reset();
    setCategory('');
  };

  const filtered = Boolean(query) || activeCount > 0;

  return (
    <>
      <PageHero
        eyebrow="Resource Centre"
        title="Every approved asset, policy and template in one place"
        description="Search the group catalogue for brand assets, corporate documents, procedures and editable templates. Restricted items require an approved access request before download."
        breadcrumb={[{ label: 'Resource Centre', href: '/resources' }]}
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-navy/90 px-5 py-4 backdrop-blur-sm">
              <dd className="text-[1.75rem] font-bold leading-none text-white">
                <Counter value={stat.value} />
              </dd>
              <dt className="mt-2 text-caption text-white/60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="faint" spacing="tight">
        <Reveal>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
              <SearchBar
                value={query}
                onChange={setQuery}
                label="Search resources"
                placeholder="Search by title, description or tag"
              />
              <FilterSelect
                label="Owner"
                options={resourceOwners}
                value={owner}
                onChange={(value) => setFacet('owner', value)}
              />
              <FilterSelect
                label="File type"
                options={resourceTypes}
                value={type}
                onChange={(value) => setFacet('type', value)}
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <FilterPills
                label="Category"
                options={resourceCategories}
                value={category}
                onChange={setCategory}
                allLabel="All categories"
                className="lg:min-w-0 lg:flex-1"
              />

              <div
                className="flex shrink-0 items-center gap-1 rounded-btn border border-hairline bg-white p-1"
                role="group"
                aria-label="View layout"
              >
                {VIEWS.map((option) => {
                  const active = view === option;
                  const Glyph = option === 'grid' ? LayoutGrid : Rows3;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setView(option)}
                      aria-pressed={active}
                      aria-label={`${option === 'grid' ? 'Grid' : 'List'} view`}
                      className={cn(
                        'flex h-9 min-h-[36px] w-11 items-center justify-center rounded-[4px] transition-colors duration-300',
                        active
                          ? 'bg-navy-deep text-white'
                          : 'text-muted hover:bg-sky-faint hover:text-navy-deep',
                      )}
                    >
                      <Glyph className="h-[18px] w-[18px]" aria-hidden />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="white" spacing="tight">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-caption text-muted" role="status" aria-live="polite">
            Showing <span className="font-semibold text-navy-deep">{pageItems.length}</span> of{' '}
            <span className="font-semibold text-navy-deep">{total}</span> resources
            {category ? (
              <>
                {' '}
                in <span className="font-semibold text-navy-deep">{category}</span>
              </>
            ) : null}
          </p>

          {filtered ? (
            <Button variant="ghost" size="sm" onClick={clearAll} className="min-h-[44px]">
              Clear filters
            </Button>
          ) : null}
        </div>

        <div className="mt-8">
          {pageItems.length === 0 ? (
            <EmptyState
              title="No resources match your filters"
              description="Try a broader search term, or clear the category, owner and file-type filters to see the full catalogue."
              actionLabel="Clear filters"
              onAction={clearAll}
            />
          ) : view === 'grid' ? (
            <RevealGroup
              as="ul"
              key={`grid-${page}-${category}-${query}`}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4"
              gap={0.05}
            >
              {pageItems.map((resource) => (
                <RevealItem as="li" key={resource.id} className="h-full">
                  <ResourceCard resource={resource} variant="grid" />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <RevealGroup
              as="ul"
              key={`list-${page}-${category}-${query}`}
              className="overflow-hidden rounded-card border border-hairline"
              gap={0.04}
            >
              {pageItems.map((resource) => (
                <RevealItem as="li" key={resource.id}>
                  <ResourceCard resource={resource} variant="list" />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>

        <Pagination page={page} pageCount={pageCount} onChange={setPage} className="mt-12" />
      </Section>
    </>
  );
}

/** Keeps the grid/list choice shareable alongside the category deep link. */
function useViewParam(
  searchParams: URLSearchParams,
  setSearchParams: ReturnType<typeof useSearchParams>[1],
): [View, (value: View) => void] {
  const raw = searchParams.get('view') ?? '';
  const view: View = (VIEWS as readonly string[]).includes(raw) ? (raw as View) : 'grid';

  const setView = useCallback(
    (value: View) => {
      const next = new URLSearchParams(searchParams);
      if (value === 'grid') next.delete('view');
      else next.set('view', value);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return [view, setView];
}

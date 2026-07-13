import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills, FilterSelect } from '@/components/ui/Filter';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';
import { NewsCard } from '@/components/features/newsletter/NewsCard';
import { news, newsCategories, featuredArticle } from '@/data/newsletter';
import { entities } from '@/data/entities';
import { useCollection, usePagination, useSeo } from '@/hooks';
import type { NewsArticle } from '@/types';

const PAGE_SIZE = 6;
const GROUP_LABEL = 'Group';

export default function NewsletterPage() {
  const [params, setParams] = useSearchParams();

  useSeo({
    title: 'Newsroom',
    description:
      'Announcements, operational updates and stories from across Searah and its three operating entities.',
  });

  const { query, setQuery, selected, setFacet, reset, results, activeCount } =
    useCollection<NewsArticle>(news, {
      searchFields: (article) => [
        article.title,
        article.excerpt,
        article.category,
        article.author.name,
        article.tags,
      ],
      facets: {
        category: (article) => article.category,
        entity: (article) => article.entityId ?? GROUP_LABEL,
      },
    });

  // Deep links from the mega menu (?category=, ?entity=) seed the filters.
  useEffect(() => {
    const category = params.get('category');
    const entity = params.get('entity');
    if (category) setFacet('category', category);
    if (entity) setFacet('entity', entity);
    // Mount-only: after this the filter UI owns the state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFilter = (facet: string, value: string) => {
    setFacet(facet, value);
    const next = new URLSearchParams(params);
    if (value) next.set(facet, value);
    else next.delete(facet);
    setParams(next, { replace: true });
  };

  const clearAll = () => {
    reset();
    setParams({}, { replace: true });
  };

  const { page, setPage, pageCount, pageItems, total } = usePagination(results, PAGE_SIZE);

  const entityOptions = [...entities.map((entity) => entity.name), GROUP_LABEL];
  const entityValueToLabel = (value: string) =>
    entities.find((entity) => entity.id === value)?.name ?? value;
  const entityLabelToValue = (label: string) =>
    entities.find((entity) => entity.name === label)?.id ?? label;

  return (
    <>
      <PageHero
        eyebrow="News & Publications"
        title="The Searah newsroom"
        description="Announcements, operational updates and stories from across the group and its three operating entities."
        breadcrumb={[{ label: 'Newsletter', href: '/newsletter' }]}
      />

      {featuredArticle && !activeCount && !query ? (
        <Section tone="white" spacing="tight">
          <Reveal preset="scaleIn">
            <NewsCard article={featuredArticle} variant="feature" />
          </Reveal>
        </Section>
      ) : null}

      <Section tone="faint" spacing="tight">
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <SearchBar
              value={query}
              onChange={setQuery}
              label="Search articles"
              placeholder="Search by title, topic, author or tag"
            />
            <FilterSelect
              label="Entity"
              options={entityOptions}
              value={entityValueToLabel(selected.entity ?? '')}
              onChange={(label) => setFilter('entity', label ? entityLabelToValue(label) : '')}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <FilterPills
              label="Category"
              options={[...newsCategories]}
              value={selected.category ?? ''}
              onChange={(value) => setFilter('category', value)}
            />

            <p className="shrink-0 text-caption text-muted">
              {total} {total === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        <div className="mt-12">
          {pageItems.length ? (
            <>
              <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10" gap={0.07}>
                {pageItems.map((article) => (
                  <RevealItem key={article.id}>
                    <NewsCard article={article} />
                  </RevealItem>
                ))}
              </RevealGroup>

              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={(next) => {
                  setPage(next);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className="mt-16"
              />
            </>
          ) : (
            <EmptyState
              title="No articles match those filters"
              description="Try a broader search term, or clear the filters to see everything in the newsroom."
              actionLabel="Clear filters"
              onAction={clearAll}
            />
          )}
        </div>
      </Section>
    </>
  );
}

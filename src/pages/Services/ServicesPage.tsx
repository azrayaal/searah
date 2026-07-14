import { useCallback, useLayoutEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceCard, StatusBadge } from '@/components/features/services/ServiceCard';
import { InternalAppGrid } from '@/components/features/services/InternalAppGrid';
import { Section, SectionHeader } from '@/components/ui/Section';
import { FilterPills } from '@/components/ui/Filter';
import { SearchBar } from '@/components/ui/SearchBar';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Counter } from '@/components/ui/Counter';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useCollection, useSeo } from '@/hooks';
import { services, serviceCategories, serviceStatuses, internalApps } from '@/data/services';
import { entities } from '@/data/entities';
import { Icon } from '@/lib/icons';
import type { Service, ServiceCategory, ServiceCategoryMeta } from '@/types';

const ALL = 'all';

const searchFields = (service: Service) => [service.name, service.description, service.owner];

const facets = {
  category: (service: Service) => service.category,
  // A service with no `entityIds` is offered group-wide, so it matches every entity.
  entity: (service: Service) => service.entityIds ?? entities.map((entity) => entity.id),
};

function isCategory(value: string): value is ServiceCategory {
  return serviceCategories.some((meta) => meta.id === value);
}

export default function ServicesPage() {
  useSeo({
    title: 'Service Portal',
    description:
      'Raise a request with HR & General Affairs, IT, Procurement or HSE, and check the live status of every internal service across the Searah group.',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  /** Category lives in the URL: `/services?category=IT` pre-applies on load. */
  const categoryParam = searchParams.get('category') ?? '';
  const category = isCategory(categoryParam) ? categoryParam : '';

  /** `?entity=SKT` narrows the catalogue to what one operating company actually gets. */
  const entityParam = searchParams.get('entity') ?? '';
  const entity = entities.some((item) => item.id === entityParam) ? entityParam : '';

  const { query, setQuery, setFacet, reset, results } = useCollection(services, {
    searchFields,
    facets,
  });

  // Applied in a layout effect so `/services?category=IT` filters before the first paint.
  useLayoutEffect(() => {
    setFacet('category', category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useLayoutEffect(() => {
    setFacet('entity', entity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  const setEntity = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value && value !== ALL) next.set('entity', value);
      else next.delete('entity');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const setCategory = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value && value !== ALL) next.set('category', value);
      else next.delete('category');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  /** Status rail — counted from the catalogue, never hard-coded. */
  const statusCounts = useMemo(
    () =>
      serviceStatuses.map((status) => ({
        status,
        count: services.filter((service) => service.status === status).length,
      })),
    [],
  );

  const tabs: TabItem[] = useMemo(
    () => [
      { id: ALL, label: 'All services', count: services.length },
      ...serviceCategories.map((meta) => ({
        id: meta.id,
        label: meta.id,
        count: services.filter((service) => service.category === meta.id).length,
      })),
    ],
    [],
  );

  /** Sections rendered below the tabs: one per category still in scope. */
  const groups = useMemo(() => {
    const visible: ServiceCategoryMeta[] = category
      ? serviceCategories.filter((meta) => meta.id === category)
      : serviceCategories;

    return visible
      .map((meta) => ({
        meta,
        items: results.filter((service) => service.category === meta.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, results]);

  const clearAll = () => {
    reset();
    setCategory(ALL);
  };

  return (
    <>
      <PageHero
        eyebrow="Service Portal"
        title="Internal services, requests and live status"
        description="One front door to HR & General Affairs, IT, Procurement and HSE. Every service lists its owning team, its service level and the fastest way to raise a request."
        breadcrumb={[{ label: 'Service Portal', href: '/services' }]}
      >
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-3">
          {statusCounts.map(({ status, count }) => (
            <div
              key={status}
              className="flex items-center justify-between gap-4 bg-navy/90 px-5 py-4 backdrop-blur-sm"
            >
              <div>
                <dd className="text-[1.75rem] font-bold leading-none text-white">
                  <Counter value={count} />
                </dd>
                <dt className="mt-2 text-caption text-white/60">{status}</dt>
              </div>
              <StatusBadge status={status} />
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="faint" spacing="tight">
        <Reveal>
          <div className="flex flex-col gap-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              label="Search services"
              placeholder="Search by service, description or owning team"
              className="lg:max-w-xl"
            />
            <Tabs
              items={tabs}
              value={category || ALL}
              onChange={setCategory}
              layoutKey="services-category"
            />

            {/* Pills speak entity names; the URL and the facet speak entity codes. */}
            <FilterPills
              label="Entity"
              allLabel="All entities"
              options={entities.map((item) => item.name)}
              value={entities.find((item) => item.id === entity)?.name ?? ''}
              onChange={(name) =>
                setEntity(entities.find((item) => item.name === name)?.id ?? ALL)
              }
            />
          </div>
        </Reveal>
      </Section>

      {/* Applications — tools staff open themselves, not requests that join a queue */}
      <Section id="applications" tone="white" spacing="tight">
        <SectionHeader
          eyebrow="Internal applications"
          title="Open these yourself"
          description="Claims, bookings, permits and timesheets. No ticket, no queue — just the tool."
        />
        <InternalAppGrid apps={internalApps} className="mt-10" />
      </Section>

      <Section tone="white" spacing="tight">
        {groups.length === 0 ? (
          <EmptyState
            title="No services match your search"
            description="Try a different term, or clear the filters to browse every service across the four internal service lines."
            actionLabel="Clear filters"
            onAction={clearAll}
          />
        ) : (
          <div className="flex flex-col gap-16 lg:gap-20">
            {groups.map(({ meta, items }) => (
              <section key={meta.id} aria-labelledby={`category-${meta.id}`}>
                <Reveal className="flex flex-col gap-4 border-b border-hairline pb-6 md:flex-row md:items-end md:justify-between">
                  <div className="flex max-w-2xl items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-field bg-sky-faint text-ocean ring-1 ring-inset ring-hairline"
                      aria-hidden
                    >
                      <Icon name={meta.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h2 id={`category-${meta.id}`}>
                        <Link
                          to={`/services/${meta.id}`}
                          className="group inline-flex items-center gap-2 text-[1.5rem] font-bold leading-tight text-navy-deep transition-colors hover:text-ocean md:text-h2"
                        >
                          {meta.label}
                          <ArrowRight
                            className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </h2>
                      <p className="mt-2 text-body-sm text-charcoal">{meta.description}</p>
                    </div>
                  </div>
                  <p className="shrink-0 text-caption text-muted">
                    {items.length} {items.length === 1 ? 'service' : 'services'}
                  </p>
                </Reveal>

                <RevealGroup
                  as="ul"
                  className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:grid-cols-3"
                  gap={0.06}
                >
                  {items.map((service) => (
                    <RevealItem as="li" key={service.id} className="h-full">
                      <ServiceCard service={service} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

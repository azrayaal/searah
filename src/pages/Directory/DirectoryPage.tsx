import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills, FilterSelect } from '@/components/ui/Filter';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Counter } from '@/components/ui/Counter';
import { Modal } from '@/components/ui/Modal';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import {
  EmployeeCard,
  GROUP_ENTITY_ID,
  GROUP_ENTITY_LABEL,
  entityLabel,
} from '@/components/features/directory/EmployeeCard';
import { EmployeeProfile } from '@/components/features/directory/EmployeeProfile';
import { useCollection, usePagination, useSeo } from '@/hooks';
import { departments, employees, getEmployee, locations } from '@/data/employees';
import { entities } from '@/data/entities';
import { site } from '@/data/site';
import type { Employee } from '@/types';

const PAGE_SIZE = 12;

/** Query parameter used to deep-link a person — the organisation chart writes it. */
const PERSON_PARAM = 'person';

export default function DirectoryPage() {
  useSeo({
    title: 'Employee Directory',
    description: `Search the ${site.name} people directory by name, position, department, skills and expertise across every entity and location.`,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  /* -------------------------------------------------- Deep-linked profile */
  const personId = searchParams.get(PERSON_PARAM);
  const active = personId ? getEmployee(personId) : undefined;

  const openProfile = useCallback(
    (id: string) => {
      const next = new URLSearchParams(searchParams);
      next.set(PERSON_PARAM, id);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const closeProfile = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete(PERSON_PARAM);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  /* --------------------------------------------------------- Search + facets */
  const entityOptions = useMemo(
    () => [GROUP_ENTITY_LABEL, ...entities.map((entity) => entity.name)],
    [],
  );

  const searchFields = useCallback(
    (employee: Employee) => [
      employee.name,
      employee.position,
      employee.department,
      employee.location,
      employee.skills,
      employee.expertise,
    ],
    [],
  );

  const facets = useMemo(
    () => ({
      department: (employee: Employee) => employee.department,
      location: (employee: Employee) => employee.location,
      entity: (employee: Employee) =>
        employee.entityId === GROUP_ENTITY_ID
          ? GROUP_ENTITY_LABEL
          : entityLabel(employee.entityId),
    }),
    [],
  );

  const { query, setQuery, selected, setFacet, reset, results, activeCount } = useCollection(
    employees,
    { searchFields, facets },
  );

  const { page, setPage, pageCount, pageItems, total } = usePagination(results, PAGE_SIZE);

  const counts = [
    { id: 'people', label: 'People', value: employees.length },
    { id: 'departments', label: 'Departments', value: departments.length },
    { id: 'locations', label: 'Locations', value: locations.length },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Employee Directory"
        description={`Find colleagues across ${site.legalName} — search by name, position, department, skill or expertise, and open a profile for contact details and reporting lines.`}
        breadcrumb={[{ label: 'Employee Directory', href: '/directory' }]}
      >
        <dl className="grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-field border border-white/15 bg-white/15">
          {counts.map((item) => (
            <div key={item.id} className="bg-navy/80 px-4 py-4 backdrop-blur sm:px-6">
              <dd className="text-[1.75rem] font-bold leading-none text-white">
                <Counter value={item.value} />
              </dd>
              <dt className="mt-2 text-caption text-white/60">{item.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="white" spacing="tight">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <SearchBar
              value={query}
              onChange={setQuery}
              label="Search the employee directory"
              placeholder="Search by name, position, department, skill or expertise"
            />
            <FilterSelect
              label="Department"
              options={departments}
              value={selected.department ?? ''}
              onChange={(value) => setFacet('department', value)}
            />
            <FilterSelect
              label="Location"
              options={locations}
              value={selected.location ?? ''}
              onChange={(value) => setFacet('location', value)}
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-hairline pt-4 lg:flex-row lg:items-center lg:justify-between">
            <FilterPills
              label="Entity"
              options={entityOptions}
              value={selected.entity ?? ''}
              onChange={(value) => setFacet('entity', value)}
            />

            <p aria-live="polite" className="shrink-0 text-caption text-muted">
              {total} of {employees.length} people
              {activeCount > 0 ? ` · ${activeCount} filter${activeCount > 1 ? 's' : ''} active` : ''}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          {pageItems.length > 0 ? (
            <>
              <RevealGroup
                as="ul"
                gap={0.04}
                className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4"
              >
                {pageItems.map((employee) => (
                  <RevealItem as="li" key={employee.id} className="bg-white">
                    <EmployeeCard employee={employee} onSelect={openProfile} />
                  </RevealItem>
                ))}
              </RevealGroup>

              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={setPage}
                className="mt-12"
              />
            </>
          ) : (
            <EmptyState
              title="No colleagues match those filters"
              description="Try a different name, department or location — or clear the filters to see everyone."
              actionLabel="Clear filters"
              onAction={reset}
            />
          )}
        </div>
      </Section>

      <Modal
        open={Boolean(active)}
        onClose={closeProfile}
        label={active ? `${active.name} — ${active.position}` : 'Employee profile'}
        className="sm:max-w-4xl"
      >
        {active ? <EmployeeProfile employee={active} onSelect={openProfile} /> : null}
      </Modal>
    </>
  );
}

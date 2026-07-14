import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { Mail, Phone } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/features/services/ServiceCard';
import { InternalAppGrid } from '@/components/features/services/InternalAppGrid';
import { getCategory, internalApps, serviceDesks, services } from '@/data/services';
import { entityIndex } from '@/data/entities';
import { Icon } from '@/lib/icons';
import { useSeo } from '@/hooks';

/**
 * One service line — HSE, HRGA, IT or Procurement — as a page of its own. The portal index
 * answers "what exists"; this answers "who owns it here, and how do I reach them", which is
 * the question a filtered list on a shared page could never answer per entity.
 */
export default function ServiceCategoryPage() {
  const { category: param } = useParams<{ category: string }>();
  const meta = param ? getCategory(param.toUpperCase() === 'HRGA' ? 'HRGA' : param) : undefined;

  const catalogue = useMemo(
    () => (meta ? services.filter((service) => service.category === meta.id) : []),
    [meta],
  );
  const apps = useMemo(
    () => (meta ? internalApps.filter((app) => app.category === meta.id) : []),
    [meta],
  );

  useSeo({
    title: meta ? `${meta.label} — Service Portal` : 'Service Portal',
    description: meta?.description ?? '',
  });

  if (!meta) return <Navigate to="/services" replace />;

  const desks = serviceDesks[meta.id] ?? [];

  return (
    <>
      <PageHero
        eyebrow="Service Portal"
        title={meta.label}
        description={meta.description}
        breadcrumb={[
          { label: 'Service Portal', href: '/services' },
          { label: meta.id, href: `/services/${meta.id}` },
        ]}
      >
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {[
            { label: 'Services', value: String(catalogue.length) },
            { label: 'Applications', value: String(apps.length) },
            { label: 'Service desks', value: String(desks.length) },
            {
              label: 'Operational',
              value: String(catalogue.filter((s) => s.status === 'Operational').length),
            },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/45">
                {stat.label}
              </dt>
              <dd className="mt-1.5 text-[1.5rem] font-bold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Who answers, per entity */}
      <Section id="desks" tone="white">
        <SectionHeader
          eyebrow="Service desks"
          title="Who answers, in each entity"
          description="The catalogue is shared across the group; the desk that answers it is not. Raise your request with the entity you work for."
        />

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3" gap={0.07}>
          {desks.map((desk) => {
            const entity = entityIndex[desk.entityId];

            return (
              <RevealItem
                key={desk.entityId}
                className="flex flex-col rounded-card border border-hairline p-7 lg:p-8"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entity?.accent }}
                    aria-hidden
                  />
                  <span className="text-caption font-bold uppercase tracking-[0.1em] text-ocean">
                    {entity?.name ?? desk.entityId}
                  </span>
                </span>

                <p className="mt-5 text-h3 text-navy-deep">{desk.lead}</p>
                <p className="mt-1.5 text-caption text-muted">{desk.hours}</p>

                <div className="mt-6 space-y-3 border-t border-hairline pt-5">
                  <a
                    href={`mailto:${desk.email}`}
                    className="flex items-center gap-3 text-body-sm font-semibold text-navy-deep transition-colors hover:text-ocean"
                  >
                    <Mail className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                    {desk.email}
                  </a>
                  <a
                    href={`tel:${desk.phone.replace(/[^\d+]/g, '')}`}
                    className="flex items-center gap-3 text-body-sm font-semibold text-navy-deep transition-colors hover:text-ocean"
                  >
                    <Phone className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                    {desk.phone}
                  </a>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Applications owned by this service line */}
      {apps.length > 0 ? (
        <Section id="applications" tone="faint">
          <SectionHeader
            eyebrow="Applications"
            title="Open these yourself"
            description="Tools you use directly. No ticket, no queue, no service level to read first."
          />
          <InternalAppGrid apps={apps} className="mt-12" />
        </Section>
      ) : null}

      {/* The catalogue */}
      <Section id="catalogue" tone="white">
        <SectionHeader
          eyebrow="Catalogue"
          title="Requests this team handles"
          cta={{ label: 'All services', href: '/services' }}
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:grid-cols-3"
          gap={0.06}
        >
          {catalogue.map((service) => (
            <RevealItem as="li" key={service.id} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The other service lines */}
      <Section tone="faint" spacing="tight">
        <SectionHeader eyebrow="Service lines" title="Somewhere else to look" />

        <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-3" gap={0.06}>
          {['HRGA', 'IT', 'Procurement', 'HSE']
            .filter((id) => id !== meta.id)
            .map((id) => {
              const other = getCategory(id);
              if (!other) return null;

              return (
                <RevealItem key={id} className="bg-white">
                  <PrefetchLink
                    to={`/services/${id}`}
                    className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-sky-faint"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-soft/60 text-ocean">
                      <Icon name={other.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-body-sm font-bold text-navy-deep transition-colors group-hover:text-ocean">
                      {other.label}
                    </span>
                    <Badge tone="neutral">
                      {services.filter((service) => service.category === other.id).length} services
                    </Badge>
                  </PrefetchLink>
                </RevealItem>
              );
            })}
        </RevealGroup>
      </Section>
    </>
  );
}

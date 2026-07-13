import { useMemo } from 'react';
import { Clock, Mail, Phone, PhoneCall } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills } from '@/components/ui/Filter';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useCollection, useSeo } from '@/hooks';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import {
  emergencyGroups,
  emergencyIntro,
  emergencySteps,
  regionalContacts,
} from '@/data/emergency';
import type { EmergencyContact, EmergencySeverity, RegionalContact } from '@/types';

/** Strips formatting so the dialler receives a clean, dialable number. */
function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

const severity: Record<
  EmergencySeverity,
  { card: string; rail: string; icon: string; badge: 'danger' | 'warning' | 'neutral'; call: string }
> = {
  critical: {
    card: 'border-crimson/20 bg-crimson/[0.03] hover:border-crimson/40',
    rail: 'bg-crimson',
    icon: 'bg-crimson/10 text-crimson',
    badge: 'danger',
    call: 'bg-crimson text-white hover:bg-[#7d0925]',
  },
  urgent: {
    card: 'border-ember/30 bg-ember/[0.04] hover:border-ember/60',
    rail: 'bg-ember',
    icon: 'bg-ember/15 text-[#9A5514]',
    badge: 'warning',
    call: 'bg-navy-deep text-white hover:bg-[#071333]',
  },
  standard: {
    card: 'border-hairline bg-white hover:border-ocean/40',
    rail: 'bg-navy-deep/15',
    icon: 'bg-navy-deep/5 text-navy-deep',
    badge: 'neutral',
    call: 'border border-navy-deep/15 bg-white text-navy-deep hover:border-ocean hover:text-ocean',
  },
};

/** Column labels for the regional table — keyed to `RegionalContact` fields. */
const regionalColumns: { key: 'control' | 'medic' | 'security'; label: string }[] = [
  { key: 'control', label: 'Control room' },
  { key: 'medic', label: 'Medic' },
  { key: 'security', label: 'Security' },
];

function ContactCard({ contact }: { contact: EmergencyContact }) {
  const tone = severity[contact.severity];

  return (
    <RevealItem
      as="li"
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-card border p-6 transition-colors duration-300 ease-premium',
        tone.card,
      )}
    >
      <span className={cn('absolute inset-y-0 left-0 w-1', tone.rail)} aria-hidden />

      <div className="flex items-start justify-between gap-4">
        <span
          className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', tone.icon)}
        >
          <Icon name={contact.icon} className="h-[18px] w-[18px]" />
        </span>
        <Badge tone={tone.badge} dot={contact.severity !== 'standard'}>
          {contact.severity}
        </Badge>
      </div>

      <h3 className="mt-5 text-[1.0625rem] font-bold leading-snug text-navy-deep">
        {contact.label}
      </h3>
      <p className="mt-1 text-caption text-muted">{contact.role}</p>

      <dl className="mt-5 space-y-2.5 text-body-sm">
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Telephone</dt>
          <Phone className="mt-1 h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
          <dd>
            <a
              href={telHref(contact.phone)}
              className="font-semibold tabular-nums text-navy-deep underline-offset-4 hover:text-ocean hover:underline"
            >
              {contact.phone}
            </a>
            {contact.altPhone ? (
              <>
                <span className="px-1.5 text-muted/60" aria-hidden>
                  /
                </span>
                <a
                  href={telHref(contact.altPhone)}
                  className="tabular-nums text-muted underline-offset-4 hover:text-ocean hover:underline"
                >
                  {contact.altPhone}
                </a>
              </>
            ) : null}
          </dd>
        </div>

        {contact.email ? (
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Email</dt>
            <Mail className="mt-1 h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
            <dd className="min-w-0">
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-ocean underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>
            </dd>
          </div>
        ) : null}

        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Availability</dt>
          <Clock className="mt-1 h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
          <dd className="text-caption text-muted">{contact.availability}</dd>
        </div>
      </dl>

      <a
        href={telHref(contact.phone)}
        aria-label={`Quick call ${contact.label} on ${contact.phone}`}
        className={cn(
          'mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn px-5 text-body-sm font-semibold',
          'transition-all duration-300 ease-premium',
          tone.call,
        )}
      >
        <PhoneCall className="h-[18px] w-[18px]" aria-hidden />
        Quick Call
      </a>
    </RevealItem>
  );
}

export default function EmergencyPage() {
  useSeo({ title: emergencyIntro.title, description: emergencyIntro.description });

  const countries = useMemo(
    () => [...new Set(regionalContacts.map((contact) => contact.country))],
    [],
  );

  const searchFields = useMemo(
    () => (contact: RegionalContact) => [
      contact.region,
      contact.site,
      contact.country,
      contact.control,
      contact.medic,
      contact.security,
    ],
    [],
  );

  const facets = useMemo(
    () => ({ country: (contact: RegionalContact) => contact.country }),
    [],
  );

  const { query, setQuery, selected, setFacet, reset, results } = useCollection(regionalContacts, {
    searchFields,
    facets,
  });

  return (
    <>
      <PageHero
        eyebrow={emergencyIntro.eyebrow}
        title={emergencyIntro.title}
        description={emergencyIntro.description}
        breadcrumb={[{ label: emergencyIntro.eyebrow, href: '/emergency' }]}
      >
        <div className="max-w-3xl rounded-card border border-crimson/40 bg-crimson/10 p-6 backdrop-blur-sm md:p-8">
          <p className="eyebrow text-white/80">
            <span className="h-px w-8 bg-white/50" aria-hidden />
            {emergencyIntro.hotline.label}
          </p>

          <a
            href={telHref(emergencyIntro.hotline.number)}
            aria-label={`Call the ${emergencyIntro.hotline.label} on ${emergencyIntro.hotline.number}`}
            className={cn(
              'mt-4 flex min-h-[44px] w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-btn text-white',
              'text-[2rem] font-bold leading-none tabular-nums transition-colors duration-300 md:text-[3rem]',
              'hover:text-ember focus-visible:text-ember',
            )}
          >
            <PhoneCall className="h-8 w-8 shrink-0 md:h-10 md:w-10" aria-hidden />
            {emergencyIntro.hotline.number}
          </a>

          <p className="mt-5 max-w-xl text-caption text-white/70">{emergencyIntro.hotline.note}</p>
        </div>
      </PageHero>

      {/* What to do in an incident */}
      <Section tone="white" spacing="tight">
        <SectionHeader eyebrow={emergencyIntro.eyebrow} title="If you discover an incident" />

        <RevealGroup
          as="ol"
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-5"
        >
          {emergencySteps.map((step, index) => (
            <RevealItem as="li" key={step.id} className="flex flex-col bg-white p-6 lg:p-7">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-deep text-caption font-bold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-bold leading-snug text-navy-deep">
                <span className="sr-only">{`Step ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-3 text-caption leading-relaxed text-charcoal">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Contact groups */}
      {emergencyGroups.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          tone={index % 2 === 0 ? 'faint' : 'white'}
          spacing="tight"
        >
          <SectionHeader title={group.title} description={group.description} />

          <RevealGroup
            as="ul"
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4"
          >
            {group.contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </RevealGroup>
        </Section>
      ))}

      {/* Regional contacts */}
      <Section id="regional" tone="white">
        <SectionHeader
          title="Site and regional numbers"
          description="Every operating base publishes a control room, a medic and a security number. All are answered around the clock."
        />

        <Reveal className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar
            value={query}
            onChange={setQuery}
            label="Search regional emergency contacts"
            placeholder="Search by site, region or number"
            className="md:max-w-md"
          />
          <FilterPills
            label="Country"
            options={countries}
            value={selected.country ?? ''}
            onChange={(value) => setFacet('country', value)}
          />
        </Reveal>

        {results.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No sites match that search"
              description="Clear the filters to see every operating base, or call the Group Emergency Control Centre — it can reach any site."
              actionLabel="Clear filters"
              onAction={reset}
            />
          </div>
        ) : (
          <div className="mt-8">
            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-card border border-hairline md:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Control room, medic and security numbers by Searah site
                </caption>
                <thead>
                  <tr className="bg-sky-faint">
                    <th
                      scope="col"
                      className="px-6 py-4 text-caption font-bold uppercase tracking-[0.08em] text-muted"
                    >
                      Site
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-caption font-bold uppercase tracking-[0.08em] text-muted"
                    >
                      Country
                    </th>
                    {regionalColumns.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className="px-6 py-4 text-caption font-bold uppercase tracking-[0.08em] text-muted"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {results.map((contact) => (
                    <tr key={contact.id} className="transition-colors hover:bg-sky-faint">
                      <th scope="row" className="px-6 py-4 align-top">
                        <span className="block text-body-sm font-semibold text-navy-deep">
                          {contact.site}
                        </span>
                        <span className="mt-0.5 block text-caption font-normal text-muted">
                          {contact.region}
                        </span>
                      </th>
                      <td className="px-6 py-4 align-top text-body-sm text-charcoal">
                        {contact.country}
                      </td>
                      {regionalColumns.map((column) => (
                        <td key={column.key} className="px-6 py-4 align-top">
                          <a
                            href={telHref(contact[column.key])}
                            aria-label={`Call ${contact.site} ${column.label} on ${contact[column.key]}`}
                            className="inline-flex min-h-[44px] items-center gap-2 text-body-sm tabular-nums text-navy-deep underline-offset-4 hover:text-ocean hover:underline"
                          >
                            <Phone className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                            {contact[column.key]}
                          </a>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <ul className="space-y-4 md:hidden">
              {results.map((contact) => (
                <li
                  key={contact.id}
                  className="rounded-card border border-hairline bg-white p-5 shadow-raised"
                >
                  <p className="text-body-sm font-bold text-navy-deep">{contact.site}</p>
                  <p className="mt-0.5 text-caption text-muted">
                    {contact.region} — {contact.country}
                  </p>

                  <dl className="mt-4 divide-y divide-hairline border-t border-hairline">
                    {regionalColumns.map((column) => (
                      <div
                        key={column.key}
                        className="flex items-center justify-between gap-4 py-1.5"
                      >
                        <dt className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                          {column.label}
                        </dt>
                        <dd>
                          <a
                            href={telHref(contact[column.key])}
                            aria-label={`Call ${contact.site} ${column.label} on ${contact[column.key]}`}
                            className="inline-flex min-h-[44px] items-center gap-2 text-body-sm font-semibold tabular-nums text-navy-deep underline-offset-4 hover:text-ocean hover:underline"
                          >
                            <Phone className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                            {contact[column.key]}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}

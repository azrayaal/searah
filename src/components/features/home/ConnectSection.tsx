import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import type { Entity, SectionIntro } from '@/types';

interface ConnectSectionProps {
  intro: SectionIntro;
  entities: Entity[];
  emergency: { label: string; phone: string; caption: string };
}

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/**
 * Where to find each operating company, and who to call. It replaces the group KPI rail
 * that used to close the homepage: those numbers now live on each entity's own page, next
 * to the date they were read, while the one thing the homepage genuinely owed a visitor —
 * an address and a phone number per OpCo — was nowhere on the site at all.
 */
export function ConnectSection({ intro, entities, emergency }: ConnectSectionProps) {
  return (
    <Section id="connect" tone="faint">
      <SectionHeader eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3" gap={0.07}>
        {entities.map((entity) => (
          <RevealItem
            key={entity.id}
            className="flex flex-col rounded-card border border-hairline bg-white p-7 lg:p-8"
          >
            <span className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entity.accent }}
                aria-hidden
              />
              <PrefetchLink
                to={`/entity/${entity.id}`}
                className="text-h3 text-navy-deep transition-colors hover:text-ocean"
              >
                {entity.name}
              </PrefetchLink>
            </span>
            <p className="mt-1.5 text-caption text-muted">{entity.fullName}</p>

            <address className="mt-6 flex gap-3 not-italic">
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
              <span>
                {/* The legal name already sits above as the card's subtitle; repeating it as
                    the first line of the address is noise, not precision. */}
                {entity.contact.registeredOffice
                  .filter((line) => line !== entity.fullName)
                  .map((line) => (
                    <span key={line} className="block text-body-sm text-charcoal">
                      {line}
                    </span>
                  ))}
              </span>
            </address>

            <div className="mt-6 space-y-3 border-t border-hairline pt-5">
              <a
                href={tel(entity.contact.phone)}
                className="flex items-center gap-3 text-body-sm font-semibold text-navy-deep transition-colors hover:text-ocean"
              >
                <PhoneCall className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                {entity.contact.phone}
              </a>
              <a
                href={`mailto:${entity.contact.email}`}
                className="flex items-center gap-3 text-body-sm font-semibold text-navy-deep transition-colors hover:text-ocean"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
                {entity.contact.email}
              </a>
            </div>

            <p className="mt-5 text-caption text-muted">
              Media enquiries: {entity.contact.comms.name} ·{' '}
              <a
                href={`mailto:${entity.contact.comms.email}`}
                className="font-semibold text-ocean transition-colors hover:text-navy-deep"
              >
                {entity.contact.comms.email}
              </a>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* The emergency line sits below the addresses, not among them: it is the one number
          nobody should have to compare against three others to find. */}
      <Reveal preset="fadeUp" className="mt-6">
        <div className="flex flex-col gap-5 rounded-card border border-crimson/20 bg-crimson/[0.03] p-7 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div>
            <p className="text-caption font-bold uppercase tracking-[0.1em] text-crimson">
              {emergency.label}
            </p>
            <p className="mt-2 max-w-xl text-body-sm text-charcoal">{emergency.caption}</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <PrefetchLink
              to="/emergency"
              className="rounded-btn border border-navy-deep/15 bg-white px-5 py-3.5 text-body-sm font-semibold text-navy-deep transition-colors hover:border-ocean hover:text-ocean"
            >
              All emergency contacts
            </PrefetchLink>
            <a
              href={tel(emergency.phone)}
              className="flex items-center gap-2 rounded-btn bg-crimson px-5 py-3.5 text-body-sm font-semibold text-white transition-colors hover:bg-[#7d0925]"
            >
              <PhoneCall className="h-[18px] w-[18px]" aria-hidden />
              {emergency.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

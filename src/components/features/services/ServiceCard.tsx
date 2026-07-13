import { ArrowRight, ArrowUpRight, Clock, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import type { NavLink, Service, ServiceStatus } from '@/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

type Tone = 'success' | 'ember' | 'ocean';

/** Status → badge tone. Operational reads calm, Degraded warns, Maintenance is neutral. */
const statusTones: Record<ServiceStatus, Tone> = {
  Operational: 'success',
  Degraded: 'ember',
  Maintenance: 'ocean',
};

export function StatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <Badge tone={statusTones[status]} dot>
      {status}
    </Badge>
  );
}

function QuickLinkRow({ link }: { link: NavLink }) {
  const external = link.external || link.href.startsWith('http') || link.href === '#';
  const label = (
    <>
      <span className="min-w-0 truncate">{link.label}</span>
      <ArrowUpRight
        className="h-[18px] w-[18px] shrink-0 text-muted/60 transition-colors group-hover/link:text-ocean"
        aria-hidden
      />
    </>
  );
  const classes =
    'group/link flex min-h-[44px] w-full items-center justify-between gap-3 rounded-btn px-2 -mx-2 text-caption text-muted transition-colors hover:bg-sky-faint hover:text-ocean focus-visible:bg-sky-faint focus-visible:text-ocean';

  return (
    <li>
      {external ? (
        <a
          href={link.href}
          className={classes}
          {...(link.external || link.href.startsWith('http')
            ? { target: '_blank', rel: 'noreferrer noopener' }
            : {})}
        >
          {label}
        </a>
      ) : (
        <Link to={link.href} className={classes}>
          {label}
        </Link>
      )}
    </li>
  );
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const { name, description, status, owner, sla, icon, requestHref, quickLinks } = service;
  const headingId = `service-${service.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'flex h-full flex-col rounded-card border border-hairline bg-white p-6 transition-all duration-500 ease-premium hover:border-ocean/30 hover:shadow-lifted lg:p-7',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-field bg-sky-faint text-ocean ring-1 ring-inset ring-hairline"
          aria-hidden
        >
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
        <StatusBadge status={status} />
      </div>

      <h3 id={headingId} className="mt-5 text-h3 leading-snug text-navy-deep">
        {name}
      </h3>
      <p className="mt-2.5 text-body-sm text-charcoal">{description}</p>

      <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-hairline pt-5 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <UserRound className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted/70" aria-hidden />
          <div className="min-w-0">
            <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
              Owner
            </dt>
            <dd className="mt-0.5 text-caption text-navy-deep">{owner}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted/70" aria-hidden />
          <div className="min-w-0">
            <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
              Service level
            </dt>
            <dd className="mt-0.5 text-caption text-navy-deep">{sla}</dd>
          </div>
        </div>
      </dl>

      {quickLinks.length > 0 ? (
        <div className="mt-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
            Quick links
          </p>
          <ul className="mt-1.5 flex flex-col" aria-label={`${name} quick links`}>
            {quickLinks.map((link) => (
              <QuickLinkRow key={`${link.href}-${link.label}`} link={link} />
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto pt-6">
        <ButtonLink
          href={requestHref}
          size="md"
          ariaLabel={`Request ${name}`}
          icon={<ArrowRight className="h-[18px] w-[18px]" aria-hidden />}
          className="w-full sm:w-auto"
        >
          Request
        </ButtonLink>
      </div>
    </article>
  );
}

import { useMemo } from 'react';
import { ArrowUpRight, Building2, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { employees, getEmployee } from '@/data/employees';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import type { Employee } from '@/types';
import { entityLabel } from './EmployeeCard';

interface EmployeeProfileProps {
  employee: Employee;
  /** Switches the profile to another person (manager / direct report). */
  onSelect: (id: string) => void;
}

/** Compact person row used for the reporting line at the foot of the profile. */
function PersonRow({ person, onSelect }: { person: Employee; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(person.id)}
      className="group flex min-h-[44px] w-full items-center gap-3 rounded-field px-2 py-2 text-left transition-colors hover:bg-sky-faint"
    >
      <Image media={person.photo} ratio="1/1" className="w-10 shrink-0 rounded-full" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-caption font-bold text-navy-deep transition-colors group-hover:text-ocean">
          {person.name}
        </span>
        <span className="block truncate text-caption text-muted">{person.position}</span>
      </span>
      <ChevronRight
        className="h-[18px] w-[18px] shrink-0 text-muted transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:text-ocean"
        aria-hidden
      />
    </button>
  );
}

function TagList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <Badge tone="ocean">{item}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EmployeeProfile({ employee, onSelect }: EmployeeProfileProps) {
  const manager = employee.reportsTo ? getEmployee(employee.reportsTo) : undefined;

  const reports = useMemo(
    () => employees.filter((person) => person.reportsTo === employee.id),
    [employee.id],
  );

  const contacts = [
    { id: 'email', icon: Mail, label: employee.email, href: `mailto:${employee.email}` },
    {
      id: 'phone',
      icon: Phone,
      label: employee.phone,
      href: `tel:${employee.phone.replace(/\s+/g, '')}`,
    },
  ];

  return (
    <article>
      {/* Header */}
      <header className="border-b border-hairline bg-sky-faint px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            media={employee.photo}
            ratio="1/1"
            priority
            className="w-24 shrink-0 rounded-full shadow-raised sm:w-28"
          />

          <div className="min-w-0 flex-1 sm:pr-12">
            <h2 id="employee-profile-title" className="text-h3 text-navy-deep sm:text-[1.5rem]">
              {employee.name}
            </h2>
            <p className="mt-1.5 text-body-sm text-charcoal">{employee.position}</p>

            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-muted">
              <li className="flex items-center gap-1.5">
                <Building2 className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span>
                  {employee.department} · {entityLabel(employee.entityId)}
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span>{employee.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact rail */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {contacts.map(({ id, icon: ContactIcon, label, href }) => (
            <a
              key={id}
              href={href}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-btn border border-hairline bg-white px-4',
                'text-caption text-navy-deep shadow-raised transition-colors hover:border-ocean hover:text-ocean',
              )}
            >
              <ContactIcon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="truncate">{label}</span>
            </a>
          ))}

          {employee.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${employee.name} on ${link.label}`}
              className={cn(
                'inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-btn border border-hairline bg-white px-4',
                'text-caption text-navy-deep shadow-raised transition-colors hover:border-ocean hover:text-ocean',
              )}
            >
              <Icon name={link.icon} className="h-[18px] w-[18px] shrink-0" />
              <span>{link.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
            </a>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <section>
            <h3 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
              Biography
            </h3>
            <p className="mt-3 max-w-prose text-body-sm text-charcoal">{employee.biography}</p>
            <p className="mt-3 text-caption text-muted">Joined in {employee.startedIn}</p>
          </section>

          <TagList title="Skills" items={employee.skills} />
          <TagList title="Expertise" items={employee.expertise} />

          {employee.projects.length > 0 ? (
            <section>
              <h3 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
                Projects
              </h3>
              <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                {employee.projects.map((project) => (
                  <li
                    key={`${project.name}-${project.year}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                  >
                    <span className="text-body-sm font-semibold text-navy-deep">{project.name}</span>
                    <span className="text-caption text-muted">
                      {project.role} · {project.year}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Reporting line */}
        <aside className="space-y-8 lg:border-l lg:border-hairline lg:pl-8">
          {manager ? (
            <section>
              <h3 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
                Reports to
              </h3>
              <div className="mt-2">
                <PersonRow person={manager} onSelect={onSelect} />
              </div>
            </section>
          ) : null}

          {reports.length > 0 ? (
            <section>
              <h3 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
                Direct reports
                <span className="ml-2 font-normal normal-case tracking-normal">
                  ({reports.length})
                </span>
              </h3>
              <ul className="mt-2 space-y-1">
                {reports.map((person) => (
                  <li key={person.id}>
                    <PersonRow person={person} onSelect={onSelect} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

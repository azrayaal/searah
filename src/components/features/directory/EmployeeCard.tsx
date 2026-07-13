import { MapPin } from 'lucide-react';
import { Image } from '@/components/ui/Image';
import { entityIndex } from '@/data/entities';
import { cn } from '@/lib/cn';
import type { Employee } from '@/types';

/** Employees carry `entityId: 'GROUP'` for corporate roles, which has no entity record. */
export const GROUP_ENTITY_ID = 'GROUP';
export const GROUP_ENTITY_LABEL = 'Group';

/** Resolves an entity id (or the group sentinel) to its display label. */
export function entityLabel(entityId: string | null) {
  if (!entityId || entityId === GROUP_ENTITY_ID) return GROUP_ENTITY_LABEL;
  return entityIndex[entityId]?.name ?? entityId;
}

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Directory tile. Rendered as a button rather than a link — the profile opens in
 * a modal, and the URL is updated by the page so the view stays shareable.
 */
export function EmployeeCard({ employee, onSelect, className }: EmployeeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(employee.id)}
      aria-haspopup="dialog"
      aria-label={`${employee.name} — ${employee.position}`}
      className={cn(
        'group flex h-full w-full min-h-[44px] items-start gap-4 p-5 text-left transition-colors duration-300',
        'hover:bg-sky-faint focus-visible:bg-sky-faint',
        className,
      )}
    >
      <Image
        media={employee.photo}
        ratio="1/1"
        zoom
        className="w-16 shrink-0 rounded-full sm:w-[72px]"
      />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-body-sm font-bold text-navy-deep transition-colors group-hover:text-ocean">
          {employee.name}
        </span>
        <span className="mt-1 block text-caption text-charcoal line-clamp-2">
          {employee.position}
        </span>

        <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-caption text-muted">
          <span className="font-semibold text-ocean">{employee.department}</span>
          <span aria-hidden>·</span>
          <span>{entityLabel(employee.entityId)}</span>
        </span>

        <span className="mt-1.5 flex items-center gap-1.5 text-caption text-muted">
          <MapPin className="h-[14px] w-[14px] shrink-0" aria-hidden />
          <span className="truncate">{employee.location}</span>
        </span>
      </span>
    </button>
  );
}

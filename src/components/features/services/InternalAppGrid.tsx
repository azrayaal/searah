import { ArrowUpRight, Lock } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import type { InternalApp } from '@/types';

interface InternalAppGridProps {
  apps: InternalApp[];
  className?: string;
}

/** Launcher tiles for the tools staff open directly — claims, bookings, permits, timesheets. */
export function InternalAppGrid({ apps, className }: InternalAppGridProps) {
  return (
    <RevealGroup
      as="ul"
      className={cn(
        'grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
      gap={0.05}
    >
      {apps.map((app) => (
        <RevealItem as="li" key={app.id} className="bg-white">
          <a
            href={app.href}
            className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-navy-deep lg:p-7"
          >
            <span className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-soft/60 text-ocean transition-colors duration-300 group-hover:bg-white/10 group-hover:text-ember">
                <Icon name={app.icon} className="h-[18px] w-[18px]" />
              </span>
              <ArrowUpRight
                className="h-[18px] w-[18px] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </span>

            <span className="mt-5 block text-body-sm font-bold text-navy-deep transition-colors duration-300 group-hover:text-white">
              {app.name}
            </span>
            <span className="mt-2 block text-caption text-muted transition-colors duration-300 group-hover:text-white/60">
              {app.description}
            </span>

            <span className="mt-auto flex items-center gap-2 pt-5 text-caption text-muted transition-colors duration-300 group-hover:text-white/50">
              {app.access ? (
                <>
                  <Lock className="h-3 w-3 shrink-0" aria-hidden />
                  {app.access}
                  <span aria-hidden>·</span>
                </>
              ) : null}
              {app.owner}
            </span>
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

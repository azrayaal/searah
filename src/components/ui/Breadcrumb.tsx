import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { NavLink } from '@/types';

interface BreadcrumbProps {
  /** Trail excluding Home, which is prepended automatically. The last item is the current page. */
  items: NavLink[];
  tone?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumb({ items, tone = 'light', className }: BreadcrumbProps) {
  const dark = tone === 'dark';
  const trail: NavLink[] = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-caption">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={cn('font-semibold', dark ? 'text-white' : 'text-navy-deep')}
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    to={item.href}
                    className={cn(
                      'transition-colors',
                      dark ? 'text-white/60 hover:text-white' : 'text-muted hover:text-ocean',
                    )}
                  >
                    {item.label}
                  </Link>
                  <ChevronRight
                    className={cn('h-3.5 w-3.5', dark ? 'text-white/30' : 'text-muted/50')}
                    aria-hidden
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

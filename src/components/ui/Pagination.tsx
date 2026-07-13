import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}

/** Builds a windowed page list with ellipses: 1 … 4 5 6 … 12 */
function pageList(page: number, pageCount: number): (number | 'gap')[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);

  return sorted.flatMap((value, index) => {
    const previous = sorted[index - 1];
    return previous !== undefined && value - previous > 1 ? ['gap' as const, value] : [value];
  });
}

export function Pagination({ page, pageCount, onChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  const base =
    'flex h-11 min-w-[44px] items-center justify-center rounded-btn px-3 text-body-sm transition-colors duration-200';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-2', className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(base, 'border border-hairline text-navy-deep hover:border-ocean hover:text-ocean disabled:pointer-events-none disabled:opacity-40')}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageList(page, pageCount).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="px-1 text-muted" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              base,
              item === page
                ? 'bg-navy-deep font-semibold text-white'
                : 'border border-hairline text-navy-deep hover:border-ocean hover:text-ocean',
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={cn(base, 'border border-hairline text-navy-deep hover:border-ocean hover:text-ocean disabled:pointer-events-none disabled:opacity-40')}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FilterPillsProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Rendered as the "no filter" option; defaults to "All". */
  allLabel?: string;
  className?: string;
}

/** Horizontal pill filter. Scrolls rather than wraps on narrow viewports. */
export function FilterPills({
  label,
  options,
  value,
  onChange,
  allLabel = 'All',
  className,
}: FilterPillsProps) {
  const items = [allLabel, ...options];
  const active = value || allLabel;

  return (
    <div className={cn('min-w-0', className)} role="group" aria-label={label}>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {items.map((option) => {
          const selected = active === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option === allLabel ? '' : option)}
              className={cn(
                'relative shrink-0 rounded-full px-4 py-2 text-caption font-semibold transition-colors duration-300',
                selected ? 'text-white' : 'text-muted hover:text-navy-deep',
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`filter-${label}`}
                  className="absolute inset-0 rounded-full bg-navy-deep"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-hairline bg-white" />
              )}
              <span className="relative z-10 whitespace-nowrap">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  className?: string;
}

/** Compact select used where pills would overflow (locations, departments). */
export function FilterSelect({
  label,
  options,
  value,
  onChange,
  allLabel = 'All',
  className,
}: FilterSelectProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'h-12 w-full appearance-none rounded-field border border-hairline bg-white pl-4 pr-10 text-body-sm text-charcoal shadow-raised',
          'transition-colors focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10',
        )}
      >
        <option value="">
          {label}: {allLabel}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
    </div>
  );
}

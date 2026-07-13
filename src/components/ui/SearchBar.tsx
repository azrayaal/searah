import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder, label, className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <label htmlFor="collection-search" className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        id="collection-search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'h-12 w-full rounded-field border border-hairline bg-white pl-11 pr-10 text-body-sm text-charcoal shadow-raised',
          'placeholder:text-muted/60 transition-shadow duration-300',
          'focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10',
          '[&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy-deep/5 hover:text-navy-deep"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Unique across the page — shared by the sliding indicator's layoutId. */
  layoutKey: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Tabs({ items, value, onChange, layoutKey, tone = 'light', className }: TabsProps) {
  const dark = tone === 'dark';

  return (
    <div
      role="tablist"
      aria-label="Sections"
      className={cn(
        'no-scrollbar flex gap-1 overflow-x-auto border-b',
        dark ? 'border-white/15' : 'border-hairline',
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative shrink-0 whitespace-nowrap px-4 py-3 text-nav transition-colors duration-300 md:px-5',
              selected
                ? dark
                  ? 'text-white'
                  : 'text-navy-deep'
                : dark
                  ? 'text-white/55 hover:text-white'
                  : 'text-muted hover:text-navy-deep',
            )}
          >
            {item.label}
            {typeof item.count === 'number' ? (
              <span className={cn('ml-2 text-[0.7rem]', dark ? 'text-white/40' : 'text-muted/70')}>
                {item.count}
              </span>
            ) : null}
            {selected ? (
              <motion.span
                layoutId={layoutKey}
                className={cn(
                  'absolute inset-x-3 -bottom-px h-0.5 rounded-full',
                  dark ? 'bg-ember' : 'bg-ocean',
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

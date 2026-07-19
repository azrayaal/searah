import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/lib/i18n';

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
  /**
   * `underline` is the default ruled row. `pill` swaps the rule for a rounded chip that
   * slides behind the active tab — the same treatment as the primary nav pill, for rails
   * that float over content rather than sitting on a section edge.
   */
  variant?: 'underline' | 'pill';
  className?: string;
}

export function Tabs({
  items,
  value,
  onChange,
  layoutKey,
  tone = 'light',
  variant = 'underline',
  className,
}: TabsProps) {
  const dark = tone === 'dark';
  const pill = variant === 'pill';
  const t = useTranslation();

  return (
    <div
      role="tablist"
      aria-label={t('Sections')}
      className={cn(
        'no-scrollbar flex overflow-x-auto',
        pill ? 'gap-0.5' : 'gap-1 border-b',
        !pill && (dark ? 'border-white/15' : 'border-hairline'),
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
              'relative shrink-0 whitespace-nowrap text-nav transition-colors duration-300',
              pill ? 'rounded-xl px-4 py-2' : 'px-4 py-3 md:px-5',
              selected
                ? dark
                  ? 'text-white'
                  : pill
                    ? 'text-ocean'
                    : 'text-navy-deep'
                : dark
                  ? 'text-white/55 hover:text-white'
                  : 'text-muted hover:text-navy-deep',
            )}
          >
            {/* The chip is painted behind the label, not around it: as a sibling it would
                either cover the text or need a z-index race to sit under it. */}
            {selected ? (
              <motion.span
                layoutId={layoutKey}
                className={cn(
                  'absolute',
                  pill
                    ? cn('inset-0 rounded-xl', dark ? 'bg-white/15' : 'bg-white shadow-raised')
                    : cn('inset-x-3 -bottom-px h-0.5 rounded-full', dark ? 'bg-ember' : 'bg-ocean'),
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            ) : null}

            {/* Lifted into its own stacking context so the chip cannot paint over it. */}
            <span className="relative">
              {t(item.label)}
              {typeof item.count === 'number' ? (
                <span className={cn('ml-2 text-[0.7rem]', dark ? 'text-white/40' : 'text-muted/70')}>
                  {item.count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

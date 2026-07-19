import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LANGUAGES, useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

/**
 * Language control.
 *
 * Shares the navbar's two-state chrome — translucent over the hero, frosted white once
 * scrolled — so it travels with the rest of the bar instead of reading as a separate
 * object bolted on.
 *
 * The chevron is not decoration: a globe alone says "language exists somewhere here"
 * but not that this is a menu. The current language is spelled out beside it from `sm`
 * up for the same reason — an icon cannot tell you which language you are already in.
 */
export function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((entry) => entry.code === language) ?? LANGUAGES[0];

  // Dismiss on outside click and on Escape — a menu that can only be closed by picking
  // something is a trap, especially for a control the user may have opened by accident.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('Change language')}
        title={t('Change language')}
        className={cn(
          'flex h-12 items-center gap-1.5 rounded-xl px-3 ring-1 backdrop-blur-xl transition-colors duration-500',
          scrolled
            ? 'bg-white/70 text-navy-deep shadow-lifted ring-white/70 hover:bg-white hover:text-ocean'
            : 'bg-white/10 text-navy-deep ring-white/20 hover:bg-white/20',
        )}
      >
        <Globe className="h-[18px] w-[18px] shrink-0" aria-hidden />
        <span className="hidden text-nav sm:inline">{current.short}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            aria-label={t('Language')}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: EASE }}
            // Right-aligned: the control sits at the end of the bar, so a left-aligned
            // panel would hang off the viewport on narrow screens.
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 overflow-hidden rounded-card border border-hairline bg-white p-1 shadow-lifted"
          >
            {LANGUAGES.map((option) => {
              const selected = option.code === language;

              return (
                <li key={option.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setLanguage(option.code);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      selected ? 'bg-sky-faint text-ocean' : 'text-navy-deep hover:bg-sky-faint/60',
                    )}
                  >
                    <span className="w-7 shrink-0 text-caption font-semibold">{option.short}</span>
                    <span className="min-w-0 flex-1 truncate text-body-sm">{option.label}</span>
                    {selected ? <Check className="h-4 w-4 shrink-0" aria-hidden /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

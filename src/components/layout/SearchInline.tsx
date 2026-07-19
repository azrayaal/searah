import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { search, type SearchEntry } from '@/lib/searchIndex';
import { Icon } from '@/lib/icons';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

interface SearchInlineProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  scrolled: boolean;
}

/** Suggested entry points before the user has typed anything. */
const STARTERS = [
  { label: 'Emergency contacts', href: '/emergency' },
  { label: 'Service portal', href: '/services' },
  { label: 'Employee directory', href: '/directory' },
  { label: 'Organisation chart', href: '/organisation' },
];

/**
 * Search that grows out of its own icon rather than taking over the screen.
 *
 * The modal this replaces put a scrim over the page and pulled focus to the middle of
 * the viewport — a heavy gesture for what is usually a quick lookup, and one that hid
 * the very navigation the user was reasoning about. Expanding in place keeps the bar,
 * the page and the reader's position all intact.
 *
 * The width animates rather than the container swapping: the icon has to remain the
 * same object throughout, or the control appears to vanish and a different one appears.
 */
export function SearchInline({ open, onOpen, onClose, scrolled }: SearchInlineProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const t = useTranslation();

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setCursor(0);
      return;
    }

    // Focus once the width transition has started, not before: focusing a 48px-wide
    // input scrolls the caret into view and jerks the bar sideways on mobile.
    const id = window.setTimeout(() => input.current?.focus(), 180);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Collapse when the pointer goes elsewhere. Without this the expanded field would sit
  // open across a navigation, competing with the page it just loaded.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onClose();
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    navigate(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((prev) => (prev + 1) % results.length);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((prev) => (prev - 1 + results.length) % results.length);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = results[cursor];
      if (target) go(target.href);
    }
  };

  // Results arrive flat and pre-ranked; grouping is presentation only, so the visual
  // order still follows the ranking rather than the group headings.
  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const item of results) {
      const bucket = map.get(item.group) ?? [];
      bucket.push(item);
      map.set(item.group, bucket);
    }
    return [...map.entries()];
  }, [results]);

  return (
    <div ref={root} className="relative shrink-0" onKeyDown={onKeyDown}>
      <motion.div
        layout
        transition={{ duration: 0.32, ease: EASE }}
        className={cn(
          'flex h-12 items-center gap-2 overflow-hidden rounded-xl ring-1 backdrop-blur-xl transition-colors duration-500',
          open ? 'w-[min(22rem,calc(100vw-8rem))] px-3' : 'w-12 justify-center',
          scrolled || open
            ? 'bg-white/70 text-navy-deep shadow-lifted ring-white/70'
            : 'bg-white/10 text-navy-deep ring-white/20 hover:bg-white/20',
        )}
      >
        <button
          type="button"
          onClick={() => (open ? input.current?.focus() : onOpen())}
          aria-label={t('Search Searah')}
          aria-expanded={open}
          title="Search — ⌘K"
          className={cn(
            'flex shrink-0 items-center justify-center transition-colors',
            open ? 'text-muted' : 'h-12 w-12 hover:text-ocean',
          )}
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        {/* Kept mounted and width-animated: unmounting the input would drop focus and
            the typed query every time the field collapsed by a hair. */}
        <input
          ref={input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('Search people, assets, services, documents…')}
          aria-label={t('Search Searah')}
          tabIndex={open ? 0 : -1}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-body-sm text-navy-deep outline-none placeholder:text-muted',
            !open && 'pointer-events-none w-0 opacity-0',
          )}
        />

        {open ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close search')}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy-deep/5 hover:text-navy-deep"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE }}
            // Anchored to the field's right edge so it never runs off the viewport.
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(30rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-hairline bg-white shadow-lifted"
          >
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {query.trim().length < 2 ? (
                <div className="p-5">
                  <p className="text-caption font-semibold uppercase tracking-[0.1em] text-muted">
                    {t('Jump to')}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {STARTERS.map((starter) => (
                      <li key={starter.href}>
                        <button
                          type="button"
                          onClick={() => go(starter.href)}
                          className="rounded-full border border-hairline px-4 py-2 text-caption font-semibold text-navy-deep transition-colors hover:border-ocean hover:text-ocean"
                        >
                          {t(starter.label)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length === 0 ? (
                <p className="p-8 text-center text-body-sm text-muted">
                  Nothing matches “{query.trim()}”.
                </p>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="border-b border-hairline last:border-0">
                    <p className="px-5 pb-2 pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        const index = results.indexOf(item);
                        const active = index === cursor;

                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onMouseMove={() => setCursor(index)}
                              onClick={() => go(item.href)}
                              className={cn(
                                'flex w-full items-center gap-4 px-5 py-3 text-left transition-colors',
                                active ? 'bg-sky-faint' : 'hover:bg-sky-faint/60',
                              )}
                            >
                              <span
                                className={cn(
                                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
                                  active ? 'bg-ocean text-white' : 'bg-navy-deep/5 text-muted',
                                )}
                                aria-hidden
                              >
                                <Icon name={item.icon} className="h-[16px] w-[16px]" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-body-sm font-semibold text-navy-deep">
                                  {item.title}
                                </span>
                                <span className="block truncate text-caption text-muted">
                                  {item.subtitle}
                                </span>
                              </span>

                              {active ? (
                                <CornerDownLeft className="h-4 w-4 shrink-0 text-ocean" aria-hidden />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-hairline bg-sky-faint px-5 py-3 text-caption text-muted">
              <span>
                ↑ ↓ {t('to navigate')} · ⏎ {t('to open')} · Esc {t('to close')}
              </span>
              <span>{results.length ? `${results.length} ${t('results')}` : t('Search everything')}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

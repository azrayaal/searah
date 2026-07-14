import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { search, type SearchEntry } from '@/lib/searchIndex';
import { useLockBodyScroll } from '@/hooks';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

/** Suggested entry points before the user has typed anything. */
const STARTERS = [
  { label: 'Emergency contacts', href: '/emergency' },
  { label: 'Service portal', href: '/services' },
  { label: 'Employee directory', href: '/directory' },
  { label: 'Organisation chart', href: '/organisation' },
];

/**
 * Search across every collection at once — entities, people, assets, services, apps,
 * documents, news, FAQ. The site had six local search boxes and no way to search the
 * site itself; this is that missing front door.
 */
export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useLockBodyScroll(open);

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    // Focus after the panel has mounted, or the browser hands focus back to the trigger.
    const id = window.setTimeout(() => input.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => setCursor(0), [query]);

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
      go(results[cursor].href);
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
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy-deep/40 backdrop-blur-[2px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search Searah"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-card border border-hairline bg-white shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-5">
              <Search className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
              <input
                ref={input}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search people, assets, services, documents…"
                aria-label="Search Searah"
                className="h-14 min-w-0 flex-1 bg-transparent text-body-sm text-navy-deep outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy-deep/5 hover:text-navy-deep"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto overscroll-contain">
              {query.trim().length < 2 ? (
                <div className="p-5">
                  <p className="text-caption font-semibold uppercase tracking-[0.1em] text-muted">
                    Jump to
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {STARTERS.map((starter) => (
                      <li key={starter.href}>
                        <button
                          type="button"
                          onClick={() => go(starter.href)}
                          className="rounded-full border border-hairline px-4 py-2 text-caption font-semibold text-navy-deep transition-colors hover:border-ocean hover:text-ocean"
                        >
                          {starter.label}
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
                                  active
                                    ? 'bg-ocean text-white'
                                    : 'bg-navy-deep/5 text-muted',
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
                                <CornerDownLeft
                                  className="h-4 w-4 shrink-0 text-ocean"
                                  aria-hidden
                                />
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
              <span>↑ ↓ to navigate · ⏎ to open · Esc to close</span>
              <span>{results.length ? `${results.length} results` : 'Search everything'}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

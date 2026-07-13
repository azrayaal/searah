import { useState } from 'react';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, PhoneCall } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import type { NavItem } from '@/types';

interface MobileNavProps {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}

/** Accordion navigation for tablet and mobile. Same data as the desktop mega menu. */
export function MobileNav({ items, open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="right">
      <nav aria-label="Mobile" className="flex h-full flex-col">
        <ul className="divide-y divide-hairline">
          {items.map((item) => {
            const isOpen = expanded === item.label;

            return (
              <li key={item.label}>
                {item.columns ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className={cn(
                          'text-[1.0625rem] font-bold transition-colors',
                          isOpen ? 'text-ocean' : 'text-navy-deep',
                        )}
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-muted transition-transform duration-300',
                          isOpen && 'rotate-180 text-ocean',
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden bg-sky-faint"
                        >
                          <div className="space-y-6 px-6 py-6">
                            {item.columns.map((column) => (
                              <div key={column.title}>
                                <p className="eyebrow mb-3 text-ocean">{column.title}</p>
                                <ul className="space-y-3">
                                  {column.links.map((link) => (
                                    <li key={link.href + link.label}>
                                      <PrefetchLink
                                        to={link.href}
                                        onClick={onClose}
                                        className="block py-1 text-body-sm text-charcoal transition-colors hover:text-ocean"
                                      >
                                        {link.label}
                                      </PrefetchLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                ) : (
                  <PrefetchLink
                    to={item.href ?? '/'}
                    onClick={onClose}
                    className="block px-6 py-5 text-[1.0625rem] font-bold text-navy-deep transition-colors hover:text-ocean"
                  >
                    {item.label}
                  </PrefetchLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-hairline p-6">
          <PrefetchLink
            to="/emergency"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-btn bg-crimson px-6 py-3.5 text-body-sm font-semibold text-white transition-colors hover:bg-[#7d0925]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Emergency contacts
          </PrefetchLink>
          <p className="mt-4 text-center text-caption text-muted">{site.descriptor}</p>
        </div>
      </nav>
    </Drawer>
  );
}

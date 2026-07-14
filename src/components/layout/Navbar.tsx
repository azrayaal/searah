import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, PhoneCall, Search } from 'lucide-react';
// import { Logo } from './Logo';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchPalette } from './SearchPalette';
import { Container } from '@/components/ui/Container';
import { useScrollDirection } from '@/hooks';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import type { Commodity, NavItem } from '@/types';

interface NavbarProps {
  items: NavItem[];
  /** Still supplied by the layout — re-enable the utility rail below to consume it. */
  commodities: Commodity[];
  /** Lets sticky page furniture below the bar track the retraction. */
  onHiddenChange?: (hidden: boolean) => void;
}

export function Navbar({ items, onHiddenChange }: NavbarProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { direction, scrolled } = useScrollDirection();
  const { pathname } = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);

  // Close any open panel when the route changes.
  useEffect(() => {
    setOpenLabel(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenLabel(null);

      // ⌘K / Ctrl-K — the shortcut people already try before they look for the icon.
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // A short grace period lets the pointer cross the gap between trigger and panel.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), 140);
  };

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const activeItem = items.find((item) => item.label === openLabel);
  const hidden = direction === 'down' && !openLabel;

  useEffect(() => onHiddenChange?.(hidden), [hidden, onHiddenChange]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? 'calc(-100% + 0px)' : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={scheduleClose}
      >
        {/* Utility rail — market prices and the emergency line */}
        {/* <div className="hidden bg-navy-deep text-white lg:block">
          <Container className="flex h-9 items-center justify-between gap-8">
            <MarketTicker commodities={commodities} />

            <div className="flex shrink-0 items-center gap-5">
              <PrefetchLink
                to="/emergency"
                className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-ember"
              >
                <PhoneCall className="h-3 w-3" aria-hidden />
                Emergency
              </PrefetchLink>
              <PrefetchLink
                to="/directory"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
              >
                Directory
              </PrefetchLink>
            </div>
          </Container>
        </div> */}

        {/* Primary bar */}
        <div
          className={cn(
            'border-b bg-white/95 backdrop-blur-md transition-shadow duration-300',
            scrolled ? 'border-hairline shadow-raised' : 'border-transparent',
          )}
        >
          <Container className="flex h-[74px] items-center justify-between gap-6">
            {/* <Logo /> */}
              <a href="/">
            <div className="flex items-center">
                <img src="/favicon.png" alt="Searah Logo" className="h-16 shrink-0" />
                <img src="/text_searah.png" alt="Searah Logo" className="h-14 shrink-0" />
            </div>
              </a>

            <nav aria-label="Primary" className="hidden h-full items-center gap-1 lg:flex">
              {items.map((item) => {
                const open = openLabel === item.label;
                const isActive = item.href ? pathname.startsWith(item.href) : false;

                return (
                  <div
                    key={item.label}
                    className="h-full"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenLabel(item.columns ? item.label : null);
                    }}
                  >
                    {item.href ? (
                      <PrefetchLink
                        to={item.href}
                        aria-expanded={item.columns ? open : undefined}
                        className={cn(
                          'flex h-full items-center gap-1 px-3 text-nav transition-colors',
                          open || isActive ? 'text-ocean' : 'text-navy-deep hover:text-ocean',
                        )}
                      >
                        {item.label}
                        {item.columns ? (
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-300',
                              open && 'rotate-180',
                            )}
                            aria-hidden
                          />
                        ) : null}
                      </PrefetchLink>
                    ) : (
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenLabel(open ? null : item.label)}
                        className={cn(
                          'flex h-full items-center gap-1 px-3 text-nav transition-colors',
                          open ? 'text-ocean' : 'text-navy-deep hover:text-ocean',
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-300',
                            open && 'rotate-180',
                          )}
                          aria-hidden
                        />
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Searah"
                className="flex h-11 items-center gap-2 rounded-full px-3 text-navy-deep transition-colors hover:bg-navy-deep/5 hover:text-ocean"
              >
                <Search className="h-[18px] w-[18px]" />
                <span className="hidden rounded border border-hairline px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted lg:inline">
                  ⌘K
                </span>
              </button>

              <PrefetchLink
                to="/emergency"
                aria-label="Emergency contacts"
                className="flex h-11 w-11 items-center justify-center rounded-full text-crimson transition-colors hover:bg-crimson/10 lg:hidden"
              >
                <PhoneCall className="h-[18px] w-[18px]" />
              </PrefetchLink>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-navy-deep transition-colors hover:bg-navy-deep/5 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </Container>

          <AnimatePresence>
            {activeItem ? (
              <div onMouseEnter={cancelClose}>
                <MegaMenu item={activeItem} onNavigate={() => setOpenLabel(null)} />
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Scrim behind the open mega menu */}
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-deep/25 backdrop-blur-[2px]"
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <MobileNav items={items} open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

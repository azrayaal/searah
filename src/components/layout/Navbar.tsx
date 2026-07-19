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
}

export function Navbar({ items }: NavbarProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrolled } = useScrollDirection();
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

  return (
    <>
      {/* The bar never retracts. Hiding it on scroll-down saved 74px of viewport and cost
          the reader the one control that is supposed to be reachable at any moment. */}
      <header
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

        {/* The bar is always transparent: the frosted pill is the only chrome, so the
            navigation keeps one form the whole way down the page. */}
        <div>
          <Container className="relative flex h-[83.77px] pt-6 items-center justify-between gap-6">
            {/* `iconsearah.png` is pure white artwork, so it reads only against the dark
                hero behind an unscrolled bar. Scrolled, the mark steps aside entirely and
                the menu takes the centre — so there is no white-on-white logo to solve. */}
            <PrefetchLink
              to="/"
              aria-label="Searah — home"
              className={cn(
                'flex shrink-0 items-center transition-opacity duration-500 pt-6',
                scrolled && 'pointer-events-none opacity-0',
              )}
            >
              <img src="/iconsearah.png" alt="" aria-hidden className="h-20 w-auto shrink-0" />
            </PrefetchLink>

            {/* The links ride in their own pill so they stay legible over photography. At
                the top it sits against the search button; scrolled, it centres in the bar. */}
            <motion.nav
              aria-label="Primary"
              layout
              transition={{ layout: { duration: 0.55, ease: EASE } }}
              className={cn(
                'hidden items-center gap-0.5 rounded-xl px-2 py-1.5 ring-1 backdrop-blur-xl transition-colors duration-500 lg:flex',
                // Both branches set a position, which is what anchors the panel below.
                // `relative` must NOT be applied unconditionally: Tailwind emits it after
                // `.absolute`, so it would win the cascade and the pill would never centre.
                // Centred with auto margins, not translate: framer's `layout` writes its
                // own inline transform, which would silently override a Tailwind translate
                // and leave the pill hanging off the centre line by half its width.
                scrolled
                  ? 'absolute inset-0 m-auto h-fit w-fit bg-white/70 shadow-lifted ring-white/70'
                  // `ml-auto` pulls the pill off the logo and up against the search button
                  : 'relative ml-auto bg-white/30 backdrop-blur-2xl ring-white/40 shadow-xl',
              )}
            >
              {items.map((item) => {
                const open = openLabel === item.label;
                const isActive = item.href ? pathname.startsWith(item.href) : false;
                const highlighted = open || isActive;

                const tone = scrolled
                  ? highlighted
                    ? 'bg-white text-ocean shadow-raised'
                    : 'text-navy-deep hover:bg-white/70 hover:text-ocean'
                  : highlighted
                    ? 'bg-white/20 text-navy-deep'
                    : 'text-navy-deep/85 hover:bg-white/10 hover:text-navy-deep';

                return (
                  <div
                    key={item.label}
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
                          'flex items-center gap-1 rounded-xl px-4 py-2 text-nav transition-colors duration-300',
                          tone,
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
                          'flex items-center gap-1 rounded-xl px-4 py-2 text-nav transition-colors duration-300',
                          tone,
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

              {/* The panel hangs off the pill, so it inherits the pill's width and can
                  never spill wider than the bar that opened it. */}
              <AnimatePresence>
                {activeItem ? (
                  <div onMouseEnter={cancelClose}>
                    <MegaMenu item={activeItem} onNavigate={() => setOpenLabel(null)} />
                  </div>
                ) : null}
              </AnimatePresence>
            </motion.nav>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Searah"
                title="Search — ⌘K"
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl ring-1 backdrop-blur-xl transition-colors duration-500',
                  scrolled
                    ? 'bg-white/70 text-navy-deep shadow-lifted ring-white/70 hover:bg-white hover:text-ocean'
                    : 'bg-white/10 text-navy-deep ring-white/20 hover:bg-white/20',
                )}
              >
                <Search className="h-[18px] w-[18px]" />
              </button>

              <PrefetchLink
                to="/emergency"
                aria-label="Emergency contacts"
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl ring-1 backdrop-blur-xl transition-colors duration-500 lg:hidden',
                  scrolled
                    ? 'bg-white/70 text-crimson shadow-lifted ring-white/70 hover:bg-white'
                    : 'bg-white/10 text-white ring-white/20 hover:bg-white/20',
                )}
              >
                <PhoneCall className="h-[18px] w-[18px]" />
              </PrefetchLink>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl ring-1 backdrop-blur-xl transition-colors duration-500 lg:hidden',
                  scrolled
                    ? 'bg-white/70 text-navy-deep shadow-lifted ring-white/70 hover:bg-white'
                    : 'bg-white/10 text-white ring-white/20 hover:bg-white/20',
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </Container>
        </div>
      </header>

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

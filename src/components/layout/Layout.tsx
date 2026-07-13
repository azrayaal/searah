import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PageSkeleton } from './PageSkeleton';
import { RouteProgress } from './RouteProgress';
import { ScrollToTop } from './ScrollToTop';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { navigation } from '@/data/navigation';
import { footer } from '@/data/footer';
import { market } from '@/data/homepage';
import { prefetchAllRoutes } from '@/routes/pages';
import { EASE } from '@/lib/motion';

export function Layout() {
  const { pathname } = useLocation();

  // Once the first page is on screen, quietly pull the remaining chunks so every
  // hub-to-hub jump afterwards is a memory hit rather than a network round trip.
  useEffect(prefetchAllRoutes, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-navy-deep focus:px-5 focus:py-3 focus:text-body-sm focus:text-white"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <ScrollProgress />
      <RouteProgress />
      <Navbar items={navigation} commodities={market.commodities} />

      <main id="main" className="flex-1">
        {/* The exit is deliberately much shorter than the entrance: a long fade-out is
            dead time where the user stares at an empty viewport waiting for the swap. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: 'linear' } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer content={footer} />
    </div>
  );
}

import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { navigation } from '@/data/navigation';
import { footer } from '@/data/footer';
import { market } from '@/data/homepage';
import { EASE } from '@/lib/motion';

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-ocean" />
    </div>
  );
}

export function Layout() {
  const { pathname } = useLocation();

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
      <Navbar items={navigation} commodities={market.commodities} />

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer content={footer} />
    </div>
  );
}

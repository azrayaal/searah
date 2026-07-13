import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { NavbarHiddenContext } from './navbarVisibility';
import { Footer } from './Footer';
import { PageSkeleton } from './PageSkeleton';
import { RouteProgress } from './RouteProgress';
import { ScrollToTop } from './ScrollToTop';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { navigation } from '@/data/navigation';
import { footer } from '@/data/footer';
import { market } from '@/data/homepage';
import { prefetchAllRoutes } from '@/routes/pages';

export function Layout() {
  const { pathname } = useLocation();
  const [navHidden, setNavHidden] = useState(false);

  // Once the first page is on screen, quietly pull the remaining chunks so every
  // hub-to-hub jump afterwards is a memory hit rather than a network round trip.
  useEffect(prefetchAllRoutes, []);

  return (
    <NavbarHiddenContext.Provider value={navHidden}>
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
      <Navbar
        items={navigation}
        commodities={market.commodities}
        onHiddenChange={setNavHidden}
      />

      <main id="main" className="flex-1">
        {/* The entrance is a CSS animation, not a motion component. A JS fade that never
            gets its first frame — which happened on the heavier pages, where mounting the
            tree blew the frame budget — strands the whole page at `opacity: 0` until some
            unrelated repaint (opening DevTools, resizing) shakes it loose. CSS animates off
            the compositor and, worst case, simply lands on the resting style: visible. */}
        <div key={pathname} className="animate-page-in">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <Footer content={footer} />
    </div>
    </NavbarHiddenContext.Provider>
  );
}

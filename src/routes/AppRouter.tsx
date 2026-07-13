import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageSkeleton } from '@/components/layout/PageSkeleton';
import { pages, type PageLoader } from './pages';

/**
 * Route-level `lazy` rather than `React.lazy`: the router resolves the chunk *before*
 * it swaps the view, so the outgoing page stays on screen — with the progress bar
 * running — instead of collapsing into an empty Suspense fallback.
 */
const page = (load: PageLoader) => async () => ({ Component: (await load()).default });

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    hydrateFallbackElement: <PageSkeleton />,
    children: [
      { index: true, lazy: page(pages.home) },
      { path: 'about', lazy: page(pages.about) },
      { path: 'assets', lazy: page(pages.assets) },
      { path: 'entity/:code', lazy: page(pages.entity) },
      { path: 'newsletter', lazy: page(pages.newsletter) },
      { path: 'newsletter/:slug', lazy: page(pages.article) },
      { path: 'organisation', lazy: page(pages.organisation) },
      { path: 'resources', lazy: page(pages.resources) },
      { path: 'directory', lazy: page(pages.directory) },
      { path: 'services', lazy: page(pages.services) },
      { path: 'emergency', lazy: page(pages.emergency) },
      { path: 'legal/:slug', lazy: page(pages.legal) },
      { path: 'faq', lazy: page(pages.faq) },
      { path: '*', lazy: page(pages.notFound) },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

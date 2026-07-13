import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

/** Every page is code-split; the layout shell and data core stay in the main chunk. */
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));
const AssetsPage = lazy(() => import('@/pages/Assets/AssetsPage'));
const EntityPage = lazy(() => import('@/pages/Entity/EntityPage'));
const NewsletterPage = lazy(() => import('@/pages/Newsletter/NewsletterPage'));
const ArticlePage = lazy(() => import('@/pages/Newsletter/ArticlePage'));
const OrganisationPage = lazy(() => import('@/pages/Organisation/OrganisationPage'));
const ResourcesPage = lazy(() => import('@/pages/Resources/ResourcesPage'));
const DirectoryPage = lazy(() => import('@/pages/Directory/DirectoryPage'));
const ServicesPage = lazy(() => import('@/pages/Services/ServicesPage'));
const EmergencyPage = lazy(() => import('@/pages/Emergency/EmergencyPage'));
const LegalPage = lazy(() => import('@/pages/Legal/LegalPage'));
const FaqPage = lazy(() => import('@/pages/Faq/FaqPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'assets', element: <AssetsPage /> },
      { path: 'entity/:code', element: <EntityPage /> },
      { path: 'newsletter', element: <NewsletterPage /> },
      { path: 'newsletter/:slug', element: <ArticlePage /> },
      { path: 'organisation', element: <OrganisationPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'directory', element: <DirectoryPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'emergency', element: <EmergencyPage /> },
      { path: 'legal/:slug', element: <LegalPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

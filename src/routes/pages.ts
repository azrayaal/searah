import type { ComponentType } from 'react';

type PageModule = { default: ComponentType };
export type PageLoader = () => Promise<PageModule>;

/**
 * One loader per page, declared once so the router, the hover prefetcher and the
 * idle warm-up all pull the same dynamic import — the module registry dedupes it,
 * so a chunk already pulled on hover resolves instantly on click.
 */
export const pages = {
  home: () => import('@/pages/Home/HomePage'),
  about: () => import('@/pages/About/AboutPage'),
  assets: () => import('@/pages/Assets/AssetsPage'),
  entity: () => import('@/pages/Entity/EntityPage'),
  newsletter: () => import('@/pages/Newsletter/NewsletterPage'),
  article: () => import('@/pages/Newsletter/ArticlePage'),
  organisation: () => import('@/pages/Organisation/OrganisationPage'),
  resources: () => import('@/pages/Resources/ResourcesPage'),
  directory: () => import('@/pages/Directory/DirectoryPage'),
  services: () => import('@/pages/Services/ServicesPage'),
  serviceCategory: () => import('@/pages/Services/ServiceCategoryPage'),
  emergency: () => import('@/pages/Emergency/EmergencyPage'),
  legal: () => import('@/pages/Legal/LegalPage'),
  faq: () => import('@/pages/Faq/FaqPage'),
  notFound: () => import('@/pages/NotFound/NotFoundPage'),
} satisfies Record<string, PageLoader>;

/** Resolves an in-app href to the chunk it will need. */
function loaderFor(href: string): PageLoader | null {
  if (!href.startsWith('/')) return null;

  const [segment, child] = href.split(/[?#]/)[0].split('/').filter(Boolean);

  switch (segment) {
    case undefined:
      return pages.home;
    case 'about':
      return pages.about;
    case 'assets':
      return pages.assets;
    case 'entity':
      return pages.entity;
    case 'newsletter':
      return child ? pages.article : pages.newsletter;
    case 'organisation':
      return pages.organisation;
    case 'resources':
      return pages.resources;
    case 'directory':
      return pages.directory;
    case 'services':
      return child ? pages.serviceCategory : pages.services;
    case 'emergency':
      return pages.emergency;
    case 'legal':
      return pages.legal;
    case 'faq':
      return pages.faq;
    default:
      return null;
  }
}

const started = new Set<PageLoader>();

/** Fire-and-forget: pull a page's chunk before the user commits to the click. */
export function prefetchRoute(href: string) {
  const loader = loaderFor(href);
  if (!loader || started.has(loader)) return;
  started.add(loader);
  loader().catch(() => started.delete(loader));
}

/**
 * Warms every remaining page chunk once the browser is idle, so hub-to-hub jumps
 * cost nothing. Skipped on data-saver / 2G, where the bandwidth is not ours to spend.
 */
export function prefetchAllRoutes() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return;

  const warm = () => {
    for (const loader of Object.values(pages) as PageLoader[]) {
      if (started.has(loader)) continue;
      started.add(loader);
      loader().catch(() => started.delete(loader));
    }
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(warm, { timeout: 3000 });
  } else {
    window.setTimeout(warm, 1200);
  }
}

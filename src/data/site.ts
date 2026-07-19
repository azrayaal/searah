import type { SiteConfig } from '@/types';

/** Shared, brand-level constants. Swap wholesale for a CMS "global" singleton. */
export const site: SiteConfig = {
  name: 'Searah',
  legalName: 'Searah Energy Holdings',
  tagline: 'Energy that moves two nations forward',
  descriptor: '',
  description:
    'Searah is an upstream oil and gas joint venture between Eni and PETRONAS, operating 19 producing, development and exploration assets across Indonesia and Malaysia.',
  url: 'https://searah.com',
  locale: 'en_GB',
  twitter: '@searah',
  logo: {
    withText: '/logo_with_text.png',
    mark: '/iconsearah.png',
  },
};

/** Stable, one-line facts reused by the hero rail, About and the footer. */
export const companyFacts = {
  assets: { total: 19, indonesia: 14, malaysia: 5 },
  production: { current: '300,000+', target: '500,000+', unit: 'BOE/D' },
  investment: 'USD 20 billion',
  investmentHorizon: 'over the next five years',
  shareholders: [
    { name: 'Eni', share: '50%' },
    { name: 'PETRONAS', share: '50%' },
  ],
} as const;

import type { HomepageContent, MarketSummary } from '@/types';

export const market: MarketSummary = {
  headline: 'Crude holds firm as Asian demand tightens the gas balance',
  narrative:
    'Brent is trading in a narrow band as OPEC+ compliance offsets softer refinery runs, while Asian LNG demand keeps regional gas premiums elevated into the quarter.',
  updatedAt: '2026-07-13T08:30:00+07:00',
  commodities: [
    {
      id: 'brent',
      name: 'ICE Brent Crude',
      symbol: 'BRN',
      price: 74.16,
      currency: 'USD',
      unit: '/ barrel',
      change: 0.82,
      changePercent: 1.12,
      series: [71.4, 71.9, 72.6, 72.2, 73.1, 73.4, 72.9, 73.6, 74.2, 73.9, 74.5, 74.16],
      updatedAt: '2026-07-13T08:30:00+07:00',
    },
    {
      id: 'wti',
      name: 'NYMEX WTI',
      symbol: 'CL',
      price: 70.48,
      currency: 'USD',
      unit: '/ barrel',
      change: 0.61,
      changePercent: 0.87,
      series: [68.2, 68.9, 69.4, 69.1, 69.8, 70.2, 69.7, 70.1, 70.6, 70.2, 70.9, 70.48],
      updatedAt: '2026-07-13T08:30:00+07:00',
    },
    {
      id: 'gas',
      name: 'Henry Hub Natural Gas',
      symbol: 'NG',
      price: 3.42,
      currency: 'USD',
      unit: '/ MMBtu',
      change: -0.07,
      changePercent: -2.01,
      series: [3.62, 3.58, 3.66, 3.51, 3.49, 3.55, 3.47, 3.44, 3.51, 3.46, 3.49, 3.42],
      updatedAt: '2026-07-13T08:30:00+07:00',
    },
    {
      id: 'jkm',
      name: 'JKM LNG Spot',
      symbol: 'JKM',
      price: 12.85,
      currency: 'USD',
      unit: '/ MMBtu',
      change: 0.34,
      changePercent: 2.72,
      series: [11.8, 12.0, 11.9, 12.2, 12.4, 12.3, 12.5, 12.6, 12.4, 12.7, 12.9, 12.85],
      updatedAt: '2026-07-13T08:30:00+07:00',
    },
  ],
};

export const homepage: HomepageContent = {
  hero: {
    slides: [
      {
        id: 'hero-1',
        title: 'A Strong Regional Workforce',
        subtitle:
          'Supporting collaboration across Malaysia and Indonesia through one connected workplace that brings every team closer together.',
        image: {
          src: '/assets/header3.png',
          alt: 'Searah offshore production platform at sea',
        },
        cta: { label: 'See more', href: '/about' },
      },
      {
        id: 'hero-2',
        title: 'Safe, Reliable, and Efficient Operations',
        subtitle:
          'Providing seamless access to workplace services, business applications, and operational resources that support excellence every day.',
        image: { src: '/assets/header2.jpeg', alt: 'Offshore facility illuminated at night' },
        cta: { label: 'See more', href: '/about#portfolio' },
      },
      {
        id: 'hero-3',
        title: 'Creating Value Through Our People',
        subtitle:
          'Strengthening collaboration, continuous learning, and employee engagement to support our business and the communities we serve.',
        image: { src: '/media/lng-carrier.jpg', alt: 'LNG carrier departing an export terminal' },
        cta: { label: 'See more', href: '/about#timeline' },
      },
    ],
  },

  glance: {
    image: {
      src: '/assets/about.png',
      alt: 'Searah production facility seen from the air',
    },
    title: 'Powering Sustainable Energy Through Stategic Operation',
    subtitle: 'Delivering reliabel energy solution strategic operations commited investment countries of operation between Indonesia and Malaysia',
    investment: { label: 'Committed investment', value: 'USD 20', unit: 'bn' },
    stats: [
      { value: '19', label: 'Assets under management' },
      { value: '300k', unit: 'BOE/D', label: 'Current production' },
      { value: '2', unit: 'Indonesia · Malaysia', label: 'Countries of operation' },
    ],
  },

  connect: {
    eyebrow: 'Connect',
    title: 'Where to find us, and who to call',
    description:
      'Each operating company answers for its own sites. Start with the entity you need — the group switchboard cannot dispatch a permit query or a journalist.',
  },
  emergency: {
    // Same number the emergency page publishes — a second "emergency number" on the
    // homepage is how people end up dialling the wrong one under pressure.
    label: 'Group Emergency Control Centre — 24/7',
    phone: '+62 21 5000 911',
    caption:
      'The Group Emergency Control Centre is staffed around the clock and answers in under 30 seconds. Report an incident here first, before you report it to anyone else.',
  },
  performance: {
    eyebrow: 'Daily performance',
    title: 'Group operations at a glance',
    description:
      'Consolidated production, safety and efficiency figures across all 19 assets, refreshed every morning at 06:00 WIB from the Integrated Operations Centre.',
    asOf: '2026-07-13T06:00:00+07:00',
    kpis: [
      {
        id: 'kpi-boe',
        label: 'Total production today',
        value: 312480,
        unit: 'BOE/D',
        caption: 'Against a plan of 305,000 BOE/D',
        delta: '+2.4% vs plan',
        trend: 'up',
        icon: 'Gauge',
        progress: 62,
      },
      {
        id: 'kpi-oil',
        label: 'Oil production',
        value: 168240,
        unit: 'BBL/D',
        caption: 'Liquids across 11 producing fields',
        delta: '+1.1% MoM',
        trend: 'up',
        icon: 'Droplets',
      },
      {
        id: 'kpi-gas',
        label: 'Gas production',
        value: 812,
        unit: 'MMSCF/D',
        caption: 'Sales gas delivered to Bontang and Bintulu',
        delta: '−0.6% MoM',
        trend: 'down',
        icon: 'Flame',
      },
      {
        id: 'kpi-safety',
        label: 'Days without LTI',
        value: 412,
        unit: 'days',
        caption: 'Group-wide lost time injury free',
        delta: 'TRIR 0.21',
        trend: 'up',
        icon: 'ShieldCheck',
      },
      {
        id: 'kpi-carbon',
        label: 'Emissions intensity',
        value: 12.4,
        precision: 1,
        unit: 'kg CO₂e/BOE',
        caption: 'Tracking below the 2026 ceiling of 14.0',
        delta: '−9.2% YoY',
        trend: 'down',
        icon: 'Leaf',
      },
      {
        id: 'kpi-efficiency',
        label: 'Operational efficiency',
        value: 96.8,
        precision: 1,
        unit: '%',
        caption: 'Facility uptime across the portfolio',
        delta: '+0.7 pts QoQ',
        trend: 'up',
        icon: 'Activity',
        progress: 97,
      },
    ],
  },

  market,

  entitiesSection: {
    eyebrow: 'Operating entities',
    title: 'Three operating entities, one shared standard',
    description:
      'Every asset in the portfolio is run by one of three entities — each with its own basin, its own engineering culture, and the same safety and emissions standard.',
    cta: { label: 'About the group', href: '/about' },
  },

  assetsSection: {
    eyebrow: 'Asset portfolio',
    title: 'Nineteen assets. Two countries. One operating model.',
    description:
      'Fourteen assets across the Indonesian archipelago and five offshore Malaysia — from mature producing hubs to frontier deepwater exploration.',
    cta: { label: 'Open the full asset register', href: '/assets' },
  },

  newsSection: {
    eyebrow: 'Newsroom',
    title: 'What\'s New at Searah',
    description: 'Discover the latest company news, leadership updates, operational milestones, and employee stories.',
    cta: { label: 'All articles', href: '/newsletter' },
  },

  quickAccess: {
    intro: {
      eyebrow: 'Quick access',
      title: 'Everything the team needs, one click away',
    },
   links: [
    {
      id: 'qa-services',
      label: 'Service Portal',
      description:
        'Submit requests for IT, HR, Finance, Procurement, Facilities, and HSE services.',
      href: '/services',
      icon: 'BriefcaseBusiness',
      image: { src: '/assets/service.png', alt: '' },
      tone: 'slate',
    },
    {
      id: 'qa-directory',
      label: 'People Directory',
      description:
        'Find employees, teams, office locations, and contact information across Searah.',
      href: '/directory',
      icon: 'Users',
      image: { src: '/assets/people.png', alt: '' },
      tone: 'sky',
    },
    {
      id: 'qa-resources',
      label: 'Knowledge Hub',
      description:
        'Access company policies, procedures, templates, forms, and shared documents.',
      href: '/resources',
      icon: 'LibraryBig',
      image: { src: '/assets/knowledge.png', alt: '' },
      tone: 'ocean',
    },
    {
      id: 'qa-org',
      label: 'Organisation Structure',
      description:
        'Explore business units, reporting lines, leadership, and departmental hierarchy.',
      href: '/organisation',
      icon: 'Network',
      image: { src: '/assets/organisasi.png', alt: '' },
      tone: 'ink',
    },
    {
      id: 'qa-emergency',
      label: 'Emergency & HSE',
      description:
        'Quick access to emergency contacts, medical support, and HSE response procedures.',
      href: '/emergency',
      icon: 'ShieldAlert',
      image: { src: '/assets/emergency.png', alt: '' },
      tone: 'rose',
    },
    {
      id: 'qa-faq',
      label: 'Support Centre',
      description:
        'Browse frequently asked questions, user guides, and employee support resources.',
      href: '/faq',
      icon: 'MessagesSquare',
      image: { src: '/assets/support.png', alt: '' },
      tone: 'teal',
    },
  ]
  },

  spotlight: {
    eyebrow: 'Sustainability',
    title: 'Producing more energy from a smaller footprint',
    body: 'Zero routine flaring by 2028, a 50% cut in operational emissions intensity by 2032, and USD 1.4 billion earmarked for electrification, carbon capture and methane abatement across the portfolio. Lower-carbon barrels are not a side project — they are the operating standard.',
    image: { src: '/media/renewables.jpg', alt: 'Renewable energy infrastructure at dusk' },
    cta: { label: 'Read the sustainability approach', href: '/about#values' },
    stats: [
      { label: 'Cut in emissions intensity by 2032', value: '50%' },
      { label: 'Committed to decarbonisation', value: 'USD 1.4bn' },
      { label: 'Routine flaring eliminated by', value: '2028' },
    ],
  },
};

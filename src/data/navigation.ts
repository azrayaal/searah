import type { NavItem, NavLink } from '@/types';

/**
 * Primary navigation. Items with `columns` render as a mega-menu panel;
 * items with only `href` navigate directly.
 */
export const navigation: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    columns: [
      {
        title: 'Overview',
        links: [
          { label: 'Corporate Briefing', href: '/about#overview' },
          { label: 'Vision & Mission', href: '/about#vision' },
          { label: 'Core Values', href: '/about#values' },
          { label: 'Our Journey', href: '/about#timeline' },
          { label: 'Business Portfolio', href: '/about#portfolio' },
          { label: 'Shareholders', href: '/about#shareholders' },
        ],
      },
      {
        title: 'Our Businesses',
        links: [
          { label: 'Exploration', href: '/about#portfolio' },
          { label: 'Field Development', href: '/about#portfolio' },
          { label: 'Production', href: '/about#portfolio' },
          { label: 'Upstream Asset Management', href: '/about#portfolio' },
          { label: 'Asset Portfolio', href: '/assets' },
        ],
      },
      {
        title: 'Entities',
        links: [
          { label: 'Searah Mahakam (SM)', href: '/entity/SM' },
          { label: 'Searah Kutai (SK)', href: '/entity/SK' },
          { label: 'Searah Malaysia Borneo (SMB)', href: '/entity/SMB' },
        ],
      },
      {
        title: 'Our People',
        links: [
          { label: 'Organisation Chart', href: '/organisation' },
          { label: 'Employee Directory', href: '/directory' },
          { label: 'Leadership Team', href: '/about#leadership' },
        ],
      },
    ],
    feature: {
      eyebrow: 'Corporate',
      title: 'Two shareholders. One operating standard.',
      excerpt:
        'How the Eni and PETRONAS joint venture combines deepwater capability with regional depth.',
      href: '/about#shareholders',
      image: { src: '/media/office-hq.jpg', alt: 'Searah corporate headquarters' },
    },
  },
  {
    label: 'News & Publications',
    href: '/newsletter',
    columns: [
      {
        title: 'Newsfeed',
        links: [
          { label: 'All Articles', href: '/newsletter' },
          { label: 'Announcements', href: '/newsletter?category=Corporate' },
          { label: 'Operations Updates', href: '/newsletter?category=Operations' },
          { label: 'People & Culture', href: '/newsletter?category=People' },
        ],
      },
      {
        title: 'Reports',
        links: [
          { label: 'Integrated Report', href: '/resources?category=Documents' },
          { label: 'Production Results', href: '/resources?category=Documents' },
          { label: 'Sustainability Report', href: '/resources?category=Documents' },
        ],
      },
      {
        title: 'By Entity',
        links: [
          { label: 'Searah Mahakam', href: '/newsletter?entity=SM' },
          { label: 'Searah Kutai', href: '/newsletter?entity=SK' },
          { label: 'Searah Malaysia Borneo', href: '/newsletter?entity=SMB' },
        ],
      },
    ],
  },
  {
    label: 'Operations',
    href: '/assets',
    columns: [
      {
        title: 'Assets',
        links: [
          { label: 'Asset Map', href: '/assets' },
          { label: 'Indonesia — 14 Assets', href: '/assets?country=Indonesia' },
          { label: 'Malaysia — 5 Assets', href: '/assets?country=Malaysia' },
          { label: 'Producing Fields', href: '/assets?status=Producing' },
          { label: 'Development Projects', href: '/assets?status=Development' },
        ],
      },
      {
        title: 'Performance',
        links: [
          { label: 'Daily Production', href: '/#performance' },
          { label: 'Market & Oil Price', href: '/#market' },
          { label: 'Safety Performance', href: '/#performance' },
        ],
      },
    ],
  },
  {
    label: 'Employee Central',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Service Portal', href: '/services' },
          { label: 'HR & General Affairs', href: '/services?category=HRGA' },
          { label: 'Information Technology', href: '/services?category=IT' },
          { label: 'Procurement', href: '/services?category=Procurement' },
          { label: 'Health, Safety & Environment', href: '/services?category=HSE' },
        ],
      },
      {
        title: 'People',
        links: [
          { label: 'Employee Directory', href: '/directory' },
          { label: 'Organisation Chart', href: '/organisation' },
          { label: 'Job Vacancies', href: '/services?category=HRGA' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Resource Centre', href: '/resources' },
          { label: 'Brand Assets', href: '/resources?category=Brand%20Assets' },
          { label: 'Policies', href: '/resources?category=Policies' },
          { label: 'Templates', href: '/resources?category=Templates' },
        ],
      },
    ],
    feature: {
      eyebrow: 'Emergency',
      title: '24/7 Emergency Response',
      excerpt: 'Group Emergency Control Centre — one number, answered in under 30 seconds.',
      href: '/emergency',
      image: { src: '/media/control-room.jpg', alt: 'Emergency control room' },
    },
  },
  {
    label: 'Support',
    columns: [
      {
        title: 'Help',
        links: [
          { label: 'FAQ', href: '/faq' },
          { label: 'Service Portal', href: '/services' },
          { label: 'Emergency Contacts', href: '/emergency' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms & Conditions', href: '/legal/terms' },
          { label: 'Privacy Policy', href: '/legal/privacy' },
        ],
      },
    ],
  },
];

/** Utility rail shown at the far right of the header. */
export const headerActions: NavLink[] = [
  { label: 'Emergency', href: '/emergency' },
  { label: 'Directory', href: '/directory' },
];

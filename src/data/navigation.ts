import type { NavItem, NavLink } from '@/types';

/**
 * Primary navigation. Items with `columns` render as a mega-menu panel;
 * items with only `href` navigate directly.
 *
 * One rule holds the menu together: **every link goes somewhere of its own.** The panel
 * used to carry five labels ("Exploration", "Field Development", "Production"…) that all
 * landed on the same `#portfolio` anchor, and three report names that all opened the same
 * document list — a menu that promises eleven destinations and delivers three teaches
 * people to stop trusting it. Where a real page does not exist, there is now one honest
 * link rather than several decorative ones.
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
        title: 'Operating Companies',
        links: [
          { label: 'Searah Ketapang (SKT)', href: '/entity/SKT' },
          { label: 'Searah Muara Bakau (SMB)', href: '/entity/SMB' },
          { label: 'Searah Malaysia (SMY)', href: '/entity/SMY' },
        ],
      },
      {
        title: 'Our People',
        links: [
          { label: 'Organisation Chart', href: '/organisation' },
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
          { label: 'Reports & Publications', href: '/resources?category=Documents' },
        ],
      },
      {
        title: 'By Entity',
        links: [
          { label: 'Searah Ketapang', href: '/newsletter?entity=SKT' },
          { label: 'Searah Muara Bakau', href: '/newsletter?entity=SMB' },
          { label: 'Searah Malaysia', href: '/newsletter?entity=SMY' },
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
        // Production now lives on each entity page, where the daily rate is published
        // with the date it was read — a homepage anchor cannot say that per OpCo.
        title: 'Production',
        links: [
          { label: 'Searah Ketapang', href: '/entity/SKT#production' },
          { label: 'Searah Muara Bakau', href: '/entity/SMB#production' },
          { label: 'Searah Malaysia', href: '/entity/SMY#production' },
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
          { label: 'HR & General Affairs', href: '/services/HRGA' },
          { label: 'Information Technology', href: '/services/IT' },
          { label: 'Procurement', href: '/services/Procurement' },
          { label: 'Health, Safety & Environment', href: '/services/HSE' },
        ],
      },
      {
        title: 'People & Tools',
        links: [
          { label: 'Employee Directory', href: '/directory' },
          { label: 'Internal Applications', href: '/services#applications' },
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
          { label: 'Emergency Contacts', href: '/emergency' },
          { label: 'Contact Us', href: '/#connect' },
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

import type { FooterContent } from '@/types';

export const footer: FooterContent = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About Searah', href: '/about' },
        { label: 'Vision & Mission', href: '/about#vision' },
        { label: 'Our Journey', href: '/about#timeline' },
        { label: 'Business Portfolio', href: '/about#portfolio' },
        { label: 'Leadership', href: '/organisation' },
      ],
    },
    {
      title: 'Operations',
      links: [
        { label: 'Asset Map', href: '/assets' },
        { label: 'Searah Mahakam', href: '/entity/SM' },
        { label: 'Searah Kutai', href: '/entity/SK' },
        { label: 'Searah Malaysia Borneo', href: '/entity/SMB' },
      ],
    },
    {
      title: 'Employee Central',
      links: [
        { label: 'Service Portal', href: '/services' },
        { label: 'Employee Directory', href: '/directory' },
        { label: 'Resource Centre', href: '/resources' },
        { label: 'Organisation Chart', href: '/organisation' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Emergency Contacts', href: '/emergency' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
    { label: 'X', href: 'https://x.com', icon: 'Twitter' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Whistleblowing', href: '/services?category=HSE' },
  ],
  address: [
    'Searah Energy Holdings',
    'Menara Searah, Level 38',
    'Jl. Jend. Sudirman Kav. 52-53',
    'Jakarta 12190, Indonesia',
  ],
  copyright: `© ${new Date().getFullYear()} Searah Energy Holdings. All rights reserved.`,
  shareholders: [
    { name: 'Eni S.p.A.', share: '50%' },
    { name: 'PETRONAS', share: '50%' },
  ],
};

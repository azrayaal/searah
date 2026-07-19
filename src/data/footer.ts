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
        { label: 'Searah Ketapang', href: '/entity/SKT' },
        { label: 'Searah Muara Bakau', href: '/entity/SMB' },
        { label: 'Searah Malaysia', href: '/entity/SMY' },
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
  offices: [
    {
      name: 'Searah Limited',
      lines: ['Holbein Gardens, 7 Holbein Pl,', 'London SW1W 8NR, United Kingdom'],
    },
    {
      name: 'Operating Company Malaysia',
      lines: [
        'Permata Sapura Tower, Kuala Lumpur City Centre, 50088,',
        'Wilayah Persekutuan, Kuala Lumpur',
      ],
    },
    {
      name: 'Operating Company Ketapang',
      lines: [
        'Talavera Office Park, Talavera Suite, 3rd Floor,',
        'Jl. TB Simatupang Kav 22-26, Jakarta, 12430',
      ],
    },
    {
      name: 'Operating Company Muara Bakau',
      lines: [
        'Pondok Indah Office Tower 3, Floors 19-22,',
        'Jl. Sultan Iskandar Muda, Pondok Indah, Jakarta 12310',
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Searah Energy Holdings. All rights reserved.`,
  shareholders: [
    { name: 'Eni S.p.A.', share: '50%', logo: '/eni.png' },
    { name: 'PETRONAS', share: '50%', logo: '/petronas.png' },
  ],
};

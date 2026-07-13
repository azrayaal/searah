import type { Service, ServiceCategoryMeta, ServiceStatus } from '@/types';

/** The four internal service lines shown as tabs on the services portal. */
export const serviceCategories: ServiceCategoryMeta[] = [
  {
    id: 'HRGA',
    label: 'Human Resources & General Affairs',
    description:
      'People, payroll and workplace services for staff across the group, including offshore rotation crews.',
    icon: 'Users',
  },
  {
    id: 'IT',
    label: 'Information Technology',
    description:
      'End-user support, hardware, identity and connectivity for corporate offices and operational sites.',
    icon: 'MonitorCog',
  },
  {
    id: 'Procurement',
    label: 'Procurement & Supply Chain',
    description:
      'Vendor onboarding, requisitions, contracts and supplier performance across all three entities.',
    icon: 'ShoppingCart',
  },
  {
    id: 'HSE',
    label: 'Health, Safety & Environment',
    description:
      'Control of work, incident reporting, occupational health and regulatory environmental submissions.',
    icon: 'HardHat',
  },
];

export const services: Service[] = [
  /* ------------------------------------------------------------------ HRGA */
  {
    id: 'svc-leave-attendance',
    name: 'Leave & Attendance',
    description:
      'Submit and approve annual leave, and reconcile attendance against offshore rotation schedules. Rotation crews should file leave at least one cycle in advance.',
    category: 'HRGA',
    status: 'Operational',
    owner: 'HR Operations',
    sla: '2 business days',
    icon: 'CalendarDays',
    requestHref: '#',
    quickLinks: [
      { label: 'Travel & Expense Policy', href: '/resources' },
      { label: 'Leave entitlement FAQ', href: '/faq' },
      { label: 'Open leave portal', href: '#' },
    ],
  },
  {
    id: 'svc-employee-onboarding',
    name: 'Employee Onboarding',
    description:
      'End-to-end joiner setup covering contract issue, payroll registration, site access and mandatory safety induction booking.',
    category: 'HRGA',
    status: 'Operational',
    owner: 'HR Business Partnering',
    sla: '5 business days before start date',
    icon: 'UserPlus',
    requestHref: '#',
    quickLinks: [
      { label: 'Safety Induction Video', href: '/resources' },
      { label: 'New joiner FAQ', href: '/faq' },
    ],
  },
  {
    id: 'svc-facility-booking',
    name: 'Facility & Workspace Booking',
    description:
      'Reserve meeting rooms, desks and pool vehicles at group headquarters and the Balikpapan and Kota Kinabalu offices.',
    category: 'HRGA',
    status: 'Operational',
    owner: 'General Affairs',
    sla: 'Same day',
    icon: 'Building2',
    requestHref: '#',
    quickLinks: [
      { label: 'Book a room', href: '#' },
      { label: 'Workspace rules', href: '/faq' },
    ],
  },
  {
    id: 'svc-payroll-benefits',
    name: 'Payroll & Benefits Enquiry',
    description:
      'Raise queries on payslips, offshore allowances, medical cover and pension contributions. Cut-off for payroll adjustments is the 18th of each month.',
    category: 'HRGA',
    status: 'Degraded',
    owner: 'Reward & Payroll',
    sla: '3 business days',
    icon: 'Wallet',
    requestHref: '#',
    quickLinks: [
      { label: 'Benefits handbook', href: '/resources' },
      { label: 'Payroll FAQ', href: '/faq' },
      { label: 'Contact Reward team', href: '#' },
    ],
  },

  /* ------------------------------------------------------------------ IT */
  {
    id: 'svc-it-service-desk',
    name: 'IT Service Desk',
    description:
      'Single point of contact for all incidents and requests, staffed around the clock to cover offshore night shifts in both Indonesia and Malaysia.',
    category: 'IT',
    status: 'Operational',
    owner: 'IT Service Management',
    sla: '4 hours for P2 incidents',
    icon: 'Headset',
    requestHref: '#',
    quickLinks: [
      { label: 'Raise a ticket', href: '#' },
      { label: 'Known issues', href: '/faq' },
    ],
  },
  {
    id: 'svc-hardware-request',
    name: 'Hardware Request',
    description:
      'Order laptops, mobile devices and intrinsically safe equipment for hazardous areas. Site deliveries follow the fortnightly logistics run.',
    category: 'IT',
    status: 'Operational',
    owner: 'IT End User Services',
    sla: '10 business days',
    icon: 'Laptop',
    requestHref: '#',
    quickLinks: [
      { label: 'Approved device catalogue', href: '/resources' },
      { label: 'Ex-rated equipment FAQ', href: '/faq' },
    ],
  },
  {
    id: 'svc-access-identity',
    name: 'Access & Identity Management',
    description:
      'Request, amend or revoke application access and role entitlements. Privileged access to production control systems requires HSE and asset manager approval.',
    category: 'IT',
    status: 'Operational',
    owner: 'IT Security & Identity',
    sla: '2 business days',
    icon: 'KeyRound',
    requestHref: '#',
    quickLinks: [
      { label: 'Data Privacy Policy', href: '/resources' },
      { label: 'Access review FAQ', href: '/faq' },
      { label: 'Request access', href: '#' },
    ],
  },
  {
    id: 'svc-vpn-remote-access',
    name: 'VPN & Remote Access',
    description:
      'Secure connectivity for staff working away from a Searah office, including satellite-backed links from offshore facilities.',
    category: 'IT',
    status: 'Maintenance',
    owner: 'IT Infrastructure & Networks',
    sla: '1 business day',
    icon: 'Globe',
    requestHref: '#',
    quickLinks: [
      { label: 'Maintenance window notice', href: '#' },
      { label: 'Remote working FAQ', href: '/faq' },
    ],
  },

  /* ------------------------------------------------------------------ Procurement */
  {
    id: 'svc-vendor-registration',
    name: 'Vendor Registration',
    description:
      'Onboard a new supplier, including anti-bribery due diligence, HSE pre-qualification and local content verification for SKK Migas and PETRONAS requirements.',
    category: 'Procurement',
    status: 'Operational',
    owner: 'Supply Chain Governance',
    sla: '15 business days',
    icon: 'ClipboardList',
    requestHref: '#',
    quickLinks: [
      { label: 'Anti-Bribery & Corruption Manual', href: '/resources' },
      { label: 'Vendor onboarding FAQ', href: '/faq' },
      { label: 'Start registration', href: '#' },
    ],
  },
  {
    id: 'svc-purchase-requisition',
    name: 'Purchase Requisition',
    description:
      'Raise a requisition against an approved budget line. Spend above USD 250,000 triggers competitive tendering under the Procurement Policy.',
    category: 'Procurement',
    status: 'Operational',
    owner: 'Category Management',
    sla: '5 business days to purchase order',
    icon: 'ShoppingCart',
    requestHref: '#',
    quickLinks: [
      { label: 'Procurement Policy', href: '/resources' },
      { label: 'Authority thresholds', href: '/faq' },
    ],
  },
  {
    id: 'svc-contract-management',
    name: 'Contract Management',
    description:
      'Draft, vary and renew supplier contracts, with automatic reminders 90 days ahead of expiry so critical services are never left uncovered.',
    category: 'Procurement',
    status: 'Operational',
    owner: 'Contracts & Commercial',
    sla: '10 business days',
    icon: 'FileSignature',
    requestHref: '#',
    quickLinks: [
      { label: 'Standard contract templates', href: '/resources' },
      { label: 'Contract variation FAQ', href: '/faq' },
    ],
  },
  {
    id: 'svc-supplier-performance',
    name: 'Supplier Performance',
    description:
      'Record and review supplier scorecards covering delivery, HSE record and cost adherence. Scores feed directly into future award decisions.',
    category: 'Procurement',
    status: 'Degraded',
    owner: 'Supply Chain Governance',
    sla: 'Quarterly review cycle',
    icon: 'Gauge',
    requestHref: '#',
    quickLinks: [
      { label: 'Scorecard methodology', href: '/resources' },
      { label: 'Raise a supplier concern', href: '#' },
    ],
  },

  /* ------------------------------------------------------------------ HSE */
  {
    id: 'svc-incident-reporting',
    name: 'Incident Reporting',
    description:
      'Report injuries, near misses, spills and unsafe conditions. Anything classified as a high-potential incident must be reported within one hour.',
    category: 'HSE',
    status: 'Operational',
    owner: 'Group HSE Assurance',
    sla: '1 hour for high-potential incidents',
    icon: 'ShieldAlert',
    requestHref: '#',
    quickLinks: [
      { label: 'HSE Golden Rules', href: '/resources' },
      { label: 'Reporting thresholds FAQ', href: '/faq' },
      { label: 'Report an incident', href: '#' },
    ],
  },
  {
    id: 'svc-permit-to-work',
    name: 'Permit to Work',
    description:
      'Raise and authorise permits for hot work, confined space entry, working at height and energy isolation. No permit, no work — without exception.',
    category: 'HSE',
    status: 'Operational',
    owner: 'Control of Work',
    sla: '24 hours before shift start',
    icon: 'FileCheck',
    requestHref: '#',
    quickLinks: [
      { label: 'Permit to Work Procedure', href: '/resources' },
      { label: 'Isolation standards FAQ', href: '/faq' },
    ],
  },
  {
    id: 'svc-health-screening',
    name: 'Health & Medical Screening',
    description:
      'Book the offshore medical fitness examination and periodic occupational health checks required before any rotation to a Searah facility.',
    category: 'HSE',
    status: 'Operational',
    owner: 'Occupational Health',
    sla: '7 business days to appointment',
    icon: 'Stethoscope',
    requestHref: '#',
    quickLinks: [
      { label: 'Medical fitness standards', href: '/resources' },
      { label: 'Offshore medical FAQ', href: '/faq' },
    ],
  },
  {
    id: 'svc-environmental-reporting',
    name: 'Environmental Reporting',
    description:
      'Log flaring volumes, produced water discharge and emissions data for regulatory submission and the group sustainability report.',
    category: 'HSE',
    status: 'Operational',
    owner: 'Environment & Climate',
    sla: '5 business days after month end',
    icon: 'Leaf',
    requestHref: '#',
    quickLinks: [
      { label: 'Sustainability Report 2025', href: '/resources' },
      { label: 'Emissions reporting FAQ', href: '/faq' },
      { label: 'Submit monthly data', href: '#' },
    ],
  },
];

/** Status values in severity order; drives the legend and the status filter. */
export const serviceStatuses: ServiceStatus[] = ['Operational', 'Degraded', 'Maintenance'];

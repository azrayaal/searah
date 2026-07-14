import type {
  InternalApp,
  Service,
  ServiceCategory,
  ServiceCategoryMeta,
  ServiceDesk,
  ServiceStatus,
} from '@/types';

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
    entityIds: ['SMY'],
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
    entityIds: ['SKT', 'SMB'],
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
    entityIds: ['SKT', 'SMB', 'SMY'],
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

/**
 * Who answers for a service line inside each entity. The group runs one catalogue, but a
 * permit query in Balikpapan is not answered from Kuala Lumpur — the desk is local, and a
 * portal that hides that just sends people to the wrong inbox.
 */
export const serviceDesks: Record<ServiceCategory, ServiceDesk[]> = {
  HRGA: [
    {
      entityId: 'SKT',
      lead: 'HR Operations, Balikpapan',
      email: 'hr.skt@searah.com',
      phone: '+62 542 800 140',
      hours: 'Mon–Fri, 07:30–17:00 WITA',
    },
    {
      entityId: 'SMB',
      lead: 'HR Operations, Deepwater',
      email: 'hr.smb@searah.com',
      phone: '+62 542 800 240',
      hours: 'Mon–Fri, 07:30–17:00 WITA',
    },
    {
      entityId: 'SMY',
      lead: 'Human Capital, Kuala Lumpur',
      email: 'hr.smy@searah.com',
      phone: '+60 3 2788 6040',
      hours: 'Mon–Fri, 08:30–17:30 MYT',
    },
  ],
  IT: [
    {
      entityId: 'SKT',
      lead: 'IT Service Desk, Balikpapan',
      email: 'it.skt@searah.com',
      phone: '+62 542 800 150',
      hours: '24/7 for P1 incidents',
    },
    {
      entityId: 'SMB',
      lead: 'IT Service Desk, Deepwater',
      email: 'it.smb@searah.com',
      phone: '+62 542 800 250',
      hours: '24/7 for P1 incidents',
    },
    {
      entityId: 'SMY',
      lead: 'IT Service Desk, Kuala Lumpur',
      email: 'it.smy@searah.com',
      phone: '+60 3 2788 6050',
      hours: '24/7 for P1 incidents',
    },
  ],
  Procurement: [
    {
      entityId: 'SKT',
      lead: 'Supply Chain, Balikpapan',
      email: 'procurement.skt@searah.com',
      phone: '+62 542 800 160',
      hours: 'Mon–Fri, 08:00–17:00 WITA',
    },
    {
      entityId: 'SMB',
      lead: 'Supply Chain, Deepwater Projects',
      email: 'procurement.smb@searah.com',
      phone: '+62 542 800 260',
      hours: 'Mon–Fri, 08:00–17:00 WITA',
    },
    {
      entityId: 'SMY',
      lead: 'Supply Chain, Bintulu',
      email: 'procurement.smy@searah.com',
      phone: '+60 86 255 060',
      hours: 'Mon–Fri, 08:30–17:30 MYT',
    },
  ],
  HSE: [
    {
      entityId: 'SKT',
      lead: 'HSE Duty Officer, Balikpapan',
      email: 'hse.skt@searah.com',
      phone: '+62 542 800 170',
      hours: '24/7 — incidents take priority over office hours',
    },
    {
      entityId: 'SMB',
      lead: 'HSE Duty Officer, Deepwater',
      email: 'hse.smb@searah.com',
      phone: '+62 542 800 270',
      hours: '24/7 — incidents take priority over office hours',
    },
    {
      entityId: 'SMY',
      lead: 'HSE Duty Officer, Sarawak',
      email: 'hse.smy@searah.com',
      phone: '+60 86 255 070',
      hours: '24/7 — incidents take priority over office hours',
    },
  ],
};

/**
 * Tools staff open and use themselves, as opposed to a request that joins a queue. They
 * sit apart from the service catalogue on purpose: the question "where do I book a room?"
 * should never require reading an SLA.
 */
export const internalApps: InternalApp[] = [
  {
    id: 'app-claims',
    name: 'Claim Registration',
    description:
      'File medical, travel and operational expense claims, and track reimbursement through to payroll.',
    owner: 'HR Operations',
    category: 'HRGA',
    icon: 'ReceiptText',
    href: '#',
    access: 'SSO',
  },
  {
    id: 'app-meeting-rooms',
    name: 'Meeting Room Booking',
    description:
      'Reserve rooms and hybrid suites across Jakarta, Balikpapan, Kuala Lumpur and Bintulu, with catering and AV.',
    owner: 'General Affairs',
    category: 'HRGA',
    icon: 'CalendarDays',
    href: '#',
    access: 'SSO',
  },
  {
    id: 'app-vehicle-booking',
    name: 'Operational Car Reservation',
    description:
      'Book pool vehicles and drivers for site visits, including journey management approval for road travel.',
    owner: 'General Affairs',
    category: 'HRGA',
    icon: 'Car',
    href: '#',
    access: 'SSO',
  },
  {
    id: 'app-timesheet',
    name: 'Timesheet & Rotation',
    description:
      'Record hours, confirm offshore rotation cycles and submit crew-change availability.',
    owner: 'HR Operations',
    category: 'HRGA',
    icon: 'Clock',
    href: '#',
    access: 'SSO',
  },
  {
    id: 'app-requisition',
    name: 'Purchase Requisition',
    description:
      'Raise a requisition, check budget availability and follow an order from approval to delivery.',
    owner: 'Supply Chain',
    category: 'Procurement',
    icon: 'ShoppingCart',
    href: '#',
    access: 'SSO',
  },
  {
    id: 'app-incident',
    name: 'Incident & Near-Miss Reporting',
    description:
      'Report an incident, hazard or near miss from any device. Anyone may file; nobody needs approval to.',
    owner: 'HSE Assurance',
    category: 'HSE',
    icon: 'TriangleAlert',
    href: '#',
  },
  {
    id: 'app-permit',
    name: 'Electronic Permit to Work',
    description:
      'Raise, approve and close permits, with isolation certificates and gas tests attached to the job.',
    owner: 'Control of Work',
    category: 'HSE',
    icon: 'ClipboardCheck',
    href: '#',
    access: 'Corporate network',
  },
  {
    id: 'app-servicedesk',
    name: 'IT Self-Service',
    description:
      'Reset a password, request software, or track an open IT ticket without picking up the phone.',
    owner: 'IT Service Desk',
    category: 'IT',
    icon: 'MonitorCog',
    href: '#',
    access: 'SSO',
  },
];

/** Services available to one entity — a service with no `entityIds` serves the whole group. */
export function getServicesByEntity(entityId: string): Service[] {
  return services.filter((service) => !service.entityIds || service.entityIds.includes(entityId));
}

export function getCategory(id: string): ServiceCategoryMeta | undefined {
  return serviceCategories.find((meta) => meta.id === id);
}

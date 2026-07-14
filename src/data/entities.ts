import type { Entity } from '@/types';
import { assets } from './assets';
import { getEmployee } from './employees';

/** Builds a leadership card from the directory so a person is defined once only. */
function leaderFrom(employeeId: string, fallbackRole: string) {
  const employee = getEmployee(employeeId);
  return {
    id: employeeId,
    employeeId,
    name: employee?.name ?? 'Unassigned',
    role: employee?.position ?? fallbackRole,
    photo: employee?.photo ?? { src: '/media/person-01.jpg', alt: fallbackRole },
    bio: employee?.biography ?? '',
  };
}

export const entities: Entity[] = [
  {
    id: 'SKT',
    code: 'SKT',
    name: 'Searah Ketapang',
    fullName: 'PT Searah Ketapang Energi',
    tagline: 'The producing heart of the portfolio',
    established: '2024',
    headquarters: 'Balikpapan, East Kalimantan',
    employees: 940,
    accent: '#00649D',
    summary:
      'Seven producing and development assets in the Kutai Basin and Mahakam Delta, supplying gas to Bontang and liquids to Senipah.',
    overview: [
      'Searah Ketapang operates the group’s largest producing hub. From eight wellhead platforms offshore and clustered swamp pads across the delta, the entity delivers roughly two-fifths of group production every day.',
      'The asset base is mature, and that is precisely where the entity’s engineering culture shows. Low-pressure compression, infill drilling and full field electrification have kept fields discovered in the 1970s on plateau, at a cost per barrel that competes with far younger developments.',
      'The next chapter is Peciko Deep — a high-pressure deepwater gas development tied back 62 kilometres to the existing North Mahakam complex, and the clearest expression of the entity’s reuse-first philosophy.',
    ],
    hero: { src: '/media/offshore-platform.jpg', alt: 'North Mahakam production complex at sea' },
    stats: [
      { label: 'Assets operated', value: '7', caption: 'Across the Kutai Basin and delta' },
      { label: 'Daily production', value: '182k BOE/D', caption: 'Group’s largest contributor' },
      { label: 'Employees', value: '940', caption: 'Balikpapan and offshore' },
      { label: 'LTI-free days', value: '412', caption: 'Group-leading safety record' },
    ],
    leadership: [
      leaderFrom('emp-010', 'Managing Director'),
      leaderFrom('emp-011', 'Operations Director'),
      leaderFrom('emp-012', 'Subsurface Manager'),
      leaderFrom('emp-013', 'HSE Manager'),
    ],
    operations: [
      {
        title: 'Offshore production',
        description:
          'Eight wellhead platforms and a central processing complex with 900 MMSCF/D of capacity, fully electrified since 2025.',
        icon: 'Waves',
      },
      {
        title: 'Delta operations',
        description:
          'Clustered swamp pads at Tunu and Handil that minimise land take, alongside a 1,900-hectare mangrove rehabilitation programme.',
        icon: 'Trees',
      },
      {
        title: 'Brownfield engineering',
        description:
          'Low-pressure compression and infill drilling that have extended field life by six years without new surface facilities.',
        icon: 'Wrench',
      },
      {
        title: 'Unmanned operations',
        description:
          'Bekapai runs as a normally unmanned installation, supervised remotely from the Integrated Operations Centre in Balikpapan.',
        icon: 'Radio',
      },
    ],
    productionMix: [
      { label: 'Gas', value: 68, unit: '%' },
      { label: 'Oil & condensate', value: 27, unit: '%' },
      { label: 'LPG', value: 5, unit: '%' },
    ],
    productionHistory: [
      { period: 'Q1 25', oil: 44, gas: 118 },
      { period: 'Q2 25', oil: 46, gas: 121 },
      { period: 'Q3 25', oil: 45, gas: 126 },
      { period: 'Q4 25', oil: 48, gas: 129 },
      { period: 'Q1 26', oil: 49, gas: 131 },
      { period: 'Q2 26', oil: 51, gas: 134 },
    ],
    dailyProduction: {
      asOf: '12 July 2026',
      total: '182,400 BOE/D',
      streams: [
        { label: 'Gas', value: '834 MMSCF/D' },
        { label: 'Oil & condensate', value: '41,200 BBL/D' },
        { label: 'LPG', value: '1,900 T/D' },
      ],
      note: 'Read each morning by the Balikpapan Integrated Operations Centre. Operational figures, unaudited, and superseded by the quarterly statement.',
    },
    workingInterest: [
      { partner: 'Searah Ketapang', share: '55%', operator: true },
      { partner: 'Pertamina Hulu Energi', share: '30%' },
      { partner: 'Ketapang Upstream Partners', share: '15%' },
    ],
    milestones: [
      {
        year: '2024',
        title: 'Entity incorporated',
        description:
          'PT Searah Ketapang Energi is formed to hold the group’s producing delta and shelf assets, with 940 staff transferring from the legacy operators.',
      },
      {
        year: '2025',
        title: 'Full electrification of the processing complex',
        description:
          'Gas turbines are replaced by grid power and waste-heat recovery, cutting operational emissions intensity by 31 per cent in a single year.',
      },
      {
        year: '2025',
        title: 'Bekapai goes normally unmanned',
        description:
          'The platform is supervised from shore, removing 22 per cent of routine helicopter trips from the schedule — a safety gain before a cost one.',
      },
      {
        year: '2026',
        title: 'Low-pressure compression online',
        description:
          'Infill drilling and compression extend plateau life by six years without a single new surface facility.',
      },
    ],
    hse: {
      metrics: [
        { label: 'TRIR', value: '0.21', caption: 'Per million hours worked, rolling 12 months' },
        { label: 'LTI-free days', value: '412', caption: 'Group-leading safety record' },
        { label: 'Tier-1 process safety events', value: '0', caption: 'Twelve months to June 2026' },
        { label: 'Emissions intensity', value: '12.4', caption: 'kgCO₂e per BOE, down from 18.1' },
      ],
      certifications: ['ISO 45001', 'ISO 14001', 'ISO 9001', 'ISO 50001', 'SMK3 (Indonesia)'],
    },
    contact: {
      registeredOffice: [
        'PT Searah Ketapang Energi',
        'Menara Searah, Level 21',
        'Jl. Jend. Sudirman Kav. 52-53',
        'Jakarta 12190, Indonesia',
      ],
      operatingBase: [
        'Balikpapan Operating Base',
        'Jl. Yos Sudarso No. 1',
        'Balikpapan 76111, East Kalimantan',
      ],
      phone: '+62 21 5299 4100',
      email: 'ketapang@searah.com',
      comms: {
        name: 'Dwi Larasati',
        role: 'Communications Lead, Searah Ketapang',
        email: 'comms.skt@searah.com',
        phone: '+62 542 800 118',
      },
      emergency: '+62 542 800 911',
    },
    gallery: [
      { src: '/media/offshore-platform.jpg', alt: 'North Mahakam platform complex' },
      { src: '/media/mangrove.jpg', alt: 'Mangrove rehabilitation in the Mahakam delta' },
      { src: '/media/control-room.jpg', alt: 'Balikpapan Integrated Operations Centre' },
      { src: '/media/worker-ppe.jpg', alt: 'Offshore technician in protective equipment' },
      { src: '/media/pipelines.jpg', alt: 'Export pipelines at the processing complex' },
      { src: '/media/helicopter.jpg', alt: 'Crew change helicopter on the helideck' },
    ],
    downloads: ['res-production-factsheet-q2-2026', 'res-hse-golden-rules', 'res-annual-report-2025', 'res-permit-to-work-procedure'],
  },
  {
    id: 'SMB',
    code: 'SMB',
    name: 'Searah Muara Bakau',
    fullName: 'PT Searah Muara Bakau Deepwater',
    tagline: 'Deepwater growth engine',
    established: '2024',
    headquarters: 'Balikpapan, East Kalimantan',
    employees: 720,
    accent: '#007AFF',
    summary:
      'Seven deepwater and frontier assets in the Makassar Strait and beyond, including the Geng North discovery that will anchor the North Kutai hub.',
    overview: [
      'Searah Muara Bakau is where the group’s production target is won or lost. The entity operates the deepwater portfolio — Jangkrik, Merakes and the sanctioned developments that will lift group output past 500,000 BOE/D.',
      'Its operating model is deliberately asset-light. Merakes was delivered as a subsea tieback to an existing floating unit with no new surface facilities, and Merakes East reuses the same risers and umbilicals again. Capital intensity below USD 6 per barrel of oil equivalent is the result.',
      'Geng North, the largest discovery in the Kutai Basin in twenty years, is being designed as an open-access hub that can host third-party tiebacks — an unusual commitment for an operator, and a deliberate one.',
    ],
    hero: { src: '/media/fpso.jpg', alt: 'Floating production unit in the Makassar Strait' },
    stats: [
      { label: 'Assets operated', value: '7', caption: 'Deepwater and frontier' },
      { label: 'Daily production', value: '63k BOE/D', caption: 'Rising to 240k by 2029' },
      { label: 'Deepest asset', value: '1,950 m', caption: 'Geng North water depth' },
      { label: 'Capital sanctioned', value: 'USD 7.7bn', caption: 'Peciko Deep and Geng North' },
    ],
    leadership: [
      leaderFrom('emp-020', 'Managing Director'),
      leaderFrom('emp-021', 'Projects Director'),
      leaderFrom('emp-022', 'Exploration Manager'),
      leaderFrom('emp-047', 'Subsea Engineering Lead'),
    ],
    operations: [
      {
        title: 'Deepwater production',
        description:
          'A floating production unit with 450 MMSCF/D of capacity, hosting subsea tiebacks from Merakes and, from 2027, Merakes East.',
        icon: 'Ship',
      },
      {
        title: 'Subsea tiebacks',
        description:
          'A standardised subsea architecture that lets new discoveries reach an existing host without new surface facilities.',
        icon: 'Cable',
      },
      {
        title: 'Exploration',
        description:
          'Active campaigns across the Kutai and Tarakan basins, with 3,400 km² of 3D seismic acquired in the frontier acreage.',
        icon: 'Radar',
      },
      {
        title: 'Hub development',
        description:
          'Geng North is engineered as a shared regional hub, with spare capacity reserved for third-party volumes.',
        icon: 'Network',
      },
    ],
    productionMix: [
      { label: 'Gas', value: 84, unit: '%' },
      { label: 'Condensate', value: 16, unit: '%' },
    ],
    productionHistory: [
      { period: 'Q1 25', oil: 9, gas: 48 },
      { period: 'Q2 25', oil: 10, gas: 51 },
      { period: 'Q3 25', oil: 10, gas: 53 },
      { period: 'Q4 25', oil: 11, gas: 56 },
      { period: 'Q1 26', oil: 11, gas: 58 },
      { period: 'Q2 26', oil: 12, gas: 61 },
    ],
    dailyProduction: {
      asOf: '12 July 2026',
      total: '63,100 BOE/D',
      streams: [
        { label: 'Gas', value: '318 MMSCF/D' },
        { label: 'Condensate', value: '9,800 BBL/D' },
      ],
      note: 'Rising to roughly 240,000 BOE/D once Geng North reaches plateau. Operational figures, unaudited.',
    },
    workingInterest: [
      { partner: 'Searah Muara Bakau', share: '70%', operator: true },
      { partner: 'Pertamina Hulu Energi', share: '20%' },
      { partner: 'Makassar Straits Ventures', share: '10%' },
    ],
    milestones: [
      {
        year: '2024',
        title: 'Entity incorporated',
        description:
          'The deepwater portfolio is separated into its own operating company so subsea projects are governed and funded on their own terms.',
      },
      {
        year: '2025',
        title: 'Merakes East delivered as a tieback',
        description:
          'Reusing the existing risers and umbilicals holds capital intensity below USD 6 per barrel of oil equivalent.',
      },
      {
        year: '2026',
        title: 'Final investment decision on Geng North',
        description:
          'USD 4.6bn committed to the largest discovery in the Kutai Basin in twenty years, designed as an open-access hub for third-party tiebacks.',
      },
      {
        year: '2029',
        title: 'First gas from Geng North (planned)',
        description:
          'The development is expected to lift group output past 500,000 BOE/D and anchor the North Kutai hub.',
      },
    ],
    hse: {
      metrics: [
        { label: 'TRIR', value: '0.14', caption: 'Per million hours worked, rolling 12 months' },
        { label: 'LTI-free days', value: '690', caption: 'Since the entity was formed' },
        { label: 'Tier-1 process safety events', value: '0', caption: 'Twelve months to June 2026' },
        { label: 'Emissions intensity', value: '8.9', caption: 'kgCO₂e per BOE — lowest in the group' },
      ],
      certifications: ['ISO 45001', 'ISO 14001', 'ISO 9001', 'IOGP Life-Saving Rules', 'SMK3 (Indonesia)'],
    },
    contact: {
      registeredOffice: [
        'PT Searah Muara Bakau Deepwater',
        'Menara Searah, Level 23',
        'Jl. Jend. Sudirman Kav. 52-53',
        'Jakarta 12190, Indonesia',
      ],
      operatingBase: [
        'Deepwater Support Base',
        'Jl. Minyak Raya No. 12',
        'Balikpapan 76112, East Kalimantan',
      ],
      phone: '+62 21 5299 4200',
      email: 'muarabakau@searah.com',
      comms: {
        name: 'Rangga Mahendra',
        role: 'Communications Lead, Searah Muara Bakau',
        email: 'comms.smb@searah.com',
        phone: '+62 542 800 214',
      },
      emergency: '+62 542 800 922',
    },
    gallery: [
      { src: '/media/fpso.jpg', alt: 'Jangkrik floating production unit' },
      { src: '/media/subsea.jpg', alt: 'Subsea infrastructure being deployed' },
      { src: '/media/drilling.jpg', alt: 'Deepwater drilling operations' },
      { src: '/media/seismic-vessel.jpg', alt: 'Seismic survey vessel underway' },
      { src: '/media/engineers.jpg', alt: 'Project engineers reviewing subsea plans' },
      { src: '/media/offshore-night.jpg', alt: 'Offshore facility at night' },
    ],
    downloads: ['res-annual-report-2025', 'res-well-control-manual', 'res-drilling-operations-manual', 'res-corporate-overview-deck'],
  },
  {
    id: 'SMY',
    code: 'SMY',
    name: 'Searah Malaysia',
    fullName: 'Searah Malaysia Sdn Bhd',
    tagline: 'Lower-carbon gas for the region',
    established: '2024',
    headquarters: 'Kuala Lumpur, Malaysia',
    employees: 610,
    accent: '#F2A03D',
    summary:
      'Five offshore assets in Sarawak and Sabah, home to one of the world’s largest offshore carbon capture facilities at Kasawari.',
    overview: [
      'Searah Malaysia operates five assets offshore Sarawak and Sabah, feeding the Bintulu LNG complex and the regional gas grid.',
      'Its defining asset is Kasawari: a high-CO₂ gas field paired with a carbon capture facility that strips and reinjects 3.3 million tonnes of CO₂ each year into a depleted reservoir nearby. It is one of the largest offshore CCS schemes anywhere in the world, and it turns a reservoir others would have left behind into a commercial, lower-carbon barrel.',
      'Alongside it, Kikeh remains Malaysia’s first deepwater development and now hosts three satellite tiebacks, while Rotan will produce through a floating liquefaction vessel from 2028 — no export trunkline required.',
    ],
    hero: { src: '/media/gas-plant.jpg', alt: 'Kasawari gas processing platform offshore Sarawak' },
    stats: [
      { label: 'Assets operated', value: '5', caption: 'Offshore Sarawak and Sabah' },
      { label: 'Daily production', value: '86k BOE/D', caption: 'Feeding Bintulu LNG' },
      { label: 'CO₂ captured', value: '3.3 Mtpa', caption: 'Reinjected at Kasawari' },
      { label: 'Employees', value: '610', caption: 'KL, Bintulu, Kota Kinabalu' },
    ],
    leadership: [
      leaderFrom('emp-030', 'Managing Director'),
      leaderFrom('emp-031', 'Operations Director'),
      leaderFrom('emp-032', 'Sustainability Manager'),
      leaderFrom('emp-046', 'Geoscientist'),
    ],
    operations: [
      {
        title: 'Carbon capture & storage',
        description:
          'CO₂ separated at the Kasawari platform is compressed and reinjected into a depleted reservoir, with continuous monitoring and verification.',
        icon: 'Recycle',
      },
      {
        title: 'Deepwater hub',
        description:
          'Kikeh operates as a hub for three satellite fields, with FPSO uptime of 98.4% in 2025.',
        icon: 'Anchor',
      },
      {
        title: 'Floating LNG',
        description:
          'Rotan will produce through a moored liquefaction vessel with 1.5 MTPA of capacity, removing the need for a long export pipeline.',
        icon: 'Container',
      },
      {
        title: 'Platform electrification',
        description:
          'Baram Delta hosts the region’s first solar-hybrid powered platform, cutting fuel gas consumption and emissions.',
        icon: 'SunMedium',
      },
    ],
    productionMix: [
      { label: 'Gas', value: 72, unit: '%' },
      { label: 'Oil', value: 23, unit: '%' },
      { label: 'Condensate', value: 5, unit: '%' },
    ],
    productionHistory: [
      { period: 'Q1 25', oil: 26, gas: 58 },
      { period: 'Q2 25', oil: 27, gas: 60 },
      { period: 'Q3 25', oil: 26, gas: 62 },
      { period: 'Q4 25', oil: 28, gas: 63 },
      { period: 'Q1 26', oil: 29, gas: 65 },
      { period: 'Q2 26', oil: 29, gas: 67 },
    ],
    dailyProduction: {
      asOf: '12 July 2026',
      total: '86,300 BOE/D',
      streams: [
        { label: 'Gas', value: '412 MMSCF/D' },
        { label: 'Oil', value: '17,400 BBL/D' },
      ],
      note: 'Gas is delivered into the Bintulu LNG complex and the Sarawak grid. Operational figures, unaudited.',
    },
    workingInterest: [
      { partner: 'Searah Malaysia', share: '51%', operator: true },
      { partner: 'PETRONAS Carigali', share: '39%' },
      { partner: 'Sarawak Energy Ventures', share: '10%' },
    ],
    milestones: [
      {
        year: '2024',
        title: 'Entity incorporated',
        description:
          'Searah Malaysia Sdn Bhd takes over the Sarawak and Sabah portfolio, with 610 staff across Kuala Lumpur, Bintulu and Kota Kinabalu.',
      },
      {
        year: '2025',
        title: 'Kasawari carbon capture starts up',
        description:
          'Three point three million tonnes of CO₂ a year are stripped and reinjected into a depleted reservoir nearby — among the largest offshore CCS schemes anywhere.',
      },
      {
        year: '2026',
        title: 'Third Kikeh satellite tieback online',
        description:
          'Malaysia’s first deepwater development keeps producing through host capacity that was built two decades ago.',
      },
      {
        year: '2028',
        title: 'Rotan floating LNG (planned)',
        description:
          'Production through a floating liquefaction vessel, with no export trunkline required.',
      },
    ],
    hse: {
      metrics: [
        { label: 'TRIR', value: '0.18', caption: 'Per million hours worked, rolling 12 months' },
        { label: 'LTI-free days', value: '540', caption: 'Across all five assets' },
        { label: 'CO₂ captured', value: '3.3 Mtpa', caption: 'Reinjected at Kasawari' },
        { label: 'Emissions intensity', value: '10.6', caption: 'kgCO₂e per BOE, net of capture' },
      ],
      certifications: ['ISO 45001', 'ISO 14001', 'ISO 9001', 'MS 1722 (Malaysia)'],
    },
    contact: {
      registeredOffice: [
        'Searah Malaysia Sdn Bhd',
        'Level 34, Menara Searah KL',
        'Jalan Tun Razak',
        '50400 Kuala Lumpur, Malaysia',
      ],
      operatingBase: ['Bintulu Operations Centre', 'Kidurong Industrial Area', '97000 Bintulu, Sarawak'],
      phone: '+60 3 2788 6000',
      email: 'malaysia@searah.com',
      comms: {
        name: 'Nurul Farhana binti Idris',
        role: 'Communications Lead, Searah Malaysia',
        email: 'comms.smy@searah.com',
        phone: '+60 3 2788 6142',
      },
      emergency: '+60 86 255 911',
    },
    gallery: [
      { src: '/media/gas-plant.jpg', alt: 'Kasawari gas processing platform' },
      { src: '/media/lng-carrier.jpg', alt: 'LNG carrier loading at Bintulu' },
      { src: '/media/renewables.jpg', alt: 'Solar hybrid power at Baram Delta' },
      { src: '/media/terminal-aerial.jpg', alt: 'Aerial view of the export terminal' },
      { src: '/media/team-meeting.jpg', alt: 'Kuala Lumpur team reviewing CCS performance' },
      { src: '/media/coastline.jpg', alt: 'Sarawak coastline' },
    ],
    downloads: ['res-sustainability-report-2025', 'res-annual-report-2025', 'res-brand-guidelines', 'res-corporate-video-2026'],
  },
];

export function getEntity(code: string) {
  return entities.find((entity) => entity.id === code);
}

export function getEntityAssets(code: string) {
  return assets.filter((asset) => asset.entityId === code);
}

/** Lightweight lookup used by cards and filters that only need the label. */
export const entityIndex = Object.fromEntries(
  entities.map((entity) => [entity.id, { name: entity.name, accent: entity.accent }]),
) as Record<string, { name: string; accent: string }>;

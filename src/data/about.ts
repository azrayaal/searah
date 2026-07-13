import type { AboutContent } from '@/types';

/**
 * Corporate "About" content — mirrors a single-entry CMS collection.
 * Prose is authored in British English; figures track `companyFacts` in site.ts.
 */
export const about: AboutContent = {
  hero: {
    eyebrow: 'About Searah',
    title: 'An upstream partnership built for the long term',
    subtitle:
      'Searah brings together Eni and PETRONAS in equal partnership to explore, develop and operate oil and gas resources across Indonesia and Malaysia.',
    image: {
      src: '/media/offshore-platform.jpg',
      alt: 'Offshore production platform standing above calm water under an overcast sky',
      caption: 'Searah operates 19 assets across the Kutai Basin, the Makassar Strait and offshore Borneo.',
    },
  },

  overview: {
    intro: {
      eyebrow: 'Who we are',
      title: 'A single operator across two of Southeast Asia’s core hydrocarbon provinces',
      description:
        'Formed in 2024 and consolidated into a single operating company in 2025, Searah manages the combined upstream interests of Eni and PETRONAS in Indonesia and Malaysia.',
    },
    body: [
      'Searah is an upstream oil and gas company owned in equal shares by Eni and PETRONAS. The company was established in 2024 to bring both shareholders’ Indonesian and Malaysian upstream interests under one operator, and completed the consolidation of its assets, licences and workforce in 2025. It is not a holding vehicle: Searah carries operatorship, budgets and accountability for delivery on the majority of the acreage it holds.',
      'The portfolio comprises 19 assets — 14 in Indonesia and 5 in Malaysia — spanning shallow-water, deepwater and onshore acreage. Operations are organised under three entities. Searah Mahakam (SM) manages the mature shallow-water and onshore fields of the Mahakam Delta in East Kalimantan. Searah Kutai (SK) holds the deepwater acreage of the Makassar Strait, including the Kutai Basin gas discoveries that underpin the company’s growth case. Searah Malaysia Borneo (SMB) operates the offshore Sarawak and Sabah assets that connect Searah’s gas into the region’s established LNG infrastructure.',
      'Group production stands above 300,000 barrels of oil equivalent per day, weighted towards gas. The company has set a target of more than 500,000 BOE/D within three years, supported by a capital programme of USD 20 billion over five years. That programme is directed principally at deepwater gas development in the Kutai Basin, at brownfield infill and compression work in the Mahakam Delta, and at the subsea tiebacks and processing capacity needed to move new volumes into existing plants rather than build new ones.',
      'Searah’s operating model is deliberately conventional. Standardised well designs, phased development concepts and the reuse of existing trunklines and terminals shorten the distance between discovery and first gas. Several of the company’s projects are structured as tiebacks to facilities that are already installed and already paid for, which is the principal reason Searah can commit to a step change in volumes without a proportional step change in emissions or capital intensity.',
      'The company employs a majority-national workforce across its two host countries, with corporate functions in Jakarta and Kuala Lumpur and operating bases at Balikpapan, Bintulu and Kota Kinabalu. Gas produced by Searah supplies domestic power generation and industry in Indonesia and Malaysia, and feeds the Bontang and Bintulu LNG value chains for export.',
    ],
    figures: [
      {
        label: '19 Assets',
        value: '19',
        caption: '14 in Indonesia and 5 in Malaysia, across producing, development and exploration acreage.',
      },
      {
        label: '300k+ BOE/D',
        value: '300,000+',
        caption: 'Group production today, gas-weighted, with a target of 500,000+ BOE/D within three years.',
      },
      {
        label: 'USD 20bn',
        value: 'USD 20bn',
        caption: 'Committed investment across the portfolio over the next five years.',
      },
      {
        label: '2 Countries',
        value: '2',
        caption: 'Indonesia and Malaysia, operated under three entities: SM, SK and SMB.',
      },
    ],
  },

  shareholders: {
    intro: {
      eyebrow: 'Ownership',
      title: 'Two shareholders, equal shares, one operator',
      description:
        'Eni and PETRONAS each hold 50 per cent of Searah. Both are represented on the board, and both second technical staff into the company’s projects.',
    },
    partners: [
      {
        name: 'Eni',
        share: '50%',
        country: 'Italy',
        description:
          'Eni contributes deepwater engineering capability developed across West Africa, the East Mediterranean and the Barents Sea, and a fast-track development model that has repeatedly shortened the interval between discovery and first production. Its subsurface teams lead the Kutai Basin appraisal programme and the phased concept selection for the Makassar Strait gas hubs. Eni also brings its decarbonisation technologies into the joint venture, including flare recovery, methane detection and measurement, and carbon capture and storage design work for the Bontang area.',
      },
      {
        name: 'PETRONAS',
        share: '50%',
        country: 'Malaysia',
        description:
          'PETRONAS brings four decades of operating experience in Southeast Asian waters and an intimate understanding of the regulatory, fiscal and community environments in which Searah works. Its position across the LNG value chain — from upstream gas through liquefaction at Bintulu to shipping and marketing — gives Searah a direct and commercially proven route for its Sarawak and Sabah volumes. PETRONAS also provides established supply-chain, logistics and shared-services infrastructure across Borneo that Searah uses rather than duplicates.',
      },
    ],
  },

  vision: {
    statement:
      'To be the most reliable upstream operator in Southeast Asia — the partner host governments trust with their most complex resources.',
    support:
      'Reliability is measured in delivered molecules, in projects that reach first production on the date they were sanctioned, and in a safety record that does not degrade as activity increases. Searah’s vision is not to be the largest operator in the region but the one whose commitments can be planned around by governments, buyers, partners and the communities in which it works.',
  },

  mission: [
    {
      id: 'mission-supply',
      title: 'Supply energy that two economies depend on',
      description:
        'Deliver gas and liquids to domestic buyers in Indonesia and Malaysia, and to the Bontang and Bintulu LNG value chains, at the volumes and specifications contracted — day in, day out.',
    },
    {
      id: 'mission-growth',
      title: 'Convert resource into production',
      description:
        'Move the Kutai Basin and offshore Borneo discoveries through appraisal, sanction and execution to reach more than 500,000 BOE/D within three years, using phased concepts and tiebacks to existing infrastructure.',
    },
    {
      id: 'mission-safety',
      title: 'Protect people and the environment',
      description:
        'Operate to a single group HSE standard across all 19 assets, eliminate routine flaring by 2028, and reduce upstream emissions intensity by half against the 2025 baseline by 2032.',
    },
    {
      id: 'mission-value',
      title: 'Build capability in the countries we operate in',
      description:
        'Sustain a majority-national workforce, develop Indonesian and Malaysian engineers into technical leadership roles, and place work with local suppliers wherever they can meet the standard.',
    },
  ],

  values: {
    intro: {
      eyebrow: 'How we work',
      title: 'Six values that decide how the work gets done',
      description:
        'These are the standards Searah applies when a decision is difficult and the schedule is under pressure. They are written to be usable, not admired.',
    },
    items: [
      {
        id: 'value-safety',
        title: 'Safety without exception',
        description:
          'Any person on any Searah site may stop work they believe is unsafe, and will be supported for doing so. Production targets are never a reason to accept a hazard, and no schedule has ever been recovered by taking one.',
        icon: 'ShieldCheck',
      },
      {
        id: 'value-integrity',
        title: 'Integrity in every dealing',
        description:
          'Searah competes on cost, capability and delivery. Facilitation payments, undisclosed intermediaries and conflicts of interest are prohibited without qualification, and reported without delay.',
        icon: 'Handshake',
      },
      {
        id: 'value-rigour',
        title: 'Technical rigour',
        description:
          'Decisions are made on data, and uncertainty is stated rather than hidden. Peer review is mandatory before sanction, and a dissenting technical view is expected to be documented, not resolved in a corridor.',
        icon: 'Lightbulb',
      },
      {
        id: 'value-environment',
        title: 'Environmental responsibility',
        description:
          'Emissions, discharges and land disturbance are treated as engineering problems with owners, budgets and deadlines. What is measured is published; what is committed is delivered.',
        icon: 'Leaf',
      },
      {
        id: 'value-delivery',
        title: 'Delivery on commitment',
        description:
          'A sanctioned date is a promise made to shareholders, host governments and buyers. Searah would rather sanction later with a schedule it can hold than early with one it cannot.',
        icon: 'Target',
      },
      {
        id: 'value-people',
        title: 'One team, two countries',
        description:
          'Indonesian and Malaysian staff work in mixed teams on both sides of the border, with the same standards, the same tools and the same route to technical leadership.',
        icon: 'Users',
      },
    ],
  },

  timeline: {
    intro: {
      eyebrow: 'Our history',
      title: 'From joint venture talks to a 500,000 BOE/D operator',
      description:
        'Searah is a young company built on long-established assets. The milestones below trace its formation, its consolidation and the commitments it has made for the decade ahead.',
    },
    events: [
      {
        id: 'tl-2023-talks',
        year: '2023',
        title: 'Joint venture talks open',
        description:
          'Eni and PETRONAS begin structured discussions on combining their Indonesian and Malaysian upstream interests into a single operating company, prompted by the scale of the deepwater gas discovered in the Kutai Basin and the cost of developing it separately.',
      },
      {
        id: 'tl-2024-agreement',
        year: '2024',
        title: 'Joint venture agreement signed',
        description:
          'The shareholders execute a 50:50 joint venture agreement covering asset contribution, governance, secondment of technical staff and the funding framework for the initial development programme.',
        milestone: true,
      },
      {
        id: 'tl-2024-approval',
        year: '2024',
        title: 'Regulatory approval secured',
        description:
          'Indonesian and Malaysian authorities approve the transfer of participating interests and the change of operatorship across the contributed acreage, clearing the last condition precedent to completion.',
        milestone: true,
      },
      {
        id: 'tl-2024-incorporation',
        year: '2024',
        title: 'Entities incorporated',
        description:
          'Searah Mahakam (SM), Searah Kutai (SK) and Searah Malaysia Borneo (SMB) are incorporated, and the corporate headquarters is established at Menara Searah in Jakarta with a regional office in Kuala Lumpur.',
      },
      {
        id: 'tl-2025-consolidation',
        year: '2025',
        title: 'First consolidated production',
        description:
          'Operations, licences and the workforce are consolidated under a single operator. Searah reports its first consolidated group production, exceeding 300,000 BOE/D across the 19 assets.',
        milestone: true,
      },
      {
        id: 'tl-2025-hse',
        year: '2025',
        title: 'Single group HSE standard adopted',
        description:
          'A unified health, safety and environment management system replaces the inherited standards across all sites, together with a common permit-to-work system and a group-wide stop-work authority.',
      },
      {
        id: 'tl-2026-fid',
        year: '2026',
        title: 'Geng North final investment decision',
        description:
          'The board sanctions the Geng North development in the deepwater Makassar Strait — a subsea development tied back to onshore processing, and the largest single capital commitment in the company’s history.',
        milestone: true,
      },
      {
        id: 'tl-2026-today',
        year: '2026',
        title: 'Growth programme under execution',
        description:
          'With USD 20 billion committed over five years, Searah has drilling, subsea and compression work running concurrently across the Mahakam Delta, the Makassar Strait and offshore Sarawak and Sabah.',
      },
      {
        id: 'tl-2028-flaring',
        year: '2028',
        title: 'Zero routine flaring',
        description:
          'Target date for eliminating routine flaring across every operated asset, delivered through flare gas recovery units, compression upgrades and rerouting of associated gas into existing sales lines.',
        milestone: true,
      },
      {
        id: 'tl-2029-target',
        year: '2029',
        title: '500,000+ BOE/D',
        description:
          'Target group production of more than 500,000 barrels of oil equivalent per day, as the Kutai Basin gas hubs reach plateau and the Sarawak tiebacks come onstream.',
        milestone: true,
      },
      {
        id: 'tl-2030-ccs',
        year: '2030',
        title: 'Carbon capture and storage onstream',
        description:
          'First CO₂ injection from Searah’s East Kalimantan capture and storage scheme, handling reservoir CO₂ separated at the Bontang-area processing facilities.',
      },
      {
        id: 'tl-2032-intensity',
        year: '2032',
        title: '50% cut in emissions intensity',
        description:
          'Target of halving upstream greenhouse gas emissions intensity against the 2025 baseline, through flaring elimination, electrification of offshore facilities, methane leak repair and carbon storage.',
        milestone: true,
      },
    ],
  },

  portfolio: {
    intro: {
      eyebrow: 'What we do',
      title: 'Four capabilities, one value chain',
      description:
        'Searah works the full upstream cycle — from seismic acquisition through to the management of fields that have been producing for decades.',
    },
    items: [
      {
        id: 'cap-exploration',
        title: 'Exploration',
        description:
          'Searah runs an active exploration programme concentrated in the deepwater Makassar Strait and the offshore Sarawak and Sabah basins, where the company holds acreage adjacent to proven plays and existing infrastructure. Broadband seismic reprocessing and basin-scale modelling are used to rank prospects before any well is committed, and near-field targets are prioritised because they can be tied back rather than developed standalone.',
        image: {
          src: '/media/seismic-vessel.jpg',
          alt: 'Seismic survey vessel towing streamers across open water during an acquisition campaign',
        },
        metrics: [
          '4 exploration licences under active work programme',
          '18,400 km² of 3D seismic reprocessed since 2025',
          'Near-field focus: every prospect within tieback range of installed facilities',
        ],
      },
      {
        id: 'cap-development',
        title: 'Field Development',
        description:
          'Development is where the USD 20 billion programme is spent. Searah favours phased concepts and subsea tiebacks to existing hosts over new-build standalone facilities, which shortens schedules and reduces both capital and lifetime emissions. The Geng North development in the Makassar Strait is the flagship: a deepwater subsea scheme routed to onshore processing capacity that already exists.',
        image: {
          src: '/media/subsea.jpg',
          alt: 'Subsea manifold being lowered from a construction vessel for installation on the seabed',
        },
        metrics: [
          'USD 20 billion committed over five years',
          'Geng North sanctioned in 2026',
          'Standardised well and subsea designs across all projects',
        ],
      },
      {
        id: 'cap-production',
        title: 'Production',
        description:
          'Searah produces more than 300,000 BOE/D from operated fields in Indonesia and Malaysia, weighted towards gas. Output is managed from integrated control rooms in Balikpapan and Bintulu, with production optimisation, well surveillance and turnaround planning run against a single group standard. Reliability, not peak rate, is the metric that governs how the assets are operated.',
        image: {
          src: '/media/control-room.jpg',
          alt: 'Operators monitoring production and process data across a wall of screens in an integrated control room',
        },
        metrics: [
          '300,000+ BOE/D group production today',
          'Target of 500,000+ BOE/D within three years',
          'Gas supplied to domestic buyers and the Bontang and Bintulu LNG chains',
        ],
      },
      {
        id: 'cap-asset-management',
        title: 'Upstream Asset Management',
        description:
          'Several of Searah’s fields have been producing for decades, and extending their life is as valuable as finding new resource. The asset management teams run infill drilling, compression upgrades, water and gas handling debottlenecking, and integrity programmes that keep ageing facilities fit for service. The same teams plan the eventual decommissioning of the facilities they operate, and provision for it from the outset.',
        image: {
          src: '/media/engineers.jpg',
          alt: 'Engineers in personal protective equipment reviewing drawings beside process piping on an operating facility',
        },
        metrics: [
          '19 assets under a single integrity and maintenance standard',
          'Infill and compression programmes extending Mahakam field life',
          'Decommissioning liabilities funded and scheduled from sanction',
        ],
      },
    ],
  },
};

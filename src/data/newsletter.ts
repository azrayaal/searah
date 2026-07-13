import type { NewsArticle, NewsCategory } from '@/types';

/**
 * Newsletter collection.
 *
 * `entityId` carries the entity code ("SM", "SK", "SMB") or `null` for
 * group-wide corporate news. Entity pages filter this list by that field.
 * Articles are ordered newest first.
 */
export const news: NewsArticle[] = [
  /* ---------------------------------------------------------------- 1 — SK */
  {
    id: 'news-2026-07-09-geng-north-fid',
    slug: 'geng-north-final-investment-decision',
    title: 'Board sanctions Geng North, the largest development in Searah’s portfolio',
    excerpt:
      'The USD 4.6bn deepwater gas project has taken final investment decision, anchoring a shared hub in the North Ganal area that will accept third-party tiebacks from 2029.',
    category: 'Corporate',
    entityId: 'SK',
    date: '2026-07-09',
    readingTime: '6 min read',
    author: { name: 'Andi Mappanyukki', role: 'Head of Corporate Communications' },
    thumbnail: {
      src: '/media/drilling.jpg',
      alt: 'Deepwater drilling unit operating over the Geng North field',
    },
    cover: {
      src: '/media/drilling.jpg',
      alt: 'Deepwater drilling unit operating over the Geng North field at first light',
      caption: 'The Geng North discovery well was drilled in 1,950 metres of water in 2023.',
      credit: 'Searah Kutai',
    },
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'Searah’s board has taken final investment decision on Geng North, committing USD 4.6bn to the development of the largest discovery made in the Kutai Basin in twenty years. The decision follows three years of appraisal, subsurface modelling and front-end engineering, and clears the way for first gas in 2029.',
      },
      {
        type: 'paragraph',
        text: 'The field sits in 1,950 metres of water in the North Ganal area of the Makassar Strait and holds an estimated 660 million barrels of oil equivalent of contingent resource. Searah Kutai holds a 70 per cent working interest and will operate the development on behalf of the partnership.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Capital commitment', value: 'USD 4.6bn' },
          { label: 'Resource (2C)', value: '660 MMBOE' },
          { label: 'Water depth', value: '1,950 m' },
          { label: 'Target first gas', value: '2029' },
        ],
      },
      { type: 'heading', text: 'An open-access hub, not a single field' },
      {
        type: 'paragraph',
        text: 'What separates Geng North from a conventional deepwater project is the way its surface facilities have been sized. The floating production unit has been specified with roughly 30 per cent spare processing capacity, deliberately oversized so that neighbouring discoveries can be tied back rather than each carrying the cost of its own host.',
      },
      {
        type: 'paragraph',
        text: 'That approach was tested at Merakes, where a subsea tieback to the Jangkrik floating unit reached payback inside thirty months without adding a single new surface facility. Geng North applies the same logic at a far larger scale, and the commercial framework for third-party access has been agreed with the regulator in advance of construction.',
      },
      {
        type: 'quote',
        text: 'We could have built a fence around Geng North and produced it on our own. A hub that other operators can plug into is worth more to the basin, and in the end it is worth more to us.',
        attribution: 'Alessandro Conti, Managing Director, Searah Kutai',
      },
      {
        type: 'image',
        media: {
          src: '/media/subsea.jpg',
          alt: 'Subsea manifold being prepared for installation on the seabed',
          caption: 'Nine subsea wells will be drilled in two phases and tied into two manifolds.',
        },
      },
      { type: 'heading', text: 'What happens next' },
      {
        type: 'list',
        items: [
          'Nine subsea development wells drilled in two phases from 2027',
          'Two production manifolds and a 24-inch gas export line to the East Kalimantan grid',
          'Floating production unit contracted with 30 per cent reserved capacity for tiebacks',
          'All-electric subsea control system, a first for the Indonesian portfolio',
          'Approximately 4,000 construction roles at peak, with local content targeted at 55 per cent',
        ],
      },
      {
        type: 'paragraph',
        text: 'Long-lead orders for the subsea production system and the export line will be placed before the end of the third quarter. The rig contract for the first drilling phase is in final negotiation, and site survey work over the well locations is already complete.',
      },
    ],
    attachments: [
      {
        id: 'att-geng-north-pr',
        title: 'Press release — Geng North final investment decision',
        type: 'PDF',
        size: '284 KB',
        href: '#',
      },
      {
        id: 'att-geng-north-fact',
        title: 'Geng North project fact sheet',
        type: 'PDF',
        size: '1.6 MB',
        href: '#',
      },
      {
        id: 'att-geng-north-deck',
        title: 'Investor presentation — North Kutai hub strategy',
        type: 'PPTX',
        size: '8.2 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/drilling.jpg', alt: 'Drilling unit on location over Geng North' },
      { src: '/media/subsea.jpg', alt: 'Subsea manifold on the quayside before load-out' },
      { src: '/media/fpso.jpg', alt: 'Floating production unit of the type selected for Geng North' },
      { src: '/media/boardroom.jpg', alt: 'Board members at the sanction meeting in Jakarta' },
    ],
    tags: ['Geng North', 'FID', 'Deepwater', 'Kutai Basin', 'Gas'],
  },

  /* ------------------------------------------------------------- 2 — Group */
  {
    id: 'news-2026-07-02-half-year-update',
    slug: 'half-year-operational-update-2026',
    title: 'Half-year update: group production averages 305,400 BOE/D',
    excerpt:
      'Searah closed the first six months of 2026 above plan, with strong uptime across the Mahakam hubs offsetting a planned shutdown at Kikeh.',
    category: 'Corporate',
    entityId: null,
    date: '2026-07-02',
    readingTime: '5 min read',
    author: { name: 'Giulia Ferraro', role: 'Group Head of Investor Relations' },
    thumbnail: { src: '/media/office-hq.jpg', alt: 'Searah headquarters building in Jakarta' },
    cover: {
      src: '/media/office-hq.jpg',
      alt: 'Searah group headquarters in Jakarta on a clear morning',
      caption: 'The half-year results were presented at the group headquarters on 2 July.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Group production averaged 305,400 barrels of oil equivalent per day over the first half of 2026, ahead of the 298,000 BOE/D guidance issued in January. Gas accounted for 71 per cent of the mix, in line with the shape of the portfolio and the group’s stated preference for gas-weighted growth.',
      },
      {
        type: 'stat',
        items: [
          { label: 'H1 production', value: '305,400 BOE/D' },
          { label: 'Gas share', value: '71%' },
          { label: 'Operated uptime', value: '96.8%' },
          { label: 'Capex deployed', value: 'USD 2.4bn' },
        ],
      },
      {
        type: 'paragraph',
        text: 'The Mahakam hubs carried the half. North Mahakam ran at 96.8 per cent uptime despite a five-day weather stand-down in March, and the infill programme at South Mahakam delivered three wells ahead of schedule. Those gains absorbed the impact of a planned 21-day shutdown on the Kikeh floating production unit, which was completed two days early.',
      },
      { type: 'heading', text: 'Capital discipline against a USD 20bn programme' },
      {
        type: 'paragraph',
        text: 'Some USD 2.4bn of capital was deployed in the period, roughly a quarter of the annual envelope. The bulk went to the Peciko Deep tieback and the Merakes East subsea scope, both of which remain inside their sanctioned cost estimates.',
      },
      {
        type: 'quote',
        text: 'A good half-year is not a reason to accelerate spending. The five-year programme is sized for a range of prices, and we intend to hold that line whether the market is kind to us or not.',
        attribution: 'Giulia Ferraro, Group Head of Investor Relations',
      },
      {
        type: 'list',
        items: [
          'Geng North sanctioned in July at USD 4.6bn',
          'Peciko Deep engineering 62 per cent complete against a 2028 first gas date',
          'Merakes East subsea EPC awarded, first gas confirmed for 2027',
          'Kasawari carbon capture facility passed three million tonnes of cumulative CO₂ storage',
        ],
      },
      {
        type: 'paragraph',
        text: 'Full-year guidance has been raised modestly to a range of 300,000 to 308,000 BOE/D. The group continues to target more than 500,000 BOE/D by 2029, with Geng North, Peciko Deep and Rotan the three developments that carry most of that increment.',
      },
    ],
    attachments: [
      {
        id: 'att-h1-release',
        title: 'H1 2026 operational update — press release',
        type: 'PDF',
        size: '412 KB',
        href: '#',
      },
      {
        id: 'att-h1-deck',
        title: 'H1 2026 results presentation',
        type: 'PDF',
        size: '5.4 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/office-hq.jpg', alt: 'Group headquarters exterior' },
      { src: '/media/control-room.jpg', alt: 'Production data on the integrated operations centre wall' },
      { src: '/media/offshore-platform.jpg', alt: 'North Mahakam central processing complex' },
    ],
    tags: ['Results', 'Production', 'Guidance', 'Capital discipline', 'Group'],
  },

  /* --------------------------------------------------------------- 3 — SMB */
  {
    id: 'news-2026-06-24-kasawari-ccs',
    slug: 'kasawari-carbon-capture-three-million-tonnes',
    title: 'Kasawari carbon capture facility passes three million tonnes stored',
    excerpt:
      'The Sarawak project has now reinjected more CO₂ than any other offshore scheme in Southeast Asia, and injectivity in the depleted reservoir is holding above forecast.',
    category: 'Sustainability',
    entityId: 'SMB',
    date: '2026-06-24',
    readingTime: '5 min read',
    author: { name: 'Nurul Aisyah Rahman', role: 'Carbon Management Lead, Searah Malaysia Borneo' },
    thumbnail: { src: '/media/gas-plant.jpg', alt: 'Kasawari gas processing and carbon capture platform' },
    cover: {
      src: '/media/gas-plant.jpg',
      alt: 'The Kasawari carbon capture platform offshore Sarawak',
      caption: 'Kasawari separates CO₂ from raw gas before it reaches the Bintulu LNG complex.',
      credit: 'Searah Malaysia Borneo',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The carbon capture facility at Kasawari has passed three million tonnes of cumulative CO₂ injected since start-up, a threshold reached in the third week of June. The plant strips carbon dioxide from a high-CO₂ gas stream and reinjects it into a depleted reservoir some 130 kilometres away, before the sales gas reaches the Bintulu liquefaction complex.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Cumulative CO₂ stored', value: '3.04 Mt' },
          { label: 'Annual capture rate', value: '3.3 Mt/yr' },
          { label: 'Injection availability', value: '94.1%' },
          { label: 'Storage site distance', value: '130 km' },
        ],
      },
      { type: 'heading', text: 'Injectivity is the number that matters' },
      {
        type: 'paragraph',
        text: 'Capture is the visible half of the project. The half that determines whether it works over decades is injectivity, which is how readily the storage reservoir accepts the CO₂ without pressure building at the wellhead. Kasawari’s three injection wells are running at pressures roughly 8 per cent below the modelled case, which suggests the storage complex has more capacity than the original assessment credited it with.',
      },
      {
        type: 'paragraph',
        text: 'A permanent seismic monitoring array installed on the seabed above the storage site has now completed two baseline surveys. Neither has detected any migration of the CO₂ plume outside the modelled containment envelope, and results are shared with the Malaysian regulator on a quarterly cycle.',
      },
      {
        type: 'quote',
        text: 'People ask whether the CO₂ stays put. Two years of monitoring data says it does, and we publish that data rather than asking anyone to take our word for it.',
        attribution: 'Nurul Aisyah Rahman, Carbon Management Lead',
      },
      {
        type: 'image',
        media: {
          src: '/media/pipelines.jpg',
          alt: 'Carbon dioxide export pipeline running from the Kasawari platform',
          caption: 'The dense-phase CO₂ line runs 130 kilometres to the storage site.',
        },
      },
      {
        type: 'list',
        items: [
          'Three injection wells, all running below modelled wellhead pressure',
          'Seabed seismic array with two completed baseline surveys',
          'Quarterly containment reporting to the regulator',
          'Design study underway for a fourth injector to accept third-party CO₂',
        ],
      },
      {
        type: 'paragraph',
        text: 'A study is now running on a fourth injection well that would allow the storage complex to accept CO₂ from other operators in the Sarawak province. If it proceeds, Kasawari would move from being a project that manages its own emissions to a piece of shared infrastructure for the region.',
      },
    ],
    attachments: [
      {
        id: 'att-kasawari-fact',
        title: 'Kasawari CCS fact sheet 2026',
        type: 'PDF',
        size: '2.1 MB',
        href: '#',
      },
      {
        id: 'att-kasawari-monitor',
        title: 'Storage containment monitoring summary — Q2 2026',
        type: 'PDF',
        size: '3.7 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/gas-plant.jpg', alt: 'Kasawari processing platform at sea' },
      { src: '/media/pipelines.jpg', alt: 'CO₂ export pipeline spool on the deck' },
      { src: '/media/control-room.jpg', alt: 'Injection monitoring screens in the Bintulu control room' },
    ],
    tags: ['CCS', 'Kasawari', 'Sarawak', 'Emissions', 'Storage', 'Malaysia'],
  },

  /* ------------------------------------------------------------- 4 — Group */
  {
    id: 'news-2026-06-11-graduate-intake',
    slug: 'graduate-programme-2026-intake',
    title: '128 graduates join Searah across Indonesia and Malaysia',
    excerpt:
      'The 2026 intake is the largest since the joint venture was formed, with two-thirds of places going to engineering and subsurface disciplines.',
    category: 'People',
    entityId: null,
    date: '2026-06-11',
    readingTime: '4 min read',
    author: { name: 'Dewi Anggraini', role: 'Group Head of Talent Development' },
    thumbnail: { src: '/media/team-meeting.jpg', alt: 'Graduate trainees during induction week' },
    cover: {
      src: '/media/team-meeting.jpg',
      alt: 'Graduate trainees in a workshop session during induction week',
      caption: 'The 2026 intake began with a two-week induction in Balikpapan.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'One hundred and twenty-eight graduates joined the group in June, drawn from 41 universities across Indonesia and Malaysia. It is the largest single intake since the joint venture was formed, and the first in which the number of applications passed twelve thousand.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Graduates hired', value: '128' },
          { label: 'Applications received', value: '12,400' },
          { label: 'Women in the intake', value: '41%' },
          { label: 'Universities represented', value: '41' },
        ],
      },
      { type: 'heading', text: 'Two years, three postings' },
      {
        type: 'paragraph',
        text: 'The programme runs for two years and moves each graduate through three postings, at least one of which is offshore or at a field site. That structure exists because the group has found that engineers who have stood on a platform deck make better decisions later when they are sitting in an office in Jakarta or Kuala Lumpur.',
      },
      {
        type: 'list',
        items: [
          'Reservoir and petroleum engineering — 34 places',
          'Subsea, structural and facilities engineering — 31 places',
          'Geoscience and subsurface — 21 places',
          'HSE and process safety — 14 places',
          'Finance, supply chain and commercial — 28 places',
        ],
      },
      {
        type: 'quote',
        text: 'We are not hiring for the fields we run today. We are hiring for the people who will run Geng North in 2032, and they are sitting in this room.',
        attribution: 'Dewi Anggraini, Group Head of Talent Development',
      },
      {
        type: 'image',
        media: {
          src: '/media/engineers.jpg',
          alt: 'Two graduate engineers reviewing drawings at a field site',
          caption: 'Every graduate spends at least one rotation at an operating site.',
        },
      },
      {
        type: 'paragraph',
        text: 'Retention from the previous three cohorts stands at 89 per cent at the three-year mark, which is high for the sector. Applications for the 2027 intake open in October, and for the first time will include a dedicated stream for carbon management and subsurface storage.',
      },
    ],
    attachments: [
      {
        id: 'att-grad-brochure',
        title: 'Searah Graduate Programme brochure 2027',
        type: 'PDF',
        size: '4.3 MB',
        href: '#',
      },
      {
        id: 'att-grad-factsheet',
        title: 'Early careers fact sheet',
        type: 'PDF',
        size: '780 KB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/team-meeting.jpg', alt: 'Induction workshop in Balikpapan' },
      { src: '/media/engineers.jpg', alt: 'Graduate engineers on a site visit' },
      { src: '/media/worker-ppe.jpg', alt: 'Trainee in personal protective equipment during offshore survival training' },
    ],
    tags: ['Graduates', 'Early careers', 'Recruitment', 'Talent', 'Group'],
  },

  /* ---------------------------------------------------------------- 5 — SM */
  {
    id: 'news-2026-05-28-peciko-tieback',
    slug: 'peciko-deep-longest-subsea-tieback',
    title: 'Peciko Deep: engineering the group’s longest subsea tieback',
    excerpt:
      'At 62 kilometres, the line linking Peciko Deep to the North Mahakam complex pushes flow assurance to its limits. The team explains how the design holds together.',
    category: 'Technology',
    entityId: 'SM',
    date: '2026-05-28',
    readingTime: '7 min read',
    author: { name: 'Marco Bellini', role: 'Subsea Engineering Manager, Searah Mahakam' },
    thumbnail: { src: '/media/subsea.jpg', alt: 'Subsea production tree prepared for installation at Peciko Deep' },
    cover: {
      src: '/media/subsea.jpg',
      alt: 'Subsea production tree on the deck of an installation vessel',
      caption: 'Peciko Deep will produce through five subsea wells in 1,120 metres of water.',
      credit: 'Searah Mahakam',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Peciko Deep took final investment decision in the first quarter of this year, with USD 3.1bn sanctioned against a 2028 first gas date. The development itself is conventional enough: five subsea wells in 1,120 metres of water, a manifold, and a line back to shore. What is not conventional is the length of that line.',
      },
      {
        type: 'paragraph',
        text: 'Sixty-two kilometres separates the Peciko manifold from the North Mahakam central processing complex. That distance makes it the longest tieback in the group’s Indonesian portfolio, and it is long enough that the fluid arriving at the host has cooled to close to seabed temperature. Cold gas with condensate in it is exactly the condition in which hydrates form and block a pipeline.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Tieback length', value: '62 km' },
          { label: 'Water depth', value: '1,120 m' },
          { label: 'Sanctioned capex', value: 'USD 3.1bn' },
          { label: 'Subsea wells', value: '5' },
        ],
      },
      { type: 'heading', text: 'Keeping the line warm, or keeping it dry' },
      {
        type: 'paragraph',
        text: 'There are two ways to stop hydrates forming. Keep the fluid above the hydrate formation temperature, or keep the water out of it. Electrically heat-traced pipe-in-pipe does the first and costs a great deal. Continuous chemical injection does the second and creates a lifetime dependency on a supply chain that has to reach the seabed every day for twenty years.',
      },
      {
        type: 'paragraph',
        text: 'The design that was sanctioned uses passive insulation to hold the fluid above the hydrate boundary during normal flow, with heat tracing over the final eight kilometres where the temperature margin is thinnest, and methanol injection reserved for restart after a shutdown. It is a hybrid, and hybrids are usually a sign of a team that has argued properly.',
      },
      {
        type: 'quote',
        text: 'The elegant answer was to heat-trace the whole line. The right answer was to work out which eight kilometres actually needed it, and that took us four months of modelling.',
        attribution: 'Marco Bellini, Subsea Engineering Manager',
      },
      {
        type: 'image',
        media: {
          src: '/media/pipelines.jpg',
          alt: 'Pipeline joints stacked at the fabrication yard ahead of offshore installation',
          caption: 'Line pipe for the tieback is being coated at a yard in Batam.',
        },
      },
      { type: 'heading', text: 'Zero flaring from day one' },
      {
        type: 'list',
        items: [
          'No routine flaring in the design case, including during commissioning',
          'All-electric subsea controls, removing hydraulic fluid discharge to sea',
          'Spare capacity in the umbilical for a future sixth well',
          'Digital twin of the flowline running against live data from first gas',
        ],
      },
      {
        type: 'paragraph',
        text: 'Line pipe coating is underway at a yard in Batam and the subsea production system is in fabrication. Installation of the flowline is scheduled across two weather windows in 2027, with the drilling campaign following immediately behind it.',
      },
    ],
    attachments: [
      {
        id: 'att-peciko-fact',
        title: 'Peciko Deep project fact sheet',
        type: 'PDF',
        size: '1.9 MB',
        href: '#',
      },
      {
        id: 'att-peciko-tech',
        title: 'Flow assurance design summary — Peciko Deep tieback',
        type: 'PDF',
        size: '3.2 MB',
        href: '#',
      },
      {
        id: 'att-peciko-deck',
        title: 'Peciko Deep execution plan presentation',
        type: 'PPTX',
        size: '6.8 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/subsea.jpg', alt: 'Subsea tree awaiting load-out' },
      { src: '/media/pipelines.jpg', alt: 'Coated line pipe stacked at the Batam yard' },
      { src: '/media/engineers.jpg', alt: 'Engineers reviewing the flowline model' },
      { src: '/media/offshore-platform.jpg', alt: 'North Mahakam complex, the host for the Peciko tieback' },
    ],
    tags: ['Peciko Deep', 'Subsea', 'Flow assurance', 'Tieback', 'Engineering', 'Mahakam'],
  },

  /* --------------------------------------------------------------- 6 — SMB */
  {
    id: 'news-2026-05-14-kikeh-lti-free',
    slug: 'kikeh-one-thousand-days-lti-free',
    title: 'Kikeh Deepwater reaches 1,000 days without a lost time injury',
    excerpt:
      'The milestone covers the FPSO, the dry-tree unit and every contractor crew that has worked on the facility since mid-2023.',
    category: 'Safety',
    entityId: 'SMB',
    date: '2026-05-14',
    readingTime: '4 min read',
    author: { name: 'Faridah binti Osman', role: 'HSE Manager, Searah Malaysia Borneo' },
    thumbnail: { src: '/media/worker-ppe.jpg', alt: 'Offshore technician in full personal protective equipment' },
    cover: {
      src: '/media/fpso.jpg',
      alt: 'The Kikeh FPSO on station offshore Sabah',
      caption: 'Kikeh has been producing since 2007 and now hosts three satellite tiebacks.',
      credit: 'Searah Malaysia Borneo',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The Kikeh Deepwater facility offshore Sabah has completed one thousand consecutive days without a lost time injury. The count runs from August 2023 and covers the FPSO, the dry-tree unit and every contractor crew that has set foot on either during that period, including the 340 people who mobilised for last year’s turnaround.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Days LTI-free', value: '1,000' },
          { label: 'Exposure hours', value: '4.1 million' },
          { label: 'Contractor share of hours', value: '58%' },
          { label: 'FPSO uptime 2025', value: '98.4%' },
        ],
      },
      { type: 'heading', text: 'Stopping work is not a failure' },
      {
        type: 'paragraph',
        text: 'The number that the team is proudest of is not the thousand. It is 2,847, which is how many stop-work interventions were logged over the same period. A stop-work card is raised whenever anyone on the facility decides a task is not safe to continue, and it carries no penalty and no argument.',
      },
      {
        type: 'paragraph',
        text: 'Roughly a third of those cards were raised by contractor personnel rather than Searah staff, which is the figure the HSE team watches most closely. A safety culture that only the operator’s own employees feel able to use is not a safety culture at all.',
      },
      {
        type: 'quote',
        text: 'A thousand days is the result. The stop-work cards are the reason. When a scaffolder feels able to halt a lift because something looks wrong, that is when you know it is working.',
        attribution: 'Faridah binti Osman, HSE Manager, Searah Malaysia Borneo',
      },
      {
        type: 'image',
        media: {
          src: '/media/helicopter.jpg',
          alt: 'Helicopter approaching the Kikeh helideck during a crew change',
          caption: 'Crew changes run weekly from Labuan.',
        },
      },
      {
        type: 'list',
        items: [
          'Permit-to-work fully digitised in 2024, cutting permit errors by 61 per cent',
          'Dropped-object survey completed on every deck level ahead of the 2025 turnaround',
          'Contractor supervisors included in the daily operations call',
          'Fatigue management standard applied to contractor rosters, not only staff rosters',
        ],
      },
      {
        type: 'paragraph',
        text: 'The team is not treating the milestone as a finish line. A structural inspection campaign begins in the fourth quarter, and the standing view on the facility is that the most dangerous day is the one after a record is announced.',
      },
    ],
    attachments: [
      {
        id: 'att-kikeh-safety',
        title: 'Kikeh safety performance summary 2023–2026',
        type: 'PDF',
        size: '1.2 MB',
        href: '#',
      },
      {
        id: 'att-kikeh-swa',
        title: 'Stop-work authority standard',
        type: 'PDF',
        size: '640 KB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/fpso.jpg', alt: 'Kikeh FPSO on station' },
      { src: '/media/worker-ppe.jpg', alt: 'Technician carrying out a routine inspection' },
      { src: '/media/helicopter.jpg', alt: 'Helicopter on the Kikeh helideck' },
    ],
    tags: ['Safety', 'Kikeh', 'LTI-free', 'Stop-work authority', 'Sabah', 'Contractors'],
  },

  /* ------------------------------------------------------------- 7 — Group */
  {
    id: 'news-2026-04-30-balikpapan-ioc',
    slug: 'balikpapan-integrated-operations-centre',
    title: 'Balikpapan integrated operations centre goes live across all Indonesian assets',
    excerpt:
      'Nine fields are now supervised from a single floor, with the unmanned Bekapai platform run entirely from shore.',
    category: 'Technology',
    entityId: null,
    date: '2026-04-30',
    readingTime: '5 min read',
    author: { name: 'Bayu Prasetyo', role: 'Group Head of Digital Operations' },
    thumbnail: { src: '/media/control-room.jpg', alt: 'Operators at the integrated operations centre in Balikpapan' },
    cover: {
      src: '/media/control-room.jpg',
      alt: 'The main floor of the Balikpapan integrated operations centre',
      caption: 'Nine Indonesian fields are supervised from the Balikpapan centre.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The integrated operations centre in Balikpapan has taken over live supervision of all nine producing fields in the Indonesian portfolio, completing a phased handover that began in late 2024. The centre pulls real-time data from every wellhead, compressor and export meter across the Mahakam and Kutai hubs onto a single floor.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Fields supervised', value: '9' },
          { label: 'Live data tags', value: '410,000' },
          { label: 'Unplanned trips avoided', value: '37 in 12 months' },
          { label: 'Offshore trips reduced', value: '22%' },
        ],
      },
      { type: 'heading', text: 'From dashboards to decisions' },
      {
        type: 'paragraph',
        text: 'The first generation of remote operations centres tended to be expensive television screens. Data arrived, people looked at it, and the decisions were still taken offshore by whoever happened to be on shift. The difference in Balikpapan is that the centre holds authority. Production optimisation decisions on the Mahakam hubs are made on the floor, and the offshore teams execute them.',
      },
      {
        type: 'paragraph',
        text: 'Bekapai goes furthest. The platform is a normally unmanned installation and is now supervised entirely from shore, with crews visiting only for planned maintenance. That has taken 22 per cent of routine helicopter trips out of the Mahakam schedule, which is a safety benefit before it is a cost one.',
      },
      {
        type: 'quote',
        text: 'The measure of the centre is not how many screens it has. It is whether the person offshore trusts the call being made onshore, and that trust took two years to build.',
        attribution: 'Bayu Prasetyo, Group Head of Digital Operations',
      },
      {
        type: 'image',
        media: {
          src: '/media/offshore-night.jpg',
          alt: 'The unmanned Bekapai platform lit at night',
          caption: 'Bekapai is now supervised entirely from Balikpapan.',
        },
      },
      {
        type: 'list',
        items: [
          'Predictive models on 68 rotating machines, flagging degradation before trip',
          'Thirty-seven unplanned compressor trips avoided in the last twelve months',
          'Common alarm philosophy applied across all nine fields',
          'Malaysian assets scheduled to connect via a Kuala Lumpur node in 2027',
        ],
      },
      {
        type: 'paragraph',
        text: 'A parallel node in Kuala Lumpur is planned for 2027, which would bring the Sarawak and Sabah assets onto the same data model. The intent is not to centralise everything in one building but to make sure that an engineer in either country is looking at the same numbers.',
      },
    ],
    attachments: [
      {
        id: 'att-ioc-fact',
        title: 'Integrated operations centre fact sheet',
        type: 'PDF',
        size: '1.5 MB',
        href: '#',
      },
      {
        id: 'att-ioc-deck',
        title: 'Digital operations roadmap 2026–2029',
        type: 'PPTX',
        size: '7.1 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/control-room.jpg', alt: 'Operations centre main floor' },
      { src: '/media/offshore-night.jpg', alt: 'Bekapai platform at night' },
      { src: '/media/engineers.jpg', alt: 'Engineers reviewing predictive maintenance alerts' },
      { src: '/media/helicopter.jpg', alt: 'Helicopter departing for a planned maintenance visit' },
    ],
    tags: ['Digital', 'Remote operations', 'Balikpapan', 'Predictive maintenance', 'Group'],
  },

  /* ---------------------------------------------------------------- 8 — SK */
  {
    id: 'news-2026-04-16-gendalo-obn',
    slug: 'gendalo-ocean-bottom-node-survey',
    title: 'Ocean-bottom node survey completed over Gendalo',
    excerpt:
      'A 96-day acquisition campaign has produced the sharpest subsurface image yet of the Ganal play, and the first appraisal well location has been fixed.',
    category: 'Operations',
    entityId: 'SK',
    date: '2026-04-16',
    readingTime: '5 min read',
    author: { name: 'Lorenzo Ricci', role: 'Exploration Manager, Searah Kutai' },
    thumbnail: { src: '/media/seismic-vessel.jpg', alt: 'Seismic vessel deploying ocean-bottom nodes' },
    cover: {
      src: '/media/seismic-vessel.jpg',
      alt: 'Seismic survey vessel working over the Gendalo prospect in the Makassar Strait',
      caption: 'The survey deployed 14,000 nodes across 1,850 square kilometres of seabed.',
      credit: 'Searah Kutai',
    },
    content: [
      {
        type: 'paragraph',
        text: 'A 96-day ocean-bottom node survey over the Gendalo area has completed acquisition, covering 1,850 square kilometres of seabed in water depths reaching 1,760 metres. Roughly 14,000 nodes were placed and recovered by remotely operated vehicles, with a recovery rate of 99.6 per cent.',
      },
      {
        type: 'paragraph',
        text: 'Node surveys sit still on the seabed rather than being towed behind a vessel, which lets them record the full wavefield including shear energy. In a basin where thick, gas-charged shallow sediments scatter conventional streamer data, that difference is the whole point of the exercise.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Area acquired', value: '1,850 km²' },
          { label: 'Nodes deployed', value: '14,000' },
          { label: 'Acquisition days', value: '96' },
          { label: 'Node recovery rate', value: '99.6%' },
        ],
      },
      { type: 'heading', text: 'Testing the Geng North play' },
      {
        type: 'paragraph',
        text: 'Gendalo tests the same deepwater turbidite play that delivered Geng North, the largest discovery made in the Kutai Basin in twenty years. The prospect was mapped on legacy streamer data with enough confidence to justify a licence commitment, but not enough to place a well with USD 90m of rig time behind it.',
      },
      {
        type: 'quote',
        text: 'We were looking at the reservoir through frosted glass. The node data is the first time we have been able to see the internal architecture of the fan rather than just its outline.',
        attribution: 'Lorenzo Ricci, Exploration Manager, Searah Kutai',
      },
      {
        type: 'image',
        media: {
          src: '/media/subsea.jpg',
          alt: 'Remotely operated vehicle used to place seismic nodes on the seabed',
          caption: 'Nodes were placed and recovered by ROV rather than dropped from surface.',
        },
      },
      {
        type: 'list',
        items: [
          'Fast-track processing volume delivered in June, full depth migration due in Q4',
          'First appraisal well location fixed, spud scheduled for early 2027',
          'A second appraisal well held in reserve pending the first result',
          'Reprocessing of legacy data over the neighbouring blocks now underway',
        ],
      },
      {
        type: 'paragraph',
        text: 'The fast-track volume was delivered in June and has already been used to fix the first appraisal well location. Full pre-stack depth migration is expected in the fourth quarter, ahead of a spud date in early 2027.',
      },
    ],
    attachments: [
      {
        id: 'att-gendalo-fact',
        title: 'Gendalo appraisal campaign fact sheet',
        type: 'PDF',
        size: '1.4 MB',
        href: '#',
      },
      {
        id: 'att-gendalo-survey',
        title: 'OBN acquisition close-out report — summary',
        type: 'PDF',
        size: '4.9 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/seismic-vessel.jpg', alt: 'Survey vessel on location over Gendalo' },
      { src: '/media/subsea.jpg', alt: 'ROV deploying a seismic node' },
      { src: '/media/engineers.jpg', alt: 'Geoscientists reviewing fast-track seismic volumes' },
    ],
    tags: ['Exploration', 'Gendalo', 'Seismic', 'Ocean-bottom nodes', 'Kutai Basin'],
  },

  /* ---------------------------------------------------------------- 9 — SM */
  {
    id: 'news-2026-04-02-tunu-mangrove',
    slug: 'tunu-mangrove-rehabilitation-milestone',
    title: 'Tunu mangrove programme passes 1,900 hectares rehabilitated',
    excerpt:
      'Five years of planting in the Mahakam delta has restored more mangrove than the operation occupies, and the survival rate is holding above 80 per cent.',
    category: 'Sustainability',
    entityId: 'SM',
    date: '2026-04-02',
    readingTime: '5 min read',
    author: { name: 'Siti Nuraini', role: 'Environment and Social Performance Lead, Searah Mahakam' },
    thumbnail: { src: '/media/mangrove.jpg', alt: 'Mangrove seedlings planted along a delta channel' },
    cover: {
      src: '/media/mangrove.jpg',
      alt: 'Restored mangrove forest lining a channel in the Mahakam delta',
      caption: 'The Tunu field is developed from clustered pads within the delta mangrove system.',
      credit: 'Searah Mahakam',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The mangrove rehabilitation programme running alongside the Tunu field has passed 1,900 hectares replanted since it began in 2021. That is more than four times the area the field’s clustered well pads and access channels physically occupy, and it puts the operation into net gain on mangrove cover within its concession.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Hectares rehabilitated', value: '1,900' },
          { label: 'Seedling survival at 3 years', value: '82%' },
          { label: 'Households employed', value: '340' },
          { label: 'Village nurseries', value: '11' },
        ],
      },
      { type: 'heading', text: 'Planting is the easy part' },
      {
        type: 'paragraph',
        text: 'Mangrove restoration has a poor reputation in the industry, largely because it is easy to plant a great many seedlings and photograph them, and much harder to come back three years later and find them alive. Early plots in this programme lost more than half their seedlings, mostly because the species chosen suited the photograph rather than the salinity of the site.',
      },
      {
        type: 'paragraph',
        text: 'The approach changed in 2023. Hydrology is now surveyed before any planting, species are matched to the tidal range of each specific plot, and eleven village-run nurseries supply the stock rather than a single central supplier. Survival at the three-year mark has climbed to 82 per cent.',
      },
      {
        type: 'quote',
        text: 'The measure is not how many seedlings go in the ground. It is how many are still standing when nobody is taking photographs any more.',
        attribution: 'Siti Nuraini, Environment and Social Performance Lead',
      },
      {
        type: 'image',
        media: {
          src: '/media/coastline.jpg',
          alt: 'Aerial view of the Mahakam delta coastline with restored mangrove belts',
          caption: 'Restored belts act as a buffer against coastal erosion in the delta.',
        },
      },
      {
        type: 'list',
        items: [
          'Eleven village nurseries supply all seedlings, employing 340 households',
          'Hydrological survey required before any plot is approved for planting',
          'Independent verification of survival rates by Universitas Mulawarman',
          'Blue carbon accounting audited annually and published in the sustainability report',
        ],
      },
      {
        type: 'paragraph',
        text: 'Survival monitoring is verified independently by Universitas Mulawarman in Samarinda, and the resulting blue carbon accounting is audited before it appears in the group sustainability report. The programme is now being adapted for the coastal margin of the Handil field, where the tidal regime is different enough to need its own species mix.',
      },
    ],
    attachments: [
      {
        id: 'att-tunu-env',
        title: 'Tunu mangrove programme — five-year review',
        type: 'PDF',
        size: '6.2 MB',
        href: '#',
      },
      {
        id: 'att-tunu-fact',
        title: 'Biodiversity and blue carbon fact sheet',
        type: 'PDF',
        size: '1.1 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/mangrove.jpg', alt: 'Mangrove seedlings in a delta plot' },
      { src: '/media/coastline.jpg', alt: 'Mahakam delta coastline from the air' },
      { src: '/media/team-meeting.jpg', alt: 'Village nursery workers meeting the environment team' },
    ],
    tags: ['Mangrove', 'Biodiversity', 'Tunu', 'Blue carbon', 'Community', 'Mahakam'],
  },

  /* ------------------------------------------------------------ 10 — Group */
  {
    id: 'news-2026-03-19-emissions-intensity',
    slug: 'group-emissions-intensity-2025',
    title: 'Emissions intensity falls to 13.4 kg CO₂e per BOE',
    excerpt:
      'The 2025 sustainability report shows a fifth consecutive annual reduction, driven by field electrification and the end of routine flaring at Handil.',
    category: 'Sustainability',
    entityId: null,
    date: '2026-03-19',
    readingTime: '6 min read',
    author: { name: 'Chiara Mancini', role: 'Group Head of Sustainability' },
    thumbnail: { src: '/media/renewables.jpg', alt: 'Solar array supplying power to an operating facility' },
    cover: {
      src: '/media/renewables.jpg',
      alt: 'Solar array installed alongside an onshore processing facility',
      caption: 'Solar hybrid power now supplies part of the load at two operated sites.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Group upstream emissions intensity fell to 13.4 kilogrammes of CO₂ equivalent per barrel of oil equivalent in 2025, down from 15.1 the year before. It is the fifth consecutive annual reduction and puts the group ahead of the trajectory set out at the time of the joint venture.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Emissions intensity', value: '13.4 kg CO₂e/BOE' },
          { label: 'Reduction on 2024', value: '11%' },
          { label: 'Methane intensity', value: '0.14%' },
          { label: 'Routine flaring', value: 'Zero at operated sites' },
        ],
      },
      { type: 'heading', text: 'Where the reduction came from' },
      {
        type: 'paragraph',
        text: 'Three things account for most of the improvement. Full field electrification at North Mahakam removed a large block of gas-fired turbine load. Routine flaring at Handil was eliminated in 2024, and the 2025 figure captures the first full year of that. And the Kasawari carbon capture facility ran at high availability through its second year.',
      },
      {
        type: 'paragraph',
        text: 'Methane intensity now stands at 0.14 per cent of gas marketed, below the 0.20 per cent threshold under the Oil and Gas Methane Partnership. That figure is measured rather than estimated: aerial surveys and fixed optical sensors have replaced emission factors across the operated portfolio, and measured numbers are usually less flattering than calculated ones.',
      },
      {
        type: 'quote',
        text: 'Anyone can report a low methane number if they calculate it from a factor table. We measure ours, and we would rather publish an uncomfortable figure that is true.',
        attribution: 'Chiara Mancini, Group Head of Sustainability',
      },
      {
        type: 'image',
        media: {
          src: '/media/flare-stack.jpg',
          alt: 'An unlit flare stack at the Handil field following the end of routine flaring',
          caption: 'Routine flaring at Handil ended in 2024. The stack remains for emergency relief only.',
        },
      },
      { type: 'heading', text: 'The harder half' },
      {
        type: 'list',
        items: [
          'Zero routine flaring across all operated sites, sustained through 2025',
          'Field electrification complete at North Mahakam, in design at Sisi–Nubi',
          'Solar hybrid power in service at Baram Delta',
          'Target of 10 kg CO₂e/BOE by 2030, with CCS carrying most of the remaining gap',
        ],
      },
      {
        type: 'paragraph',
        text: 'The target for 2030 is 10 kilogrammes per barrel of oil equivalent. Getting there is harder than the journey so far, because the cheap reductions have now been made. Carbon capture at Kasawari and the committed scheme at Bintuni carry most of the remaining gap, and both depend on infrastructure that is only partly built.',
      },
    ],
    attachments: [
      {
        id: 'att-sustainability-2025',
        title: 'Searah Sustainability Report 2025',
        type: 'PDF',
        size: '11.4 MB',
        href: '#',
      },
      {
        id: 'att-emissions-data',
        title: 'Emissions performance data pack 2021–2025',
        type: 'XLSX',
        size: '2.3 MB',
        href: '#',
      },
      {
        id: 'att-methane-note',
        title: 'Methane measurement methodology note',
        type: 'PDF',
        size: '890 KB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/renewables.jpg', alt: 'Solar array at an operated facility' },
      { src: '/media/flare-stack.jpg', alt: 'Unlit flare stack at Handil' },
      { src: '/media/refinery-dusk.jpg', alt: 'Processing facility at dusk' },
      { src: '/media/gas-plant.jpg', alt: 'Gas processing plant with carbon capture equipment' },
    ],
    tags: ['Emissions', 'Methane', 'Flaring', 'Net zero', 'Sustainability report', 'Group'],
  },

  /* -------------------------------------------------------------- 11 — SMB */
  {
    id: 'news-2026-03-05-rotan-flng-hull',
    slug: 'rotan-floating-lng-hull-launched',
    title: 'Rotan floating LNG hull launched, mooring campaign begins offshore Sabah',
    excerpt:
      'The 1.5 million tonne per year liquefaction vessel has left the drydock in Geoje and will arrive on location in early 2027.',
    category: 'Operations',
    entityId: 'SMB',
    date: '2026-03-05',
    readingTime: '5 min read',
    author: { name: 'Hafiz Zulkifli', role: 'Rotan Project Director, Searah Malaysia Borneo' },
    thumbnail: { src: '/media/lng-carrier.jpg', alt: 'Floating liquefaction vessel under construction at the shipyard' },
    cover: {
      src: '/media/lng-carrier.jpg',
      alt: 'The Rotan floating liquefaction vessel after launch from the drydock',
      caption: 'Topsides integration continues at the quayside through 2026.',
      credit: 'Searah Malaysia Borneo',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The hull of the Rotan floating liquefaction vessel has been launched from the drydock in Geoje, South Korea, and moved to the quayside for topsides integration. The vessel will liquefy gas from the Rotan field in 1,430 metres of water offshore Sabah, with first cargo targeted for 2028.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Liquefaction capacity', value: '1.5 MTPA' },
          { label: 'Water depth', value: '1,430 m' },
          { label: 'Hull length', value: '365 m' },
          { label: 'Target first cargo', value: '2028' },
        ],
      },
      { type: 'heading', text: 'Why float the plant instead of piping the gas' },
      {
        type: 'paragraph',
        text: 'The conventional answer for a deepwater gas field is a long export trunkline to an onshore liquefaction plant. For Rotan that line would have run more than 200 kilometres across a seabed that is neither flat nor stable, and the cost of it would have consumed most of the project’s value.',
      },
      {
        type: 'paragraph',
        text: 'Mooring the plant above the field removes the trunkline entirely. It also removes the onshore footprint, which matters in a coastal area where the alternative would have required land acquisition. The trade is complexity: a liquefaction train on a moving hull is a harder machine to build and a harder one to maintain.',
      },
      {
        type: 'quote',
        text: 'A pipeline is simple and expensive. A floating plant is complicated and affordable. We chose the one that lets the field exist at all.',
        attribution: 'Hafiz Zulkifli, Rotan Project Director',
      },
      {
        type: 'image',
        media: {
          src: '/media/subsea.jpg',
          alt: 'Subsea equipment being prepared for the Rotan development',
          caption: 'Six subsea wells will feed the vessel through flexible risers.',
        },
      },
      {
        type: 'list',
        items: [
          'Hull launched on schedule; topsides integration runs through 2026',
          'Mooring pre-installation campaign starting offshore Sabah in the second quarter',
          'Six subsea wells feeding the vessel through flexible risers',
          'Waste heat recovery on the liquefaction train, cutting fuel gas by 9 per cent',
        ],
      },
      {
        type: 'paragraph',
        text: 'The mooring pre-installation campaign begins offshore Sabah in the second quarter, with sixteen suction anchors to be placed before the vessel arrives. Subsea well drilling starts in 2027 and the vessel is scheduled to reach location in the first quarter of that year.',
      },
    ],
    attachments: [
      {
        id: 'att-rotan-fact',
        title: 'Rotan floating LNG project fact sheet',
        type: 'PDF',
        size: '2.4 MB',
        href: '#',
      },
      {
        id: 'att-rotan-deck',
        title: 'Rotan execution update — Q1 2026',
        type: 'PPTX',
        size: '9.6 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/lng-carrier.jpg', alt: 'Floating LNG vessel at the shipyard quayside' },
      { src: '/media/subsea.jpg', alt: 'Subsea equipment for the Rotan development' },
      { src: '/media/terminal-aerial.jpg', alt: 'Aerial view of the LNG loading arrangement' },
      { src: '/media/engineers.jpg', alt: 'Project engineers at the Geoje yard' },
    ],
    tags: ['Rotan', 'Floating LNG', 'Sabah', 'Project execution', 'Deepwater', 'Malaysia'],
  },

  /* --------------------------------------------------------------- 12 — SM */
  {
    id: 'news-2026-02-19-north-mahakam-process-safety',
    slug: 'north-mahakam-process-safety-milestone',
    title: 'North Mahakam completes 18 quarters without a lost time injury',
    excerpt:
      'The group’s largest producing hub has gone four and a half years without an LTI while running an eight-platform complex and a continuous infill drilling programme.',
    category: 'Safety',
    entityId: 'SM',
    date: '2026-02-19',
    readingTime: '4 min read',
    author: { name: 'Rina Kusumaningrum', role: 'HSE Manager, Searah Mahakam' },
    thumbnail: { src: '/media/offshore-platform.jpg', alt: 'The North Mahakam central processing complex' },
    cover: {
      src: '/media/offshore-platform.jpg',
      alt: 'The eight-platform North Mahakam complex seen from a support vessel',
      caption: 'North Mahakam runs eight wellhead platforms feeding one central processing complex.',
      credit: 'Searah Mahakam',
    },
    content: [
      {
        type: 'paragraph',
        text: 'North Mahakam has completed eighteen consecutive quarters without a lost time injury. Four and a half years is a long run for any facility, and it is a longer one for a complex of eight wellhead platforms with 900 million standard cubic feet a day of processing capacity and a drilling rig working somewhere on it more or less continuously.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Quarters LTI-free', value: '18' },
          { label: 'Tier 1 process safety events', value: '0' },
          { label: 'Loss of primary containment', value: '3 (all Tier 3)' },
          { label: 'Processing capacity', value: '900 MMSCF/D' },
        ],
      },
      { type: 'heading', text: 'Personal safety is not process safety' },
      {
        type: 'paragraph',
        text: 'Lost time injury records measure whether people are hurt. They do not measure whether the plant is close to hurting a great many people at once, and the industry has learned the difference the hard way. The metrics the team on North Mahakam watches most closely are the ones that are still uncomfortable.',
      },
      {
        type: 'paragraph',
        text: 'Three losses of primary containment were recorded in the period, all Tier 3 and all contained. Each was investigated as though it had been worse than it was. Two traced back to the same valve type on the gas lift header, which has now been replaced across the complex rather than only on the platforms where it failed.',
      },
      {
        type: 'quote',
        text: 'A clean injury record can hide a plant that is quietly getting worse. We treat every small leak as a rehearsal for a large one.',
        attribution: 'Rina Kusumaningrum, HSE Manager, Searah Mahakam',
      },
      {
        type: 'image',
        media: {
          src: '/media/worker-ppe.jpg',
          alt: 'Technician carrying out a valve inspection on the gas lift header',
          caption: 'The gas lift header valve type was replaced complex-wide after two Tier 3 events.',
        },
      },
      {
        type: 'list',
        items: [
          'Safety-critical element assurance at 99.2 per cent against plan',
          'Overdue safety-critical maintenance held below 1 per cent for six quarters',
          'Full field electrification removed 14 gas-fired drivers from the deck',
          'Process safety walkdowns led by the platform manager, not by HSE',
        ],
      },
      {
        type: 'paragraph',
        text: 'Full field electrification, completed in 2025, has quietly helped. Fourteen gas-fired drivers came off the platforms, and with them a set of ignition sources and a maintenance burden that no longer has to be managed at height in a hydrocarbon atmosphere.',
      },
    ],
    attachments: [
      {
        id: 'att-mahakam-safety',
        title: 'North Mahakam HSE performance summary',
        type: 'PDF',
        size: '1.3 MB',
        href: '#',
      },
      {
        id: 'att-process-safety',
        title: 'Group process safety standard — Tier classification',
        type: 'PDF',
        size: '1.8 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/offshore-platform.jpg', alt: 'North Mahakam complex from the sea' },
      { src: '/media/worker-ppe.jpg', alt: 'Technician working on the gas lift header' },
      { src: '/media/control-room.jpg', alt: 'Central control room on the North Mahakam complex' },
    ],
    tags: ['Safety', 'Process safety', 'North Mahakam', 'LTI-free', 'Asset integrity'],
  },

  /* --------------------------------------------------------------- 13 — SK */
  {
    id: 'news-2026-02-05-merakes-east-epc',
    slug: 'merakes-east-subsea-contract-award',
    title: 'Merakes East subsea contract awarded, first gas confirmed for 2027',
    excerpt:
      'The two-well development will reuse spare capacity in the existing Merakes risers and umbilicals, holding capital intensity below USD 6 per barrel of oil equivalent.',
    category: 'Operations',
    entityId: 'SK',
    date: '2026-02-05',
    readingTime: '4 min read',
    author: { name: 'Alessandro Conti', role: 'Managing Director, Searah Kutai' },
    thumbnail: { src: '/media/fpso.jpg', alt: 'The Jangkrik floating production unit, host for Merakes East' },
    cover: {
      src: '/media/fpso.jpg',
      alt: 'The Jangkrik floating production unit, which will host the Merakes East tieback',
      caption: 'Merakes East ties back to the same floating unit that already hosts Merakes.',
      credit: 'Searah Kutai',
    },
    content: [
      {
        type: 'paragraph',
        text: 'The subsea engineering, procurement and construction contract for Merakes East has been awarded, confirming first gas in 2027. The development consists of two subsea wells in 1,580 metres of water, tied into the existing Merakes infrastructure and produced through the Jangkrik floating unit.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Resource (2C)', value: '128 MMBOE' },
          { label: 'Water depth', value: '1,580 m' },
          { label: 'Capex intensity', value: 'Below USD 6 / BOE' },
          { label: 'New surface facilities', value: 'None' },
        ],
      },
      { type: 'heading', text: 'Built on what is already there' },
      {
        type: 'paragraph',
        text: 'Merakes East adds no new surface facilities. The two wells feed into the manifold already installed for Merakes, and the produced fluid travels up risers and through an umbilical system that were deliberately sized with spare capacity when they were installed in 2021.',
      },
      {
        type: 'paragraph',
        text: 'That decision, taken five years ago by a team that had no confirmed reason to make it, is what keeps capital intensity on this development below USD 6 per barrel of oil equivalent. It is a good argument for designing infrastructure with headroom even when the business case does not yet require it.',
      },
      {
        type: 'quote',
        text: 'The cheapest barrel is the one that travels through a pipe you have already paid for.',
        attribution: 'Alessandro Conti, Managing Director, Searah Kutai',
      },
      {
        type: 'image',
        media: {
          src: '/media/subsea.jpg',
          alt: 'Subsea manifold of the type installed at the Merakes hub',
          caption: 'The existing Merakes manifold has two spare slots, both now taken.',
        },
      },
      {
        type: 'list',
        items: [
          'Two subsea wells drilled from a single location in 1,580 metres of water',
          'Both spare slots on the existing Merakes manifold now used',
          'Rig contracted for a Q3 2026 spud, sharing mobilisation with the Gendalo campaign',
          'No incremental emissions from surface facilities, all processing on the existing unit',
        ],
      },
      {
        type: 'paragraph',
        text: 'Drilling is scheduled to begin in the third quarter of this year, sharing rig mobilisation with the Gendalo appraisal campaign to reduce cost across both. Subsea hardware fabrication starts immediately, with offshore installation planned for the first half of 2027.',
      },
    ],
    attachments: [
      {
        id: 'att-merakes-east-pr',
        title: 'Press release — Merakes East EPC award',
        type: 'PDF',
        size: '310 KB',
        href: '#',
      },
      {
        id: 'att-merakes-east-fact',
        title: 'Merakes East fact sheet',
        type: 'PDF',
        size: '1.5 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/fpso.jpg', alt: 'Jangkrik floating production unit' },
      { src: '/media/subsea.jpg', alt: 'Subsea manifold on the seabed' },
      { src: '/media/drilling.jpg', alt: 'Drilling unit contracted for the Merakes East campaign' },
    ],
    tags: ['Merakes East', 'Subsea', 'Tieback', 'Contract award', 'Deepwater', 'Kutai'],
  },

  /* ------------------------------------------------------------ 14 — Group */
  {
    id: 'news-2026-01-22-national-content',
    slug: 'local-content-and-national-capability',
    title: 'Local content reaches 58 per cent as Batam and Bintulu yards take on subsea work',
    excerpt:
      'Fabrication scopes that once went overseas are now being executed in Indonesia and Malaysia, with 1,240 skilled roles created across the two supply chains in 2025.',
    category: 'People',
    entityId: null,
    date: '2026-01-22',
    readingTime: '5 min read',
    author: { name: 'Lim Wei Sheng', role: 'Group Head of Supply Chain' },
    thumbnail: { src: '/media/engineers.jpg', alt: 'Fabrication yard workers assembling subsea structures' },
    cover: {
      src: '/media/terminal-aerial.jpg',
      alt: 'Aerial view of a fabrication yard and export terminal',
      caption: 'Subsea structures for Peciko Deep are being fabricated in Batam.',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Local content across the group’s operated projects reached 58 per cent by value in 2025, measured against the definitions used by the Indonesian and Malaysian regulators. That is up from 44 per cent three years ago, and the change is not the result of counting differently.',
      },
      {
        type: 'stat',
        items: [
          { label: 'Local content by value', value: '58%' },
          { label: 'Skilled roles created in 2025', value: '1,240' },
          { label: 'National staff in operated roles', value: '92%' },
          { label: 'Yards qualified for subsea scope', value: '4' },
        ],
      },
      { type: 'heading', text: 'Qualification, not quotas' },
      {
        type: 'paragraph',
        text: 'Local content targets are easy to meet on paper and easy to miss in practice. A yard that has never welded a subsea structure to the required standard cannot be handed one because a percentage needs to be hit, and pretending otherwise is how projects end up being re-fabricated in a third country at twice the cost.',
      },
      {
        type: 'paragraph',
        text: 'The route taken instead was slower. Four yards, two in Batam and two near Bintulu, were taken through a two-year qualification programme covering welder certification, non-destructive testing capability and dimensional control. The group paid for part of that programme knowing the yards would then be free to bid for other operators’ work.',
      },
      {
        type: 'quote',
        text: 'If a yard we qualified wins a contract from a competitor, that is not a loss. It means the capability is real and it stays in the country.',
        attribution: 'Lim Wei Sheng, Group Head of Supply Chain',
      },
      {
        type: 'image',
        media: {
          src: '/media/engineers.jpg',
          alt: 'Welders and inspectors working on a subsea structure at a fabrication yard',
          caption: 'Welder certification was the longest part of the qualification programme.',
        },
      },
      {
        type: 'list',
        items: [
          'Subsea structures for Peciko Deep fabricated in Batam',
          'Pipeline coating for the Mahakam tieback moved onshore in Indonesia',
          'Two Sarawak yards qualified for Rotan subsea scope',
          '92 per cent of operated roles held by Indonesian and Malaysian nationals',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ninety-two per cent of roles in the operated business are now held by Indonesian and Malaysian nationals, including seven of the nine positions on the group operating committee. The remaining expatriate positions are concentrated in deepwater project execution, and each carries a named national successor and a handover date.',
      },
    ],
    attachments: [
      {
        id: 'att-local-content',
        title: 'Local content report 2025',
        type: 'PDF',
        size: '5.1 MB',
        href: '#',
      },
      {
        id: 'att-supplier-guide',
        title: 'Supplier qualification guide',
        type: 'PDF',
        size: '2.7 MB',
        href: '#',
      },
    ],
    gallery: [
      { src: '/media/terminal-aerial.jpg', alt: 'Fabrication yard and terminal from the air' },
      { src: '/media/engineers.jpg', alt: 'Fabrication team at work on a subsea structure' },
      { src: '/media/team-meeting.jpg', alt: 'Supply chain team meeting with yard management' },
    ],
    tags: ['Local content', 'Supply chain', 'Fabrication', 'Capability', 'Nationalisation', 'Group'],
  },
];

/** The full set of newsletter categories, in display order. */
export const newsCategories = [
  'Corporate',
  'Operations',
  'Sustainability',
  'Technology',
  'People',
  'Safety',
] as const satisfies readonly NewsCategory[];

/** The single article flagged for the homepage and newsroom hero. */
export const featuredArticle: NewsArticle | undefined = news.find((a) => a.featured);

/** Look up a single article by its URL slug. */
export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return news.find((article) => article.slug === slug);
}

/** All articles tagged to an entity code, newest first. Group news is excluded. */
export function getArticlesByEntity(entityId: string): NewsArticle[] {
  return news.filter((article) => article.entityId === entityId);
}

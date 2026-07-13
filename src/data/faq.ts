import type { FaqItem } from '@/types';

/** Filter chips rendered above the accordion; order is the display order. */
export const faqCategories: string[] = [
  'Company',
  'Operations',
  'Careers',
  'Employee Services',
  'Media & Brand',
  'Emergency',
];

export const faqs: FaqItem[] = [
  /* ---------------------------------------------------------------- Company */
  {
    id: 'faq-who-owns',
    question: 'Who owns Searah?',
    answer:
      'Searah is a joint venture owned in equal shares by Eni, headquartered in Italy, and PETRONAS, headquartered in Malaysia — each holds 50 per cent. Both shareholders are represented on the board and second technical staff into the company. We describe ourselves publicly as "An Eni and PETRONAS Company".',
    category: 'Company',
  },
  {
    id: 'faq-what-does-searah-do',
    question: 'What exactly does Searah do?',
    answer:
      'Searah is an upstream oil and gas operator. That means we work the front end of the value chain: exploration, field development, production, and the long-term management of producing assets. We do not refine, distribute or retail fuel; our gas and liquids are sold to domestic buyers and into the Bontang and Bintulu LNG value chains.',
    category: 'Company',
  },
  {
    id: 'faq-when-formed',
    question: 'When was the company formed?',
    answer:
      'Eni and PETRONAS opened joint venture talks in 2023 and signed the agreement in 2024, the same year regulatory approvals were secured and the three operating entities were incorporated. Operations, licences and the workforce were consolidated under a single operator during 2025, when Searah reported its first consolidated group production.',
    category: 'Company',
  },
  {
    id: 'faq-entities',
    question: 'What are SM, SK and SMB?',
    answer:
      'They are Searah’s three operating entities. Searah Mahakam (SM) runs the shallow-water and onshore fields of the Mahakam Delta in East Kalimantan; Searah Kutai (SK) holds the deepwater acreage in the Makassar Strait; and Searah Malaysia Borneo (SMB) operates the offshore assets in Sarawak and Sabah. All three work to a single set of group standards.',
    category: 'Company',
  },
  {
    id: 'faq-offices',
    question: 'Where are Searah’s offices and operating bases?',
    answer:
      'The corporate headquarters is Menara Searah in Jakarta, with a regional office in Kuala Lumpur. Operations are run from bases at Balikpapan in East Kalimantan, Bintulu in Sarawak and Kota Kinabalu in Sabah, supported by a logistics and supply base at Miri.',
    category: 'Company',
  },
  {
    id: 'faq-what-each-shareholder-brings',
    question: 'What does each shareholder bring to the venture?',
    answer:
      'Eni contributes deepwater engineering capability, a fast-track development model that shortens the interval between discovery and first production, and decarbonisation technology including flare recovery and carbon capture and storage design. PETRONAS brings four decades of Southeast Asian operating experience, deep familiarity with the regulatory and community environment, and a proven route to market through the LNG value chain at Bintulu.',
    category: 'Company',
  },

  /* ------------------------------------------------------------- Operations */
  {
    id: 'faq-how-many-assets',
    question: 'How many assets does Searah operate?',
    answer:
      'Nineteen — fourteen in Indonesia and five in Malaysia. The portfolio spans onshore, shallow-water and deepwater acreage and includes producing fields, projects under development and exploration licences.',
    category: 'Operations',
  },
  {
    id: 'faq-production-today',
    question: 'How much does Searah produce today?',
    answer:
      'Group production is above 300,000 barrels of oil equivalent per day, weighted towards gas. The company has set a target of more than 500,000 BOE/D within three years, driven principally by the deepwater gas developments in the Kutai Basin and new tiebacks offshore Sarawak.',
    category: 'Operations',
  },
  {
    id: 'faq-investment',
    question: 'How much is Searah investing, and in what?',
    answer:
      'USD 20 billion over five years. The bulk of it goes into deepwater gas development in the Makassar Strait — Geng North took final investment decision in 2026 — alongside infill drilling and compression in the Mahakam Delta and the subsea tiebacks that route new volumes into facilities we already own.',
    category: 'Operations',
  },
  {
    id: 'faq-emissions',
    question: 'What are Searah’s emissions commitments?',
    answer:
      'Two are firm and dated. We will eliminate routine flaring across every operated asset by 2028, using flare gas recovery, compression upgrades and rerouting of associated gas into existing sales lines. We will also halve upstream greenhouse gas emissions intensity against the 2025 baseline by 2032, supported by facility electrification, methane leak detection and repair, and carbon capture and storage in East Kalimantan.',
    category: 'Operations',
  },
  {
    id: 'faq-where-gas-goes',
    question: 'Where does Searah’s gas go?',
    answer:
      'Gas supplies domestic power generation and industry in Indonesia and Malaysia under long-term contracts, and feeds the Bontang and Bintulu LNG plants for export. Because both liquefaction hubs already exist, most of our new developments are engineered as tiebacks into installed processing capacity rather than as standalone facilities.',
    category: 'Operations',
  },
  {
    id: 'faq-safety-record',
    question: 'How does Searah manage safety across so many sites?',
    answer:
      'A single group HSE management system applies to all 19 assets, adopted in 2025 to replace the standards inherited from the contributing companies. It includes a common permit-to-work system and a group-wide stop-work authority: any person on any site may stop work they consider unsafe, and is supported for doing so.',
    category: 'Operations',
  },

  /* ---------------------------------------------------------------- Careers */
  {
    id: 'faq-how-to-apply',
    question: 'How do I apply for a job at Searah?',
    answer:
      'All vacancies are published on the Careers section of this portal and applications are accepted only through it. Searah never charges a fee at any stage of recruitment and never asks candidates to pay for training, medicals or visa processing — if you are asked for money, it is not us.',
    category: 'Careers',
  },
  {
    id: 'faq-graduate-programme',
    question: 'Does Searah recruit graduates?',
    answer:
      'Yes. The graduate development programme takes Indonesian and Malaysian engineering, geoscience and business graduates through structured rotations across subsurface, operations and projects, with placements at the operating bases as well as in Jakarta and Kuala Lumpur. Intakes open annually and are advertised on the Careers pages.',
    category: 'Careers',
  },
  {
    id: 'faq-local-content',
    question: 'Does Searah prioritise national staff?',
    answer:
      'Yes. Searah sustains a majority-national workforce across both host countries and is explicit that developing Indonesian and Malaysian engineers into technical leadership roles is part of its mission. Expatriate and seconded shareholder staff are used where a specific capability is not yet available locally, with knowledge transfer built into those assignments.',
    category: 'Careers',
  },

  /* ------------------------------------------------- Employee Services */
  {
    id: 'faq-it-service-desk',
    question: 'How do I get IT support or reset my password?',
    answer:
      'Raise a ticket through the IT service catalogue in the Services section of this portal, or call the service desk. Password resets and multi-factor authentication re-enrolment are self-service for most accounts. Never share your credentials with anyone, including with someone claiming to be from IT.',
    category: 'Employee Services',
  },
  {
    id: 'faq-travel-approval',
    question: 'How do I arrange travel to an offshore installation?',
    answer:
      'Offshore travel requires a valid offshore medical certificate, current BOSIET or equivalent survival training, and an approved trip request raised through the logistics desk at the relevant operating base. Manifests close well ahead of the flight, so raise the request early — you will not be boarded on the day without all three in place.',
    category: 'Employee Services',
  },
  {
    id: 'faq-policies',
    question: 'Where do I find Searah policies, templates and brand assets?',
    answer:
      'They are all in the Resources section of the portal, filterable by category — policies, procedures, manuals, templates, logos and presentation decks. Restricted documents require you to be signed in, and some are limited to particular entities or departments.',
    category: 'Employee Services',
  },

  /* ------------------------------------------------------------ Media & Brand */
  {
    id: 'faq-media-enquiry',
    question: 'How do journalists contact Searah?',
    answer:
      'Media enquiries go to the Corporate Communications department in Jakarta, through the contact details published in the Media section. Employees must not comment to the press on Searah business, and should forward any approach to Corporate Communications rather than responding to it.',
    category: 'Media & Brand',
  },
  {
    id: 'faq-use-logo',
    question: 'Can I use the Searah logo in my materials?',
    answer:
      'Suppliers, partners and event organisers must obtain written permission from Corporate Communications before using the Searah name, logo or imagery, and must follow the Searah Brand Guidelines. The marks of Eni and PETRONAS belong to those companies and may not be used on the basis of a Searah approval alone.',
    category: 'Media & Brand',
  },
  {
    id: 'faq-forward-looking',
    question: 'Are the production and investment figures on this site guaranteed?',
    answer:
      'No. Figures such as the 500,000+ BOE/D target and the USD 20 billion investment programme are forward-looking statements based on assumptions current at the date of publication. Actual outcomes depend on reservoir performance, commodity prices, regulatory decisions and supply-chain conditions, and may differ materially. The disclaimers in our Terms & Conditions set this out in full.',
    category: 'Media & Brand',
  },

  /* -------------------------------------------------------------- Emergency */
  {
    id: 'faq-emergency-number',
    question: 'What number do I call in an emergency?',
    answer:
      'The Group Emergency Control Centre on +62 21 5000 911, or +60 3 2600 911 from Malaysia — both reach the same duty controller, 24 hours a day. Call it for any injury, fire, gas release, loss of well control, security threat or marine and aviation distress. Do not notify your line manager first; the controller will do that.',
    category: 'Emergency',
  },
  {
    id: 'faq-what-to-say',
    question: 'What information should I give the emergency controller?',
    answer:
      'Your name, your exact location, what has happened, whether anyone is injured, and what is currently at risk. Say what you do not know rather than guessing, and stay on the line until the controller releases you. Raise the local alarm — the nearest manual call point — before you telephone.',
    category: 'Emergency',
  },
  {
    id: 'faq-report-near-miss',
    question: 'How do I report a near miss or an unsafe condition?',
    answer:
      'If there is no immediate danger, report it to the HSE duty advisor or through the HSE reporting tool in the Services section. Near-miss reporting is used to prevent recurrence, not to attribute blame, and no one at Searah is penalised for raising one — or for exercising stop-work authority on a job that turns out to have been safe after all.',
    category: 'Emergency',
  },
];

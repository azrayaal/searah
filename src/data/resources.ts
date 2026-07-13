import type { Resource, ResourceCategory } from '@/types';

/**
 * Brand and resource portal catalogue.
 *
 * IDs are stable kebab-case strings: entity pages reference them by id through
 * `Entity.downloads: ID[]`, so renaming an id is a breaking change.
 */
export const resources: Resource[] = [
  /* ------------------------------------------------------------------ Documents */
  {
    id: 'res-annual-report-2025',
    title: 'Integrated Annual Report 2025',
    description:
      'Full-year financial statements, operational review and governance disclosures for the Searah group, covering all 19 assets in Indonesia and Malaysia.',
    category: 'Documents',
    type: 'PDF',
    size: '18.4 MB',
    updatedAt: '2026-03-27',
    href: '#',
    tags: ['annual report', 'financials', 'governance', 'disclosure'],
    owner: 'Group Corporate Communications',
    preview: {
      src: '/media/office-hq.jpg',
      alt: 'Searah group headquarters at dusk',
      caption: 'Integrated Annual Report 2025',
    },
  },
  {
    id: 'res-sustainability-report-2025',
    title: 'Sustainability Report 2025',
    description:
      'Scope 1, 2 and 3 emissions inventory, flaring reduction progress and community investment outcomes, prepared against GRI and IPIECA reporting standards.',
    category: 'Documents',
    type: 'PDF',
    size: '12.1 MB',
    updatedAt: '2026-04-15',
    href: '#',
    tags: ['sustainability', 'emissions', 'GRI', 'ESG'],
    owner: 'Group Corporate Communications',
    preview: {
      src: '/media/mangrove.jpg',
      alt: 'Mangrove rehabilitation site in the Mahakam delta',
      caption: 'Sustainability Report 2025',
    },
  },
  {
    id: 'res-production-factsheet-q2-2026',
    title: 'Production Fact Sheet Q2 2026',
    description:
      'One-page summary of gross and net production by entity, uptime and well count for the quarter ended 30 June 2026. Refreshed within ten working days of quarter close.',
    category: 'Documents',
    type: 'PDF',
    size: '1.3 MB',
    updatedAt: '2026-07-09',
    href: '#',
    tags: ['production', 'quarterly', 'fact sheet', 'operations'],
    owner: 'Group Corporate Communications',
  },
  {
    id: 'res-media-kit',
    title: 'Searah Media Kit',
    description:
      'Boilerplate company description, approved spokesperson biographies, high-resolution imagery and fact sheets for journalists and event organisers.',
    category: 'Documents',
    type: 'ZIP',
    size: '46.8 MB',
    updatedAt: '2026-05-22',
    href: '#',
    tags: ['media', 'press', 'boilerplate', 'imagery'],
    owner: 'Group Corporate Communications',
    preview: {
      src: '/media/boardroom.jpg',
      alt: 'Searah leadership team in the group boardroom',
    },
  },

  /* ------------------------------------------------------------------ Templates */
  {
    id: 'res-powerpoint-master',
    title: 'PowerPoint Master Template',
    description:
      'Group-approved slide master with 24 pre-built layouts, chart styles and the Searah colour palette applied to theme slots. Use this rather than restyling old decks.',
    category: 'Templates',
    type: 'PPTX',
    size: '8.7 MB',
    updatedAt: '2026-02-11',
    href: '#',
    tags: ['template', 'presentation', 'slides', 'brand'],
    owner: 'Group Brand',
  },
  {
    id: 'res-letterhead-template',
    title: 'Letterhead & Correspondence Template',
    description:
      'Word templates for group and entity letterhead, memoranda and formal correspondence, with the required legal footer for SKT, SMB and SMY registered addresses.',
    category: 'Templates',
    type: 'DOCX',
    size: '640 KB',
    updatedAt: '2026-01-19',
    href: '#',
    tags: ['template', 'letterhead', 'stationery', 'correspondence'],
    owner: 'Group Brand',
  },
  {
    id: 'res-email-signature-generator',
    title: 'Email Signature Generator',
    description:
      'Browser-based tool that produces a compliant HTML signature from your name, role and entity. Signatures generated before 2026 must be regenerated.',
    category: 'Templates',
    type: 'ZIP',
    size: '2.4 MB',
    updatedAt: '2026-06-02',
    href: '#',
    tags: ['template', 'email', 'signature', 'identity'],
    owner: 'Group IT',
  },

  /* ------------------------------------------------------------------ Brand Assets */
  {
    id: 'res-brand-guidelines',
    title: 'Brand Identity Guidelines',
    description:
      'The master reference for the Searah identity: logo construction, clear space, colour system, typography and co-branding rules with Eni and PETRONAS.',
    category: 'Brand Assets',
    type: 'PDF',
    size: '24.6 MB',
    updatedAt: '2026-04-30',
    href: '#',
    tags: ['brand', 'guidelines', 'identity', 'co-branding'],
    owner: 'Group Brand',
    preview: {
      src: '/media/terminal-aerial.jpg',
      alt: 'Aerial view of a Searah export terminal',
      caption: 'Brand Identity Guidelines, fourth edition',
    },
  },
  {
    id: 'res-colour-typography-kit',
    title: 'Colour & Typography Kit',
    description:
      'Colour swatch libraries for Adobe, Figma and Office, plus licensed webfont and desktop font files. Includes CMYK and Pantone equivalents for print production.',
    category: 'Brand Assets',
    type: 'ZIP',
    size: '31.2 MB',
    updatedAt: '2026-03-06',
    href: '#',
    tags: ['brand', 'colour', 'typography', 'fonts'],
    owner: 'Group Brand',
  },
  {
    id: 'res-photography-art-direction',
    title: 'Photography Art Direction Guide',
    description:
      'How Searah people, assets and landscapes should be photographed, including PPE compliance requirements for any image shot inside an operational red zone.',
    category: 'Brand Assets',
    type: 'PDF',
    size: '15.9 MB',
    updatedAt: '2025-11-14',
    href: '#',
    tags: ['brand', 'photography', 'art direction', 'PPE'],
    owner: 'Group Brand',
    preview: {
      src: '/media/worker-ppe.jpg',
      alt: 'Technician in full personal protective equipment on a platform deck',
    },
  },

  /* ------------------------------------------------------------------ Presentation */
  {
    id: 'res-corporate-overview-deck',
    title: 'Corporate Overview Deck 2026',
    description:
      'The standing 20-slide introduction to Searah: shareholding, portfolio map, production profile and growth ambition. Cleared for external audiences.',
    category: 'Presentation',
    type: 'PPTX',
    size: '22.3 MB',
    updatedAt: '2026-06-18',
    href: '#',
    tags: ['presentation', 'corporate', 'overview', 'external'],
    owner: 'Group Corporate Communications',
  },
  {
    id: 'res-investor-update-q2-2026',
    title: 'Investor Update Q2 2026',
    description:
      'Quarterly performance pack for shareholder representatives, covering production, unit operating cost, capital deployment and project milestones.',
    category: 'Presentation',
    type: 'PPTX',
    size: '9.8 MB',
    updatedAt: '2026-07-10',
    href: '#',
    tags: ['presentation', 'investor', 'quarterly', 'performance'],
    owner: 'Group Corporate Communications',
    restricted: true,
  },
  {
    id: 'res-hse-townhall-deck',
    title: 'HSE Town Hall Deck',
    description:
      'Editable deck used at site town halls to present leading and lagging safety indicators, recent incident learnings and the current campaign focus.',
    category: 'Presentation',
    type: 'PPTX',
    size: '14.5 MB',
    updatedAt: '2026-05-29',
    href: '#',
    tags: ['presentation', 'HSE', 'town hall', 'safety'],
    owner: 'Group HSE',
  },

  /* ------------------------------------------------------------------ Logos */
  {
    id: 'res-logo-pack',
    title: 'Searah Logo Pack (SVG, PNG, EPS)',
    description:
      'Primary wordmark and standalone mark in positive, reverse and mono variants. Vector formats for print and signage, PNG for on-screen use.',
    category: 'Logos',
    type: 'ZIP',
    size: '5.6 MB',
    updatedAt: '2026-04-30',
    href: '#',
    tags: ['logo', 'vector', 'wordmark', 'download'],
    owner: 'Group Brand',
  },
  {
    id: 'res-entity-logo-lockups',
    title: 'Entity Logo Lockups (SKT, SMB, SMY)',
    description:
      'Approved endorsement lockups for Searah Ketapang, Searah Muara Bakau and Searah Malaysia, plus the joint Eni and PETRONAS shareholder lockup.',
    category: 'Logos',
    type: 'AI',
    size: '11.4 MB',
    updatedAt: '2026-04-30',
    href: '#',
    tags: ['logo', 'lockup', 'entity', 'co-branding'],
    owner: 'Group Brand',
  },

  /* ------------------------------------------------------------------ Policies */
  {
    id: 'res-code-of-business-ethics',
    title: 'Code of Business Ethics',
    description:
      'The behavioural standard expected of every employee, contractor and agent acting for Searah. Annual attestation is mandatory for all staff on the group payroll.',
    category: 'Policies',
    type: 'PDF',
    size: '3.8 MB',
    updatedAt: '2026-01-08',
    href: '#',
    tags: ['ethics', 'compliance', 'conduct', 'attestation'],
    owner: 'Group Legal',
  },
  {
    id: 'res-hse-golden-rules',
    title: 'HSE Golden Rules',
    description:
      'Ten life-saving rules that apply without exception across every Searah site. Breach of a Golden Rule is treated as a disciplinary matter regardless of outcome.',
    category: 'Policies',
    type: 'PDF',
    size: '2.1 MB',
    updatedAt: '2026-02-24',
    href: '#',
    tags: ['HSE', 'safety', 'golden rules', 'life-saving'],
    owner: 'Group HSE',
    preview: {
      src: '/media/offshore-platform.jpg',
      alt: 'Offshore production platform at first light',
      caption: 'Ten rules, no exceptions',
    },
  },
  {
    id: 'res-procurement-policy',
    title: 'Procurement Policy',
    description:
      'Authority thresholds, competitive tendering requirements and conflict-of-interest declarations governing all third-party spend across the group.',
    category: 'Policies',
    type: 'PDF',
    size: '2.9 MB',
    updatedAt: '2025-10-30',
    href: '#',
    tags: ['procurement', 'policy', 'tendering', 'authority'],
    owner: 'Group Procurement',
  },
  {
    id: 'res-travel-expense-policy',
    title: 'Travel & Expense Policy',
    description:
      'Booking channels, cabin class entitlements, per diem rates by country and the evidence required to support a claim. Applies to offshore rotation travel.',
    category: 'Policies',
    type: 'PDF',
    size: '1.7 MB',
    updatedAt: '2026-03-02',
    href: '#',
    tags: ['travel', 'expenses', 'per diem', 'policy'],
    owner: 'Group HRGA',
  },
  {
    id: 'res-data-privacy-policy',
    title: 'Data Privacy Policy',
    description:
      'How Searah collects, processes and retains personal data under Indonesian PDP Law and Malaysian PDPA, including cross-border transfer between group entities.',
    category: 'Policies',
    type: 'PDF',
    size: '2.2 MB',
    updatedAt: '2026-05-11',
    href: '#',
    tags: ['privacy', 'data protection', 'PDPA', 'compliance'],
    owner: 'Group Legal',
  },

  /* ------------------------------------------------------------------ Procedures */
  {
    id: 'res-permit-to-work-procedure',
    title: 'Permit to Work Procedure',
    description:
      'The end-to-end control process for hot work, confined space entry, working at height and isolation, including role authorities and permit validity periods.',
    category: 'Procedures',
    type: 'PDF',
    size: '6.4 MB',
    updatedAt: '2026-04-07',
    href: '#',
    tags: ['permit to work', 'HSE', 'isolation', 'control of work'],
    owner: 'Group HSE',
  },
  {
    id: 'res-emergency-response-plan',
    title: 'Emergency Response Plan',
    description:
      'Group-level escalation tiers, incident command structure and muster protocols, with site-specific annexes for each offshore and onshore facility.',
    category: 'Procedures',
    type: 'PDF',
    size: '9.1 MB',
    updatedAt: '2026-06-25',
    href: '#',
    tags: ['emergency', 'response', 'incident command', 'muster'],
    owner: 'Group HSE',
    restricted: true,
    preview: {
      src: '/media/helicopter.jpg',
      alt: 'Crew change helicopter on an offshore helideck',
    },
  },
  {
    id: 'res-crisis-communication-protocol',
    title: 'Crisis Communication Protocol',
    description:
      'Who may speak to media during an incident, holding statement templates and the notification sequence to shareholders and host government authorities.',
    category: 'Procedures',
    type: 'PDF',
    size: '3.3 MB',
    updatedAt: '2026-02-19',
    href: '#',
    tags: ['crisis', 'communications', 'media', 'escalation'],
    owner: 'Group Corporate Communications',
    restricted: true,
  },

  /* ------------------------------------------------------------------ Manuals */
  {
    id: 'res-abc-manual',
    title: 'Anti-Bribery & Corruption Manual',
    description:
      'Practical guidance on gifts and hospitality, facilitation payments, third-party due diligence and the red flags that require escalation to Group Legal.',
    category: 'Manuals',
    type: 'PDF',
    size: '5.2 MB',
    updatedAt: '2026-01-08',
    href: '#',
    tags: ['anti-bribery', 'corruption', 'due diligence', 'compliance'],
    owner: 'Group Legal',
  },
  {
    id: 'res-well-control-manual',
    title: 'Well Control Manual',
    description:
      'Kick detection, shut-in procedures and barrier philosophy for drilling, completion and intervention operations. Certification is required before rig deployment.',
    category: 'Manuals',
    type: 'PDF',
    size: '28.7 MB',
    updatedAt: '2026-05-04',
    href: '#',
    tags: ['well control', 'drilling', 'barriers', 'certification'],
    owner: 'Group HSE',
    restricted: true,
    preview: {
      src: '/media/drilling.jpg',
      alt: 'Drill floor operations aboard a jack-up rig',
    },
  },
  {
    id: 'res-drilling-operations-manual',
    title: 'Drilling Operations Manual',
    description:
      'Standard practice for well planning, casing design, mud programmes and rig acceptance across the Mahakam, Kutai and Sabah drilling campaigns.',
    category: 'Manuals',
    type: 'PDF',
    size: '34.5 MB',
    updatedAt: '2026-06-11',
    href: '#',
    tags: ['drilling', 'well planning', 'operations', 'standards'],
    owner: 'Group HSE',
    restricted: true,
  },

  /* ------------------------------------------------------------------ Images */
  {
    id: 'res-asset-photography-library',
    title: 'Asset Photography Library',
    description:
      'Cleared, high-resolution photography of all 19 assets, indexed by entity and facility type. Every frame has been checked for PPE compliance and release consent.',
    category: 'Images',
    type: 'ZIP',
    size: '1.8 GB',
    updatedAt: '2026-06-30',
    href: '#',
    tags: ['photography', 'assets', 'library', 'high-resolution'],
    owner: 'Group Brand',
    preview: {
      src: '/media/fpso.jpg',
      alt: 'Floating production storage and offloading vessel on station',
      caption: 'Asset photography, 2026 refresh',
    },
  },
  {
    id: 'res-leadership-portrait-library',
    title: 'Leadership Portrait Library',
    description:
      'Approved portrait and environmental photography of the group executive committee and entity managing directors, shot to the standard brand lighting setup.',
    category: 'Images',
    type: 'ZIP',
    size: '412 MB',
    updatedAt: '2026-04-16',
    href: '#',
    tags: ['portraits', 'leadership', 'photography', 'library'],
    owner: 'Group Corporate Communications',
    preview: {
      src: '/media/team-meeting.jpg',
      alt: 'Searah leaders in discussion at a group review',
    },
  },

  /* ------------------------------------------------------------------ Videos */
  {
    id: 'res-corporate-video-2026',
    title: 'Corporate Video 2026',
    description:
      'Three-minute group film covering the Eni and PETRONAS partnership, the portfolio across both countries and the path to 500,000 BOE/D. Subtitled in EN, ID and MS.',
    category: 'Videos',
    type: 'MP4',
    size: '486 MB',
    updatedAt: '2026-05-08',
    href: '#',
    tags: ['video', 'corporate', 'film', 'subtitled'],
    owner: 'Group Corporate Communications',
    preview: {
      src: '/media/offshore-night.jpg',
      alt: 'Offshore platform illuminated at night',
      caption: 'Corporate Video 2026, 3:12',
    },
  },
  {
    id: 'res-safety-induction-video',
    title: 'Safety Induction Video',
    description:
      'Mandatory induction viewing for anyone travelling to a Searah site, covering muster, helicopter safety, hydrogen sulphide awareness and stop-work authority.',
    category: 'Videos',
    type: 'MP4',
    size: '742 MB',
    updatedAt: '2026-03-18',
    href: '#',
    tags: ['video', 'induction', 'safety', 'mandatory'],
    owner: 'Group HSE',
    preview: {
      src: '/media/control-room.jpg',
      alt: 'Operators monitoring production from the central control room',
    },
  },
];

/** Every category value, in the order the filter rail renders them. */
export const resourceCategories: ResourceCategory[] = [
  'Documents',
  'Templates',
  'Brand Assets',
  'Presentation',
  'Logos',
  'Policies',
  'Procedures',
  'Manuals',
  'Images',
  'Videos',
];

/** Unique owning teams, derived from the catalogue and sorted for the filter menu. */
export const resourceOwners: string[] = [...new Set(resources.map((r) => r.owner))].sort();

/** Resolves `Entity.downloads` id lists, preserving the caller's order and dropping unknown ids. */
export function getResourcesByIds(ids: string[]): Resource[] {
  const byId = new Map(resources.map((resource) => [resource.id, resource]));
  return ids
    .map((id) => byId.get(id))
    .filter((resource): resource is Resource => resource !== undefined);
}

/**
 * Domain types for the Searah corporate portal.
 *
 * Every type here mirrors a CMS collection. Components consume these shapes via
 * props only — swapping `src/data/*` for an API client must not touch the UI.
 */

export type ID = string;

export interface Media {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

/* ------------------------------------------------------------------ Navigation */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  /** Mega-menu columns; when present the item opens a panel instead of navigating. */
  columns?: NavColumn[];
  /** Optional promoted card rendered on the right edge of the mega menu. */
  feature?: {
    eyebrow: string;
    title: string;
    excerpt: string;
    href: string;
    image: Media;
  };
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface FooterContent {
  columns: FooterColumn[];
  social: SocialLink[];
  legal: NavLink[];
  address: string[];
  copyright: string;
  shareholders: { name: string; share: string }[];
}

/** Names resolved against the lucide-react icon registry in `src/lib/icons.ts`. */
export type IconName = string;

/* ------------------------------------------------------------------ Homepage */

export type TrendDirection = 'up' | 'down' | 'flat';

export interface Kpi {
  id: ID;
  label: string;
  value: number;
  /** Rendered verbatim after the animated value, e.g. "BOE/D". */
  unit?: string;
  /** Decimal places for the counter animation. */
  precision?: number;
  delta?: string;
  trend?: TrendDirection;
  caption: string;
  icon: IconName;
  /** Optional 0–100 progress ratio for the meter rail. */
  progress?: number;
}

export interface Commodity {
  id: ID;
  name: string;
  symbol: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePercent: number;
  /** Normalised sparkline series (any scale — the chart auto-fits). */
  series: number[];
  updatedAt: string;
}

export interface MarketSummary {
  headline: string;
  narrative: string;
  updatedAt: string;
  commodities: Commodity[];
}

export interface HeroSlide {
  id: ID;
  title: string;
  subtitle: string;
  image: Media;
  cta: NavLink;
}

export interface HeroContent {
  slides: HeroSlide[];
}

/** Card surface for a quick-access tile — each door gets its own colour so the six read apart. */
export type QuickLinkTone = 'slate' | 'sky' | 'ocean' | 'ink' | 'rose' | 'teal';

export interface QuickLink {
  id: ID;
  label: string;
  description: string;
  href: string;
  icon: IconName;
  /** The 3D illustration that sits in the lower half of the card. */
  image: Media;
  tone: QuickLinkTone;
}

/** The "company at a glance" band: one photograph, one capital figure, three numbers. */
export interface GlanceContent {
  image: Media;
  investment: { label: string; value: string; unit?: string };
  stats: { value: string; unit?: string; label: string }[];
  title: string;
  subtitle: string;
}

export interface HomepageContent {
  hero: HeroContent;
  glance: GlanceContent;
  connect: SectionIntro;
  emergency: { label: string; phone: string; caption: string };
  performance: {
    eyebrow: string;
    title: string;
    description: string;
    asOf: string;
    kpis: Kpi[];
  };
  market: MarketSummary;
  entitiesSection: SectionIntro;
  assetsSection: SectionIntro;
  newsSection: SectionIntro;
  quickAccess: { intro: SectionIntro; links: QuickLink[] };
  spotlight: {
    eyebrow: string;
    title: string;
    body: string;
    image: Media;
    cta: NavLink;
    stats: { label: string; value: string }[];
  };
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description?: string;
  cta?: NavLink;
}

/* ------------------------------------------------------------------ Assets */

export type AssetCountry = 'Indonesia' | 'Malaysia';
export type AssetType = 'Offshore' | 'Onshore' | 'Deepwater' | 'LNG';
export type AssetStatus = 'Producing' | 'Development' | 'Exploration';

export interface Asset {
  id: ID;
  name: string;
  entityId: ID;
  country: AssetCountry;
  region: string;
  type: AssetType;
  status: AssetStatus;
  operator: string;
  workingInterest: number;
  production: string;
  reserves: string;
  waterDepth: string;
  discoveredIn: string;
  onstream: string;
  description: string;
  image: Media;
  /** Geographic position; projected onto the map canvas by `project()`. */
  coordinates: { lat: number; lng: number };
  highlights: string[];
}

/* ------------------------------------------------------------------ Entities */

export interface Leader {
  id: ID;
  name: string;
  role: string;
  employeeId?: ID;
  photo: Media;
  bio: string;
}

export interface Entity {
  id: ID;
  code: string;
  name: string;
  fullName: string;
  tagline: string;
  established: string;
  headquarters: string;
  employees: number;
  accent: string;
  summary: string;
  overview: string[];
  hero: Media;
  stats: { label: string; value: string; caption?: string }[];
  leadership: Leader[];
  operations: { title: string; description: string; icon: IconName }[];
  productionMix: { label: string; value: number; unit: string }[];
  productionHistory: { period: string; oil: number; gas: number }[];
  /** Headline rate the operations centre publishes, with the date it was read. */
  dailyProduction: {
    asOf: string;
    total: string;
    streams: { label: string; value: string }[];
    note?: string;
  };
  /** Who holds the licence, and who operates it. */
  workingInterest: { partner: string; share: string; operator?: boolean }[];
  /** Corporate history — the spine of any company profile. */
  milestones: { year: string; title: string; description: string }[];
  hse: {
    metrics: { label: string; value: string; caption?: string }[];
    certifications: string[];
  };
  contact: {
    registeredOffice: string[];
    operatingBase?: string[];
    phone: string;
    email: string;
    /** The comms team a journalist or a colleague is meant to reach first. */
    comms: { name: string; role: string; email: string; phone: string };
    emergency: string;
  };
  gallery: Media[];
  downloads: ID[];
}

/* ------------------------------------------------------------------ Newsletter */

export type NewsCategory =
  | 'Corporate'
  | 'Operations'
  | 'Sustainability'
  | 'Technology'
  | 'People'
  | 'Safety';

export interface NewsAttachment {
  id: ID;
  title: string;
  type: string;
  size: string;
  href: string;
}

export interface NewsArticle {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** Entity code (e.g. "SKT"); `null` marks a group-wide article. */
  entityId: ID | null;
  date: string;
  readingTime: string;
  author: { name: string; role: string; avatar?: string };
  thumbnail: Media;
  cover: Media;
  featured?: boolean;
  /** Editorial opt-out: keeps an article in the newsroom but off the homepage feed. */
  showOnHome?: boolean;
  /** Simple block model — trivially mapped from any headless CMS rich-text field. */
  content: ContentBlock[];
  attachments: NewsAttachment[];
  gallery: Media[];
  tags: string[];
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; media: Media }
  | { type: 'stat'; items: { label: string; value: string }[] };

/* ------------------------------------------------------------------ Directory */

export interface Employee {
  id: ID;
  name: string;
  position: string;
  department: string;
  entityId: ID;
  location: string;
  email: string;
  phone: string;
  photo: Media;
  biography: string;
  skills: string[];
  expertise: string[];
  projects: { name: string; role: string; year: string }[];
  social: SocialLink[];
  reportsTo: ID | null;
  startedIn: string;
}

/* ------------------------------------------------------------------ Organisation */

export interface OrgNode {
  id: ID;
  employeeId: ID;
  name: string;
  role: string;
  unit: string;
  entityId: ID | null;
  children: OrgNode[];
}

export interface OrgScope {
  id: ID;
  label: string;
  description: string;
  root: OrgNode;
}

/* ------------------------------------------------------------------ Resources */

export type ResourceCategory =
  | 'Documents'
  | 'Templates'
  | 'Brand Assets'
  | 'Presentation'
  | 'Logos'
  | 'Policies'
  | 'Procedures'
  | 'Manuals'
  | 'Images'
  | 'Videos';

export interface Resource {
  id: ID;
  title: string;
  description: string;
  category: ResourceCategory;
  type: string;
  size: string;
  updatedAt: string;
  href: string;
  tags: string[];
  owner: string;
  restricted?: boolean;
  preview?: Media;
}

/* ------------------------------------------------------------------ Services */

export type ServiceCategory = 'HRGA' | 'IT' | 'Procurement' | 'HSE';
export type ServiceStatus = 'Operational' | 'Degraded' | 'Maintenance';

export interface Service {
  id: ID;
  name: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  owner: string;
  sla: string;
  icon: IconName;
  requestHref: string;
  quickLinks: NavLink[];
  /** Entities the service is available to. Absent means every entity in the group. */
  entityIds?: ID[];
}

/** A tool staff open directly — claims, bookings, timesheets — rather than a request queue. */
export interface InternalApp {
  id: ID;
  name: string;
  description: string;
  owner: string;
  category: ServiceCategory;
  icon: IconName;
  href: string;
  /** Marks apps that only work on the corporate network or behind SSO. */
  access?: 'SSO' | 'Corporate network';
}

/** Who answers for a service line inside one entity. */
export interface ServiceDesk {
  entityId: ID;
  lead: string;
  email: string;
  phone: string;
  hours: string;
}

export interface ServiceCategoryMeta {
  id: ServiceCategory;
  label: string;
  description: string;
  icon: IconName;
}

/* ------------------------------------------------------------------ Emergency */

export type EmergencySeverity = 'critical' | 'urgent' | 'standard';

export interface EmergencyContact {
  id: ID;
  label: string;
  role: string;
  phone: string;
  altPhone?: string;
  email?: string;
  availability: string;
  severity: EmergencySeverity;
  icon: IconName;
}

export interface EmergencyGroup {
  id: ID;
  title: string;
  description: string;
  contacts: EmergencyContact[];
}

export interface RegionalContact {
  id: ID;
  region: string;
  site: string;
  country: AssetCountry;
  control: string;
  medic: string;
  security: string;
}

/* ------------------------------------------------------------------ About */

export interface TimelineEvent {
  id: ID;
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export interface ValueItem {
  id: ID;
  title: string;
  description: string;
  icon: IconName;
}

export interface AboutContent {
  hero: { eyebrow: string; title: string; subtitle: string; image: Media };
  overview: {
    intro: SectionIntro;
    body: string[];
    figures: { label: string; value: string; caption: string }[];
  };
  shareholders: {
    intro: SectionIntro;
    partners: { name: string; share: string; country: string; description: string }[];
  };
  vision: { statement: string; support: string };
  mission: { id: ID; title: string; description: string }[];
  values: { intro: SectionIntro; items: ValueItem[] };
  timeline: { intro: SectionIntro; events: TimelineEvent[] };
  portfolio: {
    intro: SectionIntro;
    items: { id: ID; title: string; description: string; image: Media; metrics: string[] }[];
  };
}

/* ------------------------------------------------------------------ Legal & FAQ */

export interface LegalDocument {
  slug: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: { id: ID; heading: string; paragraphs: string[]; bullets?: string[] }[];
}

export interface FaqItem {
  id: ID;
  question: string;
  answer: string;
  category: string;
}

/* ------------------------------------------------------------------ Site & SEO */

export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  descriptor: string;
  description: string;
  url: string;
  locale: string;
  twitter: string;
  logo: { withText: string; mark: string };
}

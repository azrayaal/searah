import { entities } from '@/data/entities';
import { assets } from '@/data/assets';
import { employees } from '@/data/employees';
import { newsByDate } from '@/data/newsletter';
import { resources } from '@/data/resources';
import { services, internalApps, serviceCategories } from '@/data/services';
import { faqs } from '@/data/faq';
import type { IconName } from '@/types';

export type SearchGroup =
  | 'Entities'
  | 'Assets'
  | 'People'
  | 'News'
  | 'Services'
  | 'Applications'
  | 'Resources'
  | 'FAQ';

export interface SearchEntry {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle: string;
  href: string;
  icon: IconName;
  /** Lower-cased haystack, built once at module load. */
  haystack: string;
}

const entry = (
  id: string,
  group: SearchGroup,
  title: string,
  subtitle: string,
  href: string,
  icon: IconName,
  extra: (string | undefined)[] = [],
): SearchEntry => ({
  id,
  group,
  title,
  subtitle,
  href,
  icon,
  haystack: [title, subtitle, ...extra].filter(Boolean).join(' ').toLowerCase(),
});

/**
 * One flat index over every collection the site renders. Built once at module load —
 * the corpus is a few hundred rows of static data, so a linear scan per keystroke is
 * faster than the machinery any search library would ask us to ship for it.
 */
export const searchIndex: SearchEntry[] = [
  ...entities.map((item) =>
    entry(
      `entity-${item.id}`,
      'Entities',
      item.name,
      `${item.code} · ${item.headquarters}`,
      `/entity/${item.id}`,
      'Building2',
      [item.fullName, item.summary, item.tagline],
    ),
  ),

  ...assets.map((item) =>
    entry(
      `asset-${item.id}`,
      'Assets',
      item.name,
      `${item.type} · ${item.region}, ${item.country}`,
      `/assets?asset=${item.id}`,
      'Anchor',
      [item.status, item.operator, item.description],
    ),
  ),

  ...employees.map((item) =>
    entry(
      `person-${item.id}`,
      'People',
      item.name,
      `${item.position} · ${item.department}`,
      `/directory?person=${item.id}`,
      'Users',
      [item.email, item.location],
    ),
  ),

  ...newsByDate.map((item) =>
    entry(
      `news-${item.id}`,
      'News',
      item.title,
      `${item.category} · ${item.date}`,
      `/newsletter/${item.slug}`,
      'FileText',
      [item.excerpt, ...item.tags],
    ),
  ),

  ...serviceCategories.map((meta) =>
    entry(
      `service-line-${meta.id}`,
      'Services',
      meta.label,
      `Service line · ${meta.id}`,
      `/services/${meta.id}`,
      meta.icon,
      [meta.description],
    ),
  ),

  ...services.map((item) =>
    entry(
      `service-${item.id}`,
      'Services',
      item.name,
      `${item.category} · ${item.owner}`,
      `/services/${item.category}`,
      item.icon,
      [item.description, item.sla],
    ),
  ),

  ...internalApps.map((item) =>
    entry(
      `app-${item.id}`,
      'Applications',
      item.name,
      `${item.category} · ${item.owner}`,
      `/services#applications`,
      item.icon,
      [item.description],
    ),
  ),

  ...resources.map((item) =>
    entry(
      `resource-${item.id}`,
      'Resources',
      item.title,
      `${item.category} · ${item.type}`,
      `/resources?category=${encodeURIComponent(item.category)}`,
      'FolderOpen',
      [item.description, item.owner],
    ),
  ),

  ...faqs.map((item) =>
    entry(
      `faq-${item.id}`,
      'FAQ',
      item.question,
      `FAQ · ${item.category}`,
      `/faq`,
      'CircleHelp',
      [item.answer],
    ),
  ),
];

/** Groups are ranked, not alphabetised — a person beats a policy PDF for the same word. */
const GROUP_ORDER: SearchGroup[] = [
  'Entities',
  'People',
  'Services',
  'Applications',
  'Assets',
  'News',
  'Resources',
  'FAQ',
];

/**
 * Scores a title hit above a body hit, and a prefix above a mid-word hit, so typing
 * "kas" surfaces the Kasawari asset rather than every article that mentions it.
 */
function score(item: SearchEntry, needle: string): number {
  const title = item.title.toLowerCase();
  if (title === needle) return 0;
  if (title.startsWith(needle)) return 1;
  if (title.includes(needle)) return 2;
  if (item.subtitle.toLowerCase().includes(needle)) return 3;
  if (item.haystack.includes(needle)) return 4;
  return Infinity;
}

export function search(query: string, limit = 20): SearchEntry[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  return searchIndex
    .map((item) => ({ item, rank: score(item, needle) }))
    .filter(({ rank }) => rank !== Infinity)
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        GROUP_ORDER.indexOf(a.item.group) - GROUP_ORDER.indexOf(b.item.group) ||
        a.item.title.localeCompare(b.item.title),
    )
    .slice(0, limit)
    .map(({ item }) => item);
}

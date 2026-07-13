import { useMemo, useState } from 'react';

type FacetMap<T> = Record<string, (item: T) => string | string[] | null>;

interface Options<T> {
  /** Fields concatenated into the free-text search index. */
  searchFields: (item: T) => (string | string[] | undefined)[];
  /** Named facets — each resolves an item to the value(s) it can be filtered by. */
  facets?: FacetMap<T>;
}

/**
 * Search + multi-facet filtering over any collection. Deliberately generic so the
 * Newsletter, Resources, Directory and Services pages share one implementation.
 */
export function useCollection<T>(items: T[], { searchFields, facets = {} }: Options<T>) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, string>>({});

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !needle ||
        searchFields(item)
          .flat()
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(needle);

      if (!matchesQuery) return false;

      return Object.entries(selected).every(([facet, value]) => {
        if (!value || value === 'All') return true;
        const resolved = facets[facet]?.(item);
        if (resolved == null) return false;
        return Array.isArray(resolved) ? resolved.includes(value) : resolved === value;
      });
    });
  }, [items, query, selected, searchFields, facets]);

  const setFacet = (facet: string, value: string) =>
    setSelected((prev) => ({ ...prev, [facet]: value }));

  const reset = () => {
    setQuery('');
    setSelected({});
  };

  const activeCount = Object.values(selected).filter((v) => v && v !== 'All').length;

  return { query, setQuery, selected, setFacet, reset, results, activeCount };
}

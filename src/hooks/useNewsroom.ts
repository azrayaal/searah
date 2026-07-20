import { useEffect, useState } from 'react';

import {
  getArticle,
  getArticlesByEntity,
  getCategories,
  getHomeFeed,
  listArticles,
} from '@/services/newsroom';
import type { NewsArticle } from '@/types';

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/**
 * Runs an async newsroom query and tracks its state.
 *
 * Hand-rolled rather than pulling in a query library: this site makes a handful of
 * public GET requests with no mutations, no cache invalidation and no optimistic
 * updates, which is most of what such a library exists to manage.
 *
 * The `AbortController` is the part that matters. Without it, navigating away
 * mid-request lands a `setState` on an unmounted component, and — worse — a slow first
 * request can resolve *after* a fast second one and overwrite newer data with older.
 *
 * While the source is `dummy` the promise settles on the next microtask, so `loading` is
 * true for a single frame. The branches still matter: they are what will render once the
 * API is switched on, and writing them now means the switch does not turn up missing
 * states under time pressure.
 */
function useAsync<T>(run: (signal: AbortSignal) => Promise<T>, initial: T, deps: unknown[]): AsyncState<T> {
  // Starts `true` regardless of source. Even the dummy path is a promise, so it
  // resolves in a microtask *after* the first render — and a consumer that redirects on
  // `!data` (the article page does) would fire that redirect before the data ever
  // arrived. Gating on `loading` is only safe if `loading` is true from the first frame.
  const [state, setState] = useState<AsyncState<T>>({ data: initial, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setState((previous) => ({ ...previous, loading: true, error: null }));

    run(controller.signal)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        // An abort is the expected outcome of navigating away, not a failure to report.
        if (!active || controller.signal.aborted) return;

        setState({
          data: initial,
          loading: false,
          error: error instanceof Error ? error.message : 'Could not load the newsroom',
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export function useArticles(): AsyncState<NewsArticle[]> {
  return useAsync<NewsArticle[]>((signal) => listArticles(signal), [], []);
}

export function useArticle(slug: string | undefined): AsyncState<NewsArticle | null> {
  return useAsync<NewsArticle | null>(
    (signal) => (slug ? getArticle(slug, signal) : Promise.resolve(null)),
    null,
    [slug],
  );
}

export function useEntityArticles(entityId: string | undefined): AsyncState<NewsArticle[]> {
  return useAsync<NewsArticle[]>(
    (signal) => (entityId ? getArticlesByEntity(entityId, signal) : Promise.resolve([])),
    [],
    [entityId],
  );
}

export function useHomeFeed(): AsyncState<{ lead: NewsArticle | null; rest: NewsArticle[] }> {
  return useAsync((signal) => getHomeFeed(signal), { lead: null, rest: [] }, []);
}

export function useNewsCategories(): AsyncState<string[]> {
  return useAsync<string[]>((signal) => getCategories(signal), [], []);
}

/**
 * Minimal read-only client for the public CMS API.
 *
 * Deliberately `fetch` rather than axios: this site consumes a handful of public GET
 * endpoints and needs none of what axios adds. Adding a dependency to save four lines
 * would be the wrong trade for a static marketing site.
 *
 * No credentials are sent. Every route used here is public by design, and attaching
 * cookies to a cross-origin request would force the API into a stricter CORS mode for
 * no benefit.
 */

const BASE_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:4000/api/v1';

/** The envelope every endpoint returns. */
export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    [key: string]: unknown;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${BASE_URL}/public${path}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    // `undefined` means "no filter", which is not the same as an empty string — sending
    // `?category=` would filter for articles whose category is literally blank.
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  }

  return url.toString();
}

export async function fetchEnvelope<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal,
): Promise<ApiEnvelope<T>> {
  const response = await fetch(buildUrl(path, params), {
    headers: { Accept: 'application/json' },
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    // The API returns its error message inside the same envelope; surfacing it beats a
    // bare status code when something is misconfigured in staging.
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(body?.message ?? `Request failed (${response.status})`, response.status);
  }

  return (await response.json()) as ApiEnvelope<T>;
}

export async function fetchData<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal,
): Promise<T> {
  return (await fetchEnvelope<T>(path, params, signal)).data;
}

import type { TrendDirection } from '@/types';

export function formatNumber(value: number, precision = 0) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatSigned(value: number, precision = 2) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(precision)}`;
}

export function trendOf(change: number): TrendDirection {
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'flat';
}

/** Maps a numeric series onto an SVG polyline path within a given viewBox. */
export function sparklinePath(series: number[], width: number, height: number, pad = 2) {
  if (series.length < 2) return '';
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / (series.length - 1);

  return series
    .map((value, index) => {
      const x = pad + index * stepX;
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

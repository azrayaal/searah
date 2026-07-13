import { useCountUp } from '@/hooks';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';

interface CounterProps {
  value: number;
  precision?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/** Animated figure. Renders the final value immediately for screen readers. */
export function Counter({ value, precision = 0, suffix, prefix, className }: CounterProps) {
  const { ref, value: current } = useCountUp(value, { precision });

  return (
    <span className={cn('tabular-nums', className)}>
      <span aria-hidden ref={ref}>
        {prefix}
        {formatNumber(current, precision)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatNumber(value, precision)}
        {suffix}
      </span>
    </span>
  );
}

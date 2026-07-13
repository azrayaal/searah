import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { prefetchRoute } from '@/routes/pages';

/**
 * A `Link` that pulls the destination's chunk on intent — hover, focus, or the touch
 * that precedes the tap. By the time the click lands the module is usually in memory,
 * so the navigation resolves in the same frame.
 */
export const PrefetchLink = forwardRef<HTMLAnchorElement, LinkProps>(function PrefetchLink(
  { to, onMouseEnter, onFocus, onTouchStart, ...props },
  ref,
) {
  const prefetch = () => {
    if (typeof to === 'string') prefetchRoute(to);
  };

  return (
    <Link
      ref={ref}
      to={to}
      onMouseEnter={(event) => {
        prefetch();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        prefetch();
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        prefetch();
        onTouchStart?.(event);
      }}
      {...props}
    />
  );
});

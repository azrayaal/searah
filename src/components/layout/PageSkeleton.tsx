import { Container } from '@/components/ui/Container';

/**
 * Shown only while a page chunk is still in flight on a cold entry (deep link or
 * hard refresh). It mimics the hub layout — hero band, then a card grid — so the
 * shell reads as "loading", never as an empty page.
 */
export function PageSkeleton() {
  return (
    <div className="pt-[68px]" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>

      <Container className="py-16 lg:py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-28 rounded-full bg-hairline" />
          <div className="h-10 w-3/4 max-w-2xl rounded-lg bg-hairline lg:h-14" />
          <div className="h-4 w-full max-w-xl rounded-full bg-hairline" />
        </div>

        <div className="mt-14 grid animate-pulse gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-[200px] bg-white p-6 lg:p-7">
              <div className="h-10 w-10 rounded-full bg-sky-soft/60" />
              <div className="mt-5 h-4 w-2/3 rounded-full bg-hairline" />
              <div className="mt-3 h-3 w-full rounded-full bg-hairline" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-hairline" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

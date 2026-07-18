import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ContourWaves } from './ContourWaves';
import type { GlanceContent } from '@/types';

interface GlanceSectionProps {
  content: GlanceContent;
}

/**
 * The company sized in one band: the capital committed, read off the asset it paid for,
 * and the three numbers that follow from it. Deliberately quiet — no card chrome around
 * the figures, so the contour swell behind them carries the section instead.
 */
export function GlanceSection({ content }: GlanceSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-20 lg:py-[80px]">
      <ContourWaves className="-z-10" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_1fr] lg:gap-16 2xl:gap-24">
          <Reveal preset="fadeRight" className="relative">
            <Image
              media={content.image}
              ratio="1/1"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="rounded-xl2 shadow-lifted"
            />

            {/* The figure sits on the asset it bought, not in a box beside it */}
            <div className="absolute bottom-6 left-6 right-6 rounded-card border border-white/25 bg-navy-deep/55 p-6 backdrop-blur-md sm:right-auto sm:max-w-[20rem] lg:bottom-8 lg:left-8">
              <p className="text-body-sm text-white/75">{content.investment.label}</p>
              <p className="mt-3 text-[2rem] font-bold leading-none text-white lg:text-[2.5rem]">
                {content.investment.value}
                {content.investment.unit ? (
                  <span className="ml-1 text-[1.25rem] font-normal text-white/85">
                    {content.investment.unit}
                  </span>
                ) : null}
              </p>
            </div>
          </Reveal>

          <RevealGroup as="dl" className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8" gap={0.08}>
            {content.stats.map((stat) => (
              <RevealItem key={stat.label}>
                {/* A hard height, not a minimum: the two-line unit on the third stat sits
                    below the shared baseline and would otherwise stretch its row, dropping
                    that one label out of line with the other two. It overflows instead. */}
                <dd className="flex h-[3.5rem] items-baseline gap-2 lg:h-[4.5rem] 2xl:h-[5rem]">
                  <span className="text-[3.5rem] font-normal leading-none tracking-tight text-navy-deep/85 lg:text-[4.5rem] 2xl:text-[5rem]">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="max-w-[6.5rem] text-body-sm font-semibold leading-tight text-navy-deep/70">
                      {stat.unit}
                    </span>
                  ) : null}
                </dd>
                <dt className="mt-4 text-caption text-charcoal">{stat.label}</dt>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

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
      {/* <ContourWaves className="-z-10" /> */}
      <img src="/assets/aboutmotif.png" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />

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
         <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none sm:right-auto sm:max-w-[20rem] lg:bottom-8 lg:left-8 overflow-hidden">
        <p className="text-body-sm text-white/70">
          {content.investment.label}
        </p>

        <p className="mt-3 text-[2rem] font-bold leading-none text-white lg:text-[2.5rem]">
          {content.investment.value}
          {content.investment.unit && (
            <span className="ml-1 text-[1.25rem] font-normal text-white/80">
              {content.investment.unit}
            </span>
          )}
        </p>
      </div>
          </Reveal>

      <div className="flex flex-col gap-16 h-full justify-between  lg:gap-20 lg:py-5">
        {/* Top Content */}
        <RevealItem className="max-w-2xl">
          <h1 className="text-4xl text-charcoal">
            {content.title}
          </h1>

          <p className="mt-6 text-body-xl text-charcoal/70">
            {content.subtitle}
          </p>

          <button className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-charcoal">
            See More
            <span className="h-px w-10 bg-charcoal transition-all duration-300 group-hover:w-16" />
          </button>
        </RevealItem>

        {/* Statistics */}
        <RevealGroup
          as="dl"
          className="grid gap-10 sm:grid-cols-3 lg:gap-16"
          gap={0.08}
        >
          {content.stats.map((stat) => (
            <RevealItem key={stat.label}>
              <dd className="flex items-baseline gap-2">
                <span className="text-[3.5rem] font-light leading-none tracking-tight text-navy-deep/85 lg:text-[4.5rem]">
                  {stat.value}
                </span>

                {stat.unit && (
                  <span className="max-w-[6rem] text-body-sm font-medium leading-tight text-navy-deep/70">
                    {stat.unit}
                  </span>
                )}
              </dd>

              <dt className="mt-4 text-caption text-charcoal">
                {stat.label}
              </dt>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
        </div>
      </Container>
    </section>
  );
}

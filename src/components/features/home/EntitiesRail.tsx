import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Carousel } from '@/components/ui/Carousel';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import type { Entity, SectionIntro } from '@/types';

interface EntitiesRailProps {
  intro: SectionIntro;
  entities: Entity[];
}

/** Tall, image-led cards on a snap rail — the group's three operating entities. */
export function EntitiesRail({ intro, entities }: EntitiesRailProps) {
  return (
    <Section tone="navy" spacing="default">
      <SectionHeader
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        cta={intro.cta}
        tone="dark"
      />

      <Reveal preset="fadeUp" className="mt-12">
        <Carousel label="Operating entities" tone="dark">
          {entities.map((entity) => (
            <Link
              key={entity.id}
              to={`/entity/${entity.id}`}
              className="group relative isolate flex w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-card sm:w-[420px] lg:w-[460px]"
              style={{ aspectRatio: '3 / 4' }}
            >
              <Image
                media={entity.hero}
                ratio="auto"
                zoom
                className="absolute inset-0 -z-10 h-full"
                imgClassName="h-full w-full"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                aria-hidden
              />

              {/* Accent rule that draws itself on hover */}
              <span
                className="absolute left-8 top-8 h-px w-10 origin-left scale-x-100 bg-ember transition-transform duration-500 ease-premium group-hover:scale-x-[2.6]"
                aria-hidden
              />

              <div className="p-8">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ember">
                  {entity.code}
                </p>

                <p className="mt-3 text-[1.75rem] font-bold leading-tight text-white">
                  {entity.name}
                </p>
                <p className="mt-2 text-body-sm text-white/65">{entity.tagline}</p>

                {/* Revealed on hover — keeps the resting state calm */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-premium group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5">
                      {entity.stats.slice(0, 2).map((stat) => (
                        <div key={stat.label}>
                          <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-white/45">
                            {stat.label}
                          </dt>
                          <dd className="mt-0.5 text-body-sm font-bold text-white">{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-nav text-white transition-colors group-hover:text-ember">
                  Explore entity
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import type { Entity, SectionIntro } from '@/types';

interface EntitiesRailProps {
  intro: SectionIntro;
  entities: Entity[];
}

/** Every entity is "Searah <place>" — the group name becomes the eyebrow, the place the title. */
function splitName(name: string) {
  const [prefix, ...rest] = name.split(' ');
  return rest.length ? { prefix, place: rest.join(' ') } : { prefix: '', place: name };
}

/**
 * The three operating companies, on a blue field with a plant photograph bleeding in from
 * the right. A static three-up rather than the old snap carousel: with exactly three cards,
 * a rail hid a third of the group behind a swipe for no reason.
 */
export function EntitiesRail({ intro, entities }: EntitiesRailProps) {
  return (
    <section
      className="on-dark relative isolate overflow-hidden py-16 text-white md:py-20 lg:py-[80px]"
      style={{
        background: 'linear-gradient(135deg, #1A4FB5 0%, #14459F 35%, #0E3C8C 70%, #0B3785 100%)',
      }}
    >
      {/* Photograph bleeding in from the right, masked so it dissolves into the field */}
          <div
          className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] overflow-hidden lg:block"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,.2) 20%, rgba(0,0,0,.4) 40%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.8) 80%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,.2) 20%, rgba(0,0,0,.4) 40%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.8) 80%, black 100%)",
          }}
        >
          <img
            src="/assets/bg-entity.jpeg"
            className="absolute inset-0 h-full w-full object-cover object-center scale-110"
            alt=""
          />
        </div>

      <Container className="relative">
        <Reveal>
          <h2 className="max-w-3xl text-[2rem] font-bold leading-[1.12] text-white md:text-[2.5rem] lg:text-[3rem]">
            {intro.title}
          </h2>
          {intro.description ? (
            <p className="mt-6 max-w-2xl text-body-sm text-white/75 md:text-body">
              {intro.description}
            </p>
          ) : null}
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {entities.map((entity) => {
            const { prefix, place } = splitName(entity.name);

            return (
              <RevealItem key={entity.id}>
                <PrefetchLink
                  to={`/entity/${entity.id}`}
                  className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden border-2 border-white rounded-xl2 ring-1 ring-white/25"
                >
                  <Image
                    media={entity.hero}
                    ratio="auto"
                    zoom
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="absolute inset-0 -z-10 h-full"
                    imgClassName="h-full w-full"
                  />
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent"
                    aria-hidden
                  />

                  <div className="flex items-end justify-between gap-4 p-6 lg:p-7">
                    <span className="min-w-0">
                      {prefix ? (
                        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ember">
                          {prefix}
                        </span>
                      ) : null}
                      <span className="mt-1 block truncate text-[1.5rem] font-normal leading-tight text-white lg:text-[1.75rem]">
                        {place}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-caption font-semibold text-navy-deep transition-colors duration-300 group-hover:bg-ember">
                      Explore more
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </PrefetchLink>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

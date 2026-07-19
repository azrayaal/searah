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
                className="
                  group relative isolate flex aspect-square overflow-hidden
                  rounded-xl2 border border-white/20
                  transition-all duration-500 ease-out
                  hover:scale-[1.04]
                  hover:border-white/50
                  hover:shadow-[0_24px_60px_rgba(0,0,0,.45)]
              "
              >
                {/* Background */}
                <Image
                  media={entity.hero}
                  ratio="auto"
                  zoom={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="absolute inset-0 -z-20 h-full"
                  imgClassName="
                    h-full w-full object-cover
                    transition-transform duration-700 ease-out
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0 -z-10
                    bg-gradient-to-t
                    from-navy-deep/90
                    via-navy-deep/20
                    to-transparent
                    transition-all duration-500
                    group-hover:from-navy-deep
                    group-hover:via-navy-deep/70
                  "
                />

                {/* Content */}
                <div
                  className="
                    absolute inset-0
                    flex flex-col
                    items-center
                    justify-center
                    px-8
                    text-center
                  "
                >
                  {prefix && (
                    <span
                      className="
                        mb-3
                        text-[0.7rem]
                        uppercase
                        tracking-[0.2em]
                        text-ember
                        opacity-0
                        translate-y-8
                        transition-all
                        duration-500
                        group-hover:opacity-100
                        group-hover:translate-y-0
                      "
                    >
                      {prefix}
                    </span>
                  )}

                  <h3
                    className="
                      text-[2rem]
                      font-semibold
                      text-white
                      opacity-0
                      translate-y-10
                      transition-all
                      duration-500
                      delay-75
                      group-hover:opacity-100
                      group-hover:translate-y-0
                    "
                  >
                    {place}
                  </h3>

                  {entity.summary && (
                    <p
                      className="
                        mt-4
                        max-w-xs
                        text-sm
                        leading-7
                        text-white/80
                        opacity-0
                        translate-y-10
                        transition-all
                        duration-500
                        delay-150
                        group-hover:opacity-100
                        group-hover:translate-y-0
                      "
                    >
                      {entity.summary}
                    </p>
                  )}

                  <span
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-2
                      rounded-md
                      shadow-md
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-navy-deep
                      opacity-0
                      translate-y-10
                      transition-all
                      duration-500
                      delay-200
                      group-hover:opacity-100
                      group-hover:translate-y-0
                    "
                  >
                    Explore More
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>

                {/* Default Title */}
                <div
                  className="
                    absolute bottom-7 left-7 right-7
                    transition-all duration-500
                    group-hover:opacity-0
                    group-hover:translate-y-8
                  "
                >
                  {prefix && (
                    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ember">
                      {prefix}
                    </div>
                  )}

                  <div className="mt-2 text-[1.6rem] text-white">
                    {place}
                  </div>
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

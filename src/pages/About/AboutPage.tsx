import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Image } from '@/components/ui/Image';
import { Icon } from '@/lib/icons';
import { EASE, viewportRepeat } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { useSeo } from '@/hooks';
import { about } from '@/data/about';
import { leadershipGroups } from '@/data/leadership';
import { LeadershipBoard } from '@/components/features/organisation/LeadershipBoard';
import { navigation } from '@/data/navigation';
import { companyFacts } from '@/data/site';
import type { AboutContent, NavLink, TimelineEvent, ValueItem } from '@/types';

/* ------------------------------------------------------------------ helpers */

const ABOUT_HREF = '/about';
const aboutNav = navigation.find((item) => item.href === ABOUT_HREF);

const breadcrumb: NavLink[] = [{ label: aboutNav?.label ?? about.hero.eyebrow, href: ABOUT_HREF }];

/** Splits "300,000+" into a countable number and its literal suffix; returns null for "USD 20bn". */
function parseFigure(value: string): { amount: number; suffix: string } | null {
  const match = /^([\d,]+(?:\.\d+)?)(\+?)$/.exec(value.trim());
  if (!match) return null;
  const amount = Number(match[1].replace(/,/g, ''));
  return Number.isFinite(amount) ? { amount, suffix: match[2] } : null;
}

/* ------------------------------------------------------------------ overview */

function OverviewSection({ content }: { content: AboutContent['overview'] }) {
  return (
    <Section id="overview" tone="white">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4 text-ocean">
            <span className="h-px w-8 bg-ocean/40" aria-hidden />
            {content.intro.eyebrow}
          </p>
          <h2 className="text-[1.75rem] font-bold leading-[1.15] text-navy-deep md:text-h2">
            {content.intro.title}
          </h2>
          {content.intro.description ? (
            <p className="mt-6 border-l-2 border-ember pl-5 text-body-sm text-muted">
              {content.intro.description}
            </p>
          ) : null}
        </Reveal>

        <RevealGroup className="max-w-prose space-y-6" gap={0.06}>
          {content.body.map((paragraph) => (
            <RevealItem key={paragraph.slice(0, 48)} as="p" className="text-body-sm text-charcoal md:text-body">
              {paragraph}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup
        className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4"
        gap={0.06}
      >
        {content.figures.map((figure) => {
          const parsed = parseFigure(figure.value);

          return (
            <RevealItem key={figure.label} className="flex h-full flex-col bg-white p-6 lg:p-8">
              <p className="text-[2rem] font-bold leading-none text-navy-deep lg:text-[2.5rem]">
                {parsed ? (
                  <Counter value={parsed.amount} suffix={parsed.suffix} />
                ) : (
                  <span className="tabular-nums">{figure.value}</span>
                )}
              </p>
              <p className="mt-4 text-caption font-semibold uppercase tracking-[0.08em] text-ocean">
                {figure.label}
              </p>
              <p className="mt-3 text-caption text-muted">{figure.caption}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

/* -------------------------------------------------------------- shareholders */

function ShareholdersSection({ content }: { content: AboutContent['shareholders'] }) {
  return (
    <Section id="shareholders" tone="navy" spacing="airy">
      <SectionHeader
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        description={content.intro.description}
        tone="dark"
      />

      <div className="mt-14 grid gap-px overflow-hidden border-y border-white/15 bg-white/15 lg:grid-cols-2">
        {content.partners.map((partner, index) => (
          <Reveal
            key={partner.name}
            preset={index === 0 ? 'fadeRight' : 'fadeLeft'}
            className="flex h-full flex-col bg-navy px-0 py-10 lg:px-10 lg:py-12"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div>
                <h3 className="text-[2rem] font-bold leading-none text-white lg:text-[2.5rem]">
                  {partner.name}
                </h3>
                <p className="mt-3 text-caption font-semibold uppercase tracking-[0.14em] text-white/50">
                  {partner.country}
                </p>
              </div>
              <p className="text-[2.5rem] font-bold leading-none text-ember lg:text-[3.25rem]">
                {partner.share}
              </p>
            </div>

            <motion.div
              className="mt-8 h-px origin-left bg-white/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportRepeat}
              transition={{ duration: 1, ease: EASE, delay: 0.15 * index }}
            />

            <p className="mt-8 text-body-sm text-white/70">{partner.description}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        {companyFacts.shareholders.map((shareholder) => (
          <span
            key={shareholder.name}
            className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.1em] text-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            {shareholder.name}
            <span className="text-white">{shareholder.share}</span>
          </span>
        ))}
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------ vision/mission */

function VisionSection({
  vision,
  mission,
}: {
  vision: AboutContent['vision'];
  mission: AboutContent['mission'];
}) {
  return (
    <Section id="vision" tone="white" spacing="airy">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <blockquote className="text-[1.75rem] font-normal leading-[1.25] text-navy-deep md:text-[2.25rem] lg:text-[2.75rem]">
            {vision.statement}
          </blockquote>
        </Reveal>
        <Reveal preset="fadeLeft" className="lg:pt-3">
          <p className="border-t border-hairline pt-6 text-body-sm text-muted lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {vision.support}
          </p>
        </Reveal>
      </div>

      <RevealGroup
        className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-4"
        gap={0.06}
      >
        {mission.map((item, index) => (
          <RevealItem
            key={item.id}
            className="group flex h-full flex-col bg-white p-6 transition-colors duration-500 hover:bg-sky-faint lg:p-8"
          >
            <span className="text-caption font-bold tabular-nums text-ember">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-h3 text-navy-deep">{item.title}</h3>
            <p className="mt-3 text-caption text-muted">{item.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------- values */

function ValueTile({ value }: { value: ValueItem }) {
  return (
    <RevealItem className="group flex h-full flex-col bg-white p-6 transition-colors duration-500 hover:bg-sky-faint lg:p-8">
      <Icon
        name={value.icon}
        className="h-[18px] w-[18px] shrink-0 text-ocean/70 transition-colors group-hover:text-ocean"
      />
      <h3 className="mt-6 text-h3 text-navy-deep">{value.title}</h3>
      <p className="mt-3 text-caption text-muted">{value.description}</p>
    </RevealItem>
  );
}

function ValuesSection({ content }: { content: AboutContent['values'] }) {
  return (
    <Section id="values" tone="faint">
      <SectionHeader
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        description={content.intro.description}
      />

      <RevealGroup
        className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
        gap={0.06}
      >
        {content.items.map((item) => (
          <ValueTile key={item.id} value={item} />
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ----------------------------------------------------------------- timeline */

function TimelineRow({ event }: { event: TimelineEvent }) {
  const milestone = Boolean(event.milestone);

  return (
    <RevealItem
      as="li"
      className="relative grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0 md:grid-cols-[6rem_0.75rem_minmax(0,1fr)] md:gap-x-8"
    >
      <p
        className={cn(
          'hidden pt-0.5 text-body-sm font-bold tabular-nums tracking-[0.08em] md:block',
          milestone ? 'text-ember' : 'text-muted',
        )}
      >
        {event.year}
      </p>

      <div className="flex justify-center">
        <span
          className={cn(
            'mt-1.5 block shrink-0 rounded-full ring-4 ring-white',
            milestone ? 'h-3 w-3 bg-ember' : 'h-2 w-2 bg-ocean/40',
          )}
          aria-hidden
        />
      </div>

      <div>
        <p
          className={cn(
            'mb-1.5 text-caption font-bold tabular-nums tracking-[0.08em] md:hidden',
            milestone ? 'text-ember' : 'text-muted',
          )}
        >
          {event.year}
        </p>
        <h3
          className={cn(
            'text-navy-deep',
            milestone ? 'text-[1.375rem] font-bold leading-snug' : 'text-h3 font-bold',
          )}
        >
          {event.title}
        </h3>
        <p className="mt-2 max-w-prose text-caption text-muted md:text-body-sm">
          {event.description}
        </p>
      </div>
    </RevealItem>
  );
}

function TimelineSection({ content }: { content: AboutContent['timeline'] }) {
  return (
    <Section id="timeline" tone="white" spacing="airy">
      <SectionHeader
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        description={content.intro.description}
      />

      <div className="relative mt-14">
        {/* The rail sits under the markers and draws itself as the list scrolls in. */}
        <motion.div
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-hairline md:left-[calc(8rem+5px)]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.02 }}
          transition={{ duration: 1.6, ease: EASE }}
          aria-hidden
        />

        <RevealGroup as="ol" className="relative" gap={0.05}>
          {content.events.map((event) => (
            <TimelineRow key={event.id} event={event} />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- portfolio */

function PortfolioSection({ content }: { content: AboutContent['portfolio'] }) {
  return (
    <Section id="portfolio" tone="faint" spacing="airy">
      <SectionHeader
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        description={content.intro.description}
      />

      <div className="mt-14 divide-y divide-hairline border-t border-hairline">
        {content.items.map((item, index) => {
          const flipped = index % 2 === 1;

          return (
            <article
              key={item.id}
              className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
            >
              <Reveal
                preset={flipped ? 'fadeLeft' : 'fadeRight'}
                className={cn(
                  'group lg:col-span-7',
                  flipped ? 'lg:order-2 lg:col-start-6' : 'lg:order-1',
                )}
              >
                <Image
                  media={item.image}
                  ratio="3/2"
                  zoom
                  className="rounded-card shadow-lifted"
                />
              </Reveal>

              <Reveal
                preset={flipped ? 'fadeRight' : 'fadeLeft'}
                className={cn(
                  'flex flex-col justify-center lg:col-span-5',
                  flipped ? 'lg:order-1 lg:row-start-1' : 'lg:order-2',
                )}
              >
                <span className="text-caption font-bold tabular-nums text-ember">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.5rem] font-bold leading-tight text-navy-deep md:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-prose text-body-sm text-charcoal">{item.description}</p>

                <ul className="mt-7 divide-y divide-hairline border-y border-hairline">
                  {item.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="flex items-start gap-3 py-3 text-caption text-navy-deep"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" aria-hidden />
                      {metric}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- leadership */

function LeadershipSection() {
  // The board carries its own dark band and heading, so it is rendered bare rather than
  // wrapped in a `Section` — nesting it would double the vertical rhythm.
  return (
    <div id="leadership">
      <LeadershipBoard groups={leadershipGroups} />
    </div>
  );
}

/* --------------------------------------------------------------------- page */

export default function AboutPage() {
  useSeo({ title: about.hero.title, description: about.hero.subtitle });


  return (
    <>
      <PageHero
        variant="feature"
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.subtitle}
        image={about.hero.image}
        breadcrumb={breadcrumb}
      >
        {about.hero.image.caption ? (
          <p className="max-w-xl border-l-2 border-ember pl-5 text-caption text-white/60">
            {about.hero.image.caption}
          </p>
        ) : null}
      </PageHero>

      <OverviewSection content={about.overview} />
      <ShareholdersSection content={about.shareholders} />
      <VisionSection vision={about.vision} mission={about.mission} />
      <ValuesSection content={about.values} />
      <TimelineSection content={about.timeline} />
      <PortfolioSection content={about.portfolio} />
      <LeadershipSection />
    </>
  );
}

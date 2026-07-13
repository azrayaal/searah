import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText, Lock } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Tabs } from '@/components/ui/Tabs';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Image } from '@/components/ui/Image';
import { Gallery } from '@/components/ui/Gallery';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { NewsCard } from '@/components/features/newsletter/NewsCard';
import { AssetMap } from '@/components/features/assets/AssetMap';
import { AssetDetail } from '@/components/features/assets/AssetDetail';
import { entities, getEntity, getEntityAssets } from '@/data/entities';
import { getArticlesByEntity } from '@/data/newsletter';
import { getResourcesByIds } from '@/data/resources';
import { Icon } from '@/lib/icons';
import { useSeo } from '@/hooks';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Asset, Entity } from '@/types';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'operations', label: 'Operations' },
  { id: 'assets', label: 'Assets' },
  { id: 'production', label: 'Production' },
  { id: 'news', label: 'Latest News' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'downloads', label: 'Downloads' },
];

/** Grouped bar chart of the entity's quarterly output, drawn from data. */
function ProductionChart({ entity }: { entity: Entity }) {
  const history = entity.productionHistory;
  const peak = Math.max(...history.flatMap((point) => [point.oil, point.gas]));

  return (
    <div className="rounded-card border border-hairline bg-white p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-h3 text-navy-deep">Quarterly production</p>
        <ul className="flex gap-5">
          {[
            { label: 'Oil (kbbl/d)', colour: 'bg-navy-deep' },
            { label: 'Gas (MMSCF/D)', colour: 'bg-ocean' },
          ].map((legend) => (
            <li key={legend.label} className="flex items-center gap-2 text-caption text-muted">
              <span className={cn('h-2 w-2 rounded-full', legend.colour)} aria-hidden />
              {legend.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex h-56 items-end justify-between gap-4">
        {history.map((point, index) => (
          <div key={point.period} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-full w-full items-end justify-center gap-1.5">
              {[
                { value: point.oil, colour: 'bg-navy-deep' },
                { value: point.gas, colour: 'bg-ocean' },
              ].map((bar, barIndex) => (
                <motion.div
                  key={barIndex}
                  className={cn('w-full max-w-[18px] rounded-t-[3px]', bar.colour)}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(bar.value / peak) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: index * 0.06 + barIndex * 0.04 }}
                  title={`${point.period}: ${bar.value}`}
                />
              ))}
            </div>
            <span className="text-[0.7rem] font-semibold text-muted">{point.period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EntityPage() {
  const { code } = useParams<{ code: string }>();
  const entity = code ? getEntity(code) : undefined;
  const [active, setActive] = useState('overview');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const entityAssets = useMemo(() => (entity ? getEntityAssets(entity.id) : []), [entity]);
  const entityNews = useMemo(() => (entity ? getArticlesByEntity(entity.id) : []), [entity]);
  const downloads = useMemo(() => (entity ? getResourcesByIds(entity.downloads) : []), [entity]);

  useSeo({
    title: entity ? `${entity.name} — ${entity.tagline}` : 'Entity',
    description: entity?.summary ?? '',
    image: entity?.hero.src,
  });

  if (!entity) return <Navigate to="/about" replace />;

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero
        eyebrow={`${entity.code} · ${entity.headquarters}`}
        title={entity.name}
        description={entity.summary}
        breadcrumb={[
          { label: 'About', href: '/about' },
          { label: entity.name, href: `/entity/${entity.id}` },
        ]}
        image={entity.hero}
        variant="feature"
      >
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {entity.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/45">
                {stat.label}
              </dt>
              <dd className="mt-1.5 text-[1.5rem] font-bold text-white">{stat.value}</dd>
              {stat.caption ? (
                <dd className="mt-0.5 text-caption text-white/50">{stat.caption}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Sticky in-page navigation */}
      <div className="sticky top-[68px] z-30 border-b border-hairline bg-white/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 3xl:px-16">
          <Tabs
            items={SECTIONS}
            value={active}
            onChange={scrollTo}
            layoutKey="entity-sections"
            className="border-b-0"
          />
        </div>
      </div>

      {/* Overview */}
      <Section id="overview" tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <Reveal preset="fadeRight">
            <p className="eyebrow mb-4 text-ocean">
              <span className="h-px w-8 bg-ocean/40" aria-hidden />
              {entity.fullName}
            </p>
            <h2 className="text-[1.75rem] font-bold leading-[1.2] text-navy-deep md:text-h2">
              {entity.tagline}
            </h2>
            <div className="mt-6 space-y-5">
              {entity.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body-sm text-charcoal md:text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal preset="fadeLeft">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline bg-hairline">
              {[
                { label: 'Established', value: entity.established },
                { label: 'Headquarters', value: entity.headquarters },
                { label: 'Employees', value: entity.employees.toLocaleString('en-GB') },
                { label: 'Assets operated', value: String(entityAssets.length) },
              ].map((item) => (
                <div key={item.label} className="bg-white p-5 lg:p-6">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-body-sm font-bold text-navy-deep">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-card border border-hairline p-6 lg:p-8">
              <p className="text-caption font-bold uppercase tracking-[0.1em] text-ocean">
                Production mix
              </p>
              <ul className="mt-5 space-y-4">
                {entity.productionMix.map((slice) => (
                  <li key={slice.label}>
                    <div className="flex items-baseline justify-between text-body-sm">
                      <span className="text-charcoal">{slice.label}</span>
                      <span className="font-bold tabular-nums text-navy-deep">
                        {slice.value}
                        {slice.unit}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-deep/8">
                      <motion.div
                        className="h-full rounded-full bg-ocean"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${slice.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Leadership */}
      <Section id="leadership" tone="faint">
        <SectionHeader
          eyebrow="Leadership"
          title={`The team running ${entity.name}`}
          cta={{ label: 'Full organisation chart', href: '/organisation' }}
        />

        <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {entity.leadership.map((leader) => (
            <RevealItem key={leader.id}>
              <a
                href={`/directory?person=${leader.employeeId}`}
                className="group block"
              >
                <Image media={leader.photo} ratio="3/4" zoom className="rounded-card" />
                <p className="mt-5 text-h3 text-navy-deep transition-colors group-hover:text-ocean">
                  {leader.name}
                </p>
                <p className="mt-1 text-caption text-muted">{leader.role}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Operations */}
      <Section id="operations" tone="white">
        <SectionHeader eyebrow="Operations" title="How this entity works" />

        <RevealGroup
          className="mt-12 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2"
          gap={0.06}
        >
          {entity.operations.map((operation) => (
            <RevealItem key={operation.title} className="bg-white p-7 lg:p-9">
              <Icon name={operation.icon} className="h-[18px] w-[18px] text-ocean" />
              <p className="mt-5 text-h3 text-navy-deep">{operation.title}</p>
              <p className="mt-2.5 text-body-sm text-charcoal">{operation.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Assets */}
      <Section id="assets" tone="faint">
        <SectionHeader
          eyebrow="Assets"
          title={`${entityAssets.length} assets under ${entity.code}`}
          cta={{ label: 'All group assets', href: '/assets' }}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal preset="scaleIn">
            <AssetMap
              assets={entityAssets}
              activeId={selectedAsset?.id}
              onSelect={setSelectedAsset}
              className="aspect-[12/5] w-full shadow-lifted"
            />
          </Reveal>

          <RevealGroup className="divide-y divide-hairline rounded-card border border-hairline bg-white" gap={0.05}>
            {entityAssets.map((asset) => (
              <RevealItem key={asset.id}>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-sky-faint"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-body-sm font-semibold text-navy-deep">
                      {asset.name}
                    </span>
                    <span className="mt-0.5 block truncate text-caption text-muted">
                      {asset.type} · {asset.region}
                    </span>
                  </span>
                  <Badge tone={asset.status === 'Producing' ? 'ember' : 'ocean'}>
                    {asset.status}
                  </Badge>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      </Section>

      {/* Production */}
      <Section id="production" tone="white">
        <SectionHeader eyebrow="Production" title="Output and trajectory" />
        <Reveal preset="fadeUp" className="mt-12">
          <ProductionChart entity={entity} />
        </Reveal>
      </Section>

      {/* News tagged to this entity */}
      <Section id="news" tone="faint">
        <SectionHeader
          eyebrow="Newsroom"
          title={`Latest from ${entity.name}`}
          description={`Every article tagged to ${entity.code} appears here automatically.`}
          cta={{ label: 'All articles', href: `/newsletter?entity=${entity.id}` }}
        />

        <RevealGroup className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {entityNews.slice(0, 3).map((article) => (
            <RevealItem key={article.id}>
              <NewsCard article={article} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Gallery */}
      <Section id="gallery" tone="white">
        <SectionHeader eyebrow="Gallery" title="Inside the operation" />
        <Reveal preset="fadeUp" className="mt-12">
          <Gallery images={entity.gallery} />
        </Reveal>
      </Section>

      {/* Downloads */}
      <Section id="downloads" tone="navy">
        <SectionHeader
          eyebrow="Downloads"
          title="Reports and reference material"
          tone="dark"
          cta={{ label: 'Resource centre', href: '/resources' }}
        />

        <RevealGroup className="mt-12 divide-y divide-white/10 border-y border-white/10" gap={0.06}>
          {downloads.map((resource) => (
            <RevealItem key={resource.id}>
              <a
                href={resource.href}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span className="flex min-w-0 items-start gap-4">
                  <FileText className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/40" aria-hidden />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-body-sm font-semibold text-white transition-colors group-hover:text-ember">
                        {resource.title}
                      </span>
                      {resource.restricted ? (
                        <Badge tone="onDark">
                          <Lock className="h-3 w-3" aria-hidden />
                          Restricted
                        </Badge>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-caption text-white/50">
                      {resource.type} · {resource.size} · {resource.owner}
                    </span>
                  </span>
                </span>

                <Download className="h-[18px] w-[18px] shrink-0 text-white/40 transition-all duration-300 ease-premium group-hover:translate-y-0.5 group-hover:text-ember" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Sibling entities */}
      <Section tone="white" spacing="tight">
        <SectionHeader eyebrow="Group entities" title="Explore the rest of the group" />

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2" gap={0.08}>
          {entities
            .filter((item) => item.id !== entity.id)
            .map((item) => (
              <RevealItem key={item.id}>
                <ButtonLink
                  href={`/entity/${item.id}`}
                  variant="secondary"
                  className="group h-auto w-full justify-between p-6 text-left lg:p-7"
                  icon={
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                  }
                >
                  <span className="min-w-0">
                    <span className="block text-h3 text-navy-deep">{item.name}</span>
                    <span className="mt-1 block text-caption font-normal text-muted">
                      {item.tagline}
                    </span>
                  </span>
                </ButtonLink>
              </RevealItem>
            ))}
        </RevealGroup>
      </Section>
    </>
  );
}

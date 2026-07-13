import { HeroBanner } from '@/components/features/home/HeroBanner';
import { PerformanceSection } from '@/components/features/home/PerformanceSection';
// Market section is available but currently disabled on the homepage — see below.
// import { MarketSection } from '@/components/features/home/MarketSection';
import { AssetsSection } from '@/components/features/home/AssetsSection';
import { NewsSection } from '@/components/features/home/NewsSection';
import { QuickAccessSection } from '@/components/features/home/QuickAccessSection';
import { SpotlightSection } from '@/components/features/home/SpotlightSection';
import { EntitiesRail } from '@/components/features/home/EntitiesRail';
import { entities } from '@/data/entities';
import { useSeo } from '@/hooks';
import { homepage } from '@/data/homepage';
import { assets } from '@/data/assets';
import { news, featuredArticle } from '@/data/newsletter';
import { site } from '@/data/site';

export default function HomePage() {
  useSeo({ title: site.tagline, description: site.description });

  const lead = featuredArticle ?? news[0];
  const rest = news.filter((article) => article.id !== lead.id).slice(0, 4);

  return (
    <>
      <HeroBanner content={homepage.hero} />
      <QuickAccessSection
        intro={homepage.quickAccess.intro}
        links={homepage.quickAccess.links}
      />
      {/* <MarketSection content={homepage.market} /> */}
      <EntitiesRail intro={homepage.entitiesSection} entities={entities} />
      <AssetsSection intro={homepage.assetsSection} assets={assets} />
      <NewsSection intro={homepage.newsSection} featured={lead} articles={rest} />
      <SpotlightSection content={homepage.spotlight} />
      <PerformanceSection content={homepage.performance} />
    </>
  );
}

import { HeroBanner } from '@/components/features/home/HeroBanner';
import { GlanceSection } from '@/components/features/home/GlanceSection';
import { ConnectSection } from '@/components/features/home/ConnectSection';
// Market and Performance sections still exist as components; the homepage no longer runs
// them. Production and safety figures now belong to each entity page, published with the
// date they were read, which is something a single group rail could never say per OpCo.
// import { MarketSection } from '@/components/features/home/MarketSection';
// import { PerformanceSection } from '@/components/features/home/PerformanceSection';
import { AssetsSection } from '@/components/features/home/AssetsSection';
import { NewsSection } from '@/components/features/home/NewsSection';
import { QuickAccessSection } from '@/components/features/home/QuickAccessSection';
import { SpotlightSection } from '@/components/features/home/SpotlightSection';
import { EntitiesRail } from '@/components/features/home/EntitiesRail';
import { entities } from '@/data/entities';
import { useSeo } from '@/hooks';
import { homepage } from '@/data/homepage';
import { assets } from '@/data/assets';
import { getHomeFeed } from '@/data/newsletter';
import { site } from '@/data/site';

export default function HomePage() {
  useSeo({ title: site.tagline, description: site.description });

  // Headline is an editorial pick, the rest fills itself — newest first, capped per
  // entity so no single OpCo can take over the group's front page.
  const { lead, rest } = getHomeFeed();

  return (
    <>
      <HeroBanner content={homepage.hero} />
      <GlanceSection content={homepage.glance} />
      {/* <MarketSection content={homepage.market} /> */}
      <EntitiesRail intro={homepage.entitiesSection} entities={entities} />
      <QuickAccessSection
        intro={homepage.quickAccess.intro}
        links={homepage.quickAccess.links}
      />
      <AssetsSection intro={homepage.assetsSection} assets={assets} />
      <NewsSection intro={homepage.newsSection} featured={lead} articles={rest} />
      {/* <SpotlightSection content={homepage.spotlight} /> */}
      {/* <ConnectSection
        intro={homepage.connect}
        entities={entities}
        emergency={homepage.emergency}
      /> */}
    </>
  );
}

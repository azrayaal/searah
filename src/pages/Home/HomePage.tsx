import { AssetsSection } from "@/components/features/home/AssetsSection";
import { EntitiesRail } from "@/components/features/home/EntitiesRail";
import { GlanceSection } from "@/components/features/home/GlanceSection";
import { HeroBanner } from "@/components/features/home/HeroBanner";
import { NewsSection } from "@/components/features/home/NewsSection";
import { QuickAccessSection } from "@/components/features/home/QuickAccessSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { assets } from "@/data/assets";
import { entities } from "@/data/entities";
import { homepage } from "@/data/homepage";
import { useHomeFeed } from "@/hooks/useNewsroom";
import { site } from "@/data/site";
import { useSeo } from "@/hooks";

export default function HomePage() {
  useSeo({
    title: site.tagline,
    description: site.description,
  });

  const { data: feed } = useHomeFeed();

  return (
    <>
      <HeroBanner content={homepage.hero} />

      <AnimatedSection>
        <GlanceSection content={homepage.glance} />
      </AnimatedSection>

      <AnimatedSection>
        <EntitiesRail
          intro={homepage.entitiesSection}
          entities={entities}
        />
      </AnimatedSection>

      <AnimatedSection>
        <QuickAccessSection
          intro={homepage.quickAccess.intro}
          links={homepage.quickAccess.links}
        />
      </AnimatedSection>

      <AnimatedSection>
        <AssetsSection
          intro={homepage.assetsSection}
          assets={assets}
        />
      </AnimatedSection>

      {/* The band is skipped entirely until a lead story exists, rather than rendering a
          heading above an empty grid while the feed is in flight. */}
      {feed.lead ? (
        <AnimatedSection>
          <NewsSection
            intro={homepage.newsSection}
            featured={feed.lead}
            articles={feed.rest}
          />
        </AnimatedSection>
      ) : null}
    </>
  );
}
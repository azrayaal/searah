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
import { getHomeFeed } from "@/data/newsletter";
import { site } from "@/data/site";
import { useSeo } from "@/hooks";

export default function HomePage() {
  useSeo({
    title: site.tagline,
    description: site.description,
  });

  const { lead, rest } = getHomeFeed();

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

      <AnimatedSection>
        <NewsSection
          intro={homepage.newsSection}
          featured={lead}
          articles={rest}
        />
      </AnimatedSection>
    </>
  );
}
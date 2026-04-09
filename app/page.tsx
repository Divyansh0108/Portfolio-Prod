import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Experience } from "@/components/sections/Experience";
import { FeaturedResearch } from "@/components/sections/FeaturedResearch";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Education } from "@/components/sections/Education";
import { HonorsAwards } from "@/components/sections/HonorsAwards";
import { Volunteering } from "@/components/sections/Volunteering";
import { FooterCTA } from "@/components/sections/FooterCTA";

function FeaturedWritingSkeleton() {
  return (
    <section className="py-16 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-14 bg-[var(--muted)] rounded animate-pulse" />
        <div className="h-4 w-20 bg-[var(--muted)] rounded animate-pulse" />
      </div>
      <div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 py-4 border-b border-[var(--border)] last:border-0"
          >
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3.5 bg-[var(--muted)] rounded animate-pulse w-3/4" />
              <div className="h-3 bg-[var(--muted)] rounded animate-pulse w-1/2" />
            </div>
            <div className="h-3.5 w-3.5 bg-[var(--muted)] rounded animate-pulse flex-shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <FeaturedResearch />
      <FeaturedProjects />
      <CurrentlyExploring />
      <Skills />
      <Suspense fallback={<FeaturedWritingSkeleton />}>
        <FeaturedWriting />
      </Suspense>
      <Education />
      <HonorsAwards />
      <Volunteering />
      <FooterCTA />
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Experience } from "@/components/sections/Experience";
import { FeaturedResearch } from "@/components/sections/FeaturedResearch";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Education } from "@/components/sections/Education";
import { HonorsAwards } from "@/components/sections/HonorsAwards";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CurrentlyExploring />
      <Experience />
      <FeaturedResearch />
      <FeaturedProjects />
      <Skills />
      <FeaturedWriting />
      <Education />
      <HonorsAwards />
      <FooterCTA />
    </>
  );
}

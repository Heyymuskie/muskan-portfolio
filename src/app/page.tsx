import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EducationSection } from "@/components/sections/education-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { FaqJsonLd } from "@/components/json-ld";
import { FAQS } from "@/data/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE.url },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />

      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <FaqSection />
      <ContactCta />
    </>
  );
}

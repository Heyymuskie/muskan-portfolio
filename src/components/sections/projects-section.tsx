import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { Section, SectionHeading } from "@/components/sections/section";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection({ limit }: { limit?: number }) {
  const shown = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <Section id="projects" divider>
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Four case studies, documented end to end"
          lead="Each one has a full write-up: the problem, the data, the method, the findings, and what I'd do next."
        />

        <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
          {shown.map((p, i) => (
            <li key={p.slug} className="min-w-0">
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>

        <div className="flex justify-center pt-2">
          <Button asChild size="lg" variant="outline" className="h-11 px-6">
            <Link href="/projects">
              Browse all case studies
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}


import React, { useState } from "react";
import { ProjectCard } from "../ui/project-card";
import { TextReveal } from "../ui/animated-text";
import { GlowingButton } from "../ui/glowing-button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "../ui/carousel";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with a sleek user interface, product filtering, cart functionality, and secure checkout.",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Next.js", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 2,
    title: "Dashboard UI",
    description: "A comprehensive admin dashboard with analytics, data visualization, and user management features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Recharts"],
    link: "#"
  },
  {
    id: 3,
    title: "Social Media App",
    description: "A full-featured social media application with real-time messaging, post creation, and user profiles.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    tags: ["React", "Firebase", "Styled Components"],
    link: "#"
  },
  {
    id: 4,
    title: "Travel Booking",
    description: "A travel booking platform with flight and hotel search, booking management, and payment processing.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Node.js"],
    link: "#"
  },
  {
    id: 5,
    title: "Productivity Tool",
    description: "A task management and productivity tool with calendar integration, notifications, and progress tracking.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2071&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Redux"],
    link: "#"
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A personal portfolio website with animated sections, project showcases, and contact form.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    link: "#"
  }
];

export const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const handleShowMore = () => {
    setVisibleProjects(Math.min(visibleProjects + 3, projectsData.length));
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-[5%] w-80 h-80 bg-glow-cyan/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
            My Projects
          </div>

          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured projects that showcase my skills
            </h2>
          </TextReveal>

          <TextReveal>
            <p className="text-foreground/70">
              A curated selection of my projects demonstrating my expertise in 
              frontend development, design, and problem-solving.
            </p>
          </TextReveal>
        </div>

        {/* Mobile View: Card Grid */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {projectsData.slice(0, visibleProjects).map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>

        {/* Desktop View: Carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {projectsData.map((project) => (
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      link={project.link}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static translate-y-0 left-0" />
              <CarouselNext className="relative static translate-y-0 right-0" />
            </div>
          </Carousel>
        </div>

        {visibleProjects < projectsData.length && (
          <div className="mt-12 text-center md:hidden">
            <GlowingButton
              onClick={handleShowMore}
              glowColor="purple"
              size="lg"
            >
              Load More Projects
              <ArrowRight size={16} className="ml-2" />
            </GlowingButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

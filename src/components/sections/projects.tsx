import React from "react";
import { ProjectCard } from "../ui/project-card";
import { TextReveal } from "../ui/animated-text";
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
    link: "https://swift-cart-3mmq-ivabsmdzz-arpan-das-projects.vercel.app/"
  },
  {
    id: 2,
    title: "Weather App",
    description: "A modern weather application featuring real-time weather data, 7-day forecast, and interactive weather maps with location search.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "OpenWeather API", "Tailwind CSS"],
    link: "https://weather-tau-virid.vercel.app/"
  },
  {
    id: 3,
    title: "Productivity Tool",
    description: "A task management and productivity tool with calendar integration, notifications, and progress tracking.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2071&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Redux"],
    link: "https://task-master-hazel-six.vercel.app/"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A personal portfolio website with animated sections, project showcases, and contact form.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 5,
    title: "ResumeACE",
    description: "An AI-powered resume builder and analyzer that helps create professional resumes and provides instant feedback for optimization.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "OpenAI API", "Tailwind CSS"],
    link: "https://resume-ace-ats-ats-friendly-resume-builder.vercel.app/"
  }
];

export const Projects = () => {
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

        {/* Use Carousel for both mobile and desktop */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {projectsData.map((project) => (
              <CarouselItem 
                key={project.id} 
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
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
    </section>
  );
};

export default Projects;

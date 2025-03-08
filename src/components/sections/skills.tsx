import React from "react";
import { RotatingSkillIcon } from "../ui/skill-icon";
import { TextReveal } from "../ui/animated-text";
import ParticlesBackground from "../ui/particles-background";
import { 
  Code2, Palette, Star, Lightbulb, Layers, 
  Smartphone, Zap, Database, SlidersHorizontal, Search
} from "lucide-react";

export const Skills = () => {
  const frontendSkills = [
    { name: "HTML/CSS", icon: <Code2 />, color: "bg-orange-500/10" },
    { name: "JavaScript", icon: <Code2 />, color: "bg-yellow-500/10" },
    { name: "React", icon: <Code2 />, color: "bg-blue-500/10" },
    { name: "Next.js", icon: <Code2 />, color: "bg-black/10" },
    { name: "Tailwind CSS", icon: <Code2 />, color: "bg-teal-500/10" },
  ];

  const designSkills = [
    { name: "UI Design", icon: <Palette />, color: "bg-purple-500/10" },
    { name: "UX Design", icon: <Smartphone />, color: "bg-pink-500/10" },
    { name: "Figma", icon: <Palette />, color: "bg-purple-500/10" },
    { name: "Animations", icon: <Zap />, color: "bg-yellow-500/10" },
    { name: "Responsive", icon: <SlidersHorizontal />, color: "bg-green-500/10" },
  ];

  const otherSkills = [
    { name: "Problem Solving", icon: <Lightbulb />, color: "bg-yellow-500/10" },
    { name: "API Integration", icon: <Database />, color: "bg-blue-500/10" },
    { name: "Performance", icon: <Zap />, color: "bg-green-500/10" },
    { name: "Accessibility", icon: <Search />, color: "bg-red-500/10" },
    { name: "Testing", icon: <Star />, color: "bg-purple-500/10" },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative"
    >
      {/* Particles background */}
      <ParticlesBackground 
        particleCount={40} 
        particleColor="#3b82f6" 
        particleSize={2}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
            My Skills
          </div>

          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Expert skills to bring your vision to life
            </h2>
          </TextReveal>

          <TextReveal>
            <p className="text-foreground/70">
              I've honed my skills in various areas of web development and design, allowing me to
              create holistic solutions that combine aesthetics with functionality.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {/* Frontend Skills */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers className="text-primary" />
              </div>
              <h3 className="text-xl font-bold">Frontend</h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {frontendSkills.map((skill, index) => (
                <RotatingSkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          {/* Design Skills */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Palette className="text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Design</h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {designSkills.map((skill, index) => (
                <RotatingSkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  delay={index * 100 + 200}
                />
              ))}
            </div>
          </div>

          {/* Other Skills */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Star className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold">Other</h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {otherSkills.map((skill, index) => (
                <RotatingSkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  delay={index * 100 + 400}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

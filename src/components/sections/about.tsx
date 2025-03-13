
import React from "react";
import { TextReveal } from "../ui/animated-text";
import { ParallaxSection } from "../ui/parallax-section";
import { GlowingButton } from "../ui/glowing-button";
import { Download, User } from "lucide-react";

export const About = () => {
  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Path to the CV file in the public folder
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-glow-blue/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-[5%] w-80 h-80 bg-glow-purple/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Avatar/Image - smaller version */}
          <div className="w-full lg:w-4/12">
            <ParallaxSection strength={20}>
              <div className="relative max-w-[280px] mx-auto">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                    alt="Developer"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
                
                {/* Avatar glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-glow-purple/20 rounded-[18px] blur opacity-70 -z-10"></div>
              </div>
            </ParallaxSection>
          </div>

          {/* Text content */}
          <div className="w-full lg:w-8/12">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
              About Me
            </div>

            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Crafting digital experiences with precision and creativity
              </h2>
            </TextReveal>

            <div className="space-y-4 mb-8 text-foreground/70">
              <TextReveal>
                <p>
                  I'm a frontend developer and UI/UX designer with a passion for creating beautiful,
                  functional, and user-centered digital experiences. With 5+ years of experience in
                  the field, I am constantly exploring new technologies and techniques to enhance my skills.
                </p>
              </TextReveal>
              
              <TextReveal>
                <p>
                  My approach combines technical expertise with creative problem-solving to deliver
                  solutions that not only meet but exceed expectations. I believe in the power of
                  thoughtful design and clean code to transform ideas into impactful digital products.
                </p>
              </TextReveal>
            </div>

            <div className="flex flex-wrap gap-4">
              <GlowingButton glowColor="purple">
                <User size={16} className="mr-2" />
                More About Me
              </GlowingButton>
              
              <GlowingButton 
                variant="outline" 
                glowColor="blue"
                onClick={handleDownloadCV}
              >
                <Download size={16} className="mr-2" />
                Download CV
              </GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import { TextReveal } from "../ui/animated-text";
import { ParallaxSection } from "../ui/parallax-section";
import { GlowingButton } from "../ui/glowing-button";
import { Download, User } from "lucide-react";

export const About = () => {
  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/ARPAN_DAS.pdf'; // Path to your resume in the public folder
    link.download = 'ARPAN_DAS.pdf';
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
          {/* Avatar/Image */}
          <div className="w-full lg:w-4/12">
            <ParallaxSection strength={20}>
              <div className="relative max-w-[280px] mx-auto">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/ad.jpeg" // Add your profile image to the public folder
                    alt="Arpan Das"
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
                Building the future of Fullstack development
              </h2>
            </TextReveal>

            <div className="space-y-4 mb-8 text-foreground/70">
              <TextReveal>
                <p>
                  I'm a passionate MCA student and fullstack developer, specializing in creating modern web applications 
                  with React, Next.js, and Node.js. My journey in web development is driven by a desire to build 
                  scalable, user-friendly solutions that make a real impact.
                </p>
              </TextReveal>
              
              <TextReveal>
                <p>
                  With a strong foundation in both frontend and backend development, I focus on delivering 
                  high-quality code and exceptional user experiences. I'm constantly learning and adapting to 
                  new technologies, ensuring that I stay at the forefront of web development trends and best practices.
                </p>
              </TextReveal>

              <TextReveal>
                <p>
                  My technical expertise includes modern JavaScript frameworks, responsive design, API integration, 
                  and database management. I'm particularly interested in creating performant applications that 
                  combine beautiful interfaces with robust functionality.
                </p>
              </TextReveal>
            </div>

            <div className="flex flex-wrap gap-4">
              <GlowingButton 
                variant="outline" 
                glowColor="blue"
                onClick={handleDownloadCV}
              >
                <Download size={16} className="mr-2" />
                Download Resume
              </GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

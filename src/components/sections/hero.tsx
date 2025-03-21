import React, { useEffect, useState } from "react";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";
import { GlowingButton } from "../ui/glowing-button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // Show the arrow after a delay with simplified animation
    const timeout = setTimeout(() => {
      setShowArrow(true);
    }, 1200);

    // Hide arrow when scrolling past hero section
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setShowArrow(rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div>
            <ParallaxSection strength={10} className="mb-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6"
              >
                Fullstack Developer
              </motion.div>
            </ParallaxSection>
          </div>

          {/* Card */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="p-8 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="block mb-2">Hi, I'm</span>
                <span className="text-gradient">Arpan Das</span>
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-foreground/70 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Motivated MCA student and aspiring Web Developer with expertise in Frontend and Backend Development, 
                specializing in React, Next.js, and Tailwind CSS. Passionate about building scalable web applications, 
                optimizing UI/UX, and API integrations.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a 
                  href="mailto:arpabdas02@gmail.com"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={16} className="text-primary" />
                  <span>arpabdas02@gmail.com</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/arpan-das-mca/"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} className="text-primary" />
                  <span>arpan-das-mca</span>
                </a>
                <a 
                  href="https://github.com/CrazyArpan"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} className="text-primary" />
                  <span>CrazyArpan</span>
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-wrap gap-4">
                  <GlowingButton 
                    glowColor="blue" 
                    size="lg"
                    onClick={() => {
                      const projectsSection = document.getElementById("projects");
                      if (projectsSection) {
                        const headerOffset = 100;
                        const elementPosition = projectsSection.offsetTop - headerOffset;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    View Projects
                  </GlowingButton>
                  <GlowingButton 
                    variant="outline" 
                    glowColor="cyan" 
                    size="lg"
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        const headerOffset = 100;
                        const elementPosition = contactSection.offsetTop - headerOffset;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    Contact Me
                  </GlowingButton>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with simplified animation */}
      <div 
        className={cn(
          "absolute bottom-1  md:bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-500",
          showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          "z-30"
        )}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center px-4 py-2 rounded-full hover:text-primary transition-all duration-300 group"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
              const headerOffset = 80;
              const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }}
        >
          <span className="text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors">Scroll</span>
          <ArrowDown size={20} className="text-primary animate-bounce mt-1" />
        </a>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/80"></div>
        
        {/* Your existing background elements */}
        <div 
          className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full opacity-20"
          style={{ background: "linear-gradient(45deg, #3b82f6, #06b6d4)" }}
        />
        
        <div 
          className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full blur-3xl opacity-10"
          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
        />
        
        <div 
          className="absolute top-1/4 left-[15%] w-32 h-32 bg-glow-cyan/5 rounded-full blur-2xl -z-10"
        />
      </div>

      {/* Static particles - simplified to avoid performance issues */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/20 blur-sm"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

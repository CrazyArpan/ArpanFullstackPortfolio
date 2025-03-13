
import React, { useEffect, useState } from "react";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";
import { GlowingButton } from "../ui/glowing-button";
import { motion } from "framer-motion";

export const Hero = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // Show the arrow after a delay with simplified animation
    const timeout = setTimeout(() => {
      setShowArrow(true);
    }, 1200);

    return () => clearTimeout(timeout);
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
                Frontend Developer & UI/UX Designer
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
                <div className="flex items-center gap-2 text-foreground/70">
                  <Mail size={16} className="text-primary" />
                  <span>arpabdas02@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Linkedin size={16} className="text-primary" />
                  <span>marpan-das-mca</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Github size={16} className="text-primary" />
                  <span>CrazyArpan</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-wrap gap-4">
                  <GlowingButton glowColor="blue" size="lg">
                    View Projects
                  </GlowingButton>
                  <GlowingButton variant="outline" glowColor="cyan" size="lg">
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
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${showArrow ? 'opacity-100' : 'opacity-0'}`}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-foreground/50 hover:text-primary transition-colors"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>

      {/* Simple static background elements */}
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

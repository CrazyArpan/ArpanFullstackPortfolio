
import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";
import { Typewriter } from "../ui/animated-text";
import { GlowingButton } from "../ui/glowing-button";
import { motion } from "framer-motion";

export const Hero = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // Show the arrow after a delay
    const timeout = setTimeout(() => {
      setShowArrow(true);
    }, 4000);

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ParallaxSection strength={15} className="mb-6">
              <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6 animate-fade-in">
                Frontend Developer & UI/UX Designer
              </div>
            </ParallaxSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ParallaxSection strength={25} className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Creating beautiful
                <br />
                <span className="text-gradient">digital experiences</span>
              </h1>
            </ParallaxSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ParallaxSection strength={15}>
              <div className="text-lg md:text-xl text-foreground/70 mb-8 h-[60px]">
                <Typewriter
                  text="I design and build responsive, interactive websites and applications with a focus on user experience and performance."
                  speed={40}
                  delay={800}
                  onComplete={() => setTypingComplete(true)}
                />
              </div>

              <div 
                className={`transition-opacity duration-700 ${
                  typingComplete ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-4">
                  <GlowingButton glowColor="blue" size="lg">
                    View Projects
                  </GlowingButton>
                  <GlowingButton variant="outline" glowColor="cyan" size="lg">
                    Contact Me
                  </GlowingButton>
                </div>
              </div>
            </ParallaxSection>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ${
          showArrow ? "opacity-100" : "opacity-0"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showArrow ? 1 : 0, 
          y: showArrow ? 0 : 10 
        }}
        transition={{ duration: 0.6 }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-foreground/50 hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-glow-purple/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;

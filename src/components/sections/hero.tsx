
import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";
import { GlowingButton } from "../ui/glowing-button";
import { motion } from "framer-motion";

export const Hero = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Show the arrow after a delay
    const timeout = setTimeout(() => {
      setShowArrow(true);
    }, 2000);

    // Mark animation as complete after initial animations finish
    const animTimeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(animTimeout);
    };
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  // New 3D hover effect animation
  const card3dHover = {
    rest: { 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
    hover: { 
      scale: 1.03, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    }
  };
  
  // Cool entry animation
  const entranceAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce effect
      } 
    }
  };

  // Text content
  const titleText = "Creating beautiful";
  const subtitleText = "digital experiences";

  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <ParallaxSection strength={15} className="mb-6">
              <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { duration: 1, delay: 0.5 }
                  }}
                >
                  Frontend Developer & UI/UX Designer
                </motion.span>
              </div>
            </ParallaxSection>
          </motion.div>

          {/* New Cool 3D Card Animation */}
          <motion.div
            className="mb-12"
            initial="rest"
            whileHover="hover"
            variants={card3dHover}
            style={{ perspective: 1000 }}
          >
            <motion.div 
              className="p-8 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 shadow-lg"
              initial="hidden"
              animate="visible"
              variants={entranceAnimation}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                animate={{
                  y: [10, 0],
                  opacity: [0, 1],
                  transition: { duration: 0.8, ease: "easeOut" }
                }}
              >
                <span className="block mb-2">{titleText}</span>
                <span className="text-gradient">{subtitleText}</span>
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-foreground/70 mb-8"
                animate={{
                  y: [20, 0],
                  opacity: [0, 1],
                  transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
                }}
              >
                I design and build responsive, interactive websites and applications with a focus on user experience and performance.
              </motion.p>
              
              <motion.div
                animate={{
                  y: [30, 0],
                  opacity: [0, 1],
                  transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
                }}
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-700"
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
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>

      {/* Animated background elements with safe animations */}
      <motion.div 
        className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.3, 
          scale: 1,
          transition: { duration: 1.2, delay: 0.3 } 
        }}
        style={{ background: "linear-gradient(45deg, #3b82f6, #06b6d4)" }}
      />
      
      {/* Floating elements with safe animation configuration */}
      <motion.div 
        className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          y: [0, -15, 0] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
        style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
      />
      
      <motion.div 
        className="absolute top-1/4 left-[15%] w-32 h-32 bg-glow-cyan/5 rounded-full blur-2xl -z-10"
        animate={{ 
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
      />
      
      {/* New animated particle effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/30 blur-sm"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;


import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import ParticlesBackground from "@/components/ui/particles-background";
import MouseTracker from "@/components/ui/mouse-tracker";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulating loading assets with more stable timing
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Add a short delay before showing the content with animation
      const readyTimer = setTimeout(() => {
        setAppReady(true);
      }, 100);
      
      return () => clearTimeout(readyTimer);
    }, 1200);

    return () => clearTimeout(loadTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <motion.div 
            className="relative w-20 h-20"
            animate={{ 
              rotate: 360,
              transition: { 
                duration: 2, 
                repeat: Infinity,
                ease: "linear"
              } 
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
              animate={{
                rotate: 180,
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent"
              animate={{
                rotate: -240,
                transition: { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent"
              animate={{
                rotate: 300,
                transition: { 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
          <motion.h1 
            className="mt-8 text-2xl font-bold text-gradient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.5,
                ease: "easeOut"
              }
            }}
          >
            Arpan Portfolio
          </motion.h1>
          <motion.p 
            className="mt-2 text-sm text-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Loading creative experiences...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {appReady && (
        <motion.div 
          className="min-h-screen bg-background text-foreground custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ParticlesBackground 
            particleCount={isMobile ? 20 : 40} 
            particleColor="#3b82f6" 
            particleSize={1.5}
            particleSpeed={0.3}
            interactive={!isMobile}
          />
          
          {!isMobile && <MouseTracker color="#f97316" />}
          
          <Header />
          
          <main className="relative z-30">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;

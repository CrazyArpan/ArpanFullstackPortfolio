
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simple loading simulation with fixed duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin animation-delay-300"></div>
          </div>
          <h1 className="mt-8 text-2xl font-bold text-gradient">
            Arpan Portfolio
          </h1>
          <p className="mt-2 text-sm text-foreground/60 animate-pulse">
            Loading creative experiences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground custom-scrollbar">
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
    </div>
  );
};

export default Index;

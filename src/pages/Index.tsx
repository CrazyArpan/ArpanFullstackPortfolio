
import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import CustomCursor from "@/components/ui/cursor";
import ParticlesBackground from "@/components/ui/particles-background";
import MusicPlayer from "@/components/ui/music-player";
import TracingBeam from "@/components/ui/tracing-beam";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulating loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Show music player after a delay for better UX
    const musicTimer = setTimeout(() => {
      setShowMusicPlayer(true);
    }, 5000);

    const handleToggleMusic = () => {
      setShowMusicPlayer(prev => !prev);
    };

    window.addEventListener("toggleMusic", handleToggleMusic);

    return () => {
      clearTimeout(timer);
      clearTimeout(musicTimer);
      window.removeEventListener("toggleMusic", handleToggleMusic);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-2 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-transparent border-b-transparent border-l-primary animate-spin" style={{ animationDuration: '2.5s' }}></div>
          </div>
          <p className="mt-4 text-sm text-foreground/60 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isMobile && <CustomCursor />}
      <ParticlesBackground 
        particleCount={isMobile ? 20 : 50} 
        particleColor="#3b82f6" 
        particleSize={1.5}
        interactive={!isMobile}
      />
      
      <Header />
      
      {!isMobile && <TracingBeam className="hidden md:block" />}
      
      {showMusicPlayer && <MusicPlayer />}
      
      <main className="md:ml-12">
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

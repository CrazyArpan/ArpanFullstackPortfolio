
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlowingButton } from "../ui/glowing-button";
import { Menu, X, Music, Music2 } from "lucide-react";
import { GlassmorphicCard } from "../ui/glassmorphic-card";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    // This will be handled by a global state or context in a real app
    setMusicPlaying(!musicPlaying);
    
    // Dispatch a custom event that the MusicPlayer component will listen for
    const event = new CustomEvent("toggleMusic");
    window.dispatchEvent(event);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 lg:px-8",
        scrolled && "backdrop-blur-lg bg-background/30 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gradient">Portfolio</a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-300 hover:text-primary",
                activeSection === item.href.substring(1) ? "text-primary" : "text-foreground/80",
                "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                activeSection === item.href.substring(1) ? "after:w-full" : "after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleMusic}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              musicPlaying 
                ? "bg-primary/20 text-primary" 
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
            )}
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            {musicPlaying ? <Music2 size={20} /> : <Music size={20} />}
          </button>
          
          <GlowingButton glowColor="blue" size="sm" href="#contact">
            Get in Touch
          </GlowingButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button 
            onClick={toggleMusic}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              musicPlaying 
                ? "bg-primary/20 text-primary" 
                : "bg-foreground/10 text-foreground/70"
            )}
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            {musicPlaying ? <Music2 size={20} /> : <Music size={20} />}
          </button>
          
          <button 
            className="p-2 bg-foreground/10 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none translate-x-full"
        )}
      >
        <div 
          className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <GlassmorphicCard 
          className="absolute right-0 top-0 bottom-0 w-72 rounded-l-2xl rounded-r-none p-0 overflow-y-auto"
          glowColor="blue"
          glowIntensity="low"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <a href="#" className="text-xl font-bold text-gradient">Portfolio</a>
              <button 
                className="p-2 bg-foreground/10 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300",
                    activeSection === item.href.substring(1) 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/80 hover:bg-foreground/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            <div className="mt-auto pt-6">
              <GlowingButton 
                className="w-full" 
                glowColor="blue" 
                size="md" 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </GlowingButton>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </header>
  );
};

export default Header;

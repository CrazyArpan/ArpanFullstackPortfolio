import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlowingButton } from "../ui/glowing-button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      let currentSection = "home";
      
      // Get the current scroll position
      const scrollPosition = window.scrollY;
      const viewportMiddle = window.innerHeight / 2;
      
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionMiddle = sectionTop + rect.height / 2;
          
          // Check if section's middle point is closest to viewport middle
          if (Math.abs(sectionMiddle - viewportMiddle) < window.innerHeight * 0.5) {
            currentSection = section;
          }
          
          // If section top is near viewport top (with header offset)
          if (sectionTop <= 100 && sectionTop > -100) {
            currentSection = section;
          }
        }
      }

      // Special case for home section
      if (scrollPosition < 100) {
        currentSection = "home";
      }
      
      // Special case for last section
      const lastSection = document.getElementById("contact");
      if (lastSection) {
        const bottomOffset = window.innerHeight + scrollPosition;
        const documentHeight = document.documentElement.scrollHeight;
        if (bottomOffset >= documentHeight - 100) {
          currentSection = "contact";
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavItemClick = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    
    if (element) {
      if (isMobile) {
        setMobileMenuOpen(false);
      }
      
      // Calculate scroll position with offset for header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update active section after a small delay to ensure scroll is complete
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 100);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/30 before:opacity-100" 
          : "bg-transparent before:opacity-0"
      )}
    >
      {/* Glassmorphism layers */}
      <div className="absolute inset-0 -z-10">
        {/* Blur layer */}
        <div className="absolute inset-0 backdrop-blur-md transition-opacity duration-300"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-transparent opacity-80"></div>
        {/* Border */}
        <div className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
          "bg-gradient-to-r from-transparent via-white/15 to-transparent"
        )}></div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10 py-4 px-6 lg:px-8">
        <div className="w-10"></div> {/* Empty div to maintain spacing */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavItemClick(item.href);
              }}
              className={cn(
                "relative text-sm font-medium transition-all duration-300",
                activeSection === item.href.substring(1) 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-foreground",
                "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                activeSection === item.href.substring(1) 
                  ? "after:w-full" 
                  : "after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center">
          <GlowingButton 
            glowColor="blue" 
            size="sm" 
            onClick={() => {
              handleNavItemClick("#contact");
            }}
          >
            Get in Touch
          </GlowingButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden z-20">
          <button 
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              scrolled 
                ? "bg-white/10 backdrop-blur-lg hover:bg-white/20" 
                : "bg-background/5 hover:bg-white/10"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay with Glassmorphism */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-10 transition-all duration-300",
            mobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          )}
        >
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div 
            className={cn(
              "absolute top-0 bottom-0 w-full max-w-xs bg-background/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col h-full",
              mobileMenuOpen ? "right-0" : "-right-full"
            )}
          >
            <div className="flex justify-end items-center mb-8 p-6">
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300",
                    activeSection === item.href.substring(1) 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:bg-white/10 hover:text-foreground"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            <div className="mt-auto p-6">
              <GlowingButton 
                className="w-full" 
                glowColor="blue" 
                size="md" 
                onClick={() => {
                  handleNavItemClick("#contact");
                }}
              >
                Get in Touch
              </GlowingButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlowingButton } from "../ui/glowing-button";
import { Menu, X } from "lucide-react";
import { GlassmorphicCard } from "../ui/glassmorphic-card";
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
    // Initial check to set active section
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    // Allow a small delay for the mobile menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, isMobile ? 300 : 0);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 lg:px-8",
        scrolled && "backdrop-blur-lg bg-background/30 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-gradient z-20">Arpan's Portfolio</a>

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
            className="p-2 bg-foreground/10 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Fixed Full Screen Overlay - FIXED for better mobile experience */}
      <div
        className={cn(
          "fixed inset-0 z-10 md:hidden transition-all duration-300",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div 
          className={cn(
            "absolute top-0 bottom-0 w-full max-w-xs bg-background/90 backdrop-blur-lg border-r border-border p-6 transition-transform duration-300 flex flex-col h-full",
            mobileMenuOpen ? "right-0" : "-right-full"
          )}
        >
          <div className="flex justify-between items-center mb-8">
            <a 
              href="#home" 
              className="text-xl font-bold text-gradient"
              onClick={(e) => {
                e.preventDefault();
                handleNavItemClick("#home");
              }}
            >
              Arpan's Portfolio
            </a>
            <button 
              className="p-2 bg-foreground/10 rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 mt-4">
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavItemClick(item.href);
                }}
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
              onClick={() => {
                handleNavItemClick("#contact");
              }}
            >
              Get in Touch
            </GlowingButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

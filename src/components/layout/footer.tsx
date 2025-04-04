
import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: Github, 
      url: "https://github.com/CrazyArpan", 
      label: "GitHub",
      hoverColor: "hover:text-blue-400" 
    },
    { 
      icon: Linkedin, 
      url: "https://www.linkedin.com/in/arpan-das-mca/", 
      label: "LinkedIn",
      hoverColor: "hover:text-blue-600" 
    },
    { 
      icon: Twitter, 
      url: "https://x.com/ArpanDas686248", 
      label: "Twitter",
      hoverColor: "hover:text-blue-500" 
    },
    { 
      icon: Mail, 
      url: "mailto:arpabdas02@gmail.com", 
      label: "Email",
      hoverColor: "hover:text-purple-500" 
    }
  ];
  
  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleScrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer 
      className="py-12 px-6 border-t border-border/30 relative z-30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerAnimation}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="md:col-span-2"
            variants={itemAnimation}
          >
            <h3 className="text-xl font-bold mb-4 text-gradient">Portfolio</h3>
            <p className="text-muted-foreground max-w-md">
              Creating beautiful, interactive, and high-performance web experiences with attention to detail and a passion for design.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  className={`text-foreground/70 ${social.hoverColor} transition-colors`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { delay: 0.2 + (index * 0.1) }
                  }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemAnimation}>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", id: "hero" }, 
                { name: "About", id: "about" }, 
                { name: "Skills", id: "skills" }, 
                { name: "Projects", id: "projects" }, 
                { name: "Contact", id: "contact" }
              ].map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={`#${link.id}`}
                    onClick={handleScrollToSection(link.id)}
                    className="text-foreground/70 hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemAnimation}>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:arpabdas02@gmail.com" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  arpabdas02@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+91 8927559821" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  +91 8927559821
                </a>
              </li>
              <li className="text-foreground/70">Indas, West Bengal</li>
            </ul>
            <motion.div 
              className="mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="mt-2 w-full"
                onClick={handleScrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground"
          variants={itemAnimation}
        >
          <p>© {currentYear} Arpan Das. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

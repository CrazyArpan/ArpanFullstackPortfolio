
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface TracingBeamProps {
  className?: string;
  children?: React.ReactNode;
}

export const TracingBeam = ({ className }: TracingBeamProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
    
    // Update height on resize
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight - 50]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative h-full w-16 left-0 fixed z-40", className)}
    >
      {/* Background line - thinner and more subtle */}
      <div className="absolute -ml-px h-full w-[3px] left-8 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10" />
      
      {/* Animated SVG - smaller but more vibrant */}
      <svg
        className="sticky top-0 left-8 ml-px h-full w-[16px]"
        width="16"
        height={svgHeight}
        viewBox={`0 0 16 ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={`M8 ${y1} L8 ${y2}`}
          stroke="url(#pulse-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-pulse"
        />
        <defs>
          <linearGradient
            id="pulse-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={svgHeight}
          >
            <stop stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="0.5" stopColor="#c084fc" stopOpacity="1" />
            <stop offset="1" stopColor="#34d399" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={contentRef} className="h-full" />

      {/* Scroll to top button - smaller and more elegant */}
      <motion.button
        onClick={scrollToTop}
        className={cn(
          "absolute left-4 bottom-10 w-12 h-12 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center text-primary transition-all duration-300 border border-primary/60 hover:bg-primary/60 z-50",
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp size={18} />
      </motion.button>
    </motion.div>
  );
};

export default TracingBeam;


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
      className={cn("relative h-full w-24 left-0 fixed z-30", className)}
    >
      <div className="absolute -ml-px h-full w-[6px] left-12 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/20" />
      <svg
        className="sticky top-0 left-12 ml-px h-full w-[24px]"
        width="24"
        height={svgHeight}
        viewBox={`0 0 24 ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={`M12 ${y1} L12 ${y2}`}
          stroke="url(#pulse-gradient)"
          strokeWidth="6"
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
            <stop stopColor="#60a5fa" />
            <stop offset="0.5" stopColor="#c084fc" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={contentRef} className="h-full" />

      <motion.button
        onClick={scrollToTop}
        className={cn(
          "absolute left-8 bottom-10 w-16 h-16 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center text-primary transition-all duration-300 border border-primary/50 hover:bg-primary/50",
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp size={24} />
      </motion.button>
    </motion.div>
  );
};

export default TracingBeam;


import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0 to 100, with 100 being max parallax effect
  direction?: "up" | "down" | "left" | "right";
  disabled?: boolean;
};

export const ParallaxSection = ({
  children,
  className,
  strength = 20,
  direction = "up",
  disabled = false,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);

  // Normalize strength to a reasonable value (0-30px)
  const normalizedStrength = Math.min(Math.max(strength, 0), 100) * 0.3;

  useEffect(() => {
    if (disabled) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled || !isInView) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate how far the mouse is from the center as a percentage of the container size
      const mouseX = (e.clientX - centerX) / (width / 2);
      const mouseY = (e.clientY - centerY) / (height / 2);

      // Apply the direction of the parallax effect
      let xOffset = 0;
      let yOffset = 0;

      if (direction === "up" || direction === "down") {
        yOffset = mouseY * normalizedStrength * (direction === "down" ? -1 : 1);
      } else {
        xOffset = mouseX * normalizedStrength * (direction === "right" ? -1 : 1);
      }

      setOffset({ x: xOffset, y: yOffset });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [disabled, isInView, normalizedStrength, direction]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        className="w-full h-full transition-transform duration-200"
        style={{
          transform: disabled ? "none" : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

type MouseParallaxProps = {
  children: React.ReactNode;
  className?: string;
  // Array of objects: { depth: number, element: React.ReactNode }
  layers: { depth: number; element: React.ReactNode }[];
};

export const MouseParallax = ({
  children,
  className,
  layers,
}: MouseParallaxProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Base content */}
      <div className="relative z-10">{children}</div>

      {/* Parallax layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-transform duration-200 pointer-events-none"
          style={{
            transform: `translate3d(${mousePosition.x * layer.depth * -20}px, ${
              mousePosition.y * layer.depth * -20
            }px, 0)`,
            zIndex: 5 - Math.min(layer.depth, 5),
          }}
        >
          {layer.element}
        </div>
      ))}
    </div>
  );
};

export default { ParallaxSection, MouseParallax };

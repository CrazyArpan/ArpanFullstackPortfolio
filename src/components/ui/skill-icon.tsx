
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SkillIconProps {
  icon: React.ReactNode;
  name: string;
  color?: string;
  className?: string;
}

export const SkillIcon = ({
  icon,
  name,
  color = "bg-primary/10",
  className,
}: SkillIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center transition-all duration-300 hover:scale-110",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden",
          color,
          isHovered ? "animate-bounce-light" : "animate-float"
        )}
      >
        <div className="text-2xl z-10">{icon}</div>
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            isHovered && "opacity-20"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.8), transparent 70%)",
          }}
        />
      </div>
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

interface RotatingSkillIconProps extends SkillIconProps {
  delay?: number;
}

export const RotatingSkillIcon = ({
  icon,
  name,
  color = "bg-primary/10",
  className,
  delay = 0,
}: RotatingSkillIconProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center",
        isInView ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: "700ms",
      }}
    >
      <div
        className={cn(
          "relative w-16 h-16 rounded-xl flex items-center justify-center",
          color,
          isInView && "animate-rotate-3d"
        )}
        style={{
          animationDelay: `${delay}ms`,
        }}
      >
        <div className="text-2xl z-10">{icon}</div>
      </div>
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

export default { SkillIcon, RotatingSkillIcon };

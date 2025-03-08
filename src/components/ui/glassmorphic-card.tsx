
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "blue" | "purple" | "cyan" | "none";
  glowIntensity?: "low" | "medium" | "high";
  interactive?: boolean;
}

export const GlassmorphicCard = ({
  children,
  className,
  glowColor = "blue",
  glowIntensity = "medium",
  interactive = true,
  ...props
}: GlassmorphicCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate the position of the mouse relative to the card
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ x, y });
  };

  // Define glow color based on the prop
  const glowColorClass = glowColor === "none" 
    ? "" 
    : `before:bg-glow-${glowColor}`;

  // Define glow intensity based on the prop
  const intensityMap = {
    low: "before:opacity-10",
    medium: "before:opacity-20",
    high: "before:opacity-30"
  };

  const glowIntensityClass = intensityMap[glowIntensity];

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl glass-card overflow-hidden transition-all duration-300",
        interactive && "hover:scale-[1.02] hover:shadow-lg",
        isHovering && interactive && "shadow-lg",
        className,
        glowColor !== "none" && `before:absolute before:content-[''] before:inset-0 before:rounded-2xl before:blur-xl before:translate-x-[-50%] before:translate-y-[-50%] before:w-[80%] before:h-[80%] before:opacity-0 ${glowColorClass} ${glowIntensityClass}`,
        isHovering && glowColor !== "none" && "before:opacity-100 before:transition-opacity before:duration-700"
      )}
      style={{
        "--x": `${mousePosition.x * 100}%`,
        "--y": `${mousePosition.y * 100}%`,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
      {interactive && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 rounded-2xl transition-opacity duration-300 pointer-events-none",
            isHovering && "opacity-50"
          )}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.1), transparent 40%)`,
          }}
        />
      )}
    </div>
  );
};

export default GlassmorphicCard;

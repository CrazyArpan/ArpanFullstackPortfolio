
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  glowColor?: "blue" | "purple" | "cyan";
  size?: "sm" | "md" | "lg";
}

export const GlowingButton = ({
  children,
  className,
  variant = "primary",
  glowColor = "blue",
  size = "md",
  ...props
}: GlowingButtonProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variants
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
  };

  // Glow colors
  const glowColors = {
    blue: "before:bg-glow-blue/50",
    purple: "before:bg-glow-purple/50",
    cyan: "before:bg-glow-cyan/50",
  };

  return (
    <button
      className={cn(
        "relative rounded-lg font-medium transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95",
        variants[variant],
        sizes[size],
        "before:absolute before:w-32 before:h-32 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:blur-xl",
        glowColors[glowColor],
        isHovering && "before:opacity-100",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        "--x": `${mousePosition.x * 100}%`,
        "--y": `${mousePosition.y * 100}%`,
      } as React.CSSProperties}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovering && "opacity-100"
        )}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.2), transparent 50%)`,
        }}
      />
    </button>
  );
};

export default GlowingButton;

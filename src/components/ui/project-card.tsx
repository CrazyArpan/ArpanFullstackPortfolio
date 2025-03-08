
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { GlassmorphicCard } from "./glassmorphic-card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  className?: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags,
  link,
  className,
}: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate the position of the mouse relative to the card (-20 to 20 degrees)
    const x = ((e.clientY - top - height / 2) / height) * 10;
    const y = ((e.clientX - left - width / 2) / width) * -10;
    
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "group perspective w-full h-[400px] cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative preserve-3d w-full h-full transition-all duration-500 ease-out",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{
          transform: isFlipped 
            ? `rotateY(180deg)` 
            : `rotateY(0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Front side */}
        <div 
          className="absolute inset-0 backface-hidden"
          onClick={handleFlip}
        >
          <GlassmorphicCard 
            className="w-full h-full group-hover:shadow-xl" 
            glowColor="blue"
            interactive={false}
          >
            <div className="w-full h-full flex flex-col overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>

        {/* Back side */}
        <div 
          className="absolute inset-0 backface-hidden rotate-y-180"
          onClick={handleFlip}
        >
          <GlassmorphicCard 
            className="w-full h-full" 
            glowColor="purple"
            interactive={false}
          >
            <div className="w-full h-full flex flex-col p-6">
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-sm mb-6">{description}</p>
              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

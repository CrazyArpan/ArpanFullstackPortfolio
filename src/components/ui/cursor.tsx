
import React, { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start offscreen
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Update cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button';

      if (isClickable) {
        setLinkHovered(true);
      }
    };

    const handleLinkHoverEnd = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      const stillOnLink = 
        relatedTarget && (
          relatedTarget.tagName === 'A' || 
          relatedTarget.tagName === 'BUTTON' || 
          relatedTarget.closest('a') || 
          relatedTarget.closest('button') ||
          relatedTarget.classList.contains('cursor-pointer') ||
          relatedTarget.getAttribute('role') === 'button'
        );

      if (!stillOnLink) {
        setLinkHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleLinkHoverStart);
    document.addEventListener("mouseout", handleLinkHoverEnd);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleLinkHoverStart);
      document.removeEventListener("mouseout", handleLinkHoverEnd);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: 0,
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            linkHovered ? "w-12 h-12" : "w-8 h-8"
          }`}
          style={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
          <div 
            className={`absolute rounded-full bg-white transition-all duration-200 ${
              linkHovered ? "w-6 h-6" : clicked ? "w-2 h-2" : "w-4 h-4"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;

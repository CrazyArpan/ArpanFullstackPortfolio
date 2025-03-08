
import React, { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') || 
          (e.target as HTMLElement).closest('button')) {
        setLinkHovered(true);
      }
    };

    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleLinkHoverStart);
    window.addEventListener("mouseout", handleLinkHoverEnd);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleLinkHoverStart);
      window.removeEventListener("mouseout", handleLinkHoverEnd);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-90" : "scale-100"}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            linkHovered ? "w-12 h-12" : "w-8 h-8"
          }`}
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

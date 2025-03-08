
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
};

export const Typewriter = ({
  text,
  className,
  delay = 0,
  speed = 50,
  onComplete,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const index = useRef(0);

  useEffect(() => {
    if (!started) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, delay);

      return () => clearTimeout(timeout);
    }

    if (started && index.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index.current + 1));
        index.current += 1;
      }, speed);

      return () => clearTimeout(timeout);
    } else if (started && index.current === text.length && onComplete) {
      onComplete();
    }
  }, [started, displayText, text, delay, speed, onComplete]);

  return (
    <span className={cn("typing-text", className)}>
      {displayText}
    </span>
  );
};

type AnimatedTextProps = {
  text: string;
  className?: string;
  once?: boolean;
  threshold?: number;
};

export const AnimatedText = ({
  text,
  className,
  once = true,
  threshold = 0.1,
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {text}
    </div>
  );
};

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export const TextReveal = ({ children, className }: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
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
        "overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "transform transition-transform duration-1000 ease-out",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default { Typewriter, AnimatedText, TextReveal };

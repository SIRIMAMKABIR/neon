import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface WhiteDotProps {
  onComplete?: () => void;
  autoStart?: boolean;
}

const WhiteDot = ({ onComplete, autoStart = true }: WhiteDotProps) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    if (!autoStart) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isFollowing) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Start the sequence after 2 seconds
    const timer = setTimeout(() => {
      setIsFollowing(false);
      
      if (dotRef.current) {
        // Expand animation
        gsap.to(dotRef.current, {
          scale: 100,
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      }
    }, 2000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [autoStart, onComplete, isFollowing]);

  useEffect(() => {
    if (dotRef.current && isFollowing) {
      gsap.set(dotRef.current, {
        x: mousePos.x - 4,
        y: mousePos.y - 4,
      });
    }
  }, [mousePos, isFollowing]);

  return (
    <div
      ref={dotRef}
      className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-50"
      style={{
        left: 0,
        top: 0,
        transformOrigin: "center",
      }}
    />
  );
};

export default WhiteDot;
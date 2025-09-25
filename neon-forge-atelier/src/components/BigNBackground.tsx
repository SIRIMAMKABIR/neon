import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BigNBackground = ({ opacity = 0.03, animated = true }) => {
  const nRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !nRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(nRef.current, {
      opacity: opacity * 1.5,
      scale: 1.02,
      duration: 8,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [opacity, animated]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div
        ref={nRef}
        className="big-n select-none"
        style={{ opacity }}
      >
        N
      </div>
    </div>
  );
};

export default BigNBackground;
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface ConstellationInputProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface Orb {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const ConstellationInput = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "" 
}: ConstellationInputProps) => {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "password" && value.length > 0) {
      const newOrbs: Orb[] = [];
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      for (let i = 0; i < value.length; i++) {
        newOrbs.push({
          id: i,
          x: Math.random() * (containerRect?.width || 300),
          y: Math.random() * (containerRect?.height || 50),
          delay: i * 0.1,
        });
      }
      
      setOrbs(newOrbs);
    } else {
      setOrbs([]);
    }
  }, [value, type]);

  return (
    <div ref={containerRef} className="relative constellation-field">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`glass-strong border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground ${className}`}
      />
      
      {/* Constellation orbs for password fields */}
      {type === "password" && orbs.map((orb) => (
        <div
          key={orb.id}
          className="constellation-orb"
          style={{
            left: orb.x,
            top: orb.y,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
      
      {/* Connection lines between orbs */}
      {type === "password" && orbs.length > 1 && (
        <svg className="absolute inset-0 pointer-events-none">
          {orbs.slice(0, -1).map((orb, index) => {
            const nextOrb = orbs[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={orb.x + 2}
                y1={orb.y + 2}
                x2={nextOrb.x + 2}
                y2={nextOrb.y + 2}
                stroke="hsl(var(--neon-blue))"
                strokeWidth="1"
                opacity="0.4"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default ConstellationInput;
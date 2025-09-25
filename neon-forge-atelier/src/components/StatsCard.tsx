import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  description?: string;
  variant?: "default" | "premium" | "executive";
  children?: ReactNode;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description,
  variant = "default",
  children 
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "premium":
        return "glass-card border-neon-blue/20 hover:border-neon-blue/40";
      case "executive":
        return "glass-card border-luxury-lavender/20 hover:border-luxury-lavender/40 bg-gradient-to-br from-luxury-purple/5 to-luxury-lavender/5";
      default:
        return "glass-card";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-400";
      case "negative":
        return "text-accent-red";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className={getVariantStyles()}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${
            variant === "executive" 
              ? "bg-luxury-purple/20" 
              : variant === "premium" 
                ? "bg-neon-blue/20" 
                : "bg-primary/10"
          }`}>
            <Icon className={`w-6 h-6 ${
              variant === "executive" 
                ? "text-luxury-lavender" 
                : variant === "premium" 
                  ? "text-neon-blue" 
                  : "text-primary"
            }`} />
          </div>
        )}
      </div>
      
      {change && (
        <div className="flex items-center space-x-2 mb-2">
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {children}
    </div>
  );
};

export default StatsCard;
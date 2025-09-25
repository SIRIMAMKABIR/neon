import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  isActive?: boolean;
}

interface PortalSidebarProps {
  title: string;
  subtitle: string;
  items: SidebarItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  children?: ReactNode;
  variant?: "staff" | "ceo" | "user";
}

const PortalSidebar = ({ 
  title, 
  subtitle, 
  items, 
  activeSection, 
  onSectionChange, 
  children,
  variant = "user" 
}: PortalSidebarProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "staff":
        return {
          titleGradient: "text-neon",
          activeClass: "bg-neon-blue/20 text-neon-blue border border-neon-blue/30",
          hoverClass: "text-muted-foreground hover:text-foreground hover:bg-white/5"
        };
      case "ceo":
        return {
          titleGradient: "text-luxury",
          activeClass: "bg-luxury-purple/20 text-luxury-lavender border border-luxury-lavender/30",
          hoverClass: "text-muted-foreground hover:text-foreground hover:bg-luxury-purple/10"
        };
      default:
        return {
          titleGradient: "text-neon",
          activeClass: "bg-neon-blue/20 text-neon-blue border border-neon-blue/30",
          hoverClass: "text-muted-foreground hover:text-foreground hover:bg-white/5"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="w-64 glass-strong border-r border-primary/10">
      <div className="p-6">
        <Link to="/" className={`text-2xl font-headline font-bold ${styles.titleGradient} block mb-2`}>
          {title}
        </Link>
        <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>
        
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive ? styles.activeClass : styles.hoverClass
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        {children}
      </div>
    </div>
  );
};

export default PortalSidebar;
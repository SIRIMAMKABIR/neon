import { Clock, CheckCircle, AlertCircle, Users, Zap } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "success" | "warning" | "info" | "highlight";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  variant?: "user" | "staff" | "ceo";
}

const ActivityTimeline = ({ events, variant = "user" }: ActivityTimelineProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertCircle;
      case "highlight":
        return Zap;
      default:
        return Clock;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400 bg-green-400/20";
      case "warning":
        return "text-yellow-400 bg-yellow-400/20";
      case "highlight":
        return variant === "ceo" ? "text-luxury-lavender bg-luxury-purple/20" : "text-neon-blue bg-neon-blue/20";
      default:
        return "text-muted-foreground bg-muted/20";
    }
  };

  return (
    <div className="glass-card">
      <h3 className="text-xl font-headline font-bold text-foreground mb-6">
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.type);
          const colorClass = getEventColor(event.type);
          
          return (
            <div key={event.id} className="flex space-x-4">
              <div className={`p-2 rounded-full ${colorClass} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.timestamp}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {event.description}
                </p>
                
                {event.user && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{event.user}</p>
                  </div>
                )}
              </div>
              
              {index < events.length - 1 && (
                <div className="absolute left-6 mt-12 w-px h-8 bg-border"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
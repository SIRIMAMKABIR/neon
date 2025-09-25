import { Calendar, Flame, Star, Trophy, Target } from "lucide-react";

interface Streak {
  id: string;
  name: string;
  current: number;
  goal: number;
  description: string;
  icon: "flame" | "star" | "trophy" | "target";
  color: string;
}

const EngagementStreaks = () => {
  const streaks: Streak[] = [
    {
      id: "daily",
      name: "Daily Visitor",
      current: 7,
      goal: 30,
      description: "Log in daily to maintain streak",
      icon: "flame",
      color: "text-orange-400"
    },
    {
      id: "creator", 
      name: "Active Creator",
      current: 3,
      goal: 10,
      description: "Publish fingerprints regularly",
      icon: "star",
      color: "text-yellow-400"
    },
    {
      id: "optimizer",
      name: "Performance Optimizer",
      current: 5,
      goal: 15,
      description: "Update and improve fingerprints",
      icon: "target",
      color: "text-green-400"
    },
    {
      id: "community",
      name: "Community Champion",
      current: 2,
      goal: 5,
      description: "Engage with community features",
      icon: "trophy", 
      color: "text-purple-400"
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "flame":
        return Flame;
      case "star":
        return Star;
      case "trophy":
        return Trophy;
      case "target":
        return Target;
      default:
        return Flame;
    }
  };

  return (
    <div className="glass-card">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="w-6 h-6 text-neon-blue" />
        <h3 className="text-xl font-headline font-bold text-neon">
          Engagement Streaks
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streaks.map((streak) => {
          const Icon = getIcon(streak.icon);
          const progress = (streak.current / streak.goal) * 100;
          
          return (
            <div key={streak.id} className="glass p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${streak.color}`} />
                  <h4 className="font-semibold text-foreground">{streak.name}</h4>
                </div>
                <span className="text-sm text-muted-foreground">
                  {streak.current}/{streak.goal}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {streak.description}
              </p>
              
              <div className="w-full bg-canvas-elevated rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    streak.icon === "flame" 
                      ? "from-orange-400 to-red-400"
                      : streak.icon === "star"
                        ? "from-yellow-400 to-orange-400"
                        : streak.icon === "target"
                          ? "from-green-400 to-blue-400"
                          : "from-purple-400 to-pink-400"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              
              {progress >= 100 && (
                <div className="flex items-center space-x-1 mt-2">
                  <Trophy className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">
                    Goal achieved!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EngagementStreaks;
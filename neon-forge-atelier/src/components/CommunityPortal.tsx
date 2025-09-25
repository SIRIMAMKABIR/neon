import { Users, MessageCircle, Star, TrendingUp, Award, ArrowRight } from "lucide-react";

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  contribution: string;
  streak: number;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  likes: number;
  timeAgo: string;
  isHot: boolean;
}

const CommunityPortal = () => {
  const featuredMembers: CommunityMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      role: "Design Innovator",
      contribution: "Created 12 trending templates",
      streak: 28
    },
    {
      id: "2",
      name: "Marcus Rivera",
      avatar: "MR", 
      role: "Community Leader",
      contribution: "Helped 150+ members",
      streak: 45
    },
    {
      id: "3",
      name: "Elena Kozlov",
      avatar: "EK",
      role: "Performance Guru",
      contribution: "Optimization expert",
      streak: 22
    }
  ];

  const recentDiscussions: Discussion[] = [
    {
      id: "1",
      title: "Best practices for luxury web animations",
      author: "Alex Johnson",
      replies: 24,
      likes: 67,
      timeAgo: "2h ago",
      isHot: true
    },
    {
      id: "2",
      title: "Template customization workflows",
      author: "Jamie Wilson",
      replies: 18,
      likes: 43,
      timeAgo: "4h ago", 
      isHot: false
    },
    {
      id: "3",
      title: "Client onboarding strategies",
      author: "Morgan Davis",
      replies: 31,
      likes: 89,
      timeAgo: "6h ago",
      isHot: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-neon-blue" />
            <h3 className="text-xl font-headline font-bold text-neon">
              Community Portal
            </h3>
          </div>
          <button className="text-sm text-neon-blue hover:underline flex items-center space-x-1">
            <span>Join discussions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue mb-1">2.8K</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-periwinkle mb-1">156</div>
            <div className="text-sm text-muted-foreground">Discussions Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-lavender mb-1">4.2K</div>
            <div className="text-sm text-muted-foreground">Templates Shared</div>
          </div>
        </div>
      </div>

      {/* Featured Members */}
      <div className="glass-card">
        <h4 className="text-lg font-headline font-bold text-foreground mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <span>Community Champions</span>
        </h4>
        
        <div className="space-y-4">
          {featuredMembers.map((member, index) => (
            <div key={member.id} className="flex items-center space-x-4 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {member.avatar}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-2 h-2 text-yellow-900 fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold text-foreground">{member.name}</h5>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.contribution}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-orange-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{member.streak} day streak</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Discussions */}
      <div className="glass-card">
        <h4 className="text-lg font-headline font-bold text-foreground mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-accent-red" />
          <span>Trending Discussions</span>
        </h4>
        
        <div className="space-y-3">
          {recentDiscussions.map((discussion) => (
            <div key={discussion.id} className="p-4 glass rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-foreground hover:text-neon-blue transition-colors">
                      {discussion.title}
                    </h5>
                    {discussion.isHot && (
                      <div className="flex items-center space-x-1 text-accent-red">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">HOT</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">by {discussion.author} • {discussion.timeAgo}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{discussion.replies}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{discussion.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPortal;
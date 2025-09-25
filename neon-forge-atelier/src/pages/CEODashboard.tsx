import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Crown, BarChart3, Users, Shield, Zap, 
  Settings, TrendingUp, Globe, DollarSign,
  UserCheck, AlertTriangle, Activity, Target,
  Award, Briefcase, Eye, ToggleLeft, ToggleRight
} from "lucide-react";
import PortalSidebar from "@/components/PortalSidebar";
import StatsCard from "@/components/StatsCard";
import ActivityTimeline from "@/components/ActivityTimeline";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "active" | "away" | "offline";
  permissions: string[];
  joinDate: string;
}

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: "production" | "staging" | "development";
  impactLevel: "low" | "medium" | "high";
}

const CEODashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Alex Johnson",
      role: "Senior Operations Manager",
      department: "Operations",
      status: "active",
      permissions: ["user_management", "content_approval", "analytics"],
      joinDate: "2023-06-15"
    },
    {
      id: "2",
      name: "Jamie Wilson", 
      role: "Customer Success Lead",
      department: "Support",
      status: "active",
      permissions: ["ticket_management", "user_support"],
      joinDate: "2023-08-20"
    },
    {
      id: "3",
      name: "Morgan Davis",
      role: "Analytics Specialist",
      department: "Analytics",
      status: "away",
      permissions: ["analytics_full", "reporting"],
      joinDate: "2023-09-10"
    }
  ]);

  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: "1",
      name: "Advanced Analytics Dashboard",
      description: "Enhanced analytics with predictive insights",
      enabled: true,
      environment: "production",
      impactLevel: "high"
    },
    {
      id: "2",
      name: "AI-Powered Concierge",
      description: "Intelligent recommendations and automation",
      enabled: false,
      environment: "staging", 
      impactLevel: "medium"
    },
    {
      id: "3",
      name: "Community Marketplace",
      description: "Template sharing and monetization platform",
      enabled: false,
      environment: "development",
      impactLevel: "high"
    }
  ]);

  const sidebarItems = [
    { id: "overview", label: "Executive Overview", icon: Crown },
    { id: "staff", label: "Staff Oversight", icon: Users, badge: staffMembers.length },
    { id: "analytics", label: "Strategic Analytics", icon: BarChart3 },
    { id: "community", label: "Community Health", icon: Globe },
    { id: "features", label: "Feature Flags", icon: Zap, badge: featureFlags.filter(f => !f.enabled).length },
    { id: "system", label: "System Settings", icon: Settings },
    { id: "security", label: "Security Center", icon: Shield },
    { id: "profile", label: "Executive Profile", icon: Briefcase },
  ];

  const executiveActivity = [
    {
      id: "1",
      type: "highlight" as const,
      title: "Revenue milestone achieved",
      description: "Monthly recurring revenue exceeded $50K target",
      timestamp: "1 hour ago"
    },
    {
      id: "2",
      type: "success" as const,
      title: "New enterprise client onboarded",
      description: "Fortune 500 company signed annual contract",
      timestamp: "4 hours ago",
      user: "Sales Team"
    },
    {
      id: "3",
      type: "info" as const,
      title: "Staff performance review completed",
      description: "Q4 performance evaluations finalized",
      timestamp: "6 hours ago",
      user: "HR Department"
    },
    {
      id: "4",
      type: "warning" as const,
      title: "Security alert resolved",
      description: "Unusual login pattern investigated and cleared",
      timestamp: "8 hours ago",
      user: "Security Team"
    }
  ];

  const toggleFeatureFlag = (id: string) => {
    setFeatureFlags(prev => prev.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    ));
  };

  return (
    <div className="min-h-screen flex bg-canvas-dark">
      {/* Sidebar */}
      <PortalSidebar
        title="NEON TECH"
        subtitle="Executive Command Center"
        items={sidebarItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        variant="ceo"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Executive Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/5 via-transparent to-luxury-lavender/5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-lavender/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 h-full overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold text-luxury mb-2">
              Executive Command Center
            </h1>
            <p className="text-muted-foreground">
              Strategic oversight and governance of Neon Tech Enterprises
            </p>
          </div>

          {/* Executive Overview */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Executive KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Monthly Revenue"
                  value="$52.4K"
                  change="+18%"
                  changeType="positive"
                  icon={DollarSign}
                  variant="executive"
                />
                <StatsCard
                  title="Active Enterprise Clients"
                  value="12"
                  change="+3"
                  changeType="positive"
                  icon={Award}
                  variant="executive"
                />
                <StatsCard
                  title="Platform Growth"
                  value="2,847"
                  change="+24%"
                  changeType="positive"
                  icon={TrendingUp}
                  variant="executive"
                  description="Total registered users"
                />
                <StatsCard
                  title="Team Performance"
                  value="97%"
                  change="+2%"
                  changeType="positive"
                  icon={Target}
                  variant="executive"
                  description="Overall satisfaction score"
                />
              </div>

              {/* Strategic Insights */}
              <div className="glass-card bg-gradient-to-br from-luxury-purple/10 to-luxury-lavender/10 border-luxury-lavender/20">
                <h2 className="text-2xl font-headline font-bold text-luxury mb-6">
                  Strategic Insights
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Revenue Projection */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-luxury-purple/20 rounded-lg">
                        <DollarSign className="w-5 h-5 text-luxury-lavender" />
                      </div>
                      <h3 className="font-semibold text-foreground">Q1 Projection</h3>
                    </div>
                    <p className="text-2xl font-bold text-luxury-lavender mb-2">$180K</p>
                    <p className="text-sm text-muted-foreground">Projected quarterly revenue</p>
                    <div className="mt-4 h-2 bg-canvas-elevated rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-luxury-purple to-luxury-lavender rounded-full"></div>
                    </div>
                  </div>

                  {/* Market Position */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-luxury-purple/20 rounded-lg">
                        <Globe className="w-5 h-5 text-luxury-lavender" />
                      </div>
                      <h3 className="font-semibold text-foreground">Market Position</h3>
                    </div>
                    <p className="text-2xl font-bold text-luxury-lavender mb-2">#3</p>
                    <p className="text-sm text-muted-foreground">In luxury web platforms</p>
                    <div className="mt-4 flex space-x-2">
                      <div className="w-8 h-8 bg-luxury-lavender/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-luxury-lavender" />
                      </div>
                      <span className="text-sm text-green-400">+2 positions</span>
                    </div>
                  </div>

                  {/* Team Efficiency */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-luxury-purple/20 rounded-lg">
                        <Activity className="w-5 h-5 text-luxury-lavender" />
                      </div>
                      <h3 className="font-semibold text-foreground">Team Efficiency</h3>
                    </div>
                    <p className="text-2xl font-bold text-luxury-lavender mb-2">94%</p>
                    <p className="text-sm text-muted-foreground">Operational efficiency</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-8 bg-green-400/20 rounded flex items-center justify-center">
                        <span className="text-xs text-green-400 font-medium">OPS</span>
                      </div>
                      <div className="h-8 bg-blue-400/20 rounded flex items-center justify-center">
                        <span className="text-xs text-blue-400 font-medium">SUP</span>
                      </div>
                      <div className="h-8 bg-purple-400/20 rounded flex items-center justify-center">
                        <span className="text-xs text-purple-400 font-medium">DEV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Activity Timeline */}
              <ActivityTimeline events={executiveActivity} variant="ceo" />
            </div>
          )}

          {/* Staff Oversight Section */}
          {activeSection === "staff" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-headline font-bold text-luxury">Staff Oversight</h2>
                <button className="btn-neon text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Roles
                </button>
              </div>

              {/* Staff Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Total Staff"
                  value={staffMembers.length}
                  icon={Users}
                  variant="executive"
                />
                <StatsCard
                  title="Active Now"
                  value={staffMembers.filter(s => s.status === "active").length}
                  icon={UserCheck}
                  variant="executive"
                />
                <StatsCard
                  title="Departments"
                  value="3"
                  icon={Briefcase}
                  variant="executive"
                />
              </div>

              {/* Staff Members */}
              <div className="glass-card bg-gradient-to-br from-luxury-purple/5 to-luxury-lavender/5 border-luxury-lavender/20">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">Team Overview</h3>
                <div className="space-y-4">
                  {staffMembers.map((member) => (
                    <div key={member.id} className="glass p-6 rounded-xl hover:bg-luxury-purple/5 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <span className={`w-3 h-3 rounded-full ${
                              member.status === "active" 
                                ? "bg-green-400" 
                                : member.status === "away"
                                  ? "bg-yellow-400"
                                  : "bg-gray-400"
                            }`}></span>
                          </div>
                          <p className="text-luxury-lavender font-medium mb-1">{member.role}</p>
                          <p className="text-sm text-muted-foreground mb-3">{member.department}</p>
                          <div className="flex flex-wrap gap-2">
                            {member.permissions.map((permission) => (
                              <span key={permission} className="px-2 py-1 bg-luxury-purple/20 text-luxury-lavender text-xs rounded-full">
                                {permission.replace("_", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 hover:bg-luxury-purple/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-luxury-lavender" />
                          </button>
                          <button className="p-2 hover:bg-luxury-purple/20 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-luxury-lavender" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feature Flags Section */}
          {activeSection === "features" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-luxury">Feature Flags</h2>
              
              <div className="glass-card bg-gradient-to-br from-luxury-purple/5 to-luxury-lavender/5 border-luxury-lavender/20">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">Platform Features</h3>
                <div className="space-y-4">
                  {featureFlags.map((flag) => (
                    <div key={flag.id} className="glass p-6 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-foreground">{flag.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              flag.environment === "production"
                                ? "bg-green-400/20 text-green-400"
                                : flag.environment === "staging"
                                  ? "bg-yellow-400/20 text-yellow-400"
                                  : "bg-blue-400/20 text-blue-400"
                            }`}>
                              {flag.environment}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              flag.impactLevel === "high"
                                ? "bg-red-400/20 text-red-400"
                                : flag.impactLevel === "medium"
                                  ? "bg-yellow-400/20 text-yellow-400"
                                  : "bg-green-400/20 text-green-400"
                            }`}>
                              {flag.impactLevel} impact
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{flag.description}</p>
                        </div>
                        <button
                          onClick={() => toggleFeatureFlag(flag.id)}
                          className="ml-4 p-2 hover:bg-luxury-purple/20 rounded-lg transition-colors"
                        >
                          {flag.enabled ? (
                            <ToggleRight className="w-8 h-8 text-green-400" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other sections placeholder */}
          {![ "overview", "staff", "features"].includes(activeSection) && (
            <div className="glass-card text-center bg-gradient-to-br from-luxury-purple/10 to-luxury-lavender/10 border-luxury-lavender/20">
              <Crown className="w-16 h-16 text-luxury-lavender mx-auto mb-4 animate-glow" />
              <h2 className="text-3xl font-headline font-bold text-luxury mb-4">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-muted-foreground">
                Executive-level features are being refined. Premium capabilities arriving soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, Fingerprint, Layout, BarChart3, Zap, 
  Headphones, Users, Settings, Plus, Eye, EyeOff, 
  Edit, Trash2, Calendar, Target, Globe
} from "lucide-react";
import EngagementStreaks from "@/components/EngagementStreaks";
import TemplatesGallery from "@/components/TemplatesGallery";
import CommunityPortal from "@/components/CommunityPortal";
import ActivityTimeline from "@/components/ActivityTimeline";
import DigitalFingerprintCard from "@/components/DigitalFingerprintCard";
import SiteEditor from "@/components/SiteEditor";
import { toast } from "sonner";
import { getUserSiteLimit } from "@/data/templates";

interface Fingerprint {
  id: string;
  name: string;
  status: "active" | "draft";
  visits: number;
  lastModified: string;
  template: string;
  slug: string;
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [userName] = useState("Alex Chen"); // Mock user name
  const [currentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [currentCity] = useState("New York"); // Mock location
  const [userPlan] = useState("Free"); // Mock user plan
  const [sitesCreatedThisMonth] = useState(3); // Mock usage
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [showCreateSiteModal, setShowCreateSiteModal] = useState(false);
  const [newSiteName, setNewSiteName] = useState("");
  
  const [fingerprints, setFingerprints] = useState<Fingerprint[]>([
    {
      id: "1",
      name: "Portfolio Showcase",
      status: "active",
      visits: 1247,
      lastModified: "2 hours ago",
      template: "luxury-portfolio",
      slug: "portfolio-showcase"
    },
    {
      id: "2", 
      name: "Client Gallery",
      status: "draft",
      visits: 0,
      lastModified: "1 day ago",
      template: "minimal-showcase",
      slug: "client-gallery"
    },
    {
      id: "3", 
      name: "Business Site",
      status: "active",
      visits: 524,
      lastModified: "3 days ago",
      template: "corporate-executive",
      slug: "business-site"
    },
  ]);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "fingerprints", label: "Fingerprints", icon: Fingerprint },
    { id: "templates", label: "Templates Gallery", icon: Layout },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "streaks", label: "Engagement Streaks", icon: Target },
    { id: "timeline", label: "Activity Timeline", icon: Calendar },
    { id: "impact", label: "Moments of Impact", icon: Zap },
    { id: "concierge", label: "Concierge", icon: Headphones },
    { id: "community", label: "Community Portal", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const toggleFingerprintStatus = (id: string) => {
    setFingerprints(prev => prev.map(fp => 
      fp.id === id 
        ? { ...fp, status: fp.status === "active" ? "draft" : "active" }
        : fp
    ));
  };

  const deleteFingerprintMock = (id: string) => {
    setFingerprints(prev => prev.filter(fp => fp.id !== id));
    toast("Site deleted successfully");
  };

  const handleSelectTemplate = (templateId: string) => {
    const siteLimit = getUserSiteLimit(userPlan);
    if (siteLimit !== -1 && sitesCreatedThisMonth >= siteLimit) {
      toast("You've reached your monthly site limit. Upgrade to create more sites!");
      return;
    }
    setEditingTemplateId(templateId);
    setShowCreateSiteModal(true);
  };

  const handleCreateSite = () => {
    if (!newSiteName.trim()) {
      toast("Please enter a site name");
      return;
    }

    const newSite: Fingerprint = {
      id: Date.now().toString(),
      name: newSiteName,
      status: "draft",
      visits: 0,
      lastModified: "now",
      template: editingTemplateId || "luxury-portfolio",
      slug: newSiteName.toLowerCase().replace(/\s+/g, '-')
    };

    setFingerprints(prev => [...prev, newSite]);
    setEditingSiteId(newSite.id);
    setShowCreateSiteModal(false);
    setNewSiteName("");
    toast("New site created! Opening editor...");
  };

  const handleEditSite = (siteId: string) => {
    const site = fingerprints.find(fp => fp.id === siteId);
    if (site) {
      setEditingTemplateId(site.template);
      setEditingSiteId(siteId);
    }
  };

  const handleSaveSite = (siteData: any) => {
    setFingerprints(prev => prev.map(fp => 
      fp.id === editingSiteId 
        ? { ...fp, ...siteData, lastModified: "now" }
        : fp
    ));
    setEditingTemplateId(null);
    setEditingSiteId(null);
  };

  // Mock user fingerprint data
  const userFingerprintData = {
    userName: userName,
    fingerprintNumber: "NTC-2025-8849-VX",
    planLevel: userPlan as "Free" | "Pro" | "Enterprise",
    dateCreated: "Jan 2025",
    badges: ["First Site", "Active Creator", "Community Member"],
    verificationCode: "NTC-8849-VX"
  };

  // Mock user milestones and activities
  const userActivity = [
    {
      id: "1",
      type: "success" as const,
      title: "Fingerprint published",
      description: "Portfolio Showcase went live and gained 50 visitors",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      type: "highlight" as const,
      title: "Engagement milestone",
      description: "Reached 1K total visitors across all fingerprints",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      type: "info" as const,
      title: "Template updated",
      description: "Applied new luxury theme to Client Gallery",
      timestamp: "2 days ago"
    },
    {
      id: "4",
      type: "success" as const,
      title: "Client inquiry",
      description: "New business inquiry received via contact form",
      timestamp: "3 days ago"
    }
  ];

  // If editing a site, show the site editor
  if (editingTemplateId && editingSiteId) {
    const site = fingerprints.find(fp => fp.id === editingSiteId);
    if (site) {
      return (
        <SiteEditor
          templateId={editingTemplateId}
          siteId={editingSiteId}
          siteName={site.name}
          onBack={() => {
            setEditingTemplateId(null);
            setEditingSiteId(null);
          }}
          onSave={handleSaveSite}
        />
      );
    }
  }

  return (
    <div className="min-h-screen flex bg-canvas-dark">
      {/* Glass Sidebar */}
      <div className="w-64 glass-strong border-r border-primary/10">
        <div className="p-6">
          <Link to="/" className="text-2xl font-headline font-bold text-neon block mb-8">
            NEON TECH
          </Link>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/5 via-transparent to-neon-blue/5 pointer-events-none"></div>
        
        <div className="relative z-10 h-full overflow-y-auto p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold text-luxury mb-2">
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {userName}
            </h1>
            <p className="text-muted-foreground">
              It's {currentTime} in {currentCity}. Welcome to your Atelier.
            </p>
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Digital Fingerprint Card */}
              <div className="mb-8">
                <h2 className="text-2xl font-headline font-bold text-neon mb-6">
                  Your Digital Identity
                </h2>
                <DigitalFingerprintCard {...userFingerprintData} />
              </div>
              
              {/* Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card text-center">
                  <div className="text-3xl font-bold text-neon-blue mb-2">{sitesCreatedThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Sites this month</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {getUserSiteLimit(userPlan) === -1 ? "Unlimited" : `${sitesCreatedThisMonth}/${getUserSiteLimit(userPlan)} used`}
                  </div>
                </div>
                <div className="glass-card text-center">
                  <div className="text-3xl font-bold text-luxury-periwinkle mb-2">
                    {fingerprints.filter(fp => fp.status === "active").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Live sites</div>
                </div>
                <div className="glass-card text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">
                    {fingerprints.reduce((total, fp) => total + fp.visits, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total visits</div>
                </div>
              </div>

              {/* Digital Concierge */}
              <div className="glass-card">
                <h2 className="text-2xl font-headline font-bold text-neon mb-4">
                  The Digital Concierge
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your daily briefing and intelligent suggestions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="glass p-4 rounded-lg hover:bg-white/10 transition-colors text-left">
                    <h3 className="font-semibold text-foreground mb-2">Daily Brief</h3>
                    <p className="text-sm text-muted-foreground">Review today's metrics</p>
                  </button>
                  <button className="glass p-4 rounded-lg hover:bg-white/10 transition-colors text-left">
                    <h3 className="font-semibold text-foreground mb-2">Optimize</h3>
                    <p className="text-sm text-muted-foreground">AI-powered suggestions</p>
                  </button>
                  <button className="glass p-4 rounded-lg hover:bg-white/10 transition-colors text-left">
                    <h3 className="font-semibold text-foreground mb-2">Insights</h3>
                    <p className="text-sm text-muted-foreground">Visitor behavior analysis</p>
                  </button>
                </div>
              </div>

              {/* Fingerprints Grid */}
              <div className="glass-card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-headline font-bold text-neon">
                    Your Fingerprints
                  </h2>
                  <button 
                    onClick={() => setActiveSection("templates")}
                    className="btn-neon text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fingerprints.map((fp) => (
                    <div key={fp.id} className="glass p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-foreground">{fp.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleFingerprintStatus(fp.id)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            {fp.status === "active" ? (
                              <Eye className="w-4 h-4 text-neon-blue" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <button 
                            onClick={() => handleEditSite(fp.id)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button 
                            onClick={() => deleteFingerprintMock(fp.id)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-accent-red" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${
                              fp.status === "active" ? "text-neon-blue" : "text-muted-foreground"
                            }`}>
                              {fp.status === "active" ? "Live" : "Draft"}
                            </span>
                            {fp.status === "active" && (
                              <button
                                onClick={() => window.open(`/s/${fp.slug}`, '_blank')}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <Globe className="w-3 h-3 text-neon-blue" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Visits</span>
                          <span className="text-sm font-medium text-foreground">{fp.visits.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Template</span>
                          <span className="text-sm font-medium text-foreground capitalize">
                            {fp.template.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Modified</span>
                          <span className="text-sm font-medium text-foreground">{fp.lastModified}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card">
                  <h2 className="text-2xl font-headline font-bold text-neon mb-6">
                    Atelier Analytics
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neon-blue mb-1">2.4K</div>
                      <div className="text-sm text-muted-foreground">Total Visits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-luxury-periwinkle mb-1">67%</div>
                      <div className="text-sm text-muted-foreground">Engagement Rate</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-32 bg-gradient-to-r from-neon-blue/20 to-luxury-purple/20 rounded-lg mb-4 flex items-end justify-center">
                    <div className="text-muted-foreground text-sm">Performance Chart</div>
                  </div>

                  {/* Attention Map */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-foreground mb-3">Attention Map</h3>
                    <div className="h-24 bg-canvas-elevated rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Heatmap Visualization</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Moment of Impact Crate */}
                  <div className="glass-card">
                    <h2 className="text-2xl font-headline font-bold text-neon mb-4">
                      Moment of Impact
                    </h2>
                    <div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-purple to-luxury-lavender mx-auto mb-4 animate-glow cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => alert("Impact moment revealed: 'Your portfolio attracted a Fortune 500 client inquiry today!'")}
                    >
                      <div className="w-full h-full rounded-full border-2 border-luxury-lavender/30 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-center text-muted-foreground text-sm">
                      Click to reveal today's highlight
                    </p>
                  </div>

                  {/* Journey Timeline */}
                  <div className="glass-card">
                    <h2 className="text-2xl font-headline font-bold text-neon mb-6">
                      Your Journey
                    </h2>
                    <div className="space-y-4">
                      {[
                        "Account created",
                        "First fingerprint launched", 
                        "1K visitors milestone",
                        "Client inquiry received"
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-neon-blue rounded-full flex-shrink-0"></div>
                          <span className="text-foreground">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Templates Gallery Section */}
          {activeSection === "templates" && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-headline font-bold text-neon mb-2">
                  Templates Gallery
                </h2>
                <p className="text-muted-foreground">
                  Choose from our curated collection of 7 premium templates
                </p>
              </div>
              <TemplatesGallery onSelectTemplate={handleSelectTemplate} />
            </div>
          )}

          {/* Engagement Streaks Section */}
          {activeSection === "streaks" && <EngagementStreaks />}

          {/* Activity Timeline Section */}
          {activeSection === "timeline" && (
            <ActivityTimeline events={userActivity} variant="user" />
          )}

          {/* Community Portal Section */}
          {activeSection === "community" && <CommunityPortal />}

          {/* Enhanced Concierge Section */}
          {activeSection === "concierge" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-neon">Digital Concierge</h2>
              
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-4">
                  Personalized Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">SEO Optimization</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your Portfolio Showcase could benefit from meta description updates
                    </p>
                    <button className="text-sm text-neon-blue hover:underline">Fix now →</button>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Performance Boost</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Compress images to improve loading speed by 23%
                    </p>
                    <button className="text-sm text-neon-blue hover:underline">Optimize →</button>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Engagement Enhancement</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add social proof elements to increase visitor trust
                    </p>
                    <button className="text-sm text-neon-blue hover:underline">Add elements →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be implemented similarly */}
          {!["overview", "templates", "streaks", "timeline", "community", "concierge"].includes(activeSection) && (
            <div className="glass-card text-center">
              <h2 className="text-3xl font-headline font-bold text-luxury mb-4">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-muted-foreground">
                This section is under development. Enhanced features coming soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Site Modal */}
      {showCreateSiteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full">
            <h3 className="text-xl font-headline font-bold text-neon mb-4">
              Create New Site
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Give your new site a name to get started
            </p>
            
            <input
              type="text"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              placeholder="My Awesome Site"
              className="w-full p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground mb-6"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateSite()}
              autoFocus
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCreateSiteModal(false);
                  setNewSiteName("");
                  setEditingTemplateId(null);
                }}
                className="flex-1 btn-glass"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSite}
                className="flex-1 btn-neon"
              >
                Create Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

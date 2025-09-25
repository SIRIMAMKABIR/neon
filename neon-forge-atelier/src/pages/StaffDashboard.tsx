import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Layout, BarChart3, Headphones, 
  MessageCircle, Settings, Shield, Search,
  Plus, Edit, Trash2, MoreHorizontal, Eye,
  UserCheck, UserX, RefreshCw, AlertTriangle
} from "lucide-react";
import PortalSidebar from "@/components/PortalSidebar";
import StatsCard from "@/components/StatsCard";
import ActivityTimeline from "@/components/ActivityTimeline";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  fingerprints: number;
  joinDate: string;
  lastLogin: string;
}

interface Ticket {
  id: string;
  user: string;
  subject: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "closed";
  created: string;
}

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      status: "active",
      fingerprints: 3,
      joinDate: "2024-01-15",
      lastLogin: "2 hours ago"
    },
    {
      id: "2", 
      name: "Michael Rodriguez",
      email: "michael@example.com",
      status: "active",
      fingerprints: 1,
      joinDate: "2024-02-20",
      lastLogin: "1 day ago"
    },
    {
      id: "3",
      name: "Emma Thompson",
      email: "emma@example.com",
      status: "inactive",
      fingerprints: 0,
      joinDate: "2024-03-05",
      lastLogin: "2 weeks ago"
    }
  ]);

  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      user: "Sarah Chen",
      subject: "Cannot publish fingerprint",
      priority: "high",
      status: "open",
      created: "2 hours ago"
    },
    {
      id: "2",
      user: "Michael Rodriguez", 
      subject: "Template customization help",
      priority: "medium",
      status: "in-progress",
      created: "1 day ago"
    }
  ]);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users, badge: users.length },
    { id: "fingerprints", label: "Fingerprint Oversight", icon: Layout },
    { id: "analytics", label: "Analytics Hub", icon: BarChart3 },
    { id: "support", label: "Support & Tickets", icon: Headphones, badge: tickets.filter(t => t.status === "open").length },
    { id: "notes", label: "Internal Notes", icon: MessageCircle },
    { id: "profile", label: "Staff Profile", icon: Settings },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "success" as const,
      title: "User account activated",
      description: "Sarah Chen's account was successfully activated",
      timestamp: "2 hours ago",
      user: "Staff: Alex Johnson"
    },
    {
      id: "2", 
      type: "warning" as const,
      title: "High priority ticket received",
      description: "Publication issue reported by user",
      timestamp: "3 hours ago"
    },
    {
      id: "3",
      type: "info" as const,
      title: "Fingerprint approved",
      description: "Portfolio showcase fingerprint approved for Michael Rodriguez",
      timestamp: "5 hours ago",
      user: "Staff: Jamie Wilson"
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-canvas-dark">
      {/* Sidebar */}
      <PortalSidebar
        title="NEON TECH"
        subtitle="Staff Operations Portal"
        items={sidebarItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        variant="staff"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-luxury-periwinkle/5 pointer-events-none"></div>
        
        <div className="relative z-10 h-full overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold text-neon mb-2">
              Staff Operations Center
            </h1>
            <p className="text-muted-foreground">
              Manage users, oversee fingerprints, and support the Neon Tech community
            </p>
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Users"
                  value={users.length}
                  change="+12%"
                  changeType="positive"
                  icon={Users}
                  variant="premium"
                />
                <StatsCard
                  title="Active Fingerprints"
                  value="127"
                  change="+8%"
                  changeType="positive"
                  icon={Layout}
                  variant="premium"
                />
                <StatsCard
                  title="Open Tickets"
                  value={tickets.filter(t => t.status === "open").length}
                  change="-5%"
                  changeType="positive"
                  icon={Headphones}
                  variant="premium"
                />
                <StatsCard
                  title="Resolution Rate"
                  value="94%"
                  change="+2%"
                  changeType="positive"                                    
                  icon={Shield}
                  variant="premium"
                />
              </div>

              {/* Quick Actions */}
              <div className="glass-card">
                <h2 className="text-2xl font-headline font-bold text-neon mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="glass p-6 rounded-lg hover:bg-white/10 transition-colors text-left group">
                    <Users className="w-8 h-8 text-neon-blue mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground mb-2">User Lookup</h3>
                    <p className="text-sm text-muted-foreground">Search and manage user accounts</p>
                  </button>
                  <button className="glass p-6 rounded-lg hover:bg-white/10 transition-colors text-left group">
                    <Layout className="w-8 h-8 text-neon-blue mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground mb-2">Approve Fingerprints</h3>
                    <p className="text-sm text-muted-foreground">Review pending publications</p>
                  </button>
                  <button className="glass p-6 rounded-lg hover:bg-white/10 transition-colors text-left group">
                    <Headphones className="w-8 h-8 text-neon-blue mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground mb-2">Support Tickets</h3>
                    <p className="text-sm text-muted-foreground">Handle user inquiries</p>
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <ActivityTimeline events={recentActivity} variant="staff" />
            </div>
          )}

          {/* User Management Section */}
          {activeSection === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-headline font-bold text-neon">User Management</h2>
                <button className="btn-neon text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>

              {/* Search Bar */}
              <div className="glass-card">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-canvas-elevated text-foreground rounded-xl border border-primary/20 focus:border-primary/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fingerprints</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Login</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-primary/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active" 
                                ? "bg-green-400/20 text-green-400" 
                                : user.status === "inactive"
                                  ? "bg-yellow-400/20 text-yellow-400"
                                  : "bg-red-400/20 text-red-400"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-foreground">{user.fingerprints}</td>
                          <td className="p-4 text-muted-foreground">{user.lastLogin}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <Eye className="w-4 h-4 text-neon-blue" />
                              </button>
                              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <Edit className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                {user.status === "active" ? (
                                  <UserX className="w-4 h-4 text-yellow-400" />
                                ) : (
                                  <UserCheck className="w-4 h-4 text-green-400" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          {activeSection === "support" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-neon">Support & Tickets</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Open Tickets"
                  value={tickets.filter(t => t.status === "open").length}
                  icon={AlertTriangle}
                  variant="premium"
                />
                <StatsCard
                  title="In Progress"
                  value={tickets.filter(t => t.status === "in-progress").length}
                  icon={RefreshCw}
                  variant="premium"
                />
                <StatsCard
                  title="Closed Today"
                  value="12"
                  icon={Shield}
                  variant="premium"
                />
                <StatsCard
                  title="Avg Response"
                  value="2.4h"
                  icon={Headphones}
                  variant="premium"
                />
              </div>

              {/* Tickets List */}
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-4">Recent Tickets</h3>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="glass p-4 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{ticket.subject}</h4>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            ticket.priority === "high" 
                              ? "bg-red-400/20 text-red-400"
                              : ticket.priority === "medium"
                                ? "bg-yellow-400/20 text-yellow-400"
                                : "bg-green-400/20 text-green-400"
                          }`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            ticket.status === "open"
                              ? "bg-blue-400/20 text-blue-400"
                              : ticket.status === "in-progress"
                                ? "bg-yellow-400/20 text-yellow-400"
                                : "bg-green-400/20 text-green-400"
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">From: {ticket.user}</p>
                      <p className="text-xs text-muted-foreground">{ticket.created}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other sections placeholder */}
          {!["overview", "users", "support"].includes(activeSection) && (
            <div className="glass-card text-center">
              <h2 className="text-3xl font-headline font-bold text-neon mb-4">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-muted-foreground">
                This section is under development. Advanced features coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

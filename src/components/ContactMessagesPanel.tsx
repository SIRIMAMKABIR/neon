import { useState } from "react";
import { MessageCircle, User, Calendar, Mail, Phone, MapPin, Star, Archive, Trash2, Reply, Forward, MoveHorizontal as MoreHorizontal, Search, ListFilter as Filter, Eye, EyeOff } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "new" | "read" | "replied" | "archived";
  priority: "low" | "medium" | "high";
  source: "contact-form" | "email" | "phone";
  tags: string[];
}

interface ContactMessagesPanelProps {
  variant?: "staff" | "ceo";
}

const ContactMessagesPanel = ({ variant = "staff" }: ContactMessagesPanelProps) => {
  const [messages] = useState<ContactMessage[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@techstartup.com",
      phone: "+1 (555) 123-4567",
      subject: "Enterprise Partnership Inquiry",
      message: "We're interested in discussing a potential partnership for our upcoming product launch. Our team has been impressed with your portfolio and would like to explore how Neon Tech could help us create a premium digital experience.",
      timestamp: "2 hours ago",
      status: "new",
      priority: "high",
      source: "contact-form",
      tags: ["enterprise", "partnership", "high-value"]
    },
    {
      id: "2", 
      name: "Michael Rodriguez",
      email: "m.rodriguez@luxurybrands.com",
      subject: "Brand Identity Project",
      message: "Hello, I represent a luxury fashion brand looking to completely reimagine our digital presence. We've seen your work and believe Neon Tech would be the perfect partner for this transformation.",
      timestamp: "5 hours ago",
      status: "read",
      priority: "high",
      source: "contact-form",
      tags: ["luxury", "brand-identity", "fashion"]
    },
    {
      id: "3",
      name: "Emma Thompson",
      email: "emma.t@creativestudio.co",
      subject: "Template Customization",
      message: "Hi there! I'm working on a project and love the Luxury Portfolio template. Would it be possible to get some custom modifications done? Happy to discuss budget and timeline.",
      timestamp: "1 day ago",
      status: "replied",
      priority: "medium",
      source: "contact-form",
      tags: ["template", "customization"]
    },
    {
      id: "4",
      name: "David Park",
      email: "david@realestate-elite.com",
      phone: "+1 (555) 987-6543",
      subject: "Real Estate Platform Development",
      message: "We need a sophisticated platform for luxury real estate listings. Your work on digital flagships caught our attention. Can we schedule a consultation?",
      timestamp: "2 days ago",
      status: "new",
      priority: "high",
      source: "email",
      tags: ["real-estate", "platform", "consultation"]
    },
    {
      id: "5",
      name: "Lisa Wang",
      email: "lisa@artgallery.com",
      subject: "Gallery Website Redesign",
      message: "Our art gallery needs a complete digital transformation. We want something that matches the sophistication of our physical space. Your aesthetic aligns perfectly with our vision.",
      timestamp: "3 days ago",
      status: "read",
      priority: "medium",
      source: "contact-form",
      tags: ["art", "gallery", "redesign"]
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    const matchesPriority = filterPriority === "all" || message.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-400/20 text-blue-400";
      case "read": return "bg-yellow-400/20 text-yellow-400";
      case "replied": return "bg-green-400/20 text-green-400";
      case "archived": return "bg-gray-400/20 text-gray-400";
      default: return "bg-gray-400/20 text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "contact-form": return MessageCircle;
      case "email": return Mail;
      case "phone": return Phone;
      default: return MessageCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-3xl font-headline font-bold ${variant === "ceo" ? "text-luxury" : "text-neon"}`}>
          Contact Messages
        </h2>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            variant === "ceo" 
              ? "bg-luxury-purple/20 text-luxury-lavender" 
              : "bg-neon-blue/20 text-neon-blue"
          }`}>
            {messages.filter(m => m.status === "new").length} New
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="flex space-x-2">
            <button className="btn-glass text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="glass-card">
          <h3 className="text-xl font-headline font-bold text-foreground mb-4">
            Messages ({filteredMessages.length})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => {
              const SourceIcon = getSourceIcon(message.source);
              
              return (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 glass rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                    selectedMessage?.id === message.id ? "ring-2 ring-neon-blue" : ""
                  } ${message.status === "new" ? "border-l-4 border-blue-400" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <SourceIcon className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-semibold text-foreground">{message.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                  <p className="font-medium text-foreground mb-2">{message.subject}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                  
                  {message.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Detail */}
        <div className="glass-card">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-headline font-bold text-foreground">Message Details</h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Reply className="w-4 h-4 text-neon-blue" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Forward className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Archive className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center text-white font-medium">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedMessage.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                    {selectedMessage.phone && (
                      <p className="text-sm text-muted-foreground">{selectedMessage.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedMessage.priority === "high" 
                      ? "bg-red-400/20 text-red-400"
                      : selectedMessage.priority === "medium"
                        ? "bg-yellow-400/20 text-yellow-400"
                        : "bg-green-400/20 text-green-400"
                  }`}>
                    {selectedMessage.priority} priority
                  </span>
                  <span className="text-sm text-muted-foreground">{selectedMessage.timestamp}</span>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">Subject</h5>
                  <p className="text-foreground">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">Message</h5>
                  <div className="bg-canvas-elevated p-4 rounded-lg">
                    <p className="text-foreground leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </div>

                {selectedMessage.tags.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="btn-neon text-sm">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </button>
                    <button className="btn-glass text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesPanel;
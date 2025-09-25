import { useState, useRef, useEffect } from "react";
import { 
  Send, Paperclip, Smile, Phone, Video, 
  MoreHorizontal, Search, Users, Settings,
  Crown, Shield, User, Circle, Image,
  File, Mic, MicOff
} from "lucide-react";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "ceo" | "staff" | "admin";
  content: string;
  timestamp: string;
  type: "text" | "image" | "file" | "system";
  reactions?: { emoji: string; users: string[] }[];
  replyTo?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: "ceo" | "staff" | "admin";
  status: "online" | "away" | "offline";
  avatar: string;
  lastSeen?: string;
}

interface TeamChatInterfaceProps {
  currentUserId: string;
  currentUserRole: "ceo" | "staff" | "admin";
}

const TeamChatInterface = ({ currentUserId, currentUserRole }: TeamChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: "ceo-1",
      senderName: "CEO",
      senderRole: "ceo",
      content: "Team, excellent work on the latest client presentations. The luxury portfolio template is performing exceptionally well.",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: "2",
      senderId: "staff-1",
      senderName: "Alex Johnson",
      senderRole: "staff",
      content: "Thank you! The client feedback has been overwhelmingly positive. Should we consider expanding that template series?",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: "3",
      senderId: "staff-2",
      senderName: "Jamie Wilson",
      senderRole: "staff",
      content: "I've been tracking the analytics - conversion rates are up 40% with the new onboarding flow.",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: "4",
      senderId: "ceo-1",
      senderName: "CEO",
      senderRole: "ceo",
      content: "Impressive metrics. Let's schedule a strategy session to discuss scaling these improvements across all templates.",
      timestamp: "10:37 AM",
      type: "text"
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "ceo-1",
      name: "CEO",
      role: "ceo",
      status: "online",
      avatar: "👑"
    },
    {
      id: "staff-1",
      name: "Alex Johnson",
      role: "staff",
      status: "online",
      avatar: "AJ"
    },
    {
      id: "staff-2",
      name: "Jamie Wilson",
      role: "staff",
      status: "away",
      avatar: "JW"
    },
    {
      id: "staff-3",
      name: "Morgan Davis",
      role: "staff",
      status: "offline",
      avatar: "MD",
      lastSeen: "2 hours ago"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserRole === "ceo" ? "CEO" : teamMembers.find(m => m.id === currentUserId)?.name || "You",
      senderRole: currentUserRole,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ceo": return Crown;
      case "staff": return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ceo": return "text-luxury-lavender";
      case "staff": return "text-neon-blue";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-400";
      case "away": return "bg-yellow-400";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="h-full flex flex-col bg-canvas-dark">
      {/* Chat Header */}
      <div className="glass-strong border-b border-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Users className="w-8 h-8 text-neon-blue" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-canvas-dark"></div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Neon Tech Team</h3>
              <p className="text-sm text-muted-foreground">
                {teamMembers.filter(m => m.status === "online").length} online
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Team Members Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 glass border-r border-primary/10 p-4">
          <h4 className="font-semibold text-foreground mb-4">Team Members</h4>
          <div className="space-y-3">
            {teamMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              
              return (
                <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-canvas-dark`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground truncate">{member.name}</p>
                      <RoleIcon className={`w-4 h-4 ${getRoleColor(member.role)}`} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {member.status === "offline" && member.lastSeen 
                        ? `Last seen ${member.lastSeen}`
                        : member.status
                      }
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const RoleIcon = getRoleIcon(message.senderRole);
              const isOwnMessage = message.senderId === currentUserId;
              
              return (
                <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <div className={`flex space-x-3 max-w-2xl ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}>
                    {!isOwnMessage && (
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
                        {teamMembers.find(m => m.id === message.senderId)?.avatar || message.senderName.charAt(0)}
                      </div>
                    )}
                    
                    <div className={`glass p-3 rounded-lg ${
                      isOwnMessage 
                        ? "bg-neon-blue/20 border-neon-blue/30" 
                        : message.senderRole === "ceo"
                          ? "bg-luxury-purple/20 border-luxury-lavender/30"
                          : "bg-white/5"
                    }`}>
                      {!isOwnMessage && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-medium text-sm ${getRoleColor(message.senderRole)}`}>
                            {message.senderName}
                          </span>
                          <RoleIcon className={`w-3 h-3 ${getRoleColor(message.senderRole)}`} />
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                      )}
                      
                      <p className="text-foreground">{message.content}</p>
                      
                      {isOwnMessage && (
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {message.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="glass-strong border-t border-primary/10 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="glass rounded-lg border border-primary/20 focus-within:border-primary/40 transition-colors">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full p-3 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none"
                    rows={1}
                    style={{ minHeight: "44px", maxHeight: "120px" }}
                  />
                  
                  <div className="flex items-center justify-between p-2 border-t border-primary/10">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleFileUpload}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Smile className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-1 hover:bg-white/10 rounded transition-colors ${
                          isRecording ? "text-red-400" : "text-muted-foreground"
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="btn-neon text-sm px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          // Handle file upload
          console.log("Files selected:", e.target.files);
        }}
      />
    </div>
  );
};

export default TeamChatInterface;
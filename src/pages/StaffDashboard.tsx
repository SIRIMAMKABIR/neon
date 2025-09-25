@@ .. @@
 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { 
   Users, Layout, BarChart3, Headphones, 
-  MessageCircle, Settings, Shield, Search,
+  MessageCircle, Settings, Shield, Search, Phone,
   Plus, Edit, Trash2, MoreHorizontal, Eye,
   UserCheck, UserX, RefreshCw, AlertTriangle
 } from "lucide-react";
 import PortalSidebar from "@/components/PortalSidebar";
 import StatsCard from "@/components/StatsCard";
 import ActivityTimeline from "@/components/ActivityTimeline";
+import ContactMessagesPanel from "@/components/ContactMessagesPanel";
+import TeamChatInterface from "@/components/TeamChatInterface";

@@ .. @@
   const sidebarItems = [
     { id: "overview", label: "Overview", icon: BarChart3 },
+    { id: "messages", label: "Contact Messages", icon: MessageCircle, badge: 3 },
+    { id: "team-chat", label: "Team Chat", icon: Phone },
     { id: "users", label: "User Management", icon: Users, badge: users.length },
     { id: "fingerprints", label: "Fingerprint Oversight", icon: Layout },
     { id: "analytics", label: "Analytics Hub", icon: BarChart3 },
     { id: "support", label: "Support & Tickets", icon: Headphones, badge: tickets.filter(t => t.status === "open").length },
     { id: "notes", label: "Internal Notes", icon: MessageCircle },
     { id: "profile", label: "Staff Profile", icon: Settings },
   ];

@@ .. @@
             </div>
           )}

+          {/* Contact Messages Section */}
+          {activeSection === "messages" && (
+            <ContactMessagesPanel variant="staff" />
+          )}
+
+          {/* Team Chat Section */}
+          {activeSection === "team-chat" && (
+            <div className="h-full">
+              <TeamChatInterface 
+                currentUserId="staff-1" 
+                currentUserRole="staff" 
+              />
+            </div>
+          )}
+
           {/* User Management Section */}
           {activeSection === "users" && (
@@ .. @@
           {/* Other sections placeholder */}
-          {!["overview", "users", "support"].includes(activeSection) && (
+          {!["overview", "messages", "team-chat", "users", "support"].includes(activeSection) && (
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
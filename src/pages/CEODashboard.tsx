@@ .. @@
 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { 
   Crown, BarChart3, Users, Shield, Zap, 
   Settings, TrendingUp, Globe, DollarSign,
   UserCheck, AlertTriangle, Activity, Target,
-  Award, Briefcase, Eye, ToggleLeft, ToggleRight
+  Award, Briefcase, Eye, ToggleLeft, ToggleRight,
+  MessageCircle, Phone, Video, Mail
 } from "lucide-react";
 import PortalSidebar from "@/components/PortalSidebar";
 import StatsCard from "@/components/StatsCard";
 import ActivityTimeline from "@/components/ActivityTimeline";
+import ContactMessagesPanel from "@/components/ContactMessagesPanel";
+import TeamChatInterface from "@/components/TeamChatInterface";

@@ .. @@
   const sidebarItems = [
     { id: "overview", label: "Executive Overview", icon: Crown },
+    { id: "messages", label: "Contact Messages", icon: MessageCircle, badge: 5 },
+    { id: "team-chat", label: "Team Communication", icon: Phone },
     { id: "staff", label: "Staff Oversight", icon: Users, badge: staffMembers.length },
     { id: "analytics", label: "Strategic Analytics", icon: BarChart3 },
     { id: "community", label: "Community Health", icon: Globe },
     { id: "features", label: "Feature Flags", icon: Zap, badge: featureFlags.filter(f => !f.enabled).length },
     { id: "system", label: "System Settings", icon: Settings },
     { id: "security", label: "Security Center", icon: Shield },
     { id: "profile", label: "Executive Profile", icon: Briefcase },
   ];

@@ .. @@
             </div>
           )}

+          {/* Contact Messages Section */}
+          {activeSection === "messages" && (
+            <ContactMessagesPanel variant="ceo" />
+          )}
+
+          {/* Team Chat Section */}
+          {activeSection === "team-chat" && (
+            <div className="h-full">
+              <TeamChatInterface 
+                currentUserId="ceo-1" 
+                currentUserRole="ceo" 
+              />
+            </div>
+          )}
+
           {/* Staff Oversight Section */}
           {activeSection === "staff" && (
             <div className="space-y-6">
@@ .. @@
           {/* Other sections placeholder */}
-          {![ "overview", "staff", "features"].includes(activeSection) && (
+          {!["overview", "messages", "team-chat", "staff", "features"].includes(activeSection) && (
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
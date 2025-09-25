@@ .. @@
 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { 
   Home, Fingerprint, Layout, BarChart3, Zap, 
   Headphones, Users, Settings, Plus, Eye, EyeOff, 
-  Edit, Trash2, Calendar, Target, Globe
+  Edit, Trash2, Calendar, Target, Globe, Code,
+  Wand2, Share, Download, ExternalLink
 } from "lucide-react";
 import EngagementStreaks from "@/components/EngagementStreaks";
 import TemplatesGallery from "@/components/TemplatesGallery";
 import CommunityPortal from "@/components/CommunityPortal";
 import ActivityTimeline from "@/components/ActivityTimeline";
-import DigitalFingerprintCard from "@/components/DigitalFingerprintCard";
-import SiteEditor from "@/components/SiteEditor";
+import EnhancedDigitalFingerprintCard from "@/components/EnhancedDigitalFingerprintCard";
+import WebsiteBuilder from "@/components/WebsiteBuilder";
 import { toast } from "sonner";
 import { getUserSiteLimit } from "@/data/templates";

@@ .. @@
   visits: number;
   lastModified: string;
   template: string;
   slug: string;
+  published: boolean;
+  customDomain?: string;
 }

@@ .. @@
       visits: 1247,
       lastModified: "2 hours ago",
       template: "luxury-portfolio",
-      slug: "portfolio-showcase"
+      slug: "portfolio-showcase",
+      published: true,
+      customDomain: "alexchen.neontech.com"
     },
     {
       id: "2", 
       name: "Client Gallery",
       status: "draft",
       visits: 0,
       lastModified: "1 day ago",
       template: "minimal-showcase",
-      slug: "client-gallery"
+      slug: "client-gallery",
+      published: false
     },
     {
       id: "3", 
       name: "Business Site",
       status: "active",
       visits: 524,
       lastModified: "3 days ago",
       template: "corporate-executive",
-      slug: "business-site"
+      slug: "business-site",
+      published: true
     },
   ]);

@@ .. @@
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
-      slug: newSiteName.toLowerCase().replace(/\s+/g, '-')
+      slug: newSiteName.toLowerCase().replace(/\s+/g, '-'),
+      published: false
     };

     setFingerprints(prev => [...prev, newSite]);
     setEditingSiteId(newSite.id);
     setShowCreateSiteModal(false);
     setNewSiteName("");
     toast("New site created! Opening editor...");
   };

@@ .. @@
   const handleSaveSite = (siteData: any) => {
     setFingerprints(prev => prev.map(fp => 
       fp.id === editingSiteId 
         ? { ...fp, ...siteData, lastModified: "now" }
         : fp
     ));
     setEditingTemplateId(null);
     setEditingSiteId(null);
+    toast("Website saved successfully!");
+  };
+
+  const handlePublishSite = (siteData: any) => {
+    setFingerprints(prev => prev.map(fp => 
+      fp.id === editingSiteId 
+        ? { ...fp, ...siteData, published: true, status: "active", lastModified: "now" }
+        : fp
+    ));
+    setEditingTemplateId(null);
+    setEditingSiteId(null);
+    toast("🚀 Website published! Your digital fingerprint is now live!");
   };

@@ .. @@
   // Mock user fingerprint data
   const userFingerprintData = {
     userName: userName,
     fingerprintNumber: "NTC-2025-8849-VX",
     planLevel: userPlan as "Free" | "Pro" | "Enterprise",
     dateCreated: "Jan 2025",
     badges: ["First Site", "Active Creator", "Community Member"],
-    verificationCode: "NTC-8849-VX"
+    verificationCode: "NTC-8849-VX",
+    totalSites: fingerprints.length,
+    totalVisitors: fingerprints.reduce((total, fp) => total + fp.visits, 0),
+    membershipTier: "Gold" as "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond",
+    neonScore: 850,
+    isActive: true
   };

@@ .. @@
   // If editing a site, show the site editor
   if (editingTemplateId && editingSiteId) {
     const site = fingerprints.find(fp => fp.id === editingSiteId);
     if (site) {
       return (
-        <SiteEditor
+        <WebsiteBuilder
           templateId={editingTemplateId}
           siteId={editingSiteId}
           siteName={site.name}
           onBack={() => {
             setEditingTemplateId(null);
             setEditingSiteId(null);
           }}
           onSave={handleSaveSite}
+          onPublish={handlePublishSite}
         />
       );
     }
   }

@@ .. @@
               {/* Digital Fingerprint Card */}
               <div className="mb-8">
                 <h2 className="text-2xl font-headline font-bold text-neon mb-6">
                   Your Digital Identity
                 </h2>
-                <DigitalFingerprintCard {...userFingerprintData} />
+                <EnhancedDigitalFingerprintCard {...userFingerprintData} />
               </div>

@@ .. @@
                       <div className="space-y-2">
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Status</span>
                           <div className="flex items-center space-x-2">
                             <span className={`text-sm font-medium ${
                               fp.status === "active" ? "text-neon-blue" : "text-muted-foreground"
                             }`}>
                               {fp.status === "active" ? "Live" : "Draft"}
                             </span>
-                            {fp.status === "active" && (
+                            {fp.published && (
                               <button
                                 onClick={() => window.open(`/s/${fp.slug}`, '_blank')}
                                 className="p-1 hover:bg-white/10 rounded transition-colors"
                               >
-                                <Globe className="w-3 h-3 text-neon-blue" />
+                                <ExternalLink className="w-3 h-3 text-neon-blue" />
                               </button>
                             )}
                           </div>
                         </div>
+                        {fp.customDomain && (
+                          <div className="flex justify-between">
+                            <span className="text-sm text-muted-foreground">Domain</span>
+                            <span className="text-sm font-medium text-neon-blue">{fp.customDomain}</span>
+                          </div>
+                        )}
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Visits</span>
                           <span className="text-sm font-medium text-foreground">{fp.visits.toLocaleString()}</span>
                         </div>
+                        <div className="flex justify-between">
+                          <span className="text-sm text-muted-foreground">Published</span>
+                          <span className={`text-sm font-medium ${fp.published ? "text-green-400" : "text-muted-foreground"}`}>
+                            {fp.published ? "Yes" : "No"}
+                          </span>
+                        </div>
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
+                        
+                        {/* Quick Actions */}
+                        <div className="pt-2 border-t border-primary/10">
+                          <div className="flex space-x-2">
+                            <button
+                              onClick={() => handleEditSite(fp.id)}
+                              className="flex-1 btn-glass text-xs py-1"
+                            >
+                              <Code className="w-3 h-3 mr-1" />
+                              Edit
+                            </button>
+                            {fp.published && (
+                              <button
+                                onClick={() => {
+                                  navigator.clipboard.writeText(`https://neontech.com/s/${fp.slug}`);
+                                  toast("Link copied to clipboard!");
+                                }}
+                                className="flex-1 btn-glass text-xs py-1"
+                              >
+                                <Share className="w-3 h-3 mr-1" />
+                                Share
+                              </button>
+                            )}
+                          </div>
+                        </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
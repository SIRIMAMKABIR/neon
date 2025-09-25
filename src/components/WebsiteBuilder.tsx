import { useState, useRef, useEffect } from "react";
import { Save, Eye, Code, Palette, Type, Image, Plus, Trash2, ArrowLeft, LayoutGrid as Layout, Smartphone, Monitor, Tablet, Settings, Globe, Download, Upload, Link as LinkIcon, Camera, Wand as Wand2 } from "lucide-react";
import { toast } from "sonner";
import { NEON_TEMPLATES } from "@/data/templates";

interface WebsiteBuilderProps {
  templateId: string;
  siteId: string;
  siteName: string;
  onBack: () => void;
  onSave: (siteData: any) => void;
  onPublish: (siteData: any) => void;
}

interface PageElement {
  id: string;
  type: "text" | "image" | "button" | "section" | "link";
  content: string;
  styles: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
  };
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface SitePage {
  id: string;
  name: string;
  elements: PageElement[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const WebsiteBuilder = ({ templateId, siteId, siteName, onBack, onSave, onPublish }: WebsiteBuilderProps) => {
  const [activePanel, setActivePanel] = useState<"pages" | "design" | "content" | "code" | "ai">("pages");
  const [selectedPage, setSelectedPage] = useState(0);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [customCode, setCustomCode] = useState("");
  
  const template = NEON_TEMPLATES.find(t => t.id === templateId);
  
  const [siteData, setSiteData] = useState({
    name: siteName,
    template: templateId,
    pages: template?.pages.map((pageName, index) => ({
      id: `page-${index}`,
      name: pageName,
      elements: getDefaultElements(pageName),
      seo: {
        title: `${pageName} - ${siteName}`,
        description: `${pageName} page for ${siteName}`,
        keywords: `${siteName}, ${pageName.toLowerCase()}, neon tech`
      }
    })) || [],
    theme: {
      colors: template?.colorSchemes[0] || { name: "Default", primary: "#00E5FF", secondary: "#50207A", accent: "#D6B9FC" },
      font: template?.fonts[0] || "Inter"
    },
    published: false,
    customCSS: "",
    customJS: ""
  });

  // AI Website Generator State
  const [aiPrompt, setAiPrompt] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessLinks, setBusinessLinks] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function getDefaultElements(pageName: string): PageElement[] {
    const baseElements: PageElement[] = [
      {
        id: `${pageName}-header`,
        type: "text",
        content: pageName === "Home" ? "Welcome to Our Digital Experience" : `${pageName}`,
        styles: {
          fontSize: "3rem",
          color: "#00E5FF",
          padding: "2rem",
        },
        position: { x: 50, y: 50 },
        size: { width: 600, height: 100 }
      },
      {
        id: `${pageName}-content`,
        type: "text",
        content: getDefaultContent(pageName),
        styles: {
          fontSize: "1.2rem",
          color: "#FFFFFF",
          padding: "1rem",
        },
        position: { x: 50, y: 200 },
        size: { width: 800, height: 200 }
      }
    ];

    // Add page-specific elements
    if (pageName === "Home") {
      baseElements.push({
        id: "cta-button",
        type: "button",
        content: "Get Started",
        styles: {
          backgroundColor: "#00E5FF",
          color: "#000000",
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
        },
        position: { x: 50, y: 450 },
        size: { width: 200, height: 60 }
      });
    }

    if (pageName === "Contact") {
      baseElements.push({
        id: "contact-form",
        type: "section",
        content: "Contact Form",
        styles: {
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "2rem",
          borderRadius: "1rem",
        },
        position: { x: 50, y: 450 },
        size: { width: 600, height: 400 }
      });
    }

    return baseElements;
  }

  function getDefaultContent(pageName: string): string {
    switch (pageName) {
      case "Home":
        return "Experience the future of digital presence with Neon Tech. We craft sophisticated digital fingerprints that command respect and inspire trust.";
      case "About":
        return "We are digital artisans, crafting bespoke experiences that elevate your brand above the ordinary. Every pixel serves a purpose.";
      case "Services":
        return "From brand identity to digital flagships, we deliver excellence that speaks to your audience's highest aspirations.";
      case "Portfolio":
        return "Witness the transformation of vision into reality. Each project represents our commitment to uncompromising quality.";
      case "Contact":
        return "Ready to begin your digital transformation? Let's create something extraordinary together.";
      default:
        return `Welcome to our ${pageName} page. Discover what makes us different.`;
    }
  }

  const handleAddElement = (type: PageElement["type"]) => {
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === "text" ? "New Text Element" : type === "button" ? "Click Me" : type === "image" ? "/placeholder-image.jpg" : "New Element",
      styles: {
        fontSize: type === "text" ? "1rem" : undefined,
        color: type === "text" || type === "button" ? "#FFFFFF" : undefined,
        backgroundColor: type === "button" ? "#00E5FF" : type === "section" ? "rgba(255,255,255,0.1)" : undefined,
        padding: "1rem",
        borderRadius: type === "button" || type === "section" ? "0.5rem" : undefined,
      },
      position: { x: 100, y: 100 },
      size: { width: 200, height: type === "text" ? 50 : type === "image" ? 200 : 100 }
    };

    setSiteData(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === selectedPage 
          ? { ...page, elements: [...page.elements, newElement] }
          : page
      )
    }));

    setSelectedElement(newElement.id);
    toast("Element added successfully!");
  };

  const handleDeleteElement = (elementId: string) => {
    setSiteData(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === selectedPage 
          ? { ...page, elements: page.elements.filter(el => el.id !== elementId) }
          : page
      )
    }));
    
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
    toast("Element deleted");
  };

  const handleUpdateElement = (elementId: string, updates: Partial<PageElement>) => {
    setSiteData(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === selectedPage 
          ? { 
              ...page, 
              elements: page.elements.map(el => 
                el.id === elementId ? { ...el, ...updates } : el
              )
            }
          : page
      )
    }));
  };

  const handleAIGenerate = async () => {
    if (!businessName.trim()) {
      toast("Please enter your business name");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiGeneratedElements: PageElement[] = [
        {
          id: "ai-header",
          type: "text",
          content: `Welcome to ${businessName}`,
          styles: {
            fontSize: "3.5rem",
            color: "#00E5FF",
            padding: "2rem",
          },
          position: { x: 50, y: 50 },
          size: { width: 800, height: 120 }
        },
        {
          id: "ai-description",
          type: "text",
          content: businessDescription || `${businessName} - Crafting excellence in digital experiences`,
          styles: {
            fontSize: "1.3rem",
            color: "#FFFFFF",
            padding: "1rem",
          },
          position: { x: 50, y: 200 },
          size: { width: 900, height: 150 }
        }
      ];

      // Add links if provided
      if (businessLinks.trim()) {
        const links = businessLinks.split(',').map(link => link.trim());
        links.forEach((link, index) => {
          aiGeneratedElements.push({
            id: `ai-link-${index}`,
            type: "link",
            content: link,
            styles: {
              color: "#D6B9FC",
              padding: "0.5rem",
            },
            position: { x: 50 + (index * 200), y: 400 },
            size: { width: 180, height: 40 }
          });
        });
      }

      setSiteData(prev => ({
        ...prev,
        pages: prev.pages.map((page, index) => 
          index === selectedPage 
            ? { ...page, elements: aiGeneratedElements }
            : page
        )
      }));

      setIsGenerating(false);
      toast("AI generated your website! 🎉");
    }, 3000);
  };

  const handleSave = () => {
    onSave(siteData);
    toast("Website saved successfully!");
  };

  const handlePublish = () => {
    const publishedData = { ...siteData, published: true };
    setSiteData(publishedData);
    onPublish(publishedData);
    toast("Website published! 🚀 Your digital fingerprint is now live!");
  };

  const getCanvasWidth = () => {
    switch (previewMode) {
      case "mobile": return 375;
      case "tablet": return 768;
      default: return 1200;
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Template not found</h2>
          <button onClick={onBack} className="btn-neon">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-dark flex flex-col">
      {/* Top Bar */}
      <div className="glass-strong border-b border-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-headline font-bold text-neon">{siteName}</h1>
            <p className="text-sm text-muted-foreground">Digital Fingerprint Builder</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Preview Mode Toggle */}
          <div className="flex items-center space-x-2 glass p-1 rounded-lg">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded ${previewMode === "desktop" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("tablet")}
              className={`p-2 rounded ${previewMode === "tablet" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-2 rounded ${previewMode === "mobile" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsDeveloperMode(!isDeveloperMode)}
            className={`btn-glass ${isDeveloperMode ? "bg-neon-blue/20 text-neon-blue" : ""}`}
          >
            <Code className="w-4 h-4 mr-2" />
            Developer
          </button>

          <button
            onClick={() => setIsPreview(!isPreview)}
            className="btn-glass"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </button>

          <button onClick={handleSave} className="btn-glass">
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>

          <button onClick={handlePublish} className="btn-neon">
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        {!isPreview && (
          <div className="w-80 glass-strong border-r border-primary/10 flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-primary/10">
              {[
                { id: "pages", label: "Pages", icon: Layout },
                { id: "design", label: "Design", icon: Palette },
                { id: "content", label: "Content", icon: Type },
                { id: "ai", label: "AI Builder", icon: Wand2 },
                ...(isDeveloperMode ? [{ id: "code", label: "Code", icon: Code }] : [])
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-3 transition-colors ${
                    activePanel === tab.id 
                      ? "bg-neon-blue/20 text-neon-blue border-b-2 border-neon-blue" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Pages Panel */}
              {activePanel === "pages" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground mb-4">Site Pages</h3>
                  <div className="space-y-2">
                    {siteData.pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPage(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedPage === index 
                            ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30" 
                            : "bg-canvas-elevated hover:bg-white/5 text-foreground"
                        }`}
                      >
                        <div className="font-medium">{page.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {page.elements?.length || 0} elements
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Builder Panel */}
              {activePanel === "ai" && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-foreground">AI Website Builder</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Business Name *</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your Business Name"
                        className="w-full p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">What does your business do?</label>
                      <textarea
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        placeholder="Describe your business, services, or products..."
                        className="w-full p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground h-24 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Links (optional)</label>
                      <input
                        type="text"
                        value={businessLinks}
                        onChange={(e) => setBusinessLinks(e.target.value)}
                        placeholder="Social media, website links (comma separated)"
                        className="w-full p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
                      />
                    </div>

                    <button
                      onClick={handleAIGenerate}
                      disabled={isGenerating || !businessName.trim()}
                      className="w-full btn-neon"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate My Website
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-muted-foreground bg-canvas-elevated p-3 rounded-lg">
                    💡 Our AI will create a professional website based on your business information using Neon Tech's luxury design system.
                  </div>
                </div>
              )}

              {/* Content Panel */}
              {activePanel === "content" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Add Elements</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleAddElement("text")} className="btn-glass text-sm p-3">
                      <Type className="w-4 h-4 mb-1" />
                      Text
                    </button>
                    <button onClick={() => handleAddElement("image")} className="btn-glass text-sm p-3">
                      <Image className="w-4 h-4 mb-1" />
                      Image
                    </button>
                    <button onClick={() => handleAddElement("button")} className="btn-glass text-sm p-3">
                      <Plus className="w-4 h-4 mb-1" />
                      Button
                    </button>
                    <button onClick={() => handleAddElement("link")} className="btn-glass text-sm p-3">
                      <LinkIcon className="w-4 h-4 mb-1" />
                      Link
                    </button>
                  </div>

                  {/* Element Properties */}
                  {selectedElement && (
                    <div className="pt-4 border-t border-primary/10">
                      <h4 className="text-sm font-medium text-foreground mb-3">Element Properties</h4>
                      {(() => {
                        const element = siteData.pages[selectedPage]?.elements.find(el => el.id === selectedElement);
                        if (!element) return null;

                        return (
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-muted-foreground">Content</label>
                              <input
                                type="text"
                                value={element.content}
                                onChange={(e) => handleUpdateElement(selectedElement, { content: e.target.value })}
                                className="w-full p-2 bg-canvas-elevated border border-primary/20 rounded text-foreground text-sm"
                              />
                            </div>
                            
                            {element.type === "text" && (
                              <>
                                <div>
                                  <label className="text-xs text-muted-foreground">Font Size</label>
                                  <input
                                    type="text"
                                    value={element.styles.fontSize || "1rem"}
                                    onChange={(e) => handleUpdateElement(selectedElement, { 
                                      styles: { ...element.styles, fontSize: e.target.value }
                                    })}
                                    className="w-full p-2 bg-canvas-elevated border border-primary/20 rounded text-foreground text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground">Color</label>
                                  <input
                                    type="color"
                                    value={element.styles.color || "#FFFFFF"}
                                    onChange={(e) => handleUpdateElement(selectedElement, { 
                                      styles: { ...element.styles, color: e.target.value }
                                    })}
                                    className="w-full h-8 bg-canvas-elevated border border-primary/20 rounded"
                                  />
                                </div>
                              </>
                            )}

                            <button
                              onClick={() => handleDeleteElement(selectedElement)}
                              className="w-full btn-glass text-accent-red text-sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Element
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* Developer Code Panel */}
              {activePanel === "code" && isDeveloperMode && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Custom Code</h3>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Custom CSS</label>
                    <textarea
                      value={siteData.customCSS}
                      onChange={(e) => setSiteData(prev => ({ ...prev, customCSS: e.target.value }))}
                      placeholder="/* Add your custom CSS here */"
                      className="w-full h-32 p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground font-mono text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Custom JavaScript</label>
                    <textarea
                      value={siteData.customJS}
                      onChange={(e) => setSiteData(prev => ({ ...prev, customJS: e.target.value }))}
                      placeholder="// Add your custom JavaScript here"
                      className="w-full h-32 p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground font-mono text-sm resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setShowCodeEditor(!showCodeEditor)}
                    className="w-full btn-neon text-sm"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    {showCodeEditor ? "Hide" : "Show"} Full Code Editor
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="glass-card p-4 max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                {siteData.pages[selectedPage]?.name || "Page"} - {previewMode}
              </h3>
              <div className="text-xs text-muted-foreground">
                {getCanvasWidth()}px × 600px
              </div>
            </div>
            
            <div 
              className="border border-primary/20 rounded-lg overflow-hidden bg-canvas-dark relative"
              style={{ width: getCanvasWidth(), height: 600 }}
            >
              {/* Render Page Elements */}
              {siteData.pages[selectedPage]?.elements.map((element) => (
                <div
                  key={element.id}
                  onClick={() => !isPreview && setSelectedElement(element.id)}
                  className={`absolute cursor-pointer transition-all ${
                    selectedElement === element.id && !isPreview ? "ring-2 ring-neon-blue" : ""
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.size.width,
                    height: element.size.height,
                    ...element.styles
                  }}
                >
                  {element.type === "text" && (
                    <div className="w-full h-full flex items-center">
                      {element.content}
                    </div>
                  )}
                  {element.type === "button" && (
                    <button className="w-full h-full rounded" style={element.styles}>
                      {element.content}
                    </button>
                  )}
                  {element.type === "image" && (
                    <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center text-gray-600">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  {element.type === "link" && (
                    <a href="#" className="w-full h-full flex items-center underline">
                      {element.content}
                    </a>
                  )}
                  {element.type === "section" && (
                    <div className="w-full h-full rounded flex items-center justify-center text-muted-foreground">
                      {element.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Neon Tech Watermark */}
              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
                Powered by Neon Tech
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
import { useState, useRef, useEffect } from "react";
import { 
  Save, Eye, Settings, Palette, Type, Image, 
  Plus, Trash2, ArrowLeft, Layout, Smartphone, 
  Monitor, Tablet
} from "lucide-react";
import { Canvas as FabricCanvas, FabricText, FabricImage } from "fabric";
import { toast } from "sonner";
import { NEON_TEMPLATES, PREMIUM_FONTS } from "@/data/templates";

interface SiteEditorProps {
  templateId: string;
  siteId: string;
  siteName: string;
  onBack: () => void;
  onSave: (siteData: any) => void;
}

const SiteEditor = ({ templateId, siteId, siteName, onBack, onSave }: SiteEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activePanel, setActivePanel] = useState<"pages" | "design" | "content">("pages");
  const [selectedPage, setSelectedPage] = useState(0);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);
  
  const template = NEON_TEMPLATES.find(t => t.id === templateId);
  const [siteData, setSiteData] = useState({
    name: siteName,
    template: templateId,
    pages: template?.pages.map(page => ({
      name: page,
      content: `# Welcome to ${page}\n\nThis is your ${page.toLowerCase()} page content.`,
      elements: []
    })) || [],
    theme: {
      colors: template?.colorSchemes[0] || { name: "Default", primary: "#00E5FF", secondary: "#50207A", accent: "#D6B9FC" },
      font: template?.fonts[0] || "Inter"
    },
    published: false
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: getCanvasWidth(),
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [previewMode]);

  const getCanvasWidth = () => {
    switch (previewMode) {
      case "mobile": return 375;
      case "tablet": return 768;
      default: return 1200;
    }
  };

  const handleAddText = () => {
    if (!fabricCanvas) return;

    const text = new FabricText("Edit this text", {
      left: 100,
      top: 100,
      fontFamily: siteData.theme.font,
      fontSize: 24,
      fill: siteData.theme.colors.primary,
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    toast("Text element added");
  };

  const handleColorChange = (colorType: string, color: string) => {
    setSiteData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          [colorType]: color
        }
      }
    }));
  };

  const handleFontChange = (font: string) => {
    setSiteData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        font
      }
    }));
    
    // Update all text objects with new font
    if (fabricCanvas) {
      fabricCanvas.getObjects('text').forEach((obj: any) => {
        obj.set('fontFamily', font);
      });
      fabricCanvas.renderAll();
    }
  };

  const handleSave = () => {
    const canvasData = fabricCanvas?.toJSON();
    const updatedSiteData = {
      ...siteData,
      pages: siteData.pages.map((page, index) => 
        index === selectedPage 
          ? { ...page, elements: canvasData?.objects || [] }
          : page
      )
    };
    
    onSave(updatedSiteData);
    toast("Site saved successfully!");
  };

  const handlePublish = () => {
    setSiteData(prev => ({ ...prev, published: true }));
    handleSave();
    toast("Site published! 🚀");
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
            <p className="text-sm text-muted-foreground">Using {template.name}</p>
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
                { id: "content", label: "Content", icon: Type }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-colors ${
                    activePanel === tab.id 
                      ? "bg-neon-blue/20 text-neon-blue border-b-2 border-neon-blue" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
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
                  
                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-xs text-muted-foreground mb-2">
                      FREE: {siteData.pages.length}/7 pages used
                    </p>
                    <button 
                      className="w-full btn-glass text-sm"
                      disabled={siteData.pages.length >= 7}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Page
                    </button>
                  </div>
                </div>
              )}

              {/* Design Panel */}
              {activePanel === "design" && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-foreground">Theme Settings</h3>
                  
                  {/* Color Scheme */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Colors</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-muted-foreground">Primary</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="color"
                            value={siteData.theme.colors.primary}
                            onChange={(e) => handleColorChange("primary", e.target.value)}
                            className="w-8 h-8 rounded border border-primary/20"
                          />
                          <span className="text-sm font-mono text-foreground">
                            {siteData.theme.colors.primary}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Secondary</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="color"
                            value={siteData.theme.colors.secondary}
                            onChange={(e) => handleColorChange("secondary", e.target.value)}
                            className="w-8 h-8 rounded border border-primary/20"
                          />
                          <span className="text-sm font-mono text-foreground">
                            {siteData.theme.colors.secondary}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Accent</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="color"
                            value={siteData.theme.colors.accent}
                            onChange={(e) => handleColorChange("accent", e.target.value)}
                            className="w-8 h-8 rounded border border-primary/20"
                          />
                          <span className="text-sm font-mono text-foreground">
                            {siteData.theme.colors.accent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Font Selection */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Typography</h4>
                    <select
                      value={siteData.theme.font}
                      onChange={(e) => handleFontChange(e.target.value)}
                      className="w-full p-2 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
                    >
                      {PREMIUM_FONTS.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Color Schemes */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Presets</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {template.colorSchemes.map((scheme, index) => (
                        <button
                          key={index}
                          onClick={() => setSiteData(prev => ({
                            ...prev,
                            theme: { ...prev.theme, colors: scheme }
                          }))}
                          className="p-2 bg-canvas-elevated rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="flex space-x-1 mb-1">
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: scheme.primary }}
                            />
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: scheme.secondary }}
                            />
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: scheme.accent }}
                            />
                          </div>
                          <div className="text-xs text-foreground">{scheme.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Panel */}
              {activePanel === "content" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Add Elements</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleAddText} className="btn-glass text-sm p-3">
                      <Type className="w-4 h-4 mb-1" />
                      Text
                    </button>
                    <button className="btn-glass text-sm p-3">
                      <Image className="w-4 h-4 mb-1" />
                      Image
                    </button>
                    <button className="btn-glass text-sm p-3">
                      <Layout className="w-4 h-4 mb-1" />
                      Section
                    </button>
                    <button className="btn-glass text-sm p-3">
                      <Plus className="w-4 h-4 mb-1" />
                      Button
                    </button>
                  </div>

                  <div className="pt-4 border-t border-primary/10">
                    <h4 className="text-sm font-medium text-foreground mb-3">Page Content</h4>
                    <textarea
                      value={siteData.pages[selectedPage]?.content || ""}
                      onChange={(e) => {
                        setSiteData(prev => ({
                          ...prev,
                          pages: prev.pages.map((page, index) => 
                            index === selectedPage 
                              ? { ...page, content: e.target.value }
                              : page
                          )
                        }));
                      }}
                      className="w-full h-32 p-3 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground text-sm resize-none"
                      placeholder="Enter page content..."
                    />
                  </div>
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
            
            <div className="border border-primary/20 rounded-lg overflow-hidden bg-white">
              <canvas ref={canvasRef} className="max-w-full block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteEditor;
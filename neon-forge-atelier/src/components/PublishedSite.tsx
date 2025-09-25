import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface PublishedSiteData {
  id: string;
  name: string;
  template: string;
  pages: {
    name: string;
    content: string;
    elements: any[];
  }[];
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    font: string;
  };
  owner: string;
  published: boolean;
}

const PublishedSite = () => {
  const { slug } = useParams<{ slug: string }>();
  const [siteData, setSiteData] = useState<PublishedSiteData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock loading site data - in real app this would fetch from database
    const loadSiteData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock site data
      const mockSiteData: PublishedSiteData = {
        id: slug || "demo-site",
        name: "My Portfolio Site",
        template: "luxury-portfolio",
        pages: [
          {
            name: "Home",
            content: "# Welcome to My Portfolio\n\nCreating beautiful digital experiences with passion and precision.",
            elements: []
          },
          {
            name: "About",
            content: "# About Me\n\nI'm a creative professional with over 5 years of experience in digital design.",
            elements: []
          },
          {
            name: "Portfolio",
            content: "# My Work\n\nHere are some of my recent projects and achievements.",
            elements: []
          },
          {
            name: "Contact",
            content: "# Get In Touch\n\nLet's work together on your next amazing project.",
            elements: []
          }
        ],
        theme: {
          colors: {
            primary: "#00E5FF",
            secondary: "#50207A", 
            accent: "#D6B9FC"
          },
          font: "Poppins"
        },
        owner: "demo-user",
        published: true
      };
      
      setSiteData(mockSiteData);
      setLoading(false);
    };

    loadSiteData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading site...</p>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">Site not found</p>
        </div>
      </div>
    );
  }

  const renderPageContent = (content: string) => {
    // Simple markdown-like rendering
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 
            key={index} 
            className="text-4xl font-bold mb-6"
            style={{ 
              color: siteData.theme.colors.primary,
              fontFamily: siteData.theme.font 
            }}
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h2 
            key={index} 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: siteData.theme.colors.secondary,
              fontFamily: siteData.theme.font 
            }}
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.trim()) {
        return (
          <p 
            key={index} 
            className="text-lg mb-4 leading-relaxed"
            style={{ fontFamily: siteData.theme.font }}
          >
            {line}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        fontFamily: siteData.theme.font,
        background: `linear-gradient(135deg, ${siteData.theme.colors.secondary}05, ${siteData.theme.colors.accent}05)`
      }}
    >
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 
                className="text-xl font-bold"
                style={{ color: siteData.theme.colors.primary }}
              >
                {siteData.name}
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {siteData.pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    currentPage === index 
                      ? 'border-b-2 pb-1' 
                      : ''
                  }`}
                  style={{ 
                    color: currentPage === index ? siteData.theme.colors.primary : '#6B7280',
                    borderColor: currentPage === index ? siteData.theme.colors.primary : 'transparent'
                  }}
                >
                  {page.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                {siteData.pages.map((page, index) => (
                  <option key={index} value={index}>
                    {page.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {renderPageContent(siteData.pages[currentPage].content)}
          
          {/* Call to Action */}
          {currentPage === siteData.pages.length - 1 && (
            <div className="mt-12 text-center">
              <button
                className="px-8 py-3 rounded-full text-white font-semibold transition-all hover:scale-105 shadow-lg"
                style={{ 
                  backgroundColor: siteData.theme.colors.primary,
                  boxShadow: `0 10px 30px ${siteData.theme.colors.primary}30`
                }}
              >
                Get In Touch
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Neon Tech Watermark */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-xs text-gray-400">
              neonc©2025 — all rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublishedSite;
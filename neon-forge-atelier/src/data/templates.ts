export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  rating: number;
  downloads: number;
  isPremium: boolean;
  tags: string[];
  pages: string[];
  colorSchemes: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }[];
  fonts: string[];
}

export const NEON_TEMPLATES: Template[] = [
  {
    id: "luxury-portfolio",
    name: "Luxury Portfolio Pro",
    category: "portfolio",
    description: "Premium portfolio template with elegant animations and sophisticated layouts",
    thumbnail: "bg-gradient-to-br from-luxury-purple/20 to-luxury-lavender/20",
    rating: 4.9,
    downloads: 1247,
    isPremium: false,
    tags: ["luxury", "animation", "portfolio", "creative"],
    pages: ["Home", "About", "Portfolio", "Services", "Testimonials", "Blog", "Contact"],
    colorSchemes: [
      { name: "Neon Luxury", primary: "#00E5FF", secondary: "#50207A", accent: "#D6B9FC" },
      { name: "Crimson Gold", primary: "#FF003C", secondary: "#FFD700", accent: "#FF6B35" },
      { name: "Forest Emerald", primary: "#00C851", secondary: "#004225", accent: "#7FDBDA" }
    ],
    fonts: ["Merriweather", "Playfair Display", "Libre Baskerville", "Poppins", "Inter"]
  },
  {
    id: "minimal-showcase",
    name: "Minimalist Showcase",
    category: "showcase", 
    description: "Clean, minimal design perfect for creative professionals and agencies",
    thumbnail: "bg-gradient-to-br from-neon-blue/20 to-luxury-periwinkle/20",
    rating: 4.7,
    downloads: 892,
    isPremium: false,
    tags: ["minimal", "clean", "creative", "modern"],
    pages: ["Home", "Work", "About", "Process", "Team", "Journal", "Contact"],
    colorSchemes: [
      { name: "Pure Minimal", primary: "#000000", secondary: "#FFFFFF", accent: "#808080" },
      { name: "Soft Blue", primary: "#4A90E2", secondary: "#F5F7FA", accent: "#7ED321" },
      { name: "Warm Beige", primary: "#8B4513", secondary: "#F5F5DC", accent: "#FF6347" }
    ],
    fonts: ["Inter", "Roboto", "Open Sans", "Lato", "Source Sans Pro"]
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive",
    category: "business",
    description: "Professional template designed for business leaders and corporate entities",
    thumbnail: "bg-gradient-to-br from-canvas-surface to-canvas-elevated",
    rating: 4.8,
    downloads: 634,
    isPremium: false,
    tags: ["business", "professional", "executive", "corporate"],
    pages: ["Home", "About", "Services", "Solutions", "Team", "Insights", "Contact"],
    colorSchemes: [
      { name: "Corporate Blue", primary: "#1E3A8A", secondary: "#F8FAFC", accent: "#3B82F6" },
      { name: "Executive Gray", primary: "#374151", secondary: "#F9FAFB", accent: "#6366F1" },
      { name: "Success Green", primary: "#065F46", secondary: "#ECFDF5", accent: "#10B981" }
    ],
    fonts: ["Georgia", "Times New Roman", "Crimson Text", "Roboto", "Arial"]
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    category: "creative",
    description: "Bold, expressive template for artists, designers, and creative studios",
    thumbnail: "bg-gradient-to-br from-accent-red/20 to-luxury-purple/20",
    rating: 4.6,
    downloads: 756,
    isPremium: false,
    tags: ["creative", "bold", "artistic", "vibrant"],
    pages: ["Home", "Gallery", "About", "Services", "Projects", "News", "Contact"],
    colorSchemes: [
      { name: "Vibrant Mix", primary: "#FF003C", secondary: "#00E5FF", accent: "#7C3AED" },
      { name: "Sunset Glow", primary: "#F59E0B", secondary: "#EF4444", accent: "#8B5CF6" },
      { name: "Ocean Deep", primary: "#0891B2", secondary: "#06B6D4", accent: "#10B981" }
    ],
    fonts: ["Oswald", "Montserrat", "Bebas Neue", "Raleway", "Nunito"]
  },
  {
    id: "luxury-restaurant",
    name: "Luxury Restaurant",
    category: "hospitality",
    description: "Elegant template for fine dining establishments and luxury hospitality",
    thumbnail: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
    rating: 4.5,
    downloads: 423,
    isPremium: false,
    tags: ["restaurant", "luxury", "hospitality", "elegant"],
    pages: ["Home", "Menu", "About", "Reservations", "Events", "Gallery", "Contact"],
    colorSchemes: [
      { name: "Golden Elegance", primary: "#B45309", secondary: "#FEF3C7", accent: "#F59E0B" },
      { name: "Wine & Dine", primary: "#7C2D12", secondary: "#FEE2E2", accent: "#DC2626" },
      { name: "Forest Green", primary: "#14532D", secondary: "#F0FDF4", accent: "#16A34A" }
    ],
    fonts: ["Playfair Display", "Cormorant Garamond", "Dancing Script", "Libre Baskerville", "Roboto"]
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    category: "technology",
    description: "Modern, cutting-edge template for tech startups and SaaS companies",
    thumbnail: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
    rating: 4.4,
    downloads: 567,
    isPremium: false,
    tags: ["tech", "startup", "saas", "modern"],
    pages: ["Home", "Product", "Features", "Pricing", "About", "Blog", "Contact"],
    colorSchemes: [
      { name: "Tech Purple", primary: "#7C3AED", secondary: "#F3F4F6", accent: "#06B6D4" },
      { name: "Electric Blue", primary: "#1D4ED8", secondary: "#EFF6FF", accent: "#10B981" },
      { name: "Cyber Green", primary: "#059669", secondary: "#F0FDF4", accent: "#8B5CF6" }
    ],
    fonts: ["Inter", "JetBrains Mono", "Fira Code", "Roboto", "Space Grotesk"]
  },
  {
    id: "personal-brand",
    name: "Personal Brand",
    category: "personal",
    description: "Sophisticated template for personal branding and professional individuals",
    thumbnail: "bg-gradient-to-br from-rose-500/20 to-pink-600/20",
    rating: 4.3,
    downloads: 345,
    isPremium: false,
    tags: ["personal", "brand", "professional", "individual"],
    pages: ["Home", "About", "Experience", "Skills", "Projects", "Blog", "Contact"],
    colorSchemes: [
      { name: "Rose Gold", primary: "#E11D48", secondary: "#FDF2F8", accent: "#F59E0B" },
      { name: "Slate Professional", primary: "#475569", secondary: "#F8FAFC", accent: "#0EA5E9" },
      { name: "Emerald Fresh", primary: "#059669", secondary: "#ECFDF5", accent: "#8B5CF6" }
    ],
    fonts: ["Poppins", "Nunito", "Source Sans Pro", "Lora", "Merriweather"]
  }
];

export const PREMIUM_FONTS = [
  "Merriweather", "Playfair Display", "Libre Baskerville", "Cormorant Garamond",
  "Dancing Script", "Oswald", "Montserrat", "Bebas Neue", "Raleway", "Nunito",
  "Inter", "Roboto", "Open Sans", "Lato", "Source Sans Pro", "Poppins",
  "Georgia", "Times New Roman", "Crimson Text", "Arial", "JetBrains Mono",
  "Fira Code", "Space Grotesk", "Lora", "Work Sans", "DM Sans", "Plus Jakarta Sans",
  "Outfit", "Manrope", "Sora"
];

export const getUserSiteLimit = (planLevel: string) => {
  switch (planLevel) {
    case "Free": return 7;
    case "Pro": return 50;
    case "Enterprise": return -1; // Unlimited
    default: return 7;
  }
};
import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BigNBackground from "@/components/BigNBackground";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  process: string[];
  caseStudy: string;
}

const services: Service[] = [
  {
    id: "identity",
    title: "Identity & Soul",
    subtitle: "Brand Architecture",
    description: "We don't create logos; we architect identities that command respect and inspire loyalty. Every visual element, every typographic choice, every color decision serves the greater narrative of your brand's unique position in the market.",
    process: [
      "Deep brand archaeology to uncover your authentic voice",
      "Strategic positioning that differentiates from competitors", 
      "Visual identity system that scales across all touchpoints",
      "Brand guidelines that ensure consistency at every interaction"
    ],
    caseStudy: "Transformed a boutique law firm into a recognized authority, resulting in 300% increase in high-value client inquiries within six months."
  },
  {
    id: "flagship",
    title: "Digital Flagships",
    subtitle: "Web Experiences",
    description: "Your website isn't just a digital brochure—it's your most important sales representative, working 24/7 to convert visitors into clients. We craft flagships that don't just look exceptional; they perform with precision.",
    process: [
      "User journey mapping to optimize conversion paths",
      "Custom design systems that reflect brand sophistication",
      "Performance optimization for lightning-fast loading",
      "Analytics integration to measure and improve results"
    ],
    caseStudy: "Launched a luxury real estate platform that generated $50M in property inquiries in its first year, with conversion rates 4x industry average."
  },
  {
    id: "bespoke",
    title: "Bespoke Instruments",
    subtitle: "Custom Applications",
    description: "When off-the-shelf solutions fall short of your ambitions, we create bespoke instruments tailored to your exact specifications. These aren't just apps—they're competitive advantages.",
    process: [
      "Requirements analysis with focus on business objectives",
      "Prototype development for rapid validation and iteration",
      "Full-stack development with enterprise-grade security",
      "Ongoing optimization and feature enhancement"
    ],
    caseStudy: "Developed a client management system for a wealth management firm that streamlined operations and improved client satisfaction scores by 85%."
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="min-h-screen relative">
      <NavBar />
      <BigNBackground opacity={0.02} />
      
      <div className="pt-24">
        <div className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-luxury">
              The Blueprint Room
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The Anatomy of Excellence
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto mt-8"></div>
          </div>

          {/* Philosophy */}
          <div className="glass-card max-w-4xl mx-auto mb-20 text-center">
            <p className="text-2xl font-headline leading-relaxed text-foreground/90">
              "Excellence is never an accident. It is always the result of high intention, 
              sincere effort, and intelligent execution; it represents the wise choice of many alternatives."
            </p>
            <cite className="block mt-6 text-muted-foreground">— Aristotle</cite>
          </div>

          {/* Services Filmstrip */}
          <div className="mb-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-12 text-neon">
              Our Disciplines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="glass-card cursor-pointer group hover:scale-105 transition-all duration-500"
                >
                  {/* Animated Visual */}
                  <div className="h-40 mb-6 bg-gradient-to-br from-neon-blue/20 to-luxury-purple/20 rounded-xl flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 animate-shimmer opacity-50"></div>
                    <div className="text-4xl font-headline font-bold text-luxury-periwinkle opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {service.title.split(' ')[0][0]}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-headline font-bold mb-2 text-neon">
                    {service.title}
                  </h3>
                  <p className="text-luxury-periwinkle font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {service.description.substring(0, 120)}...
                  </p>
                  <div className="mt-6">
                    <span className="text-neon-blue font-medium group-hover:underline">
                      Explore Deep Dive →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl">
            {/* Header */}
            <div className="sticky top-0 glass-strong p-6 border-b border-primary/20 flex justify-between items-center">
              <h2 className="text-3xl font-headline font-bold text-neon">
                {selectedService.title}
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="p-8">
              {/* Strategy Section */}
              <section className="mb-12">
                <h3 className="text-2xl font-headline font-bold mb-6 text-luxury-periwinkle">
                  Strategy
                </h3>
                <p className="text-lg leading-relaxed text-foreground/90 mb-8">
                  {selectedService.description}
                </p>
              </section>

              {/* Design Process */}
              <section className="mb-12">
                <h3 className="text-2xl font-headline font-bold mb-6 text-luxury-periwinkle">
                  Our Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedService.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-neon-blue font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Case Study */}
              <section className="mb-8">
                <h3 className="text-2xl font-headline font-bold mb-6 text-luxury-periwinkle">
                  Recent Success
                </h3>
                <div className="glass p-6 rounded-xl">
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    {selectedService.caseStudy}
                  </p>
                  <div className="h-40 bg-gradient-to-br from-neon-blue/10 to-luxury-purple/10 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground italic">Cinematic case study visual</span>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="text-center">
                <Link
                  to="/contact"
                  className="btn-neon inline-block"
                  onClick={() => setSelectedService(null)}
                >
                  Commission Your Masterpiece
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Services;
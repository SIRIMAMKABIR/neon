import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BigNBackground from "@/components/BigNBackground";

const Index = () => {
  const shapesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate geometric shapes
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll(".floating-shape");
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-180, 180)",
          duration: "random(8, 12)",
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2,
        });
      });
    }

    // Hero animation
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NavBar />
      <BigNBackground opacity={0.03} animated={true} />

      {/* Floating Geometric Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`floating-shape absolute ${
              i % 3 === 0 ? "w-16 h-16" : i % 3 === 1 ? "w-12 h-12" : "w-8 h-8"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 4 === 0 && (
              <div className="w-full h-full border-2 border-neon-blue/30 rotate-45"></div>
            )}
            {i % 4 === 1 && (
              <div className="w-full h-full rounded-full border-2 border-luxury-periwinkle/30"></div>
            )}
            {i % 4 === 2 && (
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon
                  points="50,5 95,85 5,85"
                  fill="none"
                  stroke="hsl(var(--luxury-lavender))"
                  strokeWidth="2"
                  opacity="0.3"
                />
              </svg>
            )}
            {i % 4 === 3 && (
              <div className="w-full h-full">
                <div className="w-full h-0.5 bg-accent-red/30 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                <div className="h-full w-0.5 bg-accent-red/30 absolute left-1/2 top-0 transform -translate-x-1/2"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-headline font-bold mb-8 text-luxury leading-tight">
              Digital Fingerprints,{" "}
              <span className="text-neon">Built for Velocity.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Where precision meets artistry in the digital realm
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/register" className="btn-neon text-lg px-12 py-4">
                Get Started
              </Link>
              <Link to="/services" className="btn-glass text-lg px-12 py-4">
                Explore Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Neon Tech Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-neon mb-6">
              Why Neon Tech
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Precision Crafted",
                description: "Every pixel serves a purpose, every interaction tells your story",
                icon: "⬢"
              },
              {
                title: "Velocity Focused",
                description: "Built for speed without compromising on sophistication",
                icon: "⚡"
              },
              {
                title: "Luxury Standard",
                description: "Premium experiences that command respect and inspire trust",
                icon: "◆"
              },
              {
                title: "Future Ready",
                description: "Scalable architecture that evolves with your ambitions",
                icon: "▲"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card text-center group">
                <div className="text-4xl mb-6 text-neon-blue group-hover:animate-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-headline font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-neon mb-6">
              The Blueprint
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three pillars of digital excellence
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {[
                {
                  title: "Identity & Soul",
                  subtitle: "Brand Architecture",
                  description: "We don't create logos; we architect identities that command respect and inspire loyalty."
                },
                {
                  title: "Digital Flagships", 
                  subtitle: "Web Experiences",
                  description: "Your website isn't just a digital brochure—it's your most important sales representative, working 24/7."
                },
                {
                  title: "Bespoke Instruments",
                  subtitle: "Custom Applications", 
                  description: "When off-the-shelf solutions fall short, we create competitive advantages tailored to your vision."
                }
              ].map((service, index) => (
                <div key={index} className="glass-card flex-1 group cursor-pointer hover:scale-105 transition-all duration-500">
                  <div className="h-32 mb-6 bg-gradient-to-br from-neon-blue/20 to-luxury-purple/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="text-3xl font-headline font-bold text-luxury-periwinkle">
                      {service.title.split(' ')[0][0]}
                    </div>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-neon mb-2">
                    {service.title}
                  </h3>
                  <p className="text-luxury-periwinkle font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Moment of Impact */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="glass-card max-w-4xl mx-auto text-center">
            <div className="text-6xl md:text-7xl font-headline font-bold text-neon mb-4">
              10x
            </div>
            <p className="text-xl text-foreground/90 mb-2">
              Average increase in client engagement
            </p>
            <p className="text-muted-foreground">
              When excellence meets velocity
            </p>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-muted-foreground mb-8">Trusted by forward-thinking organizations</p>
            <div className="flex justify-center items-center space-x-12 opacity-40">
              {["APEX", "LUXE", "VERTEX", "PRIME", "ZENITH"].map((logo, index) => (
                <div key={index} className="text-xl font-headline font-bold text-foreground">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-canvas-surface to-canvas-elevated">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-headline font-bold text-luxury mb-6">
            Ready to look untouchable?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the exclusive circle of those who refuse to settle for ordinary
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="btn-neon text-lg px-12 py-4">
              Begin Your Journey
            </Link>
            <Link to="/contact" className="btn-glass text-lg px-12 py-4">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
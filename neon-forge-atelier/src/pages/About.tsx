import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BigNBackground from "@/components/BigNBackground";
import WhiteDot from "@/components/WhiteDot";

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  return (
    <div className="min-h-screen relative">
      <NavBar />
      <BigNBackground opacity={0.02} />
      
      {/* White Dot Intro Animation */}
      {!showContent && (
        <WhiteDot
          onComplete={() => {
            setShowTitle(true);
            setTimeout(() => setShowContent(true), 2000);
          }}
        />
      )}

      {/* Title Animation */}
      {showTitle && !showContent && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-luxury animate-pulse">
            NEON TECH
          </h1>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="pt-24 animate-fade-in">
          <div className="container mx-auto px-6 py-16">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-luxury">
                World of Neon Tech
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Where digital craftsmanship meets luxury design
              </p>
            </div>

            {/* Problem Section */}
            <section className="mb-20">
              <div className="glass-card max-w-4xl mx-auto">
                <h2 className="text-3xl font-headline font-bold mb-8 text-neon">The Problem</h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-foreground/90">
                    In a world saturated with template-driven solutions and cookie-cutter digital experiences, 
                    true luxury has become increasingly rare. Brands seeking to establish genuine prestige 
                    find themselves trapped between generic platforms and overpriced agencies that prioritize 
                    process over artistry.
                  </p>
                  <p className="text-foreground/90">
                    The market has forgotten that digital excellence isn't just about functionality—it's 
                    about creating experiences that command respect, inspire confidence, and leave lasting 
                    impressions. This is where most ventures fail to capture the attention they deserve.
                  </p>
                  <div className="text-center py-8">
                    <div className="text-6xl font-headline font-bold text-neon">60%</div>
                    <p className="text-muted-foreground mt-2">
                      of luxury brands report that their digital presence fails to match their physical experience
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Story Section */}
            <section className="mb-20">
              <div className="glass-card max-w-4xl mx-auto">
                <h2 className="text-3xl font-headline font-bold mb-8 text-neon">Our Story</h2>
                <div className="text-lg leading-relaxed">
                  <p className="text-foreground/90 mb-6">
                    A discerning collector once shared a moment that crystallized our mission. They had discovered 
                    an extraordinary artisan whose work deserved global recognition, but the craftsman's digital 
                    presence was so underwhelming that potential patrons dismissed the opportunity entirely. 
                    "The greatest tragedy," they reflected, "is when excellence goes unnoticed because it wasn't 
                    properly presented."
                  </p>
                  <p className="text-foreground/90">
                    This conversation sparked the creation of Neon Tech—a atelier dedicated to ensuring that 
                    exceptional ideas receive the digital sophistication they deserve. We don't just build 
                    websites or applications; we craft digital stages where brilliance can perform.
                  </p>
                </div>
              </div>
            </section>

            {/* Client Reviews */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-neon">What Patrons Say</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    quote: "The attention to detail was impressive, though the timeline stretched longer than initially quoted.",
                    author: "Marcus Chen, Tech Entrepreneur",
                    type: "balanced"
                  },
                  {
                    quote: "Good work overall. Some communication could have been clearer during the revision phase.",
                    author: "Sarah Williams, Gallery Owner",
                    type: "neutral"
                  },
                  {
                    quote: "Absolutely transformative. Our digital presence now perfectly reflects our brand's sophistication.",
                    author: "Alexander Rothschild, Luxury Consultant",
                    type: "praise"
                  },
                  {
                    quote: "Neon Tech delivered beyond expectations. Every pixel serves a purpose, every interaction feels intentional.",
                    author: "Isabella Monaco, Fashion House Director",
                    type: "praise"
                  }
                ].map((review, index) => (
                  <div key={index} className="glass-card">
                    <blockquote className="text-foreground/90 mb-4 italic leading-relaxed">
                      "{review.quote}"
                    </blockquote>
                    <cite className="text-muted-foreground font-medium">
                      — {review.author}
                    </cite>
                  </div>
                ))}
              </div>
            </section>

            {/* Solution Section */}
            <section className="mb-20">
              <div className="glass-card max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-headline font-bold mb-6 text-neon">The Solution</h2>
                <p className="text-2xl text-foreground/90 mb-8 leading-relaxed">
                  We don't sell features. We deliver a stage.
                </p>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Every project begins with understanding not just what you do, but why it matters. 
                  We then craft digital experiences that amplify that significance through precision design, 
                  thoughtful interaction, and uncompromising attention to detail.
                </p>
                <Link
                  to="/contact"
                  className="btn-neon inline-block"
                >
                  Let's Build Your Stage
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default About;
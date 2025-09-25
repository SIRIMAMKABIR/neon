import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  purpose: string[];
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    purpose: [],
    message: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const purposes = [
    "Brand Identity",
    "Digital Flagship", 
    "Bespoke App",
    "Something Else"
  ];

  const steps = ["name", "email", "purpose", "message"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePurposeToggle = (purpose: string) => {
    setFormData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(purpose)
        ? prev.purpose.filter(p => p !== purpose)
        : [...prev.purpose, purpose]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const getContextMessage = () => {
    switch (currentStep) {
      case 0:
        return "Welcome to our atelier. Let's begin with introductions.";
      case 1:
        return formData.name ? `A pleasure to meet you, ${formData.name}.` : "Please share your contact information.";
      case 2:
        return "We hold all correspondence in strict confidence.";
      case 3:
        return "Tell us about your vision. Every detail matters.";
      default:
        return "";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <NavBar />
        
        {/* Particle effect background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="glass-card max-w-2xl mx-auto text-center z-10">
          <div className="mb-8">
            <div className="w-16 h-16 bg-neon-blue rounded-full mx-auto mb-6 animate-glow flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4 text-neon">
              Message Received
            </h1>
            <p className="text-xl text-foreground/90 mb-2">
              Thank you, {formData.name}.
            </p>
            <p className="text-muted-foreground">
              Expect a personal reply within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/services"
              className="btn-glass block w-full text-center"
            >
              Enter the Gallery
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="btn-glass flex-1 text-center"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="btn-neon flex-1 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <NavBar />
      
      {/* Ambient background with slow smoke effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-canvas-dark via-canvas-surface to-canvas-dark">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-purple/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
        </div>
      </div>

      <div className="relative z-10 pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4">
                  <span className="text-luxury">Begin a</span>
                  <br />
                  <span className="text-neon relative">
                    Commission
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-neon-blue animate-shimmer"></div>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Effortless Elegance
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Step */}
                {currentStep === 0 && (
                  <div className="space-y-4 animate-fade-in">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Your Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="glass-strong border-primary/20 focus:border-primary/50 text-lg py-6"
                      placeholder="How shall we address you?"
                      onKeyPress={(e) => e.key === 'Enter' && formData.name && handleNext()}
                      autoFocus
                    />
                    {formData.name && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Email Step */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="glass-strong border-primary/20 focus:border-primary/50 text-lg py-6"
                      placeholder="your@email.com"
                      onKeyPress={(e) => e.key === 'Enter' && formData.email && handleNext()}
                      autoFocus
                    />
                    {formData.email && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Purpose Step */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Purpose of Inquiry
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {purposes.map((purpose) => (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() => handlePurposeToggle(purpose)}
                          className={`glass p-4 rounded-xl transition-all duration-300 text-left ${
                            formData.purpose.includes(purpose)
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-primary/20 hover:border-primary/40'
                          }`}
                        >
                          <span className="font-medium">{purpose}</span>
                        </button>
                      ))}
                    </div>
                    {formData.purpose.length > 0 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Message Step */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Your Vision
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="glass-strong border-primary/20 focus:border-primary/50 min-h-32"
                      placeholder="Describe your project, goals, or any specific requirements..."
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="btn-neon"
                      disabled={!formData.message}
                    >
                      Send Message
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column - Context Panel */}
            <div className="glass-card h-fit">
              <h3 className="text-2xl font-headline font-bold mb-6 text-neon">
                Consultation Context
              </h3>
              
              <div className="space-y-6">
                <p className="text-lg text-foreground/90">
                  {getContextMessage()}
                </p>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{currentStep + 1} of {steps.length}</span>
                  </div>
                  <div className="w-full bg-canvas-elevated rounded-full h-2">
                    <div 
                      className="bg-neon-blue h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Context-sensitive information */}
                {formData.name && (
                  <div className="border-t border-primary/20 pt-6">
                    <h4 className="font-semibold mb-2 text-foreground">Session Details</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Name: {formData.name}</p>
                      {formData.email && <p>Email: {formData.email}</p>}
                      {formData.purpose.length > 0 && (
                        <p>Interest: {formData.purpose.join(", ")}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="border-t border-primary/20 pt-6">
                  <h4 className="font-semibold mb-2 text-foreground">Our Commitment</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every inquiry receives personal attention from our team. We believe in building 
                    relationships through trust, transparency, and exceptional results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
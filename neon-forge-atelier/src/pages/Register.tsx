import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ConstellationInput from "@/components/ConstellationInput";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showThreshold, setShowThreshold] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const steps = ["name", "email", "password", "confirmPassword"];

  const handleThresholdClick = () => {
    setShowThreshold(false);
    setTimeout(() => setCurrentStep(0), 500);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <NavBar />
        
        <div className="glass-card max-w-lg mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-luxury-purple to-luxury-lavender rounded-full mx-auto mb-6 animate-glow flex items-center justify-center">
              <span className="text-3xl text-white">✦</span>
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4 text-luxury">
              Welcome, {formData.name}
            </h1>
            <p className="text-muted-foreground mb-2">
              Your inscription has been recorded in our ledger.
            </p>
            <p className="text-sm text-muted-foreground/60">
              {new Date().toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              You now have access to the Neon Tech Atelier. Prepare to experience 
              digital craftsmanship like never before.
            </p>
            
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-neon w-full"
            >
              Enter the Atelier
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <NavBar />
      
      {/* Threshold Phase */}
      {showThreshold && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-canvas-dark">
          <div className="text-center">
            <div 
              onClick={handleThresholdClick}
              className="w-32 h-32 mx-auto mb-8 cursor-pointer transform transition-all duration-700 hover:scale-110"
              style={{
                background: `radial-gradient(circle, hsl(var(--luxury-lavender)) 0%, hsl(var(--luxury-purple)) 100%)`,
                borderRadius: "50%",
                boxShadow: "0 0 60px rgba(214, 185, 252, 0.5)"
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-luxury-lavender/30 animate-pulse"></div>
            </div>
            <p className="text-muted-foreground text-lg">
              Click to unlock membership
            </p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {!showThreshold && (
        <div className="pt-24 min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl font-headline font-bold mb-4 text-luxury">
                  Membership Ledger
                </h1>
                <p className="text-muted-foreground">
                  Become a Member
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Step */}
                {currentStep === 0 && (
                  <div className="animate-fade-in text-center">
                    <label className="block text-lg font-medium text-foreground mb-6">
                      Your Name
                    </label>
                    <ConstellationInput
                      value={formData.name}
                      onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                      placeholder="Enter your full name"
                      className="text-center text-lg py-6"
                    />
                    {formData.name && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Email Step */}
                {currentStep === 1 && (
                  <div className="animate-fade-in text-center">
                    <label className="block text-lg font-medium text-foreground mb-6">
                      Email Address
                    </label>
                    <ConstellationInput
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                      placeholder="your@email.com"
                      className="text-center text-lg py-6"
                    />
                    {formData.email && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Password Step */}
                {currentStep === 2 && (
                  <div className="animate-fade-in text-center">
                    <label className="block text-lg font-medium text-foreground mb-6">
                      Personal Key
                    </label>
                    <ConstellationInput
                      type="password"
                      value={formData.password}
                      onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                      placeholder="Create a secure password"
                      className="text-center text-lg py-6"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Watch the constellation grow as you type
                    </p>
                    {formData.password.length >= 8 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {/* Confirm Password Step */}
                {currentStep === 3 && (
                  <div className="animate-fade-in text-center">
                    <label className="block text-lg font-medium text-foreground mb-6">
                      Confirm Personal Key
                    </label>
                    <ConstellationInput
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                      placeholder="Confirm your password"
                      className="text-center text-lg py-6"
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <button
                        type="submit"
                        className="btn-neon mt-6 text-lg px-12 py-4"
                      >
                        Inscribe My Name
                      </button>
                    )}
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-accent-red text-sm mt-2">
                        Keys don't match
                      </p>
                    )}
                  </div>
                )}
              </form>

              {/* Login Link */}
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="text-neon-blue hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
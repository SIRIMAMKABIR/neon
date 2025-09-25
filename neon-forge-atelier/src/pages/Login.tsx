import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ConstellationInput from "@/components/ConstellationInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPhase, setCurrentPhase] = useState<"recognition" | "entry">("recognition");
  const [backgroundTheme, setBackgroundTheme] = useState("");
  const [greeting, setGreeting] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();

  // Generate background theme from email
  useEffect(() => {
    if (email && email.includes("@")) {
      const hash = email.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const hue = Math.abs(hash) % 360;
      setBackgroundTheme(`linear-gradient(135deg, hsl(${hue}, 30%, 10%), hsl(${hue + 60}, 25%, 8%))`);
      
      // Generate greeting
      const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
      const hour = new Date().getHours();
      const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
      setGreeting(`Good ${timeOfDay}, ${name}.`);
    }
  }, [email]);

  const handleEmailSubmit = () => {
    if (email && email.includes("@")) {
      setCurrentPhase("entry");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NavBar />
      
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: backgroundTheme || "linear-gradient(135deg, hsl(var(--canvas-dark)), hsl(var(--canvas-surface)))"
        }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            
            {/* Phase 1 - Recognition */}
            {currentPhase === "recognition" && (
              <div className="text-center animate-fade-in">
                <h1 className="text-4xl font-headline font-bold mb-8 text-foreground">
                  The Arrival
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                  Welcome back. Please identify yourself.
                </p>
                
                <div className="space-y-6">
                  <ConstellationInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email address"
                    className="text-center text-lg py-6"
                  />
                  
                  {greeting && (
                    <p className="text-neon-blue font-medium animate-fade-in">
                      {greeting}
                    </p>
                  )}
                  
                  {email && email.includes("@") && (
                    <button
                      onClick={handleEmailSubmit}
                      className="btn-neon"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Phase 2 - Entry */}
            {currentPhase === "entry" && (
              <div className="text-center animate-fade-in">
                <h1 className="text-4xl font-headline font-bold mb-8 text-foreground">
                  Entry Sequence
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                  Present your personal key.
                </p>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <ConstellationInput
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    className="text-center text-lg py-6"
                  />
                  
                  <button
                    type="submit"
                    className="btn-neon text-lg px-12 py-4"
                    disabled={!password}
                  >
                    Enter
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowPasswordReset(true)}
                    className="block mx-auto text-sm text-muted-foreground hover:text-neon-blue transition-colors"
                  >
                    Assistance with your key?
                  </button>
                </form>

                {/* Staff Entry Link */}
                <div className="mt-12 pt-8 border-t border-primary/20">
                  <Link
                    to="/login/staff"
                    className="text-muted-foreground hover:text-luxury-periwinkle transition-colors text-sm"
                  >
                    Staff entry →
                  </Link>
                </div>
              </div>
            )}

            {/* Register Link */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                New to Neon Tech?{" "}
                <Link
                  to="/register"
                  className="text-neon-blue hover:underline font-medium"
                >
                  Request membership
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showPasswordReset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-strong max-w-md w-full p-8 rounded-2xl">
            <h3 className="text-2xl font-headline font-bold mb-6 text-neon text-center">
              Key Recovery
            </h3>
            <p className="text-muted-foreground mb-6 text-center leading-relaxed">
              We'll send recovery instructions to your registered email address.
            </p>
            
            <div className="space-y-4">
              <ConstellationInput
                type="email"
                value={email}
                onChange={() => {}} // Read-only in this context
                placeholder="Registered email"
                className="text-center"
              />
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPasswordReset(false)}
                  className="btn-glass flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Simulate sending recovery email
                    alert("Recovery instructions sent!");
                    setShowPasswordReset(false);
                  }}
                  className="btn-neon flex-1"
                >
                  Send Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
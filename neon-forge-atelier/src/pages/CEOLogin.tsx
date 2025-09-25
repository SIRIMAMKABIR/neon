import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ConstellationInput from "@/components/ConstellationInput";
import { Shield, Crown } from "lucide-react";

const CEOLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<"identity" | "access">("identity");
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setPhase("access");
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate CEO login with enhanced security
    setTimeout(() => {
      navigate("/ceo/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NavBar />
      
      {/* Executive Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/20 via-canvas-dark to-canvas-surface">
          <div className="absolute inset-0 bg-luxury-pattern opacity-10"></div>
        </div>
        
        {/* Floating Crown Element */}
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <Crown className="w-96 h-96 text-luxury-lavender animate-float" />
        </div>
      </div>

      <div className="relative z-10 pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            
            {phase === "identity" && (
              <div className="glass-strong p-10 rounded-3xl">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-luxury-purple to-luxury-lavender rounded-full mx-auto mb-6 flex items-center justify-center animate-glow">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-headline font-bold text-luxury mb-3">
                    Executive Portal
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    CEO • Neon Tech Enterprises
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Executive Identity
                    </label>
                    <ConstellationInput
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="ceo@neontech.com"
                      className="w-full text-lg py-4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-neon w-full py-5 text-lg"
                    disabled={!email}
                  >
                    Proceed to Access Control
                  </button>
                </form>

                <div className="mt-10 p-6 bg-gradient-to-r from-luxury-purple/10 to-luxury-lavender/10 rounded-xl border border-luxury-lavender/20">
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    🔒 Executive-level security protocols active. Multi-factor authentication required.
                    All access is encrypted and audited for compliance.
                  </p>
                </div>
              </div>
            )}

            {phase === "access" && (
              <div className="glass-strong p-10 rounded-3xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-headline font-bold text-neon mb-2">
                    Welcome back, Chief Executive
                  </h2>
                  <p className="text-muted-foreground">
                    Please provide your executive access key
                  </p>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Executive Access Key
                    </label>
                    <ConstellationInput
                      type="password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Enter your executive key"
                      className="w-full text-lg py-4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-neon w-full py-5 text-lg"
                    disabled={!password}
                  >
                    Access Executive Suite
                  </button>
                </form>

                <button
                  onClick={() => setPhase("identity")}
                  className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  ← Back to identity verification
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="text-center mt-10 space-y-4">
              <p className="text-muted-foreground">
                Staff access?{" "}
                <Link
                  to="/login/staff"
                  className="text-neon-blue hover:underline font-medium"
                >
                  Staff portal
                </Link>
              </p>
              <p className="text-muted-foreground">
                Member access?{" "}
                <Link
                  to="/login"
                  className="text-neon-blue hover:underline font-medium"
                >
                  Member login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury pattern */}
      <style>{`
        .bg-luxury-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(208, 185, 252, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(131, 140, 229, 0.1) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
};

export default CEOLogin;
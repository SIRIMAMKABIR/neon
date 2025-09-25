import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ConstellationInput from "@/components/ConstellationInput";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate staff login
    setTimeout(() => {
      navigate("/staff/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative">
      <NavBar />
      
      {/* Clean professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-canvas-dark via-canvas-surface to-canvas-elevated">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative z-10 pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            
            {/* Glass Control Desk */}
            <div className="glass-strong p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-neon-blue rounded-full animate-glow"></div>
                </div>
                <h1 className="text-3xl font-headline font-bold text-neon mb-2">
                  Staff Access
                </h1>
                <p className="text-muted-foreground">
                  Neon Tech Operations Portal
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Staff Email
                  </label>
                  <ConstellationInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="staff@neontech.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Access Code
                  </label>
                  <ConstellationInput
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your access code"
                    className="w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-neon w-full py-4"
                  disabled={!email || !password}
                >
                  Access Portal
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-canvas-elevated/50 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  This portal is restricted to authorized Neon Tech staff members only. 
                  All access attempts are logged and monitored.
                </p>
              </div>
            </div>

            {/* Back to Member Login */}
            <div className="text-center mt-8">
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

      {/* Subtle background grid */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default StaffLogin;
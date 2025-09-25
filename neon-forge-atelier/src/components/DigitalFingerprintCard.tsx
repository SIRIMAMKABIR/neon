import { useState } from "react";
import { CreditCard, Shield, Award, Calendar, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface DigitalFingerprintCardProps {
  userName: string;
  fingerprintNumber: string;
  planLevel: "Free" | "Pro" | "Enterprise";
  dateCreated: string;
  badges: string[];
  verificationCode?: string;
}

const DigitalFingerprintCard = ({
  userName,
  fingerprintNumber,
  planLevel,
  dateCreated,
  badges,
  verificationCode = "NTC-8849-VX"
}: DigitalFingerprintCardProps) => {
  const [showVerification, setShowVerification] = useState(false);

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(fingerprintNumber);
    toast("Fingerprint ID copied to clipboard");
  };

  const planColors = {
    Free: "from-canvas-elevated to-canvas-surface",
    Pro: "from-neon-blue/20 to-luxury-purple/20",
    Enterprise: "from-luxury-purple/30 to-luxury-lavender/20"
  };

  const planGlow = {
    Free: "shadow-lg",
    Pro: "shadow-neon-blue/20 shadow-2xl",
    Enterprise: "shadow-luxury-purple/30 shadow-2xl"
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Digital Fingerprint Card */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${planColors[planLevel]} ${planGlow[planLevel]} border border-primary/20 p-6 backdrop-blur-sm`}>
        {/* Neon Tech Branding */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-neon-blue" />
            <span className="font-headline font-bold text-neon text-sm">NEON TECH</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            EST. 2025
          </div>
        </div>

        {/* User Name */}
        <div className="mb-4">
          <h2 className="text-xl font-headline font-bold text-foreground mb-1">
            {userName}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Digital Creator</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              planLevel === "Free" ? "bg-canvas-elevated text-muted-foreground" :
              planLevel === "Pro" ? "bg-neon-blue/20 text-neon-blue" :
              "bg-luxury-purple/20 text-luxury-purple"
            }`}>
              {planLevel}
            </div>
          </div>
        </div>

        {/* Fingerprint Number */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Fingerprint ID
            </span>
            <button
              onClick={handleCopyFingerprint}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Copy className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <div className="text-lg font-mono text-foreground tracking-wider mt-1">
            {fingerprintNumber}
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Achievements
            </div>
            <div className="flex flex-wrap gap-1">
              {badges.slice(0, 3).map((badge, index) => (
                <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-luxury-purple/10 rounded-full">
                  <Award className="w-3 h-3 text-luxury-periwinkle" />
                  <span className="text-xs text-luxury-periwinkle">{badge}</span>
                </div>
              ))}
              {badges.length > 3 && (
                <div className="px-2 py-1 bg-white/5 rounded-full">
                  <span className="text-xs text-muted-foreground">+{badges.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Date Created */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Member since {dateCreated}
            </span>
          </div>

          {/* Verification Code (Staff/CEO Only) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVerification(!showVerification)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {showVerification ? (
                <EyeOff className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Eye className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
            {showVerification && (
              <span className="text-xs font-mono text-muted-foreground">
                {verificationCode}
              </span>
            )}
          </div>
        </div>

        {/* Security Hologram Effect */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 rounded-full blur-sm opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-luxury-lavender/30 to-luxury-periwinkle/30 rounded-full blur-sm opacity-40"></div>

        {/* Verification Shield */}
        <div className="absolute bottom-4 right-4">
          <Shield className="w-4 h-4 text-neon-blue/50" />
        </div>
      </div>
    </div>
  );
};

export default DigitalFingerprintCard;
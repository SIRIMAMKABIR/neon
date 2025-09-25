import { useState, useEffect } from "react";
import { 
  CreditCard, Shield, Award, Calendar, Copy, Eye, EyeOff,
  Fingerprint, Zap, Globe, Star, Crown, QrCode,
  Download, Share, Settings, Lock, Unlock
} from "lucide-react";
import { toast } from "sonner";

interface EnhancedDigitalFingerprintCardProps {
  userName: string;
  fingerprintNumber: string;
  planLevel: "Free" | "Pro" | "Enterprise";
  dateCreated: string;
  badges: string[];
  verificationCode?: string;
  totalSites?: number;
  totalVisitors?: number;
  membershipTier?: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  neonScore?: number;
  isActive?: boolean;
}

const EnhancedDigitalFingerprintCard = ({
  userName,
  fingerprintNumber,
  planLevel,
  dateCreated,
  badges,
  verificationCode = "NTC-8849-VX",
  totalSites = 0,
  totalVisitors = 0,
  membershipTier = "Bronze",
  neonScore = 750,
  isActive = true
}: EnhancedDigitalFingerprintCardProps) => {
  const [showVerification, setShowVerification] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(fingerprintNumber);
    toast("Digital Fingerprint ID copied to clipboard");
  };

  const handleShareCard = () => {
    const shareData = {
      title: `${userName} - Neon Tech Digital Fingerprint`,
      text: `Check out my digital fingerprint: ${fingerprintNumber}`,
      url: `https://neontech.com/fingerprint/${fingerprintNumber}`
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast("Fingerprint URL copied to clipboard");
    }
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

  const tierColors = {
    Bronze: "from-amber-600/20 to-amber-800/20",
    Silver: "from-gray-400/20 to-gray-600/20",
    Gold: "from-yellow-400/20 to-yellow-600/20",
    Platinum: "from-purple-400/20 to-purple-600/20",
    Diamond: "from-blue-400/20 to-cyan-400/20"
  };

  const getNeonScoreColor = (score: number) => {
    if (score >= 900) return "text-green-400";
    if (score >= 750) return "text-neon-blue";
    if (score >= 600) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Enhanced Digital Fingerprint Card */}
      <div 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${planColors[planLevel]} ${planGlow[planLevel]} border border-primary/20 p-6 backdrop-blur-sm transition-all duration-700 cursor-pointer ${
          cardFlipped ? "transform rotateY-180" : ""
        }`}
        onClick={() => setCardFlipped(!cardFlipped)}
      >
        {/* Card Front */}
        <div className={`transition-all duration-700 ${cardFlipped ? "opacity-0 absolute inset-0" : "opacity-100"}`}>
          {/* Neon Tech Branding */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Fingerprint className="w-5 h-5 text-neon-blue animate-pulse" />
              <span className="font-headline font-bold text-neon text-sm">NEON TECH</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></div>
              <div className="text-xs text-muted-foreground font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* User Identity */}
          <div className="mb-4">
            <h2 className="text-xl font-headline font-bold text-foreground mb-1">
              {userName}
            </h2>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-muted-foreground">Digital Creator</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                planLevel === "Free" ? "bg-canvas-elevated text-muted-foreground" :
                planLevel === "Pro" ? "bg-neon-blue/20 text-neon-blue" :
                "bg-luxury-purple/20 text-luxury-purple"
              }`}>
                {planLevel}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tierColors[membershipTier]} border border-primary/20`}>
                {membershipTier}
              </div>
            </div>
            
            {/* Neon Score */}
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-muted-foreground">Neon Score:</span>
              <span className={`font-bold ${getNeonScoreColor(neonScore)}`}>{neonScore}</span>
            </div>
          </div>

          {/* Fingerprint Number */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Digital Fingerprint ID
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyFingerprint();
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Copy className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQR(!showQR);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <QrCode className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="text-lg font-mono text-foreground tracking-wider mt-1">
              {fingerprintNumber}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-neon-blue">{totalSites}</div>
              <div className="text-xs text-muted-foreground">Sites Created</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-luxury-periwinkle">{totalVisitors.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Visitors</div>
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

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Member since {dateCreated}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVerification(!showVerification);
                }}
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
        </div>

        {/* Card Back */}
        <div className={`transition-all duration-700 ${cardFlipped ? "opacity-100" : "opacity-0 absolute inset-0"} p-6`}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-headline font-bold text-neon">Digital Identity</h3>
                <Crown className="w-6 h-6 text-luxury-lavender" />
              </div>

              {/* QR Code Area */}
              <div className="bg-white/10 rounded-lg p-4 mb-4 text-center">
                <QrCode className="w-16 h-16 text-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Scan to view profile</p>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security Level:</span>
                  <span className="text-green-400 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Enterprise
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Access:</span>
                  <span className="text-neon-blue">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Activity:</span>
                  <span className="text-foreground">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareCard();
                }}
                className="btn-glass text-xs py-2"
              >
                <Share className="w-3 h-3 mr-1" />
                Share
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast("Settings opened");
                }}
                className="btn-glass text-xs py-2"
              >
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Security Hologram Effects */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 rounded-full blur-sm opacity-50 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-luxury-lavender/30 to-luxury-periwinkle/30 rounded-full blur-sm opacity-40 animate-pulse"></div>

        {/* Verification Shield */}
        <div className="absolute bottom-4 right-4">
          <Shield className="w-4 h-4 text-neon-blue/50" />
        </div>

        {/* Premium Glow Effect */}
        {planLevel !== "Free" && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent animate-shimmer pointer-events-none"></div>
        )}
      </div>

      {/* Card Actions */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={handleShareCard}
          className="btn-glass text-sm px-4 py-2"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </button>
        <button
          onClick={() => toast("Downloading digital fingerprint...")}
          className="btn-glass text-sm px-4 py-2"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};

export default EnhancedDigitalFingerprintCard;
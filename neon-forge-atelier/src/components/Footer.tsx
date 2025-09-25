import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong border-t border-primary/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-bold text-neon">NEON TECH</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Digital fingerprints built for velocity. Luxury design meets futuristic technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <div className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <div className="space-y-2">
              {[
                "Identity & Soul",
                "Digital Flagships",
                "Bespoke Instruments",
                "Luxury Consulting",
              ].map((service) => (
                <div key={service} className="text-muted-foreground text-sm">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Access</h4>
            <div className="space-y-2">
              <Link
                to="/register"
                className="block text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
              >
                Member Registration
              </Link>
              <Link
                to="/login"
                className="block text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
              >
                Member Login
              </Link>
              <Link
                to="/login/staff"
                className="block text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
              >
                Staff Access
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Neon Tech. Digital fingerprints that matter.
            </div>
            <div className="text-xs text-muted-foreground/60">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
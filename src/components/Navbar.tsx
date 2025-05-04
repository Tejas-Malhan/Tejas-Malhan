
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-4 px-6 lg:px-12",
        isScrolled ? "bg-royal/90 backdrop-blur-md royal-shadow" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-clash text-2xl font-bold text-gradient-gold">TM</span>
          <span className="hidden md:block font-clash font-semibold text-white">Tejas Malhan</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/projects" label="Projects" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/contact" label="Contact" className="royal-border px-6 py-2 rounded-full hover:bg-royal-gold/10 transition-all" withoutUnderline />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-royal z-40 pt-24 px-6 transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
          <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/projects" label="Projects" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/services" label="Services" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} className="royal-border px-8 py-3 rounded-full" />
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  withoutUnderline?: boolean;
}

const NavLink = ({ to, label, className, withoutUnderline }: NavLinkProps) => (
  <Link 
    to={to} 
    className={cn(
      "relative text-sm font-medium text-white/80 hover:text-white transition-colors",
      !withoutUnderline && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
      !withoutUnderline && "after:scale-x-0 after:bg-royal-gold after:origin-bottom-right after:transition-transform",
      !withoutUnderline && "hover:after:scale-x-100 hover:after:origin-bottom-left",
      className
    )}
  >
    {label}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick, className }: MobileNavLinkProps) => (
  <Link 
    to={to} 
    className={cn("text-xl font-medium text-white tracking-wide", className)}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;

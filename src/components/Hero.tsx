
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      const intensity = 20; // Adjust this for more/less movement
      const moveX = (x - 0.5) * intensity;
      const moveY = (y - 0.5) * intensity;
      
      heroRef.current.style.setProperty('--move-x', `${moveX}px`);
      heroRef.current.style.setProperty('--move-y', `${moveY}px`);
      
      // Also animate orbs with different intensity
      const orbs = heroRef.current.querySelectorAll('.hero-orb');
      orbs.forEach((orb: Element, index) => {
        const orbEl = orb as HTMLElement;
        const orbIntensity = 30 + (index * 10);
        const orbMoveX = (x - 0.5) * orbIntensity;
        const orbMoveY = (y - 0.5) * orbIntensity;
        orbEl.style.transform = `translate(${orbMoveX}px, ${orbMoveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center hero-pattern py-32 overflow-hidden"
    >
      {/* Enhanced Gradient Orbs with animation */}
      <div className="hero-orb absolute -top-32 -left-32 w-96 h-96 bg-royal-gold/20 rounded-full blur-[80px] opacity-50 transition-transform duration-300" />
      <div className="hero-orb absolute top-1/4 -right-32 w-96 h-96 bg-royal-blue/20 rounded-full blur-[100px] opacity-40 transition-transform duration-300" />
      <div className="hero-orb absolute bottom-1/4 left-1/3 w-64 h-64 bg-royal-purple/10 rounded-full blur-[120px] opacity-30 transition-transform duration-300" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 relative">
              <span className="text-gradient-gold inline-block transform hover:scale-105 transition-transform duration-300">Digital Excellence</span>
              <br />
              <span className="text-white">With a Royal Touch</span>
              <div className="absolute -right-8 top-0 w-16 h-16 border-t-2 border-r-2 border-royal-gold opacity-60" style={{transform: 'translate(var(--move-x, 0), var(--move-y, 0))'}} />
              <div className="absolute -left-8 bottom-0 w-16 h-16 border-b-2 border-l-2 border-royal-gold opacity-60" style={{transform: 'translate(calc(var(--move-x, 0) * -1), calc(var(--move-y, 0) * -1))'}} />
            </h1>
          </div>
          
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              Crafting premium website development, graphic design, social media management,
              and advertising solutions that elevate your brand to elite status.
            </p>
          </div>
          
          <div className="animate-fade-in opacity-0 flex flex-col md:flex-row justify-center gap-6" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all transform hover:-translate-y-1"
            >
              Start a Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 bg-transparent royal-border text-white rounded-full hover:bg-royal-gold/10 transition-all transform hover:-translate-y-1"
            >
              Explore Work
            </Link>
          </div>
          
          <div className="animate-fade-in opacity-0 mt-16" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
            <p className="text-white/60 font-medium mb-4">Trusted by</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-white/40 font-clash font-semibold text-xl hover:text-gradient-gold transition-all duration-300 transform hover:scale-105">
                Beads by Ruchika
              </div>
              <div className="text-white/40 font-clash font-semibold text-xl hover:text-gradient-gold transition-all duration-300 transform hover:scale-105">
                Nevya Malhan
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation */}
      <button 
        onClick={scrollToProjects}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
        aria-label="Scroll to projects"
      >
        <div className="p-3 bg-royal-gold/10 rounded-full group-hover:bg-royal-gold/30 transition-all duration-300">
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
            className="text-royal-gold"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default Hero;

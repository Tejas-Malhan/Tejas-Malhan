
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 bg-royal-secondary/80">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="font-clash text-2xl font-bold text-gradient-gold">TM</span>
              <span className="font-clash font-semibold text-white">Tejas Malhan</span>
            </Link>
            <p className="text-white/60 mb-6">
              Crafting premium digital experiences that elevate brands to elite status.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-royal-gold/10 rounded-full text-royal-gold hover:bg-royal-gold hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="p-2 bg-royal-gold/10 rounded-full text-royal-gold hover:bg-royal-gold hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="p-2 bg-royal-gold/10 rounded-full text-royal-gold hover:bg-royal-gold hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-royal-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/70 hover:text-royal-gold transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-royal-gold transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-royal-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-white/70 hover:text-royal-gold transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-royal-gold transition-colors">Graphic Design</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-royal-gold transition-colors">Social Media Management</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-royal-gold transition-colors">Advertising</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Tejas Malhan. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="https://www.termsfeed.com/live/62ffeb97-37f5-49aa-9093-1418f70bed5f" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://www.termsfeed.com/live/62ffeb97-37f5-49aa-9093-1418f70bed5f" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

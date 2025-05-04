
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Web Development",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    description: "Custom websites and web applications that perform flawlessly and look stunning.",
    features: [
      "Responsive design",
      "E-commerce functionality",
      "Content management systems",
      "Performance optimization"
    ]
  },
  {
    id: 2,
    title: "Graphic Design",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    ),
    description: "Visually striking designs that communicate your brand's unique value and identity.",
    features: [
      "Brand identity creation",
      "Logo design",
      "Marketing materials",
      "UI/UX design"
    ]
  },
  {
    id: 3,
    title: "Social Media Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    description: "Strategic content creation and community management that builds engaged audiences.",
    features: [
      "Content calendar planning",
      "Community engagement",
      "Analytics reporting",
      "Growth strategies"
    ]
  },
  {
    id: 4,
    title: "Advertising",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
      </svg>
    ),
    description: "Results-driven ad campaigns that maximize your return on marketing investment.",
    features: [
      "Paid social campaigns",
      "Google Ads management",
      "Remarketing strategies",
      "Conversion optimization"
    ]
  }
];

const Services = () => {
  const [activeServiceId, setActiveServiceId] = useState<number>(1);
  const navigate = useNavigate();

  const handleServiceInquiry = (serviceTitle: string) => {
    // Navigate to contact page with service pre-selected
    navigate(`/contact?subject=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-royal-blue/10 rounded-full blur-[80px] opacity-60" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">Crafting Digital Excellence</h2>
          <p className="text-white/60">
            Comprehensive digital services designed to elevate your brand with a premium touch and measurable results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Service tabs */}
          <div className="space-y-6">
            {servicesData.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={cn(
                  "w-full text-left p-6 rounded-lg transition-all duration-300",
                  activeServiceId === service.id 
                    ? "bg-royal-gold/10 royal-border" 
                    : "hover:bg-royal-secondary"
                )}
              >
                <div className="flex items-center">
                  <div 
                    className={cn(
                      "p-3 rounded-full mr-4 transition-colors",
                      activeServiceId === service.id 
                        ? "text-royal-gold bg-royal-gold/10" 
                        : "text-white/80 bg-royal-secondary/80"
                    )}
                  >
                    {service.icon}
                  </div>
                  <h3 
                    className={cn(
                      "text-xl font-bold transition-colors",
                      activeServiceId === service.id ? "text-royal-gold" : "text-white"
                    )}
                  >
                    {service.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
          
          {/* Service details */}
          {servicesData.filter(service => service.id === activeServiceId).map((service) => (
            <div 
              key={service.id}
              className="royal-card animate-fade-in"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/70 mb-6">{service.description}</p>
              
              <h4 className="text-royal-gold font-medium mb-4">What you get:</h4>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-royal-gold mr-3"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                <button 
                  onClick={() => handleServiceInquiry(service.title)}
                  className="inline-block px-6 py-3 bg-royal-gold text-black font-medium rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all"
                >
                  Discuss Your Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

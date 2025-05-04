
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  features: string[];
  process: {
    step: string;
    description: string;
  }[];
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
    description: "Custom websites and web applications that perform flawlessly and look stunning. From responsive design to e-commerce solutions, I create digital experiences that engage visitors and drive conversions.",
    features: [
      "Custom website design and development",
      "E-commerce solutions",
      "Content management systems",
      "Web application development",
      "Landing page optimization",
      "Website performance enhancement",
      "Responsive design for all devices",
      "SEO-friendly structure"
    ],
    process: [
      {
        step: "Discovery",
        description: "In-depth analysis of your business goals, target audience, and technical requirements."
      },
      {
        step: "Planning & Design",
        description: "Creating wireframes, prototypes, and visual designs aligned with your brand identity."
      },
      {
        step: "Development",
        description: "Building your website with clean, efficient code and integrated functionality."
      },
      {
        step: "Testing & Launch",
        description: "Rigorous testing across devices and browsers before going live."
      },
      {
        step: "Support & Growth",
        description: "Ongoing maintenance, analytics, and iterative improvements."
      }
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
    description: "Visually striking designs that communicate your brand's unique value and identity. Creating visual assets that resonate with your audience and stand out in a crowded marketplace.",
    features: [
      "Brand identity & logo design",
      "Marketing collateral design",
      "Social media graphics",
      "UI/UX design",
      "Packaging design",
      "Print materials",
      "Presentation design",
      "Digital illustrations"
    ],
    process: [
      {
        step: "Research",
        description: "Understanding your brand, competitors, and visual preferences."
      },
      {
        step: "Concept Development",
        description: "Creating initial concepts that align with your brand voice."
      },
      {
        step: "Refinement",
        description: "Iterating based on feedback to perfect the design direction."
      },
      {
        step: "Finalization",
        description: "Polishing the designs and preparing final deliverables in all required formats."
      },
      {
        step: "Implementation",
        description: "Guidance on how to effectively use the new designs across channels."
      }
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
    description: "Strategic content creation and community management that builds engaged audiences. Growing your social presence with targeted content that resonates with your ideal customers and drives meaningful engagement.",
    features: [
      "Social media strategy development",
      "Content calendar planning",
      "Content creation & curation",
      "Community management & engagement",
      "Analytics & performance reporting",
      "Platform-specific optimization",
      "Hashtag research & implementation",
      "Social media audits"
    ],
    process: [
      {
        step: "Analysis",
        description: "Evaluating your current social presence and identifying opportunities."
      },
      {
        step: "Strategy Development",
        description: "Creating a customized roadmap for your social media success."
      },
      {
        step: "Content Planning",
        description: "Developing a content calendar that aligns with your business objectives."
      },
      {
        step: "Implementation",
        description: "Managing posts, engagement, and community building activities."
      },
      {
        step: "Measurement & Optimization",
        description: "Tracking KPIs and refining strategy based on performance data."
      }
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
    description: "Results-driven ad campaigns that maximize your return on marketing investment. Creating and managing paid campaigns across digital platforms to reach your target audience and achieve specific business goals.",
    features: [
      "Paid social media advertising",
      "Google Ads management",
      "Display advertising",
      "Remarketing campaigns",
      "Video advertising",
      "A/B testing & optimization",
      "Audience targeting & segmentation",
      "Conversion tracking & reporting"
    ],
    process: [
      {
        step: "Research & Planning",
        description: "Identifying target audiences, platforms, and campaign objectives."
      },
      {
        step: "Campaign Setup",
        description: "Creating optimized campaign structures, ad creative, and landing pages."
      },
      {
        step: "Launch & Monitor",
        description: "Activating campaigns and closely monitoring initial performance."
      },
      {
        step: "Optimization",
        description: "Continuous refinement based on data to improve results and ROI."
      },
      {
        step: "Analysis & Reporting",
        description: "Comprehensive reporting on performance metrics and strategic recommendations."
      }
    ]
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleServiceInquiry = (serviceTitle: string) => {
    navigate(`/contact?subject=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="min-h-screen bg-royal text-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6 text-white">Premium Digital Solutions</h1>
            <p className="text-white/70">
              From stunning websites to strategic social media management, I provide comprehensive digital services
              that elevate your brand and drive tangible results.
            </p>
          </div>
          
          {/* Services List */}
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <div 
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div>
                  <div className="flex items-center mb-6">
                    <div className="p-4 rounded-full bg-royal-gold/10 text-royal-gold mr-4">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                  </div>
                  
                  <p className="text-white/70 mb-8 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">What's Included:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
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
                  
                  <button
                    onClick={() => handleServiceInquiry(service.title)}
                    className="px-6 py-3 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-medium rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all inline-block"
                  >
                    Inquire About {service.title}
                  </button>
                </div>
                
                <div className="royal-card">
                  <h3 className="text-xl font-bold mb-6">My Process</h3>
                  <div className="space-y-6">
                    {service.process.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex">
                        <div className="mr-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-royal-gold text-black font-bold">
                            {stepIndex + 1}
                          </div>
                          {stepIndex < service.process.length - 1 && (
                            <div className="h-full w-px bg-royal-gold/30 mx-auto my-2"></div>
                          )}
                        </div>
                        <div className="pt-1 pb-6">
                          <h4 className="font-bold text-lg text-royal-gold mb-1">{step.step}</h4>
                          <p className="text-white/70">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70 max-w-3xl mx-auto">
                Everything you need to know about working together on your next digital project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="royal-card">
                <h3 className="text-xl font-bold mb-4">What is your typical project timeline?</h3>
                <p className="text-white/70">
                  Project timelines vary based on scope and complexity. A typical website might take 4-6 weeks, while a comprehensive branding project could take 6-8 weeks. During our initial consultation, I'll provide a customized timeline for your specific needs.
                </p>
              </div>
              
              <div className="royal-card">
                <h3 className="text-xl font-bold mb-4">How do you price your services?</h3>
                <p className="text-white/70">
                  My pricing is project-based and depends on the scope, complexity, and timeline of your specific requirements. I provide detailed proposals after our initial consultation to ensure transparency and value for your investment.
                </p>
              </div>
              
              <div className="royal-card">
                <h3 className="text-xl font-bold mb-4">Do you offer ongoing support?</h3>
                <p className="text-white/70">
                  Yes, I offer various maintenance and support packages to keep your digital assets performing optimally. These range from basic updates to comprehensive growth strategies, depending on your needs.
                </p>
              </div>
              
              <div className="royal-card">
                <h3 className="text-xl font-bold mb-4">What is your design process?</h3>
                <p className="text-white/70">
                  My design process includes discovery, concept development, refinement, and implementation phases. I collaborate closely with clients throughout the process, incorporating feedback at each stage to ensure the final product meets and exceeds expectations.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-24 p-12 rounded-xl relative overflow-hidden animated-border">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/20 to-royal-blue/20 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Digital Presence?</h2>
              <p className="text-white/80 mb-8 max-w-3xl mx-auto">
                Let's discuss how my services can help you achieve your business goals and stand out in today's competitive digital landscape.
              </p>
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all inline-block"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;

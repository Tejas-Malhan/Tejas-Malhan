
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Project interface (matches the one in admin)
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  client?: string;
  year?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  testimonial?: {
    quote: string;
    name: string;
    position: string;
  };
}

// Default project data as fallback
const defaultProjectsData: Record<string, Project> = {
  "1": {
    id: 1,
    title: "Luxury E-commerce",
    category: "Web Development",
    client: "StyleElegance",
    year: "2023",
    description: "Premium online shopping experience for high-end fashion brand.",
    challenge: "Create a high-performance e-commerce platform that conveys luxury while maintaining excellent performance and conversion rates.",
    solution: "Developed a custom headless commerce solution with Next.js and Shopify, focusing on premium animations, product visualization, and a seamless checkout flow.",
    images: [
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&q=80"
    ],
    technologies: ["React", "Next.js", "Shopify", "Tailwind CSS", "Framer Motion"],
    testimonial: {
      quote: "The website Tejas created perfectly captures our brand's essence of luxury and exclusivity. The shopping experience is flawless.",
      name: "Aria Patel",
      position: "Marketing Director, StyleElegance"
    }
  },
  "2": {
    id: 2,
    title: "Corporate Rebrand",
    category: "Graphic Design",
    client: "FinSecure Banking",
    year: "2023",
    description: "Complete visual identity overhaul for a financial institution.",
    challenge: "Modernize the brand identity of a 30-year-old financial institution while maintaining trust and recognition among existing customers.",
    solution: "Created a comprehensive brand system including logo, color palette, typography, iconography, and brand guidelines that balanced tradition with contemporary design principles.",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80"
    ],
    technologies: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "InDesign"],
    testimonial: {
      quote: "Our rebranding has been met with overwhelming positive feedback from both customers and employees. Tejas understood exactly what we needed.",
      name: "Vikram Mehta",
      position: "CEO, FinSecure Banking"
    }
  },
  "3": {
    id: 3,
    title: "Social Campaign",
    category: "Social Media",
    client: "EcoLiving",
    year: "2022",
    description: "Strategic campaign that increased engagement by 200%.",
    challenge: "Build brand awareness and community engagement for a new sustainable living product line with limited marketing budget.",
    solution: "Developed a comprehensive social media strategy focused on user-generated content, influencer partnerships, and educational content about sustainability.",
    images: [
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80"
    ],
    technologies: ["Instagram", "Facebook", "TikTok", "Canva", "Later", "Hootsuite"],
    testimonial: {
      quote: "The social campaign exceeded all our expectations. Our follower count tripled and sales increased by 150% during the campaign period.",
      name: "Nisha Sharma",
      position: "Founder, EcoLiving"
    }
  },
  "4": {
    id: 4,
    title: "Product Launch Ads",
    category: "Advertising",
    client: "TechVision",
    year: "2023",
    description: "Multi-channel advertising campaign for new product line.",
    challenge: "Generate pre-orders and excitement for a new tech product launch in a highly competitive market.",
    solution: "Created a coordinated advertising campaign across search, display, social, and video platforms with consistent messaging and strong calls-to-action.",
    images: [
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
    ],
    technologies: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads", "Adobe Premiere", "After Effects"],
  }
};

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    // Try to load project from localStorage first
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      // Find the project with matching id (convert to string for comparison)
      const foundProject = parsedProjects.find(
        (p: Project) => p.id.toString() === id.toString()
      );
      
      if (foundProject) {
        // If we have images property, use it, otherwise create one from single image
        if (!foundProject.images) {
          foundProject.images = [foundProject.image, foundProject.image];
        }
        setProject(foundProject);
        setLoading(false);
        return;
      }
    }
    
    // Fallback to default projects if not found in localStorage
    const defaultProject = defaultProjectsData[id];
    if (defaultProject) {
      setProject(defaultProject);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-royal text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Loading...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-royal text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
            <p className="text-white/60 mb-6">The project you are looking for does not exist.</p>
            <Link 
              to="/projects" 
              className="px-6 py-3 bg-royal-gold text-black font-medium rounded-full"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal text-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
              <div>
                <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4 text-white">
                  {project.title}
                </h1>
              </div>
              
              <Link 
                to="/projects" 
                className="flex items-center gap-2 text-white/80 hover:text-royal-gold transition-colors mt-4 md:mt-0"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to all projects</span>
              </Link>
            </div>
            
            <div className="h-96 md:h-[500px] w-full rounded-xl overflow-hidden animated-border">
              <img 
                src={project.images ? project.images[0] : project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">About the Project</h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">{project.description}</p>
              
              {project.challenge && (
                <>
                  <h3 className="text-xl font-bold mb-4 text-royal-gold">The Challenge</h3>
                  <p className="text-white/70 mb-8">{project.challenge}</p>
                </>
              )}
              
              {project.solution && (
                <>
                  <h3 className="text-xl font-bold mb-4 text-royal-gold">The Solution</h3>
                  <p className="text-white/70">{project.solution}</p>
                </>
              )}
            </div>
            
            <div className="royal-card h-fit">
              <h3 className="text-xl font-bold mb-6">Project Details</h3>
              
              <div className="space-y-6">
                {project.client && (
                  <div>
                    <h4 className="text-royal-gold font-medium mb-2">Client</h4>
                    <p className="text-white">{project.client}</p>
                  </div>
                )}
                
                {project.year && (
                  <div>
                    <h4 className="text-royal-gold font-medium mb-2">Year</h4>
                    <p className="text-white">{project.year}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-royal-gold font-medium mb-2">Category</h4>
                  <p className="text-white">{project.category}</p>
                </div>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h4 className="text-royal-gold font-medium mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-royal-gold/10 text-royal-gold rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Project Gallery - only show if we have multiple images */}
          {project.images && project.images.length > 1 && (
            <div className="mb-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden animated-border">
                    <img 
                      src={image} 
                      alt={`${project.title} ${index + 2}`} 
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Testimonial */}
          {project.testimonial && (
            <div className="mb-20">
              <div className="royal-card p-8 md:p-12">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-royal-gold/30 mb-6"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
                
                <p className="text-xl md:text-2xl text-white font-medium italic mb-8 leading-relaxed">
                  "{project.testimonial.quote}"
                </p>
                
                <div>
                  <p className="font-bold text-white">{project.testimonial.name}</p>
                  <p className="text-white/60">{project.testimonial.position}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-white/70 mb-8 max-w-3xl mx-auto">
              Let's create something exceptional together. Get in touch to discuss your needs and how I can help.
            </p>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all inline-block"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectPage;

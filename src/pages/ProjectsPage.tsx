
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import BookAppointmentButton from '@/components/BookAppointmentButton';
import { Badge } from '@/components/ui/badge';

// Sample project data structure
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
}

// Default projects as fallback
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Luxury E-commerce",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80",
    description: "Premium online shopping experience for high-end fashion brand.",
    featured: true
  },
  {
    id: 2,
    title: "Corporate Rebrand",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
    description: "Complete visual identity overhaul for a financial institution.",
    featured: true
  },
  {
    id: 3,
    title: "Social Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&q=80",
    description: "Strategic campaign that increased engagement by 200%.",
    featured: true
  },
  {
    id: 4,
    title: "Product Launch Ads",
    category: "Advertising",
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80",
    description: "Multi-channel advertising campaign for new product line.",
    featured: true
  },
  {
    id: 5,
    title: "Restaurant Website",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    description: "Responsive website with online reservation system for a fine dining restaurant."
  },
  {
    id: 6,
    title: "Mobile App UI",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    description: "User interface design for a health and wellness tracking mobile application."
  },
  {
    id: 7,
    title: "Video Marketing",
    category: "Advertising",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
    description: "Series of promotional videos for a tech startup's product launch."
  },
  {
    id: 8,
    title: "Influencer Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
    description: "Coordinated influencer partnerships that drove significant brand engagement."
  }
];

const ProjectsPage = () => {
  const [projectsData, setProjectsData] = useState<Project[]>(defaultProjects);
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web Development", "Graphic Design", "Social Media", "Advertising"];
  
  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjectsData(parsedProjects);
    }
  }, []);
  
  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-royal text-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">Portfolio</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6 text-white">My Projects</h1>
            <p className="text-white/70">
              Explore my portfolio of premium digital solutions across web development, graphic design, social media, and advertising.
            </p>
          </div>
          
          {/* Categories Filter */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={cn(
                  "px-6 py-2 rounded-full transition-all",
                  filter === category 
                    ? "bg-royal-gold text-black font-medium" 
                    : "border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                )}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* No Projects Found */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-white/70 mb-4">No projects found for this category.</p>
              <button
                onClick={() => setFilter("All")}
                className="px-6 py-2 border border-royal-gold text-royal-gold rounded-full hover:bg-royal-gold/10 transition-all"
              >
                View all projects
              </button>
            </div>
          )}
          
          {/* CTA Section */}
          <div className="mt-24 royal-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Create Something Amazing Together</h2>
            <p className="text-white/70 mb-8 max-w-3xl mx-auto">
              Have a project in mind? I'm ready to help bring your vision to life with premium design and functionality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all transform hover:-translate-y-1"
              >
                Contact Me
              </Link>
              <BookAppointmentButton variant="secondary" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      to={`/projects/${project.id}`}
      className="group relative overflow-hidden rounded-lg bg-[#1a1f27] block"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {project.featured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-royal-gold text-black text-xs font-bold rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-6">
        <span className="text-royal-gold text-sm font-medium">{project.category}</span>
        <h3 className="text-2xl font-bold text-white mt-1 mb-3">{project.title}</h3>
        <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="inline-flex items-center gap-2 text-white group-hover:text-royal-gold transition-colors">
          <span>View details</span>
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
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsPage;

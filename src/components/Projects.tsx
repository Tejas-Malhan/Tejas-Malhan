
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { toast } from '@/hooks/use-toast';

const Projects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const categories = ["All", "Web Development", "Graphic Design", "Social Media", "Advertising"];
  
  // Load projects from Supabase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Process technologies from string to array if needed
        const processedData = data?.map(project => {
          const processedProject = {...project} as Project;
          if (typeof processedProject.technologies === 'string') {
            processedProject.technologies = processedProject.technologies
              ? processedProject.technologies
                  .split(',')
                  .map(tech => tech.trim())
                  .filter(tech => tech !== '')
              : [];
          }
          return processedProject;
        }) || [];

        setProjectsData(processedData);
        console.log("Loaded projects data:", processedData);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: `Failed to load projects: ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Filter projects based on selected category
  const filteredProjects = filter === "All" 
    ? projectsData.filter(project => project.featured) 
    : projectsData.filter(project => project.category === filter && project.featured);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute -top-40 right-0 w-96 h-96 bg-royal-gold/10 rounded-full blur-[120px] opacity-70" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">Featured Projects</h2>
            <p className="text-white/60 max-w-xl">
              A showcase of my finest work across web development, design, and digital marketing.
            </p>
          </div>
          
          <Link
            to="/projects"
            className="mt-6 md:mt-0 text-royal-gold flex items-center gap-2 hover:gap-3 transition-all group"
          >
            <span>View all projects</span>
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
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Categories Filter */}
        <div className="mb-12 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                "px-6 py-2 rounded-full whitespace-nowrap transition-all",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg bg-[#1a1f27] animate-pulse">
                <div className="h-56 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-white/60">
              No featured projects match the selected category. Try selecting a different category or mark projects as featured in the admin panel.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-[#1a1f27]">
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
        <p className="text-white/70 mb-4">{project.description}</p>
        
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 text-white group-hover:text-royal-gold transition-colors"
        >
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
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Projects;

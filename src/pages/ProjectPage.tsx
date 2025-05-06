
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { toast } from '@/hooks/use-toast';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Process technologies from string to array if needed
          let processedData = {...data} as Project;
          
          // Convert technologies to array if it's a string
          if (typeof processedData.technologies === 'string') {
            processedData.technologies = processedData.technologies
              ? processedData.technologies
                  .split(',')
                  .map(tech => tech.trim())
                  .filter(tech => tech !== '')
              : [];
          }
          
          setProject(processedData);
          console.log("Loaded project data:", processedData);
          
          // After loading the project, fetch related projects in the same category
          fetchRelatedProjects(processedData.category, processedData.id);
        }
      } catch (error: any) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: `Could not load project: ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    const fetchRelatedProjects = async (category: string, currentId: string) => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('category', category)
          .neq('id', currentId)
          .limit(3);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Process technologies from string to array for each project
          const processedData = data.map(item => {
            const project = {...item} as Project;
            if (typeof project.technologies === 'string') {
              project.technologies = project.technologies
                ? project.technologies
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(tech => tech !== '')
                : [];
            }
            return project;
          });
          
          setRelatedProjects(processedData);
          console.log("Loaded related projects:", processedData);
        }
      } catch (error: any) {
        console.error('Error fetching related projects:', error);
      }
    };
    
    fetchProject();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-royal text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-gold mx-auto mb-4"></div>
            <h2 className="text-3xl font-bold">Loading...</h2>
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

  // Prepare gallery images - either use the images array, fallback to the single image,
  // or provide an empty array
  const galleryImages = project.images && project.images.length > 0 
    ? [project.image, ...project.images] // Include the main image first
    : project.image ? [project.image] : [];

  const hasTestimonial = project?.testimonial_quote && project?.testimonial_name;
  
  // Ensure technologies is always an array
  const technologies = Array.isArray(project?.technologies) 
    ? project.technologies 
    : typeof project?.technologies === 'string' && project.technologies
      ? project.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
      : [];

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
            
            {/* Project Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="mb-8">
                <Carousel className="relative">
                  <CarouselContent>
                    {galleryImages.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-full">
                        <div className="h-96 md:h-[500px] w-full rounded-xl overflow-hidden animated-border">
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {galleryImages.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 bg-royal-gold/60 hover:bg-royal-gold border-none text-white" />
                      <CarouselNext className="right-4 bg-royal-gold/60 hover:bg-royal-gold border-none text-white" />
                    </>
                  )}
                </Carousel>
                {galleryImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {galleryImages.map((_, index) => (
                      <button 
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-royal-gold' : 'bg-white/30'}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
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
                
                {technologies && technologies.length > 0 && (
                  <div>
                    <h4 className="text-royal-gold font-medium mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {technologies.map((tech, index) => (
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
          
          {/* Testimonial */}
          {hasTestimonial && (
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
                  "{project.testimonial_quote}"
                </p>
                
                <div>
                  <p className="font-bold text-white">{project.testimonial_name}</p>
                  <p className="text-white/60">{project.testimonial_position}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mb-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link 
                    to={`/projects/${relatedProject.id}`}
                    key={relatedProject.id}
                    className="group block relative overflow-hidden rounded-lg bg-[#1a1f27]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <span className="text-royal-gold text-sm font-medium">{relatedProject.category}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{relatedProject.title}</h3>
                      <p className="text-white/70 mb-4 line-clamp-2">{relatedProject.description}</p>
                      
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
                ))}
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

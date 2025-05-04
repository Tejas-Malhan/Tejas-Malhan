import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

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

// This would normally come from an API or database
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Luxury E-commerce",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80",
    description: "Premium online shopping experience for high-end fashion brand.",
    featured: true,
    client: "StyleElegance",
    year: "2023",
    challenge: "Create a high-performance e-commerce platform that conveys luxury while maintaining excellent performance and conversion rates.",
    solution: "Developed a custom headless commerce solution with Next.js and Shopify, focusing on premium animations, product visualization, and a seamless checkout flow.",
    technologies: ["React", "Next.js", "Shopify", "Tailwind CSS", "Framer Motion"],
    testimonial: {
      quote: "The website Tejas created perfectly captures our brand's essence of luxury and exclusivity. The shopping experience is flawless.",
      name: "Aria Patel",
      position: "Marketing Director, StyleElegance"
    }
  },
  {
    id: 2,
    title: "Corporate Rebrand",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
    description: "Complete visual identity overhaul for a financial institution.",
    featured: true,
    client: "FinSecure Banking",
    year: "2023",
    technologies: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "InDesign"],
    testimonial: {
      quote: "Our rebranding has been met with overwhelming positive feedback from both customers and employees. Tejas understood exactly what we needed.",
      name: "Vikram Mehta",
      position: "CEO, FinSecure Banking"
    }
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
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: 0,
    title: "",
    category: "",
    image: "",
    description: "",
    featured: false
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [technologies, setTechnologies] = useState<string>("");
  const [hasTestimonial, setHasTestimonial] = useState(false);

  const handleAddProject = () => {
    setCurrentProject({
      id: Date.now(),
      title: "",
      category: "Web Development",
      image: "",
      description: "",
      featured: false
    });
    setTechnologies("");
    setHasTestimonial(false);
    setShowAdvanced(false);
    setIsEditing(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject({...project});
    setTechnologies(project.technologies?.join(", ") || "");
    setHasTestimonial(!!project.testimonial);
    setShowAdvanced(!!project.client || !!project.technologies || !!project.testimonial);
    setIsEditing(true);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProject({...currentProject, [name]: value});
  };

  const handleFeaturedChange = (checked: boolean) => {
    setCurrentProject({...currentProject, featured: checked});
  };

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setCurrentProject({
      ...currentProject,
      testimonial: {
        ...currentProject.testimonial || { quote: "", name: "", position: "" },
        [name.replace('testimonial_', '')]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProject.title || !currentProject.category || !currentProject.image || !currentProject.description) {
      toast({
        title: "Error",
        description: "Title, category, image URL, and description are required.",
        variant: "destructive"
      });
      return;
    }
    
    // Process technologies if provided
    let updatedProject = {...currentProject};
    
    if (technologies.trim()) {
      updatedProject.technologies = technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
    }
    
    // Handle testimonial
    if (!hasTestimonial) {
      delete updatedProject.testimonial;
    }
    
    let updatedProjects;
    
    // If it's a new project
    if (!projects.find(project => project.id === currentProject.id)) {
      updatedProjects = [...projects, updatedProject];
      toast({
        title: "Project added",
        description: "The new project has been successfully added.",
      });
    } else {
      // If updating an existing project
      updatedProjects = projects.map(project => 
        project.id === currentProject.id ? updatedProject : project
      );
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
    }
    
    setProjects(updatedProjects);
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject({
      id: 0,
      title: "",
      category: "",
      image: "",
      description: "",
      featured: false
    });
  };

  return (
    <div>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Manage Projects</h3>
            <button 
              onClick={handleAddProject}
              className="px-4 py-2 bg-royal-gold/10 text-royal-gold rounded-lg hover:bg-royal-gold/20 transition-all flex items-center gap-2"
            >
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Project
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-royal-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Project</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Featured</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-royal divide-y divide-white/10">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-royal-secondary/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{project.title}</div>
                          <div className="text-sm text-white/60 truncate max-w-xs">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-royal-gold/10 text-royal-gold rounded-full">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.featured ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-500/10 text-gray-400 rounded-full">
                          Not Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="text-royal-gold hover:text-royal-gold_light mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/60">
                      No projects found. Add your first project.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {currentProject.id ? `Edit Project: ${currentProject.title}` : 'Add New Project'}
            </h3>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-royal-secondary border border-white/20 rounded-lg text-white hover:bg-royal-secondary/70 transition-all"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-white/70 mb-2">Project Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={currentProject.title}
                  onChange={handleInputChange}
                  className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                  placeholder="Enter project title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-white/70 mb-2">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={currentProject.category}
                  onChange={handleInputChange}
                  className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold appearance-none"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Advertising">Advertising</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-white/70 mb-2">Image URL *</label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={currentProject.image}
                  onChange={handleInputChange}
                  className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                  placeholder="Enter image URL"
                  required
                />
                {currentProject.image && (
                  <div className="mt-2 p-2 border border-white/10 rounded">
                    <p className="text-xs text-white/60 mb-2">Image Preview:</p>
                    <img src={currentProject.image} alt="Preview" className="h-40 object-cover rounded" />
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-white/70 mb-2">Description *</label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentProject.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                  placeholder="Enter project description"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={currentProject.featured}
                  onCheckedChange={handleFeaturedChange}
                />
                <label htmlFor="featured" className="text-white cursor-pointer">
                  Mark as Featured Project
                </label>
              </div>
            </div>
            
            {/* Toggle for advanced settings */}
            <div className="border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-royal-gold hover:text-royal-gold_light"
              >
                <span>{showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}</span>
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
                  className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Advanced settings */}
            {showAdvanced && (
              <div className="space-y-6 border border-white/10 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Project Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="client" className="block text-white/70 mb-2">Client</label>
                    <input
                      id="client"
                      name="client"
                      type="text"
                      value={currentProject.client || ""}
                      onChange={handleInputChange}
                      className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                      placeholder="Client name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="year" className="block text-white/70 mb-2">Year</label>
                    <input
                      id="year"
                      name="year"
                      type="text"
                      value={currentProject.year || ""}
                      onChange={handleInputChange}
                      className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                      placeholder="Project year"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="challenge" className="block text-white/70 mb-2">The Challenge</label>
                  <Textarea
                    id="challenge"
                    name="challenge"
                    value={currentProject.challenge || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                    placeholder="Describe the challenge of this project"
                  />
                </div>
                
                <div>
                  <label htmlFor="solution" className="block text-white/70 mb-2">The Solution</label>
                  <Textarea
                    id="solution"
                    name="solution"
                    value={currentProject.solution || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                    placeholder="Describe your solution"
                  />
                </div>
                
                <div>
                  <label htmlFor="technologies" className="block text-white/70 mb-2">Technologies</label>
                  <input
                    id="technologies"
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                    placeholder="Comma-separated list of technologies (e.g. React, Tailwind CSS, Node.js)"
                  />
                  <p className="text-xs text-white/60 mt-1">Enter technologies separated by commas</p>
                </div>
                
                {/* Testimonial Section */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="hasTestimonial"
                      checked={hasTestimonial}
                      onCheckedChange={setHasTestimonial}
                    />
                    <label htmlFor="hasTestimonial" className="text-white cursor-pointer">
                      Add Testimonial
                    </label>
                  </div>
                  
                  {hasTestimonial && (
                    <div className="space-y-4 p-4 border border-white/10 rounded-lg">
                      <div>
                        <label htmlFor="testimonial_quote" className="block text-white/70 mb-2">Testimonial Quote</label>
                        <Textarea
                          id="testimonial_quote"
                          name="testimonial_quote"
                          value={currentProject.testimonial?.quote || ""}
                          onChange={handleTestimonialChange}
                          rows={3}
                          className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                          placeholder="Enter client testimonial"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="testimonial_name" className="block text-white/70 mb-2">Client Name</label>
                          <input
                            id="testimonial_name"
                            name="testimonial_name"
                            type="text"
                            value={currentProject.testimonial?.name || ""}
                            onChange={handleTestimonialChange}
                            className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                            placeholder="Client name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="testimonial_position" className="block text-white/70 mb-2">Client Position</label>
                          <input
                            id="testimonial_position"
                            name="testimonial_position"
                            type="text"
                            value={currentProject.testimonial?.position || ""}
                            onChange={handleTestimonialChange}
                            className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                            placeholder="Client position"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all"
              >
                {currentProject.id ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;

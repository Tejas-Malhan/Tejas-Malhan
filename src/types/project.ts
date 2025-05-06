
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  client?: string | null;
  year?: number | null;
  challenge?: string | null;
  solution?: string | null;
  technologies?: string[] | null;
  testimonial_quote?: string | null;
  testimonial_name?: string | null;
  testimonial_position?: string | null;
  created_at?: string;
  updated_at?: string;
  images?: string[];
}

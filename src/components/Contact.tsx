import { useState, FormEvent } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const form = e.target as HTMLFormElement;
      form.action = "https://formsubmit.co/sanddune2209@gmail.com";
      form.method = "POST";
      
      const redirectInput = document.createElement("input");
      redirectInput.type = "hidden";
      redirectInput.name = "_next";
      redirectInput.value = window.location.href;
      form.appendChild(redirectInput);
      
      const honeypotInput = document.createElement("input");
      honeypotInput.type = "text";
      honeypotInput.name = "_honey";
      honeypotInput.style.display = "none";
      form.appendChild(honeypotInput);
      
      const captchaInput = document.createElement("input");
      captchaInput.type = "hidden";
      captchaInput.name = "_captcha";
      captchaInput.value = "false";
      form.appendChild(captchaInput);
      
      form.submit();
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitSuccess(true);
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-gold/10 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-blue/10 rounded-full blur-[120px] opacity-40" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-royal-gold uppercase tracking-wider text-sm font-medium">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">Start Your Project</h2>
          <p className="text-white/60">
            Ready to elevate your digital presence? Let's discuss how we can bring your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 royal-card h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-8">
              <ContactInfoItem
                icon={<PhoneIcon />}
                title="Phone"
                info="+91 99537 37018"
              />
              <ContactInfoItem
                icon={<EmailIcon />}
                title="Email"
                info="tejasmalhan@gmail.com"
              />
              <ContactInfoItem
                icon={<LocationIcon />}
                title="Location"
                info="New Delhi, India"
              />
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/10">
              <h4 className="text-white font-medium mb-4">Connect on Social</h4>
              <div className="flex space-x-4">
                <SocialLink href="#" icon={<LinkedInIcon />} />
                <SocialLink href="#" icon={<InstagramIcon />} />
                <SocialLink href="#" icon={<TwitterIcon />} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 royal-card">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            {submitSuccess ? (
              <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg text-white">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your phone number"
                  />
                  <div>
                    <label htmlFor="subject" className="block text-white/70 mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold appearance-none"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/70 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="text-red-500 bg-red-500/10 p-3 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <SubmitButton isSubmitting={isSubmitting} />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable components
const ContactInfoItem = ({ icon, title, info }: { icon: JSX.Element; title: string; info: string }) => (
  <div className="flex items-start">
    <div className="p-3 bg-royal-gold/10 rounded-full text-royal-gold mr-4">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-white/70">{info}</p>
    </div>
  </div>
);

const SocialLink = ({ href, icon }: { href: string; icon: JSX.Element }) => (
  <a href={href} className="p-3 bg-royal-gold/10 rounded-full text-royal-gold hover:bg-royal-gold hover:text-black transition-all">
    {icon}
  </a>
);

const InputField = ({ label, id, name, type = 'text', value, onChange, required = false, placeholder }: { 
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-white/70 mb-2">{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black px-8 py-4 font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all disabled:opacity-70 w-full md:w-auto"
  >
    <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
    {isSubmitting ? (
      <div className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      </div>
    ) : 'Send Message'}
  </button>
);

// Icons (same as in contactpage.tsx)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export default Contact;
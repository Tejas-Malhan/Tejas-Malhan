
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import BookAppointmentButton from '@/components/BookAppointmentButtonhome';

const Index = () => {
  return (
    <div className="min-h-screen bg-royal text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      
      {/* Appointment CTA Section */}
      <div className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-gold">Ready to Elevate Your Digital Presence?</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto text-lg">
            Let's discuss how we can transform your vision into a digital reality that truly stands out.
          </p>
          <div className="flex justify-center">
            <BookAppointmentButton variant="primary" className="scale-110" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

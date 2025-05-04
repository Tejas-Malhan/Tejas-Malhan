
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookAppointmentButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

const BookAppointmentButton = ({ 
  variant = 'primary',
  className 
}: BookAppointmentButtonProps) => {
  
  const handleButtonClick = () => {
    // Open Calendly directly in a new tab with the updated URL
    window.open('/contact', '_blank');
  };
  
  return (
    <button
      onClick={handleButtonClick}
      className={cn(
        'group relative overflow-hidden flex items-center gap-2 rounded-full transition-all duration-300',
        variant === 'primary' 
          ? 'bg-gradient-to-r from-royal-gold to-royal-gold_light text-black px-8 py-4 font-semibold hover:shadow-lg hover:shadow-royal-gold/20 scale-100 hover:scale-[1.03]' 
          : 'border border-royal-gold/40 text-royal-gold px-6 py-3 hover:border-royal-gold hover:bg-royal-gold/10',
        className
      )}
    >
      <Calendar className={cn(
        'w-5 h-5 transition-transform duration-300',
        variant === 'primary' ? 'text-black' : 'text-royal-gold'
      )} />
      <span>Book an Appointment</span>
      
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
      )}
    </button>
  );
};

export default BookAppointmentButton;

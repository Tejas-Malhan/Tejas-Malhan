
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("Tejas Malhan Portfolio");
  const [email, setEmail] = useState("tejasmalhan@gmail.com");
  const [phone, setPhone] = useState("+91 99537 37018");
  const [calendlyLink, setCalendlyLink] = useState("https://calendly.com/tejasmalhan2209/30min");
  const [saving, setSaving] = useState(false);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSiteName(settings.siteName || "Tejas Malhan Portfolio");
      setEmail(settings.email || "tejasmalhan@gmail.com");
      setPhone(settings.phone || "+91 99537 37018");
      setCalendlyLink(settings.calendlyLink || "https://calendly.com/tejasmalhan2209/30min");
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Save to localStorage
    const settings = {
      siteName,
      email,
      phone,
      calendlyLink
    };
    
    localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleResetPassword = () => {
    const currentPassword = prompt("Enter your current password:");
    if (!currentPassword) return;
    
    if (currentPassword === 'royal123') {
      const newPassword = prompt("Enter your new password:");
      if (!newPassword || newPassword.length < 6) {
        toast({
          title: "Password error",
          description: "Password must be at least 6 characters long.",
          variant: "destructive"
        });
        return;
      }
      
      // In a real app, we would update the password in the database
      // For now, we'll just show a success message
      localStorage.setItem('adminPassword', newPassword);
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "The current password is incorrect.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold">Site Settings</h3>
        <p className="text-white/60">Update your portfolio settings</p>
      </div>
      
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="siteName" className="block text-white/70 mb-2">Site Name</label>
            <input
              id="siteName"
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white/70 mb-2">Contact Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-white/70 mb-2">Contact Phone</label>
            <input
              id="phone"
              type="text"
              required = {true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
            />
          </div>
          
          <div>
            <label htmlFor="calendlyLink" className="block text-white/70 mb-2">Calendly Link</label>
            <input
              id="calendlyLink"
              type="text"
              value={calendlyLink}
              onChange={(e) => setCalendlyLink(e.target.value)}
              className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
            />
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 mt-8">
          <h4 className="text-lg font-medium mb-4">Security</h4>
          <button 
            type="button" 
            onClick={handleResetPassword}
            className="px-4 py-2 bg-royal-secondary border border-white/20 rounded-lg text-white hover:bg-royal-secondary/70 transition-all"
          >
            Change Password
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all disabled:opacity-70"
          >
            {saving ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

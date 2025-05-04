
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    
    // Simple authentication - in real app, use proper auth
    setTimeout(() => {
      if (username === 'admin' && password === 'royal123') {
        localStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid username or password');
      }
      setLoggingIn(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-royal text-white">
        <Navbar />
        
        <main className="pt-32 pb-24 px-4">
          <div className="container mx-auto max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Admin Login</h1>
              <p className="text-white/60 mt-2">Login to access your admin dashboard</p>
            </div>
            
            <div className="royal-card">
              <form onSubmit={handleLogin} className="space-y-6">
                {loginError && (
                  <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-white">
                    {loginError}
                  </div>
                )}
                
                <div>
                  <label htmlFor="username" className="block text-white/70 mb-2">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-white/70 mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-royal/80 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-royal-gold"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full px-6 py-3 bg-gradient-to-r from-royal-gold to-royal-gold_light text-black font-semibold rounded-full hover:shadow-lg hover:shadow-royal-gold/20 transition-all disabled:opacity-70"
                >
                  {loggingIn ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-royal text-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-white/60 mt-1">Manage your portfolio content</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-royal-secondary border border-white/20 rounded-lg text-white hover:bg-royal-secondary/70 transition-all"
            >
              Logout
            </button>
          </div>
          
          <div className="royal-card mb-8">
            <div className="flex border-b border-white/10 mb-6">
              <button
                className={`px-6 py-4 font-medium ${activeTab === 'projects' ? 'text-royal-gold border-b-2 border-royal-gold' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button
                className={`px-6 py-4 font-medium ${activeTab === 'settings' ? 'text-royal-gold border-b-2 border-royal-gold' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
            
            {activeTab === 'projects' ? <AdminProjects /> : <AdminSettings />}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;

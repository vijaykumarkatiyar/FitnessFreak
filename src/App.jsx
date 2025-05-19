import React, { useState, useEffect, useMemo } from 'react';
import { Users, DollarSign, Bell, Image as ImageIcon, PlusCircle, Edit2, Trash2, Send, Search, ChevronDown, ChevronUp, BarChart2, Calendar, Settings, LogOut, User, Shield, Sun, Moon, Menu as MenuIcon, X, UserCircle, Key, Eye, EyeOff, UserCheck } from 'lucide-react'; // UserX was not used, removed.

// --- Mock Data & Initial State ---
const initialClients = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', membershipType: 'Premium Annual', joinDate: '2023-01-15', feeAmount: 1200, paymentCycle: 'Annually', feeStatus: 'Paid', lastPaymentDate: '2024-01-10', nextDueDate: '2025-01-10', avatar: 'https://placehold.co/100x100/E0E0E0/333?text=JD', password: 'password123' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', membershipType: 'Basic Monthly', joinDate: '2023-03-01', feeAmount: 100, paymentCycle: 'Monthly', feeStatus: 'Pending', lastPaymentDate: '2024-04-01', nextDueDate: '2024-05-01', avatar: 'https://placehold.co/100x100/D0D0D0/333?text=JS', password: 'password123' },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', phone: '555-123-4567', membershipType: 'Premium Monthly', joinDate: '2024-02-20', feeAmount: 150, paymentCycle: 'Monthly', feeStatus: 'Paid', lastPaymentDate: '2024-04-20', nextDueDate: '2024-05-20', avatar: 'https://placehold.co/100x100/C0C0C0/333?text=MJ', password: 'password123' },
];

const adminCredentials = { email: 'admin@fitnessfreak.com', password: 'adminpassword', role: 'admin', name: 'Admin User' };

const initialGymAnnouncements = [
  { id: 1, title: 'New Yoga Class!', content: 'Starting next Monday at 6 PM. Sign up at the front desk!', date: '2024-05-10' },
  { id: 2, title: 'Holiday Hours', content: 'The gym will be closed on Memorial Day.', date: '2024-05-05' },
];

const initialGalleryImages = [
  { id: 1, url: 'https://placehold.co/600x400/007BFF/FFFFFF?text=Gym+Interior+1', caption: 'Spacious workout area' },
  { id: 2, url: 'https://placehold.co/600x400/28A745/FFFFFF?text=Cardio+Equipment', caption: 'State-of-the-art cardio machines' },
];


// --- Authentication & Login View ---
const LoginView = ({ onLogin, authError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/img/symbol.jpeg" alt="Fitness Freak Logo" className="mx-auto" style={{ width: 48, height: 48, borderRadius: '12px', objectFit: 'cover' }} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Fitness Freak</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome Back! Please login.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              id="email-login" // Unique ID for login form
              name="email-login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password-login" // Unique ID for login form
                name="password-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {authError && <p className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-3 rounded-md text-center">{authError}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          Admin: admin@fitnessfreak.com / adminpassword <br/>
          Client (example): john.doe@example.com / password123
        </p>
      </div>
    </div>
  );
};


// --- Reusable UI Components (Header, Sidebar, NotificationPopup) ---
const Header = ({ currentUser, toggleMobileSidebar, currentView, isDesktopSidebarCollapsed, toggleDesktopSidebarCollapse, onLogout }) => {
  // currentUser might be null briefly during logout, so guard access
  const mobileSidebarOpen = currentUser ? currentUser.isMobileSidebarOpen : false;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) toggleMobileSidebar(); // Use the passed function
            else toggleDesktopSidebarCollapse();
          }}
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md mr-3 p-1"
          aria-label="Toggle sidebar"
        >
          <span className="lg:hidden">
            {mobileSidebarOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </span>
          <span className="hidden lg:block">
            {isDesktopSidebarCollapsed ? <MenuIcon size={22} /> : <ChevronDown size={22} className="transform rotate-[-90deg]" />}
          </span>
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white truncate">
          {currentView}
        </h1>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
          Welcome, {currentUser ? currentUser.name : 'Guest'}!
        </span>
        <button 
            onClick={onLogout} 
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" 
            aria-label="Logout"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
};

const Sidebar = ({ isMobileSidebarOpen, isDesktopSidebarCollapsed, currentView, setCurrentView, darkMode, toggleDarkMode, closeMobileSidebar, userRole, onLogout }) => {
  
  const adminNavItems = ['Dashboard', 'Clients', 'Fees', 'Notifications', 'Gallery', 'Settings'];
  const clientNavItems = ['My Profile', 'Announcements', 'Gallery', 'Settings'];
  const navItems = userRole === 'admin' ? adminNavItems : clientNavItems;

  const getIcon = (view) => {
    const iconProps = { size: 24, className: (isDesktopSidebarCollapsed && !isMobileSidebarOpen) ? 'lg:mx-auto' : '' };
    switch (view) {
      case 'Dashboard': return <BarChart2 {...iconProps} />;
      case 'Clients': return <Users {...iconProps} />;
      case 'Fees': return <DollarSign {...iconProps} />;
      case 'Notifications':
      case 'Announcements': return <Bell {...iconProps} />;
      case 'Gallery': return <ImageIcon {...iconProps} />;
      case 'Settings': return <Settings {...iconProps} />;
      case 'My Profile': return <UserCheck {...iconProps} />;
      case 'BrandIcon': return <ImageIcon {...iconProps} />;
      default: return null;
    }
  };
  
  const showText = !isDesktopSidebarCollapsed || isMobileSidebarOpen;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-gray-800 dark:bg-gray-900 text-white shadow-lg
                 transform transition-all duration-300 ease-in-out flex flex-col
                 ${isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
                 lg:translate-x-0 lg:static 
                 ${isDesktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
    >
      <div className={`flex items-center justify-center h-16 border-b border-gray-700 dark:border-gray-750 transition-all duration-300 ${showText ? 'px-4' : 'lg:px-2'}`}>
        <img src="/img/symbol.jpeg" alt="Fitness Freak Logo" className={`transition-all duration-200 ${showText ? 'mr-2' : 'lg:mx-auto'} bg-white dark:bg-gray-900`} style={{ width: showText ? 32 : 28, height: showText ? 32 : 28, borderRadius: '8px', objectFit: 'cover' }} />
        <h1 className={`font-bold text-indigo-400 dark:text-indigo-500 transition-opacity duration-200 ${showText ? 'text-2xl opacity-100' : 'lg:opacity-0 lg:text-[0px] lg:hidden'}`}>
          Fitness Freak
        </h1>
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((view) => {
          if (userRole === 'admin' && view === 'Gallery') {
            // Nested Gallery menu for admin
            return (
              <div key="Gallery" className="space-y-1">
                <button
                  onClick={() => setCurrentView('Gallery')}
                  className={`w-full flex items-center py-3 rounded-lg text-left transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-800
                    ${currentView === 'Gallery' || currentView === 'BrandIcon' ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-md' : 'hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-indigo-300 dark:hover:text-indigo-400'}
                    ${showText ? 'px-4 space-x-3' : 'lg:px-0 lg:justify-center lg:py-3'}`}
                  title="Gallery"
                >
                  {getIcon('Gallery')}
                  <span className={`transition-opacity duration-200 ${showText ? 'opacity-100 text-lg' : 'lg:opacity-0 lg:hidden'}`}>Gallery</span>
                  <ChevronDown size={18} className={`ml-auto transition-transform ${currentView === 'Gallery' || currentView === 'BrandIcon' ? 'rotate-180' : ''} ${!showText ? 'hidden' : ''}`} />
                </button>
                {/* Submenu for Gallery */}
                {(currentView === 'Gallery' || currentView === 'BrandIcon') && showText && (
                  <div className="ml-8 space-y-1">
                    <button
                      onClick={() => setCurrentView('Gallery')}
                      className={`w-full flex items-center py-2 rounded-lg text-left text-sm transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-800
                        ${currentView === 'Gallery' ? 'bg-indigo-500 dark:bg-indigo-600 text-white' : 'hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-indigo-300 dark:hover:text-indigo-400'}
                        px-2`}
                      title="Gallery"
                    >
                      <ImageIcon size={18} className="mr-2" />Gallery
                    </button>
                    <button
                      onClick={() => setCurrentView('BrandIcon')}
                      className={`w-full flex items-center py-2 rounded-lg text-left text-sm transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-800
                        ${currentView === 'BrandIcon' ? 'bg-indigo-500 dark:bg-indigo-600 text-white' : 'hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-indigo-300 dark:hover:text-indigo-400'}
                        px-2`}
                      title="BrandIcon"
                    >
                      <ImageIcon size={18} className="mr-2" />BrandIcon
                    </button>
                  </div>
                )}
              </div>
            );
          }
          // Default nav item
          return (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view);
                if (isMobileSidebarOpen) closeMobileSidebar();
              }}
              className={`w-full flex items-center py-3 rounded-lg text-left transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-800
                        ${currentView === view ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-md' : 'hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-indigo-300 dark:hover:text-indigo-400'}
                        ${showText ? 'px-4 space-x-3' : 'lg:px-0 lg:justify-center lg:py-3'}`}
              title={view}
            >
              {getIcon(view)}
              <span className={`transition-opacity duration-200 ${showText ? 'opacity-100 text-lg' : 'lg:opacity-0 lg:hidden'}`}>{view}</span>
            </button>
          );
        })}
      </nav>

      <div className={`p-4 border-t border-gray-700 dark:border-gray-750 space-y-2 transition-all duration-300 ${showText ? '' : 'lg:px-2'}`}>
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center py-3 rounded-lg text-left transition-all duration-200 ease-in-out bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-800
                      ${showText ? 'px-4 space-x-3' : 'lg:px-0 lg:justify-center'}`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={24} className={!showText ? 'lg:mx-auto' : ''} /> : <Moon size={24} className={!showText ? 'lg:mx-auto' : ''} />}
          <span className={`transition-opacity duration-200 ${showText ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={onLogout}
          className={`w-full flex items-center py-3 rounded-lg text-left transition-all duration-200 ease-in-out bg-red-600 hover:bg-red-700 group focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:ring-offset-gray-800
                      ${showText ? 'px-4 space-x-3' : 'lg:px-0 lg:justify-center'}`}
          title="Logout"
        >
          <LogOut size={24} className={!showText ? 'lg:mx-auto' : ''} />
          <span className={`transition-opacity duration-200 ${showText ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const NotificationPopup = ({ message, type, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss, message]);
  if (!message) return null;
  return (
    <div className={`fixed top-20 right-5 ${bgColor} text-white p-4 rounded-lg shadow-lg transition-all duration-300 animate-fadeInOut z-50`}>
      {message}
      <button onClick={onDismiss} className="ml-4 text-xl font-bold leading-none hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-white rounded-sm">&times;</button>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');
  
  const [currentView, setCurrentView] = useState('');
  const [clientsData, setClientsData] = useState([]);
  const [gymAnnouncements, setGymAnnouncements] = useState(initialGymAnnouncements);
  const [galleryImages] = useState(initialGalleryImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [notification, setNotification] = useState({ text: '', type: '' });
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  // Dark Mode Effect
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add('dark');
      console.log("Dark mode ENABLED. HTML class list:", htmlElement.className);
    } else {
      htmlElement.classList.remove('dark');
      console.log("Dark mode DISABLED (Light mode). HTML class list:", htmlElement.className);
    }
  }, [darkMode]);

  // Mobile Sidebar Resize Effect (manages isMobileSidebarOpen within currentUser)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && currentUser && currentUser.isMobileSidebarOpen) {
        setCurrentUser(prevUser => ({ ...prevUser, isMobileSidebarOpen: false }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentUser]); // Re-run if currentUser changes (to access isMobileSidebarOpen)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('currentView', currentView);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentView');
    }
  }, [currentUser, currentView]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedView = localStorage.getItem('currentView');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView(savedView || '');
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      fetch('http://nipunup.com/php/get_clients.php')
        .then(res => res.json())
        .then(data => setClientsData(data.clients))
        .catch(err => console.error('Failed to fetch clients:', err));
    }
  }, [currentUser]);

  const handleLogin = async (email, password) => {
    setAuthError('');
    try {
      const response = await fetch('http://nipunup.com/php/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser({ ...data.user, isMobileSidebarOpen: false });
        setCurrentView(data.user.role === 'admin' ? 'Dashboard' : 'My Profile');
      } else {
        setAuthError(data.error || 'Login failed');
      }
    } catch (err) {
      setAuthError('Server error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('');
    setAuthError('');
    // isMobileSidebarOpen is part of currentUser, so it resets automatically
  };

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  // Mobile sidebar toggles now update the isMobileSidebarOpen property within currentUser
  const toggleMobileSidebar = () => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser; // Should not happen if logged in
      return { ...prevUser, isMobileSidebarOpen: !prevUser.isMobileSidebarOpen };
    });
  };
  const closeMobileSidebar = () => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      return { ...prevUser, isMobileSidebarOpen: false };
    });
  };

  const toggleDesktopSidebarCollapse = () => setIsDesktopSidebarCollapsed(prev => !prev);

  const showNotification = (text, type) => setNotification({ text, type });
  const dismissNotification = () => setNotification({ text: '', type: '' });

  const filteredClients = useMemo(() =>
    clientsData.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    ), [clientsData, searchTerm]);

  const addClient = async (client) => {
    try {
      const response = await fetch('http://nipunup.com/php/add_client.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      const data = await response.json();
      if (data.success) {
        // Refetch clients after adding
        fetch('http://nipunup.com/php/get_clients.php')
          .then(res => res.json())
          .then(data => setClientsData(data.clients));
        setShowAddClientModal(false);
        showNotification('Client added successfully!', 'success');
      } else {
        showNotification('Failed to add client.', 'error');
      }
    } catch (err) {
      showNotification('Server error.', 'error');
    }
  };

  const updateClient = async (updatedClient) => {
    try {
      const response = await fetch('http://nipunup.com/php/edit_client.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedClient),
      });
      const data = await response.json();
      if (data.success) {
        fetch('http://nipunup.com/php/get_clients.php')
          .then(res => res.json())
          .then(data => setClientsData(data.clients));
        setEditingClient(null);
        setShowAddClientModal(false);
        showNotification('Client updated successfully!', 'success');
      } else {
        showNotification('Failed to update client.', 'error');
      }
    } catch (err) {
      showNotification('Server error.', 'error');
    }
  };

  const deleteClient = async (clientId) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      const response = await fetch('http://nipunup.com/php/delete_client.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: clientId }),
      });
      const data = await response.json();
      if (data.success) {
        fetch('http://nipunup.com/php/get_clients.php')
          .then(res => res.json())
          .then(data => setClientsData(data.clients));
        showNotification('Client deleted successfully!', 'success');
      } else {
        showNotification('Failed to delete client.', 'error');
      }
    } catch (err) {
      showNotification('Server error.', 'error');
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowAddClientModal(true);
  };
  
  const handleAddNewClient = () => {
    setEditingClient(null);
    setShowAddClientModal(true);
  };

  const sendFeeReminder = (client) => {
    console.log(`Reminder sent to ${client.name} (${client.email})`);
    showNotification(`Fee reminder simulated for ${client.name}.`, 'info');
  };

  const markAsPaid = (clientId) => {
    setClientsData(clientsData.map(client =>
      client.id === clientId ? { ...client, feeStatus: 'Paid', lastPaymentDate: new Date().toISOString().split('T')[0] } : client
    ));
    showNotification('Fee status updated to Paid.', 'success');
  };

  const addAnnouncement = (announcement) => {
    const newAnnouncement = { ...announcement, id: gymAnnouncements.length > 0 ? Math.max(...gymAnnouncements.map(a => a.id)) + 1 : 1, date: new Date().toISOString().split('T')[0] };
    setGymAnnouncements([newAnnouncement, ...gymAnnouncements]);
    showNotification('Announcement posted successfully!', 'success');
  };
  
  const MainContent = () => {
    if (!currentUser) return null;

    if (currentUser.role === 'admin') {
      switch (currentView) {
        case 'Dashboard': return <DashboardView clients={clientsData} announcements={gymAnnouncements} />;
        case 'Clients': return <ClientsView clients={filteredClients} onAddClient={handleAddNewClient} onEditClient={handleEditClient} onDeleteClient={deleteClient} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
        case 'Fees': return <FeesView clients={clientsData} onSendReminder={sendFeeReminder} onMarkAsPaid={markAsPaid} />;
        case 'Notifications': return <NotificationsView announcements={gymAnnouncements} onAddAnnouncement={addAnnouncement} />;
        case 'Gallery': return <GalleryView images={galleryImages} />;
        case 'BrandIcon': return <BrandIconView />;
        case 'Settings': return <SettingsView userRole="admin" />;
        default: setCurrentView('Dashboard'); return <DashboardView clients={clientsData} announcements={gymAnnouncements} />;
      }
    } else if (currentUser.role === 'client') {
      switch (currentView) {
        case 'My Profile': return <ClientProfileView client={currentUser} allClientsData={clientsData} />;
        case 'Announcements': return <NotificationsView announcements={gymAnnouncements} onAddAnnouncement={null} />;
        case 'Gallery': return <GalleryView images={galleryImages} />;
        case 'Settings': return <SettingsView userRole="client" />;
        default: setCurrentView('My Profile'); return <ClientProfileView client={currentUser} allClientsData={clientsData} />;
      }
    }
    return <p className="text-red-500 p-4">Error: Unknown user role or view. Please try logging out and back in.</p>;
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} authError={authError} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans overflow-hidden">
      <style jsx global>{`
        .animate-fadeInOut { animation: fadeInOut 3s ease-in-out forwards; }
        @keyframes fadeInOut { 0% { opacity: 0; transform: translateY(-20px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-20px); } }
      `}</style>

      {currentUser.isMobileSidebarOpen && (
        <div onClick={closeMobileSidebar} className="fixed inset-0 z-30 bg-black/50 lg:hidden" aria-hidden="true" />
      )}

      <Sidebar
        isMobileSidebarOpen={currentUser.isMobileSidebarOpen}
        isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        closeMobileSidebar={closeMobileSidebar}
        userRole={currentUser.role}
        onLogout={handleLogout}
      />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isDesktopSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'}`}>
        <Header
          currentUser={currentUser}
          toggleMobileSidebar={toggleMobileSidebar} // Pass the correct function
          currentView={currentView}
          isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
          toggleDesktopSidebarCollapse={toggleDesktopSidebarCollapse}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <MainContent />
        </main>
      </div>
      
      <NotificationPopup message={notification.text} type={notification.type} onDismiss={dismissNotification} />
      
      {showAddClientModal && currentUser.role === 'admin' &&
        <ClientFormModal
          onClose={() => { setShowAddClientModal(false); setEditingClient(null); }}
          onSave={editingClient ? updateClient : addClient}
          client={editingClient}
          showNotification={showNotification}
        />
      }
    </div>
  );
};


// --- View Components (Dashboard, Clients, Fees, etc.) ---
// Client Profile View
const ClientProfileView = ({ client, allClientsData }) => {
  const currentClientData = allClientsData.find(c => c.id === client.id) || client;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img 
            src={currentClientData.avatar || `https://placehold.co/150x150/EAEAEA/333?text=${currentClientData.name.substring(0,2).toUpperCase()}`} 
            alt={currentClientData.name} 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
            onError={(e) => e.target.src='https://placehold.co/150x150/CCCCCC/FFFFFF?text=User'}
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{currentClientData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentClientData.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{currentClientData.phone}</p>
            <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold
              ${currentClientData.feeStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' :
                currentClientData.feeStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' :
                'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'}`}>
              Fee Status: {currentClientData.feeStatus}
            </span>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div><strong className="text-gray-600 dark:text-gray-400">Membership Type:</strong> <span className="text-gray-800 dark:text-gray-200">{currentClientData.membershipType}</span></div>
          <div><strong className="text-gray-600 dark:text-gray-400">Joined On:</strong> <span className="text-gray-800 dark:text-gray-200">{new Date(currentClientData.joinDate).toLocaleDateString()}</span></div>
          <div><strong className="text-gray-600 dark:text-gray-400">Fee Amount:</strong> <span className="text-gray-800 dark:text-gray-200">${currentClientData.feeAmount} / {currentClientData.paymentCycle}</span></div>
          <div><strong className="text-gray-600 dark:text-gray-400">Last Payment:</strong> <span className="text-gray-800 dark:text-gray-200">{currentClientData.lastPaymentDate ? new Date(currentClientData.lastPaymentDate).toLocaleDateString() : 'N/A'}</span></div>
          <div className="md:col-span-2"><strong className="text-gray-600 dark:text-gray-400">Next Due Date:</strong> <span className="text-gray-800 dark:text-gray-200">{currentClientData.nextDueDate ? new Date(currentClientData.nextDueDate).toLocaleDateString() : 'N/A'}</span></div>
        </div>
        <div className="mt-6 text-center">
            <button className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                Request Membership Change (Simulated)
            </button>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ clients, announcements }) => {
  const activeMembers = clients.filter(c => c.feeStatus !== 'Expired' && c.feeStatus !== 'Cancelled').length;
  const pendingFeesCount = clients.filter(c => c.feeStatus === 'Pending' || c.feeStatus === 'Overdue').length;
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Clients" value={clients.length} icon={<Users size={32}/>} color="blue" />
        <StatCard title="Active Members" value={activeMembers} icon={<User size={32}/>} color="green" />
        <StatCard title="Fees Pending" value={pendingFeesCount} icon={<DollarSign size={32}/>} color="red" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Announcements</h2>
          {announcements.length > 0 ? announcements.slice(0, 3).map(ann => (
            <div key={ann.id} className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">{ann.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{ann.content.substring(0,70)}...</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(ann.date).toLocaleDateString()}</p>
            </div>
          )) : <p className="text-gray-500 dark:text-gray-400">No recent announcements.</p>}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Upcoming Due Dates (Next 7 Days)</h2>
          {clients.filter(c => (c.feeStatus === 'Pending' || c.feeStatus === 'Overdue') && c.nextDueDate && new Date(c.nextDueDate) >= new Date() && new Date(c.nextDueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
            .sort((a,b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))
            .slice(0,3)
            .map(client => (
            <div key={client.id} className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">{client.name}</h3>
              <p className="text-sm text-red-500 dark:text-red-400">Due: {new Date(client.nextDueDate).toLocaleDateString()}</p>
            </div>
          ))}
          {clients.filter(c => (c.feeStatus === 'Pending' || c.feeStatus === 'Overdue') && c.nextDueDate && new Date(c.nextDueDate) >= new Date() && new Date(c.nextDueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length === 0 && 
            <p className="text-gray-500 dark:text-gray-400">No immediate due dates in the next 7 days.</p>}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: { border: 'border-blue-500 dark:border-blue-400', bg: 'bg-blue-100 dark:bg-blue-800', text: 'text-blue-500 dark:text-blue-300' },
    green: { border: 'border-green-500 dark:border-green-400', bg: 'bg-green-100 dark:bg-green-800', text: 'text-green-500 dark:text-green-300' },
    red: { border: 'border-red-500 dark:border-red-400', bg: 'bg-red-100 dark:bg-red-800', text: 'text-red-500 dark:text-red-300' },
  };
  const C = colors[color] || colors.blue;
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 ${C.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 ${C.bg} rounded-full`}>
          {React.cloneElement(icon, { className: C.text, size: 32 })}
        </div>
      </div>
    </div>
  );
};

const ClientsView = ({ clients, onAddClient, onEditClient, onDeleteClient, searchTerm, setSearchTerm }) => {
  const [expandedClient, setExpandedClient] = useState(null);
  const toggleClientDetails = (clientId) => setExpandedClient(expandedClient === clientId ? null : clientId);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Clients</h1>
        <button onClick={onAddClient} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-150 ease-in-out self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          <PlusCircle size={20} className="mr-2" /> Add New Client
        </button>
      </div>
      <div className="relative">
        <input type="text" placeholder="Search clients (Name, Email, Phone)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white" />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] table-auto text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>{['Avatar', 'Name', 'Email', 'Phone', 'Membership', 'Fee Status', 'Actions'].map(header => <th key={header} className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>)}</tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
              {clients.length > 0 ? clients.map((client) => (
                <React.Fragment key={client.id}>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                  <td className="px-6 py-4"><img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => e.target.src='https://placehold.co/100x100/CCCCCC/FFFFFF?text=User'}/></td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{client.membershipType}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${client.feeStatus === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : client.feeStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>{client.feeStatus}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                    <button onClick={() => toggleClientDetails(client.id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-1 focus:ring-indigo-500" title="View Details">{expandedClient === client.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
                    <button onClick={() => onEditClient(client)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-1 focus:ring-blue-500" title="Edit Client"><Edit2 size={18} /></button>
                    <button onClick={() => onDeleteClient(client.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-1 focus:ring-red-500" title="Delete Client"><Trash2 size={18} /></button>
                  </td>
                </tr>
                {expandedClient === client.id && (<tr className="bg-gray-50 dark:bg-gray-750"><td colSpan="7" className="px-6 py-4"><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm"><div><strong>Join Date:</strong> {new Date(client.joinDate).toLocaleDateString()}</div><div><strong>Payment Cycle:</strong> {client.paymentCycle}</div><div><strong>Fee Amount:</strong> ${client.feeAmount}</div><div><strong>Last Payment:</strong> {client.lastPaymentDate ? new Date(client.lastPaymentDate).toLocaleDateString() : 'N/A'}</div><div><strong>Next Due Date:</strong> {client.nextDueDate ? new Date(client.nextDueDate).toLocaleDateString() : 'N/A'}</div></div></td></tr>)}
                </React.Fragment>
              )) : (<tr><td colSpan="7" className="text-center py-10 text-gray-500 dark:text-gray-400">No clients found. {searchTerm && "Try adjusting your search."}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ClientFormModal = ({ onClose, onSave, client, showNotification }) => {
  const defaultNextDueDate = () => { const today = new Date(); today.setMonth(today.getMonth() + 1); return today.toISOString().split('T')[0]; };
  const [formData, setFormData] = useState(client || { name: '', email: '', phone: '', membershipType: 'Basic Monthly', joinDate: new Date().toISOString().split('T')[0], feeAmount: 100, paymentCycle: 'Monthly', feeStatus: 'Pending', lastPaymentDate: '', nextDueDate: defaultNextDueDate() });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required."; else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required."; else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) errors.phone = "Phone number is invalid (e.g., 123-456-7890).";
    if (!formData.joinDate) errors.joinDate = "Join date is required.";
    if (formData.feeAmount === '' || parseFloat(formData.feeAmount) < 0) errors.feeAmount = "Fee amount must be a non-negative number.";
    if (!formData.nextDueDate) errors.nextDueDate = "Next due date is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); if (formErrors[name]) setFormErrors(prev => ({...prev, [name]: null})); };
  const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) onSave(formData); else showNotification("Please correct the errors in the form.", "error"); };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{client ? 'Edit Client' : 'Add New Client'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm p-1">
                <X size={24} />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="clientform-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label><input type="text" name="name" id="clientform-name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full input-style ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}</div>
          <div><label htmlFor="clientform-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label><input type="email" name="email" id="clientform-email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full input-style ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}</div>
          <div><label htmlFor="clientform-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label><input type="tel" name="phone" id="clientform-phone" value={formData.phone} onChange={handleChange} className={`mt-1 block w-full input-style ${formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}</div>
          <div><label htmlFor="clientform-membershipType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Membership Type</label><select name="membershipType" id="clientform-membershipType" value={formData.membershipType} onChange={handleChange} className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600"><option>Basic Monthly</option><option>Premium Monthly</option><option>Student Monthly</option><option>Premium Annual</option></select></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="clientform-joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label><input type="date" name="joinDate" id="clientform-joinDate" value={formData.joinDate} onChange={handleChange} className={`mt-1 block w-full input-style ${formErrors.joinDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.joinDate && <p className="text-xs text-red-500 mt-1">{formErrors.joinDate}</p>}</div>
            <div><label htmlFor="clientform-feeAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fee Amount ($)</label><input type="number" name="feeAmount" id="clientform-feeAmount" value={formData.feeAmount} onChange={handleChange} min="0" step="0.01" className={`mt-1 block w-full input-style ${formErrors.feeAmount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.feeAmount && <p className="text-xs text-red-500 mt-1">{formErrors.feeAmount}</p>}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="clientform-paymentCycle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Cycle</label><select name="paymentCycle" id="clientform-paymentCycle" value={formData.paymentCycle} onChange={handleChange} className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600"><option>Monthly</option><option>Quarterly</option><option>Annually</option></select></div>
            <div><label htmlFor="clientform-feeStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fee Status</label><select name="feeStatus" id="clientform-feeStatus" value={formData.feeStatus} onChange={handleChange} className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600"><option>Pending</option><option>Paid</option><option>Overdue</option><option>Cancelled</option></select></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="clientform-lastPaymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Payment Date</label><input type="date" name="lastPaymentDate" id="clientform-lastPaymentDate" value={formData.lastPaymentDate} onChange={handleChange} className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600" /></div>
            <div><label htmlFor="clientform-nextDueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Next Due Date</label><input type="date" name="nextDueDate" id="clientform-nextDueDate" value={formData.nextDueDate} onChange={handleChange} className={`mt-1 block w-full input-style ${formErrors.nextDueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />{formErrors.nextDueDate && <p className="text-xs text-red-500 mt-1">{formErrors.nextDueDate}</p>}</div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">{client ? 'Update Client' : 'Save Client'}</button>
          </div>
        </form>
      </div>
      <style jsx>{`.input-style { @apply px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white; }`}</style>
    </div>
  );
};

const FeesView = ({ clients, onSendReminder, onMarkAsPaid }) => {
  const pendingFeesClients = clients.filter(client => client.feeStatus === 'Pending' || client.feeStatus === 'Overdue');
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Fee Management</h1>
      {pendingFeesClients.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[700px] table-auto"><thead className="bg-gray-50 dark:bg-gray-700"><tr>{['Client Name', 'Email', 'Membership', 'Amount Due', 'Due Date', 'Status', 'Actions'].map(header => <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>)}</tr></thead><tbody className="text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">{pendingFeesClients.map(client => (<tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"><td className="px-6 py-4 font-medium whitespace-nowrap">{client.name}</td><td className="px-6 py-4 whitespace-nowrap text-sm">{client.email}</td><td className="px-6 py-4 whitespace-nowrap text-sm">{client.membershipType}</td><td className="px-6 py-4 text-sm">${client.feeAmount}</td><td className="px-6 py-4 whitespace-nowrap text-sm">{client.nextDueDate ? new Date(client.nextDueDate).toLocaleDateString() : 'N/A'}</td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${client.feeStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>{client.feeStatus}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"><button onClick={() => onMarkAsPaid(client.id)} className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md transition focus:outline-none focus:ring-1 focus:ring-green-500">Mark Paid</button><button onClick={() => onSendReminder(client)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md transition flex items-center focus:outline-none focus:ring-1 focus:ring-blue-500"><Send size={14} className="mr-1" /> Reminder</button></td></tr>))}</tbody></table></div></div>
      ) : (<div className="text-center py-8"><DollarSign size={48} className="mx-auto text-green-500 dark:text-green-400 mb-4" /><p className="text-gray-600 dark:text-gray-400 text-lg">No pending fees. Everyone is up to date!</p></div>)}
    </div>
  );
};

const NotificationsView = ({ announcements, onAddAnnouncement }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => { e.preventDefault(); if (!title.trim() || !content.trim()) { setFormError("Title and Content cannot be empty."); return; } setFormError(''); onAddAnnouncement({ title, content }); setTitle(''); setContent(''); setShowForm(false); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gym Announcements</h1>
        {onAddAnnouncement && (<button onClick={() => { setShowForm(!showForm); setFormError(''); setTitle(''); setContent('');}} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">{showForm ? <><X size={20} className="mr-2" /> Cancel</> : <><PlusCircle size={20} className="mr-2" /> New Announcement</>}</button>)}
      </div>
      {showForm && onAddAnnouncement && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
          {formError && <p className="text-sm text-red-500 bg-red-100 dark:bg-red-700 dark:text-red-100 p-3 rounded-md">{formError}</p>}
          <div><label htmlFor="announcementTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label><input type="text" id="announcementTitle" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600" /></div>
          <div><label htmlFor="announcementContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label><textarea id="announcementContent" value={content} onChange={(e) => setContent(e.target.value)} rows="4" className="mt-1 block w-full input-style border-gray-300 dark:border-gray-600"></textarea></div>
          <div className="flex justify-end"><button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"><Send size={18} className="mr-2" /> Post</button></div>
        </form>
      )}
      <div className="space-y-4">
        {announcements.length > 0 ? announcements.map(ann => (
          <div key={ann.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"><h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">{ann.title}</h2><p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Posted on: {new Date(ann.date).toLocaleDateString()}</p><p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ann.content}</p></div>
        )) : (<div className="text-center py-8"><Bell size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" /><p className="text-gray-600 dark:text-gray-400 text-lg">No announcements posted yet.</p></div>)}
      </div>
    </div>
  );
};

const GalleryView = ({ images }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gym Gallery</h1>
      {images.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{images.map(image => (<div key={image.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl"><img src={image.url} alt={image.caption} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/FFFFFF?text=Error"; }}/><div className="p-4"><p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{image.caption}</p></div></div>))}</div>) : (<div className="text-center py-8"><ImageIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" /><p className="text-gray-600 dark:text-gray-400 text-lg">Gallery is empty.</p></div>)}
    </div>
  );
};

const BrandIconView = () => {
  // List of all images in img and img/favicon_io
  const images = [
    { src: '/img/malebody.jpeg', name: 'malebody.jpeg' },
    { src: '/img/femalebody.jpeg', name: 'femalebody.jpeg' },
    { src: '/img/symbol.jpeg', name: 'symbol.jpeg' },
    { src: '/img/offer.jpeg', name: 'offer.jpeg' },
    { src: '/img/logo.jpeg', name: 'logo.jpeg' },
    { src: '/img/favicon_io/android-chrome-512x512.png', name: 'android-chrome-512x512.png' },
    { src: '/img/favicon_io/android-chrome-192x192.png', name: 'android-chrome-192x192.png' },
    { src: '/img/favicon_io/favicon.ico', name: 'favicon.ico' },
    { src: '/img/favicon_io/favicon-16x16.png', name: 'favicon-16x16.png' },
    { src: '/img/favicon_io/favicon-32x32.png', name: 'favicon-32x32.png' },
    { src: '/img/favicon_io/apple-touch-icon.png', name: 'apple-touch-icon.png' },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Brand Icons & Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col items-center">
            <img src={img.src} alt={img.name} className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-900 p-4" onError={e => e.target.style.display='none'} />
            <div className="p-2 w-full text-center border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-600 dark:text-gray-300 break-all">{img.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Account Information</h2>
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400"><strong>Role:</strong> <span className="capitalize">{userRole}</span></p>
          <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">Change Password (Simulated)</button>
        </div>
      </div>
      {userRole === 'admin' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Gym Details (Admin)</h2>
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400"><strong>Gym Name:</strong> Fitness Freak</p>
            <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">Edit Gym Information (Simulated)</button>
          </div>
        </div>
      )}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Application Preferences</h2>
        <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400">Dark Mode toggle is available in the sidebar.</p>
            <p className="text-gray-600 dark:text-gray-400">Notification preferences could be configured here.</p>
        </div>
      </div>
    </div>
  );
};

export default App;

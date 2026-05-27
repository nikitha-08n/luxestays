import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import DetailsView from './components/DetailsView';
import DashboardView from './components/DashboardView';
import RentView from './components/RentView';
import ListingsView from './components/ListingsView';
import SupportView from './components/SupportView';
import NotificationsView from './components/NotificationsView';
import EntryPassView from './components/EntryPassView';
import ContactHostSlide from './components/ContactHostSlide';
import BookingsView from './components/BookingsView';
import SavedHomesView from './components/SavedHomesView';
import WishlistView from './components/WishlistView';
import ProfileSlide from './components/ProfileSlide';
import PersonalInfoSlide from './components/PersonalInfoSlide';
import PaymentsSlide from './components/PaymentsSlide';
import SecuritySlide from './components/SecuritySlide';
import UpdatePasswordSlide from './components/UpdatePasswordSlide';
import AddPaymentMethodSlide from './components/AddPaymentMethodSlide';
import LanguageRegionSlide from './components/LanguageRegionSlide';
import AuthView from './components/AuthView';
import LuxeAssistantSlide from './components/LuxeAssistantSlide';
import Footer from './components/Footer';
import LegalView from './components/LegalView';
import { WishlistProvider } from './context/WishlistContext';
import WishlistToast from './components/WishlistToast';
import { Sparkles } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState('home-view');
  const [showContactHost, setShowContactHost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showLanguageRegion, setShowLanguageRegion] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [fastCheckoutEnabled, setFastCheckoutEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [currentLang, setCurrentLang] = useState('en-in');
  const [currentRegion, setCurrentRegion] = useState('IN');
  
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('luxe_users');
    return saved ? JSON.parse(saved) : [
      { email: 'ramesh@email.com', password: 'password123', name: 'Ramesh Kumar' }
    ];
  });

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('luxe_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const [user, setUser] = useState({
    name: 'Ramesh Kumar',
    email: 'ramesh@email.com',
    phone: '+91 98765 43210',
    address: 'HSR Layout, Sector 2, Bangalore, 560102',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    membership: 'VERIFIED USER'
  });

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const handleLogin = (userObj) => {
    if (userObj) {
      updateUser({ 
        name: userObj.name, 
        email: userObj.email 
      });
    }
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = (googleProfile) => {
    const existingUser = registeredUsers.find(u => u.email.toLowerCase() === googleProfile.email.toLowerCase());
    
    if (!existingUser) {
      const newUser = {
        email: googleProfile.email,
        name: googleProfile.name,
        password: 'google_oauth_placeholder_password',
        photo: googleProfile.picture
      };
      setRegisteredUsers(prev => [...prev, newUser]);
    }
    
    updateUser({
      name: googleProfile.name,
      email: googleProfile.email,
      photo: googleProfile.picture || user.photo
    });
    
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleSignUp = (newUser) => {
    setRegisteredUsers(prev => [...prev, newUser]);
  };

  const navigateTo = (viewId, propData = null) => {
    const restrictedViews = ['dashboard-view', 'bookings-view', 'saved-homes-view', 'wishlist-view', 'notifications-view', 'details-view'];
    
    if (restrictedViews.includes(viewId) && !isLoggedIn) {
      setShowAuth(true);
      return;
    }

    if (propData) {
      setSelectedProperty(propData);
    }
    
    setActiveView(viewId);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveView('home-view');
  };

  const isLegalView = ['privacy-policy', 'terms-of-service', 'cookie-policy', 'sitemap'].includes(activeView);

  if (!isLoggedIn) {
    return (
      <AuthView 
        onLogin={(u) => handleLogin(u)} 
        registeredUsers={registeredUsers}
        onSignUp={handleSignUp}
        onGoogleLogin={handleGoogleLogin}
      />
    );
  }

  return (
    <WishlistProvider>
    <>
      <Navbar 
        activeView={activeView} 
        navigateTo={navigateTo} 
        onOpenProfile={() => isLoggedIn ? setShowProfile(true) : setShowAuth(true)}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <div id="app-container">
        {activeView === 'home-view' && <HomeView navigateTo={navigateTo} />}
        {activeView === 'search-view' && <SearchView navigateTo={navigateTo} />}
        {activeView === 'rent-view' && <RentView navigateTo={navigateTo} />}
        {activeView === 'listings-view' && <ListingsView navigateTo={navigateTo} />}
        {activeView === 'support-view' && <SupportView />}
        {activeView === 'notifications-view' && <NotificationsView />}
        {activeView === 'bookings-view' && <BookingsView navigateTo={navigateTo} onContactHost={() => setShowContactHost(true)} />}
        {activeView === 'saved-homes-view' && <SavedHomesView navigateTo={navigateTo} />}
        {activeView === 'wishlist-view' && <WishlistView navigateTo={navigateTo} />}
        {activeView === 'entry-pass-view' && <EntryPassView navigateTo={navigateTo} onContactHost={() => setShowContactHost(true)} />}
        {activeView === 'details-view' && <DetailsView property={selectedProperty} navigateTo={navigateTo} onContactHost={() => setShowContactHost(true)} />}
        {activeView === 'dashboard-view' && <DashboardView user={user} navigateTo={navigateTo} onContactHost={() => setShowContactHost(true)} />}
        
        {isLegalView && <LegalView type={activeView} navigateTo={navigateTo} />}
      </div>
      
      {showContactHost && <ContactHostSlide onClose={() => {
        setShowContactHost(false);
        setShowProfile(false);
        setShowPersonalInfo(false);
        setShowPayments(false);
      }} />}
      {showProfile && (
        <ProfileSlide 
          onClose={() => setShowProfile(false)} 
          navigateTo={navigateTo} 
          onOpenPersonalInfo={() => { setShowProfile(false); setShowPersonalInfo(true); }}
          onOpenPayments={() => { setShowProfile(false); setShowPayments(true); }}
          onOpenSecurity={() => { setShowProfile(false); setShowSecurity(true); }}
          onOpenLanguageRegion={() => { setShowProfile(false); setShowLanguageRegion(true); }}
          currentDisplay={`${currentLang === 'en-in' ? 'English (IN)' : currentLang === 'hi-in' ? 'Hindi' : 'Other'} · ${currentRegion === 'IN' ? 'INR (₹)' : currentRegion === 'US' ? 'USD ($)' : 'Other'}`}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {showPersonalInfo && (
        <PersonalInfoSlide 
          onClose={() => setShowPersonalInfo(false)} 
          onBack={() => setShowPersonalInfo(false)} 
          user={user} 
          onUpdateUser={updateUser} 
        />
      )}
      
      {showPayments && (
        <PaymentsSlide 
          onClose={() => setShowPayments(false)} 
          onBack={() => setShowPayments(false)}
          fastCheckoutEnabled={fastCheckoutEnabled}
          setFastCheckoutEnabled={setFastCheckoutEnabled}
          onOpenAddMethod={() => setShowAddPaymentMethod(true)}
        />
      )}

      {showLanguageRegion && (
        <LanguageRegionSlide
          onClose={() => setShowLanguageRegion(false)}
          onBack={() => setShowLanguageRegion(false)}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          currentRegion={currentRegion}
          setCurrentRegion={setCurrentRegion}
        />
      )}

      {showAddPaymentMethod && (
        <AddPaymentMethodSlide 
          user={user}
          onClose={() => setShowAddPaymentMethod(false)} 
          onBack={() => { setShowAddPaymentMethod(false); setShowPayments(true); }} 
        />
      )}

      {showSecurity && (
        <SecuritySlide 
          onClose={() => setShowSecurity(false)} 
          onBack={() => { setShowSecurity(false); setShowProfile(true); }} 
          onOpenUpdatePassword={() => { setShowSecurity(false); setShowUpdatePassword(true); }}
        />
      )}

      {showUpdatePassword && (
        <UpdatePasswordSlide 
          onClose={() => setShowUpdatePassword(false)} 
          onBack={() => { setShowUpdatePassword(false); setShowSecurity(true); }} 
        />
      )}
      
      {showConcierge && (
        <LuxeAssistantSlide user={user} onClose={() => setShowConcierge(false)} />
      )}

      {/* Floating Concierge Trigger */}
      {!showConcierge && (
        <button 
          className="concierge-fab"
          onClick={() => setShowConcierge(true)}
          title="Luxe Assistant"
        >
          <Sparkles size={24} fill="white" />
        </button>
      )}

      <Footer navigateTo={navigateTo} />
    </>
    <WishlistToast />
    </WishlistProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Home, ShoppingBag, Package, Settings, Mic, Users, Heart, Menu } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    } finally {
      setIsLoading(false);
    }
  };

  const isPublicFlow = ["Onboarding", "LanguageSelection", "SignIn"].includes(currentPageName);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f7f4f0 0%, #e8ddd4 100%)'}}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full animate-spin border-4 border-transparent" style={{borderTopColor: '#4285F4', borderRightColor: '#D4862D'}}>
            <div className="w-full h-full rounded-full" style={{background: 'conic-gradient(from 0deg, #4285F4, #D4862D, #E85A4F, #4285F4)'}}></div>
          </div>
          <p className="text-lg font-bold" style={{color: '#4285F4'}}>Loading...</p>
        </div>
      </div>
    );
  }

  if (isPublicFlow || !user?.onboarding_completed) {
    return (
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f7f4f0 0%, #e8ddd4 100%)'}}>
        {children}
      </div>
    );
  }

  const isArtisan = user?.user_type === "artisan" || user?.user_type === "both";
  const isBuyer = user?.user_type === "buyer" || user?.user_type === "both";

  const navigationItems = [
    { name: "Home", url: createPageUrl("Dashboard"), icon: Home, show: true },
    { name: "Marketplace", url: createPageUrl("Marketplace"), icon: ShoppingBag, show: isBuyer },
    { name: "My Products", url: createPageUrl("ArtisanDashboard"), icon: Heart, show: isArtisan },
    { name: "Orders", url: createPageUrl("Orders"), icon: Package, show: true },
    { name: "Profile", url: createPageUrl("Profile"), icon: Settings, show: true },
  ].filter(item => item.show);

  return (
    <div className="min-h-screen relative" style={{background: 'linear-gradient(135deg, #f7f4f0 0%, #e8ddd4 100%)'}}>
      <style jsx>{`
        :root {
          --artisan-blue: #4285F4;
          --artisan-orange: #D4862D;
          --artisan-cream: #f7f4f0;
          --artisan-red: #E85A4F;
          --artisan-green: #52A675;
        }
        
        .decorative-pattern {
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(66, 133, 244, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212, 134, 45, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(232, 90, 79, 0.05) 0%, transparent 50%);
        }
        
        .folk-border {
          position: relative;
        }
        
        .folk-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4285F4 25%, #D4862D 25% 50%, #E85A4F 50% 75%, #52A675 75%);
          background-size: 16px 4px;
        }
        
        .mandala-bg::after {
          content: '';
          position: absolute;
          top: 10px;
          right: 10px;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(66, 133, 244, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          border: 2px dashed rgba(66, 133, 244, 0.2);
        }
        
        .organic-shape {
          border-radius: 2rem 1rem 2rem 1rem;
        }
      `}</style>
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#4285F4" strokeWidth="2" strokeDasharray="5,5"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="#D4862D" strokeWidth="1"/>
            <circle cx="50" cy="50" r="10" fill="#E85A4F" opacity="0.5"/>
          </svg>
        </div>
        <div className="absolute top-32 right-20 w-24 h-24 opacity-15">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z" fill="#52A675"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 w-20 h-20 opacity-10 rotate-45">
          <div className="w-full h-full border-4 border-dashed border-orange-400 rounded-lg"></div>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 folk-border shadow-lg">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 decorative-pattern">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:block p-3 rounded-full transition-all transform hover:scale-110 mandala-bg relative"
                style={{backgroundColor: 'rgba(66, 133, 244, 0.1)'}}
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" style={{color: '#4285F4'}} />
              </button>

              <Link to={createPageUrl("Dashboard")} className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg" 
                       style={{background: 'linear-gradient(135deg, #4285F4 0%, #D4862D 100%)'}}>
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full" 
                       style={{backgroundColor: '#E85A4F'}} />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight" style={{color: '#4285F4'}}>
                    ARTiSAN
                  </h1>
                  <p className="text-sm font-bold tracking-wide" style={{color: '#D4862D'}}>
                    WORKSHOP
                  </p>
                </div>
              </Link>
            </div>

            {/* Voice Action Button */}
            <button 
              className="p-4 rounded-full shadow-xl transition-all transform hover:scale-110 hover:rotate-12 organic-shape relative overflow-hidden group"
              style={{background: 'linear-gradient(135deg, #D4862D 0%, #E85A4F 100%)'}}
              aria-label="Voice command"
            >
              <Mic className="w-6 h-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 md:pb-8">
        <div className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'md:ml-72' : 'md:ml-24'}`}>
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm md:hidden z-40 folk-border">
        <div className="flex justify-around py-3">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all transform hover:scale-110 ${
                location.pathname === item.url
                  ? "shadow-lg organic-shape"
                  : ""
              }`}
              style={{
                color: location.pathname === item.url ? '#4285F4' : '#666',
                backgroundColor: location.pathname === item.url ? 'rgba(66, 133, 244, 0.1)' : 'transparent'
              }}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-20 h-full bg-white/90 backdrop-blur-sm border-r-4 transition-all duration-500 z-40 decorative-pattern shadow-2xl ${isSidebarOpen ? 'w-72' : 'w-24'}`}
             style={{borderRightColor: '#D4862D'}}>
        
        <div className="p-6">
          <nav className="space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all transform hover:scale-105 relative overflow-hidden group organic-shape ${
                  location.pathname === item.url
                    ? "shadow-xl"
                    : "hover:shadow-lg"
                } ${isSidebarOpen ? '' : 'justify-center'}`}
                style={{
                  background: location.pathname === item.url 
                    ? 'linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(212, 134, 45, 0.15) 100%)'
                    : 'transparent',
                  color: location.pathname === item.url ? '#4285F4' : '#666'
                }}
                title={isSidebarOpen ? '' : item.name}
              >
                <item.icon className="w-6 h-6 flex-shrink-0 relative z-10" />
                <span className={`font-bold text-lg transition-all duration-300 relative z-10 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.name}
                </span>
                {location.pathname === item.url && (
                  <div className="absolute right-2 w-3 h-3 rounded-full" style={{backgroundColor: '#E85A4F'}} />
                )}
              </Link>
            ))}
          </nav>

          {user && (
            <div className={`mt-8 p-4 rounded-3xl transition-all duration-300 organic-shape relative overflow-hidden ${isSidebarOpen ? '' : 'p-3'}`}
                 style={{background: 'linear-gradient(135deg, rgba(82, 166, 117, 0.1) 0%, rgba(212, 134, 45, 0.1) 100%)'}}>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-8 h-8 opacity-20">
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d="M10 2 L12 8 L18 8 L13.5 12 L15.5 18 L10 14.5 L4.5 18 L6.5 12 L2 8 L8 8 Z" 
                        fill="#52A675"/>
                </svg>
              </div>
              
              <div className={`flex items-center gap-3 ${isSidebarOpen ? '' : 'justify-center'}`}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                       style={{background: 'linear-gradient(135deg, #52A675 0%, #D4862D 100%)'}}>
                    <span className="text-white font-bold text-lg">
                      {user.full_name && user.full_name[0] ? user.full_name[0].toUpperCase() : "U"}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" 
                       style={{backgroundColor: '#4285F4'}} />
                </div>
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  <p className="font-bold text-gray-900 truncate">{user.full_name}</p>
                  <p className="text-sm font-semibold capitalize" style={{color: '#D4862D'}}>
                    {user.user_type}
                  </p>
                </div>
              </div>
              {user.location && (
                <p className={`text-sm font-medium mt-2 truncate transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                   style={{color: '#52A675'}}>
                  📍 {user.location}
                </p>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
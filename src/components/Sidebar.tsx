import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Menu, Home, Camera, Utensils, Heart, MessageCircle, Info, HelpCircle, Settings, Beef } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import pashumitraLogo from 'figma:asset/19a212fc1ff0d5bd064bd27c13c5e86eb36b54c4.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', path: '/', icon: Home, label: t('dashboard') },
    { id: 'breedify', path: '/breedify', icon: Camera, label: t('breedify') },
    { id: 'nutrition', path: '/nutrition', icon: Utensils, label: t('nutrition') },
    { id: 'breeding', path: '/breeding', icon: Beef, label: t('breeding') },
    { id: 'health', path: '/health', icon: Heart, label: t('health') },
    { id: 'chatbot', path: '/chatbot', icon: MessageCircle, label: t('chatbot') },
    { id: 'about', path: '/about', icon: Info, label: t('about') },
    { id: 'help', path: '/help', icon: HelpCircle, label: t('help') },
    { id: 'settings', path: '/settings', icon: Settings, label: t('settings') },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700"
        size="sm"
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">{t('menu')}</span>
      </Button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gradient-to-b from-green-800 to-green-900 text-white`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img src={pashumitraLogo} alt="PashuMitra" className="h-8 w-8" />
              <h1 className="text-xl font-semibold">{t('appName')}</h1>
            </div>
            <Button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-green-700"
              size="sm"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-700 text-white'
                      : 'text-green-100 hover:bg-green-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
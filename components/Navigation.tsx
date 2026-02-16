
import React from 'react';
import { Screen } from '../types';
import { Home, Calendar, Heart, Settings } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: Screen.PLAYER, label: 'Direct', icon: Home },
    { id: Screen.SCHEDULE, label: 'Programme', icon: Calendar },
    { id: Screen.FAVORITES, label: 'Favoris', icon: Heart },
    { id: Screen.SETTINGS, label: 'Réglages', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 px-6 pt-3 pb-8 z-50">
      <div className="flex justify-between items-center relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors flex-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}
            >
              <Icon size={24} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

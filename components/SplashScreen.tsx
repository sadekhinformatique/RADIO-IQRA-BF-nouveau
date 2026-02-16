
import React from 'react';
import { LOGO_URL } from '../constants';
import { ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  return (
    <div className="h-full flex flex-col justify-between items-center py-12 px-8 bg-background-light dark:bg-background-dark animate-in fade-in duration-1000">
      <div className="w-full h-12"></div>
      
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full p-2 bg-white dark:bg-neutral-800 shadow-2xl shadow-primary/20 overflow-hidden">
            <img 
              src={LOGO_URL} 
              alt="Radio Iqra Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        <div className="mt-12 text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Radio Iqra
          </h1>
          <p className="text-xl font-arabic font-bold text-primary">
            إِذَاعَةُ إِقْرَأْ
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold text-neutral-500 tracking-wider">
              96.1 MHZ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
            <p className="text-sm font-medium text-neutral-500 italic">
              La Voix du Saint Coran
            </p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-8">
        <button 
          onClick={onComplete}
          className="group w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
        >
          Commencer l'écoute
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-48 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-primary w-1/3 rounded-full animate-[shimmer_2s_infinite]"></div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
            Version 2.4.0
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

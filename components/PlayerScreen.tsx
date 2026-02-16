
import React from 'react';
import { LOGO_URL } from '../constants';
import { ChevronDown, MoreHorizontal, Timer, SkipBack, SkipForward, Share2, VolumeX, Volume2, Play, Pause } from 'lucide-react';

interface PlayerScreenProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className="h-full flex flex-col p-6 pb-32 animate-in slide-in-from-bottom duration-500">
      <header className="flex justify-between items-center mb-8">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm">
          <ChevronDown className="text-slate-600 dark:text-slate-300" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-semibold uppercase tracking-widest text-primary">Radio Iqra</h1>
          <p className="text-[10px] font-medium opacity-60">96.1 MHZ • FM LIVE</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm">
          <MoreHorizontal className="text-slate-600 dark:text-slate-300" />
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center gap-10">
        <div className="relative w-64 h-64 md:w-72 md:h-72">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-4 bg-primary/5 rounded-full animate-pulse"></div>
          <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
            <img 
              src={LOGO_URL} 
              alt="Program Album Art" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-[10px] font-bold text-white mb-2 shadow-lg shadow-red-500/20">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            EN DIRECT
          </div>
          <h2 className="text-3xl font-bold dark:text-white">La Voix du Saint Coran</h2>
          <p className="font-arabic text-4xl mt-6 text-slate-700 dark:text-slate-300">إِذَاعَةُ إِقْرَأْ</p>
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {/* Equalizer Wave Animation */}
        <div className="flex items-end justify-center gap-1.5 h-12">
          {[0.1, 0.3, 0.5, 0.2, 0.4, 0.1, 0.6, 0.2, 0.4, 0.3].map((delay, i) => (
            <div 
              key={i}
              className="w-1.5 bg-primary/60 rounded-full animate-wave"
              style={{ 
                height: isPlaying ? `${Math.random() * 100}%` : '10%',
                animationDelay: `${delay}s`,
                animationDuration: '0.6s'
              }}
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-between px-2">
          <button className="text-slate-400 hover:text-primary transition-colors">
            <Timer size={28} />
          </button>
          <button className="text-slate-800 dark:text-white hover:text-primary transition-colors">
            <SkipBack size={36} fill="currentColor" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="translate-x-1" />}
          </button>
          <button className="text-slate-800 dark:text-white hover:text-primary transition-colors">
            <SkipForward size={36} fill="currentColor" />
          </button>
          <button className="text-slate-400 hover:text-primary transition-colors">
            <Share2 size={28} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-4">
          <VolumeX className="text-slate-400" size={18} />
          <div className="flex-grow h-1.5 bg-slate-200 dark:bg-white/10 rounded-full relative">
            <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-primary rounded-full"></div>
            <div className="absolute left-[66%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md cursor-pointer"></div>
          </div>
          <Volume2 className="text-slate-400" size={18} />
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
        .animate-wave {
          animation: wave infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PlayerScreen;


import React, { useState, useEffect, useRef } from 'react';
import { LOGO_URL } from '../constants';
import { ChevronDown, MoreHorizontal, Timer, SkipBack, SkipForward, Share2, VolumeX, Volume2, Play, Pause, Mic, Square, Download } from 'lucide-react';

interface PlayerScreenProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ isPlaying, setIsPlaying, volume, setVolume }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    if (!isPlaying && !isRecording) {
      alert("Veuillez lancer le direct avant d'enregistrer.");
      return;
    }

    if (!isRecording) {
      setIsRecording(true);
      setRecordedBlob(null);
      // In a real app, we would start MediaRecorder here
    } else {
      setIsRecording(false);
      // Simulate a recorded file
      setRecordedBlob(new Blob(["Mock recording data"], { type: 'audio/mp3' }));
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Radio_Iqra_Enregistrement_${new Date().getTime()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 pb-32 animate-in slide-in-from-bottom duration-500 bg-background-light dark:bg-background-dark">
      <header className="flex justify-between items-center mb-8">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm transition-transform active:scale-90">
          <ChevronDown className="text-slate-600 dark:text-slate-300" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-semibold uppercase tracking-widest text-primary">Radio Iqra</h1>
          <p className="text-[10px] font-medium opacity-60 text-slate-500 dark:text-slate-400">96.1 MHZ • FM LIVE</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm transition-transform active:scale-90">
          <MoreHorizontal className="text-slate-600 dark:text-slate-300" />
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center gap-10">
        <div className="relative w-64 h-64 md:w-72 md:h-72">
          <div className={`absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20 ${isPlaying ? 'block' : 'hidden'}`}></div>
          <div className={`absolute inset-4 bg-primary/5 rounded-full animate-pulse ${isPlaying ? 'block' : 'hidden'}`}></div>
          <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105">
            <img 
              src={LOGO_URL} 
              alt="Program Album Art" 
              className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'scale-110' : 'scale-100 grayscale-[0.5]'}`}
            />
          </div>
          
          {/* Recording Badge */}
          {isRecording && (
            <div className="absolute -top-2 -right-2 z-20 bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-lg animate-bounce">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              REC {formatTime(recordingTime)}
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-[10px] font-bold text-white mb-2 shadow-lg shadow-red-500/20">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            EN DIRECT
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">La Voix du Saint Coran</h2>
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
                height: isPlaying ? `${20 + Math.random() * 80}%` : '10%',
                animationDelay: `${delay}s`,
                animationDuration: '0.6s'
              }}
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-between px-2">
          <button 
            onClick={() => alert("Minuteur de mise en veille activé (30 min)")}
            className="text-slate-400 hover:text-primary transition-colors p-2"
          >
            <Timer size={24} />
          </button>
          
          <button 
            onClick={handleToggleRecording}
            className={`transition-all p-3 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-white/5'}`}
          >
            {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 active:scale-95 transition-all hover:shadow-primary/50"
          >
            {isPlaying ? <Pause size={44} fill="currentColor" /> : <Play size={44} fill="currentColor" className="translate-x-1" />}
          </button>

          {recordedBlob ? (
            <button 
              onClick={downloadRecording}
              className="text-primary hover:text-primary-dark transition-colors p-3 bg-primary/10 rounded-full animate-bounce"
            >
              <Download size={24} />
            </button>
          ) : (
            <button 
              onClick={() => alert("Lien de partage copié dans le presse-papier !")}
              className="text-slate-400 hover:text-primary transition-colors p-2"
            >
              <Share2 size={24} />
            </button>
          )}

          <button 
            onClick={() => alert("Passer au programme suivant")}
            className="text-slate-400 hover:text-primary transition-colors p-2"
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-4">
          <button onClick={() => setVolume(0)} className="text-slate-400 hover:text-primary transition-colors">
            <VolumeX size={18} />
          </button>
          <div className="flex-grow h-1.5 bg-slate-200 dark:bg-white/10 rounded-full relative cursor-pointer group" 
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const newVolume = Math.round((x / rect.width) * 100);
                 setVolume(Math.max(0, Math.min(100, newVolume)));
               }}>
            <div className="absolute left-0 top-0 bottom-0 bg-primary rounded-full transition-all duration-150" style={{ width: `${volume}%` }}></div>
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md transition-all duration-150 group-hover:scale-125" style={{ left: `calc(${volume}% - 8px)` }}></div>
          </div>
          <button onClick={() => setVolume(100)} className="text-slate-400 hover:text-primary transition-colors">
            <Volume2 size={18} />
          </button>
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

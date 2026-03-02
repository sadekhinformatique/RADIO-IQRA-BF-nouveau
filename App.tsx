
import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Screen } from './types';
import { STREAM_URL } from './constants';
import SplashScreen from './components/SplashScreen';
import PlayerScreen from './components/PlayerScreen';
import ScheduleScreen from './components/ScheduleScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SettingsScreen from './components/SettingsScreen';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('radio-iqra-volume');
    return saved ? parseInt(saved, 10) : 66;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('radio-iqra-volume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle Audio Playback with HLS support
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.volume = volume / 100;

    if (isPlaying) {
      if (Hls.isSupported()) {
        if (!hlsRef.current) {
          hlsRef.current = new Hls();
          hlsRef.current.loadSource(STREAM_URL);
          hlsRef.current.attachMedia(audio);
        }
        audio.play().catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        // Native support (Safari)
        audio.src = STREAM_URL;
        audio.play().catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
      // For live streams, it's often better to destroy HLS on pause to stop downloading chunks
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      audio.src = '';
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isPlaying]);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen onComplete={() => setCurrentScreen(Screen.PLAYER)} />;
      case Screen.PLAYER:
        return <PlayerScreen isPlaying={isPlaying} setIsPlaying={setIsPlaying} volume={volume} setVolume={setVolume} />;
      case Screen.SCHEDULE:
        return <ScheduleScreen />;
      case Screen.FAVORITES:
        return <FavoritesScreen />;
      case Screen.SETTINGS:
        return <SettingsScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <PlayerScreen isPlaying={isPlaying} setIsPlaying={setIsPlaying} volume={volume} setVolume={setVolume} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden max-w-md mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl">
      <main className="flex-grow overflow-y-auto no-scrollbar">
        {renderScreen()}
      </main>
      
      {currentScreen !== Screen.SPLASH && (
        <Navigation 
          currentScreen={currentScreen} 
          setCurrentScreen={setCurrentScreen} 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
};

export default App;

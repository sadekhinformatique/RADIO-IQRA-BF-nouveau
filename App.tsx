
import React, { useState, useEffect, useRef } from 'react';
import { Screen } from './types';
import { STREAM_URL } from './constants';
import SplashScreen from './components/SplashScreen';
import PlayerScreen from './components/PlayerScreen';
import ScheduleScreen from './components/ScheduleScreen';
import SettingsScreen from './components/SettingsScreen';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Audio Playback
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
    }

    const audio = audioRef.current;

    if (isPlaying) {
      // For live streams, it's better to reload to ensure we are at the "live" point 
      // instead of playing from a buffer if it was paused for a long time.
      audio.load();
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    return () => {
      // Cleanup is handled by the ref persisting, but we pause on unmount
      audio.pause();
    };
  }, [isPlaying]);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen onComplete={() => setCurrentScreen(Screen.PLAYER)} />;
      case Screen.PLAYER:
        return <PlayerScreen isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case Screen.SCHEDULE:
        return <ScheduleScreen />;
      case Screen.SETTINGS:
        return <SettingsScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <PlayerScreen isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
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

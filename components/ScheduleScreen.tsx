
import React, { useState, useMemo, useEffect } from 'react';
import { WEEKLY_SCHEDULE } from '../constants';
import { Bell, User, Search, Filter, Clock } from 'lucide-react';

const ScheduleScreen: React.FC = () => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const currentDayName = days[new Date().getDay()];
  
  const [selectedDay, setSelectedDay] = useState(currentDayName);
  const [searchQuery, setSearchQuery] = useState('');
  const showPrayerTimes = localStorage.getItem('pref-prayer-times') === 'true';

  const prayerTimes = [
    { name: 'Fajr', time: '05:12' },
    { name: 'Dhuhr', time: '12:25' },
    { name: 'Asr', time: '15:45' },
    { name: 'Maghrib', time: '18:15' },
    { name: 'Isha', time: '19:30' },
  ];

  const filteredPrograms = useMemo(() => {
    const dayData = WEEKLY_SCHEDULE.find(d => d.day === selectedDay);
    if (!dayData) return [];
    
    if (!searchQuery.trim()) return dayData.programs;
    
    return dayData.programs.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.speaker.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedDay, searchQuery]);

  return (
    <div className="h-full flex flex-col pt-12 animate-in slide-in-from-right duration-500 bg-background-light dark:bg-background-dark">
      <header className="px-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Programme</h1>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
            <User className="text-primary" size={20} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un programme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
          />
        </div>

        {showPrayerTimes && (
          <div className="mb-8 p-5 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-white/5 dark:to-transparent rounded-[32px] border border-primary/10 shadow-sm">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Clock size={14} className="text-primary" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Horaires de Prière • Ouagadougou</h3>
            </div>
            <div className="flex justify-between items-center">
              {prayerTimes.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">{p.name}</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {WEEKLY_SCHEDULE.map(day => (
            <button 
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedDay === day.day 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-primary/10'
              }`}
            >
              {day.day === currentDayName ? "Aujourd'hui" : day.day}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow px-6 pb-32 space-y-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70">
            {selectedDay} {selectedDay === currentDayName && "• En cours"}
          </h2>
          {selectedDay === currentDayName && (
            <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              DIRECT
            </span>
          )}
        </div>

        <div className="space-y-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className={`relative flex gap-5 ${program.isPast ? 'opacity-40' : ''}`}>
              <div className="flex flex-col items-center">
                <span className={`text-xs font-bold whitespace-nowrap ${program.isLive ? 'text-primary' : 'text-slate-400'}`}>
                  {program.time}
                </span>
                <div className={`w-0.5 h-full mt-2 rounded-full ${program.isLive ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
              </div>

              <div className="flex-grow pb-8">
                <div className={`p-5 rounded-[28px] transition-all duration-300 ${
                  program.isLive 
                  ? 'bg-white dark:bg-primary/10 border-2 border-primary ring-8 ring-primary/5 shadow-xl shadow-primary/10' 
                  : 'bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    {program.isLive && (
                      <span className="px-2.5 py-1 rounded-lg bg-primary text-[10px] font-extrabold text-white uppercase tracking-wider">
                        Maintenant
                      </span>
                    )}
                    <div className="flex-grow"></div>
                    {program.isLive && <div className="animate-pulse h-2 w-2 rounded-full bg-primary" />}
                  </div>

                  <h3 className={`font-bold text-lg leading-tight mb-2 ${program.isLive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                    {program.title}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <User size={14} className="text-primary" />
                    </div>
                    <p className={`text-sm font-medium ${program.isLive ? 'text-primary' : 'text-slate-500'}`}>
                      {program.speaker}
                    </p>
                  </div>

                  {!program.isLive && !program.isPast && (
                    <button 
                      onClick={() => alert(`Rappel activé pour: ${program.title}`)}
                      className="mt-5 w-full py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95"
                    >
                      <Bell size={14} />
                      M'AVERTIR
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                <Search size={24} className="text-slate-300" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Aucun programme trouvé</p>
                <p className="text-slate-400 text-xs mt-1">Essayez d'autres mots-clés ou changez de jour.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScheduleScreen;


import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '../constants';
// Fixed: Removed non-existent 'Equalizer' and unused 'BellOff' from lucide-react imports
import { Bell, User } from 'lucide-react';

const ScheduleScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Lundi');

  return (
    <div className="h-full flex flex-col pt-12 animate-in slide-in-from-right duration-500">
      <header className="px-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Programme</h1>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
            <User className="text-primary" size={20} />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {WEEKLY_SCHEDULE.map(day => (
            <button 
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedDay === day.day 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-primary/5 dark:bg-white/5 text-slate-400 hover:bg-primary/10'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow px-6 pb-32 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70">
            {selectedDay === 'Lundi' ? "Aujourd'hui • Lundi" : selectedDay}
          </h2>
          {selectedDay === 'Lundi' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 animate-pulse">
              DIRECT
            </span>
          )}
        </div>

        <div className="space-y-6">
          {WEEKLY_SCHEDULE.find(d => d.day === selectedDay)?.programs.map((program) => (
            <div key={program.id} className={`relative flex gap-5 ${program.isPast ? 'opacity-40' : ''}`}>
              <div className="flex flex-col items-center">
                <span className={`text-xs font-bold whitespace-nowrap ${program.isLive ? 'text-primary' : 'text-slate-400'}`}>
                  {program.time}
                </span>
                <div className={`w-0.5 h-full mt-2 rounded-full ${program.isLive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
              </div>

              <div className="flex-grow pb-8">
                <div className={`p-5 rounded-2xl transition-all ${
                  program.isLive 
                  ? 'bg-primary/10 border-2 border-primary ring-8 ring-primary/5 shadow-xl' 
                  : 'bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    {program.isLive && (
                      <span className="px-2 py-1 rounded-md bg-primary text-[10px] font-extrabold text-white uppercase">
                        Maintenant
                      </span>
                    )}
                    <div className="flex-grow"></div>
                    {program.isLive && <div className="animate-pulse h-2 w-2 rounded-full bg-primary" />}
                  </div>

                  <h3 className={`font-bold text-lg leading-tight mb-2 ${program.isLive ? 'text-slate-900 dark:text-white' : ''}`}>
                    {program.title}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <User size={12} className="text-primary" />
                    </div>
                    <p className={`text-sm font-medium ${program.isLive ? 'text-primary' : 'text-slate-500'}`}>
                      {program.speaker}
                    </p>
                  </div>

                  {!program.isLive && !program.isPast && (
                    <button className="mt-4 px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-[11px] font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-colors">
                      <Bell size={14} />
                      RAPPELER
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {WEEKLY_SCHEDULE.find(d => d.day === selectedDay)?.programs.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-medium italic">Aucun programme prévu pour cette journée.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScheduleScreen;

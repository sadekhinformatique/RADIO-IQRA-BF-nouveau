
import React from 'react';
import { ChevronRight, Music, Bell, Moon, Sun, Info, Shield, Star, LogOut } from 'lucide-react';

interface SettingsScreenProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ isDarkMode, setIsDarkMode }) => {
  const sections = [
    {
      title: 'Paramètres Audio',
      items: [
        { icon: Music, label: 'Qualité Audio', value: 'Élevée', color: 'bg-primary/10 text-primary' },
      ]
    },
    {
      title: 'Préférences',
      items: [
        { icon: Bell, label: 'Horaires de Prière', type: 'toggle', active: true, color: 'bg-blue-500/10 text-blue-500' },
        { icon: Bell, label: 'Nouveaux Programmes', type: 'toggle', active: false, color: 'bg-orange-500/10 text-orange-500' },
        { 
          icon: isDarkMode ? Moon : Sun, 
          label: 'Thème', 
          value: isDarkMode ? 'Mode Sombre' : 'Mode Clair', 
          type: 'theme-toggle',
          color: 'bg-purple-500/10 text-purple-500'
        },
      ]
    },
    {
      title: 'Information',
      items: [
        { icon: Info, label: 'À propos de nous', color: 'bg-teal-500/10 text-teal-500' },
        { icon: Shield, label: 'Politique de confidentialité', color: 'bg-rose-500/10 text-rose-500' },
        { icon: Star, label: 'Noter l\'application', color: 'bg-amber-500/10 text-amber-500' },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col pt-12 px-6 pb-32 animate-in slide-in-from-right duration-500">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Réglages</h1>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary/70 px-1">
              {section.title}
            </h2>
            
            <div className="bg-slate-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-4 hover:bg-primary/5 transition-colors cursor-pointer ${
                      i !== section.items.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''
                    }`}
                    onClick={() => {
                      if (item.type === 'theme-toggle') setIsDarkMode(!isDarkMode);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.value && (
                        <span className="text-sm font-medium text-slate-400">{item.value}</span>
                      )}
                      
                      {item.type === 'toggle' || item.type === 'theme-toggle' ? (
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${
                          (item.type === 'toggle' && item.active) || (item.type === 'theme-toggle' && isDarkMode)
                          ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                        }`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                            (item.type === 'toggle' && item.active) || (item.type === 'theme-toggle' && isDarkMode)
                            ? 'left-6' : 'left-1'
                          }`} />
                        </div>
                      ) : (
                        <ChevronRight size={18} className="text-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 p-5 rounded-3xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-all">
          <LogOut size={20} />
          Se déconnecter
        </button>

        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
          Radio Iqra Version 1.0.4 (Build 42)
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;

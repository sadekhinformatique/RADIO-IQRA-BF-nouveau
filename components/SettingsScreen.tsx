
import React, { useState, useEffect } from 'react';
import { ChevronRight, Music, Bell, Moon, Sun, Info, Shield, Star, LogOut, LucideIcon } from 'lucide-react';
import Modal from './Modal';

interface SettingsScreenProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

interface SettingsItem {
  id: string;
  icon: LucideIcon;
  label: string;
  value?: string;
  type?: 'toggle' | 'theme-toggle' | 'action';
  active?: boolean;
  color: string;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [prayerTimesEnabled, setPrayerTimesEnabled] = useState(() => localStorage.getItem('pref-prayer-times') === 'true');
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => localStorage.getItem('pref-notifications') === 'true');
  const [dataSaverEnabled, setDataSaverEnabled] = useState(() => localStorage.getItem('pref-data-saver') === 'true');
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  useEffect(() => {
    localStorage.setItem('pref-prayer-times', prayerTimesEnabled.toString());
  }, [prayerTimesEnabled]);

  useEffect(() => {
    localStorage.setItem('pref-notifications', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('pref-data-saver', dataSaverEnabled.toString());
  }, [dataSaverEnabled]);

  const sections: SettingsSection[] = [
    {
      title: 'Paramètres Audio',
      items: [
        { 
          id: 'data-saver',
          icon: Music, 
          label: 'Économiseur de données', 
          type: 'toggle',
          active: dataSaverEnabled,
          value: dataSaverEnabled ? 'Activé' : 'Désactivé',
          color: 'bg-primary/10 text-primary' 
        },
      ]
    },
    {
      title: 'Préférences',
      items: [
        { 
          id: 'prayer-times',
          icon: Bell, 
          label: 'Horaires de Prière', 
          type: 'toggle', 
          active: prayerTimesEnabled, 
          color: 'bg-blue-500/10 text-blue-500' 
        },
        { 
          id: 'notifications',
          icon: Bell, 
          label: 'Nouveaux Programmes', 
          type: 'toggle', 
          active: notificationsEnabled, 
          color: 'bg-orange-500/10 text-orange-500' 
        },
        { 
          id: 'theme',
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
        { id: 'about', icon: Info, label: 'À propos de nous', color: 'bg-teal-500/10 text-teal-500', type: 'action' },
        { id: 'privacy', icon: Shield, label: 'Politique de confidentialité', color: 'bg-rose-500/10 text-rose-500', type: 'action' },
        { id: 'rate', icon: Star, label: 'Noter l\'application', color: 'bg-amber-500/10 text-amber-500', type: 'action' },
      ]
    }
  ];

  const handleItemClick = (item: SettingsItem) => {
    switch (item.id) {
      case 'theme':
        setIsDarkMode(!isDarkMode);
        break;
      case 'prayer-times':
        setPrayerTimesEnabled(!prayerTimesEnabled);
        break;
      case 'notifications':
        setNotificationsEnabled(!notificationsEnabled);
        break;
      case 'data-saver':
        setDataSaverEnabled(!dataSaverEnabled);
        break;
      case 'about':
        setModalContent({
          title: 'À propos de nous',
          content: (
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>Radio Iqra est une station de radio islamique dédiée à la diffusion de la parole d'Allah et à l'éducation spirituelle.</p>
              <p>Notre mission est de fournir un contenu de haute qualité, accessible à tous, pour renforcer la foi et la compréhension de l'Islam.</p>
              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <p className="font-bold text-slate-900 dark:text-white">Contact:</p>
                <p>Email: contact@radioiqra.bf</p>
                <p>Téléphone: +226 XX XX XX XX</p>
              </div>
            </div>
          )
        });
        break;
      case 'privacy':
        setModalContent({
          title: 'Confidentialité',
          content: (
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>Nous accordons une grande importance à la protection de vos données personnelles.</p>
              <p>Radio Iqra ne collecte aucune information personnelle sans votre consentement explicite. Vos préférences sont stockées localement sur votre appareil.</p>
              <p>L'accès au microphone est uniquement utilisé pour les fonctionnalités interactives futures et n'est jamais enregistré sans votre action.</p>
            </div>
          )
        });
        break;
      case 'rate':
        setModalContent({
          title: 'Noter l\'application',
          content: (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="text-amber-400" fill="currentColor" size={32} />)}
              </div>
              <p className="text-slate-600 dark:text-slate-400">Votre avis nous aide à nous améliorer !</p>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20">
                Ouvrir le Store
              </button>
            </div>
          )
        });
        break;
    }
  };

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
                const isActive = (item.type === 'toggle' && item.active) || (item.type === 'theme-toggle' && isDarkMode);
                
                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-4 hover:bg-primary/5 transition-colors cursor-pointer ${
                      i !== section.items.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
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
                          isActive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                        }`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                            isActive ? 'left-6' : 'left-1'
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

        <button 
          onClick={() => setModalContent({ title: 'Déconnexion', content: <p className="text-center py-4">Vous avez été déconnecté avec succès.</p> })}
          className="w-full flex items-center justify-center gap-3 p-5 rounded-3xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-all"
        >
          <LogOut size={20} />
          Se déconnecter
        </button>

        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
          Radio Iqra Version 1.0.4 (Build 42)
        </p>
      </div>

      <Modal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title || ''}
      >
        {modalContent?.content}
      </Modal>
    </div>
  );
};

export default SettingsScreen;

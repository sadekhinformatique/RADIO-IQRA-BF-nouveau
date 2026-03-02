
import React from 'react';
import { Heart, Play, Trash2, User } from 'lucide-react';
import { LOGO_URL } from '../constants';

const FavoritesScreen: React.FC = () => {
  const favorites = [
    { id: '1', title: 'Récitation du Coran', speaker: 'Sheikh Mishary Rashid Al-Afasy', duration: '45:00' },
    { id: '2', title: 'Adhkars du matin', speaker: 'Sheikh Mansour Al-Salimi', duration: '12:30' },
    { id: '3', title: 'Histoires des Prophètes', speaker: 'Sheikh Nabil Al-Awadi', duration: '32:15' },
  ];

  return (
    <div className="h-full flex flex-col pt-12 animate-in slide-in-from-right duration-500">
      <header className="px-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Favoris</h1>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="text-primary" size={20} fill="currentColor" />
          </div>
        </div>
      </header>

      <main className="flex-grow px-6 pb-32 space-y-6">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="bg-white dark:bg-white/5 p-4 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center gap-4 group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={LOGO_URL} alt={fav.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{fav.title}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <User size={12} className="text-primary" />
                  <p className="text-xs text-slate-500 truncate">{fav.speaker}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{fav.duration}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-transform">
                  <Play size={18} fill="currentColor" className="translate-x-0.5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium">Vous n'avez pas encore de favoris.</p>
            <p className="text-xs text-slate-500 mt-2 px-10">Ajoutez vos programmes préférés pour les retrouver ici.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesScreen;

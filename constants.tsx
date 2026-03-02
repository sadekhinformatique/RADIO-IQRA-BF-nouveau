
import { DailySchedule } from './types';

export const LOGO_URL = "https://proxy.zeno.fm/content/stations/agxzfnplbm8tc3RhdHNyMgsSCkF1dGhDbGllbnQYgIDwzoyamAoMCxIOU3RhdGlvblByb2ZpbGUYgIDwjpDJpgoMogEEemVubw/image/?u=1661899574000";

export const STREAM_URL = "https://radioiqrabf-1.radiohls.infomaniak.com/radioiqrabf-1/manifest.m3u8";

export const WEEKLY_SCHEDULE: DailySchedule[] = [
  {
    day: "Lundi",
    programs: [
      { id: '1', time: '07:30', title: 'Adhkars du matin', speaker: 'Sheikh Mansour Al-Salimi', isPast: true },
      { id: '2', time: '09:00', title: 'Récitation du Coran', speaker: 'Sheikh Mishary Rashid Al-Afasy', isLive: true },
      { id: '3', time: '11:30', title: 'Discussion Religieuse', speaker: 'Imam Ahmed Al-Tayeb' },
      { id: '4', time: '14:00', title: 'Exégèse (Tafsir)', speaker: 'Dr. Omar Abdelkafi' },
    ]
  },
  {
    day: "Mardi",
    programs: [
      { id: '5', time: '08:00', title: 'Histoires des Prophètes', speaker: 'Sheikh Nabil Al-Awadi' },
      { id: '6', time: '10:30', title: 'Apprentissage du Tajwid', speaker: 'Sheikh Ayman Swaid' },
      { id: '7', time: '16:00', title: 'Questions-Réponses', speaker: 'Sheikh Assim Al-Hakeem' },
    ]
  },
  {
    day: "Mercredi",
    programs: [
      { id: '8', time: '09:00', title: 'La Sira du Prophète', speaker: 'Dr. Yasir Qadhi' },
      { id: '9', time: '14:30', title: 'Éthique Musulmane', speaker: 'Sheikh Hamza Yusuf' },
    ]
  },
  {
    day: "Jeudi",
    programs: [
      { id: '10', time: '07:30', title: 'Adhkars du matin', speaker: 'Sheikh Mansour Al-Salimi' },
      { id: '11', time: '19:00', title: 'Veillée Spirituelle', speaker: 'Sheikh Habib Ali Al-Jifri' },
    ]
  },
  {
    day: "Vendredi",
    programs: [
      { id: '12', time: '12:30', title: 'Sermon du Vendredi (Khutba)', speaker: 'Imam de la Grande Mosquée', isLive: false },
      { id: '13', time: '15:00', title: 'Lecture de Sourate Al-Kahf', speaker: 'Sheikh Maher Al-Muaiqly' },
    ]
  },
  {
    day: "Samedi",
    programs: [
      { id: '14', time: '10:00', title: 'Éducation des Enfants', speaker: 'Dr. Jassim Al-Mutawa' },
    ]
  },
  {
    day: "Dimanche",
    programs: [
      { id: '15', time: '11:00', title: 'Économie Islamique', speaker: 'Dr. Monzer Kahf' },
    ]
  },
];

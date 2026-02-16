
import { DailySchedule } from './types';

export const LOGO_URL = "https://proxy.zeno.fm/content/stations/agxzfnplbm8tc3RhdHNyMgsSCkF1dGhDbGllbnQYgIDwzoyamAoMCxIOU3RhdGlvblByb2ZpbGUYgIDwjpDJpgoMogEEemVubw/image/?u=1661899574000";

export const STREAM_URL = "https://radioiqrabf-1.ice.infomaniak.ch/radioiqrabf-96.mp3";

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
    ]
  },
  { day: "Mercredi", programs: [] },
  { day: "Jeudi", programs: [] },
  { day: "Vendredi", programs: [] },
];

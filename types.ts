
export enum Screen {
  SPLASH = 'splash',
  PLAYER = 'player',
  SCHEDULE = 'schedule',
  FAVORITES = 'favorites',
  SETTINGS = 'settings'
}

export interface Program {
  id: string;
  time: string;
  title: string;
  speaker: string;
  isLive?: boolean;
  isPast?: boolean;
}

export interface DailySchedule {
  day: string;
  programs: Program[];
}

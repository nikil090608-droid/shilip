import React from 'react';
import {
  Play,
  BookOpen,
  Sprout,
  Trophy,
  Settings,
  Sparkles,
  Info,
  Flame,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenWhyClay: () => void;
  onOpenGallery: () => void;
  onOpenContest: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenHowToPlay,
  onOpenWhyClay,
  onOpenGallery,
  onOpenContest,
  onOpenSettings,
}) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between items-center px-4 py-8 text-center overflow-hidden">
      {/* Workshop Decorative Motifs & Ambience */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Diya Lamps in corners */}
      <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 p-2.5 rounded-full bg-amber-950/60 border border-amber-800/40 backdrop-blur-sm animate-diya">
        <Flame className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-semibold text-amber-200 pr-2">Shilpashala</span>
      </div>

      <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 p-2.5 rounded-full bg-amber-950/60 border border-amber-800/40 backdrop-blur-sm">
        <span className="text-xs text-amber-300 font-semibold px-2">🌱 Eco Workshop</span>
      </div>

      {/* Top Festival Subtitle */}
      <div className="mt-4 sm:mt-6 z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/50 border border-amber-600/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>GANESH CHATURTHI GAME DESIGN CONTEST</span>
        </div>
      </div>

      {/* Main Branding Section */}
      <div className="my-auto z-10 max-w-2xl px-2">
        <h1 className="text-5xl sm:text-7xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)] tracking-wider">
          SHILPI
        </h1>

        <h2 className="text-lg sm:text-2xl font-bold font-festive text-amber-300 mt-2 tracking-wide uppercase">
          CREATE YOUR BAPPA • BUILD YOUR MANDAL
        </h2>

        {/* Core Captions */}
        <div className="my-5 space-y-1.5">
          <p className="text-base sm:text-2xl font-bold font-heading text-amber-100 tracking-wide drop-shadow-sm">
            “YOUR HANDS. YOUR BAPPA. YOUR MANDAL. OUR EARTH.”
          </p>
          <p className="text-xs sm:text-sm font-medium text-amber-300/90 italic">
            🐘 Phase 1: Sculpt Bappa with Mitti • 🛕 Phase 2: Design the Sacred Mandal
          </p>
        </div>

        {/* Central Workshop Illustration Vignette */}
        <div className="relative mx-auto my-4 w-52 h-44 sm:w-64 sm:h-52 flex items-center justify-center">
          {/* Subtle Glow circle */}
          <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent blur-xl" />

          {/* SVG Rangoli & Clay Pot Craft Vignette */}
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
            {/* Rangoli Base Ring */}
            <circle cx="100" cy="110" r="45" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="110" r="38" fill="#451a03" stroke="#b45309" strokeWidth="1" />

            {/* Clay Pots & Mitti Mound */}
            <ellipse cx="100" cy="115" rx="30" ry="12" fill="#543310" />
            <path d="M 75,110 C 70,80 130,80 125,110 Z" fill="#b8754a" stroke="#78350f" strokeWidth="1.5" />
            <ellipse cx="100" cy="85" rx="14" ry="7" fill="#c98a60" />

            {/* Marigold flower garlands */}
            <circle cx="75" cy="115" r="7" fill="#ea580c" />
            <circle cx="125" cy="115" r="7" fill="#facc15" />
            <circle cx="100" cy="122" r="7" fill="#ea580c" />

            {/* Diya at front */}
            <path d="M 90,126 C 92,134 108,134 110,126 Z" fill="#9a3412" stroke="#ea580c" strokeWidth="1" />
            <path d="M 97,125 C 99,118 103,118 103,125 Z" fill="#fde047" />
          </svg>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-3 max-w-md mx-auto mt-2">
          <button
            onClick={() => {
              sound.playTempleBell();
              onStartGame();
            }}
            className="group relative flex items-center justify-center gap-3 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold text-base sm:text-lg shadow-[0_4px_25px_rgba(245,158,11,0.5)] border-2 border-amber-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-stone-950 text-stone-950 group-hover:scale-110 transition-transform" />
            <span>START SHILPASHALA (BAPPA & MANDAL)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5 mt-1">
            <button
              onClick={() => {
                sound.playClick();
                onOpenHowToPlay();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-500 text-amber-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>HOW TO PLAY</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenWhyClay();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-emerald-700/50 hover:border-emerald-500 text-emerald-300 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>WHY NATURAL CLAY?</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenGallery();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-500 text-amber-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>MY CREATIONS</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenContest();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-500 text-amber-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Info className="w-4 h-4 text-amber-400" />
              <span>ABOUT CONTEST</span>
            </button>
          </div>

          <div className="flex justify-center mt-1">
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettings();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs text-stone-400 hover:text-amber-300 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings & Audio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Devotional Footer */}
      <div className="mt-8 z-10 border-t border-amber-900/40 pt-3 w-full max-w-md">
        <p className="font-heading font-bold text-amber-400/90 text-sm sm:text-base tracking-widest">
          🙏 Ganpati Bappa Morya!
        </p>
      </div>
    </div>
  );
};

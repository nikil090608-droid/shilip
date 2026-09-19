import React from 'react';
import { X, Sparkles, Sprout, HeartHandshake, Eye, Crown, Palette } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phase1Steps = [
    {
      num: 1,
      title: 'Choose Natural Clay',
      icon: Sprout,
      desc: 'Select traditional Shaadu clay or natural paper pulp. Learn why natural materials dissolve safely.',
    },
    {
      num: 2,
      title: 'Clay Prep Workshop',
      icon: Sparkles,
      desc: 'Sprinkle water, knead, press, shape, and pop air bubbles to reach the Perfect Clay state.',
    },
    {
      num: 3,
      title: 'Sculpt Bappa Step-by-Step',
      icon: HeartHandshake,
      desc: 'Progressively build Base → Body & Posture → Sacred Face & Trunk → Mukut Crown → Holy Offerings & Colors.',
    },
  ];

  const phase2Steps = [
    {
      num: 4,
      title: 'Select Mandal Architectural Theme',
      icon: Crown,
      desc: 'Choose from Traditional Wada, Eco Nature Sanctum, Gramin Village, Royal Durbar, or Modern Indian.',
    },
    {
      num: 5,
      title: 'Design Sanctum within Budget',
      icon: Palette,
      desc: 'Place marigold torans, clay diyas, living plants, dhol troupe, wheelchair ramps, and segregated waste bins.',
    },
    {
      num: 6,
      title: 'Sacred Rice Rangoli & Darshan',
      icon: Sparkles,
      desc: 'Draw floor rangoli with botanical pigments, perform Aarti, shower flowers, and simulate clean home Visarjan.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-stone-900 border-2 border-amber-600/60 rounded-2xl shadow-2xl p-6 text-amber-50">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400 hover:text-amber-200 hover:bg-amber-950/60 transition-colors"
          aria-label="Close how to play"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Game Guide</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-200 mt-1">
            How to Play SHILPI
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Phase 1: Sculpt Your Bappa • Phase 2: Build Your Sacred Mandal
          </p>
        </div>

        {/* Phase 1 Section */}
        <div className="mb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
            🐘 Phase 1: Natural Clay Idol Creation
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {phase1Steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="p-3 rounded-xl bg-stone-800/80 border border-amber-800/40"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30 mb-2">
                    {st.num}
                  </div>
                  <h3 className="font-semibold text-amber-100 text-xs">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2 Section */}
        <div className="mb-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            🛕 Phase 2: Design & Build the Mandal
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {phase2Steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="p-3 rounded-xl bg-stone-800/80 border border-emerald-800/40"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30 mb-2">
                    {st.num}
                  </div>
                  <h3 className="font-semibold text-emerald-100 text-xs">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-amber-300/80 italic text-center sm:text-left">
            “Your custom Ganesha from Phase 1 is enthroned inside your Mandal in Phase 2!”
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-lg transition-all"
          >
            Enter Shilpashala
          </button>
        </div>
      </div>
    </div>
  );
};

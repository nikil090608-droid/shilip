import React, { useState } from 'react';
import { EarStyle, ExpressionType, EyeStyle, IdolConfig, TrunkDirection } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { Eye, Ear, Sparkles, ArrowRight, Smile } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageFaceTrunkProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageFaceTrunk: React.FC<StageFaceTrunkProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'eyes' | 'ears' | 'trunk' | 'expression'>('eyes');

  const eyeOptions: { id: EyeStyle; label: string; desc: string }[] = [
    { id: 'calm', label: 'Calm & Meditative', desc: 'Serene Dhyanamudra eyes with half-closed peaceful lids.' },
    { id: 'joyful', label: 'Joyful & Radiant', desc: 'Bright smiling eyes radiating warmth and welcoming blessing.' },
    { id: 'traditional', label: 'Classical Meenakshi', desc: 'Fish-shaped classical eyes accented with sacred kajal contours.' },
  ];

  const earOptions: { id: EarStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Elephant Ears', desc: 'Graceful rounded fan ears symbolizing attentive listening.' },
    { id: 'wide', label: 'Wide Supakarna', desc: 'Expansive winnowing basket ears to sift truth from illusion.' },
    { id: 'decorative', label: 'Ornamental Scalloped', desc: 'Traditional temple-carved ears adorned with auspicious golden motifs.' },
  ];

  const trunkOptions: { id: TrunkDirection; label: string; desc: string }[] = [
    { id: 'left', label: 'Left-Turned (Idampuri)', desc: 'Turns towards the sweet modaks. Peaceful, serene, ideal for homes.' },
    { id: 'right', label: 'Right-Turned (Valampuri)', desc: 'Sun energy (Pingala Nadi). Radiant, disciplined, and powerful.' },
    { id: 'center', label: 'Central Graceful Curve', desc: 'Poised along the centerline, holding a golden modak in harmony.' },
  ];

  const expressionOptions: { id: ExpressionType; label: string; desc: string }[] = [
    { id: 'peaceful', label: 'Peaceful Bliss (Shanti)', desc: 'Tranquil inward contemplation and calming presence.' },
    { id: 'joyful', label: 'Gentle Divine Smile (Ananda)', desc: 'Affectionate and cheerful, delighting children and families.' },
    { id: 'blessing', label: 'Compassionate Grace (Karuna)', desc: 'Auspicious protective warmth dissolving all anxieties.' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 4 of 10 • Sacred Carving
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Design the Divine Face & Trunk
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          Carve the eyes of wisdom, the ears that listen to every prayer, and the benevolent trunk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Idol Face Preview (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 sm:h-96 bg-radial from-amber-950/40 to-stone-950 rounded-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <GaneshaRenderer config={config} stage="face-trunk" glow />
            <span className="absolute bottom-3 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-600/40 text-[11px] font-semibold text-amber-300">
              Carved Face Darshan
            </span>
          </div>
        </div>

        {/* Right: Sub-features Tabs & Selection (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          {/* Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-stone-900/90 border border-amber-900/50">
            {[
              { id: 'eyes', label: 'Eyes', icon: Eye },
              { id: 'ears', label: 'Ears', icon: Ear },
              { id: 'trunk', label: 'Trunk', icon: Sparkles },
              { id: 'expression', label: 'Bhava', icon: Smile },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-400 hover:text-amber-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Options Panel depending on active tab */}
          <div className="space-y-2.5 min-h-[220px]">
            {activeTab === 'eyes' && (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Choose Eye Style (Netra)
                </span>
                {eyeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playClaySquish();
                      onUpdateConfig({ eyeStyle: opt.id });
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      config.eyeStyle === opt.id
                        ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold text-sm text-amber-100">{opt.label}</span>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </>
            )}

            {activeTab === 'ears' && (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Choose Ear Style (Karna)
                </span>
                {earOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playClaySquish();
                      onUpdateConfig({ earStyle: opt.id });
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      config.earStyle === opt.id
                        ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold text-sm text-amber-100">{opt.label}</span>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </>
            )}

            {activeTab === 'trunk' && (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Choose Trunk Direction (Vakratunda)
                </span>
                {trunkOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playClaySquish();
                      onUpdateConfig({ trunkDirection: opt.id });
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      config.trunkDirection === opt.id
                        ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold text-sm text-amber-100">{opt.label}</span>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </>
            )}

            {activeTab === 'expression' && (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Divine Expression (Bhava)
                </span>
                {expressionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playClaySquish();
                      onUpdateConfig({ expression: opt.id });
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      config.expression === opt.id
                        ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold text-sm text-amber-100">{opt.label}</span>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Continue button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playTempleBell();
                onNext();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg border border-amber-400/50 transition-all hover:scale-102"
            >
              <span>Continue: Craft the Sacred Crown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

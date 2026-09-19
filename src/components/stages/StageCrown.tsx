import React from 'react';
import { CrownAccent, CrownStyle, IdolConfig } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { Crown, Sprout, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageCrownProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageCrown: React.FC<StageCrownProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const crownOptions: {
    id: CrownStyle;
    name: string;
    icon: string;
    desc: string;
    ecoBonus: string;
    isEco: boolean;
  }[] = [
    {
      id: 'traditional',
      name: 'Traditional Royal Mukut',
      icon: '👑',
      desc: 'Multi-tiered golden pagoda crown featuring sacred filigree carvings and jewel crest.',
      ecoBonus: '+6 Eco Points',
      isEco: false,
    },
    {
      id: 'flower',
      name: 'Fresh Marigold & Jasmine Wreath',
      icon: '🌺',
      desc: 'Braided garland of vibrant orange marigolds, golden petals, and fragrant white jasmine.',
      ecoBonus: '🌱 +10 ECO BONUS',
      isEco: true,
    },
    {
      id: 'leaf',
      name: 'Sacred Peepal & Aak Leaf Crown',
      icon: '🌿',
      desc: 'Vedic herbal crown crafted with sacred tree leaves symbolizing nature’s shelter.',
      ecoBonus: '🌱 +10 ECO BONUS',
      isEco: true,
    },
    {
      id: 'simple',
      name: 'Handcrafted Mitti Pagoda',
      icon: '✨',
      desc: 'Pure earthen clay crown sculpted directly into the head with geometric temple tiers.',
      ecoBonus: '🌱 +8 ECO BONUS',
      isEco: true,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 5 of 10 • Adorning with Royalty
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Design the Sacred Crown (Mukut)
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          Honor Lord Ganesha with a traditional golden pagoda or an eco-friendly botanical crown.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Idol with Crown (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 sm:h-96 bg-radial from-amber-950/40 to-stone-950 rounded-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <GaneshaRenderer config={config} stage="crown" glow />
            <span className="absolute bottom-3 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-600/40 text-[11px] font-semibold text-amber-300">
              Crown Preview
            </span>
          </div>
        </div>

        {/* Right: Crown Selection Cards (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-2.5">
            {crownOptions.map((opt) => {
              const isSelected = config.crownStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playClaySquish();
                    if (opt.isEco) sound.playCelebrationChime();
                    onUpdateConfig({ crownStyle: opt.id });
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-start justify-between gap-3 transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{opt.icon}</span>
                      <span className="font-bold text-sm text-amber-100">{opt.name}</span>
                    </div>
                    <p className="text-[11px] text-stone-300 mt-1 leading-snug">{opt.desc}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      opt.isEco
                        ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                        : 'border-amber-500/40 bg-amber-950/60 text-amber-300'
                    }`}
                  >
                    {opt.ecoBonus}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Eco Bonus Banner when botanical crown selected */}
          {(config.crownStyle === 'flower' || config.crownStyle === 'leaf' || config.crownStyle === 'simple') && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
              <Sprout className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Eco Bonus Active:</strong> Natural organic crowns decompose harmoniously back into the soil!
              </span>
            </div>
          )}

          {/* Continue button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playTempleBell();
                onNext();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg border border-amber-400/50 transition-all hover:scale-102"
            >
              <span>Continue: Sacred Offerings & Decor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { EcoChoiceType, IdolConfig } from '../../types';
import { Sprout, RefreshCw, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageEcoChoiceProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageEcoChoice: React.FC<StageEcoChoiceProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const options = [
    {
      id: 'natural' as EcoChoiceType,
      icon: Sprout,
      name: 'Option A: 🌱 Natural & Home Bucket / Plant Visarjan',
      impact: 'Highest Sustainability (+15 Eco Score)',
      badgeColor: 'bg-emerald-950/80 border-emerald-500 text-emerald-300',
      desc: 'Immerse your natural clay Bappa at home in a clean bucket or garden planter. The dissolved mitti enriches the soil for a sacred plant like Tulsi or flowering marigolds.',
      benefit: 'Protects natural rivers and lakes completely while carrying the blessing into your daily home garden.',
    },
    {
      id: 'reusable' as EcoChoiceType,
      icon: RefreshCw,
      name: 'Option B: ♻️ Reusable Decor & Artificial Community Tank',
      impact: 'High Sustainability (+10 Eco Score)',
      badgeColor: 'bg-amber-950/80 border-amber-500 text-amber-300',
      desc: 'Use durable brass or fabric pandal decor and perform immersion in designated municipal artificial ponds or water tanks rather than natural lakes.',
      benefit: 'Prevents choking natural water streams, allowing municipal teams to recycle the sediment safely.',
    },
    {
      id: 'single-use' as EcoChoiceType,
      icon: AlertCircle,
      name: 'Option C: 🎀 Single-Use Thermocol & Direct River Immersion',
      impact: 'Traditional / Lower Eco Score (-5 Eco)',
      badgeColor: 'bg-stone-900 border-stone-600 text-stone-400',
      desc: 'Single-use plastic glitter and direct immersion into local riverbeds or open sea without filtration.',
      benefit: 'Educational Note: Plastic thermocol sheets and non-biodegradable glitter persist in the environment for decades and can harm aquatic ecosystems.',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 8 of 10 • Conscious Celebration
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-1">
          ONE LAST CHOICE
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-1">
          How will you celebrate and immerse your creation? Your choice shapes the festival’s ecological footprint.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {options.map((opt) => {
          const isSelected = config.ecoChoice === opt.id;
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => {
                sound.playClick();
                if (opt.id === 'natural') sound.playCelebrationChime();
                onUpdateConfig({ ecoChoice: opt.id });
              }}
              className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 bg-stone-850 shadow-lg ring-1 ring-amber-400/50 transform -translate-y-0.5'
                  : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-sm sm:text-base text-amber-100 font-heading">
                    {opt.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${opt.badgeColor}`}>
                    {opt.impact}
                  </span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-2">
                {opt.desc}
              </p>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400">
                <strong className="text-amber-300/90">Outcome: </strong>
                {opt.benefit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation button */}
      <div className="flex justify-end pt-4 border-t border-stone-800">
        <button
          onClick={() => {
            sound.playTempleBell();
            onNext();
          }}
          className="flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg border border-amber-400/50 transition-all hover:scale-105"
        >
          <span>Continue: Name Your Ganesha</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

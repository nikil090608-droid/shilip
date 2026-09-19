import React from 'react';
import { MaterialType } from '../../types';
import { Sprout, FileText, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageMaterialProps {
  selectedMaterial: MaterialType;
  onSelectMaterial: (mat: MaterialType) => void;
  onNext: () => void;
}

export const StageMaterial: React.FC<StageMaterialProps> = ({
  selectedMaterial,
  onSelectMaterial,
  onNext,
}) => {
  const materials = [
    {
      id: 'natural-clay' as MaterialType,
      name: '🌱 NATURAL CLAY (SHAADU MITTI)',
      subtitle: 'Traditional Natural River Clay',
      recommended: true,
      ecoBonus: '+100 ECO BONUS',
      badgeColor: 'bg-emerald-950/80 border-emerald-500 text-emerald-300',
      description:
        'The timeless traditional choice. Hand-dug from river silt and natural clay pits, it is soft, malleable, and naturally breaks down in water when immersed.',
      ecoFacts:
        'Natural clay can naturally break down in water compared with many non-biodegradable idol materials. It can also be immersed at home in a bucket to nourish potted plants.',
    },
    {
      id: 'paper-pulp' as MaterialType,
      name: '🪨 PAPER & NATURAL FIBER',
      subtitle: 'Lightweight Eco-Friendly Alternative',
      recommended: false,
      ecoBonus: '+80 ECO BONUS',
      badgeColor: 'bg-amber-950/80 border-amber-500 text-amber-300',
      description:
        'Crafted from recycled newspaper, natural vegetable gum, and plant fibers. Extremely lightweight, durable during transport, and biodegradable.',
      ecoFacts:
        'A lighter eco-friendly solution for apartment dwellings. Dissolves within several days in water and leaves minimal solid residue.',
    },
    {
      id: 'plaster-of-paris' as MaterialType,
      name: '⚠️ PLASTER OF PARIS (PoP)',
      subtitle: 'Commercial Synthetic Casting',
      recommended: false,
      ecoBonus: 'LOW ECO SCORE',
      badgeColor: 'bg-stone-900 border-stone-600 text-stone-400',
      description:
        'A synthetic gypsum-based powder mixed with chemical binders. It cures quickly into rigid plaster and is common in mass commercial idol production.',
      ecoFacts:
        'Educational Note: PoP does not easily dissolve in natural water bodies and can take months to break down, forming heavy sludge. If chosen, artificial tank immersion is strongly recommended.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 1 of 10 • Foundation of Creation
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-1">
          Choose Your Idol Material
        </h2>
        <p className="text-sm text-stone-300 max-w-xl mx-auto mt-1">
          Every Ganesha begins with the earth. Your material choice shapes the entire idol and its environmental journey.
        </p>
      </div>

      {/* 3 Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {materials.map((mat) => {
          const isSelected = selectedMaterial === mat.id;
          return (
            <div
              key={mat.id}
              onClick={() => {
                sound.playClick();
                onSelectMaterial(mat.id);
                if (mat.id === 'natural-clay') {
                  sound.playCelebrationChime();
                }
              }}
              className={`relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                isSelected
                  ? 'bg-stone-800/95 border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.3)] transform -translate-y-1'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-600 hover:bg-stone-850'
              }`}
            >
              {/* Recommended / Bonus Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${mat.badgeColor}`}>
                  {mat.ecoBonus}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
              </div>

              <div>
                <h3 className="font-bold text-base text-amber-100 font-heading leading-snug">
                  {mat.name}
                </h3>
                <span className="text-xs text-amber-400/90 font-medium block mt-0.5 mb-2">
                  {mat.subtitle}
                </span>

                <p className="text-xs text-stone-300 leading-relaxed mb-3">
                  {mat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-normal">
                <strong className="text-stone-300 block mb-0.5">Impact:</strong>
                {mat.ecoFacts}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Material Feedback Banner */}
      {selectedMaterial === 'natural-clay' && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 animate-fade-in mb-8">
          <Sprout className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <strong>🌱 Excellent Traditional Choice: +100 Eco Bonus Awarded!</strong>
            <p className="text-xs text-emerald-300/90 mt-0.5">
              “Natural clay can naturally break down in water compared with many non-biodegradable idol materials.”
            </p>
          </div>
        </div>
      )}

      {selectedMaterial === 'paper-pulp' && (
        <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-600/50 text-amber-200 text-xs sm:text-sm flex items-center gap-3 animate-fade-in mb-8">
          <FileText className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <strong>🪨 Thoughtful Choice: +80 Eco Bonus Awarded!</strong>
            <p className="text-xs text-amber-300/90 mt-0.5">
              Paper pulp is lightweight and fully biodegradable when made with organic adhesives.
            </p>
          </div>
        </div>
      )}

      {selectedMaterial === 'plaster-of-paris' && (
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-xs sm:text-sm flex items-center gap-3 animate-fade-in mb-8">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <strong>⚠️ Educational Note on Non-Biodegradable Casts</strong>
            <p className="text-xs text-stone-400 mt-0.5">
              PoP remains solid for extended periods in natural water bodies. You can still continue sculpting your Ganesha!
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end pt-4 border-t border-stone-800">
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg border border-amber-500/40 transition-all hover:scale-105"
        >
          <span>Continue to Prepare Clay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

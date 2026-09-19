import React from 'react';
import { DecorationId, IdolConfig } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { DECORATIONS_LIST } from '../../utils/gameLogic';
import { Sparkles, Check, Plus, Trash2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageDecorateProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

const MAX_SLOTS = 5;

export const StageDecorate: React.FC<StageDecorateProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const activeDecorations = config.decorations || [];

  const handleToggle = (id: DecorationId) => {
    if (activeDecorations.includes(id)) {
      sound.playClick();
      onUpdateConfig({
        decorations: activeDecorations.filter((d) => d !== id),
      });
    } else {
      if (activeDecorations.length >= MAX_SLOTS) {
        sound.playAirBubblePop();
        alert(`You can choose up to ${MAX_SLOTS} sacred offerings at once to keep the altar balanced.`);
        return;
      }
      sound.playTempleBell();
      onUpdateConfig({
        decorations: [...activeDecorations, id],
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 6 of 10 • Sacred Offerings & Decor
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Adorn Your Bappa
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          Choose up to {MAX_SLOTS} traditional, eco-friendly offerings to drape and place around the sanctum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Decorated Idol Preview (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 sm:h-96 bg-radial from-amber-950/40 to-stone-950 rounded-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <GaneshaRenderer config={config} stage="decorate" glow />

            {/* Active slot indicator pill */}
            <div className="absolute bottom-3 px-3 py-1 rounded-full bg-stone-900/85 border border-amber-500/40 text-[11px] font-semibold text-amber-200">
              Offerings Placed: {activeDecorations.length} / {MAX_SLOTS}
            </div>
          </div>
        </div>

        {/* Right: Offerings Palette & Slots (6 cols) */}
        <div className="md:col-span-6 space-y-3">
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {DECORATIONS_LIST.map((item) => {
              const isActive = activeDecorations.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isActive
                      ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-amber-100">{item.name}</span>
                      {item.isEco && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                          🌱 Eco
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-tight">{item.description}</p>
                  </div>

                  <div className="flex-shrink-0">
                    {isActive ? (
                      <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 text-stone-400 flex items-center justify-center hover:border-amber-500 hover:text-amber-300">
                        <Plus className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
              <span>Continue: Natural Colors Workshop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

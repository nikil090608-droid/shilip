import React from 'react';
import { IdolConfig, PaletteId } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { COLOR_PALETTES } from '../../utils/gameLogic';
import { Palette, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageColorsProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageColors: React.FC<StageColorsProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 7 of 10 • Natural Color Workshop
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Naturally Inspired Palettes
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          “Choose natural-looking, environmentally responsible decoration options.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Colored Idol Preview (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 sm:h-96 bg-radial from-amber-950/40 to-stone-950 rounded-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <GaneshaRenderer config={config} stage="colors" glow />
            <span className="absolute bottom-3 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-600/40 text-[11px] font-semibold text-amber-300">
              Palette & Sacred Dhoti Preview
            </span>
          </div>
        </div>

        {/* Right: Palette Cards & Educational disclaimer (6 cols) */}
        <div className="md:col-span-6 space-y-3">
          {/* Disclaimer badge */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Naturally Inspired Palette:</strong> In traditional crafting, artisans recommend certified non-toxic mineral and botanical pigments like Haldi (turmeric), Geru (red ochre), and Multani mitti. Real-world safety depends on the actual product source.
            </p>
          </div>

          {/* Palette cards */}
          <div className="space-y-2.5">
            {COLOR_PALETTES.map((pal) => {
              const isSelected = config.paletteId === pal.id;
              return (
                <button
                  key={pal.id}
                  onClick={() => {
                    sound.playClaySquish();
                    onUpdateConfig({ paletteId: pal.id });
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-amber-100">{pal.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-stone-300 mt-0.5">{pal.description}</p>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-400">Body:</span>
                        <span className="w-4 h-4 rounded-full border border-stone-600 inline-block" style={{ backgroundColor: pal.bodyTone }} />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-400">Dhoti:</span>
                        <span className="w-4 h-4 rounded-full border border-stone-600 inline-block" style={{ backgroundColor: pal.dhotiTone }} />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-400">Accent:</span>
                        <span className="w-4 h-4 rounded-full border border-stone-600 inline-block" style={{ backgroundColor: pal.accentTone }} />
                      </div>
                    </div>
                  </div>
                </button>
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
              <span>Continue: Responsible Festival Choice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { IdolConfig } from '../../types';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageNamingProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageNaming: React.FC<StageNamingProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const [nameInput, setNameInput] = useState<string>(config.name || 'Shilpi Bappa');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const nameSuggestions = [
    'Shilpi Bappa',
    'Eco Bappa',
    'Vighnaharta',
    'Morya',
    'Sukhakarta',
    'Lambodara',
    'Prakriti Bappa',
  ];

  const handleSelectSuggestion = (val: string) => {
    sound.playClick();
    setNameInput(val);
    setErrorMsg('');
  };

  const handleProceed = () => {
    // Sanitize user input: remove script tags, limit length
    const sanitized = nameInput
      .replace(/<[^>]*>?/gm, '')
      .replace(/[^\w\s\u0900-\u097F-]/gi, '')
      .trim()
      .slice(0, 32);

    if (!sanitized) {
      setErrorMsg('Please provide a devotional name for your creation.');
      return;
    }

    sound.playConchResonance();
    onUpdateConfig({ name: sanitized });
    onNext();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 text-center animate-fade-in">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold mb-4">
        <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>Stage 9 of 10 • Devotional Naming</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold font-heading text-amber-100 mb-2">
        Name Your Ganesha
      </h2>
      <p className="text-sm sm:text-base text-amber-300/80 font-medium italic mb-8">
        “Every creation deserves a name.”
      </p>

      {/* Input box */}
      <div className="bg-stone-900/90 border-2 border-amber-600/60 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1.5">
            YOUR BAPPA’S SACRED NAME
          </label>
          <input
            type="text"
            value={nameInput}
            maxLength={32}
            onChange={(e) => {
              setNameInput(e.target.value);
              setErrorMsg('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleProceed();
            }}
            placeholder="e.g. Shilpi Bappa"
            className="w-full px-4 py-3.5 rounded-xl bg-stone-950 border border-amber-500/50 text-amber-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errorMsg && (
            <span className="text-xs text-red-400 block mt-1.5">{errorMsg}</span>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="text-left pt-2">
          <span className="text-xs text-stone-400 block mb-2 font-medium">
            Devotional Suggestions:
          </span>
          <div className="flex flex-wrap gap-2">
            {nameSuggestions.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  nameInput === sug
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-amber-200 border border-stone-700'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Finalize Button */}
        <div className="pt-4 border-t border-stone-800">
          <button
            onClick={handleProceed}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-base shadow-xl border border-amber-400/50 transition-all hover:scale-102"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Reveal My Creation (Prana Pratishtha)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

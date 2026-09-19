import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StoryIntroProps {
  onNext: () => void;
  onSkip: () => void;
}

export const StoryIntro: React.FC<StoryIntroProps> = ({ onNext, onSkip }) => {
  const [step, setStep] = useState(0);

  const lines = [
    { text: '“Every year, millions of families welcome Bappa home.”', sub: 'A festival of divine joy, shared sweets, and community devotion.' },
    { text: '“In Phase 1: YOU sculpt Bappa from natural clay.”', sub: 'Traditional river Shaadu mitti that respects our waters and soil.' },
    { text: '“In Phase 2: YOU design and build the sacred Mandal.”', sub: 'An eco-friendly pandal sanctum with flowers, diyas, music, and community care.' },
    { text: '“Your custom Bappa is enthroned inside your Mandal.”', sub: 'Surrounded by rice rangoli, festive dhol-tasha, and living plants.' },
    { text: '“Create, celebrate, and protect our sacred Earth.”', sub: 'Step into Shilpashala. Your hands and imagination are ready.' },
  ];

  // Auto-advance or allow click
  useEffect(() => {
    if (step < lines.length - 1) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [step, lines.length]);

  const handleNext = () => {
    sound.playClick();
    if (step < lines.length - 1) {
      setStep((s) => s + 1);
    } else {
      sound.playTempleBell();
      onNext();
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between items-center px-4 py-10 max-w-2xl mx-auto text-center">
      {/* Top Skip Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            sound.playClick();
            onSkip();
          }}
          className="text-xs font-semibold text-stone-400 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-stone-900/60 border border-stone-800 transition-colors"
        >
          Skip to Workshop →
        </button>
      </div>

      {/* Narrative Card */}
      <div className="my-auto px-4 py-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>A SACRED INVITATION</span>
        </div>

        {/* Dynamic Line with smooth animation */}
        <div key={step} className="transition-all duration-700 animate-fade-in space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-amber-100 leading-tight drop-shadow-md">
            {lines[step].text}
          </h2>
          <p className="text-sm sm:text-base text-amber-300/85 max-w-md mx-auto">
            {lines[step].sub}
          </p>
        </div>

        {/* Step dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {lines.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                sound.playClick();
                setStep(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-amber-400' : 'w-2 bg-stone-700 hover:bg-stone-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-amber-950/80">
        <button
          onClick={handleNext}
          className="w-full sm:w-auto flex items-center justify-center gap-3 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-base shadow-xl border border-amber-400/50 transition-all hover:scale-105"
        >
          {step === lines.length - 1 ? (
            <>
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>START CREATING</span>
            </>
          ) : (
            <>
              <span>Continue Story</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

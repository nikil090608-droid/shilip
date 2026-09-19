import React from 'react';
import { X, Sprout, ShieldCheck, Droplet, Flame, HelpCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface WhyNaturalClayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhyNaturalClayModal: React.FC<WhyNaturalClayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const infoCards = [
    {
      icon: Sprout,
      tag: '🌱 CLAY',
      title: 'The Earth Cycle',
      desc: '“Shape it. Dry it. Decorate it. Celebrate it.” Natural Shaadu mitti originates from riverbeds and returns peacefully to the earth upon immersion.',
    },
    {
      icon: Flame,
      tag: '🪔 TRADITION',
      title: 'Centuries of Heritage',
      desc: '“Many traditional idols are handcrafted from natural materials.” In classical Vedic traditions, Ganesha idols were sculpted from local riverside clay and immersed within days.',
    },
    {
      icon: Droplet,
      tag: '💧 WATER BODIES',
      title: 'Gentle Dissolution',
      desc: 'Natural clay breaks down more readily in water compared to non-biodegradable alternatives, helping keep municipal waterways and lakes cleaner.',
    },
    {
      icon: ShieldCheck,
      tag: '♻️ RESPONSIBILITY',
      title: 'Our Shared Future',
      desc: '“Your festival choices can influence the environment.” Choosing plant-based pigments and natural decorations protects aquatic life and communities.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-stone-900 border-2 border-emerald-600/60 rounded-2xl shadow-2xl p-6 text-stone-100">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-emerald-400 hover:text-emerald-200 hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold mb-2">
            <Sprout className="w-4 h-4" /> Environmental Wisdom
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-emerald-300">
            Why Natural Clay?
          </h2>
          <p className="text-sm text-stone-300 max-w-lg mx-auto mt-1">
            Understanding the environmental importance of responsible festival choices.
          </p>
        </div>

        {/* Highlight quote */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/40 text-sm text-emerald-200 leading-relaxed mb-6 text-center">
          “Natural clay has been traditionally used for making idols. Depending on the material and local conditions, natural clay can break down more readily in water than synthetic materials, reducing environmental impact.”
        </div>

        {/* 4 Interactive Educational Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-800/90 border border-emerald-900/50 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{card.tag}</span>
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-stone-100 text-base mb-1">{card.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible immersion notice */}
        <div className="mt-6 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <strong>Community Guideline:</strong> Always follow local environmental regulations for immersion. Consider immersing natural clay idols at home in a bucket or pot, or in dedicated municipal artificial immersion tanks to keep natural rivers and seas pristine.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg transition-all"
          >
            I Understand & Commit
          </button>
        </div>
      </div>
    </div>
  );
};

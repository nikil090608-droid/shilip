import React, { useState } from 'react';
import { BodyPosture, BodySize, IdolConfig } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { RotateCcw, Undo2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageBuildBodyProps {
  config: IdolConfig;
  onUpdateConfig: (partial: Partial<IdolConfig>) => void;
  onNext: () => void;
}

export const StageBuildBody: React.FC<StageBuildBodyProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  // Local history for UNDO functionality
  const [history, setHistory] = useState<{ size: BodySize; posture: BodyPosture }[]>([
    { size: config.bodySize, posture: config.bodyPosture },
  ]);

  const handleSizeChange = (size: BodySize) => {
    sound.playClaySquish();
    setHistory((prev) => [...prev, { size, posture: config.bodyPosture }]);
    onUpdateConfig({ bodySize: size });
  };

  const handlePostureChange = (posture: BodyPosture) => {
    sound.playClaySquish();
    setHistory((prev) => [...prev, { size: config.bodySize, posture }]);
    onUpdateConfig({ bodyPosture: posture });
  };

  const handleUndo = () => {
    if (history.length > 1) {
      sound.playClick();
      const nextHistory = [...history];
      nextHistory.pop(); // remove current
      const prev = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      onUpdateConfig({ bodySize: prev.size, bodyPosture: prev.posture });
    }
  };

  const handleReset = () => {
    sound.playClick();
    onUpdateConfig({ bodySize: 'medium', bodyPosture: 'sitting' });
    setHistory([{ size: 'medium', posture: 'sitting' }]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 3 of 10 • Sculpting the Divine Form
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Build the Sacred Body
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          Sculpt the foundation: select the idol proportion and traditional divine posture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Idol Preview (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 sm:h-96 bg-radial from-amber-950/40 to-stone-950 rounded-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <GaneshaRenderer config={config} stage="build-body" glow />
            <span className="absolute bottom-3 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-600/40 text-[11px] font-semibold text-amber-300">
              Molded Torso & Asana Preview
            </span>
          </div>

          {/* Undo & Reset buttons */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                history.length > 1
                  ? 'border-amber-700/60 bg-stone-850 text-amber-200 hover:bg-stone-800'
                  : 'border-stone-800 bg-stone-900 text-stone-600 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo Choice</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-800 bg-stone-850 text-stone-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Body</span>
            </button>
          </div>
        </div>

        {/* Right: Customization Controls (6 cols) */}
        <div className="md:col-span-6 space-y-5">
          {/* 1. Body Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
              Body Size & Proportions
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'small' as BodySize, label: 'Small', desc: 'Bal Ganesha / Compact Home Altar' },
                { id: 'medium' as BodySize, label: 'Medium', desc: 'Classic Mandir / Balanced Form' },
                { id: 'large' as BodySize, label: 'Large', desc: 'Majestic / Grand Devotional Form' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => handleSizeChange(sz.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    config.bodySize === sz.id
                      ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <span className="font-bold text-sm text-amber-100 block">{sz.label}</span>
                  <span className="text-[10px] text-stone-400 block mt-1 leading-tight">{sz.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Body Posture */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
              Sacred Posture (Asana)
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'sitting' as BodyPosture,
                  label: 'Sitting (Padmasana / Lalitasana)',
                  desc: 'Traditional peaceful cross-legged seated posture on a carved lotus pedestal.',
                },
                {
                  id: 'standing' as BodyPosture,
                  label: 'Standing (Sthanaka Posture)',
                  desc: 'Auspicious upright stance symbolizing readiness to protect and remove obstacles.',
                },
                {
                  id: 'blessing' as BodyPosture,
                  label: 'Radiant Blessing Pose',
                  desc: 'Majestic pose with one knee gracefully poised, extending boons to devotees.',
                },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => handlePostureChange(pos.id)}
                  className={`w-full p-3 rounded-xl border text-left flex flex-col justify-center transition-all ${
                    config.bodyPosture === pos.id
                      ? 'border-amber-400 bg-amber-950/70 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <span className="font-bold text-sm text-amber-100">{pos.label}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">{pos.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playTempleBell();
                onNext();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg border border-amber-400/50 transition-all hover:scale-102"
            >
              <span>Continue: Design the Face & Trunk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

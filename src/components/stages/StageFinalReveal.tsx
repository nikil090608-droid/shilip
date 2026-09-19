import React, { useState, useEffect } from 'react';
import { IdolConfig, MandalConfig, ScoreBreakdown } from '../../types';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { MandalRenderer } from '../MandalRenderer';
import { PetalCanvas } from '../PetalCanvas';
import { calculateGameScores, saveCreation } from '../../utils/gameLogic';
import { downloadShareCard } from '../../utils/canvasCard';
import {
  Flame,
  Sparkles,
  Download,
  Sprout,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Eye,
  Waves,
  Award,
  Coins,
  Palette,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageFinalRevealProps {
  config: IdolConfig;
  mandalConfig?: MandalConfig;
  onRestart: () => void;
  onOpenWhyClay: () => void;
  onOpenGallery: () => void;
}

export const StageFinalReveal: React.FC<StageFinalRevealProps> = ({
  config,
  mandalConfig,
  onRestart,
  onOpenWhyClay,
  onOpenGallery,
}) => {
  const [scores] = useState<ScoreBreakdown>(() =>
    calculateGameScores(config, mandalConfig)
  );
  const [viewMode, setViewMode] = useState<'mandal' | 'idol'>('mandal');
  const [isAartiActive, setIsAartiActive] = useState<boolean>(false);
  const [isPetalsBurst, setIsPetalsBurst] = useState<boolean>(true);
  const [showImpactModal, setShowImpactModal] = useState<boolean>(false);
  const [showVisarjanModal, setShowVisarjanModal] = useState<boolean>(false);
  const [visarjanProgress, setVisarjanProgress] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Auto-trigger celebratory sounds on entry and save to gallery
  useEffect(() => {
    sound.playTempleBell();
    setTimeout(() => sound.playCelebrationChime(), 1000);
    setTimeout(() => sound.playConchResonance(), 2200);

    // Save to local storage gallery
    saveCreation(config, scores, mandalConfig);
  }, [config, scores, mandalConfig]);

  // Perform Aarti interaction
  const handlePerformAarti = () => {
    sound.playTempleBell();
    sound.playAartiBell();
    setIsAartiActive(true);
    setTimeout(() => {
      setIsAartiActive(false);
    }, 4500);
  };

  // Offer Flowers interaction
  const handleOfferFlowers = () => {
    sound.playCelebrationChime();
    setIsPetalsBurst(true);
    setTimeout(() => setIsPetalsBurst(false), 5000);
  };

  // Download Share Card
  const handleDownload = () => {
    sound.playClick();
    downloadShareCard(config, scores, mandalConfig);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Trigger Eco Visarjan Animation in Modal
  const startVisarjanSimulation = () => {
    sound.playWaterSplash();
    setVisarjanProgress(0);
    setShowVisarjanModal(true);

    const interval = setInterval(() => {
      setVisarjanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sound.playCelebrationChime();
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  const materialLabel =
    config.material === 'natural-clay'
      ? '🌱 Natural Shaadu Clay (100% Biodegradable)'
      : config.material === 'paper-pulp'
      ? '🪨 Recycled Paper & Plant Starch'
      : '⚠️ Traditional Plaster of Paris';

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-3 min-h-[90vh] flex flex-col justify-between">
      {/* Falling Festive Petal Canvas Overlay */}
      <PetalCanvas isBurst={isPetalsBurst} />

      {/* Top Banner */}
      <div className="text-center z-10 animate-fade-in mb-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-semibold mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>PRANA PRATISHTHA & SACRED FESTIVAL DARSHAN</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 drop-shadow-md">
          “YOUR BAPPA IS READY. YOUR MANDAL IS ALIVE.”
        </h1>
        <p className="text-xs sm:text-sm font-festive text-amber-300/90 mt-0.5">
          Handcrafted with Bhakti • Built with Community • Sacred to the Earth
        </p>
      </div>

      {/* Main Darshan Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center z-10 my-auto">
        {/* Left/Center: Visual Viewport (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* View Mode Toggle: Mandal vs. Idol Close-up */}
          {mandalConfig && (
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('mandal');
                }}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  viewMode === 'mandal'
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>🛕 Grand Mandal Sanctum</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('idol');
                }}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  viewMode === 'idol'
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🐘 Bappa Craftsmanship View</span>
              </button>
            </div>
          )}

          {/* Main Stage Display Box */}
          <div className="relative w-full h-80 sm:h-[410px] bg-stone-950 rounded-3xl border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex items-center justify-center p-2 overflow-hidden">
            {viewMode === 'mandal' && mandalConfig ? (
              <MandalRenderer
                config={config}
                mandalConfig={mandalConfig}
                interactive={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                <GaneshaRenderer config={config} stage="final-reveal" glow />
              </div>
            )}

            {/* Aarti Lamp Motion Animation Overlay */}
            {isAartiActive && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-aarti">
                <div className="p-3 rounded-full bg-amber-500/20 shadow-[0_0_40px_#f59e0b]">
                  <Flame className="w-12 h-12 text-amber-300 drop-shadow-[0_0_12px_#fbbf24]" />
                </div>
              </div>
            )}

            {/* Bottom Idol & Mandal Plaque */}
            <div className="absolute bottom-3 left-4 right-4 px-4 py-2 rounded-xl bg-stone-900/90 border border-amber-500/40 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Sacred Name
                </span>
                <span className="text-base sm:text-lg font-bold font-heading text-amber-100">
                  🙏 {config.name || 'Shilpi Bappa'}
                </span>
              </div>
              <span className="text-[11px] text-amber-200/90 font-medium text-right max-w-[200px] leading-tight">
                {materialLabel}
              </span>
            </div>
          </div>

          {/* Interactive Darshan Ritual Buttons */}
          <div className="flex items-center gap-2.5 mt-3 w-full justify-center">
            <button
              onClick={handlePerformAarti}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                isAartiActive
                  ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-[0_0_20px_#f59e0b]'
                  : 'bg-stone-850 hover:bg-stone-800 text-amber-200 border-amber-700/60'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{isAartiActive ? 'Aarti Circling...' : '🪔 Perform Aarti'}</span>
            </button>

            <button
              onClick={handleOfferFlowers}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-amber-200 border border-amber-700/60 font-bold text-xs sm:text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>🌺 Shower Flowers</span>
            </button>

            <button
              onClick={startVisarjanSimulation}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/70 font-bold text-xs sm:text-sm transition-all"
            >
              <Waves className="w-4 h-4 text-emerald-400" />
              <span>🌱 Eco Visarjan</span>
            </button>
          </div>
        </div>

        {/* Right: Scores, Badges & Shilpi Title Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Shilpi Title Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/80 via-stone-900/90 to-stone-950 border-2 border-amber-500/60 shadow-xl text-center">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              AWARDED CONTEST TITLE
            </span>
            <div className="flex items-center justify-center gap-2 my-1">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-amber-100">
                {scores.shilpiTitle}
              </h2>
            </div>
            <p className="text-xs text-amber-200/90 italic">
              “{scores.summaryFeedback || 'Your hands sculpted Bappa with bhakti and built an eco-friendly mandal.'}”
            </p>

            {/* Badges Earned Strip */}
            {scores.badges && scores.badges.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-2 border-t border-amber-900/50">
                {scores.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-[10px] font-bold text-amber-300 shadow-sm"
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Multi-Dimensional 5-Pillar Score Grid */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-900/60 text-left">
              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-[10px] font-semibold text-amber-300 block">
                  🐘 Ganesha Craft
                </span>
                <span className="text-base font-bold text-amber-200 font-heading">
                  {scores.ganeshaScore}/100
                </span>
              </div>

              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-[10px] font-semibold text-amber-300 block">
                  🛕 Mandal Sanctum
                </span>
                <span className="text-base font-bold text-amber-200 font-heading">
                  {scores.mandalScore}/100
                </span>
              </div>

              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-[10px] font-semibold text-emerald-400 block">
                  🌱 Eco & Rivers
                </span>
                <span className="text-base font-bold text-emerald-300 font-heading">
                  {scores.eco}/100
                </span>
              </div>

              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-[10px] font-semibold text-orange-400 block">
                  🎨 Creativity
                </span>
                <span className="text-base font-bold text-orange-300 font-heading">
                  {scores.creativity}/100
                </span>
              </div>

              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-[10px] font-semibold text-sky-400 block">
                  💰 Budget Care
                </span>
                <span className="text-base font-bold text-sky-300 font-heading">
                  {scores.budgetScore}/100
                </span>
              </div>

              <div className="bg-amber-950/60 p-2 rounded-xl border border-amber-600/70">
                <span className="text-[10px] font-semibold text-amber-300 block">
                  ⭐ Composite
                </span>
                <span className="text-base font-bold text-amber-100 font-heading">
                  {scores.overall}/100
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-102"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>📷 DOWNLOAD FESTIVAL SHARE CARD (PNG)</span>
            </button>

            {downloadSuccess && (
              <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" /> Share card downloaded successfully!
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowImpactModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-emerald-800/60 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Impact Report</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenGallery();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-800/60 text-amber-300 text-xs font-semibold transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>My Creations</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-stone-400 hover:text-amber-300 hover:bg-stone-900/60 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Create Another Bappa & Mandal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Environmental Impact Modal */}
      {showImpactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border-2 border-emerald-600/70 rounded-2xl p-6 text-stone-100 shadow-2xl">
            <h3 className="text-xl font-bold font-heading text-emerald-300 mb-2">
              ♻️ Environmental Stewardship Report
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300 mb-6">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                <span className="font-bold text-amber-300 block">Natural Shaadu Mitti vs. PoP:</span>
                {config.material === 'natural-clay'
                  ? 'Pure Shaadu clay dissolves completely in water in hours to days, returning mineral nutrients to soil and leaving zero toxic sludge in rivers.'
                  : config.material === 'paper-pulp'
                  ? 'Recycled paper pulp breaks down naturally without leaching heavy metals.'
                  : 'PoP idols take months to dissolve and release gypsum, barium, and lead into municipal waterways.'}
              </div>

              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                <span className="font-bold text-amber-300 block">Eco-Mandal Sanctum:</span>
                Living potted plants continue cleaning the air after the festival. Reusable fabric and wooden arches eliminate plastic flex banners, while segregated bins enable municipal composting of flower nirmalya.
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowImpactModal(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-all"
              >
                Close Impact Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Eco Visarjan & Sprouting Pot Simulation Modal */}
      {showVisarjanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border-2 border-emerald-500/70 rounded-3xl p-6 text-stone-100 shadow-2xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/60 text-emerald-300 text-xs font-bold mb-2">
              <Waves className="w-3.5 h-3.5 text-emerald-400" />
              <span>SACRED HOME VISARJAN • EMBODIED NATURE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-heading text-emerald-200">
              {visarjanProgress < 100
                ? 'Sacred Clay Dissolving in Pure Water...'
                : '🌱 A New Life Sprouts from Bappa’s Clay!'}
            </h3>

            {/* Animation Canvas Box */}
            <div className="my-4 h-52 bg-stone-950 rounded-2xl border border-emerald-900/60 flex flex-col items-center justify-center relative overflow-hidden">
              {visarjanProgress < 100 ? (
                <div className="flex flex-col items-center">
                  <div
                    className="transition-all duration-300 transform"
                    style={{
                      opacity: Math.max(0.2, (100 - visarjanProgress) / 100),
                      transform: `scale(${Math.max(0.5, (100 - visarjanProgress * 0.5) / 100)})`,
                    }}
                  >
                    <span className="text-6xl block">🐘</span>
                    <span className="text-xs text-amber-300 font-bold block mt-1">
                      {config.name || 'Shilpi Bappa'}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 mt-3 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-sky-400 animate-pulse" />
                    <span>Clay returning peacefully to the waters... ({visarjanProgress}%)</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-fade-in">
                  <span className="text-6xl animate-bounce">🌱</span>
                  <span className="text-base font-bold text-emerald-300 font-heading mt-1">
                    Holy Tulsi & Marigold Seedling
                  </span>
                  <p className="text-xs text-stone-300 max-w-xs mt-1">
                    The clay from your Bappa dissolves cleanly in a balcony pot. The embedded seeds drink the pure moisture and blossom into sacred garden plants!
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-300 mb-4">
              “Punaragamanaya Cha” — May you return again next year, bringing wisdom, peace, and ecological harmony to all beings.
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setShowVisarjanModal(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-all"
            >
              Close Visarjan Ceremony
            </button>
          </div>
        </div>
      )}

      {/* Footer message */}
      <div className="mt-3 z-10 text-center border-t border-amber-950/60 pt-2">
        <p className="font-heading text-xs sm:text-sm font-bold text-amber-400/90 tracking-wider">
          “YOUR HANDS. YOUR BAPPA. YOUR MANDAL. OUR EARTH.” — Ganpati Bappa Morya!
        </p>
      </div>
    </div>
  );
};

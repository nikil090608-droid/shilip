import React, { useState } from 'react';
import { GameStage, IdolConfig, MandalConfig } from './types';
import { sound } from './utils/audio';
import { DEFAULT_MANDAL_CONFIG } from './utils/gameLogic';

// Modals
import { HowToPlayModal } from './components/modals/HowToPlayModal';
import { WhyNaturalClayModal } from './components/modals/WhyNaturalClayModal';
import { GalleryModal } from './components/modals/GalleryModal';
import { ContestAboutModal } from './components/modals/ContestAboutModal';
import { SettingsModal } from './components/modals/SettingsModal';

// Stages
import { MainMenu } from './components/stages/MainMenu';
import { StoryIntro } from './components/stages/StoryIntro';
import { StageMaterial } from './components/stages/StageMaterial';
import { StageClayPrep } from './components/stages/StageClayPrep';
import { StageBuildBody } from './components/stages/StageBuildBody';
import { StageFaceTrunk } from './components/stages/StageFaceTrunk';
import { StageCrown } from './components/stages/StageCrown';
import { StageDecorate } from './components/stages/StageDecorate';
import { StageColors } from './components/stages/StageColors';
import { StageEcoChoice } from './components/stages/StageEcoChoice';
import { StageNaming } from './components/stages/StageNaming';
import { StageMandalBuilder } from './components/stages/StageMandalBuilder';
import { StageFinalReveal } from './components/stages/StageFinalReveal';

import {
  Volume2,
  VolumeX,
  ArrowLeft,
  BookOpen,
  Sprout,
  Info,
  Trophy,
} from 'lucide-react';

const DEFAULT_CONFIG: IdolConfig = {
  material: 'natural-clay',
  clayQuality: 80,
  bodySize: 'medium',
  bodyPosture: 'sitting',
  eyeStyle: 'calm',
  earStyle: 'classic',
  trunkDirection: 'left',
  expression: 'peaceful',
  crownStyle: 'flower',
  crownAccent: 'natural-gold',
  decorations: ['marigold-garland', 'sacred-durva', 'clay-diya'],
  paletteId: 'turmeric',
  ecoChoice: 'natural',
  name: 'Shilpi Bappa',
};

const STAGES_ORDER: GameStage[] = [
  'material',
  'clay-prep',
  'build-body',
  'face-trunk',
  'crown',
  'decorate',
  'colors',
  'eco-choice',
  'naming',
  'mandal-builder',
  'final-reveal',
];

const STAGE_LABELS: Record<string, string> = {
  material: 'Material',
  'clay-prep': 'Clay Prep',
  'build-body': 'Body Form',
  'face-trunk': 'Face & Trunk',
  crown: 'Crown',
  decorate: 'Offerings',
  colors: 'Colors',
  'eco-choice': 'Visarjan',
  naming: 'Name Bappa',
  'mandal-builder': 'Build Mandal',
  'final-reveal': 'Darshan',
};

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('menu');
  const [config, setConfig] = useState<IdolConfig>(DEFAULT_CONFIG);
  const [mandalConfig, setMandalConfig] = useState<MandalConfig>(DEFAULT_MANDAL_CONFIG);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals visibility
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showWhyClay, setShowWhyClay] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showContest, setShowContest] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleUpdateConfig = (partial: Partial<IdolConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleStartGame = () => {
    setCurrentStage('story');
  };

  const handleRestart = () => {
    setConfig({ ...DEFAULT_CONFIG });
    setMandalConfig({ ...DEFAULT_MANDAL_CONFIG });
    setCurrentStage('menu');
  };

  const handleRecreateFromGallery = (savedConfig: IdolConfig, savedMandal?: MandalConfig) => {
    setConfig(savedConfig);
    if (savedMandal) {
      setMandalConfig(savedMandal);
    }
    setCurrentStage('final-reveal');
  };

  // Navigating stages
  const goToNextStage = () => {
    const currentIndex = STAGES_ORDER.indexOf(currentStage);
    if (currentIndex >= 0 && currentIndex < STAGES_ORDER.length - 1) {
      setCurrentStage(STAGES_ORDER[currentIndex + 1]);
    }
  };

  const goToPrevStage = () => {
    const currentIndex = STAGES_ORDER.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(STAGES_ORDER[currentIndex - 1]);
    } else if (currentStage === 'material' || currentStage === 'story') {
      setCurrentStage('menu');
    }
  };

  const isWorkshopActive =
    currentStage !== 'menu' &&
    currentStage !== 'story' &&
    currentStage !== 'final-reveal';

  const currentStepIndex = STAGES_ORDER.indexOf(currentStage);

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col justify-between selection:bg-amber-600 selection:text-white">
      {/* Top Universal App Header */}
      <header className="w-full border-b border-amber-950/80 bg-stone-900/90 backdrop-blur-md px-4 py-2.5 z-40 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStage !== 'menu' && (
              <button
                onClick={() => {
                  sound.playClick();
                  goToPrevStage();
                }}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setCurrentStage('menu');
              }}
              className="flex items-baseline gap-2 text-left group"
            >
              <span className="font-extrabold font-heading text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 group-hover:brightness-110">
                SHILPI
              </span>
              <span className="text-[11px] font-festive text-amber-400/90 hidden sm:inline">
                Create Your Bappa • Build Your Mandal
              </span>
            </button>
          </div>

          {/* Stepper Pill during workshop */}
          {isWorkshopActive && currentStepIndex >= 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-amber-800/40 text-xs">
              <span className="text-amber-400 font-bold">
                Stage {currentStepIndex + 1}/{STAGES_ORDER.length}:
              </span>
              <span className="text-stone-300">
                {STAGE_LABELS[currentStage]}
              </span>
            </div>
          )}

          {/* Right Header Utility Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setShowWhyClay(true);
              }}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-emerald-400 border border-emerald-900/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
              title="Why Natural Clay?"
            >
              <Sprout className="w-4 h-4" />
              <span>Eco Wisdom</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowContest(true);
              }}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-900/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
              title="About Contest"
            >
              <Info className="w-4 h-4" />
              <span>Contest</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowGallery(true);
              }}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-900/60 transition-colors"
              title="My Handcrafted Bappas"
            >
              <Trophy className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowHowToPlay(true);
              }}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-900/60 transition-colors"
              title="How to Play"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-lg border transition-colors ${
                !isMuted
                  ? 'bg-amber-950/60 border-amber-700/60 text-amber-300 hover:bg-amber-900/70'
                  : 'bg-stone-850 border-stone-700 text-stone-500 hover:bg-stone-800'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Progress Stepper Bar */}
        {isWorkshopActive && (
          <div className="w-full mt-2 h-1 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / STAGES_ORDER.length) * 100}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Content Stage Viewport */}
      <main className="flex-1 flex flex-col justify-center">
        {currentStage === 'menu' && (
          <MainMenu
            onStartGame={handleStartGame}
            onOpenHowToPlay={() => setShowHowToPlay(true)}
            onOpenWhyClay={() => setShowWhyClay(true)}
            onOpenGallery={() => setShowGallery(true)}
            onOpenContest={() => setShowContest(true)}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {currentStage === 'story' && (
          <StoryIntro
            onNext={() => setCurrentStage('material')}
            onSkip={() => setCurrentStage('material')}
          />
        )}

        {currentStage === 'material' && (
          <StageMaterial
            selectedMaterial={config.material}
            onSelectMaterial={(mat) => handleUpdateConfig({ material: mat })}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'clay-prep' && (
          <StageClayPrep
            onClayPrepared={(quality) => handleUpdateConfig({ clayQuality: quality })}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'build-body' && (
          <StageBuildBody
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'face-trunk' && (
          <StageFaceTrunk
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'crown' && (
          <StageCrown
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'decorate' && (
          <StageDecorate
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'colors' && (
          <StageColors
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'eco-choice' && (
          <StageEcoChoice
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'naming' && (
          <StageNaming
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onNext={goToNextStage}
          />
        )}

        {currentStage === 'mandal-builder' && (
          <StageMandalBuilder
            config={config}
            mandalConfig={mandalConfig}
            onUpdateMandalConfig={(partial) =>
              setMandalConfig((prev) => ({ ...prev, ...partial }))
            }
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        )}

        {currentStage === 'final-reveal' && (
          <StageFinalReveal
            config={config}
            mandalConfig={mandalConfig}
            onRestart={handleRestart}
            onOpenWhyClay={() => setShowWhyClay(true)}
            onOpenGallery={() => setShowGallery(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      <WhyNaturalClayModal isOpen={showWhyClay} onClose={() => setShowWhyClay(false)} />
      <GalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onRecreate={handleRecreateFromGallery}
      />
      <ContestAboutModal isOpen={showContest} onClose={() => setShowContest(false)} />
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}


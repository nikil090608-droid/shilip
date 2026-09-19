import React, { useState } from 'react';
import { ClayState } from '../../types';
import { Droplets, Hand, Move, Sparkles, AlertCircle, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StageClayPrepProps {
  onClayPrepared: (quality: number) => void;
  onNext: () => void;
}

interface AirBubble {
  id: number;
  x: number;
  y: number;
  popped: boolean;
}

export const StageClayPrep: React.FC<StageClayPrepProps> = ({ onClayPrepared, onNext }) => {
  // Clay mini-game internal states
  const [waterLevel, setWaterLevel] = useState<number>(20); // 0-100 (45-65 is ideal)
  const [kneadCount, setKneadCount] = useState<number>(0);
  const [pressCount, setPressCount] = useState<number>(0);
  const [shapeCount, setShapeCount] = useState<number>(0);
  const [deformationScale, setDeformationScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [waterRipples, setWaterRipples] = useState<boolean>(false);

  // 5 Air bubble targets across the clay lump
  const [bubbles, setBubbles] = useState<AirBubble[]>([
    { id: 1, x: 260, y: 180, popped: false },
    { id: 2, x: 340, y: 195, popped: false },
    { id: 3, x: 290, y: 230, popped: false },
    { id: 4, x: 350, y: 250, popped: false },
    { id: 5, x: 240, y: 260, popped: false },
  ]);

  const poppedCount = bubbles.filter((b) => b.popped).length;

  // Calculate Clay Quality & Status
  let quality = 15;
  // Water scoring
  if (waterLevel >= 45 && waterLevel <= 65) {
    quality += 30; // perfect moisture
  } else if (waterLevel > 65 && waterLevel <= 75) {
    quality += 15;
  } else if (waterLevel > 30 && waterLevel < 45) {
    quality += 15;
  }

  // Knead scoring
  quality += Math.min(20, kneadCount * 7);
  // Press scoring
  quality += Math.min(15, pressCount * 6);
  // Shape scoring
  quality += Math.min(15, shapeCount * 6);
  // Air bubbles scoring (20 points for all 5)
  quality += poppedCount * 4;

  quality = Math.min(100, Math.round(quality));

  // Determine status label
  let statusText = '🪨 TOO DRY';
  let statusColor = 'text-amber-400 border-amber-500/40 bg-amber-950/60';
  if (waterLevel > 75) {
    statusText = '💧 TOO SOFT (Add dry clay / reset)';
    statusColor = 'text-blue-400 border-blue-500/40 bg-blue-950/60';
  } else if (quality >= 85 && poppedCount === 5) {
    statusText = '✨ PERFECT CLAY';
    statusColor = 'text-emerald-400 border-emerald-500/50 bg-emerald-950/70';
  } else if (quality >= 50) {
    statusText = '⏳ WORKING CLAY (Knead & pop air pockets)';
    statusColor = 'text-amber-300 border-amber-500/40 bg-amber-950/60';
  }

  // Trigger brief visual squish
  const triggerSquish = (sx: number, sy: number) => {
    setDeformationScale({ x: sx, y: sy });
    setTimeout(() => {
      setDeformationScale({ x: 1, y: 1 });
    }, 220);
  };

  // 1. Add Water
  const handleAddWater = () => {
    sound.playWaterSplash();
    setWaterLevel((prev) => Math.min(100, prev + 15));
    setWaterRipples(true);
    setTimeout(() => setWaterRipples(false), 600);
  };

  // 2. Knead
  const handleKnead = () => {
    sound.playClaySquish();
    setKneadCount((prev) => prev + 1);
    triggerSquish(1.08, 0.92);
  };

  // 3. Press
  const handlePress = () => {
    sound.playClaySquish();
    setPressCount((prev) => prev + 1);
    triggerSquish(1.15, 0.85);
  };

  // 4. Shape
  const handleShape = () => {
    sound.playClaySquish();
    setShapeCount((prev) => prev + 1);
    triggerSquish(0.95, 1.06);
  };

  // 5. Pop Air Bubble
  const handlePopBubble = (id: number) => {
    sound.playAirBubblePop();
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  // Reset Clay Mini-game
  const handleReset = () => {
    sound.playClick();
    setWaterLevel(20);
    setKneadCount(0);
    setPressCount(0);
    setShapeCount(0);
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
  };

  const isReadyForSculpting = quality >= 75;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Stage 2 of 10 • Clay Preparation Workshop
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100 mt-0.5">
          Prepare the Natural Mitti
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-0.5">
          Sprinkle water, knead out air pockets, and shape the dough until it is smooth and pliable.
        </p>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left/Center: Interactive Clay Board (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-md h-72 sm:h-80 bg-stone-950/80 rounded-2xl border-2 border-amber-900/60 shadow-inner flex items-center justify-center p-4 select-none overflow-hidden">
            {/* Wooden Sculpting Turntable base */}
            <svg
              viewBox="0 0 600 450"
              className="w-full h-full drop-shadow-2xl transition-transform duration-200"
              style={{
                transform: `scale(${deformationScale.x}, ${deformationScale.y})`,
              }}
            >
              <defs>
                <radialGradient id="prepClayGrad" cx="45%" cy="38%" r="60%">
                  <stop offset="0%" stopColor={waterLevel > 75 ? '#804825' : '#b8754a'} />
                  <stop offset="70%" stopColor={waterLevel > 75 ? '#5e3218' : '#8d4d29'} />
                  <stop offset="100%" stopColor="#45210e" />
                </radialGradient>

                <radialGradient id="bubbleGlow" cx="40%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="80%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
              </defs>

              {/* Wooden Board Disc */}
              <ellipse cx="300" cy="360" rx="240" ry="65" fill="#381e0c" />
              <ellipse cx="300" cy="355" rx="230" ry="60" fill="#5c3214" />
              <ellipse cx="300" cy="350" rx="215" ry="54" fill="#78421b" />

              {/* Organic Clay Mound */}
              <path
                d={`M 170,330 C 150,${220 - shapeCount * 3} 220,${140 - pressCount * 2} 300,${130 - pressCount * 2} C 380,${140 - pressCount * 2} 450,${220 - shapeCount * 3} 430,330 C 410,380 370,390 300,390 C 230,390 190,380 170,330 Z`}
                fill="url(#prepClayGrad)"
              />

              {/* Kneading fold lines that appear with kneading */}
              {kneadCount > 0 && (
                <g opacity={Math.min(1, kneadCount * 0.35)}>
                  <path d="M 230,220 Q 280,240 330,210" stroke="#45210e" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 250,260 Q 300,285 360,250" stroke="#45210e" strokeWidth="4" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Water droplet ripples */}
              {waterRipples && (
                <g className="animate-ping" opacity="0.6">
                  <circle cx="280" cy="200" r="16" stroke="#bae6fd" strokeWidth="2" fill="none" />
                  <circle cx="330" cy="240" r="22" stroke="#bae6fd" strokeWidth="2" fill="none" />
                </g>
              )}

              {/* Air Bubbles that need popping */}
              {bubbles.map((b) =>
                !b.popped ? (
                  <g
                    key={b.id}
                    className="cursor-pointer animate-pulse"
                    onClick={() => handlePopBubble(b.id)}
                  >
                    <circle cx={b.x} cy={b.y} r="14" fill="url(#bubbleGlow)" stroke="#ffffff" strokeWidth="2" />
                    <circle cx={b.x - 3} cy={b.y - 3} r="3" fill="#ffffff" />
                    <text x={b.x} y={b.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
                      POP
                    </text>
                  </g>
                ) : (
                  // Small smoothed patch where bubble was popped
                  <circle key={b.id} cx={b.x} cy={b.y} r="6" fill="#8d4d29" opacity="0.5" />
                )
              )}
            </svg>

            {/* Instruction tooltip overlay */}
            {bubbles.some((b) => !b.popped) && (
              <span className="absolute top-3 px-3 py-1 rounded-full bg-amber-950/85 border border-amber-500/50 text-[11px] font-semibold text-amber-200 animate-bounce">
                👆 Tap golden air bubbles to remove pockets!
              </span>
            )}
          </div>

          {/* Quick status pill below clay */}
          <div className="flex items-center gap-3 mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
              {statusText}
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-300 transition-colors"
              title="Reset clay prep"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Mitti
            </button>
          </div>
        </div>

        {/* Right: Controls & Clay Meter Dashboard (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          {/* Real-time Clay Quality Meter */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-800/50 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
              <span className="text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> CLAY QUALITY
              </span>
              <span className="text-base font-bold text-amber-100 font-heading">
                {quality}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3.5 rounded-full bg-stone-950 p-0.5 border border-amber-900/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  quality >= 85
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                    : quality >= 50
                    ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                    : 'bg-amber-700'
                }`}
                style={{ width: `${quality}%` }}
              />
            </div>

            {/* Mini metrics: Water & Air Bubbles */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-stone-800 text-[11px]">
              <div>
                <span className="text-stone-400 block">Moisture Level:</span>
                <span className={`font-semibold ${waterLevel > 75 ? 'text-blue-400' : waterLevel >= 45 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {waterLevel}% {waterLevel >= 45 && waterLevel <= 65 ? '(Optimal)' : ''}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Air Pockets:</span>
                <span className={`font-semibold ${poppedCount === 5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {poppedCount}/5 Popped
                </span>
              </div>
            </div>
          </div>

          {/* 4 Action Mini-game Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleAddWater}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-blue-900/60 hover:border-blue-500 text-stone-200 text-xs font-semibold transition-all active:scale-95"
            >
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>1. Add Water</span>
            </button>

            <button
              onClick={handleKnead}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-amber-900/60 hover:border-amber-500 text-stone-200 text-xs font-semibold transition-all active:scale-95"
            >
              <Hand className="w-4 h-4 text-amber-400" />
              <span>2. Knead ({kneadCount})</span>
            </button>

            <button
              onClick={handlePress}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-amber-900/60 hover:border-amber-500 text-stone-200 text-xs font-semibold transition-all active:scale-95"
            >
              <Move className="w-4 h-4 text-amber-400" />
              <span>3. Press ({pressCount})</span>
            </button>

            <button
              onClick={handleShape}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-amber-900/60 hover:border-amber-500 text-stone-200 text-xs font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4. Shape ({shapeCount})</span>
            </button>
          </div>

          {/* Educational craft tip */}
          <p className="text-[11px] text-stone-400 italic bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
            Traditional Shilpis knead the clay to remove all trapped air pockets; otherwise, the idol might crack while drying in the sun.
          </p>

          {/* Proceed to Stage 3 */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playTempleBell();
                onClayPrepared(quality);
                onNext();
              }}
              disabled={!isReadyForSculpting}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm shadow-lg transition-all ${
                isReadyForSculpting
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white cursor-pointer hover:scale-102 border border-amber-400/50'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
              }`}
            >
              <span>{isReadyForSculpting ? 'Continue: Build the Body' : 'Reach 75% Quality to Sculpt'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

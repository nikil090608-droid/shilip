import React, { useState } from 'react';
import { RangoliDesign } from '../../types';
import { sound } from '../../utils/audio';
import { Sparkles, Check, RotateCcw, X, Palette } from 'lucide-react';

interface RangoliDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteRangoli: (design: RangoliDesign) => void;
  isCompleted?: boolean;
}

type RangoliPatternType = 'lotus' | 'peacock' | 'mandala' | 'geometric';

interface RangoliDot {
  id: number;
  cx: number;
  cy: number;
  colored: boolean;
  color: string;
}

const NATURAL_PIGMENTS = [
  { id: 'rice', name: 'White Rice Flour', hex: '#ffffff', textColor: 'text-stone-900' },
  { id: 'turmeric', name: 'Golden Turmeric (Haldi)', hex: '#facc15', textColor: 'text-stone-900' },
  { id: 'kumkum', name: 'Sacred Kumkum Red', hex: '#e11d48', textColor: 'text-white' },
  { id: 'marigold', name: 'Marigold Petal Orange', hex: '#f97316', textColor: 'text-white' },
  { id: 'indigo', name: 'Natural Indigo Blue', hex: '#3b82f6', textColor: 'text-white' },
  { id: 'leaf', name: 'Dried Neem Leaf Green', hex: '#22c55e', textColor: 'text-stone-900' },
];

function getPatternDots(pattern: RangoliPatternType): RangoliDot[] {
  if (pattern === 'lotus') {
    return [
      { id: 1, cx: 200, cy: 200, colored: false, color: '#facc15' },
      { id: 2, cx: 200, cy: 150, colored: false, color: '#e11d48' },
      { id: 3, cx: 235, cy: 165, colored: false, color: '#e11d48' },
      { id: 4, cx: 250, cy: 200, colored: false, color: '#e11d48' },
      { id: 5, cx: 235, cy: 235, colored: false, color: '#e11d48' },
      { id: 6, cx: 200, cy: 250, colored: false, color: '#e11d48' },
      { id: 7, cx: 165, cy: 235, colored: false, color: '#e11d48' },
      { id: 8, cx: 150, cy: 200, colored: false, color: '#e11d48' },
      { id: 9, cx: 165, cy: 165, colored: false, color: '#e11d48' },
      { id: 10, cx: 200, cy: 100, colored: false, color: '#f97316' },
      { id: 11, cx: 270, cy: 130, colored: false, color: '#f97316' },
      { id: 12, cx: 300, cy: 200, colored: false, color: '#f97316' },
      { id: 13, cx: 270, cy: 270, colored: false, color: '#f97316' },
      { id: 14, cx: 200, cy: 300, colored: false, color: '#f97316' },
      { id: 15, cx: 130, cy: 270, colored: false, color: '#f97316' },
      { id: 16, cx: 100, cy: 200, colored: false, color: '#f97316' },
      { id: 17, cx: 130, cy: 130, colored: false, color: '#f97316' },
    ];
  }

  if (pattern === 'peacock') {
    return [
      // Head and crest
      { id: 1, cx: 160, cy: 130, colored: false, color: '#3b82f6' },
      { id: 2, cx: 180, cy: 150, colored: false, color: '#3b82f6' },
      { id: 3, cx: 170, cy: 180, colored: false, color: '#3b82f6' },
      // Body
      { id: 4, cx: 185, cy: 215, colored: false, color: '#22c55e' },
      { id: 5, cx: 170, cy: 250, colored: false, color: '#22c55e' },
      // Feather plume arc
      { id: 6, cx: 215, cy: 150, colored: false, color: '#facc15' },
      { id: 7, cx: 245, cy: 140, colored: false, color: '#3b82f6' },
      { id: 8, cx: 275, cy: 150, colored: false, color: '#22c55e' },
      { id: 9, cx: 295, cy: 175, colored: false, color: '#f97316' },
      { id: 10, cx: 305, cy: 210, colored: false, color: '#3b82f6' },
      { id: 11, cx: 295, cy: 245, colored: false, color: '#22c55e' },
      { id: 12, cx: 275, cy: 275, colored: false, color: '#facc15' },
      { id: 13, cx: 245, cy: 290, colored: false, color: '#3b82f6' },
      { id: 14, cx: 210, cy: 280, colored: false, color: '#22c55e' },
      // Inner eye plume accents
      { id: 15, cx: 235, cy: 190, colored: false, color: '#e11d48' },
      { id: 16, cx: 260, cy: 215, colored: false, color: '#e11d48' },
      { id: 17, cx: 235, cy: 240, colored: false, color: '#e11d48' },
    ];
  }

  if (pattern === 'mandala') {
    return [
      { id: 1, cx: 200, cy: 200, colored: false, color: '#facc15' },
      // Inner 8-star points
      { id: 2, cx: 200, cy: 145, colored: false, color: '#e11d48' },
      { id: 3, cx: 239, cy: 161, colored: false, color: '#e11d48' },
      { id: 4, cx: 255, cy: 200, colored: false, color: '#e11d48' },
      { id: 5, cx: 239, cy: 239, colored: false, color: '#e11d48' },
      { id: 6, cx: 200, cy: 255, colored: false, color: '#e11d48' },
      { id: 7, cx: 161, cy: 239, colored: false, color: '#e11d48' },
      { id: 8, cx: 145, cy: 200, colored: false, color: '#e11d48' },
      { id: 9, cx: 161, cy: 161, colored: false, color: '#e11d48' },
      // Outer 8 rays
      { id: 10, cx: 200, cy: 90, colored: false, color: '#3b82f6' },
      { id: 11, cx: 278, cy: 122, colored: false, color: '#3b82f6' },
      { id: 12, cx: 310, cy: 200, colored: false, color: '#3b82f6' },
      { id: 13, cx: 278, cy: 278, colored: false, color: '#3b82f6' },
      { id: 14, cx: 200, cy: 310, colored: false, color: '#3b82f6' },
      { id: 15, cx: 122, cy: 278, colored: false, color: '#3b82f6' },
      { id: 16, cx: 90, cy: 200, colored: false, color: '#3b82f6' },
      { id: 17, cx: 122, cy: 122, colored: false, color: '#3b82f6' },
    ];
  }

  // Geometric 4x4 Vedic Kolam
  const kolamDots: RangoliDot[] = [];
  let id = 1;
  const coords = [110, 170, 230, 290];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      kolamDots.push({
        id: id++,
        cx: coords[c],
        cy: coords[r],
        colored: false,
        color: '#ffffff',
      });
    }
  }
  return kolamDots;
}

export const RangoliDrawerModal: React.FC<RangoliDrawerModalProps> = ({
  isOpen,
  onClose,
  onCompleteRangoli,
  isCompleted = false,
}) => {
  const [selectedPattern, setSelectedPattern] = useState<RangoliPatternType>('lotus');
  const [activeColor, setActiveColor] = useState<string>('#e11d48');
  const [dots, setDots] = useState<RangoliDot[]>(() => getPatternDots('lotus'));
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  if (!isOpen) return null;

  const coloredCount = dots.filter((d) => d.colored).length;

  const handlePatternChange = (pat: RangoliPatternType) => {
    sound.playClick();
    setSelectedPattern(pat);
    setDots(getPatternDots(pat));
  };

  const handleDotColor = (id: number) => {
    sound.playRangoliTap();
    setDots((prev) =>
      prev.map((d) => (d.id === id ? { ...d, colored: true, color: activeColor } : d))
    );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!svgRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;
    const dotId = el.getAttribute('data-dot-id');
    if (dotId) {
      const numId = parseInt(dotId, 10);
      setDots((prev) => {
        const target = prev.find((d) => d.id === numId);
        if (target && (!target.colored || target.color !== activeColor)) {
          sound.playRangoliTap();
          return prev.map((d) => (d.id === numId ? { ...d, colored: true, color: activeColor } : d));
        }
        return prev;
      });
    }
  };

  const handleQuickFill = () => {
    sound.playCelebrationChime();
    setDots((prev) =>
      prev.map((d, index) => ({
        ...d,
        colored: true,
        color:
          index % 3 === 0
            ? '#facc15'
            : index % 3 === 1
            ? '#e11d48'
            : '#f97316',
      }))
    );
  };

  const handleReset = () => {
    sound.playClick();
    setDots((prev) => prev.map((d) => ({ ...d, colored: false })));
  };

  const handleSaveAndApply = () => {
    sound.playTempleBell();
    onCompleteRangoli({
      pattern: selectedPattern,
      completed: true,
      points: dots.map((d) => ({
        id: d.id,
        x: d.cx,
        y: d.cy,
        active: d.colored,
        color: d.color,
      })),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl text-amber-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-amber-200 hover:bg-stone-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TRADITIONAL WELCOMING FLOOR ART</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-amber-100">
            Design Sacred Rice Rangoli
          </h2>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            Drawn at Bappa’s sanctum entrance using botanical rice flour, turmeric, and dry herbal pigments.
          </p>
        </div>

        {/* Pattern Chooser */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { id: 'lotus', label: '🪷 Sacred Lotus', desc: 'Symbol of purity & wisdom' },
            { id: 'peacock', label: '🦚 Royal Mayur', desc: 'Grace & festival beauty' },
            { id: 'mandala', label: '☸️ Cosmic Chakra', desc: 'Harmony & infinity' },
            { id: 'geometric', label: '✨ Vedic Kolam', desc: 'Protection & welcome' },
          ].map((pat) => (
            <button
              key={pat.id}
              onClick={() => handlePatternChange(pat.id as RangoliPatternType)}
              className={`p-2 rounded-xl text-center border transition-all text-xs ${
                selectedPattern === pat.id
                  ? 'bg-amber-600/30 border-amber-400 text-amber-200 font-bold'
                  : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-750'
              }`}
            >
              <div className="font-semibold">{pat.label}</div>
            </button>
          ))}
        </div>

        {/* Main Canvas & Palette Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Rangoli Interactive Canvas (8 cols) */}
          <div className="sm:col-span-8 flex flex-col items-center">
            <div className="relative w-72 h-72 bg-stone-950 rounded-2xl border border-amber-900/60 p-2 shadow-inner flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full select-none cursor-crosshair touch-none"
                onPointerDown={() => setIsDrawing(true)}
                onPointerUp={() => setIsDrawing(false)}
                onPointerLeave={() => setIsDrawing(false)}
                onTouchMove={handleTouchMove}
              >
                {/* Background floor guidelines */}
                <circle cx="200" cy="200" r="100" fill="none" stroke="#44403c" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="50" fill="none" stroke="#44403c" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="50" x2="200" y2="350" stroke="#44403c" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="#44403c" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Connecting lines between colored dots */}
                {dots
                  .filter((d) => d.colored && d.id > 1)
                  .map((d, idx) => (
                    <line
                      key={idx}
                      x1="200"
                      y1="200"
                      x2={d.cx}
                      y2={d.cy}
                      stroke={d.color}
                      strokeWidth="2.5"
                      opacity="0.85"
                    />
                  ))}

                {/* Interactive Clickable Nodes / Flower Petals */}
                {dots.map((dot) => (
                  <g
                    key={dot.id}
                    data-dot-id={dot.id}
                    onClick={() => handleDotColor(dot.id)}
                    onPointerEnter={() => {
                      if (isDrawing) {
                        handleDotColor(dot.id);
                      }
                    }}
                    className="cursor-pointer transition-transform hover:scale-125"
                  >
                    {dot.colored ? (
                      <g data-dot-id={dot.id}>
                        <circle cx={dot.cx} cy={dot.cy} r="14" fill={dot.color} opacity="0.3" filter="blur(2px)" pointerEvents="none" />
                        <circle cx={dot.cx} cy={dot.cy} r="10" fill={dot.color} stroke="#ffffff" strokeWidth="2" data-dot-id={dot.id} />
                      </g>
                    ) : (
                      <circle
                        data-dot-id={dot.id}
                        cx={dot.cx}
                        cy={dot.cy}
                        r="7"
                        fill="#57534e"
                        stroke="#a8a29e"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}
                  </g>
                ))}

                {/* Central Motif Glow */}
                <circle cx="200" cy="200" r="18" fill="none" stroke="#facc15" strokeWidth="1.5" pointerEvents="none" />
              </svg>
            </div>
            <span className="text-[11px] text-stone-400 mt-2">
              💡 Tap or drag across circles to powder pigments ({coloredCount}/{dots.length} colored)
            </span>
          </div>

          {/* Color Pigments Palette (4 cols) */}
          <div className="sm:col-span-4 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
              Botanical Pigments
            </span>
            <div className="space-y-1.5">
              {NATURAL_PIGMENTS.map((pigment) => (
                <button
                  key={pigment.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveColor(pigment.hex);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                    activeColor === pigment.hex
                      ? 'bg-amber-950/70 border-amber-400 text-amber-200 font-bold'
                      : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-750'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-stone-600 shadow-sm"
                      style={{ backgroundColor: pigment.hex }}
                    />
                    <span>{pigment.name}</span>
                  </div>
                  {activeColor === pigment.hex && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleQuickFill}
                className="flex-1 py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] font-semibold rounded-lg border border-amber-900/60"
              >
                ✨ Auto Harmonize
              </button>
              <button
                onClick={handleReset}
                className="py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-stone-400 text-[11px] rounded-lg border border-stone-700"
                title="Reset Rangoli"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-amber-950/80">
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Awards +15 Creativity & +12 Eco Sanctum Bonus!</span>
          </div>

          <button
            onClick={handleSaveAndApply}
            className="flex items-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Bless & Place in Mandal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

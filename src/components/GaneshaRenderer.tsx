import React, { useState } from 'react';
import { IdolConfig, GameStage, SculptStep } from '../types';
import { COLOR_PALETTES } from '../utils/gameLogic';
import { RotateCw, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface GaneshaRendererProps {
  config: IdolConfig;
  stage?: GameStage;
  sculptStep?: SculptStep;
  viewAngle?: 'front' | 'angle' | 'closeup';
  interactive?: boolean;
  className?: string;
  glow?: boolean;
  rotation?: number;
  zoom?: number;
  showToolbar?: boolean;
  onFeatureClick?: (feature: string) => void;
}

const SCULPT_ORDER: SculptStep[] = [
  'lump',
  'base',
  'body',
  'belly',
  'head',
  'ears',
  'trunk',
  'arms',
  'legs',
  'face',
  'crown',
  'ornaments',
  'colors',
  'complete',
];

export const GaneshaRenderer: React.FC<GaneshaRendererProps> = ({
  config,
  stage = 'final-reveal',
  sculptStep,
  viewAngle = 'front',
  className = 'w-full h-full',
  glow = false,
  rotation: externalRotation,
  zoom: externalZoom,
  showToolbar = false,
  onFeatureClick,
}) => {
  const [internalRotation, setInternalRotation] = useState(0);
  const [internalZoom, setInternalZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const rotation = externalRotation !== undefined ? externalRotation : internalRotation;
  const zoom = externalZoom !== undefined ? externalZoom : internalZoom;

  const currentPalette =
    COLOR_PALETTES.find((p) => p.id === config.paletteId) || COLOR_PALETTES[0];

  // Derive progression visibility
  const stepIdx = sculptStep ? SCULPT_ORDER.indexOf(sculptStep) : -1;

  const isLumpOnly = sculptStep
    ? sculptStep === 'lump'
    : stage === 'material' || stage === 'clay-prep';

  const hasBase = sculptStep ? stepIdx >= 1 : !isLumpOnly;
  const hasBodyTorso = sculptStep ? stepIdx >= 2 : !isLumpOnly;
  const hasBelly = sculptStep ? stepIdx >= 3 : !isLumpOnly;
  const hasLegs = sculptStep ? stepIdx >= 8 : !isLumpOnly;
  const hasArms = sculptStep ? stepIdx >= 7 : (!isLumpOnly && stage !== 'build-body');
  const hasHead = sculptStep ? stepIdx >= 4 : (!isLumpOnly && stage !== 'build-body');
  const hasEars = sculptStep ? stepIdx >= 5 : hasHead;
  const hasTrunk = sculptStep ? stepIdx >= 6 : hasHead;
  const hasFaceDetails = sculptStep ? stepIdx >= 9 : (!isLumpOnly && stage !== 'build-body');
  const hasCrown = sculptStep
    ? stepIdx >= 10
    : (!isLumpOnly && stage !== 'build-body' && stage !== 'face-trunk');
  const hasDecorations = sculptStep
    ? stepIdx >= 11
    : (!isLumpOnly && stage !== 'build-body' && stage !== 'face-trunk' && stage !== 'crown');
  const hasColors = sculptStep
    ? stepIdx >= 12
    : (stage === 'colors' || stage === 'eco-choice' || stage === 'naming' || stage === 'mandal-builder' || stage === 'final-reveal' || stage === 'score' || stage === 'bappa-ready');

  // Base clay texture / tone
  let baseTone = hasColors ? currentPalette.bodyTone : '#a3623b'; // Raw unbaked clay tone before color step
  if (config.material === 'plaster-of-paris') {
    baseTone = hasColors ? currentPalette.bodyTone : '#e2e8f0';
  } else if (config.material === 'paper-pulp') {
    baseTone = hasColors ? currentPalette.bodyTone : '#cbb89d';
  }

  // Calculate body scaling depending on size choice
  const scaleFactor =
    config.bodySize === 'small' ? 0.9 : config.bodySize === 'large' ? 1.08 : 1.0;

  // View angle transformations
  let angleTransform = `rotate(${rotation}deg) scale(${zoom})`;
  if (viewAngle === 'angle') {
    angleTransform = `rotate(${rotation}deg) scale(${zoom * 0.96}) skewY(-1.2deg)`;
  } else if (viewAngle === 'closeup') {
    angleTransform = `rotate(${rotation}deg) scale(${zoom * 1.35}) translateY(30px)`;
  }

  // Mouse / Touch drag to rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 2) {
      setInternalRotation((prev) => Math.max(-25, Math.min(25, prev + deltaX * 0.2)));
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    if (Math.abs(deltaX) > 2) {
      setInternalRotation((prev) => Math.max(-25, Math.min(25, prev + deltaX * 0.2)));
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Active decoration checks
  const showGarland = hasDecorations && config.decorations.includes('marigold-garland');
  const showDurva = hasDecorations && config.decorations.includes('sacred-durva');
  const showDiya = hasDecorations && config.decorations.includes('clay-diya');
  const showJaneyu = hasDecorations && config.decorations.includes('sacred-janeyu');
  const showModaks = hasDecorations && config.decorations.includes('golden-modak-plate');
  const showMooshak = hasDecorations && config.decorations.includes('mooshak-companion');
  const showRudraksha = hasDecorations && config.decorations.includes('rudraksha-beads');

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden transition-transform duration-300 ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Divine Sanctum Aura Glow */}
      {glow && (
        <div className="absolute inset-0 bg-radial from-amber-500/25 via-amber-700/10 to-transparent blur-2xl pointer-events-none animate-pulse" />
      )}

      {/* Interactive 3D Toolbar */}
      {showToolbar && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-stone-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-200 text-xs shadow-lg">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInternalRotation((r) => Math.max(-25, r - 6));
            }}
            className="p-1 hover:bg-stone-800 rounded-full transition-colors"
            title="Rotate Left"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInternalRotation(0);
              setInternalZoom(1);
            }}
            className="px-2 py-0.5 hover:bg-stone-800 rounded-full font-medium"
            title="Reset View"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInternalRotation((r) => Math.min(25, r + 6));
            }}
            className="p-1 hover:bg-stone-800 rounded-full transition-colors"
            title="Rotate Right"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-3.5 bg-stone-700 mx-1" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInternalZoom((z) => Math.min(1.4, z + 0.1));
            }}
            className="p-1 hover:bg-stone-800 rounded-full transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInternalZoom((z) => Math.max(0.85, z - 0.1));
            }}
            className="p-1 hover:bg-stone-800 rounded-full transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <svg
        viewBox="0 0 600 700"
        className="w-full h-full max-h-[640px] drop-shadow-2xl transition-transform duration-500"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lord Ganesha Idol Illustration"
        role="img"
      >
        <defs>
          {/* Subtle 3D Gradients */}
          <radialGradient id="clayGradient" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor={baseTone} stopOpacity="1" />
            <stop offset="70%" stopColor={adjustColorBrightness(baseTone, -18)} />
            <stop offset="100%" stopColor={adjustColorBrightness(baseTone, -35)} />
          </radialGradient>

          <linearGradient id="dhotiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={currentPalette.dhotiTone} />
            <stop offset="100%" stopColor={adjustColorBrightness(currentPalette.dhotiTone, -30)} />
          </linearGradient>

          <linearGradient id="goldAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>

          {/* Diya flame glow */}
          <radialGradient id="diyaFlameGrad" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>

          {/* Mitti Texture filter */}
          <filter id="mittiTexture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.5   0 0 0 0 0.3   0 0 0 0 0.1   0 0 0 0.12 0"
              in="noise"
              result="coloredNoise"
            />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="textured" />
            <feBlend mode="multiply" in="SourceGraphic" in2="textured" />
          </filter>
        </defs>

        {/* ---------------------------------------------------- */}
        {/* STAGE: RAW CLAY LUMP / PREPARATION                  */}
        {/* ---------------------------------------------------- */}
        {isLumpOnly && (
          <g id="clay-lump-group" className="transition-all duration-500">
            {/* Wooden Sculptor Board */}
            <ellipse cx="300" cy="530" rx="180" ry="45" fill="#543310" opacity="0.9" />
            <ellipse cx="300" cy="525" rx="170" ry="40" fill="#784421" />
            <ellipse cx="300" cy="520" rx="160" ry="36" fill="#9a5b32" />

            {/* Organic Mounded Clay Lump */}
            <path
              d="M 190,480 C 180,380 230,290 300,280 C 370,290 420,380 410,480 C 400,520 360,540 300,540 C 240,540 200,520 190,480 Z"
              fill="url(#clayGradient)"
              filter="url(#mittiTexture)"
            />

            {/* Hand tool score marks */}
            <path
              d="M 240,360 Q 270,375 290,410 M 310,350 Q 330,370 345,405 M 260,430 Q 300,445 350,440"
              stroke={adjustColorBrightness(baseTone, -40)}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Water droplet glisten */}
            <circle cx="280" cy="340" r="6" fill="#bae6fd" opacity="0.75" />
            <circle cx="340" cy="420" r="4.5" fill="#bae6fd" opacity="0.65" />
            <circle cx="230" cy="440" r="5" fill="#bae6fd" opacity="0.6" />

            {/* Text caption badge */}
            <g transform="translate(300, 610)">
              <rect x="-120" y="-18" width="240" height="36" rx="18" fill="#2d1500" opacity="0.85" stroke="#f59e0b" strokeWidth="1" />
              <text textAnchor="middle" y="5" fill="#fef3c7" fontSize="13" fontWeight="600" letterSpacing="1">
                NATURAL SHAADU MITTI
              </text>
            </g>
          </g>
        )}

        {/* ---------------------------------------------------- */}
        {/* STAGE: SCULPTED IDOL (BODY, HEAD, ATTRIBUTES)       */}
        {/* ---------------------------------------------------- */}
        {(hasBase || hasBodyTorso || hasBelly || hasHead) && (
          <g
            id="sculpted-bappa"
            transform={`translate(300, 360) scale(${scaleFactor}) translate(-300, -360)`}
            className="transition-all duration-700"
          >
            {/* Golden Sanctum Halo (Prabhavali) */}
            {hasDecorations && <circle cx="300" cy="280" r="220" fill="url(#haloGrad)" />}

            {/* Traditional Carved Asana / Lotus Wooden Peetha */}
            {hasBase && (
              <g id="pedestal" transform="translate(0, 10)">
                {/* Base tier */}
                <path
                  d="M 140,580 L 460,580 L 480,620 L 120,620 Z"
                  fill="#4a2810"
                  stroke="#d97706"
                  strokeWidth="2"
                />
                <path
                  d="M 160,550 L 440,550 L 460,580 L 140,580 Z"
                  fill="#6e3b19"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />

                {/* Lotus Petal Relief on Pedestal */}
                {[180, 220, 260, 300, 340, 380, 420].map((px, i) => (
                  <path
                    key={i}
                    d={`M ${px - 18},580 C ${px - 10},565 ${px + 10},565 ${px + 18},580 Z`}
                    fill="#ea580c"
                    stroke="#fbbf24"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                ))}
              </g>
            )}

            {/* ------------------------------------------------ */}
            {/* LEGS & POSTURE                                   */}
            {/* ------------------------------------------------ */}
            {hasLegs && (
              <>
                {config.bodyPosture === 'sitting' ? (
                  // Padmasana / Lalitasana (Folded cross-legged majestic posture)
                  <g id="sitting-legs">
                    {/* Left folded leg */}
                    <ellipse cx="230" cy="510" rx="95" ry="48" fill="url(#dhotiGrad)" />
                    {/* Right folded leg */}
                    <ellipse cx="370" cy="510" rx="95" ry="48" fill="url(#dhotiGrad)" />
                    {/* Divine feet / Charankamal */}
                    <ellipse cx="260" cy="530" rx="28" ry="18" fill="url(#clayGradient)" />
                    <ellipse cx="340" cy="530" rx="28" ry="18" fill="url(#clayGradient)" />
                    {/* Golden toe rings / anklet accents */}
                    <circle cx="255" cy="535" r="4" fill="#fbbf24" />
                    <circle cx="345" cy="535" r="4" fill="#fbbf24" />
                  </g>
                ) : config.bodyPosture === 'standing' ? (
                  // Standing posture (Sthanaka)
                  <g id="standing-legs">
                    <rect x="235" y="470" width="55" height="90" rx="20" fill="url(#dhotiGrad)" />
                    <rect x="310" y="470" width="55" height="90" rx="20" fill="url(#dhotiGrad)" />
                    {/* Feet */}
                    <ellipse cx="262" cy="565" rx="30" ry="16" fill="url(#clayGradient)" />
                    <ellipse cx="338" cy="565" rx="30" ry="16" fill="url(#clayGradient)" />
                  </g>
                ) : (
                  // Blessing pose (One knee folded, radiant Lalitasana)
                  <g id="blessing-legs">
                    <ellipse cx="230" cy="515" rx="90" ry="50" fill="url(#dhotiGrad)" />
                    <ellipse cx="365" cy="530" rx="80" ry="45" fill="url(#dhotiGrad)" />
                    <ellipse cx="270" cy="535" rx="28" ry="18" fill="url(#clayGradient)" />
                    <ellipse cx="355" cy="550" rx="28" ry="18" fill="url(#clayGradient)" />
                  </g>
                )}

                {/* Dhoti Pleats & Gold Zari Border */}
                <path
                  d="M 270,440 Q 300,520 285,550 M 330,440 Q 300,520 315,550 M 300,430 L 300,555"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.85"
                />
              </>
            )}

            {/* ------------------------------------------------ */}
            {/* TORSO & SACRED POT BELLY (LAMBODARA)             */}
            {/* ------------------------------------------------ */}
            <g id="torso">
              {/* Upper Chest */}
              {hasBodyTorso && (
                <path
                  d="M 215,330 C 205,270 395,270 385,330 C 390,380 210,380 215,330 Z"
                  fill="url(#clayGradient)"
                />
              )}

              {/* Pot Belly (Lambodara) - large, round, peaceful */}
              {hasBelly && (
                <>
                  <ellipse
                    cx="300"
                    cy="415"
                    rx={config.bodySize === 'large' ? 108 : config.bodySize === 'small' ? 88 : 98}
                    ry={config.bodySize === 'large' ? 85 : config.bodySize === 'small' ? 70 : 78}
                    fill="url(#clayGradient)"
                    filter="url(#mittiTexture)"
                  />

                  {/* Sacred Navel (Nabhi) */}
                  <circle cx="300" cy="425" r="4.5" fill={adjustColorBrightness(baseTone, -45)} />

                  {/* Dhoti waistband (Kamarbandh) */}
                  <path
                    d="M 215,445 Q 300,470 385,445"
                    stroke="#fbbf24"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 220,445 Q 300,470 380,445"
                    stroke="#b45309"
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              )}
            </g>

            {/* Cotton Janeyu (Sacred Thread) across chest */}
            {showJaneyu && hasBodyTorso && (
              <g id="janeyu-thread">
                <path
                  d="M 240,295 C 240,360 350,430 365,460"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                  fill="none"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                />
                <circle cx="302" cy="380" r="3" fill="#fbbf24" />
              </g>
            )}

            {/* Rudraksha beads across chest */}
            {showRudraksha && hasBodyTorso && (
              <path
                d="M 245,290 C 255,360 345,395 355,385"
                stroke="#78350f"
                strokeWidth="6"
                strokeDasharray="3 7"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* ------------------------------------------------ */}
            {/* ARMS & HANDS (ABHAYA MUDRA & MODAK PATRA)       */}
            {/* ------------------------------------------------ */}
            {hasArms && (
              <g id="arms">
                {/* Right Hand - Abhaya Mudra (Blessing & Protection) */}
                <path
                  d="M 225,320 C 180,330 160,370 170,410 C 175,430 190,435 200,410 C 205,390 220,360 235,345 Z"
                  fill="url(#clayGradient)"
                />
                {/* Blessing Palm (Facing front with auspicious red swastika/Om) */}
                <ellipse cx="178" cy="405" rx="20" ry="24" fill="url(#clayGradient)" />
                {/* Fingers of Abhaya Mudra */}
                <rect x="165" y="375" width="7" height="20" rx="3.5" fill="url(#clayGradient)" />
                <rect x="174" y="370" width="7" height="24" rx="3.5" fill="url(#clayGradient)" />
                <rect x="183" y="373" width="7" height="22" rx="3.5" fill="url(#clayGradient)" />
                <rect x="192" y="379" width="6.5" height="17" rx="3" fill="url(#clayGradient)" />
                {/* Divine palm symbol: Auspicious Om / Padma */}
                <circle cx="178" cy="408" r="6" fill="#dc2626" opacity="0.85" />
                <circle cx="178" cy="408" r="3" fill="#fbbf24" />

                {/* Left Hand - Holding Modak Dish / Sweet offering */}
                <path
                  d="M 375,320 C 420,330 440,375 425,415 C 418,432 400,430 395,410 C 390,390 375,360 365,345 Z"
                  fill="url(#clayGradient)"
                />
                {/* Palm holding bowl */}
                <ellipse cx="415" cy="415" rx="20" ry="16" fill="url(#clayGradient)" />

                {/* Bowl of Modaks in left hand */}
                <ellipse cx="420" cy="412" rx="26" ry="12" fill="#d97706" stroke="#fbbf24" strokeWidth="2" />
                {/* Steamed Modaks (sacred teardrop dumplings) */}
                <path d="M 412,410 C 412,400 420,392 420,392 C 420,392 428,400 428,410 Z" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
                <path d="M 404,412 C 404,403 410,397 410,397 C 410,397 416,403 416,412 Z" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
                <path d="M 424,412 C 424,403 430,397 430,397 C 430,397 436,403 436,412 Z" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
              </g>
            )}

            {/* ------------------------------------------------ */}
            {/* HEAD, EARS, EYES, TRUNK                          */}
            {/* ------------------------------------------------ */}
            {(hasHead || hasEars || hasFaceDetails || hasTrunk) && (
              <g id="divine-head-group">
                {/* 1. EARS (Customizable styles) */}
                {hasEars && (
                  <g id="ears">
                    {/* Left Ear */}
                    {config.earStyle === 'wide' ? (
                      // Supakarna - Winnowing basket shape
                      <path
                        d="M 230,230 C 130,200 110,290 150,330 C 180,360 220,340 235,310 Z"
                        fill="url(#clayGradient)"
                        filter="url(#mittiTexture)"
                      />
                    ) : config.earStyle === 'decorative' ? (
                      // Scalloped ornamental edge
                      <g>
                        <path
                          d="M 230,240 C 140,210 130,280 155,320 C 175,345 220,335 235,310 Z"
                          fill="url(#clayGradient)"
                        />
                        <circle cx="150" cy="270" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                        <circle cx="170" cy="310" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      </g>
                    ) : (
                      // Classic fan ear
                      <path
                        d="M 230,235 C 145,215 135,280 160,320 C 180,345 220,335 235,305 Z"
                        fill="url(#clayGradient)"
                      />
                    )}

                    {/* Right Ear */}
                    {config.earStyle === 'wide' ? (
                      <path
                        d="M 370,230 C 470,200 490,290 450,330 C 420,360 380,340 365,310 Z"
                        fill="url(#clayGradient)"
                        filter="url(#mittiTexture)"
                      />
                    ) : config.earStyle === 'decorative' ? (
                      <g>
                        <path
                          d="M 370,240 C 460,210 470,280 445,320 C 425,345 380,335 365,310 Z"
                          fill="url(#clayGradient)"
                        />
                        <circle cx="450" cy="270" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                        <circle cx="430" cy="310" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      </g>
                    ) : (
                      <path
                        d="M 370,235 C 455,215 465,280 440,320 C 420,345 380,335 365,305 Z"
                        fill="url(#clayGradient)"
                      />
                    )}

                    {/* Inner ear contours */}
                    <path
                      d="M 215,260 C 175,250 165,290 185,310"
                      stroke={adjustColorBrightness(baseTone, -30)}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 385,260 C 425,250 435,290 415,310"
                      stroke={adjustColorBrightness(baseTone, -30)}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                )}

                {/* 2. ELEPHANT HEAD (Mastaka / Kumbha) */}
                {hasHead && (
                  <>
                    <ellipse
                      cx="300"
                      cy="255"
                      rx="75"
                      ry="65"
                      fill="url(#clayGradient)"
                      filter="url(#mittiTexture)"
                    />

                    {/* Left & Right Forehead Nodes (Gaja-Kumbha) */}
                    <ellipse cx="270" cy="225" rx="34" ry="26" fill="url(#clayGradient)" />
                    <ellipse cx="330" cy="225" rx="34" ry="26" fill="url(#clayGradient)" />
                  </>
                )}

                {/* Sacred Tilak (Urdhva Pundra / Crescent Moon & Chandan) */}
                {hasFaceDetails && (
                  <g id="tilak" transform="translate(300, 222)">
                    {/* Outer Sandalwood yellow/white crescent */}
                    <path
                      d="M -22,-6 Q 0,8 22,-6 Q 0,16 -22,-6 Z"
                      fill="#fef08a"
                    />
                    {/* Central Sacred Red Kumkum mark */}
                    <rect x="-3.5" y="-18" width="7" height="24" rx="3.5" fill={currentPalette.tilakTone} />
                    <circle cx="0" cy="10" r="3" fill={currentPalette.tilakTone} />
                  </g>
                )}

                {/* 3. EYES & EXPRESSION */}
                {hasFaceDetails && (
                  <g id="eyes">
                    {config.eyeStyle === 'calm' ? (
                      // Calm / Meditative (Dhyanamudra eyes - curved peaceful lids)
                      <g>
                        <path
                          d="M 252,260 Q 266,270 280,260"
                          stroke="#261204"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M 320,260 Q 334,270 348,260"
                          stroke="#261204"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Eyebrows */}
                        <path d="M 250,250 Q 266,245 282,252" stroke="#4a2810" strokeWidth="2" fill="none" />
                        <path d="M 318,252 Q 334,245 350,250" stroke="#4a2810" strokeWidth="2" fill="none" />
                      </g>
                    ) : config.eyeStyle === 'joyful' ? (
                      // Joyful / Radiant smiling eyes with bright pupil glisten
                      <g>
                        <ellipse cx="266" cy="260" rx="10" ry="7" fill="#ffffff" stroke="#261204" strokeWidth="1.5" />
                        <circle cx="266" cy="260" r="4.5" fill="#261204" />
                        <circle cx="264" cy="258" r="1.5" fill="#ffffff" />

                        <ellipse cx="334" cy="260" rx="10" ry="7" fill="#ffffff" stroke="#261204" strokeWidth="1.5" />
                        <circle cx="334" cy="260" r="4.5" fill="#261204" />
                        <circle cx="332" cy="258" r="1.5" fill="#ffffff" />

                        {/* Gentle upward curve brows */}
                        <path d="M 252,248 Q 266,242 280,250" stroke="#4a2810" strokeWidth="2" fill="none" />
                        <path d="M 320,250 Q 334,242 348,248" stroke="#4a2810" strokeWidth="2" fill="none" />
                      </g>
                    ) : (
                      // Traditional / Fish-shaped Meenakshi Classical Eyes
                      <g>
                        <path
                          d="M 250,260 Q 266,250 282,260 Q 266,268 250,260 Z"
                          fill="#ffffff"
                          stroke="#261204"
                          strokeWidth="2"
                        />
                        <circle cx="267" cy="259" r="4" fill="#261204" />
                        <circle cx="265" cy="257" r="1.5" fill="#ffffff" />

                        <path
                          d="M 318,260 Q 334,250 350,260 Q 334,268 318,260 Z"
                          fill="#ffffff"
                          stroke="#261204"
                          strokeWidth="2"
                        />
                        <circle cx="333" cy="259" r="4" fill="#261204" />
                        <circle cx="331" cy="257" r="1.5" fill="#ffffff" />
                      </g>
                    )}
                  </g>
                )}

                {/* 4. TUSKS (One whole, one broken - Ekadanta) */}
                {hasFaceDetails && (
                  <g id="tusks">
                    {/* Left side whole tusk */}
                    <path
                      d="M 265,305 C 265,315 258,328 252,330 C 255,322 260,312 263,305 Z"
                      fill="#fef9c3"
                      stroke="#ca8a04"
                      strokeWidth="1"
                    />
                    {/* Right side sacred broken tusk (symbol of writing the Mahabharata) */}
                    <path
                      d="M 335,305 C 335,312 340,318 343,317 C 342,312 338,308 337,305 Z"
                      fill="#fef9c3"
                      stroke="#ca8a04"
                      strokeWidth="1"
                    />
                  </g>
                )}

                {/* 5. TRUNK (Vakratunda) */}
                {hasTrunk && (
                  <g id="trunk">
                    {config.trunkDirection === 'left' ? (
                      // Idampuri (Left-turned towards modak - serene & peaceful for home worship)
                      <g>
                        <path
                          d="M 285,280 C 285,340 270,370 290,400 C 310,430 395,435 410,405 C 418,390 405,385 395,395 C 380,410 325,410 310,380 C 295,350 315,310 315,280 Z"
                          fill="url(#clayGradient)"
                          filter="url(#mittiTexture)"
                        />
                        {/* Sweet Modak at tip of trunk */}
                        <circle cx="400" cy="395" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      </g>
                    ) : config.trunkDirection === 'right' ? (
                      // Valampuri (Right-turned - active, sun energy)
                      <g>
                        <path
                          d="M 315,280 C 315,340 330,370 310,400 C 290,430 205,435 190,405 C 182,390 195,385 205,395 C 220,410 275,410 290,380 C 305,350 285,310 285,280 Z"
                          fill="url(#clayGradient)"
                          filter="url(#mittiTexture)"
                        />
                        <circle cx="200" cy="395" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      </g>
                    ) : (
                      // Center / Graceful curved trunk
                      <g>
                        <path
                          d="M 285,280 C 285,340 275,380 295,415 C 305,430 320,425 315,410 C 305,385 315,340 315,280 Z"
                          fill="url(#clayGradient)"
                          filter="url(#mittiTexture)"
                        />
                        <circle cx="308" cy="418" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      </g>
                    )}

                    {/* Traditional trunk wrinkles / rings */}
                    <path
                      d="M 292,305 Q 300,312 308,305 M 291,325 Q 300,332 309,325 M 290,345 Q 300,352 310,345"
                      stroke={adjustColorBrightness(baseTone, -30)}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Auspicious gold/vermilion trunk ornamentation */}
                    <line x1="300" y1="285" x2="300" y2="345" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                )}
              </g>
            )}

            {/* ------------------------------------------------ */}
            {/* CROWN (MUKUT) (STAGE 5+)                         */}
            {/* ------------------------------------------------ */}
            {hasCrown && (
              <g id="crown-group" transform="translate(300, 195)">
                {config.crownStyle === 'traditional' ? (
                  // Royal Gold / Clay Multi-tiered Pagoda Mukut
                  <g>
                    {/* Base band */}
                    <rect x="-55" y="-12" width="110" height="18" rx="6" fill="url(#goldAccentGrad)" stroke="#854d0e" strokeWidth="1.5" />
                    {/* Tier 1 */}
                    <path d="M -45,-12 L -35,-42 L 35,-42 L 45,-12 Z" fill="url(#goldAccentGrad)" stroke="#854d0e" strokeWidth="1.5" />
                    {/* Tier 2 */}
                    <path d="M -30,-42 L -18,-72 L 18,-72 L 30,-42 Z" fill="url(#goldAccentGrad)" stroke="#854d0e" strokeWidth="1.5" />
                    {/* Crown Pinnacle (Kalash / Jewel) */}
                    <circle cx="0" cy="-80" r="8" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
                    {/* Filigree carvings */}
                    <circle cx="0" cy="-28" r="6" fill="#dc2626" />
                    <circle cx="-20" cy="-28" r="4" fill="#15803d" />
                    <circle cx="20" cy="-28" r="4" fill="#15803d" />
                  </g>
                ) : config.crownStyle === 'flower' ? (
                  // Fresh Flower Crown (Marigold & Jasmine Wreath)
                  <g>
                    <ellipse cx="0" cy="-10" rx="55" ry="14" fill="#166534" />
                    {/* Orange and yellow blossoms */}
                    {[-45, -30, -15, 0, 15, 30, 45].map((pos, idx) => (
                      <circle
                        key={idx}
                        cx={pos}
                        cy={-14 - Math.abs(pos) * 0.2}
                        r={idx % 2 === 0 ? 11 : 9}
                        fill={idx % 2 === 0 ? '#ea580c' : '#facc15'}
                        stroke="#c2410c"
                        strokeWidth="1.5"
                      />
                    ))}
                    {/* Jasmine buds string */}
                    {[-35, -20, -5, 10, 25, 40].map((pos, idx) => (
                      <circle key={idx} cx={pos} cy={-2} r="4" fill="#ffffff" />
                    ))}
                  </g>
                ) : config.crownStyle === 'leaf' ? (
                  // Sacred Leaf Crown (Aak, Peepal, Mango Leaves)
                  <g>
                    <path
                      d="M -50,-10 C -40,-50 -20,-75 0,-85 C 20,-75 40,-50 50,-10 Z"
                      fill="#15803d"
                      stroke="#86efac"
                      strokeWidth="2"
                    />
                    {/* Veins */}
                    <line x1="0" y1="-85" x2="0" y2="-10" stroke="#86efac" strokeWidth="2" />
                    <path d="M 0,-65 L -20,-50 M 0,-65 L 20,-50 M 0,-45 L -30,-30 M 0,-45 L 30,-30" stroke="#86efac" strokeWidth="1.5" />
                    <circle cx="0" cy="-10" r="8" fill="#f59e0b" />
                  </g>
                ) : (
                  // Simple Mitti Crown (Pagoda made of pure clay)
                  <g>
                    <path
                      d="M -45,-10 L -25,-48 L 0,-65 L 25,-48 L 45,-10 Z"
                      fill="url(#clayGradient)"
                      stroke={adjustColorBrightness(baseTone, -40)}
                      strokeWidth="2"
                    />
                    <circle cx="0" cy="-68" r="6" fill="#f59e0b" />
                    <line x1="-35" y1="-25" x2="35" y2="-25" stroke="#f59e0b" strokeWidth="2" />
                  </g>
                )}
              </g>
            )}

            {/* ------------------------------------------------ */}
            {/* DECORATIONS & OFFERINGS (STAGE 6+)               */}
            {/* ------------------------------------------------ */}
            {showGarland && (
              // Marigold & Rose Garland (Haar) draped over shoulders
              <g id="marigold-garland">
                <path
                  d="M 210,290 C 210,430 390,430 390,290"
                  stroke="#ea580c"
                  strokeWidth="18"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 210,290 C 210,430 390,430 390,290"
                  stroke="#facc15"
                  strokeWidth="12"
                  strokeDasharray="14 10"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Central Red Hibiscus (Jaswand) Flower */}
                <circle cx="300" cy="425" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
                <circle cx="300" cy="425" r="5" fill="#facc15" />
              </g>
            )}

            {showDurva && (
              // Sacred Durva Grass bunch offered near the feet/trunk
              <g id="durva-grass" transform="translate(265, 475)">
                <path d="M 0,0 Q -15,-20 -25,-25" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -5,-30 -8,-35" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 10,-28 16,-32" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="0" cy="0" r="3" fill="#ca8a04" />
              </g>
            )}

            {showDiya && (
              // Handcrafted Clay Diya with glowing flame
              <g id="clay-diya" transform="translate(180, 520)" className="animate-diya">
                {/* Diya Base */}
                <path d="M -22,0 C -20,12 20,12 22,0 L 26,-4 L -26,-4 Z" fill="#9a3412" stroke="#ea580c" strokeWidth="1" />
                <ellipse cx="0" cy="-4" rx="24" ry="6" fill="#7c2d12" />
                {/* Flame */}
                <path
                  d="M -12,-8 C -8,-25 0,-40 0,-40 C 0,-40 8,-25 12,-8 C 12,0 -12,0 -12,-8 Z"
                  fill="url(#diyaFlameGrad)"
                />
                {/* Outer halo */}
                <circle cx="0" cy="-20" r="28" fill="#fbbf24" opacity="0.25" />
              </g>
            )}

            {showModaks && (
              // Extra Golden Modak Thali near the base
              <g id="extra-modak-plate" transform="translate(420, 520)">
                <ellipse cx="0" cy="5" rx="32" ry="12" fill="#854d0e" stroke="#facc15" strokeWidth="1.5" />
                <ellipse cx="0" cy="3" rx="28" ry="9" fill="#ca8a04" />
                {[-14, 0, 14].map((mx, idx) => (
                  <path
                    key={idx}
                    d={`M ${mx - 6},2 C ${mx - 6},-6 ${mx},-12 ${mx},-12 C ${mx},-12 ${mx + 6},-6 ${mx + 6},2 Z`}
                    fill="#fef08a"
                    stroke="#ca8a04"
                    strokeWidth="1"
                  />
                ))}
              </g>
            )}

            {showMooshak && (
              // Devoted Mooshak offering modak with folded hands
              <g id="mooshak" transform="translate(460, 545)">
                {/* Body */}
                <ellipse cx="0" cy="0" rx="18" ry="12" fill="#78716c" />
                {/* Head */}
                <circle cx="-14" cy="-5" r="9" fill="#78716c" />
                {/* Snout */}
                <polygon points="-22,-5 -16,-8 -16,-2" fill="#fbcfe8" />
                {/* Ear */}
                <ellipse cx="-10" cy="-14" rx="5" ry="7" fill="#a8a29e" />
                <ellipse cx="-10" cy="-14" rx="3" ry="5" fill="#fbcfe8" />
                {/* Eye */}
                <circle cx="-16" cy="-7" r="1.5" fill="#000" />
                {/* Tail */}
                <path d="M 16,3 Q 28,10 24,20" stroke="#78716c" strokeWidth="2.5" fill="none" />
                {/* Folded hands holding little modak */}
                <circle cx="-19" cy="-1" r="3" fill="#facc15" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

// Helper for dynamic gradient shading
function adjustColorBrightness(col: string, percent: number): string {
  let num = parseInt(col.replace('#', ''), 16);
  if (isNaN(num)) num = 0xb8754a;
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

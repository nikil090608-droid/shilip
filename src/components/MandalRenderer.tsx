import React from 'react';
import { IdolConfig, MandalConfig, MandalItemType, PlacedMandalItem } from '../types';
import { GaneshaRenderer } from './GaneshaRenderer';

interface MandalRendererProps {
  config: IdolConfig;
  mandalConfig: MandalConfig;
  onItemClick?: (instanceId: string) => void;
  onItemMove?: (instanceId: string, newX: number, newY: number) => void;
  selectedItemInstanceId?: string | null;
  interactive?: boolean;
  onCanvasClick?: (x: number, y: number) => void;
  activeItemTypeToPlace?: MandalItemType | null;
}

export const MandalRenderer: React.FC<MandalRendererProps> = ({
  config,
  mandalConfig,
  onItemClick,
  onItemMove,
  selectedItemInstanceId,
  interactive = false,
  onCanvasClick,
  activeItemTypeToPlace,
}) => {
  const theme = mandalConfig.theme || 'traditional';
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [draggingItemId, setDraggingItemId] = React.useState<string | null>(null);
  const isDraggingRef = React.useRef<boolean>(false);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDraggingRef.current) return;
    if (!onCanvasClick || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    onCanvasClick(Math.round(clickX), Math.round(clickY));
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!draggingItemId || !onItemMove || !svgRef.current) return;
    isDraggingRef.current = true;
    const rect = svgRef.current.getBoundingClientRect();
    const clampedX = Math.round(Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100)));
    const clampedY = Math.round(Math.max(12, Math.min(88, ((clientY - rect.top) / rect.height) * 100)));
    onItemMove(draggingItemId, clampedX, clampedY);
  };

  const handleItemPointerDown = (
    e: React.MouseEvent | React.TouchEvent,
    instanceId: string
  ) => {
    if (!interactive) return;
    e.stopPropagation();
    setDraggingItemId(instanceId);
    isDraggingRef.current = false;
    onItemClick?.(instanceId);
  };

  const handleEndDrag = () => {
    setDraggingItemId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden rounded-2xl ${
        draggingItemId
          ? 'cursor-grabbing'
          : interactive
          ? 'cursor-crosshair'
          : 'cursor-default'
      }`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 700"
        className="w-full h-full drop-shadow-2xl"
        onClick={handleSvgClick}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handleEndDrag}
        onMouseLeave={handleEndDrag}
        onTouchMove={(e) => {
          if (draggingItemId && e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleEndDrag}
        onTouchCancel={handleEndDrag}
      >
        <defs>
          {/* Background Gradients by Theme */}
          {/* 1. Traditional */}
          <linearGradient id="mandalBgTraditional" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f1005" />
            <stop offset="60%" stopColor="#3d1b06" />
            <stop offset="100%" stopColor="#180b03" />
          </linearGradient>

          {/* 2. Eco Nature */}
          <linearGradient id="mandalBgEco" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082110" />
            <stop offset="65%" stopColor="#143b1e" />
            <stop offset="100%" stopColor="#091b0e" />
          </linearGradient>

          {/* 3. Village */}
          <linearGradient id="mandalBgVillage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#28130a" />
            <stop offset="65%" stopColor="#451e11" />
            <stop offset="100%" stopColor="#1f0c05" />
          </linearGradient>

          {/* 4. Royal Festival */}
          <linearGradient id="mandalBgRoyal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#300707" />
            <stop offset="60%" stopColor="#581010" />
            <stop offset="100%" stopColor="#200505" />
          </linearGradient>

          {/* 5. Modern Indian */}
          <linearGradient id="mandalBgModern" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="60%" stopColor="#292524" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>

          {/* Stage Sanctum Glow */}
          <radialGradient id="sanctumGlow" cx="50%" cy="48%" r="45%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Floor Carpet Pattern */}
          <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0b02" />
          </linearGradient>

          {/* Gold Arch Trim */}
          <linearGradient id="goldArchTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------- */}
        {/* MANDAL ENVIRONMENT BACKGROUND & ARCHITECTURE       */}
        {/* -------------------------------------------------- */}
        {/* Sky / Back Wall */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="520"
          fill={
            theme === 'traditional'
              ? 'url(#mandalBgTraditional)'
              : theme === 'eco-nature'
              ? 'url(#mandalBgEco)'
              : theme === 'village'
              ? 'url(#mandalBgVillage)'
              : theme === 'royal-festival'
              ? 'url(#mandalBgRoyal)'
              : 'url(#mandalBgModern)'
          }
        />

        {/* Sanctum Warm Backlight */}
        <ellipse cx="500" cy="330" rx="360" ry="240" fill="url(#sanctumGlow)" />

        {/* Theme-Specific Architectural Backdrop Details */}
        {theme === 'traditional' && (
          <g id="traditional-arch-details">
            {/* Wooden carved pillars */}
            <rect x="80" y="60" width="60" height="460" fill="#3e1d08" stroke="#78350f" strokeWidth="2" />
            <rect x="860" y="60" width="60" height="460" fill="#3e1d08" stroke="#78350f" strokeWidth="2" />
            {/* Inner pilasters */}
            <rect x="220" y="90" width="45" height="430" fill="#4a220b" stroke="#78350f" strokeWidth="1.5" />
            <rect x="735" y="90" width="45" height="430" fill="#4a220b" stroke="#78350f" strokeWidth="1.5" />
            {/* Top Carved Gable & Pediment */}
            <path d="M 60,70 L 500,10 L 940,70 L 940,110 L 60,110 Z" fill="#54260d" stroke="url(#goldArchTrim)" strokeWidth="3" />
            {/* Brass Hanging Deepa chains */}
            <line x1="180" y1="110" x2="180" y2="280" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="180" cy="285" r="10" fill="#d97706" stroke="#facc15" strokeWidth="2" />
            <line x1="820" y1="110" x2="820" y2="280" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="820" cy="285" r="10" fill="#d97706" stroke="#facc15" strokeWidth="2" />
          </g>
        )}

        {theme === 'eco-nature' && (
          <g id="eco-nature-arch">
            {/* Natural Bamboo Poles */}
            {[90, 110, 870, 890, 230, 750].map((bx, idx) => (
              <g key={idx}>
                <rect x={bx} y="50" width="16" height="470" fill="#65a30d" stroke="#365314" strokeWidth="1.5" rx="3" />
                {[120, 200, 280, 360, 440].map((nodeY) => (
                  <line key={nodeY} x1={bx - 2} y1={nodeY} x2={bx + 18} y2={nodeY} stroke="#fef08a" strokeWidth="2" />
                ))}
              </g>
            ))}
            {/* Bamboo Canopy Header */}
            <rect x="70" y="60" width="860" height="35" rx="10" fill="#84cc16" stroke="#365314" strokeWidth="2" />
            {/* Lush Hanging Banana Leaves / Mango canopy */}
            {[160, 280, 400, 520, 640, 760, 840].map((lx, idx) => (
              <path
                key={idx}
                d={`M ${lx - 40},85 Q ${lx},150 ${lx + 30},90`}
                fill="none"
                stroke="#4ade80"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />
            ))}
          </g>
        )}

        {theme === 'village' && (
          <g id="village-warli-arch">
            {/* Mud-plaster pillars */}
            <rect x="90" y="60" width="55" height="460" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            <rect x="855" y="60" width="55" height="460" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            {/* Straw / Thatch Roof Canopy */}
            <path d="M 50,85 L 500,20 L 950,85 L 930,120 L 70,120 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            {/* Warli Art Figures on side borders */}
            {[180, 260, 340, 420].map((wy, idx) => (
              <g key={idx} transform={`translate(117, ${wy}) scale(0.7)`}>
                <circle cx="0" cy="-12" r="5" fill="#fef3c7" />
                <path d="M -8,0 L 8,0 L 0,-8 Z M -8,0 L 8,0 L 0,8 Z" fill="#fef3c7" />
                <line x1="0" y1="8" x2="-6" y2="18" stroke="#fef3c7" strokeWidth="2" />
                <line x1="0" y1="8" x2="6" y2="18" stroke="#fef3c7" strokeWidth="2" />
                <line x1="-8" y1="-2" x2="-14" y2="6" stroke="#fef3c7" strokeWidth="2" />
                <line x1="8" y1="-2" x2="14" y2="6" stroke="#fef3c7" strokeWidth="2" />
              </g>
            ))}
            {[180, 260, 340, 420].map((wy, idx) => (
              <g key={idx} transform={`translate(882, ${wy}) scale(0.7)`}>
                <circle cx="0" cy="-12" r="5" fill="#fef3c7" />
                <path d="M -8,0 L 8,0 L 0,-8 Z M -8,0 L 8,0 L 0,8 Z" fill="#fef3c7" />
                <line x1="0" y1="8" x2="-6" y2="18" stroke="#fef3c7" strokeWidth="2" />
                <line x1="0" y1="8" x2="6" y2="18" stroke="#fef3c7" strokeWidth="2" />
                <line x1="-8" y1="-2" x2="-14" y2="6" stroke="#fef3c7" strokeWidth="2" />
                <line x1="8" y1="-2" x2="14" y2="6" stroke="#fef3c7" strokeWidth="2" />
              </g>
            ))}
          </g>
        )}

        {theme === 'royal-festival' && (
          <g id="royal-scalloped-arch">
            {/* Marble & Crimson Pillars */}
            <rect x="80" y="50" width="70" height="470" fill="#7f1d1d" stroke="#fbbf24" strokeWidth="2.5" />
            <rect x="850" y="50" width="70" height="470" fill="#7f1d1d" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Scalloped Royal Jharokha Arch */}
            <path
              d="M 120,180 C 180,90 280,70 380,80 C 430,60 500,40 500,40 C 500,40 570,60 620,80 C 720,70 820,90 880,180 L 880,120 L 120,120 Z"
              fill="#991b1b"
              stroke="#fbbf24"
              strokeWidth="3"
            />
            {/* Auspicious Golden Kalash on Top Pinnacle */}
            <circle cx="500" cy="30" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <path d="M 494,16 L 506,16 L 500,4 Z" fill="#dc2626" />
          </g>
        )}

        {theme === 'modern-indian' && (
          <g id="modern-arch">
            {/* Minimalist Brass geometric posts */}
            <rect x="100" y="70" width="25" height="450" fill="#44403c" stroke="#d97706" strokeWidth="1.5" />
            <rect x="875" y="70" width="25" height="450" fill="#44403c" stroke="#d97706" strokeWidth="1.5" />
            {/* Clean Floating Beam with Backlight */}
            <rect x="80" y="70" width="840" height="28" fill="#292524" stroke="#d97706" strokeWidth="2" rx="4" />
            {/* Geometric diamond brass fretwork motifs */}
            {[250, 350, 450, 550, 650, 750].map((gx, idx) => (
              <polygon
                key={idx}
                points={`${gx},74 ${gx + 8},84 ${gx},94 ${gx - 8},84`}
                fill="#fbbf24"
                opacity="0.8"
              />
            ))}
          </g>
        )}

        {/* -------------------------------------------------- */}
        {/* TEMPLE / MANDAL SANCTUM FLOOR                      */}
        {/* -------------------------------------------------- */}
        {/* Raised Floor Platform */}
        <polygon
          points="0,520 1000,520 1000,700 0,700"
          fill="url(#floorGrad)"
        />
        {/* Front Step Edge */}
        <line x1="0" y1="520" x2="1000" y2="520" stroke="#d97706" strokeWidth="3" />
        <line x1="0" y1="528" x2="1000" y2="528" stroke="#78350f" strokeWidth="1.5" />

        {/* Central Festive Red Carpet (Aasan Runner) */}
        <polygon
          points="280,520 720,520 790,700 210,700"
          fill="#831843"
          stroke="#fbbf24"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Carpet Gold Border */}
        <line x1="300" y1="520" x2="230" y2="700" stroke="#fde047" strokeWidth="2" strokeDasharray="6 3" />
        <line x1="700" y1="520" x2="770" y2="700" stroke="#fde047" strokeWidth="2" strokeDasharray="6 3" />

        {/* -------------------------------------------------- */}
        {/* SACRED RANGOLI ON SANCTUM FLOOR                    */}
        {/* -------------------------------------------------- */}
        {mandalConfig.rangoliCompleted && (
          <g id="sanctum-floor-rangoli" transform="translate(500, 610) scale(1.1, 0.55)">
            {/* Outer Rice flour & Turmeric Petals */}
            <circle cx="0" cy="0" r="95" fill="none" stroke="#fef08a" strokeWidth="4" strokeDasharray="8 4" />
            <circle cx="0" cy="0" r="85" fill="#f43f5e" opacity="0.35" />
            {/* 8 Lotus Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d="M 0,-30 C 20,-55 25,-75 0,-85 C -25,-75 -20,-55 0,-30 Z"
                  fill="#fb7185"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <circle cx="0" cy="-60" r="4" fill="#facc15" />
              </g>
            ))}
            {/* Central Sacred Mandala core */}
            <circle cx="0" cy="0" r="28" fill="#facc15" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="14" fill="#ea580c" />
            <circle cx="0" cy="0" r="5" fill="#ffffff" />
          </g>
        )}

        {/* -------------------------------------------------- */}
        {/* GRAND CENTRAL SINHASAN (THRONE ELEVATION)          */}
        {/* -------------------------------------------------- */}
        <g id="sinhasan-pedestal" transform="translate(500, 475)">
          {/* Base Platform */}
          <polygon points="-180,25 180,25 210,50 -210,50" fill="#451a03" stroke="#d97706" strokeWidth="2" />
          <polygon points="-160,0 160,0 180,25 -180,25" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
          {/* Throne Velvet Cushion Pad */}
          <rect x="-140" y="-12" width="280" height="15" rx="6" fill="#9f1239" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* -------------------------------------------------- */}
        {/* BAPPA IDOL FROM PHASE 1 IN CENTER SANCTUM          */}
        {/* -------------------------------------------------- */}
        <g id="sanctum-bappa-wrapper" transform="translate(200, 40) scale(1)">
          {/* Custom Ganesha from Phase 1 rendered faithfully */}
          <foreignObject x="0" y="0" width="600" height="500">
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <GaneshaRenderer config={config} stage="final-reveal" glow />
            </div>
          </foreignObject>
        </g>

        {/* -------------------------------------------------- */}
        {/* PLACED MANDAL DECORATIONS & CIVIC ITEMS            */}
        {/* -------------------------------------------------- */}
        {mandalConfig.placedItems.map((item: PlacedMandalItem) => {
          // item.x is 5-95%, item.y is 10-90%
          const svgX = (item.x / 100) * 1000;
          const svgY = (item.y / 100) * 700;
          const isSelected = item.instanceId === selectedItemInstanceId;

          return (
            <g
              key={item.instanceId}
              transform={`translate(${svgX}, ${svgY})`}
              className={`cursor-pointer transition-transform select-none ${
                draggingItemId === item.instanceId ? 'scale-125 cursor-grabbing' : 'hover:scale-110'
              }`}
              onMouseDown={(e) => handleItemPointerDown(e, item.instanceId)}
              onTouchStart={(e) => handleItemPointerDown(e, item.instanceId)}
              onClick={(e) => {
                e.stopPropagation();
                onItemClick?.(item.instanceId);
              }}
            >
              {/* Selection Ring */}
              {isSelected && (
                <circle cx="0" cy="0" r="32" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
              )}

              {/* RENDER BY ITEM TYPE */}
              {item.type === 'flowers' && (
                <g>
                  {/* Cascading Marigold garland pillar / wreath */}
                  <ellipse cx="0" cy="0" rx="20" ry="24" fill="#ea580c" opacity="0.2" />
                  <circle cx="-10" cy="-12" r="10" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
                  <circle cx="10" cy="-12" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="0" cy="2" r="12" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
                  <circle cx="-10" cy="16" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="10" cy="16" r="9" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
                  {/* Jasmine blossom white accents */}
                  <circle cx="0" cy="-6" r="3.5" fill="#ffffff" />
                  <circle cx="0" cy="10" r="3.5" fill="#ffffff" />
                </g>
              )}

              {item.type === 'diyas' && (
                <g>
                  {/* Terracotta Clay Diya with flickering golden flame */}
                  <ellipse cx="0" cy="10" rx="22" ry="10" fill="#9a3412" stroke="#ea580c" strokeWidth="1.5" />
                  <ellipse cx="0" cy="8" rx="16" ry="6" fill="#78350f" />
                  {/* Glowing Flame */}
                  <path d="M 0,6 C -5,0 -4,-12 0,-18 C 4,-12 5,0 0,6 Z" fill="#fde047" filter="drop-shadow(0 0 6px #f59e0b)" />
                  <path d="M 0,4 C -2,1 -2,-6 0,-10 C 2,-6 2,1 0,4 Z" fill="#ffffff" />
                </g>
              )}

              {item.type === 'leaves' && (
                <g>
                  {/* Mango leaf festoon bunch */}
                  <path d="M 0,-20 Q -15,0 -2,22 Q -8,5 0,-20 Z" fill="#15803d" stroke="#166534" strokeWidth="1" />
                  <path d="M 0,-20 Q 15,0 2,22 Q 8,5 0,-20 Z" fill="#16a34a" stroke="#166534" strokeWidth="1" />
                  <path d="M 0,-20 L 0,20" fill="none" stroke="#22c55e" strokeWidth="1" />
                  <circle cx="0" cy="-20" r="4" fill="#ea580c" />
                </g>
              )}

              {item.type === 'rangoli' && (
                <g transform="scale(0.8, 0.45)">
                  {/* Small decorative floor rangoli rosette */}
                  <circle cx="0" cy="0" r="28" fill="#f43f5e" opacity="0.4" />
                  <circle cx="0" cy="0" r="22" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                  {[0, 60, 120, 180, 240, 300].map((a) => (
                    <circle key={a} cx={16 * Math.cos((a * Math.PI) / 180)} cy={16 * Math.sin((a * Math.PI) / 180)} r="6" fill="#fbbf24" />
                  ))}
                  <circle cx="0" cy="0" r="8" fill="#dc2626" />
                </g>
              )}

              {item.type === 'lights' && (
                <g>
                  {/* Warm golden LED festival cluster */}
                  <line x1="-20" y1="-10" x2="20" y2="10" stroke="#78716c" strokeWidth="1.5" />
                  {[-15, 0, 15].map((lx, idx) => (
                    <g key={idx} transform={`translate(${lx}, ${lx * 0.4})`}>
                      <circle cx="0" cy="0" r="10" fill="#fde047" opacity="0.3" filter="blur(2px)" />
                      <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                    </g>
                  ))}
                </g>
              )}

              {item.type === 'dhol' && (
                <g transform="scale(0.9)">
                  {/* Nashik Dhol cylinder drum */}
                  <rect x="-24" y="-14" width="48" height="28" rx="6" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                  <ellipse cx="-24" cy="0" rx="6" ry="14" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
                  <ellipse cx="24" cy="0" rx="6" ry="14" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
                  <path d="M -24,-10 L 24,10 M -24,10 L 24,-10" stroke="#dc2626" strokeWidth="1.5" />
                  {/* Wooden drum stick (Tipe) */}
                  <line x1="-28" y1="-20" x2="-10" y2="-5" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}

              {item.type === 'plants' && (
                <g transform="scale(0.85)">
                  {/* Living terracotta potted Tulsi / flowering hibiscus */}
                  <polygon points="-16,18 16,18 12,32 -12,32" fill="#9a3412" stroke="#78350f" strokeWidth="1.5" />
                  {/* Tulsi leaves & foliage */}
                  <circle cx="0" cy="6" r="14" fill="#15803d" />
                  <circle cx="-10" cy="-2" r="10" fill="#16a34a" />
                  <circle cx="10" cy="-2" r="10" fill="#16a34a" />
                  <circle cx="0" cy="-12" r="8" fill="#22c55e" />
                  <circle cx="0" cy="-14" r="3" fill="#dc2626" />
                </g>
              )}

              {item.type === 'fabric' && (
                <g>
                  {/* Handwoven khadi textile drape rosette */}
                  <path d="M -18,-15 Q 0,25 18,-15 Q 0,-5 -18,-15 Z" fill="#b91c1c" stroke="#fbbf24" strokeWidth="1.5" />
                  <circle cx="0" cy="-5" r="5" fill="#facc15" />
                  <line x1="0" y1="5" x2="0" y2="24" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              )}

              {item.type === 'eco-decor' && (
                <g>
                  {/* Origami paper star / Jute hanging lantern */}
                  <polygon points="0,-22 6,-6 22,0 6,6 0,22 -6,6 -22,0 -6,-6" fill="#facc15" stroke="#d97706" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="5" fill="#ea580c" />
                </g>
              )}

              {item.type === 'entrance' && (
                <g transform="scale(0.9)">
                  {/* Carved Toran Archway entry indicator */}
                  <rect x="-28" y="-25" width="8" height="50" fill="#78350f" rx="2" />
                  <rect x="20" y="-25" width="8" height="50" fill="#78350f" rx="2" />
                  <path d="M -28,-20 Q 0,-34 28,-20" fill="none" stroke="#ea580c" strokeWidth="6" />
                  <text x="0" y="-8" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">
                    SWAGAT
                  </text>
                </g>
              )}

              {item.type === 'seating' && (
                <g>
                  {/* Woven floor mats & baithak bolsters */}
                  <rect x="-24" y="-8" width="48" height="18" rx="4" fill="#047857" stroke="#065f46" strokeWidth="1.5" />
                  <rect x="-20" y="-14" width="40" height="9" rx="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
                </g>
              )}

              {item.type === 'accessibility' && (
                <g>
                  {/* Blue Accessibility / Wheelchair ramp badge */}
                  <circle cx="0" cy="0" r="18" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="2" />
                  {/* Accessible icon */}
                  <circle cx="0" cy="-7" r="3.5" fill="#ffffff" />
                  <path d="M -4,0 L 4,0 M 0,-4 L 0,8 L 5,11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}

              {item.type === 'safety' && (
                <g>
                  {/* First Aid & Eco Fire sand indicator */}
                  <rect x="-16" y="-16" width="32" height="32" rx="6" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
                  <rect x="-4" y="-11" width="8" height="22" rx="2" fill="#ffffff" />
                  <rect x="-11" y="-4" width="22" height="8" rx="2" fill="#ffffff" />
                </g>
              )}

              {item.type === 'waste-bins' && (
                <g>
                  {/* Twin Wet (Green) & Dry (Blue) Sorting Bins */}
                  {/* Green Compost Bin */}
                  <rect x="-18" y="-12" width="16" height="24" rx="3" fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
                  <text x="-10" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                    🌱
                  </text>
                  {/* Blue Dry Bin */}
                  <rect x="2" y="-12" width="16" height="24" rx="3" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.5" />
                  <text x="10" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                    ♻️
                  </text>
                </g>
              )}

              {/* Item Name Label on hover / selection */}
              {isSelected && (
                <g transform="translate(0, 32)">
                  <rect x="-65" y="-12" width="130" height="22" rx="11" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" />
                  <text textAnchor="middle" y="3" fill="#fef3c7" fontSize="10" fontWeight="bold">
                    {item.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Placing helper overlay if user clicked an item to place */}
        {interactive && activeItemTypeToPlace && (
          <g className="pointer-events-none">
            <rect x="10" y="10" width="300" height="36" rx="18" fill="#1c1917" opacity="0.9" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="25" y="32" fill="#fef3c7" fontSize="12" fontWeight="600">
              👉 Click anywhere on Mandal to place item
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

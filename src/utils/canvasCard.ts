import { IdolConfig, MandalConfig, ScoreBreakdown } from '../types';
import { COLOR_PALETTES } from './gameLogic';

/**
 * Generates an official high-resolution festival share card as a downloadable PNG.
 */
export async function downloadShareCard(
  config: IdolConfig,
  scores: ScoreBreakdown,
  mandalConfig?: MandalConfig
): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350; // High-res 4:5 Instagram/Share ratio
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const palette = COLOR_PALETTES.find((p) => p.id === config.paletteId) || COLOR_PALETTES[0];

  // 1. Festive Dark Amber Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
  bgGrad.addColorStop(0, '#2d1406');
  bgGrad.addColorStop(0.45, '#451a03');
  bgGrad.addColorStop(1, '#1c0a02');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Ornate Border Frame
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 14;
  ctx.strokeRect(36, 36, 1008, 1278);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(52, 52, 976, 1246);

  // Corner Decorative Motifs
  const drawCorner = (x: number, y: number, rot: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 40);
    ctx.closePath();
    ctx.fillStyle = '#b45309';
    ctx.fill();
    ctx.restore();
  };
  drawCorner(60, 60, 0);
  drawCorner(1020, 60, Math.PI / 2);
  drawCorner(1020, 1290, Math.PI);
  drawCorner(60, 1290, -Math.PI / 2);

  // 3. Header Texts
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 34px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHILPI — CREATE YOUR BAPPA • BUILD YOUR MANDAL', 540, 120);

  ctx.fillStyle = '#f59e0b';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('“YOUR HANDS. YOUR BAPPA. YOUR MANDAL. OUR EARTH.”', 540, 160);

  // 4. Sanctum Arch / Pedestal behind Ganesha
  const haloGrad = ctx.createRadialGradient(540, 520, 40, 540, 520, 360);
  haloGrad.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
  haloGrad.addColorStop(0.6, 'rgba(217, 119, 6, 0.15)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(540, 520, 360, 0, Math.PI * 2);
  ctx.fill();

  // Draw Ganesha Illustration on Canvas
  drawGaneshaOnCanvas(ctx, 540, 540, config, palette);

  // 5. Creator & Bappa Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🙏 ${config.name || 'Shilpi Bappa'}`, 540, 890);

  ctx.fillStyle = '#fed7aa';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Material: ${config.material === 'natural-clay' ? 'Pure Natural Shaadu Mitti' : config.material === 'paper-pulp' ? 'Eco Paper Pulp & Natural Binder' : 'Handcrafted Sculpture'}`, 540, 935);

  // 6. Score Cards Container
  const drawScoreBox = (x: number, y: number, label: string, val: number, icon: string, color: string) => {
    ctx.fillStyle = 'rgba(40, 18, 5, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, 200, 110, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fed7aa';
    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${icon} ${label}`, x + 100, y + 36);

    ctx.fillStyle = color;
    ctx.font = 'bold 44px "Cinzel", Georgia, serif';
    ctx.fillText(`${val}`, x + 100, y + 86);
  };

  drawScoreBox(100, 975, 'ECO SCORE', scores.eco, '🌱', '#86efac');
  drawScoreBox(330, 975, 'CREATIVITY', scores.creativity, '🎨', '#fbbf24');
  drawScoreBox(560, 975, 'TRADITION', scores.tradition, '🛕', '#f472b6');
  drawScoreBox(790, 975, 'OVERALL', scores.overall, '⭐', '#f59e0b');

  // 7. Powerful Motto & Badges
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 28px "Cinzel", Georgia, serif';
  ctx.fillText('“YOUR HANDS. YOUR BAPPA. OUR EARTH.”', 540, 1140);

  ctx.fillStyle = '#fed7aa';
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Make with Mitti. Celebrate with Bhakti.', 540, 1175);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('#ShilpiGame #EcoFriendlyGanesh #NaturalClayBappa #GaneshChaturthi', 540, 1225);

  // Convert to image and trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${(config.name || 'Shilpi_Bappa').replace(/\s+/g, '_')}_Creation_Card.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function drawGaneshaOnCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  config: IdolConfig,
  palette: { bodyTone: string; dhotiTone: string; tilakTone: string }
) {
  ctx.save();
  ctx.translate(cx, cy);

  let tone = palette.bodyTone;
  if (config.material === 'plaster-of-paris') tone = '#e2e8f0';
  if (config.material === 'paper-pulp') tone = '#cbb89d';

  // Pedestal
  ctx.fillStyle = '#543310';
  ctx.fillRect(-170, 170, 340, 45);
  ctx.fillStyle = '#784421';
  ctx.fillRect(-150, 150, 300, 25);

  // Sitting legs
  ctx.fillStyle = palette.dhotiTone;
  ctx.beginPath();
  ctx.ellipse(-70, 130, 85, 40, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(70, 130, 85, 40, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly
  ctx.fillStyle = tone;
  ctx.beginPath();
  ctx.ellipse(0, 50, 95, 75, 0, 0, Math.PI * 2);
  ctx.fill();

  // Chest
  ctx.beginPath();
  ctx.ellipse(0, -25, 75, 55, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = tone;
  ctx.beginPath();
  ctx.ellipse(-75, -80, 50, 40, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(75, -80, 50, 40, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(0, -90, 60, 0, Math.PI * 2);
  ctx.fill();

  // Eyes (Simple peaceful curves)
  ctx.strokeStyle = '#1c0a02';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(-26, -95, 12, 0.2, Math.PI - 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26, -95, 12, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Tilak
  ctx.fillStyle = palette.tilakTone;
  ctx.fillRect(-4, -135, 8, 26);
  ctx.beginPath();
  ctx.arc(0, -102, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Trunk
  ctx.strokeStyle = tone;
  ctx.lineWidth = 26;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -70);
  if (config.trunkDirection === 'left') {
    ctx.bezierCurveTo(0, 0, -25, 30, -50, 20);
  } else if (config.trunkDirection === 'right') {
    ctx.bezierCurveTo(0, 0, 25, 30, 50, 20);
  } else {
    ctx.bezierCurveTo(0, 0, 0, 40, 10, 40);
  }
  ctx.stroke();

  // Crown
  if (config.crownStyle === 'flower') {
    ctx.fillStyle = '#ea580c';
    for (let x = -40; x <= 40; x += 16) {
      ctx.beginPath();
      ctx.arc(x, -155, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-45, -145);
    ctx.lineTo(0, -210);
    ctx.lineTo(45, -145);
    ctx.closePath();
    ctx.fill();
  }

  // Garland
  if (config.decorations.includes('marigold-garland')) {
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, 40, 75, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  ctx.restore();
}

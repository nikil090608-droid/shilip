import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  active?: boolean;
  density?: 'gentle' | 'celebration';
  className?: string;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  type: 'marigold' | 'rose' | 'spark';
  color: string;
  opacity: number;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({
  active = true,
  density = 'gentle',
  className = 'absolute inset-0 pointer-events-none z-10',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const maxPetals = density === 'celebration' ? 65 : 22;
    const petals: Petal[] = [];

    const colors = {
      marigold: ['#ea580c', '#f59e0b', '#facc15', '#fbbf24'],
      rose: ['#dc2626', '#b91c1c', '#991b1b', '#f43f5e'],
      spark: ['#fef08a', '#fde047', '#f59e0b'],
    };

    const createPetal = (startY?: number): Petal => {
      const rand = Math.random();
      const type: 'marigold' | 'rose' | 'spark' =
        rand < 0.6 ? 'marigold' : rand < 0.85 ? 'rose' : 'spark';
      const palette = colors[type];
      const color = palette[Math.floor(Math.random() * palette.length)];

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: type === 'spark' ? Math.random() * 2 + 1.5 : Math.random() * 7 + 6,
        speedY: type === 'spark' ? -(Math.random() * 0.8 + 0.3) : Math.random() * 1.6 + 0.8,
        speedX: Math.sin(Math.random() * Math.PI) * 1.2 - 0.6,
        angle: Math.random() * 360,
        angularSpeed: (Math.random() - 0.5) * 2.5,
        type,
        color,
        opacity: Math.random() * 0.4 + 0.6,
      };
    };

    // Populate initial petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle * 0.05) * 0.6;
        p.angle += p.angularSpeed;

        // Reset if out of bounds
        if (p.type === 'spark' && p.y < -10) {
          petals[i] = createPetal(height + 10);
        } else if (p.y > height + 15) {
          petals[i] = createPetal(-10);
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'spark') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Organic curved petal shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, density]);

  return <canvas ref={canvasRef} className={className} />;
};

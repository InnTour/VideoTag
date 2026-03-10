import React from 'react';
import { useCurrentFrame } from 'remotion';

type Mode = 'civico' | 'campane' | 'sapere' | 'speranza';

interface Props { mode?: Mode; opacity?: number; count?: number }

export const ParticleField: React.FC<Props> = ({
  mode = 'civico',
  opacity = 0.30,
  count = 45,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed1 = (i * 127 + 31) % 97;
    const seed2 = (i * 53  + 17) % 83;
    const seed3 = (i * 179 + 61) % 71;

    const x  = (seed1 / 96) * 100;
    const y0 = (seed2 / 82) * 100;
    const speed = 0.012 + (seed3 / 70) * 0.022;
    const yOff = ((frame * speed + seed1 * 0.7) % 120) - 10;
    const xOff = Math.sin((frame * 0.008 + seed2 * 0.4)) * 1.8;

    let color: string;
    let size: number;
    let shape: 'circle' | 'rect' | 'diamond';

    switch (mode) {
      case 'campane':
        // Particelle d'oro che scendono (effetto campana)
        color  = i % 3 === 0 ? '#D4A843' : i % 3 === 1 ? '#F0D880' : '#A87820';
        size   = 2.5 + (seed1 % 3);
        shape  = 'circle';
        break;
      case 'sapere':
        // Pagine/lettere dorate
        color  = i % 4 === 0 ? '#E8D8B0' : i % 4 === 1 ? '#D4A843' : i % 4 === 2 ? '#C89830' : '#F0E8D0';
        size   = 3 + (seed2 % 4);
        shape  = i % 3 === 0 ? 'rect' : 'circle';
        break;
      case 'speranza':
        // Verde + oro — il futuro
        color  = i % 3 === 0 ? '#2ECC71' : i % 3 === 1 ? '#D4A843' : '#A8D8A8';
        size   = 2 + (seed3 % 3);
        shape  = i % 4 === 0 ? 'diamond' : 'circle';
        break;
      default: // civico
        color  = i % 3 === 0 ? '#D4A843' : i % 3 === 1 ? '#2A5A8A' : '#E8D8B0';
        size   = 2 + (seed1 % 3);
        shape  = 'circle';
    }

    const cy = ((y0 + yOff) % 110);
    const cx = x + xOff;
    const alpha = Math.min(1, Math.max(0, Math.sin((cy / 110) * Math.PI)));

    if (shape === 'rect') {
      return (
        <rect
          key={i}
          x={`${cx}%`} y={`${cy}%`}
          width={size * 2.5} height={size * 1.2}
          rx={2}
          fill={color}
          opacity={alpha * 0.8}
        />
      );
    }
    if (shape === 'diamond') {
      const half = size * 1.4;
      const px = (cx / 100) * 1920;
      const py = (cy / 100) * 1080;
      return (
        <polygon
          key={i}
          points={`${px},${py - half} ${px + half},${py} ${px},${py + half} ${px - half},${py}`}
          fill={color}
          opacity={alpha * 0.75}
        />
      );
    }
    return (
      <circle
        key={i}
        cx={`${cx}%`} cy={`${cy}%`}
        r={size}
        fill={color}
        opacity={alpha * 0.85}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }}
    >
      {particles}
    </svg>
  );
};

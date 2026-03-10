import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ParticleFieldProps {
  mode?: 'pietra' | 'oro' | 'verde';
  opacity?: number;
  count?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  mode = 'pietra',
  opacity = 0.20,
  count = 35,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed1 = (i * 127 + 31) % 97;
    const seed2 = (i * 53 + 17) % 83;
    const seed3 = (i * 79 + 43) % 71;
    const seed4 = (i * 61 + 11) % 59;

    const x = (seed1 / 97) * 1920;
    const baseY = (seed2 / 83) * 1080;
    const speed = 0.20 + (seed3 / 71) * 0.4;
    const size = 1.5 + (seed4 / 59) * 3;
    const phase = (i * 37) % 628;

    const y = ((baseY - frame * speed * 0.35) % 1100);
    const drift = Math.sin(frame * 0.016 + phase * 0.01) * 16;

    let color = '#A09080';
    let rx = size * 1.2, ry = size * 0.7;

    if (mode === 'oro') {
      color = i % 2 === 0 ? '#D4A843' : '#C89830';
      rx = size; ry = size;
    } else if (mode === 'verde') {
      color = i % 2 === 0 ? '#2D5016' : '#4A7020';
      rx = size * 0.8; ry = size * 1.2;
    } else {
      // pietra
      color = i % 3 === 0 ? '#8B7355' : i % 3 === 1 ? '#A09080' : '#C8B89A';
    }

    return (
      <ellipse
        key={i}
        cx={x + drift}
        cy={((y % 1100) + 1100) % 1100}
        rx={rx}
        ry={ry}
        fill={color}
        opacity={(0.3 + (seed1 / 97) * 0.5) * opacity}
      />
    );
  });

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 1920 1080"
    >
      {particles}
    </svg>
  );
};

import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ParticleFieldProps {
  mode?: 'polvere' | 'sangue' | 'cenere' | 'oro';
  opacity?: number;
  count?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  mode = 'polvere',
  opacity = 0.22,
  count = 40,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed1 = (i * 127 + 31) % 97;
    const seed2 = (i * 53 + 17) % 83;
    const seed3 = (i * 79 + 43) % 71;
    const seed4 = (i * 61 + 11) % 59;

    const x = (seed1 / 97) * 1920;
    const baseY = (seed2 / 83) * 1080;
    const speed = 0.25 + (seed3 / 71) * 0.5;
    const size = 1.5 + (seed4 / 59) * 3;
    const phase = (i * 37) % 628;

    const y = ((baseY - frame * speed * 0.4) % 1100) + (frame % 2 === 0 ? 0 : 0);
    const drift = Math.sin((frame * 0.018 + phase * 0.01)) * 18;

    let color = '#C8B89A';
    let rx = size, ry = size;

    if (mode === 'sangue') {
      color = i % 3 === 0 ? '#8B1A1A' : i % 3 === 1 ? '#B02020' : '#C84040';
      rx = size * 0.6; ry = size * 1.4;
    } else if (mode === 'cenere') {
      color = i % 3 === 0 ? '#808080' : i % 3 === 1 ? '#606060' : '#A09080';
      rx = size * 1.2; ry = size * 0.7;
    } else if (mode === 'oro') {
      color = i % 2 === 0 ? '#C8A84B' : '#E0C060';
    } else {
      // polvere
      color = i % 3 === 0 ? '#C8B89A' : i % 3 === 1 ? '#A09080' : '#D4C4A0';
      rx = size * 1.3; ry = size * 0.7;
    }

    const particleOpacity = (0.3 + (seed1 / 97) * 0.5) * opacity;

    return (
      <ellipse
        key={i}
        cx={x + drift}
        cy={((y % 1100) + 1100) % 1100}
        rx={rx}
        ry={ry}
        fill={color}
        opacity={particleOpacity}
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

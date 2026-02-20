import React from 'react';
import { useCurrentFrame } from 'remotion';

type ParticleMode = 'dust' | 'gold' | 'stage';

interface ParticleFieldProps {
  count?: number;
  opacity?: number;
  mode?: ParticleMode;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 45,
  opacity = 0.30,
  mode = 'dust',
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed1 = (i * 127 + 31) % 97;
    const seed2 = (i * 53 + 17) % 89;
    const seed3 = (i * 79 + 43) % 83;

    const baseX = (seed1 / 97) * 100;
    const baseY = (seed2 / 89) * 100;
    const speed = 0.008 + (seed3 / 83) * 0.018;
    const phase = (i * 37) % (Math.PI * 2);
    const size = 1.5 + (seed1 / 97) * 3;

    const x = baseX + Math.sin(frame * speed + phase) * 2.5;
    const y = ((baseY - frame * speed * 12) % 110) - 5;

    let color = '#D4A843';
    let shape = 'circle';

    if (mode === 'dust') {
      color = `rgba(212,168,67,${0.4 + (seed2 / 89) * 0.4})`;
    } else if (mode === 'gold') {
      const brightness = 0.6 + Math.sin(frame * 0.05 + phase) * 0.3;
      color = `rgba(240,192,96,${brightness})`;
      shape = seed3 % 3 === 0 ? 'star' : 'circle';
    } else if (mode === 'stage') {
      color = seed1 % 3 === 0 ? '#D4A843' : seed1 % 3 === 1 ? '#CC2222' : '#F8F4EE';
    }

    return { x, y, size, color, shape };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {particles.map((p, i) => {
          const cx = (p.x / 100) * 1920;
          const cy = (p.y / 100) * 1080;
          if (p.shape === 'star') {
            return (
              <polygon
                key={i}
                points={`${cx},${cy - p.size} ${cx + p.size * 0.4},${cy + p.size * 0.3} ${cx - p.size * 0.7},${cy - p.size * 0.2} ${cx + p.size * 0.7},${cy - p.size * 0.2} ${cx - p.size * 0.4},${cy + p.size * 0.3}`}
                fill={p.color}
              />
            );
          }
          return <circle key={i} cx={cx} cy={cy} r={p.size} fill={p.color} />;
        })}
      </svg>
    </div>
  );
};

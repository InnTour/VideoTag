import React from 'react';
import { useCurrentFrame } from 'remotion';

type ParticleMode = 'polvere' | 'oro' | 'carta' | 'travertino' | 'incenso';

interface ParticleFieldProps {
  count?: number;
  opacity?: number;
  mode?: ParticleMode;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 40,
  opacity = 0.25,
  mode = 'polvere',
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed1 = (i * 127 + 31) % 97;
    const seed2 = (i * 53 + 17) % 89;
    const seed3 = (i * 79 + 43) % 83;

    const baseX = (seed1 / 97) * 100;
    const baseY = (seed2 / 89) * 100;
    const speed = 0.006 + (seed3 / 83) * 0.012;
    const phase = (i * 37) % (Math.PI * 2);
    const size = 1.2 + (seed1 / 97) * 2.8;

    const x = baseX + Math.sin(frame * speed + phase) * 2.0;
    const y = ((baseY - frame * speed * 10) % 110) - 5;

    let color = '#C89830';

    if (mode === 'polvere') {
      const alpha = 0.35 + (seed2 / 89) * 0.35;
      const r = 200 + Math.floor((seed1 / 97) * 40);
      const g = 160 + Math.floor((seed3 / 83) * 40);
      color = `rgba(${r},${g},80,${alpha})`;
    } else if (mode === 'oro') {
      const brightness = 0.5 + Math.sin(frame * 0.05 + phase) * 0.3;
      color = `rgba(240,192,80,${brightness})`;
    } else if (mode === 'carta') {
      const alpha = 0.25 + (seed2 / 89) * 0.30;
      color = `rgba(232,216,176,${alpha})`;
    } else if (mode === 'travertino') {
      // Warm stone dust — beige and ochre tones for Roman ruins
      const alpha = 0.30 + (seed2 / 89) * 0.35;
      const r = 216 + Math.floor((seed1 / 97) * 24);
      const g = 200 + Math.floor((seed3 / 83) * 16);
      const b = 160 + Math.floor((seed1 / 97) * 16);
      color = `rgba(${r},${g},${b},${alpha})`;
    } else if (mode === 'incenso') {
      // Rising smoke wisps — pale grey-gold for liturgical atmosphere
      const alpha = 0.20 + Math.sin(frame * 0.04 + phase) * 0.15;
      const g = 180 + Math.floor((seed1 / 97) * 40);
      color = `rgba(200,${g},140,${Math.max(0, alpha)})`;
    }

    return { x, y, size, color };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {particles.map((p, i) => (
          <ellipse
            key={i}
            cx={(p.x / 100) * 1920}
            cy={(p.y / 100) * 1080}
            rx={p.size}
            ry={p.size * 0.6}
            fill={p.color}
          />
        ))}
      </svg>
    </div>
  );
};

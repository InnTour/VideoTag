import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TrombaPulseProps {
  cx?: number;    // center X px
  cy?: number;    // center Y px
  color?: string;
  opacity?: number;
  // Frame numbers when the trumpet "sounds" — ripples start here
  beatFrames?: number[];
}

// Onde sonore concentriche che simulano il suono della tromba del 4 novembre
export const TrombaPulse: React.FC<TrombaPulseProps> = ({
  cx = 960,
  cy = 540,
  color = '#D4A843',
  opacity = 0.55,
  beatFrames = [30, 120, 210, 300],
}) => {
  const frame = useCurrentFrame();

  const ripples: React.ReactNode[] = [];

  beatFrames.forEach((beat, bi) => {
    // Each beat spawns 3 rings at different delays
    [0, 12, 24].forEach((delay, ri) => {
      const start = beat + delay;
      const dur = 90; // ripple duration in frames
      if (frame < start || frame > start + dur) return;

      const progress = (frame - start) / dur;
      const r = interpolate(progress, [0, 1], [0, 420], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      const ringOpacity = interpolate(progress, [0, 0.3, 1], [0.65, 0.50, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });

      ripples.push(
        <circle
          key={`${bi}-${ri}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={2.5 - ri * 0.6}
          strokeOpacity={ringOpacity}
        />
      );
    });
  });

  if (ripples.length === 0) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {ripples}
      </svg>
    </div>
  );
};

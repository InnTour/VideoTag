import React from 'react';
import { useCurrentFrame } from 'remotion';

interface SpotlightEffectProps {
  x?: number;
  y?: number;
  radius?: number;
  color?: string;
  opacity?: number;
  pulse?: boolean;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  x = 50,
  y = 40,
  radius = 380,
  color = '#D4A843',
  opacity = 0.16,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const breathe = pulse ? Math.sin(frame / 55) * 0.035 : 0;
  const cx = x / 100 * 1920;
  const cy = y / 100 * 1080;
  const r = radius * (1 + breathe);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="spotlight-mac" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.65" />
            <stop offset="55%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.60} fill="url(#spotlight-mac)" />
      </svg>
    </div>
  );
};

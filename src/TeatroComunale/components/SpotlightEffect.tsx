import React from 'react';
import { useCurrentFrame } from 'remotion';

interface SpotlightEffectProps {
  x?: number;      // center X % (0-100)
  y?: number;      // center Y % (0-100)
  radius?: number; // radius in px
  color?: string;
  opacity?: number;
  pulse?: boolean;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  x = 50,
  y = 40,
  radius = 380,
  color = '#D4A843',
  opacity = 0.18,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const breathe = pulse ? Math.sin(frame / 45) * 0.04 : 0;
  const drift = Math.sin(frame / 120) * 1.5;
  const cx = (x + drift) / 100 * 1920;
  const cy = y / 100 * 1080;
  const r = radius * (1 + breathe);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="spotlight-tc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.7" />
            <stop offset="60%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.65} fill="url(#spotlight-tc)" />
      </svg>
    </div>
  );
};

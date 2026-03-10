import React from 'react';
import { useCurrentFrame } from 'remotion';

// Grana fotografica animata — evoca le stampe d'archivio di Cancian
export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  // Seed cambia ogni 3 frame per grana visibile ma non stroboscopica
  const seed = Math.floor(frame / 3) * 7919;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, mixBlendMode: 'overlay' }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <filter id={`grain-mavi-${seed % 16}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              seed={seed % 9999}
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
            <feComponentTransfer in="blend">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect
          width="1920"
          height="1080"
          fill="rgba(180,160,120,0.35)"
          filter={`url(#grain-mavi-${seed % 16})`}
        />
      </svg>
    </div>
  );
};

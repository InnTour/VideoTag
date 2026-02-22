import React from 'react';

interface ScanLinesProps {
  opacity?: number;
}

export const ScanLines: React.FC<ScanLinesProps> = ({ opacity = 0.025 }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id="scanlines-cappella" x="0" y="0" width="1920" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1920" height="2" fill="rgba(0,0,0,0.6)" />
          <rect x="0" y="2" width="1920" height="2" fill="transparent" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#scanlines-cappella)" />
    </svg>
  </div>
);

import React from 'react';

export const ScanLines: React.FC<{ opacity?: number }> = ({ opacity = 0.022 }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id="scanlines-mac" x="0" y="0" width="1920" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1920" height="2" fill="rgba(0,0,0,0.55)" />
          <rect x="0" y="2" width="1920" height="2" fill="transparent" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#scanlines-mac)" />
    </svg>
  </div>
);

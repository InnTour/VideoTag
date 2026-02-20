import React from 'react';

// ──────────────────────────────────────────────────────────────
// CrossReveal — Croce latina che si disegna dal centro verso l'esterno
// con animazione stroke-dashoffset progressiva.
// Visualizza la sovrapposizione della fede cristiana sul travertino pagano.
// ──────────────────────────────────────────────────────────────

interface CrossRevealProps {
  progress: number;   // 0→1: quanto è "disegnata" la croce
  opacity?: number;
  color?: string;
  size?: number;
}

export const CrossReveal: React.FC<CrossRevealProps> = ({
  progress,
  opacity = 1,
  color = '#C89830',
  size = 200,
}) => {
  // Croce latina: braccio verticale più lungo del trasversale
  const armWidth = size * 0.12;
  const verticalH = size;
  const horizontalW = size * 0.60;
  const crossbarY = size * 0.30; // il braccio orizzontale si colloca al 30% dall'alto

  // Calcola il path della croce latina come un unico path continuo
  const halfArm = armWidth / 2;
  const halfHoriz = horizontalW / 2;
  const cx = size / 2;

  // Forma a croce latina — disegnata come contorno continuo
  const d = [
    `M ${cx - halfArm} 0`,                          // top-left del braccio verticale superiore
    `L ${cx + halfArm} 0`,                           // top-right
    `L ${cx + halfArm} ${crossbarY - halfArm}`,      // scende al braccio orizzontale
    `L ${cx + halfHoriz} ${crossbarY - halfArm}`,    // estende a dx
    `L ${cx + halfHoriz} ${crossbarY + halfArm}`,    // scende
    `L ${cx + halfArm} ${crossbarY + halfArm}`,      // rientra
    `L ${cx + halfArm} ${verticalH}`,                // scende fino in fondo
    `L ${cx - halfArm} ${verticalH}`,                // base sx
    `L ${cx - halfArm} ${crossbarY + halfArm}`,      // risale al braccio
    `L ${cx - halfHoriz} ${crossbarY + halfArm}`,    // estende a sx
    `L ${cx - halfHoriz} ${crossbarY - halfArm}`,    // risale
    `L ${cx - halfArm} ${crossbarY - halfArm}`,      // rientra
    'Z',
  ].join(' ');

  // Il perimetro totale approssimato della croce
  const totalLength = 2 * verticalH + 2 * horizontalW + 4 * armWidth;

  const dashOffset = totalLength * (1 - progress);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', opacity,
    }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }}
      >
        {/* Glow behind the cross */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
          filter="url(#cross-glow-pedoca)"
          opacity={0.5}
        />
        {/* Main cross outline */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
          strokeLinejoin="miter"
        />
        {/* Fill that fades in at the end */}
        <path
          d={d}
          fill={color}
          opacity={Math.max(0, (progress - 0.7) / 0.3) * 0.25}
          stroke="none"
        />
        <defs>
          <filter id="cross-glow-pedoca" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

import React from 'react';
import { useCurrentFrame } from 'remotion';

// ── SeismicWave ──────────────────────────────────────────────────────────────
// Onda sismica SVG orizzontale che si propaga da sinistra a destra
// Simula visivamente la forma d'onda di un sismografo al momento del terremoto
//
// Props:
//   opacity    — opacità globale (0–1)
//   color      — colore dell'onda (default #8B1A1A)
//   amplitude  — altezza dell'onda in px (default 24)
//   speed      — velocità di avanzamento (default 2.8)
// ─────────────────────────────────────────────────────────────────────────────

interface SeismicWaveProps {
  opacity?: number;
  color?: string;
  amplitude?: number;
  speed?: number;
}

export const SeismicWave: React.FC<SeismicWaveProps> = ({
  opacity = 1,
  color = '#8B1A1A',
  amplitude = 24,
  speed = 2.8,
}) => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 120;
  const CY = H / 2;

  // Costruisce il path dell'onda sismica
  // Combina due seno a frequenze diverse per aspetto sismografo realistico
  const phase = frame * speed;
  const points: string[] = [];
  const steps = 240;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    // Onda primaria + secondaria (battimento)
    const y = CY
      + Math.sin((i / steps) * Math.PI * 8 + phase * 0.08) * amplitude
      + Math.sin((i / steps) * Math.PI * 13 + phase * 0.05) * (amplitude * 0.38)
      + Math.sin((i / steps) * Math.PI * 3.2 + phase * 0.12) * (amplitude * 0.22);
    points.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }

  // Seconda onda (sfasata) — onda riflessa più debole
  const points2: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    const y = CY
      + Math.sin((i / steps) * Math.PI * 6 + phase * 0.06 + 1.8) * (amplitude * 0.45)
      + Math.sin((i / steps) * Math.PI * 11 + phase * 0.04 + 0.9) * (amplitude * 0.22);
    points2.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H, opacity, pointerEvents: 'none' }}>
      <svg width={W} height={H} style={{ display: 'block' }}>
        {/* Onda principale */}
        <path
          d={points.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={2.2}
          strokeLinecap="round"
          opacity={0.88}
        />
        {/* Onda riflessa più debole */}
        <path
          d={points2.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.40}
        />
        {/* Linea base (quiete) */}
        <line
          x1={0} y1={CY} x2={W} y2={CY}
          stroke={color}
          strokeWidth={0.6}
          opacity={0.20}
          strokeDasharray="8 6"
        />
      </svg>
    </div>
  );
};

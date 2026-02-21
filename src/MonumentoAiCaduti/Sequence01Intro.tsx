import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq01 — Intro (~10s · 300 frame)
// Hero: monumento nella nebbia dorata mattutina
// Flash apertura nebbiosa · Badge · Spring title · Ghost CADUTI
// ─────────────────────────────────────────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash apertura — sobrio, nebbioso (non fotografico)
  const flashOp = interpolate(frame, [0, 6, 16], [0.28, 0.10, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Badge
  const badgeEnt = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeX   = interpolate(badgeEnt, [0, 1], [-44, 0]);

  // Linea decorativa
  const lineW = interpolate(frame, [22, 80], [0, 310], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo spring
  const titleEnt = spring({ frame: Math.max(0, frame - 34), fps, config: { damping: 155, stiffness: 78 } });
  const titleY   = interpolate(titleEnt, [0, 1], [44, 0]);

  // Sottotitolo
  const subEnt = spring({ frame: Math.max(0, frame - 56), fps, config: { damping: 200 } });
  const subY   = interpolate(subEnt, [0, 1], [16, 0]);

  // Ghost "CADUTI" — grande e quasi invisibile
  const ghostOp = interpolate(frame, [24, 70], [0, 0.060], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Luce nebbia mattutina — pulse lento
  const nebbiaPulse = Math.sin(frame / 60) * 0.05;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Monumento nella nebbia dorata — zoom-in molto lento */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.04} objectPosition="center center" />

      {/* Overlay bitonale scuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.18) 100%)',
          'linear-gradient(to top,   rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.20) 65%, transparent 100%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Luce dorata della nebbia mattutina */}
      <SpotlightEffect x={58} y={38} radius={420} color={COLORS.oroLuce} opacity={0.14 + nebbiaPulse} pulse />

      {/* Ghost "CADUTI" */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 240, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.biancoLapide, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap', letterSpacing: '0.06em',
      }}>CADUTI</div>

      {/* Flash apertura */}
      {flashOp > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: COLORS.biancoLapide, opacity: flashOp }} />
      )}

      {/* BADGE */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeEnt, transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.rossoPapavero,
          padding: '8px 22px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.16em',
          color: COLORS.biancoLapide, textTransform: 'uppercase',
        }}>
          Sezione A4 · Luoghi della Memoria
        </div>
      </div>

      {/* TITOLO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: titleEnt, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroLuce}, transparent)`,
          marginBottom: 24,
        }} />
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 108, fontWeight: 700, lineHeight: 1.0,
          color: COLORS.biancoLapide,
          textShadow: '0 2px 40px rgba(0,0,0,0.95)',
          maxWidth: 840,
        }}>
          Monumento<br />
          <span style={{ color: COLORS.oroLuce }}>ai Caduti</span>
        </div>
      </div>

      {/* SOTTOTITOLO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: subEnt, transform: `translateY(${subY}px)`,
        maxWidth: 700,
        fontFamily: 'Lato, sans-serif', fontSize: 32, fontWeight: 300,
        color: COLORS.biancoLapide, letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        Omaggio solenne ai Caduti e ai Dispersi di tutte le guerre
      </div>

      <ScanLines />
    </div>
  );
};

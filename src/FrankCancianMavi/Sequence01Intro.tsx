import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq01 — Intro · Manifesto MAVI (~10s · 300 frame)
// Hero: manifesto mostra "Frank Cancian: 1957. L'Irpinia e il tempo fermo."
// Flash apertura · Badge sezione · Titolo · Sottotitolo · Ghost 1957
// ─────────────────────────────────────────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash apertura — come lo scatto di una macchina fotografica
  const flashOp = interpolate(frame, [0, 4, 14], [1, 0.45, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Badge sezione
  const badgeEnt = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeX   = interpolate(badgeEnt, [0, 1], [-44, 0]);

  // Linea decorativa
  const lineW = interpolate(frame, [22, 75], [0, 320], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo principale — spring bounce
  const titleEnt = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 150, stiffness: 75 } });
  const titleY   = interpolate(titleEnt, [0, 1], [44, 0]);

  // Sottotitolo
  const subEnt = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 200 } });
  const subY   = interpolate(subEnt, [0, 1], [16, 0]);

  // Ghost "1957" — filigrana temporale
  const ghostOp = interpolate(frame, [22, 65, 250, 285], [0, 0.062, 0.062, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Manifesto mostra — zoom-in lento */}
      <KenBurnsImage src={IMAGES.manifesto} motion="zoom-in" intensity={0.04} objectPosition="center center" />

      {/* Overlay bitonale scuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.93) 0%, rgba(10,8,4,0.58) 52%, rgba(10,8,4,0.18) 100%)',
          'linear-gradient(to top,   rgba(10,8,4,0.88) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.76) 100%)',
      }} />

      {/* Tono seppia sul manifesto */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,168,120,0.10)',
        mixBlendMode: 'multiply',
      }} />

      {/* Ghost anno "1957" — verticale, grande */}
      <div style={{
        position: 'absolute', right: 68, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 270, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.seppia, opacity: ghostOp, pointerEvents: 'none',
        writingMode: 'vertical-rl', letterSpacing: '0.04em',
      }}>1957</div>

      {/* Flash apertura fotografico */}
      {flashOp > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: '#F8F4EE', opacity: flashOp }} />
      )}

      {/* BADGE sezione */}
      <div style={{
        position: 'absolute', top: 54, left: 72,
        opacity: badgeEnt, transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: 'rgba(139,26,26,0.88)',
          padding: '8px 22px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.16em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione C3 · Fotografia &amp; Memoria
        </div>
      </div>

      {/* TITOLO E CONTENUTO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 180,
        opacity: titleEnt, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(to right, ${COLORS.seppia}, transparent)`,
          marginBottom: 24,
        }} />
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 108, fontWeight: 700, lineHeight: 1.0,
          color: COLORS.biancoCalce,
          textShadow: '0 2px 36px rgba(0,0,0,0.95)',
          maxWidth: 820,
        }}>
          <span style={{ color: COLORS.oroMavi }}>MAVI</span><br />
          <span style={{ fontSize: 56, fontWeight: 400, fontStyle: 'italic', color: COLORS.biancoCalce, opacity: 0.88 }}>
            Museo Antropologico<br />Visivo Irpino
          </span>
        </div>
      </div>

      {/* SOTTOTITOLO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 100,
        transform: `translateY(${subY}px)`,
        maxWidth: 680,
        fontFamily: 'Lato, sans-serif', fontSize: 32, fontWeight: 300,
        color: COLORS.biancoCalce, opacity: subEnt * 0.80,
        letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        Cuore pulsante della memoria di Lacedonia
      </div>

      <FilmGrain opacity={0.055} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

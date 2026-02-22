import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq01 — Intro (~10s · 300 frame)
// Colonna hero: zoom-out lento dalla notte
// Badge · Titolo "Colonna del Pedoca" · Ghost "1587"
// Hook: "La transizione dal paganesimo alla fede cristiana"
// ──────────────────────────────────────────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Flash apertura travertino (primi 10 frame) ─────────────
  const flashOpacity = interpolate(frame, [0, 5, 10], [0.30, 0.10, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Badge sezione — slide da sinistra ──────────────────────
  const badgeEntrance = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeX = interpolate(badgeEntrance, [0, 1], [-40, 0]);

  // ── Linea decorativa ───────────────────────────────────────
  const lineWidth = interpolate(frame, [22, 80], [0, 300], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo — spring con bounce ─────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 160, stiffness: 80 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [40, 0]);

  // ── Sottotitolo — slide-up leggero ─────────────────────────
  const subEntrance = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 200 } });
  const subY = interpolate(subEntrance, [0, 1], [14, 0]);

  // ── Pulse caldo sulla colonna ──────────────────────────────
  const warmPulse = Math.sin(frame / 45) * 0.05;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Colonna hero — zoom-out lento, la colonna emerge dalla notte */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.05} objectPosition="center center" />

      {/* Overlay bitonale — scuro a sx per testo, aperto a dx per foto */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,8,0.94) 0%, rgba(10,8,8,0.58) 52%, rgba(10,8,8,0.16) 100%)',
          'linear-gradient(to top, rgba(10,8,8,0.90) 0%, rgba(10,8,8,0.20) 55%, transparent 100%)',
        ].join(', '),
      }} />

      {/* Vignette perimetrale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.78) 100%)',
      }} />

      {/* Spotlight caldo travertino */}
      <SpotlightEffect x={68} y={44} radius={400} color={COLORS.travertino} opacity={0.14 + warmPulse} pulse />

      {/* Flash apertura travertino */}
      {flashOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: COLORS.travertino,
          opacity: flashOpacity,
        }} />
      )}

      {/* Ghost "1587" verticale — filigrana dell'anno fondativo */}
      <div style={{
        position: 'absolute', right: 80, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 220, fontWeight: 700,
        color: COLORS.oroVescovile, opacity: 0.06,
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>1587</div>

      {/* BADGE SEZIONE */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeEntrance,
        transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.rossoVescovile,
          padding: '6px 20px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.16em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          A4 · Architettura e Monumenti · 1587
        </div>
      </div>

      {/* TITOLO con spring */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        {/* Linea decorativa oro */}
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroVescovile}, transparent)`,
          marginBottom: 22,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 104, fontWeight: 700,
          color: COLORS.biancoCalce, lineHeight: 1.05,
          textShadow: '0 2px 32px rgba(0,0,0,0.95), 0 0 80px rgba(200,152,48,0.16)',
          maxWidth: 860,
        }}>
          Colonna del<br />
          <span style={{ color: COLORS.oroVescovile }}>Pedoca</span>
        </div>

        {/* TAG ghost decorativo */}
        <div style={{
          position: 'absolute', right: -170, top: -40,
          fontFamily: 'Playfair Display, serif',
          fontSize: 160, fontWeight: 700,
          color: COLORS.oroVescovile, opacity: 0.05,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>A4.10</div>
      </div>

      {/* SOTTOTITOLO narrativo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: subEntrance,
        transform: `translateY(${subY}px)`,
        maxWidth: 700,
        fontFamily: 'Lato, sans-serif', fontSize: 30, fontWeight: 300,
        color: COLORS.biancoCalce, letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        La transizione dal paganesimo alla fede cristiana
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

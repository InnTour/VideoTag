import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq01 — Intro (~9.7s · 290 frame)
// Spring animations per titolo e badge
// Flash apertura da palcoscenico
// ──────────────────────────────────────────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Flash d'apertura teatrale (i primi 8 frame) ──────────────
  const flashOpacity = interpolate(frame, [0, 4, 8], [0.40, 0.15, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Badge sezione — spring con leggero delay ─────────────────
  const badgeEntrance = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 180 } });
  const badgeOpacity = badgeEntrance;
  const badgeX = interpolate(badgeEntrance, [0, 1], [-30, 0]);

  // ── Linea decorativa — cresce da sx a dx ────────────────────
  const lineWidth = interpolate(frame, [25, 80], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo — spring con bounce sottile ──────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 160, stiffness: 80 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [36, 0]);

  // ── Sottotitolo — slide-up leggero ──────────────────────────
  const subEntrance = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 200 } });
  const subOpacity = subEntrance;
  const subY = interpolate(subEntrance, [0, 1], [12, 0]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Foto hero — Ken Burns zoom-in lento */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.06} />

      {/* Overlay bitonale teatrale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(13,13,26,0.90) 0%, rgba(13,13,26,0.58) 55%, rgba(13,13,26,0.14) 100%)',
          'linear-gradient(to top, rgba(13,13,26,0.92) 0%, rgba(13,13,26,0.20) 50%, transparent 100%)',
        ].join(', '),
      }} />

      {/* Vignette perimetrale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Spotlight teatrale pulsante */}
      <SpotlightEffect x={68} y={36} radius={360} color={COLORS.oroLampade} opacity={0.18} pulse />
      {/* Secondo spotlight per profondità */}
      <SpotlightEffect x={30} y={60} radius={200} color={COLORS.rossoTelone} opacity={0.06} pulse={false} />

      {/* Flash apertura da palcoscenico */}
      {flashOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: COLORS.oroLampade,
          opacity: flashOpacity,
        }} />
      )}

      {/* BADGE SEZIONE — slide da sinistra */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeOpacity,
        transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.rossoTelone,
          padding: '6px 20px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 13, letterSpacing: '0.16em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione A4 · Luoghi della Cultura
        </div>
      </div>

      {/* TITOLO con spring bounce */}
      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        {/* Linea decorativa oro */}
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)`,
          marginBottom: 22,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 92, fontWeight: 700,
          color: COLORS.biancoCalce, lineHeight: 1.04,
          textShadow: '0 2px 28px rgba(0,0,0,0.85), 0 0 70px rgba(212,168,67,0.14)',
          maxWidth: 840,
        }}>
          Teatro<br />
          <span style={{ color: COLORS.oroLampade }}>Comunale</span>
        </div>

        {/* Numero TAG ghost decorativo */}
        <div style={{
          position: 'absolute', right: -160, top: -35,
          fontFamily: 'Playfair Display, serif',
          fontSize: 170, fontWeight: 700,
          color: COLORS.oroLampade, opacity: 0.06,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>A4.04</div>
      </div>

      {/* SOTTOTITOLO narrativo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 140,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        maxWidth: 680,
        fontFamily: 'Lato, sans-serif', fontSize: 26, fontWeight: 300,
        color: COLORS.biancoCalce, letterSpacing: '0.04em',
        textShadow: '0 1px 8px rgba(0,0,0,0.9)',
      }}>
        Il moderno motore della cultura lacedoniese
      </div>

      <ScanLines opacity={0.025} />
    </div>
  );
};

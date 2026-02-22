import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS, playfairFont, latoFont} from './constants';

// ── Seq01 — Intro (~10s · 300 frame) ────────────────────────────
// Colonne corinzie hero · Badge · Titolo · Anno ghost

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 4, 14], [0.35, 0.10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeEntrance = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: {damping: 180},
  });
  const badgeX = interpolate(badgeEntrance, [0, 1], [-44, 0]);

  const lineWidth = interpolate(frame, [20, 90], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleEntrance = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: {damping: 160, stiffness: 80},
  });

  const subEntrance = spring({
    frame: Math.max(0, frame - 54),
    fps,
    config: {damping: 200},
  });

  const ghostPulse = Math.sin(frame / 48) * 0.010 + 0.070;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <KenBurnsImage
        src={IMAGES.hero}
        motion="zoom-in"
        intensity={0.04}
        objectPosition="center center"
      />

      {/* Gradient overlay — sinistra scura per leggibilità testo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(8,8,12,0.94) 0%, rgba(8,8,12,0.62) 52%, rgba(8,8,12,0.18) 100%)',
          'linear-gradient(to top, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.22) 58%, transparent 100%)',
        ].join(', '),
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Flash apertura */}
      {flashOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: COLORS.linoSacro,
          opacity: flashOpacity,
        }} />
      )}

      {/* Anno ghost "30 a.C." ruotato 90° — filigrana temporale */}
      <div style={{
        position: 'absolute', top: 0, right: 80,
        fontFamily: playfairFont,
        fontSize: 160,
        fontWeight: 700,
        color: COLORS.ambraEgizia,
        opacity: ghostPulse,
        pointerEvents: 'none',
        lineHeight: 1,
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        letterSpacing: '-0.02em',
      }}>
        30 a.C.
      </div>

      {/* Badge sezione — top left */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeEntrance,
        transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.ambraEgizia,
          padding: '6px 20px',
          borderRadius: 2,
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.18em',
          color: COLORS.biancoCalce,
          textTransform: 'uppercase',
        }}>
          Sezione A2 · Architettura e Monumenti
        </div>
      </div>

      {/* Titolo + sottotitolo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleEntrance, [0, 1], [44, 0])}px)`,
      }}>
        {/* Linea oro animata */}
        <div style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(to right, ${COLORS.oroEgizio}, transparent)`,
          marginBottom: 20,
        }} />
        <div style={{
          fontFamily: playfairFont,
          fontSize: 102,
          fontWeight: 700,
          color: COLORS.biancoCalce,
          lineHeight: 1.04,
          textShadow: '0 2px 36px rgba(0,0,0,0.96)',
          maxWidth: 880,
        }}>
          La Più Antica<br />
          <span style={{color: COLORS.oroEgizio}}>di Lacedonia</span>
        </div>
      </div>

      {/* Sottotitolo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 138,
        opacity: interpolate(subEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(subEntrance, [0, 1], [14, 0])}px)`,
        maxWidth: 720,
        fontFamily: latoFont,
        fontSize: 32,
        fontWeight: 300,
        color: COLORS.biancoCalce,
        letterSpacing: '0.04em',
        textShadow: '0 1px 12px rgba(0,0,0,0.96)',
      }}>
        Chiesa di Santa Maria della Cancellata
      </div>

      <ParticleField opacity={0.30} mode="oro" />
      <ScanLines opacity={0.02} />
    </div>
  );
};

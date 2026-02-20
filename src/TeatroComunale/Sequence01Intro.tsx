import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS, SEQ } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = SEQ.s01End - SEQ.s01Start;

  // Fade in dall'apertura
  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [dur - 30, dur], [1, 0], { extrapolateLeft: 'clamp' });
  const alpha = Math.min(fadeIn, fadeOut);

  // Titolo - entra dal basso
  const titleY = interpolate(frame, [10, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Badge "SEZIONE A4 · ARCHITETTURA"
  const badgeOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Sottotitolo
  const subOpacity = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Linea decorativa
  const lineWidth = interpolate(frame, [40, 100], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: alpha }}>
      {/* Foto hero — Teatro Comunale */}
      <KenBurnsImage
        src={IMAGES.hero}
        motion="zoom-in"
        intensity={0.06}
        startFrame={0}
        endFrame={SEQ.s01End}
      />

      {/* Overlay teatrale: sfumatura scura in basso e a sx */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(13,13,26,0.88) 0%, rgba(13,13,26,0.55) 55%, rgba(13,13,26,0.15) 100%),
          linear-gradient(to top, rgba(13,13,26,0.9) 0%, rgba(13,13,26,0.2) 50%, transparent 100%)
        `,
      }} />

      {/* Spotlight teatrale */}
      <SpotlightEffect x={68} y={38} radius={350} color={COLORS.oroLampade} opacity={0.16} pulse />

      {/* Vignette perimetrale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* BADGE sezione */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeOpacity,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          background: COLORS.rossoTelone,
          padding: '6px 18px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 13, letterSpacing: '0.15em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione A4 · Architettura
        </div>
      </div>

      {/* TITOLO principale */}
      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        transform: `translateY(${titleY}px)`,
        opacity: titleOpacity,
      }}>
        {/* Linea decorativa oro */}
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)`,
          marginBottom: 20,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 88,
          fontWeight: 700,
          color: COLORS.biancoCalce,
          lineHeight: 1.05,
          textShadow: `0 2px 24px rgba(0,0,0,0.8), 0 0 60px rgba(212,168,67,0.15)`,
          maxWidth: 820,
        }}>
          Teatro<br />
          <span style={{ color: COLORS.oroLampade }}>Comunale</span>
        </div>

        {/* Anno ghost */}
        <div style={{
          position: 'absolute', right: -180, top: -40,
          fontFamily: 'Playfair Display, serif',
          fontSize: 180, fontWeight: 700,
          color: COLORS.oroLampade,
          opacity: 0.06,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          A4.04
        </div>
      </div>

      {/* Sottotitolo narrativo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 142,
        opacity: subOpacity,
        maxWidth: 680,
        fontFamily: 'Lato, sans-serif',
        fontSize: 26,
        fontWeight: 300,
        color: COLORS.biancoCalce,
        letterSpacing: '0.04em',
        textShadow: '0 1px 8px rgba(0,0,0,0.9)',
      }}>
        Il moderno motore della cultura lacedoniese
      </div>

      <ScanLines opacity={0.025} />
    </div>
  );
};

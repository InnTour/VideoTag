/**
 * Seq04 — La Piazza · Campane e Voci
 * 600f / 20s — Transizione emotiva: "[voci lontane, campane]"
 * Questa sequenza è il ponte narrativo — dal "fatto storico" all'"immaginazione"
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

// SVG onda campana — visualizza l'audio ambiente
const CampanaPulse: React.FC<{ frame: number; fps: number; beats: number[] }> = ({ frame, fps, beats }) => {
  const rings = [0, 12, 24];
  const elements: React.ReactNode[] = [];

  beats.forEach((beatF, bi) => {
    if (frame < beatF) return;
    const elapsed = frame - beatF;
    const maxDuration = fps * 1.8;
    if (elapsed > maxDuration) return;
    const progress = elapsed / maxDuration;

    rings.forEach((delay, ri) => {
      const rProgress = Math.max(0, progress - delay / maxDuration);
      const radius = rProgress * 260;
      const opacity = (1 - rProgress) * 0.35 * (1 - ri * 0.28);
      const strokeW = 2.5 - ri * 0.6;
      elements.push(
        <circle
          key={`${bi}-${ri}`}
          cx="960" cy="540"
          r={radius}
          fill="none"
          stroke={COLORS.oroIstruzione}
          strokeWidth={strokeW}
          opacity={opacity}
        />
      );
    });
  });

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {elements}
    </svg>
  );
};

export const Sequence04LaPiazza: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tonalità calda progressiva — le campane scaldano l'immagine
  const warmOverlay = interpolate(frame, [0, fps * 5], [0, 0.18], { extrapolateRight: 'clamp' });

  // Testi
  const tagFade   = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const textFade  = interpolate(frame, [fps * 1.5, fps * 2.8], [0, 1], { extrapolateRight: 'clamp' });
  const text2Fade = interpolate(frame, [fps * 6, fps * 7.5], [0, 1], { extrapolateRight: 'clamp' });

  // Battiti campana (frame assoluti nella sequenza)
  const campanaBeats = [fps * 1.0, fps * 3.5, fps * 6.0, fps * 9.5, fps * 13.5, fps * 17.0];

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Background: piazza — zoom-out lento */}
      <KenBurnsImage src={IMAGES.piazza} motion="zoom-out" intensity={0.035} />

      {/* Overlay base */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,15,0.55) 0%, rgba(8,8,15,0.30) 50%, rgba(8,8,15,0.65) 100%)',
        }}
      />

      {/* Overlay caldo campane */}
      <AbsoluteFill
        style={{
          background: `rgba(212,168,67,${warmOverlay})`,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Campana pulse */}
      <CampanaPulse frame={frame} fps={fps} beats={campanaBeats} />

      {/* Particelle campane — oro discendente */}
      <ParticleField mode="campane" opacity={0.32} count={50} />

      {/* Testo atmosferico */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 80,
        opacity: tagFade,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.oroIstruzione, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.20em',
          color: COLORS.oroIstruzione,
          textTransform: 'uppercase',
        }}>
          A1.01 · Piazza De Sanctis
        </span>
      </div>

      {/* Citazione atmosferica */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ opacity: textFade, textAlign: 'center', padding: '0 120px' }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: COLORS.oroIstruzione,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            Voci lontane di paese · Campane
          </div>
          <div style={{
            fontFamily: PLAYFAIR,
            fontSize: 52,
            fontStyle: 'italic',
            fontWeight: 400,
            color: COLORS.biancoCalce,
            lineHeight: 1.4,
            textShadow: '0 4px 20px rgba(0,0,0,0.85)',
            maxWidth: 900,
          }}>
            Prova a immaginare i padri contadini
            che ricevono la notizia
            tra queste pietre.
          </div>
        </div>
      </AbsoluteFill>

      {/* Seconda nota emotiva */}
      <div style={{
        position: 'absolute',
        bottom: 160,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: text2Fade,
      }}>
        <div style={{
          fontFamily: LATO,
          fontSize: 26,
          fontWeight: 300,
          color: COLORS.beigeOratorio,
          letterSpacing: '0.04em',
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          textAlign: 'center',
        }}>
          I loro figli avrebbero potuto diventare <strong style={{ fontWeight: 600, color: COLORS.oroIstruzione }}>maestri</strong>
        </div>
      </div>

    </AbsoluteFill>
  );
};

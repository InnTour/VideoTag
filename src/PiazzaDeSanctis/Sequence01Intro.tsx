/**
 * Seq01 — Intro · Sei nel cuore di Lacedonia
 * 600f / 20s — Busto bronzeo di De Sanctis · musica civica in apertura
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { CaptionOverlay } from './components/CaptionOverlay';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade-in globale
  const globalFade = interpolate(frame, [0, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });

  // Flash apertura (come uno scatto fotografico — busto che si rivela)
  const flashOp = interpolate(frame, [0, 4, 18, 30], [0.6, 0, 0, 0], { extrapolateRight: 'clamp' });

  // Testo: fade-in progressivo
  const labelFade  = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const titleFade  = interpolate(frame, [fps * 1.2, fps * 2.2], [0, 1], { extrapolateRight: 'clamp' });
  const titleShift = interpolate(frame, [fps * 1.2, fps * 2.2], [30, 0], { extrapolateRight: 'clamp' });
  const subFade    = interpolate(frame, [fps * 1.8, fps * 2.8], [0, 1], { extrapolateRight: 'clamp' });

  // Overlay gradient (sx scuro per testo, dx trasparente)
  const overlayOp = interpolate(frame, [0, fps * 1], [0, 1], { extrapolateRight: 'clamp' });

  // Ghost "1878" — l'anno del telegramma come sigillo
  const ghostOp = interpolate(frame, [fps * 2, fps * 3], [0, 0.07], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Background: busto/piazza — zoom-in lento */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.04} />

      {/* Flash apertura bianca */}
      <AbsoluteFill style={{ background: 'white', opacity: flashOp, pointerEvents: 'none' }} />

      {/* Overlay gradient bitonale */}
      <AbsoluteFill
        style={{
          opacity: overlayOp,
          background: 'linear-gradient(to right, rgba(8,8,15,0.82) 0%, rgba(8,8,15,0.55) 50%, rgba(8,8,15,0.20) 100%)',
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,8,15,0.55) 100%)',
          opacity: overlayOp,
        }}
      />

      {/* Ghost "1878" */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: ghostOp,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 320,
          fontWeight: 700,
          color: COLORS.oroIstruzione,
          userSelect: 'none',
        }}>
          1878
        </span>
      </AbsoluteFill>

      {/* Particle field */}
      <ParticleField mode="civico" opacity={0.22} count={38} />

      {/* Testi */}
      <AbsoluteFill style={{ opacity: globalFade }}>
        {/* Badge sezione */}
        <div style={{
          position: 'absolute',
          top: 60,
          left: 80,
          opacity: labelFade,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 4,
            height: 32,
            background: COLORS.oroIstruzione,
            borderRadius: 2,
          }} />
          <span style={{
            fontFamily: LATO,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.20em',
            color: COLORS.oroIstruzione,
            textTransform: 'uppercase',
          }}>
            A1.01 · Architettura & Monumenti
          </span>
        </div>

        {/* Titolo principale */}
        <div style={{
          position: 'absolute',
          top: 160,
          left: 80,
          right: 80,
          opacity: titleFade,
          transform: `translateY(${titleShift}px)`,
        }}>
          <div style={{
            fontFamily: PLAYFAIR,
            fontSize: 100,
            fontWeight: 700,
            color: COLORS.biancoCalce,
            lineHeight: 1.1,
            textShadow: '0 4px 24px rgba(0,0,0,0.9)',
            maxWidth: 900,
          }}>
            Piazza De Sanctis
          </div>
        </div>

        {/* Sottotitolo */}
        <div style={{
          position: 'absolute',
          top: 310,
          left: 80,
          opacity: subFade,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 36,
            fontWeight: 300,
            color: COLORS.oroIstruzione,
            letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>
            Il Telegramma che Cambiò il Mezzogiorno
          </div>
        </div>

        {/* Hook narrativo */}
        <div style={{
          position: 'absolute',
          bottom: 180,
          left: 80,
          right: 200,
          opacity: interpolate(frame, [fps * 2.5, fps * 3.5], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [fps * 2.5, fps * 3.5], [20, 0], { extrapolateRight: 'clamp' })}px)`,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.biancoCalce,
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            maxWidth: 760,
          }}>
            Sei nel cuore di Lacedonia. E questo busto bronzeo che ti guarda
            ha una storia che vale un'intera rivoluzione.
          </div>
        </div>

        {/* Logo InnTour */}
        <div style={{
          position: 'absolute',
          top: 60,
          right: 80,
          opacity: labelFade,
        }}>
          <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 52, objectFit: 'contain' }} />
        </div>
      </AbsoluteFill>

      {/* Sottotitoli */}
      <CaptionOverlay />
    </AbsoluteFill>
  );
};

/**
 * Seq01 — Intro · Le pietre che stai calpestando
 * 720f / 24s — Selciato romano · apertura solenne · hook "duemila anni"
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade-in globale
  const globalFade = interpolate(frame, [0, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });

  // Flash apertura — come luce che filtra tra le pietre
  const flashOp = interpolate(frame, [0, 5, 20, 35], [0.7, 0, 0, 0], { extrapolateRight: 'clamp' });

  // Testi
  const labelFade  = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const titleFade  = interpolate(frame, [fps * 1.2, fps * 2.2], [0, 1], { extrapolateRight: 'clamp' });
  const titleShift = interpolate(frame, [fps * 1.2, fps * 2.2], [32, 0],  { extrapolateRight: 'clamp' });
  const subFade    = interpolate(frame, [fps * 1.8, fps * 2.8], [0, 1], { extrapolateRight: 'clamp' });
  const hookFade   = interpolate(frame, [fps * 2.8, fps * 4.0], [0, 1], { extrapolateRight: 'clamp' });
  const hookShift  = interpolate(frame, [fps * 2.8, fps * 4.0], [20, 0],  { extrapolateRight: 'clamp' });

  // Ghost "212 a.C." — l'anno che torna come un'ombra
  const ghostOp = interpolate(frame, [fps * 3, fps * 4.5], [0, 0.06], { extrapolateRight: 'clamp' });

  // Overlay gradient
  const overlayOp = interpolate(frame, [0, fps * 1], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Background: via tagliata — zoom-in lento sul selciato */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.04} objectPosition="center top" />

      {/* Flash apertura */}
      <AbsoluteFill style={{ background: 'white', opacity: flashOp, pointerEvents: 'none' }} />

      {/* Overlay gradient bitonale */}
      <AbsoluteFill
        style={{
          opacity: overlayOp,
          background: 'linear-gradient(to right, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.55) 55%, rgba(6,6,10,0.20) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,6,10,0.60) 100%)',
          opacity: overlayOp,
        }}
      />

      {/* Ghost "212 a.C." */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 280,
          fontWeight: 700,
          color: COLORS.rossoSangue,
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>
          212 a.C.
        </span>
      </AbsoluteFill>

      <ParticleField mode="polvere" opacity={0.20} count={36} />

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
          <div style={{ width: 4, height: 32, background: COLORS.oroRomano, borderRadius: 2 }} />
          <span style={{
            fontFamily: LATO,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.20em',
            color: COLORS.oroRomano,
            textTransform: 'uppercase',
          }}>
            B2.01 · Archeologia & Storia
          </span>
        </div>

        {/* Logo InnTour */}
        <div style={{ position: 'absolute', top: 60, right: 80, opacity: labelFade }}>
          <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 72, objectFit: 'contain' }} />
        </div>

        {/* Titolo */}
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
            textShadow: '0 4px 24px rgba(0,0,0,0.95)',
            maxWidth: 920,
          }}>
            Via Tagliata
          </div>
        </div>

        {/* Sottotitolo */}
        <div style={{
          position: 'absolute',
          top: 308,
          left: 80,
          opacity: subFade,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 34,
            fontWeight: 300,
            color: COLORS.oroRomano,
            letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.85)',
          }}>
            La Strada che Custodisce il Sangue di Roma
          </div>
        </div>

        {/* Hook narrativo */}
        <div style={{
          position: 'absolute',
          bottom: 180,
          left: 80,
          right: 200,
          opacity: hookFade,
          transform: `translateY(${hookShift}px)`,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.biancoCalce,
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.95)',
            maxWidth: 780,
          }}>
            Le pietre che stai calpestando hanno più di duemila anni.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Seq01 — Intro · L'Arco che Vede Tutto
 * 310f / 10.3s — hero dorata + nebbia cross-dissolve · hook narrativo
 */
import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFade  = interpolate(frame, [0, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const flashOp     = interpolate(frame, [0, 4, 18, 30], [0.55, 0, 0, 0], { extrapolateRight: 'clamp' });

  // Cross-dissolve hero→nebbia a metà sequenza
  const dissolveOp  = interpolate(frame, [fps * 5.0, fps * 7.0], [0, 1], { extrapolateRight: 'clamp' });

  const overlayOp   = interpolate(frame, [0, fps * 1.0], [0, 1], { extrapolateRight: 'clamp' });
  const labelFade   = interpolate(frame, [fps * 0.7, fps * 1.4], [0, 1], { extrapolateRight: 'clamp' });
  const titleFade   = interpolate(frame, [fps * 1.0, fps * 2.0], [0, 1], { extrapolateRight: 'clamp' });
  const titleShift  = interpolate(frame, [fps * 1.0, fps * 2.0], [26, 0], { extrapolateRight: 'clamp' });
  const subFade     = interpolate(frame, [fps * 1.6, fps * 2.5], [0, 1], { extrapolateRight: 'clamp' });
  const hookFade    = interpolate(frame, [fps * 2.8, fps * 4.0], [0, 1], { extrapolateRight: 'clamp' });
  const hookShift   = interpolate(frame, [fps * 2.8, fps * 4.0], [16, 0], { extrapolateRight: 'clamp' });

  // Ghost "1456" — il sisma che generò la porta
  const ghostOp = interpolate(frame, [fps * 2.2, fps * 4.0], [0, 0.058], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: hero dorata */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveOp }}>
        <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.035} objectPosition="center 30%" />
      </div>

      {/* Layer 2: nebbia mattutina (cross-dissolve) */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveOp }}>
        <KenBurnsImage src={IMAGES.nebbia} motion="pan-right" intensity={0.03} objectPosition="center 40%" />
      </div>

      {/* Flash apertura */}
      <AbsoluteFill style={{ background: 'white', opacity: flashOp, pointerEvents: 'none' }} />

      {/* Overlay */}
      <AbsoluteFill style={{
        opacity: overlayOp,
        background: 'linear-gradient(to right, rgba(10,8,4,0.88) 0%, rgba(10,8,4,0.50) 52%, rgba(10,8,4,0.16) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,4,0.55) 100%)',
        opacity: overlayOp,
      }} />

      {/* Ghost "1456" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 280, fontWeight: 700,
          color: COLORS.oroMercato, userSelect: 'none', letterSpacing: '-0.02em',
        }}>1456</span>
      </AbsoluteFill>

      <ParticleField mode="pietra" opacity={0.16} count={30} />

      <AbsoluteFill style={{ opacity: globalFade }}>
        {/* Badge sezione */}
        <div style={{
          position: 'absolute', top: 60, left: 80,
          opacity: labelFade, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 4, height: 32, background: COLORS.oroMercato, borderRadius: 2 }} />
          <span style={{
            fontFamily: LATO, fontSize: 15, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroMercato, textTransform: 'uppercase',
          }}>A1.04 · Architettura & Monumenti</span>
        </div>

        {/* Logo */}
        <div style={{ position: 'absolute', top: 60, right: 80, opacity: labelFade }}>
          <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 72, objectFit: 'contain' }} />
        </div>

        {/* Titolo */}
        <div style={{
          position: 'absolute', top: 158, left: 80, right: 80,
          opacity: titleFade, transform: `translateY(${titleShift}px)`,
        }}>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 102, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.05,
            textShadow: '0 4px 24px rgba(0,0,0,0.96)', maxWidth: 860,
          }}>Porta di Sotto</div>
        </div>

        {/* Sottotitolo */}
        <div style={{ position: 'absolute', top: 300, left: 80, opacity: subFade }}>
          <div style={{
            fontFamily: LATO, fontSize: 32, fontWeight: 300,
            color: COLORS.oroMercato, letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.90)',
          }}>La Porta dei Mercanti · Lacedonia</div>
        </div>

        {/* Hook narrativo */}
        <div style={{
          position: 'absolute', bottom: 180, left: 80, right: 200,
          opacity: hookFade, transform: `translateY(${hookShift}px)`,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 27, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.62,
            textShadow: '0 2px 10px rgba(0,0,0,0.96)', maxWidth: 780,
          }}>
            C'è un arco a Lacedonia che ha visto passare tutto —
            contadini, mercanti, greggi, eserciti, famiglie.
            Ancora oggi apre il borgo verso il mondo.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

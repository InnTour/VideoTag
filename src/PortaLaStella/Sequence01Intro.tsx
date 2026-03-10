/**
 * Seq01 — Intro · Sotto le Rupi · La Soglia Sepolta
 * 490f / 16.3s — porta hero · zoom-in top · hook "versante sud-ovest"
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFade = interpolate(frame, [0, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const flashOp    = interpolate(frame, [0, 4, 16, 28], [0.6, 0, 0, 0], { extrapolateRight: 'clamp' });
  const overlayOp  = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateRight: 'clamp' });

  const labelFade  = interpolate(frame, [fps * 0.8, fps * 1.6], [0, 1], { extrapolateRight: 'clamp' });
  const titleFade  = interpolate(frame, [fps * 1.1, fps * 2.0], [0, 1], { extrapolateRight: 'clamp' });
  const titleShift = interpolate(frame, [fps * 1.1, fps * 2.0], [28, 0],  { extrapolateRight: 'clamp' });
  const subFade    = interpolate(frame, [fps * 1.6, fps * 2.5], [0, 1], { extrapolateRight: 'clamp' });
  const hookFade   = interpolate(frame, [fps * 2.8, fps * 3.8], [0, 1], { extrapolateRight: 'clamp' });
  const hookShift  = interpolate(frame, [fps * 2.8, fps * 3.8], [18, 0],  { extrapolateRight: 'clamp' });

  // Ghost "1456" — il sisma che la fece nascere
  const ghostOp = interpolate(frame, [fps * 2.5, fps * 4], [0, 0.065], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      <KenBurnsImage src={IMAGES.porta} motion="zoom-in" intensity={0.04} objectPosition="center top" />

      <AbsoluteFill style={{ background: 'white', opacity: flashOp, pointerEvents: 'none' }} />
      <AbsoluteFill style={{
        opacity: overlayOp,
        background: 'linear-gradient(to right, rgba(10,8,4,0.88) 0%, rgba(10,8,4,0.55) 55%, rgba(10,8,4,0.18) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(10,8,4,0.58) 100%)',
        opacity: overlayOp,
      }} />

      {/* Ghost "1456" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 300, fontWeight: 700,
          color: COLORS.oroOrsini, userSelect: 'none', letterSpacing: '-0.02em',
        }}>1456</span>
      </AbsoluteFill>

      <ParticleField mode="pietra" opacity={0.18} count={32} />

      <AbsoluteFill style={{ opacity: globalFade }}>
        {/* Badge sezione */}
        <div style={{
          position: 'absolute', top: 60, left: 80,
          opacity: labelFade, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 4, height: 32, background: COLORS.oroOrsini, borderRadius: 2 }} />
          <span style={{
            fontFamily: LATO, fontSize: 15, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroOrsini, textTransform: 'uppercase',
          }}>A1.02 · Architettura & Monumenti</span>
        </div>

        {/* Logo InnTour */}
        <div style={{ position: 'absolute', top: 60, right: 80, opacity: labelFade }}>
          <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 72, objectFit: 'contain' }} />
        </div>

        {/* Titolo */}
        <div style={{
          position: 'absolute', top: 160, left: 80, right: 80,
          opacity: titleFade, transform: `translateY(${titleShift}px)`,
        }}>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 104, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.05,
            textShadow: '0 4px 24px rgba(0,0,0,0.95)', maxWidth: 900,
          }}>Porta La Stella</div>
        </div>

        {/* Sottotitolo */}
        <div style={{ position: 'absolute', top: 308, left: 80, opacity: subFade }}>
          <div style={{
            fontFamily: LATO, fontSize: 34, fontWeight: 300,
            color: COLORS.oroOrsini, letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,0.85)',
          }}>La Soglia Sepolta · Sotto le Rupi</div>
        </div>

        {/* Hook narrativo */}
        <div style={{
          position: 'absolute', bottom: 180, left: 80, right: 200,
          opacity: hookFade, transform: `translateY(${hookShift}px)`,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 28, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.95)', maxWidth: 760,
          }}>
            Sul versante sud-ovest della cittadella, tra le rupi e il silenzio,
            esiste una porta che ha più di cinque secoli — e che nessuno vede più.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

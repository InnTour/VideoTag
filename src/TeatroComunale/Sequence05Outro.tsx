import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq05 — Outro (~8.7s · 262 frame)
// Bookend: stessa hero image con zoom-out (circolarità narrativa)
// Loghi: Comune di Lacedonia + InnTour S.R.L. (entrambi con <Img>)
// ──────────────────────────────────────────────────────────────

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // ── Tagline ──────────────────────────────────────────────────
  const taglineEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [20, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Loghi ────────────────────────────────────────────────────
  const logoFade = interpolate(frame, [durationInFrames - 85, durationInFrames - 50], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Linee decorative ─────────────────────────────────────────
  const lineWidthTop = interpolate(frame, [5, 45], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineWidthBot = interpolate(frame, [15, 55], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── Iris outro: cerchio che si chiude ────────────────────────
  const irisProgress = interpolate(frame, [durationInFrames - 80, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [1600, 0]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Bookend: stessa hero image — zoom-out per chiusura circolare */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.06} />

      {/* Overlay pesante per far emergere i testi */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(13,13,26,0.96) 0%, rgba(13,13,26,0.70) 45%, rgba(13,13,26,0.30) 100%)',
          'radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.78) 100%)',
        ].join(', '),
      }} />

      {/* Spotlight da palcoscenico */}
      <SpotlightEffect x={50} y={40} radius={440} color={COLORS.oroLampade} opacity={0.12} pulse />

      {/* ── TAGLINE FINALE ────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 120,
        opacity: Math.min(taglineOpacity, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        {/* Linea oro superiore */}
        <div style={{
          width: lineWidthTop, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLampade}, transparent)`,
          marginBottom: 30,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 54, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.40,
          maxWidth: 860,
          textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 60px rgba(212,168,67,0.14)',
        }}>
          Il luogo dove la comunità si ritrova<br />
          <em style={{ color: COLORS.oroLampade }}>per sognare</em> e nutrire l'anima<br />
          <span style={{
            fontSize: 34, fontWeight: 400, fontStyle: 'italic',
            color: COLORS.biancoCalce, opacity: 0.78,
          }}>creativa di Lacedonia.</span>
        </div>

        {/* Linea oro inferiore */}
        <div style={{
          width: lineWidthBot, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLampade}, transparent)`,
          marginTop: 30,
        }} />
      </div>

      {/* ── LOGHI ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        opacity: logoFade,
      }}>
        <Img src={staticFile(IMAGES.logoComune)} style={{ height: 96, objectFit: 'contain' }} />
        <div style={{ width: 1, height: 72, background: '#666666' }} />
        <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 80, objectFit: 'contain' }} />
      </div>

      {/* ── IRIS OUTRO ─────────────────────────────────────────────── */}
      {irisProgress > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="iris-mask-tc">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisRadius} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mask-tc)" />
          </svg>
        </div>
      )}

      <ScanLines opacity={0.025} />
    </div>
  );
};

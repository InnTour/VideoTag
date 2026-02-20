import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // frame è locale (0 → 261)
  const taglineOpacity = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineFade   = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const logoOpacity = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoFade    = interpolate(frame, [durationInFrames - 85, durationInFrames - 50], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lineWidthTop = interpolate(frame, [10, 60], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineWidthBot = interpolate(frame, [20, 70], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Iris outro — cerchio che si chiude progressivamente
  const irisProgress = interpolate(frame, [durationInFrames - 80, durationInFrames - 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [1600, 0]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Bookend: stessa hero image con zoom-out */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.06} />

      {/* Overlay pesante per testo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(13,13,26,0.95) 0%, rgba(13,13,26,0.65) 50%, rgba(13,13,26,0.30) 100%)',
          'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
        ].join(', '),
      }} />

      {/* Spotlight centrale */}
      <SpotlightEffect x={50} y={42} radius={420} color={COLORS.oroLampade} opacity={0.12} pulse />

      {/* TAGLINE FINALE */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 80,
        opacity: Math.min(taglineOpacity, taglineFade),
      }}>
        <div style={{
          width: lineWidthTop, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLampade}, transparent)`,
          marginBottom: 32,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 48, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.35,
          maxWidth: 880,
          textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 60px rgba(212,168,67,0.12)',
        }}>
          Il luogo dove la comunità si ritrova<br />
          <em style={{ color: COLORS.oroLampade }}>per sognare</em> e nutrire l'anima<br />
          <span style={{ fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: COLORS.biancoCalce, opacity: 0.75 }}>
            creativa di Lacedonia.
          </span>
        </div>

        <div style={{
          width: lineWidthBot, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLampade}, transparent)`,
          marginTop: 32,
        }} />
      </div>

      {/* Logo InnTour — usa <Img> da remotion per garantire caricamento */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32,
        opacity: Math.min(logoOpacity, logoFade),
      }}>
        <Img
          src={staticFile('Logo facicon.png')}
          style={{ height: 52, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}
        />
        <div style={{ width: 1, height: 40, background: 'rgba(212,168,67,0.5)' }} />
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 300,
          fontSize: 14, letterSpacing: '0.18em',
          color: COLORS.biancoCalce, opacity: 0.80,
          textTransform: 'uppercase',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
        }}>
          Comune di Lacedonia · InnTour S.R.L.
        </div>
      </div>

      {/* Iris outro — SVG mask cerchio che si restringe */}
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

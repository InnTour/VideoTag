import React from 'react';
import {Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS} from './constants';

const {fontFamily: playfairFamily} = loadPlayfair();
const {fontFamily: latoFamily} = loadLato();

// ── Seq05 — Outro (~16.9s · 507 frame) ─────────────────────────
// Bookend: speranza image · tagline · loghi · iris outro

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const taglineEntrance = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 200}});
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [20, 0], {easing: Easing.out(Easing.cubic)});
  const taglineFade = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const lineWidthTop = interpolate(frame, [5, 50], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const lineWidthBot = interpolate(frame, [20, 60], [0, 200], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});

  const logoFade = interpolate(frame, [durationInFrames - 85, durationInFrames - 50], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const irisProgress = interpolate(frame, [durationInFrames - 80, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [1600, 0]);

  const waterPulse = Math.sin(frame / 40) * 0.04;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <KenBurnsImage src={IMAGES.speranza} motion="zoom-out" intensity={0.06} objectPosition="center center" />

      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(8,8,12,0.96) 0%, rgba(8,8,12,0.70) 45%, rgba(8,8,12,0.30) 100%)',
          'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.78) 100%)',
        ].join(', '),
      }} />

      {/* Spotlight acqua */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 500px 340px at 50% 45%, rgba(74,143,170,${0.08 + waterPulse}), transparent 70%)`,
      }} />

      {/* ── TAGLINE FINALE ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 130,
        opacity: Math.min(taglineOpacity, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        <div style={{
          width: lineWidthTop, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroMiracolo}, transparent)`,
          marginBottom: 32,
        }} />

        <div style={{
          fontFamily: latoFamily, fontSize: 12,
          color: COLORS.oroMiracolo, letterSpacing: '0.25em',
          textTransform: 'uppercase', marginBottom: 20, opacity: 0.80,
        }}>Pozzo del Miracolo · Lacedonia</div>

        <div style={{
          fontFamily: playfairFamily,
          fontSize: 44, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.42,
          maxWidth: 860,
          textShadow: '0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(240,192,64,0.14)',
        }}>
          C'è un pozzo nel cuore di Lacedonia<br />
          <em style={{color: COLORS.oroMiracolo}}>dove la fede è più antica dell'acqua.</em>
        </div>

        <div style={{
          width: lineWidthBot, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroMiracolo}, transparent)`,
          marginTop: 32,
        }} />
      </div>

      {/* ── LOGHI ──────────────────────────────────────────────── */}
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
        <Img src={staticFile(IMAGES.logoComune)} style={{height: 96, objectFit: 'contain'}} />
        <div style={{width: 1, height: 72, background: '#666666'}} />
        <Img src={staticFile(IMAGES.logoInnTour)} style={{height: 80, objectFit: 'contain'}} />
      </div>

      {/* ── IRIS OUTRO ─────────────────────────────────────────── */}
      {irisProgress > 0 && (
        <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
            <defs>
              <mask id="iris-mask-pozzo">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisRadius} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mask-pozzo)" />
          </svg>
        </div>
      )}

      <ScanLines opacity={0.022} />
    </div>
  );
};

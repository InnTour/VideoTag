import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

export const Sequence06Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const tagE = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const tagFade = interpolate(frame, [durationInFrames - 110, durationInFrames - 65], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineT = interpolate(frame, [5, 50], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineB = interpolate(frame, [20, 60], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lFade = interpolate(frame, [durationInFrames - 100, durationInFrames - 60], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const irisP = interpolate(frame, [durationInFrames - 90, durationInFrames - 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const irisR = interpolate(irisP, [0, 1], [1600, 0]);

  const festaPulse = Math.sin(frame / 28) * 0.04 + 0.10;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.festa} motion="zoom-out" intensity={0.06} objectPosition="center center" />
      <div style={{ position: 'absolute', inset: 0, background: ['linear-gradient(to top, rgba(8,8,12,0.96) 0%, rgba(8,8,12,0.70) 45%, rgba(8,8,12,0.28) 100%)', 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.78) 100%)'].join(', ') }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 600px 400px at 50% 45%, rgba(232,112,48,${festaPulse}), transparent 70%)` }} />

      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 130,
        opacity: Math.min(interpolate(tagE, [0, 1], [0, 1]), tagFade),
        transform: `translateY(${interpolate(tagE, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{ width: lineT, height: 2, background: `linear-gradient(to right, transparent, ${COLORS.oroSanto}, transparent)`, marginBottom: 32 }} />
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.oroSanto, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.80 }}>Chiesa di San Rocco · Lacedonia</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 50, fontWeight: 700, color: COLORS.biancoCalce, textAlign: 'center', lineHeight: 1.42, maxWidth: 860, textShadow: '0 2px 24px rgba(0,0,0,0.95)' }}>
          Ogni 16 agosto, il mondo torna a Lacedonia.<br />
          <em style={{ color: COLORS.oroSanto }}>San Rocco li aspetta, come sempre.</em>
        </div>
        <div style={{ width: lineB, height: 2, background: `linear-gradient(to right, transparent, ${COLORS.oroSanto}, transparent)`, marginTop: 32 }} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        opacity: lFade,
      }}>
        <Img src={staticFile(IMAGES.logoComune)} style={{ height: 96, objectFit: 'contain' }} />
        <div style={{ width: 1, height: 72, background: '#666666' }} />
        <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 80, objectFit: 'contain' }} />
      </div>

      {irisP > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs><mask id="iris-mask-csr"><rect width="1920" height="1080" fill="white" /><circle cx="960" cy="540" r={irisR} fill="black" /></mask></defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mask-csr)" />
          </svg>
        </div>
      )}
      <ScanLines opacity={0.022} />
    </div>
  );
};

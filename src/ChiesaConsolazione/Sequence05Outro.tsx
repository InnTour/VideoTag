import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const tagE = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const tagFade = interpolate(frame, [durationInFrames - 100, durationInFrames - 60], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineT = interpolate(frame, [5, 50], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineB = interpolate(frame, [20, 60], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lc = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 160 } });
  const li = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 160 } });
  const lFade = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const urlOp = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 200 } });

  const irisP = interpolate(frame, [durationInFrames - 85, durationInFrames - 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const irisR = interpolate(irisP, [0, 1], [1600, 0]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.06} objectPosition="center center" />
      <div style={{
        position: 'absolute', inset: 0,
        background: ['linear-gradient(to top, rgba(8,8,12,0.96) 0%, rgba(8,8,12,0.70) 45%, rgba(8,8,12,0.28) 100%)',
          'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.78) 100%)'].join(', '),
      }} />

      {/* TAGLINE */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 130,
        opacity: Math.min(interpolate(tagE, [0, 1], [0, 1]), tagFade),
        transform: `translateY(${interpolate(tagE, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{ width: lineT, height: 2, background: `linear-gradient(to right, transparent, ${COLORS.oroAntico}, transparent)`, marginBottom: 32 }} />
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.oroAntico, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.80 }}>
          Chiesa della Consolazione · Lacedonia
        </div>
        <div style={{
          fontFamily: 'Playfair Display, serif', fontSize: 50, fontWeight: 700,
          color: COLORS.biancoCalce, textAlign: 'center', lineHeight: 1.42, maxWidth: 860,
          textShadow: '0 2px 24px rgba(0,0,0,0.95)',
        }}>
          Un portale di travertino, una sirena nell'acqua,<br />
          <em style={{ color: COLORS.oroAntico }}>una storia che scorre da cinquecento anni.</em>
        </div>
        <div style={{ width: lineB, height: 2, background: `linear-gradient(to right, transparent, ${COLORS.oroAntico}, transparent)`, marginTop: 32 }} />
      </div>

      {/* LOGHI */}
      <div style={{ position: 'absolute', bottom: 52, left: 120, display: 'flex', alignItems: 'center', gap: 16, opacity: lc * lFade, transform: `translateY(${interpolate(lc, [0, 1], [16, 0])}px)` }}>
        <Img src={staticFile(IMAGES.logoComune)} style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }} />
        <div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.10em', color: COLORS.biancoCalce, textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>Comune di Lacedonia</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 16, letterSpacing: '0.06em', color: COLORS.oroAntico, opacity: 0.90 }}>Alta Irpinia · Campania</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', opacity: Math.min(lc, li) * lFade, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 1, height: 36, background: `rgba(200,152,48,0.45)` }} />
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 9, color: COLORS.oroAntico, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.70 }}>×</div>
        <div style={{ width: 1, height: 36, background: `rgba(200,152,48,0.45)` }} />
      </div>
      <div style={{ position: 'absolute', bottom: 52, right: 120, display: 'flex', alignItems: 'center', gap: 16, opacity: li * lFade, transform: `translateY(${interpolate(li, [0, 1], [16, 0])}px)` }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.10em', color: COLORS.biancoCalce, textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>InnTour S.R.L.</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 16, letterSpacing: '0.06em', color: COLORS.verdeInnTour, opacity: 0.90 }}>MetaBorghi Initiative</div>
        </div>
        <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', opacity: urlOp * lFade }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.biancoCalce, opacity: 0.55, letterSpacing: '0.08em' }}>Cicerone Digitale di Lacedonia · Virtual Tour</div>
      </div>

      {/* IRIS */}
      {irisP > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs><mask id="iris-mask-cc"><rect width="1920" height="1080" fill="white" /><circle cx="960" cy="540" r={irisR} fill="black" /></mask></defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mask-cc)" />
          </svg>
        </div>
      )}
      <ScanLines opacity={0.022} />
    </div>
  );
};

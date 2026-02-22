import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq05 — Outro (~16.9s · 507 frame) ─────────────────────────
// Bookend: speranza image · tagline · loghi · iris outro

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const taglineEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [20, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const lineWidthTop = interpolate(frame, [5, 50], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineWidthBot = interpolate(frame, [20, 60], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const logoComune = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 160 } });
  const logoInnTour = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 160 } });
  const logoFade = interpolate(frame, [durationInFrames - 85, durationInFrames - 50], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const urlOpacity = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 200 } });

  const irisProgress = interpolate(frame, [durationInFrames - 80, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [1600, 0]);

  const waterPulse = Math.sin(frame / 40) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
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
          fontFamily: 'Lato, sans-serif', fontSize: 12,
          color: COLORS.oroMiracolo, letterSpacing: '0.25em',
          textTransform: 'uppercase', marginBottom: 20, opacity: 0.80,
        }}>Pozzo del Miracolo · Lacedonia</div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 44, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.42,
          maxWidth: 860,
          textShadow: '0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(240,192,64,0.14)',
        }}>
          C'è un pozzo nel cuore di Lacedonia<br />
          <em style={{ color: COLORS.oroMiracolo }}>dove la fede è più antica dell'acqua.</em>
        </div>

        <div style={{
          width: lineWidthBot, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroMiracolo}, transparent)`,
          marginTop: 32,
        }} />
      </div>

      {/* ── LOGHI ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 52, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoComune * logoFade,
        transform: `translateY(${interpolate(logoComune, [0, 1], [16, 0])}px)`,
      }}>
        <Img src={staticFile(IMAGES.logoComune)}
          style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }} />
        <div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 13, letterSpacing: '0.10em',
            color: COLORS.biancoCalce, textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>Comune di Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 11, letterSpacing: '0.06em',
            color: COLORS.oroMiracolo, opacity: 0.90,
          }}>Alta Irpinia · Campania</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 52, left: '50%',
        transform: 'translateX(-50%)',
        opacity: Math.min(logoComune, logoInnTour) * logoFade,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        <div style={{ width: 1, height: 36, background: `rgba(240,192,64,0.45)` }} />
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 9,
          color: COLORS.oroMiracolo, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.70,
        }}>×</div>
        <div style={{ width: 1, height: 36, background: `rgba(240,192,64,0.45)` }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 52, right: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoInnTour * logoFade,
        transform: `translateY(${interpolate(logoInnTour, [0, 1], [16, 0])}px)`,
      }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 13, letterSpacing: '0.10em',
            color: COLORS.biancoCalce, textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>InnTour S.R.L.</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 11, letterSpacing: '0.06em',
            color: COLORS.verdeInnTour, opacity: 0.90,
          }}>MetaBorghi Initiative</div>
        </div>
        <Img src={staticFile(IMAGES.logoInnTour)}
          style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        textAlign: 'center',
        opacity: urlOpacity * logoFade,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 12,
          color: COLORS.biancoCalce, opacity: 0.55, letterSpacing: '0.08em',
        }}>Cicerone Digitale di Lacedonia · Virtual Tour</div>
      </div>

      {/* ── IRIS OUTRO ─────────────────────────────────────────── */}
      {irisProgress > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
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

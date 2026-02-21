import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq05 — Outro (~15.2s · 456 frame)
// Bookend: stessa hero image con zoom-in (circolarita narrativa)
// Ghost "PEDOCA" · Tagline poetica · Loghi · Iris SVG
// ──────────────────────────────────────────────────────────────

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // ── Ghost "PEDOCA" grande ──────────────────────────────────
  const ghostEntrance = interpolate(frame, [5, 40], [0, 0.08], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ghostOut = interpolate(frame, [durationInFrames - 120, durationInFrames - 80], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Tagline ────────────────────────────────────────────────
  const taglineEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [20, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 110, durationInFrames - 70], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Linee decorative ───────────────────────────────────────
  const lineWidthTop = interpolate(frame, [5, 50], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineWidthBot = interpolate(frame, [20, 60], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── Loghi: entrano in sequenza ─────────────────────────────
  const logoComune = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 160 } });
  const logoInnTour = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 160 } });
  const logoFade = interpolate(frame, [durationInFrames - 100, durationInFrames - 60], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── URL fade-in ────────────────────────────────────────────
  const urlOpacity = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 200 } });

  // ── Iris outro: cerchio che si chiude ──────────────────────
  const irisProgress = interpolate(frame, [durationInFrames - 80, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [1600, 0]);

  // ── Warm pulse ─────────────────────────────────────────────
  const warmPulse = Math.sin(frame / 42) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Bookend: stessa hero image — zoom-in per chiusura circolare */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.05} objectPosition="center center" />

      {/* Overlay pesante per far emergere i testi */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(10,8,8,0.96) 0%, rgba(10,8,8,0.72) 45%, rgba(10,8,8,0.32) 100%)',
          'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.80) 100%)',
        ].join(', '),
      }} />

      {/* Spotlight travertino caldo — il monumento nella notte */}
      <SpotlightEffect x={50} y={42} radius={420} color={COLORS.oroVescovile} opacity={0.12 + warmPulse} pulse />

      {/* ── Ghost "PEDOCA" grande ──────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: 80,
        transform: 'translateX(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 240, fontWeight: 700,
        color: COLORS.oroVescovile,
        opacity: ghostEntrance * ghostOut,
        letterSpacing: '0.06em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>PEDOCA</div>

      {/* ── TAGLINE FINALE ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 130,
        opacity: Math.min(taglineOpacity, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        {/* Linea oro superiore */}
        <div style={{
          width: lineWidthTop, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroVescovile}, transparent)`,
          marginBottom: 32,
        }} />

        {/* Label decorativa */}
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 16,
          color: COLORS.oroVescovile, letterSpacing: '0.25em',
          textTransform: 'uppercase', marginBottom: 20, opacity: 0.80,
        }}>Colonna del Pedoca · Lacedonia</div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 48, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.45,
          maxWidth: 900,
          textShadow: '0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(200,152,48,0.14)',
        }}>
          Per secoli, il confine sacro tra la fatica e la pace —<br />
          <em style={{ color: COLORS.oroVescovile }}>oggi, custode silenzioso</em><br />
          <span style={{
            fontSize: 34, fontWeight: 400, fontStyle: 'italic',
            color: COLORS.biancoCalce, opacity: 0.80,
          }}>di duemila anni di storia stratificata.</span>
        </div>

        {/* Linea oro inferiore */}
        <div style={{
          width: lineWidthBot, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroVescovile}, transparent)`,
          marginTop: 32,
        }} />
      </div>

      {/* ── LOGHI ─────────────────────────────────────────────── */}
      {/* Logo Comune di Lacedonia — a sinistra */}
      <div style={{
        position: 'absolute', bottom: 52, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoComune * logoFade,
        transform: `translateY(${interpolate(logoComune, [0, 1], [16, 0])}px)`,
      }}>
        <Img
          src={staticFile(IMAGES.logoComune)}
          style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }}
        />
        <div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 16, letterSpacing: '0.10em',
            color: COLORS.biancoCalce, textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>Comune di Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 16, letterSpacing: '0.06em',
            color: COLORS.oroVescovile, opacity: 0.90,
          }}>Alta Irpinia · Campania</div>
        </div>
      </div>

      {/* Separatore centrale */}
      <div style={{
        position: 'absolute', bottom: 52, left: '50%',
        transform: 'translateX(-50%)',
        opacity: Math.min(logoComune, logoInnTour) * logoFade,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        <div style={{ width: 1, height: 36, background: 'rgba(200,152,48,0.45)' }} />
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 9,
          color: COLORS.oroVescovile, letterSpacing: '0.12em',
          textTransform: 'uppercase', opacity: 0.70,
        }}>×</div>
        <div style={{ width: 1, height: 36, background: 'rgba(200,152,48,0.45)' }} />
      </div>

      {/* Logo InnTour — a destra */}
      <div style={{
        position: 'absolute', bottom: 52, right: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoInnTour * logoFade,
        transform: `translateY(${interpolate(logoInnTour, [0, 1], [16, 0])}px)`,
      }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 16, letterSpacing: '0.10em',
            color: COLORS.biancoCalce, textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>InnTour S.R.L.</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 16, letterSpacing: '0.06em',
            color: COLORS.verdeInnTour, opacity: 0.90,
          }}>MetaBorghi Initiative</div>
        </div>
        <Img
          src={staticFile(IMAGES.logoInnTour)}
          style={{ height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))' }}
        />
      </div>

      {/* URL virtual tour */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        textAlign: 'center',
        opacity: urlOpacity * logoFade,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 16,
          color: COLORS.biancoCalce, opacity: 0.55,
          letterSpacing: '0.08em',
        }}>
          Cicerone Digitale di Lacedonia · Virtual Tour
        </div>
      </div>

      {/* ── IRIS OUTRO ────────────────────────────────────────── */}
      {irisProgress > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="iris-mask-pedoca">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisRadius} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mask-pedoca)" />
          </svg>
        </div>
      )}

      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq05 — Outro / Memoria Immortale (~13.3s · 398 frame)
// Bookend: hero (nebbia dorata) con zoom-out — circolarità
// Tagline piena · Loghi Comune + InnTour · Iris outro
// ─────────────────────────────────────────────────────────────

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Tagline
  const taglineEnt  = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const taglineY    = interpolate(taglineEnt, [0, 1], [24, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 90, durationInFrames - 55], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Linee decorative
  const lineW = interpolate(frame, [5, 52], [0, 290], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Loghi
  const logoC   = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 160 } });
  const logoI   = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 160 } });
  const logoFade = interpolate(frame, [durationInFrames - 84, durationInFrames - 48], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const urlOp = spring({ frame: Math.max(0, frame - 96), fps, config: { damping: 200 } });

  // Iris outro
  const irisP = interpolate(frame, [durationInFrames - 78, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisR = interpolate(irisP, [0, 1], [1560, 0]);

  // Nebbia pulse
  const nebbiaP = Math.sin(frame / 62) * 0.05;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Bookend: monumento nella nebbia — zoom-out per chiusura circolare */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.06} objectPosition="center center" />

      {/* Overlay pesante per far emergere il testo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.70) 46%, rgba(10,10,10,0.28) 100%)',
          'radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.82) 100%)',
        ].join(', '),
      }} />

      {/* Luce dorata della nebbia */}
      <SpotlightEffect x={50} y={40} radius={440} color={COLORS.oroLuce} opacity={0.13 + nebbiaP} pulse />

      {/* TAGLINE FINALE */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 130,
        opacity: Math.min(taglineEnt, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        {/* Linea oro superiore */}
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLuce}, transparent)`,
          marginBottom: 30,
        }} />

        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 15,
          color: COLORS.oroLuce, letterSpacing: '0.24em',
          textTransform: 'uppercase', marginBottom: 24, opacity: 0.80,
        }}>Monumento ai Caduti · Lacedonia</div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 44, fontWeight: 700,
          color: COLORS.biancoLapide,
          textAlign: 'center', lineHeight: 1.42, maxWidth: 900,
          textShadow: '0 2px 28px rgba(0,0,0,0.95)',
        }}>
          Erano contadini e studenti partiti con speranza:<br />
          <em style={{ color: COLORS.oroLuce }}>la guerra li ha presi,</em><br />
          <span style={{
            fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: COLORS.biancoLapide, opacity: 0.82,
          }}>
            ma il marmo li restituisce oggi<br />
            alla memoria immortale di Lacedonia.
          </span>
        </div>

        {/* Linea oro inferiore */}
        <div style={{
          width: lineW * 0.65, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroLuce}, transparent)`,
          marginTop: 30,
        }} />
      </div>

      {/* LOGO Comune di Lacedonia — sinistra */}
      <div style={{
        position: 'absolute', bottom: 52, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoC * logoFade,
        transform: `translateY(${interpolate(logoC, [0, 1], [16, 0])}px)`,
      }}>
        <Img
          src={staticFile(IMAGES.logoComune)}
          style={{ height: 58, objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))' }}
        />
        <div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 15, letterSpacing: '0.10em',
            color: COLORS.biancoLapide, textTransform: 'uppercase',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>Comune di Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 13, color: COLORS.oroLuce, opacity: 0.90,
          }}>Alta Irpinia · Campania</div>
        </div>
      </div>

      {/* Separatore */}
      <div style={{
        position: 'absolute', bottom: 52, left: '50%',
        transform: 'translateX(-50%)',
        opacity: Math.min(logoC, logoI) * logoFade,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        <div style={{ width: 1, height: 38, background: `rgba(212,168,67,0.45)` }} />
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 10, color: COLORS.oroLuce, opacity: 0.70 }}>×</div>
        <div style={{ width: 1, height: 38, background: `rgba(212,168,67,0.45)` }} />
      </div>

      {/* LOGO InnTour — destra */}
      <div style={{
        position: 'absolute', bottom: 52, right: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoI * logoFade,
        transform: `translateY(${interpolate(logoI, [0, 1], [16, 0])}px)`,
      }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 15, letterSpacing: '0.10em',
            color: COLORS.biancoLapide, textTransform: 'uppercase',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>InnTour S.R.L.</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 13, color: COLORS.verdeInnTour, opacity: 0.90,
          }}>MetaBorghi Initiative</div>
        </div>
        <Img
          src={staticFile(IMAGES.logoInnTour)}
          style={{ height: 58, objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))' }}
        />
      </div>

      {/* URL */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        textAlign: 'center', opacity: urlOp * logoFade,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 13,
          color: COLORS.biancoLapide, opacity: 0.55, letterSpacing: '0.08em',
        }}>Cicerone Digitale di Lacedonia · Virtual Tour</div>
      </div>

      {/* IRIS OUTRO */}
      {irisP > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="iris-mac">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisR} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mac)" />
          </svg>
        </div>
      )}

      <ScanLines />
    </div>
  );
};

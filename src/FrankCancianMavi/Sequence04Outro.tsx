import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq04 — L'Anima · Outro (~6.5s · 194 frame)
// Immagine: porta dorata — l'emigrazione come soglia
// Tagline: "Ogni fotografia è un'anima che continua a parlare"
// Loghi Comune + InnTour · Iris SVG outro
// ─────────────────────────────────────────────────────────────

export const Sequence04Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Tagline
  const taglineEnt = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 200 } });
  const taglineOp  = interpolate(taglineEnt, [0, 1], [0, 1]);
  const taglineY   = interpolate(taglineEnt, [0, 1], [22, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 78, durationInFrames - 45], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Linee decorative
  const lineW = interpolate(frame, [5, 48], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Loghi
  const logoC   = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 160 } });
  const logoI   = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 160 } });
  const logoFade = interpolate(frame, [durationInFrames - 72, durationInFrames - 40], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // URL
  const urlOp = spring({ frame: Math.max(0, frame - 82), fps, config: { damping: 200 } });

  // Iris outro
  const irisP = interpolate(frame, [durationInFrames - 72, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisR = interpolate(irisP, [0, 1], [1500, 0]);

  // Spotlight caldo sulla porta d'oro
  const spotPulse = Math.sin(frame / 40) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Porta dorata — zoom-out lento, bookend emotivo */}
      <KenBurnsImage src={IMAGES.emigrazione} motion="zoom-out" intensity={0.06} objectPosition="center center" />

      {/* Overlay pesante per la chiusura */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(10,8,4,0.96) 0%, rgba(10,8,4,0.68) 48%, rgba(10,8,4,0.28) 100%)',
          'radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.82) 100%)',
        ].join(', '),
      }} />

      {/* Tono oro caldo sulla luce della porta */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(212,168,67,0.08)',
        mixBlendMode: 'overlay',
      }} />

      {/* Spotlight — la luce che attraversa l'arco */}
      <SpotlightEffect x={50} y={44} radius={400} color={COLORS.oroMavi} opacity={0.14 + spotPulse} pulse />

      {/* TAGLINE */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 120,
        opacity: Math.min(taglineOp, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        {/* Linea superiore */}
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.seppia}, transparent)`,
          marginBottom: 30,
        }} />

        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 15,
          color: COLORS.seppia, letterSpacing: '0.24em',
          textTransform: 'uppercase', marginBottom: 22, opacity: 0.82,
        }}>MAVI · Lacedonia · Fotografia Antropologica</div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 46, fontWeight: 700,
          color: COLORS.biancoCalce,
          textAlign: 'center', lineHeight: 1.40,
          maxWidth: 900,
          textShadow: '0 2px 28px rgba(0,0,0,0.95), 0 0 70px rgba(200,168,120,0.12)',
        }}>
          Ogni fotografia è un'anima<br />
          <em style={{ color: COLORS.oroMavi }}>che continua a parlare,</em><br />
          <span style={{
            fontSize: 30, fontWeight: 400, fontStyle: 'italic',
            color: COLORS.biancoCalce, opacity: 0.82,
          }}>
            rendendo Lacedonia un simbolo internazionale<br />
            della fotografia antropologica.
          </span>
        </div>

        <div style={{
          width: lineW * 0.7, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.seppia}, transparent)`,
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
            color: COLORS.biancoCalce, textTransform: 'uppercase',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>Comune di Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 300,
            fontSize: 13, color: COLORS.seppia, opacity: 0.90,
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
        <div style={{ width: 1, height: 38, background: `rgba(200,168,120,0.45)` }} />
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 10, color: COLORS.seppia, opacity: 0.70 }}>×</div>
        <div style={{ width: 1, height: 38, background: `rgba(200,168,120,0.45)` }} />
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
            color: COLORS.biancoCalce, textTransform: 'uppercase',
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
          color: COLORS.biancoCalce, opacity: 0.55, letterSpacing: '0.08em',
        }}>Cicerone Digitale di Lacedonia · Virtual Tour</div>
      </div>

      {/* IRIS OUTRO */}
      {irisP > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="iris-mavi">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisR} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-mavi)" />
          </svg>
        </div>
      )}

      <FilmGrain opacity={0.05} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

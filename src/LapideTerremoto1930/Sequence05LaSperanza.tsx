import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq05 — La Speranza (~16.4s · 492 frame)
// Immagine: speranza / lapide bookend circolarità
// Ghost "SPERANZA" · tagline completa · loghi · iris outro
// Chiusura: "trasformando la polvere in una nuova speranza"
// ─────────────────────────────────────────────────────────────

export const Sequence05LaSperanza: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Tagline — emerge lentamente
  const taglineEnt  = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 180 } });
  const taglineOp   = interpolate(taglineEnt, [0, 1], [0, 1]);
  const taglineY    = interpolate(taglineEnt, [0, 1], [24, 0]);
  const taglineFade = interpolate(frame, [durationInFrames - 105, durationInFrames - 64], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Linea decorativa
  const lineW = interpolate(frame, [6, 58], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Loghi
  const logoFade = interpolate(frame, [durationInFrames - 95, durationInFrames - 55], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ghost "SPERANZA" — grande, in oro, si dissolve lentamente
  const ghostOp = interpolate(frame, [20, 80, durationInFrames - 120, durationInFrames - 72], [0, 0.060, 0.060, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Iris outro
  const irisP = interpolate(frame, [durationInFrames - 88, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisR = interpolate(irisP, [0, 1], [1560, 0]);

  // Spotlight caldo sul marmo
  const spotPulse = Math.sin(frame / 44) * 0.038;

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.neroNotte }}>
      {/* Speranza / lapide bookend — zoom-out lento */}
      <KenBurnsImage src={IMAGES.speranza} motion="zoom-out" intensity={0.06} objectPosition="center center" />

      {/* Overlay pesante per la chiusura */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(3,3,6,0.97) 0%, rgba(3,3,6,0.70) 50%, rgba(3,3,6,0.28) 100%)',
          'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.82) 100%)',
        ].join(', '),
      }} />

      {/* Tono oro caldo — la speranza che vince sul grigio */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,168,75,0.09)',
        mixBlendMode: 'overlay',
      }} />

      {/* Spotlight — la luce che attraversa il marmo */}
      <SpotlightEffect x={50} y={42} radius={420} color={COLORS.oroSperanza} opacity={0.18 + spotPulse} />

      {/* Ghost "SPERANZA" — grande come presenza residua */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -52%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 220, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroSperanza, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap',
        letterSpacing: '-0.02em',
      }}>SPERANZA</div>

      {/* TAGLINE CENTRALE */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: 130,
        opacity: Math.min(taglineOp, taglineFade),
        transform: `translateY(${taglineY}px)`,
      }}>
        {/* Linea superiore */}
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroSperanza}, transparent)`,
          marginBottom: 28,
        }} />

        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 17,
          color: COLORS.grigioLapide, letterSpacing: '0.24em',
          textTransform: 'uppercase', marginBottom: 20, opacity: 0.85,
        }}>A4.09 · Lacedonia · 22–23 Luglio 1930</div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 56, fontWeight: 700,
          color: COLORS.biancoMarmo,
          textAlign: 'center', lineHeight: 1.42,
          maxWidth: 920,
          textShadow: '0 2px 28px rgba(0,0,0,0.98), 0 0 80px rgba(200,168,75,0.10)',
        }}>
          Questi nomi incisi nel marmo<br />
          sono il monito di una{' '}
          <em style={{ color: COLORS.oroSperanza }}>'terra ballerina'</em><br />
          che ha saputo rialzarsi —<br />
          <span style={{
            fontSize: 40, fontWeight: 400, fontStyle: 'italic',
            color: COLORS.biancoMarmo, opacity: 0.80,
          }}>
            trasformando la polvere<br />
            in una <em style={{ color: COLORS.oroSperanza }}>nuova speranza</em>.
          </span>
        </div>

        <div style={{
          width: lineW * 0.65, height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroSperanza}, transparent)`,
          marginTop: 30,
        }} />
      </div>

      {/* LOGHI */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 48, opacity: logoFade,
      }}>
        <Img src={staticFile(IMAGES.logoComune)} style={{ height: 96, objectFit: 'contain' }} />
        <div style={{ width: 1, height: 72, background: '#666666' }} />
        <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 80, objectFit: 'contain' }} />
      </div>

      {/* IRIS OUTRO */}
      {irisP > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="iris-terremoto">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisR} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill="black" mask="url(#iris-terremoto)" />
          </svg>
        </div>
      )}

      <FilmGrain opacity={0.045} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

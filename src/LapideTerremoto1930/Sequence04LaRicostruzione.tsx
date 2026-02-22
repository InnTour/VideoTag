import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { SeismicWave } from './components/SeismicWave';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq04 — La Ricostruzione (~13.3s · 400 frame)
// Immagine: il nuovo paese ricostruito sulla spianata sicura
// La decisione: abbandonare le aree instabili · ricostruire più a monte
// Dal dolore nasce la nuova Lacedonia
// ─────────────────────────────────────────────────────────────

export const Sequence04LaRicostruzione: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: la decisione governativa (appare subito)
  const card1Ent  = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [165, 205], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: la nuova spianata (appare dopo)
  const card2Ent  = spring({ frame: Math.max(0, frame - 215), fps, config: { damping: 180 } });
  const card2Op   = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y    = interpolate(card2Ent, [0, 1], [18, 0]);
  const card2Fade = interpolate(frame, [355, 390], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Spotlight che cresce — la luce della speranza
  const spotOp = interpolate(frame, [0, 120], [0.06, 0.22], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const spotPulse = Math.sin(frame / 50) * 0.04;

  // Tono progressivamente più caldo — dal grigio cenere all'oro della speranza
  const warmth = interpolate(frame, [0, 300], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ghost "RINASCITA"
  const ghostOp = interpolate(frame, [80, 140, 340, 385], [0, 0.042, 0.042, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // SeismicWave — si spegne lentamente (il sisma allontanato)
  const waveOp = interpolate(frame, [0, 80], [0.45, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.neroNotte }}>
      {/* Ricostruzione — pan-left lento · il nuovo paese che avanza */}
      <KenBurnsImage src={IMAGES.ricostruzione} motion="pan-left" intensity={0.05} objectPosition="center center" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(3,3,6,0.90) 0%, rgba(3,3,6,0.50) 52%, rgba(3,3,6,0.14) 100%)',
          'linear-gradient(to top,   rgba(3,3,6,0.82) 0%, transparent 56%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Tono progressivo: cenere → oro. Evoca la ricostruzione */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(200,168,75,0.12)`,
        mixBlendMode: 'overlay',
        opacity: warmth,
      }} />

      {/* Spotlight crescente — la nuova luce */}
      <SpotlightEffect x={55} y={40} radius={440} color={COLORS.oroSperanza} opacity={spotOp + spotPulse} />

      {/* Ghost "RINASCITA" */}
      <div style={{
        position: 'absolute', right: 68, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 120, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroSperanza, opacity: ghostOp,
        pointerEvents: 'none',
        writingMode: 'vertical-rl', letterSpacing: '0.06em',
      }}>RINASCITA</div>

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 18, letterSpacing: '0.20em',
          color: COLORS.oroSperanza, textTransform: 'uppercase', marginBottom: 9,
        }}>La Ricostruzione · Dalle Macerie una Nuova Lacedonia</div>
        <div style={{ width: 390, height: 2, background: `linear-gradient(to right, ${COLORS.oroSperanza}, transparent)` }} />
      </div>

      {/* CARD 1: la decisione governativa */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: card1Op * card1Fade, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.88)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(139,26,26,0.40)`,
          borderLeft: `5px solid ${COLORS.rossoSisma}`,
          borderRadius: 4, padding: '22px 28px', maxWidth: 540,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.rossoSisma, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🏛️ La Decisione · 1930</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 28,
            color: COLORS.biancoMarmo, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Da quelle macerie nacque la decisione<br />
            governativa di <em style={{ color: COLORS.oroSperanza }}>abbandonare le aree instabili</em><br />
            e ricostruire il paese <strong>più a monte</strong>.
          </div>
        </div>
      </div>

      {/* CARD 2: la nuova spianata */}
      <div style={{
        position: 'absolute', left: 72, bottom: 115,
        opacity: card2Op * card2Fade, transform: `translateY(${card2Y}px)`,
        maxWidth: 580,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.90)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(200,168,75,0.30)`,
          borderLeft: `5px solid ${COLORS.oroSperanza}`,
          borderRadius: 4, padding: '22px 28px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.oroSperanza, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>⛰️ La Nuova Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 28,
            color: COLORS.biancoMarmo, fontWeight: 300,
            lineHeight: 1.55, opacity: 0.88,
          }}>
            Su una spianata <em style={{ color: COLORS.oroSperanza }}>più sicura, più a monte</em> —<br />
            pietra su pietra, la comunità<br />
            si rialzò dalla propria polvere.
          </div>
        </div>
      </div>

      {/* Onda sismica che si spegne — il pericolo che si allontana */}
      <SeismicWave opacity={waveOp} color={COLORS.grigioLapide} amplitude={12} speed={1.5} />

      <FilmGrain opacity={0.045} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq03 — I Salvati (~12.7s · 380 frame)
// Immagine: contadini nei campi — la mietitura che salvò molte vite
// Counter feriti 0→1000 · Card Cappella del Purgatorio
// Il paradosso della salvezza: dormire nei campi = sopravvivere
// ─────────────────────────────────────────────────────────────

export const Sequence03ISalvati: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── COUNTER FERITI 0 → 1000+ ──────────────────────────────
  const feritiVal = Math.round(interpolate(frame, [25, 145], [0, 1000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const feritiEnt  = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const feritiFade = interpolate(frame, [165, 205], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card: la salvezza nei campi (appare subito)
  const salvCard = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const salvCardFade = interpolate(frame, [155, 195], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card: Cappella del Purgatorio (appare dopo)
  const cappellaEnt  = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 180 } });
  const cappellaOp   = interpolate(cappellaEnt, [0, 1], [0, 1]);
  const cappellaY    = interpolate(cappellaEnt, [0, 1], [16, 0]);
  const cappellaFade = interpolate(frame, [335, 370], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ghost "MIETITURA" — la parola chiave della salvezza
  const ghostOp = interpolate(frame, [15, 55, 165, 205], [0, 0.040, 0.040, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Polvere / particelle di terra nei campi
  const dustOp = interpolate(frame, [0, 40], [0, 0.60], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.neroNotte }}>
      {/* Contadini nei campi — zoom-in lento */}
      <KenBurnsImage src={IMAGES.contadini} motion="zoom-in" intensity={0.05} objectPosition="center bottom" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(3,3,6,0.92) 0%, rgba(3,3,6,0.52) 52%, rgba(3,3,6,0.14) 100%)',
          'linear-gradient(to top,   rgba(3,3,6,0.80) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Tono terra — la campagna irpina d'estate */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(139,115,85,0.12)',
        mixBlendMode: 'multiply',
      }} />

      {/* Particelle di polvere nei campi */}
      <ParticleField mode="polvere" opacity={dustOp} />

      {/* Ghost "MIETITURA" */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 160, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.polvere, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>MIETITURA</div>

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.oroSperanza, textTransform: 'uppercase', marginBottom: 9,
        }}>I Salvati · Una Casualità che Cambiò il Destino</div>
        <div style={{ width: 360, height: 2, background: `linear-gradient(to right, ${COLORS.oroSperanza}, transparent)` }} />
      </div>

      {/* COUNTER FERITI */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: feritiEnt * feritiFade,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.90)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(139,115,85,0.38)`,
          borderLeft: `5px solid ${COLORS.polvere}`,
          borderRadius: 4, padding: '18px 30px',
          display: 'flex', alignItems: 'flex-end', gap: 12,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 90, fontWeight: 700, lineHeight: 1,
            color: COLORS.biancoMarmo,
          }}>
            {feritiVal >= 1000 ? '1.000+' : feritiVal.toLocaleString('it-IT')}
          </span>
          <div style={{ paddingBottom: 10 }}>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 17,
              color: COLORS.biancoMarmo, opacity: 0.88,
              letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>feriti</div>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 14,
              color: COLORS.grigioLapide, letterSpacing: '0.06em',
            }}>nel sisma del 1930</div>
          </div>
        </div>
      </div>

      {/* CARD: la casualità della salvezza */}
      <div style={{
        position: 'absolute', left: 72, top: 355,
        opacity: interpolate(salvCard, [0, 1], [0, 1]) * salvCardFade,
        transform: `translateY(${interpolate(salvCard, [0, 1], [16, 0])}px)`,
        maxWidth: 540,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.88)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(200,168,75,0.25)`,
          borderLeft: `5px solid ${COLORS.oroSperanza}`,
          borderRadius: 4, padding: '22px 28px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroSperanza, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🌾 Estate 1930 · La Mietitura</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 23,
            color: COLORS.biancoMarmo, fontWeight: 300,
            lineHeight: 1.55, opacity: 0.88,
          }}>
            Il bilancio non fu ancora più tragico<br />
            solo perché moltissimi contadini<br />
            <em style={{ color: COLORS.oroSperanza }}>dormivano all'aperto nei campi</em><br />
            per la mietitura.
          </div>
        </div>
      </div>

      {/* CARD: Cappella del Purgatorio */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: cappellaOp * cappellaFade, transform: `translateY(${cappellaY}px)`,
        maxWidth: 580,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.90)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(139,26,26,0.35)`,
          borderRadius: 4, padding: '22px 28px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.rossoSisma, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>⛪ Fra le Macerie Storiche</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 22,
            color: COLORS.biancoMarmo, fontWeight: 300,
            lineHeight: 1.55, opacity: 0.88,
          }}>
            Tra i luoghi storici crollati:<br />
            la <strong style={{ color: COLORS.biancoMarmo, fontWeight: 600 }}>Cappella del Purgatorio</strong><br />
            e gran parte del <em>borgo antico medievale</em>.
          </div>
        </div>
      </div>

      <FilmGrain opacity={0.048} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

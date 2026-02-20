import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq01 — L'Alba del Dolore (~11.7s · 350 frame)
// Hero: lapide commemorativa · Notte del 22-23 luglio 1930
// "Erano le tre di mattina..." — il hook storico più potente
// Orologio SVG · Ghost "1930" · Badge sezione
// ─────────────────────────────────────────────────────────────

// Orologio SVG delle 3:00 — l'ora del sisma
const ClockIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width={72} height={72} viewBox="0 0 72 72" style={{ opacity }}>
    <circle cx={36} cy={36} r={33} fill="none" stroke="rgba(200,168,75,0.70)" strokeWidth={2} />
    <circle cx={36} cy={36} r={2.5} fill={COLORS.oroSperanza} />
    {/* Lancetta ora — punta alle 3:00 (ore 3 = 90° CW da 12) */}
    <line x1={36} y1={36} x2={58} y2={36} stroke={COLORS.oroSperanza} strokeWidth={2.5} strokeLinecap="round" />
    {/* Lancetta minuti — punta alle 0:00 (ore 12) */}
    <line x1={36} y1={36} x2={36} y2={10} stroke={COLORS.biancoMarmo} strokeWidth={1.8} strokeLinecap="round" opacity={0.85} />
    {/* Tacche ore */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
      const r = Math.PI * deg / 180;
      const isMajor = i % 3 === 0;
      const inner = isMajor ? 26 : 28;
      return (
        <line key={deg}
          x1={36 + Math.sin(r) * inner} y1={36 - Math.cos(r) * inner}
          x2={36 + Math.sin(r) * 31}    y2={36 - Math.cos(r) * 31}
          stroke={isMajor ? COLORS.oroSperanza : 'rgba(200,168,75,0.40)'}
          strokeWidth={isMajor ? 2 : 1}
        />
      );
    })}
  </svg>
);

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Apertura: emerge dalla notte — black-to-image molto lento
  const fadeIn = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Badge sezione
  const badgeEnt = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 200 } });
  const badgeX   = interpolate(badgeEnt, [0, 1], [-44, 0]);

  // Linea decorativa
  const lineW = interpolate(frame, [28, 88], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo — spring
  const titleEnt = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 150, stiffness: 72 } });
  const titleY   = interpolate(titleEnt, [0, 1], [36, 0]);

  // Sottotitolo — hook narrativo
  const subEnt = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 200 } });

  // Orologio
  const clockOp = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockPulse = 0.82 + Math.sin(frame / 22) * 0.12; // battito lento

  // Ghost "1930"
  const ghostOp = interpolate(frame, [30, 80, 300, 338], [0, 0.055, 0.055, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Fade-out finale
  const fadeOut = interpolate(frame, [318, 345], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.neroNotte }}>
      {/* Lapide — zoom-out lentissimo dalla notte */}
      <div style={{ position: 'absolute', inset: 0, opacity: fadeIn * fadeOut }}>
        <KenBurnsImage src={IMAGES.lapide} motion="zoom-out" intensity={0.05} objectPosition="center center" />
      </div>

      {/* Overlay notte — molto scuro, emerge lentamente */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(3,3,6,0.95) 0%, rgba(3,3,6,0.62) 52%, rgba(3,3,6,0.28) 100%)',
          'linear-gradient(to top,   rgba(3,3,6,0.90) 0%, transparent 55%)',
        ].join(', '),
        opacity: fadeOut,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.82) 100%)',
        opacity: fadeOut,
      }} />

      {/* Ghost "1930" — l'anno come presenza dominante */}
      <div style={{
        position: 'absolute', right: 72, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 260, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroSperanza, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap',
        writingMode: 'vertical-rl', letterSpacing: '0.04em',
      }}>1930</div>

      {/* BADGE sezione */}
      <div style={{
        position: 'absolute', top: 54, left: 72,
        opacity: badgeEnt * fadeOut, transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: 'rgba(139,26,26,0.90)',
          padding: '8px 22px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 15, letterSpacing: '0.16em',
          color: COLORS.biancoMarmo, textTransform: 'uppercase',
        }}>
          A4 · Memoria del Sisma · 22 Luglio 1930
        </div>
      </div>

      {/* CONTENUTO CENTRALE */}
      <div style={{
        position: 'absolute', left: 72, bottom: 160,
        opacity: fadeOut,
      }}>
        {/* Linea decorativa */}
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, ${COLORS.rossoSisma}, transparent)`,
          marginBottom: 24,
        }} />

        {/* Titolo */}
        <div style={{
          opacity: titleEnt, transform: `translateY(${titleY}px)`,
        }}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 88, fontWeight: 700, lineHeight: 1.10,
            color: COLORS.biancoMarmo,
            textShadow: '0 2px 32px rgba(0,0,0,0.98)',
            maxWidth: 820,
          }}>
            Lapide del<br />
            <em style={{ color: COLORS.oroSperanza }}>Terremoto 1930</em>
          </div>
        </div>

        {/* Sottotitolo — hook */}
        <div style={{
          opacity: subEnt, marginTop: 28, maxWidth: 600,
          fontFamily: 'Lato, sans-serif', fontSize: 26, fontWeight: 300,
          color: COLORS.biancoMarmo, opacity: subEnt * 0.80,
          lineHeight: 1.55,
          textShadow: '0 1px 10px rgba(0,0,0,0.98)',
        }}>
          Il silenzioso custode del dolore<br />
          che colpì Lacedonia nella notte tra<br />
          il <strong style={{ color: COLORS.oroSperanza, fontWeight: 700 }}>22 e il 23 luglio 1930</strong>.
        </div>
      </div>

      {/* OROLOGIO — le 3:00 */}
      <div style={{
        position: 'absolute', right: 168, bottom: 210,
        opacity: clockOp * clockPulse * fadeOut,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <ClockIcon opacity={1} />
        <div style={{
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
          fontSize: 22, color: COLORS.oroSperanza, opacity: 0.88,
          textShadow: '0 1px 8px rgba(0,0,0,0.95)',
        }}>ore 3:00</div>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 300,
          fontSize: 13, color: COLORS.biancoMarmo, opacity: 0.65,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>il momento del sisma</div>
      </div>

      <FilmGrain opacity={0.045} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

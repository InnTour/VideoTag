import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq04 — Il Confine Sacro (~11.3s · 340 frame)
// Contadini che tornano al borgo — ingresso con colonna
// Card: confine tra lavoro e pace · Spotlight caldo pomeridiano
// Ghost "CONFINE SACRO" rotated
// ──────────────────────────────────────────────────────────────

export const Sequence04IlConfineSacro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Titolo sequenza ────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── Card 1: ingresso del borgo ──────────────────────────────
  const card1Entrance = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const card1Y = interpolate(card1Entrance, [0, 1], [20, 0]);
  const card1Fade = interpolate(frame, [180, 240], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Card 2: confine sacro ───────────────────────────────────
  const card2Entrance = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 180 } });
  const card2Y = interpolate(card2Entrance, [0, 1], [18, 0]);

  // ── Ghost "CONFINE SACRO" ──────────────────────────────────
  const ghostFade = interpolate(frame, [20, 60], [0, 0.07], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ghostOut = interpolate(frame, [280, 330], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Spotlight pomeridiano caldo — la luce che accoglie ─────
  const warmGlow = Math.sin(frame / 50) * 0.04;

  // ── Overlay pomeridiano dorato ─────────────────────────────
  const goldenHour = interpolate(frame, [0, 180], [0.10, 0.16], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* Contadini / ingresso al borgo — pan lento a destra */}
      <KenBurnsImage src={IMAGES.contadini} motion="pan-right" intensity={0.06} objectPosition="center top" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,8,0.92) 0%, rgba(10,8,8,0.50) 50%, rgba(10,8,8,0.12) 100%)',
          'linear-gradient(to top, rgba(10,8,8,0.80) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* Overlay pomeridiano dorato — golden hour sui contadini */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(212,168,67,${goldenHour})`,
        mixBlendMode: 'overlay',
      }} />

      {/* Spotlight caldo a dx — la luce del pomeriggio */}
      <SpotlightEffect x={72} y={48} radius={440} color={COLORS.oroVescovile} opacity={0.15 + warmGlow} pulse />

      {/* ── Ghost "CONFINE SACRO" ruotato ──────────────────────── */}
      <div style={{
        position: 'absolute', right: 60, top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 120, fontWeight: 700,
        color: COLORS.travertino,
        opacity: ghostFade * ghostOut,
        letterSpacing: '0.05em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>CONFINE SACRO</div>

      {/* ── TITOLO SEQUENZA ────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEntrance }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.22em',
          color: COLORS.oroVescovile, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Confine Sacro</div>
        <div style={{ width: 260, height: 2, background: `linear-gradient(to right, ${COLORS.oroVescovile}, transparent)` }} />
      </div>

      {/* ── CARD 1: Ingresso del borgo ─────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: card1Entrance * card1Fade,
        transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,8,0.86)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(200,152,48,0.28)',
          borderLeft: `5px solid ${COLORS.oroVescovile}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 17,
            color: COLORS.oroVescovile, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>Ingresso Storico del Borgo</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 42,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.15,
          }}>Luogo di Sosta</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 27,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            I contadini che tornavano dalle fatiche<br />
            <em style={{ color: COLORS.travertino }}>nelle contrade si fermavano qui</em>
          </div>
        </div>
      </div>

      {/* ── CARD 2: Il confine sacro ───────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 130,
        opacity: card2Entrance,
        transform: `translateY(${card2Y}px)`,
        maxWidth: 620,
      }}>
        <div style={{
          background: 'rgba(10,8,8,0.84)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(200,152,48,0.22)',
          borderRadius: 4, padding: '22px 30px',
        }}>
          <div style={{ borderLeft: `4px solid ${COLORS.travertino}`, paddingLeft: 20 }}>
            <p style={{
              fontFamily: 'Georgia, serif', fontSize: 28,
              fontStyle: 'italic', color: COLORS.biancoCalce,
              lineHeight: 1.6, margin: 0,
              textShadow: '0 1px 8px rgba(0,0,0,0.95)',
            }}>
              "Per secoli, il confine sacro tra il lavoro dei campi
              e la pace della citta."
            </p>
          </div>

          {/* Linea separatrice sottile */}
          <div style={{
            width: '60%', height: 1,
            background: `linear-gradient(to right, ${COLORS.oroVescovile}, transparent)`,
            margin: '16px 0 12px 24px',
          }} />

          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.grigioIscrizione, paddingLeft: 24,
            letterSpacing: '0.06em',
          }}>
            Rappresentava la soglia tra il mondo rurale e lo spazio urbano protetto
          </div>
        </div>
      </div>

      <ParticleField count={30} opacity={0.20} mode="polvere" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

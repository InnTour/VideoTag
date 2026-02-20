import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq03 — La Vita Contadina · Il Museo (~8s · 240 frame)
//
// ORDINE IMMAGINI (segue la narrazione):
//   [0  → 90 ]  bambiniBW     — volti, fatica, riti quotidiani
//   [85 → 150]  cross-dissolve → contadini pittoreschi
//   [148→ 200]  cross-dissolve → maviInterno (il museo oggi)
//   [200→ 240]  maviInterno   — dialogo tra generazioni
//
// Card: carcere ottocentesco · mappa emozionale
// ─────────────────────────────────────────────────────────────

export const Sequence03Museo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve 1: bambiniBW → contadini
  const d1 = interpolate(frame, [85, 145], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // Cross-dissolve 2: contadini → maviInterno
  const d2 = interpolate(frame, [148, 198], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: carcere ottocentesco
  const card1Ent  = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [80, 120], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: mappa emozionale (appare con il museo)
  const card2Ent = spring({ frame: Math.max(0, frame - 195), fps, config: { damping: 180 } });
  const card2Op  = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y   = interpolate(card2Ent, [0, 1], [18, 0]);

  // Spotlight sul MAVI (quando appare il museo)
  const spotOp = interpolate(d2, [0, 1], [0, 0.18]);

  // Overlay B&W / seppia per i primi due strati
  const bwTone = 1 - d2;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* STRATO 1: Bambini in classe — B&W con raggi di luce */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - d1 }}>
        <KenBurnsImage src={IMAGES.bambiniBW} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>

      {/* STRATO 2: Scene contadine pittoresche */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, d1 * (1 - d2)) }}>
        <KenBurnsImage src={IMAGES.contadini} motion="pan-left" intensity={0.04} objectPosition="center center" />
      </div>

      {/* STRATO 3: MAVI interno — visitatore e fotografia grande */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, d2) }}>
        <KenBurnsImage src={IMAGES.maviInterno} motion="zoom-out" intensity={0.04} objectPosition="center top" />
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.48) 52%, rgba(10,8,4,0.12) 100%)',
          'linear-gradient(to top,   rgba(10,8,4,0.80) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* Tono seppia sulle foto B&W */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,168,120,0.14)',
        mixBlendMode: 'multiply',
        opacity: bwTone,
      }} />

      {/* Spotlight sul MAVI */}
      <SpotlightEffect x={60} y={38} radius={340} color={COLORS.oroMavi} opacity={spotOp} pulse />

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.seppia, textTransform: 'uppercase', marginBottom: 9,
        }}>Il Museo · Dialogo tra Generazioni</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.seppia}, transparent)` }} />
      </div>

      {/* CARD 1: dove è ospitato (appare all'inizio) */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: card1Op * card1Fade, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(200,168,120,0.25)`,
          borderLeft: `5px solid ${COLORS.seppia}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.seppia, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🏛️ Antico Carcere Ottocentesco</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 24,
            color: COLORS.biancoCalce, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Non solo una mostra —<br />
            <em style={{ color: COLORS.oroMavi }}>una mappa emozionale</em><br />
            che restituisce dignità alla storia
          </div>
        </div>
      </div>

      {/* CARD 2: oggi al MAVI (appare con il museo) */}
      <div style={{
        position: 'absolute', left: 72, bottom: 112,
        opacity: card2Op, transform: `translateY(${card2Y}px)`,
        maxWidth: 640,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.88)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(212,168,67,0.28)`,
          borderRadius: 4, padding: '22px 30px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroMavi, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 14,
          }}>Al MAVI Oggi</div>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            {[
              { val: '1.801', label: 'Fotografie' },
              { val: '1957', label: 'Anno degli scatti' },
              { val: 'Frank Cancian', label: 'Cornell University' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 30, fontWeight: 700, color: COLORS.oroMavi,
                }}>{item.val}</div>
                <div style={{
                  fontFamily: 'Lato, sans-serif', fontSize: 15,
                  color: COLORS.biancoCalce, opacity: 0.72,
                  letterSpacing: '0.06em',
                }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FilmGrain opacity={0.055} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq03 — La Vita Contadina (~11.3s · 340 frame)
// Cross-dissolve: bambiniBW → contadini pittoreschi
// Volti, fatica e riti quotidiani — il mondo prima della partenza
// ─────────────────────────────────────────────────────────────

export const Sequence03LaVitaContadina: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: bambiniBW → contadini
  const dissolve = interpolate(frame, [100, 175], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: la scuola / i bambini (appare all'inizio)
  const card1Ent  = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [88, 128], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: la vita nei campi (appare con il dissolve verso i contadini)
  const card2Ent  = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 180 } });
  const card2Op   = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y    = interpolate(card2Ent, [0, 1], [18, 0]);
  const card2Fade = interpolate(frame, [295, 330], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Spotlight: rafforza il soggetto del secondo layer
  const spotOp = interpolate(dissolve, [0, 1], [0, 0.15]);

  // Overlay B&W / seppia sulla prima foto
  const bwTone = 1 - dissolve;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* STRATO 1: Bambini in classe — B&W, luce radente */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.bambiniBW} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>

      {/* STRATO 2: Scene contadine pittoresche */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.contadini} motion="pan-left" intensity={0.04} objectPosition="center center" />
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

      {/* Spotlight sulle scene contadine pittoriche */}
      <SpotlightEffect x={62} y={40} radius={360} color={COLORS.oroMavi} opacity={spotOp} />

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.seppia, textTransform: 'uppercase', marginBottom: 9,
        }}>La Vita Contadina · Prima della Partenza</div>
        <div style={{ width: 310, height: 2, background: `linear-gradient(to right, ${COLORS.seppia}, transparent)` }} />
      </div>

      {/* CARD 1: i bambini in classe */}
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
          }}>🎒 Lacedonia · 1957</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 24,
            color: COLORS.biancoCalce, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Bambini in classe, padri nei campi —<br />
            <em style={{ color: COLORS.oroMavi }}>un mondo intatto</em>,<br />
            ancora ignaro di ciò che sta per accadere.
          </div>
        </div>
      </div>

      {/* CARD 2: la vita nei campi (appare con i contadini pittoreschi) */}
      <div style={{
        position: 'absolute', left: 72, bottom: 112,
        opacity: card2Op * card2Fade, transform: `translateY(${card2Y}px)`,
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
          }}>Il Mondo che Cancian Salvò</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 26,
            color: COLORS.biancoCalce, fontWeight: 300,
            lineHeight: 1.52, opacity: 0.88,
          }}>
            Gesti antichi, stagioni, fatica —<br />
            <em style={{ color: COLORS.seppia, fontStyle: 'italic' }}>
              tutto ciò che il mirino di Cancian<br />
              ha fermato per sempre.
            </em>
          </div>
        </div>
      </div>

      <FilmGrain opacity={0.055} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

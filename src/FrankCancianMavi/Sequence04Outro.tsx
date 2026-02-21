import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq04 — Il Museo · MAVI (~11.3s · 340 frame)
// Immagine: MAVI interno — visitatore e fotografia grande
// Card: antico carcere ottocentesco · mappa emozionale
// Stats: 1.801 fotografie · 1957 · Frank Cancian · Cornell
// ─────────────────────────────────────────────────────────────

export const Sequence04IlMuseo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: dove è ospitato il MAVI (appare all'inizio)
  const card1Ent  = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [145, 185], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: stats del museo (appare dopo metà sequenza)
  const card2Ent  = spring({ frame: Math.max(0, frame - 175), fps, config: { damping: 180 } });
  const card2Op   = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y    = interpolate(card2Ent, [0, 1], [18, 0]);
  const card2Fade = interpolate(frame, [295, 330], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Spotlight che cresce lentamente sull'immagine del museo
  const spotOp = interpolate(frame, [0, 80], [0.08, 0.18], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Pulse luce naturale sul visitatore
  const lucePulse = Math.sin(frame / 55) * 0.025;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* MAVI interno — zoom-out lento, dialogo generazioni */}
      <KenBurnsImage src={IMAGES.maviInterno} motion="zoom-out" intensity={0.04} objectPosition="center top" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.50) 50%, rgba(10,8,4,0.14) 100%)',
          'linear-gradient(to top,   rgba(10,8,4,0.82) 0%, transparent 55%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Luce dorata del museo */}
      <SpotlightEffect x={58} y={38} radius={400} color={COLORS.oroMavi} opacity={spotOp + lucePulse} />

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 18, letterSpacing: '0.20em',
          color: COLORS.oroMavi, textTransform: 'uppercase', marginBottom: 9,
        }}>Il Museo · Dialogo tra Generazioni</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.oroMavi}, transparent)` }} />
      </div>

      {/* CARD 1: dove è ospitato il museo */}
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
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.seppia, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🏛️ Antico Carcere Ottocentesco</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 28,
            color: COLORS.biancoCalce, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Non solo una mostra —<br />
            <em style={{ color: COLORS.oroMavi }}>una mappa emozionale</em><br />
            che restituisce dignità alla storia.
          </div>
        </div>
      </div>

      {/* CARD 2: stats (appare nella seconda metà) */}
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
            fontFamily: 'Lato, sans-serif', fontSize: 18,
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
                  fontSize: 34, fontWeight: 700, color: COLORS.oroMavi,
                }}>{item.val}</div>
                <div style={{
                  fontFamily: 'Lato, sans-serif', fontSize: 17,
                  color: COLORS.biancoCalce, opacity: 0.72,
                  letterSpacing: '0.06em',
                }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FilmGrain opacity={0.050} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

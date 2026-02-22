import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { TrombaPulse } from './components/TrombaPulse';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq04 — La Cerimonia · 4 Novembre (~13.0s · 390 frame)
// La cerimonia annuale: tromba e deposizione della corona
// TrombaPulse animato — onde sonore dal trombettista
// Ghost "4 NOVEMBRE" · Cards legame con la comunità
// ─────────────────────────────────────────────────────────────

export const Sequence04LaCerimonia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Titolo
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Date reveal "4 NOVEMBRE"
  const dateEnt = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 190 } });
  const dateY   = interpolate(dateEnt, [0, 1], [30, 0]);
  const dateFade = interpolate(frame, [250, 300], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 1: il rito (appare subito)
  const card1Ent  = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [260, 320], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: il legame (appare dopo)
  const card2Ent = spring({ frame: Math.max(0, frame - 190), fps, config: { damping: 180 } });
  const card2Op  = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y   = interpolate(card2Ent, [0, 1], [18, 0]);

  // Ghost "4 NOVEMBRE" — grande, verticale
  const ghostOp = interpolate(frame, [0, 50, 280, 340], [0, 0.06, 0.06, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Overlay caldo — luce pomeriggio invernale del 4 novembre
  const warmOp = 0.10;

  // TrombaPulse beats — tromba suona 4 volte durante la sequenza
  const trombaBeat = [60, 140, 220, 310];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Cerimonia 4 novembre — zoom-in verso il trombettista */}
      <KenBurnsImage src={IMAGES.cerimonia} motion="zoom-in" intensity={0.05} objectPosition="center center" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.52) 52%, rgba(10,10,10,0.12) 100%)',
          'linear-gradient(to top,   rgba(10,10,10,0.82) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Tono caldo pomeriggio invernale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(180,120,60,1)',
        mixBlendMode: 'multiply',
        opacity: warmOp,
      }} />

      {/* Onde sonore tromba — centrate sul trombettista (cx ~500 per ritratto portrait) */}
      <TrombaPulse
        cx={960}
        cy={440}
        color={COLORS.oroLuce}
        opacity={0.60}
        beatFrames={trombaBeat}
      />

      {/* Ghost "4 NOVEMBRE" */}
      <div style={{
        position: 'absolute', right: 60, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 96, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.biancoLapide, opacity: ghostOp,
        pointerEvents: 'none', writingMode: 'vertical-rl',
        letterSpacing: '0.10em',
      }}>4 NOVEMBRE</div>

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 18, letterSpacing: '0.20em',
          color: COLORS.oroLuce, textTransform: 'uppercase', marginBottom: 9,
        }}>La Cerimonia · Ogni Anno · 4 Novembre</div>
        <div style={{ width: 320, height: 2, background: `linear-gradient(to right, ${COLORS.oroLuce}, transparent)` }} />
      </div>

      {/* DATE REVEAL "4 NOVEMBRE" */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: dateEnt * dateFade, transform: `translateY(${dateY}px)`,
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 108, fontWeight: 700,
          color: COLORS.oroLuce, lineHeight: 1,
          textShadow: '0 2px 30px rgba(212,168,67,0.45)',
        }}>4<br />
          <span style={{ fontSize: 56, fontWeight: 400, fontStyle: 'italic' }}>Novembre</span>
        </div>
      </div>

      {/* CARD 1: il rito */}
      <div style={{
        position: 'absolute', left: 72, top: 380,
        opacity: card1Op * card1Fade, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(212,168,67,0.28)`,
          borderLeft: `5px solid ${COLORS.oroLuce}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 540,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.oroLuce, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🎺 Il Rito Annuale</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 30,
            color: COLORS.biancoLapide, opacity: 0.90,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Il suono della tromba<br />
            e la <em style={{ color: COLORS.verdeAlloro }}>deposizione della corona</em>
          </div>
        </div>
      </div>

      {/* CARD 2: il legame */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: card2Op, transform: `translateY(${card2Y}px)`,
        maxWidth: 640,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(212,168,67,0.22)`,
          borderRadius: 4, padding: '22px 30px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.oroLuce, letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: 14,
          }}>Il Legame Rinnovato</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 30,
            color: COLORS.biancoLapide, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Lacedonia si raccoglie ogni anno<br />
            per <em style={{ color: COLORS.oroLuce }}>non dimenticare</em> — mai
          </div>
        </div>
      </div>

      <ScanLines />
    </div>
  );
};

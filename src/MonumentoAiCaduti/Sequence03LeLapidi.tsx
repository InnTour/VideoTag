import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq03 — Le Lapidi / I Figli della Terra (~13.3s · 400 frame)
// Layer 1: le lapidi di marmo con i nomi dei Caduti
// Cross-dissolve → soldati lacedoniesi in partenza
// "Lacedonia per la Patria" — partirono e non tornarono
// ─────────────────────────────────────────────────────────────

export const Sequence03LeLapidi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: lapidi → soldati in partenza
  const dissolve = interpolate(frame, [220, 320], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: le lapidi (prima della dissolve)
  const card1Ent  = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]) *
    interpolate(frame, [210, 260], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);

  // Reveal progressivo — linea che sale sulle lapidi (wipe verticale)
  const wipeHeight = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const wipeOp = interpolate(frame, [130, 180], [0.35, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 2: soldati in partenza (appare con la dissolve)
  const card2Ent = spring({ frame: Math.max(0, frame - 310), fps, config: { damping: 180 } });
  const card2Op  = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y   = interpolate(card2Ent, [0, 1], [18, 0]);

  // Ghost "NON TORNARONO" — presente durante la scena delle lapidi
  const ghostOp = interpolate(dissolve, [0, 0.4, 1], [0.065, 0.065, 0]);

  // Overlay drammatico B&W sulla foto dei soldati (vignette profonda)
  const drammaOp = interpolate(dissolve, [0, 1], [0, 0.30]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* STRATO 1: Lapidi di marmo — pan-up lento (rivela i nomi) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.lapidi} motion="pan-up" intensity={0.06} objectPosition="center top" />
      </div>

      {/* STRATO 2: Soldati in partenza */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.soldati} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.48) 52%, rgba(10,10,10,0.10) 100%)',
          'linear-gradient(to top,   rgba(10,10,10,0.82) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Dramma B&W sulla scena dei soldati */}
      {drammaOp > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(20,16,12,1)',
          mixBlendMode: 'multiply',
          opacity: drammaOp,
        }} />
      )}

      {/* Wipe rivelatore sulle lapidi (linea luminosa che sale) */}
      {wipeOp > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: `${(1 - wipeHeight) * 100}%`,
          background: `linear-gradient(to top, rgba(240,220,180,0.06), transparent)`,
          pointerEvents: 'none', opacity: wipeOp,
        }} />
      )}

      {/* Ghost "NON TORNARONO" */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 130, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.biancoLapide, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap', letterSpacing: '0.05em',
      }}>NON TORNARONO</div>

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.oroLuce, textTransform: 'uppercase', marginBottom: 9,
        }}>Le Lapidi · I Nomi Sull'Eterno</div>
        <div style={{ width: 300, height: 2, background: `linear-gradient(to right, ${COLORS.oroLuce}, transparent)` }} />
      </div>

      {/* CARD 1: le lapidi */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: card1Op, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(240,237,232,0.20)`,
          borderLeft: `5px solid ${COLORS.biancoLapide}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 540,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.biancoLapide, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12, opacity: 0.75,
          }}>📜 Due Lapidi di Marmo</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 26,
            color: COLORS.biancoLapide, opacity: 0.90,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            I nomi dei giovani lacedoniesi<br />
            <em style={{ color: COLORS.oroLuce }}>che non fecero mai ritorno</em><br />
            alle loro case
          </div>
        </div>
      </div>

      {/* CARD 2: soldati in partenza (dopo dissolve) */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: card2Op, transform: `translateY(${card2Y}px)`,
        maxWidth: 680,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(212,168,67,0.22)`,
          borderRadius: 4, padding: '22px 30px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 17,
            color: COLORS.rossoPapavero, letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: 14,
            fontWeight: 700,
          }}>
            🪖 Lacedonia per la Patria
          </div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 26,
            color: COLORS.biancoLapide, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Erano <em style={{ color: COLORS.oroLuce }}>contadini e studenti</em><br />
            partiti con speranza
          </div>
        </div>
      </div>

      <ScanLines />
    </div>
  );
};

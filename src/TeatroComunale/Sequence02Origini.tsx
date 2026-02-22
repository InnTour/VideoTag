import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ────────────────────────────────────────────────
// Seq02 — Le Origini Romane (~18.7s · 560 frame)
//
// ORDINE NARRATIVO:
//   [0-280]  Anfiteatro Romano → si parla prima delle origini romane
//   [260-380] Cross-dissolve anfiteatro → archivio storico
//   [380-560] Archivio → XVIII secolo, smantellamento blocchi
// ────────────────────────────────────────────────

interface TimelineNodeProps {
  label: string;
  year: string;
  color: string;
  opacity: number;
  x: number;
}
const TimelineNode: React.FC<TimelineNodeProps> = ({ label, year, color, opacity, x }) => (
  <div style={{ position: 'absolute', left: x, top: 0, opacity, textAlign: 'center', transform: 'translateX(-50%)' }}>
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, margin: '0 auto 6px' }} />
    <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, fontWeight: 700, color, letterSpacing: '0.08em' }}>{year}</div>
    <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.biancoCalce, opacity: 0.75, maxWidth: 110, lineHeight: 1.3 }}>{label}</div>
  </div>
);

export const Sequence02Origini: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve anfiteatro (prima) → archivio (dopo) ──────
  // Anfiteatro è il soggetto PRINCIPALE perché se ne parla prima
  const dissolve = interpolate(frame, [260, 370], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo ───────────────────────────────────────────────────
  const titleEntrance = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);

  // ── Cards ────────────────────────────────────────────────────
  const card1Entrance = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 180 } });
  const card1Y = interpolate(card1Entrance, [0, 1], [24, 0]);

  const card2Entrance = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 180 } });
  const card2Y = interpolate(card2Entrance, [0, 1], [24, 0]);

  const card3Entrance = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 180 } });

  // ── Narrazione ───────────────────────────────────────────────
  const narrOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const narrOpacity2 = interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── Timeline ─────────────────────────────────────────────────
  const timelineLineW = interpolate(frame, [320, 440], [0, 420], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tNode1 = interpolate(frame, [320, 370], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tNode2 = interpolate(frame, [370, 420], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tNode3 = interpolate(frame, [420, 470], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── IMMAGINI: anfiteatro PRIMA (0→dissolve), archivio DOPO ── */}
      {/* Anfiteatro Romano — narrato per primo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.oggi} motion="pan-right" intensity={0.05} />
      </div>
      {/* Archivio storico — appare con il XVIII secolo */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.archivio} motion="pan-left" intensity={0.04} />
      </div>

      {/* ── OVERLAY ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(13,13,26,0.85) 0%, rgba(13,13,26,0.50) 52%, rgba(13,13,26,0.10) 100%)',
          'linear-gradient(to top, rgba(13,13,26,0.60) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Ghost "ROMANI" verticale */}
      <div style={{
        position: 'absolute', right: 80, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 200, fontWeight: 700,
        color: COLORS.oroLampade, opacity: 0.06,
        letterSpacing: '0.08em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>ROMANI</div>

      {/* ── TITOLO (spring entrance) ─────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 60, opacity: titleOpacity }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16,
          letterSpacing: '0.22em', color: COLORS.oroLampade,
          textTransform: 'uppercase', marginBottom: 8,
        }}>Le Radici Romane</div>
        <div style={{ width: 240, height: 2, background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)` }} />
      </div>

      {/* ── NARRAZIONE 1: l'anfiteatro romano (visible su anfiteatro image) ── */}
      <div style={{ position: 'absolute', left: 72, top: 148, opacity: narrOpacity, maxWidth: 580 }}>
        <div style={{
          background: 'rgba(13,13,26,0.80)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(212,168,67,0.25)`,
          borderLeft: `4px solid ${COLORS.oroLampade}`,
          borderRadius: 4, padding: '20px 28px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 26, color: COLORS.biancoCalce,
            lineHeight: 1.65, margin: 0, fontWeight: 300,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}>
            Il richiamo allo spettacolo è scritto nel DNA di questa terra{' '}
            <strong style={{ color: COLORS.oroLampade, fontWeight: 700 }}>da millenni</strong>.
          </p>
        </div>
      </div>

      {/* ── CARD 1: Anfiteatro Romano ──────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 330,
        opacity: card1Entrance, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.82)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(212,168,67,0.20)`,
          borderLeft: `4px solid ${COLORS.oroLampade}`,
          borderRadius: 4, padding: '14px 22px', minWidth: 340,
        }}>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.grigio, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
            🏛 Anfiteatro Romano
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: COLORS.oroLampade, marginBottom: 4 }}>
            Epoca Imperiale
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.biancoCalce, opacity: 0.75 }}>
            Alle spalle dell'Istituto Magistrale
          </div>
        </div>
      </div>

      {/* ── CARD 2: Smantellamento (XVIII sec) ─────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 456,
        opacity: card2Entrance, transform: `translateY(${card2Y}px)`,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.82)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(204,34,34,0.30)`,
          borderLeft: `4px solid ${COLORS.rossoVivo}`,
          borderRadius: 4, padding: '14px 22px', minWidth: 340,
        }}>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.grigio, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
            ⛏ Smantellamento
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: COLORS.rossoVivo, marginBottom: 4 }}>
            XVIII Secolo
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: COLORS.biancoCalce, opacity: 0.75 }}>
            Blocchi riusati per il campanile della Cattedrale
          </div>
        </div>
      </div>

      {/* ── NARRAZIONE 2 (visible su archivio image) ─────────────── */}
      <div style={{ position: 'absolute', left: 72, bottom: 120, opacity: narrOpacity2, maxWidth: 600 }}>
        <div style={{
          background: 'rgba(13,13,26,0.76)', backdropFilter: 'blur(14px)',
          borderRadius: 4, padding: '16px 24px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 23,
            color: COLORS.biancoCalce, lineHeight: 1.6,
            margin: 0, fontStyle: 'italic', fontWeight: 300,
          }}>
            "Gli storici ipotizzano un grande anfiteatro Romano —
            i cui blocchi furono <strong style={{ color: COLORS.oroLampade, fontStyle: 'normal' }}>
            smantellati nel XVIII sec.</strong> per costruire il campanile della Cattedrale."
          </p>
        </div>
      </div>

      {/* ── TIMELINE STORICA ──────────────────────────────────────── */}
      <div style={{ position: 'absolute', right: 90, bottom: 180, opacity: card3Entrance }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 10, color: COLORS.grigio, letterSpacing: '0.20em', textTransform: 'uppercase', marginBottom: 14 }}>
          Linea del Tempo
        </div>
        {/* Linea orizzontale animata */}
        <div style={{ position: 'relative', height: 60, width: 420 }}>
          <div style={{
            position: 'absolute', top: 6, left: 0,
            width: timelineLineW, height: 2,
            background: `linear-gradient(to right, ${COLORS.oroLampade}, ${COLORS.rossoVivo}, ${COLORS.verdeInnTour})`,
          }} />
          <TimelineNode label="Anfiteatro Romano" year="I–IV sec." color={COLORS.oroLampade}  opacity={tNode1} x={0}   />
          <TimelineNode label="Blocchi smantellati" year="XVIII sec."  color={COLORS.rossoVivo}  opacity={tNode2} x={190} />
          <TimelineNode label="DNA culturale vivo"  year="Oggi"        color={COLORS.verdeInnTour} opacity={tNode3} x={390} />
        </div>
      </div>

      <ParticleField count={35} opacity={0.22} mode="dust" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { CrossReveal } from './components/CrossReveal';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq03 — Il Vescovo Pedoca (~12.7s · 380 frame)
// Vescovo → cross-dissolve alla croce sovrapposta
// CrossReveal SVG · Ghost "CONTRORIFORMA" · Iscrizione reveal
// Card: Marco Pedoca · 1586 iscrizione · 1587 croce
// ──────────────────────────────────────────────────────────────

// Iscrizione che appare lettera per lettera
const ISCRIZIONE = 'ANNO DOMINI MDLXXXVI';

export const Sequence03IlVescovoPedoca: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve: vescovo → croce ─────────────────────────
  const dissolve = interpolate(frame, [190, 290], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── CrossReveal: la croce emerge ───────────────────────────
  const crossProgress = interpolate(frame, [100, 280], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const crossOpacity = interpolate(frame, [90, 130], [0, 0.70], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza ────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── Card: Marco Pedoca ──────────────────────────────────────
  const cardEntrance = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const cardY = interpolate(cardEntrance, [0, 1], [20, 0]);
  const cardFade = interpolate(frame, [190, 240], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Iscrizione reveal lettera per lettera ───────────────────
  const iscrizioneStart = 220;
  const charsVisible = Math.round(interpolate(frame, [iscrizioneStart, iscrizioneStart + 120], [0, ISCRIZIONE.length], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const iscrizioneFade = interpolate(frame, [iscrizioneStart - 10, iscrizioneStart + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Cursor lampeggiante per iscrizione ─────────────────────
  const cursorVisible = charsVisible < ISCRIZIONE.length && frame > iscrizioneStart;
  const cursorBlink = Math.sin(frame * 0.3) > 0;

  // ── Counter anno 1587 (la croce sovrapposta) ────────────────
  const counterVal = Math.round(interpolate(frame, [260, 340], [1500, 1587], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEntrance = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 180 } });

  // ── Card 2: l'anno della croce ──────────────────────────────
  const card2Entrance = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 180 } });
  const card2Y = interpolate(card2Entrance, [0, 1], [16, 0]);

  // ── Ghost "CONTRORIFORMA" ──────────────────────────────────
  const ghostFade = interpolate(frame, [30, 70], [0, 0.06], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ghostOut = interpolate(frame, [320, 370], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Vescovo Pedoca ───────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.vescovo} motion="pan-left" intensity={0.05} objectPosition="center center" />
      </div>

      {/* ── STRATO 2: Croce sulla colonna ──────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.croce} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      </div>

      {/* ── Overlay bitonale ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,8,0.92) 0%, rgba(10,8,8,0.52) 50%, rgba(10,8,8,0.14) 100%)',
          'linear-gradient(to top, rgba(10,8,8,0.82) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* ── Tono caldo vescovile ───────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(200,152,48,0.08)`,
        mixBlendMode: 'overlay',
      }} />

      {/* ── CrossReveal: la croce si disegna ───────────────────── */}
      <div style={{
        position: 'absolute', right: 200, top: '50%',
        transform: 'translateY(-50%)',
        width: 200, height: 200,
      }}>
        <CrossReveal
          progress={crossProgress}
          opacity={crossOpacity}
          color={COLORS.oroVescovile}
          size={200}
        />
      </div>

      {/* ── Ghost "CONTRORIFORMA" verticale ────────────────────── */}
      <div style={{
        position: 'absolute', right: 50, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 110, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroVescovile,
        opacity: ghostFade * ghostOut,
        letterSpacing: '0.06em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>CONTRORIFORMA</div>

      {/* ── TITOLO SEQUENZA ────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEntrance }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.22em',
          color: COLORS.oroVescovile, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Vescovo Pedoca</div>
        <div style={{ width: 260, height: 2, background: `linear-gradient(to right, ${COLORS.oroVescovile}, transparent)` }} />
      </div>

      {/* ── CARD: Marco Pedoca ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: cardEntrance * cardFade,
        transform: `translateY(${cardY}px)`,
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
          }}>Controriforma · XVI Secolo</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 44,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Marco Pedoca</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 27,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Monaco benedettino e <em style={{ color: COLORS.travertino }}>insigne matematico</em><br />
            riconsacra un simbolo dell'antica Aquilonia
          </div>
        </div>
      </div>

      {/* ── ISCRIZIONE reveal lettera-per-lettera ──────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 390,
        opacity: iscrizioneFade,
      }}>
        <div style={{
          background: 'rgba(10,8,8,0.80)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(138,128,120,0.30)',
          borderRadius: 4, padding: '16px 24px', maxWidth: 600,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.grigioIscrizione, letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>Iscrizione sulla Colonna · 1586</div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 34,
            fontWeight: 400, color: COLORS.travertino,
            letterSpacing: '0.12em',
            textShadow: '0 1px 6px rgba(0,0,0,0.90)',
          }}>
            {ISCRIZIONE.slice(0, charsVisible)}
            {cursorVisible && cursorBlink && (
              <span style={{ color: COLORS.oroVescovile, opacity: 0.9 }}>|</span>
            )}
          </div>
        </div>
      </div>

      {/* ── COUNTER 1587 + Card anno ───────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 130,
        opacity: counterEntrance,
        transform: `translateY(${card2Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,8,0.84)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(200,152,48,0.28)',
          borderRadius: 4, padding: '18px 28px',
          display: 'flex', alignItems: 'flex-end', gap: 16,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 76, fontWeight: 700,
            color: COLORS.oroVescovile, lineHeight: 1,
          }}>{counterVal}</span>
          <div>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 18,
              color: COLORS.biancoCalce, opacity: 0.80,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>la croce sovrapposta</div>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 16,
              color: COLORS.travertino, opacity: 0.65,
              marginTop: 4,
            }}>riconsacrazione della colonna pagana</div>
          </div>
        </div>
      </div>

      <ParticleField count={30} opacity={0.18} mode="incenso" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

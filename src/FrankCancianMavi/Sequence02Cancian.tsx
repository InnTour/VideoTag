import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq02 — Frank Cancian · 1957 (~14s · 420 frame)
// Cancian immortalò la vita del borgo in 1.801 scatti
// Cross-dissolve: cancianBorgo → barBW (scatto autentico)
// Counter 0→1801 · Flash fotografico · Ghost "1957"
// ─────────────────────────────────────────────────────────────

export const Sequence02Cancian: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: cancianBorgo → barBW
  const dissolve = interpolate(frame, [150, 230], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Flash fotografico al momento dello scatto (simula l'otturatore)
  const flashOp = interpolate(frame, [148, 152, 162], [0, 0.55, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Counter 0 → 1801
  const counterVal = Math.round(interpolate(frame, [40, 145], [0, 1801], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEnt = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const counterFade = interpolate(frame, [140, 178], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card Cancian — chi era
  const cardEnt  = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 180 } });
  const cardOp   = interpolate(cardEnt, [0, 1], [0, 1]);
  const cardY    = interpolate(cardEnt, [0, 1], [20, 0]);
  const cardFade = interpolate(frame, [145, 182], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card sulla scena del bar (appare dopo il dissolve, rimane fino alla fine)
  const card2Ent  = spring({ frame: Math.max(0, frame - 218), fps, config: { damping: 180 } });
  const card2Op   = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y    = interpolate(card2Ent, [0, 1], [18, 0]);
  const card2Fade = interpolate(frame, [380, 414], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ghost "1957" — in evidenza nella prima metà, si dissolve con il barBW
  const ghostOp = interpolate(dissolve, [0, 0.6, 1], [0.07, 0.07, 0]);

  // Overlay seppia sui B&W
  const sepiaTone = dissolve;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* STRATO 1: Cancian nel borgo (pittoresco) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.cancianBorgo} motion="pan-right" intensity={0.05} objectPosition="center center" />
      </div>

      {/* STRATO 2: Bar contadini B&W — scatto autentico 1957 */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.barBW} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.48) 52%, rgba(10,8,4,0.10) 100%)',
          'linear-gradient(to top,   rgba(10,8,4,0.78) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* Tono seppia sui B&W: evoca la stampa fotografica d'archivio */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(200,168,120,0.16)`,
        mixBlendMode: 'multiply',
        opacity: sepiaTone,
      }} />

      {/* Ghost "1957" */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 280, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.seppia, opacity: ghostOp,
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>1957</div>

      {/* Flash otturatore */}
      {flashOp > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: '#F0ECDC', opacity: flashOp }} />
      )}

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.seppia, textTransform: 'uppercase', marginBottom: 9,
        }}>Frank Cancian · Antropologo &amp; Fotografo</div>
        <div style={{ width: 300, height: 2, background: `linear-gradient(to right, ${COLORS.seppia}, transparent)` }} />
      </div>

      {/* COUNTER "1801 scatti" */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: counterEnt * counterFade,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,168,120,0.30)`,
          borderRadius: 4, padding: '18px 30px',
          display: 'flex', alignItems: 'flex-end', gap: 10,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 90, fontWeight: 700,
            color: COLORS.oroMavi, lineHeight: 1,
          }}>{counterVal.toLocaleString('it-IT')}</span>
          <div style={{ paddingBottom: 10 }}>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 17,
              color: COLORS.biancoCalce, opacity: 0.82,
              letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>scatti</div>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 14,
              color: COLORS.seppia, opacity: 0.75,
              letterSpacing: '0.06em',
            }}>immortalati nel 1957</div>
          </div>
        </div>
      </div>

      {/* CARD: chi era Cancian */}
      <div style={{
        position: 'absolute', left: 72, top: 350,
        opacity: cardOp * cardFade, transform: `translateY(${cardY}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.85)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(200,168,120,0.25)`,
          borderLeft: `5px solid ${COLORS.seppia}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.seppia, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>📷 Antropologo · Cornell University</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 24,
            color: COLORS.biancoCalce, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            La vita del borgo immortalata<br />
            <em style={{ color: COLORS.seppia }}>poco prima della grande emigrazione</em>
          </div>
        </div>
      </div>

      {/* CARD: il bar — scena autentica (appare dopo dissolve) */}
      <div style={{
        position: 'absolute', left: 72, bottom: 112,
        opacity: card2Op * card2Fade, transform: `translateY(${card2Y}px)`,
        maxWidth: 620,
      }}>
        <div style={{ borderLeft: `4px solid ${COLORS.oroMavi}`, paddingLeft: 22 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 24,
            fontStyle: 'italic', color: COLORS.biancoCalce,
            lineHeight: 1.58, margin: 0,
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
          }}>
            "Volti, fatica e riti quotidiani —<br />
            un <em style={{ color: COLORS.oroMavi }}>mondo contadino autentico</em>
            {' '}colto per sempre."
          </p>
        </div>
      </div>

      <FilmGrain opacity={0.060} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { SpotlightEffect } from './components/SpotlightEffect';
import { IMAGES, COLORS } from './constants';

// ────────────────────────────────────────────────────────────────────
// Seq03 — Il Cinema Argentino · Gerardo Vigorita (~19.7s · 590 frame)
//
// ORDINE IMMAGINI (sincronizzato alla narrazione):
//   [0  → 300] Cinema Argentino (image_dd9cbe46) — atmosfera Novecento
//   [280 → 410] Cross-dissolve cinema → ritratto Vigorita 1
//   [410 → 510] Vigorita 1 (image_07985028) — il fondatore
//   [490 → 590] Cross-dissolve Vigorita 1 → Vigorita 2 (image_7ef6bc10)
// ────────────────────────────────────────────────────────────────────

export const Sequence03Cinema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve 1: Cinema → Vigorita (quando si nomina il fondatore) ──
  const dissolve1 = interpolate(frame, [280, 400], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Cross-dissolve 2: Vigorita1 → Vigorita2 ──────────────────────────────
  const dissolve2 = interpolate(frame, [490, 570], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Spot light segue il volto di Vigorita ────────────────────────────────
  const vigoritaSpotOpacity = interpolate(frame, [360, 420], [0, 0.20], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza (spring) ─────────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });
  const titleOpacity = titleEntrance;

  // ── Counter 0→50 anni (visible sulla scena Cinema) ──────────────────────
  const counterVal = Math.round(interpolate(frame, [80, 260], [0, 50], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEntrance = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 180 } });
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]);

  // ── Card Vigorita (appare quando dissolve inizia) ────────────────────────
  const vigoritaCardEntrance = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 180 } });
  const vigoritaCardOpacity = interpolate(vigoritaCardEntrance, [0, 1], [0, 1]);
  const vigoritaCardY = interpolate(vigoritaCardEntrance, [0, 1], [20, 0]);

  // ── Citazione finale ─────────────────────────────────────────────────────
  const citOpacity = interpolate(frame, [440, 490], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Proiettore cinematografico ─────────────────────────────────────────
  // Fasci di luce che simulano la proiezione — visible solo sulla scena Cinema
  const projectorOpacity = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }) * (1 - dissolve1 * 0.8);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Cinema Argentino (narrato per primo) ─────────── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <KenBurnsImage src={IMAGES.cinema} motion="zoom-in" intensity={0.05} />
      </div>

      {/* ── STRATO 2: Vigorita 1 (appare quando si nomina il fondatore) ─ */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve1 * (1 - dissolve2) }}>
        <KenBurnsImage src={IMAGES.vigorita1} motion="pan-right" intensity={0.03} />
      </div>

      {/* ── STRATO 3: Vigorita 2 (secondo ritratto) ─────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve1 * dissolve2 }}>
        <KenBurnsImage src={IMAGES.vigorita2} motion="zoom-out" intensity={0.04} />
      </div>

      {/* ── Overlay warm sepia — atmosfera cinema d'epoca ───────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(80,30,10,0.22)',
        mixBlendMode: 'multiply',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(13,13,26,0.88) 0%, rgba(13,13,26,0.48) 55%, rgba(13,13,26,0.10) 100%)',
          'linear-gradient(to top, rgba(13,13,26,0.70) 0%, transparent 65%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* ── Proiettore cinematografico — due fasci di luce SVG ────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: projectorOpacity }}>
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="beam1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0C060" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#F0C060" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="beam2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0C060" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#F0C060" stopOpacity="0.00" />
            </linearGradient>
          </defs>
          {/* Fascio principale */}
          <polygon points="1640,0 1920,0 1920,1080 960,540" fill="url(#beam1-grad)" />
          {/* Fascio secondario */}
          <polygon points="1700,0 1920,0 1920,800 1100,620" fill="url(#beam2-grad)" />
        </svg>
      </div>

      {/* ── Spotlight sul volto di Vigorita ────────────────────────── */}
      <SpotlightEffect x={65} y={38} radius={320} color={COLORS.oroLampade} opacity={vigoritaSpotOpacity} pulse />

      {/* ── Ghost "ARGENTINO" ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 220, fontWeight: 700,
        color: COLORS.oroLampade,
        opacity: interpolate(dissolve1, [0, 1], [0.07, 0]),
        letterSpacing: '0.06em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>ARGENTINO</div>

      {/* ── TITOLO SEQUENZA ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleOpacity }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.22em',
          color: COLORS.oroLampade, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Novecento · Cinema Argentino</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)` }} />
      </div>

      {/* ── COUNTER "50+ anni" ───────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 148, opacity: counterOpacity }}>
        <div style={{
          background: 'rgba(13,13,26,0.82)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(212,168,67,0.25)`,
          borderRadius: 4, padding: '18px 28px',
          display: 'flex', alignItems: 'flex-end', gap: 8,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 96, fontWeight: 700,
            color: COLORS.oroLampade, lineHeight: 1,
          }}>{counterVal}</span>
          <div>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 42, fontWeight: 700, color: COLORS.oroChiaro,
            }}>+</span>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 18,
              color: COLORS.biancoCalce, opacity: 0.80,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>anni di cultura</div>
          </div>
        </div>
      </div>

      {/* ── CARD GERARDO VIGORITA (appare con il suo ritratto) ──────── */}
      <div style={{
        position: 'absolute', left: 72, top: 320,
        opacity: vigoritaCardOpacity,
        transform: `translateY(${vigoritaCardY}px)`,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.86)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(212,168,67,0.30)`,
          borderLeft: `5px solid ${COLORS.oroLampade}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroLampade, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>🎬 Il Fondatore · L'Uomo della Luce</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 44,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Gerardo Vigorita</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 22,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Fondatore del <em style={{ color: COLORS.oroLampade }}>Cinema Argentino</em> —<br />
            faro culturale per l'intera provincia irpina
          </div>
        </div>
      </div>

      {/* ── CITAZIONE FINALE ──────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, bottom: 110, opacity: citOpacity, maxWidth: 620 }}>
        <div style={{ borderLeft: `4px solid ${COLORS.rossoTelone}`, paddingLeft: 20 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 27,
            fontStyle: 'italic', color: COLORS.biancoCalce,
            lineHeight: 1.6, margin: 0,
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>
            "Per oltre cinquant'anni, il Cinema Argentino è stato
            l'anima culturale di Lacedonia — e di tutta la provincia irpina."
          </p>
        </div>
      </div>

      <ParticleField count={38} opacity={0.25} mode="gold" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

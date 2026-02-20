import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq02 — Le Pergamene (~16.7s · 500 frame)
// 100+ pergamene medievali XII-XIII sec con sigilli in cera
// Cross-dissolve: pergamene → luce obliqua sui manoscritti
// Counter animato · Card storica · Ghost "MILLE ANNI"
// ──────────────────────────────────────────────────────────────

export const Sequence02Pergamene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve: pergamene → luce ─────────────────────────
  const dissolve = interpolate(frame, [280, 400], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza ──────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── Counter 0 → 100+ pergamene ───────────────────────────────
  const counterVal = Math.round(interpolate(frame, [60, 240], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEntrance = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 180 } });
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]);
  const counterFade = interpolate(frame, [260, 310], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Card storica — appare dopo il counter ────────────────────
  const cardEntrance = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 180 } });
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);
  const cardY = interpolate(cardEntrance, [0, 1], [20, 0]);
  const cardFade = interpolate(frame, [280, 340], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Seconda card — appare con la luce (dopo dissolve) ────────
  const card2Entrance = spring({ frame: Math.max(0, frame - 380), fps, config: { damping: 180 } });
  const card2Opacity = interpolate(card2Entrance, [0, 1], [0, 1]);
  const card2Y = interpolate(card2Entrance, [0, 1], [18, 0]);

  // ── Ghost "MILLE ANNI" ────────────────────────────────────────
  const ghostOpacity = interpolate(dissolve, [0, 1], [0.055, 0]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Pergamene con sigilli ─────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.pergamene} motion="zoom-in" intensity={0.06} objectPosition="center center" />
      </div>

      {/* ── STRATO 2: Luce obliqua sui manoscritti ──────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.luce} motion="pan-up" intensity={0.05} objectPosition="center center" />
      </div>

      {/* ── Overlay bitonale ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.50) 50%, rgba(10,8,4,0.12) 100%)',
          'linear-gradient(to top, rgba(10,8,4,0.78) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* ── Tono pergamena caldo sull'immagine base ───────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(200,152,48,0.08)`,
        mixBlendMode: 'overlay',
        opacity: 1 - dissolve,
      }} />

      {/* ── Ghost "MILLE ANNI" ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 200, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroAntico,
        opacity: ghostOpacity,
        letterSpacing: '0.04em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>MILLE ANNI</div>

      {/* ── TITOLO SEQUENZA ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEntrance }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 14, letterSpacing: '0.22em',
          color: COLORS.oroAntico, textTransform: 'uppercase', marginBottom: 8,
        }}>Le Pergamene Medievali</div>
        <div style={{ width: 260, height: 2, background: `linear-gradient(to right, ${COLORS.oroAntico}, transparent)` }} />
      </div>

      {/* ── COUNTER "100+" ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: counterOpacity * counterFade,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.84)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,152,48,0.28)`,
          borderRadius: 4, padding: '18px 28px',
          display: 'flex', alignItems: 'flex-end', gap: 8,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 80, fontWeight: 700,
            color: COLORS.oroAntico, lineHeight: 1,
          }}>{counterVal}</span>
          <div>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 40, fontWeight: 700, color: '#F0C060',
            }}>+</span>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 16,
              color: COLORS.biancoCalce, opacity: 0.80,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>pergamene</div>
          </div>
        </div>
      </div>

      {/* ── CARD STORICA (sezione XII-XIII sec) ─────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 320,
        opacity: cardOpacity * cardFade,
        transform: `translateY(${cardY}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(200,152,48,0.28)`,
          borderLeft: `5px solid ${COLORS.oroAntico}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 500,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 11,
            color: COLORS.oroAntico, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>📜 XII–XIII Secolo · Documenti Originali</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 34,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Le Pergamene di Lacedonia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Atti religiosi, economici e notarili —<br />
            la vita quotidiana del borgo<em style={{ color: COLORS.pergamena }}> scritta sulle pelli</em>
          </div>
        </div>
      </div>

      {/* ── CARD 2: dettaglio sigilli (appare con la luce) ─────── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 130,
        opacity: card2Opacity,
        transform: `translateY(${card2Y}px)`,
        maxWidth: 600,
      }}>
        <div style={{ borderLeft: `4px solid ${COLORS.rossoVescovile}`, paddingLeft: 20 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 22,
            fontStyle: 'italic', color: COLORS.biancoCalce,
            lineHeight: 1.6, margin: 0,
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
          }}>
            "Ogni sigillo di cera custodisce un nome, una data,
            una decisione che ha cambiato le sorti di Lacedonia."
          </p>
        </div>
      </div>

      <ParticleField count={35} opacity={0.22} mode="polvere" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

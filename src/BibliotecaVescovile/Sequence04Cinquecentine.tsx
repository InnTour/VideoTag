import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq04 — Cinquecentine & 1799 (~15s · 450 frame)
//
// ORDINE IMMAGINI (segue la narrazione):
//   [0  → 200] Biblioteca (image_5d27520e) — luce dorata sui volumi
//   [200 → 310] Cross-dissolve biblioteca → giacobini B&W (il pericolo)
//   [310 → 410] Cross-dissolve giacobini → romanzi (il vescovo protegge)
//
// Counter 60 volumi · Date reveal 1799 · Card vescovo Romanzi
// ──────────────────────────────────────────────────────────────

export const Sequence04Cinquecentine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Dissolve 1: biblioteca → giacobini ───────────────────────
  const dissolve1 = interpolate(frame, [200, 310], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Dissolve 2: giacobini → romanzi ──────────────────────────
  const dissolve2 = interpolate(frame, [310, 410], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza ──────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── Counter: 0 → 60 volumi ───────────────────────────────────
  const volCounter = Math.round(interpolate(frame, [40, 180], [0, 60], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEntrance = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]) *
    interpolate(frame, [190, 230], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── Card cinquecentine ───────────────────────────────────────
  const card1Entrance = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 180 } });
  const card1Opacity = interpolate(card1Entrance, [0, 1], [0, 1]) *
    interpolate(frame, [190, 240], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Y = interpolate(card1Entrance, [0, 1], [18, 0]);

  // ── Overlay "pericolo" per la scena giacobina ─────────────────
  const pericoloIntensity = interpolate(frame, [300, 360, 410, 430], [0, 0.28, 0.28, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Flash bianco all'arrivo dei giacobini ─────────────────────
  const flashOpacity = interpolate(frame, [198, 202, 210], [0, 0.30, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Date reveal "1799" ────────────────────────────────────────
  const dateReveal = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 200 } });
  const dateOpacity = interpolate(dateReveal, [0, 1], [0, 1]) *
    interpolate(frame, [400, 440], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dateY = interpolate(dateReveal, [0, 1], [24, 0]);

  // ── Card vescovo Romanzi ─────────────────────────────────────
  const romanziEntrance = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 170 } });
  const romanziOpacity = interpolate(romanziEntrance, [0, 1], [0, 1]);
  const romanziY = interpolate(romanziEntrance, [0, 1], [22, 0]);

  // ── Spotlight sul vescovo ─────────────────────────────────────
  const vescSpotOpacity = interpolate(frame, [330, 400], [0, 0.20], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Biblioteca dorata (cinquecentine) ──────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve1 }}>
        <KenBurnsImage src={IMAGES.biblioteca} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>

      {/* ── STRATO 2: Giacobini B&W (1799) ───────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve1 * (1 - dissolve2) }}>
        <KenBurnsImage src={IMAGES.giacobini} motion="pan-right" intensity={0.04} objectPosition="center center" />
      </div>

      {/* ── STRATO 3: Vescovo Romanzi (la protezione) ────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve2 }}>
        <KenBurnsImage src={IMAGES.romanzi} motion="zoom-out" intensity={0.05} objectPosition="center top" />
      </div>

      {/* ── Overlay bitonale ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.50) 52%, rgba(10,8,4,0.12) 100%)',
          'linear-gradient(to top, rgba(10,8,4,0.80) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* ── Tono caldo oro sulla biblioteca ──────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,152,48,0.12)',
        mixBlendMode: 'overlay',
        opacity: 1 - dissolve1,
      }} />

      {/* ── Tono rosso pericolo giacobini ─────────────────────────── */}
      {pericoloIntensity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `rgba(139,26,26,${pericoloIntensity})`,
          mixBlendMode: 'multiply',
        }} />
      )}

      {/* ── Flash bianco all'arrivo dei giacobini ─────────────────── */}
      {flashOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,240,1)',
          opacity: flashOpacity,
        }} />
      )}

      {/* ── Spotlight vescovo (scena romanzi) ─────────────────────── */}
      <SpotlightEffect x={60} y={40} radius={320} color="#D4A843" opacity={vescSpotOpacity} pulse />

      {/* ── TITOLO SEQUENZA ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEntrance }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.22em',
          color: COLORS.oroAntico, textTransform: 'uppercase', marginBottom: 8,
        }}>Cinquecentine & Seicentine · 1799</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.oroAntico}, transparent)` }} />
      </div>

      {/* ── COUNTER "60 volumi" ────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 148, opacity: counterOpacity }}>
        <div style={{
          background: 'rgba(10,8,4,0.82)', backdropFilter: 'blur(16px)',
          border: `1px solid rgba(200,152,48,0.25)`,
          borderRadius: 4, padding: '16px 26px',
          display: 'flex', alignItems: 'flex-end', gap: 8,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 96, fontWeight: 700,
            color: COLORS.oroAntico, lineHeight: 1,
          }}>{volCounter}</span>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 17,
            color: COLORS.biancoCalce, opacity: 0.78,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            paddingBottom: 8,
          }}>volumi XVI–XVII sec</div>
        </div>
      </div>

      {/* ── CARD cinquecentine ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 310,
        opacity: card1Opacity,
        transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.84)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,152,48,0.25)`,
          borderLeft: `5px solid ${COLORS.oroAntico}`,
          borderRadius: 4, padding: '20px 28px', maxWidth: 500,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroAntico, letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>📖 Sopravvissuti a Secoli di Storia</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 22,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Resistiti a invasioni, terremoti e<br />
            <em style={{ color: COLORS.pergamena }}>alle stesse mani che avrebbero voluto bruciarli</em>
          </div>
        </div>
      </div>

      {/* ── DATE REVEAL "1799" ────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: dateOpacity,
        transform: `translateY(${dateY}px)`,
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 110, fontWeight: 700,
          color: COLORS.rossoVescovile, lineHeight: 1,
          textShadow: '0 2px 30px rgba(139,26,26,0.60)',
        }}>1799</div>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontSize: 26,
          color: COLORS.biancoCalce, opacity: 0.85,
          letterSpacing: '0.10em', textTransform: 'uppercase',
          marginTop: 4,
        }}>La Minaccia Giacobina</div>
      </div>

      {/* ── CARD Vescovo Romanzi ──────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 310,
        opacity: romanziOpacity,
        transform: `translateY(${romanziY}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(212,168,67,0.30)`,
          borderLeft: `5px solid #D4A843`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 540,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: '#D4A843', letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>⛪ Il Vescovo Custode</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 40,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Vescovo Romanzi</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 22,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Protesse Lacedonia e i suoi tesori<br />
            dagli sconvolgimenti <em style={{ color: COLORS.pergamena }}>giacobini del 1799</em>
          </div>
        </div>
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

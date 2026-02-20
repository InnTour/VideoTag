import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq03 — L'Encyclopédie (~16s · 480 frame)
// Il tesoro più raro: Diderot & d'Alembert · 30 volumi · XVIII sec
// Cross-dissolve: volumi1 → volumi2 (open books in showcase)
// Cards in cascata · Ghost "ENCYCLOPÉDIE" · Spotlight dorato
// ──────────────────────────────────────────────────────────────

export const Sequence03Encyclopedie: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve: volumi1 → volumi2 ────────────────────────
  const dissolve = interpolate(frame, [240, 360], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza ──────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });
  const titleOpacity = titleEntrance;

  // ── Spotlight sui libri — diventa più intenso con dissolve ───
  const spotOpacity = interpolate(frame, [30, 90], [0, 0.18], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Card 1: Il tesoro più raro ───────────────────────────────
  const card1Entrance = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const card1Opacity = interpolate(card1Entrance, [0, 1], [0, 1]);
  const card1Y = interpolate(card1Entrance, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [230, 280], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Counter 0 → 30 volumi ────────────────────────────────────
  const volCounter = Math.round(interpolate(frame, [50, 200], [0, 30], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEntrance = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 180 } });
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]);
  const counterFade = interpolate(frame, [240, 290], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Card 2: dettaglio enciclopedia (appare con il dissolve) ──
  const card2Entrance = spring({ frame: Math.max(0, frame - 350), fps, config: { damping: 180 } });
  const card2Opacity = interpolate(card2Entrance, [0, 1], [0, 1]);
  const card2Y = interpolate(card2Entrance, [0, 1], [20, 0]);

  // ── Ghost "ENCYCLOPÉDIE" ─────────────────────────────────────
  const ghostOpacity = interpolate(frame, [0, 60, 240, 300], [0, 0.07, 0.07, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Anno ghost XVIII sec ─────────────────────────────────────
  const yearGhostOpacity = interpolate(dissolve, [0, 0.5, 1], [0, 0.10, 0.07]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Libri in teche espositive ───────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.volumi1} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>

      {/* ── STRATO 2: Teca aperta con enciclopedia ────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.volumi2} motion="pan-right" intensity={0.04} objectPosition="center center" />
      </div>

      {/* ── Overlay bitonale ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.92) 0%, rgba(10,8,4,0.52) 50%, rgba(10,8,4,0.14) 100%)',
          'linear-gradient(to top, rgba(10,8,4,0.75) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* ── Tono oro/seppia sui libri antichi ─────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,152,48,0.10)',
        mixBlendMode: 'overlay',
      }} />

      {/* ── Spotlight sui preziosi volumi ─────────────────────── */}
      <SpotlightEffect x={65} y={48} radius={300} color={COLORS.oroAntico} opacity={spotOpacity} pulse />

      {/* ── Ghost "ENCYCLOPÉDIE" ─────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 190, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.oroAntico,
        opacity: ghostOpacity,
        letterSpacing: '0.03em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>ENCYCLOPÉDIE</div>

      {/* ── Ghost anno "XVIII" ───────────────────────────────── */}
      <div style={{
        position: 'absolute', right: 80, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 140, fontWeight: 700,
        color: COLORS.oroAntico, opacity: yearGhostOpacity,
        pointerEvents: 'none', writingMode: 'vertical-rl',
        letterSpacing: '0.08em',
      }}>XVIII SEC</div>

      {/* ── TITOLO SEQUENZA ─────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleOpacity }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 14, letterSpacing: '0.22em',
          color: COLORS.oroAntico, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Tesoro Più Raro · L'Encyclopédie</div>
        <div style={{ width: 300, height: 2, background: `linear-gradient(to right, ${COLORS.oroAntico}, transparent)` }} />
      </div>

      {/* ── CARD 1: Il tesoro più raro ────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: card1Opacity * card1Fade,
        transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(200,152,48,0.28)`,
          borderLeft: `5px solid ${COLORS.oroAntico}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 11,
            color: COLORS.oroAntico, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>📚 Il Pezzo di Punta</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 36,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Diderot & d'Alembert</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Edizione completa del <em style={{ color: COLORS.oroAntico }}>XVIII secolo</em> —<br />
            in lingua francese originale
          </div>
        </div>
      </div>

      {/* ── COUNTER "30 volumi" ──────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 400,
        opacity: counterOpacity * counterFade,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.82)', backdropFilter: 'blur(16px)',
          border: `1px solid rgba(200,152,48,0.22)`,
          borderRadius: 4, padding: '14px 24px',
          display: 'flex', alignItems: 'flex-end', gap: 10,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 68, fontWeight: 700,
            color: COLORS.oroAntico, lineHeight: 1,
          }}>{volCounter}</span>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.biancoCalce, opacity: 0.78,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            paddingBottom: 8,
          }}>volumi originali</div>
        </div>
      </div>

      {/* ── CARD 2: La rarità dell'edizione ──────────────────── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: card2Opacity,
        transform: `translateY(${card2Y}px)`,
        maxWidth: 640,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.88)', backdropFilter: 'blur(22px)',
          border: `1px solid rgba(200,152,48,0.25)`,
          borderRadius: 4, padding: '20px 28px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 13,
            color: COLORS.oroAntico, letterSpacing: '0.15em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>Rarità Assoluta</div>

          {/* Mini-datapoint row */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { val: '30', label: 'Volumi' },
              { val: 'XVII–XVIII', label: 'Secolo' },
              { val: 'Francese', label: 'Lingua originale' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 28, fontWeight: 700, color: COLORS.oroAntico,
                }}>{item.val}</div>
                <div style={{
                  fontFamily: 'Lato, sans-serif', fontSize: 13,
                  color: COLORS.biancoCalce, opacity: 0.72,
                  letterSpacing: '0.08em',
                }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ParticleField count={30} opacity={0.20} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq05 — Il Miracolo di San Gerardo (~15.0s · 450 frame) ─────────
// I murales in ceramica sulla facciata · il demonio sconfitto · le feste di giugno

export const Sequence05SanGerardoMiracolo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [140, 250], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Flash luce divina al momento del miracolo
  const divineFlash = interpolate(frame, [30, 33, 50], [0, 0.55, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 180 } });

  const auraGlow = Math.sin(frame / 22) * 0.08 + 0.18;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Layer 1 — Murales ceramica (facciata) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.interno} motion="zoom-in" intensity={0.06} objectPosition="center 40%" />
      </div>
      {/* Layer 2 — San Gerardo scena soprannaturale */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.gerardo} motion="zoom-out" intensity={0.05} objectPosition="center center" />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.50) 55%, rgba(8,8,12,0.10) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.75) 100%)' }} />

      {/* Aura dorata pulsante — la presenza del Santo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 700px 500px at 68% 45%, rgba(240,208,96,${auraGlow}), transparent 70%)`,
        mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
      }} />

      {/* Flash luce divina */}
      {divineFlash > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: `rgba(240,230,180,${divineFlash})`, mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }} />
      )}

      {/* Ghost word — MIRACOLO */}
      <div style={{ position: 'absolute', top: 0, right: 40, writingMode: 'vertical-rl', fontFamily: 'Playfair Display, serif', fontSize: 110, fontWeight: 700, color: COLORS.lightningGold, opacity: 0.07, pointerEvents: 'none', lineHeight: 1 }}>MIRACOLO</div>

      {/* Card 1 — I murales */}
      <div style={{
        position: 'absolute', left: 72, top: 120,
        opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.82)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,208,96,0.30)`, padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.lightningGold, marginBottom: 10 }}>Murales in ceramica · Facciata esterna</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il <strong style={{ color: COLORS.lightningGold }}>miracolo di San Gerardo</strong><br />
          è immortalato sulla facciata<br />
          nelle maioliche che resistono ai secoli.
        </div>
      </div>

      {/* Card 2 — Il demonio sconfitto */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(58,122,154,0.28)`, padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il giovane fratello laico,<br />
          in preghiera sotto la volta di questa cappella,<br />
          <em style={{ color: COLORS.azzurroCielo }}>sconfigge le forze del male con la fede.</em>
        </div>
      </div>

      {/* Card 3 — Celebrazioni di giugno */}
      <div style={{
        position: 'absolute', left: 72, bottom: 70,
        opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(200,152,48,0.22)`, padding: '18px 26px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.oroVescovile, marginBottom: 8 }}>Ogni giugno · Fede e tradizione popolare</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          La comunità si raccoglie qui per celebrare<br />
          tra devozione, <em style={{ color: COLORS.oroVescovile }}>giochi e canti antichi</em>.
        </div>
      </div>

      <ParticleField count={30} opacity={0.26} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq02 — Laterano (~14.3s · 430 frame) ──────────────────────
// 1503 · Giovanni Giacomo di Muro · San Giovanni in Laterano · Portale

export const Sequence02Laterano: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [140, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 240), fps, config: { damping: 160 } });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.laterano} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.veduta} motion="pan-left" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Ghost anno */}
      <div style={{
        position: 'absolute', top: 0, right: 50, writingMode: 'vertical-rl',
        fontFamily: 'Playfair Display, serif', fontSize: 220, fontWeight: 700,
        color: COLORS.oroAntico, opacity: 0.07, pointerEvents: 'none', lineHeight: 1,
      }}>1503</div>

      <div style={{
        position: 'absolute', left: 72, top: 120,
        opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(200,152,48,0.28)`, padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroAntico, marginBottom: 10 }}>Edificata nel 1503</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il sacerdote <strong style={{ color: COLORS.oroAntico }}>Giovanni Giacomo di Muro</strong><br />
          dona il terreno — "Solo Lateranense" —<br />
          alla Basilica di San Giovanni in Laterano.
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(42,96,128,0.28)`, padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.acquaBlu, marginBottom: 8 }}>Il Portale</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Travertino romanico con l'<strong style={{ color: COLORS.acquaBlu }}>insegna della Basilica Lateranense</strong>.<br />
          Ancora visibile dopo 500 anni.
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 72, bottom: 80,
        opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(200,152,48,0.22)`, padding: '18px 26px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Sull'altare maggiore: la <em style={{ color: COLORS.oroAntico }}>Tela della Visitazione</em>.<br />
          Sopravvissuta ai terremoti del 1930 e del 1980.
        </div>
      </div>

      <ParticleField count={32} opacity={0.26} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

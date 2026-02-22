import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq05 — Il Grande Ritorno (~10.0s · 300 frame) ─────────────────
// 16 agosto: gli emigranti tornano a Lacedonia · la festa di San Rocco

export const Sequence05GrandeRitorno: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [90, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1 = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 160 } });

  const festaPulse = Math.sin(frame / 20) * 0.06 + 0.14;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Layer 1 — chiesa / emigrazione */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.emigrazione} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>
      {/* Layer 2 — festa processione */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.festa} motion="pan-left" intensity={0.05} objectPosition="center center" />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.50) 55%, rgba(8,8,12,0.10) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.75) 100%)' }} />

      {/* Calore della festa */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 700px 450px at 55% 50%, rgba(232,112,48,${festaPulse}), transparent 70%)`,
      }} />

      {/* Ghost "16 AGOSTO" */}
      <div style={{ position: 'absolute', top: 0, right: 40, writingMode: 'vertical-rl', fontFamily: 'Lato, sans-serif', fontSize: 100, fontWeight: 700, color: COLORS.gialloFesta, opacity: 0.07, pointerEvents: 'none', letterSpacing: '0.04em' }}>16 AGOSTO</div>

      {/* Card 1 — Il Grande Ritorno */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.82)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,192,64,0.30)`, padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: COLORS.gialloFesta, marginBottom: 10 }}>16 Agosto · Il Grande Ritorno</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Dall'<strong style={{ color: COLORS.gialloFesta }}>America, dall'Australia, dalla Germania</strong>:<br />
          una volta l'anno, Lacedonia<br />
          si riempie di chi non ha dimenticato.
        </div>
      </div>

      {/* Card 2 — La promessa mantenuta */}
      <div style={{
        position: 'absolute', left: 72, bottom: 100,
        opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(212,168,67,0.25)`, padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Campane, fuochi, canti antichi:<br />
          <em style={{ color: COLORS.oroSanto }}>San Rocco unisce chi è partito<br />e chi è rimasto.</em>
        </div>
      </div>

      <ParticleField count={35} opacity={0.28} mode="ritorno" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq02 — Il Santo (~19.7s · 590 frame) ──────────────────────

export const Sequence02IlSanto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 160 } });
  const card4 = spring({ frame: Math.max(0, frame - 430), fps, config: { damping: 160 } });

  const ghostOp = Math.sin(frame / 55) * 0.01 + 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.sanrocco} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      <div style={{ position: 'absolute', top: 0, right: 50, writingMode: 'vertical-rl', fontFamily: 'Playfair Display, serif', fontSize: 200, fontWeight: 700, color: COLORS.oroSanto, opacity: ghostOp, pointerEvents: 'none', lineHeight: 1 }}>XIV</div>

      <div style={{ position: 'absolute', left: 72, top: 110, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSanto, marginBottom: 10 }}>San Rocco · XIV secolo</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Pellegrino francese che curava i malati<br />
          durante la <strong style={{ color: COLORS.rossoPeste }}>Grande Peste</strong>.<br />
          Si ammalò lui stesso, guarì per miracolo.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 340, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(139,26,26,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.rossoPeste, marginBottom: 8 }}>Il cane fedele</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Un cane gli portava il pane quando giaceva ammalato.<br />
          <em style={{ color: COLORS.oroSanto }}>Ancora oggi lo troviamo al suo fianco</em> nella statua.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 190, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(26,74,122,0.28)`, padding: '18px 26px', maxWidth: 480 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.azzurroOceano, marginBottom: 8 }}>Patrono degli emigranti</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Chi parte per terre lontane lo porta nel cuore.<br />
          <em style={{ color: COLORS.azzurroOceano }}>Protegge chi è in cammino.</em>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 60, opacity: interpolate(card4, [0, 1], [0, 1]), transform: `translateY(${interpolate(card4, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 30, color: COLORS.oroSanto, borderLeft: `4px solid ${COLORS.oroSanto}`, paddingLeft: 24, maxWidth: 560 }}>
          La chiesa fu eretta nel XVI secolo, dopo un'epidemia che decimò il paese.
        </div>
      </div>

      <ParticleField count={32} opacity={0.25} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq04 — La Statua (~15.0s · 450 frame) ─────────────────────

export const Sequence04LaStatua: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 160 } });

  // Spotlight radiale pulsante sulla statua
  const spotPulse = Math.sin(frame / 26) * 0.05 + 0.15;
  const spotR = Math.sin(frame / 40) * 30 + 320;

  // Ghost "SEICENTO" rotated
  const ghostOp = Math.sin(frame / 45) * 0.01 + 0.07;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.statua} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Spotlight radiale sulla statua */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse ${spotR}px ${spotR * 0.7}px at 68% 38%, rgba(212,168,67,${spotPulse}), transparent 70%)` }} />

      {/* Ghost SEICENTO rotated */}
      <div style={{
        position: 'absolute', top: '30%', right: 80,
        fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 120, fontWeight: 700,
        color: COLORS.avorioCarta, opacity: ghostOp, pointerEvents: 'none',
        transform: 'rotate(90deg)', transformOrigin: 'center center',
        whiteSpace: 'nowrap',
      }}>SEICENTO</div>

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSacro, marginBottom: 10 }}>La statua lignea del '600</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Intagliata nel <strong style={{ color: COLORS.oroSacro }}>XVII secolo</strong>, custodisce<br />
          tutta l'arte devozionale dell'epoca barocca.<br />
          Il Santo con il piviale dorato e il bastone.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 240, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(240,192,64,0.25)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.gialloFesta, marginBottom: 8 }}>6 dicembre — La festa</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il giorno di San Nicola,<br />
          campane, dolci tipici e processione:<br />
          <em style={{ color: COLORS.gialloFesta }}>Lacedonia onora il suo patrono.</em>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 90, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)` }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 28, color: COLORS.oroSacro, borderLeft: `4px solid ${COLORS.oroSacro}`, paddingLeft: 24, maxWidth: 580 }}>
          Ogni anno le stesse campane,<br />la stessa statua, la stessa devozione.
        </div>
      </div>

      <ParticleField count={32} opacity={0.26} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq03 — L'Altare (~18.7s · 560 frame) ──────────────────────

export const Sequence03Altare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [170, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 310), fps, config: { damping: 160 } });

  // Counter 1800→1856
  const counterVal = Math.round(interpolate(frame, [200, 380], [1800, 1856], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOp = interpolate(frame, [190, 230], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Glow marmo rosso
  const marmoGlow = Math.sin(frame / 30) * 0.04 + 0.10;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.altare} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.exVoto} motion="pan-right" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 500px 350px at 65% 42%, rgba(155,42,42,${marmoGlow}), transparent 70%)` }} />

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(155,42,42,0.30)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.marmoRosso, marginBottom: 10 }}>Altare in marmo rosso</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Marmo rosso pregiato, donato nel<br />
          <strong style={{ color: COLORS.marmoRosso }}>{counterOp > 0.5 ? counterVal : '···'}</strong>{counterOp > 0.5 ? '' : ''} — una testimonianza<br />
          di devozione e signoria.
        </div>
      </div>

      {counterOp > 0 && (
        <div style={{ position: 'absolute', right: 180, top: 180, opacity: counterOp, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 108, fontWeight: 700, color: COLORS.marmoRosso, lineHeight: 1, textShadow: `0 0 40px rgba(155,42,42,0.45)` }}>{counterVal}</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.pietraChiara, marginTop: 8 }}>anno della donazione</div>
        </div>
      )}

      <div style={{ position: 'absolute', left: 72, bottom: 220, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(200,152,48,0.25)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.oroVescovile, marginBottom: 8 }}>Lo stemma della Cicogna</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Scolpito nell'altare — araldica signorile<br />
          che lega questa cappella alla <em style={{ color: COLORS.oroVescovile }}>Chiesa di San Nicola</em>.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 80, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(155,42,42,0.22)`, padding: '18px 26px', maxWidth: 480 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          L'altare fu trasferito qui nel 1856<br />
          dalla <em style={{ color: COLORS.marmoRosso }}>vicina chiesa di San Nicola</em><br />
          — un passaggio tra fratelli.
        </div>
      </div>

      <ParticleField count={28} opacity={0.24} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

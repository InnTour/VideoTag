import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq03 — La Devozione (~15.7s · 470 frame) ──────────────────

export const Sequence03LaDevozione: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [140, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 160 } });

  // Counter 1700→1746
  const counterVal = Math.round(interpolate(frame, [130, 280], [1700, 1746], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOp = interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.navata} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.affresco} motion="pan-left" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Counter anno */}
      {counterOp > 0 && (
        <div style={{ position: 'absolute', right: 140, top: 140, opacity: counterOp, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 88, fontWeight: 700, color: COLORS.oroSacro, lineHeight: 1, textShadow: `0 0 40px rgba(212,168,67,0.40)` }}>{counterVal}</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.avorioCarta, marginTop: 8 }}>Congrega fondata</div>
        </div>
      )}

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSacro, marginBottom: 10 }}>1746 · Padri Liguorini</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          I Padri Liguorini istituiscono qui<br />
          la <strong style={{ color: COLORS.oroSacro }}>Congrega dell'Immacolata Concezione</strong>:<br />
          la devozione si organizza e si tramanda.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 240, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(155,42,42,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.rossoMarmo, marginBottom: 8 }}>L'altare della Cicogna</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          L'altare in marmo rosso con lo <strong style={{ color: COLORS.rossoMarmo }}>Stemma della Cicogna</strong><br />
          fu trasferito nel 1856 alla <em style={{ color: COLORS.oroSacro }}>Cappella Trinità</em> —<br />
          legame indissolubile tra le due chiese.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 90, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.22)`, padding: '18px 26px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 21, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          La navata centrale: luce che filtra, profumo d'incenso,<br />
          <em style={{ color: COLORS.avorioCarta }}>generazioni di fedeli che pregano la stessa preghiera.</em>
        </div>
      </div>

      <ParticleField count={28} opacity={0.22} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

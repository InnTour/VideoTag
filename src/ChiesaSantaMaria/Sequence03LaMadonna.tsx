import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq03 — La Madonna (~11.3s · 340 frame) ────────────────────
// 1840: terme romane sotto la chiesa · Aprile 1948: il pianto

export const Sequence03LaMadonna: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [120, 220], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Flash lacrime — momento del miracolo
  const flashOpacity = interpolate(frame, [130, 136, 150], [0, 0.40, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const card1 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 180 } });

  const lacrimePulse = Math.sin(frame / 22) * 0.04 + 0.12;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.vescovi} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.madonna} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.54) 50%, rgba(8,8,12,0.14) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Glow lacrime blu */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 500px 350px at 68% 42%, rgba(26,58,107,${lacrimePulse}), transparent 70%)`,
        opacity: dissolve,
      }} />

      {flashOpacity > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: COLORS.argento, opacity: flashOpacity }} />
      )}

      {/* Card 1 — Terme romane */}
      <div style={{
        position: 'absolute', left: 72, top: 120,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(212,160,48,0.25)`,
        padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: COLORS.oroMedievale, marginBottom: 10,
        }}>1840 — La scoperta</div>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 23,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Sotto la chiesa vengono scoperte<br />
          <strong style={{ color: COLORS.oroMedievale }}>terme romane con mosaici</strong>.<br />
          La stratificazione si svela dal basso.
        </div>
      </div>

      {/* Card 2 — Il pianto */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(192,200,212,0.28)`,
        padding: '20px 28px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: COLORS.argento, marginBottom: 8,
        }}>Aprile 1948 — Il miracolo</div>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 23,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          La statua della <strong style={{ color: COLORS.argento }}>Madonna Addolorata</strong><br />
          muove gli occhi e piange.<br />
          Migliaia di pellegrini accorrono.
        </div>
      </div>

      {/* Card 3 — La conclusione */}
      <div style={{
        position: 'absolute', left: 72, bottom: 80,
        opacity: interpolate(card3, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card3, [0, 1], [20, 0])}px)`,
        fontFamily: 'Georgia, serif', fontStyle: 'italic',
        fontSize: 30, color: COLORS.oroMedievale,
        borderLeft: `4px solid ${COLORS.oroMedievale}`,
        paddingLeft: 24,
        textShadow: '0 0 30px rgba(212,168,67,0.25)',
      }}>
        Duemila anni di fede ininterrotta.
      </div>

      <ParticleField count={28} opacity={0.22} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

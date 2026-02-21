import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq05 — Il Seicento Vivo (~10.0s · 300 frame) ───────────────────
// Zoom sul viso della statua lignea · quattro secoli di sguardo sul borgo

export const Sequence05IlSeicentoVivo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 160 } });

  // Luce sacra pulsante intorno al viso
  const aureola = Math.sin(frame / 25) * 0.06 + 0.16;
  const ghostOp = Math.sin(frame / 50) * 0.01 + 0.07;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Zoom sul viso della statua — objectPosition "center 15%" focalizza il capo */}
      <KenBurnsImage src={IMAGES.affresco} motion="zoom-in" intensity={0.06} objectPosition="center 15%" />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.50) 55%, rgba(8,8,12,0.10) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.78) 100%)' }} />

      {/* Aureola pulsante */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 500px 420px at 68% 22%, rgba(212,168,67,${aureola}), transparent 65%)`,
        mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
      }} />

      {/* Ghost "SEICENTO" verticale */}
      <div style={{ position: 'absolute', top: 0, right: 50, writingMode: 'vertical-rl', fontFamily: 'Playfair Display, serif', fontSize: 110, fontWeight: 700, color: COLORS.oroSacro, opacity: ghostOp, pointerEvents: 'none', lineHeight: 1 }}>SEICENTO</div>

      {/* Card 1 — La statua lignea */}
      <div style={{
        position: 'absolute', left: 72, top: 130,
        opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.82)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(212,168,67,0.30)`, padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: COLORS.oroSacro, marginBottom: 10 }}>Statua lignea · XVII secolo</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Questo sguardo osserva Lacedonia<br />
          da <strong style={{ color: COLORS.oroSacro }}>quattrocento anni</strong>.<br />
          Intagliato nel Seicento, immobile nella fede.
        </div>
      </div>

      {/* Card 2 — La continuità */}
      <div style={{
        position: 'absolute', left: 72, bottom: 100,
        opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(26,74,122,0.28)`, padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Terremoti, silenzi, fedeli generazioni:<br />
          <em style={{ color: COLORS.azzurroNicola }}>San Nicola è rimasto.</em>
        </div>
      </div>

      <ParticleField count={25} opacity={0.22} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

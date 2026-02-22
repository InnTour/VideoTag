import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq03 — La Chiesa (~19.3s · 580 frame) ─────────────────────

export const Sequence03LaChiesa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [170, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 160 } });

  // Mete badge emigranti
  const mete = ['America', 'Australia', 'Germania'];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.emigrazione} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.sanrocco} motion="pan-left" intensity={0.05} objectPosition="center top" />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSanto, marginBottom: 10 }}>Il Grande Esodo</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Tra gli anni '<strong style={{ color: COLORS.oroSanto }}>50</strong> e '<strong style={{ color: COLORS.oroSanto }}>60</strong>, centinaia di lacedonesi<br />
          lasciano il paese in cerca di lavoro.<br />
          San Rocco li accompagna nel cuore.
        </div>
      </div>

      {/* Badge mete */}
      <div style={{ position: 'absolute', left: 72, bottom: 320, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {mete.map((m, i) => {
          const meteBadge = spring({ frame: Math.max(0, frame - (120 + i * 40)), fps, config: { damping: 180 } });
          return (
            <div key={i} style={{
              opacity: meteBadge, transform: `scale(${interpolate(meteBadge, [0, 1], [0.7, 1])})`,
              background: COLORS.azzurroOceano, padding: '6px 18px', borderRadius: 20,
              fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 18, color: COLORS.biancoCalce,
            }}>{m}</div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 210, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(26,74,122,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.azzurroOceano, marginBottom: 8 }}>La promessa</div>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 28, color: COLORS.oroSanto, lineHeight: 1.55 }}>
          "Se troverò fortuna,<br />contribuirò al restauro."
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 80, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.22)`, padding: '18px 26px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Anni 2000: un <strong style={{ color: COLORS.oroSanto }}>nuovo altare</strong> viene finanziato<br />
          dagli emigranti che mantennero la promessa.
        </div>
      </div>

      <ParticleField count={30} opacity={0.24} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

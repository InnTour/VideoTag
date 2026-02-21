import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq04 — Strati Storici (~13.0s · 390 frame) ────────────────
// Stratificazione storica · collegamento A2.09 · resilienza

export const Sequence04Strati: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [110, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const strati = [
    { anno: '30 a.C.', label: 'Tempio di Iside', color: '#C8781A', delay: 15 },
    { anno: '300 d.C.', label: 'Prima basilica', color: '#D4A030', delay: 55 },
    { anno: '1059', label: 'Diocesi — Santa Maria Cancellata', color: '#C89830', delay: 95 },
    { anno: '1503', label: 'Chiesa della Consolazione', color: COLORS.acquaBlu, delay: 135 },
    { anno: '1930 / 1980', label: 'Terremoti · Sopravvissuta', color: COLORS.sirenoTeal, delay: 175 },
  ];

  const ghostOp = Math.sin(frame / 50) * 0.01 + 0.07;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.veduta} motion="zoom-out" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.laterano} motion="pan-right" intensity={0.04} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif', fontSize: 220, fontWeight: 700,
        color: COLORS.oroAntico, opacity: ghostOp, pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>SPERANZA</div>

      {/* Titolo sezione */}
      <div style={{
        position: 'absolute', left: 72, top: 80,
        fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: COLORS.oroAntico,
        opacity: spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } }),
      }}>Stratificazione Storica · Contrada della Consolazione</div>

      {/* Strati verticali */}
      <div style={{ position: 'absolute', left: 72, top: 130, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {strati.map((s, i) => {
          const barProgress = spring({ frame: Math.max(0, frame - s.delay), fps, config: { damping: 160, stiffness: 100 } });
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 18,
              opacity: barProgress,
              transform: `translateX(${interpolate(barProgress, [0, 1], [-30, 0])}px)`,
            }}>
              <div style={{
                width: interpolate(barProgress, [0, 1], [0, 220]), height: 6,
                background: s.color, borderRadius: 3,
                boxShadow: `0 0 10px ${s.color}44`,
                minWidth: 0, transition: 'none',
              }} />
              <div>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: s.color }}>{s.anno}</span>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 22, fontWeight: 300, color: COLORS.biancoCalce, marginLeft: 12, opacity: 0.88 }}>{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card conclusiva */}
      <div style={{
        position: 'absolute', left: 72, bottom: 80,
        opacity: spring({ frame: Math.max(0, frame - 270), fps, config: { damping: 160 } }),
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(26,122,106,0.28)`, padding: '20px 28px', maxWidth: 560,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          La stessa terra ha visto Iside, Cristo,<br />
          vescovi e contadini. <em style={{ color: COLORS.sirenoTeal }}>La Consolazione</em><br />
          è tutto questo insieme.
        </div>
      </div>

      <ParticleField count={28} opacity={0.22} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

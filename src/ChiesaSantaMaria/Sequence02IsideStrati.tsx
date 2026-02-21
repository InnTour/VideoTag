import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq02 — Iside & Strati (~11.3s · 340 frame) ────────────────
// Tempio di Iside · 30 a.C. · Colonne corinzie originali · Strati

export const Sequence02IsideStrati: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const d1 = interpolate(frame, [60, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2 = interpolate(frame, [180, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 160 } });

  const ghostOp = Math.sin(frame / 55) * 0.01 + 0.06;

  const strati = [
    { anno: '30 a.C.', label: 'Tempio di Iside', color: COLORS.ambraEgizia },
    { anno: '300 d.C.', label: 'Basilica cristiana', color: COLORS.oroEgizio },
    { anno: '1059', label: 'Sede vescovile', color: COLORS.oroMedievale },
    { anno: '1705', label: 'Diocesi trasferita', color: COLORS.argento },
    { anno: 'Oggi', label: 'Fede ininterrotta', color: COLORS.verdeInnTour },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, 1 - d1 * 2 + d2) }}>
        <KenBurnsImage src={IMAGES.iside1} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, d1 * 2) * (1 - d2) }}>
        <KenBurnsImage src={IMAGES.iside2} motion="pan-right" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, d2 * 2) }}>
        <KenBurnsImage src={IMAGES.ibrido} motion="zoom-out" intensity={0.05} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)',
      }} />

      <div style={{
        position: 'absolute', top: 0, right: 60,
        fontFamily: 'Playfair Display, serif', fontSize: 220, fontWeight: 700,
        color: COLORS.ambraEgizia, opacity: ghostOp, pointerEvents: 'none',
        lineHeight: 1, writingMode: 'vertical-rl',
      }}>ISIDE</div>

      {/* Card 1 — Tempio */}
      <div style={{
        position: 'absolute', left: 72, top: 120,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(200,120,26,0.28)`,
        padding: '22px 30px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: COLORS.ambraEgizia, marginBottom: 10,
        }}>La più antica chiesa del paese</div>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Sorge dove un tempo si elevava<br />
          un <strong style={{ color: COLORS.ambraEgizia }}>Tempio di Iside</strong> romano.<br />
          Le sue colonne corinzie sono ancora qui.
        </div>
      </div>

      {/* Card 2 — Timeline strati */}
      <div style={{
        position: 'absolute', left: 72, bottom: 80,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(212,160,48,0.22)`,
        padding: '20px 28px',
      }}>
        <div style={{ display: 'flex', gap: 28 }}>
          {strati.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: s.color, boxShadow: `0 0 8px ${s.color}`,
              }} />
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700,
                color: s.color,
              }}>{s.anno}</div>
              <div style={{
                fontFamily: 'Lato, sans-serif', fontSize: 12, fontWeight: 300,
                color: COLORS.biancoCalce, opacity: 0.80, textAlign: 'center', maxWidth: 90,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ParticleField count={30} opacity={0.25} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

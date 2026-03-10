/**
 * Seq03 — Il Commercio · Olio dalla Puglia · Grano dall'Irpinia
 * 310f / 10.3s — mercato medievale → olio Puglia cross-dissolve · cards commerce
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence03Commercio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelFade = interpolate(frame, [fps * 0.3, fps * 1.0], [0, 1], { extrapolateRight: 'clamp' });

  // Mercato → Olio Puglia
  const dissolve1 = interpolate(frame, [fps * 3.8, fps * 5.8], [0, 1], { extrapolateRight: 'clamp' });
  // Vita quotidiana — terzo layer finale
  const dissolve2 = interpolate(frame, [fps * 7.0, fps * 9.0], [0, 1], { extrapolateRight: 'clamp' });

  const card1Fade = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.5, fps * 1.5], [22, 0], { extrapolateRight: 'clamp' });
  const card2Fade = interpolate(frame, [fps * 4.5, fps * 5.8], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift = interpolate(frame, [fps * 4.5, fps * 5.8], [20, 0], { extrapolateRight: 'clamp' });

  // Ghost "COMMERCIO" verticale
  const ghostOp = interpolate(frame, [fps * 1.2, fps * 3.0], [0, 0.055], { extrapolateRight: 'clamp' });

  // Overlay terracotta — calore del commercio pugliese
  const terracottaOp = interpolate(frame, [fps * 3.8, fps * 6.0], [0, 0.12], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: mercato medievale animato */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, 1 - dissolve1) }}>
        <KenBurnsImage src={IMAGES.mercato} motion="zoom-in" intensity={0.04} objectPosition="center 45%" />
      </div>

      {/* Layer 2: olio di Puglia (cross-dissolve) */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, dissolve1) * Math.max(0, 1 - dissolve2) }}>
        <KenBurnsImage src={IMAGES.puglia} motion="pan-right" intensity={0.035} objectPosition="center 50%" />
      </div>

      {/* Layer 3: vita quotidiana pitturesca */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve2 }}>
        <KenBurnsImage src={IMAGES.vita} motion="pan-left" intensity={0.03} objectPosition="center 40%" />
      </div>

      {/* Overlay terracotta — richiamo al commercio pugliese */}
      <AbsoluteFill style={{
        background: `rgba(160,82,45,${terracottaOp})`,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} />

      <AbsoluteFill style={{
        background: 'linear-gradient(to right, rgba(10,8,4,0.87) 0%, rgba(10,8,4,0.50) 54%, rgba(10,8,4,0.18) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,4,0.55) 100%)',
      }} />

      {/* Ghost "COMMERCIO" verticale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 190, fontWeight: 700,
          color: COLORS.terracotta, writingMode: 'vertical-rl',
          textOrientation: 'mixed', userSelect: 'none', letterSpacing: '-0.02em',
        }}>COMMERCIO</span>
      </AbsoluteFill>

      <ParticleField mode="oro" opacity={0.17} count={28} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.terracotta, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.terracotta, textTransform: 'uppercase',
        }}>Il Commercio · Irpinia & Puglia</span>
      </div>

      {/* Card 1 — il crocevia */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(160,82,45,0.35)',
          borderRadius: 16,
          padding: '26px 34px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.terracotta,
            textTransform: 'uppercase', marginBottom: 12,
          }}>Il Crocevia dell'Irpinia</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 12,
          }}>La porta del commercio tra due mondi.</div>
          <div style={{
            fontFamily: LATO, fontSize: 23, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.60,
          }}>
            Da qui entrava l'<strong style={{ color: COLORS.biancoCalce }}>olio dalla Puglia</strong>.
            Da qui usciva il <strong style={{ color: COLORS.biancoCalce }}>grano dell'Irpinia</strong>.
            Lacedonia, borgо di confine, viveva di questi scambi.
          </div>
        </div>
      </div>

      {/* Card 2 — le merci */}
      <div style={{
        position: 'absolute', bottom: 120, left: 80,
        opacity: card2Fade, transform: `translateY(${card2Lift}px)`,
      }}>
        <div style={{
          display: 'flex', gap: 20,
        }}>
          {[
            { label: 'Dalla Puglia', value: 'Olio · Sale · Formaggio', color: COLORS.terracotta },
            { label: "Dall'Irpinia", value: 'Grano · Lana · Legname', color: COLORS.oroMercato },
            { label: 'Di Passaggio', value: 'Greggi · Pellegrini · Eserciti', color: COLORS.seppiaAntica },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(10,8,4,0.82)',
                backdropFilter: 'blur(16px)',
                border: `1px solid rgba(212,168,67,0.22)`,
                borderTop: `3px solid ${item.color}`,
                borderRadius: 12,
                padding: '16px 22px',
                flex: 1,
              }}
            >
              <div style={{
                fontFamily: LATO, fontSize: 13, fontWeight: 700,
                letterSpacing: '0.16em', color: item.color,
                textTransform: 'uppercase', marginBottom: 8,
              }}>{item.label}</div>
              <div style={{
                fontFamily: LATO, fontSize: 20, fontWeight: 400,
                color: COLORS.biancoCalce, lineHeight: 1.50,
              }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

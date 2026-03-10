/**
 * Seq02 — Storia · Gli Orsini · Il 1456 · Sant'Antonio Abate
 * 540f / 18s — stessa immagine pan-left · focus centrale · card storiche
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence02Storia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelFade = interpolate(frame, [fps * 0.4, fps * 1.0], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.6, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.6, fps * 1.5], [24, 0],  { extrapolateRight: 'clamp' });
  const card2Fade = interpolate(frame, [fps * 4.0, fps * 5.0], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift = interpolate(frame, [fps * 4.0, fps * 5.0], [20, 0],  { extrapolateRight: 'clamp' });
  const card3Fade = interpolate(frame, [fps * 9.0, fps * 10.2], [0, 1], { extrapolateRight: 'clamp' });
  const card3Lift = interpolate(frame, [fps * 9.0, fps * 10.2], [20, 0],  { extrapolateRight: 'clamp' });

  // Ghost "ORSINI" — la famiglia che la volle
  const ghostOp = interpolate(frame, [fps * 0.5, fps * 2], [0, 0.055], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Stessa immagine, pan-left per dare movimento diverso */}
      <KenBurnsImage src={IMAGES.porta} motion="pan-left" intensity={0.04} objectPosition="center 40%" />

      <AbsoluteFill style={{
        background: 'linear-gradient(to right, rgba(10,8,4,0.85) 0%, rgba(10,8,4,0.52) 58%, rgba(10,8,4,0.18) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(10,8,4,0.50) 100%)',
      }} />

      {/* Ghost "ORSINI" verticale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 200, fontWeight: 700,
          color: COLORS.oroOrsini, writingMode: 'vertical-rl',
          textOrientation: 'mixed', userSelect: 'none', letterSpacing: '-0.02em',
        }}>ORSINI</span>
      </AbsoluteFill>

      <ParticleField mode="oro" opacity={0.16} count={28} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.oroOrsini, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.oroOrsini, textTransform: 'uppercase',
        }}>A1.02 · Porta La Stella</span>
      </div>

      {/* Card 1 — La cinta muraria */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.30)',
          borderRadius: 16,
          padding: '28px 36px',
          maxWidth: 680,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroOrsini,
            textTransform: 'uppercase', marginBottom: 14,
          }}>Origini</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 42, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.2, marginBottom: 14,
          }}>Uno dei quattro accessi</div>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.6,
          }}>
            Cinta muraria voluta dai <strong style={{ color: COLORS.biancoCalce }}>Principi Orsini</strong> dopo
            il devastante sisma del <strong style={{ color: COLORS.oroOrsini }}>1456</strong>.
          </div>
        </div>
      </div>

      {/* Card 2 — Sant'Antonio Abate */}
      <div style={{
        position: 'absolute', bottom: 260, left: 80,
        opacity: card2Fade, transform: `translateY(${card2Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(212,168,67,0.28)`,
          borderLeft: `4px solid ${COLORS.oroOrsini}`,
          borderRadius: '0 12px 12px 0',
          padding: '20px 30px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.18em', color: COLORS.oroOrsini,
            textTransform: 'uppercase', marginBottom: 10,
          }}>Dedicazione Originale</div>
          <div style={{
            fontFamily: LATO, fontSize: 25, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.55,
          }}>
            In origine dedicata a <strong>Sant'Antonio Abate</strong>,
            patrono di Rocchetta — casale sotto la giurisdizione di Lacedonia.
          </div>
        </div>
      </div>

      {/* Fact card anno */}
      <div style={{
        position: 'absolute', bottom: 80, left: 80,
        opacity: card3Fade, transform: `translateY(${card3Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.82)',
          backdropFilter: 'blur(14px)',
          border: `3px solid ${COLORS.oroOrsini}`,
          borderRadius: 12,
          padding: '16px 28px',
          display: 'flex', alignItems: 'baseline', gap: 18,
        }}>
          <span style={{
            fontFamily: PLAYFAIR, fontSize: 80, fontWeight: 700,
            color: COLORS.oroOrsini, lineHeight: 1,
            textShadow: '0 0 28px rgba(212,168,67,0.45)',
          }}>1456</span>
          <span style={{
            fontFamily: LATO, fontSize: 22, fontWeight: 300,
            color: COLORS.biancoCalce,
          }}>il sisma che cambiò Lacedonia per sempre</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

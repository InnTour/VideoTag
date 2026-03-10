/**
 * Seq02 — Il Passaggio · Contadini · Generazioni · Post-1456
 * 330f / 11s — asini foto reale → ghost generazioni → pittura cavaliere
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence02Passaggio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelFade = interpolate(frame, [fps * 0.3, fps * 1.0], [0, 1], { extrapolateRight: 'clamp' });

  // Layer 1: asini foto reale → cross-dissolve ghost generazioni
  const dissolve1   = interpolate(frame, [fps * 3.5, fps * 5.5], [0, 1], { extrapolateRight: 'clamp' });
  // Layer 3: pittura cavaliere — appare come overlay a bassa opacità
  const pitturaOp   = interpolate(frame, [fps * 6.5, fps * 8.5], [0, 0.28], { extrapolateRight: 'clamp' });

  const card1Fade   = interpolate(frame, [fps * 0.5, fps * 1.4], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift   = interpolate(frame, [fps * 0.5, fps * 1.4], [22, 0], { extrapolateRight: 'clamp' });
  const card2Fade   = interpolate(frame, [fps * 5.2, fps * 6.5], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift   = interpolate(frame, [fps * 5.2, fps * 6.5], [20, 0], { extrapolateRight: 'clamp' });

  // Ghost "PORTA DI SOTTO"
  const ghostOp = interpolate(frame, [fps * 1.5, fps * 3.5], [0, 0.062], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: contadini con asini — foto reale */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve1 }}>
        <KenBurnsImage src={IMAGES.asini} motion="zoom-in" intensity={0.04} objectPosition="center 60%" />
      </div>

      {/* Layer 2: ghost generazioni (cross-dissolve) */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve1 }}>
        <KenBurnsImage src={IMAGES.ghost} motion="pan-left" intensity={0.03} objectPosition="center 55%" />
      </div>

      {/* Layer 3: pittura cavaliere — overlay artistico */}
      <div style={{ position: 'absolute', inset: 0, opacity: pitturaOp, mixBlendMode: 'luminosity' }}>
        <KenBurnsImage src={IMAGES.pittura} motion="zoom-out" intensity={0.025} objectPosition="center 40%" />
      </div>

      <AbsoluteFill style={{
        background: 'linear-gradient(to right, rgba(10,8,4,0.86) 0%, rgba(10,8,4,0.50) 55%, rgba(10,8,4,0.18) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(10,8,4,0.52) 100%)',
      }} />

      {/* Ghost "PORTA DI SOTTO" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 110, fontWeight: 700, fontStyle: 'italic',
          color: COLORS.oroMercato, userSelect: 'none', letterSpacing: '-0.01em',
          textAlign: 'center',
        }}>PORTA DI SOTTO</span>
      </AbsoluteFill>

      <ParticleField mode="pietra" opacity={0.18} count={32} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.oroMercato, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.oroMercato, textTransform: 'uppercase',
        }}>Il Passaggio · Secoli di Vita</span>
      </div>

      {/* Card 1 — La costruzione post-1456 */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.28)',
          borderRadius: 16,
          padding: '26px 34px',
          maxWidth: 680,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroMercato,
            textTransform: 'uppercase', marginBottom: 12,
          }}>Dopo il Terremoto del 1456</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 12,
          }}>Costruita dai Principi Orsini.</div>
          <div style={{
            fontFamily: LATO, fontSize: 23, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.60,
          }}>
            Accesso meridionale della cittadella —
            la porta che guardava verso i campi,
            verso la <strong style={{ color: COLORS.biancoCalce }}>piana e le contrade</strong>.
          </div>
        </div>
      </div>

      {/* Card 2 — Le generazioni */}
      <div style={{
        position: 'absolute', bottom: 120, left: 80,
        opacity: card2Fade, transform: `translateY(${card2Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(212,168,67,0.25)`,
          borderLeft: `4px solid ${COLORS.oroMercato}`,
          borderRadius: '0 12px 12px 0',
          padding: '20px 30px',
          maxWidth: 720,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 23, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.58,
          }}>
            Per cinque secoli, ogni mattina, i contadini di Lacedonia
            sono usciti da qui verso i campi — e ogni sera sono tornati.
            Ogni generazione ha consunto il suo selciato.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

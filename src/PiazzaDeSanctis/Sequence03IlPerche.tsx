/**
 * Seq03 — Il Perché · Morra e il Mezzogiorno
 * 750f / 25s — "Perché qui era il suo collegio… giovani del Mezzogiorno"
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence03IlPerche: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardFade  = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const cardLift  = interpolate(frame, [fps * 0.8, fps * 1.8], [24, 0], { extrapolateRight: 'clamp' });
  const card2Fade = interpolate(frame, [fps * 5, fps * 6.2], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift = interpolate(frame, [fps * 5, fps * 6.2], [24, 0], { extrapolateRight: 'clamp' });
  const card3Fade = interpolate(frame, [fps * 10, fps * 11.5], [0, 1], { extrapolateRight: 'clamp' });

  const ghostOp = interpolate(frame, [fps * 1, fps * 2], [0, 0.06], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Background: scuola magistrale · pan-left lento */}
      <KenBurnsImage src={IMAGES.scuola} motion="pan-left" intensity={0.045} />

      {/* Overlay */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to right, rgba(8,8,15,0.85) 0%, rgba(8,8,15,0.55) 50%, rgba(8,8,15,0.20) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 42%, rgba(8,8,15,0.55) 100%)',
        }}
      />

      {/* Ghost "MORRA" — il paese natale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 260,
          fontWeight: 700,
          color: COLORS.verdeIrpinia,
          letterSpacing: '0.04em',
          userSelect: 'none',
        }}>
          MORRA
        </span>
      </AbsoluteFill>

      <ParticleField mode="sapere" opacity={0.25} count={40} />

      {/* Card 1 — Il collegio elettorale */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: 80,
        opacity: cardFade,
        transform: `translateY(${cardLift}px)`,
      }}>
        <div style={{
          background: 'rgba(8,8,15,0.78)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.28)',
          borderRadius: 16,
          padding: '26px 34px',
          maxWidth: 680,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.20em',
            color: COLORS.oroIstruzione,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Il Perché Ufficiale
          </div>
          <div style={{
            fontFamily: LATO,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.biancoCalce,
            lineHeight: 1.6,
          }}>
            Lacedonia era il <strong style={{ color: COLORS.oroIstruzione }}>collegio elettorale</strong> di De Sanctis,
            un centro amministrativo con pretura.
          </div>
        </div>
      </div>

      {/* Card 2 — L'altra ragione */}
      <div style={{
        position: 'absolute',
        top: 310,
        left: 80,
        opacity: card2Fade,
        transform: `translateY(${card2Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(8,8,15,0.80)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(45,80,22,0.45)`,
          borderLeft: `4px solid ${COLORS.verdeIrpinia}`,
          borderRadius: '0 12px 12px 0',
          padding: '22px 32px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: '#6ECC6E',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Ma forse c'era dell'altro
          </div>
          <div style={{
            fontFamily: LATO,
            fontSize: 25,
            fontWeight: 300,
            color: COLORS.biancoCalce,
            lineHeight: 1.65,
          }}>
            De Sanctis era nato a <strong style={{ color: '#8EE88E' }}>Morra</strong>, borgo vicino.
            Conosceva quella sete di riscatto che si leggeva negli occhi dei giovani del Mezzogiorno.
          </div>
        </div>
      </div>

      {/* Fact card — Scuola Governativa */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 80,
        opacity: card3Fade,
      }}>
        <div style={{
          display: 'flex',
          gap: 24,
        }}>
          <div style={{
            background: 'rgba(42,90,138,0.25)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${COLORS.azzurroCivico}`,
            borderRadius: 12,
            padding: '18px 28px',
            textAlign: 'center',
            minWidth: 220,
          }}>
            <div style={{
              fontFamily: PLAYFAIR,
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.azzurroCivico,
              lineHeight: 1,
              textShadow: `0 0 24px rgba(42,90,138,0.6)`,
            }}>
              1878
            </div>
            <div style={{
              fontFamily: LATO,
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.grigioNebbia,
              marginTop: 6,
            }}>
              Anno del telegramma
            </div>
          </div>
          <div style={{
            background: 'rgba(212,168,67,0.18)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${COLORS.oroSoft}`,
            borderRadius: 12,
            padding: '18px 28px',
            textAlign: 'center',
            minWidth: 260,
          }}>
            <div style={{
              fontFamily: PLAYFAIR,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.oroIstruzione,
              lineHeight: 1.3,
            }}>
              Scuola Governativa<br />Rurale Magistrale
            </div>
            <div style={{
              fontFamily: LATO,
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.grigioNebbia,
              marginTop: 6,
            }}>
              Non a Napoli — a Lacedonia
            </div>
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};

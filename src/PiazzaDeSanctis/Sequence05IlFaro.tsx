/**
 * Seq05 — Il Faro · La Scuola Magistrale e le Ragazze
 * 750f / 25s — Cross-dissolve: contadini → studenti · "Dal 1913…"
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence05IlFaro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: contadini → studenti (frame 340-440)
  const dissolveProgress = interpolate(frame, [340, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const card1Fade = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.8, fps * 1.8], [24, 0],  { extrapolateRight: 'clamp' });
  const card2Fade = interpolate(frame, [fps * 5.5, fps * 6.8], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift = interpolate(frame, [fps * 5.5, fps * 6.8], [24, 0],  { extrapolateRight: 'clamp' });
  const card3Fade = interpolate(frame, [fps * 11, fps * 12.5], [0, 1], { extrapolateRight: 'clamp' });

  // Counter 0 → 1913 (anni dalla fondazione)
  const counterVal = Math.round(interpolate(frame, [fps * 5, fps * 8.5], [1878, 1913], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  // Ghost "RISCATTO"
  const ghostOp = interpolate(frame, [fps * 1, fps * 2.2], [0, 0.065], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Immagine 1: contadini · zoom-in */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveProgress }}>
        <KenBurnsImage src={IMAGES.contadini} motion="zoom-in" intensity={0.04} />
      </div>
      {/* Immagine 2: studenti · pan-up */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveProgress }}>
        <KenBurnsImage src={IMAGES.studenti} motion="pan-up" intensity={0.04} />
      </div>

      {/* Overlay */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to right, rgba(8,8,15,0.82) 0%, rgba(8,8,15,0.52) 55%, rgba(8,8,15,0.20) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,15,0.52) 100%)',
        }}
      />

      {/* Overlay speranza — progressivamente più verde/caldo */}
      <AbsoluteFill
        style={{
          background: `rgba(45,80,22,${dissolveProgress * 0.12})`,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Ghost "RISCATTO" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 230,
          fontWeight: 700,
          color: COLORS.oroIstruzione,
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}>
          RISCATTO
        </span>
      </AbsoluteFill>

      <ParticleField mode="speranza" opacity={0.28} count={42} />

      {/* Card 1 — La Scuola Magistrale */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: 80,
        opacity: card1Fade,
        transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(8,8,15,0.78)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.30)',
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
            La Scuola Magistrale
          </div>
          <div style={{
            fontFamily: LATO,
            fontSize: 25,
            fontWeight: 300,
            color: COLORS.biancoCalce,
            lineHeight: 1.65,
          }}>
            Divenne un <strong style={{ color: COLORS.oroIstruzione, fontWeight: 700 }}>faro di cultura</strong> per
            l'intero Mezzogiorno, riscattando dall'analfabetismo generazioni di giovani.
          </div>
        </div>
      </div>

      {/* Card 2 — Counter 1913 */}
      <div style={{
        position: 'absolute',
        top: 340,
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
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}>
          <div>
            <div style={{
              fontFamily: PLAYFAIR,
              fontSize: 88,
              fontWeight: 700,
              color: COLORS.verdeIrpinia,
              lineHeight: 1,
              textShadow: `0 0 32px rgba(45,80,22,0.6)`,
            }}>
              {counterVal}
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: LATO,
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.biancoCalce,
              marginBottom: 6,
            }}>
              Le porte si aprono alle ragazze
            </div>
            <div style={{
              fontFamily: LATO,
              fontSize: 18,
              fontWeight: 300,
              color: COLORS.grigioNebbia,
            }}>
              Lacedonia diventa centro d'eccellenza
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 — Madri */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 80,
        opacity: card3Fade,
        maxWidth: 800,
      }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 26,
          color: COLORS.beigeOratorio,
          lineHeight: 1.65,
          borderLeft: `4px solid ${COLORS.oroIstruzione}`,
          paddingLeft: 24,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}>
          "Le madri che piangevano di gioia, vedendo per la prima volta un futuro
          fatto di libri e dignità."
        </div>
      </div>

    </AbsoluteFill>
  );
};

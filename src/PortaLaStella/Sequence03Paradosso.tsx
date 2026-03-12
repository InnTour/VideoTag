/**
 * Seq03 — Paradosso · La Porta Sepolta
 * 490f / 16.3s — stessa immagine zoom lento basso · il paradosso dell'invisibilità
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence03Paradosso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelFade = interpolate(frame, [fps * 0.4, fps * 1.0], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.6, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.6, fps * 1.5], [24, 0],  { extrapolateRight: 'clamp' });

  // Il paradosso — reveal progressivo
  const paradoxFade  = interpolate(frame, [fps * 5.5, fps * 7.0], [0, 1], { extrapolateRight: 'clamp' });
  const paradoxScale = interpolate(frame, [fps * 5.5, fps * 7.0], [0.88, 1], { extrapolateRight: 'clamp' });

  // Ghost "INVISIBILE" — la condizione della porta
  const ghostOp = interpolate(frame, [fps * 1, fps * 3], [0, 0.07], { extrapolateRight: 'clamp' });

  // Overlay scuro progressivo — come qualcosa che sprofonda
  const darkOp = interpolate(frame, [0, fps * 8], [0.05, 0.22], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* La soglia interrata — zoom su porzione bassa per enfatizzare il seppellimento */}
      <KenBurnsImage src={IMAGES.sogliaInterrata} motion="pan-down" intensity={0.04} objectPosition="center 70%" />

      {/* Overlay di appesantimento — la porta che sprofonda */}
      <AbsoluteFill style={{
        background: `rgba(10,8,4,${darkOp})`,
        pointerEvents: 'none',
      }} />
      <AbsoluteFill style={{
        background: 'linear-gradient(to right, rgba(10,8,4,0.87) 0%, rgba(10,8,4,0.54) 55%, rgba(10,8,4,0.20) 100%)',
      }} />
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(10,8,4,0.58) 100%)',
      }} />

      {/* Ghost "INVISIBILE" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 160, fontWeight: 700, fontStyle: 'italic',
          color: COLORS.pietraAntica, userSelect: 'none', letterSpacing: '-0.01em',
        }}>INVISIBILE</span>
      </AbsoluteFill>

      <ParticleField mode="pietra" opacity={0.15} count={30} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.pietraAntica, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.pietraAntica, textTransform: 'uppercase',
        }}>Il Paradosso</span>
      </div>

      {/* Card 1 — Piano stradale cresciuto */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.82)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(139,115,85,0.35)',
          borderRadius: 16,
          padding: '28px 36px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.pietraAntica,
            textTransform: 'uppercase', marginBottom: 14,
          }}>Il Problema dei Secoli</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 14,
          }}>La porta è sprofondatа sotto il livello della strada.</div>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.6,
          }}>
            I successivi innalzamenti del piano stradale l'hanno resa
            difficilmente visibile ai passanti. Cinque secoli di storia, invisibili.
          </div>
        </div>
      </div>

      {/* Paradox reveal */}
      <div style={{
        position: 'absolute', bottom: 140, left: 80,
        opacity: paradoxFade,
        transform: `scale(${paradoxScale})`,
        transformOrigin: 'left center',
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.84)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(139,115,85,0.30)`,
          borderLeft: `4px solid ${COLORS.pietraAntica}`,
          borderRadius: '0 12px 12px 0',
          padding: '22px 32px',
          maxWidth: 780,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 26, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.55,
            fontStyle: 'italic',
          }}>
            "Una porta medievale che attraversava migliaia di persone ogni anno —
            oggi sepolta sotto l'asfalto che nessuno più scava."
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

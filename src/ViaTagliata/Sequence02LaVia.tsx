/**
 * Seq02 — La Via · 150 d.C. · Diverticulum della Via Appia
 * 1050f / 35s — Carri romani · botteghe · scure consolare del 1820
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence02LaVia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: viaAppia → carri (frame 300-420)
  const dissolve1 = interpolate(frame, [300, 420], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // Cross-dissolve: carri → scure (frame 650-750)
  const dissolve2 = interpolate(frame, [650, 750], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelFade = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.8, fps * 1.8], [24, 0],  { extrapolateRight: 'clamp' });

  // Fact card "150 d.C." — appare nella prima metà
  const factFade  = interpolate(frame, [fps * 3.5, fps * 4.5], [0, 1], { extrapolateRight: 'clamp' });
  const factLift  = interpolate(frame, [fps * 3.5, fps * 4.5], [20, 0],  { extrapolateRight: 'clamp' });

  // Card scure consolare — appare dopo il secondo dissolve
  const scureFade = interpolate(frame, [fps * 23, fps * 24.5], [0, 1], { extrapolateRight: 'clamp' });
  const scureLift = interpolate(frame, [fps * 23, fps * 24.5], [20, 0],  { extrapolateRight: 'clamp' });

  // Ghost "APPIA" — l'arteria dell'Impero
  const ghostOp = interpolate(frame, [fps * 1, fps * 2.5], [0, 0.055], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: Via Appia */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, 1 - dissolve1) }}>
        <KenBurnsImage src={IMAGES.viaAppia} motion="pan-right" intensity={0.04} objectPosition="center top" />
      </div>
      {/* Layer 2: Carri romani */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, dissolve1) * Math.max(0, 1 - dissolve2) }}>
        <KenBurnsImage src={IMAGES.carri} motion="zoom-in" intensity={0.035} objectPosition="center top" />
      </div>
      {/* Layer 3: Scure consolare */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, dissolve2) }}>
        <KenBurnsImage src={IMAGES.scure} motion="pan-left" intensity={0.03} objectPosition="center top" />
      </div>

      {/* Overlay laterale */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to right, rgba(6,6,10,0.82) 0%, rgba(6,6,10,0.50) 55%, rgba(6,6,10,0.18) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 42%, rgba(6,6,10,0.50) 100%)',
        }}
      />

      {/* Ghost "APPIA" verticale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 220,
          fontWeight: 700,
          color: COLORS.oroRomano,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>
          APPIA
        </span>
      </AbsoluteFill>

      <ParticleField mode="polvere" opacity={0.20} count={38} />

      {/* Badge sezione */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.oroRomano, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.oroRomano, textTransform: 'uppercase',
        }}>
          B2.01 · Via Tagliata
        </span>
      </div>

      {/* Card 1 — Il diverticulum */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade,
        transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.78)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(200,168,75,0.30)',
          borderRadius: 16,
          padding: '28px 36px',
          maxWidth: 660,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroRomano,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            La Connessione con Roma
          </div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 42, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.2, marginBottom: 14,
          }}>
            Diverticulum della Via Appia
          </div>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 300,
            color: COLORS.polvere, lineHeight: 1.6,
          }}>
            Scorciatoia che collegava Aquilonia all'arteria principale dell'Impero
          </div>
        </div>
      </div>

      {/* Fact card — 150 d.C. */}
      <div style={{
        position: 'absolute', bottom: 200, left: 80,
        opacity: factFade,
        transform: `translateY(${factLift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.80)',
          backdropFilter: 'blur(16px)',
          border: `4px solid ${COLORS.oroRomano}`,
          borderRadius: 12,
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'baseline',
          gap: 20,
        }}>
          <span style={{
            fontFamily: PLAYFAIR, fontSize: 84, fontWeight: 700,
            color: COLORS.oroRomano, lineHeight: 1,
            textShadow: '0 0 30px rgba(200,168,75,0.5)',
          }}>
            150 d.C.
          </span>
          <span style={{
            fontFamily: LATO, fontSize: 22, fontWeight: 300,
            color: COLORS.biancoCalce,
          }}>
            carri, botteghe, commercio — Roma era qui
          </span>
        </div>
      </div>

      {/* Card scure consolare */}
      <div style={{
        position: 'absolute', bottom: 180, left: 80,
        opacity: scureFade,
        transform: `translateY(${scureLift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.82)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,168,75,0.35)`,
          borderLeft: `4px solid ${COLORS.oroRomano}`,
          borderRadius: '0 12px 12px 0',
          padding: '22px 32px',
          maxWidth: 740,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.18em', color: COLORS.oroRomano,
            textTransform: 'uppercase', marginBottom: 12,
          }}>
            Ritrovamento · 1820
          </div>
          <div style={{
            fontFamily: LATO, fontSize: 26, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.55,
          }}>
            Scure consolare — simbolo tangibile dell'autorità imperiale
            che un tempo governava questi luoghi.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

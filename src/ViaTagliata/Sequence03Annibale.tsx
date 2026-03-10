/**
 * Seq03 — 212 a.C. · Annibale · La Battaglia
 * 1080f / 36s — Aquilonia passa ad Annibale · Centumalo · 3.000 morti · il tradimento
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence03Annibale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: annibale → battaglia (frame 360-480)
  const dissolveProgress = interpolate(frame, [360, 480], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Flash battaglia (tensione militare)
  const flashOp = interpolate(frame, [0, 3, 12, 20], [0.25, 0, 0, 0], { extrapolateRight: 'clamp' });

  const labelFade = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.8, fps * 1.8], [24, 0],  { extrapolateRight: 'clamp' });

  // Counter vittime 0→3000 (appare dopo il dissolve)
  const counterProgress = interpolate(frame, [fps * 17, fps * 22], [0, 1], { extrapolateRight: 'clamp' });
  const vittime = Math.round(counterProgress * 3000);
  const counterFade = interpolate(frame, [fps * 17, fps * 18.5], [0, 1], { extrapolateRight: 'clamp' });

  // Card tradimento — appare dopo il counter
  const tradFade = interpolate(frame, [fps * 25, fps * 27], [0, 1], { extrapolateRight: 'clamp' });
  const tradLift = interpolate(frame, [fps * 25, fps * 27], [20, 0],  { extrapolateRight: 'clamp' });

  // Ghost "ANNIBALE" verticale
  const ghostOp = interpolate(frame, [fps * 0.5, fps * 2], [0, 0.06], { extrapolateRight: 'clamp' });

  // Overlay rosso sangue crescente durante la battaglia
  const rossoOp = interpolate(frame, [fps * 12, fps * 20], [0, 0.12], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: Annibale */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveProgress }}>
        <KenBurnsImage src={IMAGES.annibale} motion="zoom-in" intensity={0.04} objectPosition="center top" />
      </div>
      {/* Layer 2: Campo di battaglia */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveProgress }}>
        <KenBurnsImage src={IMAGES.battaglia} motion="pan-right" intensity={0.035} objectPosition="center top" />
      </div>

      {/* Flash tensione */}
      <AbsoluteFill style={{ background: COLORS.rossoSangue, opacity: flashOp, pointerEvents: 'none' }} />

      {/* Overlay rosso sangue — la strage si avvicina */}
      <AbsoluteFill
        style={{
          background: `rgba(139,26,26,${rossoOp})`,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Overlay laterale */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to right, rgba(6,6,10,0.82) 0%, rgba(6,6,10,0.52) 55%, rgba(6,6,10,0.20) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 42%, rgba(6,6,10,0.52) 100%)',
        }}
      />

      {/* Ghost "ANNIBALE" verticale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 180,
          fontWeight: 700,
          color: COLORS.rossoSangue,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>
          ANNIBALE
        </span>
      </AbsoluteFill>

      <ParticleField mode="cenere" opacity={0.18} count={35} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: labelFade,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.rossoSangue, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO, fontSize: 14, fontWeight: 700,
          letterSpacing: '0.20em', color: COLORS.rossoSangue, textTransform: 'uppercase',
        }}>
          212 a.C. · La Battaglia
        </span>
      </div>

      {/* Card 1 — Il contesto */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade,
        transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.80)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(139,26,26,0.40)`,
          borderRadius: 16,
          padding: '28px 36px',
          maxWidth: 680,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.rossoVivo,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            Aquilonia sceglie Annibale
          </div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 14,
          }}>
            Gneo Fulvio Centumalo si accampa qui per riconquistarla.
          </div>
          <div style={{
            fontFamily: LATO, fontSize: 22, fontWeight: 300,
            color: COLORS.polvere, lineHeight: 1.6,
          }}>
            Il condottiero cartaginese accorre e annienta l'esercito romano.
          </div>
        </div>
      </div>

      {/* Counter vittime */}
      <div style={{
        position: 'absolute', bottom: 240, left: 80,
        opacity: counterFade,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.82)',
          backdropFilter: 'blur(16px)',
          border: `4px solid ${COLORS.rossoSangue}`,
          borderRadius: 12,
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'baseline',
          gap: 20,
        }}>
          <span style={{
            fontFamily: PLAYFAIR, fontSize: 88, fontWeight: 700,
            color: COLORS.rossoVivo, lineHeight: 1,
            textShadow: `0 0 30px rgba(139,26,26,0.6)`,
          }}>
            {vittime.toLocaleString('it-IT')}
          </span>
          <span style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 400,
            color: COLORS.biancoCalce,
          }}>
            morti sul campo — sembrava una vittoria totale.
          </span>
        </div>
      </div>

      {/* Card tradimento */}
      <div style={{
        position: 'absolute', bottom: 110, left: 80,
        opacity: tradFade,
        transform: `translateY(${tradLift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.82)',
          backdropFilter: 'blur(16px)',
          borderLeft: `4px solid ${COLORS.oroRomano}`,
          borderRadius: '0 12px 12px 0',
          padding: '18px 28px',
          maxWidth: 760,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 400,
            color: COLORS.biancoCalce, lineHeight: 1.55,
          }}>
            Ma allora Annibale scoprì qualcosa che non poteva perdonare: i notabili lacedoniesi
            avevano tentato segretamente di patteggiare con i Romani.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

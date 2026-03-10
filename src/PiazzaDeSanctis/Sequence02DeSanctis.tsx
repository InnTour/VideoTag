/**
 * Seq02 — De Sanctis · Il Telegramma
 * 750f / 25s — Ritratto di De Sanctis → cross-dissolve con il telegramma
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence02DeSanctis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: deSanctis → telegramma (frame 280-380)
  const dissolveProgress = interpolate(frame, [280, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Testi
  const labelFade = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.8, fps * 1.6], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.8, fps * 1.6], [24, 0],  { extrapolateRight: 'clamp' });
  const card2Fade = interpolate(frame, [fps * 2.5, fps * 3.3], [0, 1], { extrapolateRight: 'clamp' });
  const card2Lift = interpolate(frame, [fps * 2.5, fps * 3.3], [24, 0],  { extrapolateRight: 'clamp' });

  // Ghost "DE SANCTIS" — nome come presenza
  const ghostOp = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 0.065], { extrapolateRight: 'clamp' });

  // Data reveal "2 agosto 1878" — appare nella seconda metà
  const dataFade = interpolate(frame, [fps * 9, fps * 10.5], [0, 1], { extrapolateRight: 'clamp' });
  const dataScale = interpolate(frame, [fps * 9, fps * 10.5], [0.85, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Immagine 1: De Sanctis · pan-right */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveProgress }}>
        <KenBurnsImage src={IMAGES.deSanctis} motion="pan-right" intensity={0.04} objectPosition="center top" />
      </div>
      {/* Immagine 2: Telegramma · zoom-in */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveProgress }}>
        <KenBurnsImage src={IMAGES.telegramma} motion="zoom-in" intensity={0.035} objectPosition="center top" />
      </div>

      {/* Overlay gradiente laterale */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to right, rgba(8,8,15,0.80) 0%, rgba(8,8,15,0.50) 55%, rgba(8,8,15,0.18) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,15,0.50) 100%)',
        }}
      />

      {/* Ghost "DE SANCTIS" verticale */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 200,
          fontWeight: 700,
          color: COLORS.azzurroCivico,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>
          DE SANCTIS
        </span>
      </AbsoluteFill>

      <ParticleField mode="civico" opacity={0.22} count={35} />

      {/* Card 1 — Il personaggio */}
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
          padding: '28px 36px',
          maxWidth: 640,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.20em',
            color: COLORS.oroIstruzione,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            Il Protagonista
          </div>
          <div style={{
            fontFamily: PLAYFAIR,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.biancoCalce,
            lineHeight: 1.2,
            marginBottom: 14,
          }}>
            Francesco De Sanctis
          </div>
          <div style={{
            fontFamily: LATO,
            fontSize: 24,
            fontWeight: 300,
            color: COLORS.beigeOratorio,
            lineHeight: 1.6,
          }}>
            Grande critico letterario · Ministro della Pubblica Istruzione
          </div>
        </div>
      </div>

      {/* Label label sezione */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 80,
        opacity: labelFade,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{ width: 4, height: 28, background: COLORS.oroIstruzione, borderRadius: 2 }} />
        <span style={{
          fontFamily: LATO,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.20em',
          color: COLORS.oroIstruzione,
          textTransform: 'uppercase',
        }}>
          A1.01 · Piazza De Sanctis
        </span>
      </div>

      {/* Card 2 — Il Telegramma (appare dopo cross-dissolve) */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 80,
        opacity: card2Fade,
        transform: `translateY(${card2Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(8,8,15,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(42,90,138,0.40)',
          borderLeft: `4px solid ${COLORS.azzurroCivico}`,
          borderRadius: '0 12px 12px 0',
          padding: '22px 32px',
          maxWidth: 720,
        }}>
          <div style={{
            fontFamily: LATO,
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.biancoCalce,
            lineHeight: 1.6,
            marginBottom: 10,
          }}>
            "…scelse questo borgo per un gesto che nessuno si aspettava."
          </div>
          {/* Data reveal */}
          <div style={{
            opacity: dataFade,
            transform: `scale(${dataScale})`,
            transformOrigin: 'left center',
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            marginTop: 14,
          }}>
            <span style={{
              fontFamily: PLAYFAIR,
              fontSize: 80,
              fontWeight: 700,
              color: COLORS.oroIstruzione,
              lineHeight: 1,
              textShadow: '0 0 30px rgba(212,168,67,0.5)',
            }}>
              2 agosto 1878
            </span>
            <span style={{
              fontFamily: LATO,
              fontSize: 20,
              fontWeight: 400,
              color: COLORS.grigioNebbia,
            }}>
              — il telegramma arriva a Lacedonia
            </span>
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};

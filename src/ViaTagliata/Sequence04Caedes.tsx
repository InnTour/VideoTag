/**
 * Seq04 — Caedes · L'Origine del Nome
 * 1050f / 35s — Decapitazione di massa · caedes (strage e taglio) · città bruciata
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence04Caedes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: caedes → rovine (frame 380-500)
  const dissolveProgress = interpolate(frame, [380, 500], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Sovrapposizione overlay rosso sangue — la strage sul selciato
  const rossoOp = interpolate(frame, [0, fps * 5, fps * 18], [0.08, 0.18, 0.06], { extrapolateRight: 'clamp' });

  const labelFade = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const card1Fade = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.8, fps * 1.8], [24, 0],  { extrapolateRight: 'clamp' });

  // Reveal della parola "caedes" — il climax etimologico
  const caedesFade  = interpolate(frame, [fps * 10, fps * 12], [0, 1], { extrapolateRight: 'clamp' });
  const caedesScale = interpolate(frame, [fps * 10, fps * 12], [0.85, 1], { extrapolateRight: 'clamp' });

  // Card città bruciata — appare dopo il dissolve
  const brutaFade = interpolate(frame, [fps * 22, fps * 24], [0, 1], { extrapolateRight: 'clamp' });
  const brutaLift = interpolate(frame, [fps * 22, fps * 24], [20, 0],  { extrapolateRight: 'clamp' });

  // Ghost "CAEDES" — la parola come fantasma sulle pietre
  const ghostOp = interpolate(frame, [fps * 1, fps * 3], [0, 0.10], { extrapolateRight: 'clamp' });

  // Linea separatrice animata
  const lineW = interpolate(frame, [fps * 8, fps * 10], [0, 400], { extrapolateRight: 'clamp' });
  const lineOp = interpolate(frame, [fps * 8, fps * 9], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: La caedes */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveProgress }}>
        <KenBurnsImage src={IMAGES.caedes} motion="zoom-in" intensity={0.03} objectPosition="center top" />
      </div>
      {/* Layer 2: La città bruciata */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveProgress }}>
        <KenBurnsImage src={IMAGES.rovine} motion="pan-left" intensity={0.035} objectPosition="center top" />
      </div>

      {/* Overlay rosso sangue — le pietre bagnate di sangue */}
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
          background: 'linear-gradient(to right, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.55) 55%, rgba(6,6,10,0.20) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,6,10,0.55) 100%)',
        }}
      />

      {/* Ghost "CAEDES" — la parola che sopravvive */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR,
          fontSize: 260,
          fontWeight: 700,
          fontStyle: 'italic',
          color: COLORS.rossoSangue,
          userSelect: 'none',
          letterSpacing: '-0.01em',
        }}>
          CAEDES
        </span>
      </AbsoluteFill>

      <ParticleField mode="sangue" opacity={0.14} count={30} />

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
          Il Prezzo del Tradimento
        </span>
      </div>

      {/* Card 1 — La decapitazione */}
      <div style={{
        position: 'absolute', top: 120, left: 80,
        opacity: card1Fade,
        transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.80)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(139,26,26,0.45)`,
          borderRadius: 16,
          padding: '28px 36px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.rossoVivo,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            Sul Selciato
          </div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 14,
          }}>
            Annibale ordinò una decapitazione di massa.
          </div>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 300,
            color: COLORS.polvere, lineHeight: 1.6,
          }}>
            I notabili colpevoli del tradimento furono giustiziati uno dopo l'altro,
            sulle stesse pietre che oggi calpesti.
          </div>
        </div>
      </div>

      {/* Linea separatrice oro */}
      <div style={{
        position: 'absolute',
        bottom: 300,
        left: 80,
        opacity: lineOp,
      }}>
        <div style={{
          width: lineW,
          height: 2,
          background: `linear-gradient(to right, ${COLORS.rossoSangue}, transparent)`,
        }} />
      </div>

      {/* Reveal "caedes" — l'etimologia */}
      <div style={{
        position: 'absolute',
        bottom: 220,
        left: 80,
        opacity: caedesFade,
        transform: `scale(${caedesScale})`,
        transformOrigin: 'left center',
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.82)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,168,75,0.35)`,
          borderLeft: `4px solid ${COLORS.oroRomano}`,
          borderRadius: '0 12px 12px 0',
          padding: '22px 32px',
          maxWidth: 800,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.18em', color: COLORS.oroRomano,
            textTransform: 'uppercase', marginBottom: 12,
          }}>
            Etymologia Latina
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 10 }}>
            <span style={{
              fontFamily: PLAYFAIR, fontSize: 64, fontWeight: 700,
              fontStyle: 'italic', color: COLORS.oroRomano,
              textShadow: '0 0 24px rgba(200,168,75,0.5)',
            }}>
              caedes
            </span>
            <span style={{
              fontFamily: LATO, fontSize: 26, fontWeight: 300,
              color: COLORS.biancoCalce,
            }}>
              — strage · taglio
            </span>
          </div>
          <div style={{
            fontFamily: LATO, fontSize: 22, fontWeight: 300,
            color: COLORS.polvere, lineHeight: 1.55,
          }}>
            I Romani chiamarono questo luogo <em>caedes</em>.
            Da quella parola nacque il toponimo: <strong style={{ color: COLORS.biancoCalce }}>Via Tagliata</strong>.
          </div>
        </div>
      </div>

      {/* Card città bruciata */}
      <div style={{
        position: 'absolute', bottom: 80, left: 80,
        opacity: brutaFade,
        transform: `translateY(${brutaLift}px)`,
      }}>
        <div style={{
          background: 'rgba(6,6,10,0.80)',
          backdropFilter: 'blur(14px)',
          border: `1px solid rgba(139,26,26,0.30)`,
          borderRadius: 12,
          padding: '16px 28px',
          display: 'flex',
          gap: 32,
          maxWidth: 820,
        }}>
          {[
            { v: 'Città bruciata', d: 'Aquilonia rasa al suolo' },
            { v: 'Superstiti deportati', d: 'a Metaponto' },
            { v: 'Silenzio', d: 'per secoli' },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                fontFamily: PLAYFAIR, fontSize: 26, fontWeight: 700,
                color: COLORS.rossoVivo, marginBottom: 6,
              }}>{item.v}</div>
              <div style={{
                fontFamily: LATO, fontSize: 18, fontWeight: 300,
                color: COLORS.polvere,
              }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

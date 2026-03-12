/**
 * Seq04 — Oggi · Memoria Vivente · Outro
 * 369f / 12.3s — donna anziana → arco esterno bookend → loghi · iris outro
 */
import React from 'react';
import { AbsoluteFill, interpolate, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence04Oggi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const overlayOp = interpolate(frame, [0, fps * 1.2], [0.40, 0.68], { extrapolateRight: 'clamp' });

  // Donna anziana → arco esterno bookend
  const dissolve1 = interpolate(frame, [fps * 4.5, fps * 6.5], [0, 1], { extrapolateRight: 'clamp' });
  // Famiglie → hero (circolarità finale)
  const dissolve2 = interpolate(frame, [fps * 8.0, fps * 10.0], [0, 1], { extrapolateRight: 'clamp' });

  const card1Fade = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.5, fps * 1.5], [22, 0], { extrapolateRight: 'clamp' });
  const tagFade   = interpolate(frame, [fps * 3.5, fps * 4.8], [0, 1], { extrapolateRight: 'clamp' });
  const tagLift   = interpolate(frame, [fps * 3.5, fps * 4.8], [18, 0], { extrapolateRight: 'clamp' });
  const tag2Fade  = interpolate(frame, [fps * 5.5, fps * 7.0], [0, 1], { extrapolateRight: 'clamp' });
  const signFade  = interpolate(frame, [fps * 7.5, fps * 9.0], [0, 1], { extrapolateRight: 'clamp' });
  const logoFade  = interpolate(frame, [fps * 9.5, fps * 11.0], [0, 1], { extrapolateRight: 'clamp' });

  // Iris SVG outro
  const irisProgress = interpolate(frame, [fps * 11.0, fps * 12.3], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = irisProgress * 1200;

  // Ghost "MEMORIA" — la parola chiave
  const ghostOp = interpolate(frame, [fps * 1.0, fps * 2.8], [0, 0.052], { extrapolateRight: 'clamp' });

  // Linea oro
  const lineW = interpolate(frame, [fps * 3.0, fps * 4.2], [0, 320], { extrapolateRight: 'clamp' });
  const lineOp = interpolate(frame, [fps * 3.0, fps * 3.6], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: donna anziana — memoria vivente */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, 1 - dissolve1) }}>
        <KenBurnsImage src={IMAGES.donna} motion="zoom-in" intensity={0.03} objectPosition="center 50%" />
      </div>

      {/* Layer 2: arco esterno (cross-dissolve) */}
      <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, dissolve1) * Math.max(0, 1 - dissolve2) }}>
        <KenBurnsImage src={IMAGES.arcoExt} motion="zoom-out" intensity={0.03} objectPosition="center 40%" />
      </div>

      {/* Layer 3: hero dorata — circolarità (bookend) */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve2 }}>
        <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.035} objectPosition="center 30%" />
      </div>

      <AbsoluteFill style={{ background: `rgba(10,8,4,${overlayOp})` }} />
      <AbsoluteFill style={{
        background: 'linear-gradient(to bottom, rgba(10,8,4,0.28) 0%, rgba(10,8,4,0.62) 100%)',
      }} />

      {/* Iris SVG */}
      {irisProgress > 0 && (
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <mask id="iris-pds">
              <rect width="1920" height="1080" fill="white" />
              <circle cx="960" cy="540" r={Math.max(0, irisRadius)} fill="black" />
            </mask>
          </defs>
          <rect width="1920" height="1080" fill={COLORS.neroFondo} mask="url(#iris-pds)" />
        </svg>
      )}

      {/* Ghost "MEMORIA" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 230, fontWeight: 700,
          color: COLORS.oroSoft, userSelect: 'none', letterSpacing: '-0.02em',
        }}>MEMORIA</span>
      </AbsoluteFill>

      <ParticleField mode="oro" opacity={0.13} count={26} />

      {/* Card — la donna anziana */}
      <div style={{
        position: 'absolute', top: 100, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.28)',
          borderRadius: 16,
          padding: '24px 32px',
          maxWidth: 700,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroMercato,
            textTransform: 'uppercase', marginBottom: 12,
          }}>Oggi</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 38, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.28, marginBottom: 12,
          }}>La porta è ancora lì. E la gente passa ancora.</div>
          <div style={{
            fontFamily: LATO, fontSize: 22, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.62,
          }}>
            Non più asini carichi di olio pugliese.
            Ma lo stesso selciato, le stesse pietre —
            e qualcuno che si ferma a guardare, come si faceva una volta.
          </div>
        </div>
      </div>

      {/* Linea separatrice */}
      <div style={{ position: 'absolute', bottom: 310, left: 80, opacity: lineOp }}>
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, ${COLORS.oroMercato}, transparent)`,
        }} />
      </div>

      {/* Tagline narrativa */}
      <div style={{
        position: 'absolute', bottom: 240, left: 80,
        opacity: tagFade, transform: `translateY(${tagLift}px)`,
      }}>
        <div style={{
          fontFamily: PLAYFAIR, fontSize: 50, fontWeight: 700,
          color: COLORS.biancoCalce,
          textShadow: '0 4px 20px rgba(0,0,0,0.96)', maxWidth: 920,
        }}>
          La Porta di Sotto: soglia tra il borgo e il mondo.
        </div>
      </div>

      {/* Chiusura poetica */}
      <div style={{ position: 'absolute', bottom: 168, left: 80, opacity: tag2Fade }}>
        <div style={{
          fontFamily: PLAYFAIR, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
          color: COLORS.oroMercato, textShadow: '0 2px 14px rgba(0,0,0,0.92)',
        }}>Cinque secoli di passaggi — e il viaggio continua.</div>
      </div>

      {/* InnTour signature */}
      <div style={{ position: 'absolute', bottom: 120, left: 80, opacity: signFade }}>
        <span style={{
          fontFamily: LATO, fontSize: 17, fontWeight: 600,
          letterSpacing: '0.18em', color: COLORS.oroSoft, textTransform: 'uppercase',
        }}>Narratore Digitale di Lacedonia · InnTour S.R.L.</span>
      </div>

      {/* Loghi */}
      <div style={{
        position: 'absolute',
        bottom: 50, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 48, opacity: logoFade,
      }}>
        <Img src={staticFile(IMAGES.logoComune)} style={{ height: 96, objectFit: 'contain' }} />
        <div style={{ width: 1, height: 72, background: COLORS.grigioPietra }} />
        <Img src={staticFile(IMAGES.logoInnTour)} style={{ height: 80, objectFit: 'contain' }} />
      </div>
    </AbsoluteFill>
  );
};

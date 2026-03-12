/**
 * Seq05 — Outro · Memoria · "Cammina piano, su questa via"
 * 1380f / 46s — Vigneti irpini · selciato oggi · circolarità narrativa · loghi
 */
import React from 'react';
import { AbsoluteFill, interpolate, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve: vigneti → pietre/hero bookend (frame 480-600)
  const dissolveProgress = interpolate(frame, [480, 600], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Overlay — più pesante per far emergere testi e loghi
  const overlayOp = interpolate(frame, [0, fps * 2], [0.5, 0.72], { extrapolateRight: 'clamp' });

  // Aforisma — in sequenza
  const af1Fade  = interpolate(frame, [fps * 1.0, fps * 2.2], [0, 1], { extrapolateRight: 'clamp' });
  const af1Lift  = interpolate(frame, [fps * 1.0, fps * 2.2], [28, 0],  { extrapolateRight: 'clamp' });
  const af2Fade  = interpolate(frame, [fps * 2.8, fps * 4.0], [0, 1], { extrapolateRight: 'clamp' });
  const af3Fade  = interpolate(frame, [fps * 4.5, fps * 6.0], [0, 1], { extrapolateRight: 'clamp' });
  const af4Fade  = interpolate(frame, [fps * 6.5, fps * 8.0], [0, 1], { extrapolateRight: 'clamp' });
  const af5Fade  = interpolate(frame, [fps * 9.5, fps * 11.0], [0, 1], { extrapolateRight: 'clamp' });

  // Tagline finale
  const tagFade  = interpolate(frame, [fps * 12, fps * 14], [0, 1], { extrapolateRight: 'clamp' });

  // Loghi
  const logoFade = interpolate(frame, [fps * 28, fps * 30], [0, 1], { extrapolateRight: 'clamp' });

  // Iris SVG outro
  const irisProgress = interpolate(frame, [fps * 37, fps * 46], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = irisProgress * 1200;

  // Separatore oro
  const lineW = interpolate(frame, [fps * 7.5, fps * 9], [0, 360], { extrapolateRight: 'clamp' });
  const lineOp = interpolate(frame, [fps * 7.5, fps * 8.2], [0, 1], { extrapolateRight: 'clamp' });

  // Ghost "TAGLIATA" — la parola come presenza finale
  const ghostOp = interpolate(frame, [fps * 2, fps * 4], [0, 0.045], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: Vigneti */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolveProgress }}>
        <KenBurnsImage src={IMAGES.vigneti} motion="zoom-out" intensity={0.04} objectPosition="center top" />
      </div>
      {/* Layer 2: Hero bookend — stessa via in chiusura */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolveProgress }}>
        <KenBurnsImage src={IMAGES.hero} motion="pan-up" intensity={0.03} objectPosition="center top" />
      </div>

      {/* Overlay pesante climax */}
      <AbsoluteFill style={{ background: `rgba(6,6,10,${overlayOp})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(6,6,10,0.35) 0%, rgba(6,6,10,0.65) 100%)' }} />

      {/* Iris SVG chiusura */}
      {irisProgress > 0 && (
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <mask id="iris-mask-vt">
              <rect width="1920" height="1080" fill="white" />
              <circle cx="960" cy="540" r={Math.max(0, irisRadius)} fill="black" />
            </mask>
          </defs>
          <rect width="1920" height="1080" fill={COLORS.neroFondo} mask="url(#iris-mask-vt)" />
        </svg>
      )}

      {/* Ghost "TAGLIATA" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 240, fontWeight: 700,
          color: COLORS.pietraSelciato, userSelect: 'none', letterSpacing: '-0.02em',
        }}>
          TAGLIATA
        </span>
      </AbsoluteFill>

      <ParticleField mode="polvere" opacity={0.16} count={28} />

      {/* Blocco aforisma centrato */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '0 120px', maxWidth: 1200 }}>

          {/* Riga 1 */}
          <div style={{ opacity: af1Fade, transform: `translateY(${af1Lift}px)`, marginBottom: 14 }}>
            <span style={{
              fontFamily: PLAYFAIR, fontSize: 56, fontWeight: 400, fontStyle: 'italic',
              color: COLORS.polvere,
              textShadow: '0 4px 20px rgba(0,0,0,0.90)',
            }}>
              I vigneti circostanti sembrano custodire quella quiete.
            </span>
          </div>

          {/* Riga 2 */}
          <div style={{ opacity: af2Fade, marginBottom: 14 }}>
            <span style={{
              fontFamily: LATO, fontSize: 28, fontWeight: 300,
              color: COLORS.biancoCalce,
              textShadow: '0 2px 12px rgba(0,0,0,0.85)',
              lineHeight: 1.6,
            }}>
              Ma sotto il silenzio della campagna irpina, tra le pietre consumate dal tempo,
            </span>
          </div>

          {/* Riga 3 */}
          <div style={{ opacity: af3Fade, marginBottom: 14 }}>
            <span style={{
              fontFamily: LATO, fontSize: 28, fontWeight: 300,
              color: COLORS.biancoCalce,
              textShadow: '0 2px 12px rgba(0,0,0,0.85)',
              lineHeight: 1.6,
            }}>
              risuona ancora l'eco di quell'estate del
              {' '}
              <strong style={{ fontFamily: PLAYFAIR, fontSize: 36, fontWeight: 700, color: COLORS.oroRomano }}>
                212 a.C.
              </strong>
            </span>
          </div>

          {/* Separatore */}
          <div style={{ opacity: lineOp, display: 'flex', justifyContent: 'center', marginBottom: 22, marginTop: 10 }}>
            <div style={{
              width: lineW, height: 2,
              background: `linear-gradient(to right, transparent, ${COLORS.oroRomano}, transparent)`,
            }} />
          </div>

          {/* Riga 4 */}
          <div style={{ opacity: af4Fade, marginBottom: 20 }}>
            <span style={{
              fontFamily: LATO, fontSize: 26, fontWeight: 300,
              color: COLORS.polvere,
              textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              lineHeight: 1.6,
            }}>
              di una città che scelse il lato sbagliato della storia,
              e ne pagò il prezzo sulla propria strada principale.
            </span>
          </div>

          {/* Tagline finale */}
          <div style={{ opacity: af5Fade, marginBottom: 16 }}>
            <span style={{
              fontFamily: PLAYFAIR, fontSize: 72, fontWeight: 700,
              color: COLORS.biancoCalce,
              textShadow: '0 4px 24px rgba(0,0,0,0.95)',
              letterSpacing: '-0.01em',
            }}>
              Cammina piano, su questa via.
            </span>
          </div>

          {/* Chiusura poetica */}
          <div style={{ opacity: tagFade }}>
            <span style={{
              fontFamily: PLAYFAIR, fontSize: 36, fontWeight: 400, fontStyle: 'italic',
              color: COLORS.oroRomano,
              textShadow: '0 2px 16px rgba(0,0,0,0.90)',
            }}>
              Ogni pietra ha memoria.
            </span>
          </div>

          {/* InnTour tagline */}
          <div style={{ opacity: interpolate(frame, [fps * 16, fps * 18], [0, 1], { extrapolateRight: 'clamp' }), marginTop: 28 }}>
            <span style={{
              fontFamily: LATO, fontSize: 18, fontWeight: 600,
              letterSpacing: '0.18em', color: COLORS.oroSoft, textTransform: 'uppercase',
            }}>
              Narratore Digitale di Lacedonia · InnTour S.R.L.
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Loghi */}
      <div style={{
        position: 'absolute',
        bottom: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 48,
        opacity: logoFade,
      }}>
        <Img
          src={staticFile(IMAGES.logoComune)}
          style={{ height: 96, objectFit: 'contain' }}
        />
        <div style={{ width: 1, height: 72, background: COLORS.grigioPietra }} />
        <Img
          src={staticFile(IMAGES.logoInnTour)}
          style={{ height: 80, objectFit: 'contain' }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Seq06 — Aforisma · Outro
 * 908f / 30.27s — "Un telegramma. Una scelta." · Circolarità + loghi
 */
import React from 'react';
import { AbsoluteFill, interpolate, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence06Aforisma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bookend: stessa hero image con zoom-out (circolarità narrativa)
  // Overlay più pesante per far emergere testo e loghi
  const overlayOp   = interpolate(frame, [0, fps * 1.5], [0.55, 0.75], { extrapolateRight: 'clamp' });

  // Aforisma fade-in
  const af1Fade  = interpolate(frame, [fps * 0.8, fps * 2.0], [0, 1], { extrapolateRight: 'clamp' });
  const af1Lift  = interpolate(frame, [fps * 0.8, fps * 2.0], [30, 0],  { extrapolateRight: 'clamp' });
  const af2Fade  = interpolate(frame, [fps * 2.2, fps * 3.5], [0, 1], { extrapolateRight: 'clamp' });
  const af3Fade  = interpolate(frame, [fps * 3.8, fps * 5.0], [0, 1], { extrapolateRight: 'clamp' });
  const af4Fade  = interpolate(frame, [fps * 5.2, fps * 6.8], [0, 1], { extrapolateRight: 'clamp' });
  const af5Fade  = interpolate(frame, [fps * 7.5, fps * 9.0], [0, 1], { extrapolateRight: 'clamp' });

  // Loghi
  const logoFade  = interpolate(frame, [fps * 16, fps * 18], [0, 1], { extrapolateRight: 'clamp' });

  // Iris SVG outro
  const irisProgress = interpolate(frame, [fps * 24, fps * 30.27], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const irisRadius = irisProgress * 1200;

  // Separatori — linee gold animate
  const line1Op = interpolate(frame, [fps * 5.5, fps * 6.2], [0, 1], { extrapolateRight: 'clamp' });
  const line1W  = interpolate(frame, [fps * 5.5, fps * 6.8], [0, 320], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Background: bookend — stessa hero con zoom-out */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-out" intensity={0.04} />

      {/* Overlay più pesante per climax */}
      <AbsoluteFill
        style={{
          background: `rgba(8,8,15,${overlayOp})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,15,0.40) 0%, rgba(8,8,15,0.70) 100%)',
        }}
      />

      {/* Iris SVG chiusura */}
      {irisProgress > 0 && (
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <mask id="iris-mask">
              <rect width="1920" height="1080" fill="white" />
              <circle cx="960" cy="540" r={Math.max(0, irisRadius)} fill="black" />
            </mask>
          </defs>
          <rect width="1920" height="1080" fill={COLORS.neroFondo} mask="url(#iris-mask)" />
        </svg>
      )}

      <ParticleField mode="sapere" opacity={0.20} count={30} />

      {/* Blocco aforisma — centrato */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '0 120px', maxWidth: 1200 }}>

          {/* Riga 1 */}
          <div style={{
            opacity: af1Fade,
            transform: `translateY(${af1Lift}px)`,
            marginBottom: 16,
          }}>
            <span style={{
              fontFamily: PLAYFAIR,
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.biancoCalce,
              textShadow: '0 4px 24px rgba(0,0,0,0.95)',
              letterSpacing: '-0.01em',
            }}>
              Un telegramma.
            </span>
          </div>

          {/* Riga 2 */}
          <div style={{ opacity: af2Fade, marginBottom: 16 }}>
            <span style={{
              fontFamily: PLAYFAIR,
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.biancoCalce,
              textShadow: '0 4px 24px rgba(0,0,0,0.95)',
            }}>
              Una scelta.
            </span>
          </div>

          {/* Riga 3 */}
          <div style={{ opacity: af3Fade, marginBottom: 32 }}>
            <span style={{
              fontFamily: PLAYFAIR,
              fontSize: 72,
              fontWeight: 400,
              fontStyle: 'italic',
              color: COLORS.oroIstruzione,
              textShadow: '0 4px 20px rgba(0,0,0,0.90)',
            }}>
              Un'intera regione che cambia destino.
            </span>
          </div>

          {/* Linea separatrice */}
          <div style={{
            opacity: line1Op,
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 32,
          }}>
            <div style={{
              width: line1W,
              height: 2,
              background: `linear-gradient(to right, transparent, ${COLORS.oroIstruzione}, transparent)`,
            }} />
          </div>

          {/* Riga 4 — la chiusa */}
          <div style={{ opacity: af4Fade, marginBottom: 24 }}>
            <span style={{
              fontFamily: LATO,
              fontSize: 30,
              fontWeight: 300,
              color: COLORS.beigeOratorio,
              textShadow: '0 2px 12px rgba(0,0,0,0.85)',
              lineHeight: 1.6,
            }}>
              De Sanctis lo sapeva:{' '}
              <strong style={{ fontWeight: 700, color: COLORS.biancoCalce }}>
                l'istruzione non era un privilegio
              </strong>
              {' '}— era un riscatto.
            </span>
          </div>

          {/* Tagline InnTour */}
          <div style={{ opacity: af5Fade }}>
            <span style={{
              fontFamily: LATO,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: COLORS.oroSoft,
              textTransform: 'uppercase',
            }}>
              Narratore Digitale di Lacedonia · InnTour S.R.L.
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Loghi */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        opacity: logoFade,
      }}>
        <Img
          src={staticFile(IMAGES.logoComune)}
          style={{ height: 96, objectFit: 'contain' }}
        />
        <div style={{ width: 1, height: 72, background: COLORS.grigioNebbia }} />
        <Img
          src={staticFile(IMAGES.logoInnTour)}
          style={{ height: 80, objectFit: 'contain' }}
        />
      </div>

    </AbsoluteFill>
  );
};

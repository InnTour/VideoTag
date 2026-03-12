/**
 * Seq04 — Risoluzione · Il Recupero · Outro
 * 498f / 16.6s — zoom-out bookend · percorsi naturalistici · loghi
 */
import React from 'react';
import { AbsoluteFill, interpolate, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { IMAGES, COLORS, PLAYFAIR, LATO } from './constants';

export const Sequence04Risoluzione: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const overlayOp = interpolate(frame, [0, fps * 1.5], [0.48, 0.70], { extrapolateRight: 'clamp' });

  const card1Fade = interpolate(frame, [fps * 0.6, fps * 1.6], [0, 1], { extrapolateRight: 'clamp' });
  const card1Lift = interpolate(frame, [fps * 0.6, fps * 1.6], [24, 0],  { extrapolateRight: 'clamp' });
  const af1Fade   = interpolate(frame, [fps * 4.5, fps * 5.8], [0, 1], { extrapolateRight: 'clamp' });
  const af1Lift   = interpolate(frame, [fps * 4.5, fps * 5.8], [24, 0],  { extrapolateRight: 'clamp' });
  const af2Fade   = interpolate(frame, [fps * 6.2, fps * 7.5], [0, 1], { extrapolateRight: 'clamp' });
  const tagFade   = interpolate(frame, [fps * 8.5, fps * 10.0], [0, 1], { extrapolateRight: 'clamp' });
  const logoFade  = interpolate(frame, [fps * 10.5, fps * 12.0], [0, 1], { extrapolateRight: 'clamp' });

  // Iris SVG outro
  const irisProgress = interpolate(frame, [fps * 13.0, fps * 16.6], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const irisRadius = irisProgress * 1200;

  // Ghost "SOGLIA"
  const ghostOp = interpolate(frame, [fps * 1, fps * 3], [0, 0.050], { extrapolateRight: 'clamp' });

  // Linea oro
  const lineW = interpolate(frame, [fps * 3.8, fps * 5.0], [0, 340], { extrapolateRight: 'clamp' });
  const lineOp = interpolate(frame, [fps * 3.8, fps * 4.4], [0, 1], { extrapolateRight: 'clamp' });

  // Cross-dissolve: rupiRecupero → porta (bookend circolare, ~3–6s)
  const dissolve = interpolate(frame, [fps * 3, fps * 6], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Layer 1: i percorsi naturalistici sulle Rupi recuperate */}
      <KenBurnsImage src={IMAGES.rupiRecupero} motion="zoom-in" intensity={0.04} objectPosition="center 60%" />
      {/* Layer 2: dissolve verso porta hero — bookend circolare */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.porta} motion="zoom-out" intensity={0.04} objectPosition="center top" />
      </div>

      <AbsoluteFill style={{ background: `rgba(10,8,4,${overlayOp})` }} />
      <AbsoluteFill style={{
        background: 'linear-gradient(to bottom, rgba(10,8,4,0.30) 0%, rgba(10,8,4,0.65) 100%)',
      }} />

      {/* Iris SVG */}
      {irisProgress > 0 && (
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <mask id="iris-pls">
              <rect width="1920" height="1080" fill="white" />
              <circle cx="960" cy="540" r={Math.max(0, irisRadius)} fill="black" />
            </mask>
          </defs>
          <rect width="1920" height="1080" fill={COLORS.neroFondo} mask="url(#iris-pls)" />
        </svg>
      )}

      {/* Ghost "SOGLIA" */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: ghostOp, pointerEvents: 'none' }}>
        <span style={{
          fontFamily: PLAYFAIR, fontSize: 220, fontWeight: 700,
          color: COLORS.verdeRupi, userSelect: 'none', letterSpacing: '-0.02em',
        }}>SOGLIA</span>
      </AbsoluteFill>

      <ParticleField mode="verde" opacity={0.14} count={28} />

      {/* Card recupero */}
      <div style={{
        position: 'absolute', top: 100, left: 80,
        opacity: card1Fade, transform: `translateY(${card1Lift}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,4,0.80)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,168,67,0.30)',
          borderRadius: 16,
          padding: '26px 34px',
          maxWidth: 720,
        }}>
          <div style={{
            fontFamily: LATO, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.20em', color: COLORS.oroOrsini,
            textTransform: 'uppercase', marginBottom: 14,
          }}>Il Ritorno alla Vita</div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 40, fontWeight: 700,
            color: COLORS.biancoCalce, lineHeight: 1.25, marginBottom: 14,
          }}>La porta è stata recuperata come punto di accesso.</div>
          <div style={{
            fontFamily: LATO, fontSize: 24, fontWeight: 300,
            color: COLORS.seppiaAntica, lineHeight: 1.6,
          }}>
            Grazie ai lavori di messa in sicurezza del costone delle Rupi,
            oggi è soglia per{' '}
            <strong style={{ color: COLORS.biancoCalce }}>
              percorsi naturalistici e itinerari della memoria
            </strong>.
          </div>
        </div>
      </div>

      {/* Linea separatrice */}
      <div style={{ position: 'absolute', bottom: 310, left: 80, opacity: lineOp }}>
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(to right, ${COLORS.oroOrsini}, transparent)`,
        }} />
      </div>

      {/* Tagline narrativa */}
      <div style={{
        position: 'absolute', bottom: 240, left: 80,
        opacity: af1Fade, transform: `translateY(${af1Lift}px)`,
      }}>
        <div style={{
          fontFamily: PLAYFAIR, fontSize: 54, fontWeight: 700,
          color: COLORS.biancoCalce,
          textShadow: '0 4px 20px rgba(0,0,0,0.95)',
          maxWidth: 900,
        }}>Una soglia tra il borgo e il paesaggio rurale.</div>
      </div>

      {/* Chiusura poetica */}
      <div style={{ position: 'absolute', bottom: 170, left: 80, opacity: af2Fade }}>
        <div style={{
          fontFamily: PLAYFAIR, fontSize: 34, fontWeight: 400, fontStyle: 'italic',
          color: COLORS.oroOrsini, textShadow: '0 2px 14px rgba(0,0,0,0.90)',
        }}>Restituita alla sua dignità, dopo cinque secoli di silenzio.</div>
      </div>

      {/* InnTour tagline */}
      <div style={{ position: 'absolute', bottom: 120, left: 80, opacity: tagFade }}>
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

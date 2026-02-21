import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS, playfairFont, latoFont} from './constants';

// ── Seq04 — Il Miracolo 1948 (~14s · 420 frame) ──────────────────
// Madonna Addolorata · Lacrime animate SVG · Anno ghost "1948"
// Overlay blu lacrime · Card miracolo glassmorphism

export const Sequence04IlMiracolo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Titolo entrance
  const titleEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: {damping: 180},
  });

  // Card principale entrance
  const cardEntrance = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: {damping: 160},
  });

  // Anno ghost "1948" — respiro lento
  const ghost1948Op = Math.sin(frame / 52) * 0.014 + 0.080;

  // Overlay blu lacrime — sale progressivamente
  const bluOverlayOp = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Lacrime SVG: 3 gocce con offset di fase
  // Ogni goccia: y scorre da 200 a 400 in loop su 90 frame
  const tearY1 = ((frame % 90) / 90) * 200 + 180;
  const tearY2 = (((frame + 30) % 90) / 90) * 200 + 180;
  const tearY3 = (((frame + 60) % 90) / 90) * 200 + 180;

  // Opacità lacrime: appaiono dopo la card
  const tearOpacity = interpolate(frame, [80, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <KenBurnsImage
        src={IMAGES.madonna}
        motion="zoom-in"
        intensity={0.05}
        objectPosition="center 40%"
      />

      {/* Gradient overlay — sinistra scura */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(8,8,12,0.94) 0%, rgba(8,8,12,0.64) 52%, rgba(8,8,12,0.20) 100%)',
          'linear-gradient(to top, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.24) 60%, transparent 100%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Overlay blu lacrime — tonalità del miracolo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(26,58,107,0.22)`,
        mixBlendMode: 'overlay',
        opacity: bluOverlayOp,
        pointerEvents: 'none',
      }} />

      {/* Ghost "1948" — verticale destra */}
      <div style={{
        position: 'absolute', top: 0, right: 70,
        fontFamily: playfairFont,
        fontSize: 160,
        fontWeight: 700,
        color: COLORS.bluLacrime,
        opacity: ghost1948Op,
        pointerEvents: 'none',
        lineHeight: 1,
        writingMode: 'vertical-rl',
      }}>
        1948
      </div>

      {/* Lacrime animate SVG — 3 gocce argentate */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: tearOpacity,
        pointerEvents: 'none',
      }}>
        <svg
          width="1920"
          height="1080"
          style={{position: 'absolute', inset: 0}}
        >
          {/* Goccia 1 */}
          <ellipse
            cx={870}
            cy={tearY1}
            rx={8}
            ry={18}
            fill={COLORS.argento}
            opacity={0.72}
          />
          {/* Goccia 2 */}
          <ellipse
            cx={898}
            cy={tearY2}
            rx={8}
            ry={18}
            fill={COLORS.argento}
            opacity={0.60}
          />
          {/* Goccia 3 */}
          <ellipse
            cx={856}
            cy={tearY3}
            rx={7}
            ry={16}
            fill={COLORS.argento}
            opacity={0.50}
          />
        </svg>
      </div>

      {/* Titolo */}
      <div style={{
        position: 'absolute', left: 72, top: 58,
        opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleEntrance, [0, 1], [24, 0])}px)`,
      }}>
        <div style={{
          fontFamily: playfairFont,
          fontSize: 102,
          fontWeight: 700,
          color: COLORS.argento,
          lineHeight: 1.04,
          textShadow: '0 2px 36px rgba(0,0,0,0.96)',
        }}>
          Aprile 1948 — Il Miracolo
        </div>
      </div>

      {/* Card principale — il miracolo */}
      <div style={{
        position: 'absolute', left: 72, top: 260,
        opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(20px)',
        borderRadius: 8,
        border: `1px solid rgba(192,200,212,0.28)`,
        padding: '26px 32px',
        maxWidth: 600,
      }}>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: COLORS.argento,
          marginBottom: 14,
        }}>
          Madonna Addolorata · Lacedonia
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.58,
        }}>
          La statua della{' '}
          <strong style={{color: COLORS.argento}}>Madonna Addolorata</strong>{' '}
          mosse gli occhi e versò lacrime per diversi giorni, attirando migliaia di pellegrini da tutto il Mezzogiorno.
        </div>
      </div>

      <ParticleField opacity={0.20} mode="polvere" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS, playfairFont, latoFont} from './constants';

// ── Seq02 — Iside, Dioscuri & Aquilonia (~17s · 500 frame) ──────
// Triple cross-dissolve: iside1 → iside2 → ibrido
// 3 GlassCards in cascata · Ghost "AQUILONIA" · Overlay ambraEgizia

export const Sequence02IsideStrati: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Cross-dissolve triplo
  // Layer 1 (iside1): 0-180 pieno, poi si dissolve a 0 entro 250f
  const d1out = interpolate(frame, [180, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Layer 2 (iside2): entra da 150f, esce da 330f
  const d2in = interpolate(frame, [150, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const d2out = interpolate(frame, [330, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Layer 3 (ibrido): entra da 380f, rimane
  const d3in = interpolate(frame, [380, 460], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const op1 = Math.max(0, 1 - d1out);
  const op2 = Math.max(0, Math.min(d2in, 1 - d2out));
  const op3 = Math.max(0, d3in);

  // Cards in cascata — offset 90f
  const card1 = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: {damping: 160},
  });
  const card2 = spring({
    frame: Math.max(0, frame - 100),
    fps,
    config: {damping: 160},
  });
  const card3 = spring({
    frame: Math.max(0, frame - 190),
    fps,
    config: {damping: 160},
  });

  // Ghost AQUILONIA — respiro lento
  const ghostOp = Math.sin(frame / 60) * 0.012 + 0.060;

  // Titolo entrance
  const titleEntrance = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: {damping: 200},
  });

  // Overlay ambraEgizia — cresce con d2in
  const ambraOverlayOp = interpolate(frame, [150, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      {/* Layer 1 — sacerdotesse notturne */}
      <div style={{position: 'absolute', inset: 0, opacity: op1}}>
        <KenBurnsImage
          src={IMAGES.iside1}
          motion="zoom-in"
          intensity={0.05}
          objectPosition="center center"
        />
      </div>
      {/* Layer 2 — sacerdotesse con incenso */}
      <div style={{position: 'absolute', inset: 0, opacity: op2}}>
        <KenBurnsImage
          src={IMAGES.iside2}
          motion="pan-right"
          intensity={0.04}
          objectPosition="center center"
        />
      </div>
      {/* Layer 3 — interno ibrido egizio-cristiano */}
      <div style={{position: 'absolute', inset: 0, opacity: op3}}>
        <KenBurnsImage
          src={IMAGES.ibrido}
          motion="zoom-out"
          intensity={0.04}
          objectPosition="center center"
        />
      </div>

      {/* Gradient overlay testo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.56) 52%, rgba(8,8,12,0.14) 100%)',
          'linear-gradient(to top, rgba(8,8,12,0.80) 0%, rgba(8,8,12,0.16) 60%, transparent 100%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* Overlay ambraEgizia — atmosfera isiaca */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(200,120,26,0.14)`,
        mixBlendMode: 'overlay',
        opacity: ambraOverlayOp,
        pointerEvents: 'none',
      }} />

      {/* Ghost "AQUILONIA" — verticale, destra */}
      <div style={{
        position: 'absolute', top: 0, right: 60,
        fontFamily: playfairFont,
        fontSize: 110,
        fontWeight: 700,
        color: COLORS.ambraEgizia,
        opacity: ghostOp,
        pointerEvents: 'none',
        lineHeight: 1,
        writingMode: 'vertical-rl',
      }}>
        AQUILONIA
      </div>

      {/* Titolo */}
      <div style={{
        position: 'absolute', left: 72, top: 58,
        opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleEntrance, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontFamily: playfairFont,
          fontSize: 96,
          fontWeight: 700,
          color: COLORS.oroEgizio,
          lineHeight: 1.06,
          textShadow: '0 2px 32px rgba(0,0,0,0.96)',
        }}>
          Iside, Dioscuri e Aquilonia
        </div>
      </div>

      {/* Card 1 — Tempio di Iside · 30 a.C. */}
      <div style={{
        position: 'absolute', left: 72, top: 220,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(18px)',
        borderRadius: 8,
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '20px 28px',
        maxWidth: 560,
      }}>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: COLORS.ambraEgizia,
          marginBottom: 10,
        }}>
          Tempio di Iside — 30 a.C.
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.55,
        }}>
          Le colonne corinzie che vedete sono i resti originali del tempio pagano
        </div>
      </div>

      {/* Card 2 — Municipium di Aquilonia */}
      <div style={{
        position: 'absolute', left: 72, top: 430,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(18px)',
        borderRadius: 8,
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '20px 28px',
        maxWidth: 560,
      }}>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: COLORS.oroEgizio,
          marginBottom: 10,
        }}>
          Municipium di Aquilonia
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.55,
        }}>
          Prova tangibile della città romana che sorge sotto Lacedonia
        </div>
      </div>

      {/* Card 3 — I Dioscuri */}
      <div style={{
        position: 'absolute', left: 72, top: 650,
        opacity: interpolate(card3, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card3, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(18px)',
        borderRadius: 8,
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '20px 28px',
        maxWidth: 560,
      }}>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: COLORS.linoSacro,
          marginBottom: 10,
        }}>
          I Dioscuri
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.55,
        }}>
          Precedentemente dedicato ai Dioscuri, prima ancora della dea Iside
        </div>
      </div>

      <ParticleField opacity={0.28} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

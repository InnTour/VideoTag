import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS, playfairFont, latoFont} from './constants';

// ── Seq03 — La Cattedrale Perduta (~15s · 440 frame) ─────────────
// Cross-dissolve: vescovi → mosaici
// Card "Fino al 1705" + Card "1840 Terme Romane" · Ghost "1705"

export const Sequence03LaCattedrale: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Cross-dissolve vescovi → mosaici
  const dissolve = interpolate(frame, [180, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Titolo entrance
  const titleEntrance = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: {damping: 200},
  });

  // Cards in cascata
  const card1 = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: {damping: 160},
  });
  const card2 = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: {damping: 160},
  });

  // Ghost "1705" — respiro lento
  const ghost1705Op = Math.sin(frame / 55) * 0.012 + 0.070;

  // Overlay oroMedievale cresce con il dissolve → atmosfera cattedrale
  const oroOverlayOp = interpolate(frame, [180, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      {/* Layer 1 — figure episcopali */}
      <div style={{position: 'absolute', inset: 0, opacity: Math.max(0, 1 - dissolve)}}>
        <KenBurnsImage
          src={IMAGES.vescovi}
          motion="zoom-in"
          intensity={0.04}
          objectPosition="center center"
        />
      </div>
      {/* Layer 2 — interno con mosaici */}
      <div style={{position: 'absolute', inset: 0, opacity: Math.max(0, dissolve)}}>
        <KenBurnsImage
          src={IMAGES.mosaici}
          motion="pan-right"
          intensity={0.04}
          objectPosition="center center"
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.58) 50%, rgba(8,8,12,0.16) 100%)',
          'linear-gradient(to top, rgba(8,8,12,0.82) 0%, rgba(8,8,12,0.18) 60%, transparent 100%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* Overlay oroMedievale — atmosfera cattedrale medieval */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(212,168,67,0.12)`,
        mixBlendMode: 'overlay',
        opacity: oroOverlayOp,
        pointerEvents: 'none',
      }} />

      {/* Ghost "1705" — verticale destra */}
      <div style={{
        position: 'absolute', top: 0, right: 60,
        fontFamily: playfairFont,
        fontSize: 130,
        fontWeight: 700,
        color: COLORS.oroMedievale,
        opacity: ghost1705Op,
        pointerEvents: 'none',
        lineHeight: 1,
        writingMode: 'vertical-rl',
      }}>
        1705
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
          color: COLORS.linoSacro,
          lineHeight: 1.06,
          textShadow: '0 2px 32px rgba(0,0,0,0.96)',
        }}>
          La Cattedrale Perduta
        </div>
      </div>

      {/* Card 1 — Fino al 1705 · Cattedrale della Diocesi */}
      <div style={{
        position: 'absolute', left: 72, top: 230,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(18px)',
        borderRadius: 8,
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '22px 30px',
        maxWidth: 580,
      }}>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: COLORS.oroMedievale,
          marginBottom: 10,
        }}>
          Fino al 1705 — Cattedrale della Diocesi
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.55,
        }}>
          Per secoli fu la sede vescovile. Il nome{' '}
          <em style={{color: COLORS.linoSacro}}>"Cancellata"</em>{' '}
          dalla recinzione che divideva la navata dal presbiterio.
        </div>
      </div>

      {/* Card 2 — 1840 · Le Terme Romane */}
      <div style={{
        position: 'absolute', left: 72, top: 530,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: COLORS.glassScuro,
        backdropFilter: 'blur(18px)',
        borderRadius: 8,
        border: `1px solid rgba(212,160,48,0.22)`,
        padding: '22px 30px',
        maxWidth: 580,
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
          1840 — Le Terme Romane
        </div>
        <div style={{
          fontFamily: latoFont,
          fontWeight: 300,
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.55,
        }}>
          Durante la rimozione di un albero di pero, scoperte sotto la chiesa le terme romane con pavimenti a mosaico.
        </div>
      </div>

      <ParticleField opacity={0.22} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

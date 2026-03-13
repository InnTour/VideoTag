import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS} from './constants';

const {fontFamily: latoFamily} = loadLato();

// ── Seq03 — La Chiave (~13.3s · 400 frame) ─────────────────────
// La chiave cade nel pozzo · Bambino Gesù · "Pensaci tu."

export const Sequence03LaChiave: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const dissolve = interpolate(frame, [120, 220], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const card1 = spring({frame: Math.max(0, frame - 15), fps, config: {damping: 200}});
  const card2 = spring({frame: Math.max(0, frame - 90), fps, config: {damping: 200}});
  const quoteEntrance = spring({frame: Math.max(0, frame - 200), fps, config: {damping: 200}});

  // Goccia che cade — animazione chiave nel pozzo
  const dropY = interpolate(frame, [30, 90], [0, 280], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const dropOpacity = interpolate(frame, [20, 40, 80, 100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const waterRipple = interpolate(frame, [92, 180], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const rippleRadius = waterRipple * 80;
  const rippleOpacity = interpolate(waterRipple, [0, 0.3, 1], [0, 0.9, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
        <KenBurnsImage src={IMAGES.pozzo} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
        <KenBurnsImage src={IMAGES.miracolo} motion="pan-up" intensity={0.06} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,12,0.91) 0%, rgba(8,8,12,0.54) 50%, rgba(8,8,12,0.14) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Animazione goccia/chiave */}
      {dropOpacity > 0 && (
        <div style={{
          position: 'absolute', right: 340, top: 200 + dropY,
          opacity: dropOpacity,
          fontSize: 42, filter: 'drop-shadow(0 0 12px rgba(240,192,64,0.8))',
        }}>🗝️</div>
      )}

      {/* Ripple acqua */}
      {rippleOpacity > 0 && (
        <svg style={{position: 'absolute', inset: 0, pointerEvents: 'none'}} width="1920" height="1080">
          <circle cx="1580" cy="540" r={rippleRadius} fill="none"
            stroke={COLORS.azzurroAcqua} strokeWidth="2" opacity={rippleOpacity} />
          <circle cx="1580" cy="540" r={rippleRadius * 0.6} fill="none"
            stroke={COLORS.azzurroAcqua} strokeWidth="1.5" opacity={rippleOpacity * 0.6} />
        </svg>
      )}

      {/* Card 1 — L'incidente */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)})}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(74,143,170,0.25)`,
        padding: '24px 32px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: COLORS.azzurroAcqua, marginBottom: 10,
        }}>L'episodio</div>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 24,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          La chiave del Palazzo Vescovile<br />
          cade accidentalmente nel pozzo.<br />
          <em style={{color: COLORS.oroMiracolo}}>Nessuno riesce a recuperarla.</em>
        </div>
      </div>

      {/* Card 2 — Gerardo prega */}
      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)})}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,192,64,0.22)`,
        padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 22,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Gerardo si inginocchia davanti al pozzo<br />
          e prega. Poi, rivolto all'abisso d'acqua,<br />
          dice tranquillo al <strong style={{color: COLORS.oroMiracolo}}>Bambino Gesù</strong>:
        </div>
      </div>

      {/* La citazione */}
      <div style={{
        position: 'absolute', left: 72, bottom: 90,
        opacity: quoteEntrance,
        transform: `translateY(${interpolate(quoteEntrance, [0, 1], [20, 0], {easing: Easing.out(Easing.cubic)})}px)`,
      }}>
        <div style={{
          borderLeft: `4px solid ${COLORS.oroMiracolo}`,
          paddingLeft: 24,
          fontFamily: 'Georgia, serif',
          fontSize: 34, fontStyle: 'italic',
          color: COLORS.oroMiracolo,
          textShadow: '0 0 40px rgba(240,192,64,0.30)',
        }}>
          "Pensaci tu."
        </div>
      </div>

      <ParticleField count={30} opacity={0.25} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

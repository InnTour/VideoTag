import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq01 — Intro (~9.3s · 280 frame) ──────────────────────────
// Hero: immagine del luogo — badge · titolo spring · sottotitolo

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 5, 12], [0.45, 0.15, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const badgeEntrance = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeX = interpolate(badgeEntrance, [0, 1], [-40, 0]);

  const lineWidth = interpolate(frame, [22, 90], [0, 300], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const titleEntrance = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 160, stiffness: 80 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [40, 0]);

  const subEntrance = spring({ frame: Math.max(0, frame - 52), fps, config: { damping: 200 } });
  const subOpacity = subEntrance;
  const subY = interpolate(subEntrance, [0, 1], [14, 0]);

  const waterPulse = Math.sin(frame / 35) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.05} objectPosition="center center" />

      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.58) 50%, rgba(8,8,12,0.16) 100%)',
          'linear-gradient(to top, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.20) 55%, transparent 100%)',
        ].join(', '),
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Spotlight acqua azzurra */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 600px 400px at 72% 45%, rgba(74,143,170,${0.10 + waterPulse}), transparent 70%)`,
      }} />

      {flashOpacity > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: COLORS.biancoPurezza, opacity: flashOpacity }} />
      )}

      {/* BADGE */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeEntrance,
        transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.azzurroAcqua,
          padding: '6px 20px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 13, letterSpacing: '0.16em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione A2 · Architettura e Monumenti
        </div>
      </div>

      {/* TITOLO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroMiracolo}, transparent)`,
          marginBottom: 22,
        }} />
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 88, fontWeight: 700,
          color: COLORS.biancoCalce, lineHeight: 1.05,
          textShadow: '0 2px 32px rgba(0,0,0,0.95), 0 0 80px rgba(240,192,64,0.18)',
          maxWidth: 860,
        }}>
          Pozzo del<br />
          <span style={{ color: COLORS.oroMiracolo }}>Miracolo</span>
        </div>
        <div style={{
          position: 'absolute', right: -120, top: -30,
          fontFamily: 'Playfair Display, serif',
          fontSize: 150, fontWeight: 700,
          color: COLORS.oroMiracolo, opacity: 0.06,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>A2.08</div>
      </div>

      {/* SOTTOTITOLO */}
      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        maxWidth: 700,
        fontFamily: 'Lato, sans-serif', fontSize: 26, fontWeight: 300,
        color: COLORS.biancoCalce, letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        Dove la fede scende più in fondo dell'acqua
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

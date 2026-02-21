import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq01 — Intro (~8.0s · 240 frame) ──────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 5, 12], [0.40, 0.12, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const badgeEntrance = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeX = interpolate(badgeEntrance, [0, 1], [-40, 0]);

  const lineWidth = interpolate(frame, [22, 88], [0, 290], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const titleEntrance = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 160, stiffness: 80 } });
  const subEntrance = spring({ frame: Math.max(0, frame - 52), fps, config: { damping: 200 } });

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

      {flashOpacity > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: COLORS.linoSacro, opacity: flashOpacity }} />
      )}

      <div style={{ position: 'absolute', top: 52, left: 72, opacity: badgeEntrance, transform: `translateX(${badgeX}px)` }}>
        <div style={{
          background: COLORS.ambraEgizia, padding: '6px 20px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 13,
          letterSpacing: '0.16em', color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione A2 · Architettura e Monumenti
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleEntrance, [0, 1], [40, 0])}px)`,
      }}>
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroEgizio}, transparent)`,
          marginBottom: 22,
        }} />
        <div style={{
          fontFamily: 'Playfair Display, serif', fontSize: 82, fontWeight: 700,
          color: COLORS.biancoCalce, lineHeight: 1.05,
          textShadow: '0 2px 32px rgba(0,0,0,0.95)',
          maxWidth: 860,
        }}>
          Chiesa Santa Maria<br />
          <span style={{ color: COLORS.oroEgizio }}>della Cancellata</span>
        </div>
        <div style={{
          position: 'absolute', right: -120, top: -30,
          fontFamily: 'Playfair Display, serif', fontSize: 150, fontWeight: 700,
          color: COLORS.oroEgizio, opacity: 0.06, pointerEvents: 'none',
        }}>A2.09</div>
      </div>

      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: subEntrance,
        transform: `translateY(${interpolate(subEntrance, [0, 1], [14, 0])}px)`,
        maxWidth: 700, fontFamily: 'Lato, sans-serif', fontSize: 26, fontWeight: 300,
        color: COLORS.biancoCalce, letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        Due millenni di fede stratificata nella più antica chiesa di Lacedonia
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

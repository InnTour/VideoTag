import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOp = interpolate(frame, [0, 5, 12], [0.40, 0.12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badge = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const lineW = interpolate(frame, [22, 90], [0, 290], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const title = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 160, stiffness: 80 } });
  const sub = spring({ frame: Math.max(0, frame - 52), fps, config: { damping: 200 } });
  const lightPulse = Math.sin(frame / 32) * 0.05 + 0.12;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      <div style={{ position: 'absolute', inset: 0, background: ['linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.58) 50%, rgba(8,8,12,0.16) 100%)', 'linear-gradient(to top, rgba(8,8,12,0.88) 0%, transparent 55%)'].join(', ') }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.75) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 600px 400px at 65% 40%, rgba(240,208,96,${lightPulse}), transparent 70%)` }} />

      {flashOp > 0 && <div style={{ position: 'absolute', inset: 0, background: COLORS.pietraChiara, opacity: flashOp }} />}

      <div style={{ position: 'absolute', top: 52, left: 72, opacity: badge, transform: `translateX(${interpolate(badge, [0, 1], [-40, 0])}px)` }}>
        <div style={{ background: COLORS.marmoRosso, padding: '6px 20px', borderRadius: 2, fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.16em', color: COLORS.biancoCalce, textTransform: 'uppercase' }}>
          Sezione A3 · Architettura e Monumenti
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 230, opacity: interpolate(title, [0, 1], [0, 1]), transform: `translateY(${interpolate(title, [0, 1], [40, 0])}px)` }}>
        <div style={{ width: lineW, height: 3, background: `linear-gradient(to right, ${COLORS.oroVescovile}, transparent)`, marginBottom: 22 }} />
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 88, fontWeight: 700, color: COLORS.biancoCalce, lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.95)', maxWidth: 860 }}>
          Cappella<br /><span style={{ color: COLORS.oroVescovile }}>Santissima Trinità</span>
        </div>
        <div style={{ position: 'absolute', right: -120, top: -30, fontFamily: 'Playfair Display, serif', fontSize: 150, fontWeight: 700, color: COLORS.oroVescovile, opacity: 0.06, pointerEvents: 'none' }}>A3.02</div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 148, opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [14, 0])}px)`, maxWidth: 700, fontFamily: 'Lato, sans-serif', fontSize: 26, fontWeight: 300, color: COLORS.biancoCalce, letterSpacing: '0.04em', textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}>
        Dal 1697 al 2002 — una cappella che ha sfidato terremoti e demoni
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

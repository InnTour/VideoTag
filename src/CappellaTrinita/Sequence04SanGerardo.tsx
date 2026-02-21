import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq04 — San Gerardo (~18.0s · 540 frame) ───────────────────
// Gerardo sottomette il demonio durante la tempesta

export const Sequence04SanGerardo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [160, 270], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Lightning flash doppio (tempesta)
  const flash1 = interpolate(frame, [55, 58, 72], [0, 0.60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flash2 = interpolate(frame, [80, 83, 96], [0, 0.45, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 310), fps, config: { damping: 160 } });

  const tempestaPulse = interpolate(frame, [40, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (1 - interpolate(frame, [100, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.gerardo} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.interno} motion="pan-left" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Lightning effect */}
      {(flash1 > 0 || flash2 > 0) && (
        <div style={{ position: 'absolute', inset: 0, background: COLORS.lightningGold, opacity: Math.max(flash1, flash2), mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }} />
      )}
      {tempestaPulse > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: `rgba(26,58,107,${tempestaPulse * 0.28})` }} />
      )}

      <div style={{ position: 'absolute', top: 0, right: 50, writingMode: 'vertical-rl', fontFamily: 'Lato, sans-serif', fontSize: 100, fontWeight: 700, color: COLORS.lightningGold, opacity: 0.06, pointerEvents: 'none', lineHeight: 1, letterSpacing: '0.04em' }}>TEMPESTA</div>

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(240,208,96,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.lightningGold, marginBottom: 10 }}>San Gerardo Maiella</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Proprio qui, in questa cappella,<br />
          durante una <strong style={{ color: COLORS.lightningGold }}>tempesta violenta</strong>,<br />
          Gerardo affronta il demonio.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 240, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(58,122,154,0.25)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Prega intensamente e la tempesta cessa.<br />
          Il murales in <em style={{ color: COLORS.azzurroCielo }}>ceramica sulla facciata</em><br />
          immortala l'episodio ancora oggi.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 90, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(200,152,48,0.25)`, padding: '18px 26px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.oroVescovile, marginBottom: 8 }}>Sisma 1980 → Riapertura 2002</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 21, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il terremoto dell'Irpinia la danneggia gravemente.<br />
          <em style={{ color: COLORS.oroVescovile }}>Riedificata e riconsacrata nel 2002.</em>
        </div>
      </div>

      <ParticleField count={35} opacity={0.28} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

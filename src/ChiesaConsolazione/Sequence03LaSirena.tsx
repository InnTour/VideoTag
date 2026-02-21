import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq03 — La Sirena (~14.0s · 420 frame) ─────────────────────
// Acquasantiera con sirena bicaudata · simbolo di rigenerazione

export const Sequence03LaSirena: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [130, 230], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 180 } });

  // Animazione code sirena (SVG sinusoidale)
  const tailSwing1 = Math.sin(frame / 18) * 12;
  const tailSwing2 = Math.sin(frame / 18 + Math.PI) * 12;
  const bodyBob = Math.sin(frame / 28) * 4;
  const glowPulse = Math.sin(frame / 30) * 0.06 + 0.14;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.fonte} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.chiesa} motion="pan-right" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Acqua glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 500px 350px at 68% 45%, rgba(26,122,106,${glowPulse}), transparent 70%)`,
      }} />

      {/* Sirena SVG animata */}
      <svg style={{ position: 'absolute', right: 140, top: 160, pointerEvents: 'none', opacity: 0.90 * (1 - dissolve) + 0.10 }}
        width="220" height="360" viewBox="0 0 220 360">
        <defs>
          <radialGradient id="siren-glow-cc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.acquaBlu} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLORS.acquaBlu} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="170" rx="90" ry="120" fill="url(#siren-glow-cc)" />
        {/* Corpo */}
        <ellipse cx="110" cy={140 + bodyBob} rx="26" ry="42" fill={COLORS.sirenoTeal} opacity={0.85} />
        {/* Testa */}
        <circle cx="110" cy={88 + bodyBob} r="22" fill={COLORS.travertino} opacity={0.90} />
        {/* Coda sinistra */}
        <path d={`M 84,${180 + bodyBob} Q ${60 + tailSwing1},${230 + bodyBob} ${48},${280 + bodyBob}`}
          stroke={COLORS.acquaBlu} strokeWidth="8" fill="none" strokeLinecap="round" opacity={0.85} />
        <ellipse cx="48" cy={285 + bodyBob} rx="18" ry="9"
          transform={`rotate(${-30 + tailSwing1 * 0.6}, 48, ${285 + bodyBob})`}
          fill={COLORS.acquaBlu} opacity={0.80} />
        {/* Coda destra */}
        <path d={`M 136,${180 + bodyBob} Q ${160 + tailSwing2},${230 + bodyBob} ${172},${280 + bodyBob}`}
          stroke={COLORS.acquaBlu} strokeWidth="8" fill="none" strokeLinecap="round" opacity={0.85} />
        <ellipse cx="172" cy={285 + bodyBob} rx="18" ry="9"
          transform={`rotate(${30 + tailSwing2 * 0.6}, 172, ${285 + bodyBob})`}
          fill={COLORS.acquaBlu} opacity={0.80} />
        {/* Braccia distese */}
        <path d={`M 84,${150 + bodyBob} Q ${50},${160 + bodyBob} ${34},${152 + bodyBob}`}
          stroke={COLORS.travertino} strokeWidth="5" fill="none" opacity={0.80} />
        <path d={`M 136,${150 + bodyBob} Q ${170},${160 + bodyBob} ${186},${152 + bodyBob}`}
          stroke={COLORS.travertino} strokeWidth="5" fill="none" opacity={0.80} />
      </svg>

      {/* Card 1 — L'acquasantiera */}
      <div style={{
        position: 'absolute', left: 72, top: 130,
        opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(26,122,106,0.30)`, padding: '22px 30px', maxWidth: 500,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.sirenoTeal, marginBottom: 10 }}>Acquasantiera medievale</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Un capolavoro dell'arte medievale:<br />
          una <strong style={{ color: COLORS.sirenoTeal }}>sirena a due code</strong> scolpita nella pietra,<br />
          simbolo di rigenerazione spirituale.
        </div>
      </div>

      {/* Card 2 — Museo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 220,
        opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(200,152,48,0.22)`, padding: '20px 28px', maxWidth: 480,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Trasferita al <strong style={{ color: COLORS.oroAntico }}>Museo Diocesano</strong><br />
          per preservarla dai rischi del tempo —<br />
          ma la sua presenza aleggia ancora qui.
        </div>
      </div>

      {/* Card 3 — Antiche terme */}
      <div style={{
        position: 'absolute', left: 72, bottom: 80,
        opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(42,96,128,0.25)`, padding: '18px 26px', maxWidth: 480,
      }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 21, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Nei pressi: le <em style={{ color: COLORS.acquaBlu }}>antiche terme romane</em><br />
          e la Colonna del Pedoca — lo stesso strato<br />
          di storia che affiora ovunque.
        </div>
      </div>

      <ParticleField count={30} opacity={0.24} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

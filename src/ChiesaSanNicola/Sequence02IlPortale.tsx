import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq02 — Il Portale (~16.3s · 490 frame) ────────────────────

export const Sequence02IlPortale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [150, 250], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Wipe rivelatore da sinistra
  const wipeX = interpolate(frame, [20, 120], [0, 1920], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wipeOp = interpolate(frame, [100, 140], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 160 } });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.portale} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.navata} motion="pan-right" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      {/* Wipe line luminosa */}
      {wipeOp > 0 && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: wipeX, width: 3, background: `linear-gradient(to bottom, transparent, ${COLORS.oroSacro}, transparent)`, opacity: wipeOp, boxShadow: `0 0 20px ${COLORS.oroSacro}` }} />
      )}

      {/* Ghost AGNELLO */}
      <div style={{ position: 'absolute', top: '50%', right: 80, transform: 'translateY(-50%)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 140, fontWeight: 700, color: COLORS.avorioCarta, opacity: 0.07 * (1 - dissolve), pointerEvents: 'none', writingMode: 'vertical-rl' }}>AGNELLO</div>

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSacro, marginBottom: 10 }}>Il portale gotico</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 28, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Al centro del portale: un <strong style={{ color: COLORS.avorioCarta }}>agnello</strong>.<br />
          Prova che la chiesa era in origine<br />
          dedicata a <em style={{ color: COLORS.oroSacro }}>San Giovanni Battista</em>.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 240, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(26,74,122,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.azzurroNicola, marginBottom: 8 }}>Il patronato 1456</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 27, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Dopo il <strong style={{ color: COLORS.azzurroNicola }}>terremoto del 1456</strong>, Lacedonia sceglie<br />
          San Nicola di Bari come suo patrono.<br />
          La chiesa prende il suo nome.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 90, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(155,42,42,0.25)`, padding: '18px 26px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 26, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il <strong style={{ color: COLORS.rossoMarmo }}>portale gotico</strong> testimonia secoli di stratificazione:<br />
          ogni arco è una pagina di pietra.
        </div>
      </div>

      <ParticleField count={30} opacity={0.25} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

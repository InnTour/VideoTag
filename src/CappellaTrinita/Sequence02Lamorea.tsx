import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq02 — Lamorea & Iscrizione (~19.3s · 580 frame) ──────────

export const Sequence02Lamorea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolve = interpolate(frame, [180, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 320), fps, config: { damping: 160 } });

  // Iscrizione reveal lettera per lettera
  const iscrizione = 'ANNO DOMINI 1697';
  const charsVisible = Math.floor(interpolate(frame, [350, 500], [0, iscrizione.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const cursor = frame > 350 && frame < 520 && Math.floor(frame / 15) % 2 === 0;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.lamorea} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.trinita} motion="pan-left" intensity={0.05} />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      <div style={{ position: 'absolute', top: 0, right: 50, writingMode: 'vertical-rl', fontFamily: 'Playfair Display, serif', fontSize: 200, fontWeight: 700, color: COLORS.oroVescovile, opacity: 0.07, pointerEvents: 'none', lineHeight: 1 }}>1697</div>

      <div style={{ position: 'absolute', left: 72, top: 120, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(200,152,48,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroVescovile, marginBottom: 10 }}>1697 · Vescovo La Morea</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Il vescovo <strong style={{ color: COLORS.oroVescovile }}>Giovanni Battista La Morea</strong><br />
          ordina la ricostruzione della cappella.<br />
          L'iscrizione sul portale lo ricorda ancora.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 240, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(155,42,42,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.marmoRosso, marginBottom: 8 }}>Epigrafe romana</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Lo storico <strong style={{ color: COLORS.marmoRosso }}>Pasquale Palmese</strong> identifica<br />
          un'iscrizione dedicata a <em style={{ color: COLORS.oroVescovile }}>Lucio Licinio</em><br />
          — il link diretto con l'antica <strong>Aquilonia</strong>.
        </div>
      </div>

      {/* Iscrizione reveal */}
      <div style={{ position: 'absolute', left: 72, bottom: 100, opacity: interpolate(card3, [0, 1], [0, 1]) }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontStyle: 'italic', color: COLORS.pietraChiara, letterSpacing: '0.12em' }}>
          {iscrizione.slice(0, charsVisible)}{cursor ? '|' : ''}
        </div>
      </div>

      <ParticleField count={30} opacity={0.25} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS} from './constants';

const {fontFamily: playfairFamily} = loadPlayfair();
const {fontFamily: latoFamily} = loadLato();

// ── Seq02 — San Gerardo (~13.3s · 400 frame) ───────────────────
// Gerardo Maiella · 1741-44 · Vescovo Albini · storia del Santo

export const Sequence02SanGerardo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardEntrance = spring({frame: Math.max(0, frame - 20), fps, config: {damping: 200}});
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);
  const cardY = interpolate(cardEntrance, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)});

  const card2Entrance = spring({frame: Math.max(0, frame - 70), fps, config: {damping: 200}});
  const card2Opacity = interpolate(card2Entrance, [0, 1], [0, 1]);
  const card2Y = interpolate(card2Entrance, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)});

  const yearGhost = Math.sin(frame / 60) * 0.01 + 0.07;

  // cross-dissolve: mostra hero → gerardo
  const dissolve = interpolate(frame, [80, 160], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
        <KenBurnsImage src={IMAGES.hero} motion="pan-right" intensity={0.04} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
        <KenBurnsImage src={IMAGES.gerardo} motion="zoom-in" intensity={0.05} objectPosition="center top" />
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.55) 50%, rgba(8,8,12,0.12) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,8,12,0.85) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.70) 100%)',
      }} />

      {/* Ghost anno */}
      <div style={{
        position: 'absolute', top: 0, right: 60,
        fontFamily: playfairFamily, fontSize: 240, fontWeight: 700,
        color: COLORS.oroMiracolo, opacity: yearGhost,
        pointerEvents: 'none', lineHeight: 1,
        writingMode: 'vertical-rl',
      }}>1741</div>

      {/* Card 1 — Il Santo */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: cardOpacity, transform: `translateY(${cardY}px)`,
        background: 'rgba(8,8,12,0.78)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,192,64,0.22)`,
        padding: '24px 32px', maxWidth: 500,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: COLORS.oroMiracolo, marginBottom: 10,
        }}>San Gerardo Maiella · 1726–1755</div>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 24,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Giovane laico redentorista, ospite del<br />
          vescovo <strong style={{color: COLORS.azzurroAcqua}}>Claudio Albini</strong> a Lacedonia<br />
          tra il 1741 e il 1744.
        </div>
      </div>

      {/* Card 2 — Vocazione */}
      <div style={{
        position: 'absolute', left: 72, bottom: 170,
        opacity: card2Opacity, transform: `translateY(${card2Y}px)`,
        background: 'rgba(8,8,12,0.75)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(74,143,170,0.25)`,
        padding: '20px 28px', maxWidth: 480,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: COLORS.azzurroAcqua, marginBottom: 8,
        }}>Il carisma che si svela</div>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 22,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Un episodio avviene in questi mesi:<br />
          <em style={{color: COLORS.oroMiracolo}}>il primo segno soprannaturale</em><br />
          del futuro Santo.
        </div>
      </div>

      <ParticleField count={35} opacity={0.28} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

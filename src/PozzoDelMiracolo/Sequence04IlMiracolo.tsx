import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS} from './constants';

const {fontFamily: latoFamily} = loadLato();

// ── Seq04 — Il Miracolo (~13.3s · 400 frame) ───────────────────
// La chiave ritrovata · primo carisma del Santo

export const Sequence04IlMiracolo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const dissolve = interpolate(frame, [100, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Flash bianco — il momento del miracolo
  const flashOpacity = interpolate(frame, [80, 85, 100], [0, 0.55, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const card1 = spring({frame: Math.max(0, frame - 12), fps, config: {damping: 200}});
  const card2 = spring({frame: Math.max(0, frame - 80), fps, config: {damping: 200}});
  const card3 = spring({frame: Math.max(0, frame - 210), fps, config: {damping: 200}});

  const mirGlow = Math.sin(frame / 28) * 0.06 + 0.14;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
        <KenBurnsImage src={IMAGES.miracolo} motion="zoom-in" intensity={0.05} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
        <KenBurnsImage src={IMAGES.mistico} motion="pan-left" intensity={0.06} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Glow miracoloso */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 500px 350px at 68% 42%, rgba(240,192,64,${mirGlow}), transparent 70%)`,
      }} />

      {/* Flash miracolo */}
      {flashOpacity > 0 && (
        <div style={{position: 'absolute', inset: 0, background: 'white', opacity: flashOpacity}} />
      )}

      {/* Card 1 — La risposta */}
      <div style={{
        position: 'absolute', left: 72, top: 130,
        opacity: interpolate(card1, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card1, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)})}px)`,
        background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,192,64,0.30)`,
        padding: '24px 32px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: COLORS.oroMiracolo, marginBottom: 10,
        }}>La risposta</div>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 24,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          Dall'acqua del pozzo emerge la figura<br />
          del <strong style={{color: COLORS.oroMiracolo}}>Bambino Gesù</strong>,<br />
          che cala sulla fune con la chiave in mano.
        </div>
      </div>

      {/* Card 2 — Il recupero */}
      <div style={{
        position: 'absolute', left: 72, bottom: 270,
        opacity: interpolate(card2, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card2, [0, 1], [30, 0], {easing: Easing.out(Easing.cubic)})}px)`,
        background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(74,143,170,0.25)`,
        padding: '20px 28px', maxWidth: 500,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 22,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          La chiave viene consegnata a Gerardo,<br />
          che la porta al vescovo senza stupirsi.
        </div>
      </div>

      {/* Card 3 — Primo carisma */}
      <div style={{
        position: 'absolute', left: 72, bottom: 110,
        opacity: interpolate(card3, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(card3, [0, 1], [25, 0], {easing: Easing.out(Easing.cubic)})}px)`,
        background: 'rgba(8,8,12,0.82)', backdropFilter: 'blur(18px)',
        borderRadius: 8, border: `1px solid rgba(240,192,64,0.35)`,
        padding: '18px 26px', maxWidth: 520,
      }}>
        <div style={{
          fontFamily: latoFamily, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: COLORS.oroMiracolo, marginBottom: 8,
        }}>Primo carisma documentato</div>
        <div style={{
          fontFamily: latoFamily, fontWeight: 300, fontSize: 21,
          color: COLORS.biancoCalce, lineHeight: 1.55,
        }}>
          <em style={{color: COLORS.azzurroAcqua}}>Lacedonia</em> è il luogo dove la santità<br />
          di Gerardo Maiella si rivela per la prima volta.
        </div>
      </div>

      <ParticleField count={40} opacity={0.30} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

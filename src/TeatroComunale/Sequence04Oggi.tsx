import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS, SEQ } from './constants';

export const Sequence04Oggi: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - SEQ.s04Start;
  const dur = SEQ.s04End - SEQ.s04Start;

  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(localFrame, [dur - 25, dur], [1, 0], { extrapolateLeft: 'clamp' });
  const alpha = Math.min(fadeIn, fadeOut);

  const titleOpacity = interpolate(localFrame, [10, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Badge "OGGI" pulse
  const badgePulse = 1 + Math.sin(localFrame / 20) * 0.04;

  // Cards appaiono in cascata
  const card1Op = interpolate(localFrame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Op = interpolate(localFrame, [130, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card3Op = interpolate(localFrame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const narrOpacity = interpolate(localFrame, [280, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: alpha }}>
      <KenBurnsImage
        src={IMAGES.oggi}
        motion="pan-right"
        intensity={0.04}
        startFrame={SEQ.s04Start}
        endFrame={SEQ.s04End}
      />

      {/* Overlay moderno — verde InnTour accent */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(13,13,26,0.86) 0%, rgba(13,13,26,0.48) 55%, rgba(13,13,26,0.12) 100%),
          linear-gradient(to top, rgba(13,13,26,0.70) 0%, transparent 65%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Ghost "OGGI" */}
      <div style={{
        position: 'absolute', right: 60, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Lato, sans-serif',
        fontSize: 240, fontWeight: 900,
        color: COLORS.verdeInnTour,
        opacity: 0.05,
        letterSpacing: '0.04em',
        pointerEvents: 'none',
      }}>
        OGGI
      </div>

      {/* TITOLO sequenza */}
      <div style={{
        position: 'absolute', left: 72, top: 62,
        opacity: titleOpacity,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10,
        }}>
          <div style={{
            background: COLORS.verdeInnTour,
            borderRadius: '50%',
            width: 10, height: 10,
            transform: `scale(${badgePulse})`,
          }} />
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 14, letterSpacing: '0.22em',
            color: COLORS.verdeInnTour, textTransform: 'uppercase',
          }}>
            Oggi · L'Eredità Continua
          </div>
        </div>
        <div style={{ width: 260, height: 2, background: `linear-gradient(to right, ${COLORS.verdeInnTour}, transparent)` }} />
      </div>

      {/* Card 1 — Compagnie Nazionali */}
      <div style={{ position: 'absolute', left: 72, top: 165, opacity: card1Op }}>
        <ProgramCard
          icon="🎭"
          label="Stagione Teatrale"
          value="Compagnie di Rilievo Nazionale"
          color={COLORS.oroLampade}
        />
      </div>

      {/* Card 2 — Concerti */}
      <div style={{ position: 'absolute', left: 72, top: 280, opacity: card2Op }}>
        <ProgramCard
          icon="🎵"
          label="Grandi Concerti"
          value="Ogni Anno · Ogni Stagione"
          color={COLORS.azureInnTour}
        />
      </div>

      {/* Card 3 — Restauro */}
      <div style={{ position: 'absolute', left: 72, top: 395, opacity: card3Op }}>
        <ProgramCard
          icon="🏗"
          label="Sfide e Restauri"
          value="Resilienza Lacedoniese"
          color={COLORS.verdeInnTour}
        />
      </div>

      {/* Narrazione conclusiva sequenza */}
      <div style={{
        position: 'absolute', left: 72, bottom: 110,
        opacity: narrOpacity, maxWidth: 660,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.78)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(46,204,113,0.25)`,
          borderLeft: `3px solid ${COLORS.verdeInnTour}`,
          borderRadius: 4,
          padding: '18px 26px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 21,
            color: COLORS.biancoCalce, lineHeight: 1.65,
            margin: 0, fontWeight: 300,
          }}>
            "Questo teatro prosegue quella{' '}
            <strong style={{ color: COLORS.oroLampade }}>gloriosa eredità</strong> —<br />
            nonostante le sfide del tempo, resta vivo e presente."
          </p>
        </div>
      </div>

      <ParticleField count={35} opacity={0.22} mode="stage" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

interface ProgramCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ icon, label, value, color }) => (
  <div style={{
    background: 'rgba(13,13,26,0.80)',
    backdropFilter: 'blur(18px)',
    border: `1px solid rgba(212,168,67,0.18)`,
    borderLeft: `4px solid ${color}`,
    borderRadius: 4,
    padding: '14px 22px',
    minWidth: 480,
    display: 'flex', alignItems: 'center', gap: 16,
  }}>
    <span style={{ fontSize: 28 }}>{icon}</span>
    <div>
      <div style={{
        fontFamily: 'Lato, sans-serif', fontSize: 11,
        color: COLORS.grigio, letterSpacing: '0.18em',
        textTransform: 'uppercase', marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Playfair Display, serif', fontSize: 24,
        fontWeight: 700, color,
      }}>
        {value}
      </div>
    </div>
  </div>
);

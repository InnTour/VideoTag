import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq04 — Oggi · L'Eredità Continua (~17.7s · 530 frame)
// Spring animations staggered per le ProgramCards
// Pulsante verde "live" per la stagione attuale
// ──────────────────────────────────────────────────────────────

interface ProgramCardProps {
  icon: string;
  label: string;
  value: string;
  detail: string;
  color: string;
  opacity: number;
  translateY: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ icon, label, value, detail, color, opacity, translateY }) => (
  <div style={{
    background: 'rgba(13,13,26,0.84)', backdropFilter: 'blur(20px)',
    border: `1px solid rgba(212,168,67,0.18)`,
    borderLeft: `5px solid ${color}`,
    borderRadius: 4, padding: '16px 24px',
    minWidth: 520,
    display: 'flex', alignItems: 'center', gap: 18,
    opacity,
    transform: `translateY(${translateY}px)`,
  }}>
    <span style={{ fontSize: 30 }}>{icon}</span>
    <div>
      <div style={{
        fontFamily: 'Lato, sans-serif', fontSize: 11,
        color: COLORS.grigio, letterSpacing: '0.18em',
        textTransform: 'uppercase', marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: 'Playfair Display, serif', fontSize: 26,
        fontWeight: 700, color, marginBottom: 2,
      }}>{value}</div>
      <div style={{
        fontFamily: 'Lato, sans-serif', fontSize: 13,
        color: COLORS.biancoCalce, opacity: 0.72, lineHeight: 1.4,
      }}>{detail}</div>
    </div>
  </div>
);

export const Sequence04Oggi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Badge "live" pulse ────────────────────────────────────────
  const livePulse = 1 + Math.sin(frame / 18) * 0.06;
  const liveOpacity = 0.85 + Math.sin(frame / 18) * 0.15;

  // ── Titolo ────────────────────────────────────────────────────
  const titleEntrance = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = titleEntrance;

  // ── Cards con spring staggered ────────────────────────────────
  const card1E = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 170 } });
  const card2E = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 170 } });
  const card3E = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 170 } });

  // ── Narrazione conclusiva ─────────────────────────────────────
  const narrE = spring({ frame: Math.max(0, frame - 260), fps, config: { damping: 200 } });
  const narrOpacity = narrE;
  const narrY = interpolate(narrE, [0, 1], [16, 0]);

  // ── Highlight "resilienza" ────────────────────────────────────
  const resilienzaOpacity = interpolate(frame, [310, 380], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.oggi} motion="pan-right" intensity={0.04} />

      {/* Overlay moderno */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(13,13,26,0.88) 0%, rgba(13,13,26,0.50) 55%, rgba(13,13,26,0.12) 100%)',
          'linear-gradient(to top, rgba(13,13,26,0.72) 0%, transparent 65%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* Ghost "OGGI" verticale */}
      <div style={{
        position: 'absolute', right: 55, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Lato, sans-serif',
        fontSize: 240, fontWeight: 900,
        color: COLORS.verdeInnTour, opacity: 0.05,
        letterSpacing: '0.04em', pointerEvents: 'none',
      }}>OGGI</div>

      {/* ── TITOLO SEQUENZA ────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 60, opacity: titleOpacity }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          {/* Badge verde pulsante "LIVE" */}
          <div style={{
            background: COLORS.verdeInnTour,
            borderRadius: '50%', width: 10, height: 10,
            transform: `scale(${livePulse})`,
            opacity: liveOpacity,
          }} />
          <div style={{
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: 14, letterSpacing: '0.22em',
            color: COLORS.verdeInnTour, textTransform: 'uppercase',
          }}>Oggi · L'Eredità Continua</div>
        </div>
        <div style={{
          width: 270, height: 2,
          background: `linear-gradient(to right, ${COLORS.verdeInnTour}, transparent)`,
        }} />
      </div>

      {/* ── PROGRAM CARDS (spring staggered) ─────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 155 }}>
        <ProgramCard
          icon="🎭" label="Stagione Teatrale"
          value="Compagnie di Rilievo Nazionale"
          detail="Ogni stagione · Lacedonia protagonista"
          color={COLORS.oroLampade}
          opacity={card1E}
          translateY={interpolate(card1E, [0, 1], [24, 0])}
        />
      </div>

      <div style={{ position: 'absolute', left: 72, top: 278 }}>
        <ProgramCard
          icon="🎵" label="Grandi Concerti"
          value="Ogni Anno · Ogni Stagione"
          detail="La musica riempie le piazze di Lacedonia"
          color={COLORS.azureInnTour}
          opacity={card2E}
          translateY={interpolate(card2E, [0, 1], [24, 0])}
        />
      </div>

      <div style={{ position: 'absolute', left: 72, top: 402 }}>
        <ProgramCard
          icon="🏗" label="Sfide e Restauri"
          value="La Resilienza Lacedoniese"
          detail="Il teatro sopravvive e si rinnova"
          color={COLORS.verdeInnTour}
          opacity={card3E}
          translateY={interpolate(card3E, [0, 1], [24, 0])}
        />
      </div>

      {/* ── NARRAZIONE CONCLUSIVA ────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 110,
        opacity: narrOpacity, transform: `translateY(${narrY}px)`,
        maxWidth: 660,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.80)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(46,204,113,0.28)`,
          borderLeft: `4px solid ${COLORS.verdeInnTour}`,
          borderRadius: 4, padding: '18px 26px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 21,
            color: COLORS.biancoCalce, lineHeight: 1.65,
            margin: 0, fontWeight: 300,
          }}>
            "Questo teatro prosegue una{' '}
            <strong style={{ color: COLORS.oroLampade }}>gloriosa tradizione</strong> —
            nonostante le sfide del tempo, Lacedonia continua a sognare."
          </p>
        </div>
      </div>

      {/* Indicatore "resilienza" */}
      <div style={{ position: 'absolute', right: 90, bottom: 200, opacity: resilienzaOpacity }}>
        <div style={{
          background: 'rgba(13,13,26,0.78)', backdropFilter: 'blur(16px)',
          border: `1px solid rgba(46,204,113,0.25)`,
          borderRadius: 4, padding: '12px 20px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 700, color: COLORS.verdeInnTour }}>
            2000+
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: COLORS.biancoCalce, opacity: 0.75, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            anni di DNA culturale
          </div>
        </div>
      </div>

      <ParticleField count={35} opacity={0.22} mode="stage" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

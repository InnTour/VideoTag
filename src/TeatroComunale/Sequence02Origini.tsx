import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS, SEQ } from './constants';

export const Sequence02Origini: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - SEQ.s02Start;
  const dur = SEQ.s02End - SEQ.s02Start;

  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(localFrame, [dur - 25, dur], [1, 0], { extrapolateLeft: 'clamp' });
  const alpha = Math.min(fadeIn, fadeOut);

  // Cross-dissolve tra archivio → anfiteatro a metà sequenza
  const dissolve = interpolate(localFrame, [dur * 0.45, dur * 0.65], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo sezione
  const titleOpacity = interpolate(localFrame, [15, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // FactCards animate in sequenza
  const card1Opacity = interpolate(localFrame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Opacity = interpolate(localFrame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card3Opacity = interpolate(localFrame, [260, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Testo narrativo
  const narr1Opacity = interpolate(localFrame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const narr2Opacity = interpolate(localFrame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Ghost "ROMANI" verticale
  const ghostOpacity = 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: alpha }}>
      {/* Layer 1: archivio storico */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.archivio} motion="pan-right" intensity={0.04} startFrame={SEQ.s02Start} endFrame={SEQ.s02End} />
      </div>
      {/* Layer 2: anfiteatro romano */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.anfiteatro} motion="pan-left" intensity={0.04} startFrame={SEQ.s02Start} endFrame={SEQ.s02End} />
      </div>

      {/* Overlay split: sx scuro per testo, dx per foto */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(13,13,26,0.82) 0%, rgba(13,13,26,0.50) 50%, rgba(13,13,26,0.10) 100%),
          linear-gradient(to top, rgba(13,13,26,0.6) 0%, transparent 60%)
        `,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Ghost "ROMANI" verticale */}
      <div style={{
        position: 'absolute', right: 90, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 200, fontWeight: 700,
        color: COLORS.oroLampade,
        opacity: ghostOpacity,
        letterSpacing: '0.08em',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        ROMANI
      </div>

      {/* TITOLO sequenza */}
      <div style={{
        position: 'absolute', left: 72, top: 62,
        opacity: titleOpacity,
      }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 14, letterSpacing: '0.22em',
          color: COLORS.oroLampade, textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Le Radici Romane
        </div>
        <div style={{
          width: 240, height: 2,
          background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)`,
        }} />
      </div>

      {/* Narrazione 1 */}
      <div style={{
        position: 'absolute', left: 72, top: 155,
        opacity: narr1Opacity,
        maxWidth: 620,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.76)',
          backdropFilter: 'blur(18px)',
          border: `1px solid rgba(212,168,67,0.25)`,
          borderLeft: `3px solid ${COLORS.oroLampade}`,
          borderRadius: 4,
          padding: '20px 28px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 22,
            color: COLORS.biancoCalce, lineHeight: 1.65,
            margin: 0, fontWeight: 300,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}>
            Il richiamo allo spettacolo è scritto nel DNA di questa terra{' '}
            <strong style={{ color: COLORS.oroLampade, fontWeight: 700 }}>da millenni</strong>.
          </p>
        </div>
      </div>

      {/* FactCard 1 — Anfiteatro Romano */}
      <div style={{
        position: 'absolute', left: 72, top: 330,
        opacity: card1Opacity,
        transform: `translateX(${card1Opacity < 1 ? -20 : 0}px)`,
        transition: 'transform 0.3s',
      }}>
        <FactCard
          icon="🏛"
          label="Anfiteatro Romano"
          value="Epoca Imperiale"
          detail="Alle spalle dell'Istituto Magistrale"
          color={COLORS.oroLampade}
        />
      </div>

      {/* FactCard 2 — Smantellamento */}
      <div style={{
        position: 'absolute', left: 72, top: 456,
        opacity: card2Opacity,
        transform: `translateX(${card2Opacity < 1 ? -20 : 0}px)`,
      }}>
        <FactCard
          icon="⛪"
          label="Smantellamento"
          value="XVIII Secolo"
          detail="Blocchi usati per il campanile della Cattedrale"
          color={COLORS.rossoVivo}
        />
      </div>

      {/* Narrazione 2 */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: narr2Opacity,
        maxWidth: 580,
      }}>
        <div style={{
          background: 'rgba(13,13,26,0.72)',
          backdropFilter: 'blur(14px)',
          borderRadius: 4,
          padding: '16px 22px',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif', fontSize: 20,
            color: COLORS.biancoCalce, lineHeight: 1.6,
            margin: 0, fontStyle: 'italic', fontWeight: 300,
          }}>
            "Gli storici ipotizzano… un grande anfiteatro romano,<br />
            i cui blocchi di pietra furono smantellati nel XVIII secolo<br />
            per costruire il campanile della Cattedrale."
          </p>
        </div>
      </div>

      {/* FactCard 3 — DNA dello spettacolo */}
      <div style={{
        position: 'absolute', right: 90, bottom: 190,
        opacity: card3Opacity,
      }}>
        <FactCard
          icon="🎭"
          label="DNA Culturale"
          value="2000+ anni"
          detail="Di tradizione performativa ininterrotta"
          color={COLORS.verdeInnTour}
          alignRight
        />
      </div>

      <ParticleField count={35} opacity={0.25} mode="dust" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

interface FactCardProps {
  icon: string;
  label: string;
  value: string;
  detail: string;
  color: string;
  alignRight?: boolean;
}

const FactCard: React.FC<FactCardProps> = ({ icon, label, value, detail, color, alignRight }) => (
  <div style={{
    background: 'rgba(13,13,26,0.82)',
    backdropFilter: 'blur(20px)',
    border: `1px solid rgba(212,168,67,0.20)`,
    borderLeft: alignRight ? undefined : `4px solid ${color}`,
    borderRight: alignRight ? `4px solid ${color}` : undefined,
    borderRadius: 4,
    padding: '14px 22px',
    minWidth: 320,
    textAlign: alignRight ? 'right' : 'left',
  }}>
    <div style={{
      fontFamily: 'Lato, sans-serif', fontSize: 11,
      color: COLORS.grigio, letterSpacing: '0.18em',
      textTransform: 'uppercase', marginBottom: 4,
    }}>
      {icon} {label}
    </div>
    <div style={{
      fontFamily: 'Playfair Display, serif', fontSize: 30,
      fontWeight: 700, color, marginBottom: 4,
    }}>
      {value}
    </div>
    <div style={{
      fontFamily: 'Lato, sans-serif', fontSize: 14,
      color: COLORS.biancoCalce, opacity: 0.75,
    }}>
      {detail}
    </div>
  </div>
);

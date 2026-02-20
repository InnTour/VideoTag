import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq02 — Il Milite / Nicola Di Vietri (~14.7s · 440 frame)
// Statua: un milite che rifiuta la guerra, elmetto a terra
// Artista: Nicola Di Vietri (venosino)
// Commissionato da: Amministrazione Leonardo Cuozzo
// Spotlight sulla figura · Cards in cascata · Ghost anni
// ─────────────────────────────────────────────────────────────

// Componente SVG: elmetto militare che scende (metafora del rifiuto)
const ElmettoIcon: React.FC<{ progress: number; opacity: number }> = ({ progress, opacity }) => {
  const y = interpolate(progress, [0, 1], [0, 18]);
  const tilt = interpolate(progress, [0, 1], [0, 22]);
  return (
    <div style={{ position: 'absolute', right: 200, top: 160, opacity, pointerEvents: 'none' }}>
      <svg width="120" height="100" viewBox="0 0 120 100" style={{ transform: `translateY(${y}px) rotate(${tilt}deg)` }}>
        {/* Elmetto militare stilizzato */}
        <ellipse cx="60" cy="55" rx="52" ry="18" fill="none" stroke={COLORS.grigioCielo} strokeWidth="3" opacity="0.7" />
        <path d="M8 55 Q60 10 112 55" fill={COLORS.grigioPiombo} opacity="0.65" />
        <ellipse cx="60" cy="55" rx="52" ry="14" fill={COLORS.grigioPiombo} opacity="0.55" />
        {/* Linea centrale */}
        <line x1="60" y1="12" x2="60" y2="45" stroke={COLORS.grigioCielo} strokeWidth="2" opacity="0.5" />
      </svg>
      <div style={{
        textAlign: 'center', marginTop: 6,
        fontFamily: 'Lato, sans-serif', fontSize: 14,
        color: COLORS.grigioCielo, letterSpacing: '0.14em',
        textTransform: 'uppercase', opacity: 0.70,
      }}>
        L'elmetto a terra
      </div>
    </div>
  );
};

export const Sequence02IlMilite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spotlight si intensifica gradualmente
  const spotOp = interpolate(frame, [0, 80], [0.08, 0.22], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Elmetto: appare e "scende" — metafora del rifiuto
  const elmettoEnt  = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const elmettoFall = interpolate(frame, [80, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const elmettoOp   = interpolate(frame, [28, 60, 380, 420], [0, elmettoEnt, elmettoEnt, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card 1: l'opera — spring + fade
  const card1Ent  = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 180 } });
  const card1Op   = interpolate(card1Ent, [0, 1], [0, 1]);
  const card1Y    = interpolate(card1Ent, [0, 1], [18, 0]);
  const card1Fade = interpolate(frame, [280, 340], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Card 2: il committente — spring
  const card2Ent = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 180 } });
  const card2Op  = interpolate(card2Ent, [0, 1], [0, 1]);
  const card2Y   = interpolate(card2Ent, [0, 1], [18, 0]);
  const card2Fade = interpolate(frame, [310, 375], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Card 3: il messaggio dell'opera (appare a metà sequenza)
  const card3Ent = spring({ frame: Math.max(0, frame - 260), fps, config: { damping: 175 } });
  const card3Op  = interpolate(card3Ent, [0, 1], [0, 1]);
  const card3Y   = interpolate(card3Ent, [0, 1], [18, 0]);

  // Ghost anni — "1915-18 · 1940-45"
  const ghostOp = interpolate(frame, [0, 60, 380, 440], [0, 0.06, 0.06, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Statua del milite — zoom-in verso la figura */}
      <KenBurnsImage src={IMAGES.monumento} motion="zoom-in" intensity={0.06} objectPosition="center bottom" />

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.14) 100%)',
          'linear-gradient(to top,   rgba(10,10,10,0.82) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Tono oro dorato sulla statua */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(212,168,67,0.08)',
        mixBlendMode: 'overlay',
      }} />

      {/* Spotlight sulla statua */}
      <SpotlightEffect x={62} y={42} radius={360} color={COLORS.oroLuce} opacity={spotOp} pulse />

      {/* Ghost anni delle guerre */}
      <div style={{
        position: 'absolute', right: 60, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 52, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.biancoLapide, opacity: ghostOp,
        pointerEvents: 'none', writingMode: 'vertical-rl',
        letterSpacing: '0.12em', lineHeight: 1.2,
      }}>1914-18 · 1939-45</div>

      {/* Elmetto SVG animato */}
      <ElmettoIcon progress={elmettoFall} opacity={elmettoOp} />

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.oroLuce, textTransform: 'uppercase', marginBottom: 9,
        }}>La Scultura · Il Messaggio</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.oroLuce}, transparent)` }} />
      </div>

      {/* CARD 1: l'opera */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: card1Op * card1Fade, transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.86)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(212,168,67,0.28)`,
          borderLeft: `5px solid ${COLORS.oroLuce}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 540,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroLuce, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>🗿 Nicola Di Vietri · Artista Venosino</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 36,
            fontWeight: 700, color: COLORS.biancoLapide,
            marginBottom: 10, lineHeight: 1.1,
          }}>Il Milite Stanco</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 24,
            color: COLORS.biancoLapide, opacity: 0.88,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Un soldato che, <em style={{ color: COLORS.oroLuce }}>stanco di versare sangue</em>,<br />
            posa l'elmetto a terra
          </div>
        </div>
      </div>

      {/* CARD 2: il committente */}
      <div style={{
        position: 'absolute', left: 72, top: 400,
        opacity: card2Op * card2Fade, transform: `translateY(${card2Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,10,10,0.82)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(212,168,67,0.22)`,
          borderLeft: `4px solid ${COLORS.rossoPapavero}`,
          borderRadius: 4, padding: '18px 26px', maxWidth: 500,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 15,
            color: COLORS.rossoPapavero, letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>Committenza</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 24,
            color: COLORS.biancoLapide, opacity: 0.85,
            lineHeight: 1.50, fontWeight: 300,
          }}>
            Amministrazione guidata da<br />
            <strong style={{ fontWeight: 700, color: COLORS.oroLuce }}>Leonardo Cuozzo</strong>
          </div>
        </div>
      </div>

      {/* CARD 3: il gesto */}
      <div style={{
        position: 'absolute', left: 72, bottom: 120,
        opacity: card3Op, transform: `translateY(${card3Y}px)`,
        maxWidth: 640,
      }}>
        <div style={{ borderLeft: `4px solid ${COLORS.oroLuce}`, paddingLeft: 22 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 24,
            fontStyle: 'italic', color: COLORS.biancoLapide,
            lineHeight: 1.58, margin: 0,
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
          }}>
            "L'elmetto lasciato a terra —<br />
            <em style={{ color: COLORS.oroLuce }}>atto definitivo di rifiuto della guerra.</em>"
          </p>
        </div>
      </div>

      <ScanLines />
    </div>
  );
};

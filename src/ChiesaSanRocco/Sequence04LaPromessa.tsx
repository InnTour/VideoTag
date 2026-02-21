import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ── Seq04 — La Promessa (~18.7s · 560 frame) ───────────────────

export const Sequence04LaPromessa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 160 } });
  const card2 = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 160 } });
  const card3 = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 160 } });
  const card4 = spring({ frame: Math.max(0, frame - 430), fps, config: { damping: 160 } });

  const ghostOp = Math.sin(frame / 50) * 0.01 + 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.promessa} motion="zoom-in" intensity={0.05} objectPosition="center center" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.90) 0%, rgba(8,8,12,0.52) 50%, rgba(8,8,12,0.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.72) 100%)' }} />

      <div style={{ position: 'absolute', top: '50%', right: 50, transform: 'translateY(-50%)', fontFamily: 'Playfair Display, serif', fontSize: 180, fontWeight: 700, color: COLORS.oroSanto, opacity: ghostOp, pointerEvents: 'none', writingMode: 'vertical-rl' }}>PROMESSA</div>

      <div style={{ position: 'absolute', left: 72, top: 110, opacity: interpolate(card1, [0, 1], [0, 1]), transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.80)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.28)`, padding: '22px 30px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: COLORS.oroSanto, marginBottom: 10 }}>L'interno</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 24, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          La chiesa custodisce la <strong style={{ color: COLORS.oroSanto }}>statua lignea del '600</strong>:<br />
          Rocco col bastone da pellegrino<br />
          e il fido cane al fianco.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 350, opacity: interpolate(card2, [0, 1], [0, 1]), transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(232,112,48,0.28)`, padding: '20px 28px', maxWidth: 500 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.arancioneFesta, marginBottom: 8 }}>16 agosto — Il Grande Ritorno</div>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 22, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Ogni anno, il giorno della festa patronale,<br />
          i lacedonesi nel mondo tornano a casa.<br />
          <em style={{ color: COLORS.gialloFesta }}>San Rocco li raccoglie tutti.</em>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 210, opacity: interpolate(card3, [0, 1], [0, 1]), transform: `translateY(${interpolate(card3, [0, 1], [25, 0])}px)`, background: 'rgba(8,8,12,0.76)', backdropFilter: 'blur(18px)', borderRadius: 8, border: `1px solid rgba(212,168,67,0.22)`, padding: '18px 26px', maxWidth: 520 }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: 21, color: COLORS.biancoCalce, lineHeight: 1.55 }}>
          Le campane suonano, le strade si riempiono,<br />
          i profumi della cucina irpina si mescolano<br />
          con la nostalgia e la gioia.
        </div>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 80, opacity: interpolate(card4, [0, 1], [0, 1]), transform: `translateY(${interpolate(card4, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 28, color: COLORS.oroSanto, borderLeft: `4px solid ${COLORS.oroSanto}`, paddingLeft: 24, maxWidth: 580 }}>
          San Rocco unisce chi è partito e chi è rimasto.
        </div>
      </div>

      <ParticleField count={35} opacity={0.28} mode="oro" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq03 — Il MAVI e Frank Cancian (~11.3s · 340 frame)
// Cross-dissolve quadruplo: ritratto → scena1957 → inaugurazione → archivio
// ─────────────────────────────────────────────────────────────

export const Sequence03LaVitaContadina: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 cross-dissolve tra 4 foto
  const d1 = interpolate(frame, [70, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2 = interpolate(frame, [175, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3 = interpolate(frame, [265, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Opacità per ogni strato (con combinazione corretta)
  const op1 = Math.max(0, 1 - d1);
  const op2 = Math.max(0, Math.min(d1, 1 - d2));
  const op3 = Math.max(0, Math.min(d2, 1 - d3));
  const op4 = Math.max(0, d3);

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // Card 1: Cancian il fotografo (prime foto)
  const card1Ent  = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 180 } });
  const card1Fade = interpolate(frame, [62, 105], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Card 2: il MAVI (appare con l'inaugurazione)
  const card2Ent  = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 180 } });
  const card2Fade = interpolate(frame, [295, 332], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* STRATO 1: Ritratto Frank Cancian */}
      <div style={{ position: 'absolute', inset: 0, opacity: op1 }}>
        <KenBurnsImage src={IMAGES.cancianRitratto} motion="zoom-in" intensity={0.04} objectPosition="center 20%" />
      </div>

      {/* STRATO 2: Scena irpina 1957 */}
      <div style={{ position: 'absolute', inset: 0, opacity: op2 }}>
        <KenBurnsImage src={IMAGES.scena1957} motion="pan-right" intensity={0.04} objectPosition="center center" />
      </div>

      {/* STRATO 3: Inaugurazione museo MAVI */}
      <div style={{ position: 'absolute', inset: 0, opacity: op3 }}>
        <KenBurnsImage src={IMAGES.inaugurazione} motion="zoom-in" intensity={0.04} objectPosition="center center" />
      </div>

      {/* STRATO 4: Foto d'archivio */}
      <div style={{ position: 'absolute', inset: 0, opacity: op4 }}>
        <KenBurnsImage src={IMAGES.fotoArchivio} motion="pan-left" intensity={0.04} objectPosition="center center" />
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.48) 52%, rgba(10,8,4,0.12) 100%)',
          'linear-gradient(to top,   rgba(10,8,4,0.80) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.70) 100%)' }} />

      {/* Tono seppia per atmosfera archivio */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,168,120,0.10)', mixBlendMode: 'multiply' as React.CSSProperties['mixBlendMode'] }} />

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '0.20em', color: COLORS.oroMavi, textTransform: 'uppercase', marginBottom: 9 }}>
          Il MAVI · Museo Antropologico Visivo
        </div>
        <div style={{ width: 310, height: 2, background: `linear-gradient(to right, ${COLORS.oroMavi}, transparent)` }} />
      </div>

      {/* CARD 1: Cancian il fotografo */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: interpolate(card1Ent, [0, 1], [0, 1]) * card1Fade,
        transform: `translateY(${interpolate(card1Ent, [0, 1], [18, 0])}px)`,
      }}>
        <div style={{ background: 'rgba(10,8,4,0.86)', backdropFilter: 'blur(20px)', border: `1px solid rgba(200,168,120,0.25)`, borderLeft: `5px solid ${COLORS.seppia}`, borderRadius: 4, padding: '22px 30px', maxWidth: 520 }}>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 18, color: COLORS.seppia, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>Frank Cancian · Cornell University</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 28, color: COLORS.biancoCalce, opacity: 0.88, lineHeight: 1.55, fontWeight: 300 }}>
            Un sociologo americano con una macchina fotografica —<br />
            <em style={{ color: COLORS.oroMavi }}>e la capacità di vedere l'anima</em>.
          </div>
        </div>
      </div>

      {/* CARD 2: Il museo oggi */}
      <div style={{
        position: 'absolute', left: 72, bottom: 112,
        opacity: interpolate(card2Ent, [0, 1], [0, 1]) * card2Fade,
        transform: `translateY(${interpolate(card2Ent, [0, 1], [18, 0])}px)`,
        maxWidth: 640,
      }}>
        <div style={{ background: 'rgba(10,8,4,0.88)', backdropFilter: 'blur(22px)', border: `1px solid rgba(212,168,67,0.28)`, borderRadius: 4, padding: '22px 30px' }}>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 18, color: COLORS.oroMavi, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>Il MAVI · Antico Carcere Ottocentesco</div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontSize: 28, color: COLORS.biancoCalce, fontWeight: 300, lineHeight: 1.52, opacity: 0.88 }}>
            Le fotografie di Cancian vivono oggi qui —<br />
            <em style={{ color: COLORS.seppia }}>simbolo internazionale<br />della fotografia antropologica.</em>
          </div>
        </div>
      </div>

      <FilmGrain opacity={0.055} />
      <ScanLines opacity={0.020} />
    </div>
  );
};

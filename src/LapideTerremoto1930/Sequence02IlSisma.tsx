import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SeismicWave } from './components/SeismicWave';
import { FilmGrain } from './components/FilmGrain';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ─────────────────────────────────────────────────────────────
// Seq02 — Il Sisma (~14.7s · 440 frame)
// Il Vulture sussultò alle 3:00 — 10° grado scala Mercalli
// SHAKE visivo + flash apertura + macerie + counter vittime
// Cross-dissolve: macerie → lapide con nomi
// SeismicWave nella seconda metà
// ─────────────────────────────────────────────────────────────

export const Sequence02IlSisma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── SHAKE del sisma — frame 0-80, massimo a frame 8 ───────────
  const shakeMag = interpolate(frame, [0, 8, 24, 60, 80], [0, 1, 0.85, 0.15, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 5.3) * 18 * shakeMag + Math.cos(frame * 8.1) * 9 * shakeMag;
  const shakeY = Math.cos(frame * 4.7) * 12 * shakeMag + Math.sin(frame * 7.3) * 7 * shakeMag;

  // Flash bianco impatto sisma
  const flashOp = interpolate(frame, [0, 3, 14], [0.85, 0.85, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Cross-dissolve: macerie → lapide con nomi
  const dissolve = interpolate(frame, [200, 290], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Titolo sequenza
  const titleEnt = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 200 } });

  // ── COUNTER VITTIME 0 → 200 ────────────────────────────────
  const counterVal = Math.round(interpolate(frame, [30, 160], [0, 200], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const counterEnt  = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 180 } });
  const counterFade = interpolate(frame, [180, 220], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card: 10° grado Mercalli (appare con il counter)
  const mercalliEnt  = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 180 } });
  const mercalliOp   = interpolate(mercalliEnt, [0, 1], [0, 1]);
  const mercalliY    = interpolate(mercalliEnt, [0, 1], [16, 0]);
  const mercalliFade = interpolate(frame, [180, 220], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card: nomi incisi (appare dopo il dissolve)
  const nomiEnt  = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 180 } });
  const nomiOp   = interpolate(nomiEnt, [0, 1], [0, 1]);
  const nomiY    = interpolate(nomiEnt, [0, 1], [16, 0]);
  const nomiFade = interpolate(frame, [400, 432], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ghost "22 LUGLIO"
  const ghostOp = interpolate(frame, [20, 65, 195, 240], [0, 0.045, 0.045, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Onda sismica — appare con il dissolve
  const waveOp = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.neroNotte }}>

      {/* SHAKE container — tutto il contenuto trema */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}>
        {/* STRATO 1: macerie / devastazione */}
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
          <KenBurnsImage src={IMAGES.macerie} motion="zoom-in" intensity={0.06} objectPosition="center center" />
        </div>

        {/* STRATO 2: lapide con nomi incisi */}
        <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
          <KenBurnsImage src={IMAGES.lapideNomi} motion="zoom-out" intensity={0.04} objectPosition="center top" />
        </div>
      </div>

      {/* Overlay bitonale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(3,3,6,0.92) 0%, rgba(3,3,6,0.55) 52%, rgba(3,3,6,0.15) 100%)',
          'linear-gradient(to top,   rgba(3,3,6,0.85) 0%, transparent 58%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Tono rosso sulle macerie — il fuoco del sisma */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(139,26,26,0.14)`,
        mixBlendMode: 'multiply',
        opacity: 1 - dissolve,
      }} />

      {/* Ghost "22 LUGLIO" — verticale */}
      <div style={{
        position: 'absolute', right: 60, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 88, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.rossoSisma, opacity: ghostOp,
        pointerEvents: 'none',
        writingMode: 'vertical-rl', letterSpacing: '0.06em',
      }}>22 LUGLIO</div>

      {/* Flash bianco impatto */}
      {flashOp > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF', opacity: flashOp }} />
      )}

      {/* TITOLO SEQUENZA */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEnt }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.20em',
          color: COLORS.rossoSisma, textTransform: 'uppercase', marginBottom: 9,
        }}>Il Sisma · Il Vulture Sussultò · Ore 3:00</div>
        <div style={{ width: 310, height: 2, background: `linear-gradient(to right, ${COLORS.rossoSisma}, transparent)` }} />
      </div>

      {/* COUNTER VITTIME */}
      <div style={{
        position: 'absolute', left: 72, top: 140,
        opacity: counterEnt * counterFade,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.90)', backdropFilter: 'blur(20px)',
          border: `1px solid rgba(139,26,26,0.45)`,
          borderLeft: `5px solid ${COLORS.rossoSisma}`,
          borderRadius: 4, padding: '18px 30px',
          display: 'flex', alignItems: 'flex-end', gap: 12,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 92, fontWeight: 700, lineHeight: 1,
            color: counterVal >= 200 ? COLORS.rossoSisma : COLORS.biancoMarmo,
          }}>
            {counterVal === 200 ? '~200' : counterVal}
          </span>
          <div style={{ paddingBottom: 10 }}>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 17,
              color: COLORS.biancoMarmo, opacity: 0.88,
              letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>vittime</div>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 14,
              color: COLORS.grigioLapide,
              letterSpacing: '0.06em',
            }}>a Lacedonia</div>
          </div>
        </div>
      </div>

      {/* CARD: 10° grado Mercalli */}
      <div style={{
        position: 'absolute', left: 72, top: 345,
        opacity: mercalliOp * mercalliFade, transform: `translateY(${mercalliY}px)`,
      }}>
        <div style={{
          background: 'rgba(3,3,6,0.88)', backdropFilter: 'blur(18px)',
          border: `1px solid rgba(200,168,75,0.28)`,
          borderRadius: 4, padding: '20px 28px', maxWidth: 500,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 16,
            color: COLORS.oroSperanza, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>⚠️ Scala Mercalli</div>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 64, fontWeight: 700,
            color: COLORS.rossoSisma, lineHeight: 1,
          }}>X°</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 20,
            color: COLORS.biancoMarmo, opacity: 0.80,
            fontWeight: 300, lineHeight: 1.50, marginTop: 8,
          }}>Decimo grado — radendo al suolo<br />gran parte del borgo antico</div>
        </div>
      </div>

      {/* CARD: nomi incisi nel marmo (dopo dissolve) */}
      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: nomiOp * nomiFade, transform: `translateY(${nomiY}px)`,
        maxWidth: 580,
      }}>
        <div style={{ borderLeft: `4px solid ${COLORS.oroSperanza}`, paddingLeft: 22 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 24,
            fontStyle: 'italic', color: COLORS.biancoMarmo,
            lineHeight: 1.58, margin: 0,
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
          }}>
            "Questi nomi incisi nel marmo sono<br />
            il monito di una <em style={{ color: COLORS.oroSperanza }}>'terra ballerina'</em><br />
            che ha saputo rialzarsi."
          </p>
        </div>
      </div>

      {/* Onda sismica in basso — appare con il dissolve */}
      <SeismicWave opacity={waveOp * 0.70} color={COLORS.oroSperanza} amplitude={18} speed={2.2} />

      <FilmGrain opacity={0.052} />
      <ScanLines opacity={0.022} />
    </div>
  );
};

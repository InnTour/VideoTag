import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq02 — Il Tempio di Iside (~12.7s · 380 frame)
// Rovine romane → cross-dissolve al travertino / iscrizione
// Ghost "AQUILONIA" · Card: colonna travertino · Tono verdePagano
// ──────────────────────────────────────────────────────────────

export const Sequence02IlTempioDiIside: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cross-dissolve: rovine → travertino ─────────────────────
  const dissolve = interpolate(frame, [200, 300], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo sequenza ────────────────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 200 } });

  // ── Card storica 1 — colonna travertino ─────────────────────
  const card1Entrance = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 180 } });
  const card1Y = interpolate(card1Entrance, [0, 1], [20, 0]);
  const card1Fade = interpolate(frame, [200, 260], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Card storica 2 — riutilizzo (appare dopo dissolve) ──────
  const card2Entrance = spring({ frame: Math.max(0, frame - 290), fps, config: { damping: 180 } });
  const card2Y = interpolate(card2Entrance, [0, 1], [18, 0]);

  // ── Ghost "AQUILONIA" ──────────────────────────────────────
  const ghostFadeIn = interpolate(frame, [20, 60], [0, 0.065], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ghostFadeOut = interpolate(frame, [260, 340], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ghostOpacity = ghostFadeIn * ghostFadeOut;

  // ── Overlay verde pagano → travertino warm ─────────────────
  const overlayToneR = Math.round(interpolate(dissolve, [0, 1], [45, 200]));
  const overlayToneG = Math.round(interpolate(dissolve, [0, 1], [90, 152]));
  const overlayToneB = Math.round(interpolate(dissolve, [0, 1], [58, 48]));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

      {/* ── STRATO 1: Rovine del Tempio di Iside ──────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - dissolve }}>
        <KenBurnsImage src={IMAGES.tempioIside} motion="zoom-in" intensity={0.06} objectPosition="center center" />
      </div>

      {/* ── STRATO 2: Dettaglio travertino / iscrizione ────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: dissolve }}>
        <KenBurnsImage src={IMAGES.travertino} motion="pan-right" intensity={0.05} objectPosition="center center" />
      </div>

      {/* ── Overlay bitonale ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,8,0.90) 0%, rgba(10,8,8,0.48) 50%, rgba(10,8,8,0.10) 100%)',
          'linear-gradient(to top, rgba(10,8,8,0.80) 0%, transparent 60%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* ── Tono cromatico che transisce da verde pagano a travertino caldo ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(${overlayToneR},${overlayToneG},${overlayToneB},0.10)`,
        mixBlendMode: 'overlay',
      }} />

      {/* ── Ghost "AQUILONIA" ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 180, fontWeight: 700, fontStyle: 'italic',
        color: COLORS.verdePagano,
        opacity: ghostOpacity,
        letterSpacing: '0.04em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>AQUILONIA</div>

      {/* ── TITOLO SEQUENZA ────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleEntrance }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 17, letterSpacing: '0.22em',
          color: COLORS.verdePagano, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Tempio di Iside</div>
        <div style={{ width: 260, height: 2, background: `linear-gradient(to right, ${COLORS.verdePagano}, transparent)` }} />
      </div>

      {/* ── CARD 1: Colonna travertino romano ──────────────────── */}
      <div style={{
        position: 'absolute', left: 72, top: 148,
        opacity: card1Entrance * card1Fade,
        transform: `translateY(${card1Y}px)`,
      }}>
        <div style={{
          background: 'rgba(10,8,8,0.86)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(45,90,58,0.35)',
          borderLeft: `5px solid ${COLORS.verdePagano}`,
          borderRadius: 4, padding: '22px 30px', maxWidth: 520,
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 17,
            color: COLORS.verdePagano, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>Epoca Romana · Tempio di Iside</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 44,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 10, lineHeight: 1.1,
          }}>Colonna in Travertino</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 27,
            color: COLORS.biancoCalce, opacity: 0.82,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Recuperata dagli scavi dell'antico<br />
            <em style={{ color: COLORS.travertino }}>tempio pagano di Aquilonia</em>
          </div>
        </div>
      </div>

      {/* ── CARD 2: Riutilizzo storico (appare dopo dissolve) ──── */}
      <div style={{
        position: 'absolute', left: 72, bottom: 130,
        opacity: card2Entrance,
        transform: `translateY(${card2Y}px)`,
        maxWidth: 600,
      }}>
        <div style={{ borderLeft: `4px solid ${COLORS.oroVescovile}`, paddingLeft: 20 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 28,
            fontStyle: 'italic', color: COLORS.biancoCalce,
            lineHeight: 1.6, margin: 0,
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
          }}>
            "Un esempio unico di riutilizzo storico: dal sacro pagano al sacro cristiano,
            senza soluzione di continuita."
          </p>
        </div>
      </div>

      <ParticleField count={35} opacity={0.20} mode="travertino" />
      <ScanLines opacity={0.022} />
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScanLines } from './components/ScanLines';
import { IMAGES, COLORS } from './constants';

// ──────────────────────────────────────────────────────────────
// Seq01 — Intro (~9s · 270 frame)
// Hero: monks studying by candlelight — bookend aperto
// Flash apertura dorato · Badge · Titolo spring · Sottotitolo
// ──────────────────────────────────────────────────────────────

export const Sequence01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Flash apertura a candela (primi 10 frame) ─────────────────
  const flashOpacity = interpolate(frame, [0, 5, 10], [0.35, 0.12, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Badge sezione — slide da sinistra ────────────────────────
  const badgeEntrance = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 180 } });
  const badgeOpacity = badgeEntrance;
  const badgeX = interpolate(badgeEntrance, [0, 1], [-40, 0]);

  // ── Linea decorativa ─────────────────────────────────────────
  const lineWidth = interpolate(frame, [22, 80], [0, 280], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Titolo — spring con bounce ───────────────────────────────
  const titleEntrance = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 160, stiffness: 80 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [40, 0]);

  // ── Sottotitolo — slide-up leggero ──────────────────────────
  const subEntrance = spring({ frame: Math.max(0, frame - 52), fps, config: { damping: 200 } });
  const subOpacity = subEntrance;
  const subY = interpolate(subEntrance, [0, 1], [14, 0]);

  // ── Candlelight pulse sul testo ──────────────────────────────
  const candlePulse = Math.sin(frame / 40) * 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Foto hero — monaci con candele, zoom-in lento */}
      <KenBurnsImage src={IMAGES.hero} motion="zoom-in" intensity={0.05} objectPosition="center top" />

      {/* Overlay bitonale — scuro a sx per testo, aperto a dx per foto */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(10,8,4,0.94) 0%, rgba(10,8,4,0.60) 52%, rgba(10,8,4,0.18) 100%)',
          'linear-gradient(to top, rgba(10,8,4,0.90) 0%, rgba(10,8,4,0.22) 55%, transparent 100%)',
        ].join(', '),
      }} />

      {/* Vignette perimetrale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.78) 100%)',
      }} />

      {/* Spotlight candela caldo — centro a dx dove sono i monaci */}
      <SpotlightEffect x={72} y={42} radius={380} color={COLORS.oroAntico} opacity={0.16 + candlePulse} pulse />

      {/* Flash apertura dorato */}
      {flashOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: COLORS.pergamena,
          opacity: flashOpacity,
        }} />
      )}

      {/* BADGE SEZIONE */}
      <div style={{
        position: 'absolute', top: 52, left: 72,
        opacity: badgeOpacity,
        transform: `translateX(${badgeX}px)`,
      }}>
        <div style={{
          background: COLORS.rossoVescovile,
          padding: '6px 20px', borderRadius: 2,
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.16em',
          color: COLORS.biancoCalce, textTransform: 'uppercase',
        }}>
          Sezione A4 · Luoghi della Cultura
        </div>
      </div>

      {/* TITOLO con spring */}
      <div style={{
        position: 'absolute', left: 72, bottom: 230,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        {/* Linea decorativa oro antico */}
        <div style={{
          width: lineWidth, height: 3,
          background: `linear-gradient(to right, ${COLORS.oroAntico}, transparent)`,
          marginBottom: 22,
        }} />

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 86, fontWeight: 700,
          color: COLORS.biancoCalce, lineHeight: 1.05,
          textShadow: '0 2px 32px rgba(0,0,0,0.95), 0 0 80px rgba(200,152,48,0.16)',
          maxWidth: 860,
        }}>
          Biblioteca<br />
          <span style={{ color: COLORS.oroAntico }}>Vescovile</span>
        </div>

        {/* Numero TAG ghost decorativo */}
        <div style={{
          position: 'absolute', right: -170, top: -40,
          fontFamily: 'Playfair Display, serif',
          fontSize: 160, fontWeight: 700,
          color: COLORS.oroAntico, opacity: 0.06,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>A4.05</div>
      </div>

      {/* SOTTOTITOLO narrativo */}
      <div style={{
        position: 'absolute', left: 72, bottom: 148,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        maxWidth: 700,
        fontFamily: 'Lato, sans-serif', fontSize: 29, fontWeight: 300,
        color: COLORS.biancoCalce, letterSpacing: '0.04em',
        textShadow: '0 1px 10px rgba(0,0,0,0.95)',
      }}>
        Custode di una memoria scritta che attraversa quasi un millennio
      </div>

      <ScanLines opacity={0.022} />
    </div>
  );
};

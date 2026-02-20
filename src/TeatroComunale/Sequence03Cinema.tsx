import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KenBurnsImage } from './components/KenBurnsImage';
import { ParticleField } from './components/ParticleField';
import { ScanLines } from './components/ScanLines';
import { SpotlightEffect } from './components/SpotlightEffect';
import { IMAGES, COLORS } from './constants';

export const Sequence03Cinema: React.FC = () => {
  const frame = useCurrentFrame();

  // frame è locale (0 → 589), nessun offset da sottrarre
  const titleOpacity = interpolate(frame, [10, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterVal = Math.round(interpolate(frame, [120, 290], [0, 50], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  const vigoritaOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const citOpacity = interpolate(frame, [260, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <KenBurnsImage src={IMAGES.cinema} motion="zoom-in" intensity={0.05} />

      {/* Overlay warm sepia — atmosfera cinema d'epoca */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(80,30,10,0.22)',
        mixBlendMode: 'multiply',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right, rgba(13,13,26,0.85) 0%, rgba(13,13,26,0.45) 55%, rgba(13,13,26,0.12) 100%)',
          'linear-gradient(to top, rgba(13,13,26,0.75) 0%, transparent 65%)',
        ].join(', '),
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.7) 100%)',
      }} />

      <SpotlightEffect x={72} y={35} radius={300} color="#F0C060" opacity={0.14} pulse />

      {/* Ghost "ARGENTINO" */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 220, fontWeight: 700,
        color: COLORS.oroLampade, opacity: 0.07,
        letterSpacing: '0.06em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>ARGENTINO</div>

      {/* TITOLO sequenza */}
      <div style={{ position: 'absolute', left: 72, top: 62, opacity: titleOpacity }}>
        <div style={{
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: 14, letterSpacing: '0.22em',
          color: COLORS.oroLampade, textTransform: 'uppercase', marginBottom: 8,
        }}>Il Novecento · Cinema Argentino</div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(to right, ${COLORS.oroLampade}, transparent)` }} />
      </div>

      {/* Scheda Gerardo Vigorita */}
      <div style={{ position: 'absolute', left: 72, top: 148, opacity: vigoritaOpacity, maxWidth: 560 }}>
        <div style={{
          background: 'rgba(13,13,26,0.82)',
          backdropFilter: 'blur(20px)',
          border: `1px solid rgba(212,168,67,0.25)`,
          borderLeft: `4px solid ${COLORS.oroLampade}`,
          borderRadius: 4, padding: '20px 28px',
        }}>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 11,
            color: COLORS.oroLampade, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>🎬 Il Mecenate</div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: 36,
            fontWeight: 700, color: COLORS.biancoCalce,
            marginBottom: 8, lineHeight: 1.1,
          }}>Gerardo Vigorita</div>
          <div style={{
            fontFamily: 'Lato, sans-serif', fontSize: 18,
            color: COLORS.biancoCalce, opacity: 0.80,
            lineHeight: 1.55, fontWeight: 300,
          }}>
            Fondatore del <em style={{ color: COLORS.oroLampade }}>Cinema Argentino</em> —<br />
            faro culturale per l'intera provincia irpina
          </div>
        </div>
      </div>

      {/* Counter "50+ anni" — animato con interpolate */}
      <div style={{ position: 'absolute', left: 72, top: 440, opacity: counterOpacity }}>
        <div style={{
          background: 'rgba(13,13,26,0.78)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(212,168,67,0.20)`,
          borderRadius: 4, padding: '18px 28px',
          display: 'flex', alignItems: 'flex-end', gap: 8,
        }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 72, fontWeight: 700,
            color: COLORS.oroLampade, lineHeight: 1,
          }}>{counterVal}</span>
          <div>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36, fontWeight: 700, color: COLORS.oroChiaro,
            }}>+</span>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: 16,
              color: COLORS.biancoCalce, opacity: 0.80,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>anni di cultura</div>
          </div>
        </div>
      </div>

      {/* Citazione finale */}
      <div style={{ position: 'absolute', left: 72, bottom: 110, opacity: citOpacity, maxWidth: 600 }}>
        <div style={{ borderLeft: `4px solid ${COLORS.rossoTelone}`, paddingLeft: 20 }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 22,
            fontStyle: 'italic', color: COLORS.biancoCalce,
            lineHeight: 1.6, margin: 0,
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>
            "Per oltre cinquant'anni, un faro per l'intera provincia."
          </p>
        </div>
      </div>

      <ParticleField count={40} opacity={0.28} mode="gold" />
      <ScanLines opacity={0.025} />
    </div>
  );
};

import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile} from 'remotion';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {IMAGES, COLORS, playfairFont, latoFont} from './constants';

// ── Seq05 — Continuum + Outro (~27s · 820 frame) ─────────────────
// FASE 1 (0-400f): Continuum — processione, citazione, ghost FEDE
// FASE 2 (400-820f): Iris + Loghi + Label + Fade finale

export const Sequence05Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // ─── FASE 1: Continuum (0-400f) ───────────────────────────────

  // Titolo Continuum entrance
  const titleContinuum = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: {damping: 180},
  });

  // Citazione entrance
  const citazioneEntrance = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: {damping: 200},
  });

  // Ghost "FEDE" — respiro lento
  const ghostFedeOp = Math.sin(frame / 62) * 0.014 + 0.060;

  // Fade-out testi Fase 1: frame 370-400
  const fase1FadeOut = interpolate(frame, [370, 400], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── FASE 2: Iris + Outro (400-820f) ──────────────────────────

  // Fase 2 active: frame >= 400
  const fase2Progress = interpolate(frame, [400, 820], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Overlay scuro crescente per la fase iris
  const fase2DarkOverlay = interpolate(frame, [390, 440], [0, 0.78], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Iris: cerchio che si restringe da raggio 960→0 in frame 400-520
  const irisProgress = interpolate(frame, [400, 520], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const irisRadius = interpolate(irisProgress, [0, 1], [960, 0]);

  // Loghi — entrano dopo la fine dell'iris (frame 520+)
  const logoComune = spring({
    frame: Math.max(0, frame - 530),
    fps,
    config: {damping: 160},
  });
  const logoInnTour = spring({
    frame: Math.max(0, frame - 556),
    fps,
    config: {damping: 160},
  });

  // Linea oro animata
  const lineWidth = interpolate(frame, [550, 640], [0, 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Label A2.09
  const labelOpacity = spring({
    frame: Math.max(0, frame - 580),
    fps,
    config: {damping: 200},
  });

  // "Comune di Lacedonia" e "Cicerone Digitale"
  const comuneOpacity = spring({
    frame: Math.max(0, frame - 540),
    fps,
    config: {damping: 160},
  });

  // URL label
  const urlOpacity = spring({
    frame: Math.max(0, frame - 620),
    fps,
    config: {damping: 200},
  });

  // Fade-out finale: frame 780-820
  const finalFadeOut = interpolate(frame, [780, 820], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo fade rispetto al finalFadeOut
  const logoFadeCombo = Math.min(logoComune, logoInnTour) * finalFadeOut;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      {/* Sfondo sempre presente: processione */}
      <KenBurnsImage
        src={IMAGES.processione}
        motion="zoom-out"
        intensity={0.04}
        objectPosition="center center"
      />

      {/* Overlay scuro base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8,8,12,0.65)',
      }} />

      {/* Overlay crescente fase 2 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: COLORS.neroFondo,
        opacity: fase2DarkOverlay,
        pointerEvents: 'none',
      }} />

      {/* ─── FASE 1: Continuum ─── */}
      <div style={{opacity: fase1FadeOut, pointerEvents: 'none'}}>
        {/* Ghost "FEDE" — grande, centrato */}
        <div style={{
          position: 'absolute', bottom: 60, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: playfairFont,
          fontSize: 200,
          fontWeight: 700,
          color: COLORS.oroMedievale,
          opacity: ghostFedeOp,
          lineHeight: 1,
          pointerEvents: 'none',
          letterSpacing: '0.08em',
        }}>
          FEDE
        </div>

        {/* Titolo Continuum */}
        <div style={{
          position: 'absolute', left: 72, top: 58,
          opacity: interpolate(titleContinuum, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleContinuum, [0, 1], [24, 0])}px)`,
        }}>
          <div style={{
            fontFamily: playfairFont,
            fontSize: 102,
            fontWeight: 700,
            color: COLORS.oroMedievale,
            lineHeight: 1.05,
            textShadow: '0 2px 36px rgba(0,0,0,0.96)',
            maxWidth: 960,
          }}>
            Duemila Anni di Fede Ininterrotta
          </div>
        </div>

        {/* Citazione finale in Georgia italic */}
        <div style={{
          position: 'absolute', left: 72, bottom: 180,
          maxWidth: 820,
          opacity: interpolate(citazioneEntrance, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(citazioneEntrance, [0, 1], [20, 0])}px)`,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 28,
          color: COLORS.biancoCalce,
          lineHeight: 1.58,
          borderLeft: `4px solid ${COLORS.oroMedievale}`,
          paddingLeft: 28,
          textShadow: '0 1px 16px rgba(0,0,0,0.96)',
        }}>
          "Dove i romani pregavano Iside, noi oggi onoriamo la Madonna in un cammino di fede lungo duemila anni."
        </div>
      </div>

      {/* ─── FASE 2: Iris SVG ─── */}
      {irisProgress > 0 && (
        <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
            <defs>
              <mask id="iris-mask-csm">
                <rect width="1920" height="1080" fill="white" />
                <circle cx="960" cy="540" r={irisRadius} fill="black" />
              </mask>
            </defs>
            <rect width="1920" height="1080" fill={COLORS.neroFondo} mask="url(#iris-mask-csm)" />
          </svg>
        </div>
      )}

      {/* ─── FASE 2: Loghi + Testi Outro ─── */}
      <div style={{opacity: fase2Progress > 0 ? finalFadeOut : 0}}>

        {/* Linea oro animata — centro */}
        <div style={{
          position: 'absolute', left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateY(-80px)',
          width: lineWidth,
          height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.oroMedievale}, transparent)`,
        }} />

        {/* Logo Comune — sinistra */}
        <div style={{
          position: 'absolute', bottom: 52, left: 120,
          display: 'flex', alignItems: 'center', gap: 16,
          opacity: logoComune * finalFadeOut,
          transform: `translateY(${interpolate(logoComune, [0, 1], [16, 0])}px)`,
        }}>
          <Img
            src={staticFile(IMAGES.logoComune)}
            style={{
              height: 48,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))',
            }}
          />
          <div>
            <div style={{
              fontFamily: playfairFont,
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.biancoCalce,
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}>
              Comune di Lacedonia
            </div>
            <div style={{
              fontFamily: latoFont,
              fontWeight: 300,
              fontSize: 17,
              color: COLORS.oroMedievale,
              letterSpacing: '0.08em',
              opacity: 0.88,
            }}>
              Alta Irpinia · Campania
            </div>
          </div>
        </div>

        {/* Separatore centrale */}
        <div style={{
          position: 'absolute', bottom: 52, left: '50%',
          transform: 'translateX(-50%)',
          opacity: logoFadeCombo,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <div style={{width: 1, height: 36, background: `rgba(212,168,67,0.45)`}} />
          <div style={{
            fontFamily: latoFont,
            fontSize: 9,
            color: COLORS.oroMedievale,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.70,
          }}>×</div>
          <div style={{width: 1, height: 36, background: `rgba(212,168,67,0.45)`}} />
        </div>

        {/* Logo InnTour — destra */}
        <div style={{
          position: 'absolute', bottom: 52, right: 120,
          display: 'flex', alignItems: 'center', gap: 16,
          opacity: logoInnTour * finalFadeOut,
          transform: `translateY(${interpolate(logoInnTour, [0, 1], [16, 0])}px)`,
        }}>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontFamily: latoFont,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.10em',
              color: COLORS.biancoCalce,
              textTransform: 'uppercase',
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}>
              InnTour S.R.L.
            </div>
            <div style={{
              fontFamily: latoFont,
              fontWeight: 300,
              fontSize: 16,
              letterSpacing: '0.06em',
              color: COLORS.verdeInnTour,
              opacity: 0.90,
            }}>
              MetaBorghi Initiative
            </div>
          </div>
          <Img
            src={staticFile(IMAGES.logoInnTour)}
            style={{
              height: 60,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))',
            }}
          />
        </div>

        {/* Cicerone Digitale label */}
        <div style={{
          position: 'absolute', bottom: 24, left: 0, right: 0,
          textAlign: 'center',
          opacity: urlOpacity * finalFadeOut,
        }}>
          <div style={{
            fontFamily: latoFont,
            fontSize: 17,
            color: COLORS.biancoCalce,
            opacity: 0.55,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Cicerone Digitale · Virtual Tour
          </div>
        </div>

        {/* Label A2.09 */}
        <div style={{
          position: 'absolute', top: 40, left: 0, right: 0,
          textAlign: 'center',
          opacity: labelOpacity * finalFadeOut,
        }}>
          <div style={{
            fontFamily: latoFont,
            fontSize: 15,
            color: COLORS.ambraEgizia,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.80,
          }}>
            A2.09 · Chiesa di Santa Maria della Cancellata · Architettura e Monumenti
          </div>
        </div>

        {/* "Comune di Lacedonia" centrato sopra — fallback se nessun logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: comuneOpacity * finalFadeOut,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: playfairFont,
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.biancoCalce,
            letterSpacing: '0.06em',
            opacity: 0.0,  // nascosto — usiamo quello in basso a sinistra
          }}>
            Comune di Lacedonia
          </div>
        </div>

      </div>

      <ScanLines opacity={0.018} />
    </div>
  );
};

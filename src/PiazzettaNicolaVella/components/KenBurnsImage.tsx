import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

type Motion = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-down';

interface KenBurnsImageProps {
  src: string;
  motion?: Motion;
  /** 0–1: intensità massima di zoom o spostamento (default: 0.05) */
  intensity?: number;
  /** Punto focale CSS per objectFit:cover (default: 'center center') */
  objectPosition?: string;
  /** Opacità dell'intera immagine, utile per cross-dissolve manuali (default: 1) */
  opacity?: number;
  /** Colore dell'overlay sopra l'immagine (default: '#000') */
  overlayColor?: string;
  /** Opacità dell'overlay (0 = nessun overlay, default: 0) */
  overlayOpacity?: number;
  /**
   * Frame di animazione simulati PRIMA dell'inizio della sequenza (default: 135 ≈ 4.5 s @30fps).
   * L'immagine risulta già in movimento quando la sequenza fa fade-in.
   */
  introPadFrames?: number;
  /**
   * Frame di animazione simulati DOPO la fine della sequenza (default: 105 ≈ 3.5 s @30fps).
   * L'immagine continua a muoversi durante il fade-out verso la sequenza successiva.
   */
  outroPadFrames?: number;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  motion = 'zoom-in',
  intensity = 0.05,
  objectPosition = 'center center',
  opacity = 1,
  overlayColor = '#000',
  overlayOpacity = 0,
  introPadFrames = 135,
  outroPadFrames = 105,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Linea temporale virtuale estesa:
  // - L'animazione parte `introPadFrames` prima del frame 0 (immagine già in moto al fade-in)
  // - L'animazione termina `outroPadFrames` dopo la fine (immagine ancora in moto al fade-out)
  // Questo garantisce continuità visiva attraverso le cross-dissolvenze TransitionSeries.
  const virtualTotal = introPadFrames + durationInFrames + outroPadFrames;
  const progress = interpolate(
    frame + introPadFrames,
    [0, virtualTotal],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Calcolo scala e traslazione.
  // Per i movimenti pan: scale = 1+intensity garantisce esattamente abbastanza
  // spazio di bordo per la traslazione massima senza mai rivelare un'area vuota,
  // indipendentemente dal formato sorgente (9:16 ritratto → 16:9 landscape).
  //
  // Derivazione: con transform: scale(s) translate(tx%) e transformOrigin:center,
  // il bordo sinistro a progress massimo è: s*(0 - W/2) + s*tx + W/2 = 0
  // → tx_max = W/2 * (s-1)/s = 50% * intensity/(1+intensity)
  //
  // Il pan è centrato a progress=0.5 così la dissolvenza a metà sequenza
  // mostra sempre il centro dell'immagine.
  let scale = 1;
  let tx = 0; // translateX in %
  let ty = 0; // translateY in %

  const halfRange = (50 * intensity) / (1 + intensity);

  switch (motion) {
    case 'zoom-in':
      scale = 1 + progress * intensity;
      break;
    case 'zoom-out':
      scale = 1 + intensity * (1 - progress);
      break;
    case 'pan-left':
      scale = 1 + intensity;
      tx = -(progress - 0.5) * 2 * halfRange;
      break;
    case 'pan-right':
      scale = 1 + intensity;
      tx = (progress - 0.5) * 2 * halfRange;
      break;
    case 'pan-up':
      scale = 1 + intensity;
      ty = -(progress - 0.5) * 2 * halfRange;
      break;
    case 'pan-down':
      scale = 1 + intensity;
      ty = (progress - 0.5) * 2 * halfRange;
      break;
  }

  const transform =
    tx !== 0 || ty !== 0
      ? `scale(${scale}) translate(${tx}%, ${ty}%)`
      : `scale(${scale})`;

  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden' }}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          transform,
          transformOrigin: 'center center',
        }}
      />
      {overlayOpacity > 0 && (
        <AbsoluteFill
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        />
      )}
    </AbsoluteFill>
  );
};

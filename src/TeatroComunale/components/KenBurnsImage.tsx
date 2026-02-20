import React from 'react';
import { Img, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

type Motion = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up';

interface KenBurnsImageProps {
  src: string;
  motion?: Motion;
  intensity?: number;
  objectPosition?: string;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  motion = 'zoom-in',
  intensity = 0.05,
  objectPosition = 'center center',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let transform = '';
  switch (motion) {
    case 'zoom-in':
      transform = `scale(${1 + progress * intensity})`;
      break;
    case 'zoom-out':
      transform = `scale(${1 + intensity - progress * intensity})`;
      break;
    case 'pan-left':
      transform = `scale(${1 + intensity * 0.5}) translateX(${-progress * intensity * 100}%)`;
      break;
    case 'pan-right':
      transform = `scale(${1 + intensity * 0.5}) translateX(${progress * intensity * 100}%)`;
      break;
    case 'pan-up':
      transform = `scale(${1 + intensity * 0.5}) translateY(${-progress * intensity * 100}%)`;
      break;
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
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
    </div>
  );
};

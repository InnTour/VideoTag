import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

interface KenBurnsImageProps {
	src: string;
	/** 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' */
	motion?: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
	/** 0–1, percentuale di movimento massima */
	intensity?: number;
	/** Opacità dell'immagine (per overlay) */
	opacity?: number;
	/** Colore overlay scuro sopra l'immagine */
	overlayColor?: string;
	/** Opacità overlay (0–1) */
	overlayOpacity?: number;
	objectPosition?: string;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
	src,
	motion = 'zoom-in',
	intensity = 0.04,
	opacity = 1,
	overlayColor = '#000',
	overlayOpacity = 0.35,
	objectPosition = 'center center',
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const progress = frame / durationInFrames;

	let transform = '';

	switch (motion) {
		case 'zoom-in':
			transform = `scale(${1 + progress * intensity})`;
			break;
		case 'zoom-out':
			transform = `scale(${1 + intensity - progress * intensity})`;
			break;
		case 'pan-left':
			transform = `scale(${1 + intensity * 0.5}) translateX(${-progress * intensity * 200}px)`;
			break;
		case 'pan-right':
			transform = `scale(${1 + intensity * 0.5}) translateX(${progress * intensity * 200}px)`;
			break;
	}

	// Fade in iniziale per evitare cut bruschi
	const fadeIn = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity: opacity * fadeIn, overflow: 'hidden'}}>
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
				<AbsoluteFill style={{backgroundColor: overlayColor, opacity: overlayOpacity}} />
			)}
		</AbsoluteFill>
	);
};

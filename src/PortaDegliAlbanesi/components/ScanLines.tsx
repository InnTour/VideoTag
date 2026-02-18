import {useCurrentFrame} from 'remotion';

// Effetto scan-lines cinematografiche — aggiunge profondità e feeling "proiezione"
export const ScanLines: React.FC<{opacity?: number}> = ({opacity = 0.04}) => {
	const frame = useCurrentFrame();
	// Lieve movimento verticale per effetto proiezione analogica
	const offset = (frame * 0.5) % 4;

	return (
		<svg
			width={1920}
			height={1080}
			style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity}}
		>
			<defs>
				<pattern id="scanlines" x={0} y={offset} width={1920} height={4} patternUnits="userSpaceOnUse">
					<rect x={0} y={0} width={1920} height={1} fill="black" opacity={0.6} />
					<rect x={0} y={1} width={1920} height={3} fill="transparent" />
				</pattern>
			</defs>
			<rect x={0} y={0} width={1920} height={1080} fill="url(#scanlines)" />
		</svg>
	);
};

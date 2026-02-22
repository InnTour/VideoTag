import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../constants';

// Cornice decorativa stile codice miniato medievale
// Bordura in oro con angoli ornamentali — appare progressivamente

interface ManuscriptFrameProps {
	startFrame?: number;
	opacity?: number;
}

export const ManuscriptFrame: React.FC<ManuscriptFrameProps> = ({
	startFrame = 0,
	opacity = 1,
}) => {
	const frame = useCurrentFrame();
	const localFrame = frame - startFrame;

	const reveal = interpolate(localFrame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const finalOpacity = reveal * opacity;
	const borderColor = COLORS.oroLiturgico;
	const cornerColor = COLORS.oroMiniato;

	return (
		<AbsoluteFill style={{pointerEvents: 'none', opacity: finalOpacity}}>
			<svg
				width={1920}
				height={1080}
				style={{position: 'absolute', top: 0, left: 0}}
			>
				{/* Bordo esterno sottile */}
				<rect
					x={20} y={20}
					width={1880} height={1040}
					fill="none"
					stroke={borderColor}
					strokeWidth={1.5}
					opacity={0.45}
				/>

				{/* Bordo interno */}
				<rect
					x={36} y={36}
					width={1848} height={1008}
					fill="none"
					stroke={borderColor}
					strokeWidth={0.8}
					opacity={0.25}
				/>

				{/* Angolo top-left */}
				<g opacity={0.7} fill={cornerColor}>
					{/* Croce angolare */}
					<rect x={22} y={50} width={28} height={1.5} />
					<rect x={50} y={22} width={1.5} height={28} />
					{/* Diamante */}
					<polygon points="28,28 36,22 44,28 36,34" opacity={0.8} />
					<circle cx={36} cy={28} r={3} opacity={0.6} />
				</g>

				{/* Angolo top-right */}
				<g opacity={0.7} fill={cornerColor}>
					<rect x={1870} y={50} width={28} height={1.5} />
					<rect x={1868.5} y={22} width={1.5} height={28} />
					<polygon points="1892,28 1884,22 1876,28 1884,34" opacity={0.8} />
					<circle cx={1884} cy={28} r={3} opacity={0.6} />
				</g>

				{/* Angolo bottom-left */}
				<g opacity={0.7} fill={cornerColor}>
					<rect x={22} y={1029} width={28} height={1.5} />
					<rect x={50} y={1030} width={1.5} height={28} />
					<polygon points="28,1052 36,1058 44,1052 36,1046" opacity={0.8} />
					<circle cx={36} cy={1052} r={3} opacity={0.6} />
				</g>

				{/* Angolo bottom-right */}
				<g opacity={0.7} fill={cornerColor}>
					<rect x={1870} y={1029} width={28} height={1.5} />
					<rect x={1868.5} y={1030} width={1.5} height={28} />
					<polygon points="1892,1052 1884,1058 1876,1052 1884,1046" opacity={0.8} />
					<circle cx={1884} cy={1052} r={3} opacity={0.6} />
				</g>

				{/* Ornamento centrale top — piccolo motivo */}
				<g transform="translate(960, 28)" opacity={0.5} fill={cornerColor}>
					<polygon points="0,-6 5,0 0,6 -5,0" />
					<line x1="-30" y1="0" x2="-8" y2="0" stroke={cornerColor} strokeWidth={0.8} />
					<line x1="8" y1="0" x2="30" y2="0" stroke={cornerColor} strokeWidth={0.8} />
				</g>

				{/* Ornamento centrale bottom */}
				<g transform="translate(960, 1052)" opacity={0.5} fill={cornerColor}>
					<polygon points="0,-6 5,0 0,6 -5,0" />
					<line x1="-30" y1="0" x2="-8" y2="0" stroke={cornerColor} strokeWidth={0.8} />
					<line x1="8" y1="0" x2="30" y2="0" stroke={cornerColor} strokeWidth={0.8} />
				</g>
			</svg>
		</AbsoluteFill>
	);
};

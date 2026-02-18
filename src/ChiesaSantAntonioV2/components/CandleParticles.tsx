import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../constants';

// Particelle stile scintille di candela / braci medievali
// Niente neon — solo oro, avorio e rosso minio

interface Particle {
	x: number;
	y: number;
	size: number;
	speed: number;
	phase: number;
	drift: number;
	color: string;
}

const PARTICLE_COLORS = [
	COLORS.oroLiturgico,
	COLORS.oroMiniato,
	COLORS.avorioCarta,
	COLORS.rossoMinio,
	COLORS.oroLiturgico,
	COLORS.oroMiniato,
	COLORS.oroLiturgico,
];

const N = 40;

const particles: Particle[] = Array.from({length: N}, (_, i) => ({
	x: Math.random() * 1920,
	y: 200 + Math.random() * 680,
	size: 1 + Math.random() * 2.5,
	speed: 0.15 + Math.random() * 0.35,
	phase: Math.random() * Math.PI * 2,
	drift: (Math.random() - 0.5) * 0.8,
	color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
}));

export const CandleParticles: React.FC<{opacity?: number}> = ({opacity = 0.35}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;

	return (
		<AbsoluteFill style={{pointerEvents: 'none', opacity}}>
			<svg width={1920} height={1080} style={{position: 'absolute'}}>
				{particles.map((p, i) => {
					// Moto ascensionale (scintille che salgono) + oscillazione laterale
					const yOffset = -((t * p.speed * 60) % 900) - 50;
					const xOffset = Math.sin(t * 0.7 + p.phase) * 18 * p.drift;
					const pulseOpacity = 0.4 + Math.sin(t * 2.1 + p.phase) * 0.35;

					return (
						<ellipse
							key={i}
							cx={p.x + xOffset}
							cy={p.y + yOffset}
							rx={p.size * 0.7}
							ry={p.size}
							fill={p.color}
							opacity={pulseOpacity}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};

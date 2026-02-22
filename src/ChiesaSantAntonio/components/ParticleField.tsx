import {useCurrentFrame} from 'remotion';
import {COLORS} from '../constants';

// Sistema di particelle fluttuanti — estetica cinematografica moderna
// Seed deterministico: stesso frame = stessa posizione (niente jitter nel rendering)
const seededRng = (seed: number) => {
	const x = Math.sin(seed * 9301 + 49297) * 233280;
	return x - Math.floor(x);
};

interface Particle {
	id: number;
	x: number;      // 0-1920
	y: number;      // 0-1080
	size: number;
	speed: number;
	opacity: number;
	color: string;
	driftX: number;
}

const N_PARTICLES = 55;

const generateParticles = (): Particle[] =>
	Array.from({length: N_PARTICLES}, (_, i) => ({
		id: i,
		x: seededRng(i * 17) * 1920,
		y: seededRng(i * 31) * 1080,
		size: seededRng(i * 7) * 2.5 + 0.5,
		speed: seededRng(i * 13) * 0.4 + 0.1,
		opacity: seededRng(i * 23) * 0.5 + 0.15,
		color: i % 5 === 0 ? COLORS.oroIrpino
			: i % 4 === 0 ? COLORS.verdeInnTour
			: i % 3 === 0 ? COLORS.neonBlue
			: 'rgba(255,255,255,0.6)',
		driftX: (seededRng(i * 41) - 0.5) * 0.15,
	}));

const PARTICLES = generateParticles();

export const ParticleField: React.FC<{opacity?: number}> = ({opacity = 1}) => {
	const frame = useCurrentFrame();

	return (
		<svg
			width={1920}
			height={1080}
			style={{position: 'absolute', top: 0, left: 0, opacity, pointerEvents: 'none'}}
		>
			{PARTICLES.map((p) => {
				// Movimento verticale sinusoidale + drift orizzontale
				const t = frame * p.speed;
				const currentY = (p.y - t * 0.6) % 1080;
				const currentX = p.x + Math.sin(t * 0.05 + p.id) * 8 + frame * p.driftX;
				const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.08 + p.id * 2.1);
				const finalOpacity = p.opacity * twinkle;

				return (
					<circle
						key={p.id}
						cx={((currentX % 1920) + 1920) % 1920}
						cy={((currentY % 1080) + 1080) % 1080}
						r={p.size}
						fill={p.color}
						opacity={finalOpacity}
					/>
				);
			})}
		</svg>
	);
};

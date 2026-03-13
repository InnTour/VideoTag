import {useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS} from '../constants';

// Sistema di particelle fluttuanti — estetica cinematografica moderna
// Seed deterministico: stesso frame = stessa posizione (niente jitter nel rendering)
const seededRng = (seed: number) => {
	const x = Math.sin(seed * 9301 + 49297) * 233280;
	return x - Math.floor(x);
};

interface Particle {
	id: number;
	baseX: number;
	baseY: number;
	size: number;
	speed: number;
	opacity: number;
	color: string;
}

const N_PARTICLES = 55;

const generateParticles = (): Particle[] =>
	Array.from({length: N_PARTICLES}, (_, i) => ({
		id: i,
		baseX: seededRng(i * 17) * 100,
		baseY: seededRng(i * 31) * 100,
		size: seededRng(i * 7) * 2.5 + 0.5,
		speed: seededRng(i * 13) * 0.4 + 0.1,
		opacity: seededRng(i * 23) * 0.5 + 0.15,
		color: i % 5 === 0 ? COLORS.oroIrpino
			: i % 4 === 0 ? COLORS.verdeInnTour
			: i % 3 === 0 ? COLORS.neonBlue
			: 'rgba(255,255,255,0.6)',
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
				const x = (p.baseX + noise2D(`px-${p.id}`, frame * 0.012, 0) * 3.5) / 100 * 1920;
				const rawY = (p.baseY - frame * p.speed * 10 + noise2D(`py-${p.id}`, 0, frame * 0.009) * 2.5) % 110;
				const y = (rawY - 5) / 100 * 1080;
				const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.08 + p.id * 2.1);
				const finalOpacity = p.opacity * twinkle;

				return (
					<circle
						key={p.id}
						cx={((x % 1920) + 1920) % 1920}
						cy={((y % 1080) + 1080) % 1080}
						r={p.size}
						fill={p.color}
						opacity={finalOpacity}
					/>
				);
			})}
		</svg>
	);
};

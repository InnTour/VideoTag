import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, loraFont, seededRandom} from './constants';
import {HumanFigure} from './svg/HumanFigure';

const CONFETTI_COUNT = 40;
const FIGURE_CONFIGS = [
	{pose: 'arms-raised' as const, hat: 'contadino' as const, x: 250, flip: false},
	{pose: 'standing' as const, hat: 'woman' as const, x: 420, flip: false},
	{pose: 'arms-raised' as const, hat: 'contadino' as const, x: 600, flip: true},
	{pose: 'arms-raised' as const, hat: 'none' as const, x: 780, flip: false},
	{pose: 'standing' as const, hat: 'woman' as const, x: 960, flip: true},
	{pose: 'arms-raised' as const, hat: 'contadino' as const, x: 1150, flip: false},
	{pose: 'standing' as const, hat: 'contadino' as const, x: 1350, flip: true},
];

const CONFETTI_COLORS = [
	COLORS.olive, // green
	COLORS.textLight, // white
	COLORS.terracotta, // red
	COLORS.oldGold,
];

export const Scene06Celebration: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const entryFade = interpolate(frame, [0, 0.5 * fps], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	const exitFade = interpolate(
		frame,
		[durationInFrames - 0.5 * fps, durationInFrames],
		[1, 0],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
	);
	const sceneOpacity = Math.min(entryFade, exitFade);

	// Golden center glow pulse
	const glowPulse = interpolate(
		frame % Math.round(2 * fps),
		[0, fps, 2 * fps],
		[0.15, 0.3, 0.15],
	);

	// Quote slide in
	const quoteSpring = spring({
		frame: Math.max(0, frame - Math.round(2.5 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1 * fps),
	});
	const quoteY = interpolate(quoteSpring, [0, 1], [40, 0]);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Warm piazza background */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(180deg, #3a2818 0%, #2a1e12 50%, ${COLORS.deepUmber} 100%)`,
				}}
			/>

			{/* Golden center glow */}
			<div
				style={{
					position: 'absolute',
					top: '30%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 1200,
					height: 800,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${COLORS.amber} 0%, transparent 70%)`,
					opacity: glowPulse,
				}}
			/>

			{/* Stone arches - left */}
			<svg
				width={200}
				height={600}
				style={{position: 'absolute', left: 0, top: 200}}
			>
				<path
					d="M0,0 L80,0 A60,80 0 0,1 80,160 L80,600 L0,600 Z"
					fill="#2a2015"
					stroke={COLORS.agedPaper}
					strokeWidth={2}
					opacity={0.6}
				/>
				<path
					d="M0,180 L80,180 A60,80 0 0,1 80,340 L80,600 L0,600 Z"
					fill="#2a2015"
					stroke={COLORS.agedPaper}
					strokeWidth={2}
					opacity={0.4}
				/>
			</svg>

			{/* Stone arches - right */}
			<svg
				width={200}
				height={600}
				style={{position: 'absolute', right: 0, top: 200, transform: 'scaleX(-1)'}}
			>
				<path
					d="M0,0 L80,0 A60,80 0 0,1 80,160 L80,600 L0,600 Z"
					fill="#2a2015"
					stroke={COLORS.agedPaper}
					strokeWidth={2}
					opacity={0.6}
				/>
				<path
					d="M0,180 L80,180 A60,80 0 0,1 80,340 L80,600 L0,600 Z"
					fill="#2a2015"
					stroke={COLORS.agedPaper}
					strokeWidth={2}
					opacity={0.4}
				/>
			</svg>

			{/* Cobblestone ground */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 300,
					background: `linear-gradient(180deg, transparent 0%, #1a1008 30%, #1a1008 100%)`,
				}}
			/>

			{/* Celebrating figures */}
			{FIGURE_CONFIGS.map((fig, i) => {
				const figSpring = spring({
					frame: Math.max(0, frame - i * 8),
					fps,
					config: {damping: 12, stiffness: 100},
					durationInFrames: Math.round(0.8 * fps),
				});
				const figScale = interpolate(figSpring, [0, 1], [0, 1]);
				// Gentle arm bob for arms-raised figures
				const armBob =
					fig.pose === 'arms-raised'
						? Math.sin(frame * 0.15 + i * 2) * 3
						: 0;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							bottom: 280,
							left: fig.x,
							transform: `scale(${figScale}) translateY(${armBob}px)`,
							transformOrigin: 'bottom center',
						}}
					>
						<HumanFigure
							pose={fig.pose}
							hatStyle={fig.hat}
							color={COLORS.textDark}
							height={140}
							flipX={fig.flip}
						/>
					</div>
				);
			})}

			{/* Confetti */}
			{Array.from({length: CONFETTI_COUNT}).map((_, i) => {
				const startX = seededRandom(i * 3) * 1920;
				const speed = 1.5 + seededRandom(i * 7) * 3;
				const drift = Math.sin(frame * 0.03 + seededRandom(i * 11) * 10) * 40;
				const confettiY = (frame * speed + seededRandom(i * 13) * 500) % 1200 - 120;
				const rotation = frame * (2 + seededRandom(i * 17) * 5);
				const colorIdx = Math.floor(seededRandom(i * 19) * CONFETTI_COLORS.length);
				const size = 4 + seededRandom(i * 23) * 8;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: confettiY,
							left: startX + drift,
							width: size,
							height: size * 0.6,
							backgroundColor: CONFETTI_COLORS[colorIdx],
							transform: `rotate(${rotation}deg)`,
							borderRadius: 1,
							opacity: 0.8,
						}}
					/>
				);
			})}

			{/* Quote at bottom */}
			<div
				style={{
					position: 'absolute',
					bottom: 60,
					left: 0,
					right: 0,
					textAlign: 'center',
					opacity: quoteSpring,
					transform: `translateY(${quoteY}px)`,
				}}
			>
				<p
					style={{
						fontFamily: loraFont,
						fontSize: 24,
						fontStyle: 'italic',
						color: COLORS.textLight,
						textShadow: '0 2px 10px rgba(0,0,0,0.8)',
						maxWidth: 900,
						margin: '0 auto',
						lineHeight: 1.5,
						padding: '0 40px',
					}}
				>
					&laquo;Le voci dei contadini che esultano tra queste pietre&raquo;
				</p>
			</div>

			{/* Vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at center 60%, transparent 40%, rgba(10,8,5,0.6) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

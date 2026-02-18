import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, ralewayFont} from './constants';
import {TownSilhouette} from './svg/TownSilhouette';

export const Scene01Piazza: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Entry / exit fades
	const entryFade = interpolate(frame, [0, 0.8 * fps], [0, 1], {
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

	// Town silhouette rises from below
	const townRise = spring({
		frame,
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1.5 * fps),
	});
	const townY = interpolate(townRise, [0, 1], [80, 0]);

	// Title animation
	const titleSpring = spring({
		frame: Math.max(0, frame - Math.round(1 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1 * fps),
	});
	const letterSpacing = interpolate(titleSpring, [0, 1], [40, 14]);
	const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

	// Subtitle
	const subtitleSpring = spring({
		frame: Math.max(0, frame - Math.round(2 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.8 * fps),
	});
	const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

	// Sky gradient shifts subtly
	const gradientShift = interpolate(frame, [0, durationInFrames], [0, 15], {
		extrapolateRight: 'clamp',
	});

	// Stars twinkling
	const starOpacity1 = interpolate(
		frame % 60,
		[0, 30, 60],
		[0.3, 0.8, 0.3],
	);
	const starOpacity2 = interpolate(
		(frame + 20) % 50,
		[0, 25, 50],
		[0.5, 1, 0.5],
	);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Sky gradient background */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(180deg,
						#0d1b2a ${gradientShift}%,
						#1b2838 ${25 + gradientShift}%,
						#a0522d ${65 + gradientShift * 0.5}%,
						#cd853f ${80 + gradientShift * 0.3}%,
						#e8a317 100%)`,
				}}
			/>

			{/* Stars in sky */}
			<svg
				width="1920"
				height="400"
				style={{position: 'absolute', top: 0, left: 0}}
			>
				<circle cx={200} cy={80} r={2} fill="white" opacity={starOpacity1} />
				<circle cx={500} cy={120} r={1.5} fill="white" opacity={starOpacity2} />
				<circle cx={800} cy={60} r={2} fill="white" opacity={starOpacity1 * 0.7} />
				<circle cx={1100} cy={100} r={1.5} fill="white" opacity={starOpacity2 * 0.8} />
				<circle cx={1400} cy={70} r={2} fill="white" opacity={starOpacity1 * 0.9} />
				<circle cx={1650} cy={130} r={1.5} fill="white" opacity={starOpacity2 * 0.6} />
				<circle cx={350} cy={150} r={1} fill="white" opacity={starOpacity2} />
				<circle cx={1250} cy={50} r={1} fill="white" opacity={starOpacity1} />
			</svg>

			{/* Town silhouette */}
			<div
				style={{
					position: 'absolute',
					bottom: 200,
					left: '50%',
					transform: `translateX(-50%) translateY(${townY}px)`,
				}}
			>
				<TownSilhouette
					width={1200}
					height={350}
					color={COLORS.deepUmber}
					showDetails
				/>
			</div>

			{/* Cobblestone ground */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 220,
					background: `linear-gradient(180deg, ${COLORS.deepUmber} 0%, #1a1008 100%)`,
				}}
			/>
			<svg
				width="1920"
				height="100"
				style={{position: 'absolute', bottom: 120, left: 0, opacity: 0.3}}
			>
				{Array.from({length: 30}).map((_, i) => (
					<ellipse
						key={i}
						cx={64 * i + 32}
						cy={20 + (i % 3) * 25}
						rx={25}
						ry={10}
						fill="none"
						stroke={COLORS.agedPaper}
						strokeWidth={0.8}
					/>
				))}
			</svg>

			{/* Title */}
			<div
				style={{
					position: 'absolute',
					top: 280,
					left: 0,
					right: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontFamily: cinzelFont,
						fontSize: 90,
						fontWeight: 700,
						color: COLORS.textLight,
						letterSpacing,
						opacity: titleOpacity,
						textShadow: `0 0 40px ${COLORS.amber}, 0 2px 8px rgba(0,0,0,0.8)`,
						margin: 0,
					}}
				>
					LACEDONIA
				</h1>
				<p
					style={{
						fontFamily: ralewayFont,
						fontSize: 28,
						fontWeight: 400,
						color: COLORS.oldGold,
						opacity: subtitleSpring,
						transform: `translateY(${subtitleY}px)`,
						marginTop: 12,
						letterSpacing: 8,
					}}
				>
					IRPINIA, CAMPANIA
				</p>
			</div>

			{/* Warm vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at center 70%, transparent 30%, rgba(26,20,16,0.5) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

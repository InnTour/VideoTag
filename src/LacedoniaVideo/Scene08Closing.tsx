import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, loraFont, seededRandom} from './constants';
import {TownSilhouette} from './svg/TownSilhouette';
import {OrnamentalDivider} from './svg/OrnamentalDivider';

const PARTICLE_COUNT = 25;

export const Scene08Closing: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const entryFade = interpolate(frame, [0, 0.8 * fps], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	const exitFade = interpolate(
		frame,
		[durationInFrames - 0.7 * fps, durationInFrames],
		[1, 0],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
	);
	const sceneOpacity = Math.min(entryFade, exitFade);

	// Elements spring in
	const titleSpring = spring({
		frame,
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1 * fps),
	});

	const subtitleSpring = spring({
		frame: Math.max(0, frame - Math.round(0.5 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.8 * fps),
	});

	// Star glow pulse
	const starGlow = interpolate(
		frame % Math.round(1.5 * fps),
		[0, Math.round(0.75 * fps), Math.round(1.5 * fps)],
		[0.5, 1, 0.5],
	);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Dark warm gradient background */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.deepUmber} 40%, #2a1e12 70%, ${COLORS.bronze}22 100%)`,
				}}
			/>

			{/* Town silhouette at top */}
			<div
				style={{
					position: 'absolute',
					top: 180,
					left: '50%',
					transform: `translateX(-50%) scale(${titleSpring})`,
					opacity: titleSpring * 0.6,
				}}
			>
				<TownSilhouette
					width={300}
					height={100}
					color={COLORS.agedPaper}
					showDetails={false}
				/>
			</div>

			{/* Golden star above town */}
			<div
				style={{
					position: 'absolute',
					top: 155,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<svg width={40} height={40} viewBox="0 0 40 40">
					{/* Glow */}
					<circle
						cx={20}
						cy={20}
						r={16}
						fill={COLORS.amber}
						opacity={starGlow * 0.3}
					/>
					{/* Star */}
					<polygon
						points="20,4 23,15 34,15 25,22 28,33 20,26 12,33 15,22 6,15 17,15"
						fill={COLORS.oldGold}
						opacity={starGlow}
					/>
					<polygon
						points="20,4 23,15 34,15 25,22 28,33 20,26 12,33 15,22 6,15 17,15"
						fill="none"
						stroke={COLORS.amber}
						strokeWidth={0.5}
						opacity={starGlow * 0.8}
					/>
				</svg>
			</div>

			{/* Title */}
			<div
				style={{
					position: 'absolute',
					top: 380,
					left: 0,
					right: 0,
					textAlign: 'center',
					transform: `scale(${titleSpring})`,
				}}
			>
				<h1
					style={{
						fontFamily: cinzelFont,
						fontSize: 80,
						fontWeight: 700,
						color: COLORS.textLight,
						letterSpacing: 16,
						margin: 0,
						textShadow: `0 0 40px ${COLORS.amber}44, 0 2px 4px rgba(0,0,0,0.6)`,
					}}
				>
					LACEDONIA
				</h1>
			</div>

			{/* Ornamental divider */}
			<div
				style={{
					position: 'absolute',
					top: 490,
					left: '50%',
					transform: 'translateX(-50%)',
					opacity: subtitleSpring,
				}}
			>
				<OrnamentalDivider width={500} color={COLORS.oldGold} />
			</div>

			{/* Subtitle */}
			<div
				style={{
					position: 'absolute',
					top: 540,
					left: 0,
					right: 0,
					textAlign: 'center',
					opacity: subtitleSpring,
				}}
			>
				<p
					style={{
						fontFamily: loraFont,
						fontSize: 30,
						fontStyle: 'italic',
						fontWeight: 400,
						color: COLORS.oldGold,
						letterSpacing: 4,
						margin: 0,
					}}
				>
					Un faro di cultura dal 1878
				</p>
			</div>

			{/* Golden particles floating upward */}
			{Array.from({length: PARTICLE_COUNT}).map((_, i) => {
				const startX = seededRandom(i * 3 + 1) * 1920;
				const speed = 0.5 + seededRandom(i * 7 + 2) * 1.5;
				const particleY =
					1080 -
					((frame * speed + seededRandom(i * 11) * 800) % 1200);
				const drift =
					Math.sin(frame * 0.02 + seededRandom(i * 13) * 10) * 20;
				const size = 2 + seededRandom(i * 17) * 4;
				const particleOpacity = interpolate(
					particleY,
					[0, 200, 800, 1080],
					[0, 0.6, 0.6, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: particleY,
							left: startX + drift,
							width: size,
							height: size,
							borderRadius: '50%',
							backgroundColor: COLORS.oldGold,
							opacity: particleOpacity,
							boxShadow: `0 0 ${size * 2}px ${COLORS.amber}`,
						}}
					/>
				);
			})}

			{/* Vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,5,0.6) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

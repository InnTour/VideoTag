import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, ralewayFont} from './constants';

const NAME = 'FRANCESCO DE SANCTIS';
const DATES = '1817 — 1883';
const CHAR_FRAMES = 2;

export const Scene02Bust: React.FC = () => {
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

	// Bust entrance
	const bustSpring = spring({
		frame,
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1.2 * fps),
	});
	const bustScale = interpolate(bustSpring, [0, 1], [0.85, 1]);

	// Shimmer effect - highlight sweeps across bust
	const shimmerX = interpolate(
		frame,
		[Math.round(1.5 * fps), Math.round(3 * fps)],
		[-200, 600],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Typewriter for name
	const nameStartFrame = Math.round(1.5 * fps);
	const typedChars = Math.min(
		NAME.length,
		Math.max(0, Math.floor((frame - nameStartFrame) / CHAR_FRAMES)),
	);
	const typedName = NAME.slice(0, typedChars);

	// Dates fade in
	const datesOpacity = interpolate(
		frame,
		[Math.round(3.5 * fps), Math.round(4.2 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Radial glow pulse
	const glowPulse = interpolate(
		frame % Math.round(2 * fps),
		[0, fps, 2 * fps],
		[0.3, 0.6, 0.3],
	);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Warm parchment background */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse at center 40%, ${COLORS.parchment} 0%, ${COLORS.agedPaper} 50%, ${COLORS.deepUmber} 100%)`,
				}}
			/>

			{/* Radial glow behind bust */}
			<div
				style={{
					position: 'absolute',
					top: '25%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 500,
					height: 500,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${COLORS.amber}${Math.round(glowPulse * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
				}}
			/>

			{/* Bust SVG - stylized profile silhouette */}
			<div
				style={{
					position: 'absolute',
					top: '10%',
					left: '50%',
					transform: `translateX(-50%) scale(${bustScale})`,
					opacity: bustSpring,
				}}
			>
				<svg width={400} height={420} viewBox="0 0 400 420">
					<defs>
						<linearGradient id="bronzeGrad" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#d4a44a" />
							<stop offset="30%" stopColor="#b8860b" />
							<stop offset="60%" stopColor="#8b6914" />
							<stop offset="100%" stopColor="#6b4f0a" />
						</linearGradient>
						<linearGradient id="pedestalGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#8a8a8a" />
							<stop offset="50%" stopColor="#6a6a6a" />
							<stop offset="100%" stopColor="#4a4a4a" />
						</linearGradient>
					</defs>

					{/* Pedestal */}
					<rect x={120} y={310} width={160} height={20} rx={2} fill="url(#pedestalGrad)" />
					<rect x={100} y={330} width={200} height={15} rx={2} fill="url(#pedestalGrad)" />
					<rect x={80} y={345} width={240} height={25} rx={3} fill="url(#pedestalGrad)" />
					<rect x={70} y={370} width={260} height={12} rx={2} fill="#5a5a5a" />

					{/* Bust - stylized profile facing right */}
					{/* Head shape */}
					<path
						d="M180,60 C180,30 220,10 250,20 C280,30 290,60 285,90
						   C282,110 275,120 270,130 C268,140 272,150 270,160
						   L260,170 C258,175 250,178 240,178
						   L220,178 C210,178 205,175 200,170
						   L190,160 C188,150 185,140 182,130
						   C175,115 170,100 172,80 Z"
						fill="url(#bronzeGrad)"
					/>
					{/* Hair */}
					<path
						d="M178,70 C175,50 185,25 210,18 C235,12 265,18 278,35
						   C285,45 288,60 286,75 C284,65 275,45 250,38
						   C225,32 200,40 190,55 C185,62 180,68 178,70Z"
						fill="#8b6914"
						opacity={0.7}
					/>
					{/* Beard */}
					<path
						d="M215,145 C210,155 208,170 215,178
						   L240,178 C248,170 250,158 245,148
						   C240,140 225,138 215,145Z"
						fill="url(#bronzeGrad)"
						opacity={0.8}
					/>
					{/* Eye */}
					<ellipse cx={235} cy={85} rx={8} ry={5} fill="#6b4f0a" />
					{/* Nose */}
					<path
						d="M255,85 C260,95 262,108 255,115 L248,112"
						fill="none"
						stroke="#6b4f0a"
						strokeWidth={2}
					/>
					{/* Ear */}
					<ellipse cx={182} cy={95} rx={8} ry={14} fill="url(#bronzeGrad)" />

					{/* Shoulders / torso base */}
					<path
						d="M170,178 C140,190 110,210 105,250 L105,310
						   L295,310 L295,250 C290,210 260,190 230,178"
						fill="url(#bronzeGrad)"
					/>
					{/* Lapels */}
					<path
						d="M185,178 L165,230 L200,250 Z"
						fill="#8b6914"
						opacity={0.5}
					/>
					<path
						d="M215,178 L235,230 L200,250 Z"
						fill="#8b6914"
						opacity={0.5}
					/>
				</svg>

				{/* Shimmer overlay */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: 400,
						height: 420,
						overflow: 'hidden',
						pointerEvents: 'none',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: shimmerX,
							width: 80,
							height: 420,
							background:
								'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
							transform: 'skewX(-20deg)',
						}}
					/>
				</div>
			</div>

			{/* Name plate */}
			<div
				style={{
					position: 'absolute',
					bottom: 180,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: cinzelFont,
						fontSize: 36,
						fontWeight: 700,
						color: COLORS.textDark,
						letterSpacing: 4,
						textShadow: '0 1px 2px rgba(0,0,0,0.2)',
						minHeight: 44,
					}}
				>
					{typedName}
					{typedChars < NAME.length && (
						<span
							style={{
								opacity: interpolate(
									frame % 16,
									[0, 8, 16],
									[1, 0, 1],
								),
							}}
						>
							▌
						</span>
					)}
				</div>
				<div
					style={{
						fontFamily: ralewayFont,
						fontSize: 22,
						fontWeight: 400,
						color: COLORS.bronze,
						letterSpacing: 6,
						opacity: datesOpacity,
						marginTop: 8,
					}}
				>
					{DATES}
				</div>
			</div>

			{/* Subtle vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at center, transparent 50%, rgba(26,20,16,0.4) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

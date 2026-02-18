import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont} from './constants';
import {BookIcon} from './svg/BookIcon';

export const Scene04School: React.FC = () => {
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

	// Building rises from bottom
	const buildProgress = interpolate(
		frame,
		[0, Math.round(1.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const buildY = interpolate(buildProgress, [0, 1], [300, 0]);

	// Windows light up sequentially
	const windowGlows = [0, 1, 2].map((i) => {
		const start = Math.round(2 * fps) + i * 12;
		return interpolate(frame, [start, start + 15], [0, 0.85], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	});

	// Inscription
	const inscriptionOpacity = interpolate(
		frame,
		[Math.round(2.5 * fps), Math.round(3.2 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Book animation
	const bookSpring = spring({
		frame: Math.max(0, frame - Math.round(3.5 * fps)),
		fps,
		config: {damping: 15, stiffness: 80},
		durationInFrames: Math.round(1 * fps),
	});
	const bookScale = interpolate(bookSpring, [0, 1], [0, 1.2]);

	// Student figures walking
	const studentX = interpolate(
		frame,
		[Math.round(3 * fps), Math.round(5.5 * fps)],
		[1920 + 100, 700],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const studentBob = Math.sin(frame * 0.3) * 3;

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Sky background */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(180deg, #b8d4e3 0%, #e8d5b8 60%, ${COLORS.agedPaper} 100%)`,
				}}
			/>

			{/* Ground */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 200,
					background: `linear-gradient(180deg, ${COLORS.agedPaper} 0%, #a89878 100%)`,
				}}
			/>

			{/* School building */}
			<div
				style={{
					position: 'absolute',
					bottom: 180,
					left: '50%',
					transform: `translateX(-50%) translateY(${buildY}px)`,
				}}
			>
				<svg width={800} height={500} viewBox="0 0 800 500">
					<defs>
						<linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#e8d8c0" />
							<stop offset="100%" stopColor="#c8b8a0" />
						</linearGradient>
					</defs>

					{/* Main wall */}
					<rect
						x={100}
						y={120}
						width={600}
						height={380}
						fill="url(#wallGrad)"
						stroke={COLORS.bronze}
						strokeWidth={2}
					/>

					{/* Triangular pediment */}
					<polygon
						points="80,120 400,20 720,120"
						fill="url(#wallGrad)"
						stroke={COLORS.bronze}
						strokeWidth={2}
					/>

					{/* Pediment inner triangle */}
					<polygon
						points="160,115 400,45 640,115"
						fill="none"
						stroke={COLORS.bronze}
						strokeWidth={1.5}
						opacity={0.5}
					/>

					{/* Columns */}
					{[180, 350, 450, 620].map((x) => (
						<g key={x}>
							<rect
								x={x - 12}
								y={120}
								width={24}
								height={380}
								fill="#d8c8b0"
								stroke={COLORS.bronze}
								strokeWidth={1}
							/>
							{/* Column capital */}
							<rect
								x={x - 16}
								y={115}
								width={32}
								height={10}
								fill="#c8b898"
							/>
						</g>
					))}

					{/* Arched windows */}
					{[250, 400, 550].map((x, i) => (
						<g key={x}>
							{/* Window arch */}
							<path
								d={`M${x - 35},350 L${x - 35},250 A35,35 0 0,1 ${x + 35},250 L${x + 35},350 Z`}
								fill="#3a3028"
								stroke={COLORS.bronze}
								strokeWidth={2}
							/>
							{/* Window glow */}
							<path
								d={`M${x - 33},348 L${x - 33},252 A33,33 0 0,1 ${x + 33},252 L${x + 33},348 Z`}
								fill={COLORS.amber}
								opacity={windowGlows[i]}
							/>
							{/* Window divider */}
							<line
								x1={x}
								y1={220}
								x2={x}
								y2={350}
								stroke={COLORS.bronze}
								strokeWidth={2}
							/>
						</g>
					))}

					{/* Central door */}
					<path
						d="M370,500 L370,380 A30,30 0 0,1 430,380 L430,500 Z"
						fill="#4a3828"
						stroke={COLORS.bronze}
						strokeWidth={2}
					/>
					{/* Door handle */}
					<circle cx={420} cy={440} r={4} fill={COLORS.oldGold} />

					{/* Steps */}
					<rect x={340} y={495} width={120} height={10} fill="#b8a890" />
					<rect x={320} y={498} width={160} height={10} fill="#a89880" />

					{/* Inscription above door */}
					<text
						x={400}
						y={160}
						textAnchor="middle"
						fontFamily={cinzelFont}
						fontSize={16}
						fill={COLORS.textDark}
						opacity={inscriptionOpacity}
						letterSpacing={2}
					>
						SCUOLA GOVERNATIVA RURALE MAGISTRALE
					</text>
				</svg>
			</div>

			{/* Student silhouettes walking */}
			<div
				style={{
					position: 'absolute',
					bottom: 170,
					left: 0,
					transform: `translateX(${studentX}px) translateY(${studentBob}px)`,
					display: 'flex',
					gap: 25,
				}}
			>
				{[0, 1, 2].map((i) => (
					<svg key={i} width={30} height={60} viewBox="0 0 30 60">
						<circle cx={15} cy={8} r={7} fill={COLORS.textDark} />
						<rect x={9} y={15} width={12} height={22} rx={4} fill={COLORS.textDark} />
						<line x1={12} y1={37} x2={8} y2={55} stroke={COLORS.textDark} strokeWidth={4} strokeLinecap="round" />
						<line x1={18} y1={37} x2={22} y2={55} stroke={COLORS.textDark} strokeWidth={4} strokeLinecap="round" />
					</svg>
				))}
			</div>

			{/* Open book at bottom */}
			<div
				style={{
					position: 'absolute',
					bottom: 60,
					left: '50%',
					transform: `translateX(-50%) scale(${bookScale})`,
				}}
			>
				<BookIcon size={100} open />
			</div>
		</AbsoluteFill>
	);
};

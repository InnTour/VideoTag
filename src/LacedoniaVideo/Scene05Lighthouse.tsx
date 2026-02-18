import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, seededRandom} from './constants';

const FLOAT_WORDS = ['CULTURA', 'SAPERE', 'DIGNITÀ', 'FUTURO'];

// Simplified southern Italy path (boot from knee down)
const ITALY_PATH =
	'M280,50 C300,60 310,80 305,100 C300,120 290,140 280,160 ' +
	'C270,180 260,200 265,220 C270,240 285,250 290,270 ' +
	'C295,290 288,310 275,320 C262,330 250,325 240,330 ' +
	'C230,335 225,345 215,350 C205,355 190,350 185,340 ' +
	'C180,330 185,315 190,305 C195,295 205,288 210,280 ' +
	'C215,272 210,260 200,255 C190,250 175,252 165,245 ' +
	'C155,238 150,225 155,215 C160,205 170,200 175,190 ' +
	'C180,180 178,165 170,155 C162,145 150,140 145,130 ' +
	'C140,120 148,108 160,100 C172,92 188,90 200,85 ' +
	'C212,80 225,72 240,65 C255,58 268,48 280,50 Z';

// Town dots on southern Italy map
const TOWN_DOTS = [
	{x: 220, y: 120, name: 'Napoli'},
	{x: 250, y: 170, name: 'Salerno'},
	{x: 265, y: 200, name: 'Potenza'},
	{x: 210, y: 240, name: 'Cosenza'},
	{x: 190, y: 290, name: 'Catanzaro'},
	{x: 240, y: 310, name: 'Taranto'},
	{x: 280, y: 145, name: 'Bari'},
	{x: 295, y: 230, name: 'Lecce'},
	{x: 200, y: 340, name: 'Reggio C.'},
];

export const Scene05Lighthouse: React.FC = () => {
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

	// Lighthouse rises
	const lighthouseSpring = spring({
		frame,
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1.5 * fps),
	});
	const lighthouseY = interpolate(lighthouseSpring, [0, 1], [200, 0]);

	// Beam rotation
	const beamAngle = interpolate(
		frame,
		[Math.round(1.5 * fps), durationInFrames],
		[-30, 390],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Beam pulse
	const beamOpacity = interpolate(
		frame % Math.round(1 * fps),
		[0, fps * 0.5, fps],
		[0.4, 0.7, 0.4],
	);

	// Map draw animation (stroke-dashoffset technique)
	const mapDraw = interpolate(
		frame,
		[Math.round(0.5 * fps), Math.round(3 * fps)],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Dark night background */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse at 30% 40%, #1a2235 0%, ${COLORS.bgDark} 100%)`,
				}}
			/>

			{/* Map of southern Italy - right side */}
			<div
				style={{
					position: 'absolute',
					right: 100,
					top: '50%',
					transform: 'translateY(-50%) scale(1.3)',
				}}
			>
				<svg width={400} height={400} viewBox="100 30 220 340">
					{/* Map outline with draw animation */}
					<path
						d={ITALY_PATH}
						fill="none"
						stroke={COLORS.oldGold}
						strokeWidth={2}
						strokeDasharray={1200}
						strokeDashoffset={mapDraw * 1200}
						opacity={0.6}
					/>
					{/* Filled map (fades in after outline) */}
					<path
						d={ITALY_PATH}
						fill={COLORS.oldGold}
						opacity={interpolate(mapDraw, [0, 0.2], [0.1, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}
					/>

					{/* Town dots */}
					{TOWN_DOTS.map((town, i) => {
						// Light up as beam sweeps past
						const dotAngle = (i * 40 + 20) % 360;
						const beamNorm = ((beamAngle % 360) + 360) % 360;
						const angleDiff = Math.abs(beamNorm - dotAngle);
						const lit =
							angleDiff < 40 || angleDiff > 320 ? 1 : 0;
						const dotOpacity = interpolate(
							frame,
							[
								Math.round(2 * fps) + i * 15,
								Math.round(2 * fps) + i * 15 + 10,
							],
							[0, 1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							},
						);
						return (
							<g key={town.name}>
								<circle
									cx={town.x}
									cy={town.y}
									r={lit ? 6 : 3}
									fill={
										lit ? COLORS.amber : COLORS.oldGold
									}
									opacity={dotOpacity * (lit ? 1 : 0.5)}
								/>
								{lit && (
									<circle
										cx={town.x}
										cy={town.y}
										r={12}
										fill={COLORS.amber}
										opacity={dotOpacity * 0.3}
									/>
								)}
							</g>
						);
					})}
				</svg>
			</div>

			{/* Lighthouse - left side */}
			<div
				style={{
					position: 'absolute',
					left: 200,
					bottom: 150,
					transform: `translateY(${lighthouseY}px)`,
				}}
			>
				{/* Hill */}
				<svg
					width={400}
					height={120}
					viewBox="0 0 400 120"
					style={{position: 'absolute', bottom: -20, left: -50}}
				>
					<ellipse cx={200} cy={80} rx={200} ry={60} fill="#2a2015" />
				</svg>

				{/* Lighthouse tower */}
				<svg width={300} height={450} viewBox="0 0 300 450">
					<defs>
						<linearGradient
							id="towerGrad"
							x1="0"
							y1="0"
							x2="1"
							y2="0"
						>
							<stop offset="0%" stopColor="#d4c5a9" />
							<stop offset="50%" stopColor="#e8d8c0" />
							<stop offset="100%" stopColor="#b8a890" />
						</linearGradient>
					</defs>

					{/* Tower body (tapered) */}
					<path
						d="M120,100 L110,380 L190,380 L180,100 Z"
						fill="url(#towerGrad)"
						stroke={COLORS.bronze}
						strokeWidth={1}
					/>

					{/* Red stripes */}
					{[150, 220, 290, 350].map((y, i) => (
						<path
							key={i}
							d={`M${113 + (380 - y) * 0.036},${y} L${113 + (380 - y) * 0.036},${y + 25} L${187 - (380 - y) * 0.036},${y + 25} L${187 - (380 - y) * 0.036},${y} Z`}
							fill={COLORS.terracotta}
							opacity={0.7}
						/>
					))}

					{/* Lantern room */}
					<rect
						x={115}
						y={70}
						width={70}
						height={35}
						fill="#2a2015"
						stroke={COLORS.bronze}
						strokeWidth={1}
					/>
					{/* Glass panels */}
					<rect x={120} y={75} width={20} height={25} fill={COLORS.amber} opacity={0.8} />
					<rect x={142} y={75} width={20} height={25} fill={COLORS.amber} opacity={0.9} />
					<rect x={164} y={75} width={16} height={25} fill={COLORS.amber} opacity={0.7} />

					{/* Dome */}
					<path
						d="M112,70 C112,50 150,35 150,35 C150,35 188,50 188,70 Z"
						fill={COLORS.textDark}
					/>

					{/* Light beacon */}
					<circle
						cx={150}
						cy={87}
						r={8}
						fill={COLORS.amber}
						opacity={0.9}
					/>
					<circle
						cx={150}
						cy={87}
						r={15}
						fill={COLORS.amber}
						opacity={0.3}
					/>

					{/* Base */}
					<rect
						x={100}
						y={375}
						width={100}
						height={20}
						fill="#a89878"
					/>
				</svg>

				{/* Light beam - rotating cone */}
				<div
					style={{
						position: 'absolute',
						top: 85,
						left: 148,
						width: 0,
						height: 0,
						transformOrigin: '0 0',
						transform: `rotate(${beamAngle}deg)`,
					}}
				>
					<div
						style={{
							width: 800,
							height: 200,
							marginTop: -100,
							background: `linear-gradient(90deg, ${COLORS.amber}88 0%, ${COLORS.amber}22 30%, transparent 100%)`,
							clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)',
							opacity: beamOpacity,
						}}
					/>
				</div>
			</div>

			{/* Floating words */}
			{FLOAT_WORDS.map((word, i) => {
				const wordStartFrame = Math.round(2.5 * fps) + i * 25;
				const wordOpacity = interpolate(
					frame,
					[wordStartFrame, wordStartFrame + 15, durationInFrames - fps, durationInFrames - 0.3 * fps],
					[0, 0.9, 0.9, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const wordY = interpolate(
					frame,
					[wordStartFrame, durationInFrames],
					[600, 100 + i * 60],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const wordX = 500 + i * 180 + Math.sin(frame * 0.02 + i * 2) * 20;

				return (
					<div
						key={word}
						style={{
							position: 'absolute',
							top: wordY,
							left: wordX,
							fontFamily: cinzelFont,
							fontSize: 36,
							fontWeight: 700,
							color: COLORS.oldGold,
							opacity: wordOpacity,
							textShadow: `0 0 20px ${COLORS.amber}`,
							letterSpacing: 6,
						}}
					>
						{word}
					</div>
				);
			})}

			{/* Floating book sparks */}
			{Array.from({length: 8}).map((_, i) => {
				const sparkStart = Math.round(2 * fps) + i * 12;
				const sparkLife = frame - sparkStart;
				if (sparkLife < 0) return null;
				const sparkY = interpolate(sparkLife, [0, 120], [420, 50], {
					extrapolateRight: 'clamp',
				});
				const sparkX =
					250 + seededRandom(i * 7) * 200 + Math.sin(sparkLife * 0.05 + i) * 30;
				const sparkOpacity = interpolate(
					sparkLife,
					[0, 20, 100, 120],
					[0, 0.8, 0.5, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: sparkY,
							left: sparkX,
							width: 8,
							height: 6,
							backgroundColor: COLORS.amber,
							opacity: sparkOpacity,
							borderRadius: 2,
							boxShadow: `0 0 6px ${COLORS.amber}`,
						}}
					/>
				);
			})}

			{/* Vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(10,8,5,0.5) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

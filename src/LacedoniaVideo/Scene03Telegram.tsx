import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, loraFont, ralewayFont} from './constants';
import {OrnamentalDivider} from './svg/OrnamentalDivider';

const LINES = [
	{text: 'Roma, 2 Agosto 1878', style: 'date' as const},
	{text: '', style: 'spacer' as const},
	{text: 'Si comunica con la presente che', style: 'body' as const},
	{text: 'il Ministro della Pubblica Istruzione', style: 'body' as const},
	{text: 'ha decretato l\'istituzione della', style: 'body' as const},
	{text: '', style: 'spacer' as const},
	{text: 'Scuola Governativa', style: 'highlight' as const},
	{text: 'Rurale Magistrale', style: 'highlight' as const},
	{text: '', style: 'spacer' as const},
	{text: 'nel Comune di Lacedonia', style: 'body' as const},
];

const LINE_DELAY_FRAMES = 18;

export const Scene03Telegram: React.FC = () => {
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

	// Telegram paper entrance
	const paperSpring = spring({
		frame,
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(1 * fps),
	});
	const paperScale = interpolate(paperSpring, [0, 1], [0.92, 1]);

	// Underline draw animation for highlighted text
	const underlineStart = Math.round(1.5 * fps) + 6 * LINE_DELAY_FRAMES;
	const underlineProgress = interpolate(
		frame,
		[underlineStart, underlineStart + Math.round(1.2 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Seal stamp
	const sealOpacity = interpolate(
		frame,
		[Math.round(5 * fps), Math.round(5.5 * fps)],
		[0, 0.7],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* Dark background with telegraph wires */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, #1f1810 100%)`,
				}}
			/>

			{/* Telegraph wires */}
			<svg
				width="1920"
				height="1080"
				style={{position: 'absolute', top: 0, left: 0, opacity: 0.15}}
			>
				{[120, 180, 900, 960].map((y) => (
					<line
						key={y}
						x1={0}
						y1={y}
						x2={1920}
						y2={y}
						stroke={COLORS.agedPaper}
						strokeWidth={1}
					/>
				))}
				{/* Isolator poles */}
				{[300, 700, 1100, 1500].map((x) => (
					<g key={x}>
						<line
							x1={x}
							y1={100}
							x2={x}
							y2={200}
							stroke={COLORS.agedPaper}
							strokeWidth={3}
						/>
						<circle cx={x} cy={120} r={4} fill={COLORS.agedPaper} />
						<circle cx={x} cy={180} r={4} fill={COLORS.agedPaper} />
					</g>
				))}
			</svg>

			{/* Telegram paper */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${paperScale})`,
					opacity: paperSpring,
				}}
			>
			<div
				style={{
					width: 750,
					padding: '50px 60px',
					background: `linear-gradient(135deg, ${COLORS.parchment} 0%, ${COLORS.agedPaper} 100%)`,
					borderRadius: 4,
					boxShadow: '0 15px 50px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,0,0,0.05)',
					position: 'relative' as const,
				}}
			>
				{/* Ornamental border */}
				<div
					style={{
						position: 'absolute',
						top: 15,
						left: 15,
						right: 15,
						bottom: 15,
						border: `2px solid ${COLORS.bronze}`,
						borderRadius: 2,
						pointerEvents: 'none',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 20,
						left: 20,
						right: 20,
						bottom: 20,
						border: `1px solid ${COLORS.bronze}`,
						borderRadius: 2,
						pointerEvents: 'none',
						opacity: 0.5,
					}}
				/>

				{/* Header */}
				<div style={{textAlign: 'center', marginBottom: 8}}>
					<h2
						style={{
							fontFamily: cinzelFont,
							fontSize: 32,
							fontWeight: 700,
							color: COLORS.textDark,
							letterSpacing: 10,
							margin: 0,
						}}
					>
						TELEGRAMMA
					</h2>
					<div style={{margin: '12px auto'}}>
						<OrnamentalDivider width={500} color={COLORS.bronze} />
					</div>
				</div>

				{/* Lines of text */}
				<div style={{marginTop: 20}}>
					{LINES.map((line, i) => {
						const lineFrame =
							Math.round(1.5 * fps) + i * LINE_DELAY_FRAMES;
						const lineOpacity = interpolate(
							frame,
							[lineFrame, lineFrame + 12],
							[0, 1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							},
						);

						if (line.style === 'spacer') {
							return <div key={i} style={{height: 16}} />;
						}

						const isHighlight = line.style === 'highlight';
						return (
							<div
								key={i}
								style={{
									opacity: lineOpacity,
									textAlign: 'center',
									marginBottom: 6,
									position: 'relative',
								}}
							>
								<span
									style={{
										fontFamily: isHighlight
											? cinzelFont
											: line.style === 'date'
												? ralewayFont
												: loraFont,
										fontSize: isHighlight
											? 30
											: line.style === 'date'
												? 18
												: 20,
										fontWeight: isHighlight ? 700 : 400,
										color: isHighlight
											? COLORS.bronze
											: line.style === 'date'
												? COLORS.textDark
												: COLORS.textDark,
										letterSpacing: isHighlight ? 3 : line.style === 'date' ? 4 : 1,
									}}
								>
									{line.text}
								</span>
							</div>
						);
					})}
				</div>

				{/* Animated underline under highlighted text */}
				<div
					style={{
						position: 'absolute',
						bottom: 165,
						left: '50%',
						transform: 'translateX(-50%)',
						width: 380,
						height: 3,
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							width: `${underlineProgress * 100}%`,
							height: '100%',
							backgroundColor: COLORS.oldGold,
						}}
					/>
				</div>

				{/* Official seal */}
				<div
					style={{
						position: 'absolute',
						bottom: 40,
						right: 50,
						opacity: sealOpacity,
					}}
				>
					<svg width={70} height={70} viewBox="0 0 70 70">
						<circle
							cx={35}
							cy={35}
							r={30}
							fill="none"
							stroke={COLORS.terracotta}
							strokeWidth={3}
							opacity={0.6}
						/>
						<circle
							cx={35}
							cy={35}
							r={24}
							fill="none"
							stroke={COLORS.terracotta}
							strokeWidth={1}
							opacity={0.4}
						/>
						<text
							x={35}
							y={32}
							textAnchor="middle"
							fontSize={8}
							fill={COLORS.terracotta}
							fontFamily={cinzelFont}
							opacity={0.6}
						>
							MINISTERO
						</text>
						<text
							x={35}
							y={44}
							textAnchor="middle"
							fontSize={7}
							fill={COLORS.terracotta}
							fontFamily={cinzelFont}
							opacity={0.6}
						>
							P. ISTRUZIONE
						</text>
					</svg>
				</div>
			</div>
			</div>
		</AbsoluteFill>
	);
};

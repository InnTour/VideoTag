import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, cinzelFont, loraFont} from './constants';
import {HumanFigure} from './svg/HumanFigure';
import {BookIcon} from './svg/BookIcon';

export const Scene07Transformation: React.FC = () => {
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

	// Divider sweeps from center to left
	const dividerProgress = interpolate(
		frame,
		[Math.round(1 * fps), Math.round(4 * fps)],
		[50, 10],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Before side fades out
	const beforeOpacity = interpolate(
		frame,
		[Math.round(4 * fps), Math.round(5.5 * fps)],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// After side expands
	const afterScale = interpolate(
		frame,
		[Math.round(4 * fps), Math.round(5.5 * fps)],
		[1, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Book stack grows
	const bookCount = Math.min(
		5,
		Math.floor(
			interpolate(
				frame,
				[Math.round(2 * fps), Math.round(4 * fps)],
				[0, 5],
				{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
			),
		),
	);

	// Words appear
	const libriSpring = spring({
		frame: Math.max(0, frame - Math.round(5 * fps)),
		fps,
		config: {damping: 15, stiffness: 100},
	});
	const dignitaSpring = spring({
		frame: Math.max(0, frame - Math.round(5.5 * fps)),
		fps,
		config: {damping: 15, stiffness: 100},
	});

	// Hunched figure subtle slump
	const slump = interpolate(frame, [0, Math.round(3 * fps)], [0, 4], {
		extrapolateRight: 'clamp',
	});

	// Child lifts book
	const liftProgress = interpolate(
		frame,
		[Math.round(2 * fps), Math.round(3.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const bookLiftY = interpolate(liftProgress, [0, 1], [0, -30]);
	const bookLiftRotate = interpolate(liftProgress, [0, 1], [0, -15]);

	return (
		<AbsoluteFill style={{opacity: sceneOpacity}}>
			{/* BEFORE side (left) - gray, muted */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: `${dividerProgress}%`,
					height: '100%',
					overflow: 'hidden',
					opacity: beforeOpacity,
				}}
			>
				<AbsoluteFill
					style={{
						background: `linear-gradient(180deg, #3a3530 0%, #2a2520 40%, #1a1510 100%)`,
					}}
				/>

				{/* Cracked earth lines */}
				<svg
					width="960"
					height="300"
					style={{position: 'absolute', bottom: 0, left: 0, opacity: 0.3}}
				>
					<path d="M0,50 L200,80 L350,30 L500,90 L700,40 L960,70" fill="none" stroke="#5a5040" strokeWidth={1} />
					<path d="M50,120 L250,150 L400,100 L600,160 L800,110" fill="none" stroke="#5a5040" strokeWidth={1} />
					<path d="M100,200 L300,180 L500,220 L700,190 L900,210" fill="none" stroke="#5a5040" strokeWidth={1} />
				</svg>

				{/* Hunched figures */}
				<div
					style={{
						position: 'absolute',
						bottom: 250,
						left: 150,
						transform: `translateY(${slump}px)`,
					}}
				>
					<HumanFigure pose="hunched" color="#4a4035" height={130} />
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 250,
						left: 350,
						transform: `translateY(${slump}px)`,
					}}
				>
					<HumanFigure
						pose="hunched"
						color="#4a4035"
						height={110}
						flipX
					/>
				</div>

				{/* Label */}
				<div
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontFamily: cinzelFont,
							fontSize: 28,
							color: '#6a6050',
							letterSpacing: 8,
						}}
					>
						FATICHE E SERVITÙ
					</span>
				</div>
			</div>

			{/* AFTER side (right) - golden, warm */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					width: `${100 - dividerProgress}%`,
					height: '100%',
					overflow: 'hidden',
					transform: `scale(${afterScale})`,
					transformOrigin: 'right center',
				}}
			>
				<AbsoluteFill
					style={{
						background: `linear-gradient(180deg, #e8d5b8 0%, ${COLORS.parchment} 40%, ${COLORS.amber}44 100%)`,
					}}
				/>

				{/* Warm rays */}
				<div
					style={{
						position: 'absolute',
						top: -200,
						right: 200,
						width: 600,
						height: 600,
						background: `radial-gradient(circle, ${COLORS.amber}44 0%, transparent 70%)`,
					}}
				/>

				{/* Mother and child */}
				<div
					style={{
						position: 'absolute',
						bottom: 250,
						right: 400,
					}}
				>
					<HumanFigure
						pose="mother-child"
						color={COLORS.textDark}
						height={150}
					/>
				</div>

				{/* Child with book lifted */}
				<div
					style={{
						position: 'absolute',
						bottom: 300,
						right: 250,
					}}
				>
					<HumanFigure
						pose="holding-book"
						color={COLORS.textDark}
						height={100}
					/>
					<div
						style={{
							position: 'absolute',
							top: -10,
							right: -20,
							transform: `translateY(${bookLiftY}px) rotate(${bookLiftRotate}deg)`,
						}}
					>
						<BookIcon size={35} open={false} color={COLORS.bronze} />
					</div>
				</div>

				{/* Book stack */}
				<div
					style={{
						position: 'absolute',
						bottom: 200,
						right: 150,
						display: 'flex',
						flexDirection: 'column-reverse',
						gap: 2,
					}}
				>
					{Array.from({length: bookCount}).map((_, i) => {
						const bookSpring = spring({
							frame: Math.max(
								0,
								frame - Math.round(2 * fps) - i * 10,
							),
							fps,
							config: {damping: 15, stiffness: 80},
						});
						return (
							<div
								key={i}
								style={{
									transform: `scale(${bookSpring})`,
									transformOrigin: 'bottom center',
								}}
							>
								<BookIcon
									size={30 + i * 3}
									open={false}
									color={
										i % 2 === 0
											? COLORS.bronze
											: COLORS.terracotta
									}
								/>
							</div>
						);
					})}
				</div>

				{/* Label */}
				<div
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontFamily: cinzelFont,
							fontSize: 28,
							color: COLORS.bronze,
							letterSpacing: 8,
						}}
					>
						LIBRI E DIGNITÀ
					</span>
				</div>
			</div>

			{/* Divider line */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: `${dividerProgress}%`,
					width: 4,
					height: '100%',
					background: `linear-gradient(180deg, ${COLORS.oldGold} 0%, ${COLORS.amber} 50%, ${COLORS.oldGold} 100%)`,
					boxShadow: `0 0 20px ${COLORS.amber}`,
					opacity: beforeOpacity,
				}}
			/>

			{/* Floating gold words */}
			<div
				style={{
					position: 'absolute',
					bottom: 130,
					left: '50%',
					transform: `translateX(-50%) scale(${libriSpring})`,
					fontFamily: cinzelFont,
					fontSize: 60,
					fontWeight: 700,
					color: COLORS.oldGold,
					textShadow: `0 0 30px ${COLORS.amber}, 0 2px 6px rgba(0,0,0,0.3)`,
					letterSpacing: 12,
					opacity: libriSpring,
				}}
			>
				LIBRI
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 50,
					left: '50%',
					transform: `translateX(-50%) scale(${dignitaSpring})`,
					fontFamily: cinzelFont,
					fontSize: 60,
					fontWeight: 700,
					color: COLORS.oldGold,
					textShadow: `0 0 30px ${COLORS.amber}, 0 2px 6px rgba(0,0,0,0.3)`,
					letterSpacing: 12,
					opacity: dignitaSpring,
				}}
			>
				DIGNITÀ
			</div>

			{/* Quote */}
			<div
				style={{
					position: 'absolute',
					top: 180,
					left: 0,
					right: 0,
					textAlign: 'center',
					opacity: interpolate(
						frame,
						[Math.round(1 * fps), Math.round(2 * fps)],
						[0, 0.8],
						{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
					),
				}}
			>
				<p
					style={{
						fontFamily: loraFont,
						fontSize: 22,
						fontStyle: 'italic',
						color: COLORS.textLight,
						textShadow: '0 2px 10px rgba(0,0,0,0.6)',
						maxWidth: 800,
						margin: '0 auto',
						lineHeight: 1.5,
					}}
				>
					&laquo;Un futuro fatto di libri e dignità,
					<br />
					non più solo di fatiche e servitù&raquo;
				</p>
			</div>
		</AbsoluteFill>
	);
};

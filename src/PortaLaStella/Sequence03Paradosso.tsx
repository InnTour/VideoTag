import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {PortaSVG} from './svg/PortaSVG';

export const Sequence03Paradosso: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Fade in/out
	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
	});
	const opacity = Math.min(fadeIn, fadeOut);

	// Linea divisoria split-screen: si sposta da sx → centro → rimane
	const splitProgress = interpolate(
		frame,
		[Math.round(0.5 * fps), Math.round(2.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const splitX = interpolate(splitProgress, [0, 1], [0, 960]); // 0 → centro schermo

	// Label "XV SECOLO" e "XXI SECOLO"
	const labelSpring = spring({
		frame: Math.max(0, frame - Math.round(2.5 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.6 * fps),
	});
	const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);
	const labelY = interpolate(labelSpring, [0, 1], [-20, 0]);

	// Porta "sepolta" — appare con dissolvenza progressiva sul lato destro
	const buriedPortaOpacity = interpolate(
		frame,
		[Math.round(1.5 * fps), Math.round(3 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Testo "INVISIBILE AI PASSANTI" — appare con forza
	const invisibileSpring = spring({
		frame: Math.max(0, frame - Math.round(4.5 * fps)),
		fps,
		config: {damping: 120, stiffness: 150},
		durationInFrames: Math.round(0.7 * fps),
	});
	const invisibileScale = interpolate(invisibileSpring, [0, 1], [0.6, 1]);
	const invisibileOpacity = interpolate(invisibileSpring, [0, 1], [0, 1]);

	// Frecce stratigrafia (innalzamenti del suolo)
	const stratumProgress = interpolate(
		frame,
		[Math.round(3 * fps), Math.round(5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>

			{/* === LATO SINISTRO: XV SECOLO (porta al livello originale) === */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: splitX,
					height: 1080,
					overflow: 'hidden',
					backgroundColor: '#1c1408',
					background: `linear-gradient(160deg, #1c1408 0%, #2e1a08 100%)`,
				}}
			>
				{/* Porta normale (non sepolta) */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<PortaSVG width={400} height={520} buried={false} />
				</div>

				{/* Label "XV SECOLO" */}
				<div
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						textAlign: 'center',
						opacity: labelOpacity,
						transform: `translateY(${labelY}px)`,
					}}
				>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 13,
							fontWeight: 700,
							color: COLORS.oroIrpino,
							letterSpacing: '0.2em',
							textTransform: 'uppercase',
							margin: 0,
							marginBottom: 6,
						}}
					>
						LIVELLO ORIGINALE
					</p>
					<p
						style={{
							fontFamily: playfairFont,
							fontSize: 42,
							fontWeight: 700,
							color: COLORS.biancaCalce,
							margin: 0,
						}}
					>
						XV Secolo
					</p>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 16,
							color: COLORS.grigioCaldo,
							margin: 0,
							marginTop: 6,
						}}
					>
						Porta al livello stradale originale
					</p>
				</div>

				{/* Frecce stratigrafia in basso a sx (livelli che salgono) */}
				{stratumProgress > 0 && (
					<div
						style={{
							position: 'absolute',
							bottom: 100,
							left: 0,
							right: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 4,
							opacity: stratumProgress,
						}}
					>
						{[
							{label: 'Piano stradale originale', color: COLORS.oroIrpino, y: 0},
						].map((stratum, i) => (
							<div
								key={i}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								<div style={{width: 120, height: 2, backgroundColor: stratum.color}} />
								<span
									style={{
										fontFamily: latoFont,
										fontSize: 12,
										color: stratum.color,
										letterSpacing: '0.08em',
									}}
								>
									{stratum.label}
								</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* === LINEA DIVISORIA CENTRALE === */}
			<div
				style={{
					position: 'absolute',
					left: splitX,
					top: 0,
					width: 3,
					height: 1080,
					backgroundColor: COLORS.oroIrpino,
					opacity: splitProgress * 0.9,
					boxShadow: `0 0 20px ${COLORS.oroIrpino}88`,
				}}
			/>

			{/* === LATO DESTRO: XXI SECOLO (porta sepolta) === */}
			<div
				style={{
					position: 'absolute',
					left: splitX + 3,
					top: 0,
					width: 1920 - splitX - 3,
					height: 1080,
					overflow: 'hidden',
					background: `linear-gradient(160deg, #0e0e0e 0%, #1a1a1a 60%, #2a1e14 100%)`,
				}}
			>
				{/* Porta versione sepolta */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: buriedPortaOpacity,
					}}
				>
					<PortaSVG width={400} height={520} buried={true} />
				</div>

				{/* Label "XXI SECOLO" */}
				<div
					style={{
						position: 'absolute',
						top: 80,
						left: 0,
						right: 0,
						textAlign: 'center',
						opacity: labelOpacity,
						transform: `translateY(${labelY}px)`,
					}}
				>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 13,
							fontWeight: 700,
							color: COLORS.grigioCaldo,
							letterSpacing: '0.2em',
							textTransform: 'uppercase',
							margin: 0,
							marginBottom: 6,
						}}
					>
						LIVELLO ATTUALE
					</p>
					<p
						style={{
							fontFamily: playfairFont,
							fontSize: 42,
							fontWeight: 700,
							color: COLORS.biancaCalce,
							margin: 0,
						}}
					>
						XXI Secolo
					</p>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 16,
							color: COLORS.grigioCaldo,
							margin: 0,
							marginTop: 6,
						}}
					>
						Piano stradale rialzato nei secoli
					</p>
				</div>

				{/* Frecce innalzamenti stratigrafia */}
				{stratumProgress > 0 && (
					<div
						style={{
							position: 'absolute',
							bottom: 60,
							left: 0,
							right: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 8,
							opacity: stratumProgress,
						}}
					>
						{[
							{label: 'Piano attuale', color: '#888', dist: 0},
							{label: 'Innalzamento XVIII sec.', color: '#666', dist: 32},
							{label: 'Innalzamento XVI sec.', color: '#555', dist: 64},
							{label: 'Livello originale XV sec.', color: COLORS.oroIrpino, dist: 96},
						].map((layer, i) => (
							<div key={i} style={{display: 'flex', alignItems: 'center', gap: 10}}>
								<div
									style={{
										width: interpolate(stratumProgress, [0, 1], [0, 100 - i * 10]),
										height: 2,
										backgroundColor: layer.color,
									}}
								/>
								<span
									style={{fontFamily: latoFont, fontSize: 11, color: layer.color, letterSpacing: '0.06em'}}
								>
									{layer.label}
								</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* === OVERLAY CENTRALE: Testo "INVISIBILE AI PASSANTI" === */}
			{invisibileOpacity > 0 && (
				<div
					style={{
						position: 'absolute',
						bottom: 200,
						left: 0,
						right: 0,
						textAlign: 'center',
						opacity: invisibileOpacity,
						transform: `scale(${invisibileScale})`,
					}}
				>
					<div
						style={{
							display: 'inline-block',
							backgroundColor: 'rgba(0,0,0,0.75)',
							border: `2px solid ${COLORS.terraBruciata}`,
							borderRadius: 6,
							padding: '12px 40px',
						}}
					>
						<p
							style={{
								fontFamily: playfairFont,
								fontSize: 32,
								fontWeight: 700,
								fontStyle: 'italic',
								color: COLORS.terraBruciata,
								margin: 0,
								letterSpacing: '0.05em',
							}}
						>
							"difficilmente visibile ai passanti"
						</p>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

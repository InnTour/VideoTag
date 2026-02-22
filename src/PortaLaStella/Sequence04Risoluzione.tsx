import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {PortaSVG} from './svg/PortaSVG';

export const Sequence04Risoluzione: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Fade in/out
	const fadeIn = interpolate(frame, [0, fps * 0.6], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.8, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
	});
	const opacity = Math.min(fadeIn, fadeOut);

	// --- TRANSIZIONE RESTAURO: porta sepolta → porta recuperata ---
	// Dissolvenza da "buried" a "normale" nei primi 4s
	const restoreProgress = interpolate(
		frame,
		[0, Math.round(3.5 * fps)],
		[1, 0], // 1 = completamente sepolta, 0 = restaurata
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	// Porta sepolta scompare
	const buriedOpacity = restoreProgress;
	// Porta restaurata appare
	const restoredOpacity = 1 - restoreProgress;

	// Calore cromatico progressivo (da freddo/grigio a caldo/oro)
	const warmOverlay = interpolate(
		frame,
		[0, Math.round(4 * fps)],
		[0, 0.25],
		{extrapolateRight: 'clamp'},
	);

	// Luce "rivelazione" che emerge dal centro della porta
	const lightReveal = interpolate(
		frame,
		[Math.round(2 * fps), Math.round(4.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Testo "RECUPERATA" — appare con scala
	const recuperataSpring = spring({
		frame: Math.max(0, frame - Math.round(3.5 * fps)),
		fps,
		config: {damping: 140},
		durationInFrames: Math.round(0.8 * fps),
	});
	const recuperataScale = interpolate(recuperataSpring, [0, 1], [0.8, 1]);
	const recuperataOpacity = interpolate(recuperataSpring, [0, 1], [0, 1]);

	// Icone percorsi naturalistici (appaiono una alla volta)
	const icon1Spring = spring({
		frame: Math.max(0, frame - Math.round(5 * fps)),
		fps,
		config: {damping: 180},
		durationInFrames: Math.round(0.6 * fps),
	});
	const icon2Spring = spring({
		frame: Math.max(0, frame - Math.round(6 * fps)),
		fps,
		config: {damping: 180},
		durationInFrames: Math.round(0.6 * fps),
	});
	const icon3Spring = spring({
		frame: Math.max(0, frame - Math.round(7 * fps)),
		fps,
		config: {damping: 180},
		durationInFrames: Math.round(0.6 * fps),
	});

	// Tagline finale "SOGLIA" — lettera per lettera
	const soglia = 'SOGLIA';
	const sogliaChars = Math.floor(
		interpolate(
			frame,
			[Math.round(8 * fps), Math.round(10 * fps)],
			[0, soglia.length],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		),
	);

	// Frase finale
	const finalLineSpring = spring({
		frame: Math.max(0, frame - Math.round(10 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.8 * fps),
	});
	const finalOpacity = interpolate(finalLineSpring, [0, 1], [0, 1]);
	const finalY = interpolate(finalLineSpring, [0, 1], [20, 0]);

	// Outro: logo InnTour + Comune
	const outroProgress = interpolate(
		frame,
		[Math.round(13.5 * fps), Math.round(15 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	const percorsi = [
		{label: 'Percorsi Naturalistici', icon: '🌿', spring: icon1Spring},
		{label: 'Itinerari della Memoria', icon: '📜', spring: icon2Spring},
		{label: 'Punto di Accesso Recuperato', icon: '🏛️', spring: icon3Spring},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Sfondo: si scalda progressivamente da grigio a oro/terra */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(
						170deg,
						#0e0c08 0%,
						${COLORS.bgPietra} 40%,
						#2e1a08 100%
					)`,
				}}
			/>

			{/* Overlay caldo (luce meridionale che entra) */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse at 55% 55%, ${COLORS.oroIrpino}${Math.round(warmOverlay * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Luce dalla porta (come se filtrasse dall'esterno) */}
			<div
				style={{
					position: 'absolute',
					right: 180,
					top: '50%',
					transform: 'translateY(-50%)',
					width: 440,
					height: 560,
					background: `radial-gradient(ellipse at 50% 60%, ${COLORS.cieloIrpino}${Math.round(lightReveal * 120).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* === PORTA: transizione da sepolta a restaurata === */}
			<div
				style={{
					position: 'absolute',
					right: 120,
					top: '50%',
					transform: 'translateY(-50%)',
				}}
			>
				{/* Porta sepolta (scompare) */}
				<div style={{position: 'absolute', opacity: buriedOpacity}}>
					<PortaSVG width={540} height={690} buried={true} />
				</div>
				{/* Porta restaurata (appare) */}
				<div style={{opacity: restoredOpacity}}>
					<PortaSVG width={540} height={690} buried={false} />
				</div>
			</div>

			{/* Overlay sfumatura dx → sx (area testo) */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(90deg, rgba(10,8,4,0.95) 0%, rgba(10,8,4,0.80) 42%, transparent 62%)',
					pointerEvents: 'none',
				}}
			/>

			{/* === CONTENUTO TESTO — lato sinistro === */}
			<div
				style={{
					position: 'absolute',
					left: 60,
					top: '50%',
					transform: 'translateY(-55%)',
					maxWidth: 680,
				}}
			>
				{/* Badge recupero */}
				<div
					style={{
						opacity: recuperataOpacity,
						transform: `scale(${recuperataScale})`,
						transformOrigin: 'left center',
						display: 'inline-block',
						backgroundColor: COLORS.verdeInnTour,
						borderRadius: 4,
						padding: '6px 20px',
						marginBottom: 24,
					}}
				>
					<span
						style={{
							fontFamily: latoFont,
							fontSize: 13,
							fontWeight: 700,
							color: '#fff',
							letterSpacing: '0.15em',
						}}
					>
						RECENTEMENTE RECUPERATA
					</span>
				</div>

				{/* Titolo SOGLIA — lettera per lettera */}
				{sogliaChars > 0 && (
					<div style={{marginBottom: 8}}>
						<span
							style={{
								fontFamily: latoFont,
								fontSize: 14,
								fontWeight: 700,
								color: COLORS.grigioCaldo,
								letterSpacing: '0.15em',
								textTransform: 'uppercase',
								display: 'block',
								marginBottom: 10,
							}}
						>
							Porta come
						</span>
						<h1
							style={{
								fontFamily: playfairFont,
								fontSize: 110,
								fontWeight: 700,
								color: COLORS.oroIrpino,
								margin: 0,
								lineHeight: 1,
								textShadow: `0 0 60px ${COLORS.oroIrpino}55`,
							}}
						>
							{soglia.slice(0, sogliaChars)}
							<span style={{opacity: 0.12}}>{soglia.slice(sogliaChars)}</span>
						</h1>
					</div>
				)}

				{/* Frase conclusiva */}
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 20,
						fontWeight: 300,
						color: COLORS.biancaCalce,
						margin: 0,
						marginBottom: 32,
						lineHeight: 1.65,
						opacity: finalOpacity,
						transform: `translateY(${finalY}px)`,
						fontStyle: 'italic',
					}}
				>
					"Soglia tra il borgo
					<br />e il paesaggio rurale"
				</p>

				{/* Percorsi e itinerari */}
				<div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
					{percorsi.map(({label, icon, spring: s}, i) => {
						const op = interpolate(s, [0, 1], [0, 1]);
						const tx = interpolate(s, [0, 1], [-20, 0]);
						return (
							<div
								key={i}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									opacity: op,
									transform: `translateX(${tx}px)`,
								}}
							>
								<span style={{fontSize: 22}}>{icon}</span>
								<span
									style={{
										fontFamily: latoFont,
										fontSize: 18,
										fontWeight: 400,
										color: COLORS.biancaCalce,
										letterSpacing: '0.04em',
									}}
								>
									{label}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* === OUTRO: Logo + Comune + URL === */}
			{outroProgress > 0 && (
				<AbsoluteFill
					style={{
						backgroundColor: `rgba(10,8,4,${outroProgress * 0.92})`,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						gap: 20,
					}}
				>
					{/* Logo InnTour */}
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 48,
							fontWeight: 700,
							color: COLORS.verdeInnTour,
							margin: 0,
							letterSpacing: '0.1em',
							opacity: outroProgress,
						}}
					>
						INNTOUR
					</p>

					{/* Linea divisoria */}
					<div
						style={{
							width: interpolate(outroProgress, [0, 1], [0, 320]),
							height: 1,
							backgroundColor: COLORS.oroIrpino,
							opacity: 0.6,
						}}
					/>

					{/* Comune + Cicerone */}
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 18,
							fontWeight: 300,
							color: COLORS.biancaCalce,
							margin: 0,
							letterSpacing: '0.12em',
							textAlign: 'center',
							opacity: outroProgress,
						}}
					>
						Comune di Lacedonia · Cicerone Digitale
					</p>

					{/* TAG */}
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 14,
							fontWeight: 400,
							color: COLORS.grigioCaldo,
							margin: 0,
							letterSpacing: '0.15em',
							opacity: outroProgress * 0.7,
						}}
					>
						A1.02 · PORTA LA STELLA · Architettura e Monumenti
					</p>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};

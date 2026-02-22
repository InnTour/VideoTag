import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {PortaSVG} from './svg/PortaSVG';

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Fade in/out della sequenza
	const fadeIn = interpolate(frame, [0, fps * 0.6], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
	});
	const opacity = Math.min(fadeIn, fadeOut);

	// Logo/Badge InnTour in alto a sinistra
	const badgeSpring = spring({frame, fps, config: {damping: 200}, durationInFrames: Math.round(0.7 * fps)});
	const badgeX = interpolate(badgeSpring, [0, 1], [-160, 0]);

	// Titolo principale "PORTA LA STELLA"
	const titleSpring = spring({
		frame: Math.max(0, frame - Math.round(0.5 * fps)),
		fps,
		config: {damping: 160},
		durationInFrames: Math.round(1 * fps),
	});
	const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
	const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
	const letterSpacing = interpolate(titleSpring, [0, 1], [30, 8]);

	// Sottotitolo sezione
	const subSpring = spring({
		frame: Math.max(0, frame - Math.round(1.2 * fps)),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.8 * fps),
	});
	const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
	const subY = interpolate(subSpring, [0, 1], [20, 0]);

	// Linea decorativa orizzontale
	const lineWidth = interpolate(
		frame,
		[Math.round(1.5 * fps), Math.round(2.2 * fps)],
		[0, 300],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Luce ambientale in fondo (vignette calda)
	const warmth = interpolate(frame, [0, durationInFrames], [0, 0.12], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Sfondo: gradiente cielo/roccia al tramonto */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(
						175deg,
						#0d0a06 0%,
						#1a1208 25%,
						#2a1a0e 50%,
						${COLORS.pietraAntica}44 75%,
						${COLORS.terraBruciata}33 100%
					)`,
				}}
			/>

			{/* Overlay caldo progressivo */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse at 60% 80%, ${COLORS.oroIrpino}${Math.round(warmth * 255).toString(16).padStart(2, '0')} 0%, transparent 65%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Porta SVG — centrata, leggermente a destra */}
			<div
				style={{
					position: 'absolute',
					right: 120,
					top: '50%',
					transform: 'translateY(-50%)',
					opacity: 0.92,
				}}
			>
				<PortaSVG width={580} height={740} />
			</div>

			{/* Overlay vignette sinistra (dove sta il testo) */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(90deg, rgba(10,8,4,0.92) 0%, rgba(10,8,4,0.75) 40%, transparent 65%)',
					pointerEvents: 'none',
				}}
			/>

			{/* === BADGE SEZIONE in alto a sinistra === */}
			<div
				style={{
					position: 'absolute',
					top: 52,
					left: 60,
					transform: `translateX(${badgeX}px)`,
					display: 'flex',
					alignItems: 'center',
					gap: 14,
				}}
			>
				{/* Pill colorato */}
				<div
					style={{
						backgroundColor: COLORS.verdeInnTour,
						borderRadius: 4,
						padding: '6px 18px',
						display: 'flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<span style={{fontFamily: latoFont, fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.12em'}}>
						ARCHITETTURA E MONUMENTI
					</span>
				</div>
				{/* Tag ID */}
				<span style={{fontFamily: latoFont, fontSize: 14, color: COLORS.grigioCaldo, letterSpacing: '0.1em'}}>
					A1.02
				</span>
			</div>

			{/* === TESTO PRINCIPALE — lato sinistro === */}
			<div
				style={{
					position: 'absolute',
					left: 60,
					top: '50%',
					transform: 'translateY(-55%)',
					maxWidth: 700,
				}}
			>
				{/* Titolo principale */}
				<h1
					style={{
						fontFamily: playfairFont,
						fontSize: 88,
						fontWeight: 700,
						color: COLORS.biancaCalce,
						letterSpacing,
						opacity: titleOpacity,
						transform: `translateY(${titleY}px)`,
						margin: 0,
						textShadow: `0 2px 20px rgba(0,0,0,0.8), 0 0 60px ${COLORS.oroIrpino}44`,
						lineHeight: 1.05,
					}}
				>
					PORTA
					<br />
					<span style={{color: COLORS.oroIrpino}}>LA STELLA</span>
				</h1>

				{/* Linea decorativa */}
				<div
					style={{
						width: lineWidth,
						height: 2,
						backgroundColor: COLORS.oroIrpino,
						marginTop: 24,
						marginBottom: 18,
						opacity: 0.8,
					}}
				/>

				{/* Sottotitolo */}
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 20,
						fontWeight: 300,
						color: COLORS.biancaCalce,
						opacity: subOpacity,
						transform: `translateY(${subY}px)`,
						margin: 0,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
					}}
				>
					Cinta Muraria · Porta degli Orsini
				</p>

				{/* Localizzazione */}
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 16,
						fontWeight: 400,
						color: COLORS.grigioCaldo,
						opacity: subOpacity * 0.8,
						transform: `translateY(${subY}px)`,
						margin: 0,
						marginTop: 8,
						letterSpacing: '0.08em',
					}}
				>
					Versante sud-ovest della Cittadella · Zona delle Rupi
				</p>
			</div>

			{/* InnTour logo testuale in basso a sinistra */}
			<div
				style={{
					position: 'absolute',
					bottom: 40,
					left: 60,
					opacity: subOpacity * 0.6,
				}}
			>
				<span
					style={{
						fontFamily: latoFont,
						fontSize: 16,
						fontWeight: 700,
						color: COLORS.verdeInnTour,
						letterSpacing: '0.15em',
					}}
				>
					INNTOUR
				</span>
				<span
					style={{
						fontFamily: latoFont,
						fontSize: 16,
						fontWeight: 300,
						color: COLORS.grigioCaldo,
						letterSpacing: '0.08em',
						marginLeft: 8,
					}}
				>
					· Cicerone Digitale di Lacedonia
				</span>
			</div>
		</AbsoluteFill>
	);
};

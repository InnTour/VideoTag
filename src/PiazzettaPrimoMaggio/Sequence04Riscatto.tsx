import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// Trasformazione: "da X a Y"
const TrasformazioneCard: React.FC<{da: string; a: string; delay: number; accent: string}> = ({da, a, delay, accent}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s  = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 145}, durationInFrames: Math.round(0.8 * fps)});
	const op = interpolate(s, [0, 1], [0, 1]);
	const x  = interpolate(s, [0, 1], [-50, 0]);

	// Freccia animata
	const arrowProgress = interpolate(frame, [delay + Math.round(0.5 * fps), delay + Math.round(1.2 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 12,
			background: 'rgba(6,6,14,0.82)',
			border: `1px solid ${COLORS.glassBorder}`,
			borderLeft: `4px solid ${accent}`,
			borderRadius: 8,
			padding: '12px 20px',
			backdropFilter: 'blur(16px)',
		}}>
			{/* Da */}
			<div style={{textAlign: 'right', flex: 1}}>
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.grigioCaldo, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0}}>Da</p>
				<p style={{fontFamily: playfairFont, fontSize: 27, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>{da}</p>
			</div>

			{/* Freccia */}
			<div style={{
				color: accent, fontSize: 32, fontWeight: 700,
				opacity: arrowProgress,
				transform: `scale(${arrowProgress})`,
				textShadow: `0 0 12px ${accent}`,
			}}>→</div>

			{/* A */}
			<div style={{textAlign: 'left', flex: 1}}>
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0}}>A</p>
				<p style={{fontFamily: playfairFont, fontSize: 27, fontWeight: 700, color: accent, margin: 0}}>{a}</p>
			</div>
		</div>
	);
};

export const Sequence04Riscatto: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 145}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [50, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Parola DIGNITÀ che si illumina
	const dignitaProgress = interpolate(frame, [Math.round(3 * fps), Math.round(5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Istituto Magistrale appare tardi
	const magistraleSpr = spring({frame: Math.max(0, frame - Math.round(11 * fps)), fps, config: {damping: 170}, durationInFrames: Math.round(0.9 * fps)});
	const magistraleOp  = interpolate(magistraleSpr, [0, 1], [0, 1]);

	const trasformazioni = [
		{da: 'Braccianti', a: 'Proprietari', delay: Math.round(1 * fps), accent: COLORS.verdeInnTour},
		{da: 'Analfabetismo', a: 'Istruzione', delay: Math.round(2.5 * fps), accent: COLORS.oroIrpino},
		{da: 'Latifondo', a: 'Democrazia', delay: Math.round(4 * fps), accent: COLORS.rossoBandiera},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* SFONDO: la colonna dei contadini con bandiere — ora in senso di vittoria */}
			<KenBurnsImage
				src="images/TAG A1.06 - PIAZZETTA PRIMO MAGGIO/image_9db3a61d-54a2-4157-b796-cfac145351dd.png"
				motion="zoom-out"
				intensity={0.05}
				overlayOpacity={0}
				objectPosition="50% 20%"
			/>

			{/* Overlay caldo — la luce del tramonto come metafora del riscatto */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(6,6,14,0.97) 0%, rgba(6,6,14,0.88) 35%, rgba(6,6,14,0.42) 58%, rgba(6,6,14,0.08) 82%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(6,6,14,0.60) 0%, transparent 25%, transparent 62%, rgba(6,6,14,0.88) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Tono caldo rossastro / dorato — tramonto di vittoria */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 70% 30%, rgba(212,168,67,0.08) 0%, transparent 60%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.32} />
			<ScanLines opacity={0.020} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 60}}>
				{/* SINISTRA: titolo + DIGNITÀ + trasformazioni */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 20}}>

					{/* Label sezione */}
					<div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: titleOp}}>
						<div style={{width: 22, height: 2, background: `linear-gradient(90deg, ${COLORS.verdeInnTour}, ${COLORS.oroIrpino})`}} />
						<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.2em', textTransform: 'uppercase'}}>La conquista</span>
					</div>

					{/* Titolo */}
					<h2 style={{
						fontFamily: playfairFont, fontSize: 58, fontWeight: 700,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
						opacity: titleOp, transform: `translateY(${titleY}px)`,
						textShadow: '0 2px 16px rgba(6,6,14,0.9)',
					}}>
						La fine del latifondo,
						<br /><span style={{color: COLORS.oroIrpino}}>l'inizio della</span>
					</h2>

					{/* Parola DIGNITÀ */}
					<h1 style={{
						fontFamily: playfairFont, fontSize: 108, fontWeight: 700,
						color: COLORS.verdeInnTour, margin: 0, lineHeight: 0.9,
						opacity: dignitaProgress,
						transform: `translateY(${interpolate(dignitaProgress, [0, 1], [40, 0])}px)`,
						textShadow: `0 0 50px ${COLORS.verdeInnTour}${Math.round(dignitaProgress * 170).toString(16).padStart(2, '0')}, 0 2px 20px rgba(6,6,14,0.8)`,
					}}>
						DIGNITÀ
					</h1>

					{/* Trasformazioni */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4}}>
						{trasformazioni.map((t) => (
							<TrasformazioneCard key={t.da} {...t} />
						))}
					</div>
				</div>

				{/* DESTRA: Istituto Magistrale + piazza oggi */}
				<div style={{flex: 0.8, display: 'flex', flexDirection: 'column', gap: 18, opacity: magistraleOp, transform: `translateY(${interpolate(magistraleOp, [0, 1], [30, 0])}px)`}}>
					{/* Card faro culturale */}
					<div style={{
						background: 'rgba(6,6,14,0.85)',
						border: `1px solid ${COLORS.oroIrpino}55`,
						borderRadius: 10, padding: '20px 24px',
						backdropFilter: 'blur(18px)',
					}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
							<span style={{fontSize: 32}}>🎓</span>
							<div>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroIrpino, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0}}>Il faro dell'istruzione</p>
								<p style={{fontFamily: playfairFont, fontSize: 28, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>Istituto Magistrale</p>
							</div>
						</div>
						<p style={{fontFamily: latoFont, fontSize: 17, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.65}}>
							Dall'analfabetismo dei campi all'istruzione pubblica.
							La scuola come secondo atto del riscatto,
							dopo la conquista della terra.
						</p>
					</div>

					{/* Piazza oggi */}
					<div style={{
						background: 'rgba(6,6,14,0.78)',
						border: `1px solid ${COLORS.glassBorder}`,
						borderRadius: 8, padding: '14px 20px',
						backdropFilter: 'blur(14px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, marginBottom: 8}}>Oggi · Piazzetta Primo Maggio</p>
						<p style={{fontFamily: latoFont, fontSize: 17, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.6}}>
							Monumento vivente alla memoria
							<br />di chi ha trasformato Lacedonia
							<br />con le proprie mani.
						</p>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

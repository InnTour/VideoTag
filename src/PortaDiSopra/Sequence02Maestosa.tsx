import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// Card elemento architettonico
const ArchiCard: React.FC<{elemento: string; desc: string; delay: number}> = ({elemento, desc, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s  = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 140}, durationInFrames: Math.round(0.7 * fps)});
	const y  = interpolate(s, [0, 1], [25, 0]);
	const op = interpolate(s, [0, 1], [0, 1]);

	return (
		<div style={{
			opacity: op, transform: `translateY(${y}px)`,
			background: 'rgba(8,8,8,0.82)',
			border: `1px solid ${COLORS.oroMemoria}44`,
			borderLeft: `3px solid ${COLORS.oroMemoria}`,
			borderRadius: '0 8px 8px 0',
			padding: '10px 18px',
			backdropFilter: 'blur(16px)',
		}}>
			<p style={{fontFamily: playfairFont, fontSize: 20, fontWeight: 700, color: COLORS.oroMemoria, margin: 0}}>{elemento}</p>
			<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigio90, margin: 0, marginTop: 3, lineHeight: 1.4}}>{desc}</p>
		</div>
	);
};

export const Sequence02Maestosa: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 140}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [55, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Cross-dissolve: portale ornato B&W → arco classico con colonne
	const crossProgress = interpolate(frame, [Math.round(8 * fps), Math.round(11 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Sovrapposizione fantasma: processione (6f08e18f) che emerge come ricordo
	const fantasmaOp = interpolate(frame, [Math.round(12 * fps), Math.round(15 * fps)], [0, 0.38], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Anno 1059 che appare
	const annoOp = interpolate(frame, [Math.round(3 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const elementi = [
		{elemento: 'Arco gotico', desc: 'Struttura decorata con bassorilievi e motivi floreali', delay: Math.round(1.5 * fps)},
		{elemento: 'Stemma degli Orsini', desc: 'Blasone nobiliare scolpito in pietra calcarea', delay: Math.round(2.8 * fps)},
		{elemento: 'Battenti rinforzati', desc: 'Porte di legno massello con cardini giganteschi', delay: Math.round(4.1 * fps)},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Portale gotico ornato B&W */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_23e4c71c-d560-42a7-ad2c-009da43cded7.png"
					motion="zoom-in"
					intensity={0.06}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* LAYER 2: Arco classico con colonne B&W */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_584fd135-8e4f-4934-bd08-fc98acfe49f9.png"
					motion="pan-right"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* LAYER 3: Fantasma — processione nel photo-montage */}
			<div style={{position: 'absolute', inset: 0, opacity: fantasmaOp}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_6f08e18f-3878-4749-8685-60fc88dd014d.png"
					motion="zoom-in"
					intensity={0.03}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
			</div>

			{/* Overlay — mantiene leggibilità testo su B&W */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.86) 30%, rgba(8,8,8,0.42) 58%, rgba(8,8,8,0.08) 80%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,8,8,0.70) 0%, transparent 25%, transparent 65%, rgba(8,8,8,0.80) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Leggero tono seppia caldo sull'immagine — come una fotografia d'epoca */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 65% 45%, rgba(200,168,75,0.06) 0%, transparent 55%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.028} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 52}}>

				{/* SINISTRA */}
				<div style={{flex: 1.1, display: 'flex', flexDirection: 'column', gap: 22}}>

					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
							<div style={{width: 28, height: 2, background: `linear-gradient(90deg, ${COLORS.oroMemoria}, transparent)`}} />
							<span style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.oroMemoria, letterSpacing: '0.20em', textTransform: 'uppercase'}}>La Struttura · Come Era</span>
						</div>
						<h2 style={{
							fontFamily: playfairFont, fontSize: 60, fontWeight: 700,
							color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
							textShadow: '0 2px 18px rgba(8,8,8,0.98)',
						}}>
							Immaginiamo
							<br /><span style={{color: COLORS.oroMemoria}}>la sua maestosità</span>
						</h2>
					</div>

					{/* Anno fondazione diocesi */}
					<div style={{
						opacity: annoOp,
						display: 'inline-flex', alignItems: 'center', gap: 18,
						background: 'rgba(8,8,8,0.84)',
						border: `1px solid ${COLORS.oroMemoria}44`,
						borderRadius: 8, padding: '10px 22px',
						backdropFilter: 'blur(16px)',
						alignSelf: 'flex-start',
					}}>
						<div style={{textAlign: 'center'}}>
							<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: COLORS.oroMemoria, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0}}>Diocesi dal</p>
							<p style={{fontFamily: playfairFont, fontSize: 48, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, lineHeight: 1, textShadow: `0 0 20px ${COLORS.oroMemoria}44`}}>1059</p>
						</div>
						<div style={{width: 1, height: 50, backgroundColor: COLORS.oroMemoria, opacity: 0.4}} />
						<p style={{fontFamily: latoFont, fontSize: 14, fontWeight: 300, color: COLORS.grigio90, margin: 0, lineHeight: 1.5, maxWidth: 200}}>Ingresso d'onore per i prelati che hanno governato Lacedonia</p>
					</div>

					{/* Elementi architettonici */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
						{elementi.map((e) => <ArchiCard key={e.elemento} {...e} />)}
					</div>
				</div>

				{/* DESTRA: nessun elemento — lascia respirare le immagini B&W */}
				<div style={{flex: 0.5}} />
			</div>
		</AbsoluteFill>
	);
};

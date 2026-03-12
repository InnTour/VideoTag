import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// Timeline verticale arrivo albanesi
const EpocaItem: React.FC<{secolo: string; label: string; dettaglio: string; index: number; isKey?: boolean}> = ({secolo, label, dettaglio, index, isKey}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const delay = Math.round(index * 1.2 * fps);
	const s  = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 140}, durationInFrames: Math.round(0.8 * fps)});
	const x  = interpolate(s, [0, 1], [50, 0]);
	const op = interpolate(s, [0, 1], [0, 1]);
	const accent = isKey ? COLORS.oroBrillante : COLORS.azureInnTour;

	return (
		<div style={{opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'flex-start', gap: 18}}>
			{/* Nodo timeline */}
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4}}>
				<div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: accent, boxShadow: `0 0 14px ${accent}`, flexShrink: 0}} />
				{index < 2 && <div style={{width: 2, height: 38, backgroundColor: COLORS.glassBorder, marginTop: 4}} />}
			</div>
			{/* Testo */}
			<div style={{
				background: COLORS.glassScuro,
				border: `1px solid ${accent}44`,
				borderLeft: `3px solid ${accent}`,
				borderRadius: '0 8px 8px 0',
				padding: '10px 20px',
				flex: 1,
				backdropFilter: 'blur(16px)',
			}}>
				<p style={{fontFamily: playfairFont, fontSize: 27, fontWeight: 700, color: accent, margin: 0}}>{secolo}</p>
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, marginTop: 2}}>{label}</p>
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 3, lineHeight: 1.4}}>{dettaglio}</p>
			</div>
		</div>
	);
};

export const Sequence02Albanesi: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 145}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [55, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Cross-dissolve: guardie medievali → mano sulla pietra
	const crossProgress = interpolate(frame, [Math.round(6 * fps), Math.round(9 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const epoche = [
		{secolo: 'XV sec.', label: 'Prime migrazioni', dettaglio: 'Fuga dall\'avanzata ottomana nei Balcani', isKey: false},
		{secolo: 'XV–XVII', label: 'Insediamento stabile', dettaglio: 'Comunità arberesche integrate nel borgo', isKey: true},
		{secolo: 'Oggi', label: 'Il nome sopravvive', dettaglio: 'La porta porta la loro memoria', isKey: false},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* LAYER 1: Guardie medievali all'arco — la porta sorvegliata */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.07 - PORTA DEGLI ALBANESI/download (1).png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="60% 30%"
				/>
			</div>

			{/* LAYER 2: Mano sulla pietra — il tocco della memoria */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.07 - PORTA DEGLI ALBANESI/download (2).png"
					motion="zoom-out"
					intensity={0.06}
					overlayOpacity={0}
					objectPosition="center 50%"
				/>
			</div>

			{/* Overlay caldo medievale */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,6,10,0.97) 0%, rgba(8,6,10,0.86) 32%, rgba(8,6,10,0.42) 58%, rgba(8,6,10,0.08) 80%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,6,10,0.65) 0%, transparent 25%, transparent 65%, rgba(8,6,10,0.75) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.30} />
			<ScanLines opacity={0.020} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 56}}>

				{/* COLONNA SINISTRA: titolo + timeline */}
				<div style={{flex: 1.1, display: 'flex', flexDirection: 'column', gap: 24}}>

					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
							<div style={{width: 28, height: 2, background: `linear-gradient(90deg, ${COLORS.oroBrillante}, transparent)`}} />
							<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroBrillante, letterSpacing: '0.20em', textTransform: 'uppercase'}}>La Comunità</span>
						</div>
						<h2 style={{
							fontFamily: playfairFont, fontSize: 58, fontWeight: 700,
							color: COLORS.biancaCalce, margin: 0, lineHeight: 1.05,
							textShadow: '0 2px 18px rgba(8,6,10,0.95)',
						}}>
							Gli Arbëreshë
							<br /><span style={{color: COLORS.oroBrillante, fontSize: 54}}>a Lacedonia</span>
						</h2>
					</div>

					{/* Sottotitolo esplicativo */}
					<p style={{
						fontFamily: latoFont, fontSize: 22, fontWeight: 300,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.7,
						opacity: titleOp, maxWidth: 460,
						textShadow: '0 1px 8px rgba(8,6,10,0.8)',
					}}>
						Popolo albanese fuggito dall'espansione ottomana,
						che trovò nuova casa nell'Alta Irpinia
						tra il <span style={{color: COLORS.oroBrillante, fontWeight: 700}}>XV e il XVII secolo</span>.
					</p>

					{/* Timeline arrivo */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
						{epoche.map((e, i) => (
							<EpocaItem key={e.secolo} {...e} index={i} />
						))}
					</div>
				</div>

				{/* COLONNA DESTRA: card San Nicola + dato demografico */}
				<div style={{flex: 0.85, display: 'flex', flexDirection: 'column', gap: 18}}>

					{/* Card patrono San Nicola */}
					<div style={{
						opacity: interpolate(frame, [Math.round(3 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.oroBrillante}55`,
						borderRadius: 10,
						padding: '18px 22px',
						backdropFilter: 'blur(18px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroBrillante, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 10}}>Dedicata al patrono</p>
						<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
							<span style={{fontSize: 38}}>⛪</span>
							<div>
								<p style={{fontFamily: playfairFont, fontSize: 30, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>San Nicola di Bari</p>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 3}}>Protettore degli Albanesi in diaspora</p>
							</div>
						</div>
					</div>

					{/* Fact: stratificazione demografica */}
					<div style={{
						opacity: interpolate(frame, [Math.round(5.5 * fps), Math.round(7 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.azureInnTour}44`,
						borderRadius: 10, padding: '16px 22px',
						backdropFilter: 'blur(18px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.azureInnTour, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, marginBottom: 8}}>Stratificazione demografica</p>
						<p style={{fontFamily: latoFont, fontSize: 17, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.65}}>
							Sanniti → Romani → Longobardi
							<br />→ Normanni → <span style={{color: COLORS.oroBrillante, fontWeight: 600}}>Albanesi</span>
							<br />Ogni popolo ha lasciato il suo segno.
						</p>
					</div>

					{/* Citazione "segno dell'espansione" */}
					<div style={{
						opacity: interpolate(frame, [Math.round(9 * fps), Math.round(11 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						borderLeft: `3px solid ${COLORS.oroBrillante}`,
						paddingLeft: 18,
						background: `${COLORS.glassScuro}`,
						borderRadius: '0 8px 8px 0',
						padding: '12px 18px',
						backdropFilter: 'blur(12px)',
					}}>
						<p style={{fontFamily: playfairFont, fontSize: 19, fontStyle: 'italic', color: COLORS.biancaCalce, margin: 0, lineHeight: 1.6}}>
							"Segno dell'espansione del borgo
							<br />oltre il nucleo medievale più antico."
						</p>
						<p style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo, margin: 0, marginTop: 6}}>Cicerone Digitale · A1.07</p>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

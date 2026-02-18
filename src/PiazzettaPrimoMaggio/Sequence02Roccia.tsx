import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// Card dato con accent colorato
const DatoCard: React.FC<{label: string; valore: string; dettaglio?: string; delay: number; accent?: string}> = ({label, valore, dettaglio, delay, accent = COLORS.oroIrpino}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 140}, durationInFrames: Math.round(0.7 * fps)});
	const y  = interpolate(s, [0, 1], [30, 0]);
	const op = interpolate(s, [0, 1], [0, 1]);

	return (
		<div style={{
			opacity: op, transform: `translateY(${y}px)`,
			background: 'rgba(6,6,14,0.82)',
			border: `1px solid ${COLORS.glassBorder}`,
			borderLeft: `4px solid ${accent}`,
			borderRadius: 8,
			padding: '14px 22px',
			backdropFilter: 'blur(18px)',
		}}>
			<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 5}}>{label}</p>
			<p style={{fontFamily: playfairFont, fontSize: 32, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.1}}>{valore}</p>
			{dettaglio && <p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 4}}>{dettaglio}</p>}
		</div>
	);
};

export const Sequence02Roccia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 150}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [50, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Strati roccia che appaiono
	const stratiProgress = interpolate(frame, [Math.round(3 * fps), Math.round(6 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Cross-dissolve a metà: da vicolo (roccia) → panorama con padre+bambini
	const crossProgress = interpolate(frame, [Math.round(7 * fps), Math.round(9 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const dati = [
		{label: 'Roccia', valore: 'Ignimbrite', dettaglio: 'Origine vulcanica — Monte Vulture', delay: Math.round(0.5 * fps), accent: COLORS.terrabruciata},
		{label: 'Dal terremoto del', valore: '1456', dettaglio: 'Sostiene il borgo da 570 anni', delay: Math.round(1.5 * fps), accent: COLORS.oroIrpino},
		{label: 'Ridisegnata dopo', valore: '1980', dettaglio: 'Ricostruzione post-sisma dell\'Irpinia', delay: Math.round(2.5 * fps), accent: COLORS.verdeInnTour},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* LAYER 1: Vicolo in pietra — la roccia nuda del borgo */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/Primo Maggio/image_68f296c7-c027-45b6-a4c7-40bcf4c16974.png"
					motion="zoom-in"
					intensity={0.055}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
			</div>

			{/* LAYER 2: Padre con bambini sul balcone — lo sguardo sul paesaggio dopo il '80 */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/Primo Maggio/image_42537123-78b0-4ef0-ade9-a9b91370df87.png"
					motion="pan-right"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* Overlay */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(6,6,14,0.97) 0%, rgba(6,6,14,0.85) 32%, rgba(6,6,14,0.45) 58%, rgba(6,6,14,0.10) 82%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(6,6,14,0.55) 0%, transparent 28%, transparent 68%, rgba(6,6,14,0.70) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.28} />
			<ScanLines opacity={0.022} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 60}}>
				{/* COLONNA SINISTRA */}
				<div style={{flex: 1.1, display: 'flex', flexDirection: 'column', gap: 28}}>
					{/* Titolo */}
					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
							<div style={{width: 30, height: 2, background: `linear-gradient(90deg, ${COLORS.terrabruciata}, ${COLORS.oroIrpino})`}} />
							<span style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.oroIrpino, letterSpacing: '0.2em', textTransform: 'uppercase'}}>Le Fondamenta</span>
						</div>
						<h2 style={{
							fontFamily: playfairFont, fontSize: 60, fontWeight: 700,
							color: COLORS.biancaCalce, margin: 0, lineHeight: 1.05,
							textShadow: '0 2px 16px rgba(6,6,14,0.9)',
						}}>
							La roccia che
							<br /><span style={{color: COLORS.terrabruciata}}>regge il borgo</span>
						</h2>
					</div>

					{/* Dati */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
						{dati.map((d) => (
							<DatoCard key={d.label} {...d} />
						))}
					</div>
				</div>

				{/* COLONNA DESTRA: diagramma strati geologici visivo */}
				<div style={{flex: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, opacity: stratiProgress}}>
					<p style={{
						fontFamily: latoFont, fontSize: 12, fontWeight: 700,
						color: COLORS.grigioCaldo, letterSpacing: '0.16em',
						textTransform: 'uppercase', margin: 0, marginBottom: 14,
					}}>Sezione stratigrafica</p>

					{/* Strati visivi simulati */}
					{[
						{h: 44, color: '#4a3f35', label: 'Superficie (piazza)'},
						{h: 36, color: '#5c4a36', label: 'Ghiaia post-1980'},
						{h: 32, color: '#7a6040', label: 'Strato medievale'},
						{h: 40, color: '#8B4513', label: 'Tufo rossastro'},
						{h: 56, color: '#6B3A20', label: 'Ignimbrite · 1456+'},
						{h: 48, color: '#4a2510', label: 'Banco vulcanico'},
					].map((strato, i) => {
						const show = interpolate(stratiProgress, [(i / 6) * 0.8, (i / 6) * 0.8 + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						return (
							<div key={i} style={{width: '100%', display: 'flex', alignItems: 'center', gap: 12, opacity: show}}>
								<div style={{
									flex: 1, height: strato.h,
									background: strato.color,
									borderRadius: 4,
									boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.4)',
								}} />
								<p style={{fontFamily: latoFont, fontSize: 12, color: COLORS.grigioCaldo, margin: 0, minWidth: 160}}>{strato.label}</p>
							</div>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
};

import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {KenBurnsImage} from './components/KenBurnsImage';

// Card glassmorphism con dati biografici REALI
const GlassCard: React.FC<{label: string; value: string; detail?: string; delay: number; accent?: string}> = ({label, value, detail, delay, accent = COLORS.neonBlue}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 150}, durationInFrames: Math.round(0.7 * fps)});
	const x = interpolate(s, [0, 1], [-40, 0]);
	const op = interpolate(s, [0, 1], [0, 1]);

	return (
		<div style={{opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'flex-start', gap: 16}}>
			<div style={{width: 3, height: '100%', minHeight: 52, background: `linear-gradient(180deg, ${accent}, ${COLORS.verdeInnTour})`, borderRadius: 2, flexShrink: 0}} />
			<div style={{
				background: 'rgba(5,5,15,0.75)',
				border: `1px solid ${COLORS.glassBorder}`,
				backdropFilter: 'blur(20px)',
				borderRadius: 8,
				padding: '12px 22px',
				minWidth: 260,
			}}>
				<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 4}}>{label}</p>
				<p style={{fontFamily: playfairFont, fontSize: 26, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.1}}>{value}</p>
				{detail && <p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 4}}>{detail}</p>}
			</div>
		</div>
	);
};

export const Sequence02Personaggio: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpring = spring({frame, fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
	const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);

	// Anno "1946" che conta
	const yearProgress = interpolate(frame, [Math.round(1.2 * fps), Math.round(2.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const yearDisplay = Math.round(1900 + yearProgress * 46);

	// Dati biografici REALI dal testo Whisper
	const cards = [
		{label: 'Professione', value: 'Avvocato · Sindaco', detail: 'Primo sindaco democratico di Lacedonia', delay: Math.round(1.5 * fps), accent: COLORS.oroIrpino},
		{label: 'Anno Elezione', value: '1946', detail: 'Coalizione di sinistra · largo consenso', delay: Math.round(2.4 * fps), accent: COLORS.verdeInnTour},
		{label: 'Mandato', value: '1946 – 1950', detail: 'Anni della ricostruzione e del riscatto', delay: Math.round(3.3 * fps), accent: COLORS.neonBlue},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO — Vella firma i documenti ===
			 *  Immagine: image_e2347f6d (firma atti con testimoni, 1946)
			 *  Effetto: Ken Burns pan-right, partenza dal dettaglio della firma
			 */}
			<KenBurnsImage
				src="images/TAG A1.05 - PIAZZETTA NICOLA VELLA/image_e2347f6d-a155-4cef-91ae-63b25d9192d1.png"
				motion="pan-right"
				intensity={0.055}
				overlayOpacity={0}
				objectPosition="center 40%"
			/>

			{/* Overlay bitonale: sx scuro pieno (testo) → centro dissolvenza → dx preserva foto */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(5,5,15,0.97) 0%, rgba(5,5,15,0.88) 32%, rgba(5,5,15,0.55) 55%, rgba(5,5,15,0.15) 80%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(5,5,15,0.4) 0%, transparent 30%, transparent 70%, rgba(5,5,15,0.6) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.3} />
			<ScanLines opacity={0.025} />

			{/* === TESTO + CARDS — sinistra === */}
			<div style={{position: 'absolute', left: 56, top: '50%', transform: 'translateY(-52%)', maxWidth: 540}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: titleOp}}>
					<div style={{width: 28, height: 2, background: `linear-gradient(90deg, ${COLORS.verdeInnTour}, ${COLORS.neonBlue})`}} />
					<span style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.18em', textTransform: 'uppercase'}}>Il Personaggio</span>
				</div>

				<h2 style={{fontFamily: playfairFont, fontSize: 50, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, marginBottom: 28, lineHeight: 1.1, opacity: titleOp, transform: `translateY(${titleY}px)`}}>
					Il primo sindaco
					<br /><span style={{color: COLORS.oroIrpino, fontSize: 38}}>democratico</span>
				</h2>

				<div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
					{cards.map((card) => (
						<GlassCard key={card.label} {...card} />
					))}
				</div>
			</div>

			{/* === BADGE ANNO in basso a destra — fluttua sull'immagine === */}
			{yearProgress > 0 && (
				<div style={{
					position: 'absolute', right: 72, bottom: 80,
					textAlign: 'center',
					background: 'rgba(5,5,15,0.82)',
					border: `1px solid ${COLORS.oroIrpino}55`,
					borderRadius: 8, padding: '10px 28px',
					backdropFilter: 'blur(12px)',
					opacity: yearProgress,
					transform: `translateY(${interpolate(yearProgress, [0, 1], [20, 0])}px)`,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: COLORS.neonBlue, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, marginBottom: 4}}>Anno di elezione</p>
					<p style={{fontFamily: playfairFont, fontSize: 48, fontWeight: 700, color: COLORS.oroIrpino, margin: 0, letterSpacing: '0.05em', textShadow: `0 0 20px ${COLORS.oroIrpino}88`}}>
						{yearDisplay}
					</p>
					<div style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, opacity: 0.7}}>
						<div style={{width: 28, height: 2, backgroundColor: COLORS.verdeInnTour, borderRadius: 1}} />
						<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 400, color: COLORS.grigioCaldo, margin: 0}}>Prima democrazia locale</p>
					</div>
				</div>
			)}

			{/* Badge "Dedicata a" in alto a destra — sopra l'immagine */}
			<div style={{
				position: 'absolute', right: 72, top: 52,
				opacity: titleOp, transform: `translateY(${titleY}px)`,
				textAlign: 'right',
				background: 'rgba(5,5,15,0.78)',
				border: `1px solid ${COLORS.oroIrpino}44`,
				borderRadius: 6, padding: '8px 22px',
				backdropFilter: 'blur(12px)',
			}}>
				<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: COLORS.neonBlue, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0}}>Dedicata a</p>
				<h2 style={{fontFamily: playfairFont, fontSize: 28, fontWeight: 700, color: COLORS.oroIrpino, margin: 0, fontStyle: 'italic'}}>Nicola Vella</h2>
				<p style={{fontFamily: latoFont, fontSize: 12, fontWeight: 400, color: COLORS.grigioCaldo, margin: 0, marginTop: 2, letterSpacing: '0.06em'}}>Sindaco · Avvocato · Uomo del Popolo</p>
			</div>
		</AbsoluteFill>
	);
};

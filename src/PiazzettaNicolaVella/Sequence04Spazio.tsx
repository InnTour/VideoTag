import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {KenBurnsImage} from './components/KenBurnsImage';

// Card carica istituzionale
const CaricaCard: React.FC<{icon: string; ruolo: string; desc: string; delay: number; accent: string}> = ({icon, ruolo, desc, delay, accent}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 160}, durationInFrames: Math.round(0.7 * fps)});
	const op = interpolate(s, [0, 1], [0, 1]);
	const x = interpolate(s, [0, 1], [30, 0]);

	return (
		<div style={{opacity: op, transform: `translateX(${x}px)`,
			background: 'rgba(5,5,15,0.80)',
			border: `1px solid ${accent}55`,
			borderLeft: `4px solid ${accent}`,
			borderRadius: 8,
			padding: '12px 18px',
			display: 'flex', alignItems: 'flex-start', gap: 14,
			backdropFilter: 'blur(16px)',
		}}>
			<span style={{fontSize: 24, lineHeight: 1, flexShrink: 0}}>{icon}</span>
			<div>
				<p style={{fontFamily: latoFont, fontSize: 14, fontWeight: 700, color: accent, margin: 0, marginBottom: 3, letterSpacing: '0.06em'}}>{ruolo}</p>
				<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.5}}>{desc}</p>
			</div>
		</div>
	);
};

// Dati REALI dal testo Whisper
const cariche = [
	{icon: '🏛️', ruolo: 'Sindaco di Lacedonia', desc: 'Primo sindaco democratico · 1946–1950', delay: 0, accent: COLORS.oroIrpino},
	{icon: '📋', ruolo: 'Consigliere Provinciale', desc: 'Rappresentanza dell\'Alta Irpinia', delay: 18, accent: COLORS.neonBlue},
	{icon: '🗳️', ruolo: 'Candidato al Parlamento', desc: 'Impegno politico nazionale', delay: 36, accent: COLORS.verdeInnTour},
];

export const Sequence04Spazio: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpring = spring({frame, fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
	const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);

	// Parola "IMPEGNO" che si rivela
	const wordProgress = interpolate(frame, [Math.round(2.5 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO — Vella dirige la ricostruzione del borgo ===
			 *  Immagine: image_1046a492 (Vella indica lavori di ricostruzione, tramonto epico)
			 *  Effetto: Ken Burns zoom-out per senso di grandiosità
			 *  Posizione: focus sul personaggio a sinistra, cantiere e cielo a destra
			 */}
			<KenBurnsImage
				src="images/Nicola Vella/image_1046a492-2045-4539-be44-8a0b9ed2fc79.png"
				motion="zoom-out"
				intensity={0.06}
				overlayOpacity={0}
				objectPosition="30% 40%"
			/>

			{/* Overlay: scuro ai lati, più trasparente al centro per esaltare l'immagine */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(5,5,15,0.96) 0%, rgba(5,5,15,0.78) 28%, rgba(5,5,15,0.30) 52%, rgba(5,5,15,0.72) 80%, rgba(5,5,15,0.92) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(5,5,15,0.55) 0%, rgba(5,5,15,0.10) 30%, rgba(5,5,15,0.10) 65%, rgba(5,5,15,0.80) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.3} />
			<ScanLines opacity={0.025} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 72px', gap: 72}}>
				{/* SINISTRA: titolo + parola impatto */}
				<div style={{flex: 1}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, opacity: titleOp}}>
						<div style={{width: 22, height: 2, backgroundColor: COLORS.verdeInnTour, borderRadius: 1}} />
						<span style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.2em', textTransform: 'uppercase'}}>L'eredità civile</span>
					</div>

					<h2 style={{fontFamily: playfairFont, fontSize: 54, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, marginBottom: 6, lineHeight: 1.05, opacity: titleOp, transform: `translateY(${titleY}px)`, textShadow: '0 2px 12px rgba(5,5,15,0.9)'}}>
						Un uomo di
					</h2>

					{/* Parola IMPEGNO che si illumina */}
					<h1 style={{
						fontFamily: playfairFont, fontSize: 94, fontWeight: 700,
						color: COLORS.oroIrpino, margin: 0,
						opacity: wordProgress,
						transform: `translateY(${interpolate(wordProgress, [0, 1], [35, 0])}px)`,
						textShadow: `0 0 50px ${COLORS.oroIrpino}${Math.round(wordProgress * 160).toString(16).padStart(2, '0')}, 0 2px 20px rgba(5,5,15,0.8)`,
						lineHeight: 1,
					}}>
						IMPEGNO
					</h1>

					<p style={{
						fontFamily: latoFont, fontSize: 16, fontWeight: 300,
						color: COLORS.biancaCalce, margin: 0, marginTop: 18,
						lineHeight: 1.7, opacity: wordProgress,
						maxWidth: 380,
						textShadow: '0 1px 8px rgba(5,5,15,0.8)',
					}}>
						Oltre il Comune, Vella portò la voce
						<br />di Lacedonia nelle istituzioni provinciali
						<br />e nella politica nazionale.
					</p>
				</div>

				{/* DESTRA: Cariche istituzionali */}
				<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14}}>
					<p style={{
						fontFamily: latoFont, fontSize: 11, fontWeight: 700,
						color: COLORS.grigioCaldo, letterSpacing: '0.18em',
						textTransform: 'uppercase', margin: 0, marginBottom: 8,
						opacity: titleOp,
					}}>
						Cariche e ruoli ricoperti
					</p>
					{cariche.map((c) => (
						<CaricaCard key={c.ruolo} {...c} />
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

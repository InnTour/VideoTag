import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {KenBurnsImage} from './components/KenBurnsImage';

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.4, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Titolo — dal basso con spring
	const titleSpring = spring({frame: Math.max(0, frame - Math.round(0.8 * fps)), fps, config: {damping: 130}, durationInFrames: Math.round(1 * fps)});
	const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
	const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);

	// Sottotitolo
	const subSpring = spring({frame: Math.max(0, frame - Math.round(1.8 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const subOp = interpolate(subSpring, [0, 1], [0, 1]);

	// Linea neon che si estende
	const lineW = interpolate(frame, [Math.round(1.5 * fps), Math.round(2.5 * fps)], [0, 400], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Glitch flash all'inizio
	const glitch = frame < 3 ? 0.4 : frame < 5 ? 1 : frame < 6 ? 0.6 : 1;

	return (
		<AbsoluteFill style={{opacity: opacity * glitch, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO — Piazzetta di Lacedonia con Vella ===
			 *  Immagine: image_695bd7aa (Nicola Vella in piedi nella piazzetta)
			 *  Effetto: Ken Burns zoom-in lento, spostamento centrato sul personaggio
			 */}
			<KenBurnsImage
				src="images/TAG A1.05 - PIAZZETTA NICOLA VELLA/image_695bd7aa-712e-4c8b-98a4-5194d99a2efa.png"
				motion="zoom-in"
				intensity={0.06}
				overlayOpacity={0}
				objectPosition="center 30%"
			/>

			{/* Gradiente scuro sx (per leggibilità testo) + sfumatura seppia/cinema */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(5,5,15,0.94) 0%, rgba(8,8,18,0.82) 35%, rgba(8,8,18,0.45) 60%, rgba(5,5,10,0.2) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Vignette bottom per subtitle area */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, transparent 50%, rgba(5,5,10,0.7) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Particelle fluttuanti (ridotte su foto) */}
			<ParticleField opacity={0.35} />
			{/* Scan lines sottili — effetto cinematografico */}
			<ScanLines opacity={0.025} />

			{/* === Badge InnTour in alto === */}
			<div style={{position: 'absolute', top: 48, left: 56, display: 'flex', alignItems: 'center', gap: 14, opacity: subOp}}>
				<div style={{width: 3, height: 28, backgroundColor: COLORS.verdeInnTour, borderRadius: 2}} />
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.18em', textTransform: 'uppercase'}}>
					Architettura e Monumenti
				</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo, letterSpacing: '0.12em'}}>· A1.05</span>
			</div>

			{/* === Testo principale — sinistra === */}
			<div style={{position: 'absolute', left: 56, top: '50%', transform: 'translateY(-52%)', maxWidth: 680}}>
				{/* Tag piccolo */}
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 400, color: COLORS.neonBlue, letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0, marginBottom: 16, opacity: subOp}}>
					Lacedonia · Centro Storico
				</p>

				{/* Titolo principale */}
				<h1 style={{fontFamily: playfairFont, fontSize: 96, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.05, opacity: titleOp, transform: `translateY(${titleY}px)`, textShadow: `0 0 40px ${COLORS.oroIrpino}55`}}>
					Piazzetta
					<br />
					<span style={{color: COLORS.oroIrpino, fontStyle: 'italic'}}>Nicola Vella</span>
				</h1>

				{/* Linea neon */}
				<div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, marginBottom: 20}}>
					<div style={{width: lineW, height: 1.5, background: `linear-gradient(90deg, ${COLORS.verdeInnTour}, ${COLORS.neonBlue})`, boxShadow: `0 0 8px ${COLORS.neonBlue}88`}} />
					{lineW > 100 && <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.neonBlue, boxShadow: `0 0 12px ${COLORS.neonBlue}`}} />}
				</div>

				{/* Sottotitolo */}
				<p style={{fontFamily: latoFont, fontSize: 23, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, opacity: subOp, letterSpacing: '0.06em', lineHeight: 1.6}}>
					Un angolo di storia dove la memoria
					<br />incontra la vita civile del borgo
				</p>
			</div>

			{/* InnTour bottom */}
			<div style={{position: 'absolute', bottom: 38, left: 56, opacity: subOp * 0.55, display: 'flex', alignItems: 'center', gap: 8}}>
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.12em'}}>INNTOUR</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo}}>· Narratore Digitale di Lacedonia</span>
			</div>
		</AbsoluteFill>
	);
};

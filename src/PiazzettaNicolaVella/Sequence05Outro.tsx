import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {KenBurnsImage} from './components/KenBurnsImage';

export const Sequence05Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 0.6], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.8, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const logoSpring = spring({frame, fps, config: {damping: 180}, durationInFrames: Math.round(0.8 * fps)});
	const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);
	const logoOp = interpolate(logoSpring, [0, 1], [0, 1]);

	const subSpring = spring({frame: Math.max(0, frame - Math.round(0.8 * fps)), fps, config: {damping: 200}, durationInFrames: Math.round(0.7 * fps)});
	const subOp = interpolate(subSpring, [0, 1], [0, 1]);

	const lineW = interpolate(frame, [Math.round(0.5 * fps), Math.round(1.5 * fps)], [0, 340], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Pulsazione logo
	const pulse = 1 + 0.015 * Math.sin(frame * 0.1);

	// Vignette circolare che si apre lentamente (iris effect)
	const irisProgress = interpolate(frame, [0, Math.round(2 * fps)], [0.1, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO — Ritorno alla piazzetta di Lacedonia ===
			 *  Immagine: image_695bd7aa (Nicola Vella nella piazzetta — circolarità narrativa)
			 *  Effetto: zoom-out lento, come se ci si allontanasse dalla storia per tornare al presente
			 */}
			<KenBurnsImage
				src="images/Nicola Vella/image_695bd7aa-712e-4c8b-98a4-5194d99a2efa.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 30%"
			/>

			{/* Overlay scuro uniforme — più pesante per dare spazio al testo centrato */}
			<AbsoluteFill style={{
				backgroundColor: `rgba(5,5,15,${0.55 + (1 - irisProgress) * 0.4})`,
				pointerEvents: 'none',
			}} />
			{/* Gradiente radiale — centro più chiaro per far risaltare il logo */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(5,5,15,0.45) 70%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.35} />
			<ScanLines opacity={0.02} />

			{/* Contenuto centrato */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20}}>
				{/* Logo InnTour */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale * pulse})`}}>
					<div style={{
						border: `1.5px solid ${COLORS.verdeInnTour}66`,
						borderRadius: 8,
						padding: '10px 36px',
						background: 'rgba(5,5,15,0.82)',
						backdropFilter: 'blur(20px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 38, fontWeight: 700, color: COLORS.verdeInnTour, margin: 0, letterSpacing: '0.12em', textShadow: `0 0 20px ${COLORS.verdeInnTour}88`}}>
							INNTOUR
						</p>
					</div>
				</div>

				{/* Linea neon */}
				<div style={{width: lineW, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.oroIrpino}, transparent)`, boxShadow: `0 0 6px ${COLORS.oroIrpino}66`}} />

				{/* Comune */}
				<p style={{fontFamily: playfairFont, fontSize: 22, fontWeight: 400, color: COLORS.biancaCalce, margin: 0, letterSpacing: '0.06em', opacity: subOp, textAlign: 'center', textShadow: '0 2px 12px rgba(5,5,15,0.8)'}}>
					Comune di Lacedonia
				</p>
				<p style={{fontFamily: latoFont, fontSize: 14, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: subOp}}>
					Cicerone Digitale · Virtual Tour
				</p>

				{/* Separatore */}
				<div style={{width: 1, height: 30, backgroundColor: COLORS.glassBorder, opacity: subOp}} />

				{/* Tag ID */}
				<div style={{
					display: 'flex', alignItems: 'center', gap: 8, opacity: subOp * 0.7,
					background: 'rgba(5,5,15,0.78)', border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4, padding: '5px 16px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.verdeInnTour}} />
					<span style={{fontFamily: latoFont, fontSize: 12, color: COLORS.grigioCaldo, letterSpacing: '0.14em'}}>
						A1.05 · Piazzetta Nicola Vella · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

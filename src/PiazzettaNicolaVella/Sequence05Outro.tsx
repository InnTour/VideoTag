import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './constants';
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
	const logoOp = interpolate(logoSpring, [0, 1], [0, 1]);



	// Vignette circolare che si apre lentamente (iris effect)
	const irisProgress = interpolate(frame, [0, Math.round(2 * fps)], [0.1, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO — Ritorno alla piazzetta di Lacedonia ===
			 *  Immagine: image_695bd7aa (Nicola Vella nella piazzetta — circolarità narrativa)
			 *  Effetto: zoom-out lento, come se ci si allontanasse dalla storia per tornare al presente
			 */}
			<KenBurnsImage
				src="images/TAG A1.05 - PIAZZETTA NICOLA VELLA/image_695bd7aa-712e-4c8b-98a4-5194d99a2efa.png"
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

			{/* Loghi */}
			<div style={{
				position: 'absolute',
				bottom: 60,
				left: 0,
				right: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 48,
				opacity: logoOp,
			}}>
				<Img src={staticFile('lacedonia-logo.png')} style={{ height: 96, objectFit: 'contain' }} />
				<div style={{ width: 1, height: 72, background: '#666666' }} />
				<Img src={staticFile('logo-inntour.png')} style={{ height: 80, objectFit: 'contain' }} />
			</div>
		</AbsoluteFill>
	);
};
